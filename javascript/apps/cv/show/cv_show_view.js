define(["app",
        "text!javascript/apps/cv/show/templates/cv_layout.hbs",
        "text!javascript/apps/cv/show/templates/cv_basics.hbs",
        "text!javascript/apps/cv/show/templates/cv_collection.hbs",
        "text!javascript/apps/cv/show/templates/cv_skill.hbs",
        "text!javascript/apps/cv/show/templates/cv_work.hbs",
        "text!javascript/apps/cv/show/templates/cv_project.hbs",
        "text!javascript/apps/cv/show/templates/cv_education.hbs",
        "text!javascript/apps/cv/show/templates/cv_intrest.hbs",
    ],
    function(App,
        CvLayoutHbs,
        CvBasicsHbs,
        CvCollectionHbs,
        CvSkillHbs,
        CvWorkHbs,
        CvProjectHbs,
        CvEducationHbs,
        CvIntrestHbs
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
                template: Handlebars.compile(CvWorkHbs),
                className: "large-12 columns cv-work-item"
            });

            View.EducationView = Marionette.ItemView.extend({
                template: Handlebars.compile(CvEducationHbs),
                className: "large-12 columns cv-education-item"
            });

            View.ProjectView = Marionette.ItemView.extend({
                template: Handlebars.compile(CvProjectHbs),
                className: "large-12 columns cv-projects-item"
            });

            View.IntrestView = Marionette.ItemView.extend({
                template: Handlebars.compile(CvIntrestHbs),
                className: "cv-intrests-item"
            });
        });

        return App.CvApp.Show.View;
    });
