import {Router} from 'express';

import ProductManager from '../ProductManager.js';

import productModel from '../daos/models/products.models.js'

const products = new ProductManager();


const router = Router();


    router.get('/', async (req,res)=>{
        try{
           const productsList = await products.getProducts()
          res.send({
            status: 'success',
            result: productsList
          })
    }   catch (error) {
        res.status(500).send('Error de servidor')
    }
       
})

//---------------------------------------------//

router.get('/:pid', async (req,res)=>{
    try {
        const {pid} = req.params;   
        const resultID = await products.getProductById(pid)
        res.send({
            status: 'success',
            result: resultID
        })
        
    } catch (error) {
        res.status(500).send('Error de servidor')
    }
})

//---------------------------------------------//

router.post('/', async (req,res)=>{
    const {title, description, price, thumbnail,stock, code} = req.body;

    if(!title|| !description|| !price|| !thumbnail|| !stock|| !code) return res.send({status: "error", error: "Incomplete values"})

  
   const newProduct = await products.addProduct({
    title,
    description,
    price,
    thumbnail,
    stock,
    code
   })
    res.status(201).send({
        status: 'success',
        payload: newProduct
    })
})

//---------------------------------------------//

router.delete('/:pid', async (req,res)=>{
    const {pid} = req.params;
    const productDeleted = await products.deleteProduct(pid)
    res.send({
        status: 'success',
        result: productDeleted
    })
})

router.put('/:pid', async (req,res)=>{
    const {pid} = req.params;
    const {title, description, price, thumbnail,stock, code, id} = req.body;
    
    const newProductUpdated = {
        title,
        description,
        price,
        thumbnail,
        stock,
        code,
        id
    }
      const productUpdated = await products.updateProductID(pid, newProductUpdated)
    res.send({
        status: 'success',
        result: productUpdated
    })
})


export default router;