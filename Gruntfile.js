
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      dev: {
        options: {
          base: ['prod', 'src', '.'],
          port: 8000,
          hostname: '*',
        }
      },
    },
    clean: {
      prod: 'prod',
    },
    copy: {
      app: {
        src: 'src/pages/index.html',
        dest: 'prod/index.html',
      },
    },
    jshint: {
      build: {
        options: {
          jshintrc: '.jshintrc',
        },
        src: ['Gruntfile.js'],
      },
      app: {
        options: {
          jshintrc: 'src/.jshintrc',
        },
        src: ['src/**/*.js'],
      },
    },
    watch: {
      livereload: {
        options: {
          livereload: true,
        },
        files: ['src/**/*.{js,css}', 'prod/*'],
        tasks: [],
      },
      jshintrc: {
        files: ['**/.jshintrc'],
        tasks: ['jshint'],
      },
      scripts: {
        files: ['<%= jshint.app.src %>'],
        tasks: ['jshint:app'],
      },
      page: {
        files: 'src/pages/*.html',
        tasks: ['copy:app'],
      },
    },
  });

  // Load Grunt plugins.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Tasks.
  grunt.registerTask('dev',
    'Compile and start a dev webserver.',
    ['jshint', 'clean:prod', 'copy:app', 'connect:dev', 'watch']);

  grunt.registerTask('default', ['dev']);

};
