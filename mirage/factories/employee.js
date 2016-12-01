import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  firstName() {
      return faker.name.firstName();
  },

  lastName() {
      return faker.name.lastName();
  },

  companyId() {
      return faker.random.number( 4 ) + 1;
  }
});
