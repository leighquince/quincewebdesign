define(["app", 'moment'],
    function(App, Moment) {
        App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
            Entities.Education = Backbone.Model.extend({
                defaults: {
                    institution: null,
                    studyType: null,
                    startDate: null,
                    endDate: null,
                    gpa: null,
                    courses: null,
                }
            });

            Entities.EducationCollection = Backbone.Collection.extend({
                model: Entities.Education
            });

            var API = {
                newEducationEntity: function(education) {
                    var model = new Entities.Education();
                    model.set({
                        institution: education.institution,
                        studyType: education.studyType,
                        startDate: education.startDate ? new Moment(education.startDate, "YYYY-MM-DD") : null,
                        endDate: education.startDate ? new Moment(education.startDate, "YYYY-MM-DD") : null,
                        gpa: education.gpa,
                        courses: education.courses,

                    });

                    return model;
                },

                newEducationCollection: function(educations) {

                    var collection = new Entities.EducationCollection();

                    _.forEach(educations, function(education) {
                        collection.add(API.newEducationEntity(education));
                    });

                    return collection;
                }

            };
            /**
             * Handlers
             */
            App.reqres.setHandler("education:entities:new", function(educations) {
                return API.newEducationCollection(educations);
            });
            App.reqres.setHandler("education:entity:new", function(education) {
                return API.newEducationEntity(education);
            });
        });

        return;
    });
