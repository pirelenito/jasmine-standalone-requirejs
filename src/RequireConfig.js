var require = {
  baseUrl: 'src',

  // bust cache on development
  // should be removed for deployed code
  urlArgs: "bust=" +  (new Date()).getTime(),

  paths: {
    'spec': '../spec',

    'domReady': '../lib/domReady',
    'jasmine': '../lib/jasmine-1.3.1/jasmine',
    'jasmine-html': '../lib/jasmine-1.3.1/jasmine-html'
  },

  shim: {
    'jasmine': {
      exports: 'jasmine'
    },
    'jasmine-html': ['jasmine']
  }
};