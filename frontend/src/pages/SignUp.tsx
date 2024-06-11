import {Link, useNavigate} from 'react-router-dom'
import { Input } from '../Components/Input.tsx'
import { Button } from '../Components/Button.tsx'
import { Error } from '../Components/Error.tsx'
import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(6),
})

type IUser = z.infer<typeof schema>

export const SignUp = () => {

    const navigate = useNavigate()
    
    const {register,handleSubmit,setValue, formState:{errors}} = useForm<IUser>({
        resolver:zodResolver(schema)
    })

    const onSubmit:SubmitHandler<IUser> = async (dataa) => {
        try{
        const {data} = await axios.post(`http://localhost:3000/api/v1/user/signup`,dataa)

        console.log("data "+data)

        if(!data.error){
            localStorage.setItem("JWT token",data.token)
            navigate('/home')
        }
        }catch(e:any){
            console.log("error "+e.response.data.error)
        }
        // console.log("errrror " + error)
        // try{        
        //     const {data}=await axios.post(`http://localhost:3000/api/v1/user/signup`,signUpInput)
        // }catch(e:any){setError(e.response.data.error)}
        
    }

    return (
        <div className='flex justify-center h-screen flex-col items-center bg-gray-100'>
            <div className='flex items-center bg-gray-100'>
                <div className='flex justify-center flex-col p-20 text-slate-600 rounded-lg'>
                    <div>
                        <div className='text-4xl font-semibold text-slate-950'>
                            Sign up for your account
                        </div>
                        <div className='flex justify-center'>
                        <div className='text-sm mt-1.5'>
                            Get started with our stylish clothing collection.
                        </div>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input register={register} name={'name'} type={'text'} label={'Name'} placeholder={'John Doe'}></Input>

                            <Input register={register} name={'email'} type={'text'} label={'E-mail'} placeholder={'john@gmail.com'}></Input>

                            <Input register={register} name={'password'} type={'password'} label={'Password'} placeholder={'password'}></Input>

                            <Button label={'Sign Up'} />
                        </form>
                    </div>
                    <div>
                        <div>
                          {/* {error && <Error error={error}/>} */}
                        </div>
                        
                        
                        <div className='flex justify-center text-xs font-light mt-2'>
                            <div className='text-xs'>
                                Already have an Account?
                            </div>
                            <div className="flex justify-center flex-col underline font-extralight pl-1" >
                                <Link to={'/SignIn'}>
                                    Sign In
                                </Link>    
                            </div>
                        </div>       
                    </div>
                </div>
            </div>
        </div>
        
    )
}

