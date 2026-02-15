import Image from "next/image";
import Link from "next/link";
import { TbArrowNarrowRight } from "react-icons/tb";

export default function DownloadSection() {
  return (
    <>
      {/*Mobile*/}
      <div className="md:hidden mt-20 bg-primary-80 p-4 pt-20 pb-20 wave">
        <div className="flex flex-col items-center">
          {/* Text Section */}
          <div className="flex-1 space-y-6 pl-0">
            <p className="text-white text-center font-black text-2xl leading-tight">
              Streamline your waste
              <br /> management efforts with
              <br /> our powerful platform
            </p>
            <p className="text-base lg:text-xl text-white text-center">
              Access our platform on any device
              <br /> with a web browser and start
              <br /> recycling today
            </p>

            <div className="flex justify-center mt-6">
              <Link
                href="/register"
                className="flex space-x-2 bg-[#D6F3E5] border border-primary-50 rounded-[6px] px-4 py-2 items-center hover:bg-primary-50 duration-300"
              >
                <p className="text-sm font-semibold">Get Started Now</p>
                <TbArrowNarrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block bg-primary-80 wave pt-10 xl:px-10">
        <div className="flex md:flex-row items-center mx-auto">
          {/* Text Section */}
          <div className="w-full space-y-6 md:pl-10 md:w-2/3">
            <p className="text-white text-center md:text-left font-black md:text-2xl lg:text-[26px] xl:text-[33px] leading-tight">
              Streamline your waste management <br /> efforts with our powerful
              platform
            </p>
            <p className="text-base lg:text-xl text-white">
              Access our platform on any device with a web browser <br /> and
              start recycling today
            </p>

            <div className="flex mt-6">
              <Link
                href="/register"
                className="flex space-x-2 bg-[#D6F3E5] border border-primary-50 rounded-[6px] px-4 py-2 items-center hover:bg-primary-50 duration-300"
              >
                <p className="text-base font-semibold">Get Started Now</p>
                <TbArrowNarrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="hidden md:flex justify-end w-1/3">
            <div className="relative w-[390px] md:h-[290px] lg:h-[375px] xl:h-[400px] 2xl:h-[435px]">
              <Image
                src="/phone.webp"
                alt="phone-webp"
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 md:mt-24 flex flex-col gap-y-10 md:flex-row justify-center md:justify-between items-center md:max-w-5xl xl:max-w-6xl md:m-auto px-10">
        <p className="text-2xl md:text-[28px] lg:text-[35px] xl:text-[40px] text-center md:text-start font-black md:leading-snug">
          Take the first step
          <br className="md:hidden" /> towards a<br />{" "}
          <span className="bg-gradient-to-r from-[#2c8258] to-[#ffde52] text-transparent bg-clip-text">
            cleaner future.
          </span>
        </p>

        <Link
          href="/register"
          className="flex space-x-2 bg-primary-60 rounded-[10px] p-3 px-5 w-max hover:bg-primary-50 duration-700"
        >
          {" "}
          <p className="text-white font-bold">Get Started - for Free</p>{" "}
          <TbArrowNarrowRight className="text-white h-6 w-6 my-auto" />{" "}
        </Link>
      </div>

      <div className="bg-[#F3F3F3] mt-10 md:mt-24 flex flex-col md:flex-row justify-center items-center py-10 md:space-y-0 space-y-5 md:space-x-8 mb-10">
        <div className="flex justify-between gap-x-10">
          <Link href="https://bitgifty.com/">
            <div className="relative h-[39px] md:h-[43px] w-[106px] md:w-[120px]">
              <Image
                src="/bitgift.png"
                alt="bitgifty"
                fill
                sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
                priority
              />
            </div>
          </Link>
          <Link href="https://lawma.gov.ng/">
            <div className="relative h-[39px] md:h-[43px] w-[130px] md:w-[141px]">
              <Image
                src="/lawma.png"
                alt="bitgifty"
                fill
                sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
                priority
              />
            </div>
          </Link>
        </div>
        <p className="font-black text- md:text-2xl text-grey-30">
          {" "}
          Be part of our Partners
        </p>
      </div>
    </>
  );
}
