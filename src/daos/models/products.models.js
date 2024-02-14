import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    stock: Number,
    code: {
        type: String,
        unique: true,
        required: true,
        index: true
    }
})

productsSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productsCollection, productsSchema)

export default productModel;
