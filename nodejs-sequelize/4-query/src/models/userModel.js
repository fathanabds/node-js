import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/db.js';

// const User = sequelize.define(
//   'User',
//   {
//     // Model attributes are defined here
//     userId: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     namaUser: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     // Other model options go here
//     tableName: 'users',
//   }
// );

class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    namaUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
    tableName: 'users',
  }
);

sequelize.sync();

export default User;
