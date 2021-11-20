import * as React from 'react'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'

export const AboutMe = () => (
  <Box sx={styles.container}>
    <Typography variant='h5' sx={styles.title}>About Me</Typography>

    <Typography sx={styles.text}>
      I'm an easy person, communicative and responsible.
      I'm my free time I like to hang out with friends, play Padel, watch tv shows and develop small apps.
    </Typography>
  </Box>
)

const styles = {
  container: {
    width: {
      xs: '90%',
      sm: '50%',
    },
    mb: 2
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'Roboto Condensed',
    fontWeight: 'bold',
    mb: 1
  },
  text: {
    fontFamily: 'Roboto Condensed',
    textAlign: 'justify',
    pr: 1,
  }
}
