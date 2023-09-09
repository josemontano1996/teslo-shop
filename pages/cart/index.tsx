import { useContext } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';

import { CartList, OrderSummary, ShopLayout } from '@/components';
import { CartContext } from '@/context';

const CartPage = () => {
  return (
    <ShopLayout title='Cart' pageDescription='Shop shopping cart'>
      <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
        Cart
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable={true} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Order</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
