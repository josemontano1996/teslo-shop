import NextLink from 'next/link';
import { CartList, OrderSummary, ShopLayout } from '@/components';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  Link,
  Chip,
} from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

const OrderPage = () => {
  return (
    <ShopLayout title='Order 12361561 summary' pageDescription='Order summary'>
      <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
        Order: ABC1234
      </Typography>
      {/* 
      <Chip
        sx={{ my: 2 }}
        label='Payment pending'
        variant='outlined'
        color='error'
        icon={<CreditCardOffOutlined />}
          /> */}
      <Chip
        sx={{ my: 2 }}
        label='Payment successful'
        variant='outlined'
        color='success'
        icon={<CreditScoreOutlined />}
      />

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
                {/* TODO pagar */}
                <h1>Pagar</h1>
                <Chip
                  sx={{ my: 2 }}
                  label='Payment successful'
                  variant='outlined'
                  color='success'
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
