import { Avatar, Flex, rem, Text, useMantineTheme } from "@mantine/core"
import Picture from "../assets/picture.jpeg"

export const Resume = () => {
  const theme = useMantineTheme()
  const dividerColor = theme.colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.gray[3]

  return (
    <Flex
      gap={rem(40)}
      mb={rem(40)}
      pb={rem(40)}
      sx={() => ({
        borderBottom: `1px solid ${dividerColor}`,
        flexDirection: "column",

        "@media (min-width: 40em)": {
          flexDirection: "row"
        }
      })}
    >
      <Avatar src={Picture} size={rem(120)} radius={rem(16)} mx="auto" />

      <Text fz="sm" color="dimmed">
        Hi, I'm Andre a Software Developer from Lisbon. I enjoy a good challenge, learning new things and play Padel.
        I'm a funny person, communicative, easy going and responsible. I like to work in a team and if needed take the
        lead of some topic or project. I have a critical mind and like to know how things are made and why, sometimes
        things come from a necessity. In my free time I like to try out new technologies and develop some ideas into
        applications, play Padel with my friends and hang out with my girlfriend and dog.
      </Text>
    </Flex>
  )
}
