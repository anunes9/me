import * as React from 'react'
import { Box } from '@mui/system'
import { ExperienceComponent } from './component'

export const Experience = () => {
  const RRDescription = [
    "Started as Mobile Developer on a project for an HealthCare company. My goal was to plan and develop a mobile app that allows the users to insert and consult their healthcare records. This app was made in React Native, and I was responsible for develop the app from scratch, code structure, rules, screens and components organization. Implemented Facebook, Google and Apple login, Stripe payments and Apple Pay, CICD with Apple Store and Google Store.",
    "While working on the mobile app, I was introduced to the project's website. The idea was to implement the same functionalities that the mobile app, creating pages to allow user to insert and consult their healthcare records. This website was made in React, Redux and Material Ui components framework.",
    "To consolidate my role as a FullStack developer I learn Rails to be able to work on the project's API, and by the end of 2019 I was working on all the products for this project. On the API I learn to work with Ruby on Rails framework, PostgreSQL, ElasticSearch, Redis and Kafka. Later on this project I start doing some Project Planning and Team Management.",
    "On September 2021 I change projects and I'm currently working as a Mobile Developer for a Sports app in React Native."
  ]

  const VWDSDescription = [
    "Started at Volkswagen Digital Solutions on March 2022 as a FullStack Developer working with React, Clojure, Elixir and AWS.",
    "It's an opportunity to learn new technologies and new work environments."
  ]

  return (
    <Box>
      <ExperienceComponent
        job="FullStack Developer"
        company="Volkswagen Digital Solutions"
        duration="March 2022 - present"
        description={VWDSDescription}
      />

      <ExperienceComponent
        job="FullStack Developer"
        company="Runtime Revolution"
        duration="July 2018 - March 2022"
        description={RRDescription}
      />
    </Box>
  )
}
