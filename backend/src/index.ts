import express from 'express';
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js"
import formData from 'express-form-data'
import cors from "cors";

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use("/api/v1/user", userRouter);
app.use("/api/v1/product",productRouter)

app.listen(3000)

// "scripts": {
//     "start": "node dist/index.js",
//     "dev": "npm start && nodemon --exec tsc.cmd",
//     "test": "echo \"Error: no test specified\" && exit 1"
//   },