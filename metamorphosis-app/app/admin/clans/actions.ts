"use server";

import { requireRole } from "@/lib/authz";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { revalidatePath } from "next/cache";

type ActionState = { ok: boolean; message: string };

export async function createClanAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  //Ensure only ADMIN/SUPERUSER can run this action
  await requireRole(["ADMIN", "SUPERUSER"]);

  const name = String(formData.get("name") ?? "").trim();

  if (!name) return { ok: false, message: "Clan name cannot be empty." };
  if (name.length > 40)
    return { ok: false, message: "Clan name too long (max 40)." };

  const admin = createSupabaseAdminClient();

  const { error } = await admin.from("clans").insert({ name });

  if (error) {
    //unique constraint violation often shows up like this
    if (String(error.message).toLowerCase().includes("duplicate")) {
      return { ok: false, message: "That clan name already exists." };
    }
    return { ok: false, message: `Failed to create clan: ${error.message}` };
  }

  revalidatePath("/admin/clans");
  return { ok: true, message: "Clan created." };
}

export async function deleteClanAction(clanId: string): Promise<ActionState> {
  await requireRole(["ADMIN", "SUPERUSER"]);

  const admin = createSupabaseAdminClient();

  const { error } = await admin.from("clans").delete().eq("id", clanId);

  if (error) {
    return { ok: false, message: `Failed to delete: ${error.message}` };
  }

  revalidatePath("/admin/clans");
  return { ok: true, message: "Clan deleted." };
}
