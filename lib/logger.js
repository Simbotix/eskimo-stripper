var _slice = Array.prototype.slice;
module.exports.debug = function () {
  if (process.env.DEBUG) {
    console.log.apply(console, ['dynamodb-stream-item-schema-stripper'].concat(_slice.call(arguments)));
  }
};

module.exports.error = function () {
  console.log.apply(console, ['dynamodb-stream-item-schema-stripper'].concat(_slice.call(arguments)));
};