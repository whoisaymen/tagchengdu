import { defineQuery } from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

export const artistMetadataQuery = defineQuery(`
  *[_type == "artist" && slug.current == $slug][0]{
    name,
    bio,
    profileImage
  }
`)

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

export const artistsSlugs = defineQuery(`
  *[_type == "artist" && defined(slug.current)]
  {
    "slug": slug.current,
    "name": name,
    profileTheme
  }
`)

export const aboutQuery = defineQuery(`
  *[_type == "about"][0]{
    description
  }
`)

// export const artistQuery = defineQuery(`
//   *[_type == "artist" && slug.current == $slug][0]{
//     name,
//     profileImage,
//     bio,
//     upNext,
//     contact,
//     socialLinks[]{
//       platform,
//       url
//     }
//   }
// `)

export const artistQuery = defineQuery(`
  *[_type == "artist" && slug.current == $slug][0]{
    name,
    profileImage{
      asset->{
        _id,
        url,
        metadata {
          lqip,
        }
      },
      alt,
      hotspot,
      crop
    },
    bio,
    upNext,
    set,
    contact,
    socialLinks[]{
      platform,
      url
    },
    instagram,
    soundcloud,
    raLink,
    musicLink,
    profileTheme,
    customSVG
  }
`)

const shopImageFields = /* groq */ `
  asset->{
    _id,
    url,
    metadata {
      lqip,
    }
  },
  alt,
  hotspot,
  crop
`

const shopVariantFields = /* groq */ `
  _key,
  slug,
  name,
  price,
  labelColor,
  isDefault,
  listingImage{
    ${shopImageFields}
  },
  heroImage{
    ${shopImageFields}
  }
`

const shopProductFields = /* groq */ `
  _id,
  name,
  customSVG,
  "slug": slug.current,
  orderIndex,
  price,
  listingImage{
    ${shopImageFields}
  },
  heroImage{
    ${shopImageFields}
  },
  description,
  variants[]{
    ${shopVariantFields}
  }
`

export const shopProductsQuery = defineQuery(`
  *[_type == "shopProduct"] | order(orderIndex asc, _createdAt asc) {
    ${shopProductFields}
  }
`)

export const shopProductQuery = defineQuery(`
  *[_type == "shopProduct" && slug.current == $slug][0] {
    ${shopProductFields}
  }
`)

export const shopProductSlugs = defineQuery(`
  *[_type == "shopProduct" && defined(slug.current)] {
    "slug": slug.current
  }
`)

export const eventsQuery = defineQuery(`
  *[_type == "event"] | order(coalesce(doorsAt, date) asc) {
    _id,
    title,
    date,
    doorsAt,
    startsAt,
    description,
    poster{
      asset->{
        url
      }
    },
    tagLineup,
    hiddenBarLineup,
    lineups[]{
      room->{
        nameEn,
        nameCn
      },
      entries[]{
        type,
        name,
        artist->{
          name
        }
      }
    }
  }
`)
