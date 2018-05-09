 'use strict';

/**
 * Module dependencies.
 */
const { icons } = require('feather-icons');

/**
 * Express middleware function.
 */
const helper = module.exports = function (req, res, next) {
  res.locals = { filters: {}, ...res.locals };
  
  res.locals.filters['feather-icon'] = filter;
  next();
};

/**
 * Named icon sizes.
 */
const iconSizes = helper.iconSizes = {
  super: 32,
  xlarge: 24,
  large: 20,
  medium: 16,
  small: 13,
  xsmall: 10,
  tiny: 8
};

/**
 * Pug custom filter.
 * @param {string} name - The name of the feather icon to generate.
 * @param {Object} opts - Options to pass to the `toSvg` method.
 * @param {string|number} opts.size - Size of the generated icon.
 * @returns {string}
 */
const filter = helper.filter = function(name, opts = {}) {
  if (!icons[name])
    return '';

  let { filename, size, ...rest } = opts;
  if (typeof size === 'string')
    size = iconSizes[size];
  if (!size)
    size = iconSizes.medium;

  return icons[name].toSvg({ width: size, height: size, ...rest });
};