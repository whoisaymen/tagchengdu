import {CalendarIcon, CogIcon, ListIcon, DocumentIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import {singleton} from '../lib/utils'
import {VscInfo, VscLaw} from 'react-icons/vsc'

const currentYear = new Date().getFullYear()
const years = [currentYear - 1, currentYear, currentYear + 1]

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

      // =========================
      // CORE CONTENT
      // =========================

      S.listItem()
        .title('DJs')
        .child(
          S.documentTypeList('artist')
            .title('DJs')
            .defaultOrdering([{field: 'name', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Shop 商品')
        .icon(DocumentIcon)
        .child(
          S.documentTypeList('shopProduct')
            .title('Shop 商品')
            .defaultOrdering([{field: 'orderIndex', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Rooms 空间')
        .child(
          S.documentTypeList('room')
            .title('Rooms 空间')
            .defaultOrdering([{field: 'orderIndex', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Events 活动')
        .icon(CalendarIcon)
        .child(
          S.list()
            .title('Events 活动')
            .items([
              S.listItem()
                .title('Upcoming 即将开始')
                .icon(CalendarIcon)
                .child(
                  S.documentTypeList('event')
                    .title('Upcoming 即将开始')
                    .filter('_type == "event" && date >= now()')
                    .defaultOrdering([{field: 'date', direction: 'asc'}]),
                ),

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

              ...years.map((year) =>
                S.listItem()
                  .title(`${year} 年`)
                  .icon(CalendarIcon)
                  .child(
                    S.list()
                      .title(`${year} 年`)
                      .items(
                        months.map((month) =>
                          S.listItem()
                            .title(month.title)
                            .child(
                              S.documentTypeList('event')
                                .title(`${month.title} ${year}`)
                                .filter(
                                  `_type == "event" && date match "${year}-${month.value
                                    .toString()
                                    .padStart(2, '0')}*"`,
                                )
                                .defaultOrdering([{field: 'date', direction: 'asc'}]),
                            ),
                        ),
                      ),
                  ),
              ),
            ]),
        ),

      S.divider(),

      // =========================
      // CONSENT
      // =========================

      S.listItem()
        .title('Consent 公约')
        .icon(VscLaw)
        .child(
          S.list()
            .title('Consent Management 公约管理')
            .items([
              S.listItem()
                .title('Documents 文档')
                .icon(DocumentIcon)
                .child(
                  S.documentTypeList('consentDocument')
                    .title('Consent Documents 公约文档')
                    .filter('_type == "consentDocument"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                    .child((documentId) =>
                      S.list()
                        .title('Document')
                        .items([
                          S.listItem()
                            .title('Edit Document')
                            .icon(DocumentIcon)
                            .child(
                              S.document().schemaType('consentDocument').documentId(documentId),
                            ),
                          S.listItem()
                            .title('Clauses 条款')
                            .icon(ListIcon)
                            .child(
                              S.documentList()
                                .title('Clauses')
                                .filter('_type == "consentClause" && document._ref == $documentId')
                                .params({documentId})
                                .defaultOrdering([{field: 'order', direction: 'asc'}]),
                            ),
                        ]),
                    ),
                ),

              S.listItem()
                .title('All Clauses 所有条款')
                .icon(ListIcon)
                .child(
                  S.documentTypeList('consentClause')
                    .title('Consent Clauses 公约条款')
                    .defaultOrdering([
                      {field: 'section', direction: 'asc'},
                      {field: 'order', direction: 'asc'},
                    ]),
                ),
            ]),
        ),

      S.divider(),

      // =========================
      // SETTINGS
      // =========================
      S.listItem()
        .title('Settings 设置')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
