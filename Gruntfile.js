
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  });

  // Load Grunt plugins.
  grunt.loadTasks('build');

  // Tasks.
  grunt.registerTask('dev',
    'Compile and start a dev webserver.',
    ['jshint', 'clean:prod', 'copy:app', 'stylus:dev', 'server:dev', 'watch']);

  grunt.registerTask('server',
    'Start the REST server and static server.',
    function() {
      require('./server/server');
      grunt.task.run('connect:' + this.args.join(':'));
    }
  );

  grunt.registerTask('default', ['dev']);

};
