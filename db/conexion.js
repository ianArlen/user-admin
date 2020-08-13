const mongoose = require('mongoose')

const conexiondb = async (dbhost) => {
    try {
        await mongoose.connect(dbhost,{
            useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
        });
        console.log('Base de datos conectada')
    } catch (error) {
        console.log(error)
        throw error
    }
}
module.exports = conexiondb