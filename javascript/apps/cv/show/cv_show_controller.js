define(["app",
    "javascript/apps/cv/show/cv_show_view",
], function(App, View) {
    App.module("CvApp.Show", function(Show, App, Backbone, Marionette, $, _) {
        Show.Controller = Marionette.Controller.extend({
            initialize: function(options) {
                console.log(options);
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


                this.listenTo(this.layout, "show", $.proxy(function() {
                    this.layout.basicsRegion.show(this.basicsView);
                    this.layout.skillsRegion
.show(this.skillsView);
                    


                    this.layout.$el.foundation();
                }, this));

            },

        });
    });
    return App.CvApp.Show.Controller;
});
