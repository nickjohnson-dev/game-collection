import { VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { Game } from '../../models';
import { GameListItem, GameListItemOnAdd } from './GameListItem';

type GameListGetIsInCollection = (game: Game) => boolean;

export type GameListOnGameAdd = GameListItemOnAdd;

export interface GameListProps {
  games: Game[];
  onGameAdd: GameListOnGameAdd;
}

export const GameList: FC<GameListProps> = ({ games, onGameAdd }) => {
  return (
    <VStack align="flex-start" as="ul" spacing={4}>
      {games.map((game) => (
        <GameListItem game={game} key={game.id} onAdd={onGameAdd} />
      ))}
    </VStack>
  );
};
