import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {

        cancelCreateRecord() {
            // created record is deleted by route.deactivate
            window.history.back();
        },

        saveCreateRecord() {
            this.get( 'model' ).save().then( () => {
                window.history.back();
            });
        },

        cancelEditRecord() {
            window.history.back();
        },

        saveEditRecord() {
            this.get( 'model' ).save().then( () => {
                window.history.back();
            });
        },

        editRecord() {
            const modelName = this.get( 'modelName' );
            this.transitionToRoute( modelName + ".view.edit", this.get( 'model' ) );
        },

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

        newRecord() {
            const modelName = this.get( 'modelName' );
            this.transitionToRoute( modelName + '.new' );
        }
    },

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
