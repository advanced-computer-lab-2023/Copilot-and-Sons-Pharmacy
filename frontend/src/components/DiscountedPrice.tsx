import { Typography, Stack } from '@mui/material'

export function DiscountedPrice({
  originalPrice,
  discountedPrice,
  discountFontSize,
  fontSize,
  fontWeight = 'normal',
  vertical = false,
  color,
}: {
  originalPrice: number
  discountedPrice?: number
  fontSize?: string
  discountFontSize?: string
  fontWeight?: string
  vertical?: boolean
  color?: string
}) {
  return (
    <Typography
      color={color}
      variant="body1"
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {discountedPrice && discountedPrice != originalPrice ? (
        <Stack
          direction={vertical ? 'column' : 'row'}
          spacing={vertical ? 0 : 1.5}
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="body1"
            fontSize={fontSize}
            fontWeight={fontWeight}
          >
            {discountedPrice.toFixed(2)}E£
          </Typography>
          <Typography
            variant="body2"
            fontSize={discountFontSize ?? fontSize}
            fontWeight={fontWeight}
            sx={{ textDecoration: 'line-through', color: 'text.disabled' }}
          >
            {originalPrice.toFixed(2)}E£
          </Typography>
        </Stack>
      ) : (
        originalPrice.toFixed(2) + 'E£'
      )}
    </Typography>
  )
}
