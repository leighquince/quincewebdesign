define(["app", 'moment'],
    function(App, Moment) {
        App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
            Entities.Festival = Backbone.Model.extend({
                urlRoot: "api/festivals",

                defaults: {
                    name: "",
                    location: "",
                    start: "",
                    end: "",
                    now: function() {
                        return Math.random();
                    }

                }
            });

            // Entities.configureStorage(Entities.TaskType);

            Entities.FestivalCollection = Backbone.Collection.extend({
                url: "api/festivals",
                model: Entities.Festival,
                comparator: "severity"
            });

            // Entities.configureStorage(Entities.TaskTypeCollection);

            var initializeFestivals = function() {
                if (Entities.festivals === undefined) {
                    Entities.festivals = new Entities.FestivalCollection();
                }
            };

            var API = {
                festivalSearchEntities: function(criteria) {
                    var defer = $.Deferred();

                    App.execute("server:get",
                        "/api/festivals",
                        null,
                        function(data) {
                            var festivalCollection = API.festivalNewEntities();

                            data.forEach(function(festival) {
                                festivalCollection.add(API.festivalNewEntity(festival));
                            });
                            defer.resolve(festivalCollection);
                        },
                        function(data) {
                            defer.reject(data);
                        }
                    );

                    var promise = defer.promise();

                    return promise;
                },


                festivalNewEntities: function(festivals) {
                    return new App.Entities.FestivalCollection(festivals);
                },

                festivalNewEntity: function(festival) {
                    return new App.Entities.Festival(festival)
                }
            };

            /**
             * Handlers
             */

            App.reqres.setHandler("festival:search:entities", function(criteria) {
                return API.festivalSearchEntities(criteria);
            });

            App.reqres.setHandler("festival:get:entity", function(id) {
                return API.getInstallationEntity(id);
            });

            App.reqres.setHandler("festival:new:entity", function(festival) {
                return API.festivalNewEntity(festival);
            });

            App.reqres.setHandler("festival:new:entities", function(festivals) {

                return API.festivalNewEntities(festivals);
            });
        });

        return;
    });