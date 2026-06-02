"use client";

import { useTransition } from "react";

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
  role: string;
}

export function MemberRoleSelect({
  memberId,
  role,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  return (
    <Select
      defaultValue={role}
      disabled={pending}
      onValueChange={(value) => {
        startTransition(async () => {
          await updateMemberRole(
            memberId,
            value as "ADMIN" | "MEMBER"
          );
        });
      }}
    >
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="ADMIN">
          ADMIN
        </SelectItem>

        <SelectItem value="MEMBER">
          MEMBER
        </SelectItem>
      </SelectContent>
    </Select>
  );
}