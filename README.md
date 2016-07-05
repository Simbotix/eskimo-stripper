# Eskimo Stripper

[![Version npm](https://img.shields.io/npm/v/eskimo-stripper.svg)](https://www.npmjs.com/package/eskimo-stripper/)
Eskimo Stripper strips DynamoDB Stream Items of its schema and returns a plain JavaScript object.

### Example:
```javascript
var strip = require('eskimo-stripper').strip;
var item = strip(streamItem);
```

```javascript
import { strip } from 'eskimo-stripper';
const item = strip(streamItem);
```

#### Sample input:
```
{
  "firstLevelList": {
    "L": [
      {
        "S": "firstLevelListString"
      },
      {
        "M": {
          "numberNestedInMapNestedInList": {
            "N": "1"
          }
        }
      }
    ]
  },
  "customerEmail": {
    "S": "customerEmail@example.com"
  },
  "resultCode": {
    "S": "resultCode"
  }, ...
```

#### Sample output:
```
{ firstLevelList: [ 'firstLevelListString', { numberNestedInMapNestedInList: 1 } ],
  customerEmail: 'customerEmail@example.com',
  resultCode: 'resultCode',
  id: 'id123',
  firstLevelMap:
   { nestedList: [ 'firstLevelMap.nestedList.String.Value', 1 ],
     numberField: 1,
     stringField: 'firstLevelMap.stringField',
     nestedMap: { nestedStringField: 'firstLevelMap.nestedMap.nestedStringField' } },
  transactionTimestamp: 123
}
```

## Installing

```
$ npm install --save dynamodb-stream-item-schema-stripper
```

### Contributing
Contributions are always welcome!

### Credits
Developed by [microapps] (http://microapps.com/)

## License
Eskimo Stripper is available under the MIT license. See the LICENSE file for more info.
