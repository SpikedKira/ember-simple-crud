import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {

        cancelCreateRecord() {
            console.log( 'cancel' );
            // created record is deleted by route.deactivate
            window.history.back();
        },

        saveCreateRecord() {
            console.log( 'create!' );
            this.get( 'model' ).save();
        },

        cancelEditRecord() {
            console.log( 'cancel' );
            window.history.back();
        },

        saveEditRecord() {
            console.log( 'save!' );
            console.log( this.get( 'model' ) );
            this.get( 'model' ).save();
        },

        editRecord() {
            const modelName = this.get( 'modelName' );
            //const id = this.get( 'model' ).id;
            this.transitionToRoute( modelName + ".view.edit", this.get( 'model' ) );
        },

        deleteRecord() {
            const name = this.get( 'model' ).get( '_identifier' );

            if ( window.confirm( "Do you really want to delete " + name + "?" ) ) {
                // call delete function
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
                    model: val.type
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
