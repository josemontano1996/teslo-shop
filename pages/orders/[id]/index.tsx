import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { Typography, Grid, Card, CardContent, Divider, Box, Link, Chip } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { dbOrders } from '@/database';
import { CartList, OrderSummary, PaymentStatusChip, ShopLayout } from '@/components';
import { IOrder } from '@/interfaces';

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

  return (
    <ShopLayout title={`Order ${_id} summary`} pageDescription='Order summary'>
      <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
        Order: {_id}
      </Typography>

      <PaymentStatusChip isPaid={isPaid} />

      <Grid container className='fadeIn'>
        <Grid item xs={12} sm={7}>
          <CartList editable={false} products={orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Order Summary</Typography>

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
                {/* TODO pagar */}
                {!isPaid ? <h1>Pay now</h1> : ''}
                <PaymentStatusChip isPaid={isPaid} />
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
