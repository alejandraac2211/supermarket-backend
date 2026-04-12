// Aqui se cargan las variables de entorno desde el archivo .env creado
require('dotenv').config();
// Aqui se importa la clase Sequelize desde la libreria sequelize
const { Sequelize } = require('sequelize');
// Se crea una nueva instancia de conexion a la base de datos
const sequelize = new Sequelize(
  // Nombre de la base de datos (definido en el archivo .env en este caso 'supermarket')
  process.env.DB_NAME,
  // Usuario de la base de datos (definido en el archivo .env en este caso 'postgres')
  process.env.DB_USER,
  // Contraseña de la base de datos (definida en el archivo .env en este caso 'postgres')
  process.env.DB_PASSWORD,
  {
    // Direccion del servidor donde esta la base de datos
    host: process.env.DB_HOST,
    // Tipo de base de datos que se esta usando
    dialect: 'postgres'
  }
);
// Aqui se exporta la conexion para poder usarla en otros archivos del proyecto
module.exports = sequelize;