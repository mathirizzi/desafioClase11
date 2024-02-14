import express from 'express';
import ProductManager from '../ProductManager.js';
import productModel from '../daos/models/products.models.js';
const products = new ProductManager("products.json");


const router = express.Router();

//------------------------------------------//

router.get('/realtimeproducts',async (req,res)=>{
    try{
  const productList = await products.getProducts()

    
    res.render('realTimeProducts', {productList});
}   catch (error) {
    res.status(500).send('Error de servidor')
}
})

//------------------------------------------//

router.get('/login', (req,res)=>{
    res.status(200).render('login')
})

router.get('/register', (req,res)=>{
    res.status(200).render('register')
})


//------------------------------------------//

/*
router.get('/', async (req,res)=>{
    try{
      const productList = await products.getProducts()
     
      res.render('home', {productList})
}   catch (error) {
    res.status(500).send('Error de servidor')
}

})
*/
//------------------------------------------//

router.get('/products', async (req,res)=>{
    const {limit = 5, pageQuery = 1} = req.query
    const {
        docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page
    } = await productModel.paginate({}, {limit, page: pageQuery, lean: true})
    res.render('products', {
        products: docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page
    })
})



export default router;