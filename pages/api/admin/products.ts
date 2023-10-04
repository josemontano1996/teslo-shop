import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import { isValidObjectId } from 'mongoose';
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
  const { _id = '', images = [] } = req.body as IProduct;
  if (!isValidObjectId(_id)) {
    return res.status(400).json({ msg: 'Product id not valid' });
  }

  if (images.length < 2) {
    return res.status(400).json({ msg: 'A minimum of 2 images is necesary' });
  }

  //TODO:
  try {
    await db.connect();
    const product = await Product.findById(_id);
    if (!product) {
      await db.disconnect();
      return res.status(400).json({ msg: 'There is no product with this id' });
    }

    //TODO: eliminar fotos en Cloudinary

    const changedProduct = await product.updateOne(req.body);

    console.log(changedProduct);

    await db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ msg: 'Check server console' });
  }
}
async function addProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  throw new Error('Function not implemented.');
}
