define(["app"],
    function(App) {
        App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
            Entities.Location = Backbone.Model.extend({
                defaults: {
                    address: null,
                    postalCode: null,
                    city: null,
                    countryCode: null,
                    region: null,
                    country: null,

                }
            });

            var API = {
                newLocationEntity: function(location) {
                    var model = new Entities.Location();
                    model.set({
                        address: location.address,
                        postalCode: location.postalCode,
                        city: location.city,
                        countryCode: location.countryCode,
                        region: location.region,
                        country: location.country,

                    });

                    return model;
                },

            };
            /**
             * Handlers
             */
            App.reqres.setHandler("location:entity:new", function(location) {
                return API.newLocationEntity(location);
            });
        });

        return;
    });
