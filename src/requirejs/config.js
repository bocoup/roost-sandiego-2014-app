require.config({
  baseUrl: "..",
  paths: {
    jquery: "bower_components/jquery/jquery",
    backbone: "bower_components/backbone/backbone",
    underscore: "bower_components/lodash/dist/lodash",
    tmpl: "bower_components/lodash-template-loader/loader",
    components: "src/modules/components",
    services: "src/modules/services"
  },
  map: {
    "tmpl": {
      "lodash": "underscore"
    },
  },
  shim: {
    backbone: {
      exports: "Backbone",
      deps: ["underscore", "jquery"]
    },
  },
  deps: ["src/main"]
});
