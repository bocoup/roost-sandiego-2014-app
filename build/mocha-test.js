module.exports = function(grunt) {

  grunt.config('mochaTest', {
      options: {
        // Select a Mocha reporter
        // http://visionmedia.github.com/mocha/#reporters
        reporter: "spec",
        ui: 'tdd'
      },
      src: ['test/integration/*.js']
  });

  grunt.loadNpmTasks('grunt-mocha-test');

};
