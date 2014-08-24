define(["app",
        "javascript/apps/cv/show/cv_show_controller"
    ],
    function(App, ShowController) {
        App.module("CvApp", function(CvApp, App, Backbone, Marionette, $, _) {
            var API = {};
            CvApp.on("start", function() {
                CvApp.showController = new ShowController();
            });
        });
        return App.CvApp;
    });
