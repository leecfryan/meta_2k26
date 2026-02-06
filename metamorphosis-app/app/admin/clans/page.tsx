import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { requireRole } from "@/lib/authz";
import { createClanAction, deleteClanAction } from "./actions";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ClanCreateForm from "./ui/ClanCreateForm";

export default async function AdminClansPage() {
  await requireRole(["ADMIN", "SUPERUSER"]);
  const admin = createSupabaseAdminClient();

  const { data: clans, error } = await admin
    .from("clans")
    .select("id,name")
    .order("name", { ascending: true });

  if (error) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Clans</h1>
        <p className="text-red-600 text-sm">
          Failed to load clans: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Clans</h1>
        <p className="text-sm text-muted-foreground">
          Create and manage clans for Metamorphosis.
        </p>
      </div>

      <Card>
        <CardContent className="p-4 space-y-3">
          <h2 className="font-semibold">Create Clan</h2>

          {/* Client component form for nice UX (form state & message) */}
          <ClanCreateForm action={createClanAction} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-3">Existing Clans</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="w-28 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {(clans ?? []).map((clan) => (
                <TableRow key={clan.id}>
                  <TableCell className="font-medium">{clan.name}</TableCell>
                  <TableCell className="text-right">
                    <form
                      action={async () => {
                        "use server";
                        await deleteClanAction(clan.id);
                      }}
                    >
                      <Button variant="destructive" size="sm" type="submit">
                        Delete
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}

              {(!clans || clans.length === 0) && (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-sm text-muted-foreground"
                  >
                    No clans yet. Create one above.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
