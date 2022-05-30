const express = require('express');
const router = express.Router();

const { authUser, verifyUser, logoutSession, logginSuccessful } = require('../controllers/auth');

const { create, list } = require('../controllers/user');
const { validateCreateUser } = require('../middlewares/auth');


/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [User]
 *     summary: "All the users"
 *     responses:
 *       200:
 *          description: ok
 */
router.get('/users', list);

/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: Create User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       200: 
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *              $ref: "#/components/schemas/User"
 *       400:
 *         description: bad request     
 */
router.post("/user/create", validateCreateUser, create);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User-Login"
 *     responses:
 *       200: 
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *              $ref: "#/components/schemas/User-Login"
 *       400:
 *         description: bad request     
 */
router.post("/user/login", authUser );

router.get("/user/login-successful", logginSuccessful );
router.get("/user/logout", verifyUser, logoutSession);

module.exports = router;

/**
 * @swagger
 *  components:
 *    schemas:
 *     User:
 *      type: object
 *      required:
 *       - name
 *       - email
 *       - password
 *      properties:
 *         name:
 *            type: string
 *            required: true
 *         email:
 *            type: string
 *            unique: true
 *            lowercase: true
 *            index: true
 *         password:
 *            type: string
 *            required: true
 *            trim: true
 *         role:
 *            type: string
 *            required: true
 *            enum: 
 *            - Blooger
 *            - Reader
 *     User-Login:
 *      type: object
 *      required:
 *       - email
 *       - password
 *      properties:
 *         email:
 *            type: string
 *            unique: true
 *            lowercase: true
 *            index: true
 *         password:
 *            type: string
 *            required: true
 *            trim: true
 *
 *
 */
