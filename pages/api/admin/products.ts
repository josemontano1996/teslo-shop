import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import { db } from '@/database';
import { Product } from '@/models';
import { IProduct } from '@/interfaces';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

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


  try {
    await db.connect();
    const product = await Product.findById(_id);
    if (!product) {
      await db.disconnect();
      return res.status(400).json({ msg: 'There is no product with this id' });
    }

    //Deleting photo from cloudinary
    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        //delete from cloudinary
        const [fileId, extension] = image.substring(image.lastIndexOf('/') + 1).split('.');

        await cloudinary.uploader.destroy(fileId);
      }
    });

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
  const { images = [] } = req.body as IProduct;

  if (images.length < 2) {
    return res.status(400).json({ msg: 'A minimum of 2 images is necesary' });
  }

  try {
    await db.connect();
    const productInDb = await Product.findOne({ slug: req.body.slug });
    if (productInDb) {
      await db.disconnect();
      return res.status(400).json({ msg: 'Slug already exists in Db' });
    }

    const product = new Product(req.body);
    await product.save();
    await db.disconnect();

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ msg: 'Check server logs' });
  }
}
