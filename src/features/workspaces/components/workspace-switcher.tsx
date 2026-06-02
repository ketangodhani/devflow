// "use client";

// import { useTransition } from "react";
// import { useRouter } from "next/navigation";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { Button } from "@/components/ui/button";

// import { setActiveWorkspace } from "../actions/set-active-workspace";
// import { Check } from "lucide-react";

// interface Workspace {
//   id: string;
//   name: string;
// }

// interface Props {
//   workspaces: Workspace[];
//   activeWorkspaceId?: string;
// }

// export function WorkspaceSwitcher({ workspaces, activeWorkspaceId }: Props) {
//   const router = useRouter();

//   const [isPending, startTransition] = useTransition();

//   const activeWorkspace = workspaces.find(
//     (workspace) => workspace.id === activeWorkspaceId,
//   );

//   return (
//     <>
//       <DropdownMenu>
//         <DropdownMenuTrigger>
//           <Button variant="outline" className="w-full justify-start">
//             {activeWorkspace?.name || "Select Workspace"}
//           </Button>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent className="w-64">
//           {workspaces.map((workspace) => (
//             <DropdownMenuItem
//               key={workspace.id}
//               disabled={isPending}
//               onClick={() => {
//                 startTransition(async () => {
//                   await setActiveWorkspace(workspace.id);

//                   router.refresh();
//                 });
//               }}
//             >
//               <div className="flex w-full items-center justify-between">
//                 <span>{workspace.name}</span>

//                 {workspace.id === activeWorkspaceId && (
//                   <Check className="h-4 w-4" />
//                 )}
//               </div>
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>
      
//     </>
//   );
// }

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setActiveWorkspace } from "../actions/set-active-workspace";
import clsx from "clsx";

interface Workspace {
  id: string;
  name: string;
}

interface Props {
  workspaces: Workspace[];
  activeWorkspaceId?: string;
}

export function WorkspaceSwitcher({ workspaces, activeWorkspaceId }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // List open/close state
  const [isPending, startTransition] = useTransition();

  const activeWorkspace = workspaces.find(
    (workspace) => workspace.id === activeWorkspaceId,
  );

  return (
    <div className="flex flex-col gap-1 w-full transition-all duration-300">
      {/* Trigger Button */}
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between items-center bg-card hover:bg-muted"
      >
        <span className="truncate">{activeWorkspace?.name || "Select Workspace"}</span>
        <ChevronDown className={clsx("h-4 w-4 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
      </Button>

      {/* Collapsible List - Yeh niche wale components ko niche push karega */}
      <div 
        className={clsx(
          "grid transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0 flex flex-col gap-1 bg-muted/40 rounded-xl p-1 border border-border/50">
          {workspaces.map((workspace) => (
            <button
              key={workspace.id}
              disabled={isPending}
              onClick={() => {
                startTransition(async () => {
                  await setActiveWorkspace(workspace.id);
                  router.refresh();
                  setIsOpen(false); // Select karne ke baad close ho jaye
                });
              }}
              className={clsx(
                "flex w-full items-center justify-between px-3 py-2 text-sm rounded-lg transition text-left disabled:opacity-50",
                workspace.id === activeWorkspaceId 
                  ? "bg-muted text-foreground font-medium" 
                  : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              <span className="truncate">{workspace.name}</span>
              {workspace.id === activeWorkspaceId && (
                <Check className="h-4 w-4 text-foreground shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}