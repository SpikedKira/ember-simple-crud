import Ember from 'ember';

/**
 * @module
 * @augments ember/Route
 */
export default Ember.Route.extend({

    model: function( params ) {
        const routeName = this.get( 'routeName' );
        const viewName = routeName.split('.').slice(1).join('.');
        const modelName = routeName.split('.').shift();

        if ( viewName === "view" ) {
            return this.store.findRecord( modelName, params[ modelName + "_id" ] );
        }

        if ( viewName === "index" ) {
            return this.store.findAll( modelName );
        }

        if ( viewName === "new" ) {
            return this.store.createRecord( modelName );
        }
    },

    deactivate: function() {
        const routeName = this.get( 'routeName' );
        const viewName = routeName.split('.').slice(1).join('.');

        if ( viewName === "new" ) {
            this.get( 'controller' ).get( 'model' ).deleteRecord();
        }
    }
});
