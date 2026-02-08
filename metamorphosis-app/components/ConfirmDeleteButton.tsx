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

export default function ConfirmDeleteButton({
  triggerText = "Delete",
  title,
  description,
  confirmForm,
  variant = "destructive",
}: {
  triggerText?: string;
  title: string;
  description: string;
  confirmForm: React.ReactNode;
  variant?: "destructive" | "secondary" | "outline" | "default";
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size="sm" type="button">
          {triggerText}
        </Button>
      </DialogTrigger>

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

          {/* Wrap confirm form so it closes dialog on submit */}
          <div onClick={() => setOpen(false)}>{confirmForm}</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
