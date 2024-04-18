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
import React from "react";
import Slider from "react-slick";
import acer from "../assets/acer.svg";
import apple from "../assets/apple.svg";
import asus from "../assets/asus.svg";
import dell from "../assets/dell.svg";
import giga from "../assets/giga.webp";
import hp from "../assets/hp.svg";
import len from "../assets/len.svg";
import logitech from "../assets/logitech.svg";
import microsoft from "../assets/microsoft.svg";
import msi from "../assets/msi.svg";
import optoma from "../assets/optoma.svg";
import rapo from "../assets/rapo.webp";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function MultipleItems() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 8,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="">
          <img className="imagesCarouselFooter" src={acer} alt="" />
        </div>

        <div>
          <img className="imagesCarouselFooter" src={apple} alt="" />
        </div>
        <div>
          <img className="imagesCarouselFooter" src={asus} alt="" />
        </div>
        <div>
          <img className="imagesCarouselFooter" src={dell} alt="" />
        </div>
        <div>
          <img className="imagesCarouselFooter" src={giga} alt="" />
        </div>
        <div>
          <img className="imagesCarouselFooter" src={hp} alt="" />
        </div>
        <div>
          <img className="imagesCarouselFooter" src={len} alt="" />
        </div>
        <div>
          <img className="imagesCarouselFooter" src={logitech} alt="" />
        </div>
        <div>
          <img className="imagesCarouselFooter" src={microsoft} alt="" />
        </div>
        <div>
          <img className="imagesCarouselFooter" src={msi} alt="" />
        </div>
        <div>
          <img className="imagesCarouselFooter" src={optoma} alt="" />
        </div>
        <div>
          <img className="imagesCarouselFooter" src={rapo} alt="" />
        </div>
      </Slider>
    </div>
  );
}



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
        <div className="py-3">
          <MultipleItems />
        </div>
        <div className=" bg-footer bg-black text-white">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-footer pt-1 pl-10 pr-10 text-white">
            <div className="  p-3 rounded-3xl px-10">
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

            <div className=" p-3 rounded-3xl px-10 text-white">
              <p className="text-2xl font-bold mb-1">Quick Links</p>
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
            <div className=" p-3 rounded-3xl px-10 text-white">
              <p className="text-2xl font-bold mb-1">Popular Links</p>
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

            <div className=" p-3 rounded-3xl px-10 text-left">
              <p className="text-2xl font-bold mb-1">News Letter</p>
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
              <div className="my-1">
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
        <div className="bg-last bg-black grid grid-cols-2 px-16 py-1">
          <div className="">
            <span className="text-white">© </span>
            <span className="text-yellow-400">Digitech  </span>
            <span className="text-white">All Right Reserved.</span>
          </div>
          <div className="flex flex-col items-end pr-10">
            <span className="flex">
              <p className="text-white">Designed By: </p>
              <p className="text-yellow-400">Bros @Digitech</p>
            </span>
            <span className="flex">
              <p className="text-white">Distributed By: </p>
              <p className="text-yellow-400">Digitech Corp</p>
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
