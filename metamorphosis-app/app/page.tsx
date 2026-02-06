import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/authz";

export default async function Home() {
  const result = await getCurrentProfile();
  if (!result) redirect("/login");

  const role = result.profile.role;

  if (role === "ADMIN" || role === "SUPERUSER") redirect("/admin");
  if (role === "GAMEMASTER") redirect("/gm");
  redirect("/facilitator");
}
