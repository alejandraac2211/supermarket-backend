module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre es obligatorio'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El telefono es obligatorio'
        },
        is: {
          args: /^[0-9]+$/,
          msg: 'El telefono solo debe contener numeros'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'El email ya esta registrado'
      },
      validate: {
        isEmail: {
          msg: 'Debe ser un email valido'
        }
      },
      set(value) {
        this.setDataValue('email', value.toLowerCase());
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La ciudad es obligatoria'
        }
      }
    }
  });
  Provider.associate = models => {
    Provider.hasMany(models.Product, { 
      foreignKey: 'providerId',
      onDelete: 'CASCADE'
    });
  };

  return Provider;
};
