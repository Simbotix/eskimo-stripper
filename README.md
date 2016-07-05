# Eskimo Stripper
[![Version npm](https://img.shields.io/npm/v/eskimo-stripper.svg)](https://www.npmjs.com/package/eskimo-stripper/)
[![GitHub stars](https://img.shields.io/github/stars/microapps/Eskimo-Stripper.svg?style=flat-square)](https://github.com/microapps/Eskimo-Stripper/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/microapps/Eskimo-Stripper/master/LICENSE)
[![Eskimo Stripper](https://img.shields.io/badge/Eskimo%20Stripper-hot-red.svg)](https://www.npmjs.com/package/eskimo-stripper)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/microapps/Eskimo-Stripper/.svg?style=social?style=flat-square)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

Eskimo Stripper strips DynamoDB Stream Items of its schema and returns a plain JavaScript object.

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
Eskimo Stripper is available under the MIT license. See the LICENSE file for more info.
