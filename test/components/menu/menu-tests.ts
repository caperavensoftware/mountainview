import {expect} from 'chai';
import {MenuBase} from './../../../src/components/menu/menu-base';

describe('MenuBase Tests', function() {
   var menuBase;

   beforeEach(function() {
       menuBase = new MenuBase({});
   });

   it('constructor', function() {
       expect(menuBase).to.not.be.null;
   });
})