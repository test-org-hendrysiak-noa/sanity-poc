import { defineField, defineType } from "sanity";

export const featureCards = defineType({
  name: "featureCards",
  title: "Feature Cards",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "string",
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "card",
          fields: [
            defineField({ name: "icon", title: "Icon (emoji)", type: "string" }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "title", subtitle: "icon" },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Feature Cards", subtitle: "Feature Cards Block" };
    },
  },
});
