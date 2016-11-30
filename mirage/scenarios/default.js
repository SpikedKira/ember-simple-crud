export default function( server ) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);

  server.createList( 'company', 5 );
  server.createList( 'employee', 50 );
  server.createList( 'product', 20 );
}
