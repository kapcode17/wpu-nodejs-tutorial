function cetakNama(nama) {
  return `halo, nama saya ${nama}`
}

const PI = 3.14

const mahasiswa = {
  nama: 'doddy fedriansyah',
  umur: 20,
  cetakMhs() {
    return `halo nama saya ${this.nama} dan saya ${this.umur} thn`
  }
}

class Orang {
  constructor() {
    console.log('Object orang telah dibuat!!!')
  }
}

// module.exports.PI = PI
// module.exports.cetakNama = cetakNama
// module.exports.mahasiswa = mahasiswa
// module.exports.Orang = Orang;

// module.exports = {
//   cetakNama: cetakNama,
//   PI: PI,
//   mahasiswa: mahasiswa,
//   Orang: Orang,
// }

module.exports = { cetakNama, PI, mahasiswa, Orang }