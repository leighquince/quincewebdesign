//JSHint ignore//
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      taskName: {
        src: 'test/src/**/*.js',
        options: {
          specs: 'test/spec/*Spec.js',
          helpers: 'test/spec/*Helper.js',
          //host: 'http://127.0.0.1:8000/',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: 'javascript/require_main.js'
          }
        }
      }
    },
    manifest: {
      generate: {
        options: {
          basePath: 'build',
          cache: ['images/*.*', 'css/*.css', 'fonts/*.*', 'javascript/*.*', ],
          network: ['http://*', 'https://*'],
          preferOnline: true,
          verbose: true,
          timestamp: true,
          hash: true,
          master: ['../index.html']
        },
        src: ['some_files/*.html', 'js/*.min.js', 'css/*.css'],
        dest: 'manifest.appcache'
      }
    },
    //task runner for minifying each of the pages JS and css  
    requirejs: {
      compileDashboard: {
        options: {
          // This tells the require optimiser where out application starts. Normally this file loads all the dependencies itself but this will be entry point for the optimised file
          name: 'javascript/require_main',
          // This is where the optimised file should be built to. This becomes the file that includes all the above modules and libraries
          out: 'build/javascript/qwd-built.js',
          // Without this the requireJS optimiser will not look formodules or libraries used within other modules. Without it the optimised application will still rely on HTTP requests to load modules or libraries
          findNestedDependencies: true,
          // If we set up a path to the require lib, we can include it as part of the build and avoid a separate HTTP request
          inlineText: true,
          // Specify what minifier to use and any minifier specific configuration. We have chooe not to mangle the output to avoid problems with the variable names and the Rickshaw Library
          uglify2: {
            mangle: false
          },
          optimize: 'uglify2',
          include: 'bower_components/require/build/require'
        }
      },
      compileCSS: {
        options: {
          cssIn: "css/master-style.css",
          out: "build/css/qwd-styles.min.css",
          cssPrefix: "",
          optimizeCss: "standard"
        }
      }
    },
    // image optimization
    imagemin: {
      png: {
        files: [{
          // Set to true to enable the following options…
          expand: true,
          // cwd is 'current working directory'
          cwd: 'images/',
          src: ['**/*.png'],
          // Could also match cwd line above. i.e. project-directory/img/
          dest: 'build/images',
          ext: '.png'
        }]
      },
      jpg: {
        options: {
          progressive: true,
          cache: false
        },
        files: [{
          // Set to true to enable the following options…
          expand: true,
          // cwd is 'current working directory'
          cwd: 'images/',
          src: ['**/*.jpg'],
          // Could also match cwd. i.e. project-directory/img/
          dest: 'build/images',
          ext: '.jpg'
        }]
      },
      gif: {
        options: {
          interlaced: false,
          cache: false
        },
        files: [{
          // Set to true to enable the following options…
          expand: true,
          // cwd is 'current working directory'
          cwd: 'images/',
          src: ['**/*.gif'],
          // Could also match cwd. i.e. project-directory/img/
          dest: 'build/images',
          ext: '.gif'
        }]
      }
    },
    copy: {
      main: {
        files: [
          //get the dispatch file
          {
            expand: true,
            src: ['javascript/dispatch.js'],
            dest: 'build/javascript/',
            flatten: true,
            filter: 'isFile'
          },
          //get all the fonts
          {
            expand: true,
            src: ['fonts/*.*'],
            dest: 'build/fonts/',
            flatten: true,
            filter: 'isFile'
          }
        ]
      }
    }
  });
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.registerTask('build', ['requirejs', 'imagemin', 'copy', 'generate']);
  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('default', ['build']);
};