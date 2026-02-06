import { requireRole } from "@/lib/authz";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { createSubclanAction, deleteSubclanAction } from "./actions";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SubclanCreateForm from "./ui/SubclanCreateForm";

export default async function AdminSubclansPage() {
  await requireRole(["ADMIN", "SUPERUSER"]);

  const admin = createSupabaseAdminClient();

  const { data: clans } = await admin
    .from("clans")
    .select("id,name")
    .order("name", { ascending: true });

  const { data: subclans, error } = await admin
    .from("subclans")
    .select("id,name, clan_id, clans(name)")
    .order("name", { ascending: true });

  if (error) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Subclans</h1>
        <p className="text-red-600 text-sm">Failed to load: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Subclans</h1>
        <p className="text-sm text-muted-foreground">
          Create subclans under clans.
        </p>
      </div>

      <Card>
        <CardContent className="p-4 space-y-3">
          <h2 className="font-semibold">Create Subclan</h2>
          <SubclanCreateForm clans={clans ?? []} action={createSubclanAction} />
          {(!clans || clans.length === 0) && (
            <p className="text-sm text-red-600">
              You need at least 1 clan before creating subclans.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-3">Existing Subclans</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Clan</TableHead>
                <TableHead>Subclan</TableHead>
                <TableHead className="w-28 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {(subclans ?? []).map((sc: any) => (
                <TableRow key={sc.id}>
                  <TableCell>{sc.clans?.name ?? "-"}</TableCell>
                  <TableCell className="font-medium">{sc.name}</TableCell>
                  <TableCell className="text-right">
                    <form
                      action={async () => {
                        "use server";
                        await deleteSubclanAction(sc.id);
                      }}
                    >
                      <Button variant="destructive" size="sm" type="submit">
                        Delete
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}

              {(!subclans || subclans.length === 0) && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-sm text-muted-foreground"
                  >
                    No subclans yet. Create one above.
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
