const express = require('express');
const app = express();
const db = require('./models');
const productRoutes = require('./routes/productRoutes');
const providerRoutes = require('./routes/providerRoutes');
const userRoutes = require('./routes/userRoutes');
const saleRoutes = require('./routes/saleRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

//Primero middlewares
app.use(express.json());

//Las rutas
app.use('/api/products', productRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ message: 'API Funcionando' });
});

//Conexión y servidor
db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
  });
});