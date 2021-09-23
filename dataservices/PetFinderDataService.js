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

  /* Extracts relevant info from petfinder data */
  parseResponse(responseArr) {
    const results = responseArr.map((animal, i) => {
      return {
        name: animal.name,
        id: animal.id,
        url: animal.url,
      };
    });

    return results;
  }

  /* Calls petfinder and returns relevant info */
  async search(params) {
    try {
      // fetch
      const response = await this.client.animal.search(params);

      // grabbing relevant info
      const results = this.parseResponse(response.data.animals);

      // passing info back to controller
      return results;

      // error flow control
    } catch (err) {
      return err.message;
    }
  }

  /* Hard coded search for initial testing */
  async testSearch() {
    try {
      // fetch
      const response = await this.client.animal.search({
        type: "Dog",
        special_needs: true,
        page: 1,
        limit: 5,
      });

      // grabbing relevant info
      const results = this.parseResponse(response.data.animals);

      // passing info back to controller
      return results;

      // error flow control
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = PetFinderDataService;
