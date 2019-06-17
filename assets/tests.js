'use strict';

define("coinsph/tests/acceptance/signup-form-test", ["qunit", "@ember/test-helpers", "ember-qunit", "ember-cli-mirage/test-support/setup-mirage"], function (_qunit, _testHelpers, _emberQunit, _setupMirage) {
  "use strict";

  const SELECTORS = {
    username: '[data-test-signup-username]',
    email: '[data-test-signup-email]',
    password: '[data-test-signup-password]',
    passwordConfirm: '[data-test-signup-passwordConfirm]',
    submit: '[data-test-signup-submit]',
    thanks: '[data-test-thanks-title]',
    errorMessage: '[data-test-error-message]'
  };
  const CLASSES = {
    error: 'form-input__invalid'
  };
  (0, _qunit.module)('Acceptance | sign-up form', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _setupMirage.default)(hooks);
    (0, _qunit.test)('sign-up base scenario', async function (assert) {
      await (0, _testHelpers.visit)('/');
      assert.equal((0, _testHelpers.currentURL)(), '/sign-up', 'Redirected to the sign-up page');
      assert.dom(SELECTORS.thanks).doesNotExist('Thanks message is hidden');
      await (0, _testHelpers.fillIn)("".concat(SELECTORS.username, " input"), 'test name');
      await (0, _testHelpers.fillIn)("".concat(SELECTORS.email, " input"), 'test@test.com');
      await (0, _testHelpers.fillIn)("".concat(SELECTORS.password, " input"), '12345');
      await (0, _testHelpers.fillIn)("".concat(SELECTORS.passwordConfirm, " input"), '12345');
      assert.dom("".concat(SELECTORS.submit)).isNotDisabled('submit button is not disabled');
      await (0, _testHelpers.click)(SELECTORS.submit);
      assert.equal((0, _testHelpers.currentURL)(), '/thanks', 'Redirected to the thanks page');
      assert.dom(SELECTORS.thanks).exists('Thanks message was shown');
    });
    (0, _qunit.test)('sign-up validators', async function (assert) {
      await (0, _testHelpers.visit)('/sign-up');
      assert.dom("".concat(SELECTORS.username, ".").concat(CLASSES.error)).doesNotExist('username field without error class');
      assert.dom("".concat(SELECTORS.email, ".").concat(CLASSES.error)).doesNotExist('email field without error class');
      assert.dom("".concat(SELECTORS.password, ".").concat(CLASSES.error)).doesNotExist('password field without error class');
      assert.dom("".concat(SELECTORS.passwordConfirm, ".").concat(CLASSES.error)).doesNotExist('passwordConfirm field without error class');
      assert.dom("".concat(SELECTORS.submit)).isDisabled('submit button is disabled');
      await (0, _testHelpers.fillIn)("".concat(SELECTORS.username, " input"), '');
      await (0, _testHelpers.blur)("".concat(SELECTORS.username, " input"));
      assert.dom("".concat(SELECTORS.username, " ").concat(SELECTORS.errorMessage)).exists('username error shown');
      await (0, _testHelpers.fillIn)("".concat(SELECTORS.email, " input"), '');
      await (0, _testHelpers.blur)("".concat(SELECTORS.email, " input"));
      assert.dom("".concat(SELECTORS.email, " ").concat(SELECTORS.errorMessage)).exists('email error shown');
      await (0, _testHelpers.fillIn)("".concat(SELECTORS.password, " input"), '');
      await (0, _testHelpers.blur)("".concat(SELECTORS.password, " input"));
      assert.dom("".concat(SELECTORS.password, " ").concat(SELECTORS.errorMessage)).exists('password error shown');
      await (0, _testHelpers.fillIn)("".concat(SELECTORS.passwordConfirm, " input"), '');
      await (0, _testHelpers.blur)("".concat(SELECTORS.passwordConfirm, " input"));
      assert.dom("".concat(SELECTORS.passwordConfirm, " ").concat(SELECTORS.errorMessage)).exists('passwordConfirm error shown');
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
  QUnit.test('routes/sign-up.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/sign-up.js should pass ESLint\n\n');
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
  QUnit.test('coinsph/templates/sign-up.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'coinsph/templates/sign-up.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('coinsph/templates/thanks.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'coinsph/templates/thanks.hbs should pass TemplateLint.\n\n');
  });
});
define("coinsph/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('acceptance/signup-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/signup-form-test.js should pass ESLint\n\n');
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
