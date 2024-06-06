// import React from 'react'
// import { useParams } from 'react-router'
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// // import Pagination from "rc-pagination";

// // import toast from "react-hot-toast";
// import { ToastContainer, toast } from "react-toastify";
// import Singleproduct from './SingleProduct';

// export default function FilteredProduct() {

  
//   const params = useParams()
//   console.log("params",params.category)
//   const initialState = {
//     search: "",
//     job_type: "",
//   };
//   const [products, setproducts] = useState([]);
//   const [input, setInput] = useState(initialState);
//   const [isEmpty, setIsEmpty] = useState(false);
//   const [currentSearchParams, setSearchParams] = useSearchParams();
//   const [paginationData, setPaginationData] = useState({
//     total: 10,
//     Page: 1,
//     perPage: 5,
//   });
//   const userDetail = useSelector((state) => state.user.value);
//   console.log(userDetail);
//   console.log("*********8",currentSearchParams);


//   useEffect(() => {
//     setIsEmpty(false);
//     // Aos.init({ duration: 1000 });
//     axios
//       .get(`http://localhost:8000/shop/api/catsearch/${params.category}`)
//       .then((res) => {
//         console.log(res.data)
//         setproducts(res.data);
//         // if (res.data.products[0].metadata[0]) {
//         //   setPaginationData(res.data.products[0].metadata[0]);
//         // }
//         // res.data.products[0].data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
//       })
//       .catch((err) => console.error(err));

//     // sdds
//   }, [params.search]);
//   // console.log(params.search);

//   // function handleChange(e) {
//   //   setInput({ ...input, [e.target.name]: e.target.value });
//   //   setSearchParams(currentSearchParams);
//   //   // console.log(currentSearchParams.get("search"));
//   // }

 

//   console.log(isEmpty);

//   return (
//     <div className=" p-7">
//        <div>
//            <img src="/image.png" alt="" />
//         </div>
//       <h2 className="mt-16 text-xl text-black bg-[#F6F7FA] font-bold text-center py-6">
//         All the products You're Seeking Available Here
//       </h2>
//       <div className=" container mx-auto">
//         <div className="my-4">
//           <div className="  flex flex-col sm:flex-row gap-4 sm:justify-between items-center">
           
//             <div className="flex gap-1  justify-between sm:justify-normal">
//               <div className="flex flex-col gap-1 text-center">
//                 <label className=" text-sm font-thin ">Sort By</label>
//                 <select
//                   name="Sort_by"
//                   onChange={(e) => {
//                     currentSearchParams.set("job_type", e.target.value);
//                     setSearchParams(currentSearchParams);
//                   }}
//                   className=" text-sm font-light border-2 rounded-lg"
//                 >
//                   {/* <option defaultValue value={""}></option> */}
//                   <option defaultChecked value={"High to Low"}>
//                     High to Low
//                   </option>
//                   <option value={"Low to high"}>Low to High</option>
//                 </select>
//               </div>
//               <div className="flex flex-col gap-1 text-center">
//                 <label className=" text-sm font-thin ">Job Level</label>
//                 <select
//                   name="job_level"
//                   onChange={(e) => {
//                     currentSearchParams.set("job_level", e.target.value);
//                     setSearchParams(currentSearchParams);
//                   }}
//                   className=" text-sm font-light border-2 rounded-lg"
//                 >
//                   {/* <option defaultValue value={""}></option> */}
//                   <option defaultChecked value=""></option>
//                   <option defaultChecked value={"fresher"}>
//                     fresher
//                   </option>
//                   <option value={"junior"}>junior</option>
//                   <option value={"mid"}>mid</option>
//                   <option value={"senior"}>senior</option>
//                 </select>
//               </div>
//               <div className="flex flex-col gap-1 text-center">
//                 <label className=" text-sm font-thin ">Job Category</label>
//                 <select
//                   name="job_type"
//                   onChange={(e) => {
//                     currentSearchParams.set("category", e.target.value);
//                     setSearchParams(currentSearchParams);
//                   }}
//                   className="  text-sm font-light border-2 rounded-lg"
//                 >
//                   {/* <option defaultValue value={""}></option> */}

//                   <option defaultChecked value={""}></option>
//                   <option value={"bank-finance"}>Bank/Finance</option>
//                   <option value={"sales-marketing"}>Sales/Marketing</option>
//                   <option value={"government"}>Government</option>
//                   <option value={"army-police"}>Army/Police</option>
//                   <option value={"cooperative"}>Co-operative</option>
//                   <option value={"school-college"}>School/College</option>
//                   <option value={"healthcare"}>Healthcare</option>
//                   <option value={"hotel-restaurant"}>Hotel/Restaurant</option>
//                   <option value={"customer_care"}>Customer-Care</option>
//                   <option value={"it-computer"}>IT/Computer</option>
//                   <option value={"it-computer"}>Design Creative</option>
//                   <option value={"logistics-supply_chain"}>
//                     Logistics/Supply Chain
//                   </option>
//                 </select>
//               </div>
//             </div>
           
//           </div>
//         </div>
//         <div className="flex justify-between">
//           {/* <Pagination
//             total={paginationData.total}
//             pageSize={paginationData.perPage}
//             prevIcon="<"
//             nextIcon=">"
//             current={paginationData.Page}
//             onChange={(pgNumber) => {
//               console.log(pgNumber);
//               currentSearchParams.set("Page", pgNumber);
//               setSearchParams(currentSearchParams);
//             }}
//             showTotal={(total, range) =>
//               `${range[0]}-${range[1]} of ${total} items Shown`
//             }
//           /> */}
          
//         </div>
//         {isEmpty && (
//           <div className=" mx-auto text-center mt-20">
//             <h3 className=" text-red-500 font-bold text-4xl">Sorry!!!</h3>
//             <h2 className=" text-red-300 mt-2 font-bold text-2xl">
//               No Such Job Found
//             </h2>
//           </div>
//         )}
//         <div className="mb-2  -z-10">
//           {products.map((prod) => (
//             <div
//               data-aos="slide-up"
//               key={prod._id}
//               className="flex    flex-col  "
//             >
//               <Singleproduct prod={prod} />
              
              
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );



// }