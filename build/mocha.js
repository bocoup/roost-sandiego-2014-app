module.exports = function(grunt) {

  grunt.config.set('mocha', {
    all: [ 'test/unit/*.html' ],
    options: {
      bail: true,

      // Forward output from console.log to grunt
      log: true,

      // Select a Mocha reporter
      // http://visionmedia.github.com/mocha/#reporters
      reporter: 'Spec'
    }
  });

  grunt.loadNpmTasks('grunt-mocha');

};
