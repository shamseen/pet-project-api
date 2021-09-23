/* --- Required modules --- */
// require("dotenv").config(); // inject .env into process.env
import express from "express"; // http server
import cors from "cors"; // expose resources for external websites
// import mongoose from "mongoose"; // talks to mongo db
import db from "./db/index.js";
import morgan from "morgan"; // provides details in terminal
import routes from "./routes/index.js"

/* --- App variables --- */
const app = express();
const PORT = process.env.PORT || 8000;

/* --- Connect to database --- */
// mongoose.connect(process.env.MONGO_URI, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   connectTimeoutMS: 3000, // Extending in case heroku is slow
// });
// // confirm connection
// mongoose.connection.once("connected", () =>
//   console.log(">> mongoose is connected to mongoDB")
// );

/* --- Middleware for CRUD & controller routing --- */
app.use(express.json()); // reads incoming PUT/POST as json

app.use((req, res, next) => {
  console.log(req.body); // logging the request
  next(); // run next middleware func
});

app.use(cors()); // exposes endpoints for apps to request
app.use(morgan("dev")); // provides details in terminal 
// /* --- Routes --- */
// app.use("/user", require("./controllers/usersController"));
// app.use("/search", require("./controllers/searchController"));

app.use("/api", routes)

app.get("/", (req, res) => {
  res.send(`<h1>Pet Project API</h1>`);
});

/* --- Leggggoooooooo --- */
// app.listen(PORT, () =>
//   console.log(
//     `>> API Server: Listening on port ${PORT}. waiting for database...`
//   )
// );

db.on("connected", () => {
  console.log("Connected to MongoDB")
  app.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
})
