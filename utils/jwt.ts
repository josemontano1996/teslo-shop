import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('There is no JWT seed, check .env variables');
  }

  return jwt.sign(
    // payload
    { _id, email },
    //seed
    process.env.JWT_SECRET_SEED,
    //config
    { expiresIn: '30d' }
  );
};
