import * as React from 'react'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'

export const ExperienceComponent = ({ job, company, duration, description }) => (
  <Box sx={styles.container}>
    <Typography variant='h4' sx={styles.title}>{job}</Typography>

    <Box sx={styles.row}>
      <Typography variant='h6' sx={styles.title}>{company}</Typography>

      <Typography variant='h6' sx={styles.title}>{duration}</Typography>
    </Box>

    {description.map(d => <Typography sx={styles.text}>{d}</Typography>)}
  </Box>
)

const styles = {
  container: {
    mb: 2,
    mt: {
      xs: 1,
      sm: 2
    },
    ml: {
      xs: 0,
      sm: 2
    },
    mr: {
      xs: 0,
      sm: 2
    }
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    mb: 1
  },
  title: {
    fontFamily: 'Roboto Condensed',
    // fontWeight: 'bold',
    pr: 1
  },
  text: {
    fontFamily: 'Roboto Condensed',
    textAlign: 'justify',
    mb: 2,
    pl: 1,
    pr: 1
  }
}
