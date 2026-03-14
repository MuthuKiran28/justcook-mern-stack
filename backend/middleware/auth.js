import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

<<<<<<< HEAD
=======
      if (!req.user) {
        return res.status(401).json({ message: "Not authorized" });
      }

>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21
      return next();
    } catch (error) {
      console.error("Token verfication failed: ", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  return res.status(401).json({ message: "Not authorized, token failed" });
};
