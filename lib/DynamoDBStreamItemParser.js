Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.strip = strip;

var _logger = require('./logger');

function strip(item) {
  (0, _logger.debug)('DynamoDB Stream item', item);
  return stripOfItemSchemaMetadata(item);
}

function stripOfItemSchemaMetadata(item) {
  var type = arguments.length <= 1 || arguments[1] === undefined ? 'OBJECT_MAP' : arguments[1];

  var result = type === 'OBJECT_MAP' ? {} : [];
  var keys = Object.keys(item);
  keys.forEach(function (key) {
    (0, _logger.debug)('Parsing Key: ' + key);
    var nestedKeys = Object.keys(item[key]);
    if ('' + nestedKeys[0] === 'M') {
      (0, _logger.debug)('Parsing DynamoDB map');
      result[key] = stripOfItemSchemaMetadata(item[key].M);
    } else if (isDynamoCollection('' + nestedKeys[0])) {
      (0, _logger.debug)('Parsing DynamoDB collection');
      result[key] = stripOfItemSchemaMetadata(item[key]['' + nestedKeys[0]], 'COLLECTION');
    } else {
      if (type === 'OBJECT_MAP') {
        var nestedProp = item[key];
        var propKeys = Object.keys(nestedProp);
        if (propKeys.length > 1 && !Array.isArray(nestedProp[propKeys[0]])) {
          result[key] = stripOfItemSchemaMetadata(nestedProp[propKeys[0]], 'OBJECT_MAP');
        } else if (propKeys.length === 1 && !Array.isArray(nestedProp[propKeys[0]])) {
          (0, _logger.debug)('Parsing DynamoDB primitive');
          (0, _logger.debug)('Value type ' + nestedKeys[0]);
          (0, _logger.debug)('Converting object to', nestedProp[propKeys[0]]);
          result[key] = parsePrimitive('' + propKeys[0], nestedProp[propKeys[0]]);
        } else {
          (0, _logger.debug)('Parsing COLLECTION');
          result[key] = stripOfItemSchemaMetadata(nestedProp[propKeys[0]], 'COLLECTION');
        }
      } else if (type === 'COLLECTION') {
        (0, _logger.debug)('Parsing collection item at index ' + key);
        var index = parseInt(key, 10);
        var nestedProp = item[index];
        var propKeys = Object.keys(nestedProp);
        (0, _logger.debug)('Collection item ' + key + ' value is', nestedProp[propKeys[0]]);

        if (propKeys.length > 1 && !Array.isArray(nestedProp[propKeys[0]])) {
          result[index] = stripOfItemSchemaMetadata(nestedProp, 'OBJECT_MAP');
        } else if (propKeys.length === 1 && !Array.isArray(nestedProp[propKeys[0]])) {
          result[index] = parsePrimitive('' + propKeys[0], nestedProp[propKeys[0]]);
        } else {
          result[key] = stripOfItemSchemaMetadata(nestedProp[propKeys[0]], 'COLLECTION');
        }
      }
    }
  });
  (0, _logger.debug)('Returning stripped object', result);
  return result;
}

function isDynamoCollection(key) {
  var types = ['SS', 'NS', 'BS', 'L'];
  return types.indexOf(key) !== -1;
}

function parsePrimitive(type, value) {
  if (type === 'N' || type === 'BOOL') {
    return JSON.parse(value);
  }
  return value;
}