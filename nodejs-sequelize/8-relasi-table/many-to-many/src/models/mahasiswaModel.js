import { DataTypes } from 'sequelize';

const Mahasiwa = {
  // Model attributes are defined here
  idMahasiswa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  namaMahasiswa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export default Mahasiwa;
