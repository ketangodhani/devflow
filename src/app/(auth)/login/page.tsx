"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid credentials");
        return;
      }

      toast.success("Welcome back");

      router.push("/dashboard");

    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-card/50 p-8 backdrop-blur">

      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold text-foreground">
          Welcome back
        </h1>

        <p className="text-zinc-400">
          Login to continue to DevFlow
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-border bg-background p-4 text-foreground outline-none transition focus:border-zinc-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-border bg-background p-4 text-foreground outline-none transition focus:border-zinc-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full rounded-xl bg-white p-4 font-medium text-black transition hover:opacity-90"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <div className="my-6 h-px bg-zinc-800" />

      <button
        onClick={() =>
          signIn("github", {
            callbackUrl: "/dashboard",
          })
        }
        className="w-full rounded-xl border border-border bg-background p-4 text-foreground transition hover:bg-zinc-900"
      >
        Continue with GitHub
      </button>

    </div>
  );
}