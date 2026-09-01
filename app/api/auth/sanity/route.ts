import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Custom Sanity Studio auth provider endpoint.
 *
 * Studio redirects here (auth.providers[].url). Flow:
 *   1. Require a NextAuth GitHub session. Org membership is already
 *      checked in the signIn callback — unauthorised users never get here
 *      with a valid session.
 *   2. Forward Sanity's original query params (origin, projectId, type)
 *      to Sanity's own GitHub login so Studio can set its session cookie.
 *
 * https://www.sanity.io/docs/studio/custom-auth
 */
export async function GET(request: NextRequest) {
  const session = await auth();
  const origin = new URL(request.url).origin;

  if (!session?.user) {
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const sanityGitHubUrl = new URL("https://api.sanity.io/v1/auth/login/github");
  request.nextUrl.searchParams.forEach((value, key) => {
    sanityGitHubUrl.searchParams.set(key, value);
  });

  if (!sanityGitHubUrl.searchParams.has("origin")) {
    sanityGitHubUrl.searchParams.set("origin", `${origin}/studio`);
  }

  return NextResponse.redirect(sanityGitHubUrl.toString());
}
