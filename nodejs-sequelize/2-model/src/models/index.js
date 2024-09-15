import db from '../utils/db.js';
import User from './userModel2.js';

db.define('User', User, {
  tableName: 'users',
});

db.sync();

export default db;
