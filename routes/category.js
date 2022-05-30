const express = require("express");
const router = express.Router();

const { verifyUser, verifyIfUserBlogger } = require("../controllers/auth");

const {
  create,
  list,
  read,
  remove,
  removeSoft,
} = require("../controllers/category");

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create Category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Category"
 *     responses:
 *       200: 
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Category"
 *       400:
 *         description: bad request     
 */
router.post("/category", verifyUser, verifyIfUserBlogger, create);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: "All categories active"
 *     tags: [Category]
 *     responses:
 *       200:
 *          description: ok
 */
router.get("/categories", list);
router.get("/category/:slug", read);
router.delete("/category/:slug", verifyUser, remove);

/**
 * @swagger
 * /api/category/{slug}:
 *   patch:
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *     summary: "Remove a category by slug"
 *     responses:
 *       200:
 *          description: ok
 *       400:
 *          description: bad request
 */
router.patch("/category/:slug", verifyUser, removeSoft);

module.exports = router;

// SCHEMAS
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *            type: string
 *            trim: true
 *         slug:
 *            type: string
 *            unique: true
 *            lowercase: true
 *            index: true
 *         status:
 *            type: string
 *            default: "Active"
 *            enum:
 *            - "Active"
 *            - "Inactive"
 *       example:
 *         name: "Tech"
 *         slug: tech
 *         status: Active      
 */