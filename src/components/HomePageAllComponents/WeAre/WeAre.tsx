"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AboutSection,
  aboutSecondPartDataType,
} from "@/components/types/allFrontendDataType";
// import Link from "next/link";
import SendContactForm from "@/components/shared/Modals/SendContactForm";

type weAreProps = {
  data?: AboutSection;
  aboutUsSecondData?: aboutSecondPartDataType;
};

const WeAre: React.FC<weAreProps> = ({ data, aboutUsSecondData }) => {
  const [sendContactForm, setSendContactForm] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play the video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  if (!data || !aboutUsSecondData) return null;

  return (
    <div className="container py-10 px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold leading-normal" dangerouslySetInnerHTML={{ __html : data?.title || ""}} />
        <div className="w-full items-center justify-start ml-10 md:ml-12 lg:ml-14 xl:ml-16">
          <div className="w-12 md:w-16 h-1 bg-[#555be7]" />
        </div>
        <p className="text-base sm:text-lg font-bold text-[#555be7] leading-normal">
          {data?.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-4 pb-6 sm:pb-8">
          <p className="w-full sm:max-w-xl lg:max-w-2xl text-sm sm:text-[15px] font-normal text-black leading-tight pt-4 sm:pt-[15px]">
            {data?.description}
          </p>
          {/* <Link href={data?.button_url || "#"}>
            <button type="button" onClick={() => setSendContactForm(true)} className="text-sm sm:text-base font-semibold leading-normal text-white bg-[#555be7] py-1 px-4 rounded-full w-fit">
              
              {data?.button_name}
            </button>
          </Link> */}
           <button type="button" onClick={() => setSendContactForm(true)} className="text-sm sm:text-base font-semibold leading-normal text-white bg-[#555be7] py-1 px-4 rounded-full w-fit">
              {/* Get a Quote */}
              {data?.button_name}
            </button>
        </div>

        {/* Features and Image Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6 sm:gap-4 lg:gap-6">
          {/* Features List */}
          <div className="sm:col-span-1 lg:col-span-3 space-y-1">
            {/* first  */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-16 sm:w-20 md:w-24">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/AboutSec2/icons/${aboutUsSecondData?.icon1}`}
                  alt={aboutUsSecondData?.title1}
                  width={100}
                  height={20}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-xs sm:text-sm font-normal text-black leading-tight">
                <strong className="font-bold text-[#555be7]">
                  {aboutUsSecondData?.title1}
                </strong>{" "}
                {aboutUsSecondData?.description1}
              </p>
            </div>
            {/* two  */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-16 sm:w-20 md:w-24">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/AboutSec2/icons/${aboutUsSecondData?.icon2}`}
                  alt={aboutUsSecondData?.title2}
                  width={100}
                  height={20}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-xs sm:text-sm font-normal text-black leading-tight">
                <strong className="font-bold text-[#555be7]">
                  {aboutUsSecondData?.title2}
                </strong>{" "}
                {aboutUsSecondData?.description2}
              </p>
            </div>
            {/* three  */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-16 sm:w-20 md:w-24">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/AboutSec2/icons/${aboutUsSecondData?.icon3}`}
                  alt={aboutUsSecondData?.title3}
                  width={100}
                  height={20}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-xs sm:text-sm font-normal text-black leading-tight">
                <strong className="font-bold text-[#555be7]">
                  {aboutUsSecondData?.title3}
                </strong>{" "}
                {aboutUsSecondData?.description3}
              </p>
            </div>
            {/* four  */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-16 sm:w-20 md:w-24">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/AboutSec2/icons/${aboutUsSecondData?.icon4}`}
                  alt={aboutUsSecondData?.title4}
                  width={100}
                  height={20}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-xs sm:text-sm font-normal text-black leading-tight">
                <strong className="font-bold text-[#555be7]">
                  {aboutUsSecondData?.title4}
                </strong>{" "}
                {aboutUsSecondData?.description4}
              </p>
            </div>
            {/* five  */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-16 sm:w-20 md:w-24">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/AboutSec2/icons/${aboutUsSecondData?.icon5}`}
                  alt={aboutUsSecondData?.title5}
                  width={100}
                  height={20}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-xs sm:text-sm font-normal text-black leading-tight">
                <strong className="font-bold text-[#555be7]">
                  {aboutUsSecondData?.title5}
                </strong>{" "}
                {aboutUsSecondData?.description5}
              </p>
            </div>
          </div>

          {/* Image/Video Section */}
          <div className="sm:col-span-1 lg:col-span-4">
            <div className=" top-1/4 xl:top-0 relative pb-[260px] md:pb-0">
              {/* Background Video */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-[253px] md:w-[270px] xl:w-[500px] h-[190px] md:h-[180px] xl:h-[310px] -mt-0 lg:mt-[30px] ml-[50px] lg:ml-[98px] object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source
                  // src="https://res.cloudinary.com/dlph0bwik/video/upload/v1744520742/x6b705qdifzgq5kkngvd.mp4"
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/AboutSec2/${aboutUsSecondData?.video}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {/* Optional overlay to improve text readability if you add content */}
              <div className="absolute inset-0 ">
                <Image
                  // src="/assets/weAre/laptop.png"
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/AboutSec2/${aboutUsSecondData?.img}`}
                  alt="Background"
                  width={700}
                  height={300}
                />
              </div>

              {/* Content container - add your content here */}
              <div className="relative z-10 h-full flex items-center justify-center text-white">
                {/* Your content goes here */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* send contact form modal  */}
      {sendContactForm && (
        <div className="!px-10 md:px-0">
          <SendContactForm
            onOpen={sendContactForm}
            onOpenChange={() => setSendContactForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default WeAre;
