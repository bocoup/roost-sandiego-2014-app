module.exports = function(grunt) {

  grunt.config.set('connect', {
    options: {
      port: 8000,
      hostname: '*',
    },
    dev: {
      options: {
        base: ['prod', 'src', '.'],
      }
    },
    prod: {
      options: {
        base: ['prod'],
        keepalive: true,
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

};