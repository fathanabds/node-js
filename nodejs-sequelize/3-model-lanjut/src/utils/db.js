import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize('belajar-sequelize', 'postgres', 'postgres', {
  host: '127.0.0.1',
  dialect: 'postgres',
  dialectOptions: {
    requestTimeout: 3000,
    encrypt: true,
  },
  logging: (...msg) => console.log(msg),
});

export default sequelize;
