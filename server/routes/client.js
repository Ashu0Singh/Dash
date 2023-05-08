import express from 'express'
import { getProducts , getCustomer } from "../controllers/client.js"

const router = express.Router();
router.get('/products',getProducts);
router.get('/customer',getCustomer);

export default router;