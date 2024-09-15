import { DataTypes } from 'sequelize';

const Penjual = {
  idPenjual: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  namaPenjual: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alamatPenjual: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export default Penjual;
