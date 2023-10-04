import { NextPage, GetServerSideProps } from 'next';
import { Box, Typography } from '@mui/material';

import { ProductList, ShopLayout } from '@/components';
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}
const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  console.log(products);
  return (
    <ShopLayout
      title={'Teslo-Shop - Search'}
      pageDescription={'Search the best Teslo products here'}
    >
      <Typography variant='h1' component='h1'>
        Search product
      </Typography>
      {foundProducts ? (
        <Typography variant='h2' sx={{ my: 1 }} textTransform='capitalize'>
          Search results for {query}
        </Typography>
      ) : (
        <Box display='flex'>
          <Typography variant='h2' sx={{ mb: 1 }}>
            We could find any product for you query
          </Typography>
          <Typography variant='h2' sx={{ ml: 1 }} color='secondary' textTransform='capitalize'>
            {query}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  let products = await dbProducts.getProducstByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: { products, foundProducts, query },
  };
};

export default SearchPage;
