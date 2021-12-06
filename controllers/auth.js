import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";

export const register = async (req, res) => {
  try {
    //first make sure that we are receiving data from front-end
    //console.log(req.body);
    //destructure values so its easy to use
    const { name, email, password } = req.body;
    //validation
    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and should be minimum 6 characters long");
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is already taken");

    // hash password
    const hashedPassword = await hashPassword(password);

    // register user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    // view saved user
    console.log("saved user", user);

    //send response
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};
