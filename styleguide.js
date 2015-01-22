
'use strict';

var express = require('express');
var app = express();

var glob = require('glob');
var fs = require('fs');
var search = require('./lib/search');
var yaml = require('js-yaml');
var jade = require('jade');
var jsonFormat = require('json-format');
var htmlFormat = require('html');

app.set('view engine', 'jade');

app.locals = {
    component: function (slug, properties) {
        var template = fs.readFileSync('components/' + slug + '/template.jade', 'utf8');
        var fn = jade.compile(template);

        return fn(properties);
    },
    styleguide_stubs: function (path) {
        return yaml.safeLoad(fs.readFileSync('components/' + path + '/stubs.yml', 'utf8'));
    },
    styleguide_component: function (slug, data) {
        var template = fs.readFileSync('helpers/templates/styleguide_component.jade', 'utf8');
        var fn = jade.compile(template);

        data.jsonFormat = jsonFormat;
        data.htmlFormat = htmlFormat.prettyPrint;
        data.component = app.locals.component;
        data.slug = slug;

        return fn(data);
    }
};

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('index', { title: 'Hello', message: 'there' });
});

app.get('/styleguide/:section/:component', function (req, res) {
    var slug = req.params.section + '/' + req.params.component;

    res.render('component', {slug: slug});
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

            filenames.push({
                filename: openFile,
                lines: search.searchFile(data)
            });
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

