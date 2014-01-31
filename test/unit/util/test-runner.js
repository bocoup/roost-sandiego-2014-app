define([], function() {
  return function(testFiles) {
    var deps = ['../../src/requirejs/config'];

    if (navigator.userAgent.indexOf('PhantomJS') >= 0) {
      deps.push('../../node_modules/grunt-mocha/phantomjs/bridge');
    }

    // Stub out the application entry point so the entire application does not
    // attempt to run in the test environment.
    define('src/main', {});

    require(deps, function() {

      // The application modules have been authored to load dependencies from
      // the root of this project. Because the default `baseUrl` in the unit
      // test environment is "test/unit/" (and not "src/"), we have to re-set
      // the `baseUrl` to "../..".
      // In addition, define a path for the test environment that accounts for
      // this detail so test files can be loaded with more intuitive IDs.
      require.config({
        baseUrl: '../..',
        paths: {
          tests: 'test/unit/tests'
        }
      });

      require(testFiles, function() {
        mocha.run();
      });
    });
  };
});
