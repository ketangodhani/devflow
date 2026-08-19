"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/icons";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
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
    <div className="w-full max-w-md rounded-3xl border border-border/80 bg-card/80 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
          Create Account
        </h1>
        <p className="text-sm text-muted-foreground">
          Get started with DevFlow for your engineering team
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Full Name Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Ketan Godhani"
              required
              className="w-full rounded-xl border border-border bg-background/80 pl-11 pr-4 py-3 text-sm text-foreground outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Work Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              placeholder="name@company.com"
              required
              className="w-full rounded-xl border border-border bg-background/80 pl-11 pr-4 py-3 text-sm text-foreground outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Min. 6 characters"
              required
              minLength={6}
              className="w-full rounded-xl border border-border bg-background/80 pl-11 pr-11 py-3 text-sm text-foreground outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
        >
          <span>{loading ? "Creating Account..." : "Create Account & Workspace"}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60" />
        </div>
        <span className="relative bg-card px-3 text-xs text-muted-foreground uppercase font-medium">
          Or continue with
        </span>
      </div>

      {/* GitHub OAuth Button */}
      <button
        onClick={() =>
          signIn("github", {
            callbackUrl: "/dashboard",
          })
        }
        className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl border border-border bg-background/60 p-3.5 text-sm font-semibold text-foreground transition hover:bg-muted cursor-pointer"
      >
        <GithubIcon className="h-4 w-4" />
        <span>Sign up with GitHub</span>
      </button>

      {/* Switch to Login */}
      <p className="text-center text-xs text-muted-foreground pt-2">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-indigo-500 hover:text-indigo-400 underline underline-offset-4"
        >
          Log In
        </Link>
      </p>
    </div>
  );
}