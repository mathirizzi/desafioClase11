import mongoose from "mongoose"

const connectBD = async () => {
    try {
        await mongoose.connect('mongodb+srv://mathiasrizzi:RKeOEkVxlSxjZn0E@cursocorder.geg6fej.mongodb.net/ecommerce?retryWrites=true&w=majority')
        console.log('Base de datos conectada')
    } catch (error) {
        console.log(error)
    }
   
}

export default connectBD;

