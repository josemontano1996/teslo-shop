import { ShopLayout } from '@/components';
import { Box, Typography } from '@mui/material';

const Custom404Page = () => {
  return (
    <ShopLayout title='Page not found' pageDescription='There is nothing to show here'>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 200px)'
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <Typography variant='h1' component='h1' fontSize={80} fontWeight={100}>
          404 |
        </Typography>
        <Typography marginLeft={2}>Page not found</Typography>
      </Box>
    </ShopLayout>
  );
};

export default Custom404Page;
