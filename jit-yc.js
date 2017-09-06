/*
Copyright (c) 2011 Sencha Inc. - Author: Nicolas Garcia Belmonte (http://philogb.github.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

 */
 (function() {
    window.$jit = function(x) {
        x = x || window;
        for (var y in $jit) {
            if ($jit[y].$extend) {
                x[y] = $jit[y]
            }
        }
    };
    $jit.version = "2.0.1";
    var c = function(w) {
        return document.getElementById(w)
    };
    c.empty = function() {};
    c.extend = function(y, w) {
        for (var x in (w || {})) {
            y[x] = w[x]
        }
        return y
    };
    c.lambda = function(w) {
        return (typeof w == "function") ? w: function() {
            return w
        }
    };
    c.time = Date.now ||
    function() {
        return + new Date
    };
    c.splat = function(x) {
        var w = c.type(x);
        return w ? ((w != "array") ? [x] : x) : []
    };
    c.type = function(x) {
        var w = c.type.s.call(x).match(/^\[object\s(.*)\]$/)[1].toLowerCase();
        if (w != "object") {
            return w
        }
        if (x && x.$$family) {
            return x.$$family
        }
        return (x && x.nodeName && x.nodeType == 1) ? "element": w
    };
    c.type.s = Object.prototype.toString;
    c.each = function(B, A) {
        var z = c.type(B);
        if (z == "object") {
            for (var y in B) {
                A(B[y], y)
            }
        } else {
            for (var x = 0,
            w = B.length; x < w; x++) {
                A(B[x], x)
            }
        }
    };
    c.indexOf = function(z, y) {
        if (Array.indexOf) {
            return z.indexOf(y)
        }
        for (var x = 0,
        w = z.length; x < w; x++) {
            if (z[x] === y) {
                return x
            }
        }
        return - 1
    };
    c.map = function(y, x) {
        var w = [];
        c.each(y,
        function(A, z) {
            w.push(x(A, z))
        });
        return w
    };
    c.reduce = function(A, y, x) {
        var w = A.length;
        if (w == 0) {
            return x
        }
        var z = arguments.length == 3 ? x: A[--w];
        while (w--) {
            z = y(z, A[w])
        }
        return z
    };
    c.merge = function() {
        var A = {};
        for (var z = 0,
        w = arguments.length; z < w; z++) {
            var x = arguments[z];
            if (c.type(x) != "object") {
                continue
            }
            for (var y in x) {
                var C = x[y],
                B = A[y];
                A[y] = (B && c.type(C) == "object" && c.type(B) == "object") ? c.merge(B, C) : c.unlink(C)
            }
        }
        return A
    };
    c.unlink = function(y) {
        var x;
        switch (c.type(y)) {
        case "object":
            x = {};
            for (var A in y) {
                x[A] = c.unlink(y[A])
            }
            break;
        case "array":
            x = [];
            for (var z = 0,
            w = y.length; z < w; z++) {
                x[z] = c.unlink(y[z])
            }
            break;
        default:
            return y
        }
        return x
    };
    c.zip = function() {
        if (arguments.length === 0) {
            return []
        }
        for (var y = 0,
        x = [], w = arguments.length, B = arguments[0].length; y < B; y++) {
            for (var z = 0,
            A = []; z < w; z++) {
                A.push(arguments[z][y])
            }
            x.push(A)
        }
        return x
    };
    c.rgbToHex = function(A, z) {
        if (A.length < 3) {
            return null
        }
        if (A.length == 4 && A[3] == 0 && !z) {
            return "transparent"
        }
        var x = [];
        for (var w = 0; w < 3; w++) {
            var y = (A[w] - 0).toString(16);
            x.push(y.length == 1 ? "0" + y: y)
        }
        return z ? x: "#" + x.join("")
    };
    c.hexToRgb = function(y) {
        if (y.length != 7) {
            y = y.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
            y.shift();
            if (y.length != 3) {
                return null
            }
            var w = [];
            for (var x = 0; x < 3; x++) {
                var z = y[x];
                if (z.length == 1) {
                    z += z
                }
                w.push(parseInt(z, 16))
            }
            return w
        } else {
            y = parseInt(y.slice(1), 16);
            return [y >> 16, y >> 8 & 255, y & 255]
        }
    };
    c.destroy = function(w) {
        c.clean(w);
        if (w.parentNode) {
            w.parentNode.removeChild(w)
        }
        if (w.clearAttributes) {
            w.clearAttributes()
        }
    };
    c.clean = function(z) {
        for (var y = z.childNodes,
        x = 0,
        w = y.length; x < w; x++) {
            c.destroy(y[x])
        }
    };
    c.addEvent = function(y, x, w) {
        if (y.addEventListener) {
            y.addEventListener(x, w, false)
        } else {
            y.attachEvent("on" + x, w)
        }
    };
    c.addEvents = function(x, y) {
        for (var w in y) {
            c.addEvent(x, w, y[w])
        }
    };
    c.hasClass = function(x, w) {
        return (" " + x.className + " ").indexOf(" " + w + " ") > -1
    };
    c.addClass = function(x, w) {
        if (!c.hasClass(x, w)) {
            x.className = (x.className + " " + w)
        }
    };
    c.removeClass = function(x, w) {
        x.className = x.className.replace(new RegExp("(^|\\s)" + w + "(?:\\s|$)"), "$1")
    };
    c.getPos = function(y) {
        var B = A(y);
        var w = z(y);
        return {
            x: B.x - w.x,
            y: B.y - w.y
        };
        function A(D) {
            var C = {
                x: 0,
                y: 0
            };
            while (D && !x(D)) {
                C.x += D.offsetLeft;
                C.y += D.offsetTop;
                D = D.offsetParent
            }
            return C
        }
        function z(D) {
            var C = {
                x: 0,
                y: 0
            };
            while (D && !x(D)) {
                C.x += D.scrollLeft;
                C.y += D.scrollTop;
                D = D.parentNode
            }
            return C
        }
        function x(C) {
            return (/^(?:body|html)$/i).test(C.tagName)
        }
    };
    c.event = {
        get: function(x, w) {
            w = w || window;
            return x || w.event
        },
        getWheel: function(w) {
            return w.wheelDelta ? w.wheelDelta / 120 : -(w.detail || 0) / 3
        },
        isRightClick: function(w) {
            return (w.which == 3 || w.button == 2)
        },
        getPos: function(z, y) {
            y = y || window;
            z = z || y.event;
            var x = y.document;
            x = x.documentElement || x.body;
            if (z.touches && z.touches.length) {
                z = z.touches[0]
            }
            var w = {
                x: z.pageX || (z.clientX + x.scrollLeft),
                y: z.pageY || (z.clientY + x.scrollTop)
            };
            return w
        },
        stop: function(w) {
            if (w.stopPropagation) {
                w.stopPropagation()
            }
            w.cancelBubble = true;
            if (w.preventDefault) {
                w.preventDefault()
            } else {
                w.returnValue = false
            }
        }
    };
    $jit.util = $jit.id = c;
    var q = function(x) {
        x = x || {};
        var w = function() {
            for (var A in this) {
                if (typeof this[A] != "function") {
                    this[A] = c.unlink(this[A])
                }
            }
            this.constructor = w;
            if (q.prototyping) {
                return this
            }
            var z = this.initialize ? this.initialize.apply(this, arguments) : this;
            this.$$family = "class";
            return z
        };
        for (var y in q.Mutators) {
            if (!x[y]) {
                continue
            }
            x = q.Mutators[y](x, x[y]);
            delete x[y]
        }
        c.extend(w, this);
        w.constructor = q;
        w.prototype = x;
        return w
    };
    q.Mutators = {
        Implements: function(w, x) {
            c.each(c.splat(x),
            function(z) {
                q.prototyping = z;
                var y = (typeof z == "function") ? new z: z;
                for (var A in y) {
                    if (! (A in w)) {
                        w[A] = y[A]
                    }
                }
                delete q.prototyping
            });
            return w
        }
    };
    c.extend(q, {
        inherit: function(w, z) {
            for (var y in z) {
                var x = z[y];
                var B = w[y];
                var A = c.type(x);
                if (B && A == "function") {
                    if (x != B) {
                        q.override(w, y, x)
                    }
                } else {
                    if (A == "object") {
                        w[y] = c.merge(B, x)
                    } else {
                        w[y] = x
                    }
                }
            }
            return w
        },
        override: function(x, w, A) {
            var z = q.prototyping;
            if (z && x[w] != z[w]) {
                z = null
            }
            var y = function() {
                var B = this.parent;
                this.parent = z ? z[w] : x[w];
                var C = A.apply(this, arguments);
                this.parent = B;
                return C
            };
            x[w] = y
        }
    });
    q.prototype.implement = function() {
        var w = this.prototype;
        c.each(Array.prototype.slice.call(arguments || []),
        function(x) {
            q.inherit(w, x)
        });
        return this
    };
    $jit.Class = q;
    $jit.json = {
        prune: function(x, w) {
            this.each(x,
            function(z, y) {
                if (y == w && z.children) {
                    delete z.children;
                    z.children = []
                }
            })
        },
        getParent: function(w, A) {
            if (w.id == A) {
                return false
            }
            var z = w.children;
            if (z && z.length > 0) {
                for (var y = 0; y < z.length; y++) {
                    if (z[y].id == A) {
                        return w
                    } else {
                        var x = this.getParent(z[y], A);
                        if (x) {
                            return x
                        }
                    }
                }
            }
            return false
        },
        getSubtree: function(w, A) {
            if (w.id == A) {
                return w
            }
            for (var y = 0,
            z = w.children; z && y < z.length; y++) {
                var x = this.getSubtree(z[y], A);
                if (x != null) {
                    return x
                }
            }
            return null
        },
        eachLevel: function(w, B, y, A) {
            if (B <= y) {
                A(w, B);
                if (!w.children) {
                    return
                }
                for (var x = 0,
                z = w.children; x < z.length; x++) {
                    this.eachLevel(z[x], B + 1, y, A)
                }
            }
        },
        each: function(w, x) {
            this.eachLevel(w, 0, Number.MAX_VALUE, x)
        }
    };
    $jit.Trans = {
        $extend: true,
        linear: function(w) {
            return w
        }
    };
    var i = $jit.Trans; (function() {
        var w = function(z, y) {
            y = c.splat(y);
            return c.extend(z, {
                easeIn: function(A) {
                    return z(A, y)
                },
                easeOut: function(A) {
                    return 1 - z(1 - A, y)
                },
                easeInOut: function(A) {
                    return (A <= 0.5) ? z(2 * A, y) / 2 : (2 - z(2 * (1 - A), y)) / 2
                }
            })
        };
        var x = {
            Pow: function(z, y) {
                return Math.pow(z, y[0] || 6)
            },
            Expo: function(y) {
                return Math.pow(2, 8 * (y - 1))
            },
            Circ: function(y) {
                return 1 - Math.sin(Math.acos(y))
            },
            Sine: function(y) {
                return 1 - Math.sin((1 - y) * Math.PI / 2)
            },
            Back: function(z, y) {
                y = y[0] || 1.618;
                return Math.pow(z, 2) * ((y + 1) * z - y)
            },
            Bounce: function(B) {
                var A;
                for (var z = 0,
                y = 1; 1; z += y, y /= 2) {
                    if (B >= (7 - 4 * z) / 11) {
                        A = y * y - Math.pow((11 - 6 * z - 11 * B) / 4, 2);
                        break
                    }
                }
                return A
            },
            Elastic: function(z, y) {
                return Math.pow(2, 10 * --z) * Math.cos(20 * z * Math.PI * (y[0] || 1) / 3)
            }
        };
        c.each(x,
        function(z, y) {
            i[y] = w(z)
        });
        c.each(["Quad", "Cubic", "Quart", "Quint"],
        function(z, y) {
            i[z] = w(function(A) {
                return Math.pow(A, [y + 2])
            })
        })
    })();
    var u = new q({
        initialize: function(w) {
            this.setOptions(w)
        },
        setOptions: function(w) {
            var x = {
                duration: 2500,
                fps: 40,
                transition: i.Quart.easeInOut,
                compute: c.empty,
                complete: c.empty,
                link: "ignore"
            };
            this.opt = c.merge(x, w || {});
            return this
        },
        step: function() {
            var x = c.time(),
            w = this.opt;
            if (x < this.time + w.duration) {
                var y = w.transition((x - this.time) / w.duration);
                w.compute(y)
            } else {
                this.timer = clearInterval(this.timer);
                w.compute(1);
                w.complete()
            }
        },
        start: function() {
            if (!this.check()) {
                return this
            }
            this.time = 0;
            this.startTimer();
            return this
        },
        startTimer: function() {
            var w = this,
            x = this.opt.fps;
            if (this.timer) {
                return false
            }
            this.time = c.time() - this.time;
            this.timer = setInterval((function() {
                w.step()
            }), Math.round(1000 / x));
            return true
        },
        pause: function() {
            this.stopTimer();
            return this
        },
        resume: function() {
            this.startTimer();
            return this
        },
        stopTimer: function() {
            if (!this.timer) {
                return false
            }
            this.time = c.time() - this.time;
            this.timer = clearInterval(this.timer);
            return true
        },
        check: function() {
            if (!this.timer) {
                return true
            }
            if (this.opt.link == "cancel") {
                this.stopTimer();
                return true
            }
            return false
        }
    });
    var n = function() {
        var y = arguments;
        for (var A = 0,
        w = y.length,
        x = {}; A < w; A++) {
            var z = n[y[A]];
            if (z.$extend) {
                c.extend(x, z)
            } else {
                x[y[A]] = z
            }
        }
        return x
    };
    n.AreaChart = {
        $extend: true,
        animate: true,
        labelOffset: 3,
        type: "stacked",
        Tips: {
            enable: false,
            onShow: c.empty,
            onHide: c.empty
        },
        Events: {
            enable: false,
            onClick: c.empty
        },
        selectOnHover: true,
        showAggregates: true,
        showLabels: true,
        filterOnClick: false,
        restoreOnRightClick: false
    };
    n.Margin = {
        $extend: false,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    n.Canvas = {
        $extend: true,
        injectInto: "id",
        type: "2D",
        width: false,
        height: false,
        useCanvas: false,
        withLabels: true,
        background: false,
        Scene: {
            Lighting: {
                enable: false,
                ambient: [1, 1, 1],
                directional: {
                    direction: {
                        x: -100,
                        y: -100,
                        z: -100
                    },
                    color: [0.5, 0.3, 0.1]
                }
            }
        }
    };
    n.Tree = {
        $extend: true,
        orientation: "left",//默认加载位置
        subtreeOffset: 8,
        siblingOffset: 5,
        indent: 10,
        multitree: false,
        align: "center"
    };
    n.Node = {
        $extend: false,
        overridable: false,
        type: "circle",
        color: "#ccb",
        alpha: 1,
        dim: 3,
        height: 20,
        width: 90,
        autoHeight: false,
        autoWidth: false,
        lineWidth: 1,
        transform: true,
        align: "center",
        angularWidth: 1,
        span: 1,
        CanvasStyles: {}
    };
    n.Edge = {
        $extend: false,
        overridable: false,
        type: "line",
        color: "#ccb",
        lineWidth: 1,
        dim: 15,
        alpha: 1,
        epsilon: 7,
        CanvasStyles: {}
    };
    n.Fx = {
        $extend: true,
        fps: 40,
        duration: 2500,
        transition: $jit.Trans.Quart.easeInOut,
        clearCanvas: true
    };
    n.Label = {
        $extend: false,
        overridable: false,
        type: "HTML",
        style: " ",
        size: 10,
        family: "sans-serif",
        textAlign: "center",
        textBaseline: "alphabetic",
        color: "#fff"
    };
    n.Tips = {
        $extend: false,
        enable: false,
        type: "auto",
        offsetX: 20,
        offsetY: 20,
        force: false,
        onShow: c.empty,
        onHide: c.empty
    };
    n.NodeStyles = {
        $extend: false,
        enable: false,
        type: "auto",
        stylesHover: false,
        stylesClick: false
    };
    n.Events = {
        $extend: false,
        enable: false,
        enableForEdges: false,
        type: "auto",
        onClick: c.empty,
        onRightClick: c.empty,
        onMouseMove: c.empty,
        onMouseEnter: c.empty,
        onMouseLeave: c.empty,
        onDragStart: c.empty,
        onDragMove: c.empty,
        onDragCancel: c.empty,
        onDragEnd: c.empty,
        onTouchStart: c.empty,
        onTouchMove: c.empty,
        onTouchEnd: c.empty,
        onMouseWheel: c.empty
    };
    n.Navigation = {
        $extend: false,
        enable: false,
        type: "auto",
        panning: false,
        zooming: false
    };
    n.Controller = {
        $extend: true,
        onBeforeCompute: c.empty,
        onAfterCompute: c.empty,
        onCreateLabel: c.empty,
        onPlaceLabel: c.empty,
        onComplete: c.empty,
        onBeforePlotLine: c.empty,
        onAfterPlotLine: c.empty,
        onBeforePlotNode: c.empty,
        onAfterPlotNode: c.empty,
        request: false
    };
    var t = {
        initialize: function(y, w) {
            this.viz = w;
            this.canvas = w.canvas;
            this.config = w.config[y];
            this.nodeTypes = w.fx.nodeTypes;
            var x = this.config.type;
            this.dom = x == "auto" ? (w.config.Label.type != "Native") : (x != "Native");
            this.labelContainer = this.dom && w.labels.getLabelContainer();
            this.isEnabled() && this.initializePost()
        },
        initializePost: c.empty,
        setAsProperty: c.lambda(false),
        isEnabled: function() {
            return this.config.enable
        },
        isLabel: function(B, A, z) {
            B = c.event.get(B, A);
            var w = this.labelContainer,
            y = B.target || B.srcElement,
            x = B.relatedTarget;
            if (z) {
                return x && x == this.viz.canvas.getCtx().canvas && !!y && this.isDescendantOf(y, w)
            } else {
                return this.isDescendantOf(y, w)
            }
        },
        isDescendantOf: function(x, w) {
            while (x && x.parentNode) {
                if (x.parentNode == w) {
                    return x
                }
                x = x.parentNode
            }
            return false
        }
    };
    var h = {
        onMouseUp: c.empty,
        onMouseDown: c.empty,
        onMouseMove: c.empty,
        onMouseOver: c.empty,
        onMouseOut: c.empty,
        onMouseWheel: c.empty,
        onTouchStart: c.empty,
        onTouchMove: c.empty,
        onTouchEnd: c.empty,
        onTouchCancel: c.empty
    };
    var s = new q({
        initialize: function(w) {
            this.viz = w;
            this.canvas = w.canvas;
            this.node = false;
            this.edge = false;
            this.registeredObjects = [];
            this.attachEvents()
        },
        attachEvents: function() {
            var y = this.canvas.getElement(),
            x = this;
            y.oncontextmenu = c.lambda(false);
            c.addEvents(y, {
                mouseup: function(B, A) {
                    var z = c.event.get(B, A);
                    x.handleEvent("MouseUp", B, A, x.makeEventObject(B, A), c.event.isRightClick(z))
                },
                mousedown: function(B, A) {
                    var z = c.event.get(B, A);
                    x.handleEvent("MouseDown", B, A, x.makeEventObject(B, A), c.event.isRightClick(z))
                },
                mousemove: function(A, z) {
                    x.handleEvent("MouseMove", A, z, x.makeEventObject(A, z))
                },
                mouseover: function(A, z) {
                    x.handleEvent("MouseOver", A, z, x.makeEventObject(A, z))
                },
                mouseout: function(A, z) {
                    x.handleEvent("MouseOut", A, z, x.makeEventObject(A, z))
                },
                touchstart: function(A, z) {
                    x.handleEvent("TouchStart", A, z, x.makeEventObject(A, z))
                },
                touchmove: function(A, z) {
                    x.handleEvent("TouchMove", A, z, x.makeEventObject(A, z))
                },
                touchend: function(A, z) {
                    x.handleEvent("TouchEnd", A, z, x.makeEventObject(A, z))
                }
            });
            var w = function(C, B) {
                var A = c.event.get(C, B);
                var z = c.event.getWheel(A);
                x.handleEvent("MouseWheel", C, B, z)
            };
            if (!document.getBoxObjectFor && window.mozInnerScreenX == null) {
                c.addEvent(y, "mousewheel", w)
            } else {
                y.addEventListener("DOMMouseScroll", w, false)
            }
        },
        register: function(w) {
            this.registeredObjects.push(w)
        },
        handleEvent: function() {
            var x = Array.prototype.slice.call(arguments),
            A = x.shift();
            for (var z = 0,
            y = this.registeredObjects,
            w = y.length; z < w; z++) {
                y[z]["on" + A].apply(y[z], x)
            }
        },
        makeEventObject: function(C, B) {
            var z = this,
            A = this.viz.graph,
            y = this.viz.fx,
            x = y.nodeTypes,
            w = y.edgeTypes;
            return {
                pos: false,
                node: false,
                edge: false,
                contains: false,
                getNodeCalled: false,
                getEdgeCalled: false,
                getPos: function() {
                    var F = z.viz.canvas,
                    G = F.getSize(),
                    H = F.getPos(),
                    E = F.translateOffsetX,
                    D = F.translateOffsetY,
                    K = F.scaleOffsetX,
                    I = F.scaleOffsetY,
                    J = c.event.getPos(C, B);
                    this.pos = {
                        x: (J.x - H.x - G.width / 2 - E) * 1 / K,
                        y: (J.y - H.y - G.height / 2 - D) * 1 / I
                    };
                    return this.pos
                },
                getNode: function() {
                    if (this.getNodeCalled) {
                        return this.node
                    }
                    this.getNodeCalled = true;
                    for (var G in A.nodes) {
                        var F = A.nodes[G],
                        E = F && x[F.getData("type")],
                        D = E && E.contains && E.contains.call(y, F, this.getPos());
                        if (D) {
                            this.contains = D;
                            return z.node = this.node = F
                        }
                    }
                    return z.node = this.node = false
                },
                getEdge: function() {
                    if (this.getEdgeCalled) {
                        return this.edge
                    }
                    this.getEdgeCalled = true;
                    var F = {};
                    for (var J in A.edges) {
                        var H = A.edges[J];
                        F[J] = true;
                        for (var I in H) {
                            if (I in F) {
                                continue
                            }
                            var G = H[I],
                            E = G && w[G.getData("type")],
                            D = E && E.contains && E.contains.call(y, G, this.getPos());
                            if (D) {
                                this.contains = D;
                                return z.edge = this.edge = G
                            }
                        }
                    }
                    return z.edge = this.edge = false
                },
                getContains: function() {
                    if (this.getNodeCalled) {
                        return this.contains
                    }
                    this.getNode();
                    return this.contains
                }
            }
        }
    });
    var o = {
        initializeExtras: function() {
            var x = new s(this),
            w = this;
            c.each(["NodeStyles", "Tips", "Navigation", "Events"],
            function(y) {
                var z = new o.Classes[y](y, w);
                if (z.isEnabled()) {
                    x.register(z)
                }
                if (z.setAsProperty()) {
                    w[y.toLowerCase()] = z
                }
            })
        }
    };
    o.Classes = {};
    o.Classes.Events = new q({
        Implements: [t, h],
        initializePost: function() {
            this.fx = this.viz.fx;
            this.ntypes = this.viz.fx.nodeTypes;
            this.etypes = this.viz.fx.edgeTypes;
            this.hovered = false;
            this.pressed = false;
            this.touched = false;
            this.touchMoved = false;
            this.moved = false
        },
        setAsProperty: c.lambda(true),
        onMouseUp: function(A, z, x, y) {
            var w = c.event.get(A, z);
            if (!this.moved) {
                if (y) {
                    this.config.onRightClick(this.hovered, x, w)
                } else {
                    this.config.onClick(this.pressed, x, w)
                }
            }
            if (this.pressed) {
                if (this.moved) {
                    this.config.onDragEnd(this.pressed, x, w)
                } else {
                    this.config.onDragCancel(this.pressed, x, w)
                }
                this.pressed = this.moved = false
            }
        },
        onMouseOut: function(B, A, z) {
            var x = c.event.get(B, A),
            y;
            if (this.dom && (y = this.isLabel(B, A, true))) {
                this.config.onMouseLeave(this.viz.graph.getNode(y.id), z, x);
                this.hovered = false;
                return
            }
            var w = x.relatedTarget,
            C = this.canvas.getElement();
            while (w && w.parentNode) {
                if (C == w.parentNode) {
                    return
                }
                w = w.parentNode
            }
            if (this.hovered) {
                this.config.onMouseLeave(this.hovered, z, x);
                this.hovered = false
            }
        },
        onMouseOver: function(A, z, y) {
            var w = c.event.get(A, z),
            x;
            if (this.dom && (x = this.isLabel(A, z, true))) {
                this.hovered = this.viz.graph.getNode(x.id);
                this.config.onMouseEnter(this.hovered, y, w)
            }
        },
        onMouseMove: function(C, B, A) {
            var x, w = c.event.get(C, B);
            if (this.pressed) {
                this.moved = true;
                this.config.onDragMove(this.pressed, A, w);
                return
            }
            if (this.dom) {
                this.config.onMouseMove(this.hovered, A, w)
            } else {
                if (this.hovered) {
                    var D = this.hovered;
                    var z = D.nodeFrom ? this.etypes[D.getData("type")] : this.ntypes[D.getData("type")];
                    var y = z && z.contains && z.contains.call(this.fx, D, A.getPos());
                    if (y) {
                        this.config.onMouseMove(D, A, w);
                        return
                    } else {
                        this.config.onMouseLeave(D, A, w);
                        this.hovered = false
                    }
                }
                if (this.hovered = (A.getNode() || (this.config.enableForEdges && A.getEdge()))) {
                    this.config.onMouseEnter(this.hovered, A, w)
                } else {
                    this.config.onMouseMove(false, A, w)
                }
            }
        },
        onMouseWheel: function(x, w, y) {
            this.config.onMouseWheel(y, c.event.get(x, w))
        },
        onMouseDown: function(A, z, y) {
            var w = c.event.get(A, z),
            x;
            if (this.dom) {
                if (x = this.isLabel(A, z)) {
                    this.pressed = this.viz.graph.getNode(x.id)
                }
            } else {
                this.pressed = y.getNode() || (this.config.enableForEdges && y.getEdge())
            }
            this.pressed && this.config.onDragStart(this.pressed, y, w)
        },
        onTouchStart: function(A, z, y) {
            var w = c.event.get(A, z),
            x;
            if (this.dom && (x = this.isLabel(A, z))) {
                this.touched = this.viz.graph.getNode(x.id)
            } else {
                this.touched = y.getNode() || (this.config.enableForEdges && y.getEdge())
            }
            this.touched && this.config.onTouchStart(this.touched, y, w)
        },
        onTouchMove: function(z, y, x) {
            var w = c.event.get(z, y);
            if (this.touched) {
                this.touchMoved = true;
                this.config.onTouchMove(this.touched, x, w)
            }
        },
        onTouchEnd: function(z, y, x) {
            var w = c.event.get(z, y);
            if (this.touched) {
                if (this.touchMoved) {
                    this.config.onTouchEnd(this.touched, x, w)
                } else {
                    this.config.onTouchCancel(this.touched, x, w)
                }
                this.touched = this.touchMoved = false
            }
        }
    });
    o.Classes.Tips = new q({
        Implements: [t, h],
        initializePost: function() {
            if (document.body) {
                var w = c("_tooltip") || document.createElement("div");
                w.id = "_tooltip";
                w.className = "tip";
                c.extend(w.style, {
                    position: "absolute",
                    display: "none",
                    zIndex: 13000
                });
                document.body.appendChild(w);
                this.tip = w;
                this.node = false
            }
        },
        setAsProperty: c.lambda(true),
        onMouseOut: function(z, y) {
            var x = c.event.get(z, y);
            if (this.dom && this.isLabel(z, y, true)) {
                this.hide(true);
                return
            }
            var w = z.relatedTarget,
            A = this.canvas.getElement();
            while (w && w.parentNode) {
                if (A == w.parentNode) {
                    return
                }
                w = w.parentNode
            }
            this.hide(false)
        },
        onMouseOver: function(y, x) {
            var w;
            if (this.dom && (w = this.isLabel(y, x, false))) {
                this.node = this.viz.graph.getNode(w.id);
                this.config.onShow(this.tip, this.node, w)
            }
        },
        onMouseMove: function(z, y, w) {
            if (this.dom && this.isLabel(z, y)) {
                this.setTooltipPosition(c.event.getPos(z, y))
            }
            if (!this.dom) {
                var x = w.getNode();
                if (!x) {
                    this.hide(true);
                    return
                }
                if (this.config.force || !this.node || this.node.id != x.id) {
                    this.node = x;
                    this.config.onShow(this.tip, x, w.getContains())
                }
                this.setTooltipPosition(c.event.getPos(z, y))
            }
        },
        setTooltipPosition: function(F) {
            var B = this.tip,
            A = B.style,
            z = this.config;
            A.display = "";
            var D = {
                height: document.body.clientHeight,
                width: document.body.clientWidth
            };
            var C = {
                width: B.offsetWidth,
                height: B.offsetHeight
            };
            var w = z.offsetX,
            E = z.offsetY;
            A.top = ((F.y + E + C.height > D.height) ? (F.y - C.height - E) : F.y + E) + "px";
            A.left = ((F.x + C.width + w > D.width) ? (F.x - C.width - w) : F.x + w) + "px"
        },
        hide: function(w) {
            this.tip.style.display = "none";
            w && this.config.onHide()
        }
    });
    o.Classes.NodeStyles = new q({
        Implements: [t, h],
        initializePost: function() {
            this.fx = this.viz.fx;
            this.types = this.viz.fx.nodeTypes;
            this.nStyles = this.config;
            this.nodeStylesOnHover = this.nStyles.stylesHover;
            this.nodeStylesOnClick = this.nStyles.stylesClick;
            this.hoveredNode = false;
            this.fx.nodeFxAnimation = new u();
            this.down = false;
            this.move = false
        },
        onMouseOut: function(y, x) {
            this.down = this.move = false;
            if (!this.hoveredNode) {
                return
            }
            if (this.dom && this.isLabel(y, x, true)) {
                this.toggleStylesOnHover(this.hoveredNode, false)
            }
            var w = y.relatedTarget,
            z = this.canvas.getElement();
            while (w && w.parentNode) {
                if (z == w.parentNode) {
                    return
                }
                w = w.parentNode
            }
            this.toggleStylesOnHover(this.hoveredNode, false);
            this.hoveredNode = false
        },
        onMouseOver: function(z, y) {
            var w;
            if (this.dom && (w = this.isLabel(z, y, true))) {
                var x = this.viz.graph.getNode(w.id);
                if (x.selected) {
                    return
                }
                this.hoveredNode = x;
                this.toggleStylesOnHover(this.hoveredNode, true)
            }
        },
        onMouseDown: function(A, z, x, y) {
            if (y) {
                return
            }
            var w;
            if (this.dom && (w = this.isLabel(A, z))) {
                this.down = this.viz.graph.getNode(w.id)
            } else {
                if (!this.dom) {
                    this.down = x.getNode()
                }
            }
            this.move = false
        },
        onMouseUp: function(z, y, w, x) {
            if (x) {
                return
            }
            if (!this.move) {
                this.onClick(w.getNode())
            }
            this.down = this.move = false
        },
        getRestoredStyles: function(x, w) {
            var z = {},
            y = this["nodeStylesOn" + w];
            for (var A in y) {
                z[A] = x.styles["$" + A]
            }
            return z
        },
        toggleStylesOnHover: function(w, x) {
            if (this.nodeStylesOnHover) {
                this.toggleStylesOn("Hover", w, x)
            }
        },
        toggleStylesOnClick: function(w, x) {
            if (this.nodeStylesOnClick) {
                this.toggleStylesOn("Click", w, x)
            }
        },
        toggleStylesOn: function(A, w, C) {
            var D = this.viz;
            var B = this.nStyles;
            if (C) {
                var z = this;
                if (!w.styles) {
                    w.styles = c.merge(w.data, {})
                }
                for (var E in this["nodeStylesOn" + A]) {
                    var x = "$" + E;
                    if (! (x in w.styles)) {
                        w.styles[x] = w.getData(E)
                    }
                }
                D.fx.nodeFx(c.extend({
                    elements: {
                        id: w.id,
                        properties: z["nodeStylesOn" + A]
                    },
                    transition: i.Quart.easeOut,
                    duration: 300,
                    fps: 40
                },
                this.config))
            } else {
                var y = this.getRestoredStyles(w, A);
                D.fx.nodeFx(c.extend({
                    elements: {
                        id: w.id,
                        properties: y
                    },
                    transition: i.Quart.easeOut,
                    duration: 300,
                    fps: 40
                },
                this.config))
            }
        },
        onClick: function(w) {
            if (!w) {
                return
            }
            var x = this.nodeStylesOnClick;
            if (!x) {
                return
            }
            if (w.selected) {
                this.toggleStylesOnClick(w, false);
                delete w.selected
            } else {
                this.viz.graph.eachNode(function(z) {
                    if (z.selected) {
                        for (var y in x) {
                            z.setData(y, z.styles["$" + y], "end")
                        }
                        delete z.selected
                    }
                });
                this.toggleStylesOnClick(w, true);
                w.selected = true;
                delete w.hovered;
                this.hoveredNode = false
            }
        },
        onMouseMove: function(C, B, z) {
            if (this.down) {
                this.move = true
            }
            if (this.dom && this.isLabel(C, B)) {
                return
            }
            var A = this.nodeStylesOnHover;
            if (!A) {
                return
            }
            if (!this.dom) {
                if (this.hoveredNode) {
                    var x = this.types[this.hoveredNode.getData("type")];
                    var w = x && x.contains && x.contains.call(this.fx, this.hoveredNode, z.getPos());
                    if (w) {
                        return
                    }
                }
                var y = z.getNode();
                if (!this.hoveredNode && !y) {
                    return
                }
                if (y.hovered) {
                    return
                }
                if (y && !y.selected) {
                    this.fx.nodeFxAnimation.stopTimer();
                    this.viz.graph.eachNode(function(E) {
                        if (E.hovered && !E.selected) {
                            for (var D in A) {
                                E.setData(D, E.styles["$" + D], "end")
                            }
                            delete E.hovered
                        }
                    });
                    y.hovered = true;
                    this.hoveredNode = y;
                    this.toggleStylesOnHover(y, true)
                } else {
                    if (this.hoveredNode && !this.hoveredNode.selected) {
                        this.fx.nodeFxAnimation.stopTimer();
                        this.toggleStylesOnHover(this.hoveredNode, false);
                        delete this.hoveredNode.hovered;
                        this.hoveredNode = false
                    }
                }
            }
        }
    });
    o.Classes.Navigation = new q({
        Implements: [t, h],
        initializePost: function() {
            this.pos = false;
            this.pressed = false
        },
        onMouseWheel: function(z, y, w) {
            if (!this.config.zooming) {
                return
            }
            c.event.stop(c.event.get(z, y));
            var A = this.config.zooming / 1000,
            x = 1 + w * A;
            this.canvas.scale(x, x)
        },
        //拖拽
        onMouseDown: function(B, A, z) {
            if (!this.config.panning) {
                return
            }
            if (this.config.panning == "avoid nodes" && (this.dom ? this.isLabel(B, A) : z.getNode())) {
                return
            }
            this.pressed = true;
            this.pos = z.getPos();
            var y = this.canvas,
            x = y.translateOffsetX,
            w = y.translateOffsetY,
            D = y.scaleOffsetX,
            C = y.scaleOffsetY;
            this.pos.x *= D;
            this.pos.x += x;
            this.pos.y *= C;
            this.pos.y += w
        },
        onMouseMove: function(D, C, F) {
            if (!this.config.panning) {
                return
            }
            if (!this.pressed) {
                return
            }
            if (this.config.panning == "avoid nodes" && (this.dom ? this.isLabel(D, C) : F.getNode())) {
                return
            }
            var B = this.pos,
            E = F.getPos(),
            z = this.canvas,
            A = z.translateOffsetX,
            w = z.translateOffsetY,
            J = z.scaleOffsetX,
            H = z.scaleOffsetY;
            E.x *= J;
            E.y *= H;
            E.x += A;
            E.y += w;
            var I = E.x - B.x,
            G = E.y - B.y;
            this.pos = E;
            this.canvas.translate(I * 1 / J, G * 1 / H)
        },
        onMouseUp: function(z, y, x, w) {
            if (!this.config.panning) {
                return
            }
            this.pressed = false
        }
    });
    var l; (function() {
        var w = typeof HTMLCanvasElement,
        y = (w == "object" || w == "function");
        function x(z, A) {
            var B = document.createElement(z);
            for (var C in A) {
                if (typeof A[C] == "object") {
                    c.extend(B[C], A[C])
                } else {
                    B[C] = A[C]
                }
            }
            if (z == "canvas" && !y && G_vmlCanvasManager) {
                B = G_vmlCanvasManager.initElement(document.body.appendChild(B))
            }
            return B
        }
        $jit.Canvas = l = new q({
            canvases: [],
            pos: false,
            element: false,
            labelContainer: false,
            translateOffsetX: 0,
            translateOffsetY: 0,
            scaleOffsetX: 1,
            scaleOffsetY: 1,
            initialize: function(L, E) {
                this.viz = L;
                this.opt = this.config = E;
                var B = c.type(E.injectInto) == "string" ? E.injectInto: E.injectInto.id,
                K = E.type,
                C = B + "-label",
                z = c(B),
                D = E.width || z.offsetWidth,
                M = E.height || z.offsetHeight;
                this.id = B;
                var F = {
                    injectInto: B,
                    width: D,
                    height: M
                };
                this.element = x("div", {
                    id: B + "-canvaswidget",
                    style: {
                        position: "relative",
                        width: D + "px",
                        height: M + "px"
                    }
                });
                this.labelContainer = this.createLabelContainer(E.Label.type, C, F);
                this.canvases.push(new l.Base[K]({
                    config: c.extend({
                        idSuffix: "-canvas"
                    },
                    F),
                    plot: function(N) {
                        L.fx.plot()
                    },
                    resize: function() {
                        L.refresh()
                    }
                }));
                var G = E.background;
                if (G) {
                    var J = new l.Background[G.type](L, c.extend(G, F));
                    this.canvases.push(new l.Base[K](J))
                }
                var I = this.canvases.length;
                while (I--) {
                    this.element.appendChild(this.canvases[I].canvas);
                    if (I > 0) {
                        this.canvases[I].plot()
                    }
                }
                this.element.appendChild(this.labelContainer);
                z.appendChild(this.element);
                var A = null,
                H = this;
                c.addEvent(window, "scroll",
                function() {
                    clearTimeout(A);
                    A = setTimeout(function() {
                        H.getPos(true)
                    },
                    500)
                })
            },
            getCtx: function(z) {
                return this.canvases[z || 0].getCtx()
            },
            getConfig: function() {
                return this.opt
            },
            getElement: function() {
                return this.element
            },
            getSize: function(z) {
                return this.canvases[z || 0].getSize()
            },
            resize: function(D, z) {
                this.getPos(true);
                this.translateOffsetX = this.translateOffsetY = 0;
                this.scaleOffsetX = this.scaleOffsetY = 1;
                for (var B = 0,
                A = this.canvases.length; B < A; B++) {
                    this.canvases[B].resize(D, z)
                }
                var C = this.element.style;
                C.width = D + "px";
                C.height = z + "px";
                if (this.labelContainer) {
                    this.labelContainer.style.width = D + "px"
                }
            },
            translate: function(z, D, C) {
                this.translateOffsetX += z * this.scaleOffsetX;
                this.translateOffsetY += D * this.scaleOffsetY;
                for (var B = 0,
                A = this.canvases.length; B < A; B++) {
                    this.canvases[B].translate(z, D, C)
                }
            },
            scale: function(E, B, C) {
                var F = this.scaleOffsetX * E,
                D = this.scaleOffsetY * B;
                var H = this.translateOffsetX * (E - 1) / F,
                G = this.translateOffsetY * (B - 1) / D;
                this.scaleOffsetX = F;
                this.scaleOffsetY = D;
                for (var A = 0,
                z = this.canvases.length; A < z; A++) {
                    this.canvases[A].scale(E, B, true)
                }
                this.translate(H, G, false)
            },
            getPos: function(z) {
                if (z || !this.pos) {
                    return this.pos = c.getPos(this.getElement())
                }
                return this.pos
            },
            clear: function(z) {
                this.canvases[z || 0].clear()
            },
            path: function(A, B) {
                var z = this.canvases[0].getCtx();
                z.beginPath();
                B(z);
                z[A]();
                z.closePath()
            },
            createLabelContainer: function(B, F, E) {
                var D = "http://www.w3.org/2000/svg";
                if (B == "HTML" || B == "Native") {
                    return x("div", {
                        id: F,
                        style: {
                            overflow: "visible",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: E.width + "px",
                            height: 0
                        }
                    })
                } else {
                    if (B == "SVG") {
                        var C = document.createElementNS(D, "svg:svg");
                        C.setAttribute("width", E.width);
                        C.setAttribute("height", E.height);
                        var A = C.style;
                        A.position = "absolute";
                        A.left = A.top = "0px";
                        var z = document.createElementNS(D, "svg:g");
                        z.setAttribute("width", E.width);
                        z.setAttribute("height", E.height);
                        z.setAttribute("x", 0);
                        z.setAttribute("y", 0);
                        z.setAttribute("id", F);
                        C.appendChild(z);
                        return C
                    }
                }
            }
        });
        l.Base = {};
        l.Base["2D"] = new q({
            translateOffsetX: 0,
            translateOffsetY: 0,
            scaleOffsetX: 1,
            scaleOffsetY: 1,
            initialize: function(z) {
                this.viz = z;
                this.opt = z.config;
                this.size = false;
                this.createCanvas();
                this.translateToCenter()
            },
            createCanvas: function() {
                var A = this.opt,
                B = A.width,
                z = A.height;
                this.canvas = x("canvas", {
                    id: A.injectInto + A.idSuffix,
                    width: B,
                    height: z,
                    style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: B + "px",
                        height: z + "px"
                    }
                })
            },
            getCtx: function() {
                if (!this.ctx) {
                    return this.ctx = this.canvas.getContext("2d")
                }
                return this.ctx
            },
            getSize: function() {
                if (this.size) {
                    return this.size
                }
                var z = this.canvas;
                return this.size = {
                    width: z.width,
                    height: z.height
                }
            },
            translateToCenter: function(C) {
                var A = this.getSize(),
                B = C ? (A.width - C.width - this.translateOffsetX * 2) : A.width;
                height = C ? (A.height - C.height - this.translateOffsetY * 2) : A.height;
                var z = this.getCtx();
                C && z.scale(1 / this.scaleOffsetX, 1 / this.scaleOffsetY);
                z.translate(B / 2, height / 2)   //图形加载位置
            },
            resize: function(C, z) {
                var B = this.getSize(),
                A = this.canvas,
                D = A.style;
                this.size = false;
                A.width = C;
                A.height = z;
                D.width = C + "px";
                D.height = z + "px";
                if (!y) {
                    this.translateToCenter(B)
                } else {
                    this.translateToCenter()
                }
                this.translateOffsetX = this.translateOffsetY = 0;
                this.scaleOffsetX = this.scaleOffsetY = 1;
                this.clear();
                this.viz.resize(C, z, this)
            },
            translate: function(z, D, A) {
                var C = this.scaleOffsetX,
                B = this.scaleOffsetY;
                this.translateOffsetX += z * C;
                this.translateOffsetY += D * B;
                this.getCtx().translate(z, D); ! A && this.plot()
            },
            scale: function(z, B, A) {
                this.scaleOffsetX *= z;
                this.scaleOffsetY *= B;
                this.getCtx().scale(z, B); ! A && this.plot()
            },
            clear: function() {
                var B = this.getSize(),
                A = this.translateOffsetX,
                z = this.translateOffsetY,
                D = this.scaleOffsetX,
                C = this.scaleOffsetY;
                this.getCtx().clearRect(( - B.width / 2 - A) * 1 / D, ( - B.height / 2 - z) * 1 / C, B.width * 1 / D, B.height * 1 / C)
            },
            plot: function() {
                this.clear();
                this.viz.plot(this)
            }
        });
        l.Background = {};
        l.Background.Circles = new q({
            initialize: function(z, A) {
                this.viz = z;
                this.config = c.merge({
                    idSuffix: "-bkcanvas",
                    levelDistance: 100,
                    numberOfCircles: 6,
                    CanvasStyles: {},
                    offset: 0
                },
                A)
            },
            resize: function(A, z, B) {
                this.plot(B)
            },
            plot: function(z) {
                var A = z.canvas,
                G = z.getCtx(),
                D = this.config,
                F = D.CanvasStyles;
                for (var H in F) {
                    G[H] = F[H]
                }
                var B = D.numberOfCircles,
                E = D.levelDistance;
                for (var C = 1; C <= B; C++) {
                    G.beginPath();
                    G.arc(0, 0, E * C, 0, 2 * Math.PI, false);
                    G.stroke();
                    G.closePath()
                }
            }
        })
    })();
    var b = function(x, w) {
        this.theta = x || 0;
        this.rho = w || 0
    };
    $jit.Polar = b;
    b.prototype = {
        getc: function(w) {
            return this.toComplex(w)
        },
        getp: function() {
            return this
        },
        set: function(w) {
            w = w.getp();
            this.theta = w.theta;
            this.rho = w.rho
        },
        setc: function(w, z) {
            this.rho = Math.sqrt(w * w + z * z);
            this.theta = Math.atan2(z, w);
            if (this.theta < 0) {
                this.theta += Math.PI * 2
            }
        },
        setp: function(x, w) {
            this.theta = x;
            this.rho = w
        },
        clone: function() {
            return new b(this.theta, this.rho)
        },
        toComplex: function(A) {
            var w = Math.cos(this.theta) * this.rho;
            var z = Math.sin(this.theta) * this.rho;
            if (A) {
                return {
                    x: w,
                    y: z
                }
            }
            return new p(w, z)
        },
        add: function(w) {
            return new b(this.theta + w.theta, this.rho + w.rho)
        },
        scale: function(w) {
            return new b(this.theta, this.rho * w)
        },
        equals: function(w) {
            return this.theta == w.theta && this.rho == w.rho
        },
        $add: function(w) {
            this.theta = this.theta + w.theta;
            this.rho += w.rho;
            return this
        },
        $madd: function(w) {
            this.theta = (this.theta + w.theta) % (Math.PI * 2);
            this.rho += w.rho;
            return this
        },
        $scale: function(w) {
            this.rho *= w;
            return this
        },
        isZero: function() {
            var x = 0.0001,
            w = Math.abs;
            return w(this.theta) < x && w(this.rho) < x
        },
        interpolate: function(y, F) {
            var z = Math.PI,
            C = z * 2;
            var x = function(H) {
                var G = (H < 0) ? (H % C) + C: H % C;
                return G
            };
            var B = this.theta,
            E = y.theta;
            var A, D = Math.abs(B - E);
            if (D == z) {
                if (B > E) {
                    A = x((E + ((B - C) - E) * F))
                } else {
                    A = x((E - C + (B - (E)) * F))
                }
            } else {
                if (D >= z) {
                    if (B > E) {
                        A = x((E + ((B - C) - E) * F))
                    } else {
                        A = x((E - C + (B - (E - C)) * F))
                    }
                } else {
                    A = x((E + (B - E) * F))
                }
            }
            var w = (this.rho - y.rho) * F + y.rho;
            return {
                theta: A,
                rho: w
            }
        }
    };
    var k = function(x, w) {
        return new b(x, w)
    };
    b.KER = k(0, 0);
    var p = function(w, z) {
        this.x = w || 0;
        this.y = z || 0
    };
    $jit.Complex = p;
    p.prototype = {
        getc: function() {
            return this
        },
        getp: function(w) {
            return this.toPolar(w)
        },
        set: function(w) {
            w = w.getc(true);
            this.x = w.x;
            this.y = w.y
        },
        setc: function(w, z) {
            this.x = w;
            this.y = z
        },
        setp: function(x, w) {
            this.x = Math.cos(x) * w;
            this.y = Math.sin(x) * w
        },
        clone: function() {
            return new p(this.x, this.y)
        },
        toPolar: function(y) {
            var w = this.norm();
            var x = Math.atan2(this.y, this.x);
            if (x < 0) {
                x += Math.PI * 2
            }
            if (y) {
                return {
                    theta: x,
                    rho: w
                }
            }
            return new b(x, w)
        },
        norm: function() {
            return Math.sqrt(this.squaredNorm())
        },
        squaredNorm: function() {
            return this.x * this.x + this.y * this.y
        },
        add: function(w) {
            return new p(this.x + w.x, this.y + w.y)
        },
        prod: function(w) {
            return new p(this.x * w.x - this.y * w.y, this.y * w.x + this.x * w.y)
        },
        conjugate: function() {
            return new p(this.x, -this.y)
        },
        scale: function(w) {
            return new p(this.x * w, this.y * w)
        },
        equals: function(w) {
            return this.x == w.x && this.y == w.y
        },
        $add: function(w) {
            this.x += w.x;
            this.y += w.y;
            return this
        },
        $prod: function(A) {
            var w = this.x,
            z = this.y;
            this.x = w * A.x - z * A.y;
            this.y = z * A.x + w * A.y;
            return this
        },
        $conjugate: function() {
            this.y = -this.y;
            return this
        },
        $scale: function(w) {
            this.x *= w;
            this.y *= w;
            return this
        },
        $div: function(B) {
            var w = this.x,
            A = this.y;
            var z = B.squaredNorm();
            this.x = w * B.x + A * B.y;
            this.y = A * B.x - w * B.y;
            return this.$scale(1 / z)
        },
        isZero: function() {
            var x = 0.0001,
            w = Math.abs;
            return w(this.x) < x && w(this.y) < x
        }
    };
    var r = function(x, w) {
        return new p(x, w)
    };
    p.KER = r(0, 0);
    $jit.Graph = new q({
        initialize: function(y, x, w, C) {
            var A = {
                klass: p,
                Node: {}
            };
            this.Node = x;
            this.Edge = w;
            this.Label = C;
            this.opt = c.merge(A, y || {});
            this.nodes = {};
            this.edges = {};
            var z = this;
            this.nodeList = {};
            for (var B in j) {
                z.nodeList[B] = (function(D) {
                    return function() {
                        var E = Array.prototype.slice.call(arguments);
                        z.eachNode(function(F) {
                            F[D].apply(F, E)
                        })
                    }
                })(B)
            }
        },
        getNode: function(w) {
            if (this.hasNode(w)) {
                return this.nodes[w]
            }
            return false
        },
        get: function(w) {
            return this.getNode(w)
        },
        getByName: function(w) {
            for (var y in this.nodes) {
                var x = this.nodes[y];
                if (x.name == w) {
                    return x
                }
            }
            return false
        },
        getAdjacence: function(x, w) {
            if (x in this.edges) {
                return this.edges[x][w]
            }
            return false
        },
        addNode: function(x) {
            if (!this.nodes[x.id]) {
                var w = this.edges[x.id] = {};
                this.nodes[x.id] = new e.Node(c.extend({
                    id: x.id,
                    name: x.name,
                    data: c.merge(x.data || {},
                    {}),
                    adjacencies: w
                },
                this.opt.Node), this.opt.klass, this.Node, this.Edge, this.Label)
            }
            return this.nodes[x.id]
        },
        addAdjacence: function(z, y, x) {
            if (!this.hasNode(z.id)) {
                this.addNode(z)
            }
            if (!this.hasNode(y.id)) {
                this.addNode(y)
            }
            z = this.nodes[z.id];
            y = this.nodes[y.id];
            if (!z.adjacentTo(y)) {
                var A = this.edges[z.id] = this.edges[z.id] || {};
                var w = this.edges[y.id] = this.edges[y.id] || {};
                A[y.id] = w[z.id] = new e.Adjacence(z, y, x, this.Edge, this.Label);
                return A[y.id]
            }
            return this.edges[z.id][y.id]
        },
        removeNode: function(y) {
            if (this.hasNode(y)) {
                delete this.nodes[y];
                var x = this.edges[y];
                for (var w in x) {
                    delete this.edges[w][y]
                }
                delete this.edges[y]
            }
        },
        removeAdjacence: function(x, w) {
            delete this.edges[x][w];
            delete this.edges[w][x]
        },
        hasNode: function(w) {
            return w in this.nodes
        },
        empty: function() {
            this.nodes = {};
            this.edges = {}
        }
    });
    var e = $jit.Graph;
    var j; (function() {
        var w = function(D, F, A, C, E) {
            var B;
            A = A || "current";
            D = "$" + (D ? D + "-": "");
            if (A == "current") {
                B = this.data
            } else {
                if (A == "start") {
                    B = this.startData
                } else {
                    if (A == "end") {
                        B = this.endData
                    }
                }
            }
            var z = D + F;
            if (C) {
                return B[z]
            }
            if (!this.Config.overridable) {
                return E[F] || 0
            }
            return (z in B) ? B[z] : ((z in this.data) ? this.data[z] : (E[F] || 0))
        };
        var y = function(C, D, B, z) {
            z = z || "current";
            C = "$" + (C ? C + "-": "");
            var A;
            if (z == "current") {
                A = this.data
            } else {
                if (z == "start") {
                    A = this.startData
                } else {
                    if (z == "end") {
                        A = this.endData
                    }
                }
            }
            A[C + D] = B
        };
        var x = function(B, z) {
            B = "$" + (B ? B + "-": "");
            var A = this;
            c.each(z,
            function(D) {
                var C = B + D;
                delete A.data[C];
                delete A.endData[C];
                delete A.startData[C]
            })
        };
        j = {
            getData: function(B, z, A) {
                return w.call(this, "", B, z, A, this.Config)
            },
            setData: function(B, A, z) {
                y.call(this, "", B, A, z)
            },
            setDataset: function(C, D) {
                C = c.splat(C);
                for (var z in D) {
                    for (var B = 0,
                    E = c.splat(D[z]), A = C.length; B < A; B++) {
                        this.setData(z, E[B], C[B])
                    }
                }
            },
            removeData: function() {
                x.call(this, "", Array.prototype.slice.call(arguments))
            },
            getCanvasStyle: function(B, z, A) {
                return w.call(this, "canvas", B, z, A, this.Config.CanvasStyles)
            },
            setCanvasStyle: function(B, A, z) {
                y.call(this, "canvas", B, A, z)
            },
            setCanvasStyles: function(C, D) {
                C = c.splat(C);
                for (var z in D) {
                    for (var B = 0,
                    E = c.splat(D[z]), A = C.length; B < A; B++) {
                        this.setCanvasStyle(z, E[B], C[B])
                    }
                }
            },
            removeCanvasStyle: function() {
                x.call(this, "canvas", Array.prototype.slice.call(arguments))
            },
            getLabelData: function(B, z, A) {
                return w.call(this, "label", B, z, A, this.Label)
            },
            setLabelData: function(B, A, z) {
                y.call(this, "label", B, A, z)
            },
            setLabelDataset: function(C, D) {
                C = c.splat(C);
                for (var z in D) {
                    for (var B = 0,
                    E = c.splat(D[z]), A = C.length; B < A; B++) {
                        this.setLabelData(z, E[B], C[B])
                    }
                }
            },
            removeLabelData: function() {
                x.call(this, "label", Array.prototype.slice.call(arguments))
            }
        }
    })();
    e.Node = new q({
        initialize: function(z, w, y, x, B) {
            var A = {
                id: "",
                name: "",
                data: {},
                startData: {},
                endData: {},
                adjacencies: {},
                selected: false,
                drawn: false,
                exist: false,
                angleSpan: {
                    begin: 0,
                    end: 0
                },
                pos: new w,
                startPos: new w,
                endPos: new w
            };
            c.extend(this, c.extend(A, z));
            this.Config = this.Node = y;
            this.Edge = x;
            this.Label = B
        },
        adjacentTo: function(w) {
            return w.id in this.adjacencies
        },
        getAdjacency: function(w) {
            return this.adjacencies[w]
        },
        getPos: function(w) {
            w = w || "current";
            if (w == "current") {
                return this.pos
            } else {
                if (w == "end") {
                    return this.endPos
                } else {
                    if (w == "start") {
                        return this.startPos
                    }
                }
            }
        },
        setPos: function(x, w) {
            w = w || "current";
            var y;
            if (w == "current") {
                y = this.pos
            } else {
                if (w == "end") {
                    y = this.endPos
                } else {
                    if (w == "start") {
                        y = this.startPos
                    }
                }
            }
            y.set(x)
        }
    });
    e.Node.implement(j);
    e.Adjacence = new q({
        initialize: function(x, A, y, w, z) {
            this.nodeFrom = x;
            this.nodeTo = A;
            this.data = y || {};
            this.startData = {};
            this.endData = {};
            this.Config = this.Edge = w;
            this.Label = z
        }
    });
    e.Adjacence.implement(j);
    e.Util = {
        filter: function(x) {
            if (!x || !(c.type(x) == "string")) {
                return function() {
                    return true
                }
            }
            var w = x.split(" ");
            return function(z) {
                for (var y = 0; y < w.length; y++) {
                    if (z[w[y]]) {
                        return false
                    }
                }
                return true
            }
        },
        getNode: function(w, x) {
            return w.nodes[x]
        },
        eachNode: function(A, z, w) {
            var y = this.filter(w);
            for (var x in A.nodes) {
                if (y(A.nodes[x])) {
                    z(A.nodes[x])
                }
            }
        },
        each: function(y, x, w) {
            this.eachNode(y, x, w)
        },
        eachAdjacency: function(B, C, x) {
            var y = B.adjacencies,
            A = this.filter(x);
            for (var D in y) {
                var w = y[D];
                if (A(w)) {
                    if (w.nodeFrom != B) {
                        var z = w.nodeFrom;
                        w.nodeFrom = w.nodeTo;
                        w.nodeTo = z
                    }
                    C(w, D)
                }
            }
        },
        computeLevels: function(C, D, z, y) {
            z = z || 0;
            var A = this.filter(y);
            this.eachNode(C,
            function(E) {
                E._flag = false;
                E._depth = -1
            },
            y);
            var x = C.getNode(D);
            x._depth = z;
            var w = [x];
            while (w.length != 0) {
                var B = w.pop();
                B._flag = true;
                this.eachAdjacency(B,
                function(E) {
                    var F = E.nodeTo;
                    if (F._flag == false && A(F)) {
                        if (F._depth < 0) {
                            F._depth = B._depth + 1 + z
                        }
                        w.unshift(F)
                    }
                },
                y)
            }
        },
        eachBFS: function(B, C, A, x) {
            var y = this.filter(x);
            this.clean(B);
            var w = [B.getNode(C)];
            while (w.length != 0) {
                var z = w.pop();
                z._flag = true;
                A(z, z._depth);
                this.eachAdjacency(z,
                function(D) {
                    var E = D.nodeTo;
                    if (E._flag == false && y(E)) {
                        E._flag = true;
                        w.unshift(E)
                    }
                },
                x)
            }
        },
        eachLevel: function(A, E, x, B, z) {
            var D = A._depth,
            w = this.filter(z),
            C = this;
            x = x === false ? Number.MAX_VALUE - D: x; (function y(H, F, G) {
                var I = H._depth;
                if (I >= F && I <= G && w(H)) {
                    B(H, I)
                }
                if (I < G) {
                    C.eachAdjacency(H,
                    function(J) {
                        var K = J.nodeTo;
                        if (K._depth > I) {
                            y(K, F, G)
                        }
                    })
                }
            })(A, E + D, x + D)
        },
        eachSubgraph: function(x, y, w) {
            this.eachLevel(x, 0, false, y, w)
        },
        eachSubnode: function(x, y, w) {
            this.eachLevel(x, 1, 1, y, w)
        },
        anySubnode: function(z, y, x) {
            var w = false;
            y = y || c.lambda(true);
            var A = c.type(y) == "string" ?
            function(B) {
                return B[y]
            }: y;
            this.eachSubnode(z,
            function(B) {
                if (A(B)) {
                    w = true
                }
            },
            x);
            return w
        },
        getSubnodes: function(B, C, w) {
            var y = [],
            A = this;
            C = C || 0;
            var z, x;
            if (c.type(C) == "array") {
                z = C[0];
                x = C[1]
            } else {
                z = C;
                x = Number.MAX_VALUE - B._depth
            }
            this.eachLevel(B, z, x,
            function(D) {
                y.push(D)
            },
            w);
            return y
        },
        getParents: function(x) {
            var w = [];
            this.eachAdjacency(x,
            function(y) {
                var z = y.nodeTo;
                if (z._depth < x._depth) {
                    w.push(z)
                }
            });
            return w
        },
        isDescendantOf: function(z, A) {
            if (z.id == A) {
                return true
            }
            var y = this.getParents(z),
            w = false;
            for (var x = 0; ! w && x < y.length; x++) {
                w = w || this.isDescendantOf(y[x], A)
            }
            return w
        },
        clean: function(w) {
            this.eachNode(w,
            function(x) {
                x._flag = false
            })
        },
        getClosestNodeToOrigin: function(x, y, w) {
            return this.getClosestNodeToPos(x, b.KER, y, w)
        },
        getClosestNodeToPos: function(y, B, A, w) {
            var x = null;
            A = A || "current";
            B = B && B.getc(true) || p.KER;
            var z = function(D, C) {
                var F = D.x - C.x,
                E = D.y - C.y;
                return F * F + E * E
            };
            this.eachNode(y,
            function(C) {
                x = (x == null || z(C.getPos(A).getc(true), B) < z(x.getPos(A).getc(true), B)) ? C: x
            },
            w);
            return x
        }
    };
    c.each(["get", "getNode", "each", "eachNode", "computeLevels", "eachBFS", "clean", "getClosestNodeToPos", "getClosestNodeToOrigin"],
    function(w) {
        e.prototype[w] = function() {
            return e.Util[w].apply(e.Util, [this].concat(Array.prototype.slice.call(arguments)))
        }
    });
    c.each(["eachAdjacency", "eachLevel", "eachSubgraph", "eachSubnode", "anySubnode", "getSubnodes", "getParents", "isDescendantOf"],
    function(w) {
        e.Node.prototype[w] = function() {
            return e.Util[w].apply(e.Util, [this].concat(Array.prototype.slice.call(arguments)))
        }
    });
    e.Op = {
        options: {
            type: "nothing",
            duration: 2000,
            hideLabels: true,
            fps: 30
        },
        initialize: function(w) {
            this.viz = w
        },
        removeNode: function(B, z) {
            var w = this.viz;
            var x = c.merge(this.options, w.controller, z);
            var D = c.splat(B);
            var y, A, C;
            switch (x.type) {
            case "nothing":
                for (y = 0; y < D.length; y++) {
                    w.graph.removeNode(D[y])
                }
                break;
            case "replot":
                this.removeNode(D, {
                    type: "nothing"
                });
                w.labels.clearLabels();
                w.refresh(true);
                break;
            case "fade:seq":
            case "fade":
                A = this;
                for (y = 0; y < D.length; y++) {
                    C = w.graph.getNode(D[y]);
                    C.setData("alpha", 0, "end")
                }
                w.fx.animate(c.merge(x, {
                    modes: ["node-property:alpha"],
                    onComplete: function() {
                        A.removeNode(D, {
                            type: "nothing"
                        });
                        w.labels.clearLabels();
                        w.reposition();
                        w.fx.animate(c.merge(x, {
                            modes: ["linear"]
                        }))
                    }
                }));
                break;
            case "fade:con":
                A = this;
                for (y = 0; y < D.length; y++) {
                    C = w.graph.getNode(D[y]);
                    C.setData("alpha", 0, "end");
                    C.ignore = true
                }
                w.reposition();
                w.fx.animate(c.merge(x, {
                    modes: ["node-property:alpha", "linear"],
                    onComplete: function() {
                        A.removeNode(D, {
                            type: "nothing"
                        });
                        x.onComplete && x.onComplete()
                    }
                }));
                break;
            case "iter":
                A = this;
                w.fx.sequence({
                    condition: function() {
                        return D.length != 0
                    },
                    step: function() {
                        A.removeNode(D.shift(), {
                            type: "nothing"
                        });
                        w.labels.clearLabels()
                    },
                    onComplete: function() {
                        x.onComplete && x.onComplete()
                    },
                    duration: Math.ceil(x.duration / D.length)
                });
                break;
            default:
                this.doError()
            }
        },
        removeEdge: function(D, B) {
            var w = this.viz;
            var z = c.merge(this.options, w.controller, B);
            var y = (c.type(D[0]) == "string") ? [D] : D;
            var A, C, x;
            switch (z.type) {
            case "nothing":
                for (A = 0; A < y.length; A++) {
                    w.graph.removeAdjacence(y[A][0], y[A][1])
                }
                break;
            case "replot":
                this.removeEdge(y, {
                    type: "nothing"
                });
                w.refresh(true);
                break;
            case "fade:seq":
            case "fade":
                C = this;
                for (A = 0; A < y.length; A++) {
                    x = w.graph.getAdjacence(y[A][0], y[A][1]);
                    if (x) {
                        x.setData("alpha", 0, "end")
                    }
                }
                w.fx.animate(c.merge(z, {
                    modes: ["edge-property:alpha"],
                    onComplete: function() {
                        C.removeEdge(y, {
                            type: "nothing"
                        });
                        w.reposition();
                        w.fx.animate(c.merge(z, {
                            modes: ["linear"]
                        }))
                    }
                }));
                break;
            case "fade:con":
                C = this;
                for (A = 0; A < y.length; A++) {
                    x = w.graph.getAdjacence(y[A][0], y[A][1]);
                    if (x) {
                        x.setData("alpha", 0, "end");
                        x.ignore = true
                    }
                }
                w.reposition();
                w.fx.animate(c.merge(z, {
                    modes: ["edge-property:alpha", "linear"],
                    onComplete: function() {
                        C.removeEdge(y, {
                            type: "nothing"
                        });
                        z.onComplete && z.onComplete()
                    }
                }));
                break;
            case "iter":
                C = this;
                w.fx.sequence({
                    condition: function() {
                        return y.length != 0
                    },
                    step: function() {
                        C.removeEdge(y.shift(), {
                            type: "nothing"
                        });
                        w.labels.clearLabels()
                    },
                    onComplete: function() {
                        z.onComplete()
                    },
                    duration: Math.ceil(z.duration / y.length)
                });
                break;
            default:
                this.doError()
            }
        },
        sum: function(A, z) {
            var w = this.viz;
            var y = c.merge(this.options, w.controller, z),
            x = w.root;
            var C;
            w.root = z.id || w.root;
            switch (y.type) {
            case "nothing":
                C = w.construct(A);
                C.eachNode(function(E) {
                    E.eachAdjacency(function(F) {
                        w.graph.addAdjacence(F.nodeFrom, F.nodeTo, F.data)
                    })
                });
                break;
            case "replot":
                w.refresh(true);
                this.sum(A, {
                    type: "nothing"
                });
                w.refresh(true);
                break;
            case "fade:seq":
            case "fade":
            case "fade:con":
                that = this;
                C = w.construct(A);
                var D = this.preprocessSum(C);
                var B = !D ? ["node-property:alpha"] : ["node-property:alpha", "edge-property:alpha"];
                w.reposition();
                if (y.type != "fade:con") {
                    w.fx.animate(c.merge(y, {
                        modes: ["linear"],
                        onComplete: function() {
                            w.fx.animate(c.merge(y, {
                                modes: B,
                                onComplete: function() {
                                    y.onComplete()
                                }
                            }))
                        }
                    }))
                } else {
                    w.graph.eachNode(function(E) {
                        if (E.id != x && E.pos.isZero()) {
                            E.pos.set(E.endPos);
                            E.startPos.set(E.endPos)
                        }
                    });
                    w.fx.animate(c.merge(y, {
                        modes: ["linear"].concat(B)
                    }))
                }
                break;
            default:
                this.doError()
            }
        },
        morph: function(E, x, z) {
            z = z || {};
            var B = this.viz;
            var F = c.merge(this.options, B.controller, x),
            A = B.root;
            var C;
            B.root = x.id || B.root;
            switch (F.type) {
            case "nothing":
                C = B.construct(E);
                C.eachNode(function(I) {
                    var H = B.graph.hasNode(I.id);
                    I.eachAdjacency(function(M) {
                        var L = !!B.graph.getAdjacence(M.nodeFrom.id, M.nodeTo.id);
                        B.graph.addAdjacence(M.nodeFrom, M.nodeTo, M.data);
                        if (L) {
                            var K = B.graph.getAdjacence(M.nodeFrom.id, M.nodeTo.id);
                            for (var N in (M.data || {})) {
                                K.data[N] = M.data[N]
                            }
                        }
                    });
                    if (H) {
                        var G = B.graph.getNode(I.id);
                        for (var J in (I.data || {})) {
                            G.data[J] = I.data[J]
                        }
                    }
                });
                B.graph.eachNode(function(G) {
                    G.eachAdjacency(function(H) {
                        if (!C.getAdjacence(H.nodeFrom.id, H.nodeTo.id)) {
                            B.graph.removeAdjacence(H.nodeFrom.id, H.nodeTo.id)
                        }
                    });
                    if (!C.hasNode(G.id)) {
                        B.graph.removeNode(G.id)
                    }
                });
                break;
            case "replot":
                B.labels.clearLabels(true);
                this.morph(E, {
                    type: "nothing"
                });
                B.refresh(true);
                B.refresh(true);
                break;
            case "fade:seq":
            case "fade":
            case "fade:con":
                that = this;
                C = B.construct(E);
                var D = ("node-property" in z) && c.map(c.splat(z["node-property"]),
                function(G) {
                    return "$" + G
                });
                B.graph.eachNode(function(H) {
                    var I = C.getNode(H.id);
                    if (!I) {
                        H.setData("alpha", 1);
                        H.setData("alpha", 1, "start");
                        H.setData("alpha", 0, "end");
                        H.ignore = true
                    } else {
                        var G = I.data;
                        for (var J in G) {
                            if (D && (c.indexOf(D, J) > -1)) {
                                H.endData[J] = G[J]
                            } else {
                                H.data[J] = G[J]
                            }
                        }
                    }
                });
                B.graph.eachNode(function(G) {
                    if (G.ignore) {
                        return
                    }
                    G.eachAdjacency(function(H) {
                        if (H.nodeFrom.ignore || H.nodeTo.ignore) {
                            return
                        }
                        var I = C.getNode(H.nodeFrom.id);
                        var J = C.getNode(H.nodeTo.id);
                        if (!I.adjacentTo(J)) {
                            var H = B.graph.getAdjacence(I.id, J.id);
                            w = true;
                            H.setData("alpha", 1);
                            H.setData("alpha", 1, "start");
                            H.setData("alpha", 0, "end")
                        }
                    })
                });
                var w = this.preprocessSum(C);
                var y = !w ? ["node-property:alpha"] : ["node-property:alpha", "edge-property:alpha"];
                y[0] = y[0] + (("node-property" in z) ? (":" + c.splat(z["node-property"]).join(":")) : "");
                y[1] = (y[1] || "edge-property:alpha") + (("edge-property" in z) ? (":" + c.splat(z["edge-property"]).join(":")) : "");
                if ("label-property" in z) {
                    y.push("label-property:" + c.splat(z["label-property"]).join(":"))
                }
                if (B.reposition) {
                    B.reposition()
                } else {
                    B.compute("end")
                }
                B.graph.eachNode(function(G) {
                    if (G.id != A && G.pos.getp().equals(b.KER)) {
                        G.pos.set(G.endPos);
                        G.startPos.set(G.endPos)
                    }
                });
                B.fx.animate(c.merge(F, {
                    modes: [z.position || "polar"].concat(y),
                    onComplete: function() {
                        B.graph.eachNode(function(G) {
                            if (G.ignore) {
                                B.graph.removeNode(G.id)
                            }
                        });
                        B.graph.eachNode(function(G) {
                            G.eachAdjacency(function(H) {
                                if (H.ignore) {
                                    B.graph.removeAdjacence(H.nodeFrom.id, H.nodeTo.id)
                                }
                            })
                        });
                        F.onComplete()
                    }
                }));
                break;
            default:
            }
        },
        contract: function(y, x) {
            var w = this.viz;
            if (y.collapsed || !y.anySubnode(c.lambda(true))) {
                return
            }
            x = c.merge(this.options, w.config, x || {},
            {
                modes: ["node-property:alpha:span", "linear"]
            });
            y.collapsed = true; (function z(A) {
                A.eachSubnode(function(B) {
                    B.ignore = true;
                    B.setData("alpha", 0, x.type == "animate" ? "end": "current");
                    z(B)
                })
            })(y);
            if (x.type == "animate") {
                w.compute("end");
                if (w.rotated) {
                    w.rotate(w.rotated, "none", {
                        property: "end"
                    })
                } (function z(A) {
                    A.eachSubnode(function(B) {
                        B.setPos(y.getPos("end"), "end");
                        z(B)
                    })
                })(y);
                w.fx.animate(x)
            } else {
                if (x.type == "replot") {
                    w.refresh()
                }
            }
        },
        expand: function(y, x) {
            if (! ("collapsed" in y)) {
                return
            }
            var w = this.viz;
            x = c.merge(this.options, w.config, x || {},
            {
                modes: ["node-property:alpha:span", "linear"]
            });
            delete y.collapsed; (function z(A) {
                A.eachSubnode(function(B) {
                    delete B.ignore;
                    B.setData("alpha", 1, x.type == "animate" ? "end": "current");
                    z(B)
                })
            })(y);
            if (x.type == "animate") {
                w.compute("end");
                if (w.rotated) {
                    w.rotate(w.rotated, "none", {
                        property: "end"
                    })
                }
                w.fx.animate(x)
            } else {
                if (x.type == "replot") {
                    w.refresh()
                }
            }
        },
        preprocessSum: function(x) {
            var w = this.viz;
            x.eachNode(function(z) {
                if (!w.graph.hasNode(z.id)) {
                    w.graph.addNode(z);
                    var A = w.graph.getNode(z.id);
                    A.setData("alpha", 0);
                    A.setData("alpha", 0, "start");
                    A.setData("alpha", 1, "end")
                }
            });
            var y = false;
            x.eachNode(function(z) {
                z.eachAdjacency(function(A) {
                    var B = w.graph.getNode(A.nodeFrom.id);
                    var C = w.graph.getNode(A.nodeTo.id);
                    if (!B.adjacentTo(C)) {
                        var A = w.graph.addAdjacence(B, C, A.data);
                        if (B.startAlpha == B.endAlpha && C.startAlpha == C.endAlpha) {
                            y = true;
                            A.setData("alpha", 0);
                            A.setData("alpha", 0, "start");
                            A.setData("alpha", 1, "end")
                        }
                    }
                })
            });
            return y
        }
    };
    var a = {
        none: {
            render: c.empty,
            contains: c.lambda(false)
        },
        circle: {
            render: function(z, A, w, y) {
                var x = y.getCtx();
                x.beginPath();
                x.arc(A.x, A.y, w, 0, Math.PI * 2, true);
                x.closePath();
                x[z]()
            },
            contains: function(B, A, w) {
                var y = B.x - A.x,
                x = B.y - A.y,
                z = y * y + x * x;
                return z <= w * w
            }
        },
        ellipse: {
            render: function(C, E, w, F, x) {
                var G = x.getCtx(),
                z = 1,
                y = 1,
                D = 1,
                B = 1,
                A = 0;
                if (w > F) {
                    A = w / 2;
                    y = F / w;
                    B = w / F
                } else {
                    A = F / 2;
                    z = w / F;
                    D = F / w
                }
                G.save();
                G.scale(z, y);
                G.beginPath();
                G.arc(E.x * D, E.y * B, A, 0, Math.PI * 2, true);
                G.closePath();
                G[C]();
                G.restore()
            },
            contains: function(w, D, x, F) {
                var C = 0,
                B = 1,
                A = 1,
                z = 0,
                y = 0,
                E = 0;
                if (x > F) {
                    C = x / 2;
                    A = F / x
                } else {
                    C = F / 2;
                    B = x / F
                }
                z = (w.x - D.x) * (1 / B);
                y = (w.y - D.y) * (1 / A);
                E = z * z + y * y;
                return E <= C * C
            }
        },
        square: {
            render: function(x, z, y, w) {
                w.getCtx()[x + "Rect"](z.x - y, z.y - y, 2 * y, 2 * y)
            },
            contains: function(y, x, w) {
                return Math.abs(x.x - y.x) <= w && Math.abs(x.y - y.y) <= w
            }
        },
        rectangle: {
            render: function(z, A, y, w, x) {
                x.getCtx()[z + "Rect"](A.x - y / 2, A.y - w / 2, y, w)
            },
            contains: function(z, y, x, w) {
                return Math.abs(y.x - z.x) <= x / 2 && Math.abs(y.y - z.y) <= w / 2
            }
        },
        triangle: {
            render: function(C, D, z, w) {
                var G = w.getCtx(),
                y = D.x,
                x = D.y - z,
                F = y - z,
                E = D.y + z,
                B = y + z,
                A = E;
                G.beginPath();
                G.moveTo(y, x);
                G.lineTo(F, E);
                G.lineTo(B, A);
                G.closePath();
                G[C]()
            },
            contains: function(y, x, w) {
                return a.circle.contains(y, x, w)
            }
        },
        star: {
            render: function(A, C, B, x) {
                var w = x.getCtx(),
                z = Math.PI / 5;
                w.save();
                w.translate(C.x, C.y);
                w.beginPath();
                w.moveTo(B, 0);
                for (var y = 0; y < 9; y++) {
                    w.rotate(z);
                    if (y % 2 == 0) {
                        w.lineTo((B / 0.525731) * 0.200811, 0)
                    } else {
                        w.lineTo(B, 0)
                    }
                }
                w.closePath();
                w[A]();
                w.restore()
            },
            contains: function(y, x, w) {
                return a.circle.contains(y, x, w)
            }
        }
    };
    var m = {
        line: {
            render: function(z, y, x) {
                var w = x.getCtx();
                w.beginPath();
                w.moveTo(z.x, z.y);
                w.lineTo(y.x, y.y);
                w.stroke()
            },
            contains: function(G, y, B, E) {
                var z = Math.min,
                C = Math.max,
                x = z(G.x, y.x),
                F = C(G.x, y.x),
                w = z(G.y, y.y),
                D = C(G.y, y.y);
                if (B.x >= x && B.x <= F && B.y >= w && B.y <= D) {
                    if (Math.abs(y.x - G.x) <= E) {
                        return true
                    }
                    var A = (y.y - G.y) / (y.x - G.x) * (B.x - G.x) + G.y;
                    return Math.abs(A - B.y) <= E
                }
                return false
            }
        },
        arrow: {
            render: function(F, G, z, x, w) {
                var H = w.getCtx();
                if (x) {
                    var y = F;
                    F = G;
                    G = y
                }
                var C = new p(G.x - F.x, G.y - F.y);
                C.$scale(z / C.norm());
                var A = new p(G.x - C.x, G.y - C.y),
                B = new p( - C.y / 2, C.x / 2),
                E = A.add(B),
                D = A.$add(B.$scale( - 1));
                H.beginPath();
                H.moveTo(F.x, F.y);
                H.lineTo(G.x, G.y);
                H.stroke();
                H.beginPath();
                H.moveTo(E.x, E.y);
                H.lineTo(D.x, D.y);
                H.lineTo(G.x, G.y);
                H.closePath();
                H.fill()
            },
            contains: function(x, w, z, y) {
                return m.line.contains(x, w, z, y)
            }
        },
        hyperline: {
            render: function(D, E, w, y) {
                var F = y.getCtx();
                var z = A(D, E);
                if (z.a > 1000 || z.b > 1000 || z.ratio < 0) {
                    F.beginPath();
                    F.moveTo(D.x * w, D.y * w);
                    F.lineTo(E.x * w, E.y * w);
                    F.stroke()
                } else {
                    var C = Math.atan2(E.y - z.y, E.x - z.x);
                    var B = Math.atan2(D.y - z.y, D.x - z.x);
                    var x = x(C, B);
                    F.beginPath();
                    F.arc(z.x * w, z.y * w, z.ratio * w, C, B, x);
                    F.stroke()
                }
                function A(S, R) {
                    var K = (S.x * R.y - S.y * R.x),
                    G = K;
                    var J = S.squaredNorm(),
                    I = R.squaredNorm();
                    if (K == 0) {
                        return {
                            x: 0,
                            y: 0,
                            ratio: -1
                        }
                    }
                    var Q = (S.y * I - R.y * J + S.y - R.y) / K;
                    var O = (R.x * J - S.x * I + R.x - S.x) / G;
                    var P = -Q / 2;
                    var N = -O / 2;
                    var M = (Q * Q + O * O) / 4 - 1;
                    if (M < 0) {
                        return {
                            x: 0,
                            y: 0,
                            ratio: -1
                        }
                    }
                    var L = Math.sqrt(M);
                    var H = {
                        x: P,
                        y: N,
                        ratio: L > 1000 ? -1 : L,
                        a: Q,
                        b: O
                    };
                    return H
                }
                function x(G, H) {
                    return (G < H) ? ((G + Math.PI > H) ? false: true) : ((H + Math.PI > G) ? true: false)
                }
            },
            contains: c.lambda(false)
        }
    };
    e.Plot = {
        initialize: function(x, w) {
            this.viz = x;
            this.config = x.config;
            this.node = x.config.Node;
            this.edge = x.config.Edge;
            this.animation = new u;
            this.nodeTypes = new w.Plot.NodeTypes;
            this.edgeTypes = new w.Plot.EdgeTypes;
            this.labels = x.labels
        },
        nodeHelper: a,
        edgeHelper: m,
        Interpolator: {
            map: {
                border: "color",
                color: "color",
                width: "number",
                height: "number",
                dim: "number",
                alpha: "number",
                lineWidth: "number",
                angularWidth: "number",
                span: "number",
                valueArray: "array-number",
                dimArray: "array-number"
            },
            canvas: {
                globalAlpha: "number",
                fillStyle: "color",
                strokeStyle: "color",
                lineWidth: "number",
                shadowBlur: "number",
                shadowColor: "color",
                shadowOffsetX: "number",
                shadowOffsetY: "number",
                miterLimit: "number"
            },
            label: {
                size: "number",
                color: "color"
            },
            compute: function(y, x, w) {
                return y + (x - y) * w
            },
            moebius: function(D, C, F, z) {
                var B = z.scale( - F);
                if (B.norm() < 1) {
                    var w = B.x,
                    E = B.y;
                    var A = D.startPos.getc().moebiusTransformation(B);
                    D.pos.setc(A.x, A.y);
                    B.x = w;
                    B.y = E
                }
            },
            linear: function(x, w, A) {
                var z = x.startPos.getc(true);
                var y = x.endPos.getc(true);
                x.pos.setc(this.compute(z.x, y.x, A), this.compute(z.y, y.y, A))
            },
            polar: function(y, x, B) {
                var A = y.startPos.getp(true);
                var z = y.endPos.getp();
                var w = z.interpolate(A, B);
                y.pos.setp(w.theta, w.rho)
            },
            number: function(x, C, B, w, A) {
                var z = x[w](C, "start");
                var y = x[w](C, "end");
                x[A](C, this.compute(z, y, B))
            },
            color: function(y, w, E, B, z) {
                var C = c.hexToRgb(y[B](w, "start"));
                var D = c.hexToRgb(y[B](w, "end"));
                var A = this.compute;
                var x = c.rgbToHex([parseInt(A(C[0], D[0], E)), parseInt(A(C[1], D[1], E)), parseInt(A(C[2], D[2], E))]);
                y[z](w, x)
            },
            "array-number": function(z, y, J, G, B) {
                var H = z[G](y, "start"),
                I = z[G](y, "end"),
                K = [];
                for (var E = 0,
                A = H.length; E < A; E++) {
                    var x = H[E],
                    w = I[E];
                    if (x.length) {
                        for (var D = 0,
                        F = x.length,
                        C = []; D < F; D++) {
                            C.push(this.compute(x[D], w[D], J))
                        }
                        K.push(C)
                    } else {
                        K.push(this.compute(x, w, J))
                    }
                }
                z[B](y, K)
            },
            node: function(x, C, E, w, D, y) {
                w = this[w];
                if (C) {
                    var B = C.length;
                    for (var z = 0; z < B; z++) {
                        var A = C[z];
                        this[w[A]](x, A, E, D, y)
                    }
                } else {
                    for (var A in w) {
                        this[w[A]](x, A, E, D, y)
                    }
                }
            },
            edge: function(y, x, D, z, w, C) {
                var B = y.adjacencies;
                for (var A in B) {
                    this["node"](B[A], x, D, z, w, C)
                }
            },
            "node-property": function(x, w, y) {
                this["node"](x, w, y, "map", "getData", "setData")
            },
            "edge-property": function(x, w, y) {
                this["edge"](x, w, y, "map", "getData", "setData")
            },
            "label-property": function(x, w, y) {
                this["node"](x, w, y, "label", "getLabelData", "setLabelData")
            },
            "node-style": function(x, w, y) {
                this["node"](x, w, y, "canvas", "getCanvasStyle", "setCanvasStyle")
            },
            "edge-style": function(x, w, y) {
                this["edge"](x, w, y, "canvas", "getCanvasStyle", "setCanvasStyle")
            }
        },
        sequence: function(x) {
            var y = this;
            x = c.merge({
                condition: c.lambda(false),
                step: c.empty,
                onComplete: c.empty,
                duration: 200
            },
            x || {});
            var w = setInterval(function() {
                if (x.condition()) {
                    x.step()
                } else {
                    clearInterval(w);
                    x.onComplete()
                }
                y.viz.refresh(true)
            },
            x.duration)
        },
        prepare: function(C) {
            var B = this.viz.graph,
            z = {
                "node-property": {
                    getter: "getData",
                    setter: "setData"
                },
                "edge-property": {
                    getter: "getData",
                    setter: "setData"
                },
                "node-style": {
                    getter: "getCanvasStyle",
                    setter: "setCanvasStyle"
                },
                "edge-style": {
                    getter: "getCanvasStyle",
                    setter: "setCanvasStyle"
                }
            };
            var x = {};
            if (c.type(C) == "array") {
                for (var A = 0,
                w = C.length; A < w; A++) {
                    var y = C[A].split(":");
                    x[y.shift()] = y
                }
            } else {
                for (var D in C) {
                    if (D == "position") {
                        x[C.position] = []
                    } else {
                        x[D] = c.splat(C[D])
                    }
                }
            }
            B.eachNode(function(E) {
                E.startPos.set(E.pos);
                c.each(["node-property", "node-style"],
                function(H) {
                    if (H in x) {
                        var I = x[H];
                        for (var G = 0,
                        F = I.length; G < F; G++) {
                            E[z[H].setter](I[G], E[z[H].getter](I[G]), "start")
                        }
                    }
                });
                c.each(["edge-property", "edge-style"],
                function(F) {
                    if (F in x) {
                        var G = x[F];
                        E.eachAdjacency(function(I) {
                            for (var J = 0,
                            H = G.length; J < H; J++) {
                                I[z[F].setter](G[J], I[z[F].getter](G[J]), "start")
                            }
                        })
                    }
                })
            });
            return x
        },
        animate: function(z, y) {
            z = c.merge(this.viz.config, z || {});
            var A = this,
            x = this.viz,
            C = x.graph,
            D = this.Interpolator,
            B = z.type === "nodefx" ? this.nodeFxAnimation: this.animation;
            var w = this.prepare(z.modes);
            if (z.hideLabels) {
                this.labels.hideLabels(true)
            }
            B.setOptions(c.extend(z, {
                $animating: false,
                compute: function(E) {
                    C.eachNode(function(F) {
                        for (var G in w) {
                            D[G](F, w[G], E, y)
                        }
                    });
                    A.plot(z, this.$animating, E);
                    this.$animating = true
                },
                complete: function() {
                    if (z.hideLabels) {
                        A.labels.hideLabels(false)
                    }
                    A.plot(z);
                    z.onComplete()
                }
            })).start()
        },
        nodeFx: function(y) {
            var D = this.viz,
            E = D.graph,
            B = this.nodeFxAnimation,
            F = c.merge(this.viz.config, {
                elements: {
                    id: false,
                    properties: {}
                },
                reposition: false
            });
            y = c.merge(F, y || {},
            {
                onBeforeCompute: c.empty,
                onAfterCompute: c.empty
            });
            B.stopTimer();
            var C = y.elements.properties;
            if (!y.elements.id) {
                E.eachNode(function(H) {
                    for (var G in C) {
                        H.setData(G, C[G], "end")
                    }
                })
            } else {
                var w = c.splat(y.elements.id);
                c.each(w,
                function(I) {
                    var H = E.getNode(I);
                    if (H) {
                        for (var G in C) {
                            H.setData(G, C[G], "end")
                        }
                    }
                })
            }
            var A = [];
            for (var x in C) {
                A.push(x)
            }
            var z = ["node-property:" + A.join(":")];
            if (y.reposition) {
                z.push("linear");
                D.compute("end")
            }
            this.animate(c.merge(y, {
                modes: z,
                type: "nodefx"
            }))
        },
        plot: function(x, G) {
            var E = this.viz,
            B = E.graph,
            y = E.canvas,
            w = E.root,
            C = this,
            F = y.getCtx(),
            A = Math.min,
            x = x || this.viz.controller;
            x.clearCanvas && y.clear();
            var D = B.getNode(w);
            if (!D) {
                return
            }
            var z = !!D.visited;
            B.eachNode(function(I) {
                var H = I.getData("alpha");
                I.eachAdjacency(function(J) {
                    var K = J.nodeTo;
                    if ( !! K.visited === z && I.drawn && K.drawn) { ! G && x.onBeforePlotLine(J);
                        C.plotLine(J, y, G); ! G && x.onAfterPlotLine(J)
                    }
                });
                if (I.drawn) { ! G && x.onBeforePlotNode(I);
                    C.plotNode(I, y, G); ! G && x.onAfterPlotNode(I)
                }
                if (!C.labelsHidden && x.withLabels) {
                    if (I.drawn && H >= 0.95) {
                        C.labels.plotLabel(y, I, x)
                    } else {
                        C.labels.hideLabel(I, false)
                    }
                }
                I.visited = !z
            })
        },
        plotTree: function(A, x, E) {
            var B = this,
            C = this.viz,
            y = C.canvas,
            z = this.config,
            D = y.getCtx();
            var w = A.getData("alpha");
            A.eachSubnode(function(G) {
                if (x.plotSubtree(A, G) && G.exist && G.drawn) {
                    var F = A.getAdjacency(G.id); ! E && x.onBeforePlotLine(F);
                    B.plotLine(F, y, E); ! E && x.onAfterPlotLine(F);
                    B.plotTree(G, x, E)
                }
            });
            if (A.drawn) { ! E && x.onBeforePlotNode(A);
                this.plotNode(A, y, E); ! E && x.onAfterPlotNode(A);
                if (!x.hideLabels && x.withLabels && w >= 0.95) {
                    this.labels.plotLabel(y, A, x)
                } else {
                    this.labels.hideLabel(A, false)
                }
            } else {
                this.labels.hideLabel(A, true)
            }
        },
        plotNode: function(y, x, F) {
            var C = y.getData("type"),
            B = this.node.CanvasStyles;
            if (C != "none") {
                var w = y.getData("lineWidth"),
                A = y.getData("color"),
                z = y.getData("alpha"),
                D = x.getCtx();
                D.save();
                D.lineWidth = w;
                D.fillStyle = D.strokeStyle = A;
                D.globalAlpha = z;
                for (var E in B) {
                    D[E] = y.getCanvasStyle(E)
                }
                this.nodeTypes[C].render.call(this, y, x, F);
                D.restore()
            }
        },
        plotLine: function(C, x, G) {
            var B = C.getData("type"),
            z = this.edge.CanvasStyles;
            if (B != "none") {
                var w = C.getData("lineWidth"),
                y = C.getData("color"),
                E = x.getCtx(),
                A = C.nodeFrom,
                D = C.nodeTo;
                E.save();
                E.lineWidth = w;
                E.fillStyle = E.strokeStyle = y;
                E.globalAlpha = Math.min(A.getData("alpha"), D.getData("alpha"), C.getData("alpha"));
                for (var F in z) {
                    E[F] = C.getCanvasStyle(F)
                }
                this.edgeTypes[B].render.call(this, C, x, G);
                E.restore()
            }
        }
    };
    e.Plot3D = c.merge(e.Plot, {
        Interpolator: {
            linear: function(x, w, A) {
                var z = x.startPos.getc(true);
                var y = x.endPos.getc(true);
                x.pos.setc(this.compute(z.x, y.x, A), this.compute(z.y, y.y, A), this.compute(z.z, y.z, A))
            }
        },
        plotNode: function(x, w) {
            if (x.getData("type") == "none") {
                return
            }
            this.plotElement(x, w, {
                getAlpha: function() {
                    return x.getData("alpha")
                }
            })
        },
        plotLine: function(w, x) {
            if (w.getData("type") == "none") {
                return
            }
            this.plotElement(w, x, {
                getAlpha: function() {
                    return Math.min(w.nodeFrom.getData("alpha"), w.nodeTo.getData("alpha"), w.getData("alpha"))
                }
            })
        },
        plotElement: function(Y, E, z) {
            var V = E.getCtx(),
            F = new Matrix4,
            x = E.config.Scene.Lighting,
            Z = E.canvases[0],
            K = Z.program,
            X = Z.camera;
            if (!Y.geometry) {
                Y.geometry = new O3D[Y.getData("type")]
            }
            Y.geometry.update(Y);
            if (!Y.webGLVertexBuffer) {
                var J = [],
                B = [],
                P = [],
                N = 0,
                S = Y.geometry;
                for (var W = 0,
                U = S.vertices,
                H = S.faces,
                G = H.length; W < G; W++) {
                    var M = H[W],
                    D = U[M.a],
                    C = U[M.b],
                    A = U[M.c],
                    y = M.d ? U[M.d] : false,
                    R = M.normal;
                    J.push(D.x, D.y, D.z);
                    J.push(C.x, C.y, C.z);
                    J.push(A.x, A.y, A.z);
                    if (y) {
                        J.push(y.x, y.y, y.z)
                    }
                    P.push(R.x, R.y, R.z);
                    P.push(R.x, R.y, R.z);
                    P.push(R.x, R.y, R.z);
                    if (y) {
                        P.push(R.x, R.y, R.z)
                    }
                    B.push(N, N + 1, N + 2);
                    if (y) {
                        B.push(N, N + 2, N + 3);
                        N += 4
                    } else {
                        N += 3
                    }
                }
                Y.webGLVertexBuffer = V.createBuffer();
                V.bindBuffer(V.ARRAY_BUFFER, Y.webGLVertexBuffer);
                V.bufferData(V.ARRAY_BUFFER, new Float32Array(J), V.STATIC_DRAW);
                Y.webGLFaceBuffer = V.createBuffer();
                V.bindBuffer(V.ELEMENT_ARRAY_BUFFER, Y.webGLFaceBuffer);
                V.bufferData(V.ELEMENT_ARRAY_BUFFER, new Uint16Array(B), V.STATIC_DRAW);
                Y.webGLFaceCount = B.length;
                Y.webGLNormalBuffer = V.createBuffer();
                V.bindBuffer(V.ARRAY_BUFFER, Y.webGLNormalBuffer);
                V.bufferData(V.ARRAY_BUFFER, new Float32Array(P), V.STATIC_DRAW)
            }
            F.multiply(X.matrix, Y.geometry.matrix);
            V.uniformMatrix4fv(K.viewMatrix, false, F.flatten());
            V.uniformMatrix4fv(K.projectionMatrix, false, X.projectionMatrix.flatten());
            var L = Matrix4.makeInvert(F);
            L.$transpose();
            V.uniformMatrix4fv(K.normalMatrix, false, L.flatten());
            var T = c.hexToRgb(Y.getData("color"));
            T.push(z.getAlpha());
            V.uniform4f(K.color, T[0] / 255, T[1] / 255, T[2] / 255, T[3]);
            V.uniform1i(K.enableLighting, x.enable);
            if (x.enable) {
                if (x.ambient) {
                    var O = x.ambient;
                    V.uniform3f(K.ambientColor, O[0], O[1], O[2])
                }
                if (x.directional) {
                    var Q = x.directional,
                    T = Q.color,
                    I = Q.direction,
                    w = new Vector3(I.x, I.y, I.z).normalize().$scale( - 1);
                    V.uniform3f(K.lightingDirection, w.x, w.y, w.z);
                    V.uniform3f(K.directionalColor, T[0], T[1], T[2])
                }
            }
            V.bindBuffer(V.ARRAY_BUFFER, Y.webGLVertexBuffer);
            V.vertexAttribPointer(K.position, 3, V.FLOAT, false, 0, 0);
            V.bindBuffer(V.ARRAY_BUFFER, Y.webGLNormalBuffer);
            V.vertexAttribPointer(K.normal, 3, V.FLOAT, false, 0, 0);
            V.bindBuffer(V.ELEMENT_ARRAY_BUFFER, Y.webGLFaceBuffer);
            V.drawElements(V.TRIANGLES, Y.webGLFaceCount, V.UNSIGNED_SHORT, 0)
        }
    });
    e.Label = {};
    e.Label.Native = new q({
        initialize: function(w) {
            this.viz = w
        },
        plotLabel: function(y, z, x) {
            var w = y.getCtx();
            var A = z.pos.getc(true);
            w.font = z.getLabelData("style") + " " + z.getLabelData("size") + "px " + z.getLabelData("family");
            w.textAlign = z.getLabelData("textAlign");
            w.fillStyle = w.strokeStyle = z.getLabelData("color");
            w.textBaseline = z.getLabelData("textBaseline");
            this.renderLabel(y, z, x)
        },
        renderLabel: function(y, z, x) {
            var w = y.getCtx();
            var A = z.pos.getc(true);
            w.fillText(z.name, A.x, A.y + z.getData("height") / 2)
        },
        hideLabel: c.empty,
        hideLabels: c.empty
    });
    e.Label.DOM = new q({
        labelsHidden: false,
        labelContainer: false,
        labels: {},
        getLabelContainer: function() {
            return this.labelContainer ? this.labelContainer: this.labelContainer = document.getElementById(this.viz.config.labelContainer)
        },
        getLabel: function(w) {
            return (w in this.labels && this.labels[w] != null) ? this.labels[w] : this.labels[w] = document.getElementById(w)
        },
        hideLabels: function(x) {
            var w = this.getLabelContainer();
            if (x) {
                w.style.display = "none"
            } else {
                w.style.display = ""
            }
            this.labelsHidden = x
        },
        clearLabels: function(w) {
            for (var x in this.labels) {
                if (w || !this.viz.graph.hasNode(x)) {
                    this.disposeLabel(x);
                    delete this.labels[x]
                }
            }
        },
        disposeLabel: function(x) {
            var w = this.getLabel(x);
            if (w && w.parentNode) {
                w.parentNode.removeChild(w)
            }
        },
        hideLabel: function(A, w) {
            A = c.splat(A);
            var x = w ? "": "none",
            y,
            z = this;
            c.each(A,
            function(C) {
                var B = z.getLabel(C.id);
                if (B) {
                    B.style.display = x
                }
            })
        },
        fitsInCanvas: function(y, w) {
            var x = w.getSize();
            if (y.x >= x.width || y.x < 0 || y.y >= x.height || y.y < 0) {
                return false
            }
            return true
        }
    });
    e.Label.HTML = new q({
        Implements: e.Label.DOM,
        plotLabel: function(z, A, y) {
            var B = A.id,
            w = this.getLabel(B);
            if (!w && !(w = document.getElementById(B))) {
                w = document.createElement("div");
                var x = this.getLabelContainer();
                w.id = B;
                w.className = "node";
                w.style.position = "absolute";
                y.onCreateLabel(w, A);
                x.appendChild(w);
                this.labels[A.id] = w
            }
            this.placeLabel(w, A, y)//显示标签
        }
    });
    e.Label.SVG = new q({
        Implements: e.Label.DOM,
        plotLabel: function(z, B, y) {
            var D = B.id,
            w = this.getLabel(D);
            if (!w && !(w = document.getElementById(D))) {
                var A = "http://www.w3.org/2000/svg";
                w = document.createElementNS(A, "svg:text");
                var C = document.createElementNS(A, "svg:tspan");
                w.appendChild(C);
                var x = this.getLabelContainer();
                w.setAttribute("id", D);
                w.setAttribute("class", "node");
                x.appendChild(w);
                y.onCreateLabel(w, B);
                this.labels[B.id] = w
            }
            this.placeLabel(w, B, y)
        }
    });
    e.Geom = new q({
        initialize: function(w) {
            this.viz = w;
            this.config = w.config;
            this.node = w.config.Node;
            this.edge = w.config.Edge
        },
        translate: function(x, w) {
            w = c.splat(w);
            this.viz.graph.eachNode(function(y) {
                c.each(w,
                function(z) {
                    y.getPos(z).$add(x)
                })
            })
        },
        setRightLevelToShow: function(z, w, B) {
            var A = this.getRightLevelToShow(z, w),
            y = this.viz.labels,
            x = c.merge({
                execShow: true,
                execHide: true,
                onHide: c.empty,
                onShow: c.empty
            },
            B || {});
            z.eachLevel(0, this.config.levelsToShow,
            function(D) {
                var C = D._depth - z._depth;
                if (C > A) {
                    x.onHide(D);
                    if (x.execHide) {
                        D.drawn = false;
                        D.exist = false;
                        y.hideLabel(D, false)
                    }
                } else {
                    x.onShow(D);
                    if (x.execShow) {
                        D.exist = true
                    }
                }
            });
            z.drawn = true
        },
        getRightLevelToShow: function(z, x) {
            var w = this.config;
            var A = w.levelsToShow;
            var y = w.constrained;
            if (!y) {
                return A
            }
            while (!this.treeFitsInCanvas(z, x, A) && A > 1) {
                A--
            }
            return A
        }
    });
    var d = {
        construct: function(x) {
            var y = (c.type(x) == "array");
            var w = new e(this.graphOptions, this.config.Node, this.config.Edge, this.config.Label);
            if (!y) { (function(z, B) {
                    z.addNode(B);
                    if (B.children) {
                        for (var A = 0,
                        C = B.children; A < C.length; A++) {
                            z.addAdjacence(B, C[A]);
                            arguments.callee(z, C[A])
                        }
                    }
                })(w, x)
            } else { (function(H, I) {
                    var A = function(M) {
                        for (var L = 0,
                        J = I.length; L < J; L++) {
                            if (I[L].id == M) {
                                return I[L]
                            }
                        }
                        var K = {
                            id: M,
                            name: M
                        };
                        return H.addNode(K)
                    };
                    for (var E = 0,
                    B = I.length; E < B; E++) {
                        H.addNode(I[E]);
                        var F = I[E].adjacencies;
                        if (F) {
                            for (var C = 0,
                            G = F.length; C < G; C++) {
                                var z = F[C],
                                D = {};
                                if (typeof F[C] != "string") {
                                    D = c.merge(z.data, {});
                                    z = z.nodeTo
                                }
                                H.addAdjacence(I[E], A(z), D)
                            }
                        }
                    }
                })(w, x)
            }
            return w
        },
        loadJSON: function(x, w) {
            this.json = x;
            if (this.labels && this.labels.clearLabels) {
                this.labels.clearLabels(true)
            }
            this.graph = this.construct(x);
            if (c.type(x) != "array") {
                this.root = x.id
            } else {
                this.root = x[w ? w: 0].id
            }
        },
        toJSON: function(A) {
            A = A || "tree";
            if (A == "tree") {
                var y = {};
                var x = this.graph.getNode(this.root);
                var y = (function w(D) {
                    var B = {};
                    B.id = D.id;
                    B.name = D.name;
                    B.data = D.data;
                    var C = [];
                    D.eachSubnode(function(E) {
                        C.push(w(E))
                    });
                    B.children = C;
                    return B
                })(x);
                return y
            } else {
                var y = [];
                var z = !!this.graph.getNode(this.root).visited;
                this.graph.eachNode(function(C) {
                    var B = {};
                    B.id = C.id;
                    B.name = C.name;
                    B.data = C.data;
                    var D = [];
                    C.eachAdjacency(function(E) {
                        var G = E.nodeTo;
                        if ( !! G.visited === z) {
                            var F = {};
                            F.nodeTo = G.id;
                            F.data = E.data;
                            D.push(F)
                        }
                    });
                    B.adjacencies = D;
                    y.push(B);
                    C.visited = !z
                });
                return y
            }
        }
    };
    var g = $jit.Layouts = {};
    var f = {
        label: null,
        compute: function(z, A, x) {
            this.initializeLabel(x);
            var w = this.label,
            y = w.style;
            z.eachNode(function(D) {
                var H = D.getData("autoWidth"),
                I = D.getData("autoHeight");
                if (H || I) {
                    delete D.data.$width;
                    delete D.data.$height;
                    delete D.data.$dim;
                    var B = D.getData("width"),
                    J = D.getData("height");
                    y.width = H ? "auto": B + "px";
                    y.height = I ? "auto": J + "px";
                    w.innerHTML = D.name;
                    var F = w.offsetWidth,
                    C = w.offsetHeight;
                    var G = D.getData("type");
                    if (c.indexOf(["circle", "square", "triangle", "star"], G) === -1) {
                        D.setData("width", F);
                        D.setData("height", C)
                    } else {
                        var E = F > C ? F: C;
                        D.setData("width", E);
                        D.setData("height", E);
                        D.setData("dim", E)
                    }
                }
            })
        },
        initializeLabel: function(w) {
            if (!this.label) {
                this.label = document.createElement("div");
                document.body.appendChild(this.label)
            }
            this.setLabelStyles(w)
        },
        setLabelStyles: function(w) {
            c.extend(this.label.style, {
                visibility: "hidden",
                position: "absolute",
                width: "auto",
                height: "auto"
            });
            this.label.className = "jit-autoadjust-label"
        }
    };
    g.Tree = (function() {
        var F = Array.prototype.slice;
        function D(P, K, H, N, I) {
            var M = K.Node;
            var J = K.multitree;
            if (M.overridable) {
                var O = -1,
                L = -1;
                P.eachNode(function(S) {
                    if (S._depth == H && (!J || ("$orn" in S.data) && S.data.$orn == N)) {
                        var Q = S.getData("width", I);
                        var R = S.getData("height", I);
                        O = (O < Q) ? Q: O;
                        L = (L < R) ? R: L
                    }
                });
                return {
                    width: O < 0 ? M.width: O,
                    height: L < 0 ? M.height: L
                }
            } else {
                return M
            }
        }
        function G(I, L, K, H) {
            var J = (H == "left" || H == "right") ? "y": "x";
            I.getPos(L)[J] += K
        }
        function B(I, J) {
            var H = [];
            c.each(I,
            function(K) {
                K = F.call(K);
                K[0] += J;
                K[1] += J;
                H.push(K)
            });
            return H
        }
        function E(K, H) {
            if (K.length == 0) {
                return H
            }
            if (H.length == 0) {
                return K
            }
            var J = K.shift(),
            I = H.shift();
            return [[J[0], I[1]]].concat(E(K, H))
        }
        function z(H, I) {
            I = I || [];
            if (H.length == 0) {
                return I
            }
            var J = H.pop();
            return z(H, E(J, I))
        }
        function C(K, I, L, H, J) {
            if (K.length <= J || I.length <= J) {
                return 0
            }
            var N = K[J][1],
            M = I[J][0];
            return Math.max(C(K, I, L, H, ++J) + L, N - M + H)
        }
        function A(K, I, H) {
            function J(N, P, M) {
                if (P.length <= M) {
                    return []
                }
                var O = P[M],
                L = C(N, O, I, H, 0);
                return [L].concat(J(E(N, B(O, L)), P, ++M))
            }
            return J([], K, 0)
        }
        function x(L, K, J) {
            function H(O, Q, N) {
                if (Q.length <= N) {
                    return []
                }
                var P = Q[N],
                M = -C(P, O, K, J, 0);
                return [M].concat(H(E(B(P, M), O), Q, ++N))
            }
            L = F.call(L);
            var I = H([], L.reverse(), 0);
            return I.reverse()
        }
        function w(N, L, I, O) {
            var J = A(N, L, I),
            M = x(N, L, I);
            if (O == "left") {
                M = J
            } else {
                if (O == "right") {
                    J = M
                }
            }
            for (var K = 0,
            H = []; K < J.length; K++) {
                H[K] = (J[K] + M[K]) / 2
            }
            return H
        }
        function y(H, R, I, Y, W) {
            var K = Y.multitree;
            var Q = ["x", "y"],
            N = ["width", "height"];
            var J = +(W == "left" || W == "right");
            var O = Q[J],
            X = Q[1 - J];
            var T = Y.Node;
            var M = N[J],
            V = N[1 - J];
            var L = Y.siblingOffset;
            var U = Y.subtreeOffset;
            var S = Y.align;
            function P(ab, af, aj) {
                var aa = ab.getData(M, I);
                var ai = af || (ab.getData(V, I));
                var am = [],
                ak = [],
                ag = false;
                var Z = ai + Y.levelDistance;
                ab.eachSubnode(function(ao) {
                    if (ao.exist && (!K || ("$orn" in ao.data) && ao.data.$orn == W)) {
                        if (!ag) {
                            ag = D(H, Y, ao._depth, W, I)
                        }
                        var an = P(ao, ag[V], aj + Z);
                        am.push(an.tree);
                        ak.push(an.extent)
                    }
                });
                var ae = w(ak, U, L, S);
                for (var ad = 0,
                ac = [], ah = []; ad < am.length; ad++) {
                    G(am[ad], I, ae[ad], W);
                    ah.push(B(ak[ad], ae[ad]))
                }
                var al = [[ - aa / 2, aa / 2]].concat(z(ah));
                ab.getPos(I)[O] = 0;
                if (W == "top" || W == "left") {
                    ab.getPos(I)[X] = aj
                } else {
                    ab.getPos(I)[X] = -aj
                }
                return {
                    tree: ab,
                    extent: al
                }
            }
            P(R, false, 0)
        }
        return new q({
            compute: function(J, I) {
                var K = J || "start";
                var H = this.graph.getNode(this.root);
                c.extend(H, {
                    drawn: true,
                    exist: true,
                    selected: true
                });
                f.compute(this.graph, K, this.config);
                if ( !! I || !("_depth" in H)) {
                    this.graph.computeLevels(this.root, 0, "ignore")
                }
                this.computePositions(H, K)
            },
            computePositions: function(L, H) {
                var J = this.config;
                var I = J.multitree;
                var O = J.align;
                var K = O !== "center" && J.indent;
                var P = J.orientation;
                var N = I ? ["top", "right", "bottom", "left"] : [P];
                var M = this;
                c.each(N,
                function(Q) {
                    y(M.graph, L, H, M.config, Q, H);
                    var R = ["x", "y"][ + (Q == "left" || Q == "right")]; (function S(T) {
                        T.eachSubnode(function(U) {
                            if (U.exist && (!I || ("$orn" in U.data) && U.data.$orn == Q)) {
                                U.getPos(H)[R] += T.getPos(H)[R];
                                if (K) {
                                    U.getPos(H)[R] += O == "left" ? K: -K
                                }
                                S(U)
                            }
                        })
                    })(L)
                })
            }
        })
    })();
    $jit.ST = (function() {
        var x = [];
        function y(D) {
            D = D || this.clickedNode;
            if (!this.config.constrained) {
                return []
            }
            var A = this.geom;
            var H = this.graph;
            var B = this.canvas;
            var z = D._depth,
            E = [];
            H.eachNode(function(I) {
                if (I.exist && !I.selected) {
                    if (I.isDescendantOf(D.id)) {
                        if (I._depth <= z) {
                            E.push(I)
                        }
                    } else {
                        E.push(I)
                    }
                }
            });
            var F = A.getRightLevelToShow(D, B);
            D.eachLevel(F, F,
            function(I) {
                if (I.exist && !I.selected) {
                    E.push(I)
                }
            });
            for (var G = 0; G < x.length; G++) {
                var C = this.graph.getNode(x[G]);
                if (!C.isDescendantOf(D.id)) {
                    E.push(C)
                }
            }
            return E
        }
        function w(B) {
            var A = [],
            z = this.config;
            B = B || this.clickedNode;
            this.clickedNode.eachLevel(0, z.levelsToShow,
            function(C) {
                if (z.multitree && !("$orn" in C.data) && C.anySubnode(function(D) {
                    return D.exist && !D.drawn
                })) {
                    A.push(C)
                } else {
                    if (C.drawn && !C.anySubnode("drawn")) {
                        A.push(C)
                    }
                }
            });
            return A
        }
        return new q({
            Implements: [d, o, g.Tree],
            initialize: function(z) {
                var B = $jit.ST;
                var A = {
                    levelsToShow: 1,//显示树的层数
                    levelDistance: 30,
                    constrained: true,
                    Node: {
                        type: "rectangle"
                    },
                    duration: 700,
                    offsetX: 0,
                    offsetY: 0
                };
                this.controller = this.config = c.merge(n("Canvas", "Fx", "Tree", "Node", "Edge", "Controller", "Tips", "NodeStyles", "Events", "Navigation", "Label"), A, z);
                var C = this.config;
                if (C.useCanvas) {
                    this.canvas = C.useCanvas;
                    this.config.labelContainer = this.canvas.id + "-label"
                } else {
                    if (C.background) {
                        C.background = c.merge({
                            type: "Circles"
                        },
                        C.background)
                    }
                    this.canvas = new l(this, C);
                    this.config.labelContainer = (typeof C.injectInto == "string" ? C.injectInto: C.injectInto.id) + "-label"
                }
                this.graphOptions = {
                    klass: p
                };
                this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge);
                this.labels = new B.Label[C.Label.type](this);
                this.fx = new B.Plot(this, B);
                this.op = new B.Op(this);
                this.group = new B.Group(this);
                this.geom = new B.Geom(this);
                this.clickedNode = null;
                this.initializeExtras()
            },
            plot: function() {
                this.fx.plot(this.controller)
            },
            switchPosition: function(E, D, C) {
                var z = this.geom,
                A = this.fx,
                B = this;
                if (!A.busy) {
                    A.busy = true;
                    this.contract({
                        onComplete: function() {
                            z.switchOrientation(E);
                            B.compute("end", false);
                            A.busy = false;
                            if (D == "animate") {
                                B.onClick(B.clickedNode.id, C)
                            } else {
                                if (D == "replot") {
                                    B.select(B.clickedNode.id, C)
                                }
                            }
                        }
                    },
                    E)
                }
            },
            switchAlignment: function(B, A, z) {
                this.config.align = B;
                if (A == "animate") {
                    this.select(this.clickedNode.id, z)
                } else {
                    if (A == "replot") {
                        this.onClick(this.clickedNode.id, z)
                    }
                }
            },
            addNodeInPath: function(z) {
                x.push(z);
                this.select((this.clickedNode && this.clickedNode.id) || this.root)
            },
            clearNodesInPath: function(z) {
                x.length = 0;
                this.select((this.clickedNode && this.clickedNode.id) || this.root)
            },
            refresh: function() {
                this.reposition();
                this.select((this.clickedNode && this.clickedNode.id) || this.root)
            },
            reposition: function() {
                this.graph.computeLevels(this.root, 0, "ignore");
                this.geom.setRightLevelToShow(this.clickedNode, this.canvas);
                this.graph.eachNode(function(z) {
                    if (z.exist) {
                        z.drawn = true
                    }
                });
                this.compute("end")
            },
            requestNodes: function(B, C) {
                var A = c.merge(this.controller, C),
                z = this.config.levelsToShow;
                if (A.request) {
                    var E = [],
                    D = B._depth;
                    B.eachLevel(0, z,
                    function(F) {
                        if (F.drawn && !F.anySubnode()) {
                            E.push(F);
                            F._level = z - (F._depth - D)
                        }
                    });
                    this.group.requestNodes(E, A)
                } else {
                    A.onComplete()
                }
            },
            contract: function(D, E) {
                var C = this.config.orientation;
                var z = this.geom,
                B = this.group;
                if (E) {
                    z.switchOrientation(E)
                }
                var A = y.call(this);
                if (E) {
                    z.switchOrientation(C)
                }
                B.contract(A, c.merge(this.controller, D))
            },
            move: function(A, B) {
                this.compute("end", false);
                var z = B.Move,
                C = {
                    x: z.offsetX,
                    y: z.offsetY
                };
                if (z.enable) {
                    this.geom.translate(A.endPos.add(C).$scale( - 1), "end")
                }
                this.fx.animate(c.merge(this.controller, {
                    modes: ["linear"]
                },
                B))
            },
            expand: function(A, B) {
                var z = w.call(this, A);
                this.group.expand(z, c.merge(this.controller, B))
            },
            selectPath: function(C) {
                var B = this;
                this.graph.eachNode(function(E) {
                    E.selected = false
                });
                function D(F) {
                    if (F == null || F.selected) {
                        return
                    }
                    F.selected = true;
                    c.each(B.group.getSiblings([F])[F.id],
                    function(G) {
                        G.exist = true;
                        G.drawn = true
                    });
                    var E = F.getParents();
                    E = (E.length > 0) ? E[0] : null;
                    D(E)
                }
                for (var z = 0,
                A = [C.id].concat(x); z < A.length; z++) {
                    D(this.graph.getNode(A[z]))
                }
            },
            setRoot: function(G, F, E) {
                if (this.busy) {
                    return
                }
                this.busy = true;
                var D = this,
                B = this.canvas;
                var z = this.graph.getNode(this.root);
                var A = this.graph.getNode(G);
                function C() {
                    if (this.config.multitree && A.data.$orn) {
                        var I = A.data.$orn;
                        var J = {
                            left: "right",
                            right: "left",
                            top: "bottom",
                            bottom: "top"
                        } [I];
                        z.data.$orn = J; (function H(K) {
                            K.eachSubnode(function(L) {
                                if (L.id != G) {
                                    L.data.$orn = J;
                                    H(L)
                                }
                            })
                        })(z);
                        delete A.data.$orn
                    }
                    this.root = G;
                    this.clickedNode = A;
                    this.graph.computeLevels(this.root, 0, "ignore");
                    this.geom.setRightLevelToShow(A, B, {
                        execHide: false,
                        onShow: function(K) {
                            if (!K.drawn) {
                                K.drawn = true;
                                K.setData("alpha", 1, "end");
                                K.setData("alpha", 0);
                                K.pos.setc(A.pos.x, A.pos.y)
                            }
                        }
                    });
                    this.compute("end");
                    this.busy = true;
                    this.fx.animate({
                        modes: ["linear", "node-property:alpha"],
                        onComplete: function() {
                            D.busy = false;
                            D.onClick(G, {
                                onComplete: function() {
                                    E && E.onComplete()
                                }
                            })
                        }
                    })
                }
                delete z.data.$orns;
                if (F == "animate") {
                    C.call(this);
                    D.selectPath(A)
                } else {
                    if (F == "replot") {
                        C.call(this);
                        this.select(this.root)
                    }
                }
            },
            addSubtree: function(z, B, A) {
                if (B == "replot") {
                    this.op.sum(z, c.extend({
                        type: "replot"
                    },
                    A || {}))
                } else {
                    if (B == "animate") {
                        this.op.sum(z, c.extend({
                            type: "fade:seq"
                        },
                        A || {}))
                    }
                }
            },
            removeSubtree: function(E, A, D, C) {
                var B = this.graph.getNode(E),
                z = [];
                B.eachLevel( + !A, false,
                function(F) {
                    z.push(F.id)
                });
                if (D == "replot") {
                    this.op.removeNode(z, c.extend({
                        type: "replot"
                    },
                    C || {}))
                } else {
                    if (D == "animate") {
                        this.op.removeNode(z, c.extend({
                            type: "fade:seq"
                        },
                        C || {}))
                    }
                }
            },
            select: function(z, C) {
                var H = this.group,
                F = this.geom;
                var D = this.graph.getNode(z),
                B = this.canvas;
                var G = this.graph.getNode(this.root);
                var A = c.merge(this.controller, C);
                var E = this;
                A.onBeforeCompute(D);
                this.selectPath(D);
                this.clickedNode = D;
                this.requestNodes(D, {
                    onComplete: function() {
                        H.hide(H.prepare(y.call(E)), A);
                        F.setRightLevelToShow(D, B);
                        E.compute("current");
                        E.graph.eachNode(function(K) {
                            var J = K.pos.getc(true);
                            K.startPos.setc(J.x, J.y);
                            K.endPos.setc(J.x, J.y);
                            K.visited = false
                        });
                        var I = {
                            x: A.offsetX,
                            y: A.offsetY
                        };
                        E.geom.translate(D.endPos.add(I).$scale( - 1), ["start", "current", "end"]);
                        H.show(w.call(E));
                        E.plot();
                        A.onAfterCompute(E.clickedNode);
                        A.onComplete()
                    }
                })
            },
            onClick: function(A, H) {
                var C = this.canvas,
                G = this,
                z = this.geom,
                D = this.config;
                var F = {
                    Move: {
                        enable: true,
                        offsetX: D.offsetX || 0,
                        offsetY: D.offsetY || 0
                    },
                    setRightLevelToShowConfig: false,
                    onBeforeRequest: c.empty,
                    onBeforeContract: c.empty,
                    onBeforeMove: c.empty,
                    onBeforeExpand: c.empty
                };
                var B = c.merge(this.controller, F, H);
                if (!this.busy) {
                    this.busy = true;
                    var E = this.graph.getNode(A);
                    this.selectPath(E, this.clickedNode);
                    this.clickedNode = E;
                    B.onBeforeCompute(E);
                    B.onBeforeRequest(E);
                    this.requestNodes(E, {
                        onComplete: function() {
                            B.onBeforeContract(E);
                            G.contract({
                                onComplete: function() {
                                    z.setRightLevelToShow(E, C, B.setRightLevelToShowConfig);
                                    B.onBeforeMove(E);
                                    G.move(E, {
                                        Move: B.Move,
                                        onComplete: function() {
                                            B.onBeforeExpand(E);
                                            G.expand(E, {
                                                onComplete: function() {
                                                    G.busy = false;
                                                    B.onAfterCompute(A);
                                                    B.onComplete()
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
    })();
    $jit.ST.$extend = true;
    $jit.ST.Op = new q({
        Implements: e.Op
    });
    $jit.ST.Group = new q({
        initialize: function(w) {
            this.viz = w;
            this.canvas = w.canvas;
            this.config = w.config;
            this.animation = new u;
            this.nodes = null
        },
        requestNodes: function(B, A) {
            var z = 0,
            x = B.length,
            D = {};
            var y = function() {
                A.onComplete()
            };
            var w = this.viz;
            if (x == 0) {
                y()
            }
            for (var C = 0; C < x; C++) {
                D[B[C].id] = B[C];
                A.request(B[C].id, B[C]._level, {
                    onComplete: function(F, E) {
                        if (E && E.children) {
                            E.id = F;
                            w.op.sum(E, {
                                type: "nothing"
                            })
                        }
                        if (++z == x) {
                            w.graph.computeLevels(w.root, 0);
                            y()
                        }
                    }
                })
            }
        },
        contract: function(y, x) {
            var w = this.viz;
            var z = this;
            y = this.prepare(y);
            this.animation.setOptions(c.merge(x, {
                $animating: false,
                compute: function(A) {
                    if (A == 1) {
                        A = 0.99
                    }
                    z.plotStep(1 - A, x, this.$animating);
                    this.$animating = "contract"
                },
                complete: function() {
                    z.hide(y, x)
                }
            })).start()
        },
        hide: function(y, x) {
            var w = this.viz;
            for (var z = 0; z < y.length; z++) {
                if (true || !x || !x.request) {
                    y[z].eachLevel(1, false,
                    function(B) {
                        if (B.exist) {
                            c.extend(B, {
                                drawn: false,
                                exist: false
                            })
                        }
                    })
                } else {
                    var A = [];
                    y[z].eachLevel(1, false,
                    function(B) {
                        A.push(B.id)
                    });
                    w.op.removeNode(A, {
                        type: "nothing"
                    });
                    w.labels.clearLabels()
                }
            }
            x.onComplete()
        },
        expand: function(x, w) {
            var y = this;
            this.show(x);
            this.animation.setOptions(c.merge(w, {
                $animating: false,
                compute: function(z) {
                    y.plotStep(z, w, this.$animating);
                    this.$animating = "expand"
                },
                complete: function() {
                    y.plotStep(undefined, w, false);
                    w.onComplete()
                }
            })).start()
        },
        show: function(w) {
            var x = this.config;
            this.prepare(w);
            c.each(w,
            function(z) {
                if (x.multitree && !("$orn" in z.data)) {
                    delete z.data.$orns;
                    var y = " ";
                    z.eachSubnode(function(A) {
                        if (("$orn" in A.data) && y.indexOf(A.data.$orn) < 0 && A.exist && !A.drawn) {
                            y += A.data.$orn + " "
                        }
                    });
                    z.data.$orns = y
                }
                z.eachLevel(0, x.levelsToShow,
                function(A) {
                    if (A.exist) {
                        A.drawn = true
                    }
                })
            })
        },
        prepare: function(w) {
            this.nodes = this.getNodesWithChildren(w);
            return this.nodes
        },
        getNodesWithChildren: function(y) {
            var x = [],
            A = this.config,
            w = this.viz.root;
            y.sort(function(E, D) {
                return (E._depth <= D._depth) - (E._depth >= D._depth)
            });
            for (var B = 0; B < y.length; B++) {
                if (y[B].anySubnode("exist")) {
                    for (var z = B + 1,
                    C = false; ! C && z < y.length; z++) {
                        if (!A.multitree || "$orn" in y[z].data) {
                            C = C || y[B].isDescendantOf(y[z].id)
                        }
                    }
                    if (!C) {
                        x.push(y[B])
                    }
                }
            }
            return x
        },
        plotStep: function(G, C, I) {
            var F = this.viz,
            z = this.config,
            y = F.canvas,
            H = y.getCtx(),
            w = this.nodes;
            var B, A;
            var x = {};
            for (B = 0; B < w.length; B++) {
                A = w[B];
                x[A.id] = [];
                var E = z.multitree && !("$orn" in A.data);
                var D = E && A.data.$orns;
                A.eachSubgraph(function(J) {
                    if (E && D && D.indexOf(J.data.$orn) > 0 && J.drawn) {
                        J.drawn = false;
                        x[A.id].push(J)
                    } else {
                        if ((!E || !D) && J.drawn) {
                            J.drawn = false;
                            x[A.id].push(J)
                        }
                    }
                });
                A.drawn = true
            }
            if (w.length > 0) {
                F.fx.plot()
            }
            for (B in x) {
                c.each(x[B],
                function(J) {
                    J.drawn = true
                })
            }
            for (B = 0; B < w.length; B++) {
                A = w[B];
                H.save();
                F.fx.plotSubtree(A, C, G, I);
                H.restore()
            }
        },
        getSiblings: function(w) {
            var x = {};
            c.each(w,
            function(A) {
                var z = A.getParents();
                if (z.length == 0) {
                    x[A.id] = [A]
                } else {
                    var y = [];
                    z[0].eachSubnode(function(B) {
                        y.push(B)
                    });
                    x[A.id] = y
                }
            });
            return x
        }
    });
    $jit.ST.Geom = new q({
        Implements: e.Geom,
        switchOrientation: function(w) {
            this.config.orientation = w
        },
        dispatch: function() {
            var x = Array.prototype.slice.call(arguments);
            var y = x.shift(),
            w = x.length;
            var z = function(A) {
                return typeof A == "function" ? A() : A
            };
            if (w == 2) {
                return (y == "top" || y == "bottom") ? z(x[0]) : z(x[1])
            } else {
                if (w == 4) {
                    switch (y) {
                    case "top":
                        return z(x[0]);
                    case "right":
                        return z(x[1]);
                    case "bottom":
                        return z(x[2]);
                    case "left":
                        return z(x[3])
                    }
                }
            }
            return undefined
        },
        getSize: function(E, D) {
            var C = E.data,
            z = this.config;
            var y = z.siblingOffset;
            var B = (z.multitree && ("$orn" in C) && C.$orn) || z.orientation;
            var x = E.getData("width") + y;
            var A = E.getData("height") + y;
            if (!D) {
                return this.dispatch(B, A, x)
            } else {
                return this.dispatch(B, x, A)
            }
        },
        getTreeBaseSize: function(A, B, x) {
            var y = this.getSize(A, true),
            w = 0,
            z = this;
            if (x(B, A)) {
                return y
            }
            if (B === 0) {
                return 0
            }
            A.eachSubnode(function(C) {
                w += z.getTreeBaseSize(C, B - 1, x)
            });
            return (y > w ? y: w) + this.config.subtreeOffset
        },
        getEdge: function(C, B, A) {
            var y = function(E, w) {
                return function() {
                    return C.pos.add(new p(E, w))
                }
            };
            var D = this.node;
            var x = C.getData("width");
            var z = C.getData("height");
            if (B == "begin") {
                if (D.align == "center") {
                    return this.dispatch(A, y(0, z / 2), y( - x / 2, 0), y(0, -z / 2), y(x / 2, 0))
                } else {
                    if (D.align == "left") {
                        return this.dispatch(A, y(0, z), y(0, 0), y(0, 0), y(x, 0))
                    } else {
                        if (D.align == "right") {
                            return this.dispatch(A, y(0, 0), y( - x, 0), y(0, -z), y(0, 0))
                        } else {
                            throw "align: not implemented"
                        }
                    }
                }
            } else {
                if (B == "end") {
                    if (D.align == "center") {
                        return this.dispatch(A, y(0, -z / 2), y(x / 2, 0), y(0, z / 2), y( - x / 2, 0))
                    } else {
                        if (D.align == "left") {
                            return this.dispatch(A, y(0, 0), y(x, 0), y(0, z), y(0, 0))
                        } else {
                            if (D.align == "right") {
                                return this.dispatch(A, y(0, -z), y(0, 0), y(0, 0), y( - x, 0))
                            } else {
                                throw "align: not implemented"
                            }
                        }
                    }
                }
            }
        },
        getScaledTreePosition: function(B, D) {
            var C = this.node;
            var x = B.getData("width");
            var A = B.getData("height");
            var z = (this.config.multitree && ("$orn" in B.data) && B.data.$orn) || this.config.orientation;
            var y = function(E, w) {
                return function() {
                    return B.pos.add(new p(E, w)).$scale(1 - D)
                }
            };
            if (C.align == "left") {
                return this.dispatch(z, y(0, A), y(0, 0), y(0, 0), y(x, 0))
            } else {
                if (C.align == "center") {
                    return this.dispatch(z, y(0, A / 2), y( - x / 2, 0), y(0, -A / 2), y(x / 2, 0))
                } else {
                    if (C.align == "right") {
                        return this.dispatch(z, y(0, 0), y( - x, 0), y(0, -A), y(0, 0))
                    } else {
                        throw "align: not implemented"
                    }
                }
            }
        },
        treeFitsInCanvas: function(B, w, C) {
            var y = w.getSize();
            var z = (this.config.multitree && ("$orn" in B.data) && B.data.$orn) || this.config.orientation;
            var x = this.dispatch(z, y.width, y.height);
            var A = this.getTreeBaseSize(B, C,
            function(E, D) {
                return E === 0 || !D.anySubnode()
            });
            return (A < x)
        }
    });
    $jit.ST.Plot = new q({
        Implements: e.Plot,
        plotSubtree: function(z, w, A, E) {
            var C = this.viz,
            x = C.canvas,
            y = C.config;
            A = Math.min(Math.max(0.001, A), 1);
            if (A >= 0) {
                z.drawn = false;
                var D = x.getCtx();
                var B = C.geom.getScaledTreePosition(z, A);
                D.translate(B.x, B.y);
                D.scale(A, A)
            }
            this.plotTree(z, c.merge(w, {
                withLabels: true,
                hideLabels: !!A,
                plotSubtree: function(I, G) {
                    var F = y.multitree && !("$orn" in z.data);
                    var H = F && z.getData("orns");
                    return ! F || H.indexOf(z.getData("orn")) > -1
                }
            }), E);
            if (A >= 0) {
                z.drawn = true
            }
        },
        getAlignedPos: function(B, z, w) {
            var y = this.node;
            var A, x;
            if (y.align == "center") {
                A = {
                    x: B.x - z / 2,
                    y: B.y - w / 2
                }
            } else {
                if (y.align == "left") {
                    x = this.config.orientation;
                    if (x == "bottom" || x == "top") {
                        A = {
                            x: B.x - z / 2,
                            y: B.y
                        }
                    } else {
                        A = {
                            x: B.x,
                            y: B.y - w / 2
                        }
                    }
                } else {
                    if (y.align == "right") {
                        x = this.config.orientation;
                        if (x == "bottom" || x == "top") {
                            A = {
                                x: B.x - z / 2,
                                y: B.y - w
                            }
                        } else {
                            A = {
                                x: B.x - z,
                                y: B.y - w / 2
                            }
                        }
                    } else {
                        throw "align: not implemented"
                    }
                }
            }
            return A
        },
        getOrientation: function(w) {
            var y = this.config;
            var x = y.orientation;
            if (y.multitree) {
                var z = w.nodeFrom;
                var A = w.nodeTo;
                x = (("$orn" in z.data) && z.data.$orn) || (("$orn" in A.data) && A.data.$orn)
            }
            return x
        }
    });
    $jit.ST.Label = {};
    $jit.ST.Label.Native = new q({
        Implements: e.Label.Native,
        renderLabel: function(z, B, y) {
            var x = z.getCtx(),
            D = B.pos.getc(true),
            A = B.getData("width"),
            w = B.getData("height"),
            C = this.viz.fx.getAlignedPos(D, A, w);
            x.fillText(B.name, C.x + A / 2, C.y + w / 2)
        }
    });
    $jit.ST.Label.DOM = new q({
        Implements: e.Label.DOM,
        placeLabel: function(P, J, F) {
            var B = J.pos.getc(true),
            O = this.viz.config,
            K = O.Node,
            x = this.viz.canvas,
            C = J.getData("width"),
            M = J.getData("height"),
            y = x.getSize(),
            G,
            N;
            var A = x.translateOffsetX,
            z = x.translateOffsetY,
            E = x.scaleOffsetX,
            D = x.scaleOffsetY,
            I = B.x * E + A,
            H = B.y * D + z;
            if (K.align == "center") {
                G = {
                    x: Math.round(I - C / 2 + y.width / 2),
                    y: Math.round(H - M / 2 + y.height / 2)
                }
            } else {
                if (K.align == "left") {
                    N = O.orientation;
                    if (N == "bottom" || N == "top") {
                        G = {
                            x: Math.round(I - C / 2 + y.width / 2),
                            y: Math.round(H + y.height / 2)
                        }
                    } else {
                        G = {
                            x: Math.round(I + y.width / 2),
                            y: Math.round(H - M / 2 + y.height / 2)
                        }
                    }
                } else {
                    if (K.align == "right") {
                        N = O.orientation;
                        if (N == "bottom" || N == "top") {
                            G = {
                                x: Math.round(I - C / 2 + y.width / 2),
                                y: Math.round(H - M + y.height / 2)
                            }
                        } else {
                            G = {
                                x: Math.round(I - C + y.width / 2),
                                y: Math.round(H - M / 2 + y.height / 2)
                            }
                        }
                    } else {
                        throw "align: not implemented"
                    }
                }
            }
            var L = P.style;
            L.left = G.x + "px";
            L.top = G.y + "px";
            L.display = this.fitsInCanvas(G, x) ? "": "none";
            F.onPlaceLabel(P, J)
        }
    });
    $jit.ST.Label.SVG = new q({
        Implements: [$jit.ST.Label.DOM, e.Label.SVG],
        initialize: function(w) {
            this.viz = w
        }
    });
    $jit.ST.Label.HTML = new q({
        Implements: [$jit.ST.Label.DOM, e.Label.HTML],
        initialize: function(w) {
            this.viz = w
        }
    });
    $jit.ST.Plot.NodeTypes = new q({
        none: {
            render: c.empty,
            contains: c.lambda(false)
        },
        circle: {
            render: function(x, w) {
                var z = x.getData("dim"),
                A = this.getAlignedPos(x.pos.getc(true), z, z),
                y = z / 2;
                this.nodeHelper.circle.render("fill", {
                    x: A.x + y,
                    y: A.y + y
                },
                y, w)
            },
            contains: function(w, A) {
                var y = w.getData("dim"),
                z = this.getAlignedPos(w.pos.getc(true), y, y),
                x = y / 2;
                this.nodeHelper.circle.contains({
                    x: z.x + x,
                    y: z.y + x
                },
                A, x)
            }
        },
        square: {
            render: function(x, w) {
                var z = x.getData("dim"),
                y = z / 2,
                A = this.getAlignedPos(x.pos.getc(true), z, z);
                this.nodeHelper.square.render("fill", {
                    x: A.x + y,
                    y: A.y + y
                },
                y, w)
            },
            contains: function(w, A) {
                var y = w.getData("dim"),
                z = this.getAlignedPos(w.pos.getc(true), y, y),
                x = y / 2;
                this.nodeHelper.square.contains({
                    x: z.x + x,
                    y: z.y + x
                },
                A, x)
            }
        },
        ellipse: {
            render: function(z, x) {
                var y = z.getData("width"),
                w = z.getData("height"),
                A = this.getAlignedPos(z.pos.getc(true), y, w);
                this.nodeHelper.ellipse.render("fill", {
                    x: A.x + y / 2,
                    y: A.y + w / 2
                },
                y, w, x)
            },
            contains: function(y, A) {
                var x = y.getData("width"),
                w = y.getData("height"),
                z = this.getAlignedPos(y.pos.getc(true), x, w);
                this.nodeHelper.ellipse.contains({
                    x: z.x + x / 2,
                    y: z.y + w / 2
                },
                A, x, w)
            }
        },
        rectangle: {
            render: function(z, x) {
                var y = z.getData("width"),
                w = z.getData("height"),
                A = this.getAlignedPos(z.pos.getc(true), y, w);
                this.nodeHelper.rectangle.render("fill", {
                    x: A.x + y / 2,
                    y: A.y + w / 2
                },
                y, w, x)
            },
            contains: function(y, A) {
                var x = y.getData("width"),
                w = y.getData("height"),
                z = this.getAlignedPos(y.pos.getc(true), x, w);
                this.nodeHelper.rectangle.contains({
                    x: z.x + x / 2,
                    y: z.y + w / 2
                },
                A, x, w)
            }
        }
    });
    $jit.ST.Plot.EdgeTypes = new q({
        none: c.empty,
        line: {
            render: function(x, z) {
                var y = this.getOrientation(x),
                A = x.nodeFrom,
                B = x.nodeTo,
                w = A._depth < B._depth,
                D = this.viz.geom.getEdge(w ? A: B, "begin", y),
                C = this.viz.geom.getEdge(w ? B: A, "end", y);
                this.edgeHelper.line.render(D, C, z)
            },
            contains: function(x, D) {
                var y = this.getOrientation(x),
                z = x.nodeFrom,
                A = x.nodeTo,
                w = z._depth < A._depth,
                C = this.viz.geom.getEdge(w ? z: A, "begin", y),
                B = this.viz.geom.getEdge(w ? A: z, "end", y);
                return this.edgeHelper.line.contains(C, B, D, this.edge.epsilon)
            }
        },
        arrow: {
            render: function(C, x) {
                var B = this.getOrientation(C),
                y = C.nodeFrom,
                w = C.nodeTo,
                A = C.getData("dim"),
                E = this.viz.geom.getEdge(y, "begin", B),
                F = this.viz.geom.getEdge(w, "end", B),
                D = C.data.$direction,
                z = (D && D.length > 1 && D[0] != y.id);
                this.edgeHelper.arrow.render(E, F, A, z, x)
            },
            contains: function(x, D) {
                var y = this.getOrientation(x),
                z = x.nodeFrom,
                A = x.nodeTo,
                w = z._depth < A._depth,
                C = this.viz.geom.getEdge(w ? z: A, "begin", y),
                B = this.viz.geom.getEdge(w ? A: z, "end", y);
                return this.edgeHelper.arrow.contains(C, B, D, this.edge.epsilon)
            }
        },
        "quadratic:begin": {
            render: function(C, w) {
                var B = this.getOrientation(C);
                var A = C.nodeFrom,
                D = C.nodeTo,
                F = A._depth < D._depth,
                x = this.viz.geom.getEdge(F ? A: D, "begin", B),
                y = this.viz.geom.getEdge(F ? D: A, "end", B),
                z = C.getData("dim"),
                E = w.getCtx();
                E.beginPath();
                E.moveTo(x.x, x.y);
                switch (B) {
                case "left":
                    E.quadraticCurveTo(x.x + z, x.y, y.x, y.y);
                    break;
                case "right":
                    E.quadraticCurveTo(x.x - z, x.y, y.x, y.y);
                    break;
                case "top":
                    E.quadraticCurveTo(x.x, x.y + z, y.x, y.y);
                    break;
                case "bottom":
                    E.quadraticCurveTo(x.x, x.y - z, y.x, y.y);
                    break
                }
                E.stroke()
            }
        },
        "quadratic:end": {
            render: function(C, w) {
                var B = this.getOrientation(C);
                var A = C.nodeFrom,
                D = C.nodeTo,
                F = A._depth < D._depth,
                x = this.viz.geom.getEdge(F ? A: D, "begin", B),
                y = this.viz.geom.getEdge(F ? D: A, "end", B),
                z = C.getData("dim"),
                E = w.getCtx();
                E.beginPath();
                E.moveTo(x.x, x.y);
                switch (B) {
                case "left":
                    E.quadraticCurveTo(y.x - z, y.y, y.x, y.y);
                    break;
                case "right":
                    E.quadraticCurveTo(y.x + z, y.y, y.x, y.y);
                    break;
                case "top":
                    E.quadraticCurveTo(y.x, y.y - z, y.x, y.y);
                    break;
                case "bottom":
                    E.quadraticCurveTo(y.x, y.y + z, y.x, y.y);
                    break
                }
                E.stroke()
            }
        },
        bezier: {
            render: function(C, w) {
                var B = this.getOrientation(C),
                A = C.nodeFrom,
                D = C.nodeTo,
                F = A._depth < D._depth,
                x = this.viz.geom.getEdge(F ? A: D, "begin", B),
                y = this.viz.geom.getEdge(F ? D: A, "end", B),
                z = C.getData("dim"),
                E = w.getCtx();
                E.beginPath();
                E.moveTo(x.x, x.y);
                switch (B) {
                case "left":
                    E.bezierCurveTo(x.x + z, x.y, y.x - z, y.y, y.x, y.y);
                    break;
                case "right":
                    E.bezierCurveTo(x.x - z, x.y, y.x + z, y.y, y.x, y.y);
                    break;
                case "top":
                    E.bezierCurveTo(x.x, x.y + z, y.x, y.y - z, y.x, y.y);
                    break;
                case "bottom":
                    E.bezierCurveTo(x.x, x.y - z, y.x, y.y + z, y.x, y.y);
                    break
                }
                E.stroke()
            }
        }
    });
    $jit.ST.Plot.NodeTypes.implement({
        "areachart-stacked": {
            render: function(W, D) {
                var U = W.pos.getc(true),
                w = W.getData("width"),
                A = W.getData("height"),
                G = this.getAlignedPos(U, w, A),
                ab = G.x,
                aa = G.y,
                L = W.getData("stringArray"),
                F = W.getData("dimArray"),
                B = W.getData("valueArray"),
                ad = c.reduce(B,
                function(aj, ak) {
                    return aj + ak[0]
                },
                0),
                ac = c.reduce(B,
                function(aj, ak) {
                    return aj + ak[1]
                },
                0),
                I = W.getData("colorArray"),
                C = I.length,
                Y = W.getData("config"),
                J = W.getData("gradient"),
                ai = Y.showLabels,
                N = Y.showAggregates,
                ae = Y.Label,
                T = W.getData("prev");
                var M = D.getCtx(),
                H = W.getData("border");
                if (I && F && L) {
                    for (var ah = 0,
                    af = F.length,
                    K = 0,
                    E = 0,
                    X = 0; ah < af; ah++) {
                        M.fillStyle = M.strokeStyle = I[ah % C];
                        M.save();
                        if (J && (F[ah][0] > 0 || F[ah][1] > 0)) {
                            var R = K + F[ah][0],
                            P = E + F[ah][1],
                            ag = Math.atan((P - R) / w),
                            Z = 55;
                            var V = M.createLinearGradient(ab + w / 2, aa - (R + P) / 2, ab + w / 2 + Z * Math.sin(ag), aa - (R + P) / 2 + Z * Math.cos(ag));
                            var Q = c.rgbToHex(c.map(c.hexToRgb(I[ah % C].slice(1)),
                            function(x) {
                                return (x * 0.85) >> 0
                            }));
                            V.addColorStop(0, I[ah % C]);
                            V.addColorStop(1, Q);
                            M.fillStyle = V
                        }
                        M.beginPath();
                        M.moveTo(ab, aa - K);
                        M.lineTo(ab + w, aa - E);
                        M.lineTo(ab + w, aa - E - F[ah][1]);
                        M.lineTo(ab, aa - K - F[ah][0]);
                        M.lineTo(ab, aa - K);
                        M.fill();
                        M.restore();
                        if (H) {
                            var S = H.name == L[ah];
                            var z = S ? 0.7 : 0.8;
                            var Q = c.rgbToHex(c.map(c.hexToRgb(I[ah % C].slice(1)),
                            function(x) {
                                return (x * z) >> 0
                            }));
                            M.strokeStyle = Q;
                            M.lineWidth = S ? 4 : 1;
                            M.save();
                            M.beginPath();
                            if (H.index === 0) {
                                M.moveTo(ab, aa - K);
                                M.lineTo(ab, aa - K - F[ah][0])
                            } else {
                                M.moveTo(ab + w, aa - E);
                                M.lineTo(ab + w, aa - E - F[ah][1])
                            }
                            M.stroke();
                            M.restore()
                        }
                        K += (F[ah][0] || 0);
                        E += (F[ah][1] || 0);
                        if (F[ah][0] > 0) {
                            X += (B[ah][0] || 0)
                        }
                    }
                    if (T && ae.type == "Native") {
                        M.save();
                        M.beginPath();
                        M.fillStyle = M.strokeStyle = ae.color;
                        M.font = ae.style + " " + ae.size + "px " + ae.family;
                        M.textAlign = "center";
                        M.textBaseline = "middle";
                        var O = N(W.name, ad, ac, W, X);
                        if (O !== false) {
                            M.fillText(O !== true ? O: X, ab, aa - K - Y.labelOffset - ae.size / 2, w)
                        }
                        if (ai(W.name, ad, ac, W)) {
                            M.fillText(W.name, ab, aa + ae.size / 2 + Y.labelOffset)
                        }
                        M.restore()
                    }
                }
            },
            contains: function(C, E) {
                var J = C.pos.getc(true),
                z = C.getData("width"),
                N = C.getData("height"),
                M = this.getAlignedPos(J, z, N),
                L = M.x,
                K = M.y,
                O = C.getData("dimArray"),
                w = E.x - L;
                if (E.x < L || E.x > L + z || E.y > K || E.y < K - N) {
                    return false
                }
                for (var F = 0,
                D = O.length,
                I = K,
                A = K; F < D; F++) {
                    var B = O[F];
                    I -= B[0];
                    A -= B[1];
                    var G = I + (A - I) * w / z;
                    if (E.y >= G) {
                        var H = +(w > z / 2);
                        return {
                            name: C.getData("stringArray")[F],
                            color: C.getData("colorArray")[F],
                            value: C.getData("valueArray")[F][H],
                            index: H
                        }
                    }
                }
                return false
            }
        }
    });
    $jit.AreaChart = new q({
        st: null,
        colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
        selected: {},
        busy: false,
        initialize: function(y) {
            this.controller = this.config = c.merge(n("Canvas", "Margin", "Label", "AreaChart"), {
                Label: {
                    type: "Native"
                }
            },
            y);
            var z = this.config.showLabels,
            x = c.type(z),
            A = this.config.showAggregates,
            w = c.type(A);
            this.config.showLabels = x == "function" ? z: c.lambda(z);
            this.config.showAggregates = w == "function" ? A: c.lambda(A);
            this.initializeViz()
        },
        initializeViz: function() {
            var x = this.config,
            B = this,
            w = x.type.split(":")[0],
            A = {};
            var z = new $jit.ST({
                injectInto: x.injectInto,
                width: x.width,
                height: x.height,
                orientation: "bottom",
                levelDistance: 0,
                siblingOffset: 0,
                subtreeOffset: 0,
                withLabels: x.Label.type != "Native",
                useCanvas: x.useCanvas,
                Label: {
                    type: x.Label.type
                },
                Node: {
                    overridable: true,
                    type: "areachart-" + w,
                    align: "left",
                    width: 1,
                    height: 1
                },
                Edge: {
                    type: "none"
                },
                Tips: {
                    enable: x.Tips.enable,
                    type: "Native",
                    force: true,
                    onShow: function(G, F, D) {
                        var E = D;
                        x.Tips.onShow(G, E, F)
                    }
                },
                Events: {
                    enable: true,
                    type: "Native",
                    onClick: function(F, G, D) {
                        if (!x.filterOnClick && !x.Events.enable) {
                            return
                        }
                        var E = G.getContains();
                        if (E) {
                            x.filterOnClick && B.filter(E.name)
                        }
                        x.Events.enable && x.Events.onClick(E, G, D)
                    },
                    onRightClick: function(E, F, D) {
                        if (!x.restoreOnRightClick) {
                            return
                        }
                        B.restore()
                    },
                    onMouseMove: function(F, G, D) {
                        if (!x.selectOnHover) {
                            return
                        }
                        if (F) {
                            var E = G.getContains();
                            B.select(F.id, E.name, E.index)
                        } else {
                            B.select(false, false, false)
                        }
                    }
                },
                onCreateLabel: function(J, G) {
                    var P = x.Label,
                    O = G.getData("valueArray"),
                    H = c.reduce(O,
                    function(Q, R) {
                        return Q + R[0]
                    },
                    0),
                    M = c.reduce(O,
                    function(Q, R) {
                        return Q + R[1]
                    },
                    0);
                    if (G.getData("prev")) {
                        var L = {
                            wrapper: document.createElement("div"),
                            aggregate: document.createElement("div"),
                            label: document.createElement("div")
                        };
                        var D = L.wrapper,
                        N = L.label,
                        E = L.aggregate,
                        F = D.style,
                        K = N.style,
                        I = E.style;
                        A[G.id] = L;
                        D.appendChild(N);
                        D.appendChild(E);
                        if (!x.showLabels(G.name, H, M, G)) {
                            N.style.display = "none"
                        }
                        if (!x.showAggregates(G.name, H, M, G)) {
                            E.style.display = "none"
                        }
                        F.position = "relative";
                        F.overflow = "visible";
                        F.fontSize = P.size + "px";
                        F.fontFamily = P.family;
                        F.color = P.color;
                        F.textAlign = "center";
                        I.position = K.position = "absolute";
                        J.style.width = G.getData("width") + "px";
                        J.style.height = G.getData("height") + "px";
                        N.innerHTML = G.name;
                        J.appendChild(D)
                    }
                },
                onPlaceLabel: function(V, P) {
                    if (!P.getData("prev")) {
                        return
                    }
                    var T = A[P.id],
                    E = T.wrapper.style,
                    D = T.label.style,
                    O = T.aggregate.style,
                    M = P.getData("width"),
                    K = P.getData("height"),
                    J = P.getData("dimArray"),
                    G = P.getData("valueArray"),
                    L = c.reduce(G,
                    function(W, X) {
                        return W + X[0]
                    },
                    0),
                    H = c.reduce(G,
                    function(W, X) {
                        return W + X[1]
                    },
                    0),
                    I = parseInt(E.fontSize, 10),
                    N = V.style;
                    if (J && G) {
                        if (x.showLabels(P.name, L, H, P)) {
                            D.display = ""
                        } else {
                            D.display = "none"
                        }
                        var F = x.showAggregates(P.name, L, H, P);
                        if (F !== false) {
                            O.display = ""
                        } else {
                            O.display = "none"
                        }
                        E.width = O.width = D.width = V.style.width = M + "px";
                        O.left = D.left = -M / 2 + "px";
                        for (var S = 0,
                        Q = G.length,
                        R = 0,
                        U = 0; S < Q; S++) {
                            if (J[S][0] > 0) {
                                R += G[S][0];
                                U += J[S][0]
                            }
                        }
                        O.top = ( - I - x.labelOffset) + "px";
                        D.top = (x.labelOffset + U) + "px";
                        V.style.top = parseInt(V.style.top, 10) - U + "px";
                        V.style.height = E.height = U + "px";
                        T.aggregate.innerHTML = F !== true ? F: R
                    }
                }
            });
            var y = z.canvas.getSize(),
            C = x.Margin;
            z.config.offsetY = -y.height / 2 + C.bottom + (x.showLabels && (x.labelOffset + x.Label.size));
            z.config.offsetX = (C.right - C.left) / 2;
            this.delegate = z;
            this.canvas = this.delegate.canvas
        },
        loadJSON: function(N) {
            var J = c.time(),
            B = [],
            M = this.delegate,
            Q = c.splat(N.label),
            I = c.splat(N.color || this.colors),
            O = this.config,
            x = !!O.type.split(":")[1],
            z = O.animate;
            for (var K = 0,
            y = N.values,
            H = y.length; K < H - 1; K++) {
                var P = y[K],
                E = y[K - 1],
                F = y[K + 1];
                var L = c.splat(y[K].values),
                w = c.splat(y[K + 1].values);
                var A = c.zip(L, w);
                var D = 0,
                C = 0;
                B.push({
                    id: J + P.label,
                    name: P.label,
                    data: {
                        value: A,
                        "$valueArray": A,
                        "$colorArray": I,
                        "$stringArray": Q,
                        "$next": F.label,
                        "$prev": E ? E.label: false,
                        "$config": O,
                        "$gradient": x
                    },
                    children: []
                })
            }
            var G = {
                id: J + "$root",
                name: "",
                data: {
                    "$type": "none",
                    "$width": 1,
                    "$height": 1
                },
                children: B
            };
            M.loadJSON(G);
            this.normalizeDims();
            M.compute();
            M.select(M.root);
            if (z) {
                M.fx.animate({
                    modes: ["node-property:height:dimArray"],
                    duration: 1500
                })
            }
        },
        updateJSON: function(G, x) {
            if (this.busy) {
                return
            }
            this.busy = true;
            var D = this.delegate,
            F = D.graph,
            A = G.label && c.splat(G.label),
            E = G.values,
            w = this.config.animate,
            C = this,
            B = {};
            for (var z = 0,
            y = E.length; z < y; z++) {
                B[E[z].label] = E[z]
            }
            F.eachNode(function(L) {
                var H = B[L.name],
                I = L.getData("stringArray"),
                K = L.getData("valueArray"),
                J = L.getData("next");
                if (H) {
                    H.values = c.splat(H.values);
                    c.each(K,
                    function(M, N) {
                        M[0] = H.values[N];
                        if (A) {
                            I[N] = A[N]
                        }
                    });
                    L.setData("valueArray", K)
                }
                if (J) {
                    H = B[J];
                    if (H) {
                        c.each(K,
                        function(M, N) {
                            M[1] = H.values[N]
                        })
                    }
                }
            });
            this.normalizeDims();
            D.compute();
            D.select(D.root);
            if (w) {
                D.fx.animate({
                    modes: ["node-property:height:dimArray"],
                    duration: 1500,
                    onComplete: function() {
                        C.busy = false;
                        x && x.onComplete()
                    }
                })
            }
        },
        filter: function(z, A) {
            if (this.busy) {
                return
            }
            this.busy = true;
            if (this.config.Tips.enable) {
                this.delegate.tips.hide()
            }
            this.select(false, false, false);
            var x = c.splat(z);
            var w = this.delegate.graph.getNode(this.delegate.root);
            var y = this;
            this.normalizeDims();
            w.eachAdjacency(function(B) {
                var E = B.nodeTo,
                D = E.getData("dimArray", "end"),
                C = E.getData("stringArray");
                E.setData("dimArray", c.map(D,
                function(G, F) {
                    return (c.indexOf(x, C[F]) > -1) ? G: [0, 0]
                }), "end")
            });
            this.delegate.fx.animate({
                modes: ["node-property:dimArray"],
                duration: 1500,
                onComplete: function() {
                    y.busy = false;
                    A && A.onComplete()
                }
            })
        },
        restore: function(x) {
            if (this.busy) {
                return
            }
            this.busy = true;
            if (this.config.Tips.enable) {
                this.delegate.tips.hide()
            }
            this.select(false, false, false);
            this.normalizeDims();
            var w = this;
            this.delegate.fx.animate({
                modes: ["node-property:height:dimArray"],
                duration: 1500,
                onComplete: function() {
                    w.busy = false;
                    x && x.onComplete()
                }
            })
        },
        select: function(B, x, w) {
            if (!this.config.selectOnHover) {
                return
            }
            var y = this.selected;
            if (y.id != B || y.name != x || y.index != w) {
                y.id = B;
                y.name = x;
                y.index = w;
                this.delegate.graph.eachNode(function(C) {
                    C.setData("border", false)
                });
                if (B) {
                    var A = this.delegate.graph.getNode(B);
                    A.setData("border", y);
                    var z = w === 0 ? "prev": "next";
                    z = A.getData(z);
                    if (z) {
                        A = this.delegate.graph.getByName(z);
                        if (A) {
                            A.setData("border", {
                                name: x,
                                index: 1 - w
                            })
                        }
                    }
                }
                this.delegate.plot()
            }
        },
        getLegend: function() {
            var y = {};
            var z;
            this.delegate.graph.getNode(this.delegate.root).eachAdjacency(function(A) {
                z = A.nodeTo
            });
            var x = z.getData("colorArray"),
            w = x.length;
            c.each(z.getData("stringArray"),
            function(B, A) {
                y[B] = x[A % w]
            });
            return y
        },
        getMaxValue: function() {
            var w = 0;
            this.delegate.graph.eachNode(function(B) {
                var y = B.getData("valueArray"),
                x = 0,
                A = 0;
                c.each(y,
                function(C) {
                    x += +C[0];
                    A += +C[1]
                });
                var z = A > x ? A: x;
                w = w > z ? w: z
            });
            return w
        },
        normalizeDims: function() {
            var C = this.delegate.graph.getNode(this.delegate.root),
            z = 0;
            C.eachAdjacency(function() {
                z++
            });
            var B = this.getMaxValue() || 1,
            F = this.delegate.canvas.getSize(),
            y = this.config,
            A = y.Margin,
            D = y.labelOffset + y.Label.size,
            w = (F.width - (A.left + A.right)) / z,
            x = y.animate,
            E = F.height - (A.top + A.bottom) - (y.showAggregates && D) - (y.showLabels && D);
            this.delegate.graph.eachNode(function(L) {
                var I = 0,
                K = 0,
                G = [];
                c.each(L.getData("valueArray"),
                function(M) {
                    I += +M[0];
                    K += +M[1];
                    G.push([0, 0])
                });
                var J = K > I ? K: I;
                L.setData("width", w);
                if (x) {
                    L.setData("height", J * E / B, "end");
                    L.setData("dimArray", c.map(L.getData("valueArray"),
                    function(M) {
                        return [M[0] * E / B, M[1] * E / B]
                    }), "end");
                    var H = L.getData("dimArray");
                    if (!H) {
                        L.setData("dimArray", G)
                    }
                } else {
                    L.setData("height", J * E / B);
                    L.setData("dimArray", c.map(L.getData("valueArray"),
                    function(M) {
                        return [M[0] * E / B, M[1] * E / B]
                    }))
                }
            })
        }
    });
    n.BarChart = {
        $extend: true,
        animate: true,
        type: "stacked",
        labelOffset: 3,
        barsOffset: 0,
        hoveredColor: "#9fd4ff",
        orientation: "horizontal",
        showAggregates: true,
        showLabels: true,
        Tips: {
            enable: false,
            onShow: c.empty,
            onHide: c.empty
        },
        Events: {
            enable: false,
            onClick: c.empty
        }
    };
    $jit.ST.Plot.NodeTypes.implement({
        "barchart-stacked": {
            render: function(R, C) {
                var H = R.pos.getc(true),
                Q = R.getData("width"),
                O = R.getData("height"),
                M = this.getAlignedPos(H, Q, O),
                L = M.x,
                K = M.y,
                N = R.getData("dimArray"),
                F = R.getData("valueArray"),
                E = R.getData("colorArray"),
                B = E.length,
                Y = R.getData("stringArray");
                var T = C.getCtx(),
                w = {},
                U = R.getData("border"),
                z = R.getData("gradient"),
                aa = R.getData("config"),
                A = aa.orientation == "horizontal",
                D = aa.showAggregates,
                P = aa.showLabels,
                J = aa.Label;
                if (E && N && Y) {
                    for (var X = 0,
                    S = N.length,
                    W = 0,
                    G = 0; X < S; X++) {
                        T.fillStyle = T.strokeStyle = E[X % B];
                        if (z) {
                            var Z;
                            if (A) {
                                Z = T.createLinearGradient(L + W + N[X] / 2, K, L + W + N[X] / 2, K + O)
                            } else {
                                Z = T.createLinearGradient(L, K - W - N[X] / 2, L + Q, K - W - N[X] / 2)
                            }
                            var V = c.rgbToHex(c.map(c.hexToRgb(E[X % B].slice(1)),
                            function(x) {
                                return (x * 0.5) >> 0
                            }));
                            Z.addColorStop(0, V);
                            Z.addColorStop(0.5, E[X % B]);
                            Z.addColorStop(1, V);
                            T.fillStyle = Z
                        }
                        if (A) {
                            T.fillRect(L + W, K, N[X], O)
                        } else {
                            T.fillRect(L, K - W - N[X], Q, N[X])
                        }
                        if (U && U.name == Y[X]) {
                            w.acum = W;
                            w.dimValue = N[X]
                        }
                        W += (N[X] || 0);
                        G += (F[X] || 0)
                    }
                    if (U) {
                        T.save();
                        T.lineWidth = 2;
                        T.strokeStyle = U.color;
                        if (A) {
                            T.strokeRect(L + w.acum + 1, K + 1, w.dimValue - 2, O - 2)
                        } else {
                            T.strokeRect(L + 1, K - w.acum - w.dimValue + 1, Q - 2, w.dimValue - 2)
                        }
                        T.restore()
                    }
                    if (J.type == "Native") {
                        T.save();
                        T.fillStyle = T.strokeStyle = J.color;
                        T.font = J.style + " " + J.size + "px " + J.family;
                        T.textBaseline = "middle";
                        var I = D(R.name, G, R);
                        if (I !== false) {
                            I = I !== true ? I: G;
                            if (A) {
                                T.textAlign = "right";
                                T.fillText(I, L + W - aa.labelOffset, K + O / 2)
                            } else {
                                T.textAlign = "center";
                                T.fillText(I, L + Q / 2, K - O - J.size / 2 - aa.labelOffset)
                            }
                        }
                        if (P(R.name, G, R)) {
                            if (A) {
                                T.textAlign = "center";
                                T.translate(L - aa.labelOffset - J.size / 2, K + O / 2);
                                T.rotate(Math.PI / 2);
                                T.fillText(R.name, 0, 0)
                            } else {
                                T.textAlign = "center";
                                T.fillText(R.name, L + Q / 2, K + J.size / 2 + aa.labelOffset)
                            }
                        }
                        T.restore()
                    }
                }
            },
            contains: function(D, F) {
                var I = D.pos.getc(true),
                A = D.getData("width"),
                N = D.getData("height"),
                M = this.getAlignedPos(I, A, N),
                L = M.x,
                J = M.y,
                O = D.getData("dimArray"),
                B = D.getData("config"),
                z = F.x - L,
                w = B.orientation == "horizontal";
                if (w) {
                    if (F.x < L || F.x > L + A || F.y > J + N || F.y < J) {
                        return false
                    }
                } else {
                    if (F.x < L || F.x > L + A || F.y > J || F.y < J - N) {
                        return false
                    }
                }
                for (var G = 0,
                E = O.length,
                K = (w ? L: J); G < E; G++) {
                    var C = O[G];
                    if (w) {
                        K += C;
                        var H = K;
                        if (F.x <= H) {
                            return {
                                name: D.getData("stringArray")[G],
                                color: D.getData("colorArray")[G],
                                value: D.getData("valueArray")[G],
                                label: D.name
                            }
                        }
                    } else {
                        K -= C;
                        var H = K;
                        if (F.y >= H) {
                            return {
                                name: D.getData("stringArray")[G],
                                color: D.getData("colorArray")[G],
                                value: D.getData("valueArray")[G],
                                label: D.name
                            }
                        }
                    }
                }
                return false
            }
        },
        "barchart-grouped": {
            render: function(S, C) {
                var I = S.pos.getc(true),
                R = S.getData("width"),
                P = S.getData("height"),
                N = this.getAlignedPos(I, R, P),
                M = N.x,
                L = N.y,
                O = S.getData("dimArray"),
                G = S.getData("valueArray"),
                Y = G.length,
                F = S.getData("colorArray"),
                B = F.length,
                aa = S.getData("stringArray");
                var U = C.getCtx(),
                w = {},
                V = S.getData("border"),
                z = S.getData("gradient"),
                ac = S.getData("config"),
                A = ac.orientation == "horizontal",
                E = ac.showAggregates,
                Q = ac.showLabels,
                K = ac.Label,
                D = (A ? P: R) / Y;
                if (F && O && aa) {
                    for (var Z = 0,
                    T = Y,
                    X = 0,
                    H = 0; Z < T; Z++) {
                        U.fillStyle = U.strokeStyle = F[Z % B];
                        if (z) {
                            var ab;
                            if (A) {
                                ab = U.createLinearGradient(M + O[Z] / 2, L + D * Z, M + O[Z] / 2, L + D * (Z + 1))
                            } else {
                                ab = U.createLinearGradient(M + D * Z, L - O[Z] / 2, M + D * (Z + 1), L - O[Z] / 2)
                            }
                            var W = c.rgbToHex(c.map(c.hexToRgb(F[Z % B].slice(1)),
                            function(x) {
                                return (x * 0.5) >> 0
                            }));
                            ab.addColorStop(0, W);
                            ab.addColorStop(0.5, F[Z % B]);
                            ab.addColorStop(1, W);
                            U.fillStyle = ab
                        }
                        if (A) {
                            U.fillRect(M, L + D * Z, O[Z], D)
                        } else {
                            U.fillRect(M + D * Z, L - O[Z], D, O[Z])
                        }
                        if (V && V.name == aa[Z]) {
                            w.acum = D * Z;
                            w.dimValue = O[Z]
                        }
                        X += (O[Z] || 0);
                        H += (G[Z] || 0)
                    }
                    if (V) {
                        U.save();
                        U.lineWidth = 2;
                        U.strokeStyle = V.color;
                        if (A) {
                            U.strokeRect(M + 1, L + w.acum + 1, w.dimValue - 2, D - 2)
                        } else {
                            U.strokeRect(M + w.acum + 1, L - w.dimValue + 1, D - 2, w.dimValue - 2)
                        }
                        U.restore()
                    }
                    if (K.type == "Native") {
                        U.save();
                        U.fillStyle = U.strokeStyle = K.color;
                        U.font = K.style + " " + K.size + "px " + K.family;
                        U.textBaseline = "middle";
                        var J = E(S.name, H, S);
                        if (J !== false) {
                            J = J !== true ? J: H;
                            if (A) {
                                U.textAlign = "right";
                                U.fillText(J, M + Math.max.apply(null, O) - ac.labelOffset, L + P / 2)
                            } else {
                                U.textAlign = "center";
                                U.fillText(J, M + R / 2, L - Math.max.apply(null, O) - K.size / 2 - ac.labelOffset)
                            }
                        }
                        if (Q(S.name, H, S)) {
                            if (A) {
                                U.textAlign = "center";
                                U.translate(M - ac.labelOffset - K.size / 2, L + P / 2);
                                U.rotate(Math.PI / 2);
                                U.fillText(S.name, 0, 0)
                            } else {
                                U.textAlign = "center";
                                U.fillText(S.name, M + R / 2, L + K.size / 2 + ac.labelOffset)
                            }
                        }
                        U.restore()
                    }
                }
            },
            contains: function(J, F) {
                var B = J.pos.getc(true),
                I = J.getData("width"),
                H = J.getData("height"),
                E = this.getAlignedPos(B, I, H),
                D = E.x,
                C = E.y,
                G = J.getData("dimArray"),
                M = G.length,
                P = J.getData("config"),
                A = F.x - D,
                w = P.orientation == "horizontal",
                z = (w ? H: I) / M;
                if (w) {
                    if (F.x < D || F.x > D + I || F.y > C + H || F.y < C) {
                        return false
                    }
                } else {
                    if (F.x < D || F.x > D + I || F.y > C || F.y < C - H) {
                        return false
                    }
                }
                for (var L = 0,
                K = G.length; L < K; L++) {
                    var O = G[L];
                    if (w) {
                        var N = C + z * L;
                        if (F.x <= D + O && F.y >= N && F.y <= N + z) {
                            return {
                                name: J.getData("stringArray")[L],
                                color: J.getData("colorArray")[L],
                                value: J.getData("valueArray")[L],
                                label: J.name
                            }
                        }
                    } else {
                        var N = D + z * L;
                        if (F.x >= N && F.x <= N + z && F.y >= C - O) {
                            return {
                                name: J.getData("stringArray")[L],
                                color: J.getData("colorArray")[L],
                                value: J.getData("valueArray")[L],
                                label: J.name
                            }
                        }
                    }
                }
                return false
            }
        }
    });
    $jit.BarChart = new q({
        st: null,
        colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
        selected: {},
        busy: false,
        initialize: function(y) {
            this.controller = this.config = c.merge(n("Canvas", "Margin", "Label", "BarChart"), {
                Label: {
                    type: "Native"
                }
            },
            y);
            var z = this.config.showLabels,
            x = c.type(z),
            A = this.config.showAggregates,
            w = c.type(A);
            this.config.showLabels = x == "function" ? z: c.lambda(z);
            this.config.showAggregates = w == "function" ? A: c.lambda(A);
            this.initializeViz()
        },
        initializeViz: function() {
            var x = this.config,
            B = this;
            var w = x.type.split(":")[0],
            D = x.orientation == "horizontal",
            A = {};
            var z = new $jit.ST({
                injectInto: x.injectInto,
                width: x.width,
                height: x.height,
                orientation: D ? "left": "bottom",
                levelDistance: 0,
                siblingOffset: x.barsOffset,
                subtreeOffset: 0,
                withLabels: x.Label.type != "Native",
                useCanvas: x.useCanvas,
                Label: {
                    type: x.Label.type
                },
                Node: {
                    overridable: true,
                    type: "barchart-" + w,
                    align: "left",
                    width: 1,
                    height: 1
                },
                Edge: {
                    type: "none"
                },
                Tips: {
                    enable: x.Tips.enable,
                    type: "Native",
                    force: true,
                    onShow: function(H, G, E) {
                        var F = E;
                        x.Tips.onShow(H, F, G)
                    }
                },
                Events: {
                    enable: true,
                    type: "Native",
                    onClick: function(G, H, E) {
                        if (!x.Events.enable) {
                            return
                        }
                        var F = H.getContains();
                        x.Events.onClick(F, H, E)
                    },
                    onMouseMove: function(G, H, E) {
                        if (!x.hoveredColor) {
                            return
                        }
                        if (G) {
                            var F = H.getContains();
                            B.select(G.id, F.name, F.index)
                        } else {
                            B.select(false, false, false)
                        }
                    }
                },
                onCreateLabel: function(J, H) {
                    var P = x.Label,
                    N = H.getData("valueArray"),
                    M = c.reduce(N,
                    function(Q, R) {
                        return Q + R
                    },
                    0);
                    var L = {
                        wrapper: document.createElement("div"),
                        aggregate: document.createElement("div"),
                        label: document.createElement("div")
                    };
                    var E = L.wrapper,
                    O = L.label,
                    F = L.aggregate,
                    G = E.style,
                    K = O.style,
                    I = F.style;
                    A[H.id] = L;
                    E.appendChild(O);
                    E.appendChild(F);
                    if (!x.showLabels(H.name, M, H)) {
                        K.display = "none"
                    }
                    if (!x.showAggregates(H.name, M, H)) {
                        I.display = "none"
                    }
                    G.position = "relative";
                    G.overflow = "visible";
                    G.fontSize = P.size + "px";
                    G.fontFamily = P.family;
                    G.color = P.color;
                    G.textAlign = "center";
                    I.position = K.position = "absolute";
                    J.style.width = H.getData("width") + "px";
                    J.style.height = H.getData("height") + "px";
                    I.left = K.left = "0px";
                    O.innerHTML = H.name;
                    J.appendChild(E)
                },
                onPlaceLabel: function(U, P) {
                    if (!A[P.id]) {
                        return
                    }
                    var T = A[P.id],
                    G = T.wrapper.style,
                    E = T.label.style,
                    O = T.aggregate.style,
                    V = x.type.split(":")[0] == "grouped",
                    F = x.orientation == "horizontal",
                    K = P.getData("dimArray"),
                    I = P.getData("valueArray"),
                    M = (V && F) ? Math.max.apply(null, K) : P.getData("width"),
                    L = (V && !F) ? Math.max.apply(null, K) : P.getData("height"),
                    J = parseInt(G.fontSize, 10),
                    N = U.style;
                    if (K && I) {
                        G.width = O.width = E.width = U.style.width = M + "px";
                        for (var S = 0,
                        Q = I.length,
                        R = 0; S < Q; S++) {
                            if (K[S] > 0) {
                                R += I[S]
                            }
                        }
                        if (x.showLabels(P.name, R, P)) {
                            E.display = ""
                        } else {
                            E.display = "none"
                        }
                        var H = x.showAggregates(P.name, R, P);
                        if (H !== false) {
                            O.display = ""
                        } else {
                            O.display = "none"
                        }
                        if (x.orientation == "horizontal") {
                            O.textAlign = "right";
                            E.textAlign = "left";
                            E.textIndex = O.textIndent = x.labelOffset + "px";
                            O.top = E.top = (L - J) / 2 + "px";
                            U.style.height = G.height = L + "px"
                        } else {
                            O.top = ( - J - x.labelOffset) + "px";
                            E.top = (x.labelOffset + L) + "px";
                            U.style.top = parseInt(U.style.top, 10) - L + "px";
                            U.style.height = G.height = L + "px"
                        }
                        T.aggregate.innerHTML = H !== true ? H: R
                    }
                }
            });
            var y = z.canvas.getSize(),
            C = x.Margin;
            if (D) {
                z.config.offsetX = y.width / 2 - C.left - (x.showLabels && (x.labelOffset + x.Label.size));
                z.config.offsetY = (C.bottom - C.top) / 2
            } else {
                z.config.offsetY = -y.height / 2 + C.bottom + (x.showLabels && (x.labelOffset + x.Label.size));
                z.config.offsetX = (C.right - C.left) / 2
            }
            this.delegate = z;
            this.canvas = this.delegate.canvas
        },
        loadJSON: function(K) {
            if (this.busy) {
                return
            }
            this.busy = true;
            var H = c.time(),
            C = [],
            J = this.delegate,
            N = c.splat(K.label),
            G = c.splat(K.color || this.colors),
            L = this.config,
            w = !!L.type.split(":")[1],
            z = L.animate,
            y = L.orientation == "horizontal",
            A = this;
            for (var I = 0,
            x = K.values,
            E = x.length; I < E; I++) {
                var M = x[I];
                var B = c.splat(x[I].values);
                var F = 0;
                C.push({
                    id: H + M.label,
                    name: M.label,
                    data: {
                        value: B,
                        "$valueArray": B,
                        "$colorArray": G,
                        "$stringArray": N,
                        "$gradient": w,
                        "$config": L
                    },
                    children: []
                })
            }
            var D = {
                id: H + "$root",
                name: "",
                data: {
                    "$type": "none",
                    "$width": 1,
                    "$height": 1
                },
                children: C
            };
            J.loadJSON(D);
            this.normalizeDims();
            J.compute();
            J.select(J.root);
            if (z) {
                if (y) {
                    J.fx.animate({
                        modes: ["node-property:width:dimArray"],
                        duration: 1500,
                        onComplete: function() {
                            A.busy = false
                        }
                    })
                } else {
                    J.fx.animate({
                        modes: ["node-property:height:dimArray"],
                        duration: 1500,
                        onComplete: function() {
                            A.busy = false
                        }
                    })
                }
            } else {
                this.busy = false
            }
        },
        updateJSON: function(y, C) {
            if (this.busy) {
                return
            }
            this.busy = true;
            this.select(false, false, false);
            var z = this.delegate;
            var B = z.graph;
            var x = y.values;
            var w = this.config.animate;
            var A = this;
            var D = this.config.orientation == "horizontal";
            c.each(x,
            function(E) {
                var F = B.getByName(E.label);
                if (F) {
                    F.setData("valueArray", c.splat(E.values));
                    if (y.label) {
                        F.setData("stringArray", c.splat(y.label))
                    }
                }
            });
            this.normalizeDims();
            z.compute();
            z.select(z.root);
            if (w) {
                if (D) {
                    z.fx.animate({
                        modes: ["node-property:width:dimArray"],
                        duration: 1500,
                        onComplete: function() {
                            A.busy = false;
                            C && C.onComplete()
                        }
                    })
                } else {
                    z.fx.animate({
                        modes: ["node-property:height:dimArray"],
                        duration: 1500,
                        onComplete: function() {
                            A.busy = false;
                            C && C.onComplete()
                        }
                    })
                }
            }
        },
        select: function(y, w) {
            if (!this.config.hoveredColor) {
                return
            }
            var x = this.selected;
            if (x.id != y || x.name != w) {
                x.id = y;
                x.name = w;
                x.color = this.config.hoveredColor;
                this.delegate.graph.eachNode(function(z) {
                    if (y == z.id) {
                        z.setData("border", x)
                    } else {
                        z.setData("border", false)
                    }
                });
                this.delegate.plot()
            }
        },
        getLegend: function() {
            var y = {};
            var z;
            this.delegate.graph.getNode(this.delegate.root).eachAdjacency(function(A) {
                z = A.nodeTo
            });
            var x = z.getData("colorArray"),
            w = x.length;
            c.each(z.getData("stringArray"),
            function(B, A) {
                y[B] = x[A % w]
            });
            return y
        },
        getMaxValue: function() {
            var x = 0,
            w = this.config.type.split(":")[0] == "stacked";
            this.delegate.graph.eachNode(function(A) {
                var y = A.getData("valueArray"),
                z = 0;
                if (!y) {
                    return
                }
                if (w) {
                    c.each(y,
                    function(B) {
                        z += +B
                    })
                } else {
                    z = Math.max.apply(null, y)
                }
                x = x > z ? x: z
            });
            return x
        },
        setBarType: function(w) {
            this.config.type = w;
            this.delegate.config.Node.type = "barchart-" + w.split(":")[0]
        },
        normalizeDims: function() {
            var G = this.delegate.graph.getNode(this.delegate.root),
            B = 0;
            G.eachAdjacency(function() {
                B++
            });
            var D = this.getMaxValue() || 1,
            J = this.delegate.canvas.getSize(),
            z = this.config,
            C = z.Margin,
            H = C.left + C.right,
            A = C.top + C.bottom,
            x = z.orientation == "horizontal",
            w = (J[x ? "height": "width"] - (x ? A: H) - (B - 1) * z.barsOffset) / B,
            y = z.animate,
            I = J[x ? "width": "height"] - (x ? H: A) - (!x && z.showAggregates && (z.Label.size + z.labelOffset)) - (z.showLabels && (z.Label.size + z.labelOffset)),
            F = x ? "height": "width",
            E = x ? "width": "height";
            this.delegate.graph.eachNode(function(N) {
                var M = 0,
                K = [];
                c.each(N.getData("valueArray"),
                function(O) {
                    M += +O;
                    K.push(0)
                });
                N.setData(F, w);
                if (y) {
                    N.setData(E, M * I / D, "end");
                    N.setData("dimArray", c.map(N.getData("valueArray"),
                    function(O) {
                        return O * I / D
                    }), "end");
                    var L = N.getData("dimArray");
                    if (!L) {
                        N.setData("dimArray", K)
                    }
                } else {
                    N.setData(E, M * I / D);
                    N.setData("dimArray", c.map(N.getData("valueArray"),
                    function(O) {
                        return O * I / D
                    }))
                }
            })
        }
    });
    n.PieChart = {
        $extend: true,
        animate: true,
        offset: 25,
        sliceOffset: 0,
        labelOffset: 3,
        type: "stacked",
        hoveredColor: "#9fd4ff",
        Events: {
            enable: false,
            onClick: c.empty
        },
        Tips: {
            enable: false,
            onShow: c.empty,
            onHide: c.empty
        },
        showLabels: true,
        resizeLabels: false,
        updateHeights: false
    };
    g.Radial = new q({
        compute: function(x) {
            var y = c.splat(x || ["current", "start", "end"]);
            f.compute(this.graph, y, this.config);
            this.graph.computeLevels(this.root, 0, "ignore");
            var w = this.createLevelDistanceFunc();
            this.computeAngularWidths(y);
            this.computePositions(y, w)
        },
        computePositions: function(D, A) {
            var F = D;
            var E = this.graph;
            var B = E.getNode(this.root);
            var C = this.parent;
            var w = this.config;
            for (var y = 0,
            x = F.length; y < x; y++) {
                var z = F[y];
                B.setPos(k(0, 0), z);
                B.setData("span", Math.PI * 2, z)
            }
            B.angleSpan = {
                begin: 0,
                end: 2 * Math.PI
            };
            E.eachBFS(this.root,
            function(K) {
                var Q = K.angleSpan.end - K.angleSpan.begin;
                var S = K.angleSpan.begin;
                var R = A(K);
                var T = 0,
                G = [],
                J = {};
                K.eachSubnode(function(W) {
                    T += W._treeAngularWidth;
                    for (var X = 0,
                    V = F.length; X < V; X++) {
                        var Z = F[X],
                        Y = W.getData("dim", Z);
                        J[Z] = (Z in J) ? (Y > J[Z] ? Y: J[Z]) : Y
                    }
                    G.push(W)
                },
                "ignore");
                if (C && C.id == K.id && G.length > 0 && G[0].dist) {
                    G.sort(function(W, V) {
                        return (W.dist >= V.dist) - (W.dist <= V.dist)
                    })
                }
                for (var M = 0,
                O = G.length; M < O; M++) {
                    var I = G[M];
                    if (!I._flag) {
                        var U = I._treeAngularWidth / T * Q;
                        var H = S + U / 2;
                        for (var N = 0,
                        L = F.length; N < L; N++) {
                            var P = F[N];
                            I.setPos(k(H, R), P);
                            I.setData("span", U, P);
                            I.setData("dim-quotient", I.getData("dim", P) / J[P], P)
                        }
                        I.angleSpan = {
                            begin: S,
                            end: S + U
                        };
                        S += U
                    }
                }
            },
            "ignore")
        },
        setAngularWidthForNodes: function(w) {
            this.graph.eachBFS(this.root,
            function(z, x) {
                var y = z.getData("angularWidth", w[0]) || 5;
                z._angularWidth = y / x
            },
            "ignore")
        },
        setSubtreesAngularWidth: function() {
            var w = this;
            this.graph.eachNode(function(x) {
                w.setSubtreeAngularWidth(x)
            },
            "ignore")
        },
        setSubtreeAngularWidth: function(z) {
            var y = this,
            x = z._angularWidth,
            w = 0;
            z.eachSubnode(function(A) {
                y.setSubtreeAngularWidth(A);
                w += A._treeAngularWidth
            },
            "ignore");
            z._treeAngularWidth = Math.max(x, w)
        },
        computeAngularWidths: function(w) {
            this.setAngularWidthForNodes(w);
            this.setSubtreesAngularWidth()
        }
    });
    $jit.Sunburst = new q({
        Implements: [d, o, g.Radial],
        initialize: function(w) {
            var y = $jit.Sunburst;
            var x = {
                interpolation: "linear",
                levelDistance: 100,
                Node: {
                    type: "multipie",
                    height: 0
                },
                Edge: {
                    type: "none"
                },
                Label: {
                    textAlign: "start",
                    textBaseline: "middle"
                }
            };
            this.controller = this.config = c.merge(n("Canvas", "Node", "Edge", "Fx", "Tips", "NodeStyles", "Events", "Navigation", "Controller", "Label"), x, w);
            var z = this.config;
            if (z.useCanvas) {
                this.canvas = z.useCanvas;
                this.config.labelContainer = this.canvas.id + "-label"
            } else {
                if (z.background) {
                    z.background = c.merge({
                        type: "Circles"
                    },
                    z.background)
                }
                this.canvas = new l(this, z);
                this.config.labelContainer = (typeof z.injectInto == "string" ? z.injectInto: z.injectInto.id) + "-label"
            }
            this.graphOptions = {
                klass: b,
                Node: {
                    selected: false,
                    exist: true,
                    drawn: true
                }
            };
            this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge);
            this.labels = new y.Label[z.Label.type](this);
            this.fx = new y.Plot(this, y);
            this.op = new y.Op(this);
            this.json = null;
            this.root = null;
            this.rotated = null;
            this.busy = false;
            this.initializeExtras()
        },
        createLevelDistanceFunc: function() {
            var w = this.config.levelDistance;
            return function(x) {
                return (x._depth + 1) * w
            }
        },
        refresh: function() {
            this.compute();
            this.plot()
        },
        reposition: function() {
            this.compute("end")
        },
        rotate: function(y, z, x) {
            var w = y.getPos(x.property || "current").getp(true).theta;
            this.rotated = y;
            this.rotateAngle( - w, z, x)
        },
        rotateAngle: function(y, B, x) {
            var z = this;
            var w = c.merge(this.config, x || {},
            {
                modes: ["polar"]
            });
            var A = x.property || (B === "animate" ? "end": "current");
            if (B === "animate") {
                this.fx.animation.pause()
            }
            this.graph.eachNode(function(D) {
                var C = D.getPos(A);
                C.theta += y;
                if (C.theta < 0) {
                    C.theta += Math.PI * 2
                }
            });
            if (B == "animate") {
                this.fx.animate(w)
            } else {
                if (B == "replot") {
                    this.fx.plot();
                    this.busy = false
                }
            }
        },
        plot: function() {
            this.fx.plot()
        }
    });
    $jit.Sunburst.$extend = true; (function(w) {
        w.Op = new q({
            Implements: e.Op
        });
        w.Plot = new q({
            Implements: e.Plot
        });
        w.Label = {};
        w.Label.Native = new q({
            Implements: e.Label.Native,
            initialize: function(x) {
                this.viz = x;
                this.label = x.config.Label;
                this.config = x.config
            },
            renderLabel: function(C, E, G) {
                var N = E.getData("span");
                if (N < Math.PI / 2 && Math.tan(N) * this.config.levelDistance * E._depth < 10) {
                    return
                }
                var O = C.getCtx();
                var A = O.measureText(E.name);
                if (E.id == this.viz.root) {
                    var M = -A.width / 2,
                    K = 0,
                    L = 0;
                    var z = 0
                } else {
                    var D = 5;
                    var z = G.levelDistance - D;
                    var J = E.pos.clone();
                    J.rho += D;
                    var B = J.getp(true);
                    var H = J.getc(true);
                    var M = H.x,
                    K = H.y;
                    var F = Math.PI;
                    var I = (B.theta > F / 2 && B.theta < 3 * F / 2);
                    var L = I ? B.theta + F: B.theta;
                    if (I) {
                        M -= Math.abs(Math.cos(B.theta) * A.width);
                        K += Math.sin(B.theta) * A.width
                    } else {
                        if (E.id == this.viz.root) {
                            M -= A.width / 2
                        }
                    }
                }
                O.save();
                O.translate(M, K);
                O.rotate(L);
                O.fillText(E.name, 0, 0);
                O.restore()
            }
        });
        w.Label.SVG = new q({
            Implements: e.Label.SVG,
            initialize: function(x) {
                this.viz = x
            },
            placeLabel: function(N, C, E) {
                var J = C.pos.getc(true),
                M = this.viz,
                A = this.viz.canvas;
                var F = A.getSize();
                var B = {
                    x: Math.round(J.x + F.width / 2),
                    y: Math.round(J.y + F.height / 2)
                };
                N.setAttribute("x", B.x);
                N.setAttribute("y", B.y);
                var G = N.getBBox();
                if (G) {
                    var L = N.getAttribute("x");
                    var I = N.getAttribute("y");
                    var z = C.pos.getp(true);
                    var D = Math.PI;
                    var H = (z.theta > D / 2 && z.theta < 3 * D / 2);
                    if (H) {
                        N.setAttribute("x", L - G.width);
                        N.setAttribute("y", I - G.height)
                    } else {
                        if (C.id == M.root) {
                            N.setAttribute("x", L - G.width / 2)
                        }
                    }
                    var K = H ? z.theta + D: z.theta;
                    if (C._depth) {
                        N.setAttribute("transform", "rotate(" + K * 360 / (2 * D) + " " + L + " " + I + ")")
                    }
                }
                E.onPlaceLabel(N, C)
            }
        });
        w.Label.HTML = new q({
            Implements: e.Label.HTML,
            initialize: function(x) {
                this.viz = x
            },
            placeLabel: function(G, A, C) {
                var E = A.pos.clone(),
                y = this.viz.canvas,
                F = A.getData("height"),
                B = ((F || A._depth == 0) ? F: this.viz.config.levelDistance) / 2,
                D = y.getSize();
                E.rho += B;
                E = E.getc(true);
                var z = {
                    x: Math.round(E.x + D.width / 2),
                    y: Math.round(E.y + D.height / 2)
                };
                var x = G.style;
                x.left = z.x + "px";
                x.top = z.y + "px";
                x.display = this.fitsInCanvas(z, y) ? "": "none";
                C.onPlaceLabel(G, A)
            }
        });
        w.Plot.NodeTypes = new q({
            none: {
                render: c.empty,
                contains: c.lambda(false),
                anglecontains: function(B, D) {
                    var A = B.getData("span") / 2,
                    y = B.pos.theta;
                    var z = y - A,
                    x = y + A;
                    if (z < 0) {
                        z += Math.PI * 2
                    }
                    var C = Math.atan2(D.y, D.x);
                    if (C < 0) {
                        C += Math.PI * 2
                    }
                    if (z > x) {
                        return (C > z && C <= Math.PI * 2) || C < x
                    } else {
                        return C > z && C < x
                    }
                }
            },
            pie: {
                render: function(C, A) {
                    var G = C.getData("span") / 2,
                    z = C.pos.theta;
                    var B = z - G,
                    D = z + G;
                    var F = C.pos.getp(true);
                    var x = new b(F.rho, B);
                    var y = x.getc(true);
                    x.theta = D;
                    var E = x.getc(true);
                    var H = A.getCtx();
                    H.beginPath();
                    H.moveTo(0, 0);
                    H.lineTo(y.x, y.y);
                    H.moveTo(0, 0);
                    H.lineTo(E.x, E.y);
                    H.moveTo(0, 0);
                    H.arc(0, 0, F.rho * C.getData("dim-quotient"), B, D, false);
                    H.fill()
                },
                contains: function(z, B) {
                    if (this.nodeTypes.none.anglecontains.call(this, z, B)) {
                        var x = Math.sqrt(B.x * B.x + B.y * B.y);
                        var y = this.config.levelDistance,
                        A = z._depth;
                        return (x <= y * A)
                    }
                    return false
                }
            },
            multipie: {
                render: function(D, B) {
                    var K = D.getData("height");
                    var E = K ? K: this.config.levelDistance;
                    var J = D.getData("span") / 2,
                    A = D.pos.theta;
                    var C = A - J,
                    G = A + J;
                    var I = D.pos.getp(true);
                    var y = new b(I.rho, C);
                    var z = y.getc(true);
                    y.theta = G;
                    var H = y.getc(true);
                    y.rho += E;
                    var x = y.getc(true);
                    y.theta = C;
                    var F = y.getc(true);
                    var L = B.getCtx();
                    L.moveTo(0, 0);
                    L.beginPath();
                    L.arc(0, 0, I.rho, C, G, false);
                    L.arc(0, 0, I.rho + E, G, C, true);
                    L.moveTo(z.x, z.y);
                    L.lineTo(F.x, F.y);
                    L.moveTo(H.x, H.y);
                    L.lineTo(x.x, x.y);
                    L.fill();
                    if (D.collapsed) {
                        L.save();
                        L.lineWidth = 2;
                        L.moveTo(0, 0);
                        L.beginPath();
                        L.arc(0, 0, I.rho + E + 5, G - 0.01, C + 0.01, true);
                        L.stroke();
                        L.restore()
                    }
                },
                contains: function(A, D) {
                    if (this.nodeTypes.none.anglecontains.call(this, A, D)) {
                        var y = Math.sqrt(D.x * D.x + D.y * D.y);
                        var x = A.getData("height");
                        var B = x ? x: this.config.levelDistance;
                        var z = this.config.levelDistance,
                        C = A._depth;
                        return (y >= z * C) && (y <= (z * C + B))
                    }
                    return false
                }
            },
            "gradient-multipie": {
                render: function(A, x) {
                    var F = x.getCtx();
                    var E = A.getData("height");
                    var B = E ? E: this.config.levelDistance;
                    var y = F.createRadialGradient(0, 0, A.getPos().rho, 0, 0, A.getPos().rho + B);
                    var D = c.hexToRgb(A.getData("color")),
                    C = [];
                    c.each(D,
                    function(G) {
                        C.push(parseInt(G * 0.5, 10))
                    });
                    var z = c.rgbToHex(C);
                    y.addColorStop(0, z);
                    y.addColorStop(1, A.getData("color"));
                    F.fillStyle = y;
                    this.nodeTypes.multipie.render.call(this, A, x)
                },
                contains: function(x, y) {
                    return this.nodeTypes.multipie.contains.call(this, x, y)
                }
            },
            "gradient-pie": {
                render: function(C, z) {
                    var x = z.getCtx();
                    var D = x.createRadialGradient(0, 0, 0, 0, 0, C.getPos().rho);
                    var B = c.hexToRgb(C.getData("color")),
                    y = [];
                    c.each(B,
                    function(E) {
                        y.push(parseInt(E * 0.5, 10))
                    });
                    var A = c.rgbToHex(y);
                    D.addColorStop(1, A);
                    D.addColorStop(0, C.getData("color"));
                    x.fillStyle = D;
                    this.nodeTypes.pie.render.call(this, C, z)
                },
                contains: function(x, y) {
                    return this.nodeTypes.pie.contains.call(this, x, y)
                }
            }
        });
        w.Plot.EdgeTypes = new q({
            none: c.empty,
            line: {
                render: function(x, y) {
                    var A = x.nodeFrom.pos.getc(true),
                    z = x.nodeTo.pos.getc(true);
                    this.edgeHelper.line.render(A, z, y)
                },
                contains: function(x, A) {
                    var z = x.nodeFrom.pos.getc(true),
                    y = x.nodeTo.pos.getc(true);
                    return this.edgeHelper.line.contains(z, y, A, this.edge.epsilon)
                }
            },
            arrow: {
                render: function(y, z) {
                    var D = y.nodeFrom.pos.getc(true),
                    C = y.nodeTo.pos.getc(true),
                    B = y.getData("dim"),
                    A = y.data.$direction,
                    x = (A && A.length > 1 && A[0] != y.nodeFrom.id);
                    this.edgeHelper.arrow.render(D, C, B, x, z)
                },
                contains: function(x, A) {
                    var z = x.nodeFrom.pos.getc(true),
                    y = x.nodeTo.pos.getc(true);
                    return this.edgeHelper.arrow.contains(z, y, A, this.edge.epsilon)
                }
            },
            hyperline: {
                render: function(x, y) {
                    var B = x.nodeFrom.pos.getc(),
                    A = x.nodeTo.pos.getc(),
                    z = Math.max(B.norm(), A.norm());
                    this.edgeHelper.hyperline.render(B.$scale(1 / z), A.$scale(1 / z), z, y)
                },
                contains: c.lambda(false)
            }
        })
    })($jit.Sunburst);
    $jit.Sunburst.Plot.NodeTypes.implement({
        "piechart-stacked": {
            render: function(U, A) {
                var T = U.pos.getp(true),
                C = U.getData("dimArray"),
                S = U.getData("valueArray"),
                G = U.getData("colorArray"),
                z = G.length,
                M = U.getData("stringArray"),
                P = U.getData("span") / 2,
                K = U.pos.theta,
                F = K - P,
                J = K + P,
                R = new b;
                var N = A.getCtx(),
                L = {},
                I = U.getData("gradient"),
                D = U.getData("border"),
                Z = U.getData("config"),
                ai = Z.showLabels,
                Y = Z.resizeLabels,
                ab = Z.Label;
                var ae = Z.sliceOffset * Math.cos((F + J) / 2);
                var E = Z.sliceOffset * Math.sin((F + J) / 2);
                if (G && C && M) {
                    for (var af = 0,
                    ac = C.length,
                    w = 0,
                    X = 0; af < ac; af++) {
                        var B = C[af],
                        ag = G[af % z];
                        if (B <= 0) {
                            continue
                        }
                        N.fillStyle = N.strokeStyle = ag;
                        if (I && B) {
                            var ad = N.createRadialGradient(ae, E, w + Z.sliceOffset, ae, E, w + B + Z.sliceOffset);
                            var x = c.hexToRgb(ag),
                            W = c.map(x,
                            function(al) {
                                return (al * 0.8) >> 0
                            }),
                            y = c.rgbToHex(W);
                            ad.addColorStop(0, ag);
                            ad.addColorStop(0.5, ag);
                            ad.addColorStop(1, y);
                            N.fillStyle = ad
                        }
                        R.rho = w + Z.sliceOffset;
                        R.theta = F;
                        var ah = R.getc(true);
                        R.theta = J;
                        var O = R.getc(true);
                        R.rho += B;
                        var aj = R.getc(true);
                        R.theta = F;
                        var Q = R.getc(true);
                        N.beginPath();
                        N.arc(ae, E, w + 0.01, F, J, false);
                        N.arc(ae, E, w + B + 0.01, J, F, true);
                        N.fill();
                        if (D && D.name == M[af]) {
                            L.acum = w;
                            L.dimValue = C[af];
                            L.begin = F;
                            L.end = J
                        }
                        w += (B || 0);
                        X += (S[af] || 0)
                    }
                    if (D) {
                        N.save();
                        N.globalCompositeOperation = "source-over";
                        N.lineWidth = 2;
                        N.strokeStyle = D.color;
                        var aa = F < J ? 1 : -1;
                        N.beginPath();
                        N.arc(ae, E, L.acum + 0.01 + 1, L.begin, L.end, false);
                        N.arc(ae, E, L.acum + L.dimValue + 0.01 - 1, L.end, L.begin, true);
                        N.closePath();
                        N.stroke();
                        N.restore()
                    }
                    if (ai && ab.type == "Native") {
                        N.save();
                        N.fillStyle = N.strokeStyle = ab.color;
                        var V = Y ? U.getData("normalizedDim") : 1,
                        H = (ab.size * V) >> 0;
                        H = H < +Y ? +Y: H;
                        N.font = ab.style + " " + H + "px " + ab.family;
                        N.textBaseline = "middle";
                        N.textAlign = "center";
                        R.rho = w + Z.labelOffset + Z.sliceOffset;
                        R.theta = U.pos.theta;
                        var ak = R.getc(true);
                        N.fillText(U.name, ak.x, ak.y);
                        N.restore()
                    }
                }
            },
            contains: function(z, D) {
                if (this.nodeTypes.none.anglecontains.call(this, z, D)) {
                    var F = Math.sqrt(D.x * D.x + D.y * D.y);
                    var w = this.config.levelDistance,
                    C = z._depth;
                    var x = z.getData("config");
                    if (F <= w * C + x.sliceOffset) {
                        var G = z.getData("dimArray");
                        for (var B = 0,
                        A = G.length,
                        E = x.sliceOffset; B < A; B++) {
                            var y = G[B];
                            if (F >= E && F <= E + y) {
                                return {
                                    name: z.getData("stringArray")[B],
                                    color: z.getData("colorArray")[B],
                                    value: z.getData("valueArray")[B],
                                    label: z.name
                                }
                            }
                            E += y
                        }
                    }
                    return false
                }
                return false
            }
        }
    });
    $jit.PieChart = new q({
        sb: null,
        colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
        selected: {},
        busy: false,
        initialize: function(w) {
            this.controller = this.config = c.merge(n("Canvas", "PieChart", "Label"), {
                Label: {
                    type: "Native"
                }
            },
            w);
            this.initializeViz()
        },
        initializeViz: function() {
            var x = this.config,
            B = this;
            var w = x.type.split(":")[0];
            var A = new $jit.Sunburst({
                injectInto: x.injectInto,
                width: x.width,
                height: x.height,
                useCanvas: x.useCanvas,
                withLabels: x.Label.type != "Native",
                Label: {
                    type: x.Label.type
                },
                Node: {
                    overridable: true,
                    type: "piechart-" + w,
                    width: 1,
                    height: 1
                },
                Edge: {
                    type: "none"
                },
                Tips: {
                    enable: x.Tips.enable,
                    type: "Native",
                    force: true,
                    onShow: function(F, E, C) {
                        var D = C;
                        x.Tips.onShow(F, D, E)
                    }
                },
                Events: {
                    enable: true,
                    type: "Native",
                    onClick: function(E, F, C) {
                        if (!x.Events.enable) {
                            return
                        }
                        var D = F.getContains();
                        x.Events.onClick(D, F, C)
                    },
                    onMouseMove: function(E, F, C) {
                        if (!x.hoveredColor) {
                            return
                        }
                        if (E) {
                            var D = F.getContains();
                            B.select(E.id, D.name, D.index)
                        } else {
                            B.select(false, false, false)
                        }
                    }
                },
                onCreateLabel: function(F, E) {
                    var C = x.Label;
                    if (x.showLabels) {
                        var D = F.style;
                        D.fontSize = C.size + "px";
                        D.fontFamily = C.family;
                        D.color = C.color;
                        D.textAlign = "center";
                        F.innerHTML = E.name
                    }
                },
                onPlaceLabel: function(S, M) {
                    if (!x.showLabels) {
                        return
                    }
                    var G = M.pos.getp(true),
                    J = M.getData("dimArray"),
                    P = M.getData("span") / 2,
                    H = M.pos.theta,
                    R = H - P,
                    D = H + P,
                    U = new b;
                    var L = x.showLabels,
                    F = x.resizeLabels,
                    I = x.Label;
                    if (J) {
                        for (var Q = 0,
                        N = J.length,
                        O = 0; Q < N; Q++) {
                            O += J[Q]
                        }
                        var T = F ? M.getData("normalizedDim") : 1,
                        C = (I.size * T) >> 0;
                        C = C < +F ? +F: C;
                        S.style.fontSize = C + "px";
                        U.rho = O + x.labelOffset + x.sliceOffset;
                        U.theta = (R + D) / 2;
                        var G = U.getc(true);
                        var E = B.canvas.getSize();
                        var K = {
                            x: Math.round(G.x + E.width / 2),
                            y: Math.round(G.y + E.height / 2)
                        };
                        S.style.left = K.x + "px";
                        S.style.top = K.y + "px"
                    }
                }
            });
            var z = A.canvas.getSize(),
            y = Math.min;
            A.config.levelDistance = y(z.width, z.height) / 2 - x.offset - x.sliceOffset;
            this.delegate = A;
            this.canvas = this.delegate.canvas;
            this.canvas.getCtx().globalCompositeOperation = "lighter"
        },
        loadJSON: function(K) {
            var H = c.time(),
            B = [],
            J = this.delegate,
            N = c.splat(K.label),
            D = N.length,
            G = c.splat(K.color || this.colors),
            y = G.length,
            L = this.config,
            w = !!L.type.split(":")[1],
            z = L.animate,
            F = D == 1;
            for (var I = 0,
            x = K.values,
            E = x.length; I < E; I++) {
                var M = x[I];
                var A = c.splat(M.values);
                B.push({
                    id: H + M.label,
                    name: M.label,
                    data: {
                        value: A,
                        "$valueArray": A,
                        "$colorArray": F ? c.splat(G[I % y]) : G,
                        "$stringArray": N,
                        "$gradient": w,
                        "$config": L,
                        "$angularWidth": c.reduce(A,
                        function(O, P) {
                            return O + P
                        })
                    },
                    children: []
                })
            }
            var C = {
                id: H + "$root",
                name: "",
                data: {
                    "$type": "none",
                    "$width": 1,
                    "$height": 1
                },
                children: B
            };
            J.loadJSON(C);
            this.normalizeDims();
            J.refresh();
            if (z) {
                J.fx.animate({
                    modes: ["node-property:dimArray"],
                    duration: 1500
                })
            }
        },
        updateJSON: function(y, C) {
            if (this.busy) {
                return
            }
            this.busy = true;
            var z = this.delegate;
            var B = z.graph;
            var x = y.values;
            var w = this.config.animate;
            var A = this;
            c.each(x,
            function(D) {
                var F = B.getByName(D.label),
                E = c.splat(D.values);
                if (F) {
                    F.setData("valueArray", E);
                    F.setData("angularWidth", c.reduce(E,
                    function(G, H) {
                        return G + H
                    }));
                    if (y.label) {
                        F.setData("stringArray", c.splat(y.label))
                    }
                }
            });
            this.normalizeDims();
            if (w) {
                z.compute("end");
                z.fx.animate({
                    modes: ["node-property:dimArray:span", "linear"],
                    duration: 1500,
                    onComplete: function() {
                        A.busy = false;
                        C && C.onComplete()
                    }
                })
            } else {
                z.refresh()
            }
        },
        select: function(y, w) {
            if (!this.config.hoveredColor) {
                return
            }
            var x = this.selected;
            if (x.id != y || x.name != w) {
                x.id = y;
                x.name = w;
                x.color = this.config.hoveredColor;
                this.delegate.graph.eachNode(function(z) {
                    if (y == z.id) {
                        z.setData("border", x)
                    } else {
                        z.setData("border", false)
                    }
                });
                this.delegate.plot()
            }
        },
        getLegend: function() {
            var y = {};
            var z;
            this.delegate.graph.getNode(this.delegate.root).eachAdjacency(function(A) {
                z = A.nodeTo
            });
            var x = z.getData("colorArray"),
            w = x.length;
            c.each(z.getData("stringArray"),
            function(B, A) {
                y[B] = x[A % w]
            });
            return y
        },
        getMaxValue: function() {
            var w = 0;
            this.delegate.graph.eachNode(function(z) {
                var x = z.getData("valueArray"),
                y = 0;
                c.each(x,
                function(A) {
                    y += +A
                });
                w = w > y ? w: y
            });
            return w
        },
        normalizeDims: function() {
            var x = this.delegate.graph.getNode(this.delegate.root),
            w = 0;
            x.eachAdjacency(function() {
                w++
            });
            var B = this.getMaxValue() || 1,
            A = this.config,
            y = A.animate,
            z = this.delegate.config.levelDistance;
            this.delegate.graph.eachNode(function(G) {
                var F = 0,
                C = [];
                c.each(G.getData("valueArray"),
                function(H) {
                    F += +H;
                    C.push(1)
                });
                var E = (C.length == 1) && !A.updateHeights;
                if (y) {
                    G.setData("dimArray", c.map(G.getData("valueArray"),
                    function(H) {
                        return E ? z: (H * z / B)
                    }), "end");
                    var D = G.getData("dimArray");
                    if (!D) {
                        G.setData("dimArray", C)
                    }
                } else {
                    G.setData("dimArray", c.map(G.getData("valueArray"),
                    function(H) {
                        return E ? z: (H * z / B)
                    }))
                }
                G.setData("normalizedDim", F / B)
            })
        }
    });
    g.TM = {};
    g.TM.SliceAndDice = new q({
        compute: function(B) {
            var x = this.graph.getNode(this.clickedNode && this.clickedNode.id || this.root);
            this.controller.onBeforeCompute(x);
            var z = this.canvas.getSize(),
            y = this.config,
            A = z.width,
            w = z.height;
            this.graph.computeLevels(this.root, 0, "ignore");
            x.getPos(B).setc( - A / 2, -w / 2);
            x.setData("width", A, B);
            x.setData("height", w + y.titleHeight, B);
            this.computePositions(x, x, this.layout.orientation, B);
            this.controller.onAfterCompute(x)
        },
        computePositions: function(F, D, P, y) {
            var M = 0;
            F.eachSubnode(function(R) {
                M += R.getData("area", y)
            });
            var Q = this.config,
            N = Q.offset,
            J = F.getData("width", y),
            H = Math.max(F.getData("height", y) - Q.titleHeight, 0),
            x = F == D ? 1 : (D.getData("area", y) / M);
            var I, G, L, B, A, E, C;
            var O = (P == "h");
            if (O) {
                P = "v";
                I = H;
                G = J * x;
                L = "height";
                B = "y";
                A = "x";
                E = Q.titleHeight;
                C = 0
            } else {
                P = "h";
                I = H * x;
                G = J;
                L = "width";
                B = "x";
                A = "y";
                E = 0;
                C = Q.titleHeight
            }
            var w = D.getPos(y);
            D.setData("width", G, y);
            D.setData("height", I, y);
            var K = 0,
            z = this;
            D.eachSubnode(function(S) {
                var R = S.getPos(y);
                R[B] = K + w[B] + E;
                R[A] = w[A] + C;
                z.computePositions(D, S, P, y);
                K += S.getData(L, y)
            })
        }
    });
    g.TM.Area = {
        compute: function(w) {
            w = w || "current";
            var C = this.graph.getNode(this.clickedNode && this.clickedNode.id || this.root);
            this.controller.onBeforeCompute(C);
            var y = this.config,
            F = this.canvas.getSize(),
            x = F.width,
            E = F.height,
            D = y.offset,
            z = x - D,
            B = E - D;
            this.graph.computeLevels(this.root, 0, "ignore");
            C.getPos(w).setc( - x / 2, -E / 2);
            C.setData("width", x, w);
            C.setData("height", E, w);
            var A = {
                top: -E / 2 + y.titleHeight,
                left: -x / 2,
                width: z,
                height: B - y.titleHeight
            };
            this.computePositions(C, A, w);
            this.controller.onAfterCompute(C)
        },
        computeDim: function(B, C, E, A, z, x) {
            if (B.length + C.length == 1) {
                var y = (B.length == 1) ? B: C;
                this.layoutLast(y, E, A, x);
                return
            }
            if (B.length >= 2 && C.length == 0) {
                C = [B.shift()]
            }
            if (B.length == 0) {
                if (C.length > 0) {
                    this.layoutRow(C, E, A, x)
                }
                return
            }
            var D = B[0];
            if (z(C, E) >= z([D].concat(C), E)) {
                this.computeDim(B.slice(1), C.concat([D]), E, A, z, x)
            } else {
                var F = this.layoutRow(C, E, A, x);
                this.computeDim(B, [], F.dim, F, z, x)
            }
        },
        worstAspectRatio: function(x, F) {
            if (!x || x.length == 0) {
                return Number.MAX_VALUE
            }
            var y = 0,
            G = 0,
            B = Number.MAX_VALUE;
            for (var D = 0,
            C = x.length; D < C; D++) {
                var z = x[D]._area;
                y += z;
                B = B < z ? B: z;
                G = G > z ? G: z
            }
            var E = F * F,
            A = y * y;
            return Math.max(E * G / A, A / (E * B))
        },
        avgAspectRatio: function(B, y) {
            if (!B || B.length == 0) {
                return Number.MAX_VALUE
            }
            var D = 0;
            for (var z = 0,
            x = B.length; z < x; z++) {
                var C = B[z]._area;
                var A = C / y;
                D += y > A ? y / A: A / y
            }
            return D / x
        },
        layoutLast: function(y, x, B, A) {
            var z = y[0];
            z.getPos(A).setc(B.left, B.top);
            z.setData("width", B.width, A);
            z.setData("height", B.height, A)
        }
    };
    g.TM.Squarified = new q({
        Implements: g.TM.Area,
        computePositions: function(A, D, x) {
            var z = this.config,
            F = Math.max;
            if (D.width >= D.height) {
                this.layout.orientation = "h"
            } else {
                this.layout.orientation = "v"
            }
            var w = A.getSubnodes([1, 1], "ignore");
            if (w.length > 0) {
                this.processChildrenLayout(A, w, D, x);
                for (var C = 0,
                B = w.length; C < B; C++) {
                    var G = w[C],
                    H = z.offset,
                    I = F(G.getData("height", x) - H - z.titleHeight, 0),
                    y = F(G.getData("width", x) - H, 0),
                    E = G.getPos(x);
                    D = {
                        width: y,
                        height: I,
                        top: E.y + z.titleHeight,
                        left: E.x
                    };
                    this.computePositions(G, D, x)
                }
            }
        },
        processChildrenLayout: function(G, w, C, x) {
            var A = C.width * C.height;
            var B, y = w.length,
            D = 0,
            H = [];
            for (B = 0; B < y; B++) {
                H[B] = parseFloat(w[B].getData("area", x));
                D += H[B]
            }
            for (B = 0; B < y; B++) {
                w[B]._area = A * H[B] / D
            }
            var z = this.layout.horizontal() ? C.height: C.width;
            w.sort(function(J, I) {
                var K = I._area - J._area;
                return K ? K: (I.id == J.id ? 0 : (I.id < J.id ? 1 : -1))
            });
            var F = [w[0]];
            var E = w.slice(1);
            this.squarify(E, F, z, C, x)
        },
        squarify: function(y, B, x, A, z) {
            this.computeDim(y, B, x, A, this.worstAspectRatio, z)
        },
        layoutRow: function(y, x, A, z) {
            if (this.layout.horizontal()) {
                return this.layoutV(y, x, A, z)
            } else {
                return this.layoutH(y, x, A, z)
            }
        },
        layoutV: function(x, I, E, y) {
            var J = 0,
            A = function(w) {
                return w
            };
            c.each(x,
            function(w) {
                J += w._area
            });
            var z = A(J / I),
            F = 0;
            for (var C = 0,
            B = x.length; C < B; C++) {
                var D = A(x[C]._area / z);
                var G = x[C];
                G.getPos(y).setc(E.left, E.top + F);
                G.setData("width", z, y);
                G.setData("height", D, y);
                F += D
            }
            var H = {
                height: E.height,
                width: E.width - z,
                top: E.top,
                left: E.left + z
            };
            H.dim = Math.min(H.width, H.height);
            if (H.dim != H.height) {
                this.layout.change()
            }
            return H
        },
        layoutH: function(x, G, C, y) {
            var I = 0;
            c.each(x,
            function(w) {
                I += w._area
            });
            var H = I / G,
            D = C.top,
            z = 0;
            for (var B = 0,
            A = x.length; B < A; B++) {
                var E = x[B];
                var G = E._area / H;
                E.getPos(y).setc(C.left + z, D);
                E.setData("width", G, y);
                E.setData("height", H, y);
                z += G
            }
            var F = {
                height: C.height - H,
                width: C.width,
                top: C.top + H,
                left: C.left
            };
            F.dim = Math.min(F.width, F.height);
            if (F.dim != F.width) {
                this.layout.change()
            }
            return F
        }
    });
    g.TM.Strip = new q({
        Implements: g.TM.Area,
        computePositions: function(A, D, x) {
            var w = A.getSubnodes([1, 1], "ignore"),
            z = this.config,
            F = Math.max;
            if (w.length > 0) {
                this.processChildrenLayout(A, w, D, x);
                for (var C = 0,
                B = w.length; C < B; C++) {
                    var G = w[C];
                    var H = z.offset,
                    I = F(G.getData("height", x) - H - z.titleHeight, 0),
                    y = F(G.getData("width", x) - H, 0);
                    var E = G.getPos(x);
                    D = {
                        width: y,
                        height: I,
                        top: E.y + z.titleHeight,
                        left: E.x
                    };
                    this.computePositions(G, D, x)
                }
            }
        },
        processChildrenLayout: function(G, w, B, x) {
            var z = B.width * B.height;
            var A, y = w.length,
            C = 0,
            H = [];
            for (A = 0; A < y; A++) {
                H[A] = +w[A].getData("area", x);
                C += H[A]
            }
            for (A = 0; A < y; A++) {
                w[A]._area = z * H[A] / C
            }
            var F = this.layout.horizontal() ? B.width: B.height;
            var E = [w[0]];
            var D = w.slice(1);
            this.stripify(D, E, F, B, x)
        },
        stripify: function(y, B, x, A, z) {
            this.computeDim(y, B, x, A, this.avgAspectRatio, z)
        },
        layoutRow: function(y, x, A, z) {
            if (this.layout.horizontal()) {
                return this.layoutH(y, x, A, z)
            } else {
                return this.layoutV(y, x, A, z)
            }
        },
        layoutV: function(x, G, D, y) {
            var H = 0;
            c.each(x,
            function(w) {
                H += w._area
            });
            var z = H / G,
            E = 0;
            for (var B = 0,
            A = x.length; B < A; B++) {
                var F = x[B];
                var C = F._area / z;
                F.getPos(y).setc(D.left, D.top + (G - C - E));
                F.setData("width", z, y);
                F.setData("height", C, y);
                E += C
            }
            return {
                height: D.height,
                width: D.width - z,
                top: D.top,
                left: D.left + z,
                dim: G
            }
        },
        layoutH: function(x, F, C, y) {
            var H = 0;
            c.each(x,
            function(w) {
                H += w._area
            });
            var G = H / F,
            D = C.height - G,
            z = 0;
            for (var B = 0,
            A = x.length; B < A; B++) {
                var E = x[B];
                var I = E._area / G;
                E.getPos(y).setc(C.left + z, C.top + D);
                E.setData("width", I, y);
                E.setData("height", G, y);
                z += I
            }
            return {
                height: C.height - G,
                width: C.width,
                top: C.top,
                left: C.left,
                dim: F
            }
        }
    });
    g.Icicle = new q({
        compute: function(E) {
            E = E || "current";
            var D = this.graph.getNode(this.root),
            z = this.config,
            H = this.canvas.getSize(),
            w = H.width,
            G = H.height,
            A = z.offset,
            C = z.constrained ? z.levelsToShow: Number.MAX_VALUE;
            this.controller.onBeforeCompute(D);
            e.Util.computeLevels(this.graph, D.id, 0, "ignore");
            var F = 0;
            e.Util.eachLevel(D, 0, false,
            function(J, I) {
                if (I > F) {
                    F = I
                }
            });
            var y = this.graph.getNode(this.clickedNode && this.clickedNode.id || D.id);
            var x = Math.min(F, C - 1);
            var B = y._depth;
            if (this.layout.horizontal()) {
                this.computeSubtree(y, -w / 2, -G / 2, w / (x + 1), G, B, x, E)
            } else {
                this.computeSubtree(y, -w / 2, -G / 2, w, G / (x + 1), B, x, E)
            }
        },
        computeSubtree: function(G, I, F, w, L, E, A, H) {
            G.getPos(H).setc(I, F);
            G.setData("width", w, H);
            G.setData("height", L, H);
            var C, K = 0,
            J = 0;
            var z = e.Util.getSubnodes(G, [1, 1], "ignore");
            if (!z.length) {
                return
            }
            c.each(z,
            function(x) {
                J += x.getData("dim")
            });
            for (var D = 0,
            B = z.length; D < B; D++) {
                if (this.layout.horizontal()) {
                    C = L * z[D].getData("dim") / J;
                    this.computeSubtree(z[D], I + w, F, w, C, E, A, H);
                    F += C
                } else {
                    C = w * z[D].getData("dim") / J;
                    this.computeSubtree(z[D], I, F + L, C, L, E, A, H);
                    I += C
                }
            }
        }
    });
    $jit.Icicle = new q({
        Implements: [d, o, g.Icicle],
        layout: {
            orientation: "h",
            vertical: function() {
                return this.orientation == "v"
            },
            horizontal: function() {
                return this.orientation == "h"
            },
            change: function() {
                this.orientation = this.vertical() ? "h": "v"
            }
        },
        initialize: function(w) {
            var x = {
                animate: false,
                orientation: "h",
                offset: 2,
                levelsToShow: Number.MAX_VALUE,
                constrained: false,
                Node: {
                    type: "rectangle",
                    overridable: true
                },
                Edge: {
                    type: "none"
                },
                Label: {
                    type: "Native"
                },
                duration: 700,
                fps: 45
            };
            var z = n("Canvas", "Node", "Edge", "Fx", "Tips", "NodeStyles", "Events", "Navigation", "Controller", "Label");
            this.controller = this.config = c.merge(z, x, w);
            this.layout.orientation = this.config.orientation;
            var y = this.config;
            if (y.useCanvas) {
                this.canvas = y.useCanvas;
                this.config.labelContainer = this.canvas.id + "-label"
            } else {
                this.canvas = new l(this, y);
                this.config.labelContainer = (typeof y.injectInto == "string" ? y.injectInto: y.injectInto.id) + "-label"
            }
            this.graphOptions = {
                klass: p,
                Node: {
                    selected: false,
                    exist: true,
                    drawn: true
                }
            };
            this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge, this.config.Label);
            this.labels = new $jit.Icicle.Label[this.config.Label.type](this);
            this.fx = new $jit.Icicle.Plot(this, $jit.Icicle);
            this.op = new $jit.Icicle.Op(this);
            this.group = new $jit.Icicle.Group(this);
            this.clickedNode = null;
            this.initializeExtras()
        },
        refresh: function() {
            var w = this.config.Label.type;
            if (w != "Native") {
                var x = this;
                this.graph.eachNode(function(y) {
                    x.labels.hideLabel(y, false)
                })
            }
            this.compute();
            this.plot()
        },
        plot: function() {
            this.fx.plot(this.config)
        },
        enter: function(y) {
            if (this.busy) {
                return
            }
            this.busy = true;
            var x = this,
            w = this.config;
            var z = {
                onComplete: function() {
                    if (w.request) {
                        x.compute()
                    }
                    if (w.animate) {
                        x.graph.nodeList.setDataset(["current", "end"], {
                            alpha: [1, 0]
                        });
                        e.Util.eachSubgraph(y,
                        function(A) {
                            A.setData("alpha", 1, "end")
                        },
                        "ignore");
                        x.fx.animate({
                            duration: 500,
                            modes: ["node-property:alpha"],
                            onComplete: function() {
                                x.clickedNode = y;
                                x.compute("end");
                                x.fx.animate({
                                    modes: ["linear", "node-property:width:height"],
                                    duration: 1000,
                                    onComplete: function() {
                                        x.busy = false;
                                        x.clickedNode = y
                                    }
                                })
                            }
                        })
                    } else {
                        x.clickedNode = y;
                        x.busy = false;
                        x.refresh()
                    }
                }
            };
            if (w.request) {
                this.requestNodes(clickedNode, z)
            } else {
                z.onComplete()
            }
        },
        out: function() {
            if (this.busy) {
                return
            }
            var B = this,
            A = e.Util,
            y = this.config,
            D = this.graph,
            x = A.getParents(D.getNode(this.clickedNode && this.clickedNode.id || this.root)),
            z = x[0],
            w = z,
            C = this.clickedNode;
            this.busy = true;
            this.events.hoveredNode = false;
            if (!z) {
                this.busy = false;
                return
            }
            callback = {
                onComplete: function() {
                    B.clickedNode = z;
                    if (y.request) {
                        B.requestNodes(z, {
                            onComplete: function() {
                                B.compute();
                                B.plot();
                                B.busy = false
                            }
                        })
                    } else {
                        B.compute();
                        B.plot();
                        B.busy = false
                    }
                }
            };
            if (y.animate) {
                this.clickedNode = w;
                this.compute("end");
                this.clickedNode = C;
                this.fx.animate({
                    modes: ["linear", "node-property:width:height"],
                    duration: 1000,
                    onComplete: function() {
                        B.clickedNode = w;
                        D.nodeList.setDataset(["current", "end"], {
                            alpha: [0, 1]
                        });
                        A.eachSubgraph(C,
                        function(E) {
                            E.setData("alpha", 1)
                        },
                        "ignore");
                        B.fx.animate({
                            duration: 500,
                            modes: ["node-property:alpha"],
                            onComplete: function() {
                                callback.onComplete()
                            }
                        })
                    }
                })
            } else {
                callback.onComplete()
            }
        },
        requestNodes: function(y, z) {
            var x = c.merge(this.controller, z),
            w = this.config.constrained ? this.config.levelsToShow: Number.MAX_VALUE;
            if (x.request) {
                var B = [],
                A = y._depth;
                e.Util.eachLevel(y, 0, w,
                function(C) {
                    if (C.drawn && !e.Util.anySubnode(C)) {
                        B.push(C);
                        C._level = C._depth - A;
                        if (this.config.constrained) {
                            C._level = w - C._level
                        }
                    }
                });
                this.group.requestNodes(B, x)
            } else {
                x.onComplete()
            }
        }
    });
    $jit.Icicle.Op = new q({
        Implements: e.Op
    });
    $jit.Icicle.Group = new q({
        initialize: function(w) {
            this.viz = w;
            this.canvas = w.canvas;
            this.config = w.config
        },
        requestNodes: function(B, A) {
            var z = 0,
            x = B.length,
            D = {};
            var y = function() {
                A.onComplete()
            };
            var w = this.viz;
            if (x == 0) {
                y()
            }
            for (var C = 0; C < x; C++) {
                D[B[C].id] = B[C];
                A.request(B[C].id, B[C]._level, {
                    onComplete: function(F, E) {
                        if (E && E.children) {
                            E.id = F;
                            w.op.sum(E, {
                                type: "nothing"
                            })
                        }
                        if (++z == x) {
                            e.Util.computeLevels(w.graph, w.root, 0);
                            y()
                        }
                    }
                })
            }
        }
    });
    $jit.Icicle.Plot = new q({
        Implements: e.Plot,
        plot: function(A, y) {
            A = A || this.viz.controller;
            var w = this.viz,
            B = w.graph,
            x = B.getNode(w.clickedNode && w.clickedNode.id || w.root),
            z = x._depth;
            w.canvas.clear();
            this.plotTree(x, c.merge(A, {
                withLabels: true,
                hideLabels: false,
                plotSubtree: function(C, D) {
                    return ! w.config.constrained || (D._depth - z < w.config.levelsToShow)
                }
            }), y)
        }
    });
    $jit.Icicle.Label = {};
    $jit.Icicle.Label.Native = new q({
        Implements: e.Label.Native,
        renderLabel: function(x, y, A) {
            var D = x.getCtx(),
            w = y.getData("width"),
            C = y.getData("height"),
            E = y.getLabelData("size"),
            z = D.measureText(y.name);
            if (C < (E * 1.5) || w < z.width) {
                return
            }
            var B = y.pos.getc(true);
            D.fillText(y.name, B.x + w / 2, B.y + C / 2)
        }
    });
    $jit.Icicle.Label.SVG = new q({
        Implements: e.Label.SVG,
        initialize: function(w) {
            this.viz = w
        },
        placeLabel: function(x, A, y) {
            var C = A.pos.getc(true),
            z = this.viz.canvas;
            var w = z.getSize();
            var B = {
                x: Math.round(C.x + w.width / 2),
                y: Math.round(C.y + w.height / 2)
            };
            x.setAttribute("x", B.x);
            x.setAttribute("y", B.y);
            y.onPlaceLabel(x, A)
        }
    });
    $jit.Icicle.Label.HTML = new q({
        Implements: e.Label.HTML,
        initialize: function(w) {
            this.viz = w
        },
        placeLabel: function(x, B, y) {
            var D = B.pos.getc(true),
            z = this.viz.canvas;
            var w = z.getSize();
            var C = {
                x: Math.round(D.x + w.width / 2),
                y: Math.round(D.y + w.height / 2)
            };
            var A = x.style;
            A.left = C.x + "px";
            A.top = C.y + "px";
            A.display = "";
            y.onPlaceLabel(x, B)
        }
    });
    $jit.Icicle.Plot.NodeTypes = new q({
        none: {
            render: c.empty
        },
        rectangle: {
            render: function(z, x, K) {
                var y = this.viz.config;
                var C = y.offset;
                var w = z.getData("width");
                var H = z.getData("height");
                var B = z.getData("border");
                var G = z.pos.getc(true);
                var F = G.x + C / 2,
                D = G.y + C / 2;
                var J = x.getCtx();
                if (w - C < 2 || H - C < 2) {
                    return
                }
                if (y.cushion) {
                    var A = z.getData("color");
                    var I = J.createRadialGradient(F + (w - C) / 2, D + (H - C) / 2, 1, F + (w - C) / 2, D + (H - C) / 2, w < H ? H: w);
                    var E = c.rgbToHex(c.map(c.hexToRgb(A),
                    function(L) {
                        return L * 0.3 >> 0
                    }));
                    I.addColorStop(0, A);
                    I.addColorStop(1, E);
                    J.fillStyle = I
                }
                if (B) {
                    J.strokeStyle = B;
                    J.lineWidth = 3
                }
                J.fillRect(F, D, Math.max(0, w - C), Math.max(0, H - C));
                B && J.strokeRect(G.x, G.y, w, H)
            },
            contains: function(y, A) {
                if (this.viz.clickedNode && !$jit.Graph.Util.isDescendantOf(y, this.viz.clickedNode.id)) {
                    return false
                }
                var z = y.pos.getc(true),
                x = y.getData("width"),
                w = y.getData("height");
                return this.nodeHelper.rectangle.contains({
                    x: z.x + x / 2,
                    y: z.y + w / 2
                },
                A, x, w)
            }
        }
    });
    $jit.Icicle.Plot.EdgeTypes = new q({
        none: c.empty
    });
    g.ForceDirected = new q({
        getOptions: function(D) {
            var B = this.canvas.getSize();
            var y = B.width,
            A = B.height;
            var C = 0;
            this.graph.eachNode(function(w) {
                C++
            });
            var E = y * A / C,
            z = Math.sqrt(E);
            var x = this.config.levelDistance;
            return {
                width: y,
                height: A,
                tstart: y * 0.1,
                nodef: function(w) {
                    return E / (w || 1)
                },
                edgef: function(w) {
                    return z * (w - x)
                }
            }
        },
        compute: function(x, y) {
            var z = c.splat(x || ["current", "start", "end"]);
            var w = this.getOptions();
            f.compute(this.graph, z, this.config);
            this.graph.computeLevels(this.root, 0, "ignore");
            this.graph.eachNode(function(A) {
                c.each(z,
                function(B) {
                    var C = A.getPos(B);
                    if (C.equals(p.KER)) {
                        C.x = w.width / 5 * (Math.random() - 0.5);
                        C.y = w.height / 5 * (Math.random() - 0.5)
                    }
                    A.disp = {};
                    c.each(z,
                    function(D) {
                        A.disp[D] = r(0, 0)
                    })
                })
            });
            this.computePositions(z, w, y)
        },
        computePositions: function(A, y, B) {
            var C = this.config.iterations,
            x = 0,
            z = this;
            if (B) { (function w() {
                    for (var E = B.iter,
                    D = 0; D < E; D++) {
                        y.t = y.tstart;
                        if (C) {
                            y.t *= (1 - x++/(C-1))}z.computePositionStep(A,y);if(C&&x>=C){B.onComplete();return}}B.onStep(Math.round(x/ (C - 1) * 100));
                            setTimeout(w, 1)
                        })()
                    } else {
                        for (; x < C; x++) {
                            y.t = y.tstart * (1 - x / (C - 1));
                            this.computePositionStep(A, y)
                        }
                    }
                },
                computePositionStep: function(D, w) {
                    var E = this.graph;
                    var y = Math.min,
                    C = Math.max;
                    var B = r(0, 0);
                    E.eachNode(function(G) {
                        c.each(D,
                        function(H) {
                            G.disp[H].x = 0;
                            G.disp[H].y = 0
                        });
                        E.eachNode(function(H) {
                            if (H.id != G.id) {
                                c.each(D,
                                function(L) {
                                    var J = G.getPos(L),
                                    I = H.getPos(L);
                                    B.x = J.x - I.x;
                                    B.y = J.y - I.y;
                                    var K = B.norm() || 1;
                                    G.disp[L].$add(B.$scale(w.nodef(K) / K))
                                })
                            }
                        })
                    });
                    var x = !!E.getNode(this.root).visited;
                    E.eachNode(function(G) {
                        G.eachAdjacency(function(H) {
                            var I = H.nodeTo;
                            if ( !! I.visited === x) {
                                c.each(D,
                                function(M) {
                                    var K = G.getPos(M),
                                    J = I.getPos(M);
                                    B.x = K.x - J.x;
                                    B.y = K.y - J.y;
                                    var L = B.norm() || 1;
                                    G.disp[M].$add(B.$scale( - w.edgef(L) / L));
                                    I.disp[M].$add(B.$scale( - 1))
                                })
                            }
                        });
                        G.visited = !x
                    });
                    var F = w.t,
                    z = w.width / 2,
                    A = w.height / 2;
                    E.eachNode(function(G) {
                        c.each(D,
                        function(J) {
                            var H = G.disp[J];
                            var I = H.norm() || 1;
                            var J = G.getPos(J);
                            J.$add(r(H.x * y(Math.abs(H.x), F) / I, H.y * y(Math.abs(H.y), F) / I));
                            J.x = y(z, C( - z, J.x));
                            J.y = y(A, C( - A, J.y))
                        })
                    })
                }
            }); $jit.ForceDirected = new q({
                Implements: [d, o, g.ForceDirected],
                initialize: function(x) {
                    var w = $jit.ForceDirected;
                    var y = {
                        iterations: 50,
                        levelDistance: 50
                    };
                    this.controller = this.config = c.merge(n("Canvas", "Node", "Edge", "Fx", "Tips", "NodeStyles", "Events", "Navigation", "Controller", "Label"), y, x);
                    var z = this.config;
                    if (z.useCanvas) {
                        this.canvas = z.useCanvas;
                        this.config.labelContainer = this.canvas.id + "-label"
                    } else {
                        if (z.background) {
                            z.background = c.merge({
                                type: "Circles"
                            },
                            z.background)
                        }
                        this.canvas = new l(this, z);
                        this.config.labelContainer = (typeof z.injectInto == "string" ? z.injectInto: z.injectInto.id) + "-label"
                    }
                    this.graphOptions = {
                        klass: p,
                        Node: {
                            selected: false,
                            exist: true,
                            drawn: true
                        }
                    };
                    this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge);
                    this.labels = new w.Label[z.Label.type](this);
                    this.fx = new w.Plot(this, w);
                    this.op = new w.Op(this);
                    this.json = null;
                    this.busy = false;
                    this.initializeExtras()
                },
                refresh: function() {
                    this.compute();
                    this.plot()
                },
                reposition: function() {
                    this.compute("end")
                },
                computeIncremental: function(w) {
                    w = c.merge({
                        iter: 20,
                        property: "end",
                        onStep: c.empty,
                        onComplete: c.empty
                    },
                    w || {});
                    this.config.onBeforeCompute(this.graph.getNode(this.root));
                    this.compute(w.property, w)
                },
                plot: function() {
                    this.fx.plot()
                },
                animate: function(w) {
                    this.fx.animate(c.merge({
                        modes: ["linear"]
                    },
                    w || {}))
                }
            }); $jit.ForceDirected.$extend = true; (function(w) {
                w.Op = new q({
                    Implements: e.Op
                });
                w.Plot = new q({
                    Implements: e.Plot
                });
                w.Label = {};
                w.Label.Native = new q({
                    Implements: e.Label.Native
                });
                w.Label.SVG = new q({
                    Implements: e.Label.SVG,
                    initialize: function(x) {
                        this.viz = x
                    },
                    placeLabel: function(H, B, C) {
                        var F = B.pos.getc(true),
                        y = this.viz.canvas,
                        z = y.translateOffsetX,
                        x = y.translateOffsetY,
                        G = y.scaleOffsetX,
                        E = y.scaleOffsetY,
                        D = y.getSize();
                        var A = {
                            x: Math.round(F.x * G + z + D.width / 2),
                            y: Math.round(F.y * E + x + D.height / 2)
                        };
                        H.setAttribute("x", A.x);
                        H.setAttribute("y", A.y);
                        C.onPlaceLabel(H, B)
                    }
                });
                w.Label.HTML = new q({
                    Implements: e.Label.HTML,
                    initialize: function(x) {
                        this.viz = x
                    },
                    placeLabel: function(I, C, D) {
                        var G = C.pos.getc(true),
                        z = this.viz.canvas,
                        A = z.translateOffsetX,
                        y = z.translateOffsetY,
                        H = z.scaleOffsetX,
                        F = z.scaleOffsetY,
                        E = z.getSize();
                        var B = {
                            x: Math.round(G.x * H + A + E.width / 2),
                            y: Math.round(G.y * F + y + E.height / 2)
                        };
                        var x = I.style;
                        x.left = B.x + "px";
                        x.top = B.y + "px";
                        x.display = this.fitsInCanvas(B, z) ? "": "none";
                        D.onPlaceLabel(I, C)
                    }
                });
                w.Plot.NodeTypes = new q({
                    none: {
                        render: c.empty,
                        contains: c.lambda(false)
                    },
                    circle: {
                        render: function(y, x) {
                            var A = y.pos.getc(true),
                            z = y.getData("dim");
                            this.nodeHelper.circle.render("fill", A, z, x)
                        },
                        contains: function(x, A) {
                            var z = x.pos.getc(true),
                            y = x.getData("dim");
                            return this.nodeHelper.circle.contains(z, A, y)
                        }
                    },
                    ellipse: {
                        render: function(A, y) {
                            var B = A.pos.getc(true),
                            z = A.getData("width"),
                            x = A.getData("height");
                            this.nodeHelper.ellipse.render("fill", B, z, x, y)
                        },
                        contains: function(z, B) {
                            var A = z.pos.getc(true),
                            y = z.getData("width"),
                            x = z.getData("height");
                            return this.nodeHelper.ellipse.contains(A, B, y, x)
                        }
                    },
                    square: {
                        render: function(y, x) {
                            var A = y.pos.getc(true),
                            z = y.getData("dim");
                            this.nodeHelper.square.render("fill", A, z, x)
                        },
                        contains: function(x, A) {
                            var z = x.pos.getc(true),
                            y = x.getData("dim");
                            return this.nodeHelper.square.contains(z, A, y)
                        }
                    },
                    rectangle: {
                        render: function(A, y) {
                            var B = A.pos.getc(true),
                            z = A.getData("width"),
                            x = A.getData("height");
                            this.nodeHelper.rectangle.render("fill", B, z, x, y)
                        },
                        contains: function(z, B) {
                            var A = z.pos.getc(true),
                            y = z.getData("width"),
                            x = z.getData("height");
                            return this.nodeHelper.rectangle.contains(A, B, y, x)
                        }
                    },
                    triangle: {
                        render: function(y, x) {
                            var A = y.pos.getc(true),
                            z = y.getData("dim");
                            this.nodeHelper.triangle.render("fill", A, z, x)
                        },
                        contains: function(x, A) {
                            var z = x.pos.getc(true),
                            y = x.getData("dim");
                            return this.nodeHelper.triangle.contains(z, A, y)
                        }
                    },
                    star: {
                        render: function(y, x) {
                            var A = y.pos.getc(true),
                            z = y.getData("dim");
                            this.nodeHelper.star.render("fill", A, z, x)
                        },
                        contains: function(x, A) {
                            var z = x.pos.getc(true),
                            y = x.getData("dim");
                            return this.nodeHelper.star.contains(z, A, y)
                        }
                    }
                });
                w.Plot.EdgeTypes = new q({
                    none: c.empty,
                    line: {
                        render: function(x, y) {
                            var A = x.nodeFrom.pos.getc(true),
                            z = x.nodeTo.pos.getc(true);
                            this.edgeHelper.line.render(A, z, y)
                        },
                        contains: function(x, A) {
                            var z = x.nodeFrom.pos.getc(true),
                            y = x.nodeTo.pos.getc(true);
                            return this.edgeHelper.line.contains(z, y, A, this.edge.epsilon)
                        }
                    },
                    arrow: {
                        render: function(y, z) {
                            var D = y.nodeFrom.pos.getc(true),
                            C = y.nodeTo.pos.getc(true),
                            B = y.getData("dim"),
                            A = y.data.$direction,
                            x = (A && A.length > 1 && A[0] != y.nodeFrom.id);
                            this.edgeHelper.arrow.render(D, C, B, x, z)
                        },
                        contains: function(x, A) {
                            var z = x.nodeFrom.pos.getc(true),
                            y = x.nodeTo.pos.getc(true);
                            return this.edgeHelper.arrow.contains(z, y, A, this.edge.epsilon)
                        }
                    }
                })
            })($jit.ForceDirected); $jit.TM = {};
            var v = $jit.TM; $jit.TM.$extend = true; v.Base = {
                layout: {
                    orientation: "h",
                    vertical: function() {
                        return this.orientation == "v"
                    },
                    horizontal: function() {
                        return this.orientation == "h"
                    },
                    change: function() {
                        this.orientation = this.vertical() ? "h": "v"
                    }
                },
                initialize: function(w) {
                    var x = {
                        orientation: "h",
                        titleHeight: 13,
                        offset: 2,
                        levelsToShow: 0,
                        constrained: false,
                        animate: false,
                        Node: {
                            type: "rectangle",
                            overridable: true,
                            width: 3,
                            height: 3,
                            color: "#444"
                        },
                        Label: {
                            textAlign: "center",
                            textBaseline: "top"
                        },
                        Edge: {
                            type: "none"
                        },
                        duration: 700,
                        fps: 45
                    };
                    this.controller = this.config = c.merge(n("Canvas", "Node", "Edge", "Fx", "Controller", "Tips", "NodeStyles", "Events", "Navigation", "Label"), x, w);
                    this.layout.orientation = this.config.orientation;
                    var y = this.config;
                    if (y.useCanvas) {
                        this.canvas = y.useCanvas;
                        this.config.labelContainer = this.canvas.id + "-label"
                    } else {
                        if (y.background) {
                            y.background = c.merge({
                                type: "Circles"
                            },
                            y.background)
                        }
                        this.canvas = new l(this, y);
                        this.config.labelContainer = (typeof y.injectInto == "string" ? y.injectInto: y.injectInto.id) + "-label"
                    }
                    this.graphOptions = {
                        klass: p,
                        Node: {
                            selected: false,
                            exist: true,
                            drawn: true
                        }
                    };
                    this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge);
                    this.labels = new v.Label[y.Label.type](this);
                    this.fx = new v.Plot(this);
                    this.op = new v.Op(this);
                    this.group = new v.Group(this);
                    this.geom = new v.Geom(this);
                    this.clickedNode = null;
                    this.busy = false;
                    this.initializeExtras()
                },
                refresh: function() {
                    if (this.busy) {
                        return
                    }
                    this.busy = true;
                    var x = this;
                    if (this.config.animate) {
                        this.compute("end");
                        this.config.levelsToShow > 0 && this.geom.setRightLevelToShow(this.graph.getNode(this.clickedNode && this.clickedNode.id || this.root));
                        this.fx.animate(c.merge(this.config, {
                            modes: ["linear", "node-property:width:height"],
                            onComplete: function() {
                                x.busy = false
                            }
                        }))
                    } else {
                        var w = this.config.Label.type;
                        if (w != "Native") {
                            var x = this;
                            this.graph.eachNode(function(y) {
                                x.labels.hideLabel(y, false)
                            })
                        }
                        this.busy = false;
                        this.compute();
                        this.config.levelsToShow > 0 && this.geom.setRightLevelToShow(this.graph.getNode(this.clickedNode && this.clickedNode.id || this.root));
                        this.plot()
                    }
                },
                plot: function() {
                    this.fx.plot()
                },
                leaf: function(w) {
                    return w.getSubnodes([1, 1], "ignore").length == 0
                },
                enter: function(C) {
                    if (this.busy) {
                        return
                    }
                    this.busy = true;
                    var y = this,
                    x = this.config,
                    A = this.graph,
                    w = C,
                    z = this.clickedNode;
                    var B = {
                        onComplete: function() {
                            if (x.levelsToShow > 0) {
                                y.geom.setRightLevelToShow(C)
                            }
                            if (x.levelsToShow > 0 || x.request) {
                                y.compute()
                            }
                            if (x.animate) {
                                A.nodeList.setData("alpha", 0, "end");
                                C.eachSubgraph(function(D) {
                                    D.setData("alpha", 1, "end")
                                },
                                "ignore");
                                y.fx.animate({
                                    duration: 500,
                                    modes: ["node-property:alpha"],
                                    onComplete: function() {
                                        y.clickedNode = w;
                                        y.compute("end");
                                        y.clickedNode = z;
                                        y.fx.animate({
                                            modes: ["linear", "node-property:width:height"],
                                            duration: 1000,
                                            onComplete: function() {
                                                y.busy = false;
                                                y.clickedNode = w
                                            }
                                        })
                                    }
                                })
                            } else {
                                y.busy = false;
                                y.clickedNode = C;
                                y.refresh()
                            }
                        }
                    };
                    if (x.request) {
                        this.requestNodes(w, B)
                    } else {
                        B.onComplete()
                    }
                },
                out: function() {
                    if (this.busy) {
                        return
                    }
                    this.busy = true;
                    this.events.hoveredNode = false;
                    var A = this,
                    y = this.config,
                    C = this.graph,
                    x = C.getNode(this.clickedNode && this.clickedNode.id || this.root).getParents(),
                    z = x[0],
                    w = z,
                    B = this.clickedNode;
                    if (!z) {
                        this.busy = false;
                        return
                    }
                    callback = {
                        onComplete: function() {
                            A.clickedNode = z;
                            if (y.request) {
                                A.requestNodes(z, {
                                    onComplete: function() {
                                        A.compute();
                                        A.plot();
                                        A.busy = false
                                    }
                                })
                            } else {
                                A.compute();
                                A.plot();
                                A.busy = false
                            }
                        }
                    };
                    if (y.levelsToShow > 0) {
                        this.geom.setRightLevelToShow(z)
                    }
                    if (y.animate) {
                        this.clickedNode = w;
                        this.compute("end");
                        this.clickedNode = B;
                        this.fx.animate({
                            modes: ["linear", "node-property:width:height"],
                            duration: 1000,
                            onComplete: function() {
                                A.clickedNode = w;
                                C.eachNode(function(D) {
                                    D.setDataset(["current", "end"], {
                                        alpha: [0, 1]
                                    })
                                },
                                "ignore");
                                B.eachSubgraph(function(D) {
                                    D.setData("alpha", 1)
                                },
                                "ignore");
                                A.fx.animate({
                                    duration: 500,
                                    modes: ["node-property:alpha"],
                                    onComplete: function() {
                                        callback.onComplete()
                                    }
                                })
                            }
                        })
                    } else {
                        callback.onComplete()
                    }
                },
                requestNodes: function(y, z) {
                    var x = c.merge(this.controller, z),
                    w = this.config.levelsToShow;
                    if (x.request) {
                        var B = [],
                        A = y._depth;
                        y.eachLevel(0, w,
                        function(D) {
                            var C = w - (D._depth - A);
                            if (D.drawn && !D.anySubnode() && C > 0) {
                                B.push(D);
                                D._level = C
                            }
                        });
                        this.group.requestNodes(B, x)
                    } else {
                        x.onComplete()
                    }
                },
                reposition: function() {
                    this.compute("end")
                }
            }; v.Op = new q({
                Implements: e.Op,
                initialize: function(w) {
                    this.viz = w
                }
            }); v.Geom = new q({
                Implements: e.Geom,
                getRightLevelToShow: function() {
                    return this.viz.config.levelsToShow
                },
                setRightLevelToShow: function(x) {
                    var y = this.getRightLevelToShow(),
                    w = this.viz.labels;
                    x.eachLevel(0, y + 1,
                    function(A) {
                        var z = A._depth - x._depth;
                        if (z > y) {
                            A.drawn = false;
                            A.exist = false;
                            A.ignore = true;
                            w.hideLabel(A, false)
                        } else {
                            A.drawn = true;
                            A.exist = true;
                            delete A.ignore
                        }
                    });
                    x.drawn = true;
                    delete x.ignore
                }
            }); v.Group = new q({
                initialize: function(w) {
                    this.viz = w;
                    this.canvas = w.canvas;
                    this.config = w.config
                },
                requestNodes: function(B, A) {
                    var z = 0,
                    x = B.length,
                    D = {};
                    var y = function() {
                        A.onComplete()
                    };
                    var w = this.viz;
                    if (x == 0) {
                        y()
                    }
                    for (var C = 0; C < x; C++) {
                        D[B[C].id] = B[C];
                        A.request(B[C].id, B[C]._level, {
                            onComplete: function(F, E) {
                                if (E && E.children) {
                                    E.id = F;
                                    w.op.sum(E, {
                                        type: "nothing"
                                    })
                                }
                                if (++z == x) {
                                    w.graph.computeLevels(w.root, 0);
                                    y()
                                }
                            }
                        })
                    }
                }
            }); v.Plot = new q({
                Implements: e.Plot,
                initialize: function(w) {
                    this.viz = w;
                    this.config = w.config;
                    this.node = this.config.Node;
                    this.edge = this.config.Edge;
                    this.animation = new u;
                    this.nodeTypes = new v.Plot.NodeTypes;
                    this.edgeTypes = new v.Plot.EdgeTypes;
                    this.labels = w.labels
                },
                plot: function(y, x) {
                    var w = this.viz,
                    z = w.graph;
                    w.canvas.clear();
                    this.plotTree(z.getNode(w.clickedNode && w.clickedNode.id || w.root), c.merge(w.config, y || {},
                    {
                        withLabels: true,
                        hideLabels: false,
                        plotSubtree: function(B, A) {
                            return B.anySubnode("exist")
                        }
                    }), x)
                }
            }); v.Label = {}; v.Label.Native = new q({
                Implements: e.Label.Native,
                initialize: function(w) {
                    this.config = w.config;
                    this.leaf = w.leaf
                },
                renderLabel: function(z, A, B) {
                    if (!this.leaf(A) && !this.config.titleHeight) {
                        return
                    }
                    var D = A.pos.getc(true),
                    G = z.getCtx(),
                    w = A.getData("width"),
                    F = A.getData("height"),
                    E = D.x + w / 2,
                    C = D.y;
                    G.fillText(A.name, E, C, w)
                }
            }); v.Label.SVG = new q({
                Implements: e.Label.SVG,
                initialize: function(w) {
                    this.viz = w;
                    this.leaf = w.leaf;
                    this.config = w.config
                },
                placeLabel: function(G, A, B) {
                    var E = A.pos.getc(true),
                    x = this.viz.canvas,
                    y = x.translateOffsetX,
                    w = x.translateOffsetY,
                    F = x.scaleOffsetX,
                    D = x.scaleOffsetY,
                    C = x.getSize();
                    var z = {
                        x: Math.round(E.x * F + y + C.width / 2),
                        y: Math.round(E.y * D + w + C.height / 2)
                    };
                    G.setAttribute("x", z.x);
                    G.setAttribute("y", z.y);
                    if (!this.leaf(A) && !this.config.titleHeight) {
                        G.style.display = "none"
                    }
                    B.onPlaceLabel(G, A)
                }
            }); v.Label.HTML = new q({
                Implements: e.Label.HTML,
                initialize: function(w) {
                    this.viz = w;
                    this.leaf = w.leaf;
                    this.config = w.config
                },
                placeLabel: function(H, B, C) {
                    var F = B.pos.getc(true),
                    y = this.viz.canvas,
                    z = y.translateOffsetX,
                    x = y.translateOffsetY,
                    G = y.scaleOffsetX,
                    E = y.scaleOffsetY,
                    D = y.getSize();
                    var A = {
                        x: Math.round(F.x * G + z + D.width / 2),
                        y: Math.round(F.y * E + x + D.height / 2)
                    };
                    var w = H.style;
                    w.left = A.x + "px";
                    w.top = A.y + "px";
                    w.width = B.getData("width") * G + "px";
                    w.height = B.getData("height") * E + "px";
                    w.zIndex = B._depth * 100;
                    w.display = "";
                    if (!this.leaf(B) && !this.config.titleHeight) {
                        H.style.display = "none"
                    }
                    C.onPlaceLabel(H, B)
                }
            }); v.Plot.NodeTypes = new q({
                none: {
                    render: c.empty
                },
                rectangle: {
                    render: function(z, x, M) {
                        var D = this.viz.leaf(z),
                        y = this.config,
                        I = y.offset,
                        C = y.titleHeight,
                        H = z.pos.getc(true),
                        w = z.getData("width"),
                        J = z.getData("height"),
                        B = z.getData("border"),
                        L = x.getCtx(),
                        G = H.x + I / 2,
                        E = H.y + I / 2;
                        if (w <= I || J <= I) {
                            return
                        }
                        if (D) {
                            if (y.cushion) {
                                var K = L.createRadialGradient(G + (w - I) / 2, E + (J - I) / 2, 1, G + (w - I) / 2, E + (J - I) / 2, w < J ? J: w);
                                var A = z.getData("color");
                                var F = c.rgbToHex(c.map(c.hexToRgb(A),
                                function(N) {
                                    return N * 0.2 >> 0
                                }));
                                K.addColorStop(0, A);
                                K.addColorStop(1, F);
                                L.fillStyle = K
                            }
                            L.fillRect(G, E, w - I, J - I);
                            if (B) {
                                L.save();
                                L.strokeStyle = B;
                                L.strokeRect(G, E, w - I, J - I);
                                L.restore()
                            }
                        } else {
                            if (C > 0) {
                                L.fillRect(H.x + I / 2, H.y + I / 2, w - I, C - I);
                                if (B) {
                                    L.save();
                                    L.strokeStyle = B;
                                    L.strokeRect(H.x + I / 2, H.y + I / 2, w - I, J - I);
                                    L.restore()
                                }
                            }
                        }
                    },
                    contains: function(z, B) {
                        if (this.viz.clickedNode && !z.isDescendantOf(this.viz.clickedNode.id) || z.ignore) {
                            return false
                        }
                        var A = z.pos.getc(true),
                        y = z.getData("width"),
                        x = this.viz.leaf(z),
                        w = x ? z.getData("height") : this.config.titleHeight;
                        return this.nodeHelper.rectangle.contains({
                            x: A.x + y / 2,
                            y: A.y + w / 2
                        },
                        B, y, w)
                    }
                }
            }); v.Plot.EdgeTypes = new q({
                none: c.empty
            }); v.SliceAndDice = new q({
                Implements: [d, o, v.Base, g.TM.SliceAndDice]
            }); v.Squarified = new q({
                Implements: [d, o, v.Base, g.TM.Squarified]
            }); v.Strip = new q({
                Implements: [d, o, v.Base, g.TM.Strip]
            }); $jit.RGraph = new q({
                Implements: [d, o, g.Radial],
                initialize: function(w) {
                    var x = $jit.RGraph;
                    var y = {
                        interpolation: "linear",
                        levelDistance: 100
                    };
                    this.controller = this.config = c.merge(n("Canvas", "Node", "Edge", "Fx", "Controller", "Tips", "NodeStyles", "Events", "Navigation", "Label"), y, w);
                    var z = this.config;
                    if (z.useCanvas) {
                        this.canvas = z.useCanvas;
                        this.config.labelContainer = this.canvas.id + "-label"
                    } else {
                        if (z.background) {
                            z.background = c.merge({
                                type: "Circles"
                            },
                            z.background)
                        }
                        this.canvas = new l(this, z);
                        this.config.labelContainer = (typeof z.injectInto == "string" ? z.injectInto: z.injectInto.id) + "-label"
                    }
                    this.graphOptions = {
                        klass: b,
                        Node: {
                            selected: false,
                            exist: true,
                            drawn: true
                        }
                    };
                    this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge);
                    this.labels = new x.Label[z.Label.type](this);
                    this.fx = new x.Plot(this, x);
                    this.op = new x.Op(this);
                    this.json = null;
                    this.root = null;
                    this.busy = false;
                    this.parent = false;
                    this.initializeExtras()
                },
                createLevelDistanceFunc: function() {
                    var w = this.config.levelDistance;
                    return function(x) {
                        return (x._depth + 1) * w
                    }
                },
                refresh: function() {
                    this.compute();
                    this.plot()
                },
                reposition: function() {
                    this.compute("end")
                },
                plot: function() {
                    this.fx.plot()
                },
                getNodeAndParentAngle: function(D) {
                    var y = false;
                    var C = this.graph.getNode(D);
                    var A = C.getParents();
                    var z = (A.length > 0) ? A[0] : false;
                    if (z) {
                        var w = z.pos.getc(),
                        B = C.pos.getc();
                        var x = w.add(B.scale( - 1));
                        y = Math.atan2(x.y, x.x);
                        if (y < 0) {
                            y += 2 * Math.PI
                        }
                    }
                    return {
                        parent: z,
                        theta: y
                    }
                },
                tagChildren: function(A, C) {
                    if (A.angleSpan) {
                        var B = [];
                        A.eachAdjacency(function(D) {
                            B.push(D.nodeTo)
                        },
                        "ignore");
                        var w = B.length;
                        for (var z = 0; z < w && C != B[z].id; z++) {}
                        for (var y = (z + 1) % w, x = 0; C != B[y].id; y = (y + 1) % w) {
                            B[y].dist = x++
                        }
                    }
                },
                onClick: function(B, x) {
                    if (this.root != B && !this.busy) {
                        this.busy = true;
                        this.root = B;
                        var y = this;
                        this.controller.onBeforeCompute(this.graph.getNode(B));
                        var z = this.getNodeAndParentAngle(B);
                        this.tagChildren(z.parent, B);
                        this.parent = z.parent;
                        this.compute("end");
                        var w = z.theta - z.parent.endPos.theta;
                        this.graph.eachNode(function(C) {
                            C.endPos.set(C.endPos.getp().add(k(w, 0)))
                        });
                        var A = this.config.interpolation;
                        x = c.merge({
                            onComplete: c.empty
                        },
                        x || {});
                        this.fx.animate(c.merge({
                            hideLabels: true,
                            modes: [A]
                        },
                        x, {
                            onComplete: function() {
                                y.busy = false;
                                x.onComplete()
                            }
                        }))
                    }
                }
            }); $jit.RGraph.$extend = true; (function(w) {
                w.Op = new q({
                    Implements: e.Op
                });
                w.Plot = new q({
                    Implements: e.Plot
                });
                w.Label = {};
                w.Label.Native = new q({
                    Implements: e.Label.Native
                });
                w.Label.SVG = new q({
                    Implements: e.Label.SVG,
                    initialize: function(x) {
                        this.viz = x
                    },
                    placeLabel: function(H, B, C) {
                        var F = B.pos.getc(true),
                        y = this.viz.canvas,
                        z = y.translateOffsetX,
                        x = y.translateOffsetY,
                        G = y.scaleOffsetX,
                        E = y.scaleOffsetY,
                        D = y.getSize();
                        var A = {
                            x: Math.round(F.x * G + z + D.width / 2),
                            y: Math.round(F.y * E + x + D.height / 2)
                        };
                        H.setAttribute("x", A.x);
                        H.setAttribute("y", A.y);
                        C.onPlaceLabel(H, B)
                    }
                });
                w.Label.HTML = new q({
                    Implements: e.Label.HTML,
                    initialize: function(x) {
                        this.viz = x
                    },
                    placeLabel: function(I, C, D) {
                        var G = C.pos.getc(true),
                        z = this.viz.canvas,
                        A = z.translateOffsetX,
                        y = z.translateOffsetY,
                        H = z.scaleOffsetX,
                        F = z.scaleOffsetY,
                        E = z.getSize();
                        var B = {
                            x: Math.round(G.x * H + A + E.width / 2),
                            y: Math.round(G.y * F + y + E.height / 2)
                        };
                        var x = I.style;
                        x.left = B.x + "px";
                        x.top = B.y + "px";
                        x.display = this.fitsInCanvas(B, z) ? "": "none";
                        D.onPlaceLabel(I, C)
                    }
                });
                w.Plot.NodeTypes = new q({
                    none: {
                        render: c.empty,
                        contains: c.lambda(false)
                    },
                    circle: {
                        render: function(y, x) {
                            var A = y.pos.getc(true),
                            z = y.getData("dim");
                            this.nodeHelper.circle.render("fill", A, z, x)
                        },
                        contains: function(x, A) {
                            var z = x.pos.getc(true),
                            y = x.getData("dim");
                            return this.nodeHelper.circle.contains(z, A, y)
                        }
                    },
                    ellipse: {
                        render: function(A, y) {
                            var B = A.pos.getc(true),
                            z = A.getData("width"),
                            x = A.getData("height");
                            this.nodeHelper.ellipse.render("fill", B, z, x, y)
                        },
                        contains: function(z, B) {
                            var A = z.pos.getc(true),
                            y = z.getData("width"),
                            x = z.getData("height");
                            return this.nodeHelper.ellipse.contains(A, B, y, x)
                        }
                    },
                    square: {
                        render: function(y, x) {
                            var A = y.pos.getc(true),
                            z = y.getData("dim");
                            this.nodeHelper.square.render("fill", A, z, x)
                        },
                        contains: function(x, A) {
                            var z = x.pos.getc(true),
                            y = x.getData("dim");
                            return this.nodeHelper.square.contains(z, A, y)
                        }
                    },
                    rectangle: {
                        render: function(A, y) {
                            var B = A.pos.getc(true),
                            z = A.getData("width"),
                            x = A.getData("height");
                            this.nodeHelper.rectangle.render("fill", B, z, x, y)
                        },
                        contains: function(z, B) {
                            var A = z.pos.getc(true),
                            y = z.getData("width"),
                            x = z.getData("height");
                            return this.nodeHelper.rectangle.contains(A, B, y, x)
                        }
                    },
                    triangle: {
                        render: function(y, x) {
                            var A = y.pos.getc(true),
                            z = y.getData("dim");
                            this.nodeHelper.triangle.render("fill", A, z, x)
                        },
                        contains: function(x, A) {
                            var z = x.pos.getc(true),
                            y = x.getData("dim");
                            return this.nodeHelper.triangle.contains(z, A, y)
                        }
                    },
                    star: {
                        render: function(y, x) {
                            var A = y.pos.getc(true),
                            z = y.getData("dim");
                            this.nodeHelper.star.render("fill", A, z, x)
                        },
                        contains: function(x, A) {
                            var z = x.pos.getc(true),
                            y = x.getData("dim");
                            return this.nodeHelper.star.contains(z, A, y)
                        }
                    }
                });
                w.Plot.EdgeTypes = new q({
                    none: c.empty,
                    line: {
                        render: function(x, y) {
                            var A = x.nodeFrom.pos.getc(true),
                            z = x.nodeTo.pos.getc(true);
                            this.edgeHelper.line.render(A, z, y)
                        },
                        contains: function(x, A) {
                            var z = x.nodeFrom.pos.getc(true),
                            y = x.nodeTo.pos.getc(true);
                            return this.edgeHelper.line.contains(z, y, A, this.edge.epsilon)
                        }
                    },
                    arrow: {
                        render: function(y, z) {
                            var D = y.nodeFrom.pos.getc(true),
                            C = y.nodeTo.pos.getc(true),
                            B = y.getData("dim"),
                            A = y.data.$direction,
                            x = (A && A.length > 1 && A[0] != y.nodeFrom.id);
                            this.edgeHelper.arrow.render(D, C, B, x, z)
                        },
                        contains: function(x, A) {
                            var z = x.nodeFrom.pos.getc(true),
                            y = x.nodeTo.pos.getc(true);
                            return this.edgeHelper.arrow.contains(z, y, A, this.edge.epsilon)
                        }
                    }
                })
            })($jit.RGraph); p.prototype.moebiusTransformation = function(y) {
                var w = this.add(y);
                var x = y.$conjugate().$prod(this);
                x.x++;
                return w.$div(x)
            }; e.Util.moebiusTransformation = function(y, A, z, x, w) {
                this.eachNode(y,
                function(C) {
                    for (var B = 0; B < z.length; B++) {
                        var E = A[B].scale( - 1),
                        D = x ? x: z[B];
                        C.getPos(z[B]).set(C.getPos(D).getc().moebiusTransformation(E))
                    }
                },
                w)
            }; $jit.Hypertree = new q({
                Implements: [d, o, g.Radial],
                initialize: function(w) {
                    var z = $jit.Hypertree;
                    var x = {
                        radius: "auto",
                        offset: 0,
                        Edge: {
                            type: "hyperline"
                        },
                        duration: 1500,
                        fps: 35
                    };
                    this.controller = this.config = c.merge(n("Canvas", "Node", "Edge", "Fx", "Tips", "NodeStyles", "Events", "Navigation", "Controller", "Label"), x, w);
                    var y = this.config;
                    if (y.useCanvas) {
                        this.canvas = y.useCanvas;
                        this.config.labelContainer = this.canvas.id + "-label"
                    } else {
                        if (y.background) {
                            y.background = c.merge({
                                type: "Circles"
                            },
                            y.background)
                        }
                        this.canvas = new l(this, y);
                        this.config.labelContainer = (typeof y.injectInto == "string" ? y.injectInto: y.injectInto.id) + "-label"
                    }
                    this.graphOptions = {
                        klass: b,
                        Node: {
                            selected: false,
                            exist: true,
                            drawn: true
                        }
                    };
                    this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge);
                    this.labels = new z.Label[y.Label.type](this);
                    this.fx = new z.Plot(this, z);
                    this.op = new z.Op(this);
                    this.json = null;
                    this.root = null;
                    this.busy = false;
                    this.initializeExtras()
                },
                createLevelDistanceFunc: function() {
                    var A = this.getRadius();
                    var C = 0,
                    w = Math.max,
                    x = this.config;
                    this.graph.eachNode(function(D) {
                        C = w(D._depth, C)
                    },
                    "ignore");
                    C++;
                    var B = function(D) {
                        return function(F) {
                            F.scale = A;
                            var H = F._depth + 1;
                            var G = 0,
                            E = Math.pow;
                            while (H) {
                                G += E(D, H--)
                            }
                            return G - x.offset
                        }
                    };
                    for (var z = 0.51; z <= 1; z += 0.01) {
                        var y = (1 - Math.pow(z, C)) / (1 - z);
                        if (y >= 2) {
                            return B(z - 0.01)
                        }
                    }
                    return B(0.75)
                },
                getRadius: function() {
                    var w = this.config.radius;
                    if (w !== "auto") {
                        return w
                    }
                    var x = this.canvas.getSize();
                    return Math.min(x.width, x.height) / 2
                },
                refresh: function(w) {
                    if (w) {
                        this.reposition();
                        this.graph.eachNode(function(x) {
                            x.startPos.rho = x.pos.rho = x.endPos.rho;
                            x.startPos.theta = x.pos.theta = x.endPos.theta
                        })
                    } else {
                        this.compute()
                    }
                    this.plot()
                },
                reposition: function() {
                    this.compute("end");
                    var w = this.graph.getNode(this.root).pos.getc().scale( - 1);
                    e.Util.moebiusTransformation(this.graph, [w], ["end"], "end", "ignore");
                    this.graph.eachNode(function(x) {
                        if (x.ignore) {
                            x.endPos.rho = x.pos.rho;
                            x.endPos.theta = x.pos.theta
                        }
                    })
                },
                plot: function() {
                    this.fx.plot()
                },
                onClick: function(y, w) {
                    var x = this.graph.getNode(y).pos.getc(true);
                    this.move(x, w)
                },
                move: function(A, y) {
                    var x = r(A.x, A.y);
                    if (this.busy === false && x.norm() < 1) {
                        this.busy = true;
                        var w = this.graph.getClosestNodeToPos(x),
                        z = this;
                        this.graph.computeLevels(w.id, 0);
                        this.controller.onBeforeCompute(w);
                        y = c.merge({
                            onComplete: c.empty
                        },
                        y || {});
                        this.fx.animate(c.merge({
                            modes: ["moebius"],
                            hideLabels: true
                        },
                        y, {
                            onComplete: function() {
                                z.busy = false;
                                y.onComplete()
                            }
                        }), x)
                    }
                }
            }); $jit.Hypertree.$extend = true; (function(w) {
                w.Op = new q({
                    Implements: e.Op
                });
                w.Plot = new q({
                    Implements: e.Plot
                });
                w.Label = {};
                w.Label.Native = new q({
                    Implements: e.Label.Native,
                    initialize: function(x) {
                        this.viz = x
                    },
                    renderLabel: function(z, B, y) {
                        var x = z.getCtx();
                        var C = B.pos.getc(true);
                        var A = this.viz.getRadius();
                        x.fillText(B.name, C.x * A, C.y * A)
                    }
                });
                w.Label.SVG = new q({
                    Implements: e.Label.SVG,
                    initialize: function(x) {
                        this.viz = x
                    },
                    placeLabel: function(I, C, D) {
                        var G = C.pos.getc(true),
                        z = this.viz.canvas,
                        A = z.translateOffsetX,
                        y = z.translateOffsetY,
                        H = z.scaleOffsetX,
                        F = z.scaleOffsetY,
                        E = z.getSize(),
                        x = this.viz.getRadius();
                        var B = {
                            x: Math.round((G.x * H) * x + A + E.width / 2),
                            y: Math.round((G.y * F) * x + y + E.height / 2)
                        };
                        I.setAttribute("x", B.x);
                        I.setAttribute("y", B.y);
                        D.onPlaceLabel(I, C)
                    }
                });
                w.Label.HTML = new q({
                    Implements: e.Label.HTML,
                    initialize: function(x) {
                        this.viz = x
                    },
                    placeLabel: function(J, D, E) {
                        var H = D.pos.getc(true),
                        A = this.viz.canvas,
                        B = A.translateOffsetX,
                        z = A.translateOffsetY,
                        I = A.scaleOffsetX,
                        G = A.scaleOffsetY,
                        F = A.getSize(),
                        x = this.viz.getRadius();
                        var C = {
                            x: Math.round((H.x * I) * x + B + F.width / 2),
                            y: Math.round((H.y * G) * x + z + F.height / 2)
                        };
                        var y = J.style;
                        y.left = C.x + "px";
                        y.top = C.y + "px";
                        y.display = this.fitsInCanvas(C, A) ? "": "none";
                        E.onPlaceLabel(J, D)
                    }
                });
                w.Plot.NodeTypes = new q({
                    none: {
                        render: c.empty,
                        contains: c.lambda(false)
                    },
                    circle: {
                        render: function(z, x) {
                            var y = this.node,
                            B = z.getData("dim"),
                            A = z.pos.getc();
                            B = y.transform ? B * (1 - A.squaredNorm()) : B;
                            A.$scale(z.scale);
                            if (B > 0.2) {
                                this.nodeHelper.circle.render("fill", A, B, x)
                            }
                        },
                        contains: function(x, A) {
                            var y = x.getData("dim"),
                            z = x.pos.getc().$scale(x.scale);
                            return this.nodeHelper.circle.contains(z, A, y)
                        }
                    },
                    ellipse: {
                        render: function(A, y) {
                            var B = A.pos.getc().$scale(A.scale),
                            z = A.getData("width"),
                            x = A.getData("height");
                            this.nodeHelper.ellipse.render("fill", B, z, x, y)
                        },
                        contains: function(z, B) {
                            var y = z.getData("width"),
                            x = z.getData("height"),
                            A = z.pos.getc().$scale(z.scale);
                            return this.nodeHelper.circle.contains(A, B, y, x)
                        }
                    },
                    square: {
                        render: function(z, x) {
                            var y = this.node,
                            B = z.getData("dim"),
                            A = z.pos.getc();
                            B = y.transform ? B * (1 - A.squaredNorm()) : B;
                            A.$scale(z.scale);
                            if (B > 0.2) {
                                this.nodeHelper.square.render("fill", A, B, x)
                            }
                        },
                        contains: function(x, A) {
                            var y = x.getData("dim"),
                            z = x.pos.getc().$scale(x.scale);
                            return this.nodeHelper.square.contains(z, A, y)
                        }
                    },
                    rectangle: {
                        render: function(B, y) {
                            var A = this.node,
                            z = B.getData("width"),
                            x = B.getData("height"),
                            C = B.pos.getc();
                            z = A.transform ? z * (1 - C.squaredNorm()) : z;
                            x = A.transform ? x * (1 - C.squaredNorm()) : x;
                            C.$scale(B.scale);
                            if (z > 0.2 && x > 0.2) {
                                this.nodeHelper.rectangle.render("fill", C, z, x, y)
                            }
                        },
                        contains: function(z, B) {
                            var y = z.getData("width"),
                            x = z.getData("height"),
                            A = z.pos.getc().$scale(z.scale);
                            return this.nodeHelper.rectangle.contains(A, B, y, x)
                        }
                    },
                    triangle: {
                        render: function(z, x) {
                            var y = this.node,
                            B = z.getData("dim"),
                            A = z.pos.getc();
                            B = y.transform ? B * (1 - A.squaredNorm()) : B;
                            A.$scale(z.scale);
                            if (B > 0.2) {
                                this.nodeHelper.triangle.render("fill", A, B, x)
                            }
                        },
                        contains: function(x, A) {
                            var y = x.getData("dim"),
                            z = x.pos.getc().$scale(x.scale);
                            return this.nodeHelper.triangle.contains(z, A, y)
                        }
                    },
                    star: {
                        render: function(z, x) {
                            var y = this.node,
                            B = z.getData("dim"),
                            A = z.pos.getc();
                            B = y.transform ? B * (1 - A.squaredNorm()) : B;
                            A.$scale(z.scale);
                            if (B > 0.2) {
                                this.nodeHelper.star.render("fill", A, B, x)
                            }
                        },
                        contains: function(x, A) {
                            var y = x.getData("dim"),
                            z = x.pos.getc().$scale(x.scale);
                            return this.nodeHelper.star.contains(z, A, y)
                        }
                    }
                });
                w.Plot.EdgeTypes = new q({
                    none: c.empty,
                    line: {
                        render: function(x, y) {
                            var B = x.nodeFrom.pos.getc(true),
                            A = x.nodeTo.pos.getc(true),
                            z = x.nodeFrom.scale;
                            this.edgeHelper.line.render({
                                x: B.x * z,
                                y: B.y * z
                            },
                            {
                                x: A.x * z,
                                y: A.y * z
                            },
                            y)
                        },
                        contains: function(x, B) {
                            var A = x.nodeFrom.pos.getc(true),
                            z = x.nodeTo.pos.getc(true),
                            y = x.nodeFrom.scale;
                            this.edgeHelper.line.contains({
                                x: A.x * y,
                                y: A.y * y
                            },
                            {
                                x: z.x * y,
                                y: z.y * y
                            },
                            B, this.edge.epsilon)
                        }
                    },
                    arrow: {
                        render: function(y, z) {
                            var E = y.nodeFrom.pos.getc(true),
                            D = y.nodeTo.pos.getc(true),
                            A = y.nodeFrom.scale,
                            C = y.getData("dim"),
                            B = y.data.$direction,
                            x = (B && B.length > 1 && B[0] != y.nodeFrom.id);
                            this.edgeHelper.arrow.render({
                                x: E.x * A,
                                y: E.y * A
                            },
                            {
                                x: D.x * A,
                                y: D.y * A
                            },
                            C, x, z)
                        },
                        contains: function(x, B) {
                            var A = x.nodeFrom.pos.getc(true),
                            z = x.nodeTo.pos.getc(true),
                            y = x.nodeFrom.scale;
                            this.edgeHelper.arrow.contains({
                                x: A.x * y,
                                y: A.y * y
                            },
                            {
                                x: z.x * y,
                                y: z.y * y
                            },
                            B, this.edge.epsilon)
                        }
                    },
                    hyperline: {
                        render: function(x, y) {
                            var B = x.nodeFrom.pos.getc(),
                            A = x.nodeTo.pos.getc(),
                            z = this.viz.getRadius();
                            this.edgeHelper.hyperline.render(B, A, z, y)
                        },
                        contains: c.lambda(false)
                    }
                })
            })($jit.Hypertree)
        })();