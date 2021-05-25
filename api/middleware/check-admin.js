const checkAdmin = async (req, res, next) => {
  req.headers.auth === "5678" ? next() : res.end();
};
module.exports = checkAdmin;
