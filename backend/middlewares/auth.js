import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  
  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized Login Again" });
  }
  
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: "Token expired. Please login again." });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: "Invalid token." });
    }
    
    res.status(401).json({ success: false, message: "Authentication failed" });
  }
}

export default authMiddleware;
