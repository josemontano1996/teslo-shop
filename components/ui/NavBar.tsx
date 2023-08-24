import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

export const NavBar = () => {
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
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NextLink href='/category/men'>
            <Link component='span'>
              <Button>Men</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women'>
            <Link component='span'>
              <Button>Women</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kids'>
            <Link component='span'>
              <Button>Kids</Button>
            </Link>
          </NextLink>
        </Box>
        <Box flex={1} />
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <NextLink href='/cart'>
          <Link component='span'>
            <IconButton>
              <Badge badgeContent={2} color='secondary'>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
