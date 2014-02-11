module.exports = function(grunt) {

  grunt.config.set('stylus', {
    dev: {
      options: {
        compress: false,
        import: ['nib', 'shared'],
        paths: ['src/styles'],
      },
      src: [
        'src/styles/app.styl',
        'src/modules/**/*.styl',
      ],
      dest: 'prod/app.css',
    },
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');

};