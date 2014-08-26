define(["app"],
    function(App) {
        App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
            Entities.Profile = Backbone.Model.extend({
                defaults: {
                    network: null,
                    username: null,
                    url: null,

                }
            });

            Entities.ProfileCollection = Backbone.Collection.extend({
                model: Entities.Profile,
            });
            var API = {
                newProfileEntity: function(profile) {
                    var model = new Entities.Profile();
                    model.set({
                        network: profile.network,
                        username: profile.username,
                        url: profile.url,

                    });

                    return model;
                },

                newProfileCollection: function(profiles) {

                    var collection = new Entities.ProfileCollection();

                    _.forEach(profiles, function(profile) {
                        collection.add(API.newProfileEntity(profile));
                    });

                    return collection;
                }
            };

            /**
             * Handlers
             */

            App.reqres.setHandler("profile:entities:new", function(profiles) {
                return API.newProfileCollection(profiles);
            });
            App.reqres.setHandler("profile:entity:new", function(profile) {
                return API.newProfileEntity(profile);
            });
        });

        return;
    });
