import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize('belajar-sequelize', 'postgres', 'postgres', {
  host: '127.0.0.1',
  dialect: 'postgres',
  dialectOptions: {
    requestTimeout: 3000,
    encrypt: true,
    useUTC: false, // u/ membaca dari database
    dateStrings: true,
    typeCast(field, next) {
      if (field.type === 'DATETIME') {
        return new Date(field.string());
      }
      return next();
    },
    timezone: 'Asia/Jakarta',
  },
});

export default sequelize;
