/*!***************************************************
 * jquery.mark v5.2.3
 * https://github.com/julmot/jquery.mark
 * Copyright (c) 2014–2016, Julian Motz
 * Released under the MIT license https://git.io/vaizN
 *****************************************************/
"use strict";
function _classCallCheck(a, b) {
    if (!(a instanceof b))
        throw new TypeError("Cannot call a class as a function")
}
var _extends = Object.assign || function(a) {
    for (var b = 1; b < arguments.length; b++) {
        var c = arguments[b];
        for (var d in c)
            Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d])
    }
    return a
}
  , _createClass = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1,
            d.configurable = !0,
            "value"in d && (d.writable = !0),
            Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c),
        d && a(b, d),
        b
    }
}()
  , _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
    return typeof a
}
: function(a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol ? "symbol" : typeof a
}
;
!function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], function(b) {
        return a(b)
    }) : a("object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) ? require("jquery") : jQuery)
}(function(a) {
    var b = function() {
        function b(a, c, d) {
            _classCallCheck(this, b),
            this.opt = _extends({}, {
                element: "*",
                className: "*",
                filter: [],
                separateWordSearch: !1,
                diacritics: !0,
                synonyms: {},
                iframes: !1,
                wordBoundary: !1,
                complete: function() {},
                each: function() {},
                debug: !1,
                log: window.console
            }, c),
            this.sv = "string" == typeof d ? [d] : d,
            this.$ctx = a,
            this.dct = ["aÀÁÂÃÄÅàáâãäåĀāąĄ", "cÇçćĆčČ", "dđĐďĎ", "eÈÉÊËèéêëěĚĒēęĘ", "iÌÍÎÏìíîïĪī", "lłŁ", "nÑñňŇńŃ", "oÒÓÔÕÕÖØòóôõöøŌō", "rřŘ", "sŠšśŚ", "tťŤ", "uÙÚÛÜùúûüůŮŪū", "yŸÿýÝ", "zŽžżŻźŹ"]
        }
        return _createClass(b, [{
            key: "log",
            value: function a(b) {
                var c = arguments.length <= 1 || void 0 === arguments[1] ? "debug" : arguments[1];
                if (this.opt.debug) {
                    var a = this.opt.log;
                    "object" === ("undefined" == typeof a ? "undefined" : _typeof(a)) && "function" == typeof a[c] && a[c]("jquery.mark: " + b)
                }
            }
        }, {
            key: "escapeStr",
            value: function(a) {
                return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
            }
        }, {
            key: "createRegExp",
            value: function(a) {
                return a = this.escapeStr(a),
                Object.keys(this.opt.synonyms).length > 0 && (a = this.createSynonymsRegExp(a)),
                this.opt.diacritics && (a = this.createDiacriticsRegExp(a)),
                this.opt.wordBoundary && (a = this.createWordBoundaryRegExp(a)),
                a
            }
        }, {
            key: "createSynonymsRegExp",
            value: function(a) {
                var b = this.opt.synonyms;
                for (var c in b)
                    if (b.hasOwnProperty(c)) {
                        var d = b[c]
                          , e = this.escapeStr(c)
                          , f = this.escapeStr(d);
                        a = a.replace(new RegExp("(" + e + "|" + f + ")","gmi"), "(" + e + "|" + f + ")")
                    }
                return a
            }
        }, {
            key: "createDiacriticsRegExp",
            value: function(a) {
                var b = this
                  , c = a.split("")
                  , d = [];
                return c.forEach(function(c) {
                    b.dct.every(function(b) {
                        if (-1 !== b.indexOf(c)) {
                            if (d.indexOf(b) > -1)
                                return !1;
                            a = a.replace(new RegExp("[" + b + "]","gmi"), "[" + b + "]"),
                            d.push(b)
                        }
                        return !0
                    })
                }),
                a
            }
        }, {
            key: "createWordBoundaryRegExp",
            value: function(a) {
                return "\\b" + a + "\\b"
            }
        }, {
            key: "getSeparatedKeywords",
            value: function() {
                var a = this
                  , b = [];
                return this.sv.forEach(function(c) {
                    a.opt.separateWordSearch ? c.split(" ").forEach(function(a) {
                        "" !== a.trim() && b.push(a)
                    }) : "" !== c.trim() && b.push(c)
                }),
                {
                    keywords: b,
                    length: b.length
                }
            }
        }, {
            key: "getElements",
            value: function() {
                this.$ctx.length < 1 && this.log("Empty context", "warn");
                var a = this.$ctx.add(this.$ctx.find("*"))
                  , b = a.length;
                return {
                    elements: a,
                    length: b
                }
            }
        }, {
            key: "matchesFilter",
            value: function(a, b) {
                var c = !0
                  , d = this.opt.filter.concat(["script", "style", "title"]);
                return this.opt.iframes || (d = d.concat(["iframe"])),
                b && (d = d.concat(["*[data-jquery-mark='true']"])),
                d.every(function(b) {
                    return a.is(b) ? c = !1 : !0
                }),
                !c
            }
        }, {
            key: "onIframeReady",
            value: function(a, b, c) {
                try {
                    !function() {
                        var d = a.first()[0].contentWindow
                          , e = "about:blank"
                          , f = "complete"
                          , g = function() {
                            try {
                                var d = a.contents();
                                if (0 === d.length)
                                    throw new Error("iframe inaccessible");
                                b(d)
                            } catch (a) {
                                c()
                            }
                        }
                          , h = function() {
                            a.on("load.jqueryMark", function() {
                                try {
                                    var b = a.attr("src").trim()
                                      , f = d.location.href;
                                    f === e && b !== e && "" !== b || (a.off("load.jqueryMark"),
                                    g())
                                } catch (a) {
                                    c()
                                }
                            })
                        };
                        if (d.document.readyState === f) {
                            var i = a.attr("src").trim()
                              , j = d.location.href;
                            j === e && i !== e && "" !== i ? h() : g()
                        } else
                            h()
                    }()
                } catch (a) {
                    c()
                }
            }
        }, {
            key: "forEachElementInIframe",
            value: function(b, c) {
                var d = this
                  , e = arguments.length <= 2 || void 0 === arguments[2] ? function() {}
                : arguments[2]
                  , f = 0
                  , g = function() {
                    --f < 1 && e()
                };
                this.onIframeReady(b, function(b) {
                    var e = b.find("*");
                    f = e.length,
                    0 === f && g(),
                    e.each(function(b, f) {
                        var h = a(f);
                        h.is("iframe") ? !function() {
                            var a = 0;
                            d.forEachElementInIframe(h, function(b, d) {
                                c(b, d),
                                d - 1 === a && g(),
                                a++
                            }, g)
                        }() : (c(h, e.length),
                        g())
                    })
                }, function() {
                    var a = b.attr("src");
                    d.log("iframe '" + a + "' could not be accessed", "warn"),
                    g()
                })
            }
        }, {
            key: "forEachElement",
            value: function(b) {
                var c = this
                  , d = arguments.length <= 1 || void 0 === arguments[1] ? function() {}
                : arguments[1]
                  , e = arguments.length <= 2 || void 0 === arguments[2] ? !0 : arguments[2]
                  , f = this.getElements()
                  , g = f.elements
                  , h = f.length
                  , i = function() {
                    0 === --h && d()
                };
                0 === h && d(),
                g.each(function(d, f) {
                    var g = a(f);
                    if (!c.matchesFilter(g, e)) {
                        if (g.is("iframe"))
                            return void c.forEachElementInIframe(g, function(a) {
                                c.matchesFilter(a, e) || b(a)
                            }, i);
                        b(g)
                    }
                    i()
                })
            }
        }, {
            key: "forEachNode",
            value: function(a) {
                var b = arguments.length <= 1 || void 0 === arguments[1] ? function() {}
                : arguments[1];
                this.forEachElement(function(b) {
                    b.contents().each(function(b, c) {
                        3 === c.nodeType && "" !== c.textContent.trim() && a(c)
                    })
                }, b)
            }
        }, {
            key: "wrapMatches",
            value: function(b, c) {
                for (var d = "*" === this.opt.element ? "span" : this.opt.element, e = "*" === this.opt.className ? "mark" : this.opt.className, f = void 0; null !== (f = c.exec(b.textContent)); ) {
                    var g = b.splitText(f.index);
                    if (b = g.splitText(f[0].length),
                    null !== g.parentNode) {
                        var h = a("<" + d + " />", {
                            class: e,
                            "data-jquery-mark": !0,
                            text: f[0]
                        });
                        g.parentNode.replaceChild(h[0], g),
                        this.opt.each(h)
                    }
                    c.lastIndex = 0
                }
            }
        }, {
            key: "perform",
            value: function() {
                var a = this;
                this.sv instanceof RegExp ? (this.log('Searching with expression "' + this.sv + '"'),
                this.forEachNode(function(b) {
                    a.wrapMatches(b, a.sv)
                }, this.opt.complete)) : !function() {
                    var b = a.getSeparatedKeywords()
                      , c = b.keywords
                      , d = b.length;
                    0 === d && a.opt.complete(),
                    c.forEach(function(b) {
                        var e = new RegExp(a.createRegExp(b),"gmi");
                        a.log('Searching with expression "' + e + '"'),
                        a.forEachNode(function(b) {
                            a.wrapMatches(b, e)
                        }, function() {
                            c[d - 1] === b && a.opt.complete()
                        })
                    })
                }()
            }
        }, {
            key: "remove",
            value: function() {
                var b = this.opt.element + '[data-jquery-mark="true"]'
                  , c = this.opt.className;
                "*" !== c && (b += "." + c),
                this.log('Removal selector "' + b + '"'),
                this.forEachElement(function(c) {
                    var d = a(c);
                    if (d.is(b)) {
                        var e = d.parent();
                        d.replaceWith(d.html()),
                        e[0].normalize()
                    }
                }, this.opt.complete, !1)
            }
        }]),
        b
    }();
    a.fn.mark = function(c, d) {
        var e = new b(a(this),d,c);
        return e.perform()
    }
    ,
    a.fn.markRegExp = function(c, d) {
        var e = new b(a(this),d,c);
        return e.perform()
    }
    ,
    a.fn.removeMark = function(c) {
        var d = new b(a(this),c);
        return d.remove()
    }
});
