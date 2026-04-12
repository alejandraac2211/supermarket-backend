// Aqui se importa la libreria swagger-jsdoc, que permite generar documentacion automatica del proyecto a partir de comentarios en las rutas (endpoints)
const swaggerJSDoc = require('swagger-jsdoc'); 
// Configuracion principal de Swagger
const options = {
  definition: {
    // Version del estandar OpenAPI que usaremos
    openapi: '3.0.0',
    // Informacion general de la API
    info: {
      title: 'API Supermercado', // Nombre de la API
      version: '1.0.0', // Version de la API
      description: 'API para la gestion del supermercado' // Descripcion general
    },
    // Servidor donde esta disponible la API
    servers: [
      {
        url: 'http://localhost:3000' // URL base del servidor
      }
    ]
  },
  // Ruta de los archivos donde Swagger buscara los comentarios para documentar endpoints
  apis: ['./routes/*.js'], 
};
// Genera la especificacion Swagger (documentacion en formato JSON)
const swaggerSpec = swaggerJSDoc(options);
// Exporta la configuracion para usarla en otros archivos (como por ejemplo en app.js)
module.exports = swaggerSpec;