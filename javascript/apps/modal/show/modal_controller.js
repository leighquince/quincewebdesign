define(["app",
    "javascript/apps/modal/show/modal_view"
], function(App, View) {
    App.module("ModalApp.Show", function(Show, App, Backbone, Marionette, $, _) {
        Show.Controller = {

            createModal: function(options) {
                /**
                 * SETUP DEFAULTS
                 */
                var defer = $.Deferred();
                var promise = defer.promise();
                var options = options || {};

                var _title = typeof options.title !== undefined ? options.title : "modal_title";
                var _content = typeof options.content !== undefined ? options.content : "modal_content";
                var _contentView = typeof options.contentView !== undefined ? options.contentView : false;
                var _cancel = typeof options.cancel !== undefined ? options.cancel : false;
                var _confirm = typeof options.confirm !== undefined ? options.confirm : true;
                var _confirmDoNotRemind = typeof options.confirmDoNotRemind !== undefined ? options.confirmDoNotRemind : false;
                var _userSettingKey = typeof options.userSettingKey !== undefined ? options.userSettingKey : false;

                //if a userSetting key has been provided (in this case a key for storing do not remind me) and it is set to true return true 
                if (_userSettingKey) {
                    var userSetting = App.request("user_setting:entity:get", _userSettingKey);
                    if (userSetting instanceof Backbone.Model && userSetting.get("value")) {
                        return true;
                    }
                }

                var layout = new View.Layout();

                var titleView = new View.Title({
                    model: new Backbone.Model({
                        modalTitle: _title
                    })
                });

                var contentView;
                //If the content has been provided as a view and data, init the view with the data
                //else use the default view
                if (_contentView) {
                    contentView = new _contentView(_content);
                } else {
                    contentView = new View.Content({
                        model: new Backbone.Model({
                            message: _content
                        })
                    });
                }
                if (!_cancel && !_confirm && !_confirmDoNotRemind) {
                    //throw new Error("Modal has not been given anway to close");
                    console.log("no exit found, hope you have programmed your own");
                }
                var footerView = new View.Footer({
                    model: new Backbone.Model({
                        cancel: _cancel,
                        confirm: _confirm,
                        confirmDoNotRemind: _confirmDoNotRemind
                    })
                });

                layout.on("show", function() {
                    layout.titleRegion.show(titleView);
                    layout.contentRegion.show(contentView);
                    layout.actionRegion.show(footerView);
                    $('#modal-window').modal();
                });

                App.ModalApp.on('modal:cancel', function() {
                    removeModal();
                    defer.reject();
                });

                App.ModalApp.on('modal:confirm', function() {
                    removeModal();
                    defer.resolve();
                });

                App.ModalApp.on('modal:confirm:no_remind', function() {
                    removeModal();
                    App.request("user_setting:entity:add", options.userSettingKey, true);
                    defer.resolve();
                });

                removeModal = function() {
                    $(".modal-backdrop").remove();
                    App.ModalApp.unbind();
                    App.dialogRegion.close();

                };

                App.dialogRegion.show(layout);

                return promise;
            },

        };

    });
    return App.ModalApp.Show.Controller;
});