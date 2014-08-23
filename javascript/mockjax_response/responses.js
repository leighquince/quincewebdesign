require(['faker'], function(Faker) { //reponses for mockjax when testing ajax calls

    $.mockjaxSettings.contentType = 'text/json';

    // $.mockjaxSettings.throwUnmocked = true;

    /*********************************************************************************************************************
     *  											Data Helpers - Thank you faker.js
     ********************************************************************************************************************/
    var numberOfObjects = 100;
    var itemsPerPage = 30;


    /**
     * HELPER FUNCTIONS
     */

    getCamelCaseResourseName = function(resourceName) {
        if (resourceName.indexOf("_") > -1) {
            var index = 0;
            var resourceParts = resourceName.split("_");

            while (index < resourceParts.length) {
                if (index > 0) {
                    resourceName += resourceParts[index].charAt(0).toUpperCase() + resourceParts[index].slice(1);
                } else {
                    resourceName = resourceParts[index];
                }

                index++;
            }
        }

        return resourceName;
    };

    findItemById = function(array, id) {
        if (id) {
            for (var index in array) {
                if (array[index].id == id) {
                    return array[index];
                }
            }
        }
        return null;
    };

    findIndexById = function(array, id) {
        for (var index in array) {
            if (array[index].id == id) {
                return index;
            }
        }

        return null;
    };

    returnArray = function(array) {
        var returnArray = [];
        for (var index in array) {
            if (array[index] !== null) {
                returnArray.push(array[index]);
            }
        }

        return returnArray;
    };
    isCriteriaInObject = function(object, criteria) {
        var inObject = false;
        for (var key in object) {
            if (_.isObject(object[key])) {
                inObject = isCriteriaInObject(object[key], criteria);
                if (inObject) {
                    return true;
                }
            } else {
                if (_.isString(object[key]) && object[key].indexOf(criteria) > -1) {
                    return true;
                }
            }
        }

        return false;

    };

    findItemByCriteria = function(array, criteria) {
        var returnArray = [];
        array.forEach(function(item) {
            var inSearch = isCriteriaInObject(item, criteria);
            if (inSearch) {
                returnArray.push(item);
            }
        });

        return returnArray;

    };

    /*********************************************************************************************************************
     *                                  GENERIC REQUESTS
     *                      ATTEMPS TO MATCH ANY api/{resource} or
     *                      api/{resources}/{id} and return if more
     *                      specific actions are required please create
     *                      a custom route above
     ********************************************************************************************************************/

    //get resouce i.e customers
    $.mockjax({
        url: /^api\/([\w]+)$/,
        type: 'GET',
        urlParams: ['resource'],
        response: function(settings) {
            var resource = settings.urlParams.resource;
            var resourceName = getCamelCaseResourseName(resource);
            this.responseText = {
                result_type: 'success',
            };

            if (window[resourceName] === undefined) {
                this.status = 200;
                this.responseText = {
                    result_type: 'error',
                    error: "Unable to locate resource " + resourceName + " have you set up a route for it?"
                };
            } else {
                var hasSettings = settings.data === null || settings.data === undefined;
                var page = hasSettings ? 0 : settings.data.page - 1 || 0;
                var loadFrom = hasSettings ? 0 : page * itemsPerPage;
                var loadTo = hasSettings ? window[resourceName].length : loadFrom + itemsPerPage;
                var sortProp = hasSettings ? "id" : settings.data.sortProp;

                if (_.isObject(window[resourceName][0][sortProp])) {
                    sortProp = sortProp + ".id";
                }
                this.responseText[resourceName] = _.sortBy(window[resourceName].slice(loadFrom, loadTo), sortProp);
                // console.log(this.responseText[resourceName]);
            }

        }

    });

    //get specific resource i.e customer/1
    $.mockjax({
        url: /^api\/([\w]+)\/([\d]+)$/,
        type: 'GET',
        urlParams: ['resource', 'resourceId'],
        response: function(settings) {
            var resource = settings.urlParams.resource;
            var resourceId = settings.urlParams.resourceId;
            var resourceName = getCamelCaseResourseName(resource);
            var returnResourceName = resourceName;

            if (returnResourceName.substring(0, returnResourceName.length - 3) === "ies") {
                returnResourceName = returnResourceName.substring(0, returnResourceName.length - 3);
                returnResourceName += "y";
            } else {
                returnResourceName = returnResourceName.substring(0, returnResourceName.length - 1);
            }

            this.responseText = {
                result_type: 'success',
            };
            this.responseText[returnResourceName] = findItemById(window[resourceName], resourceId);

            if (window[resourceName] === undefined) {
                this.status = 200;
                this.responseText = {
                    result_type: 'error',
                    error: "Unable to locate resource " + resourceName + " have you set up a route for it?"
                };
            }
        }
    });

    //serach through a resource i.e customers/{{last name of a customer}}
    $.mockjax({
        url: /^api\/([\w]+)\/search\/([\w]+)$/,
        type: 'GET',
        urlParams: ['resource', 'criterion'],
        response: function(settings) {
            var resource = settings.urlParams.resource;
            var criterion = settings.urlParams.criterion;
            var resourceName = getCamelCaseResourseName(resource);

            this.responseText = {
                result_type: 'success',
            };
            this.responseText[resourceName] = findItemByCriteria(window[resourceName], criterion);

            if (window[resourceName] === undefined) {
                this.status = 200;
                this.responseText = {
                    result_type: 'error',
                    error: "Unable to locate resource " + resourceName + " have you set up a route for it?"
                };
            }
        }
    });

    //update specfic resource
    $.mockjax({
        url: /^api\/([\w]+)\/([\d]+)$/,
        type: 'POST',
        urlParams: ['domoadmin', 'resource', 'resourceId'],
        response: function(settings) {
            var resource = settings.urlParams.resource;
            var resourceId = settings.urlParams.resourceId;
            var resourceName = getCamelCaseResourseName(resource);
            var returnResourceName = resourceName;

            if (returnResourceName.substring(0, returnResourceName.length - 3) === "ies") {
                returnResourceName = returnResourceName.substring(0, returnResourceName.length - 3);
                returnResourceName += "y";
            } else {
                returnResourceName = returnResourceName.substring(0, returnResourceName.length - 1);
            }

            this.responseText = {
                result_type: 'success',
            };

            if (window[resourceName] === undefined) {
                this.status = 200;
                this.responseText = {
                    result_type: 'error',
                    error: "Unable to locate resource " + resourceName + " have you set up a route for it?"
                };
            } else {

                var object = findItemById(window[resourceName], resourceId);
                if (object) {
                    object = settings.data;
                }

                this.responseText[returnResourceName] = object;
                console.log(object);
            }
        }
    });

});