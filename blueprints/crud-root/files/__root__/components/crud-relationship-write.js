import Ember from 'ember';
import layout from '../templates/components/crud-relationship-write';

/**
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

    store: Ember.inject.service( 'store' ),

    // -------------------------------------------------------------------------
    // Attributes

    /** @type {Object} */
    layout,

    // -------------------------------------------------------------------------
    // Actions

    /** @type {Object} */
    actions: {

        /**
         * Proxy the change action
         *
         * @function actions:change
         * @param {Object[]} selected - The selected model(s)
         * @returns {undefined}
         */
        change( selected ) {
            this.sendAction( 'onchange', selected );
        }
    },


    // -------------------------------------------------------------------------
    // Properties

    /**
     * The kind of relationship
     *
     * @type {?String}
     */
    kind: null,

    /**
     * The input's label text
     *
     * @type {?String}
     */
    label: null,

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
            return Ember.getOwner( this ).hasRegistration( 'component:' + modelName + '-write' );
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
            return this.get( 'kind' ) === 'hasMany';
        }
    ),

    /**
     * An array of models to choose from
     *
     * @function
     * @returns {Object[]}
     */
    models: Ember.computed(
        'modelName',
        function() {
            const store = this.get( 'store' );
            return store.findAll( this.get( 'modelName' ) );
        }
    )
});
