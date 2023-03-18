import * as React from "react"
import { Box } from "@mui/system"
import { ExperienceComponent } from "./component"

export const Experience = () => {
  const RRDescription = [
    "Started as Mobile Developer on a project for an HealthCare company. My goal was to plan and develop a mobile app that allows the users to insert and consult their healthcare records. This app was made in React Native, and I was responsible for develop the app from scratch, code structure, rules, screens and components organization. Implemented Facebook, Google and Apple login, Stripe payments and Apple Pay, CICD with Apple Store and Google Store.",
    "I also worked the project's website. The idea was to implement the same functionalities that the mobile app provides, creating pages to allow user to insert and consult their healthcare records. This website was made in React, Redux and Material Ui components framework.",
    "To improve my role as a FullStack developer I learn Ruby on Rails to work on the project's API, and by the end of 2019 I was working on all the products for this project. On the API I learn to work with Ruby on Rails framework, PostgreSQL, ElasticSearch, Redis and Kafka. Later on this project I start doing some Project Planning and Team Management.",
    "In September changed projects to work as a Mobile Developer for a Sports app in React Native. In this project I assume the role of Lead Developer and Team Manager."
  ]

  const VWDSDescription = [
    "In March 2022 I change companies searching for a new challenge and to know different ways of working. In VWDS we work in Extreme Programming. The main difference for me was the Pair Programming and Test Driven Development, I was used to do tests on for the applications but with TDD we need to have another perspective. Another difference was that all the infrastructure is infrastructure as code in AWS.",
    "My first project was to track a vehicle production state where I work with React and Clojure.\n\nAfter that worked on a project to handle contract generation and signing done in React, NodeJS and AWS Lambda. While working in these projects I had the opportunity to try out GOLANG, Elixir and create infrastructure from scratch in AWS."
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
