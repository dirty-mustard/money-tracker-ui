// Money Tracker UI Gruntfile
module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({
    watch: {
      // If any .less file changes in directory "less/adminlte-less/" run the "less"-task.
      files: [
        "less/adminlte-less/custom/*"
      ],
      tasks: ["less", "uglify"]
    },
    // "less"-task configuration
    // This task will compile all less files upon saving to create both AdminLTE.min.css
    less: {
      // Production compresses version
      production: {
        options: {
          // Whether to compress or not
          compress: true
        },
        files: {
          // compilation.css  :  source.less
          "src/assets/css/AdminLTE.min.css": "less/adminlte-less/custom/AdminLTE.less",
          // Skins minified
          "src/assets/css/skin-money-tracker.min.css": "less/adminlte-less/custom/skin-money-tracker.less"
        }
      }
    },

    // Validate CSS files
    csslint: {
      options: {
        csslintrc: 'less/adminlte-less/.csslintrc'
      },
      dist: [
        'src/assets/css/AdminLTE.min.css'
      ]
    }

  });

  // Load all grunt tasks

  // LESS Compiler
  grunt.loadNpmTasks('grunt-contrib-less');
  // Watch File Changes
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Lint CSS
  grunt.loadNpmTasks('grunt-contrib-csslint');
  // Lint Bootstrap
  grunt.loadNpmTasks('grunt-bootlint');

  // Linting task
  grunt.registerTask('lint', ['csslint', 'bootlint']);

  // The default task (running "grunt" in console) is "watch"
  grunt.registerTask('default', ['watch']);
};
