export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">

      {/* LEFT SIDE */}

      <div className="hidden flex-col justify-between bg-zinc-950 p-10 text-white lg:flex">

        <div>
          <h1 className="text-3xl font-bold">
            DevFlow
          </h1>
        </div>

        <div className="space-y-6">
          <h2 className="text-5xl font-bold leading-tight">
            Manage projects like a modern engineering team.
          </h2>

          <p className="max-w-md text-zinc-400">
            Build, collaborate, and organize your workflow
            with an AI-powered productivity platform.
          </p>
        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex items-center justify-center bg-black p-6">
        {children}
      </div>

    </div>
  );
}