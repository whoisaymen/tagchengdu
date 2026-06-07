export const SITE_TITLE = 'T²'

export function getSiteTitle(title?: string | null) {
  const normalizedTitle = title?.trim()

  if (
    !normalizedTitle ||
    normalizedTitle === '.TAG' ||
    normalizedTitle === 'TAG Chengdu'
  ) {
    return SITE_TITLE
  }

  return normalizedTitle
}
