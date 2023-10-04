import useSWR from 'swr';
import NextLink from 'next/link';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { AdminLayout } from '@/components';
import { IProduct } from '@/interfaces';

const columns: GridColDef[] = [
  {
    field: 'img',
    headerName: 'Image',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/product/${row.slug}`} target='blank'>
          <CardMedia
            component='img'
            alt={row.title}
            className='fadeIn'
            image={row.img}
          />
        </a>
      );
    },
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 250,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref>
          <Link component='span' underline='always'>
            {row.title}
          </Link>
        </NextLink>
      );
    },
  },
  { field: 'gender', headerName: 'Genders' },
  { field: 'type', headerName: 'Type' },
  { field: 'inStock', headerName: 'Stock' },
  { field: 'price', headerName: 'Price' },
  { field: 'sizes', headerName: 'Sizes', flex: 1 },
];

const AdminProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>('/api/admin/products');

  if (!data && !error) return <></>;

  const rows = data!.map((p) => ({
    id: p._id,
    img: p.images[0],
    title: p.title,
    gender: p.gender,
    sizes: p.sizes.join(', '),
    type: p.type,
    inStock: p.inStock,
    price: p.price,
    slug: p.slug,
  }));

  return (
    <AdminLayout
      title={`Products: total of ${data!.length}`}
      subTitle='Product administration'
      icon={<CategoryOutlined />}
    >
      <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <Button startIcon={<AddOutlined />} color='secondary' href='/admin/products/new'>
          Create new product
        </Button>
      </Box>
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

export default AdminProductsPage;
