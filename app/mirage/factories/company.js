import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name() {
      return faker.company.companyName();
  },

  products() {
      const numbers = [];
      let n = 5;
      while( n-- ) {
        numbers.push( faker.random.number( 19 ) + 1 );
      }
      return [ ...new Set(numbers) ];
  }
});