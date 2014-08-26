define(["app"], function(App) {
    App.module("Common.BackbonePatches", function(BackbonePatches, App, Backbone, Marionette, $, _) {

        Backbone.Model.prototype.toJSON = function() {
            var json = _.clone(this.attributes);
            for (var attr in json) {
                if ((json[attr] instanceof Backbone.Model) || (json[attr] instanceof Backbone.Collection)) {
                    json[attr] = json[attr].toJSON();
                }
            }
            return json;
        };

    });

    return App.Common.BackbonePatches;
});
