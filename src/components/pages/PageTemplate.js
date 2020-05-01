import React from 'react'
import { withRouter } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded'
import ForumRoundedIcon from '@material-ui/icons/ForumRounded'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import MenuIcon from '@material-ui/icons/Menu'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { signOutAction } from '../../store/actions/authActions'
import { UserIsAuthenticated } from '../../utils/AuthHOC'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  ...theme.spreddable,
  root: {
    display: 'flex',
    height: '100%',
    width: '100%'
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    width: '100%',
    marginTop: theme.spacing(8),
    padding: `${theme.spacing(1)}px`,
    overflow: 'auto' // container has it's own scroll bar
  },
  nettyIcon: {
    display: 'block',
    margin: '5px auto 5px auto',
    maxWidth: 54,
    maxHeight: 54,
    borderRadius: '50%'
  }
}))

const PageTemplate = ({ page, children, signOut }) => {
  const styles = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const history = useHistory()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const navigateTo = (url) => {
    history.replace(url)
  }

  const drawer = (
    <>
      <div className={styles.toolbar}>
        <img
          className={styles.nettyIcon}
          alt="Netty"
          src={`${process.env.PUBLIC_URL}img/netty.png`}
        />
      </div>
      <Divider />
      <List>
        <ListItem button key="Profile" onClick={() => navigateTo('/profile')}>
          <ListItemIcon>
            <PersonRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button key="Messages" onClick={() => navigateTo('/messages')}>
          <ListItemIcon>
            <ForumRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="Sign out" onClick={signOut}>
          <ListItemIcon>
            <ExitToAppRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </ListItem>
      </List>
    </>
  )

  return (
    <div className={styles.root}>
      <AppBar position="fixed" className={styles.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {page}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={styles.drawer} aria-label="mailbox folders">
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: styles.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: styles.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={styles.content}>{children}</main>
    </div>
  )
}

PageTemplate.propTypes = {
  page: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  signOut: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOutAction())
  }
}

export default compose(
  withRouter,
  UserIsAuthenticated,
  connect(null, mapDispatchToProps)
)(PageTemplate)
