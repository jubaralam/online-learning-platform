const adminMiddleware = (req, res, next) => {
  const { role } = req.user;
  if (role == "admin") {
    return next();
  }
  res.status(404).send({ message: "you are not authorized" });
};

module.exports = adminMiddleware