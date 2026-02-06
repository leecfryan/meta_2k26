"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ActionState = { ok: boolean; message: string };
const initialState: ActionState = { ok: false, message: "" };

export default function ClanCreateForm({
  action,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction] = React.useActionState(action, initialState);

  return (
    <form action={formAction} className="flex gap-2 items-start">
      <div className="flex-1 space-y-2">
        <Input name="name" placeholder="e.g. Clan A" />
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
