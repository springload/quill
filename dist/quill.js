/*! Quill Editor v0.20.0
 *  https://quilljs.com/
 *  Copyright (c) 2014, Jason Chen
 *  Copyright (c) 2013, salesforce.com
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Quill"] = factory();
	else
		root["Quill"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _modulesAuthorship = __webpack_require__(1);

	var _modulesAuthorship2 = _interopRequireDefault(_modulesAuthorship);

	var _modulesImageTooltip = __webpack_require__(30);

	var _modulesImageTooltip2 = _interopRequireDefault(_modulesImageTooltip);

	var _modulesKeyboard = __webpack_require__(33);

	var _modulesKeyboard2 = _interopRequireDefault(_modulesKeyboard);

	var _modulesLinkTooltip = __webpack_require__(35);

	var _modulesLinkTooltip2 = _interopRequireDefault(_modulesLinkTooltip);

	var _modulesMultiCursor = __webpack_require__(36);

	var _modulesMultiCursor2 = _interopRequireDefault(_modulesMultiCursor);

	var _modulesPasteManager = __webpack_require__(37);

	var _modulesPasteManager2 = _interopRequireDefault(_modulesPasteManager);

	var _modulesToolbar = __webpack_require__(38);

	var _modulesToolbar2 = _interopRequireDefault(_modulesToolbar);

	var _modulesTooltip = __webpack_require__(31);

	var _modulesTooltip2 = _interopRequireDefault(_modulesTooltip);

	var _modulesUndoManager = __webpack_require__(39);

	var _modulesUndoManager2 = _interopRequireDefault(_modulesUndoManager);

	var _quill = __webpack_require__(2);

	var _quill2 = _interopRequireDefault(_quill);

	exports['default'] = _quill2['default'];
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _quill = __webpack_require__(2);

	var _quill2 = _interopRequireDefault(_quill);

	var Delta = _quill2['default'].require('delta');

	var Authorship = (function () {
	  function Authorship(quill) {
	    var _this = this;

	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, Authorship);

	    this.quill = quill;
	    this.options = options;
	    if (this.options.button != null) {
	      this.attachButton(this.options.button);
	    }
	    if (this.options.enabled) {
	      this.enable();
	    }
	    this.quill.addFormat('author', {
	      "class": 'author-'
	    });
	    if (this.options.authorId == null) return;
	    this.quill.on(_quill2['default'].events.PRE_EVENT, function (eventName, delta, source) {
	      if (eventName === _quill2['default'].events.TEXT_CHANGE && source === _quill2['default'].sources.USER) {
	        (function () {
	          var authorDelta = new Delta();
	          var authorFormat = { author: _this.options.authorId };
	          delta.ops.forEach(function (op) {
	            if (op['delete'] != null) return;
	            if (op.insert != null || op.retain != null && op.attributes != null) {
	              op.attributes = op.attributes || {};
	              op.attributes.author = this.options.authorId;
	              authorDelta.retain(op.retain || op.insert.length || 1, authorFormat);
	            } else {
	              authorDelta.retain(op.retain);
	            }
	          });
	          _this.quill.updateContents(authorDelta, _quill2['default'].sources.SILENT);
	        })();
	      }
	    });
	    this.addAuthor(this.options.authorId, this.options.color);
	  }

	  _createClass(Authorship, [{
	    key: 'addAuthor',
	    value: function addAuthor(id, color) {
	      this.quill.theme.addStyles(".authorship .author-" + id + " { \"background-color: " + color + ";\" }");
	    }
	  }, {
	    key: 'attachButton',
	    value: function attachButton(button) {
	      var _this2 = this;

	      button.addEventListener('click', function () {
	        button.classList.toggle('ql-on');
	        _this2.enable(button.classList.contains('ql-on'));
	      });
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      this.enable(false);
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      var enabled = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      if (enabled === this.quill.root.classList.contains('authorship')) return;
	      this.quill.root.classList.toggle('authorship');
	    }
	  }]);

	  return Authorship;
	})();

	Authorship.DEFAULTS = {
	  authorId: null,
	  color: 'transparent',
	  enabled: false
	};

	_quill2['default'].registerModule('authorship', Authorship);

	exports['default'] = Authorship;
	module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x18, _x19, _x20) { var _again = true; _function: while (_again) { var object = _x18, property = _x19, receiver = _x20; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x18 = parent; _x19 = property; _x20 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _richTextLibDelta = __webpack_require__(3);

	var _richTextLibDelta2 = _interopRequireDefault(_richTextLibDelta);

	var _editor = __webpack_require__(9);

	var _editor2 = _interopRequireDefault(_editor);

	var _eventemitter3 = __webpack_require__(11);

	var _eventemitter32 = _interopRequireDefault(_eventemitter3);

	var _parchment = __webpack_require__(10);

	var _parchment2 = _interopRequireDefault(_parchment);

	var _selection = __webpack_require__(12);

	var _selection2 = _interopRequireDefault(_selection);

	var _extend = __webpack_require__(14);

	var _extend2 = _interopRequireDefault(_extend);

	var _themesBase = __webpack_require__(15);

	var _themesBase2 = _interopRequireDefault(_themesBase);

	var _themesSnow = __webpack_require__(18);

	var _themesSnow2 = _interopRequireDefault(_themesSnow);

	var _blotsBlock = __webpack_require__(21);

	var _blotsBlock2 = _interopRequireDefault(_blotsBlock);

	var _blotsBreak = __webpack_require__(22);

	var _blotsBreak2 = _interopRequireDefault(_blotsBreak);

	var _blotsCursor = __webpack_require__(23);

	var _blotsCursor2 = _interopRequireDefault(_blotsCursor);

	var _formatsBlock = __webpack_require__(24);

	var _formatsBlock2 = _interopRequireDefault(_formatsBlock);

	var _formatsHeader = __webpack_require__(26);

	var _formatsHeader2 = _interopRequireDefault(_formatsHeader);

	var _formatsImage = __webpack_require__(27);

	var _formatsImage2 = _interopRequireDefault(_formatsImage);

	var _formatsInline = __webpack_require__(28);

	var _formatsInline2 = _interopRequireDefault(_formatsInline);

	var _formatsList = __webpack_require__(29);

	var _formatsList2 = _interopRequireDefault(_formatsList);

	var Quill = (function (_EventEmitter) {
	  _inherits(Quill, _EventEmitter);

	  _createClass(Quill, null, [{
	    key: 'registerFormat',
	    value: function registerFormat(format) {
	      var name = format.blotName || format.AttrName;
	      // TODO this is static cannot emit
	      if (_parchment2['default'].match(name)) {
	        this.emit(Quill.events.DEBUG, 'warning', "Overwriting " + name + " format");
	      }
	      _parchment2['default'].register(format);
	    }
	  }, {
	    key: 'registerModule',
	    value: function registerModule(name, module) {
	      if (Quill.modules[name] != null) {
	        this.emit(Quill.events.DEBUG, 'warning', "Overwriting " + name + " module");
	      }
	      Quill.modules[name] = module;
	    }
	  }, {
	    key: 'registerTheme',
	    value: function registerTheme(name, theme) {
	      if (Quill.themes[name] != null) {
	        this.emit(Quill.events.DEBUG, 'warning', "Overwriting " + name + " theme");
	      }
	      Quill.themes[name] = theme;
	    }
	  }, {
	    key: 'require',
	    value: function require(name) {
	      switch (name) {
	        case 'delta':
	          return _richTextLibDelta2['default'];
	        case 'parchment':
	          return _parchment2['default'];
	        case 'range':
	          return _selection2['default'].Range;
	        default:
	          return null;
	      }
	    }
	  }]);

	  function Quill(container) {
	    var _this = this;

	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, Quill);

	    _get(Object.getPrototypeOf(Quill.prototype), 'constructor', this).call(this);
	    this.container = typeof container === 'string' ? document.querySelector(container) : container;
	    if (this.container == null) {
	      throw new Error('Invalid Quill container');
	    }
	    var moduleOptions = (0, _extend2['default'])({}, Quill.DEFAULTS.modules || {}, options.modules);
	    var html = this.container.innerHTML;
	    this.container.innerHTML = '';
	    this.options = (0, _extend2['default'])({}, Quill.DEFAULTS, options);
	    this.options.modules = moduleOptions;
	    this.options.id = uniqueId('ql-editor-');
	    this.modules = {};
	    this.root = this.addContainer('ql-editor');
	    this.root.innerHTML = html.trim();
	    this.root.setAttribute('id', this.options.id);
	    this.editor = new _editor2['default'](this.root);
	    this.selection = new _selection2['default'](this.editor);
	    this.editor.onUpdate = function (delta) {
	      var source = arguments.length <= 1 || arguments[1] === undefined ? Quill.sources.USER : arguments[1];

	      _this.emit(Quill.events.TEXT_CHANGE, delta, source);
	    };
	    this.selection.onUpdate = function (range) {
	      var source = arguments.length <= 1 || arguments[1] === undefined ? Quill.sources.USER : arguments[1];

	      _this.emit(Quill.events.SELECTION_CHANGE, range, source);
	    };
	    if (this.options.theme === false) {
	      this.theme = new Quill.themes.base(this, false);
	    } else {
	      var themeClass = Quill.themes[this.options.theme];
	      if (themeClass != null) {
	        this.theme = new themeClass(this, this.options);
	      } else {
	        throw new Error("Cannot load " + this.options.theme + " theme. Are you sure you registered it?");
	      }
	    }
	    Object.keys(this.options.modules).forEach(function (name) {
	      _this.addModule(name, _this.options.modules[name]);
	    });
	    if (this.options.readOnly) {
	      this.disable();
	    }
	  }

	  _createClass(Quill, [{
	    key: 'addContainer',
	    value: function addContainer(className) {
	      var before = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	      var refNode = before ? this.root : null;
	      var container = document.createElement('div');
	      container.classList.add(className);
	      this.container.insertBefore(container, refNode);
	      return container;
	    }
	  }, {
	    key: 'addModule',
	    value: function addModule(name) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var moduleClass = Quill.modules[name];
	      if (moduleClass == null) {
	        throw new Error("Cannot load " + name + " module. Are you sure you registered it?");
	      }
	      if (options === true) {
	        // Allow addModule('module', true)
	        options = {};
	      } else if (typeof options === 'string' || options instanceof HTMLElement) {
	        // Allow addModule('toolbar', '#toolbar');
	        options = { container: options };
	      }
	      options = (0, _extend2['default'])(moduleClass.DEFAULTS || {}, this.theme.constructor.OPTIONS[name], options);
	      this.modules[name] = new moduleClass(this, options);
	      this.emit(Quill.events.MODULE_INIT, name, this.modules[name]);
	      return this.modules[name];
	    }
	  }, {
	    key: 'deleteText',
	    value: function deleteText(start, end) {
	      var _this2 = this;

	      var source = arguments.length <= 2 || arguments[2] === undefined ? Quill.sources.API : arguments[2];

	      var formats = undefined;

	      var _buildParams2 = this._buildParams(start, end, source);

	      var _buildParams22 = _slicedToArray(_buildParams2, 4);

	      start = _buildParams22[0];
	      end = _buildParams22[1];
	      formats = _buildParams22[2];
	      source = _buildParams22[3];

	      this._track(source, function () {
	        _this2.editor.deleteAt(start, end - start);
	      });
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      this.editor.enable(false);
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      this.editor.enable();
	    }
	  }, {
	    key: 'emit',
	    value: function emit(eventName) {
	      var _get2, _get3, _get4;

	      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        rest[_key - 1] = arguments[_key];
	      }

	      (_get2 = _get(Object.getPrototypeOf(Quill.prototype), 'emit', this)).call.apply(_get2, [this, Quill.events.PRE_EVENT, eventName].concat(rest));
	      (_get3 = _get(Object.getPrototypeOf(Quill.prototype), 'emit', this)).call.apply(_get3, [this, eventName].concat(rest));
	      (_get4 = _get(Object.getPrototypeOf(Quill.prototype), 'emit', this)).call.apply(_get4, [this, Quill.events.POST_EVENT, eventName].concat(rest));
	    }
	  }, {
	    key: 'focus',
	    value: function focus() {
	      this.selection.focus();
	    }
	  }, {
	    key: 'formatLine',
	    value: function formatLine(start, end, name, value, source) {
	      var _this3 = this;

	      var formats = undefined;

	      var _buildParams3 = this._buildParams(start, end, name, value, source);

	      var _buildParams32 = _slicedToArray(_buildParams3, 4);

	      start = _buildParams32[0];
	      end = _buildParams32[1];
	      formats = _buildParams32[2];
	      source = _buildParams32[3];

	      this._track(source, function () {
	        Object.keys(formats).forEach(function (format) {
	          _this3.editor.getLines(start, end - start).forEach(function (lines) {
	            line.format(format, formats[format]);
	          });
	        });
	      });
	    }
	  }, {
	    key: 'formatText',
	    value: function formatText(start, end, name, value, source) {
	      var _this4 = this;

	      var formats = undefined;

	      var _buildParams4 = this._buildParams(start, end, name, value, source);

	      var _buildParams42 = _slicedToArray(_buildParams4, 4);

	      start = _buildParams42[0];
	      end = _buildParams42[1];
	      formats = _buildParams42[2];
	      source = _buildParams42[3];

	      this._track(source, function () {
	        Object.keys(formats).forEach(function (format) {
	          this.editor.formatAt(start, end - start, format, formats[format]);
	        }, _this4);
	      });
	    }
	  }, {
	    key: 'getBounds',
	    value: function getBounds(index) {
	      return this.selection.getBounds(index);
	    }
	  }, {
	    key: 'getContents',
	    value: function getContents() {
	      var start = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	      var end = arguments.length <= 1 || arguments[1] === undefined ? this.getLength() : arguments[1];

	      var _buildParams5 = this._buildParams(start, end);

	      var _buildParams52 = _slicedToArray(_buildParams5, 2);

	      start = _buildParams52[0];
	      end = _buildParams52[1];

	      return this.editor.getDelta().slice(start, end);
	    }
	  }, {
	    key: 'getHTML',
	    value: function getHTML() {
	      // TODO fix
	      return this.root.innerHTML;
	    }
	  }, {
	    key: 'getLength',
	    value: function getLength() {
	      return this.editor.getLength();
	    }
	  }, {
	    key: 'getModule',
	    value: function getModule(name) {
	      return this.modules[name];
	    }
	  }, {
	    key: 'getSelection',
	    value: function getSelection() {
	      var focus = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	      if (focus) this.focus();
	      this.update(); // Make sure we access getRange with editor in consistent state
	      return this.selection.getRange();
	    }
	  }, {
	    key: 'getText',
	    value: function getText() {
	      var start = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	      var end = arguments.length <= 1 || arguments[1] === undefined ? this.getLength() : arguments[1];

	      var _buildParams6 = this._buildParams(start, end);

	      var _buildParams62 = _slicedToArray(_buildParams6, 2);

	      start = _buildParams62[0];
	      end = _buildParams62[1];

	      var values = [].concat.apply([], this.editor.getValue());
	      return values.map(function (value) {
	        return typeof value === 'string' ? value : '';
	      }).join('').slice(start, end);
	    }
	  }, {
	    key: 'insertEmbed',
	    value: function insertEmbed(index, embed, value, source) {
	      var _this5 = this;

	      var formats = undefined;

	      var _buildParams7 = this._buildParams(index, 0, source);

	      var _buildParams72 = _slicedToArray(_buildParams7, 4);

	      index = _buildParams72[0];
	      formats = _buildParams72[2];
	      source = _buildParams72[3];

	      this._track(source, function () {
	        _this5.editor.insertEmbed(index, embed, value, source);
	      });
	    }
	  }, {
	    key: 'insertText',
	    value: function insertText(index, text, name, value, source) {
	      var _this6 = this;

	      var start = undefined;
	      var end = undefined;
	      var formats = undefined;
	      var src = undefined;

	      var _buildParams8 = this._buildParams(index, 0, name, value, source);

	      var _buildParams82 = _slicedToArray(_buildParams8, 4);

	      start = _buildParams82[0];
	      end = _buildParams82[1];
	      formats = _buildParams82[2];
	      src = _buildParams82[3];

	      this._track(src, function () {
	        _this6.editor.insertAt(index, text);
	        Object.keys(formats).forEach(function (format) {
	          this.editor.formatAt(start, text.length, format, formats[format]);
	        }, _this6);
	      });
	    }
	  }, {
	    key: 'onModuleLoad',
	    value: function onModuleLoad(name, callback) {
	      if (this.modules[name]) {
	        // Module already loaded
	        callback(this.modules[name]);
	      }
	      this.on(Quill.events.MODULE_INIT, function (moduleName, module) {
	        if (moduleName === name) {
	          return callback(module);
	        }
	      });
	    }
	  }, {
	    key: 'prepareFormat',
	    value: function prepareFormat(name, value) {
	      this.selection.prepare(name, value);
	    }
	  }, {
	    key: 'setContents',
	    value: function setContents(delta) {
	      var _this7 = this;

	      var source = arguments.length <= 1 || arguments[1] === undefined ? Quill.sources.API : arguments[1];

	      if (Array.isArray(delta)) {
	        delta = new _richTextLibDelta2['default'](delta.slice());
	      } else {
	        delta = delta.slice();
	      }
	      this._track(source, function () {
	        _this7.deleteText(0, _this7.editor.getLength());
	        _this7.editor.applyDelta(delta);
	      });
	    }
	  }, {
	    key: 'setSelection',
	    value: function setSelection(start) {
	      var end = arguments.length <= 1 || arguments[1] === undefined ? start : arguments[1];
	      var source = arguments.length <= 2 || arguments[2] === undefined ? Quill.sources.API : arguments[2];
	      return (function () {
	        var range = undefined;
	        if (typeof end === 'string') {
	          source = end, end = start;
	        }
	        if (typeof start === 'number' && typeof end === 'number') {
	          range = new _selection2['default'].Range(start, end);
	        } else {
	          range = start;
	        }
	        this.selection.setRange(range, source);
	      }).apply(this, arguments);
	    }
	  }, {
	    key: 'setText',
	    value: function setText(text) {
	      var source = arguments.length <= 1 || arguments[1] === undefined ? Quill.sources.API : arguments[1];

	      var delta = new _richTextLibDelta2['default']().insert(text);
	      this.setContents(delta, source);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      var source = arguments.length <= 0 || arguments[0] === undefined ? Quill.sources.USER : arguments[0];

	      var delta = this.editor.update(source);
	      if (delta.length() > 0) {
	        source = Quill.sources.SILENT;
	      }
	      this.selection.update(source);
	    }
	  }, {
	    key: 'updateContents',
	    value: function updateContents(delta) {
	      var _this8 = this;

	      var source = arguments.length <= 1 || arguments[1] === undefined ? Quill.sources.API : arguments[1];

	      if (Array.isArray(delta)) {
	        delta = new _richTextLibDelta2['default'](delta.slice());
	      }
	      this._track(source, function () {
	        _this8.editor.applyDelta(delta);
	      });
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this9 = this;

	      var html = this.getHTML();
	      var contents = this.getContents();

	      this.editor.quill = null;
	      this.editor.onUpdate = null;
	      this.selection.destroy();
	      this.selection = null;
	      this.editor.observer.disconnect();
	      this.editor.observer = null;
	      this.editor.remove();
	      this.editor.domNode = null;
	      this.editor = null;
	      this.selection = null;

	      Object.keys(this.modules).forEach(function (key) {
	        var obj = _this9.modules[key];

	        if (obj.destroy && typeof obj.destroy === 'function') {
	          obj.destroy();
	        }

	        obj = null;
	      });

	      // this.modules = null;
	      this.theme = null;
	      this.container = null;
	      this.root = null;

	      return {
	        html: html,
	        contents: contents
	      };
	    }
	  }, {
	    key: '_buildParams',
	    value: function _buildParams(start, end, name, value, source) {
	      var formats = {};
	      // Handle start/end being indexes, range or excluded (to get current selection)
	      if (typeof start.start === 'number' && typeof start.end === 'number') {
	        // Allow for throwaway end (used by insertText/insertEmbed)
	        if (typeof end !== 'number') {
	          source = value, value = name, name = end, end = start.end, start = start.start;
	        } else {
	          end = start.end, start = start.start;
	        }
	      } else if (typeof start !== 'number') {
	        var range = this.getSelection(false) || new Range(0, 0);
	        source = name, value = end, name = start, end = range.end, start = range.start;
	      }
	      // Handle format being object, two format name/value strings or excluded
	      if (typeof name === 'object') {
	        formats = name;
	        source = value;
	      } else if (typeof name === 'string') {
	        if (value != null) {
	          formats[name] = value;
	        } else {
	          source = name;
	        }
	      }
	      // Handle optional source
	      source = source || Quill.sources.API;
	      return [start, end, formats, source];
	    }
	  }, {
	    key: '_track',
	    value: function _track(source, callback) {
	      this.update();
	      callback.call(this);
	      this.update(source);
	    }
	  }]);

	  return Quill;
	})(_eventemitter32['default']);

	Quill.version = ("0.20.0");
	Quill.modules = {};
	Quill.themes = {};

	Quill.DEFAULTS = {
	  formats: ['align', 'direction', 'bullet', 'header', 'list', 'bold', 'code', 'italic', 'script', 'strike', 'underline', 'link', 'background', 'color', 'font', 'size', 'image'],
	  modules: {
	    'keyboard': true,
	    'paste-manager': true,
	    'undo-manager': true
	  },
	  readOnly: false,
	  theme: 'base'
	};
	Quill.events = {
	  DEBUG: 'debug',
	  FORMAT_INIT: 'format-init',
	  MODULE_INIT: 'module-init',
	  POST_EVENT: 'post-event',
	  PRE_EVENT: 'pre-event',
	  SELECTION_CHANGE: 'selection-change',
	  TEXT_CHANGE: 'text-change'
	};
	Quill.sources = {
	  API: 'api',
	  SILENT: 'silent',
	  USER: 'user'
	};

	function uniqueId(prefix) {
	  uniqueId.counter = uniqueId.counter || 1;
	  return prefix + uniqueId.counter++;
	}

	Quill.registerTheme('base', _themesBase2['default']);
	// Quill.registerTheme('snow', SnowTheme);

	exports['default'] = Quill;
	module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var diff = __webpack_require__(4);
	var equal = __webpack_require__(5);
	var op = __webpack_require__(8);


	var NULL_CHARACTER = String.fromCharCode(0);  // Placeholder char for embed in diff()


	var Delta = function (ops) {
	  // Assume we are given a well formed ops
	  if (Array.isArray(ops)) {
	    this.ops = ops;
	  } else if (ops != null && Array.isArray(ops.ops)) {
	    this.ops = ops.ops;
	  } else {
	    this.ops = [];
	  }
	};


	Delta.prototype.insert = function (text, attributes) {
	  var newOp = {};
	  if (text.length === 0) return this;
	  newOp.insert = text;
	  if (typeof attributes === 'object' && Object.keys(attributes).length > 0) newOp.attributes = attributes;
	  return this.push(newOp);
	};

	Delta.prototype['delete'] = function (length) {
	  if (length <= 0) return this;
	  return this.push({ 'delete': length });
	};

	Delta.prototype.retain = function (length, attributes) {
	  if (length <= 0) return this;
	  var newOp = { retain: length };
	  if (typeof attributes === 'object' && Object.keys(attributes).length > 0) newOp.attributes = attributes;
	  return this.push(newOp);
	};

	Delta.prototype.push = function (newOp) {
	  var index = this.ops.length;
	  var lastOp = this.ops[index - 1];
	  newOp = op.clone(newOp);
	  if (typeof lastOp === 'object') {
	    if (typeof newOp['delete'] === 'number' && typeof lastOp['delete'] === 'number') {
	      this.ops[index - 1] = { 'delete': lastOp['delete'] + newOp['delete'] };
	      return this;
	    }
	    // Since it does not matter if we insert before or after deleting at the same index,
	    // always prefer to insert first
	    if (typeof lastOp['delete'] === 'number' && newOp.insert != null) {
	      index -= 1;
	      lastOp = this.ops[index - 1];
	      if (typeof lastOp !== 'object') {
	        this.ops.unshift(newOp);
	        return this;
	      }
	    }
	    if (equal(newOp.attributes, lastOp.attributes)) {
	      if (typeof newOp.insert === 'string' && typeof lastOp.insert === 'string') {
	        this.ops[index - 1] = { insert: lastOp.insert + newOp.insert };
	        if (typeof newOp.attributes === 'object') this.ops[index - 1].attributes = newOp.attributes
	        return this;
	      } else if (typeof newOp.retain === 'number' && typeof lastOp.retain === 'number') {
	        this.ops[index - 1] = { retain: lastOp.retain + newOp.retain };
	        if (typeof newOp.attributes === 'object') this.ops[index - 1].attributes = newOp.attributes
	        return this;
	      }
	    }
	  }
	  if (index === this.ops.length) {
	    this.ops.push(newOp);
	  } else {
	    this.ops.splice(index, 0, newOp);
	  }
	  return this;
	};

	Delta.prototype.chop = function () {
	  var lastOp = this.ops[this.ops.length - 1];
	  if (lastOp && lastOp.retain && !lastOp.attributes) {
	    this.ops.pop();
	  }
	  return this;
	};

	Delta.prototype.length = function () {
	  return this.ops.reduce(function (length, elem) {
	    return length + op.length(elem);
	  }, 0);
	};

	Delta.prototype.slice = function (start, end) {
	  start = start || 0;
	  if (typeof end !== 'number') end = Infinity;
	  var delta = new Delta();
	  var iter = op.iterator(this.ops);
	  var index = 0;
	  while (index < end && iter.hasNext()) {
	    var nextOp;
	    if (index < start) {
	      nextOp = iter.next(start - index);
	    } else {
	      nextOp = iter.next(end - index);
	      delta.push(nextOp);
	    }
	    index += op.length(nextOp);
	  }
	  return delta;
	};


	Delta.prototype.compose = function (other) {
	  var thisIter = op.iterator(this.ops);
	  var otherIter = op.iterator(other.ops);
	  var delta = new Delta();
	  while (thisIter.hasNext() || otherIter.hasNext()) {
	    if (otherIter.peekType() === 'insert') {
	      delta.push(otherIter.next());
	    } else if (thisIter.peekType() === 'delete') {
	      delta.push(thisIter.next());
	    } else {
	      var length = Math.min(thisIter.peekLength(), otherIter.peekLength());
	      var thisOp = thisIter.next(length);
	      var otherOp = otherIter.next(length);
	      if (typeof otherOp.retain === 'number') {
	        var newOp = {};
	        if (typeof thisOp.retain === 'number') {
	          newOp.retain = length;
	        } else {
	          newOp.insert = thisOp.insert;
	        }
	        // Preserve null when composing with a retain, otherwise remove it for inserts
	        var attributes = op.attributes.compose(thisOp.attributes, otherOp.attributes, typeof thisOp.retain === 'number');
	        if (attributes) newOp.attributes = attributes;
	        delta.push(newOp);
	      // Other op should be delete, we could be an insert or retain
	      // Insert + delete cancels out
	      } else if (typeof otherOp['delete'] === 'number' && typeof thisOp.retain === 'number') {
	        delta.push(otherOp);
	      }
	    }
	  }
	  return delta.chop();
	};

	Delta.prototype.concat = function (other) {
	  var delta = this.slice();
	  if (other.ops.length > 0) {
	    delta.push(other.ops[0]);
	    delta.ops = delta.ops.concat(other.ops.slice(1));
	  }
	  return delta;
	};

	Delta.prototype.diff = function (other) {
	  var delta = new Delta();
	  if (this.ops === other.ops) {
	    return delta;
	  }
	  var strings = [this.ops, other.ops].map(function (ops) {
	    return ops.map(function (op) {
	      if (op.insert != null) {
	        return typeof op.insert === 'string' ? op.insert : NULL_CHARACTER;
	      }
	      var prep = (ops === other.ops) ? 'on' : 'with';
	      throw new Error('diff() called ' + prep + ' non-document');
	    }).join('');
	  });
	  var diffResult = diff(strings[0], strings[1]);
	  var thisIter = op.iterator(this.ops);
	  var otherIter = op.iterator(other.ops);
	  diffResult.forEach(function (component) {
	    var length = component[1].length;
	    while (length > 0) {
	      var opLength = 0;
	      switch (component[0]) {
	        case diff.INSERT:
	          opLength = Math.min(otherIter.peekLength(), length);
	          delta.push(otherIter.next(opLength));
	          break;
	        case diff.DELETE:
	          opLength = Math.min(length, thisIter.peekLength());
	          thisIter.next(opLength);
	          delta['delete'](opLength);
	          break;
	        case diff.EQUAL:
	          opLength = Math.min(thisIter.peekLength(), otherIter.peekLength(), length);
	          var thisOp = thisIter.next(opLength);
	          var otherOp = otherIter.next(opLength);
	          if (equal(thisOp.insert, otherOp.insert)) {
	            delta.retain(opLength, op.attributes.diff(thisOp.attributes, otherOp.attributes));
	          } else {
	            delta.push(otherOp)['delete'](opLength);
	          }
	          break;
	      }
	      length -= opLength;
	    }
	  });
	  return delta.chop();
	};

	Delta.prototype.transform = function (other, priority) {
	  priority = !!priority;
	  if (typeof other === 'number') {
	    return this.transformPosition(other, priority);
	  }
	  var thisIter = op.iterator(this.ops);
	  var otherIter = op.iterator(other.ops);
	  var delta = new Delta();
	  while (thisIter.hasNext() || otherIter.hasNext()) {
	    if (thisIter.peekType() === 'insert' && (priority || otherIter.peekType() !== 'insert')) {
	      delta.retain(op.length(thisIter.next()));
	    } else if (otherIter.peekType() === 'insert') {
	      delta.push(otherIter.next());
	    } else {
	      var length = Math.min(thisIter.peekLength(), otherIter.peekLength());
	      var thisOp = thisIter.next(length);
	      var otherOp = otherIter.next(length);
	      if (thisOp['delete']) {
	        // Our delete either makes their delete redundant or removes their retain
	        continue;
	      } else if (otherOp['delete']) {
	        delta.push(otherOp);
	      } else {
	        // We retain either their retain or insert
	        delta.retain(length, op.attributes.transform(thisOp.attributes, otherOp.attributes, priority));
	      }
	    }
	  }
	  return delta.chop();
	};

	Delta.prototype.transformPosition = function (index, priority) {
	  priority = !!priority;
	  var thisIter = op.iterator(this.ops);
	  var offset = 0;
	  while (thisIter.hasNext() && offset <= index) {
	    var length = thisIter.peekLength();
	    var nextType = thisIter.peekType();
	    thisIter.next();
	    if (nextType === 'delete') {
	      index -= Math.min(length, index - offset);
	      continue;
	    } else if (nextType === 'insert' && (offset < index || !priority)) {
	      index += length;
	    }
	    offset += length;
	  }
	  return index;
	};


	module.exports = Delta;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/**
	 * This library modifies the diff-patch-match library by Neil Fraser
	 * by removing the patch and match functionality and certain advanced
	 * options in the diff function. The original license is as follows:
	 *
	 * ===
	 *
	 * Diff Match and Patch
	 *
	 * Copyright 2006 Google Inc.
	 * http://code.google.com/p/google-diff-match-patch/
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */


	/**
	 * The data structure representing a diff is an array of tuples:
	 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
	 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
	 */
	var DIFF_DELETE = -1;
	var DIFF_INSERT = 1;
	var DIFF_EQUAL = 0;


	/**
	 * Find the differences between two texts.  Simplifies the problem by stripping
	 * any common prefix or suffix off the texts before diffing.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @param {Int} cursor_pos Expected edit position in text1 (optional)
	 * @return {Array} Array of diff tuples.
	 */
	function diff_main(text1, text2, cursor_pos) {
	  // Check for equality (speedup).
	  if (text1 == text2) {
	    if (text1) {
	      return [[DIFF_EQUAL, text1]];
	    }
	    return [];
	  }

	  // Check cursor_pos within bounds
	  if (cursor_pos < 0 || text1.length < cursor_pos) {
	    cursor_pos = null;
	  }

	  // Trim off common prefix (speedup).
	  var commonlength = diff_commonPrefix(text1, text2);
	  var commonprefix = text1.substring(0, commonlength);
	  text1 = text1.substring(commonlength);
	  text2 = text2.substring(commonlength);

	  // Trim off common suffix (speedup).
	  commonlength = diff_commonSuffix(text1, text2);
	  var commonsuffix = text1.substring(text1.length - commonlength);
	  text1 = text1.substring(0, text1.length - commonlength);
	  text2 = text2.substring(0, text2.length - commonlength);

	  // Compute the diff on the middle block.
	  var diffs = diff_compute_(text1, text2);

	  // Restore the prefix and suffix.
	  if (commonprefix) {
	    diffs.unshift([DIFF_EQUAL, commonprefix]);
	  }
	  if (commonsuffix) {
	    diffs.push([DIFF_EQUAL, commonsuffix]);
	  }
	  diff_cleanupMerge(diffs);
	  if (cursor_pos != null) {
	    diffs = fix_cursor(diffs, cursor_pos);
	  }
	  return diffs;
	};


	/**
	 * Find the differences between two texts.  Assumes that the texts do not
	 * have any common prefix or suffix.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @return {Array} Array of diff tuples.
	 */
	function diff_compute_(text1, text2) {
	  var diffs;

	  if (!text1) {
	    // Just add some text (speedup).
	    return [[DIFF_INSERT, text2]];
	  }

	  if (!text2) {
	    // Just delete some text (speedup).
	    return [[DIFF_DELETE, text1]];
	  }

	  var longtext = text1.length > text2.length ? text1 : text2;
	  var shorttext = text1.length > text2.length ? text2 : text1;
	  var i = longtext.indexOf(shorttext);
	  if (i != -1) {
	    // Shorter text is inside the longer text (speedup).
	    diffs = [[DIFF_INSERT, longtext.substring(0, i)],
	             [DIFF_EQUAL, shorttext],
	             [DIFF_INSERT, longtext.substring(i + shorttext.length)]];
	    // Swap insertions for deletions if diff is reversed.
	    if (text1.length > text2.length) {
	      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
	    }
	    return diffs;
	  }

	  if (shorttext.length == 1) {
	    // Single character string.
	    // After the previous speedup, the character can't be an equality.
	    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
	  }

	  // Check to see if the problem can be split in two.
	  var hm = diff_halfMatch_(text1, text2);
	  if (hm) {
	    // A half-match was found, sort out the return data.
	    var text1_a = hm[0];
	    var text1_b = hm[1];
	    var text2_a = hm[2];
	    var text2_b = hm[3];
	    var mid_common = hm[4];
	    // Send both pairs off for separate processing.
	    var diffs_a = diff_main(text1_a, text2_a);
	    var diffs_b = diff_main(text1_b, text2_b);
	    // Merge the results.
	    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
	  }

	  return diff_bisect_(text1, text2);
	};


	/**
	 * Find the 'middle snake' of a diff, split the problem in two
	 * and return the recursively constructed diff.
	 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @return {Array} Array of diff tuples.
	 * @private
	 */
	function diff_bisect_(text1, text2) {
	  // Cache the text lengths to prevent multiple calls.
	  var text1_length = text1.length;
	  var text2_length = text2.length;
	  var max_d = Math.ceil((text1_length + text2_length) / 2);
	  var v_offset = max_d;
	  var v_length = 2 * max_d;
	  var v1 = new Array(v_length);
	  var v2 = new Array(v_length);
	  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
	  // integers and undefined.
	  for (var x = 0; x < v_length; x++) {
	    v1[x] = -1;
	    v2[x] = -1;
	  }
	  v1[v_offset + 1] = 0;
	  v2[v_offset + 1] = 0;
	  var delta = text1_length - text2_length;
	  // If the total number of characters is odd, then the front path will collide
	  // with the reverse path.
	  var front = (delta % 2 != 0);
	  // Offsets for start and end of k loop.
	  // Prevents mapping of space beyond the grid.
	  var k1start = 0;
	  var k1end = 0;
	  var k2start = 0;
	  var k2end = 0;
	  for (var d = 0; d < max_d; d++) {
	    // Walk the front path one step.
	    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
	      var k1_offset = v_offset + k1;
	      var x1;
	      if (k1 == -d || (k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
	        x1 = v1[k1_offset + 1];
	      } else {
	        x1 = v1[k1_offset - 1] + 1;
	      }
	      var y1 = x1 - k1;
	      while (x1 < text1_length && y1 < text2_length &&
	             text1.charAt(x1) == text2.charAt(y1)) {
	        x1++;
	        y1++;
	      }
	      v1[k1_offset] = x1;
	      if (x1 > text1_length) {
	        // Ran off the right of the graph.
	        k1end += 2;
	      } else if (y1 > text2_length) {
	        // Ran off the bottom of the graph.
	        k1start += 2;
	      } else if (front) {
	        var k2_offset = v_offset + delta - k1;
	        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
	          // Mirror x2 onto top-left coordinate system.
	          var x2 = text1_length - v2[k2_offset];
	          if (x1 >= x2) {
	            // Overlap detected.
	            return diff_bisectSplit_(text1, text2, x1, y1);
	          }
	        }
	      }
	    }

	    // Walk the reverse path one step.
	    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
	      var k2_offset = v_offset + k2;
	      var x2;
	      if (k2 == -d || (k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
	        x2 = v2[k2_offset + 1];
	      } else {
	        x2 = v2[k2_offset - 1] + 1;
	      }
	      var y2 = x2 - k2;
	      while (x2 < text1_length && y2 < text2_length &&
	             text1.charAt(text1_length - x2 - 1) ==
	             text2.charAt(text2_length - y2 - 1)) {
	        x2++;
	        y2++;
	      }
	      v2[k2_offset] = x2;
	      if (x2 > text1_length) {
	        // Ran off the left of the graph.
	        k2end += 2;
	      } else if (y2 > text2_length) {
	        // Ran off the top of the graph.
	        k2start += 2;
	      } else if (!front) {
	        var k1_offset = v_offset + delta - k2;
	        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
	          var x1 = v1[k1_offset];
	          var y1 = v_offset + x1 - k1_offset;
	          // Mirror x2 onto top-left coordinate system.
	          x2 = text1_length - x2;
	          if (x1 >= x2) {
	            // Overlap detected.
	            return diff_bisectSplit_(text1, text2, x1, y1);
	          }
	        }
	      }
	    }
	  }
	  // Diff took too long and hit the deadline or
	  // number of diffs equals number of characters, no commonality at all.
	  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
	};


	/**
	 * Given the location of the 'middle snake', split the diff in two parts
	 * and recurse.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @param {number} x Index of split point in text1.
	 * @param {number} y Index of split point in text2.
	 * @return {Array} Array of diff tuples.
	 */
	function diff_bisectSplit_(text1, text2, x, y) {
	  var text1a = text1.substring(0, x);
	  var text2a = text2.substring(0, y);
	  var text1b = text1.substring(x);
	  var text2b = text2.substring(y);

	  // Compute both diffs serially.
	  var diffs = diff_main(text1a, text2a);
	  var diffsb = diff_main(text1b, text2b);

	  return diffs.concat(diffsb);
	};


	/**
	 * Determine the common prefix of two strings.
	 * @param {string} text1 First string.
	 * @param {string} text2 Second string.
	 * @return {number} The number of characters common to the start of each
	 *     string.
	 */
	function diff_commonPrefix(text1, text2) {
	  // Quick check for common null cases.
	  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
	    return 0;
	  }
	  // Binary search.
	  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
	  var pointermin = 0;
	  var pointermax = Math.min(text1.length, text2.length);
	  var pointermid = pointermax;
	  var pointerstart = 0;
	  while (pointermin < pointermid) {
	    if (text1.substring(pointerstart, pointermid) ==
	        text2.substring(pointerstart, pointermid)) {
	      pointermin = pointermid;
	      pointerstart = pointermin;
	    } else {
	      pointermax = pointermid;
	    }
	    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
	  }
	  return pointermid;
	};


	/**
	 * Determine the common suffix of two strings.
	 * @param {string} text1 First string.
	 * @param {string} text2 Second string.
	 * @return {number} The number of characters common to the end of each string.
	 */
	function diff_commonSuffix(text1, text2) {
	  // Quick check for common null cases.
	  if (!text1 || !text2 ||
	      text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
	    return 0;
	  }
	  // Binary search.
	  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
	  var pointermin = 0;
	  var pointermax = Math.min(text1.length, text2.length);
	  var pointermid = pointermax;
	  var pointerend = 0;
	  while (pointermin < pointermid) {
	    if (text1.substring(text1.length - pointermid, text1.length - pointerend) ==
	        text2.substring(text2.length - pointermid, text2.length - pointerend)) {
	      pointermin = pointermid;
	      pointerend = pointermin;
	    } else {
	      pointermax = pointermid;
	    }
	    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
	  }
	  return pointermid;
	};


	/**
	 * Do the two texts share a substring which is at least half the length of the
	 * longer text?
	 * This speedup can produce non-minimal diffs.
	 * @param {string} text1 First string.
	 * @param {string} text2 Second string.
	 * @return {Array.<string>} Five element Array, containing the prefix of
	 *     text1, the suffix of text1, the prefix of text2, the suffix of
	 *     text2 and the common middle.  Or null if there was no match.
	 */
	function diff_halfMatch_(text1, text2) {
	  var longtext = text1.length > text2.length ? text1 : text2;
	  var shorttext = text1.length > text2.length ? text2 : text1;
	  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
	    return null;  // Pointless.
	  }

	  /**
	   * Does a substring of shorttext exist within longtext such that the substring
	   * is at least half the length of longtext?
	   * Closure, but does not reference any external variables.
	   * @param {string} longtext Longer string.
	   * @param {string} shorttext Shorter string.
	   * @param {number} i Start index of quarter length substring within longtext.
	   * @return {Array.<string>} Five element Array, containing the prefix of
	   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
	   *     of shorttext and the common middle.  Or null if there was no match.
	   * @private
	   */
	  function diff_halfMatchI_(longtext, shorttext, i) {
	    // Start with a 1/4 length substring at position i as a seed.
	    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
	    var j = -1;
	    var best_common = '';
	    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
	    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
	      var prefixLength = diff_commonPrefix(longtext.substring(i),
	                                           shorttext.substring(j));
	      var suffixLength = diff_commonSuffix(longtext.substring(0, i),
	                                           shorttext.substring(0, j));
	      if (best_common.length < suffixLength + prefixLength) {
	        best_common = shorttext.substring(j - suffixLength, j) +
	            shorttext.substring(j, j + prefixLength);
	        best_longtext_a = longtext.substring(0, i - suffixLength);
	        best_longtext_b = longtext.substring(i + prefixLength);
	        best_shorttext_a = shorttext.substring(0, j - suffixLength);
	        best_shorttext_b = shorttext.substring(j + prefixLength);
	      }
	    }
	    if (best_common.length * 2 >= longtext.length) {
	      return [best_longtext_a, best_longtext_b,
	              best_shorttext_a, best_shorttext_b, best_common];
	    } else {
	      return null;
	    }
	  }

	  // First check if the second quarter is the seed for a half-match.
	  var hm1 = diff_halfMatchI_(longtext, shorttext,
	                             Math.ceil(longtext.length / 4));
	  // Check again based on the third quarter.
	  var hm2 = diff_halfMatchI_(longtext, shorttext,
	                             Math.ceil(longtext.length / 2));
	  var hm;
	  if (!hm1 && !hm2) {
	    return null;
	  } else if (!hm2) {
	    hm = hm1;
	  } else if (!hm1) {
	    hm = hm2;
	  } else {
	    // Both matched.  Select the longest.
	    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
	  }

	  // A half-match was found, sort out the return data.
	  var text1_a, text1_b, text2_a, text2_b;
	  if (text1.length > text2.length) {
	    text1_a = hm[0];
	    text1_b = hm[1];
	    text2_a = hm[2];
	    text2_b = hm[3];
	  } else {
	    text2_a = hm[0];
	    text2_b = hm[1];
	    text1_a = hm[2];
	    text1_b = hm[3];
	  }
	  var mid_common = hm[4];
	  return [text1_a, text1_b, text2_a, text2_b, mid_common];
	};


	/**
	 * Reorder and merge like edit sections.  Merge equalities.
	 * Any edit section can move as long as it doesn't cross an equality.
	 * @param {Array} diffs Array of diff tuples.
	 */
	function diff_cleanupMerge(diffs) {
	  diffs.push([DIFF_EQUAL, '']);  // Add a dummy entry at the end.
	  var pointer = 0;
	  var count_delete = 0;
	  var count_insert = 0;
	  var text_delete = '';
	  var text_insert = '';
	  var commonlength;
	  while (pointer < diffs.length) {
	    switch (diffs[pointer][0]) {
	      case DIFF_INSERT:
	        count_insert++;
	        text_insert += diffs[pointer][1];
	        pointer++;
	        break;
	      case DIFF_DELETE:
	        count_delete++;
	        text_delete += diffs[pointer][1];
	        pointer++;
	        break;
	      case DIFF_EQUAL:
	        // Upon reaching an equality, check for prior redundancies.
	        if (count_delete + count_insert > 1) {
	          if (count_delete !== 0 && count_insert !== 0) {
	            // Factor out any common prefixies.
	            commonlength = diff_commonPrefix(text_insert, text_delete);
	            if (commonlength !== 0) {
	              if ((pointer - count_delete - count_insert) > 0 &&
	                  diffs[pointer - count_delete - count_insert - 1][0] ==
	                  DIFF_EQUAL) {
	                diffs[pointer - count_delete - count_insert - 1][1] +=
	                    text_insert.substring(0, commonlength);
	              } else {
	                diffs.splice(0, 0, [DIFF_EQUAL,
	                                    text_insert.substring(0, commonlength)]);
	                pointer++;
	              }
	              text_insert = text_insert.substring(commonlength);
	              text_delete = text_delete.substring(commonlength);
	            }
	            // Factor out any common suffixies.
	            commonlength = diff_commonSuffix(text_insert, text_delete);
	            if (commonlength !== 0) {
	              diffs[pointer][1] = text_insert.substring(text_insert.length -
	                  commonlength) + diffs[pointer][1];
	              text_insert = text_insert.substring(0, text_insert.length -
	                  commonlength);
	              text_delete = text_delete.substring(0, text_delete.length -
	                  commonlength);
	            }
	          }
	          // Delete the offending records and add the merged ones.
	          if (count_delete === 0) {
	            diffs.splice(pointer - count_insert,
	                count_delete + count_insert, [DIFF_INSERT, text_insert]);
	          } else if (count_insert === 0) {
	            diffs.splice(pointer - count_delete,
	                count_delete + count_insert, [DIFF_DELETE, text_delete]);
	          } else {
	            diffs.splice(pointer - count_delete - count_insert,
	                count_delete + count_insert, [DIFF_DELETE, text_delete],
	                [DIFF_INSERT, text_insert]);
	          }
	          pointer = pointer - count_delete - count_insert +
	                    (count_delete ? 1 : 0) + (count_insert ? 1 : 0) + 1;
	        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
	          // Merge this equality with the previous one.
	          diffs[pointer - 1][1] += diffs[pointer][1];
	          diffs.splice(pointer, 1);
	        } else {
	          pointer++;
	        }
	        count_insert = 0;
	        count_delete = 0;
	        text_delete = '';
	        text_insert = '';
	        break;
	    }
	  }
	  if (diffs[diffs.length - 1][1] === '') {
	    diffs.pop();  // Remove the dummy entry at the end.
	  }

	  // Second pass: look for single edits surrounded on both sides by equalities
	  // which can be shifted sideways to eliminate an equality.
	  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
	  var changes = false;
	  pointer = 1;
	  // Intentionally ignore the first and last element (don't need checking).
	  while (pointer < diffs.length - 1) {
	    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
	        diffs[pointer + 1][0] == DIFF_EQUAL) {
	      // This is a single edit surrounded by equalities.
	      if (diffs[pointer][1].substring(diffs[pointer][1].length -
	          diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
	        // Shift the edit over the previous equality.
	        diffs[pointer][1] = diffs[pointer - 1][1] +
	            diffs[pointer][1].substring(0, diffs[pointer][1].length -
	                                        diffs[pointer - 1][1].length);
	        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
	        diffs.splice(pointer - 1, 1);
	        changes = true;
	      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
	          diffs[pointer + 1][1]) {
	        // Shift the edit over the next equality.
	        diffs[pointer - 1][1] += diffs[pointer + 1][1];
	        diffs[pointer][1] =
	            diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
	            diffs[pointer + 1][1];
	        diffs.splice(pointer + 1, 1);
	        changes = true;
	      }
	    }
	    pointer++;
	  }
	  // If shifts were made, the diff needs reordering and another shift sweep.
	  if (changes) {
	    diff_cleanupMerge(diffs);
	  }
	};


	var diff = diff_main;
	diff.INSERT = DIFF_INSERT;
	diff.DELETE = DIFF_DELETE;
	diff.EQUAL = DIFF_EQUAL;

	module.exports = diff;

	/*
	 * Modify a diff such that the cursor position points to the start of a change:
	 * E.g.
	 *   cursor_normalize_diff([[DIFF_EQUAL, 'abc']], 1)
	 *     => [1, [[DIFF_EQUAL, 'a'], [DIFF_EQUAL, 'bc']]]
	 *   cursor_normalize_diff([[DIFF_INSERT, 'new'], [DIFF_DELETE, 'xyz']], 2)
	 *     => [2, [[DIFF_INSERT, 'new'], [DIFF_DELETE, 'xy'], [DIFF_DELETE, 'z']]]
	 *
	 * @param {Array} diffs Array of diff tuples
	 * @param {Int} cursor_pos Suggested edit position. Must not be out of bounds!
	 * @return {Array} A tuple [cursor location in the modified diff, modified diff]
	 */
	function cursor_normalize_diff (diffs, cursor_pos) {
	  if (cursor_pos === 0) {
	    return [DIFF_EQUAL, diffs];
	  }
	  for (var current_pos = 0, i = 0; i < diffs.length; i++) {
	    var d = diffs[i];
	    if (d[0] === DIFF_DELETE || d[0] === DIFF_EQUAL) {
	      var next_pos = current_pos + d[1].length;
	      if (cursor_pos === next_pos) {
	        return [i + 1, diffs];
	      } else if (cursor_pos < next_pos) {
	        // copy to prevent side effects
	        diffs = diffs.slice();
	        // split d into two diff changes
	        var split_pos = cursor_pos - current_pos;
	        var d_left = [d[0], d[1].slice(0, split_pos)];
	        var d_right = [d[0], d[1].slice(split_pos)];
	        diffs.splice(i, 1, d_left, d_right);
	        return [i + 1, diffs];
	      } else {
	        current_pos = next_pos;
	      }
	    }
	  }
	  throw new Error('cursor_pos is out of bounds!')
	}

	/*
	 * Modify a diff such that the edit position is "shifted" to the proposed edit location (cursor_position).
	 *
	 * Case 1)
	 *   Check if a naive shift is possible:
	 *     [0, X], [ 1, Y] -> [ 1, Y], [0, X]    (if X + Y === Y + X)
	 *     [0, X], [-1, Y] -> [-1, Y], [0, X]    (if X + Y === Y + X) - holds same result
	 * Case 2)
	 *   Check if the following shifts are possible:
	 *     [0, 'pre'], [ 1, 'prefix'] -> [ 1, 'pre'], [0, 'pre'], [ 1, 'fix']
	 *     [0, 'pre'], [-1, 'prefix'] -> [-1, 'pre'], [0, 'pre'], [-1, 'fix']
	 *         ^            ^
	 *         d          d_next
	 *
	 * @param {Array} diffs Array of diff tuples
	 * @param {Int} cursor_pos Suggested edit position. Must not be out of bounds!
	 * @return {Array} Array of diff tuples
	 */
	function fix_cursor (diffs, cursor_pos) {
	  var norm = cursor_normalize_diff(diffs, cursor_pos);
	  var ndiffs = norm[1];
	  var cursor_pointer = norm[0];
	  var d = ndiffs[cursor_pointer];
	  var d_next = ndiffs[cursor_pointer + 1];

	  if (d == null) {
	    // Text was deleted from end of original string,
	    // cursor is now out of bounds in new string
	    return diffs;
	  } else if (d[0] !== DIFF_EQUAL) {
	    // A modification happened at the cursor location.
	    // This is the expected outcome, so we can return the original diff.
	    return diffs;
	  } else {
	    if (d_next != null && d[1] + d_next[1] === d_next[1] + d[1]) {
	      // Case 1)
	      // It is possible to perform a naive shift
	      ndiffs.splice(cursor_pointer, 2, d_next, d)
	      return merge_tuples(ndiffs, cursor_pointer, 2)
	    } else if (d_next != null && d_next[1].indexOf(d[1]) === 0) {
	      // Case 2)
	      // d[1] is a prefix of d_next[1]
	      // We can assume that d_next[0] !== 0, since d[0] === 0
	      // Shift edit locations..
	      ndiffs.splice(cursor_pointer, 2, [d_next[0], d[1]], [0, d[1]]);
	      var suffix = d_next[1].slice(d[1].length);
	      if (suffix.length > 0) {
	        ndiffs.splice(cursor_pointer + 2, 0, [d_next[0], suffix]);
	      }
	      return merge_tuples(ndiffs, cursor_pointer, 3)
	    } else {
	      // Not possible to perform any modification
	      return diffs;
	    }
	  }

	}

	/*
	 * Try to merge tuples with their neigbors in a given range.
	 * E.g. [0, 'a'], [0, 'b'] -> [0, 'ab']
	 *
	 * @param {Array} diffs Array of diff tuples.
	 * @param {Int} start Position of the first element to merge (diffs[start] is also merged with diffs[start - 1]).
	 * @param {Int} length Number of consecutive elements to check.
	 * @return {Array} Array of merged diff tuples.
	 */
	function merge_tuples (diffs, start, length) {
	  // Check from (start-1) to (start+length).
	  for (var i = start + length - 1; i >= 0 && i >= start - 1; i--) {
	    if (i + 1 < diffs.length) {
	      var left_d = diffs[i];
	      var right_d = diffs[i+1];
	      if (left_d[0] === right_d[1]) {
	        diffs.splice(i, 2, [left_d[0], left_d[1] + right_d[1]]);
	      }
	    }
	  }
	  return diffs;
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(6);
	var isArguments = __webpack_require__(7);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	var lib = {
	  attributes: {
	    clone: function (attributes, keepNull) {
	      if (typeof attributes !== 'object') return {};
	      return Object.keys(attributes).reduce(function (memo, key) {
	        if (attributes[key] !== undefined && (attributes[key] !== null || keepNull)) {
	          memo[key] = attributes[key];
	        }
	        return memo;
	      }, {});
	    },

	    compose: function (a, b, keepNull) {
	      if (typeof a !== 'object') a = {};
	      if (typeof b !== 'object') b = {};
	      var attributes = this.clone(b, keepNull);
	      for (var key in a) {
	        if (a[key] !== undefined && b[key] === undefined) {
	          attributes[key] = a[key];
	        }
	      }
	      return Object.keys(attributes).length > 0 ? attributes : undefined;
	    },

	    diff: function(a, b) {
	      if (typeof a !== 'object') a = {};
	      if (typeof b !== 'object') b = {};
	      var attributes = Object.keys(a).concat(Object.keys(b)).reduce(function (attributes, key) {
	        if (a[key] !== b[key]) {
	          attributes[key] = b[key] === undefined ? null : b[key];
	        }
	        return attributes;
	      }, {});
	      return Object.keys(attributes).length > 0 ? attributes : undefined;
	    },

	    transform: function (a, b, priority) {
	      if (typeof a !== 'object') return b;
	      if (typeof b !== 'object') return undefined;
	      if (!priority) return b;  // b simply overwrites us without priority
	      var attributes = Object.keys(b).reduce(function (attributes, key) {
	        if (a[key] === undefined) attributes[key] = b[key];  // null is a valid value
	        return attributes;
	      }, {});
	      return Object.keys(attributes).length > 0 ? attributes : undefined;
	    }
	  },

	  clone: function (op) {
	    var newOp = this.attributes.clone(op);
	    if (typeof newOp.attributes === 'object') {
	      newOp.attributes = this.attributes.clone(newOp.attributes, true);
	    }
	    return newOp;
	  },

	  iterator: function (ops) {
	    return new Iterator(ops);
	  },

	  length: function (op) {
	    if (typeof op['delete'] === 'number') {
	      return op['delete'];
	    } else if (typeof op.retain === 'number') {
	      return op.retain;
	    } else {
	      return typeof op.insert === 'string' ? op.insert.length : 1;
	    }
	  }
	};


	function Iterator(ops) {
	  this.ops = ops;
	  this.index = 0;
	  this.offset = 0;
	};

	Iterator.prototype.hasNext = function () {
	  return this.peekLength() < Infinity;
	};

	Iterator.prototype.next = function (length) {
	  if (!length) length = Infinity;
	  var nextOp = this.ops[this.index];
	  if (nextOp) {
	    var offset = this.offset;
	    var opLength = lib.length(nextOp)
	    if (length >= opLength - offset) {
	      length = opLength - offset;
	      this.index += 1;
	      this.offset = 0;
	    } else {
	      this.offset += length;
	    }
	    if (typeof nextOp['delete'] === 'number') {
	      return { 'delete': length };
	    } else {
	      var retOp = {};
	      if (nextOp.attributes) {
	        retOp.attributes = nextOp.attributes;
	      }
	      if (typeof nextOp.retain === 'number') {
	        retOp.retain = length;
	      } else if (typeof nextOp.insert === 'string') {
	        retOp.insert = nextOp.insert.substr(offset, length);
	      } else {
	        // offset should === 0, length should === 1
	        retOp.insert = nextOp.insert;
	      }
	      return retOp;
	    }
	  } else {
	    return { retain: Infinity };
	  }
	};

	Iterator.prototype.peekLength = function () {
	  if (this.ops[this.index]) {
	    // Should never return 0 if our index is being managed correctly
	    return lib.length(this.ops[this.index]) - this.offset;
	  } else {
	    return Infinity;
	  }
	};

	Iterator.prototype.peekType = function () {
	  if (this.ops[this.index]) {
	    if (typeof this.ops[this.index]['delete'] === 'number') {
	      return 'delete';
	    } else if (typeof this.ops[this.index].retain === 'number') {
	      return 'retain';
	    } else {
	      return 'insert';
	    }
	  }
	  return 'retain';
	};


	module.exports = lib;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _richTextLibDelta = __webpack_require__(3);

	var _richTextLibDelta2 = _interopRequireDefault(_richTextLibDelta);

	var _parchment = __webpack_require__(10);

	var _parchment2 = _interopRequireDefault(_parchment);

	var Editor = (function (_Parchment$Container) {
	  _inherits(Editor, _Parchment$Container);

	  function Editor(domNode) {
	    var _this = this;

	    _classCallCheck(this, Editor);

	    // TODO fix?
	    if (domNode.innerHTML.indexOf('\n') > -1) {
	      domNode.innerHTML = domNode.innerHTML.replace(/\n\s*/g, '');
	    }
	    _get(Object.getPrototypeOf(Editor.prototype), 'constructor', this).call(this, domNode);
	    this.ensureChild();
	    this.enable();
	    this.delta = this.getDelta();
	    this.observer = new MutationObserver(function (mutations) {
	      _this.update(mutations); // Do not pass additional params from MutationObserver handler
	    });
	    this.observer.observe(this.domNode, {
	      attributes: true,
	      characterData: true,
	      childList: true,
	      subtree: true
	    });
	  }

	  _createClass(Editor, [{
	    key: 'applyAttributes',
	    value: function applyAttributes(index, length, attr) {
	      Object.keys(attr).forEach(function (key) {
	        var obj = attr[key];
	        var attributor = _parchment2['default'].match(key, _parchment2['default'].Type.ATTRIBUTE);

	        // Only attempt formatting if a valid attributor was found
	        if (attributor) {
	          this.formatAt(index, length, key, obj);
	        }
	      }, this);
	    }
	  }, {
	    key: 'applyDelta',
	    value: function applyDelta(delta) {
	      var _this2 = this;

	      delta.ops.reduce(function (index, op) {
	        if (op.insert != null) {
	          if (typeof op.insert === 'string') {
	            var _length = op.insert.length;

	            _this2.insertAt(index, op.insert);

	            // this causes weird errors, not setting the spans correctly
	            // therefore another delta.ops.reduce further down...
	            //let attr = op.attributes;
	            //if (typeof attr === 'object') {
	            //  this.applyAttributes(index, length, attr);
	            //}

	            return index + _length;
	          } else {
	            _this2.insertAt(index, op.attributes);
	            return index + 1;
	          }
	        } else if (typeof op['delete'] === 'number') {
	          _this2.deleteAt(index, op['delete']);
	          return index;
	        } else if (typeof op.retain === 'number') {
	          Object.keys(op.attributes || {}).forEach(function (name) {
	            _this2.formatAt(index, op.retain, name, op.attributes[name]);
	          });
	          return index + op.retain;
	        }
	      }, 0);

	      // now apply styles. there must be more elegant solution for this?
	      delta.ops.reduce(function (index, op) {
	        if (op.insert != null) {
	          if (typeof op.insert === 'string') {
	            var _length2 = op.insert.length;
	            var attr = op.attributes;
	            if (typeof attr === 'object') {
	              _this2.applyAttributes(index, _length2, attr);
	            }
	            return index + _length2;
	          } else {
	            return index + 1;
	          }
	        } else if (typeof op['delete'] === 'number') {
	          return index;
	        } else if (typeof op.retain === 'number') {
	          return index + op.retain;
	        }
	      }, 0);
	    }
	  }, {
	    key: 'deleteAt',
	    value: function deleteAt(index, length) {
	      var _children$find = this.children.find(index);

	      var _children$find2 = _slicedToArray(_children$find, 2);

	      var first = _children$find2[0];
	      var firstOffset = _children$find2[1];

	      var _children$find3 = this.children.find(index + length);

	      var _children$find32 = _slicedToArray(_children$find3, 2);

	      var last = _children$find32[0];
	      var lastOffset = _children$find32[1];

	      _get(Object.getPrototypeOf(Editor.prototype), 'deleteAt', this).call(this, index, length);
	      if (last != null && first !== last && firstOffset > 0) {
	        var lastChild = first.children.tail;
	        last.moveChildren(first);
	        last.remove();
	        if (lastChild != null) {
	          lastChild.merge();
	        }
	      }
	      this.ensureChild();
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      var enabled = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      this.domNode.setAttribute('contenteditable', enabled);
	    }
	  }, {
	    key: 'ensureChild',
	    value: function ensureChild() {
	      if (this.children.length === 0) {
	        this.appendChild(_parchment2['default'].create('block'));
	      }
	    }
	  }, {
	    key: 'findPath',
	    value: function findPath(index) {
	      if (index >= this.getLength()) {
	        return [];
	      } else {
	        return _get(Object.getPrototypeOf(Editor.prototype), 'findPath', this).call(this, index).slice(1); // Exclude self
	      }
	    }
	  }, {
	    key: 'getDelta',
	    value: function getDelta() {
	      return this.getLines().reduce(function (delta, child) {
	        return delta.concat(child.getDelta());
	      }, new _richTextLibDelta2['default']());
	    }
	  }, {
	    key: 'getLines',
	    value: function getLines() {
	      var index = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	      var length = arguments.length <= 1 || arguments[1] === undefined ? this.getLength() : arguments[1];

	      return this.getDescendants(index, length, _parchment2['default'].Block);
	    }
	  }, {
	    key: 'onUpdate',
	    value: function onUpdate(delta) {}
	  }, {
	    key: 'remove',
	    value: function remove() {
	      this.children.forEach(function (child) {
	        child.remove();
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      var mutations = undefined;
	      if (Array.isArray(args[0])) {
	        mutations = args[0];
	        args = args.slice(1);
	      } else {
	        mutations = this.observer.takeRecords();
	      }
	      if (mutations.length === 0) return new _richTextLibDelta2['default']();
	      var oldDelta = this.delta;
	      // TODO optimize

	      // FF and IE position the cursor incorrectly to the beginning of the editor when editing a paragraph
	      // a workaround is to compare the current focus of the editor to the one after building
	      var sel = document.getSelection();
	      var currentFocus = sel.focusNode;
	      var focusOffset = sel.focusOffset;

	      this.build();

	      if (currentFocus && currentFocus != document.getSelection().focusNode) {
	        // now set the old cursor position again
	        var range = document.createRange();
	        sel.removeAllRanges();
	        range.setStart(currentFocus, focusOffset);
	        sel.addRange(range);
	      }

	      this.delta = this.getDelta();
	      var change = oldDelta.diff(this.delta);
	      if (change.length() > 0) {
	        this.onUpdate.apply(this, [change].concat(_toConsumableArray(args)));
	      }
	      this.observer.takeRecords(); // Prevent changes from rebuilds
	      return change;
	    }
	  }]);

	  return Editor;
	})(_parchment2['default'].Container);

	exports['default'] = Editor;
	module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	var blot_1 = require('./blot/abstract/blot');
	var block_1 = require('./blot/block');
	var embed_1 = require('./blot/embed');
	var leaf_1 = require('./blot/abstract/leaf');
	var inline_1 = require('./blot/inline');
	var container_1 = require('./blot/container');
	var text_1 = require('./blot/text');
	var style_1 = require('./attributor/style');
	var Registry = require('./registry');
	var Parchment = {
	    PREFIX: Registry.PREFIX,
	    Container: container_1.default,
	    Block: block_1.default,
	    Inline: inline_1.default,
	    Leaf: leaf_1.default,
	    Embed: embed_1.default,
	    Style: style_1.default,
	    create: Registry.create,
	    match: Registry.match,
	    register: Registry.register,
	    Type: Registry.Type,
	    findBlot: blot_1.default.findBlot
	};
	Parchment.register(container_1.default);
	Parchment.register(block_1.default);
	Parchment.register(inline_1.default);
	Parchment.register(text_1.default);
	module.exports = Parchment;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';

	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//
	var prefix = typeof Object.create !== 'function' ? '~' : false;

	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} once Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }

	/**
	 * Holds the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;

	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events && this._events[evt];

	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];

	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }

	  return ee;
	};

	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return false;

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Functon} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return this;

	  var listeners = this._events[evt]
	    , events = [];

	  if (fn) {
	    if (listeners.fn) {
	      if (
	           listeners.fn !== fn
	        || (once && !listeners.once)
	        || (context && listeners.context !== context)
	      ) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (
	             listeners[i].fn !== fn
	          || (once && !listeners[i].once)
	          || (context && listeners[i].context !== context)
	        ) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }

	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }

	  return this;
	};

	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;

	  if (event) delete this._events[prefix ? prefix + event : event];
	  else this._events = prefix ? {} : Object.create(null);

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Expose the module.
	//
	if ('undefined' !== typeof module) {
	  module.exports = EventEmitter;
	}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _parchment = __webpack_require__(10);

	var _parchment2 = _interopRequireDefault(_parchment);

	var _deepEqual = __webpack_require__(5);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _libPlatform = __webpack_require__(13);

	var platform = _interopRequireWildcard(_libPlatform);

	var Range = (function () {
	  function Range(start) {
	    var end = arguments.length <= 1 || arguments[1] === undefined ? start : arguments[1];
	    return (function () {
	      _classCallCheck(this, Range);

	      this.start = start;
	      this.end = end;
	    }).apply(this, arguments);
	  }

	  _createClass(Range, [{
	    key: 'isCollapsed',
	    value: function isCollapsed() {
	      return this.start === this.end;
	    }
	  }, {
	    key: 'shift',
	    value: function shift(index, length) {
	      var _map = [this.start, this.end].map(function (pos) {
	        if (index > pos) return pos;
	        if (length >= 0) {
	          return pos + length;
	        } else {
	          return Math.max(index, pos + length);
	        }
	      });

	      var _map2 = _slicedToArray(_map, 2);

	      this.start = _map2[0];
	      this.end = _map2[1];
	    }
	  }]);

	  return Range;
	})();

	var Selection = (function () {
	  function Selection(doc) {
	    var _this = this;

	    _classCallCheck(this, Selection);

	    this.doc = doc;
	    this.root = this.doc.domNode;
	    this.lastRange = this.savedRange = new Range(0, 0);
	    this.wrappedUpdate = this.wrappedUpdate.bind(this);
	    ['keyup', 'mouseup', 'mouseleave', 'touchend', 'touchleave'].forEach(function (eventName) {
	      _this.root.addEventListener(eventName, _this.wrappedUpdate);
	    }, this);
	    this.update();
	  }

	  _createClass(Selection, [{
	    key: 'wrappedUpdate',
	    value: function wrappedUpdate() {
	      this.update();
	    }
	  }, {
	    key: 'checkFocus',
	    value: function checkFocus() {
	      return document.activeElement === this.root;
	    }
	  }, {
	    key: 'focus',
	    value: function focus() {
	      if (this.checkFocus()) return;
	      this.root.focus();
	      this.setRange(this.savedRange);
	    }
	  }, {
	    key: 'getBounds',
	    value: function getBounds(index) {
	      var pos = this.doc.findPath(index).pop();
	      if (pos == null) return null;
	      var containerBounds = this.root.parentNode.getBoundingClientRect();
	      var side = 'left';
	      var bounds = undefined;
	      if (pos.blot.getLength() === 0) {
	        bounds = pos.blot.parent.domNode.getBoundingClientRect();
	      } else if (pos.blot instanceof _parchment2['default'].Embed) {
	        bounds = pos.blot.domNode.getBoundingClientRect();
	        if (pos.offset > 0) {
	          side = 'right';
	        }
	      } else {
	        var range = document.createRange();
	        if (pos.offset < pos.blot.getLength()) {
	          range.setStart(pos.blot.domNode, pos.offset);
	          range.setEnd(pos.blot.domNode, pos.offset + 1);
	          side = 'left';
	        } else {
	          range.setStart(pos.blot.domNode, pos.offset - 1);
	          range.setEnd(pos.blot.domNode, pos.offset);
	          side = 'right';
	        }
	        bounds = range.getBoundingClientRect();
	      }
	      return {
	        height: bounds.height,
	        left: bounds[side] - containerBounds.left,
	        top: bounds.top - containerBounds.top
	      };
	    }
	  }, {
	    key: 'getNativeRange',
	    value: function getNativeRange() {
	      var selection = document.getSelection();
	      if (selection == null || selection.rangeCount <= 0) return null;
	      var nativeRange = selection.getRangeAt(0);
	      if (nativeRange.startContainer !== this.root && !(nativeRange.startContainer.compareDocumentPosition(this.root) & Node.DOCUMENT_POSITION_CONTAINS)) {
	        return null;
	      }
	      if (!nativeRange.collapsed && // save a call to compareDocumentPosition
	      nativeRange.endContainer !== this.root && !(nativeRange.endContainer.compareDocumentPosition(this.root) & Node.DOCUMENT_POSITION_CONTAINS)) {
	        return null;
	      }
	      return nativeRange;
	    }
	  }, {
	    key: 'getRange',
	    value: function getRange() {
	      var _this2 = this;

	      if (!this.checkFocus()) return null;
	      var convert = function convert(node, offset) {
	        var blot = undefined;
	        if (!(node instanceof Text)) {
	          if (offset >= node.childNodes.length) {
	            blot = _parchment2['default'].findBlot(node);
	            return blot.offset(_this2.doc) + blot.getLength();
	          } else {
	            node = node.childNodes[offset];
	            offset = 0;
	          }
	        }
	        blot = _parchment2['default'].findBlot(node);
	        return blot.offset(_this2.doc) + offset;
	      };
	      var nativeRange = this.getNativeRange();
	      if (nativeRange == null) return null;
	      var start = convert(nativeRange.startContainer, nativeRange.startOffset);
	      var end = nativeRange.collapsed ? start : convert(nativeRange.endContainer, nativeRange.endOffset);
	      return new Range(Math.min(start, end), Math.max(start, end));
	    }
	  }, {
	    key: 'onUpdate',
	    value: function onUpdate(range) {}
	  }, {
	    key: 'prepare',
	    value: function prepare(format, value) {
	      this.update();
	      var range = this.getRange();
	      var pos = this.doc.findPath(range.start).pop();
	      var target = pos.blot.split(pos.offset);
	      var cursor = _parchment2['default'].create('cursor');

	      if (target) {
	        target.parent.insertBefore(cursor, target);
	        cursor.format(format, value);
	      }

	      // Cursor will not blink if we make selection
	      this.setNativeRange(cursor.domNode.firstChild, 1);
	    }
	  }, {
	    key: 'scrollIntoView',
	    value: function scrollIntoView() {
	      if (this.range == null) return;
	      var startBounds = this.getBounds(this.range.start);
	      var endBounds = this.range.isCollapsed() ? startBounds : this.getBounds(this.range.end);
	      var containerBounds = this.root.parentNode.getBoundingClientRect();
	      var containerHeight = containerBounds.bottom - containerBounds.top;
	      if (containerHeight < endBounds.top + endBounds.height) {
	        var _doc$findLineAt = this.doc.findLineAt(this.range.end);

	        var _doc$findLineAt2 = _slicedToArray(_doc$findLineAt, 2);

	        var line = _doc$findLineAt2[0];
	        var offset = _doc$findLineAt2[1];

	        return line.node.scrollIntoView(false);
	      } else if (startBounds.top < 0) {
	        var _doc$findLineAt3 = this.doc.findLineAt(this.range.start);

	        var _doc$findLineAt32 = _slicedToArray(_doc$findLineAt3, 2);

	        var line = _doc$findLineAt32[0];
	        var offset = _doc$findLineAt32[1];

	        return line.node.scrollIntoView();
	      }
	    }
	  }, {
	    key: 'setNativeRange',
	    value: function setNativeRange(startNode, startOffset) {
	      var endNode = arguments.length <= 2 || arguments[2] === undefined ? startNode : arguments[2];
	      var endOffset = arguments.length <= 3 || arguments[3] === undefined ? startOffset : arguments[3];
	      return (function () {
	        var selection = document.getSelection();
	        if (selection == null) return;
	        if (startNode != null) {
	          // Need to focus before setting or else in IE9/10 later focus will cause a set on
	          // 0th index on line div to be set at 1st index
	          if (!this.checkFocus()) {
	            this.root.focus();
	          }
	          var nativeRange = this.getNativeRange();
	          // TODO do we need to avoid setting on same range?
	          if (nativeRange == null || startNode !== nativeRange.startContainer || startOffset !== nativeRange.startOffset || endNode !== nativeRange.endContainer || endOffset !== nativeRange.endOffset) {
	            // TODO no longer need this consideration for IE9
	            // IE9 requires removeAllRanges() regardless of value of
	            // nativeRange or else formatting from toolbar does not work
	            selection.removeAllRanges();
	            var range = document.createRange();
	            range.setStart(startNode, startOffset);
	            range.setEnd(endNode, endOffset);
	            selection.addRange(range);
	          }
	        } else {
	          selection.removeAllRanges();
	          this.root.blur();
	          // setRange(null) will fail to blur in IE10/11 on Travis+SauceLabs (but not local VMs)
	          if (platform.isIE()) {
	            document.body.focus();
	          }
	        }
	      }).apply(this, arguments);
	    }
	  }, {
	    key: 'setRange',
	    value: function setRange(range) {
	      var _this3 = this;

	      var convert = function convert(index) {
	        var pos = _this3.doc.findPath(index).pop();
	        if (pos.blot instanceof _parchment2['default'].Embed) {
	          var node = pos.blot.domNode.parentNode;
	          return [node, [].indexOf.call(node.childNodes, pos.blot.domNode) + pos.offset];
	        } else {
	          return [pos.blot.domNode, pos.offset];
	        }
	      };
	      if (range != null) {
	        var _convert = convert(range.start);

	        var _convert2 = _slicedToArray(_convert, 2);

	        var startNode = _convert2[0];
	        var startOffset = _convert2[1];

	        if (range.isCollapsed()) {
	          this.setNativeRange(startNode, startOffset);
	        } else {
	          var _convert3 = convert(range.end);

	          var _convert32 = _slicedToArray(_convert3, 2);

	          var endNode = _convert32[0];
	          var endOffset = _convert32[1];

	          this.setNativeRange(startNode, startOffset, endNode, endOffset);
	        }
	      } else {
	        this.setNativeRange(null);
	      }
	      this.update();
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      var oldRange = this.lastRange;
	      this.lastRange = this.getRange();
	      if (this.lastRange != null) {
	        this.savedRange = this.lastRange;
	      }
	      if (!(0, _deepEqual2['default'])(oldRange, this.lastRange)) {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        this.onUpdate.apply(this, [this.lastRange].concat(args));
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this4 = this;

	      ['keyup', 'mouseup', 'mouseleave', 'touchend', 'touchleave'].forEach(function (eventName) {
	        _this4.root.removeEventListener(eventName, _this4.wrappedUpdate);
	      }, this);
	      this.doc = null;
	    }
	  }]);

	  return Selection;
	})();

	Selection.Range = Range;

	exports.Range = Range;
	exports['default'] = Selection;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isIE = isIE;
	exports.isIOS = isIOS;
	exports.isMac = isMac;

	function isIE() {
	  var target = arguments.length <= 0 || arguments[0] === undefined ? [10, 11] : arguments[0];

	  if (!Array.isArray(target)) {
	    target = [target];
	  }
	  return target.indexOf(document.documentMode) > -1;
	}

	function isIOS() {
	  return (/iPhone|iPad/i.test(navigator.userAgent)
	  );
	}

	function isMac() {
	  return (/Mac/i.test(navigator.platform)
	  );
	}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;

	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}

		return toStr.call(arr) === '[object Array]';
	};

	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}

		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) { /**/ }

		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};

	module.exports = function extend() {
		var options, name, src, copy, copyIsArray, clone;
		var target = arguments[0];
		var i = 1;
		var length = arguments.length;
		var deep = false;

		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}
		if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
			target = {};
		}

		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target !== copy) {
						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = extend(deep, clone, copy);

						// Don't bring in undefined values
						} else if (typeof copy !== 'undefined') {
							target[name] = copy;
						}
					}
				}
			}
		}

		// Return the modified object
		return target;
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _baseStyl = __webpack_require__(16);

	var _baseStyl2 = _interopRequireDefault(_baseStyl);

	var _libPlatform = __webpack_require__(13);

	var platform = _interopRequireWildcard(_libPlatform);

	var BaseTheme = (function () {
	  function BaseTheme(quill) {
	    var styles = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	    _classCallCheck(this, BaseTheme);

	    this.quill = quill;
	    this.quill.container.classList.add('ql-container');
	    if (styles) {
	      this.addStyles(_baseStyl2['default']);
	    }
	    if (platform.isIE(10)) {
	      this.quill.root.classList.add('ql-ie-10');
	    }
	  }

	  _createClass(BaseTheme, [{
	    key: 'addStyles',
	    value: function addStyles(css) {
	      var style = document.createElement('style');
	      style.type = 'text/css';
	      style.appendChild(document.createTextNode(css));
	      document.head.appendChild(style);
	    }
	  }]);

	  return BaseTheme;
	})();

	BaseTheme.OPTIONS = {};

	exports['default'] = BaseTheme;
	module.exports = exports['default'];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports


	// module
	exports.push([module.id, ".ql-image-tooltip {\n  padding: 10px;\n  width: 300px;\n}\n.ql-image-tooltip:after {\n  clear: both;\n  content: \"\";\n  display: table;\n}\n.ql-image-tooltip a {\n  border: 1px solid #000;\n  box-sizing: border-box;\n  display: inline-block;\n  float: left;\n  padding: 5px;\n  text-align: center;\n  width: 50%;\n}\n.ql-image-tooltip img {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  max-height: 100%;\n  max-width: 100%;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n.ql-image-tooltip .input {\n  box-sizing: border-box;\n  width: 100%;\n}\n.ql-image-tooltip .preview {\n  margin: 10px 0px;\n  position: relative;\n  border: 1px dashed #000;\n  height: 200px;\n}\n.ql-image-tooltip .preview span {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n  top: 40%;\n  width: 100%;\n}\n.ql-link-tooltip {\n  padding: 5px 10px;\n}\n.ql-link-tooltip input.input {\n  width: 170px;\n}\n.ql-link-tooltip input.input,\n.ql-link-tooltip a.done {\n  display: none;\n}\n.ql-link-tooltip a.change {\n  margin-right: 4px;\n}\n.ql-link-tooltip.editing input.input,\n.ql-link-tooltip.editing a.done {\n  display: inline-block;\n}\n.ql-link-tooltip.editing a.url,\n.ql-link-tooltip.editing a.change,\n.ql-link-tooltip.editing a.remove {\n  display: none;\n}\n.ql-multi-cursor {\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 1000;\n}\n.ql-multi-cursor .cursor {\n  margin-left: -1px;\n  position: absolute;\n}\n.ql-multi-cursor .cursor-flag {\n  bottom: 100%;\n  position: absolute;\n  white-space: nowrap;\n}\n.ql-multi-cursor .cursor-name {\n  display: inline-block;\n  color: #fff;\n  padding: 2px 8px;\n}\n.ql-multi-cursor .cursor-caret {\n  height: 100%;\n  position: absolute;\n  width: 2px;\n}\n.ql-multi-cursor .cursor.hidden .cursor-flag {\n  display: none;\n}\n.ql-multi-cursor .cursor.top .cursor-flag {\n  bottom: auto;\n  top: 100%;\n}\n.ql-multi-cursor .cursor.right .cursor-flag {\n  right: -2px;\n}\n.ql-paste-manager {\n  left: -100000px;\n  position: absolute;\n  top: 50%;\n}\n.ql-toolbar {\n  box-sizing: border-box;\n}\n.ql-tooltip {\n  background-color: #fff;\n  border: 1px solid #000;\n  box-sizing: border-box;\n  position: absolute;\n  top: 0px;\n  white-space: nowrap;\n  z-index: 2000;\n}\n.ql-tooltip a {\n  cursor: pointer;\n  text-decoration: none;\n}\n.ql-container {\n  box-sizing: border-box;\n  cursor: text;\n  font-family: Helvetica, 'Arial', sans-serif;\n  font-size: 13px;\n  height: 100%;\n  line-height: 1.42;\n  margin: 0px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  padding: 12px 15px;\n  position: relative;\n}\n.ql-editor {\n  box-sizing: border-box;\n  min-height: 100%;\n  outline: none;\n  tab-size: 4;\n  white-space: pre-wrap;\n}\n.ql-editor p {\n  margin: 0;\n  padding: 0;\n}\n.ql-editor img {\n  max-width: 100%;\n}\n.ql-editor blockquote,\n.ql-editor ol,\n.ql-editor ul {\n  margin: 0 0 0 2em;\n  padding: 0;\n}\n.ql-editor ol {\n  list-style-type: decimal;\n}\n.ql-editor ul {\n  list-style-type: disc;\n}\n.ql-editor.ql-ie-9 br,\n.ql-editor.ql-ie-10 br {\n  display: none;\n}\n", ""]);

	// exports


/***/ }),
/* 17 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _libColorPicker = __webpack_require__(19);

	var _libColorPicker2 = _interopRequireDefault(_libColorPicker);

	var _base = __webpack_require__(15);

	var _base2 = _interopRequireDefault(_base);

	var _libPicker = __webpack_require__(20);

	var _libPicker2 = _interopRequireDefault(_libPicker);

	var SnowTheme = (function (_BaseTheme) {
	  _inherits(SnowTheme, _BaseTheme);

	  function SnowTheme(quill) {
	    var _this = this;

	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, SnowTheme);

	    _get(Object.getPrototypeOf(SnowTheme.prototype), 'constructor', this).call(this, quill, false);
	    this.quill.container.classList.add('ql-snow');
	    this.pickers = [];
	    this.quill.on(this.quill.constructor.events.SELECTION_CHANGE, function (range) {
	      if (range == null) return;
	      _this.pickers.forEach(function (picker) {
	        picker.close();
	      });
	    });
	    this.quill.onModuleLoad('multi-cursor', this.extendMultiCursor.bind(this));
	    this.quill.onModuleLoad('toolbar', this.extendToolbar.bind(this));
	  }

	  _createClass(SnowTheme, [{
	    key: 'extendMultiCursor',
	    value: function extendMultiCursor(module) {
	      module.on(module.constructor.events.CURSOR_ADDED, function (cursor) {
	        var bottomTriangle = cursor.elem.querySelector('.cursor-triangle.bottom');
	        var topTriangle = cursor.elem.querySelector('.cursor-triangle.top');
	        bottomTriangle.style.borderTopColor = topTriangle.style.borderBottomColor = cursor.color;
	      });
	    }
	  }, {
	    key: 'extendToolbar',
	    value: function extendToolbar(module) {
	      var _this2 = this;

	      module.container.classList.add('ql-snow');
	      ['color', 'background', 'font', 'size', 'align'].forEach(function (format) {
	        var select = module.container.querySelector(".ql-" + format);
	        if (select == null) return;
	        switch (format) {
	          case 'font':case 'size':case 'align':
	            _this2.pickers.push(new _libPicker2['default'](select));
	            break;
	          case 'color':case 'background':
	            var picker = new _libColorPicker2['default'](select);
	            var options = [].slice.call(picker.container.querySelectorAll('.ql-picker-item'));
	            options.forEach(function (item, i) {
	              if (i < 7) {
	                return item.classList.add('ql-primary-color');
	              }
	            });
	            _this2.pickers.push(picker);
	            break;
	        }
	      });
	      var walker = document.createTreeWalker(module.container, NodeFilter.SHOW_TEXT, null, false);
	      var textNodes = [];
	      while (textNode = walker.nextNode()) {
	        textNodes.push(textNode);
	      }
	      textNodes.forEach(function (node) {
	        if (node.textContent.trim().length === 0) {
	          node.parentNode.removeChild(node);
	        }
	      });
	    }
	  }]);

	  return SnowTheme;
	})(_base2['default']);

	SnowTheme.COLORS = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008A00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"];
	SnowTheme.OPTIONS = {
	  'multi-cursor': {
	    template: '\n      <span class="cursor-flag">\n        <span class="cursor-triangle top"></span>\n        <span class="cursor-name"></span>\n        <span class="cursor-triangle bottom"></span>\n      </span>\n      <span class="cursor-caret"></span>\n    '.replace(/\n\s+/g, '')
	  }
	};

	exports['default'] = SnowTheme;
	module.exports = exports['default'];

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _picker = __webpack_require__(20);

	var _picker2 = _interopRequireDefault(_picker);

	var ColorPicker = (function (_Picker) {
	  _inherits(ColorPicker, _Picker);

	  function ColorPicker() {
	    _classCallCheck(this, ColorPicker);

	    _get(Object.getPrototypeOf(ColorPicker.prototype), 'constructor', this).call(this);
	    this.container.classList.add('ql-color-picker');
	  }

	  _createClass(ColorPicker, [{
	    key: 'buildItem',
	    value: function buildItem(picker, option, index) {
	      var item = _get(Object.getPrototypeOf(ColorPicker.prototype), 'buildItem', this).call(this, picker, option, index);
	      item.style.backgoundColor = option.value;
	      return item;
	    }
	  }]);

	  return ColorPicker;
	})(_picker2['default']);

	exports['default'] = ColorPicker;
	module.exports = exports['default'];

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Picker = (function () {
	  function Picker(select) {
	    var _this = this;

	    _classCallCheck(this, Picker);

	    this.select = select;
	    this.container = document.createElement('span');
	    this.buildPicker();
	    this.container.classList.add('ql-picker');
	    this.select.style.display = 'none';
	    this.select.parentNode.insertBefore(this.container, this.select);
	    document.body.addEventListener('click', function (evt) {
	      if (evt.target !== _this.label) {
	        _this.close();
	      }
	    });
	    this.label.addEventListener('click', function () {
	      _this.container.classList.toggle('ql-expanded');
	    });
	    this.select.addEventListener('change', function () {
	      var item = undefined,
	          option = undefined;
	      if (_this.select.selectedIndex > -1) {
	        item = _this.container.querySelectorAll('.ql-picker-item')[_this.select.selectedIndex];
	        option = _this.select.option[_this.selectedIndex];
	      }
	      _this.selectItem(item);
	      var isActive = option !== _this.select.querySelector('option[selected]');
	      if (_this.label.classList.contains('ql-active') !== isActive) {
	        _this.label.classList.toggle('ql-active'); // IE10 does not support 2nd parameter;
	      }
	    });
	  }

	  _createClass(Picker, [{
	    key: 'buildItem',
	    value: function buildItem(picker, option, index) {
	      var _this2 = this;

	      var item = document.createElement('span');
	      item.setAttribute('data-value', option.getAttribute('value'));
	      item.classList.add('ql-picker-item');
	      item.textContent = option.textContent;
	      item.addEventListener('click', function () {
	        _this2.selectItem(item, true);
	        _this2.close();
	      });
	      return item;
	    }
	  }, {
	    key: 'buildPicker',
	    value: function buildPicker() {
	      var _this3 = this;

	      [].slice.call(this.select.attributes).forEach(function (item) {
	        _this3.container.setAttribute(item.name, item.value);
	      });
	      this.container.innerHTML = Picker.TEMPLATE;
	      this.label = this.container.querySelector('.ql-picker-label');
	      var picker = this.container.querySelector('.ql-picker-options');
	      [].slice.call(this.select.options).forEach(function (option, i) {
	        var item = _this3.buildItem(picker, option, i);
	        picker.appendChild(item);
	        if (_this3.select.selectedIndex === i) {
	          _this3.selectItem(item);
	        }
	      });
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      this.container.classList.remove('ql-expanded');
	    }
	  }, {
	    key: 'selectItem',
	    value: function selectItem(item) {
	      var trigger = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	      var selected = this.container.querySelector('.ql-selected');
	      if (selected != null) {
	        selected.classList.remove('ql-selected');
	      }
	      if (item != null) {
	        var value = item.getAttribute('data-value');
	        item.classList.add('ql-selected');
	        this.label.textContent = item.textContent;
	        this.select.selectedIndex = [].indexOf.call(item.parentNode.children, item);
	        this.label.setAttribute('data-value', value);
	        if (trigger) {
	          this.select.dispatchEvent(new Event('change'));
	        }
	      } else {
	        this.label.innerHTML = '&nbsp;';
	        this.label.removeAttribute('data-value');
	      }
	    }
	  }]);

	  return Picker;
	})();

	Picker.TEMPLATE = '<span class="ql-picker-label"></span><span class="ql-picker-options"></span>';

	exports['default'] = Picker;
	module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _richTextLibDelta = __webpack_require__(3);

	var _richTextLibDelta2 = _interopRequireDefault(_richTextLibDelta);

	var _parchment = __webpack_require__(10);

	var _parchment2 = _interopRequireDefault(_parchment);

	var _extend = __webpack_require__(14);

	var _extend2 = _interopRequireDefault(_extend);

	var NEWLINE_LENGTH = 1;

	var Block = (function (_Parchment$Block) {
	  _inherits(Block, _Parchment$Block);

	  function Block() {
	    _classCallCheck(this, Block);

	    _get(Object.getPrototypeOf(Block.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Block, [{
	    key: 'build',
	    value: function build() {
	      _get(Object.getPrototypeOf(Block.prototype), 'build', this).call(this);
	      this.ensureChild();
	    }
	  }, {
	    key: 'deleteAt',
	    value: function deleteAt(index, length) {
	      _get(Object.getPrototypeOf(Block.prototype), 'deleteAt', this).call(this, index, length);
	      this.ensureChild();
	    }
	  }, {
	    key: 'ensureChild',
	    value: function ensureChild() {
	      if (this.children.length === 0) {
	        return this.appendChild(_parchment2['default'].create('break'));
	      }
	    }
	  }, {
	    key: 'findPath',
	    value: function findPath(index) {
	      return _get(Object.getPrototypeOf(Block.prototype), 'findPath', this).call(this, index, true);
	    }
	  }, {
	    key: 'format',
	    value: function format(name, value) {
	      var blot = _parchment2['default'].match(name, _parchment2['default'].Type.BLOT);
	      if (blot != null) {
	        if (blot.prototype instanceof _parchment2['default'].Block || blot.prototype instanceof _parchment2['default'].Container) {
	          _get(Object.getPrototypeOf(Block.prototype), 'format', this).call(this, name, value);
	        }
	      } else if (_parchment2['default'].match(name, _parchment2['default'].Type.ATTRIBUTE)) {
	        _get(Object.getPrototypeOf(Block.prototype), 'format', this).call(this, name, value);
	      }
	    }
	  }, {
	    key: 'formatAt',
	    value: function formatAt(index, length, name, value) {
	      if (length <= 0) return;
	      if (index + length >= this.getLength()) {
	        this.format(name, value);
	      }
	      _get(Object.getPrototypeOf(Block.prototype), 'formatAt', this).call(this, index, Math.min(length, this.getLength() - index - 1), name, value);
	    }
	  }, {
	    key: 'getDelta',
	    value: function getDelta() {
	      var _this = this;

	      var leaves = this.getDescendants(_parchment2['default'].Leaf);
	      return leaves.reduceRight(function (delta, blot) {
	        if (blot.getLength() === 0) return delta;
	        var attributes = {};
	        var value = blot.getValue();
	        while (blot !== _this) {
	          attributes = (0, _extend2['default'])({}, blot.getFormat(), attributes);
	          blot = blot.parent;
	        }
	        return new _richTextLibDelta2['default']().insert(value, attributes).concat(delta);
	      }, new _richTextLibDelta2['default']().insert('\n', this.getFormat()));
	    }
	  }, {
	    key: 'getLength',
	    value: function getLength() {
	      return _get(Object.getPrototypeOf(Block.prototype), 'getLength', this).call(this) + NEWLINE_LENGTH;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return _get(Object.getPrototypeOf(Block.prototype), 'getValue', this).call(this).concat('\n');
	    }
	  }, {
	    key: 'insertAt',
	    value: function insertAt(index, value, def) {
	      if (typeof value === 'object') {
	        value = value.insert;
	      }

	      if (def != null) return _get(Object.getPrototypeOf(Block.prototype), 'insertAt', this).call(this, index, value, def);
	      if (value.length === 0) return;
	      var lines = value.split('\n');
	      var text = lines.shift();
	      if (index < this.getLength() - 1) {
	        _get(Object.getPrototypeOf(Block.prototype), 'insertAt', this).call(this, index, text);
	      } else {
	        this.children.tail.insertAt(this.children.tail.getLength(), text);
	      }
	      if (lines.length > 0) {
	        var next = this.split(index + text.length, true);
	        next.insertAt(0, lines.join('\n'));
	      }
	    }
	  }, {
	    key: 'insertBefore',
	    value: function insertBefore(blot, ref) {
	      var br = undefined;
	      if (this.children.head != null && this.children.head.statics.blotName === 'break') {
	        br = this.children.head;
	      }
	      _get(Object.getPrototypeOf(Block.prototype), 'insertBefore', this).call(this, blot, ref);
	      if (br != null) {
	        br.remove();
	      }
	    }
	  }, {
	    key: 'split',
	    value: function split(index) {
	      var force = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	      if (force && (index === 0 || index >= this.getLength() - NEWLINE_LENGTH)) {
	        var after = this.clone();
	        if (index === 0) {
	          this.moveChildren(after);
	          this.ensureChild();
	        } else {
	          after.ensureChild();
	        }
	        this.parent.insertBefore(after, this.next);
	        return after;
	      } else {
	        return _get(Object.getPrototypeOf(Block.prototype), 'split', this).call(this, index, force);
	      }
	    }
	  }]);

	  return Block;
	})(_parchment2['default'].Block);

	Block.blotName = 'block';
	Block.tagName = 'P';

	_parchment2['default'].register(Block);

	exports['default'] = Block;
	module.exports = exports['default'];

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _parchment = __webpack_require__(10);

	var _parchment2 = _interopRequireDefault(_parchment);

	var Break = (function (_Parchment$Embed) {
	  _inherits(Break, _Parchment$Embed);

	  function Break() {
	    _classCallCheck(this, Break);

	    _get(Object.getPrototypeOf(Break.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Break, [{
	    key: 'getLength',
	    value: function getLength() {
	      return 0;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return '';
	    }
	  }]);

	  return Break;
	})(_parchment2['default'].Embed);

	Break.blotName = 'break';
	Break.tagName = 'BR';

	_parchment2['default'].register(Break);

	exports['default'] = Break;
	module.exports = exports['default'];

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _richTextLibDelta = __webpack_require__(3);

	var _richTextLibDelta2 = _interopRequireDefault(_richTextLibDelta);

	var _parchment = __webpack_require__(10);

	var _parchment2 = _interopRequireDefault(_parchment);

	var Cursor = (function (_Parchment$Embed) {
	  _inherits(Cursor, _Parchment$Embed);

	  function Cursor(value) {
	    _classCallCheck(this, Cursor);

	    _get(Object.getPrototypeOf(Cursor.prototype), 'constructor', this).call(this, value);
	    this.domNode.classList.add(_parchment2['default'].PREFIX + 'cursor');
	    this.domNode.appendChild(document.createTextNode('﻿')); // Zero width space
	  }

	  _createClass(Cursor, [{
	    key: 'getLength',
	    value: function getLength() {
	      return 0;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return '';
	    }
	  }]);

	  return Cursor;
	})(_parchment2['default'].Embed);

	Cursor.blotName = 'cursor';
	Cursor.tagName = 'span';

	_parchment2['default'].register(Cursor);
	_parchment2['default'].register(_parchment2['default'].Inline); // Redefine to overwrite cursor

	exports['default'] = Cursor;
	module.exports = exports['default'];

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _parchment = __webpack_require__(10);

	var _parchment2 = _interopRequireDefault(_parchment);

	var _attributor = __webpack_require__(25);

	var _attributor2 = _interopRequireDefault(_attributor);

	var BlockAttributor = (function (_StyleAttributor) {
	  _inherits(BlockAttributor, _StyleAttributor);

	  function BlockAttributor() {
	    _classCallCheck(this, BlockAttributor);

	    _get(Object.getPrototypeOf(BlockAttributor.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(BlockAttributor, [{
	    key: 'add',
	    value: function add(node, value) {
	      var blot = _parchment2['default'].findBlot(node);
	      if (blot instanceof _parchment2['default'].Block) {
	        _get(Object.getPrototypeOf(BlockAttributor.prototype), 'add', this).call(this, node, value);
	      }
	    }
	  }]);

	  return BlockAttributor;
	})(_attributor2['default']);

	var Align = new BlockAttributor('align', 'text-align', {
	  'default': 'left',
	  whitelist: ['left', 'right', 'center', 'justify']
	});

	var Direction = new BlockAttributor('direction', 'direction', {
	  'default': 'ltr',
	  whitelist: ['ltr', 'rtl']
	});

	_parchment2['default'].register(Align);
	_parchment2['default'].register(Direction);

	exports.Align = Align;
	exports.Direction = Direction;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _parchment = __webpack_require__(10);

	var _parchment2 = _interopRequireDefault(_parchment);

	var StyleAttributor = (function (_Parchment$Style) {
	  _inherits(StyleAttributor, _Parchment$Style);

	  function StyleAttributor(attrName, styleName) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    _classCallCheck(this, StyleAttributor);

	    _get(Object.getPrototypeOf(StyleAttributor.prototype), 'constructor', this).call(this, attrName, styleName);
	    this.options = options;
	  }

	  _createClass(StyleAttributor, [{
	    key: 'add',
	    value: function add(node, value) {
	      if (this.options['default'] != null && value === this.options['default']) {
	        this.remove(node);
	      } else if (this.options.whitelist == null || this.options.whitelist.indexOf(value) > -1) {
	        _get(Object.getPrototypeOf(StyleAttributor.prototype), 'add', this).call(this, node, value);
	      }
	    }
	  }]);

	  return StyleAttributor;
	})(_parchment2['default'].Style);

	exports['default'] = StyleAttributor;
	module.exports = exports['default'];

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _blotsBlock = __webpack_require__(21);

	var _blotsBlock2 = _interopRequireDefault(_blotsBlock);

	var _richTextLibDelta = __webpack_require__(3);

	var _richTextLibDelta2 = _interopRequireDefault(_richTextLibDelta);

	var _parchment = __webpack_require__(10);

	var _parchment2 = _interopRequireDefault(_parchment);

	var Header = (function (_Block) {
	  _inherits(Header, _Block);

	  function Header(value) {
	    _classCallCheck(this, Header);

	    if (typeof value === 'number') {
	      value = document.createElement(Header.tagName[value - 1]);
	    }
	    _get(Object.getPrototypeOf(Header.prototype), 'constructor', this).call(this, value);
	  }

	  _createClass(Header, [{
	    key: 'getFormat',
	    value: function getFormat() {
	      var formats = _get(Object.getPrototypeOf(Header.prototype), 'getFormat', this).call(this);
	      formats.header = Header.tagName.indexOf(this.domNode.tagName) + 1;
	      return formats;
	    }
	  }]);

	  return Header;
	})(_blotsBlock2['default']);

	Header.blotName = 'header';
	Header.tagName = ['H1', 'H2', 'H3'];

	_parchment2['default'].register(Header);

	exports['default'] = Header;
	module.exports = exports['default'];

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _parchment = __webpack_require__(10);

	var _parchment2 = _interopRequireDefault(_parchment);

	var Image = (function (_Parchment$Embed) {
	  _inherits(Image, _Parchment$Embed);

	  function Image(value) {
	    _classCallCheck(this, Image);

	    _get(Object.getPrototypeOf(Image.prototype), 'constructor', this).call(this, value);
	    if (typeof value === 'string') {
	      this.domNode.setAttribute('src', value);
	    }
	  }

	  _createClass(Image, [{
	    key: 'getFormat',
	    value: function getFormat() {
	      var formats = _get(Object.getPrototypeOf(Image.prototype), 'getFormat', this).call(this);
	      formats.image = this.domNode.getAttribute('src');
	      return formats;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return 1;
	    }
	  }]);

	  return Image;
	})(_parchment2['default'].Embed);

	Image.blotName = 'image';
	Image.tagName = 'IMG';

	_parchment2['default'].register(Image);

	exports['default'] = Image;
	module.exports = exports['default'];

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _parchment = __webpack_require__(10);

	var _parchment2 = _interopRequireDefault(_parchment);

	var _attributor = __webpack_require__(25);

	var _attributor2 = _interopRequireDefault(_attributor);

	// Earlier means higher in the DOM tree
	var order = ['link', // Must be earlier
	'script', 'italic', 'bold', 'strike', 'underline', 'code', 'inline', 'cursor' // Must be later
	];

	_parchment2['default'].Inline.compare = function (self, other) {
	  var selfIndex = order.indexOf(self);
	  var otherIndex = order.indexOf(other);
	  if (selfIndex !== otherIndex) {
	    return selfIndex >= otherIndex;
	  } else {
	    return self >= other;
	  }
	};

	var Bold = (function (_Parchment$Inline) {
	  _inherits(Bold, _Parchment$Inline);

	  function Bold() {
	    _classCallCheck(this, Bold);

	    _get(Object.getPrototypeOf(Bold.prototype), 'constructor', this).apply(this, arguments);
	  }

	  return Bold;
	})(_parchment2['default'].Inline);

	Bold.blotName = 'bold';
	Bold.tagName = 'STRONG';

	var Italic = (function (_Parchment$Inline2) {
	  _inherits(Italic, _Parchment$Inline2);

	  function Italic() {
	    _classCallCheck(this, Italic);

	    _get(Object.getPrototypeOf(Italic.prototype), 'constructor', this).apply(this, arguments);
	  }

	  return Italic;
	})(_parchment2['default'].Inline);

	Italic.blotName = 'italic';
	Italic.tagName = 'EM';

	var Strike = (function (_Parchment$Inline3) {
	  _inherits(Strike, _Parchment$Inline3);

	  function Strike() {
	    _classCallCheck(this, Strike);

	    _get(Object.getPrototypeOf(Strike.prototype), 'constructor', this).apply(this, arguments);
	  }

	  return Strike;
	})(_parchment2['default'].Inline);

	Strike.blotName = 'strike';
	Strike.tagName = 'S';

	var Underline = (function (_Parchment$Inline4) {
	  _inherits(Underline, _Parchment$Inline4);

	  function Underline() {
	    _classCallCheck(this, Underline);

	    _get(Object.getPrototypeOf(Underline.prototype), 'constructor', this).apply(this, arguments);
	  }

	  return Underline;
	})(_parchment2['default'].Inline);

	Underline.blotName = 'underline';
	Underline.tagName = 'U';

	var InlineCode = (function (_Parchment$Inline5) {
	  _inherits(InlineCode, _Parchment$Inline5);

	  function InlineCode() {
	    _classCallCheck(this, InlineCode);

	    _get(Object.getPrototypeOf(InlineCode.prototype), 'constructor', this).apply(this, arguments);
	  }

	  return InlineCode;
	})(_parchment2['default'].Inline);

	InlineCode.blotName = 'inline-code';
	InlineCode.tagName = 'CODE';

	var Link = (function (_Parchment$Inline6) {
	  _inherits(Link, _Parchment$Inline6);

	  function Link(value) {
	    _classCallCheck(this, Link);

	    _get(Object.getPrototypeOf(Link.prototype), 'constructor', this).call(this, value);
	    if (typeof value === 'string') {
	      this.domNode.setAttribute('href', value);
	    }
	  }

	  _createClass(Link, [{
	    key: 'getFormat',
	    value: function getFormat() {
	      var formats = _get(Object.getPrototypeOf(Link.prototype), 'getFormat', this).call(this);
	      formats.link = this.domNode.getAttribute('href');
	      return formats;
	    }
	  }]);

	  return Link;
	})(_parchment2['default'].Inline);

	Link.blotName = 'link';
	Link.tagName = 'A';

	var Script = (function (_Parchment$Inline7) {
	  _inherits(Script, _Parchment$Inline7);

	  function Script(value) {
	    _classCallCheck(this, Script);

	    if (value === 'super') {
	      value = document.createElement('sup');
	    } else if (value === 'sub') {
	      value = document.createElement('sub');
	    }
	    _get(Object.getPrototypeOf(Script.prototype), 'constructor', this).call(this, value);
	  }

	  _createClass(Script, [{
	    key: 'getFormat',
	    value: function getFormat() {
	      var formats = _get(Object.getPrototypeOf(Script.prototype), 'getFormat', this).call(this);
	      formats.script = this.domNode.tagName === 'SUP' ? 'super' : 'sub';
	      return formats;
	    }
	  }]);

	  return Script;
	})(_parchment2['default'].Inline);

	Script.blotName = 'script';
	Script.tagName = ['SUB', 'SUP'];

	var InlineAttributor = (function (_StyleAttributor) {
	  _inherits(InlineAttributor, _StyleAttributor);

	  function InlineAttributor() {
	    _classCallCheck(this, InlineAttributor);

	    _get(Object.getPrototypeOf(InlineAttributor.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(InlineAttributor, [{
	    key: 'add',
	    value: function add(node, value) {
	      var blot = _parchment2['default'].findBlot(node);
	      if (blot instanceof _parchment2['default'].Inline) {
	        _get(Object.getPrototypeOf(InlineAttributor.prototype), 'add', this).call(this, node, value);
	      }
	    }
	  }]);

	  return InlineAttributor;
	})(_attributor2['default']);

	var Background = new InlineAttributor('background', 'background-color');
	var Color = new InlineAttributor('color', 'color');
	var Font = new InlineAttributor('font', 'font-family');
	var Size = new InlineAttributor('size', 'font-size');

	_parchment2['default'].register(Bold);
	_parchment2['default'].register(Italic);
	_parchment2['default'].register(Strike);
	_parchment2['default'].register(Underline);
	_parchment2['default'].register(InlineCode);
	_parchment2['default'].register(Link);
	_parchment2['default'].register(Script);
	_parchment2['default'].register(Background);
	_parchment2['default'].register(Color);
	_parchment2['default'].register(Font);
	_parchment2['default'].register(Size);

	exports.Bold = Bold;
	exports.Italic = Italic;
	exports.Strike = Strike;
	exports.Underline = Underline;
	exports.Link = Link;
	exports.InlineCode = InlineCode;
	exports.Script = Script;
	exports.Background = Background;
	exports.Color = Color;
	exports.Font = Font;
	exports.Size = Size;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _blotsBlock = __webpack_require__(21);

	var _blotsBlock2 = _interopRequireDefault(_blotsBlock);

	var _richTextLibDelta = __webpack_require__(3);

	var _richTextLibDelta2 = _interopRequireDefault(_richTextLibDelta);

	var _parchment = __webpack_require__(10);

	var _parchment2 = _interopRequireDefault(_parchment);

	var Bullet = (function (_Parchment$Container) {
	  _inherits(Bullet, _Parchment$Container);

	  function Bullet() {
	    _classCallCheck(this, Bullet);

	    _get(Object.getPrototypeOf(Bullet.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Bullet, [{
	    key: 'insertBefore',
	    value: function insertBefore(child, refBlot) {
	      if (child instanceof Item) {
	        _get(Object.getPrototypeOf(Bullet.prototype), 'insertBefore', this).call(this, child, refBlot);
	      } else {
	        if (this.children.length === 0) {
	          this.appendChild(_parchment2['default'].create('item'));
	        }
	        this.children.head.appendChild(child);
	        if (child instanceof _parchment2['default'].Block) {
	          child.unwrap();
	        }
	      }
	    }
	  }, {
	    key: 'merge',
	    value: function merge() {
	      var target = arguments.length <= 0 || arguments[0] === undefined ? this.next : arguments[0];

	      if (target != null && this.statics.blotName === target.statics.blotName) {
	        // OL/UL should not have DOM attributes
	        target.moveChildren(this);
	        target.remove();
	      }
	      return false;
	    }
	  }]);

	  return Bullet;
	})(_parchment2['default'].Container);

	Bullet.blotName = 'bullet';
	Bullet.tagName = 'UL';

	var List = (function (_Bullet) {
	  _inherits(List, _Bullet);

	  function List() {
	    _classCallCheck(this, List);

	    _get(Object.getPrototypeOf(List.prototype), 'constructor', this).apply(this, arguments);
	  }

	  return List;
	})(Bullet);

	List.blotName = 'list';
	List.tagName = 'OL';

	var Item = (function (_Block) {
	  _inherits(Item, _Block);

	  function Item() {
	    _classCallCheck(this, Item);

	    _get(Object.getPrototypeOf(Item.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Item, [{
	    key: 'format',
	    value: function format(name, value) {
	      if (_parchment2['default'].match(name, _parchment2['default'].Type.ATTRIBUTE)) {
	        _get(Object.getPrototypeOf(Item.prototype), 'format', this).call(this, name, value);
	      } else {
	        var target = this.parent.isolate(this.offset(), this.getLength());
	        if (value) {
	          target.replace(name, value);
	        } else {
	          target.replace('block');
	        }
	        if (!(this.parent instanceof Bullet)) {
	          this.unwrap();
	        }
	      }
	    }
	  }, {
	    key: 'getFormat',
	    value: function getFormat() {
	      var formats = _get(Object.getPrototypeOf(Item.prototype), 'getFormat', this).call(this);
	      delete formats['item'];
	      formats[this.parent.statics.blotName] = true;
	      return formats;
	    }
	  }]);

	  return Item;
	})(_blotsBlock2['default']);

	Item.blotName = 'item';
	Item.tagName = 'LI';

	_parchment2['default'].register(Bullet);
	_parchment2['default'].register(List);
	_parchment2['default'].register(Item);

	exports.Bullet = Bullet;
	exports.Item = Item;
	exports.List = List;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _quill = __webpack_require__(2);

	var _quill2 = _interopRequireDefault(_quill);

	var _tooltip = __webpack_require__(31);

	var _tooltip2 = _interopRequireDefault(_tooltip);

	var _extend = __webpack_require__(14);

	var _extend2 = _interopRequireDefault(_extend);

	var Delta = _quill2['default'].require('delta');
	var Range = _quill2['default'].require('range');

	var ImageTooltip = (function (_Tooltip) {
	  _inherits(ImageTooltip, _Tooltip);

	  function ImageTooltip(quill) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, ImageTooltip);

	    options = (0, _extend2['default'])({}, _tooltip2['default'].DEFAULTS, options);
	    _get(Object.getPrototypeOf(ImageTooltip.prototype), 'constructor', this).call(this, quill, options);
	    this.preview = this.container.querySelector('.preview');
	    this.textbox = this.container.querySelector('.input');
	    this.container.classList.add('ql-image-tooltip');
	    this.initListeners();
	  }

	  _createClass(ImageTooltip, [{
	    key: 'initListeners',
	    value: function initListeners() {
	      var _this = this;

	      this.quill.root.addEventListener('focus', this.hide.bind(this));
	      this.container.querySelector('.insert').addEventListener('click', this.insertImage.bind(this));
	      this.container.querySelector('.cancel').addEventListener('click', this.hide.bind(this));
	      this.textbox.addEventListener('input', this._preview.bind(this));
	      this.initTextbox(this.textbox, this.insertImage, this.hide);
	      this.quill.onModuleLoad('toolbar', function (toolbar) {
	        _this.toolbar = toolbar;
	        toolbar.initFormat('image', _this._onToolbar.bind(_this));
	      });
	    }
	  }, {
	    key: 'insertImage',
	    value: function insertImage() {
	      var url = this._normalizeURL(this.textbox.value);
	      this.preview.innerHTML = '<span>Preview</span>';
	      this.textbox.value = '';
	      this.hide();
	      var range = this.quill.getSelection();
	      if (range != null) {
	        this.quill.insertEmbed(range.start, 'image', url, 'user');
	        this.quill.setSelection(range.start + 1, range.start + 1);
	      }
	    }
	  }, {
	    key: '_matchImageURL',
	    value: function _matchImageURL(url) {
	      return (/^https?:\/\/.+\.(jpe?g|gif|png)$/.test(url)
	      );
	    }
	  }, {
	    key: '_normalizeURL',
	    value: function _normalizeURL(url) {
	      // For now identical to link-tooltip but will change when we allow data uri
	      if (!/^https?:\/\//.test(url)) {
	        url = 'http://' + url;
	      }
	      return url;
	    }
	  }, {
	    key: '_onToolbar',
	    value: function _onToolbar(range, value) {
	      var _this2 = this;

	      if (value) {
	        if (this.textbox.value.length === 0) {
	          this.textbox.value = 'http://';
	        }
	        this.show();
	        this.textbox.focus();
	        setTimeout(function () {
	          _this2.textbox.setSelectionRange(_this2.textbox.value.length, _this2.textbox.value.length);
	        }, 0);
	      } else {
	        this.quill.deleteText(range, 'user');
	        this.toolbar.setActive('image', false);
	      }
	    }
	  }, {
	    key: '_preview',
	    value: function _preview() {
	      if (!this._matchImageURL(this.textbox.value)) return;
	      if (this.preview.firstChild.tagName === 'IMG') {
	        this.preview.firstChild.setAttribute('src', this.textbox.value);
	      } else {
	        img = document.createElement('img');
	        img.setAttribute('src', this.textbox.value);
	        this.preview.replaceChild(img, this.preview.firstChild);
	      }
	    }
	  }]);

	  return ImageTooltip;
	})(_tooltip2['default']);

	ImageTooltip.DEFAULTS = {
	  template: '\n    <input class="input" type="textbox">\n    <div class="preview">\n      <span>Preview</span>\n    </div>\n    <a href="javascript:;" class="cancel">Cancel</a>\n    <a href="javascript:;" class="insert">Insert</a>'
	};

	_quill2['default'].registerModule('image-tooltip', ImageTooltip);

	exports['default'] = ImageTooltip;
	module.exports = exports['default'];

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _quill = __webpack_require__(2);

	var _quill2 = _interopRequireDefault(_quill);

	var _libKeys = __webpack_require__(32);

	var _libKeys2 = _interopRequireDefault(_libKeys);

	var HIDE_MARGIN = '-10000px';

	var Tooltip = (function () {
	  function Tooltip(quill) {
	    var _this = this;

	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, Tooltip);

	    this.quill = quill;
	    this.options = options;
	    this.container = this.quill.addContainer('ql-tooltip');
	    this.container.innerHTML = this.options.template;
	    this.hide();
	    this.quill.on(_quill2['default'].events.TEXT_CHANGE, function (delta, source) {
	      if (_this.container.style.left !== HIDE_MARGIN) {
	        _this.hide();
	      }
	    });
	  }

	  _createClass(Tooltip, [{
	    key: 'initTextbox',
	    value: function initTextbox(textbox, enterCallback, escapeCallback) {
	      var _this2 = this;

	      textbox.addEventListener('keydown', function (evt) {
	        if (evt.which !== _libKeys2['default'].ENTER && evt.which !== _libKeys2['default'].ESCAPE) return;
	        var fn = evt.which === _libKeys2['default'].ENTER ? enterCallback : escapeCallback;
	        fn.call(_this2);
	        evt.preventDefault();
	      });
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this.container.style.left = HIDE_MARGIN;
	      this.quill.focus();
	    }
	  }, {
	    key: 'position',
	    value: function position(reference) {
	      var left = undefined,
	          top = undefined;
	      if (reference != null) {
	        var referenceBounds = reference.getBoundingClientRect();
	        var parentBounds = this.quill.container.getBoundingClientRect();
	        var offsetLeft = referenceBounds.left - parentBounds.left;
	        var offsetTop = referenceBounds.top - parentBounds.top;
	        var offsetBottom = referenceBounds.bottom - parentBounds.bottom;
	        left = offsetLeft + referenceBounds.width / 2 - this.container.offsetWidth / 2;
	        top = offsetTop + referenceBounds.height + this.options.offset;
	        if (top + this.container.offsetHeight > this.quill.container.offsetHeight) {
	          top = offsetTop - this.container.offsetHeight - this.options.offset;
	        }
	        left = Math.max(0, Math.min(left, this.quill.container.offsetWidth - this.container.offsetWidth));
	        top = Math.max(0, Math.min(top, this.quill.container.offsetHeight - this.container.offsetHeight));
	      } else {
	        left = this.quill.container.offsetWidth / 2 - this.container.offsetWidth / 2;
	        top = this.quill.container.offsetHeight / 2 - this.container.offsetHeight / 2;
	      }
	      top += this.quill.container.scrollTop;
	      return [left, top];
	    }
	  }, {
	    key: 'show',
	    value: function show(reference) {
	      var _position = this.position(reference);

	      var _position2 = _slicedToArray(_position, 2);

	      var left = _position2[0];
	      var top = _position2[1];

	      this.container.style.left = left + "px";
	      this.container.style.top = top + "px";
	      this.container.focus();
	    }
	  }]);

	  return Tooltip;
	})();

	Tooltip.DEFAULTS = {
	  offset: 10,
	  template: ''
	};

	_quill2['default'].registerModule('tooltip', Tooltip);

	exports['default'] = Tooltip;
	module.exports = exports['default'];

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var keys = {
	  BACKSPACE: 8,
	  TAB: 9,
	  ENTER: 13,
	  ESCAPE: 27,
	  LEFT: 37,
	  UP: 38,
	  RIGHT: 39,
	  DOWN: 40,
	  DELETE: 46
	};
	exports.keys = keys;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _quill = __webpack_require__(2);

	var _quill2 = _interopRequireDefault(_quill);

	var _clone = __webpack_require__(34);

	var _clone2 = _interopRequireDefault(_clone);

	var _deepEqual = __webpack_require__(5);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _libPlatform = __webpack_require__(13);

	var _libPlatform2 = _interopRequireDefault(_libPlatform);

	var Delta = _quill2['default'].require('delta');

	var Keyboard = (function () {
	  // TODO allow passing in hotkeys in options

	  function Keyboard(quill) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, Keyboard);

	    this.quill = quill;
	    this.hotkeys = {};
	    this.onKeyDown = this.onKeyDown.bind(this);
	    this.quill.root.addEventListener('keydown', this.onKeyDown);
	  }

	  _createClass(Keyboard, [{
	    key: 'onKeyDown',
	    value: function onKeyDown(evt) {
	      var which = evt.which || evt.keyCode;
	      var range = this.quill.getSelection();
	      var prevent = (this.hotkeys[which] || []).reduce(function (prevent, hotkey) {
	        var _hotkey = _slicedToArray(hotkey, 2);

	        var key = _hotkey[0];
	        var callback = _hotkey[1];

	        if (!match(evt, key)) return prevent;
	        return callback(range, key, evt) || prevent;
	      }, false);
	      if (prevent) {
	        return evt.preventDefault();
	      }
	    }
	  }, {
	    key: 'addHotkey',
	    value: function addHotkey(hotkeys, callback) {
	      var _this = this;

	      if (!Array.isArray(hotkeys)) {
	        hotkeys = [hotkeys];
	      }
	      hotkeys.forEach(function (hotkey) {
	        hotkey = coerce(hotkey);
	        if (hotkey == null) {
	          return _this.quill.emit(_quill2['default'].events.DEBUG, 'Attempted to add invalid hotkey', hotkey);
	        }
	        _this.hotkeys[hotkey.key] = _this.hotkeys[hotkey.key] || [];
	        _this.hotkeys[hotkey.key].push([hotkey, callback]);
	      });
	    }
	  }, {
	    key: 'removeHotkey',
	    value: function removeHotkey(hotkeys, callback) {
	      var _this2 = this;

	      if (!Array.isArray(hotkeys)) {
	        hotkeys = [hotkeys];
	      }
	      return hotkeys.reduce(function (removed, query) {
	        query = coerce(query);
	        if (query != null && _this2.hotkeys[query.key] != null) {
	          _this2.hotkeys[query.key] = _this2.hotkeys[query.key].filter(function (target) {
	            if ((0, _deepEqual2['default'])(target[0], query) && (callback == null || callback === target[1])) {
	              removed.push(target[1]);
	              return false;
	            }
	            return true;
	          });
	        }
	        return removed;
	      });
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.quill.root.removeEventListener('keydown', this.onKeyDown);
	      this.quill = null;
	    }
	  }]);

	  return Keyboard;
	})();

	function corce(hotkey) {
	  switch (typeof hotkey) {
	    case 'string':
	      if (Keyboard.hotkeys[hotkey.toUpperCase()] != null) {
	        hotkey = (0, _clone2['default'])(Keyboard.hotkeys[hotkey.toUpperCase()], false);
	      } else if (hotkey.length === 1) {
	        hotkey = { key: hotkey };
	      } else {
	        return null;
	      }
	      break;
	    case 'number':
	      hotkey = { key: hotkey };
	      break;
	    case 'object':
	      hotkey = (0, _clone2['default'])(hotkey, false);
	      break;
	    default:
	      return null;
	  }
	  if (typeof hotkey.key === 'string') {
	    hotkey.key = hotkey.key.toUpperCase().charCodeAt(0);
	  }
	  return hotkey;
	}

	function match(evt, hotkey) {
	  var metaKey = _libPlatform2['default'].isMac() ? evt.metaKey : evt.metaKey || evt.ctrlKey;
	  if (hotkey.metaKey !== metaKey && hotkey.metaKey !== null) return false;
	  if (hotkey.shiftKey !== evt.shiftKey && hotkey.shiftKey !== null) return false;
	  if (hotkey.altKey !== evt.altKey && hotkey.altKey !== null) return false;
	  return true;
	}

	_quill2['default'].registerModule('keyboard', Keyboard);

	exports['default'] = Keyboard;
	module.exports = exports['default'];

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	var clone = (function() {
	'use strict';

	/**
	 * Clones (copies) an Object using deep copying.
	 *
	 * This function supports circular references by default, but if you are certain
	 * there are no circular references in your object, you can save some CPU time
	 * by calling clone(obj, false).
	 *
	 * Caution: if `circular` is false and `parent` contains circular references,
	 * your program may enter an infinite loop and crash.
	 *
	 * @param `parent` - the object to be cloned
	 * @param `circular` - set to true if the object to be cloned may contain
	 *    circular references. (optional - true by default)
	 * @param `depth` - set to a number if the object is only to be cloned to
	 *    a particular depth. (optional - defaults to Infinity)
	 * @param `prototype` - sets the prototype to be used when cloning an object.
	 *    (optional - defaults to parent prototype).
	*/
	function clone(parent, circular, depth, prototype) {
	  var filter;
	  if (typeof circular === 'object') {
	    depth = circular.depth;
	    prototype = circular.prototype;
	    filter = circular.filter;
	    circular = circular.circular
	  }
	  // maintain two arrays for circular references, where corresponding parents
	  // and children have the same index
	  var allParents = [];
	  var allChildren = [];

	  var useBuffer = typeof Buffer != 'undefined';

	  if (typeof circular == 'undefined')
	    circular = true;

	  if (typeof depth == 'undefined')
	    depth = Infinity;

	  // recurse this function so we don't reset allParents and allChildren
	  function _clone(parent, depth) {
	    // cloning null always returns null
	    if (parent === null)
	      return null;

	    if (depth == 0)
	      return parent;

	    var child;
	    var proto;
	    if (typeof parent != 'object') {
	      return parent;
	    }

	    if (clone.__isArray(parent)) {
	      child = [];
	    } else if (clone.__isRegExp(parent)) {
	      child = new RegExp(parent.source, __getRegExpFlags(parent));
	      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
	    } else if (clone.__isDate(parent)) {
	      child = new Date(parent.getTime());
	    } else if (useBuffer && Buffer.isBuffer(parent)) {
	      child = new Buffer(parent.length);
	      parent.copy(child);
	      return child;
	    } else {
	      if (typeof prototype == 'undefined') {
	        proto = Object.getPrototypeOf(parent);
	        child = Object.create(proto);
	      }
	      else {
	        child = Object.create(prototype);
	        proto = prototype;
	      }
	    }

	    if (circular) {
	      var index = allParents.indexOf(parent);

	      if (index != -1) {
	        return allChildren[index];
	      }
	      allParents.push(parent);
	      allChildren.push(child);
	    }

	    for (var i in parent) {
	      var attrs;
	      if (proto) {
	        attrs = Object.getOwnPropertyDescriptor(proto, i);
	      }

	      if (attrs && attrs.set == null) {
	        continue;
	      }
	      child[i] = _clone(parent[i], depth - 1);
	    }

	    return child;
	  }

	  return _clone(parent, depth);
	}

	/**
	 * Simple flat clone using prototype, accepts only objects, usefull for property
	 * override on FLAT configuration object (no nested props).
	 *
	 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
	 * works.
	 */
	clone.clonePrototype = function clonePrototype(parent) {
	  if (parent === null)
	    return null;

	  var c = function () {};
	  c.prototype = parent;
	  return new c();
	};

	// private utility functions

	function __objToStr(o) {
	  return Object.prototype.toString.call(o);
	};
	clone.__objToStr = __objToStr;

	function __isDate(o) {
	  return typeof o === 'object' && __objToStr(o) === '[object Date]';
	};
	clone.__isDate = __isDate;

	function __isArray(o) {
	  return typeof o === 'object' && __objToStr(o) === '[object Array]';
	};
	clone.__isArray = __isArray;

	function __isRegExp(o) {
	  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
	};
	clone.__isRegExp = __isRegExp;

	function __getRegExpFlags(re) {
	  var flags = '';
	  if (re.global) flags += 'g';
	  if (re.ignoreCase) flags += 'i';
	  if (re.multiline) flags += 'm';
	  return flags;
	};
	clone.__getRegExpFlags = __getRegExpFlags;

	return clone;
	})();

	if (typeof module === 'object' && module.exports) {
	  module.exports = clone;
	}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _quill = __webpack_require__(2);

	var _quill2 = _interopRequireDefault(_quill);

	var _quill3 = _interopRequireDefault(_quill);

	var _extend = __webpack_require__(14);

	var _extend2 = _interopRequireDefault(_extend);

	var LinkTooltip = (function (_Tooltip) {
	  _inherits(LinkTooltip, _Tooltip);

	  function LinkTooltip(quill) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, LinkTooltip);

	    options = (0, _extend2['default'])({}, LinkTooltip.DEFAULTS, options);
	    _get(Object.getPrototypeOf(LinkTooltip.prototype), 'constructor', this).call(this, quill, options);
	    this.container.classList.add('ql-link-tooltip');
	    this.textbox = this.container.querySelector('.input');
	    this.link = this.container.querySelector('.url');
	    this.initListeners();
	  }

	  _createClass(LinkTooltip, [{
	    key: 'initListeners',
	    value: function initListeners() {
	      var _this = this;

	      this.quill.on(_quill2['default'].events.SELECTION_CHANGE, function (range) {
	        if (range == null || !range.isCollapsed()) return;
	        var anchor = _this._findAnchor(range);
	        if (anchor != null) {
	          _this.setMode(anchor.href, false);
	          _this.show(anchor);
	        } else if (_this.container.style.left != _quill3['default'].HIDE_MARGIN) {
	          _this.hide();
	        }
	      });
	      this.container.querySelector('.done').addEventListener('click', this.saveLink.bind(this));
	      this.container.querySelector('.remove').addEventListener('click', function () {
	        _this.removeLink(_this.quill.getSelection());
	      });
	      this.container.querySelector('.change').addEventListener('click', function () {
	        _this.setMode(_this.link.href, true);
	      });
	      this.initTextbox(this.textbox, this.saveLink, this.hide);
	      this.quill.onModuleLoad('toolbar', function (toolbar) {
	        _this.toolbar = toolbar;
	        toolbar.initFormat('link', _this._onToolbar.bind(_this));
	      });
	      this.quill.onModuleLoad('keyboard', function (keyboard) {
	        keyboard.addHotkey(LinkTooltip.hotkeys.LINK, _this._onKeyboard.bind(_this));
	      });
	    }
	  }, {
	    key: 'removeLink',
	    value: function removeLink() {
	      // Expand range to the entire leaf
	      if (range.isCollapsed()) {
	        range = this._expandRange(range);
	      }
	      this.hide();
	      this.quill.formatText(range, 'link', false, _quill2['default'].sources.USER);
	      if (this.toolbar != null) {
	        this.toolbar.setActive('link', false);
	      }
	    }
	  }, {
	    key: 'saveLink',
	    value: function saveLink() {
	      var url = this._normalizeURL(this.textbox.value);
	      var range = this.quill.getSelection(true);
	      if (range != null) {
	        if (range.isCollapsed()) {
	          anchor = this._findAnchor(range);
	          if (anchor != null) {
	            anchor.href = url;
	          }
	        } else {
	          this.quill.formatText(range, 'link', url, _quill2['default'].sources.USER);
	        }
	        this.quill.setSelection(range.end, range.end);
	      }
	      this.setMode(url, false);
	    }
	  }, {
	    key: 'setMode',
	    value: function setMode(url) {
	      var _this2 = this;

	      var edit = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	      if (edit) {
	        this.textbox.value = url;
	        setTimeout(function () {
	          // Setting value and immediately focusing doesn't work on Chrome
	          _this2.textbox.focus();
	          _this2.textbox.setSelectionRange(0, url.length);
	        }, 0);
	      } else {
	        this.link.href = _url;
	        var _url = this.link.href;
	        var text = _url.length > this.options.maxLength ? _url.slice(0, this.options.maxLength) + '...' : _url;
	        this.link.textContent = text;
	      }
	      if (this.container.classList.contains('editing') !== edit) {
	        this.container.classList.toggle('editing');
	      }
	    }
	  }, {
	    key: '_expandRange',
	    value: function _expandRange(range) {
	      var _quill$editor$doc$findLeafAt = this.quill.editor.doc.findLeafAt(range.start, true);

	      var _quill$editor$doc$findLeafAt2 = _slicedToArray(_quill$editor$doc$findLeafAt, 2);

	      var leaf = _quill$editor$doc$findLeafAt2[0];
	      var offset = _quill$editor$doc$findLeafAt2[1];

	      var start = range.start - offset;
	      var end = start + leaf.length;
	      return { start: start, end: end };
	    }
	  }, {
	    key: '_findAnchor',
	    value: function _findAnchor(range) {
	      var node = undefined;

	      var _quill$editor$doc$findLeafAt3 = this.quill.editor.doc.findLeafAt(range.start, true);

	      var _quill$editor$doc$findLeafAt32 = _slicedToArray(_quill$editor$doc$findLeafAt3, 2);

	      var leaf = _quill$editor$doc$findLeafAt32[0];
	      var offset = _quill$editor$doc$findLeafAt32[1];

	      if (leaf != null) {
	        node = leaf.node;
	      }
	      while (node != null && node !== this.quill.root) {
	        if (node.tagName === 'A') return node;
	        node = node.parentNode;
	      }
	      return null;
	    }
	  }, {
	    key: '_normalizeURL',
	    value: function _normalizeURL(url) {
	      if (!/^(https?:\/\/|mailto:)/.test(url)) {
	        url = 'http://' + url;
	      }
	      return url;
	    }
	  }, {
	    key: '_onKeyboard',
	    value: function _onKeyboard() {
	      var range = this.quill.getSelection();
	      this._toggle(range, !this._findAnchor(range));
	    }
	  }, {
	    key: '_onToolbar',
	    value: function _onToolbar(range, value) {
	      this._toggle(range, value);
	    }
	  }, {
	    key: '_toggle',
	    value: function _toggle(range, value) {
	      if (range == null) return;
	      if (!value) {
	        this.removeLink(range);
	      } else if (!range.isCollapsed()) {
	        this.setMode(this._suggestURL(range), true);
	        nativeRange = this.quill.editor.selection._getNativeRange();
	        this.show(nativeRange);
	      }
	    }
	  }, {
	    key: '_suggestURL',
	    value: function _suggestURL(range) {
	      var text = this.quill.getText(range);
	      return this._normalizeURL(text);
	    }
	  }]);

	  return LinkTooltip;
	})(_quill3['default']);

	LinkTooltip.DEFAULTS = {
	  maxLength: 50,
	  template: '\n    <span class="title">Visit URL:&nbsp;</span>\n    <a href="#" class="url" target="_blank" href="about:blank"></a>\n    <input class="input" type="text">\n    <span>&nbsp;&#45;&nbsp;</span>\n    <a href="javascript:;" class="change">Change</a>\n    <a href="javascript:;" class="remove">Remove</a>\n    <a href="javascript:;" class="done">Done</a>'
	};
	LinkTooltip.hotkeys = {
	  LINK: {
	    key: 'K',
	    metaKey: true
	  }
	};

	_quill2['default'].registerModule('link-tooltip', LinkTooltip);

	exports['default'] = LinkTooltip;
	module.exports = exports['default'];

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _eventemitter3 = __webpack_require__(11);

	var _eventemitter32 = _interopRequireDefault(_eventemitter3);

	var _quill = __webpack_require__(2);

	var _quill2 = _interopRequireDefault(_quill);

	var MultiCursor = (function (_EventEmitter) {
	  _inherits(MultiCursor, _EventEmitter);

	  function MultiCursor(quill) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, MultiCursor);

	    _get(Object.getPrototypeOf(MultiCursor.prototype), 'constructor', this).call(this);
	    this.quill = quill;
	    this.options = options;
	    this.cursors = {};
	    this.container = this.quill.addContainer('ql-multi-cursor', true);
	    this.quill.on(this.quill.constructor.events.TEXT_CHANGE, this._applyDelta, this);
	  }

	  _createClass(MultiCursor, [{
	    key: 'clearCursors',
	    value: function clearCursors() {
	      Object.keys(this.cursors).forEach(this.removeCursor.bind(this));
	      this.cursors = {};
	    }
	  }, {
	    key: 'moveCursor',
	    value: function moveCursor(userId, index) {
	      var cursor = this.cursors[userId];
	      if (cursor == null) return;
	      cursor.index = index;
	      cursor.elem.classList.remove('hidden');
	      clearTimeout(cursor.timer);
	      cursor.timer = setTimeout(function () {
	        cursor.elem.classList.add('hidden');
	        cursor.timer = null;
	      }, this.options.timeout);
	      this._updateCursor(cursor);
	      return cursor;
	    }
	  }, {
	    key: 'removeCursor',
	    value: function removeCursor(userId) {
	      var cursor = this.cursors[userId];
	      this.emit(MultiCursor.events.CURSOR_REMOVED, cursor);
	      if (cursor != null) {
	        cursor.elem.parentNode.removeChild(cursor.elem);
	      }
	      delete this.cursors[userId];
	    }
	  }, {
	    key: 'setCursor',
	    value: function setCursor(userId, index, name, color) {
	      var _this = this;

	      if (this.cursors[userId] == null) {
	        var cursor = this.cursors[userId] = {
	          userId: userId,
	          index: index,
	          color: color,
	          elem: this._buildCursor(name, color)
	        };
	        this.emit(MultiCursor.events.CURSOR_ADDED, cursor);
	      }
	      setTimeout(function () {
	        _this.moveCursor(userId, index);
	      }, 0);
	      return this.cursors[userId];
	    }
	  }, {
	    key: 'shiftCursors',
	    value: function shiftCursors(index, length) {
	      var _this2 = this;

	      var authorId = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	      Object.keys(this.cursors).forEach(function (id) {
	        if (_this2.cursors[id] == null) return;
	        var shift = Math.max(length, index - _this2.cursors[id].index);
	        if (_this2.cursors[id].userId === authorId) {
	          _this2.moveCursor(authorId, _this2.cursors[id].index + shift);
	        } else if (_this2.cursors[id].index > index) {
	          _this2.cursors[id].index += shift;
	        }
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      var _this3 = this;

	      Object.keys(this.cursors).forEach(function (id) {
	        if (_this3.cursors[id] != null) {
	          _this3._updateCursor(_this3.cursors[id]);
	        };
	      });
	    }
	  }, {
	    key: '_applyDelta',
	    value: function _applyDelta(delta) {
	      var _this4 = this;

	      var index = 0;
	      delta.ops.forEach(function (op) {
	        var length = 0;
	        if (op.insert != null) {
	          length = op.insert.length || 1;
	          var author = op.attributes != null ? op.attributes.author : null;
	          _this4.shiftCursors(index, length, author);
	        } else if (op['delete'] != null) {
	          _this4.shiftCursors(index, -1 * op['delete']);
	        } else if (op.retain != null) {
	          _this4.shiftCursors(index, 0);
	          length = op.retain;
	        }
	        index += length;
	      });
	      this.update();
	    }
	  }, {
	    key: '_buildCursor',
	    value: function _buildCursor(name, color) {
	      var cursor = document.createElement('span');
	      cursor.classList.add('cursor');
	      cursor.innerHTML = this.options.template;
	      var cursorFlag = cursor.querySelector('.cursor-flag');
	      var cursorName = cursor.querySelector('.cursor-name');
	      cursorName.textContent = name;
	      var cursorCaret = cursor.querySelector('.cursor-caret');
	      cursorCaret.style.backgroundColor = cursorName.style.backgroundColor = color;
	      this.container.appendChild(cursor);
	      return cursor;
	    }
	  }, {
	    key: '_updateCursor',
	    value: function _updateCursor(cursor) {
	      var bounds = this.quill.getBounds(cursor.index);
	      if (bounds == null) {
	        return this.removeCursor(cursor.userId);
	      }
	      cursor.elem.style.top = bounds.top + this.quill.container.scrollTop + 'px';
	      cursor.elem.style.left = bounds.left + 'px';
	      cursor.elem.style.height = bounds.height + 'px';
	      var flag = cursor.elem.querySelector('.cursor-flag');
	      var isTop = parseInt(cursor.elem.style.top) <= flag.offsetHeight;
	      var isLeft = parseInt(cursor.elem.style.top) <= flag.offsetHeight;
	      var isRight = this.quill.root.offsetWidth - parseInt(cursor.elem.style.left) <= flag.offsetWidth;
	      if (cursor.elem.classList.contains('top') !== isTop) {
	        cursor.elem.classList.toggle('top');
	      }
	      if (cursor.elem.classList.contains('left') !== isLeft) {
	        cursor.elem.classList.toggle('left');
	      }
	      if (cursor.elem.classList.contains('right') !== isRight) {
	        cursor.elem.classList.toggle('right');
	      }
	      this.emit(MultiCursor.events.CURSOR_MOVED, cursor);
	    }
	  }]);

	  return MultiCursor;
	})(_eventemitter32['default']);

	MultiCursor.DEFAULTS = {
	  template: '\n    <span class="cursor-flag">\n      <span class="cursor-name"></span>\n    </span>\n    <span class="cursor-caret"></span>',
	  timeout: 2500
	};
	MultiCursor.events = {
	  CURSOR_ADDED: 'cursor-addded',
	  CURSOR_MOVED: 'cursor-moved',
	  CURSOR_REMOVED: 'cursor-removed'
	};

	_quill2['default'].registerModule('multi-cursor', MultiCursor);

	exports['default'] = MultiCursor;
	module.exports = exports['default'];

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _quill = __webpack_require__(2);

	var _quill2 = _interopRequireDefault(_quill);

	var _extend = __webpack_require__(14);

	var _extend2 = _interopRequireDefault(_extend);

	var Delta = _quill2['default'].require('delta');
	var Parchment = _quill2['default'].require('parchment');

	var PasteManager = (function () {
	  function PasteManager(quill, options) {
	    _classCallCheck(this, PasteManager);

	    this.quill = quill;
	    this.options = (0, _extend2['default'])({}, PasteManager.DEFAULTS, options);
	    this.container = this.quill.addContainer('ql-paste-manager');
	    this.container.setAttribute('contenteditable', true);
	    this.container.setAttribute('tabindex', '-1');
	    this.onPaste = this.onPaste.bind(this);
	    this.quill.root.addEventListener('paste', this.onPaste);
	  }

	  _createClass(PasteManager, [{
	    key: 'onPaste',
	    value: function onPaste() {
	      var _this = this;

	      var range = this.quill.getSelection();
	      if (range == null) return;
	      var oldDocLength = this.quill.getLength();
	      this.container.focus();
	      setTimeout(function () {
	        var pasteDelta = _this.options.sanitize(_this.container);
	        var lengthAdded = pasteDelta.length();
	        if (lengthAdded > 0) {
	          var delta = new Delta();
	          if (range.start > 0) {
	            delta.retain(range.start);
	          }
	          delta['delete'](range.end - range.start);
	          delta = delta.concat(pasteDelta);
	          _this.quill.updateContents(delta, _quill2['default'].sources.USER);
	        }
	        _this.quill.setSelection(range.start + lengthAdded, range.start + lengthAdded, _quill2['default'].sources.SILENT);
	        _this.quill.scrollIntoView();
	        _this.container.innerHTML = "";
	      }, 0);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.quill.root.removeEventListener('paste', this.onPaste);
	      this.quill = null;
	      this.container = null;
	    }
	  }]);

	  return PasteManager;
	})();

	PasteManager.DEFAULTS = {
	  sanitize: sanitize
	};

	function sanitize(container) {
	  // TODO this needs to be Editor for getDelta to work
	  var doc = new Parchment.Container(container);
	  var delta = doc.getDelta();
	  var lengthAdded = delta.length();
	  if (lengthAdded === 0) return delta;
	  // Need to remove trailing newline so paste is inline,
	  // losing format is expected and observed in Word
	  return delta.compose(new Delta().retain(lengthAdded - 1)['delete'](1));
	};

	_quill2['default'].registerModule('paste-manager', PasteManager);

	exports['default'] = PasteManager;
	module.exports = exports['default'];

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _quill = __webpack_require__(2);

	var _quill2 = _interopRequireDefault(_quill);

	var _extend = __webpack_require__(14);

	var _extend2 = _interopRequireDefault(_extend);

	var _libPlatform = __webpack_require__(13);

	var platform = _interopRequireWildcard(_libPlatform);

	var Toolbar = (function () {
	  function Toolbar(quill) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, Toolbar);

	    this.quill = quill;
	    this.options = (0, _extend2['default'])({}, Toolbar.DEFAULTS, options);
	    if (typeof this.options.container === 'string') {
	      this.options.container = document.querySelector(this.options.container);
	    }
	    if (this.options.container == null) {
	      throw new Error('container required for toolbar', this.options);
	    }
	    this.container = this.options.container;
	    this.container.classList.add('ql-toolbar');
	    if (platform.isIOS()) {
	      this.container.classList.add('ios');
	    }
	    this.initFormats();
	  }

	  _createClass(Toolbar, [{
	    key: 'initFormats',
	    value: function initFormats() {
	      var _this = this;

	      this.quill.options.formats.forEach(function (format) {
	        var input = _this.container.querySelector('.ql-' + format);
	        if (input == null) return;
	        var eventName = input.tagName === 'SELECT' ? 'change' : 'click';
	        input.addEventListener(eventName, function () {
	          var value = undefined;
	          if (input.tagName === 'SELECT') {
	            value = input.selectedIndex > -1 ? input.options[input.selectedIndex].value : '';
	          } else {
	            value = !input.classList.contains('ql-active');
	          }
	          var range = _this.quill.getSelection(true);
	          if (range != null) {
	            if (range.isCollapsed()) {
	              _this.quill.prepareFormat(format, value);
	            } else {
	              _this.quill.formatText(range, format, value, _quill2['default'].sources.USER);
	              _this.quill.setSelection(range);
	              if (platform.isIE(10)) {
	                _this.quill.selection.scrollIntoView();
	              }
	            }
	            if (eventName === 'click') {
	              input.classList.toggle('ql-active');
	            }
	          }
	          return false;
	        });
	      });
	    }
	  }]);

	  return Toolbar;
	})();

	Toolbar.DEFAULTS = {
	  container: null
	};

	_quill2['default'].registerModule('toolbar', Toolbar);

	exports['default'] = Toolbar;
	module.exports = exports['default'];

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _quill = __webpack_require__(2);

	var _quill2 = _interopRequireDefault(_quill);

	var _extend = __webpack_require__(14);

	var _extend2 = _interopRequireDefault(_extend);

	var Delta = _quill2['default'].require('delta');

	var UndoManager = (function () {
	  function UndoManager(quill, options) {
	    var _this = this;

	    _classCallCheck(this, UndoManager);

	    this.quill = quill;
	    if (options == null) {
	      options = {};
	    }
	    this.options = (0, _extend2['default'])({}, UndoManager.DEFAULTS, options);
	    this.lastRecorded = 0;
	    this.ignoreChange = false;
	    this.clear();
	    this.quill.on(_quill2['default'].events.TEXT_CHANGE, function (delta, source) {
	      if (_this.ignoreChange) return;
	      if (!_this.options.userOnly || source === _quill2['default'].sources.USER) {
	        _this.record(delta, _this.oldDelta);
	      } else {
	        _this.transform(delta);
	      }
	      _this.oldDelta = _this.quill.getContents();
	    });
	  }

	  _createClass(UndoManager, [{
	    key: 'change',
	    value: function change(source, dest) {
	      if (this.stack[source].length === 0) return;
	      var change = this.stack[source].pop();
	      this.lastRecorded = 0;
	      this.ignoreChange = true;
	      this.quill.updateContents(change[source], _quill2['default'].sources.USER);
	      this.ignoreChange = false;
	      var index = getLastChangeIndex(change[source]);
	      this.quill.setSelection(index, index);
	      this.oldDelta = this.quill.getContents();
	      this.stack[dest].push(change);
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.stack = { undo: [], redo: [] };
	      this.oldDelta = this.quill.getContents();
	    }
	  }, {
	    key: 'record',
	    value: function record(changeDelta, oldDelta) {
	      if (changeDelta.ops.length === 0) return;
	      this.stack.redo = [];
	      var undoDelta = this.quill.getContents().diff(this.oldDelta);
	      var timestamp = Date.now();
	      if (this.lastRecorded + this.options.delay > timestamp && this.stack.undo.length > 0) {
	        var change = this.stack.undo.pop();
	        undoDelta = undoDelta.compose(change.undo);
	        changeDelta = change.redo.compose(changeDelta);
	      } else {
	        this.lastRecorded = timestamp;
	      }
	      this.stack.undo.push({
	        redo: changeDelta,
	        undo: undoDelta
	      });
	      if (this.stack.undo.length > this.options.maxStack) {
	        this.stack.undo.unshift();
	      }
	    }
	  }, {
	    key: 'redo',
	    value: function redo() {
	      this.change('redo', 'undo');
	    }
	  }, {
	    key: 'transform',
	    value: function transform(delta) {
	      this.oldDelta = delta.transform(this.oldDelta, true);
	      this.stack.undo.forEach(function (change) {
	        change.undo = delta.transform(change.undo, true);
	        change.redo = delta.transform(change.redo, true);
	      });
	      this.stack.redo.forEach(function (change) {
	        change.undo = delta.transform(change.undo, true);
	        change.redo = delta.transform(change.redo, true);
	      });
	    }
	  }, {
	    key: 'undo',
	    value: function undo() {
	      this.change('undo', 'redo');
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.quill.removeAllListeners(_quill2['default'].events.TEXT_CHANGE);
	      this.quill = null;
	      this.stack = null;
	    }
	  }]);

	  return UndoManager;
	})();

	UndoManager.DEFAULTS = {
	  delay: 1000,
	  maxStack: 100,
	  userOnly: false
	};

	function getLastChangeIndex(delta) {
	  var index = 0,
	      lastIndex = 0;
	  delta.ops.forEach(function (op) {
	    if (op.insert != null) {
	      lastIndex = Math.max(index + (op.insert.length || 1), lastIndex);
	    } else if (op["delete"] != null) {
	      lastIndex = Math.max(index, lastIndex);
	    } else if (op.retain != null) {
	      if (op.attributes != null) {
	        lastIndex = Math.max(index + op.retain, lastIndex);
	      }
	      index += op.retain;
	    }
	  });
	  return lastIndex;
	};

	_quill2['default'].registerModule('undo-manager', UndoManager);

	exports['default'] = UndoManager;
	module.exports = exports['default'];

/***/ })
/******/ ])
});
;