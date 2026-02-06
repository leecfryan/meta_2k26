"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ActionState = { ok: boolean; message: string };
const initialState: ActionState = { ok: false, message: "" };

export default function SubclanCreateForm({
  clans,
  action,
}: {
  clans: { id: string; name: string }[];
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction] = React.useActionState(action, initialState);

  return (
    <form action={formAction} className="flex gap-2 items-start flex-wrap">
      <div className="w-56 space-y-2">
        <select
          name="clanId"
          className="w-full border rounded px-3 py-2"
          defaultValue=""
        >
          <option value="" disabled>
            Select clan...
          </option>
          {clans.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <Input name="name" placeholder="e.g. Subclan 1" />
        {state.message && (
          <p
            className={`text-sm ${state.ok ? "text-green-600" : "text-red-600"}`}
          >
            {state.message}
          </p>
        )}
      </div>

      <Button type="submit">Create</Button>
    </form>
  );
}
