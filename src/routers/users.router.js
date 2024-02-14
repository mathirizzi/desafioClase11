import {Router} from 'express';

import UserManager from '../UserManager.js';


const users = new UserManager();


const router = Router();


    router.get('/', async (req,res)=>{
        try{
           const usersList = await users.getUsers()
          res.json({
            status: 'success',
            result: usersList
          })
    }   catch (error) {
        console.log(error)
    }
       
})

 //---------------------------------------------//


router.get('/:uid', async (req,res)=>{
    try {
        const {uid} = req.params;   
        const resultID = await users.getUserID(uid)
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
    const {first_name, last_name, email, password, isActive} = req.body;

    if(!first_name|| !last_name|| !email|| !password|| !isActive) return res.send({status: "error", error: "Incomplete values"})

   const newUser = await users.createUser({
    first_name,
    last_name,
    email,
    password,
    isActive
   })

    res.status(201).send({
        status: 'success',
        payload: newUser
    })
})


 //---------------------------------------------//


router.delete('/:uid', async (req,res)=>{
    const {uid} = req.params;
    const userDeleted = await users.deleteUserID(uid)
    res.send({
        status: 'success',
        result: userDeleted
    })
})


 //---------------------------------------------//

 

router.put('/:uid', async (req,res)=>{
    const {uid} = req.params;
   const {first_name, last_name, email, password, isActive} = req.body;

  
    const newUserUpdated = {
         first_name,
    last_name,
    email,
    password,
    isActive
    }
      const userUpdated = await users.updateUserID(uid, newUserUpdated)
    res.send({
        status: 'success',
        result: userUpdated
    })
})


export default router;