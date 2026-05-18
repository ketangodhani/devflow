import { ReactNode } from "react";

interface ProjectLayoutProps {
  children: ReactNode;
}

export default function ProjectLayout({
  children,
}: ProjectLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}