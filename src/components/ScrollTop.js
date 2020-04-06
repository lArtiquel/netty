import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function ScrollTop({ children }) {
  const styles = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 30,
  });

  const handleClick = (event) => {
    const anchor = (
      event.target.ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role='presentation'
        className={styles.root}>
        <Fab
          color='secondary'
          size='small'
          aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  );
}
