/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/PluginConfigurationPanel.jsx"
/*!*****************************************************!*\
  !*** ./src/components/PluginConfigurationPanel.jsx ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"webpack/sharing/consume/default/react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }\nfunction _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }\nfunction _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nfunction _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(r) { if (Array.isArray(r)) return r; }\n\nvar PluginConfigurationPanel = function PluginConfigurationPanel(_ref) {\n  var configuration = _ref.configuration,\n    save = _ref.save;\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(configuration || {}),\n    _useState2 = _slicedToArray(_useState, 2),\n    config = _useState2[0],\n    setConfig = _useState2[1];\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(configuration),\n    _useState4 = _slicedToArray(_useState3, 2),\n    initialConfig = _useState4[0],\n    setInitialConfig = _useState4[1];\n  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    _useState6 = _slicedToArray(_useState5, 2),\n    loading = _useState6[0],\n    setLoading = _useState6[1];\n  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),\n    _useState8 = _slicedToArray(_useState7, 2),\n    status = _useState8[0],\n    setStatus = _useState8[1];\n  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    _useState0 = _slicedToArray(_useState9, 2),\n    showDialog = _useState0[0],\n    setShowDialog = _useState0[1];\n  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({\n      title: '',\n      message: '',\n      callback: null\n    }),\n    _useState10 = _slicedToArray(_useState1, 2),\n    dialogData = _useState10[0],\n    setDialogData = _useState10[1];\n  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),\n    _useState12 = _slicedToArray(_useState11, 2),\n    timeframeError = _useState12[0],\n    setTimeframeError = _useState12[1];\n  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(config.language === 'de' ? 'de' : 'en'),\n    _useState14 = _slicedToArray(_useState13, 2),\n    currentLang = _useState14[0],\n    setCurrentLang = _useState14[1];\n  var translations = {\n    de: {\n      title: 'VCAN Log Player Konfiguration',\n      general: 'Allgemein',\n      inputSettings: 'Eingabe-Einstellungen',\n      processingOptions: 'Verarbeitungsoptionen',\n      timeframeSettings: 'Zeitrahmen-Einstellungen',\n      inputDirectory: 'Eingabe-Verzeichnis:',\n      inputDirectoryHelp: 'Verzeichnis, in dem sich die input.log-Datei befindet',\n      createLogfile: 'Log-Datei erstellen',\n      createLogfileHelp: 'Erstellt vcan-logplayer.log mit Verarbeitungsstatistiken im Verzeichnis der Input-Log-Datei',\n      realtime: 'Originale Zeitsteuerung beibehalten',\n      realtimeHelp: 'Daten werden gemäß Zeitstempel aus Log-Datei verarbeitet (mit Wartezeiten)',\n      originalTimestamp: 'Originale Zeitstempel verwenden',\n      originalTimestampHelp: 'Zeitstempel aus Log-Datei verwenden statt aktuelle Zeit',\n      timeframe: 'Spezifischer Zeitrahmen',\n      timeframeHelp: 'Log-Datei nur für einen bestimmten Zeitraum verarbeiten',\n      timeframeStart: 'Zeitrahmen-Start:',\n      timeframeStartHelp: 'Startzeit für die Verarbeitung',\n      timeframeEnd: 'Zeitrahmen-Ende:',\n      timeframeEndHelp: 'Endzeit für die Verarbeitung',\n      timeframeError: 'Endzeit muss größer oder gleich der Startzeit sein',\n      save: 'Speichern',\n      cancel: 'Abbruch',\n      unsavedWarning: 'Es gibt ungespeicherte Änderungen. Wirklich abbrechen?',\n      unsavedTitle: 'Ungespeicherte Änderungen',\n      yes: 'Ja',\n      no: 'Nein'\n    },\n    en: {\n      title: 'VCAN Log Player Configuration',\n      general: 'General',\n      inputSettings: 'Input Settings',\n      processingOptions: 'Processing Options',\n      timeframeSettings: 'Timeframe Settings',\n      inputDirectory: 'Input Directory:',\n      inputDirectoryHelp: 'Directory containing the input.log file',\n      createLogfile: 'Create log file',\n      createLogfileHelp: 'Creates vcan-logplayer.log with processing statistics in the input log file directory',\n      realtime: 'Keep original timing',\n      realtimeHelp: 'Data is processed according to timestamp in log file (with waits)',\n      originalTimestamp: 'Use original timestamps',\n      originalTimestampHelp: 'Use timestamps from log file instead of current time',\n      timeframe: 'Specific timeframe',\n      timeframeHelp: 'Process log file only for a specific time period',\n      timeframeStart: 'Timeframe start:',\n      timeframeStartHelp: 'Start time for processing',\n      timeframeEnd: 'Timeframe end:',\n      timeframeEndHelp: 'End time for processing',\n      timeframeError: 'End time must be greater than or equal to start time',\n      save: 'Save',\n      cancel: 'Cancel',\n      unsavedWarning: 'There are unsaved changes. Really cancel?',\n      unsavedTitle: 'Unsaved changes',\n      yes: 'Yes',\n      no: 'No'\n    }\n  };\n  var t = translations[currentLang];\n  var handleConfigChange = function handleConfigChange(key, value) {\n    setConfig(function (prev) {\n      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, key, value));\n    });\n\n    // Überprüfe Zeitrahmen, wenn Start oder Ende geändert wird\n    if (key === 'timeframestart' || key === 'timeframeend') {\n      var start = key === 'timeframestart' ? value : config.timeframestart || '00:00:00';\n      var end = key === 'timeframeend' ? value : config.timeframeend || '23:59:59';\n      if (start && end && start > end) {\n        setTimeframeError(t.timeframeError);\n      } else {\n        setTimeframeError('');\n      }\n    }\n  };\n  var checkUnsavedChanges = function checkUnsavedChanges() {\n    return JSON.stringify(config) !== JSON.stringify(initialConfig);\n  };\n  var handleSave = function handleSave() {\n    setLoading(true);\n    if (save) {\n      try {\n        var result = save(config);\n        if (result && typeof result.then === 'function') {\n          result.then(function () {\n            setStatus('success');\n            setInitialConfig(config);\n            setTimeout(function () {\n              return setStatus('');\n            }, 3000);\n          })[\"catch\"](function (err) {\n            setStatus('error');\n            setTimeout(function () {\n              return setStatus('');\n            }, 3000);\n          })[\"finally\"](function () {\n            setLoading(false);\n          });\n        } else {\n          setStatus('success');\n          setInitialConfig(config);\n          setTimeout(function () {\n            return setStatus('');\n          }, 3000);\n          setLoading(false);\n        }\n      } catch (err) {\n        console.error('Error in handleSave:', err);\n        setStatus('error');\n        setTimeout(function () {\n          return setStatus('');\n        }, 3000);\n        setLoading(false);\n      }\n    }\n  };\n  var handleLanguageChange = function handleLanguageChange(lang) {\n    setCurrentLang(lang);\n    handleConfigChange('language', lang === 'de');\n  };\n  var handleDirectorySelect = function handleDirectorySelect() {\n    var input = document.createElement('input');\n    input.type = 'file';\n    input.webkitdirectory = true;\n    input.directory = true;\n    input.multiple = true;\n    input.onchange = function (e) {\n      var files = e.target.files;\n      if (files.length > 0) {\n        var firstFile = files[0];\n        var directoryPath = '';\n        if (firstFile.webkitRelativePath) {\n          var parts = firstFile.webkitRelativePath.split('/');\n          directoryPath = parts.slice(0, -1).join('/') || parts[0];\n        } else if (firstFile.path) {\n          var _parts = firstFile.path.split(/[/\\\\]/);\n          directoryPath = _parts.slice(0, -1).join('/');\n        }\n        if (directoryPath) {\n          handleConfigChange('inputDirectory', directoryPath);\n        }\n      }\n    };\n    input.click();\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.container\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.header\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h2\", {\n    style: styles.title\n  }, \"VCAN Log Player\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    onClick: function onClick() {\n      return window.open('https://github.com/formifan2002/signalk-vcan-logplayer', '_blank');\n    },\n    style: styles.helpButton\n  }, \"\\u2139\\uFE0F \", currentLang === 'de' ? 'Hilfe' : 'Help')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.languageSelector\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    onClick: function onClick() {\n      return handleLanguageChange('de');\n    },\n    style: _objectSpread(_objectSpread({}, styles.langButton), currentLang === 'de' ? styles.langButtonActive : {})\n  }, \"Deutsch\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    onClick: function onClick() {\n      return handleLanguageChange('en');\n    },\n    style: _objectSpread(_objectSpread({}, styles.langButton), currentLang === 'en' ? styles.langButtonActive : {})\n  }, \"English\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.section\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h3\", {\n    style: styles.sectionTitle\n  }, t.inputSettings), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.formGroup\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", {\n    style: styles.label\n  }, t.inputDirectory), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.inputWithButton\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    type: \"text\",\n    value: config.inputDirectory || '/home/pi/vcan-logplayer',\n    onChange: function onChange(e) {\n      return handleConfigChange('inputDirectory', e.target.value);\n    },\n    style: styles.inputPath\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    type: \"button\",\n    onClick: handleDirectorySelect,\n    style: styles.fileButton\n  }, \"\\uD83D\\uDCC1\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"small\", {\n    style: styles.help\n  }, t.inputDirectoryHelp))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.section\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h3\", {\n    style: styles.sectionTitle\n  }, t.processingOptions), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.formGroup\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", {\n    style: styles.checkbox\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    type: \"checkbox\",\n    checked: config.createLogfile || false,\n    onChange: function onChange(e) {\n      return handleConfigChange('createLogfile', e.target.checked);\n    }\n  }), t.createLogfile), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"small\", {\n    style: styles.help\n  }, t.createLogfileHelp)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.formGroup\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", {\n    style: styles.checkbox\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    type: \"checkbox\",\n    checked: config.realtime !== false,\n    onChange: function onChange(e) {\n      return handleConfigChange('realtime', e.target.checked);\n    }\n  }), t.realtime), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"small\", {\n    style: styles.help\n  }, t.realtimeHelp)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.formGroup\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", {\n    style: styles.checkbox\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    type: \"checkbox\",\n    checked: config.originaltimestamp !== false,\n    onChange: function onChange(e) {\n      return handleConfigChange('originaltimestamp', e.target.checked);\n    }\n  }), t.originalTimestamp), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"small\", {\n    style: styles.help\n  }, t.originalTimestampHelp))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.section\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h3\", {\n    style: styles.sectionTitle\n  }, t.timeframeSettings), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.formGroup\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", {\n    style: styles.checkbox\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    type: \"checkbox\",\n    checked: config.timeframe || false,\n    onChange: function onChange(e) {\n      return handleConfigChange('timeframe', e.target.checked);\n    }\n  }), t.timeframe), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"small\", {\n    style: styles.help\n  }, t.timeframeHelp)), config.timeframe && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.formGroup\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", {\n    style: styles.label\n  }, t.timeframeStart), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.timeInputWrapper\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", {\n    style: styles.clockIcon\n  }, \"\\uD83D\\uDD50\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    type: \"time\",\n    step: \"1\",\n    value: config.timeframestart || '00:00:00',\n    onChange: function onChange(e) {\n      return handleConfigChange('timeframestart', e.target.value);\n    },\n    style: styles.timeInput\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"small\", {\n    style: styles.help\n  }, t.timeframeStartHelp)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.formGroup\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", {\n    style: styles.label\n  }, t.timeframeEnd), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: _objectSpread(_objectSpread({}, styles.timeInputWrapper), timeframeError ? styles.timeInputError : {})\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", {\n    style: styles.clockIcon\n  }, \"\\uD83D\\uDD50\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    type: \"time\",\n    step: \"1\",\n    value: config.timeframeend || '23:59:59',\n    onChange: function onChange(e) {\n      return handleConfigChange('timeframeend', e.target.value);\n    },\n    style: styles.timeInput\n  })), timeframeError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"small\", {\n    style: styles.errorText\n  }, timeframeError), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"small\", {\n    style: styles.help\n  }, t.timeframeEndHelp)))), status && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: _objectSpread(_objectSpread({}, styles.statusMessage), status === 'error' ? styles.error : styles.success)\n  }, status === 'success' ? currentLang === 'de' ? 'Konfiguration gespeichert' : 'Configuration saved' : currentLang === 'de' ? 'Fehler beim Speichern' : 'Error saving'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.buttonGroup\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    onClick: handleSave,\n    disabled: loading,\n    style: _objectSpread(_objectSpread({}, styles.button), styles.primaryButton)\n  }, t.save), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    onClick: function onClick() {\n      if (checkUnsavedChanges()) {\n        setDialogData({\n          title: t.unsavedTitle,\n          message: t.unsavedWarning,\n          callback: function callback() {\n            return setConfig(initialConfig);\n          }\n        });\n        setShowDialog(true);\n      } else {\n        setConfig(initialConfig);\n      }\n    },\n    style: _objectSpread(_objectSpread({}, styles.button), styles.secondaryButton)\n  }, t.cancel)), showDialog && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.dialog\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.dialogContent\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h4\", {\n    style: styles.dialogTitle\n  }, dialogData.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, dialogData.message), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: styles.dialogButtons\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    onClick: function onClick() {\n      return setShowDialog(false);\n    },\n    style: _objectSpread(_objectSpread({}, styles.button), styles.secondaryButton)\n  }, t.no), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    onClick: function onClick() {\n      if (dialogData.callback) dialogData.callback();\n      setShowDialog(false);\n    },\n    style: _objectSpread(_objectSpread({}, styles.button), styles.primaryButton)\n  }, t.yes)))));\n};\nvar styles = {\n  container: {\n    padding: '20px',\n    fontFamily: '-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto'\n  },\n  header: {\n    display: 'flex',\n    justifyContent: 'space-between',\n    alignItems: 'center',\n    marginBottom: '30px',\n    paddingBottom: '20px',\n    borderBottom: '2px solid #667eea'\n  },\n  title: {\n    margin: 0,\n    fontSize: '1.5em',\n    fontWeight: '600',\n    color: '#333'\n  },\n  languageSelector: {\n    display: 'flex',\n    gap: '10px',\n    marginBottom: '30px'\n  },\n  langButton: {\n    padding: '8px 16px',\n    border: '1px solid #ddd',\n    borderRadius: '4px',\n    cursor: 'pointer',\n    fontWeight: '500',\n    backgroundColor: '#f5f5f5'\n  },\n  langButtonActive: {\n    backgroundColor: '#667eea',\n    color: 'white',\n    borderColor: '#667eea'\n  },\n  section: {\n    marginBottom: '30px'\n  },\n  sectionTitle: {\n    fontSize: '1.2em',\n    fontWeight: '600',\n    marginBottom: '15px',\n    color: '#333',\n    borderBottom: '2px solid #667eea',\n    paddingBottom: '10px'\n  },\n  formGroup: {\n    marginBottom: '15px'\n  },\n  label: {\n    display: 'block',\n    fontWeight: '500',\n    marginBottom: '5px',\n    color: '#333'\n  },\n  inputPath: {\n    padding: '8px',\n    border: '1px solid #ddd',\n    borderRadius: '4px',\n    fontSize: '1em',\n    width: '400px'\n  },\n  inputWithButton: {\n    display: 'flex',\n    gap: '5px'\n  },\n  fileButton: {\n    padding: '8px 12px',\n    backgroundColor: '#667eea',\n    color: 'white',\n    border: 'none',\n    borderRadius: '4px',\n    cursor: 'pointer'\n  },\n  timeInputWrapper: {\n    display: 'flex',\n    alignItems: 'center',\n    gap: '8px',\n    padding: '8px 12px',\n    border: '1px solid #ddd',\n    borderRadius: '4px',\n    backgroundColor: '#fff',\n    width: 'fit-content'\n  },\n  timeInputError: {\n    borderColor: '#dc3545',\n    backgroundColor: '#fff5f5'\n  },\n  clockIcon: {\n    color: '#667eea',\n    fontSize: '18px',\n    flexShrink: 0\n  },\n  timeInput: {\n    border: 'none',\n    outline: 'none',\n    fontSize: '1em',\n    fontFamily: 'monospace',\n    padding: '0',\n    width: '110px'\n  },\n  checkbox: {\n    display: 'flex',\n    alignItems: 'center',\n    marginBottom: '8px',\n    cursor: 'pointer',\n    gap: '8px'\n  },\n  help: {\n    display: 'block',\n    fontSize: '0.85em',\n    color: '#666',\n    marginTop: '5px',\n    fontStyle: 'italic'\n  },\n  errorText: {\n    display: 'block',\n    fontSize: '0.85em',\n    color: '#dc3545',\n    marginTop: '5px',\n    fontWeight: '500'\n  },\n  buttonGroup: {\n    display: 'flex',\n    gap: '10px',\n    marginTop: '30px',\n    paddingTop: '20px',\n    borderTop: '1px solid #ddd'\n  },\n  button: {\n    padding: '10px 20px',\n    border: 'none',\n    borderRadius: '4px',\n    cursor: 'pointer',\n    fontWeight: '500',\n    fontSize: '1em'\n  },\n  primaryButton: {\n    backgroundColor: '#667eea',\n    color: 'white'\n  },\n  secondaryButton: {\n    backgroundColor: '#6c757d',\n    color: 'white'\n  },\n  statusMessage: {\n    padding: '12px',\n    borderRadius: '4px',\n    marginBottom: '15px',\n    fontSize: '0.95em'\n  },\n  success: {\n    backgroundColor: '#d4edda',\n    color: '#155724'\n  },\n  error: {\n    backgroundColor: '#f8d7da',\n    color: '#721c24'\n  },\n  dialog: {\n    position: 'fixed',\n    top: 0,\n    left: 0,\n    right: 0,\n    bottom: 0,\n    backgroundColor: 'rgba(0,0,0,0.5)',\n    display: 'flex',\n    alignItems: 'center',\n    justifyContent: 'center',\n    zIndex: 1000\n  },\n  dialogContent: {\n    backgroundColor: 'white',\n    padding: '30px',\n    borderRadius: '8px',\n    maxWidth: '400px',\n    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'\n  },\n  dialogTitle: {\n    marginTop: 0,\n    marginBottom: '15px',\n    fontSize: '1.1em'\n  },\n  dialogButtons: {\n    display: 'flex',\n    gap: '10px',\n    justifyContent: 'flex-end',\n    marginTop: '20px'\n  },\n  helpButton: {\n    padding: '8px 16px',\n    backgroundColor: '#667eea',\n    color: 'white',\n    border: 'none',\n    borderRadius: '6px',\n    cursor: 'pointer',\n    fontWeight: '500',\n    fontSize: '0.95em',\n    transition: 'background 0.3s'\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PluginConfigurationPanel);\n\n//# sourceURL=webpack://signalk-vcan-logplayer/./src/components/PluginConfigurationPanel.jsx?\n}");

/***/ },

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_PluginConfigurationPanel_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/PluginConfigurationPanel.jsx */ \"./src/components/PluginConfigurationPanel.jsx\");\n\n\n//# sourceURL=webpack://signalk-vcan-logplayer/./src/index.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/sharing */
/******/ 	(() => {
/******/ 		__webpack_require__.S = {};
/******/ 		var initPromises = {};
/******/ 		var initTokens = {};
/******/ 		__webpack_require__.I = (name, initScope) => {
/******/ 			if(!initScope) initScope = [];
/******/ 			// handling circular init calls
/******/ 			var initToken = initTokens[name];
/******/ 			if(!initToken) initToken = initTokens[name] = {};
/******/ 			if(initScope.indexOf(initToken) >= 0) return;
/******/ 			initScope.push(initToken);
/******/ 			// only runs once
/******/ 			if(initPromises[name]) return initPromises[name];
/******/ 			// creates a new share scope if needed
/******/ 			if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 			// runs all init snippets from all modules reachable
/******/ 			var scope = __webpack_require__.S[name];
/******/ 			var warn = (msg) => {
/******/ 				if (typeof console !== "undefined" && console.warn) console.warn(msg);
/******/ 			};
/******/ 			var uniqueName = "signalk-vcan-logplayer";
/******/ 			var register = (name, version, factory, eager) => {
/******/ 				var versions = scope[name] = scope[name] || {};
/******/ 				var activeVersion = versions[version];
/******/ 				if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 			};
/******/ 			var initExternal = (id) => {
/******/ 				var handleError = (err) => (warn("Initialization of sharing external failed: " + err));
/******/ 				try {
/******/ 					var module = __webpack_require__(id);
/******/ 					if(!module) return;
/******/ 					var initFn = (module) => (module && module.init && module.init(__webpack_require__.S[name], initScope))
/******/ 					if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 					var initResult = initFn(module);
/******/ 					if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 				} catch(err) { handleError(err); }
/******/ 			}
/******/ 			var promises = [];
/******/ 			switch(name) {
/******/ 			}
/******/ 			if(!promises.length) return initPromises[name] = 1;
/******/ 			return initPromises[name] = Promise.all(promises).then(() => (initPromises[name] = 1));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/consumes */
/******/ 	(() => {
/******/ 		var parseVersion = (str) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			var p=p=>{return p.split(".").map(p=>{return+p==p?+p:p})},n=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(str),r=n[1]?p(n[1]):[];return n[2]&&(r.length++,r.push.apply(r,p(n[2]))),n[3]&&(r.push([]),r.push.apply(r,p(n[3]))),r;
/******/ 		}
/******/ 		var versionLt = (a, b) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			a=parseVersion(a),b=parseVersion(b);for(var r=0;;){if(r>=a.length)return r<b.length&&"u"!=(typeof b[r])[0];var e=a[r],n=(typeof e)[0];if(r>=b.length)return"u"==n;var t=b[r],f=(typeof t)[0];if(n!=f)return"o"==n&&"n"==f||("s"==f||"u"==n);if("o"!=n&&"u"!=n&&e!=t)return e<t;r++}
/******/ 		}
/******/ 		var rangeToString = (range) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			var r=range[0],n="";if(1===range.length)return"*";if(r+.5){n+=0==r?">=":-1==r?"<":1==r?"^":2==r?"~":r>0?"=":"!=";for(var e=1,a=1;a<range.length;a++){e--,n+="u"==(typeof(t=range[a]))[0]?"-":(e>0?".":"")+(e=2,t)}return n}var g=[];for(a=1;a<range.length;a++){var t=range[a];g.push(0===t?"not("+o()+")":1===t?"("+o()+" || "+o()+")":2===t?g.pop()+" "+g.pop():rangeToString(t))}return o();function o(){return g.pop().replace(/^\((.+)\)$/,"$1")}
/******/ 		}
/******/ 		var satisfy = (range, version) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			if(0 in range){version=parseVersion(version);var e=range[0],r=e<0;r&&(e=-e-1);for(var n=0,i=1,a=!0;;i++,n++){var f,s,g=i<range.length?(typeof range[i])[0]:"";if(n>=version.length||"o"==(s=(typeof(f=version[n]))[0]))return!a||("u"==g?i>e&&!r:""==g!=r);if("u"==s){if(!a||"u"!=g)return!1}else if(a)if(g==s)if(i<=e){if(f!=range[i])return!1}else{if(r?f>range[i]:f<range[i])return!1;f!=range[i]&&(a=!1)}else if("s"!=g&&"n"!=g){if(r||i<=e)return!1;a=!1,i--}else{if(i<=e||s<g!=r)return!1;a=!1}else"s"!=g&&"n"!=g&&(a=!1,i--)}}var t=[],o=t.pop.bind(t);for(n=1;n<range.length;n++){var u=range[n];t.push(1==u?o()|o():2==u?o()&o():u?satisfy(u,version):!o())}return!!o();
/******/ 		}
/******/ 		var exists = (scope, key) => {
/******/ 			return scope && __webpack_require__.o(scope, key);
/******/ 		}
/******/ 		var get = (entry) => {
/******/ 			entry.loaded = 1;
/******/ 			return entry.get()
/******/ 		};
/******/ 		var eagerOnly = (versions) => {
/******/ 			return Object.keys(versions).reduce((filtered, version) => {
/******/ 					if (versions[version].eager) {
/******/ 						filtered[version] = versions[version];
/******/ 					}
/******/ 					return filtered;
/******/ 			}, {});
/******/ 		};
/******/ 		var findLatestVersion = (scope, key, eager) => {
/******/ 			var versions = eager ? eagerOnly(scope[key]) : scope[key];
/******/ 			var key = Object.keys(versions).reduce((a, b) => {
/******/ 				return !a || versionLt(a, b) ? b : a;
/******/ 			}, 0);
/******/ 			return key && versions[key];
/******/ 		};
/******/ 		var findSatisfyingVersion = (scope, key, requiredVersion, eager) => {
/******/ 			var versions = eager ? eagerOnly(scope[key]) : scope[key];
/******/ 			var key = Object.keys(versions).reduce((a, b) => {
/******/ 				if (!satisfy(requiredVersion, b)) return a;
/******/ 				return !a || versionLt(a, b) ? b : a;
/******/ 			}, 0);
/******/ 			return key && versions[key]
/******/ 		};
/******/ 		var findSingletonVersionKey = (scope, key, eager) => {
/******/ 			var versions = eager ? eagerOnly(scope[key]) : scope[key];
/******/ 			return Object.keys(versions).reduce((a, b) => {
/******/ 				return !a || (!versions[a].loaded && versionLt(a, b)) ? b : a;
/******/ 			}, 0);
/******/ 		};
/******/ 		var getInvalidSingletonVersionMessage = (scope, key, version, requiredVersion) => {
/******/ 			return "Unsatisfied version " + version + " from " + (version && scope[key][version].from) + " of shared singleton module " + key + " (required " + rangeToString(requiredVersion) + ")"
/******/ 		};
/******/ 		var getInvalidVersionMessage = (scope, scopeName, key, requiredVersion, eager) => {
/******/ 			var versions = scope[key];
/******/ 			return "No satisfying version (" + rangeToString(requiredVersion) + ")" + (eager ? " for eager consumption" : "") + " of shared module " + key + " found in shared scope " + scopeName + ".\n" +
/******/ 				"Available versions: " + Object.keys(versions).map((key) => {
/******/ 				return key + " from " + versions[key].from;
/******/ 			}).join(", ");
/******/ 		};
/******/ 		var fail = (msg) => {
/******/ 			throw new Error(msg);
/******/ 		}
/******/ 		var failAsNotExist = (scopeName, key) => {
/******/ 			return fail("Shared module " + key + " doesn't exist in shared scope " + scopeName);
/******/ 		}
/******/ 		var warn = /*#__PURE__*/ (msg) => {
/******/ 			if (typeof console !== "undefined" && console.warn) console.warn(msg);
/******/ 		};
/******/ 		var init = (fn) => (function(scopeName, key, eager, c, d) {
/******/ 			var promise = __webpack_require__.I(scopeName);
/******/ 			if (promise && promise.then && !eager) {
/******/ 				return promise.then(fn.bind(fn, scopeName, __webpack_require__.S[scopeName], key, false, c, d));
/******/ 			}
/******/ 			return fn(scopeName, __webpack_require__.S[scopeName], key, eager, c, d);
/******/ 		});
/******/ 		
/******/ 		var useFallback = (scopeName, key, fallback) => {
/******/ 			return fallback ? fallback() : failAsNotExist(scopeName, key);
/******/ 		}
/******/ 		var load = /*#__PURE__*/ init((scopeName, scope, key, eager, fallback) => {
/******/ 			if (!exists(scope, key)) return useFallback(scopeName, key, fallback);
/******/ 			return get(findLatestVersion(scope, key, eager));
/******/ 		});
/******/ 		var loadVersion = /*#__PURE__*/ init((scopeName, scope, key, eager, requiredVersion, fallback) => {
/******/ 			if (!exists(scope, key)) return useFallback(scopeName, key, fallback);
/******/ 			var satisfyingVersion = findSatisfyingVersion(scope, key, requiredVersion, eager);
/******/ 			if (satisfyingVersion) return get(satisfyingVersion);
/******/ 			warn(getInvalidVersionMessage(scope, scopeName, key, requiredVersion, eager))
/******/ 			return get(findLatestVersion(scope, key, eager));
/******/ 		});
/******/ 		var loadStrictVersion = /*#__PURE__*/ init((scopeName, scope, key, eager, requiredVersion, fallback) => {
/******/ 			if (!exists(scope, key)) return useFallback(scopeName, key, fallback);
/******/ 			var satisfyingVersion = findSatisfyingVersion(scope, key, requiredVersion, eager);
/******/ 			if (satisfyingVersion) return get(satisfyingVersion);
/******/ 			if (fallback) return fallback();
/******/ 			fail(getInvalidVersionMessage(scope, scopeName, key, requiredVersion, eager));
/******/ 		});
/******/ 		var loadSingleton = /*#__PURE__*/ init((scopeName, scope, key, eager, fallback) => {
/******/ 			if (!exists(scope, key)) return useFallback(scopeName, key, fallback);
/******/ 			var version = findSingletonVersionKey(scope, key, eager);
/******/ 			return get(scope[key][version]);
/******/ 		});
/******/ 		var loadSingletonVersion = /*#__PURE__*/ init((scopeName, scope, key, eager, requiredVersion, fallback) => {
/******/ 			if (!exists(scope, key)) return useFallback(scopeName, key, fallback);
/******/ 			var version = findSingletonVersionKey(scope, key, eager);
/******/ 			if (!satisfy(requiredVersion, version)) {
/******/ 				warn(getInvalidSingletonVersionMessage(scope, key, version, requiredVersion));
/******/ 			}
/******/ 			return get(scope[key][version]);
/******/ 		});
/******/ 		var loadStrictSingletonVersion = /*#__PURE__*/ init((scopeName, scope, key, eager, requiredVersion, fallback) => {
/******/ 			if (!exists(scope, key)) return useFallback(scopeName, key, fallback);
/******/ 			var version = findSingletonVersionKey(scope, key, eager);
/******/ 			if (!satisfy(requiredVersion, version)) {
/******/ 				fail(getInvalidSingletonVersionMessage(scope, key, version, requiredVersion));
/******/ 			}
/******/ 			return get(scope[key][version]);
/******/ 		});
/******/ 		var installedModules = {};
/******/ 		var moduleToHandlerMapping = {
/******/ 			"webpack/sharing/consume/default/react": () => (loadSingleton("default", "react", false))
/******/ 		};
/******/ 		var initialConsumes = ["webpack/sharing/consume/default/react"];
/******/ 		initialConsumes.forEach((id) => {
/******/ 			__webpack_require__.m[id] = (module) => {
/******/ 				// Handle case when module is used sync
/******/ 				installedModules[id] = 0;
/******/ 				delete __webpack_require__.c[id];
/******/ 				var factory = moduleToHandlerMapping[id]();
/******/ 				if(typeof factory !== "function") throw new Error("Shared module is not available for eager consumption: " + id);
/******/ 				module.exports = factory();
/******/ 			}
/******/ 		});
/******/ 		// no chunk loading of consumes
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;