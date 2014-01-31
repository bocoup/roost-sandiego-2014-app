module.exports = function(grunt) {

  grunt.config.set('requirejs', {
    prod: {
      options: {
        baseUrl: '.',
        mainConfigFile: 'src/requirejs/config.js',
        insertRequire: ['src/main'],
        name: 'bower_components/almond/almond',
        out: 'prod/app.js',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');

};