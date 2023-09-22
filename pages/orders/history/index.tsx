import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import NextLink from 'next/link';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ShopLayout } from '@/components';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';

//for this one i had to install mui x-data-grid
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Full Name', width: 300 },
  {
    field: 'paid',
    headerName: 'Payed',
    description: 'Show information if the order was payed',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color='success' label='Payed' variant='outlined' />
      ) : (
        <Chip color='error' label='Not payed' variant='outlined' />
      );
    },
  },
  {
    field: 'order',
    headerName: 'See order',
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.orderId}`}>
          <Link component='span' underline='always'>
            See order
          </Link>
        </NextLink>
      );
    },
  },
];

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, index) => ({
    id: index + 1,
    paid: order.isPaid,
    fullName: order.shippingAddress.lastName + ', ' + order.shippingAddress.firstName,
    orderId: order._id,
  }));

  return (
    <ShopLayout title='Order history' pageDescription='Client order history'>
      <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
        Orders History
      </Typography>

      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            pageSizeOptions={[5, 10, 25]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session: any = await getServerSession(req, res, authOptions);

  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
