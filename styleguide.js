
'use strict';

var express = require('express');
var app = express();

var glob = require('glob');
var fs = require('fs');
var search = require('./lib/search');
var components = {};
var Case = require('case');
var helpers = require('./lib/helpers');
var extend = require('node.extend');

app.set('views', ['views', 'styleguide']);
app.set('view engine', 'jade');

app.locals = {
    basedir: __dirname,
    navigation: components
};

extend(app.locals, helpers);

// look for description files in styleguide directory
glob('styleguide/**/description.*', function (err, files) {
    for (var file in files) {
        // strip the description file from the filename
        var filename = files[file].substr(0, files[file].lastIndexOf('/'));

        // strip the styleguide from the path
        filename = filename.substr(filename.indexOf('/') + 1);

        // generate nav list
        var component = filename.split('/');

        if (components[component[0]]) {
            components[component[0]].sections.push(Case.capital(component[1]));
        } else {
            components[component[0]] = { name: Case.capital(component[0]), sections: [Case.capital(component[1])] };
        }
    }
});

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('index', { title: 'Hello', message: 'there' });
});

app.get('/styleguide/:section/:component', function (req, res) {
    var slug = req.params.section + '/' + req.params.component;

    res.render(slug + '/description', {slug: slug});
});

app.get('/colours', function (req, res) {
    var filenames = [];

    glob('sass/**/*.scss', function (err, files) {
        if (err) {
            return console.log(err);
        }

        // open each file and look for colour hex values
        for (var file in files) {
            var openFile = files[file];
            var data = fs.readFileSync(openFile, 'utf8');
            var matches = data.match(/\$.*?;/g);

            var result = {
                filename: openFile,
                lines: search.searchFile(data),
                variables: []
            };

            for (var match in matches) {
                var split = matches[match].split(':');

                result.variables.push({ name: split[0].trim(), value: split[1].slice(0, split[1].indexOf(';')).trim() });
            }

            filenames.push(result);
        }
        res.render('colours', { filenames: filenames });
    });
});

app.get('/images', function (req, res) {
    res.render('images', {});
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

