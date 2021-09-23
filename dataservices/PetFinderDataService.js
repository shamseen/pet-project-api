// structure from https://www.codementor.io/@evanbechtol/node-service-oriented-architecture-12vjt9zs9i

// API stuff n things
require("dotenv").config();
const SECRET = process.env.PETFINDER_SECRET;
const API_KEY = process.env.PETFINDER_API_KEY;

// SDK that automatically handles API auth & refresh tokens
// docs: https://github.com/petfinder-com/petfinder-js-sdk/tree/master/docs
var petfinder = require("@petfinder/petfinder-js");

class PetFinderDataService {
  constructor() {
    // instantiating SDK to access PetFinder
    this.client = new petfinder.Client({ apiKey: API_KEY, secret: SECRET });
  }

  async searchPFTest() {
    try {
      // fetch
      const response = await this.client.animal.search({
        type: "Dog",
        special_needs: true,
        page: 1,
        limit: 5,
      });

      // grabbing relevant info
      const results = response.data.animals.map((animal, i) => {
        return {
          name: animal.name,
          id: animal.id,
          url: animal.url,
        };
      });

      // passing info back to controller
      return results;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = PetFinderDataService;
