import mongoose from "mongoose"
const Schema = mongoose.Schema

const PreferenceSchema = new Schema(
  {
    animal: {type: String, required: false},
    behavior: { type: String, required: false },
    specialNeeds: { type: Boolean, required: false },
    daysInShelter: { type: Number, required: false },
    furType: { type: String, required: false },
    size: { type: String, required: false },
    medications: {type: Boolean, required: false},
    sex: { type: String, required: false },
    activityLevel: { type: String, required: false },
    breed: { type: String, required: false },
    age: { type: String, required: false },
    zipCode: {type: String, required: false},
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
  },
  {timestamps: true}
)

export default mongoose.model("Preference", PreferenceSchema)