import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { FullScreenLoading, ProductList, ShopLayout } from '@/components';
import { useProducts } from '@/hooks';

const KidPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=kid');

  return (
    <ShopLayout
      title={'Teslo-Shop - Kids Category'}
      pageDescription={'Teslo Shop search results for kids'}
    >
      <Typography variant='h1' component='h1'>
        Shop
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        All products
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidPage;
