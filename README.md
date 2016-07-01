# dynamodb-stream-item-schema-stripper

dynamodb-stream-item-schema-stripper is a tiny utility that strips DynamoDB Stream Item of its schema and returns a plain JavaScript object with no effort on your side.

### Example:
```javascript
var strip = require('dynamodb-stream-item-schema-stripper').strip;
var item = strip(streamItem);
```

```javascript
import { strip } from 'dynamodb-stream-item-schema-stripper';
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
aws-event-parser is available under the MIT license. See the LICENSE file for more info.
