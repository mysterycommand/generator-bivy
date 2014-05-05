'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var GitHubApi = require('github');
var github = new GitHubApi({ version: '3.0.0' });

var githubUserInfo = function (name, cb) {
    github.user.getFrom({
        user: name
    }, function (err, res) {
        if (err) { throw err; }
        cb(JSON.parse(JSON.stringify(res)));
    });
};

var BivyGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor: function () {
        var done = this.async();

        this.log(chalk.magenta('A bivouac sack (also known as a bivy, bivvy, or bivi) is an extremely small, lightweight, waterproof shelter, and an alternative to traditional tent systems. It is used by climbers, mountaineers, hikers, ultralight backpackers, soldiers and minimalist campers.'));

        var prompts = [{
              name: 'githubUser',
              message: 'Would you mind telling me your username on GitHub?',
              default: 'someuser'
        }, {
              name: 'appName',
              message: 'Every app needs a name:'
        }];

        this.prompt(prompts, function (props) {
            this.githubUser = props.githubUser;
            this.appName = props.appName;
            this.version = '0.0.0';
            done();
        }.bind(this));
    },

    userInfo: function () {
        var done = this.async();

        githubUserInfo(this.githubUser, function (res) {
            /*jshint camelcase:false */
            this.realName = res.name;
            this.email = res.email;
            this.githubUrl = res.html_url;

            this.fileHeader = this.engine(this.read('../../partials/_fileHeader.js', 'utf8'), this);

            done();
        }.bind(this));
    },

    configs: function () {
        this.copy('editorconfig', '.editorconfig');
        this.copy('gitignore', '.gitignore');
        this.copy('jshintrc', '.jshintrc');
    },

    projectFiles: function() {
        this.template('_package.json', 'package.json');
        this.template('_bower.json', 'bower.json');
        this.template('_README.md', 'README.md');

        this.copy('Gruntfile.js', 'Gruntfile.js');
    },

    app: function () {
        this.mkdir('app');
        this.copy('app/htaccess', 'app/.htaccess');
        this.copy('app/404.html', 'app/404.html');
        this.copy('app/robots.txt', 'app/robots.txt');
        this.template('app/_index.html', 'app/index.html');

        this.mkdir('app/images');

        this.mkdir('app/scripts');
        this.template('app/scripts/_config.js', 'app/scripts/config.js');
        this.template('app/scripts/_main.js', 'app/scripts/main.js');

        this.mkdir('app/styles');
        this.copy('app/styles/_variables.scss', 'app/styles/_variables.scss');
        this.copy('app/styles/main.scss', 'app/styles/main.scss');
    },

    tasks: function() {
        this.bulkDirectory('tasks', 'tasks');
    },

    test: function() {
        this.mkdir('test');
        this.template('test/_index.html', 'test/index.html');

        this.mkdir('test/spec');
        this.template('test/spec/_config.js', 'test/spec/config.js');
        this.template('test/spec/_main.js', 'test/spec/main.js');
    }
});

module.exports = BivyGenerator;
