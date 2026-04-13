/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Obtener todas las ventas
 *     responses:
 *       200:
 *         description: Lista de ventas
 *
 *   post:
 *     summary: Crear una venta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *           example:
 *             userId: 1
 *             products:
 *               - productId: 6
 *                 quantity: 2
 *     responses:
 *       201:
 *         description: Venta creada correctamente
 *       500:
 *         description: Error en la creación de la venta (stock, producto o usuario)
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/saleController');

router.get('/', controller.getAll);
router.post('/', controller.create);

module.exports = router;