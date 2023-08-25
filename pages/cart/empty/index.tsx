import NextLink from 'next/link'
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { ShopLayout } from '@/components';

const EmptyCartPage = () => {
  return (
    <ShopLayout title='Empty Cart' pageDescription='Cart is empty'>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 200px)'
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display='flex' flexDirection='column' alignItems='center'>
                  <Typography>Your cart is empty</Typography>
                  <NextLink href='/'>
                      <Link component='span'>
                          <Typography variant='h4'component='h4'>Return</Typography>
                      </Link>
                  </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyCartPage;
