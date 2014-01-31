module.exports = function(grunt) {

  grunt.config.set('watch', {
    livereload: {
      options: {
        livereload: true,
      },
      files: ['src/**/*.{js,html}', 'prod/*', '<%= watch.tests.files %>'],
      tasks: [],
    },
    jshintrc: {
      files: ['**/.jshintrc'],
      tasks: ['jshint'],
    },
    build: {
      files: ['<%= jshint.build.src %>'],
      tasks: ['jshint:build'],
    },
    scripts: {
      files: ['<%= jshint.app.src %>'],
      tasks: ['jshint:app', 'mocha'],
    },
    page: {
      files: 'src/pages/*.jade',
      tasks: ['jade:dev'],
    },
    styles: {
      files: 'src/**/*.styl',
      tasks: ['stylus:dev'],
    },
    tests: {
      files: ['test/unit/**/*'],
      tasks: ['jshint:test-unit', 'mocha'],
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

};
