const Post = require("../models/Post");

exports.createPost = async (req, res) => {
    try {
        const { text, image } = req.body;
        const post = new Post({ user: req.user.id, text, image });
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "name profilePic").sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

