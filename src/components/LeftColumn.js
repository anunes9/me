import * as React from 'react'
import { Avatar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import ProfileImage from '../foto.jpeg'
import { Information } from './Information'
import { BottleGreen } from '../styles'
import { Skills } from './Skills'
import { AboutMe } from './AboutMe'

export const LeftColumn = () => (
  <Box sx={[styles.column, styles.leftColumn]}>
    <Profile />

    <Typography variant='h4' sx={styles.title}>Andre Nunes</Typography>

    <Typography variant='h5' sx={styles.text}>Software Developer</Typography>

    <Information />

    <AboutMe />

    <Skills />
  </Box>
)

const Profile = () => (
  <Box sx={styles.imageContainer}>
    <Avatar src={ProfileImage} sx={styles.image} />
  </Box>
)

const styles = {
  column: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    p: 1,
    backgroundColor: BottleGreen,
    alignItems: 'center',
    borderRadius: '4px'
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    p: 3
  },
  image: {
    height: {
      xs: 100,
      sm: 200
    },
    width: {
      xs: 100,
      sm: 200
    }
  },
  title: {
    fontFamily: 'Anton',
    mb: 1
  },
  text: {
    fontFamily: 'Roboto Condensed',
    // fontWeight: 'bold'
  }
}
