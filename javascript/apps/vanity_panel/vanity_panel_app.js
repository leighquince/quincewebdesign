define(["app",
        "javascript/apps/vanity_panel/show/vanity_panel_show_controller"
    ],
    function(App, ShowController) {
        App.module("VanityPanelApp", function(VanityPanelApp, App, Backbone, Marionette, $, _) {
            var API = {};
            VanityPanelApp.on("start", function() {
                VanityPanelApp.showController = new ShowController();
            });
        });
        return App.VanityPanelApp;
    });
