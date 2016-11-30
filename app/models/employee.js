import Ember from 'ember';
import DS from 'ember-data';
import CRUDRoot from './crud-root';

export default CRUDRoot.extend({
    _identifier: Ember.computed(
        'firstName',
        'lastName',
        function() {
            return this.get( 'firstName' ) + " " + this.get( 'lastName' );
        }
    ),

    firstName: DS.attr( 'string' ),

    lastName: DS.attr( 'string' ),

    company: DS.belongsTo( 'company', {async: true} )
});