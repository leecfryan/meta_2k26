"use server";

import { requireRole } from "@/lib/authz";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { revalidatePath } from "next/cache";

type ActionState = { ok: boolean; message: string };

export async function createSubclanAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireRole(["ADMIN", "SUPERUSER"]);

  const clanId = String(formData.get("clanId") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();

  if (!clanId) return { ok: false, message: "Please choose a clan." };
  if (!name) return { ok: false, message: "Subclan name cannot be empty." };
  if (name.length > 40)
    return { ok: false, message: "Name too long (max 40)." };

  const admin = createSupabaseAdminClient();

  const { error } = await admin.from("subclans").insert({
    clan_id: clanId,
    name,
  });

  if (error) {
    if (String(error.message).toLowerCase().includes("duplicate")) {
      return {
        ok: false,
        message: "That subclan already exists in this clan.",
      };
    }
    return { ok: false, message: `Failed to create subclan: ${error.message}` };
  }

  revalidatePath("/admin/subclans");
  return { ok: true, message: "Subclan created." };
}

export async function deleteSubclanAction(id: string): Promise<ActionState> {
  await requireRole(["ADMIN", "SUPERUSER"]);

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("subclans").delete().eq("id", id);

  if (error)
    return { ok: false, message: `Failed to delete: ${error.message}` };

  revalidatePath("/admin/subclans");
  return { ok: true, message: "Subclan deleted." };
}
