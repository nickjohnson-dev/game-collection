import { Box, Container, HStack, Input } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { FC, useMemo } from 'react';

import { UserMenu } from './UserMenu';

type HomeToolbarOnSearchQueryChange = (searchQuery: string) => void;

export interface HomeToolbarProps {
  onSearchQueryChange: HomeToolbarOnSearchQueryChange;
  searchQuery: string;
}

export const HomeToolbar: FC<HomeToolbarProps> = (props) => {
  const { onSearchQueryChange, searchQuery } = props;

  const handleSearchQueryChange = useMemo(
    () =>
      debounce((e) => {
        onSearchQueryChange(e.target.value);
      }, 100),
    [onSearchQueryChange],
  );

  return (
    <Box bg="white" p={4}>
      <Container>
        <HStack spacing={4}>
          <Input
            defaultValue={searchQuery}
            onChange={handleSearchQueryChange}
            placeholder="Search for a game"
          />
          <UserMenu />
        </HStack>
      </Container>
    </Box>
  );
};
