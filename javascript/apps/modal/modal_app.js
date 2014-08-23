define(["app",
    "javascript/apps/modal/show/modal_controller"
], function(App, ShowController) {
    App.module("ModalApp", function(ModalApp, App, Backbone, Marionette, $, _) {
        var API = {
            createModal: function(options) {
                return ShowController.createModal(options);
            },

        };

        App.reqres.setHandler("modal:show", function(options) {
            return API.createModal(options);
        });
    });

    return App.ModalApp;
});