import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import ScrollTop from '../../components/ScrollTop';
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

export default function ChatContainer() {
  const styles = useStyles();

  return (
    <Box
      height={1}
      width={1}
      display='flex'
      alignItems='flex-start'
      px={1}
      border={1}
      borderColor='primary.dark'
      borderRadius={8}
      overflow='auto'>
      <ul className={styles.noBulletPoints}>
        {[5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => {
          return (
            <li key={Math.random() * 1010010}>
              <Box my={1}>
                <Paper variant='outlined'>
                  <Box display='flex' pl={2} py={1} boxShadow={1}>
                    <Avatar alt='UserNameHere' src='HereUserPic' />
                    <Box flexGrow={1} px={1}>
                      Lorem ipsum dolor sit amet consectetur
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
        })}
      </ul>
      <ScrollTop />
    </Box>
  );
}
