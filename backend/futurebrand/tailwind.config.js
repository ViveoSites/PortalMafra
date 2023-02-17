const tailwindConfig = require('../../frontend/tailwind.config.js');

module.exports = {
  ...tailwindConfig,
  content: ['./blocks/**/*.php'],
};
