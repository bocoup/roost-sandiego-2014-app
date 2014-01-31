module.exports = function(grunt) {

  grunt.config.set('copy', {
    prod: {
      expand: true,
      cwd: 'src/img',
      src: '**/*',
      dest: 'prod/img',
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

};