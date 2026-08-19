"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { useDebounce } from "use-debounce";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { CheckSquare, FolderKanban } from "lucide-react";
import { searchEverything } from "@/actions/search";

interface CommandMenuProps {
  projects?: {
    id: string;
    title: string;
  }[];
}

export function CommandMenu({ projects }: CommandMenuProps) {
  const [open, setOpen] = React.useState(false);

  const [search, setSearch] = React.useState("");

  const [debouncedSearch] = useDebounce(search, 300);

  const [results, setResults] = React.useState<{
    projects: any[];
    tasks: any[];
  }>({
    projects: [],
    tasks: [],
  });

  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();

        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", down);

    return () => window.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    async function fetchResults() {
      if (!debouncedSearch) {
        setResults({
          projects: [],
          tasks: [],
        });

        return;
      }

      const data = await searchEverything(debouncedSearch);

      setResults(data);
    }

    fetchResults();
  }, [debouncedSearch]);

  function runCommand(callback: () => void) {
    setOpen(false);

    callback();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden w-[320px] items-center justify-between rounded-xl border border-border bg-card px-4 py-2 text-sm text-zinc-500 md:flex"
      >
        <span>Search anything...</span>

        <kbd className="rounded border border-border px-2 py-1 text-xs">
          Ctrl K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden border-border bg-card p-0 text-foreground">
          <Command className="bg-card">
            <CommandInput
              placeholder="Search anything..."
              value={search}
              onValueChange={setSearch}
            />

            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup heading="Navigation">
                <CommandItem
                  value="dashboard"
                  onSelect={() => runCommand(() => router.push("/dashboard"))}
                >
                  Dashboard
                </CommandItem>

                <CommandItem
                  value="projects"
                  onSelect={() => runCommand(() => router.push("/projects"))}
                >
                  Projects
                </CommandItem>
              </CommandGroup>

              {results.projects.length > 0 && (
                <CommandGroup heading="Projects">
                  {results.projects.map((project) => (
                    <CommandItem
                      key={project.id}
                      value={project.title}
                      onSelect={() =>
                        runCommand(() => router.push(`/projects/${project.id}`))
                      }
                    >
                      <FolderKanban className="mr-2 h-4 w-4" />

                      {project.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {results.tasks.length > 0 && (
                <CommandGroup heading="Tasks">
                  {results.tasks.map((task) => (
                    <CommandItem
                      key={task.id}
                      value={`${task.title} ${task.project?.title || ""}`}
                      onSelect={() =>
                        runCommand(() =>
                          router.push(
                            `/projects/${task.projectId}/tasks/${task.id}`
                          )
                        )
                      }
                      className="cursor-pointer"
                    >
                      <CheckSquare className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="truncate">{task.title}</span>
                      {task.project?.title && (
                        <span className="ml-auto rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {task.project.title}
                        </span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
