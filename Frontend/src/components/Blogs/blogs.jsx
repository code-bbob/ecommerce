import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogFooter from "./blogFooter";
import Plugins from "./plugins";

export function BlogsView() {
  const [blog, setBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3; // Number of blogs to display per page
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/blog/api/`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Calculate the index of the first and last blog on the current page
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blog.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="container mx-auto flex flex-wrap py-6">
        <section className="md:w-3/5 flex flex-col items-center px-3">
          {currentBlogs.map((b) => (
            <article
              key={b.id}
              onClick={() => {
                navigate(`/blog/${b.id}`);
              }}
              className="flex flex-col shadow-2xl my-4"
            >
              <div className="hover:opacity-75">
                <img className="w-100 h-80" src={b?.image} alt={b?.title} />
              </div>
              <div className="bg-white flex flex-col justify-start p-6">
                <p className="text-blue-700 text-sm font-bold uppercase pb-4">
                  {b?.category}
                </p>
                <p className="text-3xl font-bold hover:text-gray-700 pb-4">
                  {b?.title}
                </p>
                <p className="text-sm pb-3">
                  By{" "}
                  <a href="#" className="font-semibold hover:text-gray-800">
                    {b?.author}
                  </a>
                  , Published on {b?.date}
                </p>
                <p className="pb-6">
                  {b?.introduction && b?.introduction.length > 100
                    ? `${b?.introduction.slice(0, 150)}...`
                    : b?.introduction}
                </p>
                <a
                  href="#"
                  className="uppercase text-blue-800 hover:text-black"
                >
                  Continue Reading <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </article>
          ))}
          {/* Pagination */}
          <div className="flex items-center py-8">
            {Array.from(
              { length: Math.ceil(blog.length / blogsPerPage) },
              (_, index) => (
                <a
                  key={index}
                  href="#"
                  className={`h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3 ${
                    currentPage === index + 1 ? 'bg-blue-800 text-white' : 'hover:bg-blue-600'
                  }`}
                  onClick={() => handleClick(index + 1)}
                >
                  {index + 1}
                </a>
              )
            )}
            {/* Next button */}
            <a
              href="#"
              className={`h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3 ${
                currentPage === Math.ceil(blog.length / blogsPerPage)
                  ? 'cursor-not-allowed text-gray-400'
                  : 'hover:bg-blue-600'
              }`}
              onClick={() => handleClick(currentPage + 1)}
              disabled={currentPage === Math.ceil(blog.length / blogsPerPage)}
            >
              Next <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </section>

      <Plugins/>
      </div>
      <BlogFooter/>
    </>
  );
}
