define(["app", ],
    function(App) {
        App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
            Entities.Search = Backbone.Model.extend({
                defaults: {
                    criteria: "",
                }
            });

            var API = {
                searchEntityNew: function(search) {
                    return new App.Entities.Search(search);

                },
            };

            /**
             * Handlers
             */
            App.reqres.setHandler("search:entity:new", function(search) {
                return API.searchEntityNew(search);
            });


        });

        return;
    });