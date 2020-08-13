const express = require('express');
const router = express.Router();

//http://localhost:3001/pruebita/
router.get('/', async (req, res) => {
  res.send('Birds home page');
});

router.post('/add', async (req, res) => {
    const data = req.body
    if (data === null){
        return res.status(400).json({
            error: 'Body vacio'
        })    
    } 
    const{
        name,
        nickname,
        email, 
        password
    } = data 
    if(name === '' || name === null){
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
    }
  });

//http://localhost:3001/pruebita/about
router.get('/about', async (req, res) => {
  res.send('About birds');
});


router.get('/test/test', async (req,res) => {
  res.json({pene: 'pene'})
})

module.exports = router;