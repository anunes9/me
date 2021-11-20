import * as React from 'react'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'

export const Experience = () => (
  <Box sx={styles.container}>
    <Typography variant='h4' sx={styles.title}>Full Stack Developer</Typography>

    <Box sx={styles.row}>
      <Typography variant='h6' sx={styles.title}>Runtime Revolution</Typography>

      <Typography variant='h6' sx={styles.title}>July 2018 - Present</Typography>
    </Box>

    <Typography sx={styles.text}>
      Started as Mobile Developer on a project for an HealthCare company.
      My goal was to plan and develop a mobile app that allows the users to insert and consult their healthcare records.
      This app was made in React Native, and I was responsible for develop the app from scratch, code structure, rules, screens and components organization.
      Implemented Facebook, Google and Apple login, Stripe payments and Apple Pay, CICD with Apple Store and Google Store.
    </Typography>

    <Typography sx={styles.text}>
      While working on the mobile app, I was introduced to the project's website.
      The idea was to implement the same functionalities that the mobile app, creating pages to allow user to insert and consult their healthcare records.
      This website was made in React, Redux and Material Ui components framework.
    </Typography>

    <Typography sx={styles.text}>
      To consolidate my role as a FullStack developer I learn Rails to be able to work on the project's API, and by the end of 2019 I was working on all the products for this project.
      On the API I learn to work with Ruby on Rails framework, PostgreSQL, ElasticSearch, Redis and Kafka. Later on this project I start doing some Project Planning and Team Management.
    </Typography>

    <Typography sx={styles.text}>
      On September 2021 I change projects and I'm currently working as a Mobile Developer for a Sports app in React Native.
    </Typography>
  </Box>
)

const styles = {
  container: {
    mb: 2
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
