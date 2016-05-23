import Ember from 'ember';
import layout from '../templates/components/crud-relationship-read';

/**
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

    // -------------------------------------------------------------------------
    // Attributes

    /** @type {Object} */
    layout,

    /** @type {String} */
    tagName: 'span',

    // -------------------------------------------------------------------------
    // Properties

    /**
     * The kind of relationship
     *
     * @type {?String}
     */
    kind: null,

    /**
     * Name of the model
     *
     * @type {?String}
     */
    modelName: null,

    /**
     * The currently selected relationship object or array of objects
     *
     * @type {?Object}
     */
    selectedRelationship: null,

    // -------------------------------------------------------------------------
    // Methods

    /**
     * Whether an override component exists
     *
     * @function
     * @returns {Boolean}
     */
    componentExists: Ember.computed(
        'modelName',
        function() {
            const modelName = this.get( 'modelName' );
            return Ember.getOwner( this ).hasRegistration( 'component:' + modelName + '-read' );
        }
    ),

    /**
     * Whether the relationship is hasMany
     *
     * @function
     * @returns {Boolean}
     */
    isMultiple: Ember.computed(
        'kind',
        function() {
            return this.get( 'kind' ) === "hasMany";
        }
    )
});
