import DS from 'ember-data';
import CRUDRoot from './crud-root';

export default CRUDRoot.extend({
    name: DS.attr( 'string' ),

    price: DS.attr( 'number' )
});
