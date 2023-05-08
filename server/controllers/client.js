import ProductStats from '../models/ProductStats.js';
import Products from '../models/Product.js'
import User from '../models/User.js';

export const getProducts = async (req,res) => {
  try{
    const products = await Products.find();
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stats = await ProductStats.find({
          productId: product._id
        })
        return {
          ...product._doc,
          stats
        }
      })
    );

    res.status(200).json(productsWithStats);
  }catch(error){
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
}

export const getCustomer = async (req,res) => {
  try{
    const customers = await User.find({ role : "user"}).select("-password");
    res.status(200).json(customers);
  }catch(error){
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
}