import sequelize from '../utils/db.js';
import Mahasiswa from './mahasiswaModel.js';
import Matakuliah from './matakuliahModel.js';

const mahasiswa = sequelize.define('Mahasiswa', Mahasiswa, {
  tableName: 'mahasiswa',
});

const matakuliah = sequelize.define('Matakuliah', Matakuliah, {
  tableName: 'matakuliah',
});

mahasiswa.belongsToMany(matakuliah, { through: 'mhsmk', onDelete: 'restrict', onUpdate: 'restrict' });
matakuliah.belongsToMany(mahasiswa, { through: 'mhsmk', onDelete: 'restrict', onUpdate: 'restrict' });

sequelize.sync();

export default sequelize;
