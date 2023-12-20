import React, { useState } from "react"
import { Layout } from "./mantine/Layout"
import { MantineProvider, ColorSchemeProvider } from "@mantine/core"

const App = () => {
  const [colorScheme, setColorScheme] = useState("light")
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Layout />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
