const { sequelize, Sale, Detail, Product, User } = require('../models');

// Obtener todas las ventas con sus relaciones
exports.getAll = async (req, res) => {
  try {
    const data = await Sale.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'] // solo datos necesarios del usuario
        },
        {
          model: Detail,
          include: [
            {
              model: Product,
              attributes: ['id', 'name', 'price'] // datos básicos del producto
            }
          ]
        }
      ]
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una venta con múltiples productos
exports.create = async (req, res) => {
  // Se inicia una transacción para asegurar consistencia en la BD
  const t = await sequelize.transaction();

  try {
    const { userId, products } = req.body;

    // Validar que la venta tenga productos
    if (!products || products.length === 0) {
      throw new Error('La venta debe tener productos');
    }

    // Validar que el usuario exista
    const user = await User.findByPk(userId, { transaction: t });
    if (!user) {
      throw new Error('Usuario no existe');
    }

    let total = 0;

    // Crear la venta inicialmente (sin total)
    const sale = await Sale.create({ userId }, { transaction: t });

    // Recorrer cada producto enviado en la solicitud
    for (let item of products) {

      // Validar cantidad válida
      if (!item.quantity || item.quantity <= 0) {
        throw new Error('Cantidad inválida');
      }

      // Buscar el producto en la BD
      const product = await Product.findByPk(item.productId, { transaction: t });

      // Validar existencia del producto
      if (!product) {
        throw new Error('Producto no existe');
      }

      // Validar disponibilidad de stock
      if (product.stock < item.quantity) {
        throw new Error(`Stock insuficiente para ${product.name}`);
      }

      // Calcular subtotal del producto
      const subtotal = product.price * item.quantity;
      total += subtotal;

      // Crear el detalle de la venta (cantidad y precio unitario)
      await Detail.create({
        saleId: sale.id,
        productId: item.productId,
        quantity: item.quantity,
        price: product.price // el precio se toma desde la BD, no del cliente
      }, { transaction: t });

      // Actualizar el stock del producto
      await product.update({
        stock: product.stock - item.quantity
      }, { transaction: t });
    }

    // Actualizar el total final de la venta
    await sale.update({ total }, { transaction: t });

    // Confirmar la transaccion (guardar todos los cambios)
    await t.commit();

    // Respuesta exitosa
    res.status(201).json({
      message: 'Venta creada correctamente',
      saleId: sale.id,
      total
    });

  } catch (error) {
    // En caso de error, revertir todos los cambios
    await t.rollback();

    res.status(500).json({ error: error.message });
  }
};