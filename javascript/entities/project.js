define(["app", 'moment'],
    function(App, Moment) {
        App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
            Entities.Project = Backbone.Model.extend({
                defaults: {
                    name: null,
                    startDate: null,
                    endDate: null,
                    website: null,
                    highlights: null,

                }
            });

            Entities.ProjectCollection = Backbone.Collection.extend({
                model: Entities.Project
            });

            var API = {
                newProjectEntity: function(project) {
                    var model = new Entities.Project();
                    model.set({
                        name: project.name,
                        startDate: project.startDate ? new Moment(project.startDate, "YYYY-MM-DD") : null,
                        endDate: project.endDate ? new Moment(project.endDate, "YYYY-MM-DD") : null,
                        website: project.website,
                        highlights: project.highlights,

                    });

                    return model;
                },

                newProjectCollection: function(projects) {

                    var collection = new Entities.ProjectCollection();

                    _.forEach(projects, function(project) {
                        collection.add(API.newProjectEntity(project));
                    });

                    return collection;
                }

            };
            /**
             * Handlers
             */
            App.reqres.setHandler("project:entities:new", function(projects) {
                return API.newProjectCollection(projects);
            });
            App.reqres.setHandler("project:entity:new", function(project) {
                return API.newProjectEntity(project);
            });
        });

        return;
    });
