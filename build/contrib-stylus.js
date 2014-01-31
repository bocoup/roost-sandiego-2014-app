module.exports = function(grunt) {

  grunt.config.set('stylus', {
    options: {
      import: ['nib', 'shared'],
      paths: ['src/styles'],
    },
    dev: {
      options: {
        compress: false,
      },
      src: [
        'src/styles/app.styl',
        'src/modules/**/*.styl',
      ],
      dest: 'prod/app.css',
    },
    prod: {
      src: '<%= stylus.dev.src %>',
      dest: '<%= stylus.dev.dest %>',
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');

};