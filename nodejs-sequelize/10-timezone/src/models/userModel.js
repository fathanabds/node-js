import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/db.js';
import { encrypt } from '../utils/bcrypt.js';

class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      validate: {
        isUUID: 4,
      },
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
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
