
var expect = require('chai').expect;
var search = require('../lib/search');

describe('Searching for colour hex values', function () {

    describe('searchFile function', function () {
        it('returns an array', function () {
            var result = search.searchFile('');

            expect(result).to.be.instanceOf(Array);
        });

        it('returns an object for every line that has a colour found', function () {
            var result = search.searchFile('#f00');

            expect(result[0]).to.be.instanceOf(Object);
        });

        describe('line object', function () {
            var match;

            beforeEach(function () {
                match = search.searchFile("#f00 #0f0 #00f")[0];
            });

            it('has a line number that is an integer', function () {
                expect(match).to.have.a.property('line');
                expect(match.line).to.be.a('number');
            });

            it('has a list of colours that is an array', function () {
                expect(match).to.have.a.property('colours');
                expect(match.colours).to.be.instanceOf(Array);
            });
        });

        describe('search results', function () {
            it('finds all the lines with colours', function () {
                var results = search.searchFile("#f00 #00ff00\n#0f0");

                expect(results.length).to.equal(2);
                expect(results[0].line).to.equal(1);
                expect(results[0].colours.length).to.equal(2);
                expect(results[1].line).to.equal(2);
                expect(results[1].colours.length).to.equal(1);
            });

            it('should not return a line that has no colours', function () {
                var results = search.searchFile("#\n#00ff00");

                expect(results.length).to.equal(1);
            });

            it('should not return any results on an empty file', function () {
                var results = search.searchFile("");

                expect(results.length).to.equal(0);
            });
        });
    });

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

            it('has a value that is a string', function () {
                expect(match).to.have.a.property('value');
                expect(match.value).to.be.a('string');
            });

            it('has a position that is a number', function () {
                expect(match).to.have.a.property('position');
                expect(match.position).to.be.a('number');
            });
        });

        describe('search results', function () {
            it('finds all the colours in the string', function () {
                var results = search.findColours("#f00 #00ff00 #0f0 #f00");

                expect(results.length).to.equal(4);
                expect(results[0]).to.deep.equal({ value: '#f00', position: 0 });
                expect(results[1]).to.deep.equal({ value: '#00ff00', position: 5 });
                expect(results[2]).to.deep.equal({ value: '#0f0', position: 13 });
                expect(results[3]).to.deep.equal({ value: '#f00', position: 18 });
            });

            it('finds three character hex values', function () {
                var results = search.findColours("#f00");

                expect(results.length).to.equal(1);
                expect(results[0]).to.deep.equal({ value: '#f00', position: 0 });
            });

            it('six character hex values', function () {
                var results = search.findColours("#ff0000");

                expect(results.length).to.equal(1);
                expect(results[0]).to.deep.equal({ value: '#ff0000', position: 0 });
            });

            it('finds a mix of hex values', function () {
                var results = search.findColours("#ff0000 #00f");

                expect(results.length).to.equal(2);
                expect(results[0]).to.deep.equal({ value: '#ff0000', position: 0 });
                expect(results[1]).to.deep.equal({ value: '#00f', position: 8 });
            });

            it('should not return an invalid hex value', function () {
                var results = search.findColours("#00z");

                expect(results.length).to.equal(0);
            });
        });
    });
});

