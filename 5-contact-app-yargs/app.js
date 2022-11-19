// const { tulisPertanyaan, simpanContact } = require('./contacts')

// const main = async () => {
//   const nama = await tulisPertanyaan('masukkan nama anda : ')
//   const email = await tulisPertanyaan('masukkan email anda : ')
//   const noHP = await tulisPertanyaan('masukkan no HP anda : ')

//   simpanContact(nama,email,noHP)
// }

// main()


const yargs = require('yargs')
const contacts = require('./contacts')

yargs.command({
  command: 'add',
  describe: 'Menambahkan contact baru',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'Email',
      demandOption: false,
      type: 'string'
    },
    noHP: {
      describe: 'Nomor Handphone',
      demandOption: true,
      type: 'string',
    },  
  },
  handler(argv) {
    contacts.simpanContact(argv.nama, argv.email, argv.noHP)
  }
}).demandCommand()

// menampilkan semua nama & no HP contact
yargs.command({
  command: 'list',
  describe: 'Menampilkan semua nama & no HP contact',
  handler() {
    contacts.listContact()
  },
})

// menampilkan detail sebuah contact
yargs.command({
  command: 'detail',
  describe: 'Menampilkan detail sebuah contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama)
  },
})

// menghapus sebuah contact
yargs.command({
  command: 'delete',
  describe: 'Menghapus sebuah contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama)
  },
})

yargs.parse()