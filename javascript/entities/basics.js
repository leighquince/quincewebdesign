define(["app",
        "javascript/entities/location",
        "javascript/entities/profile"
    ],
    function(App) {
        App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
            Entities.Basics = Backbone.Model.extend({
                defaults: {
                    name: null,
                    label: null,
                    picture: null,
                    email: null,
                    phone: null,
                    website: null,
                    summary: null,
                    location: null,
                    profiles: null,

                }
            });
            var API = {
                newBasicsEntity: function(basics) {
                    var model = new Entities.Basics();
                    model.set({
                        section: "Me",
                        name: basics.name,
                        label: basics.label,
                        picture: basics.picture,
                        email: basics.email,
                        phone: basics.phone,
                        website: basics.website,
                        summary: basics.summary,
                        location: basics.location ? App.request("location:entity:new", basics.location) : null,
                        profiles: App.request("profile:entities:new", basics.profiles),
                    });

                    return model;
                }
            };

            /**
             * Handlers
             */

            App.reqres.setHandler("basics:entity:new", function(basics) {
                return API.newBasicsEntity(basics);
            });
        });

        return;
    });
