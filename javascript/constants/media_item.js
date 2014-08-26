define(["app", ], function(App) {
    App.module("Constants", function(Constants, App, Backbone, Marionette, $, _) {
        Constants.IconItem = Backbone.Model.extend({
            defaults: {
                name: null,
                fa: "fa-user"
            }
        });

        Constants.IconMapCollection = Backbone.Collection.extend({
            model: Constants.IconItem,
        });

        var initializeIconsMap = function() {
            Constants.iconsMap = new Constants.IconMapCollection(
                [{
                    name: "git_hub",
                    fa: "fa-github-square"
                }, {
                    name: "linkedin",
                    fa: "fa-linkedin-square"
                }, {
                    name: "stack_overflow",
                    fa: "fa-stack-overflow"
                }, {
                    name: "you_tube",
                    fa: "fa-youtube-square"
                }, {
                    name: "email",
                    fa: "fa-envelope"
                }]
            );
        };

        var API = {
            getIconFromMap: function(name) {
                if (Constants.iconsMap === undefined) {
                    initializeIconsMap();
                }
                //return a blank icon so display doesn't break
                return Constants.iconsMap.findWhere({
                    name: name
                }) || new Constants.IconItem({
                    name: name
                });
            }
        };

        App.reqres.setHandler("constants:icon_map:get", function(name) {
            return API.getIconFromMap(name);
        });
    });

    return;
});
