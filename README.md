# Jasmine Standalone RequireJS

This is basicaly the **Jasmine Standalone Release** ported to use RequireJS.

It includes:

* [Jasmine 1.3.1](https://github.com/pivotal/jasmine/downloads);
* [RequireJS 2.1.6](http://requirejs.org/docs/download.html);
* [RequireJS PageLoad Plugin](http://requirejs.org/docs/api.html#pageload)

## Writing a new spec

When creating a new spec file, remember to add all of its dependencies and also the SpecHelper.

Example:

```javascript
define([
  // all specs should require the SpecHelper
  // with jasmine setup and plugins
  'spec/SpecHelper',

  // spec dependencies
  'Player',
  'Song'
],
function (jasmine, Player, Song) {
  // spec code
});

```

## The SpecHelper

We use the SpecHelper to setup Jasmine and its plugins (like [jasmine-jquery](https://github.com/velesin/jasmine-jquery))

Example:

```javascript
define([
  'jasmine',

  // require the jasmine plugins
  'jasmine-jquery',
  'jasmine-sinon'
],
function (jasmine) {
  // sample jasmine-jquery fixture configuration
  jasmine.getFixtures().fixturesPath = 'spec/fixtures';

  beforeEach(function() {
    this.addMatchers({
      // custom matchers
    });
  });

  return jasmine;
});

```

## The RequireConfig

Finally, we setup RequireJS to use [shim](http://requirejs.org/docs/api.html#config-shim) to load Jasmine.

```javascript
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
```

**Note on caching**: We are also adding a `urlArgs` configuration to bust cache. This should only be used on development, so be sure to remove on deployment.

## The SpecRunner

And to run the specs, we create the main RequireJS as SpecRunner.js:

```javascript
require([
  'domReady',
  'jasmine',
  'jasmine-html',

  'spec/PlayerSpec'
  // add new specs here
],
function(domReady, jasmine) {
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();
  jasmineEnv.addReporter(htmlReporter);
  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  domReady(function () {
    jasmineEnv.execute();
  });
});
```

Which leaves only the RequireJS code back on the SpecRunner.html file:

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
  "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <title>Jasmine Spec Runner</title>
  <link rel="shortcut icon" type="image/png" href="lib/jasmine-1.3.1/jasmine_favicon.png">
  <link rel="stylesheet" type="text/css" href="lib/jasmine-1.3.1/jasmine.css">

  <script src="src/RequireConfig.js"></script>
  <script data-main="spec/SpecRunner" src="lib/require.js"></script>
</head>
<body>
</body>
</html>
```

## Put together by

[Paulo Ragonha](https://github.com/pirelenito)

## Inspired by

Made with great inspiration from [Testing Backbone + RequireJS Applications with Jasmine](http://kilon.org/blog/2012/08/testing-backbone-requirejs-applications-with-jasmine/) by [Uzi Kilon](https://github.com/uzikilon).