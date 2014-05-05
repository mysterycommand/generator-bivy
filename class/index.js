'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');

var ClassGenerator = yeoman.generators.NamedBase.extend({
    init: function () {
        this.pkg = require(path.join(this.env.cwd, 'package.json'));

        this.realName = this.pkg.author.name;
        this.email = this.pkg.author.email;
        this.version = this.pkg.version;

        this.fileHeader = this.engine(this.read('../../partials/_fileHeader.js', 'utf8'), this);
    },

    files: function () {
        this.template('_Class.js', 'app/scripts/' + this.name + '.js');
        this.template('_Class.test.js', 'test/spec/' + this.name + '.test.js');

        var testMainPath = path.join(this.env.cwd, 'test/spec/main.js');
        var testMain = this.read(testMainPath);
        testMain = testMain.replace(/\/\*(\s*)(require)(\s*)\*\//g, '$2');
        testMain = testMain.replace(/(\n(\s*)\/\*\* END TESTS \*\/)/g, '\n$2require(\'spec/' + this.name + '.test\');$1');
        this.write(testMainPath, testMain);
    }
});

module.exports = ClassGenerator;
