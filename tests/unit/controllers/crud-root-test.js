import { moduleFor, test } from 'ember-qunit';
import sinon from 'sinon';
import Ember from 'ember';
import DS from 'ember-data';

moduleFor( 'controller:crud-root', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
});

test( 'saveCreateRecord action saves the model', function( assert ) {
    const spy = sinon.spy();

    const controller = this.subject({
        model: {
            save: spy
        }
    });

    controller.send( 'saveCreateRecord' );

    assert.ok(
        spy.calledOnce,
        'save was called on the model'
    );
});

test( 'cancelEditRecord action navigates back', function( assert ) {
    const spy = sinon.stub( window.history, 'back', function() {} );

    const controller = this.subject();

    controller.send( 'cancelEditRecord' );

    assert.ok(
        spy.calledOnce,
        'controller attempted to navigate the browser back'
    );

    spy.restore();
});

test( 'cancelCreateRecord action navigates back', function( assert ) {
    const spy = sinon.stub( window.history, 'back', function() {} );

    const controller = this.subject();

    controller.send( 'cancelCreateRecord' );

    assert.ok(
        spy.calledOnce,
        'controller attempted to navigate the browser back'
    );

    spy.restore();
});

test( 'saveEditRecord action saves the model', function( assert ) {
    const spy = sinon.spy();

    const controller = this.subject({
        model: {
            save: spy
        }
    });

    controller.send( 'saveEditRecord' );

    assert.ok(
        spy.calledOnce,
        'save was called on the model'
    );
});

test( 'editRecord action changes the route', function( assert ) {
    this.registry.register( 'model:fake-fake',
        DS.Model.extend({
            foo: DS.attr( 'string' )
        })
    );

    const controller = this.subject();

    const model = Ember.run( () => controller.get( 'store' ).createRecord( 'fake-fake' ) );

    controller.set( 'model', model );

    const spy = sinon.stub( controller, 'transitionToRoute', function() {} );

    controller.send( 'editRecord' );

    assert.ok(
        spy.calledWith( 'fake-fake.view.edit' ),
        'the route changed'
    );

    spy.restore();
});

test( 'modelName is correctly calculated from the model', function( assert ) {
    this.registry.register( 'model:fake-fake',
        DS.Model.extend({
            foo: DS.attr( 'string' )
        })
    );

    const controller = this.subject();

    const model = Ember.run( () => controller.get( 'store' ).createRecord( 'fake-fake' ) );

    controller.set( 'model', model );

    assert.strictEqual(
        controller.get( 'modelName' ),
        'fake-fake',
        'modelName is computed correctly'
    );
});

test( 'attributes is correctly calculated from the model', function( assert ) {
    this.registry.register( 'model:fake-two',
        DS.Model.extend({
            waka: DS.attr( 'string' )
        })
    );

    this.registry.register( 'model:fake-one',
        DS.Model.extend({
            foo: DS.attr( 'string' ),
            bar: DS.belongsTo( 'fake-two' )
        })
    );

    const controller = this.subject();

    const model = Ember.run( () => controller.get( 'store' ).createRecord( 'fake-one' ) );

    controller.set( 'model', model );

    assert.deepEqual(
        controller.get( 'attributes' ),
        [ 'foo' ],
        'attributes were correctly calculated'
    );
});

test( 'relationships is correctly calculated from the model', function( assert ) {
    this.registry.register( 'model:fake-two',
        DS.Model.extend({
            waka: DS.attr( 'string' )
        })
    );

    this.registry.register( 'model:fake-one',
        DS.Model.extend({
            foo: DS.attr( 'string' ),
            bar: DS.belongsTo( 'fake-two' )
        })
    );

    const controller = this.subject();

    const model = Ember.run( () => controller.get( 'store' ).createRecord( 'fake-one' ) );

    controller.set( 'model', model );

    assert.deepEqual(
        controller.get( 'relationships' ),
        [{
            name: "bar",
            model: "fake-two"
        }],
        'attributes were correctly calculated'
    );
});
