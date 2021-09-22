import User from "../models/Users.js"
import Preference from "../models/Preferences.js"

export const createPreference = async (req, res) => {
  try {
    const preference = new Preference(req.body)
    preference.userId = req.body.userId

    const user = await User.findById(req.body.userId)
    preference.userId = user._id
  
    await preference.save()
    
    await user.save()
    res.status(201).json(preference)
  } catch (e) {
    res.status(500).json({error: e.message})
  }
}

export const getPreferences = async (req, res) => {
  try {
    const preferences = await Preference.find().populate('userId')
    res.json(preferences)
  } catch (e) {
    res.status(404).json({error: e.message})
  }
}

export const getPreference = async (req, res) => {
  try {
    const { id } = req.params
    const preference = await Preference.findById(id).populate('userId')
    if (preference) {
      res.json(preference)
    } else {
      res.status(404).json({error: "Preference not found"})
    }
  } catch (e) {
    res.status(404).json({error: e.message})
  }
}