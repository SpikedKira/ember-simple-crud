var fs          = require('fs-extra');
var path        = require('path');
var chalk       = require('chalk');
var EmberRouterGenerator = require('ember-router-generator');

module.exports = {
  description: '',

  availableOptions: [
    {
      name: 'path',
      type: String,
      default: ''
    }
  ],

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function( options ) {
    updateRouter.call( this, 'add', options );
  },

  shouldTouchRouter: function() {
    return true;
  }
};

function updateRouter( action, options ) {
  var entity = options.entity;
  var actionColorMap = {
    add: 'green',
    remove: 'red'
  };
  var color = actionColorMap[action] || 'gray';

  if ( this.shouldTouchRouter(entity.name, options) ) {
    writeRoute( action, entity.name, options );

    options.path = ':' + entity.name + '_id';

    writeRoute( action, entity.name + '/view', options );

    delete options.path;

    writeRoute( action, entity.name + '/view/edit', options );
    writeRoute( action, entity.name + '/new', options );

    this.ui.writeLine( 'updating router' );
    this._writeStatusToUI( chalk[color], action + ' route', entity.name );
    this._writeStatusToUI( chalk[color], action + ' route', entity.name + '/view' );
    this._writeStatusToUI( chalk[color], action + ' route', entity.name + '/view/edit' );
    this._writeStatusToUI( chalk[color], action + ' route', entity.name + '/new' );
  }
}

function findRouter( options ) {
  var routerPathParts = [options.project.root];

  if ( options.dummy && options.project.isEmberCLIAddon() ) {
    routerPathParts = routerPathParts.concat( ['tests', 'dummy', 'app', 'router.js'] );
  } else {
    routerPathParts = routerPathParts.concat( ['app', 'router.js'] );
  }

  return routerPathParts;
}

function writeRoute( action, name, options ) {
  var routerPath = path.join.apply( null, findRouter(options) );
  var source = fs.readFileSync( routerPath, 'utf-8' );

  var routes = new EmberRouterGenerator( source );
  var newRoutes = routes[action]( name, options );

  fs.writeFileSync( routerPath, newRoutes.code() );
}
