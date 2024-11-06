export const checkRole = (requiredRole) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }
  if (req.user.role !== requiredRole) {
    return res.status(403).json({ message: "Insufficient permissions." });
  }
  next();
};
