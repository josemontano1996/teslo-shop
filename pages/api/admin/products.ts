import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { msg: string } | IProduct[] | IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'PUT':
      return updateProduct(req, res);
    case 'POST':
      return addProduct(req, res);

    default:
      return res.status(400).json({ msg: 'Bad request' });
  }
}
async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect();
  const products = await Product.find().sort({ title: 'asc' }).lean();
  await db.disconnect();

  //TODO : update images

  return res.status(200).json(products);
}

async function updateProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  throw new Error('Function not implemented.');
}

async function addProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  throw new Error('Function not implemented.');
}
