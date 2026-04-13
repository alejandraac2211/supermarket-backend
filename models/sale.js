module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isFloat: {
          msg: 'El total debe ser numerico'
        },
        min: {
          args: [0],
          msg: 'El total no puede ser negativo'
        }
      }
    }
  });

  Sale.associate = models => {
    Sale.belongsTo(models.User, { foreignKey: 'userId' });

    Sale.hasMany(models.Detail, { 
      foreignKey: 'saleId',
      onDelete: 'CASCADE'
    });
  };

  return Sale;
};
