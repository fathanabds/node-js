import { DataTypes } from 'sequelize';

const Kota = {
  idKota: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  namaKota: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export default Kota;
