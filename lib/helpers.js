var fs = require('fs');
var jade = require('jade');
var yaml = require('js-yaml');
var jsonFormat = require('json-format');
var htmlFormat = require('html');

function component (slug, properties) {
    var template = fs.readFileSync('styleguide/' + slug + '/component.jade', 'utf8');
    var fn = jade.compile(template);

    return fn(properties);
}

function styleguide_stubs (path) {
    return yaml.safeLoad(fs.readFileSync('styleguide/' + path + '/stubs.yml', 'utf8'));
}

function styleguide_component (slug, data) {
    var template = fs.readFileSync('views/styleguide_component.jade', 'utf8');
    var fn = jade.compile(template);

    data.jsonFormat = jsonFormat;
    data.htmlFormat = htmlFormat.prettyPrint;
    data.component = component;
    data.slug = slug;

    return fn(data);
}

module.exports = {
    component: component,
    styleguide_stubs: styleguide_stubs,
    styleguide_component: styleguide_component
};

