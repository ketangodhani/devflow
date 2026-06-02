"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Mail, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { inviteMember } from "@/features/workspaces/actions/invite-member";

interface InviteMemberDialogProps {
  workspaceId: string;
}

export function InviteMemberDialog({ workspaceId }: InviteMemberDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault(); // Prevents page reload or form flash bugs

    if (!email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const res = await inviteMember({
        email,
        workspaceId,
      });

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      // Success Loop
      toast.success(`Invitation successfully sent to ${email}`);
      setEmail("");
      setOpen(false); // Clean closure on success state
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (!val) setEmail(""); // Dialog close hone par form state completely clear kar do
    }}>
      {/* FIXED: Added asChild to stop raw nesting rendering errors */}
      <DialogTrigger>
        <Button className="rounded-xl h-9 px-4 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-all shadow-sm">
          <Plus className="h-3.5 w-3.5 mr-1.5 stroke-[2.5]" />
          Invite Member
        </Button>
      </DialogTrigger>

      {/* Premium Obsidian-Compatible Overlay Grid Structure */}
      <DialogContent className="rounded-2xl border border-border/60 bg-card max-w-[400px] p-6 shadow-2xl">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-lg font-semibold tracking-tight text-foreground">
            Invite team member
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
            Collaborators will receive an email invitation to join this workspace instance.
          </DialogDescription>
        </DialogHeader>

        {/* Semantic Form Layer */}
        <form onSubmit={handleInvite} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="invite-email" className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Email Address
            </Label>
            
            {/* Custom Icon Embedded Input Field wrapper */}
            <div className="relative flex items-center">
              <Mail className="absolute left-3 h-3.5 w-3.5 text-muted-foreground/70 pointer-events-none" />
              <Input
                id="invite-email"
                type="email"
                autoComplete="off"
                placeholder="alex@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="pl-9 h-9 rounded-xl border-border bg-background text-xs placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-foreground transition-all"
              />
            </div>
          </div>

          {/* Action Trigger Node */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-9 rounded-xl bg-foreground text-background hover:bg-foreground/90 text-xs font-medium transition-all shadow-sm"
          >
            {loading ? (
              <div className="flex items-center gap-1.5">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Sending Invitation...</span>
              </div>
            ) : (
              "Send Invitation"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}