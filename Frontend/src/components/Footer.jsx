import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";


export default function Footer() {
  const [showMore, setShowMore] = useState(false);  

  function readMore() {
    setShowMore(!showMore);
  }

  return (
    <>
      <div className="bg-gray-400">
       
        <div className="">
          <div className="flex justify-between p-5 bg-footer pt-20 pl-16 pr-10">
            <div className=" p-1 py-5 rounded-lg text-left text-xs w-1/3 ">
        <span>
            <p> Since its inception in 2023, this site has been at the forefront
                of connecting job seekers and employers in Nepal and around the
                globe. The goal is to provide a comprehensive platform for job
                seekers to find jobs in Nepal and for employers to find the
                right fit for their organization. We pride ourselves on being a
                reliable bridge between hiring employers and job seekers and
                have established ourselves as a national leader in recruitment
                solutions.</p>{""}
            {!showMore && (
          <>
            <a onClick={readMore} className="text-primary">
              Read more...
            </a>
          </>
        )}
            
        {showMore && (
          <>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam veniam, similique pariatur veritatis quos nisi eum nulla id vitae et saepe voluptatibus recusandae itaque voluptas quasi fugit repudiandae iste voluptate.</p>
            <a onClick={readMore} className="text-primary">
              Read less
            </a>
            
          </>
        )}
        </span>
      
            </div>
            <div className="  p-5 rounded-3xl px-10">
              <p className="text-2xl font-bold mb-4">Logo</p>
              <p>gg</p>
            </div>
            <div className=" p-5 rounded-3xl px-10">
              <p className="text-2xl font-bold mb-4">About Us</p>
              <ul className="text-left">
                <a href="">
                  <li>About Us</li>
                </a>
                <a href="">
                  <li>Life at About Us</li>
                </a>
                <a href="">
                  <li>Facebook</li>
                </a>
                <a href="">
                  <li>Instagram</li>
                </a>
                <a href="">
                  <li>X</li>
                </a>
                <a href="">
                  <li>Feedback</li>
                </a>
              </ul>
            </div>
            <div className=" p-5 rounded-3xl px-10 text-left">
              <p className="text-2xl font-bold mb-4">Contacts</p>
              <div className="flex items-center">
                <FaLocationDot />
                <p>Locations-09-nepal</p>
              </div>
              <div className="flex items-center">
                <MdEmail />
                <p>asdas@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
