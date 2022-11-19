const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/kap', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

// Menambah 1 data
// const contact1 = new Contact({
//   nama: 'Sandhika Galih',
//   nohp: '08111122233',
//   email: 'sandhika@mail.com',
// })

// Simpan ke collection
// contact1.save().then((result) => console.log(result))