import * as React from "react"
import { Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { LeftColumn } from "./components/LeftColumn"
import { RightColumn } from "./components/RightColumn"

const App = () => (
  <Box sx={styles.container}>
    <Box sx={styles.card}>
      <LeftColumn />

      <RightColumn />
    </Box>

    <Typography sx={styles.text}> 2023 © Andre Nunes</Typography>
  </Box>
)

export default App

const styles = {
  container: {
    p: {
      xs: 0,
      sm: 0
    }
  },
  card: {
    display: "flex",
    flexDirection: {
      xs: "row", // to print change this to 'row'
      sm: "row"
    }
  },
  text: {
    fontFamily: "Roboto Condensed",
    textAlign: "right",
    m: 2
  }
}
