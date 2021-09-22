import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true , trim: true, unique: true },
    passwordDigest: { type: String, required: true, select: false },
    behavior: { type: String, required: false },
    disabled: { type: Boolean, required: false },
    daysInShelter: { type: Number, required: false },
    furType: { type: String, required: false },
    size: { type: String, required: false },
    medications: {type: String, required: false},
    sex: { type: String, required: false },
    activityLevel: { type: String, required: false },
    breed: { type: String, required: false },
    age: {type: String, required: false}
  },
  {timestamps: true}
)

export default mongoose.model("User", UserSchema)