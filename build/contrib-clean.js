module.exports = function(grunt) {

  grunt.config.set('clean', {
    prod: 'prod',
  });

  grunt.loadNpmTasks('grunt-contrib-clean');

};