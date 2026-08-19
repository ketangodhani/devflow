"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2, UserMinus, AlertTriangle } from "lucide-react";

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

        if (result?.error) {
          toast.error(result.error);
          setOpen(false); 
          return;
        }

        toast.success(`${memberName} has been removed from workspace`);
        setOpen(false);
      } catch {
        toast.error("Network error: Failed to remove member");
      }
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl h-9 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 active:scale-[0.98] transition-all duration-200"
          >
            <UserMinus className="h-4 w-4 mr-2" />
            Remove
          </Button>
        }
      />

      {/* COMPLETE REDESIGN: Exact same solid aesthetic spec of delete workspace dialog */}
      <AlertDialogContent className="rounded-2xl border border-red-500/20 bg-card p-6 max-w-[420px] shadow-2xl shadow-red-500/[0.03]">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            {/* Soft background solid icon box to emphasize destructive action */}
            <div className="p-2 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 shrink-0">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <AlertDialogTitle className="text-lg font-semibold tracking-tight text-foreground">
              Remove team member?
            </AlertDialogTitle>
          </div>
          
          <AlertDialogDescription className="text-xs text-muted-foreground leading-relaxed pt-3 space-y-3">
            <p>
              This will revoke <span className="font-semibold text-foreground">{memberName}</span>&apos;s access to this workspace, projects, and documents instantly.
            </p>
            {/* Premium red banner highlight card block matching the workspace dialog layout */}
            <p className="border-l-2 border-red-500 bg-red-500/[0.04] p-3 rounded-r-xl text-foreground/90 font-medium">
              Warning: This member will lose all ongoing task ownerships and collaboration privileges in this workspace session.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="mt-5 gap-2 sm:gap-0">
          <AlertDialogCancel 
            disabled={pending} 
            className="rounded-xl text-xs font-medium h-9 border-border/80 hover:bg-muted"
          >
            Cancel
          </AlertDialogCancel>
          
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault(); 
              handleRemove();
            }}
            disabled={pending}
            className="rounded-xl text-xs font-medium h-9 bg-red-600 hover:bg-red-700 text-white transition-colors shadow-sm shadow-red-600/20 disabled:opacity-50"
          >
            {pending ? (
              <div className="flex items-center gap-1.5">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Removing...</span>
              </div>
            ) : (
              "Remove Member"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}