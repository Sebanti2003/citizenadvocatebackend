export const sessionProtected = (req, res, next) => {
  try {
    // Check if session user exists
    if (!req.session.user) {
      return res.status(403).json({
        message: "Session is missing! Please log in again.",
        success: false,
      });
    }

    console.log(req.session.user);

    req.user = req.session.user;

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Session verification failed",
      success: false,
      error: error.message,
    });
  }
};
export const sessionProtected2 = (req, res, next) => {
  try {
    // Check if session user exists
    if (!req.session.ministry) {
      return res.status(403).json({
        message: "Session is missing! Please log in again.",
        success: false,
      });
    } else {
      req.ministry = req.session.ministry;
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Session verification failed",
      success: false,
      error: error.message,
    });
  }
};
