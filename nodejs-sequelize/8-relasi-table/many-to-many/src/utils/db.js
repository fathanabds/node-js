import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('belajar-sequelize', 'postgres', 'postgres', {
  host: '127.0.0.1',
  dialect: 'postgres',
  dialectOptions: {
    requestTimeout: 3000,
    encrypt: true,
  },
});

export default sequelize;
