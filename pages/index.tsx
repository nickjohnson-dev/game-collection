import { getSession } from '@auth0/nextjs-auth0';
import { Box, Container } from '@chakra-ui/react';
import { User } from '@prisma/client';
import axios from 'axios';
import { IncomingMessage, ServerResponse } from 'http';
import { isString } from 'lodash';
import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useCallback, useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';

import { prisma } from '../lib';
import {
  Game,
  GameList,
  GameListOnGameAdd,
  getGames,
  HomeToolbar,
} from '../src';

export interface HomeProps {
  games: Game[];
  searchQuery: string;
}

const Home: NextPage<HomeProps> = (props) => {
  const { games: gamesProp, searchQuery } = props;
  const addGameToCollection = useMutation<any, any, { gameId: Game['id'] }>(
    (variables) =>
      axios.post('/api/collections/add-game', {
        gameId: variables.gameId,
      }),
  );
  const gamesQuery = useQuery(
    ['games', { searchQuery }],
    () =>
      axios
        .get(`/api/games?${qs.stringify({ searchQuery })}`)
        .then((res) => res.data),
    {
      enabled: !!searchQuery,
      initialData: gamesProp,
    },
  );
  const router = useRouter();

  const games = useMemo(() => gamesQuery?.data || [], [gamesQuery]);

  const handleGameAdd = useCallback<GameListOnGameAdd>(
    async (game) => {
      try {
        await addGameToCollection.mutateAsync({
          gameId: game.id,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [addGameToCollection],
  );

  const handleSearchQueryChange = useCallback(
    (changedSearchQuery) =>
      router.replace(
        changedSearchQuery
          ? `/?${qs.stringify({ search: changedSearchQuery })}`
          : '/',
      ),
    [router],
  );

  return (
    <Box minH="100vh">
      <Head>
        <title>Game Collection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeToolbar
        onSearchQueryChange={handleSearchQueryChange}
        searchQuery={searchQuery}
      />
      <Box minH="100%" p={4}>
        <Container>
          <GameList games={games} onGameAdd={handleGameAdd} />
        </Container>
      </Box>
    </Box>
  );
};

export async function getServerSideProps({ query, req, res }: NextPageContext) {
  const searchQuery = isString(query.search) ? query.search : '';

  try {
    const games = searchQuery ? await getGames({ searchQuery }) : [];
    const session = getSession(req as IncomingMessage, res as ServerResponse);

    if (!session) {
      return {
        props: {
          games: games.map((game) => ({
            ...game,
            isInCollection: false,
          })),
          searchQuery,
        },
      };
    }

    const user = await findOrCreateUser(session.user.sub);

    const collection = await prisma.collection.findFirst({
      include: {
        games: {
          select: {
            igdbId: true,
          },
        },
      },
      where: { userId: user.id },
    });

    return {
      props: {
        games: games.map((game) => ({
          ...game,
          isInCollection: collection?.games.some(
            ({ igdbId }) => igdbId === game.id,
          ),
        })),
        searchQuery,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        games: [],
        searchQuery,
      },
    };
  }
}

export default Home;

async function findOrCreateUser(auth0Id: string): Promise<User> {
  const user = await prisma.user.findUnique({
    where: { auth0Id },
  });

  return user
    ? user
    : await prisma.user.create({
        data: {
          auth0Id,
          collections: {
            create: {},
          },
        },
      });
}
