import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import igdb from 'igdb-api-node';
import type { NextPage } from 'next';
import Head from 'next/head';
import { FC } from 'react';

export interface Cover {
  url: string;
}

export interface Game {
  cover?: Cover;
  id: number;
  name: string;
}

export interface HomeProps {
  games: Game[];
}

const GamesItem: FC<{ game: Game }> = ({ game }) => (
  <Box as="li" sx={{ listStyleType: 'none' }}>
    <HStack spacing={6}>
      <Image alt={game.name} src={game.cover?.url}></Image>
      <Text>{game.name}</Text>
    </HStack>
  </Box>
);

const Home: NextPage<HomeProps> = (props) => {
  const { games } = props;

  console.log({ games });

  return (
    <Box bg="white" px={4} py={6}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack align="flex-start" as="ul" spacing={4}>
        {games.map((game) => (
          <GamesItem game={game} key={game.id} />
        ))}
      </VStack>
    </Box>
  );
};

export async function getServerSideProps() {
  const res = await igdb(process.env.TWITCH_CLIENT_ID, process.env.IGDB_TOKEN)
    .fields('cover.*,id,name')
    .search('Ys')
    .limit(50)
    .request('/games');

  console.log({ data: res.data });

  return {
    props: {
      games: res.data,
    },
  };
}

export default Home;
