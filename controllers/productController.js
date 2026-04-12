const { Product, Provider } = require('../models');

// Obtener todos los productos con su proveedor
exports.getAll = async (req, res) => {
  try {
    const data = await Product.findAll({
      include: {
        model: Provider,
        attributes: ['id', 'name', 'email'] // solo datos necesarios
      }
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un producto por ID
exports.getOne = async (req, res) => {
  try {
    const data = await Product.findByPk(req.params.id, {
      include: Provider
    });

    // Validar si el producto existe
    if (!data) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo producto
exports.create = async (req, res) => {
  try {
    // Crear producto con los datos enviados
    const data = await Product.create(req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un producto existente
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar producto por ID
    const product = await Product.findByPk(id);

    // Validar existencia
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Actualizar con los datos recibidos
    await product.update(req.body);

    // Retornar producto actualizado
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un producto por ID
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar si el producto existe
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Eliminar producto
    await product.destroy();

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};