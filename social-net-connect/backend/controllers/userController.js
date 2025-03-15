const User = require("../models/User");

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.sendFriendRequest = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const friend = await User.findById(req.params.friendId);

        if (!friend) return res.status(404).json({ message: "User not found" });

        if (user.friends.includes(friend._id)) {
            return res.status(400).json({ message: "Already friends" });
        }

        user.friends.push(friend._id);
        friend.friends.push(user._id);

        await user.save();
        await friend.save();

        res.json({ message: "Friend request sent" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

