"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(pathname === "/");

  useEffect(() => {
    if (pathname === "/") {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1700);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-opacity-20">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src="/TimeFlyzNoBG.gif"
            alt="Loading..."
            className="w-24 h-24 opacity-100"
          />
          <p className="text-red-600 text-7xl font-semibold animate-pulse"></p>
        </div>
      </div>
    );
  }

  return <main>{children}</main>;
}
