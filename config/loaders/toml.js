const toml = require('toml');

module.exports = function(source) {
  const data = toml.parse(source);
  return `module.exports = ${JSON.stringify(data)};`;
};
