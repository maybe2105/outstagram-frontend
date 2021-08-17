import { Fade, IconButton, InputBase, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';

import * as api from '../api/index';
import * as ROUTE from '../constants/route';
import { createStyles, fade, makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import {
  DashboardLogo,
  DashboardNav,
  DashboardNavItem,
} from '../pages/styles/dashboard';
import { Link, useHistory } from 'react-router-dom';

import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import TelegramIcon from '@material-ui/icons/Telegram';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import UserContext from '../context/user';
const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      flexGrow: 0,

      position: 'relative',
      justifyContent: 'center',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade('#efefef', 0.15),
      margin: 'auto',
      [theme.breakpoints.up('sm')]: {
        width: 'auto',
      },
    },
    maxSearch: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '33%',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    typography: {
      marginLeft: 12,
      fontSize: 14,
    },
    inputRoot: {
      fontSize: '14px',
      height: '100%',
      margin: 'auto',
    },
    inputInput: {
      justifySelf: 'center',
      padding: '5px 10px',
      border: '2px solid #efefef',
      margin: 'auto 0px',
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: 'auto  ',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
          margin: 'auto',
        },
      },
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    small: { width: theme.spacing(3), height: theme.spacing(3) },
  })
);
const Navbar = ({ username, updated }) => {
  const history = useHistory();
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const { updateUser } = useContext(UserContext);
  const [searchList, setSearchList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const token = localStorage.getItem('token');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    const getUser = async (username) => {
      try {
        const result = await api.getUserByUserId(username);
        setUser(result.data);
      } catch (err) {
        setUser(null);
      }
    };
    getUser(username);
  }, [updateUser.user, updated]);
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  const handleSearchType = async (event) => {
    try {
      const result = await api.searchChange(event.target.value);

      setSearchList(result.data);
    } catch (err) {}
  };

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpenSearch((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  const handleCloseAnchor = () => {
    setAnchorEl(null);
    setOpenSearch(false);
  };
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return user ? (
    <DashboardNav>
      <DashboardLogo>
        <Link to='/'>
          <img
            src={process.env.PUBLIC_URL + '/logo.png'}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              marginTop: '4px',
              cursor: 'pointer',
            }}
            alt='logo'
          />
        </Link>
      </DashboardLogo>
      <div className={classes.maxSearch}>
        <Popper
          style={{ zIndex: 1000 }}
          open={openSearch}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => {
            /* searchList
              .filter((data) => data.username != user.username)
              .slice(0, 4)
              .map((data) => {
                return (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper
                      onClick={() => history.push(data.username)}
                      style={{ display: 'flex', width: '250px', height: 60 }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'left',
                          marginLeft: 12,
                        }}
                      >
                        <Avatar className={classes.small} src={data.avatar} />
                        <Typography className={classes.typography}>
                          {data.username}
                        </Typography>
                      </div>
                    </Paper>
                  </Fade>
                );
              }) */
          }}
        </Popper>
        <div className={classes.search} onClick={handleClick('bottom')}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder='Search'
            onChange={handleSearchType}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onBlur={() => handleCloseAnchor()}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </div>
      <DashboardNavItem>
        <IconButton
          color='default'
          onClick={() => {
            history.push(ROUTE.LOGIN);
          }}
        >
          <HomeRoundedIcon />
        </IconButton>
        {/* <IconButton>
          <TelegramIcon />
        </IconButton>
        <IconButton>
          <ExploreRoundedIcon />
        </IconButton>
        <IconButton>
          <FavoriteRoundedIcon />
        </IconButton> */}
        <IconButton
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup='true'
          onClick={handleToggle}
        >
          <Avatar
            alt={user.username}
            className={classes.small}
            src={user.avatar}
          />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id='menu-list-grow'
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>
                      {' '}
                      <Link to={`/${user.username}`}>Profile</Link>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        localStorage.removeItem('loggedInUser');
                        localStorage.removeItem('token');
                        api
                          .logOut()
                          .then(
                            updateUser({ user: null }),
                            history.push(ROUTE.LOGIN)
                          );
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          localStorage.removeItem('loggedInUser');
                          localStorage.removeItem('token');
                          api
                            .logOut()
                            .then(updateUser(null), history.push(ROUTE.LOGIN));
                        }
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </DashboardNavItem>
    </DashboardNav>
  ) : null;
};

export default Navbar;
