var fetch = require('node-fetch');
var mockServer = require('./mockServer');

/**
 * Car manager
 * This allows to add, fetch, sort, get and delete cars from a store
 */

var createCarFactory = function () {

  // This variable will contain the list of cars you add/sort/delete
  var store = [];

  return {

    /**
    * Add cars to the `store`
    * Takes an array of cars as parameters
    * Each car object must have 3 properties:
    * - name: Car's name
    * - brand: Car's brand
    * - colour: Car's colour
    * If one of those properties is missing in one of the car within the array, the car shouldn't be added.
    * @param {array} carsArray
    *
    * The function returns the following:
    * @returns {number} Total number of cars stored
    */
    add: function (carsArray) {
      // @TODO
      carsArray.forEach(function(el) {
        if (el.name && el.brand && el.colour) {
          store.push(el);
        }
      });
      // console.log('-------------------------');
      return store.length; 
  },

    /**
     * Fetch more cars from the server and add them to the `store` 
     * End-point URL is available using the following variable: mockServer.url
     */
    fetchAndAdd: function (callback) {
      // @TODO
      var add = this.add;
      return fetch(mockServer.url)
      .then(response => response.json())
      .then(function(responseJSON) {
       var numberOfCars = add(responseJSON);
       callback(numberOfCars);
      });


    },

    /**
    * Get a car in `store` matching the name. Returns the first car found.
    * @param name Name of the car
    * @returns {object} Found car or `undefined` if there is no car found.
    */
    getByName: function (name) {
      return store.find(function (item) {
        return item.name === name;
      });
    },

    /**
    * Get all cars from the store
    * @returns {array}
    */
    getAll: function () {
      // @TODO
      return store;
    },

    /**
    * Sort the cars in `store` by brand in alphabetical order
    */
    sortByBrand: function () {
      // @TODO
      store.sort(function(a,b){
    var nameA=a.brand.toLowerCase(), nameB=b.brand.toLowerCase()
      if (nameA < nameB) {//sort string ascending
        return -1
      };
      if (nameA > nameB) {
        return 1
      };
      if (nameA === nameB) {
        return 0 
      };
      });    
    },

    /**
    * Delete all cars in `store` that has the `colour` prop matching with a car's colour
    * @TODO: This method is not properly working, you must fix it.
    * @param {string} colour
    * @returns {boolean} true if at least one car if found and deleted, false if no car 
    has been found with the matching colour
    */
    deleteByColour: function (colour) {
      var hasBeenDeleted = false;
      store = store.filter(function(item) {
        if (item.colour === colour) {
          hasBeenDeleted = true;
          return false;
        }
        return true;
      });
      console.log(store);
      return hasBeenDeleted;
    },
  };
};


module.exports = createCarFactory;
