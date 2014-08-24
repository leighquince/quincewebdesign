define(['marionette'], function(Marionette) {
    var App = new Marionette.Application();
    App.addRegions({
        mainRegion: "#main-region",
        vanityRegion: "#vanity-region",
        dialogRegion: "#dialog-region"
    });
    App.navigate = function(route, options) {
        options || (options = {});
        Backbone.history.navigate(route, options);
    };
    App.getCurrentRoute = function() {
        return Backbone.history.fragment;
    };
    App.startSubApp = function(appName, args) {
        var currentApp = appName ? App.module(appName) : null;
        if (App.currentApp === currentApp) {
            return;
        }
        if (App.currentApp) {
            App.currentApp.stop();
        }
        App.currentApp = currentApp;
        if (currentApp) {
            currentApp.start(args);
        }
    };
    App.resize = function() {
        console.log("resizing");
        if ($(document).width <= 640) {
            App.vanityRegion.$el.height(200);
        } else {
            App.vanityRegion.$el.height($(document).height());
        }
    };
    App.on("start", function() {
        if (Backbone.history) {
            require([], function() {
                Backbone.history.start();
                $(document).foundation();
                $(window).bind("resize", App.resize());
                if (App.getCurrentRoute() === "") {}
            });
        }
    });
    return App;
});
