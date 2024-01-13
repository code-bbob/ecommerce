import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export function SingleBlog() {
  const [blog, setBlog] = useState([]);
  const params = useParams();
  const blogId = params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/blog/api/${blogId}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [blogId]);

  return (
    <>

    {/* <!-- Top Bar Nav --> */}
    <nav className="w-full py-2 bg-black shadow flex">
    <Link to="/">
        <img className="h-30 w-44" src="/digi.jpg" alt="oop" />
        </Link>
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between">

            <nav>
                <ul className="flex items-center  justify-between font-bold text-sm text-white uppercase no-underline">                      
                    <li><a className="hover:text-gray-200 no-underline text-white hover:underline px-4" href="/">Shop</a></li>
                    <li><a className="hover:text-gray-200 no-underline text-white hover:underline px-4" href="/blog">Blog</a></li>
                </ul>
            </nav>
            <div className="flex justify-between items-center rounded-md w-80 ">
          <input
            className="outline-none w-full p-2"
            type="search"
            placeholder="Search Your Blogs Here"
          />
          <FaSearch className="bg-orange-400 h-10 w-8 p-1 hover:bg-orange-600" />
        </div>

            {/* <div className="flex items-center text-lg no-underline text-white pr-6">
                <a className="" href="#">
                    <i className="fab fa-facebook"></i>
                </a>
                <a className="pl-6" href="#">
                    <i className="fab fa-instagram"></i>
                </a>
                <a className="pl-6" href="#">
                    <i className="fab fa-twitter"></i>
                </a>
                <a className="pl-6" href="#">
                    <i className="fab fa-linkedin"></i>
                </a>
                </div>*/}
        </div>

    </nav>

    {/* <!-- Text Header --> */}
    <header className="w-full container mx-auto">
        <div className="flex flex-col items-center py-12">
            <a className=" text-gray-800 no-underline uppercase hover:text-gray-700 text-5xl" href="#">
                DGTech Blog
            </a>
            <p className="text-lg text-gray-600">
                For your next purchase
            </p>
        </div>
    </header>

    {/* <!-- Topic Nav --> */}
    <nav className="w-full py-4 border-t border-b bg-gray-100">
               
        <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
            <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
                <a href="#" className="hover:bg-gray-400 no-underline text-black hover:underline rounded py-2 px-4 mx-2">Technology</a>
                <a href="#" className="hover:bg-gray-400 no-underline text-black hover:underline rounded py-2 px-4 mx-2">Automotive</a>
                <a href="#" className="hover:bg-gray-400 no-underline text-black hover:underline rounded py-2 px-4 mx-2">Finance</a>
                <a href="#" className="hover:bg-gray-400 no-underline text-black hover:underline rounded py-2 px-4 mx-2">Politics</a>
                <a href="#" className="hover:bg-gray-400 no-underline text-black hover:underline rounded py-2 px-4 mx-2">Culture</a>
                <a href="#" className="hover:bg-gray-400 no-underline text-black hover:underline rounded py-2 px-4 mx-2">Sports</a>
            </div>
        </div>
    </nav>


    <div className="container mx-auto flex flex-wrap py-6">

        {/* <!-- Post Section --> */}
        <section className="w-full md:w-2/3 flex flex-col items-center px-3">

            <article className="flex flex-col shadow my-4">
                {/* <!-- Article Image --> */}
                <a href="#" className="hover:opacity-75">
                    <img src="https://cdn.motor1.com/images/mgl/6ZAvXk/s3/lamborghini-invencible.webp"/>
                </a>
                <div className="bg-white flex flex-col justify-start p-6">
                    <a href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">{blog[0]?.category}</a>
                    <a href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">{blog[0]?.title}</a>
                    <p href="#" className="text-sm pb-8">
                        By <a href="#" className="font-semibold hover:text-gray-800">{blog[0]?.author}</a>, Published on {blog[0]?.date}
                    </p>
                    <h1 className="text-2xl font-bold pb-3">Introduction</h1>
                    <p className="pb-3">{blog[0]?.introduction}</p>
                    <h1 className="text-2xl font-bold pb-3">Body</h1>
                    <p className="pb-3">{blog[0]?.body}</p>
                    <h1 className="text-2xl font-bold pb-3">Conclusion</h1>
                    <p className="pb-3">{blog[0]?.conclusion}</p>
                </div>
            </article>

            <div className="w-full flex pt-6">
                <a href="#" className="w-1/2 bg-white shadow hover:shadow-md text-left p-6">
                    <p className="text-lg text-blue-800 font-bold flex items-center"><i className="fas fa-arrow-left pr-1"></i> Previous</p>
                    <p className="pt-2">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</p>
                </a>
                <a href="#" className="w-1/2 bg-white shadow hover:shadow-md text-right p-6">
                    <p className="text-lg text-blue-800 font-bold flex items-center justify-end">Next <i className="fas fa-arrow-right pl-1"></i></p>
                    <p className="pt-2">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</p>
                </a>
            </div>

            <div className="w-full flex flex-col text-center md:text-left md:flex-row shadow bg-white mt-10 mb-10 p-6">
                <div className="w-full md:w-1/5 flex justify-center md:justify-start pb-4">
                    {/* <!-- userimage --> */}
                    <img src="https://source.unsplash.com/collection/1346951/150x150?sig=1" className="rounded-full shadow h-32 w-32"/>
                </div>
                <div className="flex-1 flex flex-col justify-center md:justify-start">
                    <p className="font-semibold text-2xl">David</p>
                    <p className="pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel neque non libero suscipit suscipit eu eu urna.</p>
                    <div className="flex items-center justify-center md:justify-start text-2xl no-underline text-blue-800 pt-4">
                        <a className="" href="#">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a className="pl-4" href="#">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a className="pl-4" href="#">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a className="pl-4" href="#">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>

        </section>
{/* 
        <!-- Sidebar Section --> */}
        <aside className="w-full md:w-1/3 flex flex-col items-center px-3">

            <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                <p className="text-xl font-semibold pb-5">About Us</p>
                <p className="pb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis est eu odio sagittis tristique. Vestibulum ut finibus leo. In hac habitasse platea dictumst.</p>
                <a href="#" className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4">
                    Get to know us
                </a>
            </div>

            <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                <p className="text-xl font-semibold pb-5">Instagram</p>
                <div className="grid grid-cols-3 gap-3">
                    <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=1"/>
                    <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=2"/>
                    <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=3"/>
                    <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=4"/>
                    <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=5"/>
                    <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=6"/>
                    <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=7"/>
                    <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=8"/>
                    <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=9"/>
                </div>
                <a href="#" className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-6">
                    <i className="fab fa-instagram mr-2"></i> Follow @itsbibhab
                </a>
            </div>

        </aside>

    </div>
    </>
  );
}
