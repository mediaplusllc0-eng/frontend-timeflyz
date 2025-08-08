// app/favorites/layout.tsx

import Sidebar from "../page-components/Sidebar";

export default function FavoritesLayout({ children }: { children: React.ReactNode }) {
  return <Sidebar>{children}</Sidebar>;
}
