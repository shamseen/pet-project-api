import mongoose from "mongoose"

const MONGODB_URI = process.env.PROD_MONGODB || "mongodb://127.0.0.1:27017/petProjectDatabase"

// toggle off if not debugging
mongoose.set("debug", true)

// mongoose.set("useCreateIndex", true)

mongoose.set("returnOriginal", true)

mongoose
  .connect(MONGODB_URI,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    .catch(e => {
        console.error('Connection error:', e.message)
    })


const db = mongoose.connection

db.on("error", (e) => console.error(`MongoDB connection error: ${e.message}`));
db.on("connected", () => console.log("MongoDB connected!"));
db.on("disconnected", () => console.log("MongoDB disconnected."));

export default db