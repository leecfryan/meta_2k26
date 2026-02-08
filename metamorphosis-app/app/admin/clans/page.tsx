import { requireRole } from "@/lib/authz";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";

import { createClanAction, deleteClanAction } from "./actions";
import { createSubclanAction, deleteSubclanAction } from "../subclans/actions";

import ClanCreateForm from "./ui/ClanCreateForm";
import SubclanCreateForm from "../subclans/ui/SubclanCreateForm";
import ClanCard from "./ui/ClanCard";

import { Button } from "@/components/ui/button";

const clanColors = [
  "bg-purple-600",
  "bg-blue-600",
  "bg-green-600",
  "bg-pink-600",
  "bg-orange-600",
  "bg-red-600",
];

type Clan = { id: string; name: string };
type Subclan = { id: string; name: string; clan_id: string };

export default async function AdminClansPage() {
  await requireRole(["ADMIN", "SUPERUSER"]);

  const admin = createSupabaseAdminClient();

  const { data: clans, error: clansError } = await admin
    .from("clans")
    .select("id,name")
    .order("name", { ascending: true });

  const { data: subclans, error: subclansError } = await admin
    .from("subclans")
    .select("id,name,clan_id")
    .order("name", { ascending: true });

  if (clansError || subclansError) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Metamorphosis Structure</h1>
        <p className="text-red-600 text-sm">
          Failed to load data: {clansError?.message ?? subclansError?.message}
        </p>
      </div>
    );
  }

  const clansList = (clans ?? []) as Clan[];
  const subclansList = (subclans ?? []) as Subclan[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Metamorphosis Structure</h1>
        <p className="text-muted-foreground text-sm">
          Manage clans and subclans in one place.
        </p>
      </div>

      {/* Clan Cards */}
      <div className="grid gap-6">
        {clansList.map((clan, index) => {
          const color = clanColors[index % clanColors.length];
          const clanSubclans = subclansList
            .filter((s) => s.clan_id === clan.id)
            .map((s) => ({ id: s.id, name: s.name }));

          return (
            <ClanCard
              key={clan.id}
              clan={clan}
              colorClass={color}
              subclans={clanSubclans}
            />
          );
        })}

        {clansList.length === 0 && (
          <div className="rounded-xl border p-6 text-sm text-muted-foreground">
            No clans yet. Create your first clan below.
          </div>
        )}
      </div>

      {/* Create Clan */}
      <div className="rounded-xl border p-6 bg-gray-50 space-y-3">
        <h2 className="font-semibold">Create New Clan</h2>
        <ClanCreateForm action={createClanAction} />
      </div>
    </div>
  );
}
