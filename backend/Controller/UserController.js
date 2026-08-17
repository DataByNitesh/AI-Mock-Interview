import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(401)
        .json({ message: "All fields are required to filled !" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const existed = await User.findOne({ email });

    if (existed) {
      return res.status(401).json({ message: "User already existed" });
    }

    const newUser = await User.create({
      name,
      email,
      password: hashed,
    });

    const token = generateToken(newUser);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: "All fields are rquired" });
    }

    const UserCheck = await User.findOne({ email });

    if (!UserCheck) {
      return res.status(401).json({ message: "User doesn't exist !" });
    }

    const PasswordCheck = await bcrypt.compare(password, UserCheck.password);

    if (!PasswordCheck) {
      return res.status(401).json({ message: "Wrong Password !" });
    }

    const token = await generateToken(UserCheck);

    const Login = {
      Email: UserCheck.email,
      Name: UserCheck.name,
      Token: token,
    };

    return res.status(201).json({ message: "Successfull", Login });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: error.message });
  }
};
