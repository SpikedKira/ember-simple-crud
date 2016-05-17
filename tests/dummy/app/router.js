import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('test-one', function() {
    this.route('view', {
      path: ':test-one_id'
    }, function() {
      this.route('edit');
    });
    this.route('new');
  });
});

export default Router;
