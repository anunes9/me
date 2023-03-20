import { Box, Flex, Grid, Group, MediaQuery, rem, Space, Text, useMantineTheme } from "@mantine/core"
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react"

export const Content = () => {
  const theme = useMantineTheme()
  const dividerColor = theme.colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.gray[3]
  const dividerStyle = `1px solid ${dividerColor}`

  const hrefColor = theme.colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.gray[6]
  const hrefStyle = `1px solid ${hrefColor}`

  return (
    <Grid sx={{ borderBottom: dividerStyle }} mb={rem(40)} pb="lg">
      <Grid.Col xs={12} sm={9} pr="lg">
        <Flex gap="md" justify="flex-start" align="flex-start" direction="column">
          {/* WORK EXPERIENCES */}
          <TitleHeader>WORK EXPERIENCES</TitleHeader>

          <CompanyHeader
            job="Full Stack Developer"
            company="Volkswagen Digital Solutions"
            date="March 2022 - Present"
          />

          <Text color="dimmed" fz="sm">
            In March 2022 I change companies searching for a new challenge and to know different ways of working. In
            VWDS we work in Extreme Programming. The main difference for me was the Pair Programming and Test Driven
            Development, I was used to do tests on for the applications but with TDD we need to have another
            perspective. Another difference was that all the infrastructure is infrastructure as code in AWS.
            <br />
            My first project was to track a vehicle production state where I work with React and Clojure.
            <br />
            After that worked on a project to handle contract generation and signing done in React, NodeJS and AWS
            Lambda. While working in these projects I had the opportunity to try out GOLANG, Elixir and create
            infrastructure from scratch in AWS.
          </Text>

          <Space h={rem(20)} />

          <CompanyHeader
            job="Full Stack and Mobile Developer"
            company="Runtime Revolution"
            date="July 2018 - March 2022"
          />

          <Text color="dimmed" fz="sm">
            Started as Mobile Developer on a project for an HealthCare company. My goal was to plan and develop a mobile
            app that allows the users to insert and consult their healthcare records. This app was made in React Native,
            and I was responsible for develop the app from scratch, code structure, rules, screens and components
            organization. Implemented Facebook, Google and Apple login, Stripe payments and Apple Pay, CICD with Apple
            Store and Google Store.
            <br />
            I also worked the project's website. The idea was to implement the same functionalities that the mobile app
            provides, creating pages to allow user to insert and consult their healthcare records. This website was made
            in React, Redux and Material Ui components framework.
            <br />
            To improve my role as a FullStack developer I learn Ruby on Rails to work on the project's API, and by the
            end of 2019 I was working on all the products for this project. On the API I learn to work with Ruby on
            Rails framework, PostgreSQL, ElasticSearch, Redis and Kafka. Later on this project I start doing some
            Project Planning and Team Management.
            <br />
            In September changed projects to work as a Mobile Developer for a Sports app in React Native. In this
            project I assume the role of Lead Developer and Team Manager.
          </Text>

          <Space h={rem(20)} />

          <Box w="100%">
            <TitleHeader>SKILLS</TitleHeader>

            <Flex
              gap="md"
              justify="space-between"
              align="flex-start"
              sx={() => ({
                flexDirection: "column",

                "@media (min-width: 40em)": {
                  flexDirection: "row"
                }
              })}
              w="100%"
              pt={rem(20)}
              pr={rem(40)}
            >
              <Box>
                <Text fw={700} mb={rem(12)}>
                  Technical
                </Text>

                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  JavaScript - TypeScript
                </Text>
                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  React - React Native
                </Text>
                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  HTML - CSS
                </Text>
                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  Ruby
                </Text>
                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  Node.js
                </Text>
                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  PostgreSQL
                </Text>
                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  AWS - Infrastructure
                </Text>
                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  Agile Methodology
                </Text>
                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  Pair Programming
                </Text>
                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  Test Driven Development
                </Text>
              </Box>

              <Box>
                <Text fw={700} mb={rem(12)}>
                  Management
                </Text>

                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  Manage teams and projects
                </Text>
                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  Github
                </Text>
                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  Jira
                </Text>
                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  AppCenter
                </Text>
              </Box>

              <Box>
                <Text fw={700} mb={rem(12)}>
                  Professional
                </Text>

                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  Team Player
                </Text>
                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  Responsible and reliable
                </Text>
                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  Result oriented mind
                </Text>
                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  Problem solver
                </Text>
                <Text color="dimmed" fz="sm" mb={rem(6)}>
                  Good time management
                </Text>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Grid.Col>

      <Grid.Col
        xs={12}
        sm={3}
        sx={() => ({
          "@media (min-width: 40em)": {
            borderLeft: dividerStyle
          }
        })}
      >
        <Flex gap="md" justify="flex-start" align="flex-start" direction="column">
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Space h={rem(20)} />
          </MediaQuery>

          {/* EDUCATION */}
          <TitleHeader>EDUCATION</TitleHeader>

          <Text color="dimmed" fz="xs">
            Bachelor's Degree in Information Technologies (IT)
            <br />
            <br />
            Faculdade de Ciências of Lisbon University
            <br />
            2018
          </Text>

          <Space h={rem(20)} />

          {/* LANGUAGES */}
          <TitleHeader>LANGUAGES</TitleHeader>

          <Text color="dimmed" fz="sm">
            Portuguese (Native)
          </Text>

          <Text color="dimmed" fz="sm">
            English (C1)
          </Text>

          <Space h={rem(20)} />

          {/* INTERESTS */}
          <TitleHeader>INTERESTS</TitleHeader>

          <Text color="dimmed" fz="sm">
            Padel
          </Text>

          <Text color="dimmed" fz="sm">
            Music
          </Text>

          <Text color="dimmed" fz="sm">
            Cars
          </Text>

          <Text color="dimmed" fz="sm">
            Develop ideas into apps
          </Text>

          <Space h={rem(20)} />

          {/* INTERESTS */}
          <TitleHeader>SOCIAL</TitleHeader>

          <Group>
            <IconBrandGithub size={rem(16)} color="grey" />
            <Text
              component="a"
              href="https://anunes9.github.io/me"
              color="dimmed"
              fz="sm"
              sx={{
                borderBottom: hrefStyle
              }}
            >
              anunes9.github.io/me
            </Text>
          </Group>

          <Group>
            <IconBrandLinkedin size={rem(16)} color="grey" />
            <Text
              component="a"
              href="https://www.linkedin.com/in/andrenunes-work/"
              color="dimmed"
              fz="sm"
              sx={{
                borderBottom: hrefStyle
              }}
            >
              andrenunes-work
            </Text>
          </Group>
        </Flex>
      </Grid.Col>
    </Grid>
  )
}

const CompanyHeader = ({ job, company, date }) => (
  <Box w="100%">
    <Text fw={700}>{job}</Text>
    <Flex justify="space-between" align="flex-end">
      <Text color="dimmed" fz="sm">
        {company}
      </Text>

      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Text color="dimmed" fz="xs">
          {date}
        </Text>
      </MediaQuery>
    </Flex>

    <MediaQuery largerThan="sm" styles={{ display: "none" }}>
      <Text color="dimmed" fz="xs">
        {date}
      </Text>
    </MediaQuery>
  </Box>
)

const TitleHeader = ({ children }) => {
  const theme = useMantineTheme()
  const color = theme.colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.teal[6]

  return (
    <Text
      color={color}
      fw={700}
      pl={rem(10)}
      lh="lg"
      sx={{ borderLeft: `6px solid ${color}`, letterSpacing: "0.2rem" }}
    >
      {children}
    </Text>
  )
}
