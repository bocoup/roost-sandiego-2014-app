module.exports = function(grunt) {

  grunt.config.set('jade', {
    options: {
      data: {
        target: '<%= grunt.task.current.target %>',
      }
    },
    dev: {
      expand: true,
      cwd: 'src/pages',
      src: '*.jade',
      dest: 'prod',
      ext: '.html',
    },
    prod: '<%= jade.dev %>',
  });

  grunt.loadNpmTasks('grunt-contrib-jade');

};