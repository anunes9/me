import * as React from 'react'
import { Link, Typography } from '@mui/material'
import { Box } from '@mui/system'
import PhoneIcon from '@mui/icons-material/LocalPhone'
import MailIcon from '@mui/icons-material/MailOutline'
import ComputerIcon from '@mui/icons-material/Computer'
import CityIcon from '@mui/icons-material/LocationCity'

export const Information = () => (
  <Box sx={styles.container}>
    <Box sx={styles.item}>
      <PhoneIcon />

      <Typography sx={styles.text}>915238870</Typography>
    </Box>

    <Box sx={styles.item}>
      <MailIcon />
      
      <Typography sx={styles.text}>andrenunes.work@gmail.com</Typography>
    </Box>

    <Box sx={styles.item}>
      <ComputerIcon />
      
      <Link href="anunes9.github.io/me" color="inherit" underline="hover">
        <Typography sx={styles.text}>anunes9.github.io/me</Typography>
      </Link>
    </Box>

    <Box sx={styles.item}>
      <CityIcon />

      <Box>
        <Typography sx={styles.text}>Oeiras, Lisboa</Typography>
        <Typography sx={styles.text}>Portugal</Typography>
      </Box>
    </Box>
  </Box>
)

const styles = {
  text: {
    fontFamily: 'Roboto Condensed',
    // fontWeight: 'bold',
    ml: 1
  },
  container: {
    width: {
      xs: '100%',
      sm: '50%',
    },
    mt: 3,
    mb: 1
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flexStart',
    mb: 2
  }
}
