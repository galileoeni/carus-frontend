"use client";

import React, { useState } from "react";
import { TbChevronDown, TbChevronUp } from "react-icons/tb";

const faqs = [
  {
    id: 1,
    question: "What is Carus?",
    answer:
      "Carus is the brainchild of a team of passionate environmentalists and tech enthusiasts who recognized the urgent need for a convenient and efficient solution to tackle the global waste crisis.",
  },
  {
    id: 2,
    question: "How to earn points on Carus?",
    answer:
      "We reward users with points for recycling. By properly sorting and disposing of recyclable materials, such as plastics, glass, paper, and metal, you can accumulate points based on the volume or weight of recyclables you recycle.",
  },
  {
    id: 3,
    question: "How do I redeem my points on Carus?",
    answer:
      "Access your wallet. Look for a tab or option that displays your accumulated points. This will give you and overview of your current point balance and available rewards.",
  },
  {
    id: 4,
    question: "What is wallet?",
    answer:
      "A wallet refers to a digital storage feature that allows users to securely store and manage their financial assets, such as money, payment cards, loyalty cards, coupons, and other digital currencies or tokens.",
  },
];

export default function Faqs() {
  const [selectedQuesId, setSelectedQuesId] = useState<number | null>(null);
  const handleSelectedQues = (id: number) => {
    setSelectedQuesId((prev) => (prev === id ? null : id));
  };
  return (
    <div className="flex flex-col md:flex-row justify-center gap-x-20 px-7 md:px-10 xl:px-20 mt-20 mb-30">
      <div className="space-y-3 md:w-1/3 mb-15 md:mb-0">
        <p className="text-base">FAQs</p>
        <p className="text-2xl md:text-5xl lg:text-[58px] leading-snug font-black ">
          Frequently Asked Questions.
        </p>
      </div>

      <ul className="space-y-15 w-full md:w-2/3">
        {faqs.map((faq) => (
          <li key={faq.id} className="border-b border-grey-40 pb-5">
            <div className="flex items-start gap-8">
              <div className="flex-1 min-w-0">
                <h3
                  onClick={() => handleSelectedQues(faq.id)}
                  className="font-semibold text-base md:text-xl lg:text-2xl text-grey-90 md:font-medium cursor-pointer "
                >
                  {faq.question}
                </h3>
              </div>
              <button
                className="flex-none text-white bg-primary-60 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer "
                onClick={() => handleSelectedQues(faq.id)}
              >
                {selectedQuesId !== faq.id ? (
                  <TbChevronDown fontSize={18} />
                ) : (
                  <TbChevronUp fontSize={18} />
                )}
              </button>
            </div>
            {selectedQuesId === faq.id && (
              <p className="mt-5 text-sm md:text-[18px] lg:text-xl text-grey-90 text-justify leading-snug">
                {faq.answer}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
