import React from "react"
import { ActionIcon, Avatar, Card, Container, Group, rem, Stack, Text, useMantineTheme } from "@mantine/core"
import Picture from "../assets/picture.jpeg"
import { IconBrandGithub, IconBrandLinkedin, IconPhone, IconInbox, IconMapPinFilled, IconAt } from "@tabler/icons-react"

export const Left = () => {
  const theme = useMantineTheme()

  return (
    <Container>
      <Card
        withBorder
        padding="xl"
        radius="md"
        styles={{
          main: {
            background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
            padding: 0
          }
        }}
      >
        <Card.Section
          sx={{
            backgroundImage: `url(https://images.unsplash.com/photo-1556244573-c3686c0f0e78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80)`,
            height: 140
          }}
        />

        <Avatar
          src={Picture}
          size={200}
          radius={100}
          mx="auto"
          mt={-30}
          styles={{
            main: {
              border: `${rem(2)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white}`
            }
          }}
        />

        <Text ta="center" fz="lg" fw={500} mt="sm">
          Andre Nunes
        </Text>

        <Text ta="center" fz="sm" c="dimmed">
          Full Stack Developer
        </Text>

        <Group position="center" my="xl">
          <ActionIcon variant="light" color="dark">
            <IconBrandGithub size={rem(20)} />
          </ActionIcon>

          <ActionIcon variant="light" color="dark">
            <IconBrandLinkedin size={rem(20)} />
          </ActionIcon>
        </Group>

        <Text fz="sd">
          Hi, my name is Andre Nunes and I'm a mid-level software developer. I enjoy a good challenge, develop small
          apps and play Padel.
        </Text>

        <Stack mt="xl">
          <Group>
            <IconPhone size={rem(20)} />
            <Text fz="md">915238870</Text>
          </Group>

          <Group>
            <IconAt size={rem(20)} />
            <Text fz="md">anunes9.github.io/me</Text>
          </Group>

          <Group>
            <IconInbox size={rem(20)} />
            <Text fz="md">andrenunes.work@gmail.com</Text>
          </Group>

          <Group>
            <IconMapPinFilled size={rem(20)} />
            <Text fz="md">Oeiras, Lisboa, Portugal</Text>
          </Group>
        </Stack>
      </Card>
    </Container>
  )
}
