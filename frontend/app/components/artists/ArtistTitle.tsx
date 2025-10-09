'use client'
import { useEffect, useRef, useState } from 'react'

interface ArtistTitleProps {
  name: string
  className?: string
}

export default function ArtistTitle({
  name,
  className = '',
}: ArtistTitleProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const textRef = useRef<SVGTextElement>(null)
  const [scale, setScale] = useState(1)
  const [viewBoxHeight, setViewBoxHeight] = useState(200)

  useEffect(() => {
    const svg = svgRef.current
    const text = textRef.current
    if (!svg || !text) return

    // Reset transform for accurate measurement
    setScale(1)

    requestAnimationFrame(() => {
      const bbox = text.getBBox()
      const availableWidth = svg.viewBox.baseVal.width
      const newScale = availableWidth / bbox.width

      setScale(newScale)
      setViewBoxHeight(bbox.height + 200) // add a bit of padding
    })
  }, [name])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 1000 ${viewBoxHeight}`}
      preserveAspectRatio='none'
      className={`w-full h-auto block ${className}`}
    >
      <defs>
        <linearGradient id='artist-gradient' x1='0' y1='1' x2='0' y2='0'>
          <stop offset='0%' stopColor='#b25403' />
          <stop offset='25%' stopColor='#05161F' />
        </linearGradient>
      </defs>

      <g transform={`scale(${scale})`} transformOrigin='left center'>
        <text
          ref={textRef}
          x='0'
          y={viewBoxHeight - 50}
          fontFamily="'Kleber Unlicensed Trial Version Stark', var(--font-kleber), sans-serif"
          fontWeight='bold'
          fontSize='180'
          fill='url(#artist-gradient)'
        >
          {name}
        </text>
      </g>
    </svg>
  )
}
