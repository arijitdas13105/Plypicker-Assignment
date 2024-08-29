const Product=require('../models/Product')
 
exports.createProduct= async(req,res)=>{
    try {
        const {name,description,image,price}=req.body
        const product=await Product.create({name,description,image,price})
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


exports.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, description, image, price } = req.body;
        const product = await Product.findByIdAndUpdate(productId, { name, description, image, price }, { new: true });
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        await Product.findByIdAndDelete(productId);
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};