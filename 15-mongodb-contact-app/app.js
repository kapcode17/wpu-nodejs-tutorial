const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const { body, validationResult, check } = require('express-validator')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

// Koneksi ke db
require('./utils/db')
// Schema model
const Contact = require('./model/contact')

const app = express()
const port = 3000

// Setup EJS
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Konfigurasi flash
app.use(cookieParser('secret'))
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
)

app.use(flash())

// Halaman Home
app.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama: 'kap',
      email: 'kap@gmail.com'
    },
    {
      nama: 'kap2',
      email: 'kap2@gmail.com'
    },
    {
      nama: 'kap3',
      email: 'kap3@gmail.com'
    },
  ]

  res.render('index', { layout: 'layouts/main-layout', nama: 'kap', title: 'Halaman Home', mahasiswa })
})

// Halaman About
app.get('/about', (req, res) => {
  res.render('about', { layout: 'layouts/main-layout', title: 'Halaman About' })
})

// Halaman Contact
app.get('/contact', async (req, res) => {
  // Contact.find().then((contact) => {
  //   res.send(contact)
  // })

  const contacts = await Contact.find()
  res.render('contact', { layout: 'layouts/main-layout', title: 'Halaman Contact', contacts, msg: req.flash('msg') })
})

//halaman tambah contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', { layout: 'layouts/main-layout', title: 'Form Tambah Contact', })
})

// Proses tambah data contact
app.post('/contact',[ 
  body('nama').custom(async (value) => {
    const duplikat = await Contact.findOne({ nama: value })
    if (duplikat) {
      throw new Error('Nama contact sudah digunakan!')
    }

    return true
  }),
  check('email', 'Email tidak valid').isEmail(), 
  check('nohp', 'No HP tidak valid').isMobilePhone('id-ID') 
  ], (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    res.render('add-contact', {
      title: 'Form Tambah Contact',
      layout: 'layouts/main-layout',
      errors: errors.array(),
    })
  } else {
    Contact.insertMany(req.body, (error, result) => {
      req.flash('msg', 'Data contact berhasil ditambahkan!')
      res.redirect('/contact')
    })
  }
})

//hapus contact
app.get('/contact/delete/:nama', async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama })

  if(contact) {
    await Contact.deleteOne({ nama: req.params.nama })

    req.flash('msg', 'Data contact berhasil dihapus!')
    res.redirect('/contact')
  } else {
    res.status(404)
    res.send('404')
  }
})


//halaman ubah data contact
app.get('/contact/edit/:nama', async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama })
  res.render('edit-contact', { layout: 'layouts/main-layout', title: 'Form Ubah Data Contact', contact, })
})

//proses ubah data contact
app.post('/contact/update',[ 
  body('nama').custom(async (value, { req }) => {
    const duplikat = await Contact.findOne({ nama: value })
    if (value !== req.body.oldNama && duplikat) {
      throw new Error('Nama contact sudah digunakan!')
    }

    return true
  }),
  check('email', 'Email tidak valid').isEmail(), 
  check('nohp', 'No HP tidak valid').isMobilePhone('id-ID') 
  ], async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() })
    res.render('edit-contact', {
      title: 'Form Ubah Data Contact',
      layout: 'layouts/main-layout',
      errors: errors.array(),
      contact: req.body,
    })
  } else {
    const oldNama = req.body.oldNama
    delete req.body.oldNama
    await Contact.updateOne({ nama: oldNama },
    {
      $set: req.body
    })

    req.flash('msg', 'Data contact berhasil diubah!')
    res.redirect('/contact')
  }
})

//halaman detail contact
app.get('/contact/:nama', async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama })
  res.render('detail', { layout: 'layouts/main-layout', title: 'Halaman Contact', contact, })
})

app.listen(port, () => {
  console.log(`Mongo Contact App | listening at http://localhost:${port}`)
})