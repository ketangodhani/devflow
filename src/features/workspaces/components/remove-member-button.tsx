"use client";

import { useTransition } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { removeMember } from "../actions/remove-member";

interface Props {
  memberId: string;
}

export function RemoveMemberButton({
  memberId,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={pending}
      onClick={() => {
        const confirmed =
          window.confirm(
            "Remove this member?"
          );

        if (!confirmed) return;

        startTransition(async () => {
          try {
            await removeMember(memberId);

            toast.success(
              "Member removed"
            );
          } catch {
            toast.error(
              "Failed to remove member"
            );
          }
        });
      }}
    >
      Remove
    </Button>
  );
}