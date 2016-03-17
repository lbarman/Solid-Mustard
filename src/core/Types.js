/**
 * @typedef {object} Type
 *
 * @desc Internal representation of a component attribute type. Possible values are
 *   available in {@link Types}.
 */

/**
 * Type constraints for Component attributes.
 *
 * @property {Type} Int Integer type (can only take integer values)
 * @property {Type} Float Floating point value
 * @property {Type} Array Generic javascript array (cannot contain Component references,
 *     use ComponentArray instead)
 * @property {Type} Object Generic javascript object
 * @property {Type} String String
 * @property {Type} Boolean Boolean
 * @property {Type} Component A reference to another component in the same scene.
 * @property {Type} Collection A {@link Collection} of components.
 *
 * @see {@link Component#createAttribute}
 */
const Types = {
  Int: 0,
  Float: 1,
  Array: 2,
  Object: 3,
  String: 4,
  Boolean: 5,
  Component: 6,
  Collection: 7
};

export default Types;
