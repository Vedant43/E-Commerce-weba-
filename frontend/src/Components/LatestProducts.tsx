import { useEffect, useState } from "react"
import { Product } from "./Product"
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { setProduct } from "../redux/features/productSlice"

export const LatestProduct = () => {
    
    // const [products,setProducts] = useState([{
    //     name:'',
    //     photo:'',
    //     price:'',
    //     quantity:'',
    //     id:'',
    //     category:''
    // }])

    const dispatch = useDispatch()
    const products = useSelector((state:RootState) => state.products)

    useEffect(()=>{
        const products = async () => {        
            const response = await axios.get(`http://localhost:3000/api/v1/product/latest-products`)
            console.log(response.data.pageOnePosts)  
            dispatch(setProduct(response.data.pageOnePosts))
            // setProducts(response.data.pageOnePosts)
            return response.data.pageOnePosts
        }
        products()
    },[])

    return (
        <>
            <div className="grid grid-cols-4 ml-4 gap-10">
                {products.map((product=>(
                    <div>
                        {/* {product.name} */}
                        <Product name={product.name} price={product.price} photo={product.photo} category={product.category}/>
                    </div>
                )
                ))}
            </div>
           
        </>
    )
}