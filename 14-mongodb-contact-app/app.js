const express = require('express')
const expressLayouts = require('express-ejs-layouts')

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

//halaman detail contact
app.get('/contact/:nama', async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama })
  res.render('detail', { layout: 'layouts/main-layout', title: 'Halaman Contact', contact, })
})

app.listen(port, () => {
  console.log(`Mongo Contact App | listening at http://localhost:${port}`)
})