define(["app"],
    function(App) {
        App.module("CvApp", function(CvApp, App, Backbone, Marionette, $, _) {

            CvApp.startSubApp = function(appName, args) {
                var currentApp = appName ? App.module(appName) : null;
                if (CvApp.currentApp === currentApp) {
                    return;
                }

                if (CvApp.currentApp) {
                    CvApp.currentApp.destroy();
                }
                CvApp.currentApp = new currentApp.Controller(args);
                return CvApp.currentApp;

            };
        });

        App.module("Routers.CvApp", function(CvAppRouter, Domoadmin, Backbone, Marionette, $, _) {

            CvAppRouter.Router = Marionette.AppRouter.extend({
                appRoutes: {

                }
            });


            var executeAction = function(appName, arg) {
                App.startSubApp("CvApp");
                return App.CvApp.startSubApp(appName, arg);

            };
            var API = {
                cvShow: function(options) {
                    require(["javascript/apps/cv/show/cv_show_controller"],
                        function(ShowController) {
                            var showController = executeAction("CvApp.Show", options);

                            App.mainRegion.show(showController.getMainView());


                        });
                },
            };

            /**
             * listeners
             * @param  {[type]} criertia [description]
             * @return {[type]}          [description]
             */
            App.on("cv:show", function(model) {
                //App.navigate("cv");
                API.cvShow({
                    model: model
                });
            });



            App.addInitializer(function() {
                new CvAppRouter.Router({
                    controller: API
                });
            });


        });

        return App.CvApp;
    });
