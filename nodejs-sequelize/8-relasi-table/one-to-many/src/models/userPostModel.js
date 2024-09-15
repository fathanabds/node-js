import sequelize from '../utils/db.js';
import Post from './postModel.js';
import User from './userModel.js';

const user = sequelize.define('User', User, {
  tableName: 'users',
});

const post = sequelize.define('Post', Post, {
  tableName: 'posts',
});

user.hasMany(post, {
  foreignKey: 'userId',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

post.belongsTo(user, {
  foreignKey: 'userId',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

sequelize.sync();

export default sequelize;
