const validator = require('validator');

// console.log(validator.isEmail('kap@mail.com'));

const chalk = require('chalk');

const pesan = chalk`aaa bbb {bgRed ccc} {blue ddd} eee {bgGreen fff}`
console.log(pesan);