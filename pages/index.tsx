import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ProductList, ShopLayout } from '@/components';
import { initialData } from '@/database/products';

const Home: NextPage = () => {
  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find the best Teslo products here'}>
      <Typography variant='h1' component='h1'>
        Shop
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        All products
      </Typography>
     {/*  TODO change as any */}
      <ProductList products={initialData.products as any} />
    </ShopLayout>
  );
};

export default Home;

