define(["app",
        "text!javascript/apps/cv/show/templates/cv_layout.hbs",
        "text!javascript/apps/cv/show/templates/cv_basics.hbs",
        "text!javascript/apps/cv/show/templates/cv_collection.hbs",
        "text!javascript/apps/cv/show/templates/cv_skill.hbs",
    ],
    function(App,
        CvLayoutHbs,
        CvBasicsHbs,
        CvCollectionHbs,
        CvSkillHbs
    ) {
        App.module("CvApp.Show.View", function(View, App, Backbone, Marionette, $, _) {

            View.Layout = Marionette.LayoutView.extend({
                template: Handlebars.compile(CvLayoutHbs),
                className: "cv-layout",
                regions: {
                    basicsRegion: "#resume-basics-region",
                    skillsRegion: "#resume-skills-region",
                    workRegion: "#resume-work-region",
                    educationRegion: "#resume-education-region",
                    projectsRegion: "#resume-projects-region",
                    intrestsRegion: "#resume-intrests-region",
                }

            });

            View.BasicsView = Marionette.ItemView.extend({
                template: Handlebars.compile(CvBasicsHbs),

            });

            View.CvCollectionView = Marionette.CompositeView.extend({
                sort: false,
                template: Handlebars.compile(CvCollectionHbs),
                childViewContainer: ".collection-hook",

            });

            View.SkillView = Marionette.ItemView.extend({
                template: Handlebars.compile(CvSkillHbs),
                initialize: function() {
                    this.$el.attr("data-equalizer", "");
                }


            });

            View.WorkView = Marionette.ItemView.extend({
                template: Handlebars.compile(CvBasicsHbs),

            });


            View.EducationView = Marionette.ItemView.extend({
                template: Handlebars.compile(CvBasicsHbs),

            });


            View.ProjectView = Marionette.ItemView.extend({
                template: Handlebars.compile(CvBasicsHbs),

            });


            View.IntrestView = Marionette.ItemView.extend({
                template: Handlebars.compile(CvBasicsHbs),

            });


        });

        return App.CvApp.Show.View;
    });
