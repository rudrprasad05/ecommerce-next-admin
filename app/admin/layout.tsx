import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="en">
      <Nav>{children}</Nav>
    </div>
  );
}
