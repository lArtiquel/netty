import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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
              <Box my={1}>
                <Paper variant='outlined'>
                  <Box display='flex' pl={2} py={1} boxShadow={4}>
                    <Avatar alt='UserNameHere' src='HereUserPic' />
                    <Box flexGrow={1} px={1}>
                      {x} -- Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Quam, accusamus, obcaecati
                      beatae corrupti reprehenderit necessitatibus
                      corporis atque sed excepturi nam veritatis
                      delectus iste vel, hic nobis animi eos molestiae
                      quis.
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </li>
          );
        }
      )}
    </ul>
  );
};
