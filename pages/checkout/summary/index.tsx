import NextLink from 'next/link';
import { CartList, OrderSummary, ShopLayout } from '@/components';
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link } from '@mui/material';

const SummaryPage = () => {
  return (
    <ShopLayout title='Order summary' pageDescription='Order summary'>
      <Typography variant='h1' component='h1' sx={{mb:2}}>
        Order summary
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable={false} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Summary</Typography>

              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='space-between'>
              <Typography variant='subtitle1'>Delivery Data</Typography>
                <NextLink href='/checkout/address'>
                  <Link component='span' underline='always'>
                    Edit
                  </Link>
                </NextLink>
              </Box>
              <Typography>Josema Montano</Typography>
              <Typography>+45 25125215</Typography>
              <Typography>Alguna calle</Typography>
              <Typography>Ciudad, 526358</Typography>
              <Typography>Pais</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart'>
                  <Link component='span' underline='always'>
                    Edit
                  </Link>
                </NextLink>
              </Box>
              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' fullWidth>
                  Place Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;