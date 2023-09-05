import { Product } from '@/models';
import { db } from '.';
import { IProduct } from '@/interfaces';

export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return null;
  }

  //the JSON parse is used to serialize some data, for example dates and _id
  return JSON.parse(JSON.stringify(product));
};

interface ProductSlug {
  slug: string;
}

export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
  await db.connect();
  const slugs = await Product.find().select('slug -_id').lean();
  await db.disconnect();

  return slugs;
};

export const getProducstByTerm = async (term: string): Promise<IProduct[]> => {
  term.toString().toLowerCase();

  await db.connect();
  const products = await Product.find({ $text: { $search: term } })
    .select('title images price inStock -_id')
    .lean();
  await db.disconnect();

  return products;
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  await db.connect();
  const products = await Product.find().limit(40).select('title images price inStock -_id');
  await db.disconnect();

  return JSON.parse(JSON.stringify(products));
}; 
