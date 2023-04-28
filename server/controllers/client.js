import ProductStats from '../models/ProductStats.js';
import Products from '../models/Product.js'

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
