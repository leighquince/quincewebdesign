define(["app", ], function(App) {
    App.module("Server", function(Server, App, Backbone, Marionette, $, _) {

        Server.startWithParent = true;

        Server.onStart = function() {
            console.log("starting server");
        };

        Server.onStop = function() {
            console.log("stopping server");
        };

        var API = {
            sendCommand: function(url, method, parameters, successCallback, errorCallback, completeCallback) {
                $.ajax({
                    url: url,
                    dataType: "json",
                    data: parameters,
                    type: method,
                    success: function(data, textStatus, jqXHR) {
                        successCallback && successCallback(data, textStatus, jqXHR);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        errorCallBack && errorCallback({
                            "result_type": Server.RESULT_TYPE_ERROR,
                            "error": jqXHR.responseText,
                            "jqXHR": jqXHR,
                            "textStatus": textStatus,
                            "errorThrown": errorThrown
                        });

                    },
                    complete: function(jqXHR, textStatus) {
                        completeCallback && completeCallback(jqXHR, textStatus);
                    }
                });
            },

        };

        App.commands.setHandler("server:post", function(url, parameters, successCallback, errorCallback) {
            API.sendCommand(url, "POST", parameters, successCallback, errorCallback);
        });

        App.commands.setHandler("server:get", function(url, parameters, successCallback, errorCallback) {
            API.sendCommand(url, "GET", parameters, successCallback, errorCallback);
        });

        App.commands.setHandler("server:put", function(url, parameters, successCallback, errorCallback) {
            API.sendCommand(url, "PUT", parameters, successCallback, errorCallback);
        });

        App.commands.setHandler("server:delete", function(url, parameters, successCallback, errorCallback) {
            API.sendCommand(url, "DELETE", parameters, successCallback, errorCallback);
        });

        App.commands.setHandler("server:custom", function(url, parameters, successCallback, errorCallback, call) {
            API.sendCommand(url, call, parameters, successCallback, errorCallback);
        });

    });

    return App.Server;
});
