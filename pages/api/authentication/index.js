const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET;

export default (req, res) => {
  if (req.method === "GET") {
    console.log("@@@@@  ENTERING AUTHENTICATION");
    console.log("CHECKING FOR TOKEN IN COOKIE");
    if (!("token" in req.cookies)) {
      // res
      //   .status(401)
      //   .json({ message: "Unable to authenticate, no token in cookie" });
      res.json({ message: "Unable to authenticate, no token in cookie" });
      console.log("NO TOKEN IN COOKIE");
      return;
    }
    let decoded;
    const token = req.cookies.token;
    if (token) {
      console.log("TOKEN FOUND IN COOKIE");
      console.log("VERIFY TOKEN SECRET");
      try {
        decoded = jwt.verify(token, jwtSecret);
      } catch (e) {
        console.error(e);
      }
    }
    if (decoded) {
      console.log("TOKEN DECODED, RETURNING TOKEN DECODED");
      res.json(decoded);
      return;
    } else {
      res.status(401).json({ message: "Unable to authenticate" });
    }
  }
};
