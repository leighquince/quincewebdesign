define(["app",
    "javascript/apps/vanity_panel/show/vanity_panel_show_view",
    "javascript/entities/media_item",
], function(App, View) {
    App.module("VanityPanelApp.Show", function(Show, App, Backbone, Marionette, $, _) {
        Show.Controller = Marionette.Controller.extend({
            initialize: function(options) {
                this.layout = new View.Layout();

                App.vanityRegion.show(this.layout);


                this.badgeView = new View.BadgeItem({
                    model: new Backbone.Model({
                        src: "images/me.jpg",
                        name: "Leigh Quince",
                        details: [{
                            icon: "fa-home",
                            value: "Ticino, Switzerland"
                        }, {
                            icon: "fa-phone",
                            value: "+41 1 12 12 12 12"
                        }, ]
                    })
                });

                this.layout.badgeRegion.show(this.badgeView);

                var mediaItemsPromise = App.request("media_item:entities:get");

                $.when(mediaItemsPromise).done($.proxy(function(collection) {
                    this.mediaItemsView = new View.MediaItems({
                        collection: collection
                    });

                    this.layout.mediaItemsRegion.show(this.mediaItemsView);
                }, this));
            },

        });
    });
    return App.VanityPanelApp.Show.Controller;
});
