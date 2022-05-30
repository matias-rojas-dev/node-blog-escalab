const slugify = require("slugify");
const Category = require("../models/category");
const Post = require("../models/post");

const checkAuthor = (post = {}, user = {}) => {
  if (!post.author.equals(user._id)) return false;
  else return true;
};

// create post
exports.create = async (req, res) => {

  const {role} = req.user;
  console.log(role)

  try {
    if(role === "blogger"){
      const { title } = req.body;

      const post = await Post.create({
        ...req.body,
        slug: slugify(title),
      });

      post.author = req.user._id;

      post.save();

      res.json({
        success: true,
        post,
      });

  }else{
    res.status(400).json({
      success: false,
      msg: "You dont have permission to do this. You must be a blogger"
    })
  }

  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// read a post by slug
exports.read = async (req, res) => {
  const { slug } = req.params;

  try {
    const post = await Post.findOne({
      slug,
    });

    if (post.length === 0) {
      res.status(404).json({
        success: false,
        msg: "No post has been found",
      });
    }

    res.json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error to find post",
    });
  }
};

// read all the posts
exports.list = async (req, res) => {
  try {
    const posts = await Post.find({
      status: "Active",
    })
      .populate("category", "name")
      .populate("author", "name");

    if (posts.length === 0) {
      res.status(200).json({
        success: true,
        msg: "No posts have been found",
      });

      return;
    }

    res.json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// remove post by id of the author
exports.remove = async (req, res) => {
  try {
    const { slug } = req.params;
    const { _id } = req.user;

    const post = await Post.findOne({
      slug,
    });

    if (checkAuthor(post, _id)) {
      post.remove();

      res.json({
        success: true,
        msg: "Post deleted successfully",
      });
    } else {
      res.status(403).json({
        success: false,
        msg: "You are not the author of this post",
      });
    }

    if (!post) {
      res.status(404).json({
        success: false,
        msg: "Post not found",
      });
    }
  } catch ({ message }) {
    res.status(400).json({
      success: false,
      message,
    });
  }
};

// sofe delete post
exports.removeSoft = async (req, res) => {
  try {
    const { slug } = req.params;
    const { _id } = req.user;

    let post = await Post.findOne({
      slug,
    });

    if (checkAuthor(post, _id)) {
      post = await Post.findOneAndUpdate(
        { slug: req.params.slug },
        { status: "Inactive" },
        { new: true }
      );

      res.json({
        success: true,
        post,
      });
    } else {
      res.status(403).json({
        success: false,
        msg: "You are not the author of this post",
      });
    }
  } catch ({message}) {
    res.status(400).json({
      success: false,
      message,
    });
  }
};


// read the posts by category
exports.readPostByCategory = async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await Category.findOne({
      slug,
    });

    const posts = await Post.find({
      category: category._id,
      status: "Active",
    });

    res.json({
      success: true,
      posts,
    });
  } catch ({ message }) {
    res.status(404).json({
      success: false,
      msg: "Ha ocurrido un error al encontrar",
      message,
    });
  }
};

// update post
exports.update = async (req, res) => {
  try {
    if (req.body.title) req.body.slug = slugify(req.body.title);

    const updated = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();

    res.json({
      success: true,
      updated,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

// read post by id of the author
exports.readById = async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.user._id,
    });

    res.json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Loging to see your posts",
    });
  }
};
