import { useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setSort,setCategory,setMaxPrice } from '../redux/features/productSlice';
import { RootState } from '../redux/store';

// interface Product {
//   name: string;
//   photo: string;
//   price: number;
//   quantity: number;
//   id: string;
// }

// interface productProps {
//   products : Product[];
//   sort:string,
//   category:string,
//   maxPrice:number,
//   setSort: React.Dispatch<React.SetStateAction<string>>;
//   setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
//   setCategory: React.Dispatch<React.SetStateAction<string>>;
// }


// interface Products {
//   products:Product[]
// }

export const Filter = () => {

  const [categoryList,setCategoryList] = useState<[]>([])

  const dispatch = useDispatch()
  const sort = useSelector((state:RootState)=>state.sort)
  const maxPrice = useSelector((state:RootState)=>state.maxPrice)
  const category = useSelector((state:RootState)=>state.category)
  console.log(sort)
  useEffect(()=>{
    const categories = async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/product/all-products`)
      // console.log(response.data)
      const category = response.data.products.map((prod:any)=>prod.category)
     
      setCategoryList(category)
      console.log(categoryList)

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
            {/* {categoryList.map((category)=><p>{category}</p>)} */}
            <div className='mt-4 '>
              <select value={sort} onChange={(e) => dispatch(setSort(e.target.value))}>
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
                max={150000}
                value={maxPrice}
                onChange={(e) => dispatch(setMaxPrice(e.target.value))}
              />
            </div>

            <div className='mt-2 font-extralight'>
              <h4>Category</h4>
              <select
                value={category}
                onChange={(e) => dispatch(setCategory(e.target.value))}
                className='mt-1'
              >
                <option value="" className='font-extralight'>ALL</option>
                {   
                    categoryList.map((category)=>(
                    <option id={category} value={category} className='font-extralight'>{category}</option>
                    ))
                }
                
              </select>
            </div>
        </div>
        </div>
    )
}
