const User = require("../models/userEntry");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt_secret = process.env.jwt_secret;

const signUpUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const alreadyExists = await User.findOne({ email: email });
    if (alreadyExists) return res.sendStatus(400);
    const result = await User.create({ email, password });
    const token = jwt.sign({ userId: result._id }, jwt_secret, {
      expiresIn: "1h",
    });
    res.status(200).json({
      token: token,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.sendStatus(404);
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) return res.sendStatus(401);
    const token = jwt.sign({ userId: user._id }, jwt_secret, {
      expiresIn: "1h",
    });
    res.status(200).json({
      token: token,
    });
    console.log("Successful GET:", user.email);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = { signUpUser, loginUser };
