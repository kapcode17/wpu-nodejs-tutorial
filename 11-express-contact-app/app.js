const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact, addContact, cekDuplikat } = require('./utils/contacts')
const { body, validationResult, check } = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express()
const port = 3000

//gunakan ejs
app.set('view engine', 'ejs')

//third-party middleware
app.use(expressLayouts)

//built-in middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

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

app.get('/about', (req, res) => {
  // res.sendFile('./about.html', { root: __dirname })
  res.render('about', { layout: 'layouts/main-layout', title: 'Halaman About' })
})

app.get('/contact', (req, res) => {
  const contacts = loadContact()
  res.render('contact', { layout: 'layouts/main-layout', title: 'Halaman Contact', contacts, msg: req.flash('msg') })
})

//halaman tambah contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', { layout: 'layouts/main-layout', title: 'Form Tambah Contact', })
})

app.post('/contact',[ 
  body('nama').custom((value) => {
    const duplikat = cekDuplikat(value)
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
    // return res.status(400).json({ errors: errors.array() })
    res.render('add-contact', {
      title: 'Form Tambah Contact',
      layout: 'layouts/main-layout',
      errors: errors.array(),
    })
  } else {
    addContact(req.body)

    req.flash('msg', 'Data contact berhasil ditambahkan!')

    res.redirect('/contact')
  }
})

//halaman detail contact
app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama)
  res.render('detail', { layout: 'layouts/main-layout', title: 'Halaman Contact', contact, })
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('404')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})