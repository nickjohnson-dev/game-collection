import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useTheme,
} from '@chakra-ui/react';
import { FC, useCallback, useEffect } from 'react';
import { RiUserFill } from 'react-icons/ri';

export type UserMenuProps = {};

export const UserMenu: FC<UserMenuProps> = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const theme = useTheme();

  const handleLogin = useCallback(() => {
    loginWithRedirect();
  }, []);

  const handleLogout = useCallback(() => {
    logout({ returnTo: window.location.origin });
  }, []);

  return (
    <div>
      <Menu placement="bottom-end">
        <MenuButton
          _hover={{ border: `1px solid ${theme.colors.gray[600]}` }}
          aria-label="User menu"
          as={Avatar}
          h="40px"
          w="40px"
          name={user?.name}
          src={user?.picture}
          sx={{ border: '1px solid transparent' }}
        />
        <MenuList>
          {!isAuthenticated && (
            <MenuItem onClick={handleLogin}>Log in</MenuItem>
          )}
          {isAuthenticated && (
            <MenuItem onClick={handleLogout}>Log out</MenuItem>
          )}
        </MenuList>
      </Menu>
    </div>
  );
};
