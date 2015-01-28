
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

app.set('views', ['views', 'styleguide']);
app.set('view engine', 'jade');

app.locals = {
    basedir: __dirname,
    component: function (slug, properties) {
        var template = fs.readFileSync('styleguide/' + slug + '/component.jade', 'utf8');
        var fn = jade.compile(template);

        return fn(properties);
    },
    styleguide_stubs: function (path) {
        return yaml.safeLoad(fs.readFileSync('styleguide/' + path + '/stubs.yml', 'utf8'));
    },
    styleguide_component: function (slug, data) {
        var template = fs.readFileSync('views/styleguide_component.jade', 'utf8');
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

            var result = {
                filename: openFile,
                lines: search.searchFile(data),
                variables: []
            };

            var matches = data.match(/\$.*?;/g);
            console.log(matches);

            for (var match in matches) {
                var split = matches[match].split(':');
                result.variables.push({ name: split[0].trim(), value: split[1].slice(0, split[1].indexOf(';')).trim() });
            }

            console.log(JSON.stringify(result));
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

