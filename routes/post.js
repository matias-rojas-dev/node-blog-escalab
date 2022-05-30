const express = require("express");
const router = express.Router();

const { verifyUser } = require("../controllers/auth");

const {
  create,
  list,
  read,
  remove,
  removeSoft,
  readPostByCategory,
  update,
  readById
} = require("../controllers/post");

/**
 * @swagger
 * /api/create:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Post"
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Post"
 *       400:
 *         description: bad request
 */
router.post("/create", verifyUser, create);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     tags: [Post]
 *     summary: "All the posts"
 *     responses:
 *       200:
 *          description: ok
 */
router.get("/posts", list);
router.get("/post/:slug", read);
router.get("/posts-author", readById)

/**
 * @swagger
 * /api/create:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Post"
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Post"
 *       400:
 *         description: bad request
 */
router.delete("/post/:slug", verifyUser, remove);
router.patch("/post/:slug", verifyUser, removeSoft);
router.get("/posts-by-categories/:slug", readPostByCategory);
router.put("/post/:slug", verifyUser, update);

module.exports = router;

// SCHEMAS
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         title:
 *            type: string
 *            trim: true
 *            required: true
 *            text: true
 *         slug:
 *            type: string
 *            unique: true
 *            lowercase: true
 *            index: true
 *         description:
 *            type: string
 *            required: true
 *            lowercase: true
 *            maxLength: 100
 *         body:
 *            type: string
 *            required: true
 *            text: true
 *         category:
 *            type: ObjectId
 *            ref: Category
 *         images:
 *            type: array
 *         status:
 *            type: string
 *            default: "Active"
 *            enum:
 *            - "Active"
 *            - "Inactive"
 *       example:
 *         title: "Tech is awesome"
 *         slug: tech-is-awesome
 *         description: "Tech is awesome description"
 *         body: "Tech is awesome body"
 *         category: 62931066babc3708204c46ca
 *         status: "Active"

 */