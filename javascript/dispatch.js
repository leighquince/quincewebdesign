(function(ua, w, d, undefined) {
  // App Environment
  // ---------------
  // Set to true to turn on "production" mode
  var production = false,
    config = {
      // Loaded when not in production mode
      "dev-css": ["css/master-style.css"],
      // Loaded when in production mode
      "prod-css": ["css/festival-styles.min.css"],
      // Loaded when not in production mode
      "dev-js": [{
        "data-main": "javascript/require_main",
        "src": "bower_components/require/build/require.js"
      }],
      // Loaded when in production mode
      "prod-js": ["javascript/distro/festival-built.js"]
    };
  // Loads the correct CSS and JavaScript files
  loadFiles(config);

  function loadCSS(urls, callback) {
    var x, link;
    for (x = 0; x <= urls.length - 1; x += 1) {
      link = d.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = urls[x];
      d.getElementsByTagName("head")[0].appendChild(link);
    }
    if (callback) callback();
  }

  function loadJS(files, callback) {
    var x, script, file;
    for (x = 0; x <= files.length - 1; x += 1) {
      file = files[x];
      script = d.createElement("script");
      if (((typeof file).toLowerCase()) === "object" && file["data-main"] !== undefined) {
        script.setAttribute("data-main", file["data-main"]);
        script.setAttribute("type", "application/javascript");
        script.async = true;
        script.src = file.src;
      } else {
        script.src = file;
      }
      d.getElementsByTagName("head")[0].appendChild(script);
    }
    if (callback) callback();
  }

  function loadFiles(obj, callback) {
    if (production) {
      // Loads the production CSS file(s)
      loadCSS(obj["prod-css"], function() {
        // If there are production JavaScript files to load
        if (obj["prod-js"]) {
          // Loads the correct initialization file (which includes Almond.js)
          loadJS(obj["prod-js"], callback);
        }
      });
    }
    // Else if your app is in development mode
    else {
      // Loads the development CSS file(s)
      loadCSS(obj["dev-css"], function() {
        // If there are development Javascript files to load
        if (obj["dev-js"]) {
          // Loads Require.js and tells Require.js to find the correct intialization file
          loadJS(obj["dev-js"], callback);
        }
      });
    }
  }
})(navigator.userAgent || navigator.vendor || window.opera, window, window.document);
