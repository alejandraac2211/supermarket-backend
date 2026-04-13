const { Provider, Product } = require('../models');

// Obtener todos los proveedores con sus productos
exports.getAll = async (req, res) => {
  try {
    const data = await Provider.findAll({
      include: {
        model: Product,
        attributes: ['id', 'name', 'price', 'stock']
      }
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un proveedor por ID
exports.getOne = async (req, res) => {
  try {
    const data = await Provider.findByPk(req.params.id, {
      include: Product
    });

    // Validar existencia
    if (!data) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un proveedor
exports.create = async (req, res) => {
  try {
    const data = await Provider.create(req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un proveedor
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar proveedor
    const provider = await Provider.findByPk(id);

    if (!provider) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    // Actualizar
    await provider.update(req.body);

    res.json(provider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un proveedor
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await Provider.findByPk(id);

    if (!provider) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    await provider.destroy();

    res.json({ message: 'Proveedor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
