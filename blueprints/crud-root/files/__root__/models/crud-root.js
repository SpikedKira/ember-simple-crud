import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
    _identifier: Ember.computed.alias( 'name' )
});
