import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(18),
    right: theme.spacing(7),
  },
}));

export default function ScrollBottom({ anchorID }) {
  const styles = useStyles();

  const handleClick = (event) => {
    const anchor = (
      event.target.ownerDocument || document
    ).querySelector('#' + anchorID);

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div
      onClick={handleClick}
      role='presentation'
      className={styles.root}>
      <Fab
        color='secondary'
        size='small'
        aria-label='scroll back to bottom'>
        <ExpandMoreOutlinedIcon />
      </Fab>
    </div>
  );
}
