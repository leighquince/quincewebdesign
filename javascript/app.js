define(['marionette'], function(Marionette) {
    var App = new Marionette.Application();
    App.addRegions({
        mainRegion: "#main-content",
        vanityRegion: "#vanity-region",
        footerRegion: "#footer-content",
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
    
    App.on("start", function() {
        if (Backbone.history) {
            require([
                "javascript/apps/cv/cv_app",
                "javascript/apps/vanity_panel/vanity_panel_app",
                "javascript/apps/footer/footer_app",
                "javascript/entities/resume",
            ], function() {
                Backbone.history.start();
                $(document).foundation();

                var promise = App.request("resume:entity:get");

                $.when(promise).done(function(model) {
                    App.trigger("vanity_panel:show", model);
                    App.trigger("cv:show", model);
                    

                }).fail(function(data) {
                    console.log("fail");
                    console.error(data);
                }).always(function(){
                    App.trigger("footer:show");
                });


            });
        }
    });
    return App;
});
