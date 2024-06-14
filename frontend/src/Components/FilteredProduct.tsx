import { useEffect, useState } from "react"
import { Product } from "./Product"
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../redux/features/productSlice";
import { RootState } from "../redux/store";

export const FilteredProduct = () => {

    const [page,setPage] = useState(1)

    const dispatch = useDispatch()
    const products = useSelector((state:RootState) => state.products)

    const sort = useSelector((state:RootState)=>state.sort)
    const maxPrice = useSelector((state:RootState)=>state.maxPrice)
    const category = useSelector((state:RootState)=>state.category)

    const totalPage = Array(Math.ceil(products.length/6)).length

    useEffect(()=>{
        const products = async () => {        
            const response = await axios.get(`http://localhost:3000/api/v1/product/all-products`)

            let filteredProducts = response.data.products
            
            if(sort==="asc"){
                filteredProducts = filteredProducts.sort( (a:any,b:any) => a.price-b.price)
            }
            if(sort==="dsc"){
                filteredProducts = filteredProducts.sort( (a:any,b:any) => b.price-a.price)
            }

            if (maxPrice) {
                filteredProducts = filteredProducts.filter(
                  (product:any) => product.price <= maxPrice
                );
            }
            if(category) {
                filteredProducts = filteredProducts.filter(
                    (product:any) => product.category === category
                )
            }

            dispatch(setProduct(filteredProducts))

            return filteredProducts
        }
        products()
    },[sort,maxPrice,category])

    console.log("Total products "+products.length)

    return (
        <div className="">

           {
                products.length>0 && 
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-6 mt-8 mb-5">
                    {products.slice(page*6 - 6,page*6).map((product)=>{
                        return <div key={product.id} className="">
                        <Product name={product.name} price={product.price} photo={product.photo} category={product.category}/>
                    </div>
                    })}
                </div>
           }

           {
            products.length > 0 && 
            <div className="flex justify-center items-center gap-2 mb-4">
                <button 
                    onClick={
                        ()=>{
                            if(page===1) setPage(Array(Math.ceil(products.length/6)).length)
                            else setPage(page-1)
                    }
                    } 
                    type="button" 
                    className="px-3 py-2 text-sm font-medium text-center text-slate-200 bg-blue-700 rounded-lg hover:bg-blue-800 ">
                    Prev
                </button>

                    
                <span className="font-normal font-custom text-lg text-slate-600">{page} of {Array(Math.ceil(products.length/6)).length}</span>

                <button onClick={
                        ()=>{
                                if(page===totalPage) 
                                {
                                    setPage(1)
                                }
                                else 
                                {
                                    setPage(page+1)                        
                                } 
                            }
                        }
                        type="button" 
                        className="px-3 py-2 text-sm font-medium text-center text-slate-200 bg-blue-700 rounded-lg hover:bg-blue-800 ">
                    Next
                </button>

            </div>
           }
        </div>
    )
}