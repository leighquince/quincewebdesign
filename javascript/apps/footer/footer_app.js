define(["app"],
    function(App) {
        App.module("FooterApp", function(FooterApp, App, Backbone, Marionette, $, _) {

            FooterApp.startSubApp = function(appName, args) {
                var currentApp = appName ? App.module(appName) : null;
                if (FooterApp.currentApp === currentApp) {
                    return;
                }

                if (FooterApp.currentApp) {
                    FooterApp.currentApp.destroy();
                }
                FooterApp.currentApp = new currentApp.Controller(args);
                return FooterApp.currentApp;

            };
        });

        App.module("Routers.FooterApp", function(FooterAppRouter, Domoadmin, Backbone, Marionette, $, _) {

            FooterAppRouter.Router = Marionette.AppRouter.extend({
                appRoutes: {

                }
            });


            var executeAction = function(appName, arg) {
                App.startSubApp("FooterApp");
                return App.FooterApp.startSubApp(appName, arg);

            };
            var API = {
                footerShow: function(options) {
                    require(["javascript/apps/footer/show/footer_show_controller"],
                        function(ShowController) {
                            var showController = executeAction("FooterApp.Show", options);
                            App.footerRegion.show(showController.getMainView());


                        });
                },
            };

            /**
             * listeners
             * @param  {[type]} criertia [description]
             * @return {[type]}          [description]
             */
            App.on("footer:show", function() {
                API.footerShow();
            });



            App.addInitializer(function() {
                new FooterAppRouter.Router({
                    controller: API
                });
            });


        });

        return App.FooterApp;
    });
