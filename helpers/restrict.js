import jwt from "jsonwebtoken"
const TOKEN_KEY = process.env.TOKEN_KEY || "willchangelater";

const restrict = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token, TOKEN_KEY)
    if (user) {
      req.user = user.id
      next()
    }
  } catch (e) {
    console.log(e.message)
    res.status(403).json({error: "UNAUTHORIZED"})
  }
}

export default restrict