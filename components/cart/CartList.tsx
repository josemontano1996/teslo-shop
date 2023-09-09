import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { ItemCounter } from '..';
import { FC, useContext, useEffect, useState } from 'react';
import { ICartProduct } from '@/interfaces';
import { CartContext } from '@/context';

interface Props {
  editable: boolean;
}

export const CartList: FC<Props> = ({ editable }) => {
  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const onNewCartQuantity = (product: ICartProduct, newQuantityValue: number) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };


  return (
    <>
      {hasMounted &&
        cart.map((product) => (
          <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              {/* TODO llevar a pagina del producto */}
              <NextLink href={`/product/${product.slug}`}>
                <Link component='span'>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.images}`}
                      component='img'
                      sx={{ borderRadius: '5px' }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='body1'>{product.title}</Typography>
                <Typography variant='body1'>
                  Size: <strong>{product.size}</strong>
                </Typography>

                {editable ? (
                  <ItemCounter
                    currentValue={product.quantity}
                    maxValue={10}
                    updateQuantity={(newValue) => onNewCartQuantity(product, newValue)}
                  />
                ) : (
                  <Typography variant='h5'>
                    {product.quantity} {product.quantity > 1 ? 'items' : 'item'}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
              <Typography variant='subtitle1'>{`$${product.price}`}</Typography>

              {editable && (
                <Button
                  variant='text'
                  color='secondary'
                  onClick={() => removeCartProduct(product)}
                >
                  Remove
                </Button>
              )}
            </Grid>
          </Grid>
        ))}
    </>
  );
};
