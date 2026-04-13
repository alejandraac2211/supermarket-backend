module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre es obligatorio'
        }
      }
    },
    description: {
      type: DataTypes.STRING
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
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'El stock debe ser un numero entero'
        },
        min: {
          args: [0],
          msg: 'El stock no puede ser negativo'
        }
      }
    }
  });

  Product.associate = models => {
    Product.belongsTo(models.Provider, { foreignKey: 'providerId' });
    Product.hasMany(models.Detail, { foreignKey: 'productId' }); 
  };

  return Product;
};
