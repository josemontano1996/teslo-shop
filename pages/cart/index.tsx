import { useContext, useEffect } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CartContext } from '@/context';
import { CartList, OrderSummary, ShopLayout } from '@/components';
import { useRouter } from 'next/router';

const CartPage = () => {
  const { isLoaded, numberOfItems } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && numberOfItems === 0) {
      router.replace('/cart/empty');
    }
  }, [isLoaded, numberOfItems, router]);

  if (!isLoaded || numberOfItems === 0) {
    return <></>;
  }

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
