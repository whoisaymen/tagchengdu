import { DocumentTextIcon } from '@sanity/icons';
import { format, parseISO } from 'date-fns';
import { defineField, defineType } from 'sanity';
/**
 * Post schema.  Define and edit the fields for the 'post' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */
export const post = defineType({
    name: 'post',
    title: 'Post',
    icon: DocumentTextIcon,
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'A slug is required for the post to show up in the preview',
            options: {
                source: 'title',
                maxLength: 96,
                isUnique: (value, context) => context.defaultIsUnique(value, context),
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'blockContent',
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
                aiAssist: {
                    imageDescriptionField: 'alt',
                },
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    description: 'Important for SEO and accessibility.',
                    validation: (rule) => {
                        // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
                        return rule.custom((alt, context) => {
                            var _a, _b, _c;
                            if (((_c = (_b = (_a = context.document) === null || _a === void 0 ? void 0 : _a.coverImage) === null || _b === void 0 ? void 0 : _b.asset) === null || _c === void 0 ? void 0 : _c._ref) && !alt) {
                                return 'Required';
                            }
                            return true;
                        });
                    },
                },
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'person' }],
        }),
    ],
    // List preview configuration. https://www.sanity.io/docs/previews-list-views
    preview: {
        select: {
            title: 'title',
            authorFirstName: 'author.firstName',
            authorLastName: 'author.lastName',
            date: 'date',
            media: 'coverImage',
        },
        prepare({ title, media, authorFirstName, authorLastName, date }) {
            const subtitles = [
                authorFirstName && authorLastName && `by ${authorFirstName} ${authorLastName}`,
                date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
            ].filter(Boolean);
            return { title, media, subtitle: subtitles.join(' ') };
        },
    },
});
