import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase";

export type Role = "SUPERUSER" | "ADMIN" | "GAMEMASTER" | "FACILITATOR";

export async function getCurrentProfile() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("users")
    .select("id, auth_user_id, email, name, role, facilitator_subclan_id")
    .eq("auth_user_id", user.id)
    .single();

  if (!profile) return null;
  return { user, profile };
}

export async function requireRole(allowed: Role[]) {
  const result = await getCurrentProfile();

  if (!result) redirect("/login");

  if (!allowed.includes(result.profile.role as Role)) {
    redirect("/not-authorized");
  }

  return result;
}
