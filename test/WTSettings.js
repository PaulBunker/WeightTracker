import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
import fakeIndexedDB from 'fake-indexeddb';
import FDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange';
jsdom();

import WTData from '../src/js/modules/WTData';

suite('Settings Testing', () => {

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
    const settings = new WTData();
    expect(settings).to.be.an('object');
    done();
  });

  test('Add weight', done => {
    const settings = new WTData();
    settings.openDB(() => {
      settings.inputWeight(123, (weight) => {
        settings.datastore.close();
        expect(weight.value).to.eql(123);
        done();
      });
    });
  });

  test('Fetch weights', done => {
    global.indexedDB = fakeIndexedDB;
    const settings = new WTData();
    settings.openDB(() => {
      settings.fetchWeights( weights => {
        settings.datastore.close();
        expect(weights.length).to.eql(0);
        done();
      });
    });
  });

  test('Insert and fetch weights', done => {
    global.indexedDB = fakeIndexedDB;
    const settings = new WTData();
    settings.openDB(() => {
      settings.inputWeight(123, () => {
        settings.fetchWeights( weights => {
          settings.datastore.close();
          expect(weights.length).to.eql(1);
          done();
        });
      });
    });
  });



});