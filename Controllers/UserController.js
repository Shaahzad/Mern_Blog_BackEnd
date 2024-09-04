import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      // return res.status(400).json({ message: "User already exists" });
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("User doesn't exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    console.log(user);

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

export const userProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        verified: user.verified,
        admin: user.admin,
      });
    } else {
      let error = new Error("User doesn't exist");
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);

    if (!user) {
      throw new Error("User not Found");
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password && req.body.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    } else if (req.body.password) {
      user.password = req.body.password;
    }

    const updateProfile = await user.save();

    res.json({
      _id: updateProfile._id,
      name: updateProfile.name,
      email: updateProfile.email,
      avatar: updateProfile.avatar,
      verified: updateProfile.verified,
      admin: updateProfile.admin,
      token: await updateProfile.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfilePicture = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
