import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

export const muiTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: { main: '#009688' },
      secondary: { main: '#d32f2f' }
    },
    spreddable: {}
  })
)
