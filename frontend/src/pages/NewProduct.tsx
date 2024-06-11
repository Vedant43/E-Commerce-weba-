import { ChangeEvent, useState } from "react";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
// import { Error } from '../Components/Error.tsx'
import { Upload } from "../Components/Upload";
import { SubmitHandler, useForm } from "react-hook-form";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import axios from 'axios'
import { useNavigate } from "react-router-dom";

const schema = z.object({
    name:z.string(),
    category:z.string(),
    price: z.string().refine((value) => !isNaN(parseFloat(value)), {
        message: 'Price must be a valid number',
        path: ['price'],
    }),
    quantity: z.string().refine((value) => !isNaN(parseFloat(value)), {
        message: 'Quantity must be a valid number',
        path: ['quantity'],
    }),
    photo:z.instanceof(File)
})

type productField = z.infer<typeof schema>

export const NewProduct = () => {

    const navigate = useNavigate()

    const {register,handleSubmit,setValue, formState:{errors}} = useForm<productField>({
        resolver:zodResolver(schema)
    })

    const onSubmit: SubmitHandler<productField> = async (dataa) =>{
        try{

            const data = await axios.post('http://localhost:3000/api/v1/product/new',dataa,
            {
                headers: {
                'Content-Type': 'multipart/form-data'
            }})
            console.log("data"+data.data)
            if(data.data.message && data.status === 200){
                console.log("hi",data.data.message)
                // navigate('/home')
            }
        }
        catch(e:any){
            console.log("error "+e.response.data.error)
            // setError(e.response.data.error)
        }
    }

    const upload = (e:ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        // console.log('photo',"public\\temp\\" +file)
        if(file){
            // setValue('photo',"public\\temp\\" +file)
            setValue('photo',file)
        }
    }

    console.log("errors : ",errors)

    return (
        <>
             <div className='flex justify-center h-screen flex-col  items-center bg-gray-100'>
            <div className='flex items-center bg-gray-100 '>
                <div className='flex justify-center w-full flex-col p-20 text-slate-600 rounded-lg'>
                    <div className="flex justify-center">
                        <div className='text-2xl w-2/3 font-semibold text-slate-950'>
                            New Product
                        </div>
                    </div>
                    <div className="w-64">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input name="name" register={register} type="text" label={'Name'} placeholder={'product'}></Input>
                            {errors.name && (
                                <div className="text-red-500">{errors.name.message}</div>
                            )}
                            <Input name="price" type="number" register={register} label={'Price'} placeholder={'0'}></Input>
                            {errors.price && (
                                <div className="text-red-500">{errors.price.message}</div>
                            )}
                            <Input name="quantity" type="number" register={register} label={'Quantity'} placeholder={'0'}></Input>
                            {errors.quantity && (
                                <div className="text-red-500">{errors.quantity.message}</div>
                            )}
                            
                            <Input name="category" type="text" register={register} label={'Category'} placeholder={'sample'}></Input>
                            {errors.category && (
                                <div className="text-red-500">{errors.category.message}</div>
                            )}
                            <Upload 
                                    handleUpload={upload}
                                />
                            <Button label={'Create'} type={"submit"}/>
                        </form>
                    </div>
                    <div>
                        <div>
                          {/* {error && <Error error={error}/>} */}
                        </div>
                        
                           
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}

// const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files && e.target.files[0];
    //     if (file) {
    //         const formData = new FormData();
    //         formData.append('file', file);
    //         formData.append('name', product.name);
    //         formData.append('category', product.category);
    //         formData.append('quantity', product.quantity.toString());
    //         formData.append('price', product.price.toString());

    //         try {
    //             const response = await axios.post('http://localhost:3000/api/v1/product/new', formData, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data'
    //                 }
    //             });
                
    //             if (response.status === 200) {
    //                 const data = response.data;
    //                 if (!data.error) {
    //                     console.log(data.product_id);
    //                     navigate('/home');
    //                 } else {
    //                     setError(data.error);
    //                 }
    //             }
    //         } catch (error) {
    //             console.error('Error creating product:', error);
    //             setError('Error creating product');
    //         }
    //     }
    // };