module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre es obligatorio'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'El email ya está registrado'
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
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['admin', 'user']],
          msg: 'El rol debe ser admin o user'
        }
      }
    }
  });

  User.associate = models => {
    User.hasMany(models.Sale, { 
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };

  return User;
};
