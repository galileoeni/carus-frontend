"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Full-screen photo viewer with arrow-key and swipe-free navigation
export default function PhotoViewer({
  photos,
  index,
  onChange,
  onClose,
  caption,
}: {
  photos: string[];
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
  caption: string;
}) {
  const prev = useCallback(
    () => onChange((index - 1 + photos.length) % photos.length),
    [index, onChange, photos.length],
  );
  const next = useCallback(
    () => onChange((index + 1) % photos.length),
    [index, onChange, photos.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pickup photo"
      className="fixed inset-0 z-[70] bg-black/90 flex flex-col"
      onClick={onClose}
    >
      <div className="flex items-center justify-between p-4 text-white">
        <p className="text-sm">
          {caption} · {index + 1} of {photos.length}
        </p>
        <button
          onClick={onClose}
          aria-label="Close"
          className="cursor-pointer p-2 rounded-full hover:bg-white/10"
        >
          <X className="size-6" />
        </button>
      </div>
      <div className="relative flex-1 m-4 mt-0">
        <Image
          src={photos[index]}
          alt={`Pickup photo ${index + 1}`}
          fill
          unoptimized
          className="object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 size-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 size-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center"
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      )}
    </div>
  );
}
