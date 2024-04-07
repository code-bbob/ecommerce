import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Plugins from "./plugins";
import BlogFooter from "./blogFooter";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
export function SingleBlog() {
  const [blog, setBlog] = useState([]);
  const params = useParams();
  const blogId = params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/blog/api/${blogId}`)
      .then((res) => {
        setBlog(res.data);
        console.log('lololololololololo',res.data);
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
                    <a href="#" className="text-blue-700 text-sm font-bold no-underline uppercase pb-4">{blog[0]?.category}</a>
                    <a href="#" className="text-3xl font-bold hover:text-gray-700 text-black no-underline pb-4">{blog[0]?.title}</a>
                    <p href="#" className="text-sm pb-8">
                        By <a href="#" className="font-semibold no-underline hover:text-gray-800">{blog[0]?.author}</a>, Published on {blog[0]?.date}
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: blog[0]?.content}} />
                </div>
            </article>


            <div className="w-full flex flex-col text-center md:text-left md:flex-row shadow bg-white mt-10 mb-10 p-6">
                <div className="w-full md:w-1/5 flex justify-center md:justify-start pb-4">
                    {/* <!-- userimage --> */}
                    <img src="https://source.unsplash.com/collection/1346951/150x150?sig=1" className="rounded-full shadow h-32 w-32"/>
                </div>
                <div className="flex-1 flex flex-col justify-center md:justify-start">
                    <p className="font-semibold text-2xl">Bibhab</p>
                    <p className="pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel neque non libero suscipit suscipit eu eu urna.</p>
                    <div className="flex items-center justify-center md:justify-start text-2xl no-underline text-blue-800 pt-4">
                    
                <a href='/facebook.com' className="text-black mx-auto">
                <FaFacebook size={30}/>
                </a>
                <Link to='instagram.com'className="text-black mx-auto">         <FaInstagram size={30} />
                </Link>
                <Link to='twitter.com'className="text-black mx-auto">
                <FaTwitter size={30} />
                </Link>

    
               
                    </div>
                </div>
            </div>

        </section>
<Plugins/>

    </div>
<BlogFooter/>
    </>
  );
}
