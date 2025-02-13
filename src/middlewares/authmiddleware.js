import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: "Unauthorized", status_code: 401 });
  }

  try {
    
    const decoded = jwt.verify(token, "process.env.JWT_SECRET");

    
    req.userId = decoded.userId;

    
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ status: "Unauthorized", status_code: 401 });
  }
};

export default authMiddleware;
