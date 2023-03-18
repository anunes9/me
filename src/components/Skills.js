import * as React from "react"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
// import Dot from '@mui/icons-material/FiberManualRecord'

export const Skills = () => (
  <Box sx={styles.container}>
    <Typography variant="h5" sx={styles.title}>
      Skills
    </Typography>

    <Element title="Project Management" rate={6} />

    <Element title="Problem Solving" rate={7} />

    <Element title="Code Development" rate={8} />

    <Element title="Teamwork" rate={8} />

    <Element title="English" rate={7} />
  </Box>
)

// const Rating = ({ rate }) => (
//   <Box>
//     {[...Array(5).keys()].map((i) => (
//       <Dot sx={{ color: i+1 <= rate ? 'white' : 'black' }} />
//     ))}
//   </Box>
// )

const Element = ({ title, rate }) => (
  <Box sx={styles.row}>
    <Typography variant="subtitle1" sx={styles.title}>
      {title}
    </Typography>

    <Rating rate={rate} />
  </Box>
)

const Rating = ({ rate }) => (
  <Box>
    <Typography sx={styles.text}>{`${rate} / 10`}</Typography>
  </Box>
)

const styles = {
  container: {
    width: {
      xs: "100%",
      sm: "80%"
    },
    mb: 2,
    mt: 2
  },
  row: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    fontFamily: "Roboto Condensed",
    fontWeight: "bold"
  },
  text: {
    fontFamily: "Roboto Condensed"
  }
}
