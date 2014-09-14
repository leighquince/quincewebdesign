define(["app", "chart"], function(App) {
    App.module("Common.MarionettePatches", function(MarionettePatches, App, Backbone, Marionette, $, _) {

        //A view to render 1 chart.js chart
        Marionette.ChartView = Marionette.ItemView.extend({

            //default options
            options: {
                width: 350,
                height: 250,
                chartOptions: {},
                chartData: {},
                chartType: "Line"
            },

            initialize: function(options) {

                this.options = _.extend(this.options, options);

                var canvas = document.createElement("canvas");

                canvas.setAttribute("width", this.options.width);
                canvas.setAttribute("height", this.options.height);

                this.$el.append(canvas);
                this.chart = new Chart(canvas.getContext("2d"))[this.options.chartType](this.options.chartData, this.options.chartOptions);

            },

            //override render as don't actually want it to use a template as this should just be a graph
            render: function(){
                return this;
            }

        });

    });

    return App.Common.MarionettePatches;
});
