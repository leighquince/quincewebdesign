define(["app",
      "text!javascript/apps/navigation/list/templates/navigation_list.hbs",
      "text!javascript/apps/navigation/list/templates/navigation_list_item.hbs"
   ],
   function(App, NavigationListHbs, NavigationListItemHbs) {
      App.module("NavigationApp.List.View", function(View, App, Backbone, Marionette, $, _) {
         View.NavigationLink = Marionette.ItemView.extend({

            template: Handlebars.compile(NavigationListItemHbs),
            tagName: "li",

            events: {
               "click a": "navigate"
            },

            navigate: function(e) {
               e.preventDefault();
               this.trigger("navigate", this);
            },

            onRender: function() {
               if (this.model.selected) {
                  // add class so Bootstrap will highlight the active entry in the sidebar
                  this.$el.addClass("active");
               }

            }
         });

         View.NavigationLinks = Marionette.CompositeView.extend({
            template: Handlebars.compile(NavigationListHbs),
            childView: View.NavigationLink,
            childViewContainer: "ul#navigation-list-hook-js",
            onBeforeRender:function(){
               console.log(this.el);
            }
         });
      });

      return App.NavigationApp.List.View;
   });