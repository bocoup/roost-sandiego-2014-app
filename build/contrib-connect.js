module.exports = function(grunt) {

  grunt.config.set('connect', {
    dev: {
      options: {
        base: ['prod', 'src', '.'],
        port: 8000,
        hostname: '*',
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

};