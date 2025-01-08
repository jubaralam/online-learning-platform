const allowedRoles = ["admin", "instructor"];

const authorizeInstructorOrAdmin = (req, res, next) => {
  const { role } = req.user;
  if (allowedRoles.includes(role)) {
    return next();
  }

  res.status(401).send({ message: "Access denied. Insufficient permissions." });
};

module.exports = authorizeInstructorOrAdmin;
