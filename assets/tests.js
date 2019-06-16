'use strict';

define("coinsph/tests/acceptance/signup-base-scenario-test", ["qunit", "@ember/test-helpers", "ember-qunit", "ember-cli-mirage/test-support/setup-mirage"], function (_qunit, _testHelpers, _emberQunit, _setupMirage) {
  "use strict";

  const SELECTORS = {
    username: '#username',
    email: '#email',
    password: '#password',
    passwordConfirm: '#passwordConfirm',
    submit: '#submit',
    thanks: '#thanks'
  };
  (0, _qunit.module)('Acceptance | sign-up base scenario', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _setupMirage.default)(hooks);
    (0, _qunit.test)('sign-up base scenario', async function (assert) {
      await (0, _testHelpers.visit)('/');
      assert.equal((0, _testHelpers.currentURL)(), '/sign-up', 'Redirected to the sign-up page');
      assert.notOk((0, _testHelpers.find)(SELECTORS.thanks), 'Thanks message is hidden');
      await (0, _testHelpers.fillIn)(SELECTORS.username, 'test name');
      await (0, _testHelpers.fillIn)(SELECTORS.email, 'test@test.com');
      await (0, _testHelpers.fillIn)(SELECTORS.password, '12345');
      await (0, _testHelpers.fillIn)(SELECTORS.passwordConfirm, '12345');
      await (0, _testHelpers.click)(SELECTORS.submit);
      assert.equal((0, _testHelpers.currentURL)(), '/', 'Redirected to the root page');
      assert.ok((0, _testHelpers.find)(SELECTORS.thanks), 'Thanks message was shown');
    });
  });
});
define("coinsph/tests/acceptance/signup-validators-test", ["qunit", "@ember/test-helpers", "ember-qunit", "ember-cli-mirage/test-support/setup-mirage"], function (_qunit, _testHelpers, _emberQunit, _setupMirage) {
  "use strict";

  const SELECTORS = {
    username: '#username',
    email: '#email',
    password: '#password',
    passwordConfirm: '#passwordConfirm',
    submit: '#submit',
    thanks: '#thanks'
  };
  const CLASSES = {
    error: 'form-input__invalid'
  };
  (0, _qunit.module)('Acceptance | sign-up validators test', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _setupMirage.default)(hooks);
    (0, _qunit.test)('sign-up validators', async function (assert) {
      await (0, _testHelpers.visit)('/');
      assert.notOk((0, _testHelpers.find)("".concat(SELECTORS.username, ".").concat(CLASSES.error)), 'username field without error class');
      assert.notOk((0, _testHelpers.find)("".concat(SELECTORS.email, ".").concat(CLASSES.error)), 'email field without error class');
      assert.notOk((0, _testHelpers.find)("".concat(SELECTORS.password, ".").concat(CLASSES.error)), 'password field without error class');
      assert.notOk((0, _testHelpers.find)("".concat(SELECTORS.passwordConfirm, ".").concat(CLASSES.error)), 'passwordConfirm field without error class');
      assert.ok((0, _testHelpers.find)("".concat(SELECTORS.submit, ":disabled")), 'submit button is disabled');
      await (0, _testHelpers.blur)(SELECTORS.username);
      await (0, _testHelpers.blur)(SELECTORS.email);
      await (0, _testHelpers.blur)(SELECTORS.password);
      await (0, _testHelpers.blur)(SELECTORS.passwordConfirm);
      assert.ok((0, _testHelpers.find)("".concat(SELECTORS.username, ".").concat(CLASSES.error)), 'username field has error class');
      assert.ok((0, _testHelpers.find)("".concat(SELECTORS.email, ".").concat(CLASSES.error)), 'email field has error class');
      assert.ok((0, _testHelpers.find)("".concat(SELECTORS.password, ".").concat(CLASSES.error)), 'password field has error class');
      assert.ok((0, _testHelpers.find)("".concat(SELECTORS.passwordConfirm, ".").concat(CLASSES.error)), 'passwordConfirm field has error class');
    });
  });
});
define("coinsph/tests/lint/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });
  QUnit.test('adapters/user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/user.js should pass ESLint\n\n');
  });
  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });
  QUnit.test('components/errors-explanation.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/errors-explanation.js should pass ESLint\n\n');
  });
  QUnit.test('components/form/form-input.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/form/form-input.js should pass ESLint\n\n');
  });
  QUnit.test('components/login-form.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/login-form.js should pass ESLint\n\n');
  });
  QUnit.test('const/errors.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'const/errors.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/sign-up.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/sign-up.js should pass ESLint\n\n');
  });
  QUnit.test('models/user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/user.js should pass ESLint\n\n');
  });
  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });
  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });
  QUnit.test('validators/sign-up.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'validators/sign-up.js should pass ESLint\n\n');
  });
  QUnit.test('validators/unique.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'validators/unique.js should pass ESLint\n\n');
  });
});
define("coinsph/tests/lint/templates.template.lint-test", [], function () {
  "use strict";

  QUnit.module('TemplateLint');
  QUnit.test('coinsph/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'coinsph/templates/application.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('coinsph/templates/components/errors-explanation.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'coinsph/templates/components/errors-explanation.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('coinsph/templates/components/form/form-input.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'coinsph/templates/components/form/form-input.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('coinsph/templates/components/login-form.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'coinsph/templates/components/login-form.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('coinsph/templates/index.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'coinsph/templates/index.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('coinsph/templates/sign-up.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'coinsph/templates/sign-up.hbs should pass TemplateLint.\n\n');
  });
});
define("coinsph/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('acceptance/signup-base-scenario-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/signup-base-scenario-test.js should pass ESLint\n\n');
  });
  QUnit.test('acceptance/signup-validators-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/signup-validators-test.js should pass ESLint\n\n');
  });
  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
  QUnit.test('unit/adapters/application-adapter-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-adapter-test.js should pass ESLint\n\n');
  });
});
define("coinsph/tests/test-helper", ["coinsph/app", "coinsph/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("coinsph/tests/unit/adapters/application-adapter-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('should camelize parsed error keys', function (assert) {
      const appAdapter = this.owner.lookup('adapter:application');
      const data = {
        errors: {
          username: {
            message: 'test'
          },
          some_field: {
            message: 'test2'
          }
        }
      };
      const dataCopy = JSON.parse(JSON.stringify(data));
      appAdapter.parseErrorResponse(dataCopy);
      Object.keys(data.errors).forEach(key => {
        const camelized = dataCopy.errors[Ember.String.camelize(key)].message;
        const original = data.errors[key].message;
        assert.ok(camelized === original, "".concat(key, " camelized"));
      });
    });
  });
});
define('coinsph/config/environment', [], function() {
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

require('coinsph/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
