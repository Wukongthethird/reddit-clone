"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_urql__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next-urql */ \"./node_modules/next-urql/dist/next-urql.es.js\");\n/* harmony import */ var _utils_createUrqlClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/createUrqlClient */ \"./src/utils/createUrqlClient.ts\");\n/* harmony import */ var _generated_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../generated/graphql */ \"./src/generated/graphql.tsx\");\n/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Layout */ \"./src/components/Layout.tsx\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\nfunction _arrayLikeToArray(arr, len) {\n    if (len == null || len > arr.length) len = arr.length;\n    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];\n    return arr2;\n}\nfunction _arrayWithHoles(arr) {\n    if (Array.isArray(arr)) return arr;\n}\nfunction _iterableToArrayLimit(arr, i) {\n    var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"];\n    if (_i == null) return;\n    var _arr = [];\n    var _n = true;\n    var _d = false;\n    var _s1, _e;\n    try {\n        for(_i = _i.call(arr); !(_n = (_s1 = _i.next()).done); _n = true){\n            _arr.push(_s1.value);\n            if (i && _arr.length === i) break;\n        }\n    } catch (err) {\n        _d = true;\n        _e = err;\n    } finally{\n        try {\n            if (!_n && _i[\"return\"] != null) _i[\"return\"]();\n        } finally{\n            if (_d) throw _e;\n        }\n    }\n    return _arr;\n}\nfunction _nonIterableRest() {\n    throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\nfunction _objectWithoutProperties(source, excluded) {\n    if (source == null) return {};\n    var target = _objectWithoutPropertiesLoose(source, excluded);\n    var key, i;\n    if (Object.getOwnPropertySymbols) {\n        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);\n        for(i = 0; i < sourceSymbolKeys.length; i++){\n            key = sourceSymbolKeys[i];\n            if (excluded.indexOf(key) >= 0) continue;\n            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;\n            target[key] = source[key];\n        }\n    }\n    return target;\n}\nfunction _objectWithoutPropertiesLoose(source, excluded) {\n    if (source == null) return {};\n    var target = {};\n    var sourceKeys = Object.keys(source);\n    var key, i;\n    for(i = 0; i < sourceKeys.length; i++){\n        key = sourceKeys[i];\n        if (excluded.indexOf(key) >= 0) continue;\n        target[key] = source[key];\n    }\n    return target;\n}\nfunction _slicedToArray(arr, i) {\n    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();\n}\nfunction _unsupportedIterableToArray(o, minLen) {\n    if (!o) return;\n    if (typeof o === \"string\") return _arrayLikeToArray(o, minLen);\n    var n = Object.prototype.toString.call(o).slice(8, -1);\n    if (n === \"Object\" && o.constructor) n = o.constructor.name;\n    if (n === \"Map\" || n === \"Set\") return Array.from(n);\n    if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);\n}\nvar _this = undefined;\n\n\n\n\n\n\n\n\nvar _s = $RefreshSig$();\nvar Index = function() {\n    var _this1 = _this;\n    _s();\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)({\n        limit: 15,\n        cursor: null\n    }), variables = ref[0], setVariables = ref[1];\n    var _ref = (0,_generated_graphql__WEBPACK_IMPORTED_MODULE_2__.usePostsQuery)({\n        variables: variables\n    }), __ref = _slicedToArray(_ref, 1), ref1 = __ref[0], data = ref1.data, fetching = ref1.fetching, other = _objectWithoutProperties(_ref[0], [\n        \"data\",\n        \"fetching\"\n    ]);\n    console.log(fetching, other);\n    if (!fetching && !data) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \" something failed\"\n        }, void 0, false, {\n            fileName: \"/Users/simonzhang/Desktop/Reddit-Clone/lireddit-web/src/pages/index.tsx\",\n            lineNumber: 26,\n            columnNumber: 12\n        }, _this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Layout__WEBPACK_IMPORTED_MODULE_3__.Layout, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Flex, {\n                align: \"center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Heading, {\n                        children: \"SNOO\"\n                    }, void 0, false, {\n                        fileName: \"/Users/simonzhang/Desktop/Reddit-Clone/lireddit-web/src/pages/index.tsx\",\n                        lineNumber: 31,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {\n                        href: \"/create-post\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Link, {\n                            ml: \"auto\",\n                            children: \"createpost\"\n                        }, void 0, false, {\n                            fileName: \"/Users/simonzhang/Desktop/Reddit-Clone/lireddit-web/src/pages/index.tsx\",\n                            lineNumber: 33,\n                            columnNumber: 11\n                        }, _this)\n                    }, void 0, false, {\n                        fileName: \"/Users/simonzhang/Desktop/Reddit-Clone/lireddit-web/src/pages/index.tsx\",\n                        lineNumber: 32,\n                        columnNumber: 9\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/simonzhang/Desktop/Reddit-Clone/lireddit-web/src/pages/index.tsx\",\n                lineNumber: 30,\n                columnNumber: 7\n            }, _this),\n            !data && fetching ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: \"loading...\"\n            }, void 0, false, {\n                fileName: \"/Users/simonzhang/Desktop/Reddit-Clone/lireddit-web/src/pages/index.tsx\",\n                lineNumber: 37,\n                columnNumber: 9\n            }, _this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Stack, {\n                spacing: 8,\n                children: data.posts.posts.map(function(p) {\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Box, {\n                            p: 5,\n                            shadow: \"md\",\n                            borderwidth: \"1px\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Heading, {\n                                    fontSize: \"xl\",\n                                    children: [\n                                        \" \",\n                                        p.title\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/simonzhang/Desktop/Reddit-Clone/lireddit-web/src/pages/index.tsx\",\n                                    lineNumber: 43,\n                                    columnNumber: 17\n                                }, _this1),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Text, {\n                                    children: [\n                                        \" posted by \",\n                                        p.creator.username,\n                                        \" \"\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/simonzhang/Desktop/Reddit-Clone/lireddit-web/src/pages/index.tsx\",\n                                    lineNumber: 44,\n                                    columnNumber: 17\n                                }, _this1),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Text, {\n                                    mt: 4,\n                                    children: [\n                                        \" \",\n                                        p.textSnippet\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/simonzhang/Desktop/Reddit-Clone/lireddit-web/src/pages/index.tsx\",\n                                    lineNumber: 45,\n                                    columnNumber: 17\n                                }, _this1),\n                                p.points\n                            ]\n                        }, p.id, true, {\n                            fileName: \"/Users/simonzhang/Desktop/Reddit-Clone/lireddit-web/src/pages/index.tsx\",\n                            lineNumber: 42,\n                            columnNumber: 15\n                        }, _this1)\n                    }, p.id, false, {\n                        fileName: \"/Users/simonzhang/Desktop/Reddit-Clone/lireddit-web/src/pages/index.tsx\",\n                        lineNumber: 41,\n                        columnNumber: 13\n                    }, _this1);\n                })\n            }, void 0, false, {\n                fileName: \"/Users/simonzhang/Desktop/Reddit-Clone/lireddit-web/src/pages/index.tsx\",\n                lineNumber: 39,\n                columnNumber: 9\n            }, _this),\n            data && data.posts.hasMore ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Flex, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Button, {\n                    onClick: function() {\n                        setVariables({\n                            limit: variables.limit,\n                            cursor: data.posts.posts[data.posts.posts.length - 1].createdAt\n                        });\n                    },\n                    isLoading: fetching,\n                    m: \"auto\",\n                    my: 8,\n                    children: \"load more\"\n                }, void 0, false, {\n                    fileName: \"/Users/simonzhang/Desktop/Reddit-Clone/lireddit-web/src/pages/index.tsx\",\n                    lineNumber: 53,\n                    columnNumber: 11\n                }, _this)\n            }, void 0, false, {\n                fileName: \"/Users/simonzhang/Desktop/Reddit-Clone/lireddit-web/src/pages/index.tsx\",\n                lineNumber: 52,\n                columnNumber: 9\n            }, _this) : null\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/simonzhang/Desktop/Reddit-Clone/lireddit-web/src/pages/index.tsx\",\n        lineNumber: 29,\n        columnNumber: 5\n    }, _this);\n};\n_s(Index, \"g+Z1iLyhfv4ZGyFYQxs0MSvP8VQ=\", false, function() {\n    return [\n        _generated_graphql__WEBPACK_IMPORTED_MODULE_2__.usePostsQuery\n    ];\n});\n_c = Index;\n/* harmony default export */ __webpack_exports__[\"default\"] = ((0,next_urql__WEBPACK_IMPORTED_MODULE_7__.withUrqlClient)(_utils_createUrqlClient__WEBPACK_IMPORTED_MODULE_1__.createUrqlClient, {\n    ssr: true\n})(Index));\nvar _c;\n$RefreshReg$(_c, \"Index\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUMsU0FBUyxFQUFFMUIsUUFBUTtvQkFBRTJCLENBQUMsRUFBQyxDQUFNO29CQUFDQyxFQUFFLEVBQUUsQ0FBQzs4QkFBRSxDQUV4Qzs7Ozs7Ozs7Ozt3QkFFQSxJQUFJOzs7Ozs7O0FBR2QsQ0FBQztHQTlDS2xDLEtBQUs7O1FBRThCWCw2REFBYTs7O0tBRmhEVyxLQUFLO0FBZ0RYLCtEQUFlYix5REFBYyxDQUFDQyxxRUFBZ0IsRUFBRSxDQUFDO0lBQUMrQyxHQUFHLEVBQUUsSUFBSTtBQUFDLENBQUMsRUFBRW5DLEtBQUssQ0FBQyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9wYWdlcy9pbmRleC50c3g/MTlhMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB3aXRoVXJxbENsaWVudCB9IGZyb20gXCJuZXh0LXVycWxcIjtcbmltcG9ydCB7IE5hdkJhciB9IGZyb20gXCIuLi9jb21wb25lbnRzL05hdkJhclwiO1xuaW1wb3J0IHsgY3JlYXRlVXJxbENsaWVudCB9IGZyb20gXCIuLi91dGlscy9jcmVhdGVVcnFsQ2xpZW50XCI7XG5pbXBvcnQgeyB1c2VQb3N0c1F1ZXJ5IH0gZnJvbSBcIi4uL2dlbmVyYXRlZC9ncmFwaHFsXCI7XG5pbXBvcnQgeyBMYXlvdXQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9MYXlvdXRcIjtcbmltcG9ydCBOZXh0TGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQge1xuICBCb3gsXG4gIEJ1dHRvbixcbiAgRmxleCxcbiAgSGVhZGluZyxcbiAgTGluayxcbiAgb3RoZXJzLFxuICBTdGFjayxcbiAgVGV4dCxcbn0gZnJvbSBcIkBjaGFrcmEtdWkvcmVhY3RcIjtcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IEluZGV4ID0gKCkgPT4ge1xuICBjb25zdCBbdmFyaWFibGVzLCBzZXRWYXJpYWJsZXNdID0gdXNlU3RhdGUoe2xpbWl0OjE1LCBjdXJzb3I6bnVsbCBhcyBudWxsIHwgc3RyaW5nfSk7XG4gIGNvbnN0IFt7IGRhdGEsIGZldGNoaW5nLCAuLi5vdGhlciB9XSA9IHVzZVBvc3RzUXVlcnkoe1xuICAgIHZhcmlhYmxlcyxcbiAgfSk7XG4gIGNvbnNvbGUubG9nKGZldGNoaW5nLCBvdGhlcilcbiAgaWYgKCFmZXRjaGluZyAmJiAhZGF0YSkge1xuICAgIHJldHVybiA8ZGl2PiBzb21ldGhpbmcgZmFpbGVkPC9kaXY+O1xuICB9XG4gIHJldHVybiAoXG4gICAgPExheW91dD5cbiAgICAgIDxGbGV4IGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgIDxIZWFkaW5nPlNOT088L0hlYWRpbmc+XG4gICAgICAgIDxOZXh0TGluayBocmVmPVwiL2NyZWF0ZS1wb3N0XCI+XG4gICAgICAgICAgPExpbmsgbWw9XCJhdXRvXCI+Y3JlYXRlcG9zdDwvTGluaz5cbiAgICAgICAgPC9OZXh0TGluaz5cbiAgICAgIDwvRmxleD5cbiAgICAgIHshZGF0YSAmJiBmZXRjaGluZyA/IChcbiAgICAgICAgPGRpdj5sb2FkaW5nLi4uPC9kaXY+XG4gICAgICApIDogKFxuICAgICAgICA8U3RhY2sgc3BhY2luZz17OH0+XG4gICAgICAgICAge2RhdGEhLnBvc3RzLnBvc3RzLm1hcCgocCkgPT4gKFxuICAgICAgICAgICAgPGRpdiBrZXk9e3AuaWR9PlxuICAgICAgICAgICAgICA8Qm94IGtleT17cC5pZH0gcD17NX0gc2hhZG93PVwibWRcIiBib3JkZXJ3aWR0aD1cIjFweFwiPlxuICAgICAgICAgICAgICAgIDxIZWFkaW5nIGZvbnRTaXplPVwieGxcIj4ge3AudGl0bGV9PC9IZWFkaW5nPlxuICAgICAgICAgICAgICAgIDxUZXh0ID4gcG9zdGVkIGJ5IHtwLmNyZWF0b3IudXNlcm5hbWV9IDwvVGV4dD5cbiAgICAgICAgICAgICAgICA8VGV4dCBtdD17NH0+IHtwLnRleHRTbmlwcGV0fTwvVGV4dD57cC5wb2ludHN9XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvU3RhY2s+XG4gICAgICApfVxuICAgICAge2RhdGEgJiYgZGF0YS5wb3N0cy5oYXNNb3JlID8gKFxuICAgICAgICA8RmxleD5cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9eygpPT57XG4gICAgICAgICAgICBzZXRWYXJpYWJsZXMoe1xuICAgICAgICAgICAgICBsaW1pdDogdmFyaWFibGVzLmxpbWl0LFxuICAgICAgICAgICAgICBjdXJzb3I6IGRhdGEucG9zdHMucG9zdHNbZGF0YS5wb3N0cy5wb3N0cy5sZW5ndGgtMV0uY3JlYXRlZEF0XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH19IGlzTG9hZGluZz17ZmV0Y2hpbmd9IG09XCJhdXRvXCIgbXk9ezh9PlxuICAgICAgICAgICAgbG9hZCBtb3JlXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvRmxleD5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvTGF5b3V0PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFVycWxDbGllbnQoY3JlYXRlVXJxbENsaWVudCwgeyBzc3I6IHRydWUgfSkoSW5kZXgpO1xuIl0sIm5hbWVzIjpbIndpdGhVcnFsQ2xpZW50IiwiY3JlYXRlVXJxbENsaWVudCIsInVzZVBvc3RzUXVlcnkiLCJMYXlvdXQiLCJOZXh0TGluayIsIkJveCIsIkJ1dHRvbiIsIkZsZXgiLCJIZWFkaW5nIiwiTGluayIsIlN0YWNrIiwiVGV4dCIsInVzZVN0YXRlIiwiSW5kZXgiLCJsaW1pdCIsImN1cnNvciIsInZhcmlhYmxlcyIsInNldFZhcmlhYmxlcyIsImRhdGEiLCJmZXRjaGluZyIsIm90aGVyIiwiY29uc29sZSIsImxvZyIsImRpdiIsImFsaWduIiwiaHJlZiIsIm1sIiwic3BhY2luZyIsInBvc3RzIiwibWFwIiwicCIsInNoYWRvdyIsImJvcmRlcndpZHRoIiwiZm9udFNpemUiLCJ0aXRsZSIsImNyZWF0b3IiLCJ1c2VybmFtZSIsIm10IiwidGV4dFNuaXBwZXQiLCJwb2ludHMiLCJpZCIsImhhc01vcmUiLCJvbkNsaWNrIiwibGVuZ3RoIiwiY3JlYXRlZEF0IiwiaXNMb2FkaW5nIiwibSIsIm15Iiwic3NyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n");

/***/ })

});