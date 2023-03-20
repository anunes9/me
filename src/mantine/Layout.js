import { AppShell, Container, useMantineTheme } from "@mantine/core"
import { Content } from "./Content"
import { Head } from "./Head"
import { Resume } from "./Resume"
import { Footer } from "./Footer"

export const Layout = () => {
  const theme = useMantineTheme()

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0]
        }
      }}
    >
      <Container pt="lg">
        <Head />
        <Resume />
        <Content />
        <Footer />
      </Container>
    </AppShell>
  )
}
