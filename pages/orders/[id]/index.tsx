import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter } from 'next/router';
import { Typography, Grid, Card, CardContent, Divider, Box, CircularProgress } from '@mui/material';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { dbOrders } from '@/database';
import { CartList, OrderSummary, PaymentStatusChip, ShopLayout } from '@/components';
import { IOrder } from '@/interfaces';
import { tesloApi } from '@/axiosApi';

export type OrderResponseBody = {
  id: string;
  status: 'COMPLETED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'PAYER_ACTION_REQUIRED' | 'CREATED';
};

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const { _id, shippingAddress, orderItems, isPaid, subTotal, tax, total, numberOfItems } = order;
  const orderBill = {
    tax,
    total,
    numberOfItems,
    subTotal,
  };

  const router = useRouter();
  const [isPaying, setIsPaying] = useState(false);

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== 'COMPLETED') {
      return alert('There is no Paypal payment');
    }
    setIsPaying(true);

    try {
      await tesloApi.post(`orders/pay`, {
        transactionId: details.id,
        orderId: order._id,
      });

      router.reload();
    } catch (error) {
      setIsPaying(false);
      console.log(error);
      alert('Error');
    }
  };

  return (
    <ShopLayout title={`Order ${_id} summary`} pageDescription='Order summary'>
      <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
        Order: {_id}
      </Typography>

      <Grid container className='fadeIn'>
        <Grid item xs={12} sm={7}>
          <CartList editable={false} products={orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='h2'>Order Summary</Typography>
                <PaymentStatusChip isPaid={isPaid} />
              </Box>

              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Delivery Data</Typography>
              </Box>
              <Typography>
                {shippingAddress.lastName}, {shippingAddress.firstName}
              </Typography>
              <Typography>{shippingAddress.phone}</Typography>
              <Typography>{shippingAddress.address}</Typography>
              <Typography>{shippingAddress.address2}</Typography>
              <Typography>
                {shippingAddress.city}, {shippingAddress.zip}
              </Typography>
              <Typography>{shippingAddress.country}</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary orderBill={orderBill} />

              <Box sx={{ mt: 3 }}>
                <Box
                  display='flex'
                  justifyContent='center'
                  className='fadeIn'
                  sx={{ display: isPaying ? 'flex' : 'none' }}
                >
                  <CircularProgress />
                </Box>
                <Box sx={{ display: isPaying ? 'none' : 'block' }}>
                  {!isPaid ? (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: `${order.total}`,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order!.capture().then((details) => {
                          onOrderCompleted(details);
                          // console.log({ details });
                          // const name = details.payer.name.given_name;
                          // alert(`Transaction completed by ${name}`);
                        });
                      }}
                    />
                  ) : (
                    ''
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const { id = '' } = query;
  const session: any = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
