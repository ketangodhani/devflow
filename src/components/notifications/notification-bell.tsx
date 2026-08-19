"use client";

import { Bell, Check } from "lucide-react";
import { markNotificationRead } from "@/actions/notification/mark-notification-read";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface Notification {
  id: string;
  title: string;
  read: boolean;
  link: string | null;
  createdAt: string;
}

export default function NotificationBell() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const res = await fetch("/api/notifications");
        if (res.ok) {
          const data = await res.json();
          setNotifications(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to load notifications:", error);
      }
    }
    loadNotifications();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div ref={containerRef} className="relative z-50">
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-lg p-2 hover:bg-muted transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5 text-foreground" />

        {unreadCount > 0 && (
          <div className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-sm">
            {unreadCount > 9 ? "9+" : unreadCount}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-80 sm:w-96 rounded-2xl border border-border bg-card p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-border/40 px-3 py-2.5">
            <h2 className="text-sm font-semibold text-foreground">
              Notifications
            </h2>
            {unreadCount > 0 && (
              <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-500">
                {unreadCount} unread
              </span>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-border/30">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-muted-foreground">
                No notifications yet.
              </div>
            ) : (
              notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={async () => {
                    try {
                      if (!notification.read) {
                        await markNotificationRead(notification.id);
                        setNotifications((prev) =>
                          prev.map((n) =>
                            n.id === notification.id
                              ? { ...n, read: true }
                              : n
                          )
                        );
                      }

                      setOpen(false);

                      if (notification.link) {
                        router.push(notification.link);
                      }
                    } catch (error) {
                      console.error("Error marking notification read:", error);
                    }
                  }}
                  className={`block w-full rounded-xl p-3.5 text-left transition hover:bg-muted/60 ${
                    !notification.read ? "bg-muted/40 font-medium" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-xs leading-relaxed text-foreground">
                        {notification.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {new Date(notification.createdAt).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>

                    {!notification.read && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
