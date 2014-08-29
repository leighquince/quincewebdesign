define(["app"],
    function(App, Moment) {
        App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
            Entities.Intrest = Backbone.Model.extend({
                defaults: {
                    name: null,
                    keywords: null,

                }
            });

            Entities.IntrestCollection = Backbone.Collection.extend({
                model: Entities.Intrest
            });

            var API = {
                newIntrestEntity: function(intrest) {
                    var model = new Entities.Intrest();
                    model.set({
                        name: intrest.name,
                        keywords: intrest.keywords

                    });

                    return model;
                },

                newIntrestCollection: function(intrests) {

                    var collection = new Entities.IntrestCollection();

                    _.forEach(intrests, function(intrest) {
                        collection.add(API.newIntrestEntity(intrest));
                    });

                    return collection;
                }

            };
            /**
             * Handlers
             */
            App.reqres.setHandler("intrest:entities:new", function(intrests) {
                return API.newIntrestCollection(intrests);
            });
            App.reqres.setHandler("intrest:entity:new", function(intrest) {
                return API.newIntrestEntity(intrest);
            });
        });

        return;
    });
