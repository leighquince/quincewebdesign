define(["app",
        'javascript/entities/basics',
        'javascript/entities/work',
        'javascript/entities/skill',
        'javascript/entities/language',
        'javascript/entities/project',
        'javascript/entities/intrest',
        'javascript/entities/education',
    ],
    function(App) {
        App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
            Entities.Resume = Backbone.Model.extend({
                urlRoot: "resume.json",

                defaults: {
                    basics: null,
                    work: null,
                    volunteer: null,
                    education: null,
                    awards: null,
                    publications: null,
                    skills: null,
                    languages: null,
                    projects: null,
                    intrests: null,
                    refrences: null,

                }
            });
            var API = {
                getResumeEntity: function() {
                    var defer = $.Deferred();
                    App.execute("server:get",
                        "resume.json",
                        null,
                        function(data) {
                            //data = $.parseJSON(data);
                            var resume = new Entities.Resume();
                            resume.set({
                                basics: data.basics ? App.request("basics:entity:new", data.basics) : null,
                                work: data.work ? App.request("work:entities:new", data.work) : null,
                                volunteer: data.volunteer ? App.request("volunteer:entities:new", data.volunteer) : null,
                                education: data.education ? App.request("education:entities:new", data.education) : null,
                                awards: data.awards ? App.request("awards:entities:new", data.awards) : null,
                                publications: data.publications ? App.request("publications:entities:new", data.publications) : null,
                                skills: data.skills ? App.request("skill:entities:new", data.skills) : null,
                                languages: data.languages ? App.request("language:entities:new", data.languages) : null,
                                projects: data.projects ? App.request("project:entities:new", data.projects) : null,
                                intrests: data.intrests ? App.request("intrest:entities:new", data.intrests) : null,
                                refrences: data.references ? App.request("reference:entities:new", data.references) : null,

                            });
                            defer.resolve(resume);
                        },
                        function(data) {
                            defer.reject(data);
                        }
                    );

                    var promise = defer.promise();

                    return promise;
                }
            };

            /**
             * Handlers
             */

            App.reqres.setHandler("resume:entity:get", function() {
                return API.getResumeEntity();
            });
        });

        return;
    });
