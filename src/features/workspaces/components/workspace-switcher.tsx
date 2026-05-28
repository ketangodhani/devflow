"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { setActiveWorkspace } from "../actions/set-active-workspace";

interface Workspace {
  id: string;
  name: string;
}

interface Props {
  workspaces: Workspace[];
  activeWorkspaceId?: string;
}

export function WorkspaceSwitcher({
  workspaces,
  activeWorkspaceId,
}: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const activeWorkspace = workspaces.find(
    (workspace) => workspace.id === activeWorkspaceId
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          className="w-full justify-start"
        >
          {activeWorkspace?.name || "Select Workspace"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64">
        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                await setActiveWorkspace(workspace.id);

                router.refresh();
              });
            }}
          >
            {workspace.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}