module.exports.debug = function () {
  if (process.env.DEBUG) {
    console.log.apply(console, ['dynamodb-stream-item-schema-stripper', ...arguments]);
  }
};

module.exports.error = function () {
  console.log.apply(console, ['dynamodb-stream-item-schema-stripper', ...arguments]);
}
