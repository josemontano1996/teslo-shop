import { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
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
import Cookies from 'js-cookie';
import { CartContext } from '@/context';
import { CartList, OrderSummary, ShopLayout } from '@/components';
import { useRouter } from 'next/router';

const SummaryPage = () => {
  const router = useRouter();
  const { shippingAddress, createOrder } = useContext(CartContext);

  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!Cookies.get('firstName')) {
      router.push('/checkout/address');
    }
  }, [router]);

  const onCreateOrder = async () => {
    setIsPosting(true);
    const { hasError, message } = await createOrder();
    console.group(hasError, message);
    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
      return;
    }

    router.replace(`/orders/${message}`); //this message would me the _id from the order, check the context for more info
  };

  if (!shippingAddress) {
    return <></>;
  }

  const { firstName, lastName, address, address2, city, country, phone, zip } = shippingAddress;

  return (
    <ShopLayout title='Order summary' pageDescription='Order summary'>
      <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
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
                <Typography variant='subtitle1'>Delivery data</Typography>
                <NextLink href='/checkout/address'>
                  <Link component='span' underline='always'>
                    Edit
                  </Link>
                </NextLink>
              </Box>
              <Typography>
                {lastName}, {firstName}
              </Typography>
              <Typography>{phone}</Typography>
              <Typography>{address}</Typography>
              <Typography>{address2}</Typography>
              <Typography>
                {city}, {zip}
              </Typography>
              {/* <Typography>{countries.find((c) => c.code === country)?.name}</Typography> */}
              <Typography>{country}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart'>
                  <Link component='span' underline='always'>
                    Edit
                  </Link>
                </NextLink>
              </Box>
              <OrderSummary />

              <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                <Button
                  color='secondary'
                  className='circular-btn'
                  fullWidth
                  onClick={onCreateOrder}
                  disabled={isPosting}
                >
                  Place Order
                </Button>
                <Chip
                  color='error'
                  label={errorMessage}
                  sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
