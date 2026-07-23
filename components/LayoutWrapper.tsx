"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

 const isAdmin =
  pathname === "/admin" ||
  pathname.startsWith("/admin") ||
  pathname.startsWith("/en/admin") ||
  pathname.startsWith("/ar/admin");

  return (
    <>
      {!isAdmin && <Navbar />}

      {children}

      {!isAdmin && <Footer />}
    </>
  );
}