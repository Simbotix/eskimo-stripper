'use strict';

import * as chai from 'chai';
import { expect } from 'chai';
import { strip } from '../src/DynamoDBStreamItemParser';
import item from './fixtures/dynamodbStreamItem.json';

describe('DynamoDBStreamItemParser', () => {
  context('when a nested DynamoDB Stream item is provided', () => {
    before(() => {
    });
    describe('#strip()', () => {
      it('returns a plain JavaScript object without Dynamo metadata', (done) => {
        const strippedItem = strip(item);
        expect(strippedItem).to.be.an('object');
        expect(strippedItem).to.have.property('firstLevelList').with.length(2);
        const firstLevelListString = strippedItem.firstLevelList[0];
        expect(firstLevelListString).to.be.a('string').equal('firstLevelListString');
        const numberNestedInMapNestedInList = strippedItem.firstLevelList[1];
        expect(numberNestedInMapNestedInList).to.be.an('object');
        expect(numberNestedInMapNestedInList).to.have.property('numberNestedInMapNestedInList', 1);
        expect(strippedItem).to.have.property('customerEmail', 'customerEmail@example.com');
        expect(strippedItem).to.have.property('resultCode', 'resultCode');
        expect(strippedItem).to.have.property('mid', 'mid123');
        expect(strippedItem).to.have.property('id', 'id123');
        expect(strippedItem).to.have.property('channelId', 'channelId123');
        expect(strippedItem).to.have.property('transactionTimestamp', 123);
        expect(strippedItem).to.have.property('paymentType', 'CC');
        expect(strippedItem).to.have.property('firstLevelMap');
        const firstLevelMap = strippedItem.firstLevelMap;
        expect(firstLevelMap).to.have.property('nestedList');
        expect(firstLevelMap).to.have.property('numberField', 1);
        expect(firstLevelMap).to.have.property('stringField', 'firstLevelMap.stringField');
        expect(firstLevelMap).to.have.property('nestedList');
        expect(firstLevelMap).to.have.property('nestedMap');
        const nestedMap = firstLevelMap.nestedMap;
        expect(nestedMap).to.have.property('nestedStringField', 'firstLevelMap.nestedMap.nestedStringField');
        done();
      });
    });
  });
});
