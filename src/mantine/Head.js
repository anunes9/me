import { Grid, Group, rem, Stack, Text, Title, useMantineTheme } from "@mantine/core"
import { IconAt, IconMapPin, IconPhone } from "@tabler/icons-react"

export const Head = () => {
  const theme = useMantineTheme()

  const titleColor = theme.colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.teal[6]
  const dividerColor = theme.colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.gray[3]
  const hrefColor = theme.colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.gray[6]
  const dividerStyle = `1px solid ${dividerColor}`
  const hrefStyle = `1px solid ${hrefColor}`

  return (
    <Grid sx={{ borderBottom: dividerStyle }} mb={rem(40)} pb="sm">
      <Grid.Col xs={12} sm={8} lg={9}>
        <Stack spacing={0} h="100%" justify="center">
          <Title color={titleColor} fw={900} fz={rem(44)} sx={{ letterSpacing: "0.4rem" }}>
            ANDRE NUNES
          </Title>

          <Text color="dimmed" fz="lg">
            Software Developer
          </Text>
        </Stack>
      </Grid.Col>

      <Grid.Col
        xs={12}
        sm={4}
        lg={3}
        sx={() => ({
          "@media (min-width: 40em)": {
            borderLeft: dividerStyle
          }
        })}
      >
        <Stack spacing={rem(6)}>
          <Group>
            <IconPhone color={theme.colors.gray[6]} size={rem(16)} />
            <Text
              component="a"
              href="tel:+351915238870"
              color="dimmed"
              fz="xs"
              sx={{
                borderBottom: hrefStyle
              }}
            >
              +351 915238870
            </Text>
          </Group>

          <Group>
            <IconAt color={theme.colors.gray[6]} size={rem(16)} />
            <Text
              component="a"
              href="mailto:andrenunes.work@gmail.com"
              color="dimmed"
              fz="xs"
              sx={{
                borderBottom: hrefStyle
              }}
            >
              andrenunes.work@gmail.com
            </Text>
          </Group>

          <Group>
            <IconMapPin color={theme.colors.gray[6]} size={rem(16)} />
            <Text color="dimmed" fz="xs">
              Oeiras, Lisboa, Portugal
            </Text>
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  )
}
