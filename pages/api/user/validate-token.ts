import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from '@/database';
import { User } from '@/models';
import { JWT } from '@/utils';

type Data =
  | { msg: string }
  | {
      token: string;
      user: {
        email: string;
        name: string;
        role: string;
      };
    };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return checkJWT(req, res);

    default:
      res.status(400).json({ msg: 'Bad request' });
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.cookies;

  let userId = '';

  try {
    userId = await JWT.isValidToken(token);
  } catch (error) {
    return res.status(401).json({ msg: 'Auth token is not valid' });
  }

  await db.connect();
  const user = await User.findById(userId).lean();
  await db.disconnect();

  if (!user) {
    return res.status(400).json({ msg: 'User doesnt exist' });
  }

  const { _id, email, role, name } = user;

  return res.status(200).json({
    token: JWT.signToken(_id, email),
    user: { email, role, name },
  });
};
