"use client";

import { useState } from "react";

import { toast } from "sonner";

import { inviteMember } from "@/features/workspaces/actions/invite-member";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface InviteMemberDialogProps {
  workspaceId: string;
}

export function InviteMemberDialog({
  workspaceId,
}: InviteMemberDialogProps) {
  const [email, setEmail] = useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleInvite() {
    try {
      setLoading(true);

      const res = await inviteMember({
        email,
        workspaceId,
      });

      if (res.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Member invited");

      setEmail("");

    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <button className="rounded-xl bg-foreground px-4 py-2 text-background">
          Invite Member
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Invite Member
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border border-border bg-background p-3"
          />

          <button
            disabled={loading}
            onClick={handleInvite}
            className="w-full rounded-xl bg-foreground p-3 text-background"
          >
            {loading
              ? "Inviting..."
              : "Invite"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}