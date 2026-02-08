"use client";

import * as React from "react";

export default function ClanCardShell({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="rounded-xl border shadow-sm overflow-hidden">
      <div onClick={() => setOpen((v) => !v)} className="cursor-pointer">
        {header}
      </div>
      {open && <div className="bg-white">{children}</div>}
    </div>
  );
}
