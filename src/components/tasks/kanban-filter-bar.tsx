"use client";

import { Search, LayoutGrid, List, SlidersHorizontal, X, User, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskPriority } from "@prisma/client";
import { CreateTaskDialog } from "./create-task-dialog";

interface UserOption {
  id: string;
  name: string | null;
  email: string | null;
}

interface KanbanFilterBarProps {
  projectId: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  priorityFilter: string;
  onPriorityChange: (priority: string) => void;
  assigneeFilter: string;
  onAssigneeChange: (assignee: string) => void;
  viewMode: "board" | "list";
  onViewModeChange: (mode: "board" | "list") => void;
  users?: UserOption[];
}

export function KanbanFilterBar({
  projectId,
  searchQuery,
  onSearchChange,
  priorityFilter,
  onPriorityChange,
  assigneeFilter,
  onAssigneeChange,
  viewMode,
  onViewModeChange,
  users = [],
}: KanbanFilterBarProps) {
  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    priorityFilter !== "ALL" ||
    assigneeFilter !== "ALL";

  function clearFilters() {
    onSearchChange("");
    onPriorityChange("ALL");
    onAssigneeChange("ALL");
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl">
      {/* Left: Search & Dropdown Filters */}
      <div className="flex flex-wrap items-center gap-2 flex-1">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tasks by title..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-border bg-background pl-9 pr-8 py-1.5 text-xs text-foreground outline-none transition focus:border-indigo-500"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Priority Filter */}
        <select
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground outline-none transition hover:bg-muted focus:border-indigo-500 cursor-pointer"
        >
          <option value="ALL">All Priorities</option>
          <option value={TaskPriority.LOW}>🟢 Low</option>
          <option value={TaskPriority.MEDIUM}>🔵 Medium</option>
          <option value={TaskPriority.HIGH}>🟡 High</option>
          <option value={TaskPriority.URGENT}>🔴 Urgent</option>
        </select>

        {/* Assignee Filter */}
        <select
          value={assigneeFilter}
          onChange={(e) => onAssigneeChange(e.target.value)}
          className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground outline-none transition hover:bg-muted focus:border-indigo-500 cursor-pointer"
        >
          <option value="ALL">All Assignees</option>
          <option value="UNASSIGNED">Unassigned</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name || user.email}
            </option>
          ))}
        </select>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-border/80 bg-muted text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Right: View Mode Switcher & New Task Dialog Trigger */}
      <div className="flex items-center gap-2 shrink-0">
        {/* View Mode Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-muted/60 border border-border">
          <button
            onClick={() => onViewModeChange("board")}
            title="Kanban Board View"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === "board"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Board</span>
          </button>

          <button
            onClick={() => onViewModeChange("list")}
            title="List / Table View"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === "list"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>

        {/* New Task Dialog Trigger */}
        <CreateTaskDialog projectId={projectId} users={users} />
      </div>
    </div>
  );
}
