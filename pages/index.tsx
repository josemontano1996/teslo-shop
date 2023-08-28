import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ProductList, ShopLayout } from '@/components';
import { useProducts } from '@/hooks';

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find the best Teslo products here'}>
      <Typography variant='h1' component='h1'>
        Shop
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        All products
      </Typography>
      {isLoading ? <h1>Is charging</h1> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;

