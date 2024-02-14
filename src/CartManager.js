import fs from "fs"
import cartModel from "./daos/models/carts.models.js"
import productModel from "./daos/models/products.models.js"

class CartManager {

  //--------------------Para crear un carrito nuevo--------------------//
async createCart(newCart){
   return await cartModel.create(newCart)
}

   //--------------------Para ver la lista de carritos--------------------//

   async getCarts() {
   return await cartModel.find({})
   }

    //--------------------Para ver carrito por su ID--------------------//
async getCartById(cid){
    return await cartModel.findOne({_id: cid})
}

    //--------------------Para eliminar carrito por su ID--------------------//
async deleteCartById(cid){
    return await cartModel.findByIdAndDelete({_id: cid})
}


     //--------------------Para agregar un producto al carrito--------------------//

     async addProductToCart(cid,pid){
        const cartIdx = await cartModel.findById({_id: cid})
        const productIdx = await productModel.findById({_id: pid})
        cartIdx.products.push({product: productIdx.id})
        return await cartModel.findByIdAndUpdate({_id: cid}, cartIdx)


     }

    
    }

export default CartManager;
