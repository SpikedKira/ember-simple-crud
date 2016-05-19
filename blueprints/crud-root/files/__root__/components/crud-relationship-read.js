import Ember from 'ember';
import layout from '../templates/components/crud-relationship-read';

export default Ember.Component.extend({
    tagName: 'span',

    layout,

    kind: null,

    modelName: null,

    selectedRelationship: null,

    componentExists: Ember.computed(
        'modelName',
        function() {
            const modelName = this.get( 'modelName' );
            return Ember.getOwner( this ).hasRegistration( 'component:' + modelName + '-read' );
        }
    ),

    isMultiple: Ember.computed(
        'kind',
        function() {
            return this.get( 'kind' ) === "hasMany";
        }
    )
});
