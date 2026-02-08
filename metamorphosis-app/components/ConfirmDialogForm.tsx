"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ConfirmDialogForm({
  trigger,
  title,
  description,
  confirmForm,
}: {
  trigger: React.ReactNode; // button shown on the page
  title: string;
  description: string;
  confirmForm: React.ReactNode; // server form with action
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          {/* Close dialog when the confirm button is clicked */}
          <div onClick={() => setOpen(false)}>{confirmForm}</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
