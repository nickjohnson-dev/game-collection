import { useUser } from '@auth0/nextjs-auth0';
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useTheme,
} from '@chakra-ui/react';
import { FC } from 'react';

export type UserMenuProps = {};

export const UserMenu: FC<UserMenuProps> = () => {
  const { user } = useUser();
  const theme = useTheme();

  return (
    <div>
      <Menu placement="bottom-end">
        <MenuButton
          _hover={{ border: `1px solid ${theme.colors.gray[600]}` }}
          aria-label="User menu"
          as={Avatar}
          h="40px"
          w="40px"
          name={user?.name || undefined}
          src={user?.picture}
          sx={{ border: '1px solid transparent' }}
        />
        <MenuList>
          {!user && (
            <MenuItem as="a" href="/api/auth/login">
              Log in
            </MenuItem>
          )}
          {!!user && (
            <MenuItem as="a" href="/api/auth/logout">
              Log out
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </div>
  );
};
