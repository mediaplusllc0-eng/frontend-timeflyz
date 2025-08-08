// components/Portal.tsx
"use client"
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const Portal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
    elRef.current.style.position = "absolute";
    elRef.current.style.top = "0";
    elRef.current.style.left = "0";
    elRef.current.style.zIndex = "9999"; // or whatever you need
  }

  useEffect(() => {
    document.body.appendChild(elRef.current!);
    setMounted(true);

    return () => {
      document.body.removeChild(elRef.current!);
    };
  }, []);

  return mounted ? createPortal(children, elRef.current!) : null;
};
