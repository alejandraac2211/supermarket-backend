module.exports = (sequelize, DataTypes) => {
  const Detail = sequelize.define('Detail', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'La cantidad debe ser un numero entero'
        },
        min: {
          args: [1],
          msg: 'La cantidad debe ser mayor a 0'
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'El precio debe ser numerico'
        },
        min: {
          args: [0],
          msg: 'El precio no puede ser negativo'
        }
      }
    }
  });

  Detail.associate = models => {
    Detail.belongsTo(models.Sale, { foreignKey: 'saleId' });
    Detail.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  return Detail;
};