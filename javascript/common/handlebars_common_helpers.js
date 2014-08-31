define(["app",
    "moment"
], function(App, Moment) {
    App.module("Common.HbsHelpers", function(HbsHelpers, App, Backbone, Marionette, $, _) {


        //registers
        Handlebars.registerHelper('HB_momentFormatDate', function(context, options) {
            if (context === null) {
                return "Now";
            }



            return context.format("MMM YYYY");

        });


    });
    return App.Common.HbsHelpers;
});
