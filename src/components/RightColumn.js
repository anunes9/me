import * as React from 'react'
import { Box } from '@mui/system'
import { Experience } from './Experience'
import { Education } from './Education'
import { Technologies } from './Technologies'

export const RightColumn = () => (
  <Box sx={styles.column}>
    <Experience />

    <Technologies />

    <Education />
  </Box>
)

const styles = {
  column: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    flexGrow: 2,
    p: 2,
    borderRadius: '4px'
  }
}
