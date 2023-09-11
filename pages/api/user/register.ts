import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from '@/database';
import { User } from '@/models';
import { JWT, validations } from '@/utils';

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
    case 'POST':
      return registerUser(req, res);

    default:
      res.status(400).json({ msg: 'Bad request' });
  }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    email = '',
    password = '',
    name = '',
  } = req.body as { email: string; password: string; name: string };

  if (password.length < 6) {
    return res.status(400).json({ msg: 'Password must have more than 6 characters' });
  }

  if (name.length < 2) {
    return res.status(400).json({ msg: 'The name lenght must be over 2 letters' });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({ msg: 'Email not valid' });
  }

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ msg: 'Email already in use' });
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Check server logs' });
  }

  const { _id, role } = newUser;

  const token = JWT.signToken(_id, email);

  return res.status(200).json({
    token,
    user: { email, role, name },
  });
};
