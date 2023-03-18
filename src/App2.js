import React, { useState } from "react"
import { Layout } from "./mantine/Layout"
import { MantineProvider, ColorSchemeProvider, useMantineColorScheme, ActionIcon } from "@mantine/core"
import { IconSun, IconMoonStars } from "@tabler/icons-react"

const App = () => {
  const [colorScheme, setColorScheme] = useState("light")
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Layout />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App

const Demo = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === "dark"

  return (
    <>
      <ActionIcon
        variant="outline"
        color={dark ? "yellow" : "blue"}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
      </ActionIcon>
      <p>Cenas</p>
    </>
  )
}
