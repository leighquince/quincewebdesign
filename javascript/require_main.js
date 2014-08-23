requirejs.config({
    baseUrl: "/static/festival",
    config: {

        text: {
            useXhr: function(url, protocol, hostname, port) {
                //Override function for determining if XHR should be used.
                //url: the URL being requested
                //protocol: protocol of page text.js is running on
                //hostname: hostname of page text.js is running on
                //port: port of page text.js is running on
                //Use protocol, hostname, and port to compare against the url
                //being requested.
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

        "jquery.mockjax": "bower_components/jquery-mockjax/jquery.mockjax",
        faker: "bower_components/faker/faker",

        moment: 'bower_components/moment/moment',
        responses: "javascript/mockjax_response/responses",

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
        'jquery.mockjax': ['jquery'],
        foundation: ['jquery', 'jquery.cookie', 'jquery.placeholder', 'modernizr', 'fastclick'],
        responses: ['jquery.mockjax', 'faker'],
        app: [
            'backbone',
            'marionette',
            'foundation',
            'moment',
            'responses'

        ]


    }

});

require(["app",
    'foundation',
    'javascript/apps/navigation/navigation_app',
    'javascript/apps/server/server_app',
    'javascript/apps/festival/festival_app'
], function(App) {

    App.start();
});
