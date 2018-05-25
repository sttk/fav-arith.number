'use strict';

var chai = require('chai');
var expect = chai.expect;

var round = require('../../lib/round');

describe('lib/round', function() {

  describe('Rounding and cutting at specified place', function() {
    it('Should round with no rounding', function() {
      expect(round('1234', 3)).to.equal('123');
      expect(round('1234', 2)).to.equal('12');
      expect(round('1234', 1)).to.equal('1');
      expect(round('1234', 0)).to.equal('0');

      expect(round('5678', 3)).to.equal('567');
      expect(round('5678', 2)).to.equal('56');
      expect(round('5678', 1)).to.equal('5');
      expect(round('5678', 0)).to.equal('0');

      expect(round('9999', 3)).to.equal('999');
      expect(round('9999', 2)).to.equal('99');
      expect(round('9999', 1)).to.equal('9');
      expect(round('9999', 0)).to.equal('0');
    });

    it('Should round with Math.floor', function() {
      expect(round('1234', 3, Math.floor)).to.equal('123');
      expect(round('1234', 2, Math.floor)).to.equal('12');
      expect(round('1234', 1, Math.floor)).to.equal('1');
      expect(round('1234', 0, Math.floor)).to.equal('0');

      expect(round('5678', 3, Math.floor)).to.equal('567');
      expect(round('5678', 2, Math.floor)).to.equal('56');
      expect(round('5678', 1, Math.floor)).to.equal('5');
      expect(round('1234', 0, Math.floor)).to.equal('0');

      expect(round('9999', 3, Math.floor)).to.equal('999');
      expect(round('9999', 2, Math.floor)).to.equal('99');
      expect(round('9999', 1, Math.floor)).to.equal('9');
      expect(round('1234', 0, Math.floor)).to.equal('0');
    });

    it('Should round with Math.ceil', function() {
      expect(round('1234', 3, Math.ceil)).to.equal('124');
      expect(round('1234', 2, Math.ceil)).to.equal('13');
      expect(round('1234', 1, Math.ceil)).to.equal('2');
      expect(round('1234', 0, Math.ceil)).to.equal('1');

      expect(round('5678', 3, Math.ceil)).to.equal('568');
      expect(round('5678', 2, Math.ceil)).to.equal('57');
      expect(round('5678', 1, Math.ceil)).to.equal('6');
      expect(round('5678', 0, Math.ceil)).to.equal('1');
    });

    it('Should round with Math.round', function() {
      expect(round('1234', 3, Math.round)).to.equal('123');
      expect(round('1234', 2, Math.round)).to.equal('12');
      expect(round('1234', 1, Math.round)).to.equal('1');
      expect(round('1234', 0, Math.round)).to.equal('0');

      expect(round('5678', 3, Math.round)).to.equal('568');
      expect(round('5678', 2, Math.round)).to.equal('57');
      expect(round('5678', 1, Math.round)).to.equal('6');
      expect(round('5678', 0, Math.round)).to.equal('1');
    });
  });

  describe('Should count up leading places', function() {
    it('Should round with Math.round', function() {
      expect(round('9999', 3, Math.ceil)).to.equal('1000');
      expect(round('9999', 2, Math.ceil)).to.equal('100');
      expect(round('9999', 1, Math.ceil)).to.equal('10');
      expect(round('9999', 0, Math.ceil)).to.equal('1');
    });

    it('Should round with Math.round', function() {
      expect(round('9999', 3, Math.round)).to.equal('1000');
      expect(round('9999', 2, Math.round)).to.equal('100');
      expect(round('9999', 1, Math.round)).to.equal('10');
      expect(round('9999', 0, Math.round)).to.equal('1');
    });
  });
});
