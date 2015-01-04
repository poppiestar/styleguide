
var expect = require('chai').expect;
var colourUtils = require('../lib/colourUtils');

describe('Colour utilities', function () {

    describe('hex to RGB function', function () {
        it('returns an object', function () {
            var result = colourUtils.hexToRGB('#f00');

            expect(result).to.be.instanceOf(Object);
        });

        describe('conversion results', function () {
            it('converts a six colour value without a prepending hash', function () {
                var result = colourUtils.hexToRGB('abcdef');

                expect(result).to.deep.equal({ red: 171, green: 205, blue: 239 });
            });

            it('converts a six colour value with a prepending hash', function () {
                var result = colourUtils.hexToRGB('#abcdef');

                expect(result).to.deep.equal({ red: 171, green: 205, blue: 239 });
            });

            it('converts a three colour value without a prepending hash', function () {
                var result = colourUtils.hexToRGB('abc');

                expect(result).to.deep.equal({ red: 170, green: 187, blue: 204 });
            });

            it('converts a three colour value with a prepending hash', function () {
                var result = colourUtils.hexToRGB('#abc');

                expect(result).to.deep.equal({ red: 170, green: 187, blue: 204 });
            });
        });
    });

    describe('colour weight function', function () {
        it('returns a number', function () {
            var result = colourUtils.colourWeight('#f00');

            expect(result).to.be.a('number');
        });

        describe('conversion results', function () {
            it('converts a six colour value without a prepending hash', function () {
                var result = colourUtils.colourWeight('abcdef');

                expect(result).to.equal(200);
            });

            it('converts a six colour value with a prepending hash', function () {
                var result = colourUtils.colourWeight('#abcdef');

                expect(result).to.equal(200);
            });

            it('converts a three colour value without a prepending hash', function () {
                var result = colourUtils.colourWeight('f00');

                expect(result).to.equal(125);
            });

            it('converts a three colour value with a prepending hash', function () {
                var result = colourUtils.colourWeight('#f00');

                expect(result).to.equal(125);
            });
        });
    });
});

