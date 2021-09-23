const express = require("express");
const router = express.Router();
const PetfinderParams = require("../models/PetfinderParams");
const PetFinderDataService = require("../dataServices/PetFinderDataService");
const PF_DataService = new PetFinderDataService();

/* --- Routes --- */

// Test GET
router.get("/test/", async (req, res) => {
  try {
    const found = await PF_DataService.testSearch();
    res.status(200).json(found); // looks ugly
    console.log(found); // formatted like json proper
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: err.message,
    });
  }
});

// GET using search filters (in req header)
router.get("/", async (req, res) => {
  // dirty BUT no giant query string
  const params = new PetfinderParams(req.headers.params);
  console.log(params);

  try {
    // calling petfinder api
    const found = await PF_DataService.search(params);
    res.status(200).json(found);

    // error control
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      msg: err.message,
    });
  }
});

module.exports = router;

// {"animal": "dog", "behavior": "something", "special_needs": false, "days_in_shelter": 15, "fur_type": "long", "size": "XL", "medications": false, "sex": "F", "activity": "rigorous", "breed": "sheperd", "age": "young", "zipcode": 12345}
