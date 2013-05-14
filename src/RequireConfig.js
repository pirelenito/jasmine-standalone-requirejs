var require = {
  baseUrl: 'src',

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