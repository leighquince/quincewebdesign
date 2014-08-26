define(["app", 'moment'],
    function(App, Moment) {
        App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
            Entities.Work = Backbone.Model.extend({
                defaults: {
                    company: null,
                    position: null,
                    website: null,
                    startDate: null,
                    endDate: null,
                    summary: null,
                    highlights: null,

                }
            });

            Entities.WorkCollection = Backbone.Collection.extend({
                model: Entities.Work
            });

            var API = {
                newWorkEntity: function(work) {
                    var model = new Entities.Work();
                    model.set({
                        company: work.company,
                        position: work.position,
                        website: work.website,
                        startDate: work.startDate ? new Moment(work.startDate, "YYYY-MM-DD") : null,
                        endDate: work.endDate ? new Moment(work.endDate, "YYYY-MM-DD") : null,
                        summary: work.summary,
                        highlights: work.highlights,

                    });

                    return model;
                },

                newWorkCollection: function(works) {

                    var collection = new Entities.WorkCollection();

                    _.forEach(works, function(work) {
                        collection.add(API.newWorkEntity(work));
                    });

                    return collection;
                }

            };
            /**
             * Handlers
             */
            App.reqres.setHandler("work:entities:new", function(works) {
                return API.newWorkCollection(works);
            });
            App.reqres.setHandler("work:entity:new", function(work) {
                return API.newWorkEntity(work);
            });
        });

        return;
    });
