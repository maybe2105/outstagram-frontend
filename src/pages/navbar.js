import { IconButton, InputBase } from '@material-ui/core';
import React, { useContext } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import FirebaseContext from '../context/firebase';
import * as api from '../api/index';
import * as ROUTE from '../constants/route';
import { createStyles, fade, makeStyles } from '@material-ui/core/styles';
import {
  DashboardLogo,
  DashboardNav,
  DashboardNavItem,
} from './styles/dashboard';
import { Link, useHistory } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import logo from './styles/logo.png';
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
import LoggedInUserContext from '../context/logged-in-user';
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
const Navbar = () => {
  const history = useHistory();
  const classes = useStyles();
  const { setUser } = useContext(UserContext);
  const { user } = useContext(LoggedInUserContext);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <DashboardNav>
      <DashboardLogo>
        <img
          src={logo}
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          alt='logo'
          onClick={() => <Link to='/'></Link>}
        />
      </DashboardLogo>
      <div className={classes.maxSearch}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder='Search'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </div>
      <DashboardNavItem>
        <IconButton color='default'>
          <HomeRoundedIcon />
        </IconButton>
        <IconButton>
          <TelegramIcon />
        </IconButton>
        <IconButton>
          <ExploreRoundedIcon />
        </IconButton>
        <IconButton>
          <FavoriteRoundedIcon />
        </IconButton>
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
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem
                      onClick={() => {
                        localStorage.removeItem('loggedInUser');
                        localStorage.removeItem('token');
                        api
                          .logOut()
                          .then(
                            setUser({ user: null }),
                            history.push(ROUTE.LOGIN)
                          );
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          localStorage.removeItem('loggedInUser');
                          localStorage.removeItem('token');
                          api
                            .logOut()
                            .then(
                              setUser({ user: null }),
                              history.push(ROUTE.LOGIN)
                            );
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
  );
};

export default Navbar;
