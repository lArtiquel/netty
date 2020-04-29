import React from 'react'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

export default () => {
  return (
    <Box my={1}>
      <Paper variant="outlined">
        <Box display="flex" flexDirection="row" px={2} py={1} boxShadow={4}>
          <Avatar alt="UserNameHere" src="HereUserPic" />
          <Box display="flex" flexDirection="column" flexGrow={1} px={2}>
            <Box display="flex" flexDirection="row">
              <Box
                display="flex"
                flexDirection="row"
                flexGrow={1}
                color="#90caf9"
              >
                <Typography variant="subtitle2" gutterBottom>
                  First Second
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row-reverse"
                flexGrow={1}
                alignItems="center"
                color="grey.600"
              >
                <Typography variant="subtitle2" gutterBottom>
                  01.01.2020 3:30 PM
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="row" color="grey.300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
              accusamus, obcaecati beatae corrupti reprehenderit necessitatibus
              corporis atque sed excepturi nam veritatis delectus iste vel, hic
              nobis animi eos molestiae quis.
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
