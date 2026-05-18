import { ReactNode } from "react";

interface ProjectLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function ProjectLayout({
  children,
  modal,
}: ProjectLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}