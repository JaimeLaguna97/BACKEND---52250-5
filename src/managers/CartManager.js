import Cart from "../../dao/models/CartModel.js";

class CartManager {
    async createCart(newCart) {
        try {
            const cart = new Cart(newCart);
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Failed to create cart');
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await Cart.findById(cartId);
            return cart ? cart.products : null;
        } catch (error) {
            throw new Error('Failed to get cart');
        }
    }

    async addProductToCart(cartId, productId, quantity) {
        try {
            const cart = await Cart.findById(cartId);
            
            if (!cart) {
                throw new Error('Cart not found');
            }
            
            const productIndex = cart.products.findIndex(product => product.id === productId);

            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ id: productId, quantity });
            }

            await cart.save();
            return cart.products;
        } catch (error) {
            throw new Error('Failed to update cart');
        }
    }

    deleteProductFromCart(cartId, productId) {
        // Retrieve carts and find the specific cart
        const carts = this.getAllCarts();
        const cartIndex = carts.findIndex((cart) => cart.id === cartId);
    
        if (cartIndex !== -1) {
            const cart = carts[cartIndex];
            const productIndex = cart.products.findIndex((product) => product.id === productId);
    
            if (productIndex !== -1) {
                // Remove the product from the cart
                cart.products.splice(productIndex, 1);
                fs.writeFileSync(this.cartsFile, JSON.stringify(carts, null, 2));
                return cart.products;
            }
        }
        return null;
    }
}

export default CartManager;