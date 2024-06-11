import { BiCartAdd } from "react-icons/bi";

// interface productTypes {
//   name:string,
//   price:string,
//   photo:string,
// } 

// export const Product = ({name,price,photo}:productTypes) => {
//   return (
//     <div>
//       <div className="my-4 flex w-full h-96 flex-col overflow-hidden border border-gray-100 bg-white shadow-md">
//         <a className="relative flex h-48 overflow-hidden " href="#">
//           <img
//             className="absolute top-0 right-0 h-full w-full object-cover"
//             src={photo}
//             alt="product image"
//           />
          
//           {/* <div className="absolute inset-0 bg-black opacity-40"></div> */}
//         </a>
//         <div className="mt-4 px-5 pb-5">
//           <a href="#">
//             <h5 className="text-xl tracking-tight text-slate-900">
//               {name}
//             </h5>
//           </a>
//           <div className="mt-2 mb-5 flex items-center justify-between">
//             <p>
//               <span className="text-3xl font-bold text-slate-900">₹{price}</span>
//             </p>
//           </div>
//           <button className="flex items-center border rounded justify-center bg-gray-900 px-2 py-1 text-sm text-white transition hover:bg-gray-700">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="mr-2 h-5 w-5"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
//             </svg>
//             Add to cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

{
  /* <div className="absolute inset-0 bg-black opacity-40"></div> */
}

// interface productTypes {
//   name:string,
//   price:string,
//   photo:string,
// } 

// export const Product = ({name,price,photo}:productTypes) => {
//   return (
// <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden bg-white">
//   <a className="relative flex h-64 w-60 overflow-hidden" href="#">
//     <img className="absolute top-0 right-0 h-full w-full object-cover" src={photo} alt="product image" />
   
//     <div className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
     
//       <button className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
//         <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
//         </svg>
//       </button>
//     </div>
//   </a>
//   <div className="mt-4 pb-5">
//     <a href="#">
//       <h5 className="text-center tracking-tight text-gray-500">{name}</h5>
//     </a>
//     <div className="mb-5 flex justify-center">
//       <p>
//         <span className="text-sm font-bold text-gray-900">₹{price}</span>
//       </p>
//     </div>
//   </div>
// </div>)}

    // <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-6 mt-8 mb-5">
    // <div className="grid grid-cols-4 gap-y-2 bg-slate-400">
      {/* <div className="w-64 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"> */}

interface productTypes {
  name:string,
  price:string,
  photo:string,
  category:string
} 

export const Product = ({name,price,photo,category}:productTypes) => {
  return (

      <div className="w-64 h-80 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
              <img src={photo}
                      alt="Product" className="h-48 w-72 object-contain rounded-t-xl" /> 
              <div className="px-4 py-3 w-72 h-3/6">
                  <span className="text-gray-400 mr-3 uppercase text-xs">{category}</span>
                  <p className="text-lg font-normal text-slate-700 truncate block capitalize">{name}</p>
                  <div className="flex items-center ">
                    <div>
                      <p className="text-lg font-light text-slate-500	 cursor-auto my-3">₹{price}</p>
                    </div>
                    <div className="ml-32 text-slate-600">
                      
                      <BiCartAdd size={28}/>
                    </div>
                      {/* <div className="ml-34"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                              fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                              <path fill-rule="evenodd"
                                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                              <path
                                  d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                          </svg>
                      </div> */}
                  </div>
              </div>
          </a>
      </div>
    // </div>
  )
}

