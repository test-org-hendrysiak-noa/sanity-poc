import { defineField, defineType } from "sanity";

export const quote = defineType({
  name: "quote",
  title: "Quote",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Author Role / Company",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "author", subtitle: "quote" },
    prepare({ title, subtitle }) {
      return { title: title || "Quote Block", subtitle };
    },
  },
});
