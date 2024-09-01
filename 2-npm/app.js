const validator = require('validator');
const chalk = require('chalk');

console.log(validator.isEmail('foo@bar.com'));
console.log(chalk.blue(validator.isMobilePhone('0812104947', 'id-ID')));
