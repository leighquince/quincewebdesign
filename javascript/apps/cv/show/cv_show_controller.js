define(["app",
    "javascript/apps/cv/show/cv_show_view",
], function(App, View) {
    App.module("CvApp.Show", function(Show, App, Backbone, Marionette, $, _) {
        Show.Controller = Marionette.Controller.extend({
            initialize: function(options) {
                this.model = options.model;
                this.layout = new View.Layout();

                this.basicsView = new View.BasicsView({
                    model: this.model.get("basics"),

                });

                this.skillsView = new View.CvCollectionView({
                    childView: View.SkillView,
                    model: new Backbone.Model({
                        section: "Skills"
                    }),
                    collection: this.model.get("skills"),

                });

                this.workView = new View.CvCollectionView({
                    childView: View.WorkView,
                    model: new Backbone.Model({
                        section: "Work"
                    }),
                    collection: this.model.get("work")
                });

                this.projectsView = new View.CvCollectionView({
                    childView: View.ProjectView,
                    model: new Backbone.Model({
                        section: "Projects"
                    }),
                    collection: this.model.get("projects")
                });

                this.educationView = new View.CvCollectionView({
                    childView: View.EducationView,
                    model: new Backbone.Model({
                        section: "Education"
                    }),
                    collection: this.model.get("education")
                });

                this.intrestsView = new View.CvCollectionView({
                    childView: View.IntrestView,
                    model: new Backbone.Model({
                        section: "Interests"
                    }),
                    className: "",
                    collection: this.model.get("interests")
                });

                this.listenTo(this.layout, "show", $.proxy(function() {
                    this.layout.basicsRegion.show(this.basicsView);
                    this.layout.skillsRegion
                        .show(this.skillsView);
                    this.layout.workRegion.show(this.workView);
                    this.layout.projectsRegion.show(this.projectsView);
                    this.layout.educationRegion.show(this.educationView);
                    this.layout.intrestsRegion.show(this.intrestsView);
                    this.layout.$el.foundation();
                }, this));

            },

        });
    });
    return App.CvApp.Show.Controller;
});
