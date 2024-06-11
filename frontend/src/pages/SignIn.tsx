import {Link, useNavigate} from 'react-router-dom'
import { Input } from '../Components/Input.tsx'
import { Button } from '../Components/Button.tsx'
import { Error } from '../Components/Error.tsx'
import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    email:z.string().email(),
    password:z.string().min(6),
})

type IUser = z.infer<typeof schema>

export const SignIn = () => {

    const navigate = useNavigate()

    const {register,handleSubmit, formState:{errors}} = useForm<IUser>({
        resolver:zodResolver(schema)
    })

    const onSubmit: SubmitHandler<IUser> = async (dataa) =>{
        try{
        const {data} = await axios.post(`http://localhost:3000/api/v1/user/signin`,dataa)

        console.log("data "+data)
        if(!data.error){
            localStorage.setItem("JWT token",data.token)
            navigate('/home')
        }
        }catch(e:any){
            console.log("error "+e.response.data.error)
            console.log(errors)
            // setError(e.response.data.error)
        }
        // console.log("errrror " + error)
    }

    return (
<div className='flex justify-center h-screen flex-col items-center bg-gray-100'>
            <div className='flex items-center bg-gray-100'>
                <div className='flex justify-center flex-col p-20 text-slate-600 rounded-lg'>
                    <div>
                        <div className='text-4xl font-semibold text-slate-950'>
                            Sign in to your account
                        </div>
                    
                        <div className='flex justify-center'>
                            <div className='text-sm mt-1.5'>
                                Get started with our stylish clothing collection.
                            </div>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input register={register} name='email' type='text' label={'E-mail'} placeholder={'john@gmail.com'}></Input>
                            
                            <Input register={register} name='password' type={'password'} label={'Password'} placeholder={'password'}></Input>
                        </form>
                    </div>
                    <div>
                        <div>
                          {/* {error && <Error error={error}/>} */}
                        </div>
                        <Button label={'Sign In'} type='submit'/>
                        {/* {error && <Error error={'ved'}/>} */}

                        <div className='flex justify-center text-xs font-light mt-2'>
                            <div className='text-xs'>
                                Don't have an Account?
                            </div>
                            <div className="flex justify-center flex-col underline font-extralight pl-1" >
                                <Link to={'/SignUp'}>
                                    Sign Up
                                </Link>    
                            </div>
                
                        </div>       
                    </div>
                </div>
            </div>
        </div>    
        )
}

