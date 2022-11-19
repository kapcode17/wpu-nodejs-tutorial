const { MongoClient } = require('mongodb')

const uri = 'mongodb://127.0.0.1:27017'
const dbName = 'kap'

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

client.connect((error, client) => {
  if(error) {
    return console.log('Koneksi gagal!')
  }

  
  //pilih database
  const db = client.db(dbName)

  //Menambahkan 1 data
  // db.collection('mahasiswa').insertOne(
  //   {
  //     nama: 'shadowmice2',
  //     email: 'shadowmice@mail.com',
  //   },
  //   (error, result) => {
  //     if (error) {
  //       return console.log('gagal menambahkan data!')
  //     }

  //     console.log(result)
  //   }
  // )

  //Menambahkan banyak data
  // db.collection('mahasiswa').insertMany(
  //   [
  //     {
  //       nama: 'kaplearn',
  //       email: 'kaplearn@mail.com',
  //     },
  //     {
  //       nama: 'kapdesign',
  //       email: 'kapdesign@mail.com'
  //     }
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.log('data gagal ditambahkan!')
  //     }


  //     console.log(result)
  //   }
  // )

  // Menampilkan semua data yang ada di collection 'mahasiswa'
  // console.log(
  //   db.collection('mahasiswa').find().toArray((error, result) => console.log(result))
  // )

  // Menampilkan data berdasarkan kriteria yang ada di collection 'mahasiswa'
  // console.log(
  //   db.collection('mahasiswa').find({ _id: ObjectId("636643958124c22ad5f06e07") }).toArray((error, result) => console.log(result))
  // )

  // Mengubah data berdasarkan id
  // const updatePromise = db.collection('mahasiswa').updateOne(
  //   {
  //     _id: ObjectId("636643958124c22ad5f06e07"),
  //   },
  //   {
  //     $set: {
  //       nama: 'Shadowmice'
  //     },
  //   },
  // )

  // updatePromise.then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

  // Mengubah data lebih dari 1, berdasarkan kriteria
  // db.collection('mahasiswa').updateMany(
  //   {
  //     nama: 'kaplearn',
  //   },
  //   {
  //     $set: {
  //       nama: 'KapLearn'
  //     }
  //   }
  // )

  // Menghapus 1 data
  // db.collection('mahasiswa').deleteOne({
  //   _id: ObjectId("636643958124c22ad5f06e07"),
  // })
  // .then((result) => {
  //   console.log(result)
  // })
  // .catch((error) => {
  //   console.log(error)
  // })

  // Menghapus lebih dari 1 data
  db.collection('mahasiswa').deleteMany({
    nama: 'kapdesign'
  })
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
  })
})
