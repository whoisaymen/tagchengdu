import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import about from './documents/about'
import event from './documents/event'
import {artist} from './documents/artist'
import {shopProduct} from './documents/shopProduct'
import consentClause from './documents/consentClause'
import consentDocument from './documents/consentDocument'
import {room} from './documents/room'

import {settings} from './singletons/settings'

import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import localeBlockContent from './objects/localeBlockContent'
import localeString from './objects/localeString'

// NEW (simplified lineup system)
import {lineupEntry} from './objects/lineupEntry'
import {roomLineup} from './objects/roomLineup'

export const schemaTypes = [
  // Singletons
  settings,

  // Documents
  page,
  post,
  person,
  about,
  artist,
  shopProduct,
  room,
  event,
  consentClause,
  consentDocument,

  // Objects
  blockContent,
  localeBlockContent,
  localeString,
  infoSection,
  callToAction,
  link,

  // Event lineup objects
  lineupEntry,
  roomLineup,
]
