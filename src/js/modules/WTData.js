const DB_NAME = 'WeightTracker';
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = 'WeightLog';

export default class WTData {

  constructor() {
    this.datastore = null;
  }

  openDB(callback) {

    // TODO: Find a better way to do this
    const me = this;

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function(e) {
      const db = e.target.result;

      e.target.transaction.onerror = me.onerror;

      // Delete the old datastore.
      if (db.objectStoreNames.contains(DB_STORE_NAME)) {
        db.deleteObjectStore(DB_STORE_NAME);
      }

      // Create a new datastore.
      db.createObjectStore(DB_STORE_NAME, {
        keyPath: 'timestamp'
      });

    };

      // Handle successful datastore access.
    request.onsuccess = function(e) {
      // Get a reference to the DB.

      me.datastore = e.target.result;

      // Execute the callback.
      callback();
    };

    // Handle errors when opening the datastore.
    request.onerror = this.onerror;
  }

  inputWeight(value, callback) {
    // Get a reference to the db.
    const db = this.datastore;

    // Initiate a new transaction.
    const transaction = db.transaction([DB_STORE_NAME], 'readwrite');

    // Get the datastore.
    const objStore = transaction.objectStore(DB_STORE_NAME);

    // Create a timestamp for the weight item.
    const timestamp = new Date().getTime();

    // Create an object for the weight item.
    const weight = {
      'value': value,
      'timestamp': timestamp
    };

    // Create the datastore request.
    const request = objStore.put(weight);

    // Handle a successful datastore put.
    request.onsuccess = function() {
      // Execute the callback function.
      callback(weight);
    };

    // Handle errors.
    request.onerror = this.onerror;
  }

  deleteWeight(id, callback) {
    var db = this.datastore;
    var transaction = db.transaction([DB_STORE_NAME], 'readwrite');
    var objStore = transaction.objectStore(DB_STORE_NAME);

    var request = objStore.delete(id);

    request.onsuccess = function() {
      callback();
    };

    request.onerror = function(e) {
      console.log(e);
    };
  }

  fetchWeights(callback) {
    const db = this.datastore;
    const transaction = db.transaction([DB_STORE_NAME], 'readwrite');
    const objStore = transaction.objectStore(DB_STORE_NAME);

    const keyRange = IDBKeyRange.lowerBound(0);
    const cursorRequest = objStore.openCursor(keyRange);

    const weights = [];

    transaction.oncomplete = function() {
      // Execute the callback function.
      callback(weights);
    };

    cursorRequest.onsuccess = function(e) {
      const result = e.target.result;

      if (!!result == false) {
        return;
      }

      weights.push(result.value);

      result.continue();
    };

    cursorRequest.onerror = this.onerror;
  }

}