import { useEffect, useState } from 'react';
import axios from 'axios'

interface Product {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  id: string;
}

interface productProps {
  products : Product[];
  sort:string,
  category:string,
  maxPrice:number,
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const Filter = ({products,sort,setSort,category,setCategory,maxPrice,setMaxPrice}:productProps) => {

  const [categoryList,setCategoryList] = useState<string[]>([])

  useEffect(()=>{
    const categories = async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/product/all-products`)
      // console.log(response.data)
      const category = response.data.products.map((prod:any)=>prod.category)
      console.log(category)
      setCategoryList(category)
      return category
    }
    categories()
  },[])
  
    return (
        <div className='mt-4 w-60 h-full shadow-2xl flex justify-center font-custom font-extralight'>
          <div>
            <div className='uppercase font-custom tracking-wider font-light'>
                Filters
            </div>
            <div className='mt-4 '>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="" className='font-extralight'>None</option>
                <option value="asc" className='font-extralight'>Price (Low to High)</option>
                <option value="dsc" className='font-extralight'>Price (High to Low)</option>
              </select>
            </div>

            <div className='mt-3'>
              <h4>Max Price: {maxPrice || ""}</h4>
              <input
                type="range"
                min={10}
                max={125000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>

            <div className='mt-2 font-extralight'>
              <h4>Category</h4>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='mt-1'
              >
                <option value="" className='font-extralight'>ALL</option>
                {categoryList.map((category)=>(
                  <option value={category} className='font-extralight'>{category}</option>
                ))
                }
                
              </select>
            </div>
        </div>
        </div>
    )
}

// import { useState } from "react";

// export const Filter = () => {
//     const [isOpen, setOpen] = useState(false);
  
//     const handleDropDown = () => {
//       setOpen(!isOpen);
//     };
  
//     return (
//       <div className="dropdown">
//         <button
//           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
//           onClick={handleDropDown}
//         >
//           Steps
//           <svg
//             className="ml-2 w-4 h-4"
//             aria-hidden="true"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M19 9l-7 7-7-7"
//             ></path>
//           </svg>
//         </button>
  
//         <div
//           id="dropdown"
//           className={`z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow ${
//             isOpen ? "block" : "hidden"
//           }`}
//         >
//           <ul className=" z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow ">
//               <li
//               >
//                 <a href="#" className="block py-2 px-4 hover:bg-gray-100">
//                   blablabla
//                 </a>
//               </li>
//           </ul>
//         </div>
//       </div>
//     );
//   };

