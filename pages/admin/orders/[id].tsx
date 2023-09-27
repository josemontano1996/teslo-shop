import { GetServerSideProps, NextPage } from 'next';
import { Typography, Grid, Card, CardContent, Divider, Box } from '@mui/material';

import { dbOrders } from '@/database';
import { AdminLayout, CartList, OrderSummary, PaymentStatusChip } from '@/components';
import { IOrder } from '@/interfaces';
import { ConfirmationNumberOutlined } from '@mui/icons-material';

interface Props {
  order: IOrder;
}

const AdminOrderPage: NextPage<Props> = ({ order }) => {
  const { _id, shippingAddress, orderItems, isPaid, subTotal, tax, total, numberOfItems } = order;
  const orderBill = {
    tax,
    total,
    numberOfItems,
    subTotal,
  };

  return (
    <AdminLayout title='Order summary' subTitle='' icon={<ConfirmationNumberOutlined />}>
      <Typography variant='h2' component='h2' sx={{ mb: 2 }}>
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const { id = '' } = query;

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: '/admin/orders',
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

export default AdminOrderPage;
