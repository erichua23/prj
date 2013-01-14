define(function(require, exports, module){
  exports.init = function () {
    var Router = require('root/router');
    new Router.AutoRouter();
    Backbone.history.start();
  };
  return exports;
});


