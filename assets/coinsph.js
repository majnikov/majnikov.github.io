'use strict';



;define("coinsph/adapters/application", ["exports", "ember-data", "coinsph/config/environment"], function (_exports, _emberData, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _emberData.default.RESTAdapter.extend({
    host: _environment.default.host,
    namespace: _environment.default.namespace,

    parseErrorResponse() {
      const result = this._super(...arguments);

      if (result.errors) {
        Object.keys(result.errors).forEach(key => {
          const tmp = result.errors[key];
          delete result.errors[key];
          result.errors[Ember.String.camelize(key)] = tmp;
        });
      }

      return result;
    }

  });

  _exports.default = _default;
});
;define("coinsph/adapters/user", ["exports", "coinsph/adapters/application"], function (_exports, _application) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _application.default.extend({
    signUp(model, {
      password
    }) {
      const {
        host,
        namespace
      } = Ember.getProperties(this, 'host', 'namespace');
      const {
        email,
        username
      } = Ember.getProperties(model, 'email', 'username');
      const data = {
        email,
        password,
        username
      };
      const url = "".concat(host, "/").concat(namespace, "/signup");
      return this.ajax(url, 'POST', {
        data
      });
    }

  });

  _exports.default = _default;
});
;define("coinsph/app", ["exports", "coinsph/resolver", "ember-load-initializers", "coinsph/config/environment"], function (_exports, _resolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
  var _default = App;
  _exports.default = _default;
});
;define("coinsph/cldrs/en", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*jslint eqeq: true*/
  var _default = [{
    "locale": "en",
    "pluralRuleFunction": function (n, ord) {
      var s = String(n).split("."),
          v0 = !s[1],
          t0 = Number(s[0]) == n,
          n10 = t0 && s[0].slice(-1),
          n100 = t0 && s[0].slice(-2);
      if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";
      return n == 1 && v0 ? "one" : "other";
    },
    "fields": {
      "year": {
        "displayName": "year",
        "relative": {
          "0": "this year",
          "1": "next year",
          "-1": "last year"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} year",
            "other": "in {0} years"
          },
          "past": {
            "one": "{0} year ago",
            "other": "{0} years ago"
          }
        }
      },
      "month": {
        "displayName": "month",
        "relative": {
          "0": "this month",
          "1": "next month",
          "-1": "last month"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} month",
            "other": "in {0} months"
          },
          "past": {
            "one": "{0} month ago",
            "other": "{0} months ago"
          }
        }
      },
      "day": {
        "displayName": "day",
        "relative": {
          "0": "today",
          "1": "tomorrow",
          "-1": "yesterday"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} day",
            "other": "in {0} days"
          },
          "past": {
            "one": "{0} day ago",
            "other": "{0} days ago"
          }
        }
      },
      "hour": {
        "displayName": "hour",
        "relativeTime": {
          "future": {
            "one": "in {0} hour",
            "other": "in {0} hours"
          },
          "past": {
            "one": "{0} hour ago",
            "other": "{0} hours ago"
          }
        }
      },
      "minute": {
        "displayName": "minute",
        "relativeTime": {
          "future": {
            "one": "in {0} minute",
            "other": "in {0} minutes"
          },
          "past": {
            "one": "{0} minute ago",
            "other": "{0} minutes ago"
          }
        }
      },
      "second": {
        "displayName": "second",
        "relative": {
          "0": "now"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} second",
            "other": "in {0} seconds"
          },
          "past": {
            "one": "{0} second ago",
            "other": "{0} seconds ago"
          }
        }
      }
    }
  }];
  _exports.default = _default;
});
;define("coinsph/components/errors-explanation", ["exports", "coinsph/mirage/config"], function (_exports, _config) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    SERVER_ERROR_CHANCE: _config.SERVER_ERROR_CHANCE,
    TAKEN_USER_NAMES: _config.TAKEN_USER_NAMES,
    THROTTLE_CHANCE: _config.THROTTLE_CHANCE
  });

  _exports.default = _default;
});
;define("coinsph/components/form/form-input", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: '',
    errorMessage: null,
    isValid: true,
    isValidated: false,
    placeholder: '',
    touched: false,
    type: 'text',
    isActive: Ember.computed.or('touched', 'isValidated'),
    isInvalid: Ember.computed.not('isValid'),
    showError: Ember.computed.and('isActive', 'errorMessage'),

    setTouched() {
      this.set('touched', true);
    },

    actions: {
      onFocusOut() {
        this.setTouched();
      },

      onKeyPress() {
        this.setTouched();
        const onInput = Ember.get(this, 'onInput');
        onInput && onInput();
      }

    }
  });

  _exports.default = _default;
});
;define("coinsph/components/login-form", ["exports", "coinsph/validators/sign-up", "coinsph/const/errors", "ember-concurrency"], function (_exports, _signUp, _errors, _emberConcurrency) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend(_signUp.default, {
    store: Ember.inject.service(),
    classNames: ['login-form'],
    serverErrors: null,
    password: null,
    passwordConfirm: null,
    user: null,
    isValidated: Ember.computed.gt('signUpTask.performCount', 0),
    isInvalid: Ember.computed.not('validations.isValid'),
    isValidating: Ember.computed.alias('validations.isValidating'),
    submitDisabled: Ember.computed.or('isValidating', 'isInvalid', 'signUpTask.isRunning'),

    init() {
      this._init();

      this._super(...arguments);
    },

    _init() {
      const store = Ember.get(this, 'store');
      Ember.set(this, 'user', store.createRecord('user'));
    },

    willDestroyElement() {
      Ember.get(this, 'user').unloadRecord();
    },

    clearServerErrors() {
      Ember.set(this, 'serverErrors', null);
    },

    signUpTask: (0, _emberConcurrency.task)(function* () {
      this.clearServerErrors();
      yield this.validate();

      if (Ember.get(this, 'isInvalid')) {
        return;
      }

      const {
        password,
        user
      } = Ember.getProperties(this, 'password', 'user');

      try {
        yield user.signUp({
          password
        });
        Ember.get(this, 'onSignUp')();
      } catch (e) {
        Ember.set(this, 'serverErrors', e.errors || _errors.DEFAULT_ERROR);
      }
    }).drop()
  });

  _exports.default = _default;
});
;define("coinsph/const/errors", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.DEFAULT_ERROR = void 0;
  const DEFAULT_ERROR = {
    nonFieldErrors: {
      message: 'Sorry, something went wrong. Please try again.'
    }
  };
  _exports.DEFAULT_ERROR = DEFAULT_ERROR;
});
;define("coinsph/controllers/sign-up", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({
    actions: {
      onSignUp() {
        this.transitionToRoute('index');
      }

    }
  });

  _exports.default = _default;
});
;define("coinsph/helpers/and", ["exports", "ember-truth-helpers/helpers/and"], function (_exports, _and) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _and.default;
    }
  });
  Object.defineProperty(_exports, "and", {
    enumerable: true,
    get: function () {
      return _and.and;
    }
  });
});
;define("coinsph/helpers/app-version", ["exports", "coinsph/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;

  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = Ember.Helper.helper(appVersion);

  _exports.default = _default;
});
;define("coinsph/helpers/cancel-all", ["exports", "ember-concurrency/helpers/cancel-all"], function (_exports, _cancelAll) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _cancelAll.default;
    }
  });
});
;define("coinsph/helpers/eq", ["exports", "ember-truth-helpers/helpers/equal"], function (_exports, _equal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _equal.default;
    }
  });
  Object.defineProperty(_exports, "equal", {
    enumerable: true,
    get: function () {
      return _equal.equal;
    }
  });
});
;define("coinsph/helpers/format-date", ["exports", "ember-intl/helpers/format-date"], function (_exports, _formatDate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatDate.default;
    }
  });
});
;define("coinsph/helpers/format-message", ["exports", "ember-intl/helpers/format-message"], function (_exports, _formatMessage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatMessage.default;
    }
  });
});
;define("coinsph/helpers/format-number", ["exports", "ember-intl/helpers/format-number"], function (_exports, _formatNumber) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatNumber.default;
    }
  });
});
;define("coinsph/helpers/format-relative", ["exports", "ember-intl/helpers/format-relative"], function (_exports, _formatRelative) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatRelative.default;
    }
  });
});
;define("coinsph/helpers/format-time", ["exports", "ember-intl/helpers/format-time"], function (_exports, _formatTime) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatTime.default;
    }
  });
});
;define("coinsph/helpers/gt", ["exports", "ember-truth-helpers/helpers/gt"], function (_exports, _gt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gt.default;
    }
  });
  Object.defineProperty(_exports, "gt", {
    enumerable: true,
    get: function () {
      return _gt.gt;
    }
  });
});
;define("coinsph/helpers/gte", ["exports", "ember-truth-helpers/helpers/gte"], function (_exports, _gte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gte.default;
    }
  });
  Object.defineProperty(_exports, "gte", {
    enumerable: true,
    get: function () {
      return _gte.gte;
    }
  });
});
;define("coinsph/helpers/is-array", ["exports", "ember-truth-helpers/helpers/is-array"], function (_exports, _isArray) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isArray.default;
    }
  });
  Object.defineProperty(_exports, "isArray", {
    enumerable: true,
    get: function () {
      return _isArray.isArray;
    }
  });
});
;define("coinsph/helpers/is-empty", ["exports", "ember-truth-helpers/helpers/is-empty"], function (_exports, _isEmpty) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isEmpty.default;
    }
  });
});
;define("coinsph/helpers/is-equal", ["exports", "ember-truth-helpers/helpers/is-equal"], function (_exports, _isEqual) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(_exports, "isEqual", {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
});
;define("coinsph/helpers/lt", ["exports", "ember-truth-helpers/helpers/lt"], function (_exports, _lt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lt.default;
    }
  });
  Object.defineProperty(_exports, "lt", {
    enumerable: true,
    get: function () {
      return _lt.lt;
    }
  });
});
;define("coinsph/helpers/lte", ["exports", "ember-truth-helpers/helpers/lte"], function (_exports, _lte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lte.default;
    }
  });
  Object.defineProperty(_exports, "lte", {
    enumerable: true,
    get: function () {
      return _lte.lte;
    }
  });
});
;define("coinsph/helpers/not-eq", ["exports", "ember-truth-helpers/helpers/not-equal"], function (_exports, _notEqual) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _notEqual.default;
    }
  });
  Object.defineProperty(_exports, "notEq", {
    enumerable: true,
    get: function () {
      return _notEqual.notEq;
    }
  });
});
;define("coinsph/helpers/not", ["exports", "ember-truth-helpers/helpers/not"], function (_exports, _not) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _not.default;
    }
  });
  Object.defineProperty(_exports, "not", {
    enumerable: true,
    get: function () {
      return _not.not;
    }
  });
});
;define("coinsph/helpers/or", ["exports", "ember-truth-helpers/helpers/or"], function (_exports, _or) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _or.default;
    }
  });
  Object.defineProperty(_exports, "or", {
    enumerable: true,
    get: function () {
      return _or.or;
    }
  });
});
;define("coinsph/helpers/perform", ["exports", "ember-concurrency/helpers/perform"], function (_exports, _perform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _perform.default;
    }
  });
});
;define("coinsph/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("coinsph/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _singularize.default;
  _exports.default = _default;
});
;define("coinsph/helpers/t", ["exports", "ember-intl/helpers/t"], function (_exports, _t) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _t.default;
    }
  });
});
;define("coinsph/helpers/task", ["exports", "ember-concurrency/helpers/task"], function (_exports, _task) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _task.default;
    }
  });
});
;define("coinsph/helpers/xor", ["exports", "ember-truth-helpers/helpers/xor"], function (_exports, _xor) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xor.default;
    }
  });
  Object.defineProperty(_exports, "xor", {
    enumerable: true,
    get: function () {
      return _xor.xor;
    }
  });
});
;define("coinsph/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "coinsph/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("coinsph/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }

  };
  _exports.default = _default;
});
;define("coinsph/initializers/ember-cli-mirage", ["exports", "coinsph/config/environment", "coinsph/mirage/config", "ember-cli-mirage/get-rfc232-test-context", "ember-cli-mirage/start-mirage"], function (_exports, _environment, _config, _getRfc232TestContext, _startMirage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.startMirage = startMirage;
  _exports.default = void 0;
  //
  // This initializer does two things:
  //
  // 1. Pulls the mirage config objects from the application's config and
  //    registers them in the container so `ember-cli-mirage/start-mirage` can
  //    find them (since it doesn't have access to the app's namespace).
  // 2. Provides legacy support for auto-starting mirage in pre-rfc268 acceptance
  //    tests.
  //
  var _default = {
    name: 'ember-cli-mirage',

    initialize(application) {
      if (_config.default) {
        application.register('mirage:base-config', _config.default, {
          instantiate: false
        });
      }

      if (_config.testConfig) {
        application.register('mirage:test-config', _config.testConfig, {
          instantiate: false
        });
      }

      _environment.default['ember-cli-mirage'] = _environment.default['ember-cli-mirage'] || {};

      if (_shouldUseMirage(_environment.default.environment, _environment.default['ember-cli-mirage'])) {
        startMirage(_environment.default);
      }
    }

  };
  _exports.default = _default;

  function startMirage(env = _environment.default) {
    return (0, _startMirage.default)(null, {
      env,
      baseConfig: _config.default,
      testConfig: _config.testConfig
    });
  }

  function _shouldUseMirage(env, addonConfig) {
    if (typeof FastBoot !== 'undefined') {
      return false;
    }

    if ((0, _getRfc232TestContext.default)()) {
      return false;
    }

    let userDeclaredEnabled = typeof addonConfig.enabled !== 'undefined';

    let defaultEnabled = _defaultEnabled(env, addonConfig);

    return userDeclaredEnabled ? addonConfig.enabled : defaultEnabled;
  }
  /*
    Returns a boolean specifying the default behavior for whether
    to initialize Mirage.
  */


  function _defaultEnabled(env, addonConfig) {
    let usingInDev = env === 'development' && !addonConfig.usingProxy;
    let usingInTest = env === 'test';
    return usingInDev || usingInTest;
  }
});
;define("coinsph/initializers/ember-concurrency", ["exports", "ember-concurrency/initializers/ember-concurrency"], function (_exports, _emberConcurrency) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberConcurrency.default;
    }
  });
});
;define("coinsph/initializers/ember-data", ["exports", "ember-data/setup-container", "ember-data"], function (_exports, _setupContainer, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    ```app/services/store.js
    import DS from 'ember-data';
  
    export default DS.Store.extend({
      adapter: 'custom'
    });
    ```
  
    ```app/controllers/posts.js
    import { Controller } from '@ember/controller';
  
    export default Controller.extend({
      // ...
    });
  
    When the application is initialized, `ApplicationStore` will automatically be
    instantiated, and the instance of `PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */
  var _default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
  _exports.default = _default;
});
;define("coinsph/initializers/export-application-global", ["exports", "coinsph/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("coinsph/instance-initializers/ember-cli-mirage-autostart", ["exports", "ember-cli-mirage/instance-initializers/ember-cli-mirage-autostart"], function (_exports, _emberCliMirageAutostart) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberCliMirageAutostart.default;
    }
  });
});
;define("coinsph/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (_exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
  _exports.default = _default;
});
;define("coinsph/instance-initializers/ember-intl", ["exports", "ember-intl/initializer"], function (_exports, _initializer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "instanceInitializer", {
    enumerable: true,
    get: function () {
      return _initializer.instanceInitializer;
    }
  });
  _exports.default = void 0;

  /**
   * Copyright 2015, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */
  var _default = _initializer.default;
  _exports.default = _default;
});
;define("coinsph/mirage/config", ["exports", "ember-cli-mirage"], function (_exports, _emberCliMirage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  _exports.testConfig = testConfig;
  _exports.SERVER_ERROR_CHANCE = _exports.THROTTLE_CHANCE = _exports.TAKEN_USER_NAMES = void 0;
  const TAKEN_USER_NAMES = {
    ON_VALIDATE: ['username', 'test'],
    ON_SIGN_UP: ['username1', 'username2', 'username3']
  };
  _exports.TAKEN_USER_NAMES = TAKEN_USER_NAMES;
  const THROTTLE_CHANCE = 20;
  _exports.THROTTLE_CHANCE = THROTTLE_CHANCE;
  const SERVER_ERROR_CHANCE = 20;
  _exports.SERVER_ERROR_CHANCE = SERVER_ERROR_CHANCE;

  function _default() {
    this.urlPrefix = '';
    this.namespace = 'api';
    this.timing = 200;
    this.post('/check', function () {
      const attrs = this.normalizedRequestAttrs();

      if (attrs && attrs.username) {
        const username = attrs.username;

        if (TAKEN_USER_NAMES.ON_VALIDATE.includes(username)) {
          const errors = {
            username: {
              code: 'already_taken',
              message: 'This name is already taken.'
            }
          };
          return new _emberCliMirage.Response(400, {}, {
            errors
          });
        }
      }

      return new _emberCliMirage.Response(200, {}, {
        ok: true
      });
    });
    this.post('/signup', function (db, request) {
      let errors = {};
      const isThrottled = Math.random() * 100 < THROTTLE_CHANCE;

      if (isThrottled) {
        errors = {
          non_field_errors: {
            code: 'throttle',
            message: 'You request was throttled. Please try again in 56 sec.'
          }
        };
        return new _emberCliMirage.Response(429, {}, {
          errors
        });
      }

      const isServerError = Math.random() * 100 < SERVER_ERROR_CHANCE;

      if (isServerError) {
        errors = {
          non_field_errors: {
            code: 'error',
            message: 'Something went wrong.'
          }
        };
        return new _emberCliMirage.Response(500, {}, {
          errors
        });
      }

      const attrs = JSON.parse(request.requestBody);
      const requiredAttrributes = ['email', 'username', 'password'];
      requiredAttrributes.forEach(attr => {
        if (!attrs[attr]) {
          errors[attr] = {
            code: "blank",
            message: "This field may not be blank."
          };
        }
      });

      if (attrs && attrs.username) {
        const username = attrs.username;

        if (TAKEN_USER_NAMES.ON_VALIDATE.concat(TAKEN_USER_NAMES.ON_SIGN_UP).includes(username)) {
          errors.username = {
            code: 'already_taken',
            message: 'This name is already taken.'
          };
        }
      }

      if (Object.keys(errors).length) {
        return new _emberCliMirage.Response(400, {}, {
          errors
        });
      }

      return new _emberCliMirage.Response(200, {}, {
        ok: true
      });
    });
  }

  function testConfig() {
    this.urlPrefix = '';
    this.namespace = 'api';
    this.timing = 200;
    this.post('/check', function () {
      const attrs = this.normalizedRequestAttrs();

      if (attrs && attrs.username) {
        const username = attrs.username;

        if (TAKEN_USER_NAMES.ON_VALIDATE.includes(username)) {
          const errors = {
            username: {
              code: 'already_taken',
              message: 'This name is already taken.'
            }
          };
          return new _emberCliMirage.Response(400, {}, {
            errors
          });
        }
      }

      return new _emberCliMirage.Response(200, {}, {
        ok: true
      });
    });
    this.post('/signup', function (db, request) {
      let errors = {};
      const attrs = JSON.parse(request.requestBody);

      if (attrs && attrs.username) {
        const username = attrs.username;

        if (TAKEN_USER_NAMES.ON_VALIDATE.concat(TAKEN_USER_NAMES.ON_SIGN_UP).includes(username)) {
          errors.username = {
            code: 'already_taken',
            message: 'This name is already taken.'
          };
        }
      }

      if (Object.keys(errors).length) {
        return new _emberCliMirage.Response(400, {}, {
          errors
        });
      }

      return new _emberCliMirage.Response(200, {}, {
        ok: true
      });
    });
  }
});
;define("coinsph/mirage/scenarios/default", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;

  function _default() {}
});
;define("coinsph/mirage/serializers/application", ["exports", "ember-cli-mirage"], function (_exports, _emberCliMirage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _emberCliMirage.RestSerializer.extend({});

  _exports.default = _default;
});
;define("coinsph/models/user", ["exports", "ember-data"], function (_exports, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const {
    attr,
    Model
  } = _emberData.default;

  var _default = Model.extend({
    email: attr('string'),
    username: attr('string'),

    signUp(params) {
      const adapter = this.store.adapterFor(this.constructor.modelName);
      return adapter.signUp(this, params);
    }

  });

  _exports.default = _default;
});
;define("coinsph/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _emberResolver.default;
  _exports.default = _default;
});
;define("coinsph/router", ["exports", "coinsph/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });
  Router.map(function () {
    this.route('sign-up');
  });
  var _default = Router;
  _exports.default = _default;
});
;define("coinsph/routes/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    intl: Ember.inject.service(),

    beforeModel() {
      Ember.get(this, 'intl').setLocale(['en']);
      this.transitionTo('sign-up');
    }

  });

  _exports.default = _default;
});
;define("coinsph/services/ajax", ["exports", "ember-ajax/services/ajax"], function (_exports, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define("coinsph/services/intl", ["exports", "ember-intl/services/intl"], function (_exports, _intl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _intl.default;
    }
  });
});
;define("coinsph/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "M8vUPClb",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"main\"],[9],[0,\"\\n  \"],[1,[23,\"outlet\"],false],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "coinsph/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("coinsph/templates/components/errors-explanation", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "qQlpBC+H",
    "block": "{\"symbols\":[],\"statements\":[[7,\"h4\"],[9],[1,[29,\"t\",[\"explanations.title\"],null],false],[10],[0,\"\\n\"],[7,\"div\"],[9],[0,\"\\n  \"],[1,[29,\"t\",[\"explanations.throttled\"],null],false],[0,\" \"],[1,[23,\"THROTTLE_CHANCE\"],false],[0,\" \"],[1,[29,\"t\",[\"explanations.percent\"],null],false],[0,\"\\n\"],[10],[0,\"\\n\"],[7,\"div\"],[9],[0,\"\\n  \"],[1,[29,\"t\",[\"explanations.error\"],null],false],[0,\" \"],[1,[23,\"SERVER_ERROR_CHANCE\"],false],[0,\" \"],[1,[29,\"t\",[\"explanations.percent\"],null],false],[0,\"\\n\"],[10],[0,\"\\n\"],[7,\"h4\"],[9],[1,[29,\"t\",[\"explanations.takenNames\"],null],false],[10],[0,\"\\n\"],[7,\"div\"],[9],[0,\"\\n  \"],[1,[29,\"t\",[\"explanations.onValidate\"],null],false],[0,\" - \"],[1,[25,[\"TAKEN_USER_NAMES\",\"ON_VALIDATE\"]],false],[0,\"\\n\"],[10],[0,\"\\n\"],[7,\"div\"],[9],[0,\"\\n  \"],[1,[29,\"t\",[\"explanations.onSignUp\"],null],false],[0,\" - \"],[1,[25,[\"TAKEN_USER_NAMES\",\"ON_SIGN_UP\"]],false],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "coinsph/templates/components/errors-explanation.hbs"
    }
  });

  _exports.default = _default;
});
;define("coinsph/templates/components/form/form-input", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "p0BYPh4s",
    "block": "{\"symbols\":[],\"statements\":[[1,[29,\"input\",[[29,\"-input-type\",[[25,[\"type\"]]],null]],[[\"autocomplete\",\"class\",\"focus-out\",\"id\",\"key-press\",\"placeholder\",\"type\",\"value\"],[[25,[\"autocomplete\"]],[29,\"concat\",[\"form-input\",\" \",[29,\"if\",[[25,[\"showError\"]],\"form-input__invalid\"],null],\" \"],null],[29,\"action\",[[24,0,[]],\"onFocusOut\"],null],[25,[\"id\"]],[29,\"action\",[[24,0,[]],\"onKeyPress\"],null],[25,[\"placeholder\"]],[25,[\"type\"]],[25,[\"value\"]]]]],false],[0,\"\\n\"],[4,\"if\",[[25,[\"showError\"]]],null,{\"statements\":[[0,\"  \"],[7,\"span\"],[11,\"class\",\"form-input__error-message\"],[9],[1,[23,\"errorMessage\"],false],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "coinsph/templates/components/form/form-input.hbs"
    }
  });

  _exports.default = _default;
});
;define("coinsph/templates/components/login-form", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "Az3biEr/",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"login-form__wrapper\"],[9],[0,\"\\n  \"],[7,\"h5\"],[11,\"class\",\"login-form__title\"],[9],[1,[29,\"t\",[\"signUp.title\"],null],false],[10],[0,\"\\n\\n  \"],[7,\"form\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"login-form__group\"],[9],[0,\"\\n      \"],[1,[29,\"form/form-input\",null,[[\"errorMessage\",\"id\",\"isValidated\",\"isValid\",\"onInput\",\"placeholder\",\"value\"],[[29,\"or\",[[29,\"get\",[[29,\"get\",[[29,\"get\",[[29,\"get\",[[24,0,[]],\"validations\"],null],\"attrs\"],null],\"user.username\"],null],\"message\"],null],[25,[\"serverErrors\",\"username\",\"message\"]]],null],\"username\",[25,[\"isValidated\"]],[29,\"get\",[[29,\"get\",[[29,\"get\",[[29,\"get\",[[24,0,[]],\"validations\"],null],\"attrs\"],null],\"user.username\"],null],\"isValid\"],null],[29,\"action\",[[24,0,[]],[25,[\"clearServerErrors\"]]],null],[29,\"t\",[\"signUp.form.placeholders.username\"],null],[25,[\"user\",\"username\"]]]]],false],[0,\"\\n    \"],[10],[0,\"\\n\\n    \"],[7,\"div\"],[11,\"class\",\"login-form__group\"],[9],[0,\"\\n      \"],[1,[29,\"form/form-input\",null,[[\"errorMessage\",\"id\",\"isValidated\",\"isValid\",\"onInput\",\"placeholder\",\"type\",\"value\"],[[29,\"get\",[[29,\"get\",[[29,\"get\",[[29,\"get\",[[24,0,[]],\"validations\"],null],\"attrs\"],null],\"user.email\"],null],\"message\"],null],\"email\",[25,[\"isValidated\"]],[29,\"get\",[[29,\"get\",[[29,\"get\",[[29,\"get\",[[24,0,[]],\"validations\"],null],\"attrs\"],null],\"user.email\"],null],\"isValid\"],null],[29,\"action\",[[24,0,[]],[25,[\"clearServerErrors\"]]],null],[29,\"t\",[\"signUp.form.placeholders.email\"],null],\"email\",[25,[\"user\",\"email\"]]]]],false],[0,\"\\n    \"],[10],[0,\"\\n\\n    \"],[7,\"div\"],[11,\"class\",\"login-form__group\"],[9],[0,\"\\n      \"],[1,[29,\"form/form-input\",null,[[\"errorMessage\",\"autocomplete\",\"id\",\"isValidated\",\"isValid\",\"onInput\",\"placeholder\",\"type\",\"value\"],[[29,\"get\",[[29,\"get\",[[29,\"get\",[[29,\"get\",[[24,0,[]],\"validations\"],null],\"attrs\"],null],\"password\"],null],\"message\"],null],\"false\",\"password\",[25,[\"isValidated\"]],[29,\"get\",[[29,\"get\",[[29,\"get\",[[29,\"get\",[[24,0,[]],\"validations\"],null],\"attrs\"],null],\"password\"],null],\"isValid\"],null],[29,\"action\",[[24,0,[]],[25,[\"clearServerErrors\"]]],null],[29,\"t\",[\"signUp.form.placeholders.password\"],null],\"password\",[25,[\"password\"]]]]],false],[0,\"\\n    \"],[10],[0,\"\\n\\n    \"],[7,\"div\"],[11,\"class\",\"login-form__group\"],[9],[0,\"\\n      \"],[1,[29,\"form/form-input\",null,[[\"errorMessage\",\"autocomplete\",\"id\",\"isValidated\",\"isValid\",\"onInput\",\"placeholder\",\"type\",\"value\"],[[29,\"get\",[[29,\"get\",[[29,\"get\",[[29,\"get\",[[24,0,[]],\"validations\"],null],\"attrs\"],null],\"passwordConfirm\"],null],\"message\"],null],\"false\",\"passwordConfirm\",[25,[\"isValidated\"]],[29,\"get\",[[29,\"get\",[[29,\"get\",[[29,\"get\",[[24,0,[]],\"validations\"],null],\"attrs\"],null],\"passwordConfirm\"],null],\"isValid\"],null],[29,\"action\",[[24,0,[]],[25,[\"clearServerErrors\"]]],null],[29,\"t\",[\"signUp.form.placeholders.passwordConfirm\"],null],\"password\",[25,[\"passwordConfirm\"]]]]],false],[0,\"\\n    \"],[10],[0,\"\\n\\n    \"],[7,\"div\"],[11,\"class\",\"login-form__group\"],[9],[0,\"\\n      \"],[7,\"button\"],[11,\"class\",\"login-form__button\"],[11,\"id\",\"submit\"],[12,\"disabled\",[23,\"submitDisabled\"]],[11,\"type\",\"submit\"],[9],[0,\"\\n        \"],[1,[29,\"t\",[\"signUp.form.register\"],null],false],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n\\n\"],[4,\"if\",[[25,[\"serverErrors\",\"nonFieldErrors\",\"message\"]]],null,{\"statements\":[[0,\"      \"],[7,\"span\"],[11,\"class\",\"login-form__error-message\"],[9],[1,[25,[\"serverErrors\",\"nonFieldErrors\",\"message\"]],false],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n  \"],[3,\"action\",[[24,0,[]],[29,\"perform\",[[25,[\"signUpTask\"]]],null]],[[\"on\"],[\"submit\"]]],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "coinsph/templates/components/login-form.hbs"
    }
  });

  _exports.default = _default;
});
;define("coinsph/templates/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "bfxg4kER",
    "block": "{\"symbols\":[],\"statements\":[[7,\"h3\"],[11,\"id\",\"thanks\"],[9],[1,[29,\"t\",[\"signUp.thanks\"],null],false],[10],[0,\"\\n\"],[7,\"div\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"sign-up\"],null,{\"statements\":[[0,\"    \"],[1,[29,\"t\",[\"signUp.form.register\"],null],false],[0,\"\\n\"]],\"parameters\":[]},null],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "coinsph/templates/index.hbs"
    }
  });

  _exports.default = _default;
});
;define("coinsph/templates/sign-up", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "/AvmpZem",
    "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[25,[\"isRegistered\"]]],null,{\"statements\":[[0,\"  \"],[7,\"h3\"],[9],[1,[29,\"t\",[\"signUp.thanks\"],null],false],[10],[0,\"\\n  \"],[7,\"div\"],[9],[1,[29,\"t\",[\"signUp.redirectMessage\"],null],false],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[1,[29,\"login-form\",null,[[\"errors\",\"onSignUp\"],[[25,[\"errors\"]],[29,\"action\",[[24,0,[]],\"onSignUp\"],null]]]],false],[0,\"\\n  \"],[1,[23,\"errors-explanation\"],false],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}",
    "meta": {
      "moduleName": "coinsph/templates/sign-up.hbs"
    }
  });

  _exports.default = _default;
});
;define("coinsph/tests/mirage/mirage.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | mirage');
  QUnit.test('mirage/config.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/config.js should pass ESLint\n\n');
  });
  QUnit.test('mirage/scenarios/default.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/scenarios/default.js should pass ESLint\n\n');
  });
  QUnit.test('mirage/serializers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/serializers/application.js should pass ESLint\n\n');
  });
});
;define("coinsph/translations/en", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    "errors": {
      "blank": "{description} can't be blank",
      "email": "{description} must be a valid email address"
    },
    "explanations": {
      "error": "abort with 500 error in",
      "onSignUp": "on request",
      "onValidate": "on validating",
      "percent": "%",
      "takenNames": "Already taken names:",
      "throttled": "throttled in",
      "title": "Your request will be:"
    },
    "signUp": {
      "form": {
        "errors": {
          "blank": "as",
          "password": "Passwords does not match"
        },
        "placeholders": {
          "email": "Email Address",
          "password": "Password",
          "passwordConfirm": "Repeat your password",
          "username": "Your Name"
        },
        "register": "Register"
      },
      "thanks": "Thank's for the registration!",
      "title": "Sign up to Coins.ph!"
    }
  };
  _exports.default = _default;
});
;define("coinsph/utils/intl/missing-message", ["exports", "ember-intl/utils/missing-message"], function (_exports, _missingMessage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _missingMessage.default;
    }
  });
});
;define("coinsph/validators/alias", ["exports", "ember-cp-validations/validators/alias"], function (_exports, _alias) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _alias.default;
    }
  });
});
;define("coinsph/validators/belongs-to", ["exports", "ember-cp-validations/validators/belongs-to"], function (_exports, _belongsTo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _belongsTo.default;
    }
  });
});
;define("coinsph/validators/collection", ["exports", "ember-cp-validations/validators/collection"], function (_exports, _collection) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _collection.default;
    }
  });
});
;define("coinsph/validators/confirmation", ["exports", "ember-cp-validations/validators/confirmation"], function (_exports, _confirmation) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _confirmation.default;
    }
  });
});
;define("coinsph/validators/date", ["exports", "ember-cp-validations/validators/date"], function (_exports, _date) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _date.default;
    }
  });
});
;define("coinsph/validators/dependent", ["exports", "ember-cp-validations/validators/dependent"], function (_exports, _dependent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dependent.default;
    }
  });
});
;define("coinsph/validators/ds-error", ["exports", "ember-cp-validations/validators/ds-error"], function (_exports, _dsError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dsError.default;
    }
  });
});
;define("coinsph/validators/exclusion", ["exports", "ember-cp-validations/validators/exclusion"], function (_exports, _exclusion) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _exclusion.default;
    }
  });
});
;define("coinsph/validators/format", ["exports", "ember-cp-validations/validators/format"], function (_exports, _format) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _format.default;
    }
  });
});
;define("coinsph/validators/has-many", ["exports", "ember-cp-validations/validators/has-many"], function (_exports, _hasMany) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _hasMany.default;
    }
  });
});
;define("coinsph/validators/inclusion", ["exports", "ember-cp-validations/validators/inclusion"], function (_exports, _inclusion) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _inclusion.default;
    }
  });
});
;define("coinsph/validators/inline", ["exports", "ember-cp-validations/validators/inline"], function (_exports, _inline) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _inline.default;
    }
  });
});
;define("coinsph/validators/length", ["exports", "ember-cp-validations/validators/length"], function (_exports, _length) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _length.default;
    }
  });
});
;define("coinsph/validators/messages", ["exports", "ember-intl-cp-validations/validators/messages"], function (_exports, _messages) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _messages.default;
    }
  });
});
;define("coinsph/validators/number", ["exports", "ember-cp-validations/validators/number"], function (_exports, _number) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _number.default;
    }
  });
});
;define("coinsph/validators/presence", ["exports", "ember-cp-validations/validators/presence"], function (_exports, _presence) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _presence.default;
    }
  });
});
;define("coinsph/validators/sign-up", ["exports", "ember-cp-validations"], function (_exports, _emberCpValidations) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _emberCpValidations.buildValidations)({
    'user.email': [(0, _emberCpValidations.validator)('format', {
      type: 'email',
      allowBlank: false
    })],
    'user.username': [(0, _emberCpValidations.validator)('presence', true), (0, _emberCpValidations.validator)('unique', {
      debounce: 400,
      fieldName: 'username'
    })],
    'password': [(0, _emberCpValidations.validator)('presence', true)],
    'passwordConfirm': [(0, _emberCpValidations.validator)('presence', true), (0, _emberCpValidations.validator)('confirmation', {
      allowBlank: false,
      on: 'password',
      messageKey: 'signUp.form.errors.password'
    })]
  });

  _exports.default = _default;
});
;define("coinsph/validators/unique", ["exports", "ember-cp-validations/validators/base", "coinsph/config/environment"], function (_exports, _base, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _base.default.extend({
    ajax: Ember.inject.service(),

    validate(value, options) {
      const data = {};
      data[options.fieldName] = value;
      return this.get('ajax').raw("".concat(_environment.default.host, "/").concat(_environment.default.namespace, "/check"), {
        method: 'POST',
        data
      }).then(() => {
        return true;
      }).catch(({
        payload
      }) => {
        const message = Ember.get(payload, "errors.".concat(options.fieldName, ".message"));
        return message || "".concat(options.fieldName, " is not unique");
      });
    }

  });

  _exports.default = _default;
});
;

;define('coinsph/config/environment', [], function() {
  var prefix = 'coinsph';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("coinsph/app")["default"].create({"name":"coinsph","version":"0.0.0+3bee2bfa"});
          }
        
//# sourceMappingURL=coinsph.map
