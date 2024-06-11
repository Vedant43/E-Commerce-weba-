import { useEffect, useState } from "react"
import { Product } from "./Product"
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import axios from 'axios'

interface Product {
    name: string;
    photo: string;
    price: number;
    quantity: number;
    id: string;
}

interface filteredProductProps {
    // productList : Product[];
    productList : (product:Product[])=>void;
    maxPrice:number;
    sort:string;
    category:string;
}

export const FilteredProduct = ({productList,maxPrice,sort,category}:filteredProductProps) => {

    const [products,setProducts] = useState<Product[]>([{
        name:'',
        photo:'',
        price:0,
        quantity:0,
        id:'',
    }])
    const [page,setPage] = useState(1)
    // console.log("sort"+ sort)
    console.log(maxPrice)
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
            console.log("categories " + category)
            if(category) {
                filteredProducts = filteredProducts.filter(
                    (product:any) => product.category === category
                )
            }

            setProducts(filteredProducts)
            productList(filteredProducts) // sending to parent

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
                        return <div className="">
                        <Product name={product.name} price={product.price.toString()} photo={product.photo} category={product.category}/>
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

                    {/* {[...Array(Math.ceil(products.length/6))].map((_,i)=>{
                        return <span>{} </span>
                    })} */}
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