const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //   let token;
  //   if (
  //     req.headers.authorization &&
  //     req.headers.authorization.startsWith("Bearer")
  //   ) {
  //     try {
  //       token = req.headers.authorization.split(" ")[1];
  //       const user = jwt.verify(token, process.env.SECRET_KEY);
  //       req.body.userId = user;
  //       console.log(req.body.user);
  //       next();
  //     } catch (error) {
  //       console.log(error);
  //       res.status(500).send(error);
  //     }
  //   }
  //   if (!token) {
  //     res.status(401).json({ msg: "Not authorised" });
  //   }
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log("Executed line 6");
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
