"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

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

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      toast.success("Account created");

      router.push("/login");

    } catch (error) {
      toast.error("Failed to register");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md space-y-4 rounded-2xl border p-8"
      >
        <h1 className="text-3xl font-bold">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full rounded-lg border p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-lg border p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input  
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full rounded-lg bg-black p-3 text-white cursor-pointer"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}