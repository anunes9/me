import { Anchor, Flex, Image, rem, Text } from "@mantine/core"
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react"
import ANLogo from "../assets/logo-black.svg"

export const Footer = () => (
  <Flex direction="row" justify="center" gap="sm">
    <Anchor href="https://anunes9.github.io/me/" target="_blank">
      <IconBrandGithub size={rem(20)} color="grey" />
    </Anchor>

    <Anchor href="https://www.linkedin.com/in/andrenunes-work/" target="_blank">
      <IconBrandLinkedin size={rem(20)} color="grey" />
    </Anchor>

    <Flex direction="row" ml={rem(40)}>
      <Image alt="AN Logo" src={ANLogo} width="2rem" />
      <Text color="dimmed" fz="xs">
        2023 © All rights reserved
      </Text>
    </Flex>
  </Flex>
)
