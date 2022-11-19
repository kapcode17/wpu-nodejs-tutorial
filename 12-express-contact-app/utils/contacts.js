const fs = require('fs');

//membuat folder data jika belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//membuat file contact.json jika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
  const file = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(file);

  return contacts
}

const findContact = (nama) => {
  const contacts = loadContact()
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())
  return contact
}

// save contacts dng cara menimpa
const saveContacts = (contacts) => {
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}

const addContact = (contact) => {
  const contacts = loadContact()
  contacts.push(contact)
  saveContacts(contacts)
}

const cekDuplikat = (nama) => {
  const contacts = loadContact()
  return contacts.find((contact) => contact.nama === nama)
}

const deleteContact = (nama) => {
  const contacts = loadContact()
  const filteredContacts = contacts.filter((contact) => contact.nama !== nama)

  saveContacts(filteredContacts)
}

const updateContacts = (updateData) => {
  const contacts = loadContact()
 
  var contactToUpdateIndex = contacts.findIndex(contact => contact.nama === updateData.oldNama)
  delete updateData.oldNama
  contacts[contactToUpdateIndex] = updateData

  saveContacts(contacts)
}

module.exports = { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts }