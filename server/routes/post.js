const express = require('express');
const router = express.Router();
const Post = require('../controllers/Post')

router.route("/").get(Post.getAllBlogPosts).post(Post.addBlogPost);
router.route("/:id").get(Post.getSinglePost).patch(Post.updateSingleBlogPost).delete(Post.removeSingleBlogPost);
router.patch("/:id/likeedBlogPost", Post.likeBlogPost);
  

  
module.exports = router;