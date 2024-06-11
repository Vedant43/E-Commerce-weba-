import multer from 'multer'
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log("uploadee2")
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const ext = path.extname(file.originalname);
    cb(null, file.originalname + '-' + uniqueSuffix + ext)
    }
    
  })

export const upload = multer({storage})