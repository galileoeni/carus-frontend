"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Empty } from "../empty";
import { useNotifications, useMarkAsRead } from "@/queries/notifications";
import { formatDistanceToNow } from "date-fns";

export default function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { data: notificationsData, isLoading } = useNotifications();
  const { mutate: markAsRead } = useMarkAsRead();

  const notifications = notificationsData?.data?.notifications || [];
  const unreadCount = notificationsData?.data?.unreadCount || 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  const handleMarkAsRead = (id: string, isRead: boolean) => {
    if (!isRead) {
      markAsRead(id);
    }
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <div
          className="cursor-pointer relative"
          onClick={() => setShowNotifications((prev) => !prev)}
        >
          <Image
            src="/notification.png"
            alt="Notification Bell"
            width={24}
            height={24}
            className="cursor-pointer"
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>

        {showNotifications && (
          <div className="absolute -right-4 mt-2 w-72 min-h-[300px] max-h-[480px] md:w-96 bg-white border rounded-lg shadow-lg overflow-hidden z-50 flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h5 className="font-bold text-gray-900">Notifications</h5>
              {unreadCount > 0 && (
                <span className="text-xs text-blue-600 font-medium">
                  {unreadCount} unread
                </span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center items-center h-48">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col justify-center items-center gap-4 h-64">
                  <Empty description="You have no notifications at the moment." />
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.isRead ? "bg-blue-50/30" : ""
                      }`}
                      onClick={() =>
                        handleMarkAsRead(notification.id, notification.isRead)
                      }
                    >
                      <div className="flex justify-between items-start gap-2">
                        <p
                          className={`text-sm ${
                            !notification.isRead
                              ? "font-bold text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <span className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-2">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {!isLoading && (
              <div className="p-2 border-t text-center bg-gray-50">
                <Link
                  href="/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-green-700 font-semibold hover:underline"
                >
                  View all notifications
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
