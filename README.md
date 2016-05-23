# Ember-simple-crud

This addon is designed to enable rapid prototyping and scaffolding for large applications.  The idea is to interact with models instantly without stopping to build views.
While the views are important to an end-product, when starting a new project it is beneficial to get all the models in place and interacting before an entire team jumps in to work on the user interaction parts of the application.
Ember-Simple-CRUD allows for immediate interaction with models while providing a path toward your final product with controllers, routes, and templates strategically placed for replacement and enhancement.

## Demo

http://spikedkira.github.io/ember-simple-crud

## Installation

* `ember install ember-simple-crud`
* `ember g crud-root`

## Usage

* `ember g crud modelName`

Where `modelName` is the name of your model.  This will also generate routes for you.
You can pass in a path just as you would to the `ember g route` blueprint.

If your model needs special handling when showing it as a relationship, simply create a component called `modelName-read` or `modelName-write` and it will be picked up automatically.

If your model doesn't have a property called `name`, create a new property called `_identifier` and alias it to a meaningful property on your model.

## Requirements

* ember-power-select

While we use ember-power-select by default, you can easily swap this for anything you want inside of templates/components/crud-relationship-write.hbs.
