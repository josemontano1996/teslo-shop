import { db, seedDb } from '@/database';
import { Product, User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  msg: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ msg: 'You have no access to this service' });
  }

  await db.connect();

  await User.deleteMany();
  await User.insertMany(seedDb.initialData.users);

  await Product.deleteMany();
  await Product.insertMany(seedDb.initialData.products);

  await db.disconnect();

  res.status(200).json({ msg: 'Seed Successful' });
}
