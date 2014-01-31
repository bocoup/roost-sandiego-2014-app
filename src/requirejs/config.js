require.config({
  baseUrl: "..",
  paths: {
    jquery: "bower_components/jquery/jquery",
    backbone: "bower_components/backbone/backbone",
    underscore: "bower_components/lodash/dist/lodash.underscore",
    lodash: "bower_components/lodash/dist/lodash",
    tmpl: "bower_components/lodash-template-loader/loader",
    vintagejs: "bower_components/vintageJS/dist/jquery.vintage",

    components: "src/modules/components",
    layouts: "src/modules/components/layouts",
    core: "src/modules/core",
    services: "src/modules/services"
  },
  shim: {
    backbone: {
      exports: "Backbone",
      deps: ["underscore", "jquery"]
    }
  },
  deps: ["src/main"]
});
