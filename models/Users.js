import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true , trim: true, unique: true },
    passwordDigest: { type: String, required: true, select: false },
    
  },
  {timestamps: true}
)

export default mongoose.model("User", UserSchema)