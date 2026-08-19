"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to register");
      }

      toast.success("Account created! Please log in.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-card/50 p-8 backdrop-blur">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold text-foreground">
          Create Account
        </h1>
        <p className="text-muted-foreground">
          Get started with DevFlow for your engineering team
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full rounded-xl border border-border bg-background p-4 text-foreground outline-none transition focus:border-zinc-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-xl border border-border bg-background p-4 text-foreground outline-none transition focus:border-zinc-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          required
          minLength={6}
          className="w-full rounded-xl border border-border bg-background p-4 text-foreground outline-none transition focus:border-zinc-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          type="submit"
          className="w-full rounded-xl bg-foreground p-4 font-medium text-background transition hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div className="my-6 h-px bg-border/60" />

      <button
        onClick={() =>
          signIn("github", {
            callbackUrl: "/dashboard",
          })
        }
        className="w-full rounded-xl border border-border bg-card p-4 text-foreground transition hover:bg-muted cursor-pointer"
      >
        Continue with GitHub
      </button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground underline underline-offset-4 hover:opacity-80"
        >
          Log In
        </Link>
      </p>
    </div>
  );
}