const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { protect } = require("../helpers/auth");

router.put("/:id", protect, async (req, res) => {
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Account has been updated");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete("/:id", protect, async (req, res) => {
  if (req.user._id === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  try {
    const user = await User.findById(userId)
      .select("-password")
      .populate("followers", "_id name email avatar")
      .populate("following", "_id name email avatar");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/following/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      friendList.push(friend);
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/followers/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followers.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      friendList.push(friend);
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/all", protect, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Follow/unfollow toggle
router.put("/:id/follow", protect, async (req, res) => {
  if (req.user._id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user._id);
      if (!user.followers.includes(req.user._id)) {
        //follow
        await user.updateOne({ $push: { followers: req.user._id } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        //Unfollow
        await user.updateOne({ $pull: { followers: req.user._id } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

module.exports = router;
