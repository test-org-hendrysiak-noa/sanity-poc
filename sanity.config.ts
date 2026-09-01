import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";

const appUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  apiVersion,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  auth: {
    // Replaces Sanity's default providers. See:
    // https://www.sanity.io/docs/studio/custom-auth
    providers: [
      {
        name: "github",
        title: "Sign in with GitHub",
        url: `${appUrl}/api/auth/sanity`,
      },
    ],
    redirectOnSingle: true,
  },
});
