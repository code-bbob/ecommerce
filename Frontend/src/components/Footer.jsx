import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { SiAcer } from "react-icons/si";
import { SiDell } from "react-icons/si";
import { SiAsus } from "react-icons/si";
import { SiLenovo } from "react-icons/si";
import { SiMsibusiness } from "react-icons/si";
import { register } from 'swiper/element/bundle';
import {  SwiperSlide } from 'swiper/react';

register();


export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show/hide the scroll-to-top button based on scroll position
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    // Scroll to the top of the page with smooth animation
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div>
        <div>
        <swiper-container 
         slides-per-view="3" speed="300" loop="true" css-mode="true">

            <SwiperSlide><SiAcer size={50}/></SwiperSlide>
            <SwiperSlide><SiDell size={50}/></SwiperSlide>
            <SwiperSlide><SiAsus size={50}/></SwiperSlide>
            <SwiperSlide><SiLenovo size={50}/></SwiperSlide>
            <SwiperSlide><SiMsibusiness size={50}/></SwiperSlide>
        </swiper-container>

        </div>
        <div className=" bg-footer bg-black text-white">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-footer pt-10 pl-10 pr-10 text-white">
            <div className="  p-5 rounded-3xl px-10">
              <p className="text-2xl font-bold ">Get In Touch</p>
              <p className=" my-4 ">
                <span className="text-3xl font-bold text-yellow-400">
                  Digitech
                </span>
              </p>
              <p className="flex items-center gap-3 mb-2">
                <FaLocationDot />
                123 Street, New York, USA
              </p>
              <p className="flex items-center gap-3 mb-2">
                <FaPhone />
                +012 345 67890
              </p>
              <p className="flex items-center gap-3">
                <IoMdMail />
                info@example.com
              </p>
            </div>

            <div className=" p-5 rounded-3xl px-10 text-white">
              <p className="text-2xl font-bold mb-4">Quick Links</p>
              <ul className="text-left flex flex-col gap-1">
                <Link className="no-underline">
                  <li className="flex gap-1 items-center">
                    <MdKeyboardArrowRight size={27} /> About Us
                  </li>
                </Link>
                <Link className="no-underline">
                  <li className="flex gap-1 items-center">
                    <MdKeyboardArrowRight size={27} /> Contact Us
                  </li>
                </Link>
                <Link className="no-underline">
                  <li className="flex gap-1 items-center">
                    <MdKeyboardArrowRight size={27} /> Our Services
                  </li>
                </Link>
                <Link className="no-underline">
                  <li className="flex gap-1 items-center">
                    <MdKeyboardArrowRight size={27} /> Terms & Condition
                  </li>
                </Link>
                <Link className="no-underline">
                  <li className="flex gap-1 items-center">
                    <MdKeyboardArrowRight size={27} /> Support
                  </li>
                </Link>
              </ul>
            </div>
            <div className=" p-5 rounded-3xl px-10 text-white">
              <p className="text-2xl font-bold mb-4">Popular Links</p>
              <ul className="text-left flex flex-col gap-1">
                <Link className="no-underline">
                  <li className="flex gap-1 items-center">
                    <MdKeyboardArrowRight size={27} /> About Us
                  </li>
                </Link>
                <Link className="no-underline">
                  <li className="flex gap-1 items-center">
                    <MdKeyboardArrowRight size={27} /> Contact Us
                  </li>
                </Link>
                <Link className="no-underline">
                  <li className="flex gap-1 items-center">
                    <MdKeyboardArrowRight size={27} /> Our Services
                  </li>
                </Link>
                <Link className="no-underline">
                  <li className="flex gap-1 items-center">
                    <MdKeyboardArrowRight size={27} /> Terms & Condition
                  </li>
                </Link>
                <Link className="no-underline">
                  <li className="flex gap-1 items-center">
                    <MdKeyboardArrowRight size={27} /> Support
                  </li>
                </Link>
              </ul>
            </div>

            <div className=" p-5 rounded-3xl px-10 text-left">
              <p className="text-2xl font-bold mb-4">News Letter</p>
              <div className="flex items-center sm:w-full">
                <input
                  className="p-3 w-36 sm:w-full"
                  type="text"
                  placeholder="Your Email Address"
                />
                <button className="bg-yellow-400 text-white px-5 p-3 font-semibold">
                  SignUp
                </button>
              </div>
              <div className="my-4">
                <p className="font-bold text-xl">Follow us</p>
                <ul className="flex mt-4 gap-1">
                  <li className="border border-white p-3 hover:bg-white hover:text-black">
                    <FaTwitter />
                  </li>
                  <li className="border border-white p-3 hover:bg-white hover:text-black">
                    <FaFacebookF />
                  </li>
                  <li className="border border-white p-3 hover:bg-white hover:text-black">
                    <FaYoutube />
                  </li>
                  <li className="border border-white p-3 hover:bg-white hover:text-black">
                    <FaLinkedinIn />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-last bg-black grid grid-cols-2 px-16 py-7">
          <div className="">
            <span className="text-white">© </span>
            <span className="text-yellow-400">Your Site Name,</span>
            <span className="text-white">All Right Reserved.</span>
          </div>
          <div className="">
            <span className="grid grid-cols-2">
              <p className="text-white">Designed By </p>
              <p className="text-yellow-400"> asd</p>
            </span>
            <span className="grid grid-cols-2">
              <p className="text-white">Distributed By: </p>
              <p className="text-yellow-400"> asd</p>
            </span>
          </div>
          {isVisible && (
            <button
              onClick={scrollToTop}
              className="bg-yellow-400 text-white p-4 fixed bottom-7 right-6 z-50  transition-opacity duration-300 ease-in-out hover:opacity-75 "
            >
              <FaArrowUp size={19} />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
