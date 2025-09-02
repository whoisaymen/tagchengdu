import {ArchiveIcon, CalendarIcon, CogIcon, ListIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'
import {singleton} from '../lib/utils'
import {VscServerProcess, VscInfo, VscPerson} from 'react-icons/vsc'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = ['settings', 'assist.instruction.context']

const currentYear = new Date().getFullYear()
const years = [currentYear - 1, currentYear, currentYear + 1] // e.g. [2024, 2025, 2026]

const months = [
  {title: 'January 一月', value: 1},
  {title: 'February 二月', value: 2},
  {title: 'March 三月', value: 3},
  {title: 'April 四月', value: 4},
  {title: 'May 五月', value: 5},
  {title: 'June 六月', value: 6},
  {title: 'July 七月', value: 7},
  {title: 'August 八月', value: 8},
  {title: 'September 九月', value: 9},
  {title: 'October 十月', value: 10},
  {title: 'November 十一月', value: 11},
  {title: 'December 十二月', value: 12},
]

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('CMS 内容管理')
    .items([
      S.divider(),

      singleton(S, 'about', 'About 关于').icon(VscInfo),
      S.divider(),

      S.documentTypeListItem('artist').title('DJs'),
      S.listItem()
        .title('Events 活动')
        .icon(CalendarIcon)
        .child(
          S.list()
            .title('Events 活动')
            .items([
              S.listItem()
                .title('All Events 所有活动')
                .icon(ListIcon)
                .child(
                  S.documentTypeList('event')
                    .title('All Events 所有活动')
                    .filter('_type == "event"')
                    .defaultOrdering([{field: 'date', direction: 'desc'}]),
                ),
              S.divider(),

              // Years with months
              ...years.map((year) =>
                S.listItem()
                  .title(`${year} 年`)
                  .icon(CalendarIcon)
                  .child(
                    S.list()
                      .title(`${year} 年`)
                      .items(
                        months.map((month) => {
                          return S.listItem()
                            .title(month.title)
                            .child(
                              S.documentTypeList('event')
                                .title(`${month.title} ${year}`)
                                .filter(
                                  `_type == "event" && date match "${year}-${month.value.toString().padStart(2, '0')}*"`,
                                )
                                .defaultOrdering([{field: 'date', direction: 'asc'}]),
                            )
                        }),
                      ),
                  ),
              ),
            ]),
        ),

      S.divider(),
      // ...S.documentTypeListItems()
      //   // Remove the "assist.instruction.context" and "settings" content  from the list of content types
      //   .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
      //   // Pluralize the title of each document type.  This is not required but just an option to consider.
      //   .map((listItem) => {
      //     return listItem.title(pluralize(listItem.getTitle() as string))
      //   }),
      // // Settings Singleton in order to view/edit the one particular document for Settings.  Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
      S.listItem()
        .title('Settings 设置')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
