const express = require('express');
const router = express.Router();
//const user = require('../models/usuario');
const user = require('../models/usuario');
const { create } = require('express-handlebars');
const { update } = require('../models/usuario');

//http://localhost:3001/pruebita/
router.get('/', async (req, res) => {
  res.send('Birds home page');
});

router.get('/user/signin', async (req, res) => {
    res.render('./user/siginin');
});


const selectId = async (res, id) => {
    if (id === null){
        return res.status(400).json({
            error: 'Id vacio'
        })    
    }
    let jsonuser = null

    try {
        const query = {
            _id : {
                $eq:id
            } 
        }
        jsonuser = await user.findOne(query)
        
        if (jsonuser === null || jsonuser === undefined){
            return null 
        } 
        return jsonuser
        
    } catch (error) {

    }
}

const denyClientId = async (res) => {
    return res.status(400).json({
        error: 'Campo id no encontrado'
    })
}

const acceptClientId = (res, id) => {
    return res.status(200).json({
        id: id,
        success: true
    })
}

router.get('/user/:id', async (req, res) => {
    const id = req.params.id
    let jsonuser = await selectId(res, id)
    return jsonuser ? acceptClientId(res, jsonuser.toJSON()._id.toString()) : denyClientId(res);
});

const errorType = (res, namestring) => {
    errorstring = 'Campo '.concat(namestring,' vacio')
    return res.status(400).json({
        error: errorstring
    })
}

const validatePublicFields = (res, name, email, password) => {
    if(name === '' || name === null || name === undefined){
        return errorType(res, Object.keys({name})[0])
    }
    if(email === '' || email === null || email === undefined){
        return errorType(res, Object.keys({email})[0])
    }
    if(password === '' || password === null || password === undefined){
        return errorType(res, Object.keys({password})[0])
    }
    return null
}


const validateActiveField = (res, active) => {
    if(active === '' || active === null || active === undefined){
        return errorType(res, Object.keys({active})[0])
    }
    if(typeof active !== 'boolean'){
        return res.status(400).json({
            error: 'Campo active debe ser boolean'
        })
    }
    return null 
}



router.post('/user', async (req, res) => {
    const data = req.body
    let id = null 
    if (Object.keys(data).length === 0){
        return res.status(400).json({
            error: 'Body vacio'
        })    
    }
    const{
        name,
        email,
        password,
    } = data 
    const errordata = validatePublicFields(res, name, email, password)
    if (!errordata){
        try {
            const newUser = new user({
                name: name,
                email: email,
                password: password,
            })
            const userResponse = await newUser.save();
            id = userResponse.id
        }catch(error) {
            console.log(error);
        }
        return acceptClientId(res, id)
    }
  });

  router.put('/user/:id', async (req, res) => {
    const id = req.params.id
    const data = req.body
    if (Object.keys(data).length === 0){
        return res.status(400).json({
            error: 'Body vacio'
        })    
    }
    const{
        name,
        email,
        password,
        active
    } = data
    let errordata = validatePublicFields(res, name, email, password)
    let erroractive = validateActiveField(res, active)
    let jsonuser = await selectId(res, id)
    if(!errordata && !erroractive){
        if(jsonuser){
            jsonuser = await user.findOneAndUpdate({_id :jsonuser.toJSON()._id ,name:name,email:email,active:active})
            return  acceptClientId(res, jsonuser.toJSON()._id.id) 
        }else{
            return denyClientId(res)
        }
    }
  });
  
  router.delete('/user/:id', async (req, res) => {
    const id = req.params.id
    let jsonuser = await selectId(res, id)
    if (jsonuser){
        let jsonid = jsonuser.toJSON()._id
        await user.findOneAndRemove({ _id : jsonid})
        return acceptClientId(res, id)
    }else{
        return denyClientId(res)
    }
  });

//http://localhost:3000/pruebita/about
router.get('/about', async (req, res) => {
  res.send('About birds');
});


router.get('/test/test', async (req,res) => {
  res.json({pene: 'pene'})
})

module.exports = router;