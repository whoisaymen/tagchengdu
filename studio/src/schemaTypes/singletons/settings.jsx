import { CogIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import * as demo from '../../lib/initialValues';
/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */
export const settings = defineType({
    name: 'settings',
    title: 'Settings',
    type: 'document',
    icon: CogIcon,
    fields: [
        // in settings schema (singleton)
        defineField({
            name: 'spaces',
            title: 'Spaces / Rooms 场地空间',
            type: 'array',
            description: 'Define the club spaces once (downstairs, upstairs, garden).',
            of: [
                defineField({
                    name: 'space',
                    title: 'Space',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'key',
                            title: 'Key',
                            type: 'string',
                            description: 'Stable id (downstairs, upstairs, garden)',
                            validation: (Rule) => Rule.required().regex(/^[a-z0-9_-]+$/, { name: 'slug-like' }),
                        }),
                        defineField({
                            name: 'nameCn',
                            title: 'Name (CN)',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'nameEn',
                            title: 'Name (EN)',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'orderIndex',
                            title: 'Order',
                            type: 'number',
                            initialValue: 0,
                        }),
                    ],
                    preview: {
                        select: { cn: 'nameCn', en: 'nameEn', key: 'key' },
                        prepare({ cn, en, key }) {
                            return { title: `${en} / ${cn}`, subtitle: `key: ${key}` };
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: 'title',
            description: 'This field is the title of your blog.',
            title: 'Title',
            type: 'string',
            initialValue: demo.title,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            description: 'Used on the Homepage',
            title: 'Description',
            type: 'array',
            initialValue: demo.description,
            of: [
                // Define a minified block content field for the description. https://www.sanity.io/docs/block-content
                defineArrayMember({
                    type: 'block',
                    options: {},
                    styles: [],
                    lists: [],
                    marks: {
                        decorators: [],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    defineField({
                                        name: 'linkType',
                                        title: 'Link Type',
                                        type: 'string',
                                        initialValue: 'href',
                                        options: {
                                            list: [
                                                { title: 'URL', value: 'href' },
                                                { title: 'Page', value: 'page' },
                                                { title: 'Post', value: 'post' },
                                            ],
                                            layout: 'radio',
                                        },
                                    }),
                                    defineField({
                                        name: 'href',
                                        title: 'URL',
                                        type: 'url',
                                        hidden: ({ parent }) => (parent === null || parent === void 0 ? void 0 : parent.linkType) !== 'href' && (parent === null || parent === void 0 ? void 0 : parent.linkType) != null,
                                        validation: (Rule) => Rule.custom((value, context) => {
                                            var _a;
                                            if (((_a = context.parent) === null || _a === void 0 ? void 0 : _a.linkType) === 'href' && !value) {
                                                return 'URL is required when Link Type is URL';
                                            }
                                            return true;
                                        }),
                                    }),
                                    defineField({
                                        name: 'page',
                                        title: 'Page',
                                        type: 'reference',
                                        to: [{ type: 'page' }],
                                        hidden: ({ parent }) => (parent === null || parent === void 0 ? void 0 : parent.linkType) !== 'page',
                                        validation: (Rule) => Rule.custom((value, context) => {
                                            var _a;
                                            if (((_a = context.parent) === null || _a === void 0 ? void 0 : _a.linkType) === 'page' && !value) {
                                                return 'Page reference is required when Link Type is Page';
                                            }
                                            return true;
                                        }),
                                    }),
                                    defineField({
                                        name: 'post',
                                        title: 'Post',
                                        type: 'reference',
                                        to: [{ type: 'post' }],
                                        hidden: ({ parent }) => (parent === null || parent === void 0 ? void 0 : parent.linkType) !== 'post',
                                        validation: (Rule) => Rule.custom((value, context) => {
                                            var _a;
                                            if (((_a = context.parent) === null || _a === void 0 ? void 0 : _a.linkType) === 'post' && !value) {
                                                return 'Post reference is required when Link Type is Post';
                                            }
                                            return true;
                                        }),
                                    }),
                                    defineField({
                                        name: 'openInNewTab',
                                        title: 'Open in new tab',
                                        type: 'boolean',
                                        initialValue: false,
                                    }),
                                ],
                            },
                        ],
                    },
                }),
            ],
        }),
        defineField({
            name: 'ogImage',
            title: 'Open Graph Image',
            type: 'image',
            description: 'Displayed on social cards and search engine results.',
            options: {
                hotspot: true,
                aiAssist: {
                    imageDescriptionField: 'alt',
                },
            },
            fields: [
                defineField({
                    name: 'alt',
                    description: 'Important for accessibility and SEO.',
                    title: 'Alternative text',
                    type: 'string',
                    validation: (rule) => {
                        return rule.custom((alt, context) => {
                            var _a, _b, _c;
                            if (((_c = (_b = (_a = context.document) === null || _a === void 0 ? void 0 : _a.ogImage) === null || _b === void 0 ? void 0 : _b.asset) === null || _c === void 0 ? void 0 : _c._ref) && !alt) {
                                return 'Required';
                            }
                            return true;
                        });
                    },
                }),
                defineField({
                    name: 'metadataBase',
                    type: 'url',
                    description: (<a href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase" rel="noreferrer noopener">
              More information
            </a>),
                }),
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Settings',
            };
        },
    },
});
