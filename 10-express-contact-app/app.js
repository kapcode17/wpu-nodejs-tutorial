const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact } = require('./utils/contacts')

const app = express()
const port = 3000

//gunakan ejs
app.set('view engine', 'ejs')

//third-party middleware
app.use(expressLayouts)

//built-in middleware
app.use(express.static('public'))

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
  res.render('contact', { layout: 'layouts/main-layout', title: 'Halaman Contact', contacts, })
})

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