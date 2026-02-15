"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function InfoToolTip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="w-[25px] h-[25px] bg-[#F3F3F3] rounded-full flex items-center justify-center"
        onClick={() => setShow((p) => !p)}
      >
        <Image src="/info-circle.png" alt="info" width={16} height={16} />
      </button>
      {show && (
        <div className="absolute bottom-8 right-0 bg-white shadow-md rounded-[10px] w-[220px] p-4 z-10">
          <p className="text-[11px] text-grey-100 leading-[18px] text-justify">
            {text}
          </p>
        </div>
      )}
    </div>
  );
}
