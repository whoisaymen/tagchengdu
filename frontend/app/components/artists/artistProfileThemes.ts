import type { CSSProperties } from 'react'

export type ArtistProfileThemeKey = 'acid' | 'hot' | 'night'

type ArtistProfileTheme = {
  key: ArtistProfileThemeKey
  label: string
  vars: {
    panel: string
    text: string
    titleMain: string
    titleGradient: string
    titleGradientAlt: string
    titlePaper: string
    imageFade: string
    control: string
    controlContrast: string
    scrollbar: string
  }
}

type ArtistProfileThemeStyle = CSSProperties &
  Record<`--artist-${string}`, string>

export const ARTIST_PROFILE_THEME_KEYS: ArtistProfileThemeKey[] = [
  'acid',
  'hot',
  'night',
]

const DEFAULT_ARTIST_PROFILE_THEME_BY_SLUG: Record<
  string,
  ArtistProfileThemeKey
> = {
  cora: 'acid',
  hao: 'night',
  zarah: 'hot',
}

const FALLBACK_ARTIST_SLUG_ORDER = [
  'bugsy',
  'cora',
  'd-dan',
  'darkle',
  'dj-blue',
  'dj-tool',
  'hao',
  'hazel',
  'kaishandao',
  'lawrence-lee',
  'leonwill',
  'nyb',
  'pinkboy',
  'qiuqiu',
  'zarah',
]

export const ARTIST_PROFILE_THEMES: Record<
  ArtistProfileThemeKey,
  ArtistProfileTheme
> = {
  acid: {
    key: 'acid',
    label: 'Acid Green',
    vars: {
      panel: 'var(--site-accent)',
      text: 'var(--site-ink)',
      titleMain: 'var(--site-ink)',
      titleGradient: 'var(--site-accent-hot)',
      titleGradientAlt: 'var(--site-accent)',
      titlePaper: 'var(--site-paper)',
      imageFade: 'var(--site-accent-hot)',
      control: 'var(--site-accent)',
      controlContrast: 'var(--site-ink)',
      scrollbar: 'var(--site-ink)',
    },
  },
  hot: {
    key: 'hot',
    label: 'Hot Red',
    vars: {
      panel: 'var(--site-accent-hot)',
      text: 'var(--site-ink)',
      titleMain: 'var(--site-ink)',
      titleGradient: 'var(--site-accent)',
      titleGradientAlt: 'var(--site-accent)',
      titlePaper: 'var(--site-paper)',
      imageFade: 'var(--site-accent)',
      control: 'var(--site-accent-hot)',
      controlContrast: 'var(--site-ink)',
      scrollbar: 'var(--site-ink)',
    },
  },
  night: {
    key: 'night',
    label: 'Night Blue',
    vars: {
      panel: 'var(--site-ink)',
      text: 'var(--site-accent)',
      titleMain: 'var(--site-accent)',
      titleGradient: 'var(--site-accent-strong)',
      titleGradientAlt: 'var(--site-accent)',
      titlePaper: 'var(--site-paper)',
      imageFade: 'var(--site-accent-strong)',
      control: 'var(--site-accent-strong)',
      controlContrast: 'var(--site-ink)',
      scrollbar: 'var(--site-accent)',
    },
  },
}

export function resolveArtistProfileTheme(
  profileTheme: string | null | undefined,
  artistIndex: number,
  slug?: string | null,
) {
  if (
    profileTheme &&
    ARTIST_PROFILE_THEME_KEYS.includes(profileTheme as ArtistProfileThemeKey)
  ) {
    return ARTIST_PROFILE_THEMES[profileTheme as ArtistProfileThemeKey]
  }

  const normalizedSlug = slug?.trim().toLowerCase()
  const slugTheme = normalizedSlug
    ? DEFAULT_ARTIST_PROFILE_THEME_BY_SLUG[normalizedSlug]
    : undefined

  if (slugTheme) {
    return ARTIST_PROFILE_THEMES[slugTheme]
  }

  const safeIndex =
    Number.isFinite(artistIndex) && artistIndex >= 0 ? artistIndex : 0
  const themeKey =
    ARTIST_PROFILE_THEME_KEYS[safeIndex % ARTIST_PROFILE_THEME_KEYS.length]

  return ARTIST_PROFILE_THEMES[themeKey]
}

export function getArtistProfileThemeStyle(
  theme: ArtistProfileTheme,
): ArtistProfileThemeStyle {
  return {
    '--artist-panel': theme.vars.panel,
    '--artist-text': theme.vars.text,
    '--artist-title-main': theme.vars.titleMain,
    '--artist-title-gradient': theme.vars.titleGradient,
    '--artist-title-gradient-alt': theme.vars.titleGradientAlt,
    '--artist-title-paper': theme.vars.titlePaper,
    '--artist-image-fade': theme.vars.imageFade,
    '--artist-control': theme.vars.control,
    '--artist-control-contrast': theme.vars.controlContrast,
    '--artist-scrollbar': theme.vars.scrollbar,
  }
}

export function getSortedArtistIndex(
  artists: { slug?: string | null; name?: string | null }[] | null | undefined,
  currentArtist: { slug?: { current?: string | null } | string | null; name?: string | null },
) {
  const currentSlug =
    typeof currentArtist.slug === 'string'
      ? currentArtist.slug
      : currentArtist.slug?.current

  const sortedArtists = (artists || [])
    .filter((artist) => artist?.slug || artist?.name)
    .slice()
    .sort((a, b) =>
      (a.name || '').localeCompare(b.name || '', undefined, {
        sensitivity: 'base',
      }),
    )

  const index = sortedArtists.findIndex((artist) => {
    if (currentSlug && artist.slug === currentSlug) {
      return true
    }

    return Boolean(
      currentArtist.name &&
        artist.name &&
        artist.name.localeCompare(currentArtist.name, undefined, {
          sensitivity: 'base',
        }) === 0,
    )
  })

  return index >= 0 ? index : 0
}

export function getFallbackArtistIndexBySlug(slug: string | null | undefined) {
  const normalizedSlug = slug?.trim().toLowerCase()

  if (!normalizedSlug) {
    return 0
  }

  const index = FALLBACK_ARTIST_SLUG_ORDER.indexOf(normalizedSlug)

  return index >= 0 ? index : 0
}

export function normalizeArtistTitleSvg(svg: string) {
  if (svg.includes('--artist-title-')) {
    return svg
  }

  return svg
    .replace(/#05161f/gi, 'var(--artist-title-main, #05161F)')
    .replace(/#b25403/gi, 'var(--artist-title-gradient, #B25403)')
    .replace(/#d90000/gi, 'var(--artist-title-gradient, #D90000)')
    .replace(/#b3c200/gi, 'var(--artist-title-gradient-alt, #B3C200)')
    .replace(/#e9edb9/gi, 'var(--artist-title-paper, #E9EDB9)')
}
