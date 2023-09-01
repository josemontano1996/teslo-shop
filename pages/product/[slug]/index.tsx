import { NextPage } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ItemCounter, ProductSizeSelector, ProductSlideShow, ShopLayout } from '@/components';
import { IProduct } from '@/interfaces';

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  /*  const router = useRouter();
  const { products: product, isLoading } = useProducts(`/products/${router.query.slug}`);
  if (isLoading) {
    return <h1>Loading</h1>;
  } */

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            {/* Title */}
            <Typography variant='h1' component='h1'>
              {product.title}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              {product.price}$
            </Typography>

            {/* Quantity */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Quantity</Typography>
              <ItemCounter />
              <ProductSizeSelector sizes={product.sizes} />
            </Box>

            {/* Add to Cart */}
            <Button color='secondary' className='circular-btn'>
              Add to cart
            </Button>
            {/* <Chip label='Out of stock' color='error'variant='outlined'/> */}

            {/* Description */}
            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Description</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

import { GetServerSideProps } from 'next';
import { dbProducts } from '@/database';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { product },
  };
};

export default ProductPage;
