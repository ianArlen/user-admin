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

router.get('/user/signup', async (req, res) => {
    res.render('./user/siginup');
});

router.post('/user/signup', async (req, res) => {
    const data = req.body
    if (data === null){
        return res.status(400).json({
            error: 'Body vacio'
        })    
    } 
    const{
        name,
        email,
        password,
    } = data 
    if(name === '' || name === null || name === undefined){
        return res.status(400).json({
            error: 'Campo nombre vacio'
        })
    }
    if(email === '' || email === null || email === undefined){
        return res.status(400).json({
            error: 'Campo correo vacio'
        })
    }
    if(password === '' || password === null || password === undefined){
        return res.status(400).json({
            error: 'Campo clave vacio'
        })
    }
    try {
        const newUser = new user({
            name: name,
            email: email,
            password: password,
        })
        const userResponse = await newUser.save();
        console.log({id : userResponse.id});
    }catch(error) {
        console.log(error);
    }
    //const newuser = new user((name,email,password,create,update,active))
    //await newuser.save()
    console.log(name,email)
    res.send('ok')
  });




//http://localhost:3000/pruebita/about
router.get('/about', async (req, res) => {
  res.send('About birds');
});


router.get('/test/test', async (req,res) => {
  res.json({pene: 'pene'})
})

module.exports = router;