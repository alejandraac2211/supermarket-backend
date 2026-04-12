const { User, Sale } = require('../models');

// Obtener todos los usuarios con sus ventas
exports.getAll = async (req, res) => {
  try {
    const data = await User.findAll({
      include: {
        model: Sale,
        attributes: ['id', 'total', 'date'] // solo datos relevantes
      }
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
exports.getOne = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: Sale
    });

    // Validar existencia
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo usuario
exports.create = async (req, res) => {
  try {
    const data = await User.create(req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario existente
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar usuario
    const user = await User.findByPk(id);

    // Validar existencia
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar datos
    await user.update(req.body);

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar existencia
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Eliminar usuario
    await user.destroy();

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};