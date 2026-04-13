const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Provider = require('./provider')(sequelize, Sequelize);
db.Product = require('./product')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.Sale = require('./sale')(sequelize, Sequelize);
db.Detail = require('./detail')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
