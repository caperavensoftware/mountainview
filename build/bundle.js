var gulp = require("gulp");
var bundle = require("aurelia-bundler").bundle;

var config = {
    force: true,
    baseURL: '.',
    configPath: './config.js',      // config.js file. Must be within `baseURL`
    bundles: {
        "app/src/vendor-build": {
            includes: [
                'aurelia-bootstrapper',
                'aurelia-framework',
                'aurelia-loader-default',
                'aurelia-binding',
                'aurelia-dependency-injection',
                'aurelia-event-aggregator',
                'aurelia-history-browser',
                'aurelia-router',
                'aurelia-route-recognizer',
                'aurelia-templating-binding',
                'aurelia-templating-resources',
                'aurelia-templating-router',
                'aurelia-templating',
                'aurelia-logging-console',
                'aurelia-pal-browser',
                'aurelia-polyfills',
                'aurelia-task-queue',
                'aurelia-metadata'
            ],
            options: {
                inject: true,
                minify: true
            }
        }
    }
};

gulp.task('bundle', function() {
    return bundle(config);
});