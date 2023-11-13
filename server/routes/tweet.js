const router = require("express").Router();
const Tweet = require("../models/Tweet");
const { protect } = require("../helpers/auth");

router.post("/", async (req, res) => {
  const newTweet = new Tweet(req.body);
  try {
    const savedTweet = await newTweet.save();

    const populatedTweet = await savedTweet
      .populate("user", "_id email name avatar")
      .execPopulate();

    res.status(200).json(populatedTweet);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const post = await Tweet.findById(req.params.id);

    await post.updateOne({ $set: req.body });
    res.status(200).json("the post has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await Tweet.findById(req.params.id);

    await post.deleteOne();
    res.status(200).json("the post has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id/like", protect, async (req, res) => {
  try {
    const post = await Tweet.findById(req.params.id);
    if (!post.likes.includes(req.user._id)) {
      await post.updateOne({ $push: { likes: req.user._id } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.user._id } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id/comment", protect, async (req, res) => {
  try {
    const comment = {
      user: req.user._id,
      comment: req.body.comment,
    };

    const post = await Tweet.findById(req.params.id).populate("comments.user");
    // await post.updateOne({
    //   $push: { comments: comment },
    // });
    await post.comments.push(comment);
    await post.save();

    await Tweet.populate(post, {
      path: "comments.user",
      select: "_id name email avatar",
    });

    // console.log(post);

    res.status(200).json(post.comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/all", async (req, res) => {
  try {
    const tweets = await Tweet.find().populate({
      path: "user",
      select: "_id email name avatar",
    });
    res.send(tweets);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.get("/timeline", protect, async (req, res) => {
  // res.send(req.user);

  try {
    const userPosts = await Tweet.find({ user: req.user._id }).populate({
      path: "user",
      select: "_id email name avatar",
    });
    const friendPosts = await Promise.all(
      req.user.followings.map((friendId) => {
        return Tweet.find({ user: friendId }).populate({
          path: "user",
          select: "_id email name avatar",
        });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/userTweets", protect, async (req, res) => {
  try {
    const userPosts = await Tweet.find({ user: req.user._id }).populate({
      path: "user",
      select: "_id email name avatar",
    });

    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/userLiked", protect, async (req, res) => {
  try {
    const userLiked = await Tweet.find({
      likes: req.user._id,
    }).populate({
      path: "user",
      select: "_id email name avatar",
    });

    res.status(200).json(userLiked);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/tweetsByUserId/:userId", async (req, res) => {
  try {
    const userTweets = await Tweet.find({ user: req.params.userId }).populate({
      path: "user",
      select: "_id email avatar name",
    });

    res.status(200).json(userTweets);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Tweet.findById(req.params.id)
      .populate("comments.user", "_id name email avatar")
      .populate("user", "_id email name avatar");
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
