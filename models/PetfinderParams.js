class PetfinderParams {
  constructor(requestStr) {
    const request = JSON.parse(requestStr);

    this.type = request.animal; // SDK example just takes a string
    this.size = request.size; // small, medium, large, xlarge Accepts multiple vals
    this.breed = request.breed; // e.g. breed=pug,samoyed.
    this.gender = request.sex; // male, female, unknown
    this.age = request.age; // baby, young, adult, senior
    this.coat = request.furType; // short, medium, long, wire, hairless, curly
    this.location = request.zipCode; // city, state; latitude,longitude; or postal code.
    this.special_needs = request.specialNeeds; // boolean
  }
}

module.exports = PetfinderParams;
