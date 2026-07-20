import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12 sm:px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Personal Task
        </h1>

        <p className="mt-4 text-base text-zinc-400 sm:text-lg">
          Organize your work, manage your projects, and boost your productivity
          in one place.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
