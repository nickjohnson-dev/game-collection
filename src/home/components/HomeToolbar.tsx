import { Box, Container, Input } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { FC, useMemo } from 'react';

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
    <Box bg="white" p={6}>
      <Container>
        <Input
          defaultValue={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search for a game"
        />
      </Container>
    </Box>
  );
};
