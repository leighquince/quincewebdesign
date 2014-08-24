define(["app", ], function(App) {
    App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
        Entities.MediaItem = Backbone.Model.extend({
            defaults: {
                link: null,
                icon: null
            }
        });

        Entities.MediaItemCollection = Backbone.Collection.extend({
            model: Entities.MediaItem,
        });

        var initializeMediaItems = function() {
            Entities.mediaItems = new Entities.MediaItemCollection(
                [{
                    link: "http://www.somehwere.com",
                    icon: "fa-github"
                }, {
                    link: "http://www.somehwere.com",
                    icon: "fa-linkedin"
                }, {
                    link: "mailTo:leighquince@quicnewebdesign.com",
                    icon: "fa-envelope"
                }, {
                    link: "http://www.somehwere.com",
                    icon: "fa-stack-overflow"
                }]
            );
        };

        var API = {
            getMediaItems: function() {
                if (Entities.mediaItems === undefined) {
                    initializeMediaItems();
                }
                return Entities.mediaItems;
            }
        };

        App.reqres.setHandler("media_item:entities:get", function() {
            return API.getMediaItems();
        });
    });

    return;
});
