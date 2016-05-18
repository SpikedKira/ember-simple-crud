/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-simple-crud',

  contentFor: function( type, config ) {
    var eps = this.addons.filter( function( addon ) {
      return addon.name === 'ember-power-select';
    });
    return eps[0].contentFor( type, config );
  }
};
