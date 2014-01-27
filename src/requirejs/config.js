require.config({
  baseUrl: "..",
  paths: {
    jquery: "bower_components/jquery/jquery",
    backbone: "bower_components/backbone/backbone",
    underscore: "bower_components/lodash/dist/lodash",
    components: "src/modules/components"
  },
  shim: {
    backbone: {
      exports: "Backbone",
      deps: ["underscore", "jquery"]
    },
  },
  deps: ["src/main"]
});
