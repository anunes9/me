import * as React from "react"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"

export const Technologies = () => {
  const technologies = [
    "React",
    "React Native",
    "Ruby on Rails",
    "NodeJS",
    "JavaScript",
    "TypeScript",
    "Redux",
    "PostgreSQL",
    "HTML",
    "CSS",
    "AWS",
    "Jira",
    "Git",
    "AppCenter",
    "Project Management",
    "Agile Methodology",
    "Extreme Programming",
    "Pair Programming",
    "Test Driven Development"
  ]

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        Technologies and Tools
      </Typography>

      <Typography sx={styles.text}>{technologies.join(", ")}.</Typography>
    </Box>
  )
}

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
    fontFamily: "Roboto Condensed",
    // fontWeight: 'bold',
    mb: 1
  },
  text: {
    fontFamily: "Roboto Condensed",
    pr: 1
  }
}
