"use client";

import { Bell, Check } from "lucide-react";

import { markNotificationRead } from "@/actions/notification/mark-notification-read";

import { useEffect, useState } from "react";

interface Notification {
  id: string;
  title: string;
  read: boolean;
  link: string | null;
  createdAt: string;
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative z-50">
      <button onClick={() => setOpen(!open)} className="relative">
        <Bell className="h-5 w-5 text-foreground" />

        {unreadCount > 0 && (
          <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-foreground">
            {unreadCount}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-96 rounded-2xl border border-border bg-card p-2 shadow-2xl">
          <div className="mb-2 px-2 py-2">
            <h2 className="font-semibold text-foreground">Notifications</h2>
          </div>

          <div className="max-h-100 overflow-y-auto ">
            {notifications.length === 0 ? (
              <div className="p-4 text-sm text-muted-foreground">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={async () => {
                    try {
                      await markNotificationRead(notification.id);

                      setNotifications((prev) =>
                        prev.map((n) =>
                          n.id === notification.id
                            ? {
                                ...n,
                                read: true,
                              }
                            : n,
                        ),
                      );

                      if (notification.link) {
                        window.location.href = notification.link;
                      }
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                  className={`block w-full rounded-xl p-4 text-left transition hover:bg-muted ${
                    !notification.read ? "bg-muted" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-foreground">
                        {notification.title}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {!notification.read && (
                      <Check className="mt-1 h-4 w-4 text-blue-400" />
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
