import { Grid, Typography } from '@mui/material';

export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Quantity of Products</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>3</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{`$${105.3}`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Taxes (15%)</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{`$${25.3}`}</Typography>
      </Grid>
      <Grid item xs={6} sx={{mt:1}}>
        <Typography variant='subtitle1'>Total Price</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography variant='subtitle1'>{`$${130.6}`}</Typography>
      </Grid>
    </Grid>
  );
};
