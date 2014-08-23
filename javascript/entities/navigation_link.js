define(["app", ], function(App) {
    App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
        Entities.NavigationLink = Backbone.Model.extend({
            defaults: {
                name: null,
                url: null,
                navigationTrigger: null,
                selected: false,
            },

            select: function() {
                if (this.collection) {
                    this.collection.select(this);
                }
                this.set({
                    selected: true
                });
            },

            selected: function() {
                return this.get("selected");
            }
        });

        Entities.NavigationLinkCollection = Backbone.Collection.extend({
            model: Entities.NavigationLink,
            selectedModel: null,
            select: function(model) {
                if (this.selectedModel) {
                    this.selectedModel.set({
                        selected: false
                    });
                }

                this.selectedModel = model;
            }
        });

        var initializeNavigationLinks = function() {
            Entities.navigationLinks = new Entities.NavigationLinkCollection(
                [{
                    name: "Find Festival",
                    url: "festival/search",
                    navigationTrigger: "fesitval:search"
                }]
            );
        };

        var API = {
            getNavigationLinks: function() {
                if (Entities.navigationLinks === undefined) {
                    initializeNavigationLinks();
                }
                return Entities.navigationLinks;
            }
        };

        App.reqres.setHandler("navigation_links:entities", function() {
            return API.getNavigationLinks();
        });
    });

    return;
});
