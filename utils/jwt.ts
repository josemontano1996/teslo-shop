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

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('There is no JWT seed, check .env variables');
  }

  if (token.length <= 10) {
    return Promise.reject('JWT is not valid');
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
        if (err) return reject('JWT is not valid');

        const { _id } = payload as { _id: string };

        resolve(_id);
      });
    } catch (error) {
      return reject('JWT is not valid');
    }
  });
};
