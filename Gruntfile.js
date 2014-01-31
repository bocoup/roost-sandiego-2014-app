
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  });

  // Load Grunt plugins.
  grunt.loadTasks('build');

  // Tasks.
  grunt.registerTask('setup-dev',
    'Prepare development environment',
    ['jshint', 'mocha', 'clean:prod', 'jade:dev', 'stylus:dev', 'server:dev']);

  grunt.registerTask('dev',
    'Compile and start a dev webserver.',
    ['setup-dev', 'watch']);

  grunt.registerTask('test-integration',
    'Run integration tests in a real browser',
    ['setup-dev', 'mochaTest']);

  grunt.registerTask('prod',
    'Compile for production and start a test webserver.',
    ['clean:prod', 'jade:prod', 'stylus:prod', 'copy', 'requirejs', 'server:prod']);

  grunt.registerTask('server',
    'Start the REST server and static server.',
    function() {
      require('./server/server');
      grunt.task.run('connect:' + this.args.join(':'));
    }
  );

  grunt.registerTask('default', ['dev']);

};
