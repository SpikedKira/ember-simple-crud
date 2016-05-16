import Ember from 'ember';

export default Ember.Route.extend({

    model: function( params ) {
        const routeName = this.get( 'routeName' );

        console.log( 'route: ', routeName );

        const viewName = routeName.split('.').slice(1).join('.');
        const modelName = routeName.split('.').shift();

        console.log( 'route: ', viewName, modelName );

        if ( viewName === "view" ) {
            return this.store.findRecord( modelName, params[ modelName + "_id" ] );
        }

        if ( viewName === "index" ) {
            return this.store.findAll( modelName );
        }

        if ( viewName === "new" ) {
            return this.store.createRecord( modelName );
        }

        // consider adding modelFor() here for default
        console.log("uh-oh");
    },

    deactivate: function() {
        const routeName = this.get( 'routeName' );
        const viewName = routeName.split('.').slice(1).join('.');

        if ( viewName === "new" ) {
            this.get( 'controller' ).get( 'model' ).deleteRecord();
        }
    }
});
