import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Message from './Message';

const useStyles = makeStyles((theme) => ({
  noBulletPoints: {
    padding: '0px',
    '& li': {
      'list-style-type': 'none',
    },
  },
}));

export default ({ anchorID }) => {
  const styles = useStyles();
  return (
    <ul className={styles.noBulletPoints}>
      {[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10].map(
        (x, index, array) => {
          return (
            <li
              key={Math.random() * 1010010}
              id={index === array.length - 1 ? anchorID : undefined}>
              <Message />
            </li>
          );
        }
      )}
    </ul>
  );
};
