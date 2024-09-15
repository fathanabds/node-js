import db from '../utils/db.js';
import user from './userModel2.js';

db.define('User', user, {
  tableName: 'users',
  indexes: [
    {
      fields: ['email'],
      unique: true,
    },
    {
      fields: ['namaUser'],
    },
  ],
});

db.sync();

export default db;
