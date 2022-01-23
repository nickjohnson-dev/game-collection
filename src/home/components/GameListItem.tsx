import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import {
  Badge,
  BadgeProps,
  Box,
  HStack,
  IconButton,
  Image,
  Text,
  Tooltip,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { FC, forwardRef, useCallback, useMemo, useState } from 'react';

import { noCoverUrl } from '../../igdb';
import { Game } from '../../models';

export type GameListItemOnAdd = (game: Game) => Promise<void>;

export interface GameListItemProps {
  game: Game;
  isInCollection?: boolean;
  onAdd: GameListItemOnAdd;
}

const PlatformBadge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => (
  <Badge cursor="default" {...props} ref={ref} />
));

export const GameListItem: FC<GameListItemProps> = (props) => {
  const { game, onAdd } = props;
  const { platforms = [] } = game;
  const [isLoading, setIsLoading] = useState(false);
  const coverUrl = useMemo(
    () =>
      game.cover
        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
        : noCoverUrl,
    [game],
  );

  const handleAddClick = useCallback(async () => {
    setIsLoading(true);

    try {
      await onAdd(game);
    } finally {
      setIsLoading(false);
    }
  }, [game, onAdd]);

  return (
    <Box
      as="li"
      bg="white"
      borderRadius="md"
      p={2}
      pr={6}
      sx={{ display: 'flex', listStyleType: 'none', width: '100%' }}
    >
      <HStack spacing={4} sx={{ flex: '1 1 auto' }}>
        <div style={{ flex: '0 0 auto', height: 80, width: 60 }}>
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
        <VStack align="start" flex="1 1 auto" space={2}>
          <Text>{game.name}</Text>
          <Wrap spacing={2}>
            {platforms.slice(0, 4).map((platform) => (
              <WrapItem key={platform.id}>
                <PlatformBadge>
                  {platform.abbreviation || platform.name}
                </PlatformBadge>
              </WrapItem>
            ))}
            {platforms.length > 4 && (
              <WrapItem key="MORE_PLATFORMS">
                <Tooltip
                  label={platforms
                    .slice(4)
                    .map((platform) => platform.abbreviation || platform.name)
                    .join(', ')}
                >
                  <PlatformBadge>+ {platforms.length - 4} More</PlatformBadge>
                </Tooltip>
              </WrapItem>
            )}
          </Wrap>
        </VStack>
        <IconButton
          aria-label="Add"
          icon={game.isInCollection ? <CheckIcon /> : <AddIcon />}
          isLoading={isLoading}
          onClick={handleAddClick}
        />
      </HStack>
    </Box>
  );
};
