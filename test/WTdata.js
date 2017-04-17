import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
import fakeIndexedDB from 'fake-indexeddb';
import FDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange';
jsdom();

import WTData from '../src/js/modules/WTData';

suite('data Testing', () => {

  setup(done => {
    global.indexedDB = fakeIndexedDB;
    global.IDBKeyRange = FDBKeyRange;
    done();
  });

  teardown(done => {
    const request = global.indexedDB.deleteDatabase('WeightTracker');
    request.onsuccess = () => {
      done();
    };

  });

  test('Returns object', done => {
    const data = new WTData();
    expect(data).to.be.an('object');
    done();
  });

  test('Add weight', done => {
    const data = new WTData();
    data.openDB(() => {
      data.inputWeight(123, (weight) => {
        data.datastore.close();
        expect(weight.value).to.eql(123);
        done();
      });
    });
  });

  test('Fetch weights', done => {
    global.indexedDB = fakeIndexedDB;
    const data = new WTData();
    data.openDB(() => {
      data.fetchWeights( weights => {
        data.datastore.close();
        expect(weights.length).to.eql(0);
        done();
      });
    });
  });

  test('Insert and fetch weights', done => {
    global.indexedDB = fakeIndexedDB;
    const data = new WTData();
    data.openDB(() => {
      data.inputWeight(123, () => {
        data.fetchWeights( weights => {
          data.datastore.close();
          expect(weights.length).to.eql(1);
          done();
        });
      });
    });
  });



});