define(function(require, exports, module){
  var Backbone = require('backbone');
  var AutoRouter = Backbone.Router.extend({
    routes: {
      "help":                 "help",    // #help
      "search/:query":        "search",  // #search/kiwis
      "search/:query/p:page": "search",   // #search/kiwis/p7
      ":module/:action(/*condition)": "myRouter" // custom url manager
    },
    myRouter: function (module, action, condition) {
        console.log('loadmodule');
        console.log(module);
        console.log(action);
        console.log(condition);
    },
    help: function() {
      console.log('help');
    },
  
    search: function(query, page) {
      console.log('search');
    }
  });

  exports.AutoRouter = AutoRouter;
  return exports;
});


