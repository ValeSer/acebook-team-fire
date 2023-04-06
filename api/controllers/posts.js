const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");


const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      console.log(token);
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    //console.log(req.body);
    //console.log(req.user_id);
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
};

module.exports = PostsController;
