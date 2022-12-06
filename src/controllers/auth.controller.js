import User from "../models/User";
import Role from "../models/Rol";
import jwt from "jsonwebtoken";
import config from "../config";

// Register a new user
export const signUp = async (req, res) => {
  // Get the data from the request
  const { username, name, email, password, DNI, phone, address, roles } =
    req.body;

  if (!username || !name || !email || !password || !DNI || !phone || !address) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    // Create a new user
    const newUser = new User({
      username,
      name,
      email,
      password: await User.encryptPassword(password),
      DNI,
      phone,
      address,
    });

    // Verify roles
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
      // If no roles are found, assign the "user" role
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    // Save the user in the database
    const savedUser = await newUser.save();

    // Create a token
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    // Send the token
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

// Sign in
export const signIn = async (req, res) => {
  // Get the data from the request
  const { username, password } = req.body;

  try {
    // Verify if the user exists
    const userFound = await User.findOne({ username: username }).populate(
      "roles"
    );
    if (!userFound) return res.status(400).json({ message: "User not found" });

    // Verify if the password is correct
    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );
    if (!matchPassword) {
      return res.status(401).json({ token: null, message: "Invalid password" });
    }

    // Create a token
    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    // Send the token
    res.json({ token, userFound });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
