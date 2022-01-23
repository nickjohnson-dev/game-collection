import { getSession } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const session = getSession(req, res);
  console.log({ user: session?.user });
  res.status(200).json({ name: 'John Doe' });
}
