import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}

const ERROR_MESSAGES: Record<string, string> = {
  AccessDenied:
    "Your GitHub account is not a member of the required organisation.",
  OAuthSignin: "Could not start the GitHub sign-in flow. Please try again.",
  OAuthCallback: "GitHub returned an error during sign-in. Please try again.",
  Default: "An unexpected error occurred. Please try again.",
};

export default async function LoginPage({ searchParams }: Props) {
  const session = await auth();
  const { callbackUrl, error } = await searchParams;

  const errorMessage = error ? (ERROR_MESSAGES[error] ?? ERROR_MESSAGES.Default) : null;

  if (session?.user && !errorMessage) {
    redirect(callbackUrl ?? "/studio");
  }

  return (
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-neutral-800 mb-6">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Studio access
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Sign in with your GitHub account to continue
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 rounded-xl bg-red-950 border border-red-800 px-4 py-3 text-sm text-red-300">
            {errorMessage}
          </div>
        )}

        <form
          action={async () => {
            "use server";
            await signIn("github", {
              redirectTo: callbackUrl ?? "/studio",
            });
          }}
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 rounded-xl bg-white text-neutral-900 px-4 py-3 text-sm font-medium hover:bg-neutral-100 active:bg-neutral-200 transition-colors cursor-pointer"
          >
            <GitHubIcon />
            Sign in with GitHub
          </button>
        </form>
      </div>
    </main>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
