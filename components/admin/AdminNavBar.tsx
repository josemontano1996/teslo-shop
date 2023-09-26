import { useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link } from '@mui/material';

import { UIContext } from '@/context';

export const AdminNavBar = () => {
  const { toggleSideMenu } = useContext(UIContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/'>
          <Link component='span' display='flex' alignItems='center'>
            <Typography variant='h6'>Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Button onClick={toggleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
