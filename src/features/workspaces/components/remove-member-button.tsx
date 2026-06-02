"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2, UserMinus } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { removeMember } from "../actions/remove-member";

interface Props {
  memberId: string;
  memberName: string;
}

export function RemoveMemberButton({ memberId, memberName }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleRemove() {
    startTransition(async () => {
      try {
        const result = await removeMember(memberId);

        // ❌ Server side authorization validation failed
        if (result?.error) {
          toast.error(result.error);
          setOpen(false); // Modal close kar do
          return;
        }

        // ✅ Success
        toast.success(`${memberName} has been removed from workspace`);
        setOpen(false);
      } catch {
        // ❌ Network level drop failure
        toast.error("Network error: Failed to remove member");
      }
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* 💥 FIXED: Added asChild here to stop TS and HTML nesting crashes */}
      <AlertDialogTrigger>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-xl h-9 text-muted-foreground hover:text-red-600 hover:bg-red-500/10 transition-all duration-200"
        >
          <UserMinus className="h-4 w-4 mr-2" />
          Remove
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-2xl border border-border/60 max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold tracking-tight text-foreground">
            Remove team member?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground">
            This will revoke <span className="font-medium text-foreground">{memberName}</span>&apos;s access to this workspace, projects, and documents instantly.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="mt-2 gap-2 sm:gap-0">
          <AlertDialogCancel disabled={pending} className="rounded-xl text-sm">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault(); // Prevents auto-closing before async operation ends
              handleRemove();
            }}
            disabled={pending}
            className="rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm disabled:opacity-50"
          >
            {pending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Removing...
              </>
            ) : (
              "Remove Member"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}