import { Box, Card, Icon, Stack, Text, colorWithOpacity, surface } from '@lifeforge/ui'

function WidgetInfoRow({
  icon,
  label,
  value
}: {
  icon: string
  label: string
  value: string
}) {
  return (
    <Card align="center" bg={surface.light} direction="row" flex="1" gap="md">
      <Box bg={colorWithOpacity('bg-500', '20%')} p="md" r="md">
        <Icon
          color={{ base: 'bg-600', dark: 'bg-400' }}
          icon={icon}
          size="1.5em"
        />
      </Box>
      <Stack gap="xs">
        <Text color="muted" size="sm" weight="medium">
          {label}
        </Text>
        <Text size="lg">{value}</Text>
      </Stack>
    </Card>
  )
}

export default WidgetInfoRow
