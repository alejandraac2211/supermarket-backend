/**
 * @swagger
 * /api/providers:
 *   get:
 *     summary: Obtener todos los proveedores
 *     responses:
 *       200:
 *         description: Lista de proveedores
 *
 *   post:
 *     summary: Crear proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - email
 *               - city
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *           example:
 *             name: Proveedor 1
 *             phone: 123456
 *             email: proveedor@test.com
 *             city: Manizales
 *     responses:
 *       201:
 *         description: Proveedor creado correctamente
 *
 * /api/providers/{id}:
 *   get:
 *     summary: Obtener proveedor por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proveedor
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proveedor encontrado
 *       404:
 *         description: Proveedor no encontrado
 *
 *   put:
 *     summary: Actualizar proveedor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proveedor
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *           example:
 *             name: Proveedor actualizado
 *             phone: 999999
 *             email: nuevo@test.com
 *             city: Bogotá
 *     responses:
 *       200:
 *         description: Proveedor actualizado
 *       404:
 *         description: Proveedor no encontrado
 *
 *   delete:
 *     summary: Eliminar proveedor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proveedor
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proveedor eliminado
 *       404:
 *         description: Proveedor no encontrado
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/providerController');

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;