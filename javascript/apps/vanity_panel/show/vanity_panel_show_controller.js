define(["app",
    "javascript/apps/vanity_panel/show/vanity_panel_show_view",
    "javascript/constants/media_item",
], function(App, View) {
    App.module("VanityPanelApp.Show", function(Show, App, Backbone, Marionette, $, _) {
        Show.Controller = Marionette.Controller.extend({
            initialize: function(options) {
                this.model = options.model.get("basics");
                this.layout = new View.Layout();

                this.badgeView = new View.BadgeItem({
                    model: new Backbone.Model({
                        src: this.model.get("picture"),
                        name: this.model.get("name"),
                        details: [{
                            icon: "fa-home",
                            value: this.model.get("location") ?
                                this.model.get("location").get("region") + ", " + this.model.get("location").get("country") : null
                        }, {
                            icon: "fa-phone",
                            value: this.model.get("phone")
                        }]
                    })
                });

                this.model.get("profiles").forEach(function(profile) {
                    profile.set({
                        icon: App.request("constants:icon_map:get", profile.get("network"))
                    });
                });

                this.mediaItemsView = new View.MediaItems({
                    collection: this.model.get("profiles")
                });

                this.listenTo(this.layout, "show", $.proxy(function() {
                    this.layout.badgeRegion.show(this.badgeView);
                    this.layout.mediaItemsRegion.show(this.mediaItemsView);
                }, this));
            },

        });
    });
    return App.VanityPanelApp.Show.Controller;
});
