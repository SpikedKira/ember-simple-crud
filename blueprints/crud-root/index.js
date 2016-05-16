module.exports = {
  description: '',

  normalizeEntityName: function() {
    // crud-root is a hardcoded name
    // this line suppresses errors about entity name
    return "test";
  },

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  // afterInstall: function(options) {
  //   // Perform extra work here.
  // }
};
