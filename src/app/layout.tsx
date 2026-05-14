import type { Metadata } from "next";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";

import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "DevFlow",
  description: "Developer workspace platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}