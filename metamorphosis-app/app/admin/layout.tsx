import LogoutButton from "@/components/LogoutButton";
import { requireRole } from "@/lib/authz";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["ADMIN", "SUPERUSER"]);

  return (
    <div className="min-h-screen">
      <header className="border-b p-4 font-bold">Metamorphosis Admin</header>
      <LogoutButton />
      <main className="p-6">{children}</main>
    </div>
  );
}
