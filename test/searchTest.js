
var expect = require('chai').expect;
var search = require('../lib/search');

describe('Searching for colour hex values', function () {

    describe('findColours function', function () {
        it('returns an array', function () {
            var result = search.findColours('');

            expect(result).to.be.instanceOf(Array);
        });

        it('returns an object for each colour found', function () {
            var result = search.findColours('#f00');

            expect(result[0]).to.be.instanceOf(Object);
        });

        describe('colour object', function () {
            var match;

            beforeEach(function () {
                match = search.findColours("#f00 #0f0 #00f")[0];
            });

            it('has a value', function () {
                expect(match).to.have.a.property('value');
            });

            it('has a position', function () {
                expect(match).to.have.a.property('position');
            });
        });

        describe('search results', function () {
            it('finds all the colours in the string', function () {
                var results = search.findColours("#f00 #00ff00 #0f0 #f00");

                expect(results.length).to.equal(4);
                expect(results[0].value).to.equal('#f00');
                expect(results[0].position).to.equal(0);
                expect(results[1].value).to.equal('#00ff00');
                expect(results[1].position).to.equal(5);
                expect(results[2].value).to.equal('#0f0');
                expect(results[2].position).to.equal(13);
                expect(results[3].value).to.equal('#f00');
                expect(results[3].position).to.equal(18);
            });

            it('finds three character hex values', function () {
                var results = search.findColours("#f00");

                expect(results.length).to.equal(1);
                expect(results[0].value).to.equal('#f00');
                expect(results[0].position).to.equal(0);
            });

            it('six character hex values', function () {
                var results = search.findColours("#ff0000");

                expect(results.length).to.equal(1);
                expect(results[0].value).to.equal('#ff0000');
                expect(results[0].position).to.equal(0);
            });

            it('finds a mix of hex values', function () {
                var results = search.findColours("#ff0000 #00f");

                expect(results.length).to.equal(2);
                expect(results[0].value).to.equal('#ff0000');
                expect(results[0].position).to.equal(0);
                expect(results[1].value).to.equal('#00f');
                expect(results[1].position).to.equal(8);
            });

            it('should not return an invalid hex value', function () {
                var results = search.findColours("#00z");

                expect(results.length).to.equal(0);
            });
        });
    });
});

