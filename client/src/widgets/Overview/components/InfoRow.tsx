import React from 'react'

import {
  Box,
  Card,
  Icon,
  Stack,
  Text,
  colorWithOpacity,
  surface
} from '@lifeforge/ui'

function InfoRow({
  icon,
  label,
  value
}: {
  icon: string
  label: string
  value: React.ReactNode
}) {
  return (
    <Card align="center" bg={surface.light} direction="row" gap="md" p="sm">
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
        <Text>{value}</Text>
      </Stack>
    </Card>
  )
}

export default InfoRow
