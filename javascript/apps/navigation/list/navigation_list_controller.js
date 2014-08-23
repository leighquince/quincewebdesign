define(["app",
    "javascript/apps/navigation/list/navigation_list_view",
    "javascript/entities/navigation_link"
], function(App, View) {
    App.module("NavigationApp.List", function(List, App, Backbone, Marionette, $, _) {
        List.Controller = Marionette.Controller.extend({
            initialize: function(options) {
                var links = App.request("navigation_links:entities");

                var navigationLinksView = new View.NavigationLinks({
                    collection: links
                });
                this.listenTo(navigationLinksView, "childview:navigate", function(childView) {
                    App.trigger(childView.model.get("navigationTrigger"));
                });
                App.navigationRegion.show(navigationLinksView);
            },
            setActiveNavigationLink: function(navigationLinkUrl) {
                var links = App.request("navigation_links:entities");
                var navigationLinkToSelect = links.find(function(navigationLink) {
                    return navigationLink.get("url") === navigationLinkUrl;
                });
                navigationLinkToSelect.select();
                links.trigger("reset");
            }
        });

    });

    return App.NavigationApp.List.Controller;
});
