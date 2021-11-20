import * as React from 'react'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'

export const Technologies = () => (
  <Box sx={styles.container}>
    <Typography variant='h4' sx={styles.title}>Technologies and Tools</Typography>

    <Typography sx={styles.text}>
      React, React Native, Ruby on Rails, Redux, PostgreSQL, HTML, CSS, JavaScript, Jira, Agile Methodology, Project Management, AppCenter
    </Typography>
  </Box>
)

const styles = {
  container: {
    mb: 3,
    ml: {
      xs: 0,
      sm: 2
    },
    mr: {
      xs: 0,
      sm: 2
    }
  },
  title: {
    fontFamily: 'Roboto Condensed',
    // fontWeight: 'bold',
    mb: 1
  },
  text: {
    fontFamily: 'Roboto Condensed',
    pr: 1
  }
}
