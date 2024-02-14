import {Router} from 'express';

import CartManager from '../CartManager.js';

const carts = new CartManager("carts.json");

const router = Router();

router.get('/', async (req,res)=>{
    try{
       const cartsList = await carts.getCarts()
      res.send({
        status: 'success',
        result: cartsList
      })
}   catch (error) {
    res.status(500).send('Error de servidor')
}
   
})

router.get('/:cid', async (req,res)=>{
    try {
        const {cid} = req.params;   
        const resultID = await carts.getCartById(cid)
        res.send({
            status: 'success',
            result: resultID
        })
    } catch (error) {
        res.status(500).send('Error de servidor')
    }
})

router.delete('/:cid', async (req,res)=>{
    const {cid} = req.params;
    const cartDeleted = await carts.deleteCartById(cid)
    res.send({
        status: 'success',
        result: cartDeleted
    })
})

router.post('/', async (req,res)=>{
    try {
        const newCart = await carts.createCart({
            products: []
        })
        res.send({
            status: 'success',
            payload: newCart
        })
        
    } catch (error) {
        res.status(500).send(`Error de server ${error.message}`)
        
    }
})

router.put('/:cid/products/:pid', async (req,res)=>{
    try {
        const {cid,pid} = req.params
        //const {quantity} = req.body
        const result = await carts.addProductToCart(cid, pid)
        res.send({
            status: 'success',
            payload: result
        })
        
    } catch (error) {
        console.log(error)
        
    }
   
})

export default router;