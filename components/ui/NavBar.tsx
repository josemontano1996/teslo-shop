import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { CartContext, UIContext } from '@/context';

export const NavBar = () => {
  const { pathname, push } = useRouter();
  const { toggleSideMenu } = useContext(UIContext);
  const { numberOfItems } = useContext(CartContext);

  const useColor = (category: String) => {
    return pathname === `/category/${category}` ? 'primary' : 'info';
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

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
        <Box
          sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
          className='fadeIn'
        >
          <NextLink href='/category/men'>
            <Link component='span'>
              <Button color={useColor('men')}>Men</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women'>
            <Link component='span'>
              <Button color={useColor('women')}>Women</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kid'>
            <Link component='span'>
              <Button color={useColor('kid')}>Kids</Button>
            </Link>
          </NextLink>
        </Box>
        <Box flex={1} />
        {/* big display */}

        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            className='fadeIn'
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
            type='text'
            placeholder='Search...'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            className='fadeIn'
            onClick={() => setIsSearchVisible(true)}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            <SearchOutlined />
          </IconButton>
        )}
        <IconButton sx={{ display: { xs: 'block', sm: 'none' } }} onClick={toggleSideMenu}>
          <SearchOutlined />
        </IconButton>
        <NextLink href='/cart'>
          <Link component='span'>
            <IconButton>
              <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color='secondary'>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button onClick={toggleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
