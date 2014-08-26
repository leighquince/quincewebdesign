define(["app"],
    function(App) {
        App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
            Entities.Language = Backbone.Model.extend({
                defaults: {
                    language: null,
                    fluency: null,

                }
            });

            Entities.LanguageCollection = Backbone.Collection.extend({
                model: Entities.Language
            });

            var API = {
                newLanguageEntity: function(language) {
                    var model = new Entities.Language();
                    model.set({
                        language: language.language,
                        fluency: language.fluency,

                    });

                    return model;
                },

                newLanguageCollection: function(languages) {

                    var collection = new Entities.LanguageCollection();

                    _.forEach(languages, function(language) {
                        collection.add(API.newLanguageEntity(language));
                    });

                    return collection;
                }

            };
            /**
             * Handlers
             */
            App.reqres.setHandler("language:entities:new", function(languages) {
                return API.newLanguageCollection(languages);
            });
            App.reqres.setHandler("language:entity:new", function(language) {
                return API.newLanguageEntity(language);
            });
        });

        return;
    });
