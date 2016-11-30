import Ember from 'ember';
import DS from 'ember-data';

/**
 * @module
 * @augments ember-data/Model
 */
export default DS.Model.extend({

    /**
     * A meaningful identifier for the model
     *
     * @type {String}
     */
    _identifier: Ember.computed.alias( 'name' )
});
