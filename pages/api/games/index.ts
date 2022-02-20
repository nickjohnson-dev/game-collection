import type { NextApiRequest, NextApiResponse } from 'next';

import { Game, getGames } from '../../../src';

interface Query {
  searchQuery?: string;
}

type Data = Game[];

export default async function handler(
  req: NextApiRequest & { query?: Query },
  res: NextApiResponse<Data>,
) {
  const searchQuery = req?.query?.searchQuery || '';
  const games = await getGames({ searchQuery });

  return res.json(games);
}
