module.exports = {
  description: '',

  normalizeEntityName: function() {
    // crud-root is a hardcoded name
    // this line suppresses errors about entity name
    return "test";
  }
};
