import * as React from "react"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"

export const AboutMe = () => (
  <Box sx={styles.container}>
    <Typography variant="h5" sx={styles.title}>
      About Me
    </Typography>

    <Typography sx={styles.text}>
      Hi, I'm Andre a Software Developer from Lisbon. I enjoy a good challenge, learning new things and play Padel. I'm
      a funny person, communicative, easy going and responsible. I like to work in a team and if needed take the lead of
      some topic or project. I have a critical mind and like to know how things are made and why, sometimes things come
      from a necessity. In my free time I like to try out new technologies and develop some ideas into applications,
      play Padel with my friends and hang out with my girlfriend and dog.
    </Typography>
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
    fontWeight: "bold",
    mb: 1
  },
  text: {
    fontFamily: "Roboto Condensed",
    textAlign: "justify",
    pr: 1
  }
}
