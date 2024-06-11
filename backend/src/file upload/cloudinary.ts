import {v2 as cloudinary} from "cloudinary"
import fs from 'fs'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });


export const uploadOnCloudinary = async (localFilePath: string) => {
    try{
        
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })

        if(response){
            console.log("Files if uploaded on cloudinary and publid id " + response.public_id)
            return {
                public_id:response.public_id,
                secure_url:response.secure_url
            }
        }else {
            console.log("Upload failed");
            return null;
        }

    }catch(error){
        console.log("Upload failedd"+ error)
        // fs.unlinkSync(localFilePath) //remove locally saved temporary files
    }
}

interface updateOnCloudinaryBody {
    public_id:string,
    localFilePath:string
}

export const updateOnCloudinary = async ({public_id,localFilePath}:updateOnCloudinaryBody) => {
    try{
        const { result } = await cloudinary.uploader.destroy(public_id);

        if (result === "not found")
            throw new Error("Please provide correct public_id");
          if (result !== "ok")
            throw new Error("Try again later.");

        return uploadOnCloudinary(localFilePath)
    }catch(error){
        console.error(error)
    }
}