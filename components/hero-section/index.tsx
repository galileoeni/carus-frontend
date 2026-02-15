"use client";

import Image from "next/image";
import { TbArrowNarrowRight } from "react-icons/tb";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="pt-30 px-7 md:px-0">
        <p className="text-center text-4xl md:text-6xl font-black leading-tight">
          Why waste when you
          <br className="hidden md:block" /> can{" "}
          <span className="bg-gradient-to-r from-[#2c8258] to-[#ffde52] text-transparent bg-clip-text">
            Recycle
          </span>
        </p>
        <p className="text-center text-base md:text-2xl text-grey-100 mt-4 md:leading-tight">
          Let&apos;s work together to reduce waste,
          <br />
          promote recycling, and create a <br className="block md:hidden" />{" "}
          greener future.
        </p>
      </div>

      <Link
        href="/register"
        className="flex space-x-2 bg-primary-60 rounded-[10px] p-3 px-5 mx-auto mt-12 w-max hover:bg-primary-50 duration-700"
      >
        {" "}
        <p className="text-white font-bold">Get Started - for Free</p>{" "}
        <TbArrowNarrowRight className="text-white h-6 w-6 my-auto" />{" "}
      </Link>

      <div className="md:-mt-5 -mt-25 absolute mx-auto -z-10">
        <div className="relative w-[100vw] -left-1/2 translate-x-1/2 h-[400px] md:h-[500px]">
          <Image
            src="/Ellipse.png"
            alt="ellipse"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <Swiper
        effect={"cards"}
        grabCursor={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[EffectCards, Autoplay]}
        className="w-full mt-8 lg:mt-20 max-w-[85%] lg:max-w-2xl"
      >
        <SwiperSlide>
          <div className="relative w-[90%] aspect-[3/2] md:h-[417px] mx-auto">
            <Image
              src="/schedule.gif"
              alt="preview"
              className="rounded-3xl"
              width={1512}
              height={1024}
              unoptimized
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-[90%] aspect-[3/2] md:h-[417px] mx-auto">
            <Image
              src="/redeem.gif"
              alt="preview"
              className="rounded-3xl"
              width={1512}
              height={1024}
              unoptimized
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-[90%] aspect-[3/2] md:h-[417px] mx-auto">
            <Image
              src="/donate.gif"
              alt="preview"
              className="rounded-3xl"
              width={1512}
              height={1024}
              unoptimized
            />
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="px-7 md:px-10 flex justify-center">
        <div className="bg-[#ECF6F2] flex flex-col items-center w-full rounded-[20px] md:max-w-5xl pt-16 pb-13 px-5 md:px-36 lg:px-56 -mt-8">
          <div className="bg-[#CCE1D7] h-1 md:h-2 w-17 text-center"></div>
          <p className="text-[25px] lg:text-[33px] xl:text-[40px] font-black mt-10 leading-snug text-center">
            Effortless Waste Scheduling
          </p>
          <p className="mt-8 text-base md:text-xl lg:text-2xl text-center">
            By using our waste schedule feature, you can conveniently manage
            your waste disposal needs, stay organized, and contribute to a
            cleaner environment.
          </p>

          <Link
            href="/register"
            className="flex space-x-2 bg-primary-60 rounded-[10px] p-3 px-5 mt-12 w-max hover:bg-primary-50 duration-700"
          >
            <p className="text-white font-bold">Get Started - for Free</p>{" "}
            <TbArrowNarrowRight className="text-white h-6 w-6 my-auto" />{" "}
          </Link>
        </div>
      </div>
      <div className="flex flex-1 flex-col-reverse justify-center md:flex-row-reverse md:justify-between gap-x-10 md:gap-x-15 lg:gap-x-20 md:max-w-6xl items-center mt-28 mx-auto px-7 md:px-10">
        <div className="w-full md:w-1/2 my-auto flex flex-col items-center justify-center md:items-start">
          <p className="text-2xl lg:text-3xl xl:text-4xl font-black text-center md:text-left lg:text-left">
            Schedule Pickup
          </p>
          <p className="text-base lg:text-xl xl:text-2xl mt-4 text-center md:text-justify max-w-2xl">
            Scheduling a waste pickup is quick and easy. Start by logging into
            your account and heading to the Schedule Page. Select the type of
            waste you wish to recycle, such as plastics, electronics, or
            organics. Choose your preferred pickup date and time slot from our
            available options. Provide your exact location details for accurate
            collection. Once submitted, our system will confirm your request and
            assign a nearby collection partner. With every scheduled collection,
            you&apos;re taking a step towards a cleaner, greener planet.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center bg-[#ECF6F2] rounded-[20px] px-4 md:py-0 lg:py-10 mb-8">
          <div className="relative w-full h-[350px] md:h-[310px] xl:h-[400px] flex">
            <Image
              src="/schedule.gif"
              alt="preview"
              className="rounded-3xl my-auto shadow-lg"
              width={1512}
              height={1024}
              unoptimized
            />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col-reverse justify-center md:flex-row md:justify-between gap-x-10 md:gap-x-15 lg:gap-x-20 md:max-w-6xl items-center mt-28 mx-auto px-7 md:px-10">
        <div className="w-full md:w-1/2 my-auto flex flex-col items-center justify-center md:items-start">
          <p className="text-2xl lg:text-3xl xl:text-4xl font-black text-center md:text-left lg:text-left">
            Earn Reward
          </p>
          <p className="text-base lg:text-xl xl:text-2xl mt-4 text-center md:text-justify max-w-2xl">
            You can earn points that can be redeemed for exciting rewards such
            as Gift cards, airtime, and even cash. Our easy-to-use app makes
            waste management a breeze, and with every donation, you are
            contributing to a cleaner and greener planet.
          </p>

          <Link
            href="/register"
            className="flex space-x-2 bg-primary-60 rounded-[10px] p-3 px-5 mt-12 md:mt-10 lg:mt-12 w-max hover:bg-primary-50 duration-700"
          >
            {" "}
            <p className="text-white font-bold">Get Started - for Free</p>{" "}
            <TbArrowNarrowRight className="text-white h-6 w-6 my-auto" />{" "}
          </Link>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center bg-[#ECF6F2] rounded-[20px] px-4 md:py-0 lg:py-10 mb-8">
          <div className="relative w-full h-[350px] md:h-[310px] xl:h-[400px]">
            <Image
              src="/redeem.webp"
              alt="Carus Redeem point screen"
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
