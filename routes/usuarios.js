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
        create,
        update,
        active
    } = data 
    /**if(name === '' || name === null){
        return res.status(400).json({
            error: 'Campo nombre vacio'
        })
    }
    if(nickname === '' || nickname === null){
        return res.status(400).json({
            error: 'Campo alias vacio'
        })
    }
    if(email === '' || email === null){
        return res.status(400).json({
            error: 'Campo correo vacio'
        })
    }
    if(password === '' || password === null){
        return res.status(400).json({
            error: 'Campo clave vacio'
        })
    }*/
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