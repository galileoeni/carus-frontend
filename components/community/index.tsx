"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";

export default function Community() {
  const cards = useMemo(
    () => [
      {
        name: "Tboy",
        handle: "@rast234",
        dp: "/dp.png",
        review:
          "This app has simplified waste management for our entire neighborhood. The scheduling feature ensures everyone's waste gets collected on time, and the rewards program encourages us to make sustainable choices. ",
      },

      {
        name: "Rachel Disu",
        handle: "@dissbaby",
        dp: "/dp1.png",
        review:
          "Carus has made my life so much easier! I can schedule waste pickups with just a few taps, saving me time and hassle. Plus, the rewards program is a fantastic bonus😊😊😊😊 ",
      },

      {
        name: "Salako",
        handle: "@adebisisalko",
        dp: "/dp2.png",
        review:
          "Finally, a waste management app that actually rewards you for being environmentally conscious! I love earning points for recycling and using sustainable practices. Highly recommended 👍. ",
      },
      {
        name: "John",
        handle: "@dagrinreegen",
        dp: "/dp3.png",
        review:
          "This app has simplified waste management for our entire neighborhood. The scheduling feature ensures everyone's waste gets collected on time, and the rewards program encourages us to make sustainable choices. ",
      },
      {
        name: "Loveth",
        handle: "@lovethlovesyou",
        dp: "/dp4.png",
        review:
          "The rewards program in this Carus is genius. I find myself going the extra mile to recycle and reduce waste just to earn more points. It's a brilliant incentive!",
      },

      {
        name: "Usman D'Fodio 👑 ",
        handle: "@fodiothelast",
        dp: "/dp5.png",
        review:
          "I've tried multiple waste management apps, and this one stands out for its rewards program. It's not just about waste scheduling; it's about being rewarded for taking eco-friendly actions. Love it 😍😍😍😍😍😍 ",
      },

      {
        name: "Racetrex🦖 ",
        handle: "@trex1235",
        dp: "/dp6.png",
        review:
          "The waste scheduling feature in this Carus is a lifesaver. It ensures my waste gets collected promptly, and I don't have to worry about missed pickups anymore. The added rewards make it even better!",
      },

      {
        name: "Tboy",
        handle: "@rast234",
        dp: "/dp.png",
        review:
          "This app has simplified waste management for our entire neighborhood. The scheduling feature ensures everyone's waste gets collected on time, and the rewards program encourages us to make sustainable choices. ",
      },
      {
        name: "Rachel Disu",
        handle: "@dissbaby",
        dp: "/dp1.png",
        review:
          "Carus has made my life so much easier! I can schedule waste pickups with just a few taps, saving me time and hassle. Plus, the rewards program is a fantastic bonus😊😊😊😊 ",
      },
      {
        name: "Salako",
        handle: "@adebisisalko",
        dp: "/dp2.png",
        review:
          "Finally, a waste management app that actually rewards you for being environmentally conscious! I love earning points for recycling and using sustainable practices. Highly recommended 👍. ",
      },

      {
        name: "John",
        handle: "@dagrinreegen",
        dp: "/dp3.png",
        review:
          "This app has simplified waste management for our entire neighborhood. The scheduling feature ensures everyone's waste gets collected on time, and the rewards program encourages us to make sustainable choices. ",
      },

      {
        name: "Loveth",
        handle: "@lovethlovesyou",
        dp: "/dp4.png",
        review:
          "The rewards program in this Carus is genius. I find myself going the extra mile to recycle and reduce waste just to earn more points. It's a brilliant incentive!",
      },

      {
        name: "Usman D'Fodio 👑 ",
        handle: "@fodiothelast",
        dp: "/dp5.png",
        review:
          "I've tried multiple waste management apps, and this one stands out for its rewards program. It's not just about waste scheduling; it's about being rewarded for taking eco-friendly actions. Love it 😍😍😍😍😍😍 ",
      },

      {
        name: "Racetrex🦖 ",
        handle: "@trex1235",
        dp: "/dp6.png",
        review:
          "The waste scheduling feature in this Carus is a lifesaver. It ensures my waste gets collected promptly, and I don't have to worry about missed pickups anymore. The added rewards make it even better!",
      },
    ],
    [],
  );
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [scrollDistance, setScrollDistance] = useState("0px");

  useEffect(() => {
    if (rowRef.current) {
      const totalWidth = rowRef.current.scrollWidth;
      const containerWidth = rowRef.current.clientWidth;
      setScrollDistance(`-${totalWidth - containerWidth}px`);
    }
  }, [cards]);

  return (
    <div className="py-20">
      <h1 className="text-[24px] md:text-[33px] lg:text-[48px] font-black text-center">
        Join Our Community{" "}
      </h1>
      <div className="overflow-hidden w-full mt-15">
        <div
          ref={rowRef}
          className="flex space-x-6 px-4 scroll-row"
          style={{ "--scroll-distance": scrollDistance } as React.CSSProperties}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="border border-primary-20 rounded-[25px] w-96 h-56 p-8 py-4 flex-none bg-white"
            >
              <div className="flex space-x-2 items-center">
                <Image
                  src={card.dp}
                  alt={card.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold">{card.name}</p>
                  <p className="text-[#919191] text-sm">{card.handle}</p>
                </div>
              </div>
              <p className="mt-5">{card.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
