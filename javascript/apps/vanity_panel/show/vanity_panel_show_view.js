define(["app",
        "text!javascript/apps/vanity_panel/show/templates/vanity_panel_layout.hbs",
        "text!javascript/apps/vanity_panel/show/templates/vanity_panel_badge_item.hbs",
        "text!javascript/apps/vanity_panel/show/templates/vanity_panel_media_item.hbs"
    ],
    function(App, VanityPanelLayoutHbs, VanityPanelBadgeItemHbs, VanityPanelMediaItemHbs) {
        App.module("VanityPanel.Show.View", function(View, App, Backbone, Marionette, $, _) {

            View.Layout = Marionette.LayoutView.extend({
                template: Handlebars.compile(VanityPanelLayoutHbs),
                className: "vanity-layout",
                regions: {
                    badgeRegion: "#badge-region",
                    mediaItemsRegion: "#media-items-region",
                    graphItemsRegion: "#graph-items-region",
                }
            });

            View.BadgeItem = Marionette.ItemView.extend({
                template: Handlebars.compile(VanityPanelBadgeItemHbs),
                className: "img-badge",
            });

            View.MediaItem = Marionette.ItemView.extend({
                template: Handlebars.compile(VanityPanelMediaItemHbs),
                className: "media-item",
                tagName: "li",
            });
            View.GraphItem = Marionette.ChartView.extend({
                
            });


            View.MediaItems = Marionette.CollectionView.extend({
                childView: View.MediaItem,
                tagName: "ul",
                className: "media-items small-block-grid-5"

            });
        });

        return App.VanityPanel.Show.View;
    });
