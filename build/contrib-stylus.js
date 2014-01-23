module.exports = function(grunt) {

  grunt.config.set('stylus', {
    dev: {
      options: {
        compress: false,
      },
      src: [
        'src/styles/app.styl'
      ],
      dest: 'prod/app.css',
    },
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');

};