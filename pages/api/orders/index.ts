import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { Order, Product } from '@/models';
import { db } from '@/database';

import { IOrder } from '@/interfaces';

type Data = { msg: string } | IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);
    default:
      return res.status(400).json({ msg: 'Bad request' });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder;

  const session: any = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ msg: 'Must be authenticated for doing this action' });
  }

  const productsIds = orderItems.map((p) => p._id);
  await db.connect();
  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {
    //checking if client and db prices match
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find((p) => p.id === current._id)?.price;
      if (!currentPrice) {
        throw new Error('Verify your cart again, product doesnt exist');
      }

      return currentPrice * current.quantity + prev;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE) || 0;
    const backendTotal = subTotal * (taxRate + 1);
    if (total !== backendTotal) {
      throw new Error('Total price doesnt match');
    }

    const userId = session.user._id;

    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
  
    await newOrder.save();
    await db.disconnect();

    return res.status(201).json(newOrder);
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    return res.status(400).json({ msg: error.message || 'Check server logs' });
  }
};
