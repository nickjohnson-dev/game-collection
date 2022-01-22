import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { FC, useMemo } from 'react';

import { noCoverUrl } from '../../igdb';
import { Game } from '../../models';

export interface GameListItemProps {
  game: Game;
}

export const GameListItem: FC<GameListItemProps> = (props) => {
  const { game } = props;

  const coverUrl = useMemo(
    () =>
      game.cover
        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
        : noCoverUrl,
    [game],
  );

  return (
    <Box as="li" sx={{ display: 'flex', listStyleType: 'none', width: '100%' }}>
      <HStack spacing={4} sx={{ flex: '1 1 auto' }}>
        <div style={{ height: 80, width: 60 }}>
          <Image
            alt={game.name}
            src={coverUrl}
            sx={{
              height: '100%',
              objectFit: 'contain',
              width: '100%',
            }}
          />
        </div>
        <VStack space={2}>
          <Text>{game.name}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};
