export default {
  Int: 0,
  Float: 1,
  Array: 2,
  Object: 3,
  String: 4,
  Boolean: 5,
  Component: 6,

  isComponent: function(tpe) {
    return tpe === 6;
  },
};
