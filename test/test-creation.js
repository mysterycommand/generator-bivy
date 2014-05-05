/* global describe, beforeEach, it */

'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('bivy generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('bivy:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            // configs
            '.editorconfig',
            '.gitignore',
            '.jshintrc',

            // projectFiles
            'bower.json',
            'Gruntfile.js',
            'package.json',
            'README.md',

            // app
            'app/.htaccess',
            'app/404.html',
            'app/index.html',
            'app/robots.txt',
            'app/scripts/config.js',
            'app/scripts/main.js',
            'app/styles/_variables.scss',
            'app/styles/main.scss',

            // tasks
            'tasks/clean.js',
            'tasks/htmlmin.js',
            'tasks/mocha.js',
            'tasks/rev.js',
            'tasks/usemin.js',
            'tasks/watch.js',
            'tasks/connect.js',
            'tasks/imagemin.js',
            'tasks/modernizr.js',
            'tasks/sass.js',
            'tasks/useminPrepare.js',
            'tasks/copy.js',
            'tasks/jshint.js',
            'tasks/requirejs.js',
            'tasks/svgmin.js',
            'tasks/usereplace.js',

            // test
            'test/index.html',
            'test/spec/config.js',
            'test/spec/main.js'
        ];

        helpers.mockPrompt(this.app, {
            'githubUser': 'mysterycommand',
            'appName': 'Bivy'
        });

        this.app.options['skip-install'] = true;

        this.app.run({}, function () {
            helpers.assertFile(expected);
            done();
        });
    });

});
