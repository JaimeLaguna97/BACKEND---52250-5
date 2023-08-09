import Product from '../../dao/models/productModel.js';

class ProductManager {
    async getAllProducts() {
        return await Product.find();
    }

    async getProductById(productId) {
        return await Product.findById(productId);
    }

    async addProduct(newProduct) {
        return await Product.create(newProduct);
    }

    async updateProduct(productId, updatedProduct) {
        return await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
    }

    async deleteProduct(productId) {
        return await Product.findByIdAndDelete(productId);
    }
}

export default ProductManager;