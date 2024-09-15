import db from '../utils/db.js';
import Penjual from './penjualModel.js';
import Kota from './kotaModel.js';

const penjual = db.define('Penjual', Penjual, {
  tableName: 'penjual',
});

const kota = db.define('Kota', Kota, {
  tableName: 'kota',
});

kota.hasOne(penjual, {
  foreignKey: 'idKota',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

penjual.belongsTo(kota, {
  foreignKey: 'idKota',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

db.sync();

export default db;
