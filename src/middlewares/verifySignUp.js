import { ROLES } from "../models/Rol";
import User from "../models/User";

export const checkDuplicateUsernameOrEmailOrDni = async (req, res, next) => {
  // console.log(req.body);

  // Validate username
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).json({ message: "The user already exists" });

  // Validate email
  const email = await User.findOne({ email: req.body.email });
  if (email)
    return res.status(400).json({ message: "The email already exists" });

  // Validate DNI
  const DNI = await User.findOne({
    DNI: req.body.DNI,
  });
  if (DNI) return res.status(400).json({ message: "The DNI already exists" });

  next();
};

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]}, does no exist`,
        });
      }
    }
  }

  next();
};
