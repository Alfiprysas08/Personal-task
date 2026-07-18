import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Personal Task
        </h1>

        <p className="mt-4 text-lg text-zinc-400">
          Organize your work, manage your projects, and boost your productivity
          in one place.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}