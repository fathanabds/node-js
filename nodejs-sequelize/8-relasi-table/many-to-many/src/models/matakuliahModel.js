import { DataTypes } from 'sequelize';

const Matakuliah = {
  // Model attributes are defined here
  idMatakuliah: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  namaMatakuliah: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export default Matakuliah;
