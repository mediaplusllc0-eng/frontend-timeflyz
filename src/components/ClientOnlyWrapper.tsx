"use client";

export default function ClientOnlyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
