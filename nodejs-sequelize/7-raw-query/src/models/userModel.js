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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z]+$/i,
      },
      set(value) {
        this.setDataValue('password', encrypt(value));
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      set(value) {
        this.setDataValue('email', value.toLowerCase());
      },
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
