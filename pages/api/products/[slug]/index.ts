import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | {
      msg: string;
    }
  | IProduct;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res);

    default:
      return res.status(400).json({ msg: 'Bad request' });
  }
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { slug } = req.query;

  await db.connect();
  const product = await Product.findOne({ slug: slug }).lean();

  if (!product) {
    return res.status(404).json({ msg: 'Product not found in database' });
  }

  await db.disconnect();

  res.status(200).json(product);
};
