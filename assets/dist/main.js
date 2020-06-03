/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./front/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./front/layout/header.ts":
/*!********************************!*\
  !*** ./front/layout/header.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.dispatcher = getDispatcher();\r\nfunction initHeader() {\r\n    var header = document.getElementById('siteHeader'), outer = header.querySelector('.siteHeader-outer'), inner = header.querySelector('.siteHeader-inner'), nav = inner.querySelector('.-nav'), mobile = header.querySelector('.siteHeader-mobile');\r\n    initDroppies();\r\n    initProductsMenu();\r\n    initSearch();\r\n    initMobile();\r\n    //dispatcher.mobile.dispatch('open')\r\n    //dispatcher.products.dispatch('open')\r\n    //dispatcher.ptypes.dispatch('open', 1)\r\n    function initMobile() {\r\n        var top = mobile.querySelector('.-top'), label = top.querySelector('.-label'), mobileNav = mobile.querySelector('.-nav'), triggers = [].slice.apply(document.querySelectorAll('[data-mobile-menu]'));\r\n        triggers.forEach(function (trigger) { return trigger.addEventListener('click', function () {\r\n            if (exports.dispatcher.ptypes.isOpen()) {\r\n                exports.dispatcher.ptypes.dispatch('close');\r\n                freezeWindowScroll();\r\n            }\r\n            else if (exports.dispatcher.products.isOpen()) {\r\n                exports.dispatcher.products.dispatch('close');\r\n                freezeWindowScroll();\r\n            }\r\n            else if (exports.dispatcher.search.isOpen()) {\r\n                exports.dispatcher.search.dispatch('close');\r\n                freezeWindowScroll();\r\n            }\r\n            else {\r\n                exports.dispatcher.mobile.dispatch(trigger.dataset.mobileMenu);\r\n            }\r\n        }); });\r\n        exports.dispatcher.products.on('open', backTriggers);\r\n        exports.dispatcher.search.on('open', backTriggers);\r\n        exports.dispatcher.products.on('close', normalTriggers);\r\n        exports.dispatcher.search.on('close', normalTriggers);\r\n        function backTriggers() {\r\n            triggers.forEach(function (trigger) { return trigger.classList.add('is--back'); });\r\n        }\r\n        function normalTriggers() {\r\n            triggers.forEach(function (trigger) { return trigger.classList.remove('is--back'); });\r\n        }\r\n        exports.dispatcher.on('label', function (value) {\r\n            if (value) {\r\n                label.innerText = value;\r\n            }\r\n            else {\r\n                label.innerText = label.dataset.title;\r\n            }\r\n        });\r\n        exports.dispatcher.mobile.on('open', openMenu);\r\n        exports.dispatcher.mobile.on('close', closeMenu);\r\n        window.addEventListener('resize', resolve);\r\n        window.addEventListener('orientationchange', resolve);\r\n        resolve();\r\n        function openMenu() {\r\n            freezeWindowScroll();\r\n            triggers.forEach(function (trigger) { return trigger.classList.add('is--active'); });\r\n            mobileNav.classList.add('is--visible');\r\n        }\r\n        function closeMenu() {\r\n            releaseWindowScroll();\r\n            exports.dispatcher.search.isOpen() && exports.dispatcher.search.dispatch('close');\r\n            exports.dispatcher.products.isOpen() && exports.dispatcher.products.dispatch('close');\r\n            triggers.forEach(function (trigger) { return trigger.classList.remove('is--active'); });\r\n            mobileNav.classList.remove('is--visible');\r\n        }\r\n        /**\r\n         * Cut and paste contents between mobile and inner headers based on window's width\r\n         */\r\n        function resolve() {\r\n            if (isMobile() && nav.childNodes.length) {\r\n                [].slice.apply(nav.childNodes).forEach(function (node) {\r\n                    mobileNav.appendChild(node);\r\n                });\r\n            }\r\n            else if (!isMobile() && mobileNav.childNodes.length) {\r\n                [].slice.apply(mobileNav.childNodes).forEach(function (node) {\r\n                    nav.appendChild(node);\r\n                });\r\n            }\r\n        }\r\n    }\r\n    function initDroppies() {\r\n        var menus = [].slice.apply(header.querySelectorAll('li.menu-item-has-children'));\r\n        menus.forEach(function (li) {\r\n            var a = [].slice.apply(li.childNodes).find(function (node) { return node.nodeName === 'A'; }), subMenu = li.querySelector('.sub-menu');\r\n            initDroppie(a, subMenu);\r\n        });\r\n        initDroppie(header.querySelector('.-activeLang'), header.querySelector('.-languages'));\r\n        function initDroppie(trigger, menu) {\r\n            if (!trigger || !menu) {\r\n                trigger && (trigger.disabled = true);\r\n                return;\r\n            }\r\n            var droppieOpen = false;\r\n            if (trigger && menu) {\r\n                trigger.addEventListener('click', function (event) {\r\n                    if (!isMobile()) {\r\n                        event.preventDefault();\r\n                        toggleMenu();\r\n                    }\r\n                });\r\n                document.addEventListener('click', function (event) {\r\n                    if (droppieOpen && (event.target !== trigger && event.target !== menu && !menu.contains(event.target))) {\r\n                        closeMenu();\r\n                    }\r\n                });\r\n            }\r\n            function openMenu() {\r\n                menu.classList.add('is--open');\r\n                trigger.classList.add('is--active');\r\n                droppieOpen = true;\r\n            }\r\n            function closeMenu() {\r\n                menu.classList.remove('is--open');\r\n                trigger.classList.remove('is--active');\r\n                droppieOpen = false;\r\n            }\r\n            function toggleMenu() {\r\n                droppieOpen ? closeMenu() : openMenu();\r\n            }\r\n        }\r\n    }\r\n    function initProductsMenu() {\r\n        var menu = outer.querySelector('.-products'), triggers = [].slice.apply(document.querySelectorAll('[data-products-menu]'));\r\n        var animationFrame = null, animationHandler = function () { };\r\n        initMenuInternals();\r\n        triggers.forEach(function (trigger) { return trigger.addEventListener('click', function () { return exports.dispatcher.products.dispatch(trigger.dataset.productsMenu); }); });\r\n        exports.dispatcher.products.on('close', closeMenu);\r\n        exports.dispatcher.products.on('open', openMenu);\r\n        function openMenu() {\r\n            exports.dispatcher.search.isOpen() && exports.dispatcher.search.dispatch('close');\r\n            showOuter();\r\n            menu.classList.add('is--visible');\r\n            triggers.forEach(function (trigger) { return trigger.classList.add('is--active'); });\r\n            exports.dispatcher.label.set(menu.getAttribute('aria-label'));\r\n            animationFrame = window.requestAnimationFrame(animationHandler);\r\n        }\r\n        function closeMenu() {\r\n            hideOuter();\r\n            menu.classList.remove('is--visible');\r\n            triggers.forEach(function (trigger) { return trigger.classList.remove('is--active'); });\r\n            exports.dispatcher.label.reset();\r\n            window.cancelAnimationFrame(animationFrame);\r\n        }\r\n        function initMenuInternals() {\r\n            var triggers = [].slice.apply(menu.querySelectorAll('.-type')), collections = [].slice.apply(menu.querySelectorAll('.-collection')), scroller = menu.querySelector('.-products-list-scroller');\r\n            if (!triggers.length || !collections.length) {\r\n                console.warn('No product type triggers and collections found');\r\n                return;\r\n            }\r\n            exports.dispatcher.ptypes.on('open', pickType);\r\n            exports.dispatcher.ptypes.on('close', discardTypes);\r\n            triggers.forEach(function (trigger, idx) {\r\n                trigger.addEventListener('click', function () { return exports.dispatcher.ptypes.dispatch('open', idx, trigger); });\r\n            });\r\n            isMobile() || exports.dispatcher.ptypes.dispatch('open', 0);\r\n            // Collection header parallax on overflow scrolling\r\n            // Minimizing calculations only to currently active collection\r\n            // No heavy shit inside animation frame handler!\r\n            var activeCollection = null, activeCollectionHeader = null, activeCollectionList = null;\r\n            animationHandler = function animationHandler() {\r\n                if (!isMobile() && activeCollection) {\r\n                    if (activeCollection.scrollTop > 0) {\r\n                        activeCollectionList.classList.add('is--scrolled');\r\n                        activeCollectionHeader.style.transform = \"translateY(\" + activeCollection.scrollTop / 2.5 + \"px)\";\r\n                        //activeCollectionHeader.style.opacity = (1 - activeCollection.scrollTop / activeCollectionHeader.scrollHeight).toString()\r\n                    }\r\n                    else {\r\n                        activeCollectionList.classList.remove('is--scrolled');\r\n                        activeCollectionHeader.style.transform = '';\r\n                    }\r\n                }\r\n                animationFrame = window.requestAnimationFrame(animationHandler);\r\n            };\r\n            function pickType(idx) {\r\n                if (idx === void 0) { idx = 0; }\r\n                var trigger = triggers[idx], collection = collections[idx];\r\n                discardTypes();\r\n                activeCollection = collection;\r\n                activeCollectionHeader = collection.querySelector('.-collection-header');\r\n                activeCollectionList = collection.querySelector('.-collection-list');\r\n                scroller.classList.add(\"is--index-\" + idx);\r\n                trigger.classList.add('is--active');\r\n                collection.classList.add('is--visible');\r\n            }\r\n            function discardTypes() {\r\n                activeCollection = null;\r\n                activeCollectionHeader = null;\r\n                activeCollectionList = null;\r\n                triggers.filter(function (t) { return t.classList.contains('is--active'); }).forEach(function (t) { return t.classList.remove('is--active'); });\r\n                collections.filter(function (c) { return c.classList.contains('is--visible'); }).forEach(function (c) { return c.classList.remove('is--visible'); });\r\n                scroller.className = scroller.className.replace(/is--index-\\d+/, '');\r\n            }\r\n        }\r\n    }\r\n    function initSearch() {\r\n        var triggers = [].slice.apply(document.querySelectorAll('[data-search-dialog]')), searcher = outer.querySelector('.-search'), input = searcher.querySelector('.-input'), link = searcher.querySelector('.-link');\r\n        exports.dispatcher.search.on('close', closeMenu);\r\n        exports.dispatcher.search.on('open', openMenu);\r\n        triggers.forEach(function (trigger) { return trigger.addEventListener('click', function () { return exports.dispatcher.search.dispatch(trigger.dataset.searchDialog); }); });\r\n        input.addEventListener('keydown', function (event) {\r\n            switch (event.key) {\r\n                case 'Enter':\r\n                    if (input.value) {\r\n                        (Object.assign(document.createElement('a'), {\r\n                            href: \"/?s=\" + encodeURIComponent(input.value)\r\n                        })).click();\r\n                    }\r\n                    break;\r\n                case 'Esc':\r\n                case 'Escape':\r\n                    closeMenu();\r\n                    break;\r\n            }\r\n        });\r\n        input.addEventListener('keyup', function (event) {\r\n            if (input.value) {\r\n                link.classList.add('is--active');\r\n                link.href = \"/?s=\" + encodeURIComponent(input.value);\r\n            }\r\n            else {\r\n                link.classList.remove('is--active');\r\n                link.href = '';\r\n            }\r\n        });\r\n        function openMenu() {\r\n            exports.dispatcher.products.isOpen() && exports.dispatcher.products.dispatch('close');\r\n            showOuter();\r\n            searcher.classList.add('is--visible');\r\n            triggers.forEach(function (trigger) { return trigger.classList.add('is--active'); });\r\n            setTimeout(function () { return input.focus(); }, 150);\r\n            exports.dispatcher.label.set(searcher.getAttribute('aria-label'));\r\n        }\r\n        function closeMenu() {\r\n            hideOuter();\r\n            searcher.classList.remove('is--visible');\r\n            triggers.forEach(function (trigger) { return trigger.classList.remove('is--active'); });\r\n            exports.dispatcher.label.reset();\r\n        }\r\n    }\r\n    function showOuter() {\r\n        freezeWindowScroll();\r\n        outer.classList.add('is--visible');\r\n    }\r\n    function hideOuter() {\r\n        releaseWindowScroll();\r\n        outer.classList.remove('is--visible');\r\n    }\r\n}\r\nexports.initHeader = initHeader;\r\nvar capturedScrollY = 0;\r\nfunction scrollToCapturedPosition() {\r\n    window.scrollTo({ left: 0, top: capturedScrollY, behavior: 'instant' });\r\n}\r\nfunction freezeWindowScroll() {\r\n    capturedScrollY = window.pageYOffset;\r\n    window.addEventListener('scroll', scrollToCapturedPosition);\r\n}\r\nfunction releaseWindowScroll() {\r\n    capturedScrollY = 0;\r\n    window.removeEventListener('scroll', scrollToCapturedPosition);\r\n}\r\n//function blurBackdrop() {\r\n//  document.documentElement.classList.contains('has--filter') && document.body.classList.add('blur-backdrop')\r\n//}\r\n//function resetBackdrop() {\r\n//  document.body.classList.remove('blur-backdrop')\r\n//}\r\nfunction getDispatcher() {\r\n    function listen(action, cb) {\r\n        document.addEventListener(\"header-\" + action, function (event) {\r\n            cb(event.detail);\r\n        });\r\n    }\r\n    function dispatch(action, detail, origin) {\r\n        (origin || document).dispatchEvent(new CustomEvent(\"header-\" + action, {\r\n            bubbles: true,\r\n            cancelable: true,\r\n            detail: detail,\r\n        }));\r\n    }\r\n    function stdMenu(name) {\r\n        var isOpen = false;\r\n        return {\r\n            isOpen: function () {\r\n                return isOpen;\r\n            },\r\n            dispatch: function (action, detail, origin) {\r\n                switch (action) {\r\n                    case 'open':\r\n                        isOpen = true;\r\n                        break;\r\n                    case 'close':\r\n                        isOpen = false;\r\n                        break;\r\n                    case 'toggle':\r\n                    default:\r\n                        var directive = isOpen ? 'close' : 'open';\r\n                        this.dispatch(directive);\r\n                        dispatch(name + \"-toggle\", directive, origin);\r\n                }\r\n                dispatch(name + \"-\" + action, detail, origin);\r\n            },\r\n            on: function (action, cb) {\r\n                listen(name + \"-\" + action, cb);\r\n            },\r\n        };\r\n    }\r\n    return {\r\n        dispatch: dispatch,\r\n        on: listen,\r\n        mobile: stdMenu('mobile'),\r\n        products: stdMenu('products'),\r\n        ptypes: stdMenu('ptypes'),\r\n        search: stdMenu('search'),\r\n        label: {\r\n            set: function (label) { return dispatch('label', label); },\r\n            reset: function () { return dispatch('label'); }\r\n        },\r\n    };\r\n}\r\nfunction isMobile() {\r\n    return window.innerWidth < 720;\r\n}\r\n\n\n//# sourceURL=webpack:///./front/layout/header.ts?");

/***/ }),

/***/ "./front/main.ts":
/*!***********************!*\
  !*** ./front/main.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar header_1 = __webpack_require__(/*! ./layout/header */ \"./front/layout/header.ts\");\r\njQuery(function () {\r\n    var bg = document.querySelector('.siteBg');\r\n    bg && initBg(bg);\r\n    header_1.initHeader();\r\n});\r\nfunction initBg(root) {\r\n    var coef = 0, af = window.requestAnimationFrame(animate);\r\n    updateCoef();\r\n    window.addEventListener('resize', updateCoef);\r\n    window.addEventListener('orientationchange', updateCoef);\r\n    function animate() {\r\n        root.style.transform = \"translateY(\" + window.pageYOffset / (1 + coef) + \"px)\";\r\n        af = window.requestAnimationFrame(animate);\r\n    }\r\n    function updateCoef() {\r\n        coef = window.innerHeight / document.body.clientHeight;\r\n    }\r\n}\r\n$('.div').on('çlick', function () {\r\n    alert('zalupa');\r\n});\r\n\n\n//# sourceURL=webpack:///./front/main.ts?");

/***/ })

/******/ });