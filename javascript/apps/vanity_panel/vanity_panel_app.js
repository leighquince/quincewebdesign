define(["app",
        "javascript/apps/vanity_panel/show/vanity_panel_show_controller"
    ],
    function(App, ShowController) {
        App.module("VanityPanelApp", function(VanityPanelApp, App, Backbone, Marionette, $, _) {
            var API = {
                showVanityPanel: function(model) {
                    var showController = new ShowController({
                        model: model
                    });

                    App.vanityRegion.show(showController.layout);
                }

            };


            App.on("vanity_panel:show", function(model) {
                API.showVanityPanel(model);
            });
        });
        return App.VanityPanelApp;
    });
