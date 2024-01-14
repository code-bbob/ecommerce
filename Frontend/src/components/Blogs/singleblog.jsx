import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

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

    <div className="container mx-auto flex flex-wrap py-6">

        {/* <!-- Post Section --> */}
        <section className="w-full md:w-2/3 flex flex-col items-center px-3">

            <article className="flex flex-col shadow my-4">
                {/* <!-- Article Image --> */}
                <a href="#" className="hover:opacity-75">
                    <img className='w-100 h-auto' src={blog[0]?.image}/>
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
{/*<!-- Sidebar Section --> */}
        <aside className="w-full md:w-1/3 flex flex-col items-center px-3">

        <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                <p className="text-xl font-semibold pb-5 mx-auto ">Instagram</p>
                <div className="grid grid-cols-3 gap-3">
                    <img className="hover:opacity-75" src="https://pbs.twimg.com/profile_images/1634235947674943489/zdJeuso-_400x400.jpg"/>
                    <img className="hover:opacity-75" src="https://pbs.twimg.com/profile_images/1634235947674943489/zdJeuso-_400x400.jpg"/>
                    <img className="hover:opacity-75" src="https://pbs.twimg.com/profile_images/1634235947674943489/zdJeuso-_400x400.jpg"/>
                    <img className="hover:opacity-75" src="https://pbs.twimg.com/profile_images/1634235947674943489/zdJeuso-_400x400.jpg"/>
                    <img className="hover:opacity-75" src="https://pbs.twimg.com/profile_images/1634235947674943489/zdJeuso-_400x400.jpg"/>
                    <img className="hover:opacity-75" src="https://pbs.twimg.com/profile_images/1634235947674943489/zdJeuso-_400x400.jpg"/>
                    <img className="hover:opacity-75" src="https://pbs.twimg.com/profile_images/1634235947674943489/zdJeuso-_400x400.jpg"/>
                    <img className="hover:opacity-75" src="https://pbs.twimg.com/profile_images/1634235947674943489/zdJeuso-_400x400.jpg"/>
                    <img className="hover:opacity-75" src="https://pbs.twimg.com/profile_images/1634235947674943489/zdJeuso-_400x400.jpg"/>
                </div>
                <a href="#" className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-6">
                    <i className="fab fa-instagram mr-2"></i> Follow @itsbibhab
                </a>
            </div>

            <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                <p className="text-xl font-semibold pb-5 mx-auto">About Us</p>
                <p className="pb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis est eu odio sagittis tristique. Vestibulum ut finibus leo. In hac habitasse platea dictumst.</p>
                <a href="#" className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4">
                    Get to know us
                </a>
            </div>

        </aside>

    </div>
    </>
  );
}
