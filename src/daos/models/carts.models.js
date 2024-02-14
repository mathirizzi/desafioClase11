import mongoose from "mongoose";

const cartsCollection = 'carts'

const cartsSchema = new mongoose.Schema({
   products: {
    type: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: Number
    }]
   }
})

cartsSchema.pre('find', function(){
    this.populate('products.product')
})

cartsSchema.pre('findOne', function(){
    this.populate('products.product')
})

const cartModel = mongoose.model(cartsCollection, cartsSchema)

export default cartModel;
