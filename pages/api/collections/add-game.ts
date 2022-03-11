import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Collection } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib';

interface Body {
  gameId: number;
}

type Data = { collection: Collection } | string;

export default withApiAuthRequired(async function handler(
  req: NextApiRequest & { body: Body },
  res: NextApiResponse<Data>,
) {
  const gameId = parseInt(req.body.gameId, 10);
  const session = getSession(req, res);
  const user = await prisma.user.findUnique({
    where: {
      auth0Id: session?.user?.sub,
    },
  });

  const collection = await prisma.collection.findFirst({
    include: {
      games: true,
    },
    where: { userId: user?.id },
  });

  if (collection === null) {
    res.status(404);
    res.end();
  }

  console.log({ gameId, g: collection?.games[0] });

  if (collection?.games.some((game) => game.igdbId === gameId)) {
    res.status(409).send('Game already in collection');
  }

  const updatedCollection = await prisma.collection.update({
    data: {
      games: {
        create: [
          {
            igdbId: gameId,
          },
        ],
      },
    },
    where: { id: collection?.id },
  });

  if (!updatedCollection) {
    res.status(500);
    res.end();
  }

  res.status(200).json({
    collection: updatedCollection,
  });
});
