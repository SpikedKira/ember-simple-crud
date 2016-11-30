import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('company', function() {
    this.route('view', {
      path: ':company_id'
    }, function() {
      this.route('edit');
    });
    this.route('new');
  });
  this.route('employee', function() {
    this.route('view', {
      path: ':employee_id'
    }, function() {
      this.route('edit');
    });
    this.route('new');
  });
  this.route('product', function() {
    this.route('view', {
      path: ':product_id'
    }, function() {
      this.route('edit');
    });
    this.route('new');
  });
});

export default Router;
