import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ShopLayout } from '@/components';

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
        <NextLink href={`/orders/${params.row.id}`}>
          <Link component='span' underline='always'>
            See order
          </Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullName: 'Fernando Herrera' },
  { id: 2, paid: false, fullName: 'Josema Herrera' },
  { id: 3, paid: false, fullName: 'Fernando Welno' },
  { id: 4, paid: true, fullName: 'Eduardo HerrePereza' },
];

const index = () => {
  return (
    <ShopLayout title='Order history' pageDescription='Client order history'>
      <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
        Orders History
      </Typography>

      <Grid container>
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

export default index;
