import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import ScrollTop from '../components/ScrollTop';

import TextField from '@material-ui/core/TextField';
import SendOutlined from '@material-ui/icons/SendOutlined';
import Button from '@material-ui/core/Button';

export default function Messages(props) {
  return (
    <>
      <Container>
        <Grid container direction='column-reverse'>
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='center'
            spacing={3}>
            <Grid item xs={11}>
              <TextField
                id='messageInput'
                type='text'
                autofocus
                fullWidth
                margin='dense'
                multiline
                placeholder='Type something...'
                rowsMax={3}
              />
            </Grid>
            <Grid item xs={1}>
              <Button variant='outlined'>
                <SendOutlined />
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' spacing={1}>
            <Grid item xs={12}>
              <Paper>jffjfj kfkfkfk fkfk</Paper>
            </Grid>
          </Grid>
        </Grid>
        <ScrollTop />
      </Container>
    </>
  );
}
