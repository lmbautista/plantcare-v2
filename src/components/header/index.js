import { useState } from 'react';
import PropTypes from 'prop-types';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useLocation, useResolvedPath, useMatch, Link } from 'react-router-dom';

import LogoImg from '../../images/logo.png';
import profileImg from './images/user-profile.png';
// UI components
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
// Components
import CustomLink from '../custom-link';
import CustomAnchorLink from '../custom-anchor-link';
// Others
import enLocale from './locales/en.js';
import routes from '../../routes';
import sections from './sections.js';
import pages from './pages.js';

export const Header = ({ userLogged, userProfile, signOutHandler }) => {
  const allowedSections = userLogged ? sections.logged : sections.public;
  const allowedPages = userLogged ? pages.logged : pages.public;

  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const [sectionSelected, setSectionSelected] = useState(null);
  const location = useLocation().pathname;
  const currentSections = allowedSections[location] || [];

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const color = 'primary';

  const profileMenu = () => {
    const links = [
      { title: enLocale.profile, onClick: () => {} },
      { title: enLocale.signout, onClick: signOutHandler }
    ];

    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={`${userProfile && userProfile.user}`} src={profileImg} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {links.map((link) => (
            <MenuItem key={link.title} onClick={handleCloseUserMenu}>
              <Typography textAlign="center" onClick={link.onClick}>
                {link.title}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  };

  const logo = () => {
    if (currentSections.length > 0) {
      return (
        <AnchorLink
          key="link-home"
          href="#home"
          offset="64"
          onClick={() => setSectionSelected(null)}
          style={{ textDecoration: 'none' }}
        >
          <img src={LogoImg} alt="logo" width="50px" />
        </AnchorLink>
      );
    } else {
      return (
        <Link to={routes.home}>
          <img src={LogoImg} alt="logo" width="50px" />
        </Link>
      );
    }
  };

  const menu = () => {
    const pagesMenu = allowedPages.map((page) => {
      const { id, title, path: to } = page;
      const resolved = useResolvedPath(to);
      const match = useMatch({ path: resolved.pathname, end: true });
      const linkProps = {
        title,
        to,
        active: !!match,
        onClickHandler: () => setSectionSelected(null),
        color
      };

      return <CustomLink key={`link-${id}`} {...linkProps} />;
    });

    const sectionsMenu = currentSections.map((section) => {
      const { id, title, path: to } = section;
      const linkProps = {
        id,
        title,
        to,
        active: sectionSelected === id,
        onClickHandler: () => setSectionSelected(id),
        color
      };

      return <CustomAnchorLink key={`anchor-link-${id}`} {...linkProps} />;
    });

    return sectionsMenu.concat(pagesMenu);
  };

  return (
    <AppBar position="fixed" color="light" elevation={0} data-testid="header">
      <Toolbar disableGutters sx={{ padding: { xs: '0', md: '0px 40px' } }}>
        <Box sx={{ flexGrow: 1, padding: '5.5px 0', display: { xs: 'none', md: 'flex' } }}>
          {logo()}
        </Box>
        <Box sx={{ flexGrow: 1, flex: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="appbar menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color={color}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' }
            }}
          >
            {currentSections.map((section) => (
              <MenuItem key={section.id} onClick={handleCloseNavMenu}>
                <AnchorLink
                  offset="64"
                  key={`link-${section.id}`}
                  href={section.path}
                  onClick={() => setSectionSelected(section.id)}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    textAlign="center"
                    color={color}
                    sx={{ fontWeight: sectionSelected === section.id ? 'bold' : 'medium' }}
                  >
                    {section.title}
                  </Typography>
                </AnchorLink>
              </MenuItem>
            ))}
            {allowedPages.map((page) => (
              <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                <Link
                  offset="64"
                  key={`link-${page.id}`}
                  to={page.path}
                  onClick={() => setSectionSelected(page.id)}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    textAlign="center"
                    color={color}
                    sx={{ fontWeight: sectionSelected === page.id ? 'bold' : 'medium' }}
                  >
                    {page.title}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="right"
          alignItems="right"
          sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
        >
          {menu()}
          {userLogged && profileMenu()}
        </Stack>
        <Box sx={{ flexGrow: 1, padding: '5.5px 0', display: { xs: 'flex', md: 'none' } }}>
          {logo()}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

Header.propTypes = {
  userLogged: PropTypes.bool,
  userProfile: PropTypes.object,
  signOutHandler: PropTypes.func
};

Header.defaultProps = {
  userLogged: false,
  userProfile: {},
  signOutHandler: () => {}
};
