define(["app",
        "text!javascript/apps/footer/show/templates/footer_layout.hbs",
        "text!javascript/apps/footer/show/templates/footer_about.hbs"
    ],
    function(App,
        FooterLayoutHbs,
        FooterAboutHbs
    ) {
        App.module("FooterApp.Show.View", function(View, App, Backbone, Marionette, $, _) {

            View.FooterLayout = Marionette.LayoutView.extend({
                template: Handlebars.compile(FooterLayoutHbs),
                regions:{
                    aboutRegion: "#footer-region-about"
                }
            });
            View.FooterAboutView = Marionette.ItemView.extend({
                template: Handlebars.compile(FooterAboutHbs),
            });


        });

        return App.FooterApp.Show.View;
    });
