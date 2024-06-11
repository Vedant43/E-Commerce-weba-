import { useEffect, useState } from "react"
import { Product } from "./Product"
import axios from 'axios'

export const LatestProduct = () => {
    
    const [products,setProducts] = useState([{
        name:'',
        photo:'',
        price:'',
        quantity:'',
        id:'',
        category:''
    }])

    useEffect(()=>{
        const products = async () => {        
            const response = await axios.get(`http://localhost:3000/api/v1/product/latest-products`)
            console.log(response.data.pageOnePosts)  
            setProducts(response.data.pageOnePosts)
            return response.data.pageOnePosts
        }
        products()
    },[])

    return (
        <>
            <div className="grid grid-cols-4 ml-4 gap-10">
                {products.map((product=>(
                    <div>
                        <Product name={product.name} price={product.price.toString()} photo={product.photo} category={product.category}/>
                    </div>
                )
                ))}
            </div>
           
        </>
    )
}