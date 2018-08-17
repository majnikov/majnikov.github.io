'use strict';

define('webapp/tests/acceptance/charge-base-scenario-test', ['qunit', '@ember/test-helpers', 'ember-qunit', 'ember-cli-mirage/test-support/setup-mirage', 'webapp/mirage/fixtures/operators'], function (_qunit, _testHelpers, _emberQunit, _setupMirage, _operators) {
  'use strict';

  const SELECTORS = {
    chargeAmountField: '#chargeAmountField',
    chargePhoneField: '#chargePhoneField',
    chargeSubmitButton: '#chargeSubmitButton'
  };

  (0, _qunit.module)('Acceptance | charge base scenario', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _setupMirage.default)(hooks);

    (0, _qunit.test)('charge base scenario', async function (assert) {

      const notifyMock = Ember.Service.extend({
        setTarget() {
          return null;
        },
        success() {
          assert.ok('success', 'success message was shown');
        }
      });

      this.owner.register('service:notify', notifyMock);

      assert.expect(3);

      const operator = _operators.default[0];

      await (0, _testHelpers.visit)('/');

      await (0, _testHelpers.click)(this.element.querySelector(`#${operator.code}`));

      assert.equal((0, _testHelpers.currentURL)(), `/operators/${operator.id}/pay`, 'visit charge page');

      await (0, _testHelpers.fillIn)(SELECTORS.chargePhoneField, '1234567890');
      await (0, _testHelpers.fillIn)(SELECTORS.chargeAmountField, '500');

      await (0, _testHelpers.click)(SELECTORS.chargeSubmitButton);

      assert.equal((0, _testHelpers.currentURL)(), '/operators', 'redirected to the root page');
    });
  });
});
define('webapp/tests/acceptance/charge-fail-scenarios-test', ['qunit', '@ember/test-helpers', 'ember-qunit', 'ember-cli-mirage/test-support/setup-mirage', 'webapp/mirage/fixtures/operators'], function (_qunit, _testHelpers, _emberQunit, _setupMirage, _operators) {
  'use strict';

  const SELECTORS = {
    chargeAmountField: '#chargeAmountField',
    chargePhoneField: '#chargePhoneField',
    chargeSubmitButton: '#chargeSubmitButton',

    chargeAmountFieldErrorLabel: '.form-label--error > #chargePhoneField',
    chargePhoneFieldErrorLabel: '.form-label--error > #chargePhoneField'
  };

  (0, _qunit.module)('Acceptance | charge fail scenarios', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _setupMirage.default)(hooks);

    (0, _qunit.test)('charge empty fields scenario', async function (assert) {
      assert.expect(4);

      const operator = _operators.default[0];

      await (0, _testHelpers.visit)('/');

      await (0, _testHelpers.click)(this.element.querySelector(`#${operator.code}`));

      assert.equal((0, _testHelpers.currentURL)(), `/operators/${operator.id}/pay`, 'visit charge page');

      await (0, _testHelpers.fillIn)(SELECTORS.chargePhoneField, '');
      await (0, _testHelpers.fillIn)(SELECTORS.chargeAmountField, '');

      await (0, _testHelpers.click)(SELECTORS.chargeSubmitButton);

      assert.ok(this.element.querySelector(SELECTORS.chargePhoneFieldErrorLabel), 'phone input highlighted as error');
      assert.ok(this.element.querySelector(SELECTORS.chargeAmountFieldErrorLabel), 'amount input highlighted as error');

      assert.equal((0, _testHelpers.currentURL)(), `/operators/${operator.id}/pay`, 'stayed on the charge page');
    });
  });
});
define('webapp/tests/acceptance/visit-charge-page-test', ['qunit', '@ember/test-helpers', 'ember-qunit', 'ember-cli-mirage/test-support/setup-mirage', 'webapp/mirage/fixtures/operators'], function (_qunit, _testHelpers, _emberQunit, _setupMirage, _operators) {
  'use strict';

  const SELECTORS = {
    chargeOperatorField: '#chargeOperatorField'
  };

  (0, _qunit.module)('Acceptance | charge page', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _setupMirage.default)(hooks);

    (0, _qunit.test)('visit charge page', async function (assert) {
      assert.expect(1);

      const operator = _operators.default[0];

      await (0, _testHelpers.visit)(`/operators/${operator.id}/pay`);

      assert.equal((0, _testHelpers.currentURL)(), `/operators/${operator.id}/pay`, 'visit charge page');
    });

    (0, _qunit.test)('charge page init operator', async function (assert) {
      assert.expect(1);

      const operator = _operators.default[0];

      await (0, _testHelpers.visit)(`/operators/${operator.id}/pay`);

      assert.equal(this.element.querySelector(SELECTORS.chargeOperatorField).textContent.trim(), operator.name, 'actual operator name');
    });
  });
});
define('webapp/tests/acceptance/visit-operators-list-test', ['qunit', '@ember/test-helpers', 'ember-qunit', 'ember-cli-mirage/test-support/setup-mirage', 'webapp/mirage/fixtures/operators'], function (_qunit, _testHelpers, _emberQunit, _setupMirage, _operators) {
  'use strict';

  const SELECTORS = {
    operatorItem: '.operators-list__item'
  };

  (0, _qunit.module)('Acceptance | operators list', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _setupMirage.default)(hooks);

    (0, _qunit.test)('visit operators list', async function (assert) {
      assert.expect(2);

      await (0, _testHelpers.visit)('/');

      assert.equal((0, _testHelpers.currentURL)(), '/operators', 'visit root page');

      assert.equal(this.element.querySelectorAll(SELECTORS.operatorItem).length, _operators.default.length, 'actual operators count');
    });

    (0, _qunit.test)('go to charge page from operators list', async function (assert) {
      assert.expect(1);

      await (0, _testHelpers.visit)('/');

      const operator = _operators.default[0];

      await (0, _testHelpers.click)(this.element.querySelector(`#${operator.code}`));

      assert.equal((0, _testHelpers.currentURL)(), `/operators/${operator.id}/pay`, 'visit charge page');
    });
  });
});
define('webapp/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/app-container.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/app-container.js should pass ESLint\n\n');
  });

  QUnit.test('components/charge-form.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/charge-form.js should pass ESLint\n\n');
  });

  QUnit.test('components/form-button.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/form-button.js should pass ESLint\n\n');
  });

  QUnit.test('components/form-container.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/form-container.js should pass ESLint\n\n');
  });

  QUnit.test('components/form-error.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/form-error.js should pass ESLint\n\n');
  });

  QUnit.test('components/form-input-mask.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/form-input-mask.js should pass ESLint\n\n');
  });

  QUnit.test('components/form-label.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/form-label.js should pass ESLint\n\n');
  });

  QUnit.test('components/form-submit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/form-submit.js should pass ESLint\n\n');
  });

  QUnit.test('const/errors.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'const/errors.js should pass ESLint\n\n');
  });

  QUnit.test('const/phones.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'const/phones.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/operators/charge.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/operators/charge.js should pass ESLint\n\n');
  });

  QUnit.test('locales/ru/translations.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'locales/ru/translations.js should pass ESLint\n\n');
  });

  QUnit.test('models/charge.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/charge.js should pass ESLint\n\n');
  });

  QUnit.test('models/operator.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/operator.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/operators.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/operators.js should pass ESLint\n\n');
  });

  QUnit.test('routes/operators/charge.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/operators/charge.js should pass ESLint\n\n');
  });

  QUnit.test('routes/operators/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/operators/index.js should pass ESLint\n\n');
  });

  QUnit.test('validations/messages.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'validations/messages.js should pass ESLint\n\n');
  });

  QUnit.test('validators/charge.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'validators/charge.js should pass ESLint\n\n');
  });
});
define('webapp/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
    if (window.server) {
      window.server.shutdown();
    }
  }
});
define('webapp/tests/helpers/ember-i18n/test-helpers', ['ember-i18n/test-support/-private/t', 'ember-i18n/test-support/-private/assert-translation'], function (_t2, _assertTranslation2) {
  'use strict';

  // example usage: find(`.header:contains(${t('welcome_message')})`)
  Ember.Test.registerHelper('t', function (app, key, interpolations) {
    return (0, _t2.default)(app.__container__, key, interpolations);
  });

  // example usage: expectTranslation('.header', 'welcome_message');
  Ember.Test.registerHelper('expectTranslation', function (app, element, key, interpolations) {
    const text = (0, _t2.default)(app.__container__, key, interpolations);

    (0, _assertTranslation2.default)(element, key, text);
  });
});
define('webapp/tests/helpers/ember-power-select', ['exports', 'ember-power-select/test-support/helpers'], function (exports, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.selectChoose = exports.touchTrigger = exports.nativeTouch = exports.clickTrigger = exports.typeInSearch = exports.triggerKeydown = exports.nativeMouseUp = exports.nativeMouseDown = exports.findContains = undefined;
  exports.default = deprecatedRegisterHelpers;


  function deprecateHelper(fn, name) {
    return function (...args) {
      (true && !(false) && Ember.deprecate(`DEPRECATED \`import { ${name} } from '../../tests/helpers/ember-power-select';\` is deprecated. Please, replace it with \`import { ${name} } from 'ember-power-select/test-support/helpers';\``, false, { until: '1.11.0', id: `ember-power-select-test-support-${name}` }));

      return fn(...args);
    };
  }

  let findContains = deprecateHelper(_helpers.findContains, 'findContains');
  let nativeMouseDown = deprecateHelper(_helpers.nativeMouseDown, 'nativeMouseDown');
  let nativeMouseUp = deprecateHelper(_helpers.nativeMouseUp, 'nativeMouseUp');
  let triggerKeydown = deprecateHelper(_helpers.triggerKeydown, 'triggerKeydown');
  let typeInSearch = deprecateHelper(_helpers.typeInSearch, 'typeInSearch');
  let clickTrigger = deprecateHelper(_helpers.clickTrigger, 'clickTrigger');
  let nativeTouch = deprecateHelper(_helpers.nativeTouch, 'nativeTouch');
  let touchTrigger = deprecateHelper(_helpers.touchTrigger, 'touchTrigger');
  let selectChoose = deprecateHelper(_helpers.selectChoose, 'selectChoose');

  function deprecatedRegisterHelpers() {
    (true && !(false) && Ember.deprecate("DEPRECATED `import registerPowerSelectHelpers from '../../tests/helpers/ember-power-select';` is deprecated. Please, replace it with `import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';`", false, { until: '1.11.0', id: 'ember-power-select-test-support-register-helpers' }));

    return (0, _helpers.default)();
  }

  exports.findContains = findContains;
  exports.nativeMouseDown = nativeMouseDown;
  exports.nativeMouseUp = nativeMouseUp;
  exports.triggerKeydown = triggerKeydown;
  exports.typeInSearch = typeInSearch;
  exports.clickTrigger = clickTrigger;
  exports.nativeTouch = nativeTouch;
  exports.touchTrigger = touchTrigger;
  exports.selectChoose = selectChoose;
});
define('webapp/tests/integration/components/charge-form-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  const SELECTORS = {
    chargeAmountField: '#chargeAmountField',
    chargeOperatorField: '#chargeOperatorField',
    chargePhoneField: '#chargePhoneField',
    chargeBackButton: '#chargeBackButton',
    chargeSubmitButton: '#chargeSubmitButton'
  };

  (0, _qunit.module)('Integration | Component | charge-form', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(5);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "kyjlCqYp",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"charge-form\",null,null,{\"statements\":[[0,\"        charge-form text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.querySelectorAll(SELECTORS.chargeOperatorField).length, 1, 'charge-form contains one operator field');
      assert.equal(this.element.querySelectorAll(SELECTORS.chargePhoneField).length, 1, 'charge-form contains one phone field');
      assert.equal(this.element.querySelectorAll(SELECTORS.chargeAmountField).length, 1, 'charge-form contains one amount field');

      assert.equal(this.element.querySelectorAll(SELECTORS.chargeBackButton).length, 1, 'charge-form contains one back button');
      assert.equal(this.element.querySelectorAll(SELECTORS.chargeSubmitButton).length, 1, 'charge-form contains one submit button');
    });
  });
});
define('webapp/tests/test-helper', ['webapp/app', 'webapp/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('webapp/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('acceptance/charge-base-scenario-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/charge-base-scenario-test.js should pass ESLint\n\n');
  });

  QUnit.test('acceptance/charge-fail-scenarios-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/charge-fail-scenarios-test.js should pass ESLint\n\n');
  });

  QUnit.test('acceptance/visit-charge-page-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/visit-charge-page-test.js should pass ESLint\n\n');
  });

  QUnit.test('acceptance/visit-operators-list-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/visit-operators-list-test.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/charge-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/charge-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
});
define('webapp/config/environment', [], function() {
  var prefix = 'webapp';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('webapp/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
