import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();

//register
export async function register(req, res) {
  try {
    mongoose.connect(
      "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
    );

    const {
      fullname,
      email,
      password,
      profile,
      website,
      bio,
      job,
      altemail,
      cover,
    } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        fullname,
        email,
        password: hashedPassword,
        profile,
        cover,
        website,
        bio,
        job,
        altemail,
      });
      newUser
        .save()
        .then((result) =>
          res.status(201).send({ msg: "User Register Successfully" })
        )
        .catch((error) => res.status(500).send({ error }));
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

//login
export async function login(req, res) {
  try {
    mongoose.connect(
      "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
    );

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    } else {
      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ msg: "Password incorrect" });
      }
      const token = jwt.sign(
        {
          UserId: user._id,
          email: user.email,
          fullname: user.fullname,
          profile: user.profile,
          cover: user.cover,
          website: user.website,
          bio: user.bio,
          job: user.job,
          altemail: user.altemail,
        },
        process.env.JWT_SECRET
      );
      user.token = token;
      res.status(200).cookie("token", token, { domain: '.buletin-v2.vercel.app' , secure: true , path: '/' , sameSite: 'None'}).json(user._id);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

//get profile by cookies
export function profile(req, res) {
  mongoose.connect(
    "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
  );

  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
}

//get profile by id
export async function profilebyid(req, res) {
  mongoose.connect(
    "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
  );

  const { id } = req.params;
  const user = await UserModel.findById(id);
  res.json(user);
}

//logout
export function logout(req, res) {
  res.cookie("token", "").json("ok");
}

//get all users
export async function users(req, res) {
  mongoose.connect(
    "mongodb+srv://walidait:samyboy2001..@cluster0.ksqig4m.mongodb.net/?retryWrites=true&w=majority"
  );

  const exclud = "-password -email";
  const users = await UserModel.find().select(exclud);

  res.json(users);
}
