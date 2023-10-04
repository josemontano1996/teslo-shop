import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';
import fs from 'fs';

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

const saveFile = async (file: File) => {
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/${file.originalFilename}`, data);
  fs.unlinkSync(file.filepath);
  return;
};

const parseFiles = async (req: NextApiRequest) => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      console.log(err, fields, files);

      if (err) {
        return reject(err);
      }

      await saveFile(files.file![0] as File);
      resolve(true);
    });
  });
};

async function updloadImages(req: NextApiRequest, res: NextApiResponse<Data>) {
  await parseFiles(req);

  return res.status(200).json({ msg: 'Images uploaded' });
}
