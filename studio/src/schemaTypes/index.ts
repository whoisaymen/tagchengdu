import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {artist} from './documents/artist'
import localeBlockContent from './objects/localeBlockContent'
import localeString from './objects/localeString'
import event from './documents/event'
import lineup from './documents/lineup'
import about from './documents/about'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  artist,
  event,
  localeBlockContent,
  localeString,
  lineup,
  about,
]
