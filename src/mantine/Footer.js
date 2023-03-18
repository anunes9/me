import { Anchor, Footer, Group, Image, Text } from "@mantine/core"
import ANLogo from "../assets/logo-black.svg"

export const FooterComponent = () => (
  <Footer
    height="3rem"
    p="sm"
    sx={(theme) => ({
      backgroundColor: theme.colors.gray[0],
      borderTop: "unset"
    })}
  >
    <Group position="apart">
      <Text color="dimmed" fz="xs">
        2023 © All rights reserved
      </Text>

      <Anchor href="https://anunes9.github.io/me/" target="_blank">
        <Image alt="AN Logo" src={ANLogo} width="2rem" />
      </Anchor>
    </Group>
  </Footer>
)
