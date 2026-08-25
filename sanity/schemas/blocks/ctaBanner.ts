import { defineField, defineType } from "sanity";

export const ctaBanner = defineType({
  name: "ctaBanner",
  title: "CTA Banner",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "buttonLabel",
      title: "Button Label",
      type: "string",
    }),
    defineField({
      name: "buttonUrl",
      title: "Button URL",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title, subtitle: "CTA Banner Block" };
    },
  },
});
