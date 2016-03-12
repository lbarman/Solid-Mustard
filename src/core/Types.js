export default {
  Component: function(CType) {
    if (typeof CType !== 'function') throw new Error('Type Component takes a component constructor as parameter');
    return CType.name;
  },
  isComponent: function(tpe) {
    return typeof tpe === 'string';
  },
  Int: 0,
  Float: 1,
  Array: 2,
  Object: 3,
  String: 4,
  Boolean: 5
};
