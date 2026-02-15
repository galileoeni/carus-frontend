"use client";

import {
  useInfiniteNotifications,
  useMarkAsRead,
} from "@/queries/notifications";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useMemo, useRef } from "react";
import { Empty } from "@/components/empty";

export default function NotificationsPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteNotifications(15);

  const { mutate: markAsRead } = useMarkAsRead();

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allNotifications = useMemo(
    () => data?.pages.flatMap((page) => page.data.notifications) ?? [],
    [data],
  );
  return (
    <div className="md:mt-30 mt-20">
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden min-h-[70vh]">
        {isLoading ? (
          <div className="p-20 flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-60"></div>
          </div>
        ) : allNotifications.length === 0 ? (
          <div className="p-20 flex flex-col items-center justify-center h-[60vh] gap-4">
            <Empty description="You have no notifications yet." />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="divide-y divide-gray-50">
              {allNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() =>
                    !notification.isRead && markAsRead(notification.id)
                  }
                  className={`p-5 md:p-7 hover:bg-gray-50 transition-colors cursor-pointer flex gap-4 ${
                    !notification.isRead ? "bg-primary-10/20" : ""
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3
                        className={`text-sm md:text-base ${!notification.isRead ? "font-bold text-grey-90" : "text-grey-40"}`}
                      >
                        {notification.title}
                      </h3>
                      <span className="text-[10px] md:text-xs text-grey-40 whitespace-nowrap ml-4">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-grey-40 leading-relaxed">
                      {notification.message}
                    </p>
                    {!notification.isRead && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-60" />
                        <span className="text-[10px] text-primary-60 font-bold uppercase tracking-wider">
                          New
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div ref={observerTarget} className="p-8 flex justify-center">
              {isFetchingNextPage ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-60"></div>
              ) : hasNextPage ? (
                <p className="text-xs text-grey-40">Scroll to load more</p>
              ) : (
                <p className="text-xs text-grey-40">
                  You&apos;ve reached the end of your notifications.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
