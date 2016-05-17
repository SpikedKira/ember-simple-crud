# Ember-simple-crud

This README outlines the details of collaborating on this Ember addon.

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
