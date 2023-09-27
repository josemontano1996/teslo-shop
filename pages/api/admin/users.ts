import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { User } from '@/models';
import { IUser } from '../../../interfaces/User';

type Data = { msg: string } | IUser[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getUsers(req, res);

    case 'PUT':
      return updateUser(req, res);
    default:
      return res.status(400).json({ msg: 'Bad request' });
  }
}

async function getUsers(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect();
  const users = await User.find().select('-password').lean();
  await db.disconnect();

  return res.status(200).json(users);
}

async function updateUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { userId = '', role = '' } = req.body;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ msg: 'User Id doesnt exist' });
  }

  const validRoles = ['admin', 'super-user', 'SEO', 'client'];

  if (!validRoles.includes(role)) {
    return res.status(400).json({ msg: 'Role not valid' + validRoles.join(',') });
  }

  await db.connect();
  const user = await User.findById(userId);
  if (!user) {
    await db.connect();
    return res.status(404).json({ msg: 'User not found' });
  }

  user.role = role;
  await user.save();
  await db.disconnect();

  return res.status(200).json({ msg: 'User updated' });
}
