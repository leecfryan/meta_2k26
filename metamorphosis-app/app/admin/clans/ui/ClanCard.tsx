import ClanCardShell from "./ClanCardShell";
import InlineSubclanCreateForm from "./InlineSubclanCreateForm";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import ConfirmDialogForm from "@/components/ConfirmDialogForm";

import { deleteClanAction } from "@/app/admin/clans/actions";
import {
  createSubclanAction,
  deleteSubclanAction,
} from "@/app/admin/subclans/actions";

export default function ClanCard({
  clan,
  colorClass,
  subclans,
}: {
  clan: { id: string; name: string };
  colorClass: string;
  subclans: { id: string; name: string }[];
}) {
  return (
    <ClanCardShell
      header={
        <div
          className={`${colorClass} text-white px-4 py-3 flex justify-between items-center`}
        >
          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg">{clan.name}</span>
            <Badge variant="secondary" className="text-black">
              Subclans: {subclans.length}
            </Badge>
          </div>
          <span className="text-sm opacity-90">Click to toggle ▲▼</span>
        </div>
      }
    >
      <div className="p-4 space-y-3">
        {/* Subclans */}
        {subclans.map((sub) => (
          <div
            key={sub.id}
            className="flex justify-between items-center border rounded px-3 py-2"
          >
            <span className="font-medium">▸ {sub.name}</span>

            <ConfirmDialogForm
              title="Delete subclan?"
              description={`This will permanently delete "${sub.name}". This cannot be undone.`}
              trigger={
                <Button variant="destructive" size="sm" type="button">
                  Delete
                </Button>
              }
              confirmForm={
                <form
                  action={async () => {
                    "use server";
                    await deleteSubclanAction(sub.id);
                  }}
                >
                  <Button variant="destructive" size="sm" type="submit">
                    Confirm Delete
                  </Button>
                </form>
              }
            />
          </div>
        ))}

        {/* Add Subclan */}
        <div className="pt-2">
          <InlineSubclanCreateForm
            clanId={clan.id}
            action={createSubclanAction}
          />
        </div>

        {/* Delete Clan */}
        <div className="pt-4 border-t flex justify-end">
          <ConfirmDialogForm
            title="Delete clan?"
            description={`This will delete "${clan.name}" and may also remove its subclans. This cannot be undone.`}
            trigger={
              <Button variant="secondary" size="sm" type="button">
                Delete Clan
              </Button>
            }
            confirmForm={
              <form
                action={async () => {
                  "use server";
                  await deleteClanAction(clan.id);
                }}
              >
                <Button variant="destructive" size="sm" type="submit">
                  Confirm Delete
                </Button>
              </form>
            }
          />
        </div>
      </div>
    </ClanCardShell>
  );
}
