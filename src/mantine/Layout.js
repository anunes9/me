import { AppShell, Grid, useMantineTheme } from "@mantine/core"
import { FooterComponent } from "./Footer"
import { Left } from "./Left"
import { Right } from "./Right"

export const Layout = () => {
  const theme = useMantineTheme()

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          padding: 0
        }
      }}
      footer={<FooterComponent />}
    >
      <Grid gutter={0}>
        <Grid.Col h="100vh" bg={"green"} span={4}>
          <Left />
        </Grid.Col>
        <Grid.Col h="100vh" bg={"blue"} span={8}>
          <Right />
        </Grid.Col>
      </Grid>
    </AppShell>
  )
}
