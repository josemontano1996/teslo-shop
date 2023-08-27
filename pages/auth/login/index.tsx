import NextLink from 'next/link';
import { AuthLayout } from '@/components';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';

const LoginPage = () => {
  return (
    <AuthLayout title='Login'>
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1' component='h1'>
              Log in
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label='Email' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Password' type='password' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button color='secondary' className='circular-btn' size='large' fullWidth>
              Log in
            </Button>
          </Grid>
          <Grid item xs={12} display='flex' justifyContent='end'>
            <NextLink href='/auth/register'>
              <Link component='span' underline='always'>
                Not registered yet?
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
