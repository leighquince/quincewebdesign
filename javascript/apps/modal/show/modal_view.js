define(["app",
    "text!javascript/apps/modal/show/templates/layout.hbs",
    "text!javascript/apps/modal/show/templates/title_view.hbs",
    "text!javascript/apps/modal/show/templates/footer_view.hbs",
    "text!javascript/apps/modal/show/templates/content_view.hbs",

], function(App, LayoutHbs, TitleViewHbs, FooterViewHbs, ContentViewHbs) {
    App.module("ModalApp.Show.View", function(View, App, Backbone, Marionette, $, _) {
        View.Layout = Marionette.Layout.extend({
            template: Handlebars.compile(LayoutHbs),
            regions: {
                titleRegion: "#modal-title-region",
                contentRegion: "#modal-content-region",
                actionRegion: "#modal-action-region"
            },

        });

        View.Title = Marionette.ItemView.extend({
            template: Handlebars.compile(TitleViewHbs),

        });

        View.Content = Marionette.ItemView.extend({
            template: Handlebars.compile(ContentViewHbs),

        });

        View.Footer = Marionette.ItemView.extend({
            template: Handlebars.compile(FooterViewHbs),
            events: {
                "click .js-cancel": "cancel",
                "click .js-confirm": "confirm",
                "click .js-confirm-no-remind": "confirmNoRemind",
            },

            cancel: function() {
                App.ModalApp.trigger("modal:cancel");

            },

            confirm: function() {
                App.ModalApp.trigger("modal:confirm");

            },

            confirmNoRemind: function() {
                App.ModalApp.trigger("modal:confirm:no_remind");

            },

        });

    });
    return App.ModalApp.Show.View;
});