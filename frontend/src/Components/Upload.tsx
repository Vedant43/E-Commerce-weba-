import { ChangeEvent } from "react"

interface uploadProps {
    handleUpload? : (event: ChangeEvent<HTMLInputElement>) => void,
}
export const Upload = ({handleUpload}:uploadProps) => {
    return (
        <>  <div className="mt-2">
                <label className="block mb-2 text-sm font-medium text-gray-900" >Upload file</label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" type="file" onChange={handleUpload}
                />
            </div>
        </>
    )
}