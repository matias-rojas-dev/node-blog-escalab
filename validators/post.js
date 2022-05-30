const { check, param } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateCreatePost = [
  check("title")
    .exists()
    .isString()
    .not()
    .isEmpty()
    .withMessage("Title is required"),

  check("description")
    .exists()
    .isString()
    .not()
    .isEmpty()
    .withMessage("Description is required"),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateUpdatePost = [

  param("slug").isLowercase().withMessage("Slug should be pas in lowercase"),

  check("title")
  .exists()
  .isString()
  .not()
  .isEmpty()
  .withMessage("Title is required"),

  check("description")
  .exists()
  .isString()
  .not()
  .isEmpty()
  .withMessage("Description is required"),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreatePost, validateUpdatePost };