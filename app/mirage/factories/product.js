import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name() {
    return faker.commerce.productName();
  },

  price() {
    return faker.commerce.price();
  }
});
