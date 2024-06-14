import { createSlice } from "@reduxjs/toolkit"

export const productSlice = createSlice({
    name:'product',
    initialState:{
        products:[
            {
                name:'',
                photo:'',
                price:0,
                quantity:0,
                id:'',
                category:''
            }
        ],
        sort:'',
        maxPrice:150000,
        category:''
    },
    reducers:{
        setProduct : (state,action) => {
            // state.products = state.products.concat(action.payload);
            state.products = action.payload
        },
        setSort : (state,action)=>{
            state.sort = action.payload
        },
        setCategory : (state,action)=>{
            state.category = action.payload
        },
        setMaxPrice : (state,action)=>{
            state.maxPrice = action.payload
        },
    }
})

export const { setProduct,setSort,setCategory,setMaxPrice } = productSlice.actions
export default productSlice.reducer