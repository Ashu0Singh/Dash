import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'

import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import managementRoutes from './routes/management.js'
import salesRoutes from './routes/sales.js'

/* DATA IMPORT */
import User from './models/User.js'
import Product from './models/Product.js'
import ProductStats from './models/ProductStats.js'
import { dataUser, dataProduct , dataProductStat } from './data/index.js'

/*  CONFIGURATION  */

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors({ origin: "*"}));


/* ROUTES */

app.use("/client",clientRoutes)
app.use("/general",generalRoutes)
app.use("/management",managementRoutes)
app.use("/sales",salesRoutes)

/* MONGOOSE SETUP */
app.get("/injectData",(req,res,next) => {
    try{
        // User.insertMany(dataUser);
        // Product.insertMany(dataProduct);
        // ProductStats.insertMany(dataProductStat);
        console.log("Data succesfully inserted");
        res.status(200).json({message:"Succesfully Inserted"})
    }
    // This is to insert the values into the database
    catch(error){
        console.log(error.message);
        res.status(404).json({message: error.message})

    }
})
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(PORT, () => {console.log(`Server started : ${PORT}`)});
}).catch((error) => {console.log(`${error} : Did not connect`)})