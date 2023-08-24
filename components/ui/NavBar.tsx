import NextLink from 'next/link';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from '@mui/material';

export const NavBar = () => {
  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' style={{ textDecoration: 'none' }}>
          <Link component='span' display='flex' alignItems='center'>
            <Typography variant='h6'>Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
