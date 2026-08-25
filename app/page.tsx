import PageBuilder from "@/components/PageBuilder";
import Link from "next/link";

async function getHomePage() {
  try {
    const { client } = await import("@/sanity/client");
    const data = await client.fetch(
      `*[_type == "page" && slug.current == "home"][0]{
        title,
        blocks[] {
          ...,
          _type,
          _key
        }
      }`,
      {},
      { next: { revalidate: 60 } }
    );
    return data;
  } catch {
    return null;
  }
}

export default async function Home() {
  const page = await getHomePage();

  if (!page) {
    return <NotConnected />;
  }

  return (
    <main>
      {page.blocks?.length > 0 ? (
        <PageBuilder blocks={page.blocks} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">{page.title}</h1>
          <p className="text-slate-500">No blocks added yet. Open the Studio and add some content.</p>
          <Link
            href="/studio"
            className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-500 transition-colors"
          >
            Open Studio
          </Link>
        </div>
      )}
    </main>
  );
}

function NotConnected() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-6">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
        <div className="text-5xl mb-6">🔌</div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Sanity not connected yet
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Set up your Sanity project and add your credentials to{" "}
          <code className="bg-slate-100 px-2 py-0.5 rounded text-sm font-mono">
            .env.local
          </code>{" "}
          to get started.
        </p>

        <div className="text-left bg-slate-50 rounded-xl p-5 mb-8 font-mono text-sm text-slate-700 space-y-1">
          <p>
            <span className="text-slate-400"># .env.local</span>
          </p>
          <p>NEXT_PUBLIC_SANITY_PROJECT_ID=<span className="text-indigo-500">your-id</span></p>
          <p>NEXT_PUBLIC_SANITY_DATASET=<span className="text-indigo-500">production</span></p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://sanity.io/manage"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-indigo-500 transition-colors"
          >
            Create Sanity Project
          </a>
          <Link
            href="/studio"
            className="border border-slate-300 text-slate-700 font-semibold px-6 py-3 rounded-full hover:bg-slate-50 transition-colors"
          >
            Open Studio
          </Link>
        </div>
      </div>
    </main>
  );
}
