import Ember from 'ember';

/**
 * @module
 * @augments ember/Controller
 */
export default Ember.Controller.extend({

    // -------------------------------------------------------------------------
    // Actions

    actions: {

        /**
         * Cancel the creation of a new record
         *
         * @function actions:cancelCreateRecord
         * @returns {undefined}
         */
        cancelCreateRecord() {
            // created record is deleted by route.deactivate
            window.history.back();
        },

        /**
         * Save the newly created record
         *
         * @function actions:saveCreateRecord
         * @returns {undefined}
         */
        saveCreateRecord() {
            this.get( 'model' ).save().then( () => {
                window.history.back();
            });
        },

        /**
         * Cancel editing of record
         *
         * @function actions:cancelEditRecord
         * @returns {undefined}
         */
        cancelEditRecord() {
            window.history.back();
        },

        /**
         * Save the editted record
         *
         * @function actions:saveEditRecord
         * @returns {undefined}
         */
        saveEditRecord() {
            this.get( 'model' ).save().then( () => {
                window.history.back();
            });
        },

        /**
         * Transition to route for editting the current record
         *
         * @function actions:editRecord
         * @returns {undefined}
         */
        editRecord() {
            const modelName = this.get( 'modelName' );
            this.transitionToRoute( modelName + ".view.edit", this.get( 'model' ) );
        },

        /**
         * Delete the current record
         *
         * @function actions:deleteRecord
         * @returns {undefined}
         */
        deleteRecord() {
            const model = this.get( 'model' );
            const modelName = this.get( 'modelName' );
            const name = model.get( '_identifier' );

            if ( window.confirm( "Do you really want to delete " + name + "?" ) ) {
                model.destroyRecord().then( () => {
                    this.transitionToRoute( modelName + '.index' );
                });
            }
        },

        /**
         * Transition to a route for a new record
         *
         * @function actions:newRecord
         * @returns {undefined}
         */
        newRecord() {
            const modelName = this.get( 'modelName' );
            this.transitionToRoute( modelName + '.new' );
        }
    },

    // -------------------------------------------------------------------------
    // Methods

    /**
     * The name of the model for the model instance
     *
     * @function
     * @returns {String}
     */
    modelName: Ember.computed(
        function() {
            const model = this.get( 'model' );

            if ( !model ) {
                return;
            }

            if ( model.type !== undefined ) {
                return model.type.modelName;
            }

            return model.constructor.modelName;
        }
    ),

    /**
     * An array of objects that represent model relationships
     *
     * @function
     * @returns {Object[]}
     */
    relationships: Ember.computed(
        'modelName',
        function() {
            const relationships = [];
            const model = this.get( 'store' ).modelFor( this.get( 'modelName' ) );

            Ember.get( model, 'relationshipsByName' ).forEach( ( val, key ) => {
                relationships.push({
                    name: key,
                    model: val.type,
                    kind: val.kind
                });
            });

            return relationships;
        }
    ),

    /**
     * An array of attribute names
     *
     * @function
     * @returns {Object[]}
     */
    attributes: Ember.computed(
        'modelName',
        function() {
            const attributes = [];
            const model = this.get( 'store' ).modelFor( this.get( 'modelName' ) );

            Ember.get( model, 'attributes' ).forEach( ( val, key ) => {
                attributes.push( key );
            });

            return attributes;
        }
    )

});
