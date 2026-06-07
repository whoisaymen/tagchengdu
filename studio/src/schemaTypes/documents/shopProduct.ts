import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

const localizedStringRequired = (value?: {en?: string; cn?: string}) =>
  value?.en || value?.cn ? true : 'Provide at least one title'

export const shopProduct = defineType({
  name: 'shopProduct',
  title: 'Shop Product 商品',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name 商品名',
      type: 'localeString',
      validation: (Rule) => Rule.required().custom(localizedStringRequired),
    }),
    defineField({
      name: 'customSVG',
      title: 'Custom SVG Markup',
      type: 'text',
      description: 'Paste SVG markup here for custom product title graphics.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug 网址别名',
      type: 'slug',
      options: {
        source: (doc: {name?: {en?: string; cn?: string}}) => doc?.name?.en || doc?.name?.cn || '',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orderIndex',
      title: 'Display Order 排序',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'price',
      title: 'Base Price (¥) 基础价格',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'listingImage',
      title: 'Listing Image 列表图',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text 图片描述',
          type: 'localeString',
        }),
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Detail Hero Image 详情主图',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text 图片描述',
          type: 'localeString',
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description 描述',
      type: 'localeBlockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variants',
      title: 'Variants 款式',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'variant',
          fields: [
            defineField({
              name: 'name',
              title: 'Variant Name 款式名',
              type: 'localeString',
              validation: (Rule) => Rule.required().custom(localizedStringRequired),
            }),
            defineField({
              name: 'slug',
              title: 'Variant Key 变体标识',
              type: 'string',
              description: 'Used in the product page URL, for example: diabolo',
              validation: (Rule) =>
                Rule.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
                  name: 'slug',
                }),
            }),
            defineField({
              name: 'price',
              title: 'Variant Price (¥) 变体价格',
              type: 'number',
              validation: (Rule) => Rule.min(0),
            }),
            defineField({
              name: 'labelColor',
              title: 'Label Color 标题颜色',
              type: 'string',
              description: 'Hex color used for the variant name on the product page, e.g. #D90000',
            }),
            defineField({
              name: 'isDefault',
              title: 'Default variant 默认款式',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'listingImage',
              title: 'Variant Listing Image 变体列表图',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative text 图片描述',
                  type: 'localeString',
                }),
              ],
            }),
            defineField({
              name: 'heroImage',
              title: 'Variant Hero Image 变体主图',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative text 图片描述',
                  type: 'localeString',
                }),
              ],
            }),
          ],
          preview: {
            select: {
              en: 'name.en',
              cn: 'name.cn',
              price: 'price',
              isDefault: 'isDefault',
            },
            prepare({en, cn, price, isDefault}) {
              const title = en || cn || 'Untitled variant'
              const priceLabel = typeof price === 'number' ? `¥${price}` : 'Uses base price'

              return {
                title,
                subtitle: isDefault ? `${priceLabel} · default` : priceLabel,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      en: 'name.en',
      cn: 'name.cn',
      price: 'price',
      media: 'listingImage',
    },
    prepare({en, cn, price, media}) {
      return {
        title: en || cn || 'Untitled product',
        subtitle: typeof price === 'number' ? `¥${price}` : 'No price set',
        media,
      }
    },
  },
})
