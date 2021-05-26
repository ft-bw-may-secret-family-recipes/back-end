const checkAdmin = async (req, res, next) => {
  req.headers.authorization === "5678" ? next() : res.end();
};
module.exports = checkAdmin;
