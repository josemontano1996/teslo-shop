import { db } from '@/database';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  msg: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'DELETE':
      return deleteProduct(req, res);

    default:
      return res.status(400).json({ msg: 'Bad request' });
  }
}

async function deleteProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    await db.connect();
    await Product.deleteOne({ _id: req.query._id });
    await db.disconnect();

    return res.status(200).json({ msg: 'Product deleted' });
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ msg: 'Check server logs' });
  }
}
