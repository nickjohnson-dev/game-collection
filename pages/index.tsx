import { Box, Container } from '@chakra-ui/react';
import { isString } from 'lodash';
import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useCallback } from 'react';

import { Game, GameList, getGames, HomeToolbar } from '../src';

export interface HomeProps {
  games: Game[];
  searchQuery: string;
}

const Home: NextPage<HomeProps> = (props) => {
  const { games, searchQuery } = props;
  const router = useRouter();

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
    <Box bg="gray.100" minH="100vh">
      <Head>
        <title>Game Collection</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeToolbar
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
      />
      <Box minH="100%" p={6}>
        <Container>
          <GameList games={games} />
        </Container>
      </Box>
    </Box>
  );
};

export async function getServerSideProps({ query }: NextPageContext) {
  const searchQuery = isString(query.search) ? query.search : '';

  try {
    const games = await getGames({
      searchQuery,
    });

    return {
      props: {
        games,
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
