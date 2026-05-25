"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface User {
  id: string;
  name: string | null;
  email: string | null;
}

interface Props {
  users: User[];
  value: string;
  onChange: (value: string) => void;
}

export default function CommentInput({ users, value, onChange }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    if (!query) return users;

    return users.filter((user) =>
      (user.name || user.email || "")
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  }, [query, users]);

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

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder="Write a comment..."
        className="min-h-30 w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-white outline-none placeholder:text-zinc-500"
      />

      {open && filteredUsers.length > 0 && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
          {filteredUsers.map((user) => (
            <button
              key={user.id}
              type="button"
              onClick={() => selectUser(user.name || user.email || "user")}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-zinc-900"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs text-white">
                {(user.name || user.email || "U").charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-sm text-white">{user.name}</p>

                <p className="text-xs text-zinc-500">{user.email}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
