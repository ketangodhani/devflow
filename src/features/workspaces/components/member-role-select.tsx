"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2, ShieldCheck, User } from "lucide-react"; // Icons for premium look

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateMemberRole } from "../actions/update-member-role";

interface Props {
  memberId: string;
  role: "ADMIN" | "MEMBER";
}

export function MemberRoleSelect({ memberId, role: initialRole }: Props) {
  const [pending, startTransition] = useTransition();
  // Hum local state maintain karenge taaki error aane par roll-back (wapas purana) kar sakein
  const [currentRole, setCurrentRole] = useState<"ADMIN" | "MEMBER">(initialRole);

  function handleRoleChange(value: "ADMIN" | "MEMBER") {
    // Optimistically update the local state first
    const previousRole = currentRole;
    setCurrentRole(value);

    startTransition(async () => {
      try {
        const result = await updateMemberRole(memberId, value);

        if (result?.error) {
          // ❌ Agar server ne mana kiya, toh wapas purana role set karo aur toast dikhao
          setCurrentRole(previousRole);
          toast.error(result.error);
          return;
        }

        toast.success(`Role updated to ${value.toLowerCase()} successfully`);
      } catch {
        // ❌ Network failure handle karne ke liye
        setCurrentRole(previousRole);
        toast.error("Failed to update role due to network issues.");
      }
    });
  }

  return (
    <Select
      value={currentRole} // Controlled component using currentRole state
      disabled={pending}
      onValueChange={(val) => handleRoleChange(val as "ADMIN" | "MEMBER")}
    >
      <SelectTrigger className="w-32 h-9 rounded-xl border-border bg-background text-sm font-medium focus:ring-1 focus:ring-foreground transition-all">
        {pending ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span className="text-xs">Saving...</span>
          </div>
        ) : (
          <SelectValue />
        )}
      </SelectTrigger>

      <SelectContent className="rounded-xl border-border/80 shadow-xl bg-card">
        <SelectItem value="ADMIN" className="rounded-lg text-xs font-medium cursor-pointer">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
            <span>Admin</span>
          </div>
        </SelectItem>

        <SelectItem value="MEMBER" className="rounded-lg text-xs font-medium cursor-pointer">
          <div className="flex items-center gap-2">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Member</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}