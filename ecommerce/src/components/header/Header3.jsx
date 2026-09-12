import { useState } from 'react';
import {
  Box,
  Container,
  Drawer,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';


const Header3 = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [recommendationsAnchorEl, setRecommendationsAnchorEl] = useState(null);
  const recommendationsOpen = Boolean(recommendationsAnchorEl);

  const handleRecommendationsClick = (event) => {
    setRecommendationsAnchorEl(event.currentTarget);
  };

  const handleRecommendationsClose = () => {
    setRecommendationsAnchorEl(null);
  };

  const theme = useTheme();
  const location = useLocation();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const getButtonStyle = (path) => ({
    textTransform: 'none',
    color: location.pathname === path ? theme.palette.primary.main : '#2B3445',
    ...(path === '/recommendations' && { width: '100%' })
  });

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mt: 5,
      }}
    >

      {useMediaQuery('(min-width:1200px)') && (
        <Stack gap={4} direction={'row'} alignItems={'center'}>
          <Button component={RouterLink} to="/" sx={getButtonStyle('/')}>
            Home
          </Button>
          <Button component={RouterLink} to="/main" sx={getButtonStyle('/main')}>
            Products
          </Button>
          <Box>
            <Button sx={getButtonStyle('/recommendations')} onClick={handleRecommendationsClick}>
              Recommendations
            </Button>
            <Menu
              anchorEl={recommendationsAnchorEl}
              open={recommendationsOpen}
              onClose={handleRecommendationsClose}
            >
              <MenuItem
                component={RouterLink}
                to="/popularitems"
                onClick={handleRecommendationsClose}
                sx={getButtonStyle('/popularitems')}
              >
                Popular Items
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/newuserRecommendations"
                onClick={handleRecommendationsClose}
                sx={getButtonStyle('/newuserRecommendations')}
              >
                New User Recommendations
              </MenuItem>
            </Menu>
          </Box>
          <Button component={RouterLink} to="/contact-us" sx={getButtonStyle('/contact-us')}>
            Contact Us
          </Button>
          <Button component={RouterLink} to="/about-us" sx={getButtonStyle('/about-us')}>
            About Us
          </Button>
        </Stack>
      )}

      {useMediaQuery('(max-width:1200px)') && (
        <IconButton onClick={toggleDrawer('left', true)}>
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
        sx={{
          '.MuiPaper-root': {
            height: '100%',
            width: '300px',
          },
        }}
      >
        <Box
          sx={{ width: 300, mx: 'auto', mt: 1, position: 'relative', pt: 10 }}
        >
          <IconButton
            sx={{
              ':hover': { color: 'red', rotate: '180deg', transition: '0.3s' },
              position: 'absolute',
              top: 0,
              right: 10,
            }}
            onClick={toggleDrawer('left', false)}
          >
            <Close />
          </IconButton>

          <Stack spacing={2}>
            <Button component={RouterLink} to="/" sx={getButtonStyle('/')}>
              Home
            </Button>
            <Button component={RouterLink} to="/main" sx={getButtonStyle('/main')}>
              Products
            </Button>
            <Box>
              <Button sx={getButtonStyle('/recommendations')} onClick={handleRecommendationsClick}>
                Recommendations
              </Button>
              <Menu
                anchorEl={recommendationsAnchorEl}
                open={recommendationsOpen}
                onClose={handleRecommendationsClose}
              >
                <MenuItem
                  component={RouterLink}
                  to="/popularitems"
                  onClick={handleRecommendationsClose}
                  sx={getButtonStyle('/popularitems')}
                >
                  Popular Items
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to="/newuserRecommendations"
                  onClick={handleRecommendationsClose}
                  sx={getButtonStyle('/newuserRecommendations')}
                >
                  New User Recommendations
                </MenuItem>
              </Menu>
            </Box>
            <Button component={RouterLink} to="/contact-us" sx={getButtonStyle('/contact-us')}>
              Contact Us
            </Button>
            <Button component={RouterLink} to="/about-us" sx={getButtonStyle('/about-us')}>
              About Us
            </Button>
            <Button component={RouterLink} to="/" sx={getButtonStyle('/about-us')}>
              logout
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </Container>
  );
};

export default Header3;
