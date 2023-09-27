import useSWR from 'swr';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Chip, Grid } from '@mui/material';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { AdminLayout } from '@/components';
import { IOrder, IUser } from '@/interfaces';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Order Id', width: 250 },
  { field: 'email', headerName: 'E-mail', width: 300 },
  { field: 'name', headerName: 'Full Name', width: 250 },
  { field: 'total', headerName: 'Total Price' },
  {
    field: 'isPaid',
    headerName: 'Payment status',
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid ? (
        <Chip variant='outlined' label='Paid' color='success' />
      ) : (
        <Chip variant='outlined' label='Pending' color='error' />
      );
    },
  },
  { field: 'numberOfProducts', headerName: 'No.Products', align: 'center' },
  {
    field: 'check',
    headerName: 'Check Order',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target='_blank'>
          Check order
        </a>
      );
    },
  },
  { field: 'createdAt', headerName: 'Created at', width: 300 },
];

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

  if (!data && !error) return <></>;

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    numberOfProducts: order.numberOfItems,
    createdAt: new Date(order.createdAt!).toDateString(),
  }));

  return (
    <AdminLayout
      title='Orders'
      subTitle='Orders administration'
      icon={<ConfirmationNumberOutlined />}
    >
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
    </AdminLayout>
  );
};

export default OrdersPage;
