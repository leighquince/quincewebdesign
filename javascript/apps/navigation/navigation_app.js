define(["app",
    "javascript/apps/navigation/list/navigation_list_controller"
], function(App, ListController) {
    App.module("NavigationApp", function(NavigationApp, App, Backbone, Marionette, $, _) {
        var API = {

        };

        App.commands.setHandler("set:active:navigation_link", $.proxy(function(name) {
            NavigationApp.navigationListController.setActiveNavigationLink(name);
        },this));

        NavigationApp.on("start", function() {
            console.log("starting navigation app")
            NavigationApp.navigationListController = new ListController();
        });
    });

    return App.NavigationApp;
});