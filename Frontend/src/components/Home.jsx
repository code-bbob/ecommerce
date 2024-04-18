import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import Footer from "./Footer";
import { BlogsView } from "./Blogs/blogs";
import { Products } from "./Products";

// Carousel.js

export const Carousel = () => {
  const settings = {
    indicators: true, // You can set this to false if you want to hide the dots
    animateOut: "fadeOut", // Use 'fadeOut' for crossfade transition
    interval: 5000, // Adjust the interval as needed (in milliseconds)
  };

  return (
  <>
    <CCarousel {...settings} controls transition="crossfade" className="h-fit">
      <CCarouselItem>
        <CImage className="d-block w-100" src="/carousel1.jpg" alt="slide 1" />
      </CCarouselItem>
      <CCarouselItem>
        <CImage
          className="d-block w-100 h-72"
          src="/carousel2.png"
          alt="slide 2"
        />
      </CCarouselItem>
      <CCarouselItem>
        <CImage
          className="d-block w-100 h-72"
          src="/carousel3.png"
          alt="slide 3"
        />
      </CCarouselItem>
    </CCarousel>
  </>)
};

export const Home = () => {
  return (
    <>
      <Carousel />
      <div className="bg-gray-300">
        <h1 className="text-center mt-14">Latest Products</h1>

        <Products/>

        {/* <h1 className="text-center mt-10">Latest Blogs</h1>
        <BlogsView/> */}
      </div>
      <Footer />
    </>
  );
};
