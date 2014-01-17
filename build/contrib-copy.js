module.exports = function(grunt) {

  grunt.config.set('copy', {
    app: {
      src: 'src/pages/index.html',
      dest: 'prod/index.html',
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

};