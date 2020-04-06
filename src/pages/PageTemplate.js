import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  ...theme.spreddable,
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer({ page, children }) {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.root}>
      <AppBar
        position='fixed'
        className={clsx(styles.appBar, {
          [styles.appBarShift]: open,
        })}>
        <Toolbar id='back-to-top-anchor'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(styles.menuButton, {
              [styles.hide]: open,
            })}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            {page}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(styles.drawer, {
          [styles.drawerOpen]: open,
          [styles.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [styles.drawerOpen]: open,
            [styles.drawerClose]: !open,
          }),
        }}>
        <div className={styles.toolbar}>
          <img
            className={styles.icon}
            alt='Netty'
            src={process.env.PUBLIC_URL + 'img/netty.png'}
          />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key='Profile'>
            <ListItemIcon>
              <PersonRoundedIcon />
            </ListItemIcon>
            <ListItemText primary='Profile' />
          </ListItem>
          <ListItem button key='Messages'>
            <ListItemIcon>
              <ForumRoundedIcon />
            </ListItemIcon>
            <ListItemText primary='Messages' />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key='Sign out'>
            <ListItemIcon>
              <ExitToAppRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={'Sign out'} />
          </ListItem>
        </List>
      </Drawer>
      <main className={styles.content}>
        <div className={styles.toolbar} />
        {children}
      </main>
    </div>
  );
}
