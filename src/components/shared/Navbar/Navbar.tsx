"use client";
import { Navbar as NavbarDataType } from "@/components/types/allFrontendDataType";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

type NavbarProps = {
  data?: NavbarDataType;
};

const Navbar: React.FC<NavbarProps> = ({ data }) => {
  console.log(data);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-toggle")
      ) {
        setIsOpen(false);
      }
    };

    // Prevent scrolling when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!data) return null;

  return (
    <div className="bg-[#D9D9D9] sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* logo */}
        <div>
          <Link href="/">
            <Image
              // src="/assets/logo.png"
              src={data?.logo?.startsWith("http") ? data?.logo : `/assets/logo.png`}
              alt="nav logo"
              width={235}
              height={90}
              className="w-[160px] h-[60px] sm:w-[180px] sm:h-[70px] md:w-[235px] md:h-[90px]"
            />
          </Link>
        </div>

        {/* large device menu part */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-4 lg:gap-[54px]">
            <li className="text-sm lg:text-base font-semibold text-black leading-normal cursor-pointer">
              {/* <Link href="#home"> */}
              <Link href={data?.itemlink1}>
              {/* Home */} 
              {data?.itemname1}
              </Link>
            </li>
            <li className="text-sm lg:text-base font-semibold text-black leading-normal cursor-pointer">
              {/* <Link href="#about_us">  */}
              <Link href={data?.itemname2}> 
              {/* About Us */}
              {data?.itemname2}
              </Link>
            </li>
            <li className="text-sm lg:text-base font-semibold text-black leading-normal cursor-pointer">
              {/* <Link href="#services"> */}
              <Link href={data?.itemlink3}>
              {/* Services */}
              {data?.itemname3}
              </Link>
            </li>
            <li className="text-sm lg:text-base font-semibold text-black leading-normal cursor-pointer">
              {/* <Link href="#contact_us"> */}
              <Link href={data?.itemname4}>
              {/* Contact Us */}
              {data?.itemname4}
              </Link>
            </li>
          </ul>
        </div>

        {/* small device menu button */}
        <div className="block md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 menu-toggle"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <RxCross2 className="w-6 h-6" />
            ) : (
              <GiHamburgerMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu - slides from left and takes full width and height */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed top-0 left-0 h-full w-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out transform mobile-menu ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <Image
              src="/assets/logo.png"
              alt="nav logo"
              width={160}
              height={60}
              className="w-[130px] h-[50px]"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2"
              aria-label="Close menu"
            >
              <RxCross2 className="w-6 h-6" />
            </button>
          </div>
          <div className="h-full overflow-y-auto">
            <ul className="flex flex-col items-center gap-8 p-8">
              <li className="text-base font-semibold text-black leading-normal cursor-pointer w-full text-center">
                <Link
                  href="#home"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-2"
                >
                  Home
                </Link>
              </li>
              <li className="text-base font-semibold text-black leading-normal cursor-pointer w-full text-center">
                <Link
                  href="#about_us"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-2"
                >
                  About Us
                </Link>
              </li>
              <li className="text-base font-semibold text-black leading-normal cursor-pointer w-full text-center">
                <Link
                  href="#services"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-2"
                >
                  Services
                </Link>
              </li>
              <li className="text-base font-semibold text-black leading-normal cursor-pointer w-full text-center">
                <Link
                  href="#contact_us"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-2"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
