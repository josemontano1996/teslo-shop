import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = {
  msg: string;
};

//telling next not to parse the body
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return updloadImages(req, res);

    default:
      return res.status(400).json({ msg: 'Bad request' });
  }
}

const saveFile = async (file: File): Promise<string> => {
  const { secure_url } = await cloudinary.uploader.upload(file.filepath);
  return secure_url;

  /*   
 //Saving file in fs
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/${file.originalFilename}`, data);
  fs.unlinkSync(file.filepath);
  return; */
};

const parseFiles = async (req: NextApiRequest): Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      /*  console.log(err, fields, files); */

      if (err) {
        return reject(err);
      }

      const filePath = await saveFile(files.file![0] as File);
      resolve(filePath);
    });
  });
};

async function updloadImages(req: NextApiRequest, res: NextApiResponse<Data>) {
  const imageUrl = await parseFiles(req);

  return res.status(200).json({ msg: imageUrl });
}
