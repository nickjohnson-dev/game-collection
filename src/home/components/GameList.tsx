import { VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { Game } from '../../models';
import { GameListItem } from './GameListItem';

type GameListGetIsInCollection = (game: Game) => boolean;

export interface GameListProps {
  games: Game[];
  getIsInCollection: GameListGetIsInCollection;
}

export const GameList: FC<GameListProps> = ({ games, getIsInCollection }) => {
  return (
    <VStack align="flex-start" as="ul" spacing={4}>
      {games.map((game) => (
        <GameListItem
          game={game}
          isInCollection={getIsInCollection(game)}
          key={game.id}
        />
      ))}
    </VStack>
  );
};
