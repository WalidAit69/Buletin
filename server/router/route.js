import { Router } from "express";
import * as userController from "../controllers/userController.js";
import multer from "multer";
import fs from "fs";
import PostModel from "../models/post.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import storyModel from "../models/story.js";
import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";


const uploadMiddleware = multer({ dest: "/tmp" });

const useruploadMiddleware = multer({ dest: "/tmp" });

const router = Router();

dotenv.config();

async function uploadToS3(newpath, originalFilename, mimetype) {
  mongoose.connect(
    "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
  );

  const client = new S3Client({
    region: "eu-west-3",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const ext = originalFilename.split(".")[1];
  const newFilename = Date.now() + "." + ext;

  try {
    const data = await client.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKETNAME,
        Body: fs.readFileSync(newpath),
        Key: newFilename,
        ContentType: mimetype,
        ACL: "public-read",
      })
    );

    return `https://${process.env.BUCKETNAME}.s3.amazonaws.com/${newFilename}`;
  } catch (error) {
    res.status(401).json("Error adding photo");
  }
}

// register api
router.route("/register").post(userController.register);

//login api
router.route("/login").post(userController.login);

// get single profile api
router.route("/profile").get(userController.profile);
router.route("/profile/:id").get(userController.profilebyid);

// logout api
router.route("/logout").post(userController.logout);

// get all users api
router.route("/users").get(userController.users);

// update user api
router.put(
  "/user/:id",
  useruploadMiddleware.fields([
    { name: "file", maxCount: 1 },
    { name: "file2", maxCount: 1 },
  ]),
  async (req, res) => {
    mongoose.connect(
      "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
    );

    let newprofilePath = null;
    let newcoverPath = null;

    if (req.files["file"]) {
      const { mimetype, originalname, path } = req.files["file"][0];
      const newpath = path.replace(/\\/g, "/");
      newprofilePath = await uploadToS3(newpath, originalname, mimetype);
    }

    if (req.files["file2"]) {
      const { mimetype, originalname, path } = req.files["file2"][0];
      const newpath = path.replace(/\\/g, "/");
      newcoverPath = await uploadToS3(newpath, originalname, mimetype);
    }

    const {
      fullname,
      email,
      password,
      profile,
      cover,
      website,
      bio,
      job,
      altemail,
      oldpassword,
      profiledeleted,
      coverdeleted,
    } = req.body;

    const { id } = req.params;

    const userDoc = await UserModel.findById(id);

    if (!userDoc) {
      res.status(400).json("authorization failed");
    }

    const emailmatch = await UserModel.findOne({ email });
    if (emailmatch) return res.status(400).json("Email already in use");

    if (oldpassword) {
      const isMatch = await bcrypt.compare(oldpassword, userDoc.password);
      if (!isMatch) return res.status(400).json("password incorrect");
    }

    let hashedpass = "";

    if (password) hashedpass = await bcrypt.hash(password, 10);

    await userDoc.updateOne({
      fullname: fullname ? fullname : userDoc.fullname,
      email: email ? email : userDoc.email,
      password: password ? hashedpass : userDoc.password,
      profile: newprofilePath
        ? newprofilePath
        : profiledeleted === "deleted"
        ? ""
        : userDoc.profile,
      cover: newcoverPath
        ? newcoverPath
        : coverdeleted === "deleted"
        ? ""
        : userDoc.cover,
      website: website ? website : userDoc.website,
      bio: bio ? bio : userDoc.bio,
      job: job ? job : userDoc.job,
      altemail: altemail ? altemail : userDoc.altemail,
    });

    const token = jwt.sign(
      {
        UserId: userDoc._id,
        fullname: fullname ? fullname : userDoc.fullname,
        email: email ? email : userDoc.email,
        password: password ? hashedpass : userDoc.password,
        profile: newprofilePath
          ? newprofilePath
          : profiledeleted === "deleted"
          ? ""
          : userDoc.profile,
        cover: newcoverPath
          ? newcoverPath
          : coverdeleted === "deleted"
          ? ""
          : userDoc.cover,
        website: website ? website : userDoc.website,
        bio: bio ? bio : userDoc.bio,
        job: job ? job : userDoc.job,
        altemail: altemail ? altemail : userDoc.altemail,
      },
      process.env.JWT_SECRET
    );
    userDoc.token = token;
    res.status(200).cookie("token", token).json(userDoc);
  }
);

//add posts
router.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  mongoose.connect(
    "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
  );

  const { mimetype, originalname, path } = req.file;
  const newpath = path.replace(/\\/g, "/");
  const url = await uploadToS3(newpath, originalname, mimetype);

  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, topic, read, content } = req.body;
    const postDoc = await PostModel.create({
      title,
      summary,
      topic,
      read,
      content,
      cover: url,
      author: info.UserId,
    });
    res.json(postDoc);
  });
});

//get all posts
router.get("/Allposts", async (req, res) => {
  mongoose.connect(
    "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
  );

  const excludedVariable = "-content";

  res.json(
    await PostModel.find()
      .populate("author", ["fullname", "profile"])
      .select(excludedVariable)
  );
});

//get all posts sorted
router.get("/posts", async (req, res) => {
  mongoose.connect(
    "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
  );

  const excludedVariable = "-content";

  res.json(
    await PostModel.find()
      .populate("author", ["fullname", "profile"])
      .sort({ createdAt: -1 })
      .select(excludedVariable)
  );
});

//get all posts from a specific user
router.get("/userposts/:id", async (req, res) => {
  mongoose.connect(
    "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
  );

  const { id } = req.params;

  const posts = await PostModel.find({ author: id }).populate("author", [
    "fullname",
    "profile",
  ]);

  res.json(posts);
});

//get a single post
router.get("/post/:id", async (req, res) => {
  mongoose.connect(
    "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
  );

  const { id } = req.params;
  const postDoc = await PostModel.findById(id).populate("author", [
    "fullname",
    "profile",
  ]);
  res.json(postDoc);
});

//get a post by specific topics
router.get("/posts/category", async (req, res) => {
  mongoose.connect(
    "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
  );

  const Business = await PostModel.find({ topic: "Business" }).populate(
    "author",
    ["fullname", "profile"]
  );
  const Sport = await PostModel.find({ topic: "Sport" }).populate("author", [
    "fullname",
    "profile",
  ]);

  return res.json({ Business, Sport });
});

//delete a post
router.delete("/post/:id", async (req, res) => {
  mongoose.connect(
    "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
  );

  const { id } = req.params;
  await PostModel.findByIdAndDelete(id);

  res.status(200).json("ok");
});

//update post
router.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  mongoose.connect(
    "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
  );

  let newPath = null;
  if (req.file) {
    const { mimetype, originalname, path } = req.file;
    const newpath = path.replace(/\\/g, "/");
    newPath = await uploadToS3(newpath, originalname, mimetype);
  }

  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) throw err;

    const { id, title, summary, topic, read, content } = req.body;
    const postDoc = await PostModel.findById(id);
    const isAuthor =
      JSON.stringify(postDoc.author) === JSON.stringify(info.UserId);

    if (!isAuthor) {
      res.status(400).json("authorization failed");
    }

    await postDoc.updateOne({
      title,
      summary,
      topic,
      read,
      content,
      cover: newPath ? newPath : postDoc.cover,
      author: info.UserId,
    });

    res.json(postDoc);
  });
});

// create story
router.post("/story", uploadMiddleware.single("file"), async (req, res) => {
  mongoose.connect(
    "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
  );

  const { mimetype, originalname, path } = req.file;
  const newpath = path.replace(/\\/g, "/");
  const newPath = await uploadToS3(newpath, originalname, mimetype);

  const { token } = req.cookies;
  try {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) throw err;

      const storyDoc = await storyModel.create({
        cover: newPath,
        author: info.UserId,
      });

      res.json(storyDoc);
    });
  } catch (error) {
    res.json(error);
  }
});

//get stories

router.get("/story", async (req, res) => {
  mongoose.connect(
    "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
  );

  res.json(
    await storyModel
      .find()
      .populate("author", ["fullname", "profile"])
      .sort({ createdAt: -1 })
  );
});

//delete story
router.delete("/story/:id", async (req, res) => {
  mongoose.connect(
    "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
  );

  const { id } = req.params;

  await storyModel.findByIdAndDelete(id);

  res.json("ok");
});

//add followers
router.post("/users/:userId", async (req, res) => {
  mongoose.connect(
    "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
  );

  const { userId } = req.params;

  const { token } = req.cookies;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) throw err;

    const followerId = info.UserId;

    // Find the user to be followed
    const userToFollow = await UserModel.findById(userId);
    if (!userToFollow) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the follower exists
    const follower = await UserModel.findById(followerId);
    if (!follower) {
      return res.status(404).json({ error: "Follower not found" });
    }

    // Check if the follower is already in the followers list
    if (userToFollow.followers.includes(followerId)) {
      return res.status(400).json({ error: "Follower already exists" });
    }

    // Update the user's followers array
    userToFollow.followers.push(followerId);
    await userToFollow.save();

    return res.status(200).json({
      message: "Follower added successfully",
      data: userToFollow.followers.length,
    });
  });
});

//remove follower
router.delete("/users/:userId", async (req, res) => {
  mongoose.connect(
    "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
  );

  const { userId } = req.params;

  const { token } = req.cookies;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) throw err;

    const followerId = info.UserId;

    // Find the user to be followed
    const userToFollow = await UserModel.findById(userId);
    if (!userToFollow) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the follower exists
    const follower = await UserModel.findById(followerId);
    if (!follower) {
      return res.status(404).json({ error: "Follower not found" });
    }

    // Check if the follower is already in the followers list
    if (userToFollow.followers.includes(followerId)) {
      // Update the user's followers array
      userToFollow.followers.splice(followerId);
      await userToFollow.save();
    } else {
      return res.status(400).json({ error: "Follower not found" });
    }

    return res.status(200).json({
      message: "Follower removed successfully",
    });
  });
});

export default router;
