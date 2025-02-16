export const userroleCheck = (req, res, next) => {
  if (req.user.role === "ministry") {
    return res.status(403).json({
      message: "You are not authorized to access this resource",
      success: false,
    });
  }
  next();
};
export const ministryroleCheck = (req, res, next) => {
  if (req.ministry.role === "user") {
    return res.status(403).json({
      message: "You are not authorized to access this resource",
      success: false,
    });
  }
  next();
};

