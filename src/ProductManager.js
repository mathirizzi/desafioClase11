import fs from "fs"
import productModel from './daos/models/products.models.js'


class ProductManager {
 
 
  //--------------------Para crear un producto nuevo--------------------//

  async addProduct(newProduct) {
    return await productModel.create(newProduct)
  }

  //--------------------Para ver la lista de productos--------------------//

  async getProducts() {
   return await productModel.paginate({}, {limit: 1, lean: true})
  }

  //--------------------Para ver un producto por su ID--------------------//

  async getProductById(pid) {
   return await productModel.findOne({_id: pid})
  }

  //--------------------Para actualizar producto llamado a traves de su ID--------------------//

  async updateProductID(pid, newProductUpdated) {
    return await productModel.findByIdAndUpdate({_id: pid}, newProductUpdated)
  }

  //--------------------Para eliminar producto seleccionado a traves de su ID--------------------//
  async deleteProduct(pid) {
   return await productModel.findByIdAndDelete({_id: pid})
  }



  
}

export default ProductManager;




