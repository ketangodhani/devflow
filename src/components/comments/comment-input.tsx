"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AtSign } from "lucide-react";

interface User {
  id: string;
  name: string | null;
  email: string | null;
}

interface Props {
  users: User[];
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
}

export default function CommentInput({
  users,
  value,
  onChange,
  onSubmit,
  placeholder = "Write a comment... (use @ to mention teammates)",
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredUsers = useMemo(() => {
    if (!query) return users.slice(0, 5);

    return users
      .filter((user) =>
        (user.name || user.email || "")
          .toLowerCase()
          .includes(query.toLowerCase())
      )
      .slice(0, 6);
  }, [query, users]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredUsers]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;
    onChange(text);

    const cursor = e.target.selectionStart;
    const textBeforeCursor = text.slice(0, cursor);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);

    if (mentionMatch) {
      setQuery(mentionMatch[1]);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }

  function selectUser(name: string) {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursor = textarea.selectionStart;
    const textBeforeCursor = value.slice(0, cursor);
    const textAfterCursor = value.slice(cursor);

    const newText =
      textBeforeCursor.replace(/@(\w*)$/, `@${name} `) + textAfterCursor;

    onChange(newText);
    setOpen(false);

    requestAnimationFrame(() => {
      textarea.focus();
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (open && filteredUsers.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredUsers.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? filteredUsers.length - 1 : prev - 1
        );
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        const selected = filteredUsers[selectedIndex];
        if (selected) {
          selectUser(selected.name || selected.email || "user");
        }
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
    }

    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (onSubmit) {
        onSubmit();
      }
    }
  }

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={3}
        className="w-full rounded-2xl border border-border/80 bg-background/90 p-4 text-sm text-foreground outline-none ring-2 ring-indigo-500/20 transition placeholder:text-muted-foreground focus:border-transparent focus:ring-indigo-500/50"
      />

      {/* Mention Popup */}
      {open && filteredUsers.length > 0 && (
        <div className="absolute left-0 bottom-full mb-2 z-50 w-72 overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95">
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/60 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            <AtSign className="h-3 w-3" />
            <span>Mention teammate</span>
          </div>
          <div className="max-h-48 overflow-y-auto py-1">
            {filteredUsers.map((user, idx) => (
              <button
                key={user.id}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectUser(user.name || user.email || "user");
                }}
                className={`flex w-full items-center gap-3 px-3 py-2 text-left transition ${
                  idx === selectedIndex
                    ? "bg-indigo-500/15 text-foreground"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-xs font-bold text-indigo-400">
                  {(user.name || user.email || "U").charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-foreground">
                    {user.name || "Unnamed"}
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
