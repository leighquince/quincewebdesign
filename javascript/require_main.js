requirejs.config({
    baseUrl: "../",
    config: {
        text: {
            useXhr: function(url, protocol, hostname, port) {
                //Return true or false. true means "use xhr", false means
                //"fetch the .js version of this resource".
                return true;
            }
        }
    },
    paths: {
        jquery: "bower_components/jquery/dist/jquery",
        "jquery.cookie": "bower_components/foundation/js/vendor/jquery.cookie",
        modernizr: "bower_components/foundation/js/vendor/modernizr",
        "jquery.placeholder": "bower_components/foundation/js/vendor/placeholder",
        underscore: "bower_components/underscore/underscore",
        handlebars: "bower_components/handlebars/handlebars",
        marionette: "bower_components/marionette/lib/backbone.marionette",
        backbone: "bower_components/backbone/backbone",
        foundation: "bower_components/foundation/js/foundation.min",
        fastclick: "bower_components/foundation/js/vendor/fastclick",
        moment: 'bower_components/moment/moment',
        chart: 'bower_components/chartjs/Chart',
        app: 'javascript/app'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        handlebars: {
            exports: "Handlebars"
        },
        backbone: {
            deps: ['jquery', 'underscore', 'handlebars'],
            exports: "Backbone"
        },
        marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        'jquery.placeholder': ['jquery'],
        foundation: ['jquery', 'jquery.cookie', 'jquery.placeholder', 'modernizr', 'fastclick'],
        app: ['marionette', 'foundation', 'moment']
    }
});
require(["app",
    'foundation',
    'javascript/common/backbone_patches',
    'javascript/common/marionette_patches',
    'javascript/common/handlebars_common_helpers',
    'javascript/apps/server/server_app',
], function(App) {
    App.start();
});
