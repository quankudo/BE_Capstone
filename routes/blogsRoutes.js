const express = require('express');
const router = express.Router();
const {getAllBlogs , getBlogComments , addBlogComment , getBlogEmojis , addBlogEmoji} = require('../controllers/blogsController');

router.get('/', getAllBlogs);
router.get('/:id/comments', getBlogComments);
router.post('/addComment', addBlogComment);
router.get('/:id/emojis', getBlogEmojis);
router.post('/addEmoji', addBlogEmoji);
module.exports = router;