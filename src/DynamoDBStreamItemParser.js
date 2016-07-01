import { debug } from './logger';

export function strip(item) {
  debug('DynamoDB Stream item', item);
  return stripOfItemSchemaMetadata(item);
}

function stripOfItemSchemaMetadata(item, type = 'OBJECT_MAP') {
  const result = type === 'OBJECT_MAP' ? {} : [];
  const keys = Object.keys(item);
  keys.forEach(key => {
    debug(`Parsing Key: ${key}`);
    const nestedKeys = Object.keys(item[key]);
    if (`${nestedKeys[0]}` === 'M') {
      debug('Parsing DynamoDB map');
      result[key] = stripOfItemSchemaMetadata(item[key].M);
    } else if (isDynamoCollection(`${nestedKeys[0]}`)) {
      debug('Parsing DynamoDB collection');
      result[key] = stripOfItemSchemaMetadata(item[key][`${nestedKeys[0]}`], 'COLLECTION');
    } else {
      if (type === 'OBJECT_MAP') {
        const nestedProp = item[key];
        const propKeys = Object.keys(nestedProp);
        if (propKeys.length > 1 && !Array.isArray(nestedProp[propKeys[0]])) {
          result[key] = stripOfItemSchemaMetadata(nestedProp[propKeys[0]], 'OBJECT_MAP');
        } else if (propKeys.length === 1 && !Array.isArray(nestedProp[propKeys[0]])) {
          debug('Parsing DynamoDB primitive');
          debug(`Value type ${nestedKeys[0]}`);
          debug('Converting object to', nestedProp[propKeys[0]]);
          result[key] = parsePrimitive(`${propKeys[0]}`, nestedProp[propKeys[0]]);
        } else {
          debug('Parsing COLLECTION');
          result[key] = stripOfItemSchemaMetadata(nestedProp[propKeys[0]], 'COLLECTION');
        }
      } else if (type === 'COLLECTION') {
        debug(`Parsing collection item at index ${key}`);
        const index = parseInt(key, 10);
        const nestedProp = item[index];
        const propKeys = Object.keys(nestedProp);
        debug(`Collection item ${key} value is`, nestedProp[propKeys[0]]);

        if (propKeys.length > 1 && !Array.isArray(nestedProp[propKeys[0]])) {
          result[index] = stripOfItemSchemaMetadata(nestedProp, 'OBJECT_MAP');
        } else if (propKeys.length === 1 && !Array.isArray(nestedProp[propKeys[0]])) {
          result[index] = parsePrimitive(`${propKeys[0]}`, nestedProp[propKeys[0]]);
        } else {
          result[key] = stripOfItemSchemaMetadata(nestedProp[propKeys[0]], 'COLLECTION');
        }
      }
    }
  });
  debug('Returning stripped object', result);
  return result;
}

function isDynamoCollection(key) {
  const types = ['SS', 'NS', 'BS', 'L'];
  return types.indexOf(key) !== -1;
}

function parsePrimitive(type, value) {
  if (type === 'N' || type === 'BOOL') {
    return JSON.parse(value);
  }
  return value;
}
