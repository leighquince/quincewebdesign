define(["app",
    "javascript/apps/footer/show/footer_show_view",
], function(App, View) {
    App.module("FooterApp.Show", function(Show, App, Backbone, Marionette, $, _) {
        Show.Controller = Marionette.Controller.extend({
            initialize: function() {
                this.layout = new View.FooterLayout();
                this.aboutView = new View.FooterAboutView();

                this.listenTo(this.layout,"show", $.proxy(function(){
                    this.layout.aboutRegion.show(this.aboutView);
                }, this));
            },

            getMainView: function(){
                return this.layout;
            }
        });
    });
    return App.FooterApp.Show.Controller;
});
