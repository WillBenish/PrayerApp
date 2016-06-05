'use strict';

describe('prayerList', function() {

  // Load the module that contains the `phoneList` component before each test
  beforeEach(module('prayerList'));

  // Test the controller
  describe('PrayerListController', function() {

    it('should create a `prayer` model with 2 prayers', inject(function($componentController) {
      var ctrl = $componentController('prayerList');

      expect(ctrl.phones.length).toBe(2);
    }));

  });

});