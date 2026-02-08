"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ActionState = { ok: boolean; message: string };
const initialState: ActionState = { ok: false, message: "" };

export default function InlineSubclanCreateForm({
  clanId,
  action,
}: {
  clanId: string;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction] = React.useActionState(action, initialState);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (state.ok) setValue("");
  }, [state.ok]);

  return (
    <form action={formAction} className="flex gap-2 items-start">
      <input type="hidden" name="clanId" value={clanId} />

      <div className="flex-1 space-y-2">
        <Input
          name="name"
          placeholder="Add a subclan (e.g. Subclan 1)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {state.message && (
          <p
            className={`text-sm ${state.ok ? "text-green-600" : "text-red-600"}`}
          >
            {state.message}
          </p>
        )}
      </div>

      <Button type="submit">Add</Button>
    </form>
  );
}
