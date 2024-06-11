import { ChangeEvent } from "react"
import { UseFormRegister } from "react-hook-form"

interface inputTypes {
    label:string,
    type:"number" | "text" | "password",
    name:string
    placeholder:string,
    register:UseFormRegister<any>,
    
}

export const Input = ({type,label,name,placeholder,register}:inputTypes) => {
    return (
        <div className="mt-2">

            <label className="block mb-2 text-sm font-medium mt-3">{label}</label>
            <input type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} 
            {...register(name)} required />
        </div>
    )
}
// type={`${type} == ${'password'} && 'password' : 'text'`}