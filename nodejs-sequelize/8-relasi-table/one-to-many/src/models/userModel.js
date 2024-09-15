import { DataTypes } from 'sequelize';
import { encrypt } from '../utils/bcrypt.js';

const User = {
  // Model attributes are defined here
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  namaUser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
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
};

export default User;
