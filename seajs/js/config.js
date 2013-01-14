seajs.config({
  alias: {
    'jquery': {
      src: 'jquery/jquery-1.9.1.min.js',
      exports: 'jQuery'
    },

    // jquery.easing 插件的 shim 配置
    'underscore': {
      src: 'backbone/underscore-min.js'
    },
    'backbone': {
      src: 'backbone/backbone-1.0.0.min.js',
      exports: 'Backbone',
      deps: ['jquery', 'underscore']
    }
  },
  paths: {
    'root': './',
    'view': './view',
    'collection': './collection',
    'model': './model',
    'libs': './libs'
  },
  // preload: ['jquery', 'undercore'],
  plugins: ['shim', 'text']
  // preload: ['libs/jquery', 'backbone']
});

