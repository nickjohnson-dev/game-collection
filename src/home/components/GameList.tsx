import { VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { Game } from '../../models';
import { GameListItem } from './GameListItem';

export interface GameListProps {
  games: Game[];
}

export const GameList: FC<GameListProps> = ({ games }) => {
  return (
    <VStack align="flex-start" as="ul" spacing={6}>
      {games.map((game) => (
        <GameListItem game={game} key={game.id} />
      ))}
    </VStack>
  );
};
