import { ShopLayout } from '@/components';
import { Typography } from '@mui/material';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find the best Teslo products here'}>
      <Typography variant='h1' component='h1'>
        Shop
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        All products
      </Typography>
    </ShopLayout>
  );
};

export default Home;

