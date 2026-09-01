import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

/**
 * Checks whether the authenticated GitHub user is an active member of the
 * organisation configured in GITHUB_ORG.
 *
 * Uses GET /user/memberships/orgs/{org} with the user's own access token so
 * that private membership is visible (requires the `read:org` OAuth scope).
 * Returns true when no GITHUB_ORG is set (no restriction).
 */
async function checkOrgMembership(accessToken: string): Promise<boolean> {
  const org = process.env.GITHUB_ORG;
  if (!org) return true;

  const res = await fetch(
    `https://api.github.com/user/memberships/orgs/${org}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) return false;

  const { state } = (await res.json()) as { state: string };

  // "active" = accepted invite; "pending" = invited but not yet accepted.
  return state === "active";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          // read:org is required to check private organisation membership.
          scope: "read:user user:email read:org",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.provider !== "github" || !account.access_token) return false;
      return checkOrgMembership(account.access_token);
    },
    authorized({ auth: session }) {
      return !!session?.user;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
