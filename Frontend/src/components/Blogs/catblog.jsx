import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function CategoryBlog() {
  const [blog, setBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3; // Number of blogs to display per page
  const navigate = useNavigate();
  const params = useParams();
  const blogCategory = params.cat;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/blog/api/cat/${blogCategory}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [blogCategory]); // Include blogCategory as a dependency

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
        {/* Sidebar Section */}
        <aside className="w-full md:w-1/3 flex flex-col items-center px-3">
          <div className="w-full bg-white shadow flex flex-col my-4 p-6">
            <p className="text-xl font-semibold pb-5 mx-auto ">Instagram</p>
            <div className="grid grid-cols-3 gap-3">
              <img
                className="hover:opacity-75"
                src="https://pbs.twimg.com/profile_images/1634235947674943489/zdJeuso-_400x400.jpg"
              />
              {/* Add more images or content related to the category */}
            </div>
            <a
              href="#"
              className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-6"
            >
              <i className="fab fa-instagram mr-2"></i> Follow @itsbibhab
            </a>
          </div>
          <div className="w-full bg-white shadow flex flex-col my-4 p-6">
            <p className="text-xl font-semibold pb-5 mx-auto">About Us</p>
            <p className="pb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              mattis est eu odio sagittis tristique. Vestibulum ut finibus leo.
              In hac habitasse platea dictumst.
            </p>
            <a
              href="#"
              className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4"
            >
              Get to know us
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
