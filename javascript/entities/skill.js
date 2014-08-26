define(["app"],
    function(App) {
        App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
            Entities.Skill = Backbone.Model.extend({
                defaults: {
                    name: null,
                    level: null,
                    keywords: null,

                }
            });

            Entities.SkillCollection = Backbone.Collection.extend({
                model: Entities.Skill
            });

            var API = {
                newSkillEntity: function(skill) {
                    var model = new Entities.Skill();
                    model.set({
                        name: skill.name,
                        level: skill.level,
                        keywords: skill.keywords

                    });

                    return model;
                },

                newSkillCollection: function(skills) {

                    var collection = new Entities.SkillCollection();

                    _.forEach(skills, function(skill) {
                        collection.add(API.newSkillEntity(skill));
                    });

                    return collection;
                }

            };
            /**
             * Handlers
             */
            App.reqres.setHandler("skill:entities:new", function(skills) {
                return API.newSkillCollection(skills);
            });
            App.reqres.setHandler("skill:entity:new", function(skill) {
                return API.newSkillEntity(skill);
            });
        });

        return;
    });
