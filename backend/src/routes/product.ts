import express from 'express'
import { PrismaClient } from '@prisma/client'
import zod from 'zod'
import multer from 'multer'
import { fromError } from 'zod-validation-error';
import { upload } from '../middleware/multer.js'
import { updateOnCloudinary, uploadOnCloudinary } from '../file upload/cloudinary.js'
const router = express.Router()

const prisma = new PrismaClient()

const productBody = zod.object({
  name: zod.string(),
  price: zod.number(),
  quantity: zod.number(),
  category: zod.string(),
})

const updateProductBody = zod.object({
  name: zod.string().optional(),
  price: zod.number().optional(),
  quantity: zod.number().optional(),
  category: zod.string().optional(),
})


router.post('/new',upload.single('photo') ,async (req,res)=>{
  console.log("hi1")

  const parsedBody = {
    name: req.body.name,
    price: parseInt(req.body.price),
    quantity: parseInt(req.body.quantity),
    category: req.body.category
  };

  // console.log("hi2",req.file)
  // console.log("test " + req.body.)
  const {data,success} = productBody.safeParse(parsedBody)

  if(!success){
    return res.json({error:"Incorrect credentials"})
  }

  // console.log(req.body.photo)

  if(req.file){
    const upload = await uploadOnCloudinary(req.file.path)
    console.log(upload?.secure_url)

    if(data && upload){
      const timestamp = new Date().toISOString();

      const newProductData = {
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        category: data.category,
        photo: upload.secure_url,
        timestamp: timestamp
      };
    
      console.log('Data to be inserted:', newProductData);

      const product = await prisma.product.create({
        data:{
          name:data.name,
          price:data.price,
          quantity:data.quantity,
          category:data.category,
          photo:upload.secure_url,
          timestamp:timestamp
        }
      })
      console.log("product "+product.name)
      console.log("hi4")
      return res.json({message:"successfully added product",
      image_public_id:upload.public_id,
      product_id:product.id
    })

    }else{
      return res.json("Invalid data")
    }
    
  }else{
    return res.json({error:"Upload Image"})
  }

})

router.post('/update-product/', async (req,res) => {
  console.log(req.body)
})

router.put('/update-product/:id',upload.single('photo'), async (req,res) => {

  const parsedBody = {
    name: req.body.name,
    price: parseInt(req.body.price),
    quantity: parseInt(req.body.quantity),
    category: req.body.category
  };
  const product_id = req.params.id
  const image_public_id:string = req.body.public_id
  const {data,success,error} = updateProductBody.safeParse(parsedBody)
  const obj = updateProductBody.safeParse(req.body)

  if(!success){
    console.log(data)
    console.log(error)
    return res.json({error:"Incorrect credentials"})
  }

  let updateData:Partial<typeof data> & {photo?:string} = {}

  console.log(obj)
  updateData.price = data.price
  updateData.quantity = data.quantity
  updateData.category = data.category
  updateData.name = data.name

  if(req.file){

    const upload = await updateOnCloudinary({public_id:image_public_id,localFilePath:req.file.path})

    if (upload && upload.secure_url) {
      updateData.photo = upload.secure_url;
    } else {
      return res.status(500).json({ error: 'Error uploading image: No secure URL returned' });
    }
  }
console.log(updateData)
  try{
    const updatedProduct = await prisma.product.update({
      where:{
        id:product_id
      },
      data:updateData
    })
    console.log(updatedProduct)
    res.json({ message: 'Product updated successfully' });
  }catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
  
})

router.get('/latest-products',async (req,res) => {
  const pageOnePosts = await prisma.product.findMany({
    take: 4,
  });

  return res.json({pageOnePosts})
})

router.get('/all-products',async (req,res)  => {
  const products = await prisma.product.findMany({})
  
  return res.json({products})
})

router.delete("/delete/:id", async (req,res) => {
  const productId = req.params.id

  try{
  const products = await prisma.product.delete({
    where:{
      id:productId
    }
  })

  return res.json({message:"Deleted successfully"})
  }catch(err){
    console.log("Error : " + err)

    return res.json({error:"Couldn't delete"})
  }
})

export default router