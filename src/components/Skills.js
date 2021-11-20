import * as React from 'react'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
// import Dot from '@mui/icons-material/FiberManualRecord'

export const Skills = () => (
  <Box sx={styles.container}>
    <Typography variant='h5' sx={styles.title}>Skills</Typography>

    <Box sx={styles.row}>
      <Typography variant='subtitle1' sx={styles.title}>Project Management</Typography>

      <Rating rate={6} />
    </Box>

    <Box sx={styles.row}>
      <Typography variant='subtitle1' sx={styles.title}>Problem Solving</Typography>

      <Rating rate={7} />
    </Box>

    <Box sx={styles.row}>
      <Typography variant='subtitle1' sx={styles.title}>Code Development</Typography>

      <Rating rate={8} />
    </Box>

    <Box sx={styles.row}>
      <Typography variant='subtitle1' sx={styles.title}>Teamwork</Typography>

      <Rating rate={8} />
    </Box>

    <Box sx={styles.row}>
      <Typography variant='subtitle1' sx={styles.title}>English</Typography>

      <Rating rate={7} />
    </Box>
  </Box>
)

// const Rating = ({ rate }) => (
//   <Box>
//     {[...Array(5).keys()].map((i) => (
//       <Dot sx={{ color: i+1 <= rate ? 'white' : 'black' }} />
//     ))}
//   </Box>
// )

const Rating = ({ rate }) => (
  <Box>
    <Typography sx={styles.text}>{`${rate} / 10`}</Typography>
  </Box>
)

const styles = {
  container: {
    width: {
      xs: '100%',
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
    fontWeight: 'bold'
  },
  text: {
    fontFamily: 'Roboto Condensed',
  }
}
