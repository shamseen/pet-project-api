const express = require("express");
const router = express.Router();
const PetFinderDataService = require("../dataServices/PetFinderDataService");
const PF_DataService = new PetFinderDataService();

/* --- Routes --- */

// Test GET
router.get("/", async (req, res) => {
  try {
    const found = await PF_DataService.searchPF();
    res.status(200).json(found); // looks ugly
    console.log(found); // formatted like json proper
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: err.message,
    });
  }
});

module.exports = router;
