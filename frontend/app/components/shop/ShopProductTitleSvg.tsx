import { useId } from 'react'

type ShopProductTitleSvgProps = {
  title: string
  className?: string
  fill?: string
  gradient?: string
}

export default function ShopProductTitleSvg({
  title,
  className,
  fill = 'var(--site-ink)',
  gradient = '#ff0000',
}: ShopProductTitleSvgProps) {
  const gradientId = useId()
  const normalizedTitle = title.trim().toUpperCase() || 'PRODUCT'
  const baseSize = 470
  const lengthFactor = Math.max(
    0.58,
    1 / Math.sqrt(normalizedTitle.length * 0.18),
  )
  const fontSize = baseSize * lengthFactor
  const height = fontSize * 0.88
  const textY = height * 0.82

  return (
    <svg
      className={className}
      viewBox={`0 0 1000 ${height}`}
      preserveAspectRatio='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-label={normalizedTitle}
      role='img'
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1='500'
          y1={height * 0.52}
          x2='500'
          y2={height}
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0%' stopColor={fill} />
          <stop offset='58%' stopColor={fill} />
          <stop offset='100%' stopColor={gradient} />
        </linearGradient>
      </defs>

      <text
        x='0'
        y={textY}
        textLength='1000'
        lengthAdjust='spacingAndGlyphs'
        fontFamily="'Kleber Unlicensed Trial Version Stark', var(--font-kleber), sans-serif"
        fontSize={fontSize}
        fill={`url(#${gradientId})`}
      >
        {normalizedTitle}
      </text>
    </svg>
  )
}
