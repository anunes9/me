import * as React from 'react'
import { Box } from '@mui/system'
import { Experience } from './Experience'
import { Education } from './Education'

export const RightColumn = () => (
  <Box sx={styles.column}>
    <Experience />
    <Education />
  </Box>
)

const styles = {
  column: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    flexGrow: 2,
    p: 2
  }
}
