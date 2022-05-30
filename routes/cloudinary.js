const express = require('express');
const router = express.Router();

const { verifyUser } = require('../controllers/auth');


// controllers
const { bloggerCheck } = require('../middlewares/auth');
const { upload, remove } = require('../controllers/cloudinary');

router.post("/uploadimages", verifyUser, bloggerCheck, upload);
router.post("/removeimages", verifyUser, bloggerCheck, remove);

module.exports = router;