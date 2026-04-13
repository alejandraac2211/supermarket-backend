const swaggerJSDoc = require('swagger-jsdoc'); 

const options = {
  definition: {
    
    openapi: '3.0.0',
    
    info: {
      title: 'API Supermercado', 
      version: '1.0.0', 
      description: 'API para la gestion del supermercado' 
    },
    
    servers: [
      {
        url: 'http://localhost:3000' 
      }
    ]
  },

  apis: ['./routes/*.js'], 
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
