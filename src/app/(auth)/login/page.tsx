"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";
import Link from "next/link";

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
        toast.error("Invalid email or password");
        return;
      }

      toast.success("Welcome back");

      router.push("/api/workspaces/init");

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

        <p className="text-muted-foreground">
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
          className="w-full rounded-xl bg-foreground p-4 font-medium text-background transition hover:opacity-90 cursor-pointer disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="my-6 h-px bg-border/60" />

      <button
        onClick={() =>
          signIn("github", {
            callbackUrl: "/dashboard",
          })
        }
        className="w-full rounded-xl border border-border bg-card p-4 text-card-foreground transition hover:bg-muted cursor-pointer"
      >
        Continue with GitHub
      </button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-foreground underline underline-offset-4 hover:opacity-80"
        >
          Sign Up
        </Link>
      </p>

    </div>
  );
}