module.exports = function(grunt) {

  // If the request URL matches any of the app's routes, rewrite
  // the URL to be /index.html. On the final production server,
  // this will most likely be done with Nginx/Apache rewrites.
  var root = '/index.html';
  function rewriteRoute(req, res, next) {
    if (/^\/(?:webcam|upload|photo\/[^\/]+)$/.test(req.url)) {
      grunt.log.debug('PUSHSTATE ' + req.url + ' -> ' + root);
      req.url = root;
    }
    next();
  }

  grunt.config.set('connect', {
    options: {
      port: 8000,
      hostname: '*',
      middleware: function(connect, options) {
        var middleware = [];
        // Rewrite routes as-necessary.
        middleware.push(rewriteRoute);
        // Serve static files.
        options.base.forEach(function(base) {
          middleware.push(connect.static(base));
        });
        return middleware;
      },
    },
    dev: {
      options: {
        base: ['prod', 'src', '.'],
      }
    },
    prod: {
      options: {
        base: ['prod'],
        keepalive: true,
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

};