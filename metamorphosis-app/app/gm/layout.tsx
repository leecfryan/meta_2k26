import LogoutButton from "@/components/LogoutButton";
import { requireRole } from "@/lib/authz";

export default async function GMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["GAMEMASTER", "ADMIN", "SUPERUSER"]);

  return (
    <div className="min-h-screen">
      <header className="border-b p-4 font-bold">Gamemaster</header>
      <LogoutButton />
      <main className="p-6">{children}</main>
    </div>
  );
}
