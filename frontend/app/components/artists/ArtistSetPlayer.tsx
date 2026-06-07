'use client'

import { useEffect, useRef, useState } from 'react'
import { IoMdPause, IoMdPlay } from 'react-icons/io'
import Swirl from '../svg/Swirl'

declare global {
  interface Window {
    SC?: {
      Widget: any
    }
  }
}

type ArtistSetPlayerProps = {
  artistName?: string
  setUrl: string
  className?: string
  viewport?: 'mobile' | 'desktop' | 'all'
}

const SOUNDCLOUD_WIDGET_SCRIPT = 'https://w.soundcloud.com/player/api.js'

function buildSoundCloudEmbedUrl(setUrl: string) {
  const params = new URLSearchParams({
    url: setUrl,
    color: '#05161f',
    auto_play: 'false',
    hide_related: 'true',
    show_comments: 'false',
    show_user: 'false',
    show_reposts: 'false',
    show_teaser: 'false',
    buying: 'false',
    liking: 'false',
    sharing: 'false',
    download: 'false',
    visual: 'false',
  })

  return `https://w.soundcloud.com/player/?${params.toString()}`
}

export default function ArtistSetPlayer({
  artistName,
  setUrl,
  className = '',
  viewport = 'all',
}: ArtistSetPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const widgetRef = useRef<any>(null)
  const widgetReadyRef = useRef(false)
  const pendingPlayRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    let isMounted = true

    if (viewport !== 'all') {
      const isDesktopViewport = window.matchMedia('(min-width: 1024px)').matches

      if (
        (viewport === 'desktop' && !isDesktopViewport) ||
        (viewport === 'mobile' && isDesktopViewport)
      ) {
        return () => {
          isMounted = false
        }
      }
    }

    const setupWidget = () => {
      if (!isMounted || !iframeRef.current || !window.SC?.Widget) {
        return
      }

      const widget = window.SC.Widget(iframeRef.current)
      widgetRef.current = widget

      widget.bind(window.SC.Widget.Events.READY, () => {
        if (!isMounted) {
          return
        }

        widgetReadyRef.current = true

        if (pendingPlayRef.current) {
          pendingPlayRef.current = false
          widget.play()
        }
      })

      widget.bind(window.SC.Widget.Events.PLAY, () => {
        if (isMounted) {
          setIsPlaying(true)
        }
      })

      widget.bind(window.SC.Widget.Events.PAUSE, () => {
        if (isMounted) {
          setIsPlaying(false)
        }
      })

      widget.bind(window.SC.Widget.Events.FINISH, () => {
        if (isMounted) {
          setIsPlaying(false)
        }
      })
    }

    if (window.SC?.Widget) {
      setupWidget()
      return () => {
        isMounted = false
      }
    }

    const existingScript = document.querySelector(
      `script[src="${SOUNDCLOUD_WIDGET_SCRIPT}"]`,
    ) as HTMLScriptElement | null

    const script = existingScript || document.createElement('script')

    if (!existingScript) {
      script.src = SOUNDCLOUD_WIDGET_SCRIPT
      script.async = true
      document.body.appendChild(script)
    }

    script.addEventListener('load', setupWidget)

    return () => {
      isMounted = false
      widgetReadyRef.current = false
      pendingPlayRef.current = false
      script.removeEventListener('load', setupWidget)
    }
  }, [viewport])

  const togglePlayback = () => {
    const widget = widgetRef.current

    if (!widget || !widgetReadyRef.current) {
      pendingPlayRef.current = !isPlaying
      setIsPlaying(!isPlaying)
      return
    }

    widget.isPaused((paused: boolean) => {
      if (paused) {
        setIsPlaying(true)
        widget.play()
        return
      }

      setIsPlaying(false)
      widget.pause()
    })
  }

  const buttonLabel = isPlaying
    ? `Pause ${artistName || 'artist'} set`
    : `Play ${artistName || 'artist'} set`
  const isMobilePlayer = viewport === 'mobile'
  const playerColor = 'var(--artist-control)'
  const shellSizeClass = isMobilePlayer
    ? 'h-[1.8rem] w-[1.8rem] lg:h-[2.65rem] lg:w-[2.65rem]'
    : 'h-[2.55rem] w-[2.55rem] lg:h-[2.65rem] lg:w-[2.65rem]'
  const swirlSizeClass = isMobilePlayer
    ? 'h-[2.5rem] w-[2.5rem] lg:h-[3.65rem] lg:w-[3.65rem]'
    : 'h-[3.5rem] w-[3.5rem] lg:h-[3.65rem] lg:w-[3.65rem]'
  const iconColorClass = 'text-[var(--artist-control)]'
  const pauseIconSizeClass = isMobilePlayer
    ? 'h-[1rem] w-[1rem] lg:h-[1.65rem] lg:w-[1.65rem]'
    : 'h-[1.55rem] w-[1.55rem] lg:h-[1.65rem] lg:w-[1.65rem]'
  const playIconSizeClass = isMobilePlayer
    ? 'h-[1.05rem] w-[1.05rem] lg:h-[1.7rem] lg:w-[1.7rem]'
    : 'h-[1.6rem] w-[1.6rem] lg:h-[1.7rem] lg:w-[1.7rem]'

  return (
    <div
      data-viewport={viewport}
      className={`absolute z-[40] ${shellSizeClass} cursor-pointer overflow-visible ${className}`}
    >
      <iframe
        ref={iframeRef}
        title={artistName ? `${artistName} set on SoundCloud` : 'Artist set'}
        src={buildSoundCloudEmbedUrl(setUrl)}
        width='100%'
        height='100%'
        allow='autoplay'
        loading='eager'
        className='pointer-events-none absolute inset-0 h-full w-full border-0 opacity-0'
      />

      <div
        aria-hidden='true'
        className={`pointer-events-none absolute left-1/2 top-1/2 z-0 ${swirlSizeClass} -translate-x-1/2 -translate-y-1/2`}
      >
        <Swirl
          theme={{ fill: playerColor }}
          className='h-full w-full'
          animate={{
            rotate: [0, 360],
            scale: [0.98, 1.04, 0.98],
          }}
          transition={{
            duration: 3.8,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          }}
          svgTransition={{
            duration: 3.2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            opacity: isMobilePlayer ? 0.82 : 0.72,
            mixBlendMode: 'normal',
            filter: 'drop-shadow(0 0 4px rgba(5, 22, 31, 0.24))',
          }}
        />
      </div>

      <button
        type='button'
        aria-label={buttonLabel}
        aria-pressed={isPlaying}
        onClick={togglePlayback}
        className={`absolute inset-0 z-10 flex cursor-pointer appearance-none items-center justify-center border-0 bg-transparent p-0 ${iconColorClass} outline-none transition-transform hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--site-paper)]`}
      >
        <span className='sr-only'>{buttonLabel}</span>
        {isPlaying ? (
          <IoMdPause
            aria-hidden='true'
            className={`block ${pauseIconSizeClass} drop-shadow-[0_1px_2px_rgba(5,22,31,0.38)]`}
          />
        ) : (
          <IoMdPlay
            aria-hidden='true'
            className={`ml-[0.08rem] block ${playIconSizeClass} drop-shadow-[0_1px_2px_rgba(5,22,31,0.38)]`}
          />
        )}
      </button>

      <a
        href={setUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='sr-only'
      >
        Open set on SoundCloud
      </a>
    </div>
  )
}
