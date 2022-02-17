var t =
  "undefined" !== typeof globalThis
    ? globalThis
    : "undefined" !== typeof self
    ? self
    : global;
var e = {};
/* @preserve
 * Leaflet 1.7.1, a JS library for interactive maps. http://leafletjs.com
 * (c) 2010-2019 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */ (function (t, i) {
  i(e);
})(e, function (e) {
  var i = "1.7.1";
  function extend(t) {
    var e, i, n, o;
    for (i = 1, n = arguments.length; i < n; i++) {
      o = arguments[i];
      for (e in o) t[e] = o[e];
    }
    return t;
  }
  var n =
    Object.create ||
    (function () {
      function F() {}
      return function (t) {
        F.prototype = t;
        return new F();
      };
    })();
  function bind(t, e) {
    var i = Array.prototype.slice;
    if (t.bind) return t.bind.apply(t, i.call(arguments, 1));
    var n = i.call(arguments, 2);
    return function () {
      return t.apply(e, n.length ? n.concat(i.call(arguments)) : arguments);
    };
  }
  var o = 0;
  function stamp(t) {
    t._leaflet_id = t._leaflet_id || ++o;
    return t._leaflet_id;
  }
  function throttle(t, e, i) {
    var n, o, s, a;
    a = function () {
      n = false;
      if (o) {
        s.apply(i, o);
        o = false;
      }
    };
    s = function () {
      if (n) o = arguments;
      else {
        t.apply(i, arguments);
        setTimeout(a, e);
        n = true;
      }
    };
    return s;
  }
  function wrapNum(t, e, i) {
    var n = e[1],
      o = e[0],
      s = n - o;
    return t === n && i ? t : ((((t - o) % s) + s) % s) + o;
  }
  function falseFn() {
    return false;
  }
  function formatNum(t, e) {
    var i = Math.pow(10, void 0 === e ? 6 : e);
    return Math.round(t * i) / i;
  }
  function trim(t) {
    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
  }
  function splitWords(t) {
    return trim(t).split(/\s+/);
  }
  function setOptions(t, e) {
    Object.prototype.hasOwnProperty.call(t, "options") ||
      (t.options = t.options ? n(t.options) : {});
    for (var i in e) t.options[i] = e[i];
    return t.options;
  }
  function getParamString(t, e, i) {
    var n = [];
    for (var o in t)
      n.push(
        encodeURIComponent(i ? o.toUpperCase() : o) +
          "=" +
          encodeURIComponent(t[o])
      );
    return (e && -1 !== e.indexOf("?") ? "&" : "?") + n.join("&");
  }
  var s = /\{ *([\w_-]+) *\}/g;
  function template(t, e) {
    return t.replace(s, function (t, i) {
      var n = e[i];
      if (void 0 === n) throw new Error("No value provided for variable " + t);
      "function" === typeof n && (n = n(e));
      return n;
    });
  }
  var a =
    Array.isArray ||
    function (t) {
      return "[object Array]" === Object.prototype.toString.call(t);
    };
  function indexOf(t, e) {
    for (var i = 0; i < t.length; i++) if (t[i] === e) return i;
    return -1;
  }
  var h = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
  function getPrefixed(t) {
    return window["webkit" + t] || window["moz" + t] || window["ms" + t];
  }
  var l = 0;
  function timeoutDefer(t) {
    var e = +new Date(),
      i = Math.max(0, 16 - (e - l));
    l = e + i;
    return window.setTimeout(t, i);
  }
  var c =
    window.requestAnimationFrame ||
    getPrefixed("RequestAnimationFrame") ||
    timeoutDefer;
  var d =
    window.cancelAnimationFrame ||
    getPrefixed("CancelAnimationFrame") ||
    getPrefixed("CancelRequestAnimationFrame") ||
    function (t) {
      window.clearTimeout(t);
    };
  function requestAnimFrame(t, e, i) {
    if (!i || c !== timeoutDefer) return c.call(window, bind(t, e));
    t.call(e);
  }
  function cancelAnimFrame(t) {
    t && d.call(window, t);
  }
  var _ = {
    extend: extend,
    create: n,
    bind: bind,
    lastId: o,
    stamp: stamp,
    throttle: throttle,
    wrapNum: wrapNum,
    falseFn: falseFn,
    formatNum: formatNum,
    trim: trim,
    splitWords: splitWords,
    setOptions: setOptions,
    getParamString: getParamString,
    template: template,
    isArray: a,
    indexOf: indexOf,
    emptyImageUrl: h,
    requestFn: c,
    cancelFn: d,
    requestAnimFrame: requestAnimFrame,
    cancelAnimFrame: cancelAnimFrame,
  };
  function Class() {}
  Class.extend = function (e) {
    var NewClass = function () {
      (this || t).initialize &&
        (this || t).initialize.apply(this || t, arguments);
      this.callInitHooks();
    };
    var i = (NewClass.__super__ = (this || t).prototype);
    var o = n(i);
    o.constructor = NewClass;
    NewClass.prototype = o;
    for (var s in this || t)
      Object.prototype.hasOwnProperty.call(this || t, s) &&
        "prototype" !== s &&
        "__super__" !== s &&
        (NewClass[s] = (this || t)[s]);
    if (e.statics) {
      extend(NewClass, e.statics);
      delete e.statics;
    }
    if (e.includes) {
      checkDeprecatedMixinEvents(e.includes);
      extend.apply(null, [o].concat(e.includes));
      delete e.includes;
    }
    o.options && (e.options = extend(n(o.options), e.options));
    extend(o, e);
    o._initHooks = [];
    o.callInitHooks = function () {
      if (!(this || t)._initHooksCalled) {
        i.callInitHooks && i.callInitHooks.call(this || t);
        (this || t)._initHooksCalled = true;
        for (var e = 0, n = o._initHooks.length; e < n; e++)
          o._initHooks[e].call(this || t);
      }
    };
    return NewClass;
  };
  Class.include = function (e) {
    extend((this || t).prototype, e);
    return this || t;
  };
  Class.mergeOptions = function (e) {
    extend((this || t).prototype.options, e);
    return this || t;
  };
  Class.addInitHook = function (e) {
    var i = Array.prototype.slice.call(arguments, 1);
    var n =
      "function" === typeof e
        ? e
        : function () {
            (this || t)[e].apply(this || t, i);
          };
    (this || t).prototype._initHooks = (this || t).prototype._initHooks || [];
    (this || t).prototype._initHooks.push(n);
    return this || t;
  };
  function checkDeprecatedMixinEvents(t) {
    if ("undefined" !== typeof L && L && L.Mixin) {
      t = a(t) ? t : [t];
      for (var e = 0; e < t.length; e++)
        t[e] === L.Mixin.Events &&
          console.warn(
            "Deprecated include of L.Mixin.Events: " +
              "this property will be removed in future releases, " +
              "please inherit from L.Evented instead.",
            new Error().stack
          );
    }
  }
  var p = {
    on: function (e, i, n) {
      if ("object" === typeof e) for (var o in e) this._on(o, e[o], i);
      else {
        e = splitWords(e);
        for (var s = 0, a = e.length; s < a; s++) this._on(e[s], i, n);
      }
      return this || t;
    },
    off: function (e, i, n) {
      if (e)
        if ("object" === typeof e) for (var o in e) this._off(o, e[o], i);
        else {
          e = splitWords(e);
          for (var s = 0, a = e.length; s < a; s++) this._off(e[s], i, n);
        }
      else delete (this || t)._events;
      return this || t;
    },
    _on: function (e, i, n) {
      (this || t)._events = (this || t)._events || {};
      var o = (this || t)._events[e];
      if (!o) {
        o = [];
        (this || t)._events[e] = o;
      }
      n === (this || t) && (n = void 0);
      var s = { fn: i, ctx: n },
        a = o;
      for (var h = 0, l = a.length; h < l; h++)
        if (a[h].fn === i && a[h].ctx === n) return;
      a.push(s);
    },
    _off: function (e, i, n) {
      var o, s, a;
      if ((this || t)._events) {
        o = (this || t)._events[e];
        if (o)
          if (i) {
            n === (this || t) && (n = void 0);
            if (o)
              for (s = 0, a = o.length; s < a; s++) {
                var h = o[s];
                if (h.ctx === n && h.fn === i) {
                  h.fn = falseFn;
                  (this || t)._firingCount &&
                    ((this || t)._events[e] = o = o.slice());
                  o.splice(s, 1);
                  return;
                }
              }
          } else {
            for (s = 0, a = o.length; s < a; s++) o[s].fn = falseFn;
            delete (this || t)._events[e];
          }
      }
    },
    fire: function (e, i, n) {
      if (!this.listens(e, n)) return this || t;
      var o = extend({}, i, {
        type: e,
        target: this || t,
        sourceTarget: (i && i.sourceTarget) || this || t,
      });
      if ((this || t)._events) {
        var s = (this || t)._events[e];
        if (s) {
          (this || t)._firingCount = (this || t)._firingCount + 1 || 1;
          for (var a = 0, h = s.length; a < h; a++) {
            var l = s[a];
            l.fn.call(l.ctx || this || t, o);
          }
          (this || t)._firingCount--;
        }
      }
      n && this._propagateEvent(o);
      return this || t;
    },
    listens: function (e, i) {
      var n = (this || t)._events && (this || t)._events[e];
      if (n && n.length) return true;
      if (i)
        for (var o in (this || t)._eventParents)
          if ((this || t)._eventParents[o].listens(e, i)) return true;
      return false;
    },
    once: function (e, i, n) {
      if ("object" === typeof e) {
        for (var o in e) this.once(o, e[o], i);
        return this || t;
      }
      var s = bind(function () {
        this.off(e, i, n).off(e, s, n);
      }, this || t);
      return this.on(e, i, n).on(e, s, n);
    },
    addEventParent: function (e) {
      (this || t)._eventParents = (this || t)._eventParents || {};
      (this || t)._eventParents[stamp(e)] = e;
      return this || t;
    },
    removeEventParent: function (e) {
      (this || t)._eventParents && delete (this || t)._eventParents[stamp(e)];
      return this || t;
    },
    _propagateEvent: function (e) {
      for (var i in (this || t)._eventParents)
        (this || t)._eventParents[i].fire(
          e.type,
          extend({ layer: e.target, propagatedFrom: e.target }, e),
          true
        );
    },
  };
  p.addEventListener = p.on;
  p.removeEventListener = p.clearAllEventListeners = p.off;
  p.addOneTimeEventListener = p.once;
  p.fireEvent = p.fire;
  p.hasEventListeners = p.listens;
  var f = Class.extend(p);
  function Point(e, i, n) {
    (this || t).x = n ? Math.round(e) : e;
    (this || t).y = n ? Math.round(i) : i;
  }
  var m =
    Math.trunc ||
    function (t) {
      return t > 0 ? Math.floor(t) : Math.ceil(t);
    };
  Point.prototype = {
    clone: function () {
      return new Point((this || t).x, (this || t).y);
    },
    add: function (t) {
      return this.clone()._add(toPoint(t));
    },
    _add: function (e) {
      (this || t).x += e.x;
      (this || t).y += e.y;
      return this || t;
    },
    subtract: function (t) {
      return this.clone()._subtract(toPoint(t));
    },
    _subtract: function (e) {
      (this || t).x -= e.x;
      (this || t).y -= e.y;
      return this || t;
    },
    divideBy: function (t) {
      return this.clone()._divideBy(t);
    },
    _divideBy: function (e) {
      (this || t).x /= e;
      (this || t).y /= e;
      return this || t;
    },
    multiplyBy: function (t) {
      return this.clone()._multiplyBy(t);
    },
    _multiplyBy: function (e) {
      (this || t).x *= e;
      (this || t).y *= e;
      return this || t;
    },
    scaleBy: function (e) {
      return new Point((this || t).x * e.x, (this || t).y * e.y);
    },
    unscaleBy: function (e) {
      return new Point((this || t).x / e.x, (this || t).y / e.y);
    },
    round: function () {
      return this.clone()._round();
    },
    _round: function () {
      (this || t).x = Math.round((this || t).x);
      (this || t).y = Math.round((this || t).y);
      return this || t;
    },
    floor: function () {
      return this.clone()._floor();
    },
    _floor: function () {
      (this || t).x = Math.floor((this || t).x);
      (this || t).y = Math.floor((this || t).y);
      return this || t;
    },
    ceil: function () {
      return this.clone()._ceil();
    },
    _ceil: function () {
      (this || t).x = Math.ceil((this || t).x);
      (this || t).y = Math.ceil((this || t).y);
      return this || t;
    },
    trunc: function () {
      return this.clone()._trunc();
    },
    _trunc: function () {
      (this || t).x = m((this || t).x);
      (this || t).y = m((this || t).y);
      return this || t;
    },
    distanceTo: function (e) {
      e = toPoint(e);
      var i = e.x - (this || t).x,
        n = e.y - (this || t).y;
      return Math.sqrt(i * i + n * n);
    },
    equals: function (e) {
      e = toPoint(e);
      return e.x === (this || t).x && e.y === (this || t).y;
    },
    contains: function (e) {
      e = toPoint(e);
      return (
        Math.abs(e.x) <= Math.abs((this || t).x) &&
        Math.abs(e.y) <= Math.abs((this || t).y)
      );
    },
    toString: function () {
      return (
        "Point(" +
        formatNum((this || t).x) +
        ", " +
        formatNum((this || t).y) +
        ")"
      );
    },
  };
  function toPoint(t, e, i) {
    return t instanceof Point
      ? t
      : a(t)
      ? new Point(t[0], t[1])
      : void 0 === t || null === t
      ? t
      : "object" === typeof t && "x" in t && "y" in t
      ? new Point(t.x, t.y)
      : new Point(t, e, i);
  }
  function Bounds(t, e) {
    if (t) {
      var i = e ? [t, e] : t;
      for (var n = 0, o = i.length; n < o; n++) this.extend(i[n]);
    }
  }
  Bounds.prototype = {
    extend: function (e) {
      e = toPoint(e);
      if ((this || t).min || (this || t).max) {
        (this || t).min.x = Math.min(e.x, (this || t).min.x);
        (this || t).max.x = Math.max(e.x, (this || t).max.x);
        (this || t).min.y = Math.min(e.y, (this || t).min.y);
        (this || t).max.y = Math.max(e.y, (this || t).max.y);
      } else {
        (this || t).min = e.clone();
        (this || t).max = e.clone();
      }
      return this || t;
    },
    getCenter: function (e) {
      return new Point(
        ((this || t).min.x + (this || t).max.x) / 2,
        ((this || t).min.y + (this || t).max.y) / 2,
        e
      );
    },
    getBottomLeft: function () {
      return new Point((this || t).min.x, (this || t).max.y);
    },
    getTopRight: function () {
      return new Point((this || t).max.x, (this || t).min.y);
    },
    getTopLeft: function () {
      return (this || t).min;
    },
    getBottomRight: function () {
      return (this || t).max;
    },
    getSize: function () {
      return (this || t).max.subtract((this || t).min);
    },
    contains: function (e) {
      var i, n;
      e =
        "number" === typeof e[0] || e instanceof Point
          ? toPoint(e)
          : toBounds(e);
      if (e instanceof Bounds) {
        i = e.min;
        n = e.max;
      } else i = n = e;
      return (
        i.x >= (this || t).min.x &&
        n.x <= (this || t).max.x &&
        i.y >= (this || t).min.y &&
        n.y <= (this || t).max.y
      );
    },
    intersects: function (e) {
      e = toBounds(e);
      var i = (this || t).min,
        n = (this || t).max,
        o = e.min,
        s = e.max,
        a = s.x >= i.x && o.x <= n.x,
        h = s.y >= i.y && o.y <= n.y;
      return a && h;
    },
    overlaps: function (e) {
      e = toBounds(e);
      var i = (this || t).min,
        n = (this || t).max,
        o = e.min,
        s = e.max,
        a = s.x > i.x && o.x < n.x,
        h = s.y > i.y && o.y < n.y;
      return a && h;
    },
    isValid: function () {
      return !!((this || t).min && (this || t).max);
    },
  };
  function toBounds(t, e) {
    return !t || t instanceof Bounds ? t : new Bounds(t, e);
  }
  function LatLngBounds(t, e) {
    if (t) {
      var i = e ? [t, e] : t;
      for (var n = 0, o = i.length; n < o; n++) this.extend(i[n]);
    }
  }
  LatLngBounds.prototype = {
    extend: function (e) {
      var i = (this || t)._southWest,
        n = (this || t)._northEast,
        o,
        s;
      if (e instanceof LatLng) {
        o = e;
        s = e;
      } else {
        if (!(e instanceof LatLngBounds))
          return e ? this.extend(toLatLng(e) || toLatLngBounds(e)) : this || t;
        o = e._southWest;
        s = e._northEast;
        if (!o || !s) return this || t;
      }
      if (i || n) {
        i.lat = Math.min(o.lat, i.lat);
        i.lng = Math.min(o.lng, i.lng);
        n.lat = Math.max(s.lat, n.lat);
        n.lng = Math.max(s.lng, n.lng);
      } else {
        (this || t)._southWest = new LatLng(o.lat, o.lng);
        (this || t)._northEast = new LatLng(s.lat, s.lng);
      }
      return this || t;
    },
    pad: function (e) {
      var i = (this || t)._southWest,
        n = (this || t)._northEast,
        o = Math.abs(i.lat - n.lat) * e,
        s = Math.abs(i.lng - n.lng) * e;
      return new LatLngBounds(
        new LatLng(i.lat - o, i.lng - s),
        new LatLng(n.lat + o, n.lng + s)
      );
    },
    getCenter: function () {
      return new LatLng(
        ((this || t)._southWest.lat + (this || t)._northEast.lat) / 2,
        ((this || t)._southWest.lng + (this || t)._northEast.lng) / 2
      );
    },
    getSouthWest: function () {
      return (this || t)._southWest;
    },
    getNorthEast: function () {
      return (this || t)._northEast;
    },
    getNorthWest: function () {
      return new LatLng(this.getNorth(), this.getWest());
    },
    getSouthEast: function () {
      return new LatLng(this.getSouth(), this.getEast());
    },
    getWest: function () {
      return (this || t)._southWest.lng;
    },
    getSouth: function () {
      return (this || t)._southWest.lat;
    },
    getEast: function () {
      return (this || t)._northEast.lng;
    },
    getNorth: function () {
      return (this || t)._northEast.lat;
    },
    contains: function (e) {
      e =
        "number" === typeof e[0] || e instanceof LatLng || "lat" in e
          ? toLatLng(e)
          : toLatLngBounds(e);
      var i = (this || t)._southWest,
        n = (this || t)._northEast,
        o,
        s;
      if (e instanceof LatLngBounds) {
        o = e.getSouthWest();
        s = e.getNorthEast();
      } else o = s = e;
      return (
        o.lat >= i.lat && s.lat <= n.lat && o.lng >= i.lng && s.lng <= n.lng
      );
    },
    intersects: function (e) {
      e = toLatLngBounds(e);
      var i = (this || t)._southWest,
        n = (this || t)._northEast,
        o = e.getSouthWest(),
        s = e.getNorthEast(),
        a = s.lat >= i.lat && o.lat <= n.lat,
        h = s.lng >= i.lng && o.lng <= n.lng;
      return a && h;
    },
    overlaps: function (e) {
      e = toLatLngBounds(e);
      var i = (this || t)._southWest,
        n = (this || t)._northEast,
        o = e.getSouthWest(),
        s = e.getNorthEast(),
        a = s.lat > i.lat && o.lat < n.lat,
        h = s.lng > i.lng && o.lng < n.lng;
      return a && h;
    },
    toBBoxString: function () {
      return [
        this.getWest(),
        this.getSouth(),
        this.getEast(),
        this.getNorth(),
      ].join(",");
    },
    equals: function (e, i) {
      if (!e) return false;
      e = toLatLngBounds(e);
      return (
        (this || t)._southWest.equals(e.getSouthWest(), i) &&
        (this || t)._northEast.equals(e.getNorthEast(), i)
      );
    },
    isValid: function () {
      return !!((this || t)._southWest && (this || t)._northEast);
    },
  };
  function toLatLngBounds(t, e) {
    return t instanceof LatLngBounds ? t : new LatLngBounds(t, e);
  }
  function LatLng(e, i, n) {
    if (isNaN(e) || isNaN(i))
      throw new Error("Invalid LatLng object: (" + e + ", " + i + ")");
    (this || t).lat = +e;
    (this || t).lng = +i;
    void 0 !== n && ((this || t).alt = +n);
  }
  LatLng.prototype = {
    equals: function (e, i) {
      if (!e) return false;
      e = toLatLng(e);
      var n = Math.max(
        Math.abs((this || t).lat - e.lat),
        Math.abs((this || t).lng - e.lng)
      );
      return n <= (void 0 === i ? 1e-9 : i);
    },
    toString: function (e) {
      return (
        "LatLng(" +
        formatNum((this || t).lat, e) +
        ", " +
        formatNum((this || t).lng, e) +
        ")"
      );
    },
    distanceTo: function (e) {
      return v.distance(this || t, toLatLng(e));
    },
    wrap: function () {
      return v.wrapLatLng(this || t);
    },
    toBounds: function (e) {
      var i = (180 * e) / 40075017,
        n = i / Math.cos((Math.PI / 180) * (this || t).lat);
      return toLatLngBounds(
        [(this || t).lat - i, (this || t).lng - n],
        [(this || t).lat + i, (this || t).lng + n]
      );
    },
    clone: function () {
      return new LatLng((this || t).lat, (this || t).lng, (this || t).alt);
    },
  };
  function toLatLng(t, e, i) {
    return t instanceof LatLng
      ? t
      : a(t) && "object" !== typeof t[0]
      ? 3 === t.length
        ? new LatLng(t[0], t[1], t[2])
        : 2 === t.length
        ? new LatLng(t[0], t[1])
        : null
      : void 0 === t || null === t
      ? t
      : "object" === typeof t && "lat" in t
      ? new LatLng(t.lat, "lng" in t ? t.lng : t.lon, t.alt)
      : void 0 === e
      ? null
      : new LatLng(t, e, i);
  }
  var g = {
    latLngToPoint: function (e, i) {
      var n = (this || t).projection.project(e),
        o = this.scale(i);
      return (this || t).transformation._transform(n, o);
    },
    pointToLatLng: function (e, i) {
      var n = this.scale(i),
        o = (this || t).transformation.untransform(e, n);
      return (this || t).projection.unproject(o);
    },
    project: function (e) {
      return (this || t).projection.project(e);
    },
    unproject: function (e) {
      return (this || t).projection.unproject(e);
    },
    scale: function (t) {
      return 256 * Math.pow(2, t);
    },
    zoom: function (t) {
      return Math.log(t / 256) / Math.LN2;
    },
    getProjectedBounds: function (e) {
      if ((this || t).infinite) return null;
      var i = (this || t).projection.bounds,
        n = this.scale(e),
        o = (this || t).transformation.transform(i.min, n),
        s = (this || t).transformation.transform(i.max, n);
      return new Bounds(o, s);
    },
    infinite: false,
    wrapLatLng: function (e) {
      var i = (this || t).wrapLng
          ? wrapNum(e.lng, (this || t).wrapLng, true)
          : e.lng,
        n = (this || t).wrapLat
          ? wrapNum(e.lat, (this || t).wrapLat, true)
          : e.lat,
        o = e.alt;
      return new LatLng(n, i, o);
    },
    wrapLatLngBounds: function (t) {
      var e = t.getCenter(),
        i = this.wrapLatLng(e),
        n = e.lat - i.lat,
        o = e.lng - i.lng;
      if (0 === n && 0 === o) return t;
      var s = t.getSouthWest(),
        a = t.getNorthEast(),
        h = new LatLng(s.lat - n, s.lng - o),
        l = new LatLng(a.lat - n, a.lng - o);
      return new LatLngBounds(h, l);
    },
  };
  var v = extend({}, g, {
    wrapLng: [-180, 180],
    R: 6371e3,
    distance: function (e, i) {
      var n = Math.PI / 180,
        o = e.lat * n,
        s = i.lat * n,
        a = Math.sin(((i.lat - e.lat) * n) / 2),
        h = Math.sin(((i.lng - e.lng) * n) / 2),
        l = a * a + Math.cos(o) * Math.cos(s) * h * h,
        c = 2 * Math.atan2(Math.sqrt(l), Math.sqrt(1 - l));
      return (this || t).R * c;
    },
  });
  var y = 6378137;
  var P = {
    R: y,
    MAX_LATITUDE: 85.0511287798,
    project: function (e) {
      var i = Math.PI / 180,
        n = (this || t).MAX_LATITUDE,
        o = Math.max(Math.min(n, e.lat), -n),
        s = Math.sin(o * i);
      return new Point(
        (this || t).R * e.lng * i,
        ((this || t).R * Math.log((1 + s) / (1 - s))) / 2
      );
    },
    unproject: function (e) {
      var i = 180 / Math.PI;
      return new LatLng(
        (2 * Math.atan(Math.exp(e.y / (this || t).R)) - Math.PI / 2) * i,
        (e.x * i) / (this || t).R
      );
    },
    bounds: (function () {
      var t = y * Math.PI;
      return new Bounds([-t, -t], [t, t]);
    })(),
  };
  function Transformation(e, i, n, o) {
    if (a(e)) {
      (this || t)._a = e[0];
      (this || t)._b = e[1];
      (this || t)._c = e[2];
      (this || t)._d = e[3];
    } else {
      (this || t)._a = e;
      (this || t)._b = i;
      (this || t)._c = n;
      (this || t)._d = o;
    }
  }
  Transformation.prototype = {
    transform: function (t, e) {
      return this._transform(t.clone(), e);
    },
    _transform: function (e, i) {
      i = i || 1;
      e.x = i * ((this || t)._a * e.x + (this || t)._b);
      e.y = i * ((this || t)._c * e.y + (this || t)._d);
      return e;
    },
    untransform: function (e, i) {
      i = i || 1;
      return new Point(
        (e.x / i - (this || t)._b) / (this || t)._a,
        (e.y / i - (this || t)._d) / (this || t)._c
      );
    },
  };
  function toTransformation(t, e, i, n) {
    return new Transformation(t, e, i, n);
  }
  var x = extend({}, v, {
    code: "EPSG:3857",
    projection: P,
    transformation: (function () {
      var t = 0.5 / (Math.PI * P.R);
      return toTransformation(t, 0.5, -t, 0.5);
    })(),
  });
  var b = extend({}, x, { code: "EPSG:900913" });
  function svgCreate(t) {
    return document.createElementNS("http://www.w3.org/2000/svg", t);
  }
  function pointsToPath(t, e) {
    var i = "",
      n,
      o,
      s,
      a,
      h,
      l;
    for (n = 0, s = t.length; n < s; n++) {
      h = t[n];
      for (o = 0, a = h.length; o < a; o++) {
        l = h[o];
        i += (o ? "L" : "M") + l.x + " " + l.y;
      }
      i += e ? (nt ? "z" : "x") : "";
    }
    return i || "M0 0";
  }
  var T = document.documentElement.style;
  var C = "ActiveXObject" in window;
  var M = C && !document.addEventListener;
  var z = "msLaunchUri" in navigator && !("documentMode" in document);
  var S = userAgentContains("webkit");
  var B = userAgentContains("android");
  var k = userAgentContains("android 2") || userAgentContains("android 3");
  var E = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10);
  var O =
    B && userAgentContains("Google") && E < 537 && !("AudioNode" in window);
  var Z = !!window.opera;
  var A = !z && userAgentContains("chrome");
  var I = userAgentContains("gecko") && !S && !Z && !C;
  var D = !A && userAgentContains("safari");
  var N = userAgentContains("phantom");
  var R = "OTransition" in T;
  var j = 0 === navigator.platform.indexOf("Win");
  var W = C && "transition" in T;
  var H =
    "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !k;
  var q = "MozPerspective" in T;
  var U = !window.L_DISABLE_3D && (W || H || q) && !R && !N;
  var V = "undefined" !== typeof orientation || userAgentContains("mobile");
  var G = V && S;
  var $ = V && H;
  var K = !window.PointerEvent && window.MSPointerEvent;
  var Y = !!(window.PointerEvent || K);
  var J =
    !window.L_NO_TOUCH &&
    (Y ||
      "ontouchstart" in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch));
  var X = V && Z;
  var Q = V && I;
  var tt =
    (window.devicePixelRatio ||
      window.screen.deviceXDPI / window.screen.logicalXDPI) > 1;
  var et = (function () {
    var t = false;
    try {
      var e = Object.defineProperty({}, "passive", {
        get: function () {
          t = true;
        },
      });
      window.addEventListener("testPassiveEventSupport", falseFn, e);
      window.removeEventListener("testPassiveEventSupport", falseFn, e);
    } catch (t) {}
    return t;
  })();
  var it = (function () {
    return !!document.createElement("canvas").getContext;
  })();
  var nt = !!(document.createElementNS && svgCreate("svg").createSVGRect);
  var ot =
    !nt &&
    (function () {
      try {
        var t = document.createElement("div");
        t.innerHTML = '<v:shape adj="1"/>';
        var e = t.firstChild;
        e.style.behavior = "url(#default#VML)";
        return e && "object" === typeof e.adj;
      } catch (t) {
        return false;
      }
    })();
  function userAgentContains(t) {
    return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
  }
  var st = {
    ie: C,
    ielt9: M,
    edge: z,
    webkit: S,
    android: B,
    android23: k,
    androidStock: O,
    opera: Z,
    chrome: A,
    gecko: I,
    safari: D,
    phantom: N,
    opera12: R,
    win: j,
    ie3d: W,
    webkit3d: H,
    gecko3d: q,
    any3d: U,
    mobile: V,
    mobileWebkit: G,
    mobileWebkit3d: $,
    msPointer: K,
    pointer: Y,
    touch: J,
    mobileOpera: X,
    mobileGecko: Q,
    retina: tt,
    passiveEvents: et,
    canvas: it,
    svg: nt,
    vml: ot,
  };
  var at = K ? "MSPointerDown" : "pointerdown";
  var rt = K ? "MSPointerMove" : "pointermove";
  var ht = K ? "MSPointerUp" : "pointerup";
  var lt = K ? "MSPointerCancel" : "pointercancel";
  var ut = {};
  var ct = false;
  function addPointerListener(e, i, n, o) {
    "touchstart" === i
      ? _addPointerStart(e, n, o)
      : "touchmove" === i
      ? _addPointerMove(e, n, o)
      : "touchend" === i && _addPointerEnd(e, n, o);
    return this || t;
  }
  function removePointerListener(e, i, n) {
    var o = e["_leaflet_" + i + n];
    if ("touchstart" === i) e.removeEventListener(at, o, false);
    else if ("touchmove" === i) e.removeEventListener(rt, o, false);
    else if ("touchend" === i) {
      e.removeEventListener(ht, o, false);
      e.removeEventListener(lt, o, false);
    }
    return this || t;
  }
  function _addPointerStart(t, e, i) {
    var n = bind(function (t) {
      t.MSPOINTER_TYPE_TOUCH &&
        t.pointerType === t.MSPOINTER_TYPE_TOUCH &&
        preventDefault(t);
      _handlePointer(t, e);
    });
    t["_leaflet_touchstart" + i] = n;
    t.addEventListener(at, n, false);
    if (!ct) {
      document.addEventListener(at, _globalPointerDown, true);
      document.addEventListener(rt, _globalPointerMove, true);
      document.addEventListener(ht, _globalPointerUp, true);
      document.addEventListener(lt, _globalPointerUp, true);
      ct = true;
    }
  }
  function _globalPointerDown(t) {
    ut[t.pointerId] = t;
  }
  function _globalPointerMove(t) {
    ut[t.pointerId] && (ut[t.pointerId] = t);
  }
  function _globalPointerUp(t) {
    delete ut[t.pointerId];
  }
  function _handlePointer(t, e) {
    t.touches = [];
    for (var i in ut) t.touches.push(ut[i]);
    t.changedTouches = [t];
    e(t);
  }
  function _addPointerMove(t, e, i) {
    var onMove = function (t) {
      (t.pointerType === (t.MSPOINTER_TYPE_MOUSE || "mouse") &&
        0 === t.buttons) ||
        _handlePointer(t, e);
    };
    t["_leaflet_touchmove" + i] = onMove;
    t.addEventListener(rt, onMove, false);
  }
  function _addPointerEnd(t, e, i) {
    var onUp = function (t) {
      _handlePointer(t, e);
    };
    t["_leaflet_touchend" + i] = onUp;
    t.addEventListener(ht, onUp, false);
    t.addEventListener(lt, onUp, false);
  }
  var dt = K ? "MSPointerDown" : Y ? "pointerdown" : "touchstart";
  var _t = K ? "MSPointerUp" : Y ? "pointerup" : "touchend";
  var pt = "_leaflet_";
  function addDoubleTapListener(e, i, n) {
    var o,
      s,
      a = false,
      h = 250;
    function onTouchStart(t) {
      if (Y) {
        if (!t.isPrimary) return;
        if ("mouse" === t.pointerType) return;
      } else if (t.touches.length > 1) return;
      var e = Date.now(),
        i = e - (o || e);
      s = t.touches ? t.touches[0] : t;
      a = i > 0 && i <= h;
      o = e;
    }
    function onTouchEnd(t) {
      if (a && !s.cancelBubble) {
        if (Y) {
          if ("mouse" === t.pointerType) return;
          var e = {},
            n,
            h;
          for (h in s) {
            n = s[h];
            e[h] = n && n.bind ? n.bind(s) : n;
          }
          s = e;
        }
        s.type = "dblclick";
        s.button = 0;
        i(s);
        o = null;
      }
    }
    e[pt + dt + n] = onTouchStart;
    e[pt + _t + n] = onTouchEnd;
    e[pt + "dblclick" + n] = i;
    e.addEventListener(dt, onTouchStart, !!et && { passive: false });
    e.addEventListener(_t, onTouchEnd, !!et && { passive: false });
    e.addEventListener("dblclick", i, false);
    return this || t;
  }
  function removeDoubleTapListener(e, i) {
    var n = e[pt + dt + i],
      o = e[pt + _t + i],
      s = e[pt + "dblclick" + i];
    e.removeEventListener(dt, n, !!et && { passive: false });
    e.removeEventListener(_t, o, !!et && { passive: false });
    e.removeEventListener("dblclick", s, false);
    return this || t;
  }
  var ft = testProp([
    "transform",
    "webkitTransform",
    "OTransform",
    "MozTransform",
    "msTransform",
  ]);
  var mt = testProp([
    "webkitTransition",
    "transition",
    "OTransition",
    "MozTransition",
    "msTransition",
  ]);
  var gt =
    "webkitTransition" === mt || "OTransition" === mt
      ? mt + "End"
      : "transitionend";
  function get(t) {
    return "string" === typeof t ? document.getElementById(t) : t;
  }
  function getStyle(t, e) {
    var i = t.style[e] || (t.currentStyle && t.currentStyle[e]);
    if ((!i || "auto" === i) && document.defaultView) {
      var n = document.defaultView.getComputedStyle(t, null);
      i = n ? n[e] : null;
    }
    return "auto" === i ? null : i;
  }
  function create$1(t, e, i) {
    var n = document.createElement(t);
    n.className = e || "";
    i && i.appendChild(n);
    return n;
  }
  function remove(t) {
    var e = t.parentNode;
    e && e.removeChild(t);
  }
  function empty(t) {
    while (t.firstChild) t.removeChild(t.firstChild);
  }
  function toFront(t) {
    var e = t.parentNode;
    e && e.lastChild !== t && e.appendChild(t);
  }
  function toBack(t) {
    var e = t.parentNode;
    e && e.firstChild !== t && e.insertBefore(t, e.firstChild);
  }
  function hasClass(t, e) {
    if (void 0 !== t.classList) return t.classList.contains(e);
    var i = getClass(t);
    return i.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(i);
  }
  function addClass(t, e) {
    if (void 0 !== t.classList) {
      var i = splitWords(e);
      for (var n = 0, o = i.length; n < o; n++) t.classList.add(i[n]);
    } else if (!hasClass(t, e)) {
      var s = getClass(t);
      setClass(t, (s ? s + " " : "") + e);
    }
  }
  function removeClass(t, e) {
    void 0 !== t.classList
      ? t.classList.remove(e)
      : setClass(
          t,
          trim((" " + getClass(t) + " ").replace(" " + e + " ", " "))
        );
  }
  function setClass(t, e) {
    void 0 === t.className.baseVal
      ? (t.className = e)
      : (t.className.baseVal = e);
  }
  function getClass(t) {
    t.correspondingElement && (t = t.correspondingElement);
    return void 0 === t.className.baseVal ? t.className : t.className.baseVal;
  }
  function setOpacity(t, e) {
    "opacity" in t.style
      ? (t.style.opacity = e)
      : "filter" in t.style && _setOpacityIE(t, e);
  }
  function _setOpacityIE(t, e) {
    var i = false,
      n = "DXImageTransform.Microsoft.Alpha";
    try {
      i = t.filters.item(n);
    } catch (t) {
      if (1 === e) return;
    }
    e = Math.round(100 * e);
    if (i) {
      i.Enabled = 100 !== e;
      i.Opacity = e;
    } else t.style.filter += " progid:" + n + "(opacity=" + e + ")";
  }
  function testProp(t) {
    var e = document.documentElement.style;
    for (var i = 0; i < t.length; i++) if (t[i] in e) return t[i];
    return false;
  }
  function setTransform(t, e, i) {
    var n = e || new Point(0, 0);
    t.style[ft] =
      (W
        ? "translate(" + n.x + "px," + n.y + "px)"
        : "translate3d(" + n.x + "px," + n.y + "px,0)") +
      (i ? " scale(" + i + ")" : "");
  }
  function setPosition(t, e) {
    t._leaflet_pos = e;
    if (U) setTransform(t, e);
    else {
      t.style.left = e.x + "px";
      t.style.top = e.y + "px";
    }
  }
  function getPosition(t) {
    return t._leaflet_pos || new Point(0, 0);
  }
  var vt;
  var yt;
  var Lt;
  if ("onselectstart" in document) {
    vt = function () {
      on(window, "selectstart", preventDefault);
    };
    yt = function () {
      off(window, "selectstart", preventDefault);
    };
  } else {
    var Pt = testProp([
      "userSelect",
      "WebkitUserSelect",
      "OUserSelect",
      "MozUserSelect",
      "msUserSelect",
    ]);
    vt = function () {
      if (Pt) {
        var t = document.documentElement.style;
        Lt = t[Pt];
        t[Pt] = "none";
      }
    };
    yt = function () {
      if (Pt) {
        document.documentElement.style[Pt] = Lt;
        Lt = void 0;
      }
    };
  }
  function disableImageDrag() {
    on(window, "dragstart", preventDefault);
  }
  function enableImageDrag() {
    off(window, "dragstart", preventDefault);
  }
  var xt, wt;
  function preventOutline(t) {
    while (-1 === t.tabIndex) t = t.parentNode;
    if (t.style) {
      restoreOutline();
      xt = t;
      wt = t.style.outline;
      t.style.outline = "none";
      on(window, "keydown", restoreOutline);
    }
  }
  function restoreOutline() {
    if (xt) {
      xt.style.outline = wt;
      xt = void 0;
      wt = void 0;
      off(window, "keydown", restoreOutline);
    }
  }
  function getSizedParentNode(t) {
    do {
      t = t.parentNode;
    } while ((!t.offsetWidth || !t.offsetHeight) && t !== document.body);
    return t;
  }
  function getScale(t) {
    var e = t.getBoundingClientRect();
    return {
      x: e.width / t.offsetWidth || 1,
      y: e.height / t.offsetHeight || 1,
      boundingClientRect: e,
    };
  }
  var bt = {
    TRANSFORM: ft,
    TRANSITION: mt,
    TRANSITION_END: gt,
    get: get,
    getStyle: getStyle,
    create: create$1,
    remove: remove,
    empty: empty,
    toFront: toFront,
    toBack: toBack,
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    setClass: setClass,
    getClass: getClass,
    setOpacity: setOpacity,
    testProp: testProp,
    setTransform: setTransform,
    setPosition: setPosition,
    getPosition: getPosition,
    disableTextSelection: vt,
    enableTextSelection: yt,
    disableImageDrag: disableImageDrag,
    enableImageDrag: enableImageDrag,
    preventOutline: preventOutline,
    restoreOutline: restoreOutline,
    getSizedParentNode: getSizedParentNode,
    getScale: getScale,
  };
  function on(e, i, n, o) {
    if ("object" === typeof i) for (var s in i) addOne(e, s, i[s], n);
    else {
      i = splitWords(i);
      for (var a = 0, h = i.length; a < h; a++) addOne(e, i[a], n, o);
    }
    return this || t;
  }
  var Tt = "_leaflet_events";
  function off(e, i, n, o) {
    if ("object" === typeof i) for (var s in i) removeOne(e, s, i[s], n);
    else if (i) {
      i = splitWords(i);
      for (var a = 0, h = i.length; a < h; a++) removeOne(e, i[a], n, o);
    } else {
      for (var l in e[Tt]) removeOne(e, l, e[Tt][l]);
      delete e[Tt];
    }
    return this || t;
  }
  function browserFiresNativeDblClick() {
    if (Y) return !(z || D);
  }
  var Ct = {
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    wheel: !("onwheel" in window) && "mousewheel",
  };
  function addOne(e, i, n, o) {
    var s = i + stamp(n) + (o ? "_" + stamp(o) : "");
    if (e[Tt] && e[Tt][s]) return this || t;
    var handler = function (t) {
      return n.call(o || e, t || window.event);
    };
    var a = handler;
    if (Y && 0 === i.indexOf("touch")) addPointerListener(e, i, handler, s);
    else if (J && "dblclick" === i && !browserFiresNativeDblClick())
      addDoubleTapListener(e, handler, s);
    else if ("addEventListener" in e)
      if (
        "touchstart" === i ||
        "touchmove" === i ||
        "wheel" === i ||
        "mousewheel" === i
      )
        e.addEventListener(Ct[i] || i, handler, !!et && { passive: false });
      else if ("mouseenter" === i || "mouseleave" === i) {
        handler = function (t) {
          t = t || window.event;
          isExternalTarget(e, t) && a(t);
        };
        e.addEventListener(Ct[i], handler, false);
      } else e.addEventListener(i, a, false);
    else "attachEvent" in e && e.attachEvent("on" + i, handler);
    e[Tt] = e[Tt] || {};
    e[Tt][s] = handler;
  }
  function removeOne(e, i, n, o) {
    var s = i + stamp(n) + (o ? "_" + stamp(o) : ""),
      a = e[Tt] && e[Tt][s];
    if (!a) return this || t;
    Y && 0 === i.indexOf("touch")
      ? removePointerListener(e, i, s)
      : J && "dblclick" === i && !browserFiresNativeDblClick()
      ? removeDoubleTapListener(e, s)
      : "removeEventListener" in e
      ? e.removeEventListener(Ct[i] || i, a, false)
      : "detachEvent" in e && e.detachEvent("on" + i, a);
    e[Tt][s] = null;
  }
  function stopPropagation(e) {
    e.stopPropagation
      ? e.stopPropagation()
      : e.originalEvent
      ? (e.originalEvent._stopped = true)
      : (e.cancelBubble = true);
    skipped(e);
    return this || t;
  }
  function disableScrollPropagation(e) {
    addOne(e, "wheel", stopPropagation);
    return this || t;
  }
  function disableClickPropagation(e) {
    on(e, "mousedown touchstart dblclick", stopPropagation);
    addOne(e, "click", fakeStop);
    return this || t;
  }
  function preventDefault(e) {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    return this || t;
  }
  function stop(e) {
    preventDefault(e);
    stopPropagation(e);
    return this || t;
  }
  function getMousePosition(t, e) {
    if (!e) return new Point(t.clientX, t.clientY);
    var i = getScale(e),
      n = i.boundingClientRect;
    return new Point(
      (t.clientX - n.left) / i.x - e.clientLeft,
      (t.clientY - n.top) / i.y - e.clientTop
    );
  }
  var Mt =
    j && A ? 2 * window.devicePixelRatio : I ? window.devicePixelRatio : 1;
  function getWheelDelta(t) {
    return z
      ? t.wheelDeltaY / 2
      : t.deltaY && 0 === t.deltaMode
      ? -t.deltaY / Mt
      : t.deltaY && 1 === t.deltaMode
      ? 20 * -t.deltaY
      : t.deltaY && 2 === t.deltaMode
      ? 60 * -t.deltaY
      : t.deltaX || t.deltaZ
      ? 0
      : t.wheelDelta
      ? (t.wheelDeltaY || t.wheelDelta) / 2
      : t.detail && Math.abs(t.detail) < 32765
      ? 20 * -t.detail
      : t.detail
      ? (t.detail / -32765) * 60
      : 0;
  }
  var zt = {};
  function fakeStop(t) {
    zt[t.type] = true;
  }
  function skipped(t) {
    var e = zt[t.type];
    zt[t.type] = false;
    return e;
  }
  function isExternalTarget(t, e) {
    var i = e.relatedTarget;
    if (!i) return true;
    try {
      while (i && i !== t) i = i.parentNode;
    } catch (t) {
      return false;
    }
    return i !== t;
  }
  var St = {
    on: on,
    off: off,
    stopPropagation: stopPropagation,
    disableScrollPropagation: disableScrollPropagation,
    disableClickPropagation: disableClickPropagation,
    preventDefault: preventDefault,
    stop: stop,
    getMousePosition: getMousePosition,
    getWheelDelta: getWheelDelta,
    fakeStop: fakeStop,
    skipped: skipped,
    isExternalTarget: isExternalTarget,
    addListener: on,
    removeListener: off,
  };
  var Bt = f.extend({
    run: function (e, i, n, o) {
      this.stop();
      (this || t)._el = e;
      (this || t)._inProgress = true;
      (this || t)._duration = n || 0.25;
      (this || t)._easeOutPower = 1 / Math.max(o || 0.5, 0.2);
      (this || t)._startPos = getPosition(e);
      (this || t)._offset = i.subtract((this || t)._startPos);
      (this || t)._startTime = +new Date();
      this.fire("start");
      this._animate();
    },
    stop: function () {
      if ((this || t)._inProgress) {
        this._step(true);
        this._complete();
      }
    },
    _animate: function () {
      (this || t)._animId = requestAnimFrame((this || t)._animate, this || t);
      this._step();
    },
    _step: function (e) {
      var i = +new Date() - (this || t)._startTime,
        n = 1e3 * (this || t)._duration;
      if (i < n) this._runFrame(this._easeOut(i / n), e);
      else {
        this._runFrame(1);
        this._complete();
      }
    },
    _runFrame: function (e, i) {
      var n = (this || t)._startPos.add((this || t)._offset.multiplyBy(e));
      i && n._round();
      setPosition((this || t)._el, n);
      this.fire("step");
    },
    _complete: function () {
      cancelAnimFrame((this || t)._animId);
      (this || t)._inProgress = false;
      this.fire("end");
    },
    _easeOut: function (e) {
      return 1 - Math.pow(1 - e, (this || t)._easeOutPower);
    },
  });
  var kt = f.extend({
    options: {
      crs: x,
      center: void 0,
      zoom: void 0,
      minZoom: void 0,
      maxZoom: void 0,
      layers: [],
      maxBounds: void 0,
      renderer: void 0,
      zoomAnimation: true,
      zoomAnimationThreshold: 4,
      fadeAnimation: true,
      markerZoomAnimation: true,
      transform3DLimit: 8388608,
      zoomSnap: 1,
      zoomDelta: 1,
      trackResize: true,
    },
    initialize: function (e, i) {
      i = setOptions(this || t, i);
      (this || t)._handlers = [];
      (this || t)._layers = {};
      (this || t)._zoomBoundLayers = {};
      (this || t)._sizeChanged = true;
      this._initContainer(e);
      this._initLayout();
      (this || t)._onResize = bind((this || t)._onResize, this || t);
      this._initEvents();
      i.maxBounds && this.setMaxBounds(i.maxBounds);
      void 0 !== i.zoom && ((this || t)._zoom = this._limitZoom(i.zoom));
      i.center &&
        void 0 !== i.zoom &&
        this.setView(toLatLng(i.center), i.zoom, { reset: true });
      this.callInitHooks();
      (this || t)._zoomAnimated =
        mt && U && !X && (this || t).options.zoomAnimation;
      if ((this || t)._zoomAnimated) {
        this._createAnimProxy();
        on((this || t)._proxy, gt, (this || t)._catchTransitionEnd, this || t);
      }
      this._addLayers((this || t).options.layers);
    },
    setView: function (e, i, n) {
      i = void 0 === i ? (this || t)._zoom : this._limitZoom(i);
      e = this._limitCenter(toLatLng(e), i, (this || t).options.maxBounds);
      n = n || {};
      this._stop();
      if ((this || t)._loaded && !n.reset && true !== n) {
        if (void 0 !== n.animate) {
          n.zoom = extend({ animate: n.animate }, n.zoom);
          n.pan = extend({ animate: n.animate, duration: n.duration }, n.pan);
        }
        var o =
          (this || t)._zoom !== i
            ? (this || t)._tryAnimatedZoom &&
              this._tryAnimatedZoom(e, i, n.zoom)
            : this._tryAnimatedPan(e, n.pan);
        if (o) {
          clearTimeout((this || t)._sizeTimer);
          return this || t;
        }
      }
      this._resetView(e, i);
      return this || t;
    },
    setZoom: function (e, i) {
      if (!(this || t)._loaded) {
        (this || t)._zoom = e;
        return this || t;
      }
      return this.setView(this.getCenter(), e, { zoom: i });
    },
    zoomIn: function (e, i) {
      e = e || (U ? (this || t).options.zoomDelta : 1);
      return this.setZoom((this || t)._zoom + e, i);
    },
    zoomOut: function (e, i) {
      e = e || (U ? (this || t).options.zoomDelta : 1);
      return this.setZoom((this || t)._zoom - e, i);
    },
    setZoomAround: function (t, e, i) {
      var n = this.getZoomScale(e),
        o = this.getSize().divideBy(2),
        s = t instanceof Point ? t : this.latLngToContainerPoint(t),
        a = s.subtract(o).multiplyBy(1 - 1 / n),
        h = this.containerPointToLatLng(o.add(a));
      return this.setView(h, e, { zoom: i });
    },
    _getBoundsCenterZoom: function (t, e) {
      e = e || {};
      t = t.getBounds ? t.getBounds() : toLatLngBounds(t);
      var i = toPoint(e.paddingTopLeft || e.padding || [0, 0]),
        n = toPoint(e.paddingBottomRight || e.padding || [0, 0]),
        o = this.getBoundsZoom(t, false, i.add(n));
      o = "number" === typeof e.maxZoom ? Math.min(e.maxZoom, o) : o;
      if (Infinity === o) return { center: t.getCenter(), zoom: o };
      var s = n.subtract(i).divideBy(2),
        a = this.project(t.getSouthWest(), o),
        h = this.project(t.getNorthEast(), o),
        l = this.unproject(a.add(h).divideBy(2).add(s), o);
      return { center: l, zoom: o };
    },
    fitBounds: function (t, e) {
      t = toLatLngBounds(t);
      if (!t.isValid()) throw new Error("Bounds are not valid.");
      var i = this._getBoundsCenterZoom(t, e);
      return this.setView(i.center, i.zoom, e);
    },
    fitWorld: function (t) {
      return this.fitBounds(
        [
          [-90, -180],
          [90, 180],
        ],
        t
      );
    },
    panTo: function (e, i) {
      return this.setView(e, (this || t)._zoom, { pan: i });
    },
    panBy: function (e, i) {
      e = toPoint(e).round();
      i = i || {};
      if (!e.x && !e.y) return this.fire("moveend");
      if (true !== i.animate && !this.getSize().contains(e)) {
        this._resetView(
          this.unproject(this.project(this.getCenter()).add(e)),
          this.getZoom()
        );
        return this || t;
      }
      if (!(this || t)._panAnim) {
        (this || t)._panAnim = new Bt();
        (this || t)._panAnim.on(
          {
            step: (this || t)._onPanTransitionStep,
            end: (this || t)._onPanTransitionEnd,
          },
          this || t
        );
      }
      i.noMoveStart || this.fire("movestart");
      if (false !== i.animate) {
        addClass((this || t)._mapPane, "leaflet-pan-anim");
        var n = this._getMapPanePos().subtract(e).round();
        (this || t)._panAnim.run(
          (this || t)._mapPane,
          n,
          i.duration || 0.25,
          i.easeLinearity
        );
      } else {
        this._rawPanBy(e);
        this.fire("move").fire("moveend");
      }
      return this || t;
    },
    flyTo: function (e, i, n) {
      n = n || {};
      if (false === n.animate || !U) return this.setView(e, i, n);
      this._stop();
      var o = this.project(this.getCenter()),
        s = this.project(e),
        a = this.getSize(),
        h = (this || t)._zoom;
      e = toLatLng(e);
      i = void 0 === i ? h : i;
      var l = Math.max(a.x, a.y),
        c = l * this.getZoomScale(h, i),
        d = s.distanceTo(o) || 1,
        _ = 1.42,
        p = _ * _;
      function r(t) {
        var e = t ? -1 : 1,
          i = t ? c : l,
          n = c * c - l * l + e * p * p * d * d,
          o = 2 * i * p * d,
          s = n / o,
          a = Math.sqrt(s * s + 1) - s;
        var h = a < 1e-9 ? -18 : Math.log(a);
        return h;
      }
      function sinh(t) {
        return (Math.exp(t) - Math.exp(-t)) / 2;
      }
      function cosh(t) {
        return (Math.exp(t) + Math.exp(-t)) / 2;
      }
      function tanh(t) {
        return sinh(t) / cosh(t);
      }
      var f = r(0);
      function w(t) {
        return l * (cosh(f) / cosh(f + _ * t));
      }
      function u(t) {
        return (l * (cosh(f) * tanh(f + _ * t) - sinh(f))) / p;
      }
      function easeOut(t) {
        return 1 - Math.pow(1 - t, 1.5);
      }
      var m = Date.now(),
        g = (r(1) - f) / _,
        v = n.duration ? 1e3 * n.duration : 1e3 * g * 0.8;
      function frame() {
        var n = (Date.now() - m) / v,
          a = easeOut(n) * g;
        if (n <= 1) {
          (this || t)._flyToFrame = requestAnimFrame(frame, this || t);
          this._move(
            this.unproject(o.add(s.subtract(o).multiplyBy(u(a) / d)), h),
            this.getScaleZoom(l / w(a), h),
            { flyTo: true }
          );
        } else this._move(e, i)._moveEnd(true);
      }
      this._moveStart(true, n.noMoveStart);
      frame.call(this || t);
      return this || t;
    },
    flyToBounds: function (t, e) {
      var i = this._getBoundsCenterZoom(t, e);
      return this.flyTo(i.center, i.zoom, e);
    },
    setMaxBounds: function (e) {
      e = toLatLngBounds(e);
      if (!e.isValid()) {
        (this || t).options.maxBounds = null;
        return this.off("moveend", (this || t)._panInsideMaxBounds);
      }
      (this || t).options.maxBounds &&
        this.off("moveend", (this || t)._panInsideMaxBounds);
      (this || t).options.maxBounds = e;
      (this || t)._loaded && this._panInsideMaxBounds();
      return this.on("moveend", (this || t)._panInsideMaxBounds);
    },
    setMinZoom: function (e) {
      var i = (this || t).options.minZoom;
      (this || t).options.minZoom = e;
      if ((this || t)._loaded && i !== e) {
        this.fire("zoomlevelschange");
        if (this.getZoom() < (this || t).options.minZoom)
          return this.setZoom(e);
      }
      return this || t;
    },
    setMaxZoom: function (e) {
      var i = (this || t).options.maxZoom;
      (this || t).options.maxZoom = e;
      if ((this || t)._loaded && i !== e) {
        this.fire("zoomlevelschange");
        if (this.getZoom() > (this || t).options.maxZoom)
          return this.setZoom(e);
      }
      return this || t;
    },
    panInsideBounds: function (e, i) {
      (this || t)._enforcingBounds = true;
      var n = this.getCenter(),
        o = this._limitCenter(n, (this || t)._zoom, toLatLngBounds(e));
      n.equals(o) || this.panTo(o, i);
      (this || t)._enforcingBounds = false;
      return this || t;
    },
    panInside: function (e, i) {
      i = i || {};
      var n = toPoint(i.paddingTopLeft || i.padding || [0, 0]),
        o = toPoint(i.paddingBottomRight || i.padding || [0, 0]),
        s = this.getCenter(),
        a = this.project(s),
        h = this.project(e),
        l = this.getPixelBounds(),
        c = l.getSize().divideBy(2),
        d = toBounds([l.min.add(n), l.max.subtract(o)]);
      if (!d.contains(h)) {
        (this || t)._enforcingBounds = true;
        var _ = a.subtract(h),
          p = toPoint(h.x + _.x, h.y + _.y);
        if (h.x < d.min.x || h.x > d.max.x) {
          p.x = a.x - _.x;
          _.x > 0 ? (p.x += c.x - n.x) : (p.x -= c.x - o.x);
        }
        if (h.y < d.min.y || h.y > d.max.y) {
          p.y = a.y - _.y;
          _.y > 0 ? (p.y += c.y - n.y) : (p.y -= c.y - o.y);
        }
        this.panTo(this.unproject(p), i);
        (this || t)._enforcingBounds = false;
      }
      return this || t;
    },
    invalidateSize: function (e) {
      if (!(this || t)._loaded) return this || t;
      e = extend(
        { animate: false, pan: true },
        true === e ? { animate: true } : e
      );
      var i = this.getSize();
      (this || t)._sizeChanged = true;
      (this || t)._lastCenter = null;
      var n = this.getSize(),
        o = i.divideBy(2).round(),
        s = n.divideBy(2).round(),
        a = o.subtract(s);
      if (!a.x && !a.y) return this || t;
      if (e.animate && e.pan) this.panBy(a);
      else {
        e.pan && this._rawPanBy(a);
        this.fire("move");
        if (e.debounceMoveend) {
          clearTimeout((this || t)._sizeTimer);
          (this || t)._sizeTimer = setTimeout(
            bind((this || t).fire, this || t, "moveend"),
            200
          );
        } else this.fire("moveend");
      }
      return this.fire("resize", { oldSize: i, newSize: n });
    },
    stop: function () {
      this.setZoom(this._limitZoom((this || t)._zoom));
      (this || t).options.zoomSnap || this.fire("viewreset");
      return this._stop();
    },
    locate: function (e) {
      e = (this || t)._locateOptions = extend(
        { timeout: 1e4, watch: false },
        e
      );
      if (!("geolocation" in navigator)) {
        this._handleGeolocationError({
          code: 0,
          message: "Geolocation not supported.",
        });
        return this || t;
      }
      var i = bind((this || t)._handleGeolocationResponse, this || t),
        n = bind((this || t)._handleGeolocationError, this || t);
      e.watch
        ? ((this || t)._locationWatchId = navigator.geolocation.watchPosition(
            i,
            n,
            e
          ))
        : navigator.geolocation.getCurrentPosition(i, n, e);
      return this || t;
    },
    stopLocate: function () {
      navigator.geolocation &&
        navigator.geolocation.clearWatch &&
        navigator.geolocation.clearWatch((this || t)._locationWatchId);
      (this || t)._locateOptions &&
        ((this || t)._locateOptions.setView = false);
      return this || t;
    },
    _handleGeolocationError: function (e) {
      var i = e.code,
        n =
          e.message ||
          (1 === i
            ? "permission denied"
            : 2 === i
            ? "position unavailable"
            : "timeout");
      (this || t)._locateOptions.setView &&
        !(this || t)._loaded &&
        this.fitWorld();
      this.fire("locationerror", {
        code: i,
        message: "Geolocation error: " + n + ".",
      });
    },
    _handleGeolocationResponse: function (e) {
      var i = e.coords.latitude,
        n = e.coords.longitude,
        o = new LatLng(i, n),
        s = o.toBounds(2 * e.coords.accuracy),
        a = (this || t)._locateOptions;
      if (a.setView) {
        var h = this.getBoundsZoom(s);
        this.setView(o, a.maxZoom ? Math.min(h, a.maxZoom) : h);
      }
      var l = { latlng: o, bounds: s, timestamp: e.timestamp };
      for (var c in e.coords)
        "number" === typeof e.coords[c] && (l[c] = e.coords[c]);
      this.fire("locationfound", l);
    },
    addHandler: function (e, i) {
      if (!i) return this || t;
      var n = ((this || t)[e] = new i(this || t));
      (this || t)._handlers.push(n);
      (this || t).options[e] && n.enable();
      return this || t;
    },
    remove: function () {
      this._initEvents(true);
      this.off("moveend", (this || t)._panInsideMaxBounds);
      if ((this || t)._containerId !== (this || t)._container._leaflet_id)
        throw new Error("Map container is being reused by another instance");
      try {
        delete (this || t)._container._leaflet_id;
        delete (this || t)._containerId;
      } catch (e) {
        (this || t)._container._leaflet_id = void 0;
        (this || t)._containerId = void 0;
      }
      void 0 !== (this || t)._locationWatchId && this.stopLocate();
      this._stop();
      remove((this || t)._mapPane);
      (this || t)._clearControlPos && this._clearControlPos();
      if ((this || t)._resizeRequest) {
        cancelAnimFrame((this || t)._resizeRequest);
        (this || t)._resizeRequest = null;
      }
      this._clearHandlers();
      (this || t)._loaded && this.fire("unload");
      var e;
      for (e in (this || t)._layers) (this || t)._layers[e].remove();
      for (e in (this || t)._panes) remove((this || t)._panes[e]);
      (this || t)._layers = [];
      (this || t)._panes = [];
      delete (this || t)._mapPane;
      delete (this || t)._renderer;
      return this || t;
    },
    createPane: function (e, i) {
      var n =
          "leaflet-pane" +
          (e ? " leaflet-" + e.replace("Pane", "") + "-pane" : ""),
        o = create$1("div", n, i || (this || t)._mapPane);
      e && ((this || t)._panes[e] = o);
      return o;
    },
    getCenter: function () {
      this._checkIfLoaded();
      return (this || t)._lastCenter && !this._moved()
        ? (this || t)._lastCenter
        : this.layerPointToLatLng(this._getCenterLayerPoint());
    },
    getZoom: function () {
      return (this || t)._zoom;
    },
    getBounds: function () {
      var t = this.getPixelBounds(),
        e = this.unproject(t.getBottomLeft()),
        i = this.unproject(t.getTopRight());
      return new LatLngBounds(e, i);
    },
    getMinZoom: function () {
      return void 0 === (this || t).options.minZoom
        ? (this || t)._layersMinZoom || 0
        : (this || t).options.minZoom;
    },
    getMaxZoom: function () {
      return void 0 === (this || t).options.maxZoom
        ? void 0 === (this || t)._layersMaxZoom
          ? Infinity
          : (this || t)._layersMaxZoom
        : (this || t).options.maxZoom;
    },
    getBoundsZoom: function (e, i, n) {
      e = toLatLngBounds(e);
      n = toPoint(n || [0, 0]);
      var o = this.getZoom() || 0,
        s = this.getMinZoom(),
        a = this.getMaxZoom(),
        h = e.getNorthWest(),
        l = e.getSouthEast(),
        c = this.getSize().subtract(n),
        d = toBounds(this.project(l, o), this.project(h, o)).getSize(),
        _ = U ? (this || t).options.zoomSnap : 1,
        p = c.x / d.x,
        f = c.y / d.y,
        m = i ? Math.max(p, f) : Math.min(p, f);
      o = this.getScaleZoom(m, o);
      if (_) {
        o = Math.round(o / (_ / 100)) * (_ / 100);
        o = i ? Math.ceil(o / _) * _ : Math.floor(o / _) * _;
      }
      return Math.max(s, Math.min(a, o));
    },
    getSize: function () {
      if (!(this || t)._size || (this || t)._sizeChanged) {
        (this || t)._size = new Point(
          (this || t)._container.clientWidth || 0,
          (this || t)._container.clientHeight || 0
        );
        (this || t)._sizeChanged = false;
      }
      return (this || t)._size.clone();
    },
    getPixelBounds: function (t, e) {
      var i = this._getTopLeftPoint(t, e);
      return new Bounds(i, i.add(this.getSize()));
    },
    getPixelOrigin: function () {
      this._checkIfLoaded();
      return (this || t)._pixelOrigin;
    },
    getPixelWorldBounds: function (e) {
      return (this || t).options.crs.getProjectedBounds(
        void 0 === e ? this.getZoom() : e
      );
    },
    getPane: function (e) {
      return "string" === typeof e ? (this || t)._panes[e] : e;
    },
    getPanes: function () {
      return (this || t)._panes;
    },
    getContainer: function () {
      return (this || t)._container;
    },
    getZoomScale: function (e, i) {
      var n = (this || t).options.crs;
      i = void 0 === i ? (this || t)._zoom : i;
      return n.scale(e) / n.scale(i);
    },
    getScaleZoom: function (e, i) {
      var n = (this || t).options.crs;
      i = void 0 === i ? (this || t)._zoom : i;
      var o = n.zoom(e * n.scale(i));
      return isNaN(o) ? Infinity : o;
    },
    project: function (e, i) {
      i = void 0 === i ? (this || t)._zoom : i;
      return (this || t).options.crs.latLngToPoint(toLatLng(e), i);
    },
    unproject: function (e, i) {
      i = void 0 === i ? (this || t)._zoom : i;
      return (this || t).options.crs.pointToLatLng(toPoint(e), i);
    },
    layerPointToLatLng: function (t) {
      var e = toPoint(t).add(this.getPixelOrigin());
      return this.unproject(e);
    },
    latLngToLayerPoint: function (t) {
      var e = this.project(toLatLng(t))._round();
      return e._subtract(this.getPixelOrigin());
    },
    wrapLatLng: function (e) {
      return (this || t).options.crs.wrapLatLng(toLatLng(e));
    },
    wrapLatLngBounds: function (e) {
      return (this || t).options.crs.wrapLatLngBounds(toLatLngBounds(e));
    },
    distance: function (e, i) {
      return (this || t).options.crs.distance(toLatLng(e), toLatLng(i));
    },
    containerPointToLayerPoint: function (t) {
      return toPoint(t).subtract(this._getMapPanePos());
    },
    layerPointToContainerPoint: function (t) {
      return toPoint(t).add(this._getMapPanePos());
    },
    containerPointToLatLng: function (t) {
      var e = this.containerPointToLayerPoint(toPoint(t));
      return this.layerPointToLatLng(e);
    },
    latLngToContainerPoint: function (t) {
      return this.layerPointToContainerPoint(
        this.latLngToLayerPoint(toLatLng(t))
      );
    },
    mouseEventToContainerPoint: function (e) {
      return getMousePosition(e, (this || t)._container);
    },
    mouseEventToLayerPoint: function (t) {
      return this.containerPointToLayerPoint(
        this.mouseEventToContainerPoint(t)
      );
    },
    mouseEventToLatLng: function (t) {
      return this.layerPointToLatLng(this.mouseEventToLayerPoint(t));
    },
    _initContainer: function (e) {
      var i = ((this || t)._container = get(e));
      if (!i) throw new Error("Map container not found.");
      if (i._leaflet_id)
        throw new Error("Map container is already initialized.");
      on(i, "scroll", (this || t)._onScroll, this || t);
      (this || t)._containerId = stamp(i);
    },
    _initLayout: function () {
      var e = (this || t)._container;
      (this || t)._fadeAnimated = (this || t).options.fadeAnimation && U;
      addClass(
        e,
        "leaflet-container" +
          (J ? " leaflet-touch" : "") +
          (tt ? " leaflet-retina" : "") +
          (M ? " leaflet-oldie" : "") +
          (D ? " leaflet-safari" : "") +
          ((this || t)._fadeAnimated ? " leaflet-fade-anim" : "")
      );
      var i = getStyle(e, "position");
      "absolute" !== i &&
        "relative" !== i &&
        "fixed" !== i &&
        (e.style.position = "relative");
      this._initPanes();
      (this || t)._initControlPos && this._initControlPos();
    },
    _initPanes: function () {
      var e = ((this || t)._panes = {});
      (this || t)._paneRenderers = {};
      (this || t)._mapPane = this.createPane("mapPane", (this || t)._container);
      setPosition((this || t)._mapPane, new Point(0, 0));
      this.createPane("tilePane");
      this.createPane("shadowPane");
      this.createPane("overlayPane");
      this.createPane("markerPane");
      this.createPane("tooltipPane");
      this.createPane("popupPane");
      if (!(this || t).options.markerZoomAnimation) {
        addClass(e.markerPane, "leaflet-zoom-hide");
        addClass(e.shadowPane, "leaflet-zoom-hide");
      }
    },
    _resetView: function (e, i) {
      setPosition((this || t)._mapPane, new Point(0, 0));
      var n = !(this || t)._loaded;
      (this || t)._loaded = true;
      i = this._limitZoom(i);
      this.fire("viewprereset");
      var o = (this || t)._zoom !== i;
      this._moveStart(o, false)._move(e, i)._moveEnd(o);
      this.fire("viewreset");
      n && this.fire("load");
    },
    _moveStart: function (e, i) {
      e && this.fire("zoomstart");
      i || this.fire("movestart");
      return this || t;
    },
    _move: function (e, i, n) {
      void 0 === i && (i = (this || t)._zoom);
      var o = (this || t)._zoom !== i;
      (this || t)._zoom = i;
      (this || t)._lastCenter = e;
      (this || t)._pixelOrigin = this._getNewPixelOrigin(e);
      (o || (n && n.pinch)) && this.fire("zoom", n);
      return this.fire("move", n);
    },
    _moveEnd: function (t) {
      t && this.fire("zoomend");
      return this.fire("moveend");
    },
    _stop: function () {
      cancelAnimFrame((this || t)._flyToFrame);
      (this || t)._panAnim && (this || t)._panAnim.stop();
      return this || t;
    },
    _rawPanBy: function (e) {
      setPosition((this || t)._mapPane, this._getMapPanePos().subtract(e));
    },
    _getZoomSpan: function () {
      return this.getMaxZoom() - this.getMinZoom();
    },
    _panInsideMaxBounds: function () {
      (this || t)._enforcingBounds ||
        this.panInsideBounds((this || t).options.maxBounds);
    },
    _checkIfLoaded: function () {
      if (!(this || t)._loaded)
        throw new Error("Set map center and zoom first.");
    },
    _initEvents: function (e) {
      (this || t)._targets = {};
      (this || t)._targets[stamp((this || t)._container)] = this || t;
      var i = e ? off : on;
      i(
        (this || t)._container,
        "click dblclick mousedown mouseup " +
          "mouseover mouseout mousemove contextmenu keypress keydown keyup",
        (this || t)._handleDOMEvent,
        this || t
      );
      (this || t).options.trackResize &&
        i(window, "resize", (this || t)._onResize, this || t);
      U &&
        (this || t).options.transform3DLimit &&
        (e ? (this || t).off : (this || t).on).call(
          this || t,
          "moveend",
          (this || t)._onMoveEnd
        );
    },
    _onResize: function () {
      cancelAnimFrame((this || t)._resizeRequest);
      (this || t)._resizeRequest = requestAnimFrame(function () {
        this.invalidateSize({ debounceMoveend: true });
      }, this || t);
    },
    _onScroll: function () {
      (this || t)._container.scrollTop = 0;
      (this || t)._container.scrollLeft = 0;
    },
    _onMoveEnd: function () {
      var e = this._getMapPanePos();
      Math.max(Math.abs(e.x), Math.abs(e.y)) >=
        (this || t).options.transform3DLimit &&
        this._resetView(this.getCenter(), this.getZoom());
    },
    _findEventTargets: function (e, i) {
      var n = [],
        o,
        s = "mouseout" === i || "mouseover" === i,
        a = e.target || e.srcElement,
        h = false;
      while (a) {
        o = (this || t)._targets[stamp(a)];
        if (
          o &&
          ("click" === i || "preclick" === i) &&
          !e._simulated &&
          this._draggableMoved(o)
        ) {
          h = true;
          break;
        }
        if (o && o.listens(i, true)) {
          if (s && !isExternalTarget(a, e)) break;
          n.push(o);
          if (s) break;
        }
        if (a === (this || t)._container) break;
        a = a.parentNode;
      }
      n.length || h || s || !isExternalTarget(a, e) || (n = [this || t]);
      return n;
    },
    _handleDOMEvent: function (e) {
      if ((this || t)._loaded && !skipped(e)) {
        var i = e.type;
        ("mousedown" !== i &&
          "keypress" !== i &&
          "keyup" !== i &&
          "keydown" !== i) ||
          preventOutline(e.target || e.srcElement);
        this._fireDOMEvent(e, i);
      }
    },
    _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
    _fireDOMEvent: function (e, i, n) {
      if ("click" === e.type) {
        var o = extend({}, e);
        o.type = "preclick";
        this._fireDOMEvent(o, o.type, n);
      }
      if (!e._stopped) {
        n = (n || []).concat(this._findEventTargets(e, i));
        if (n.length) {
          var s = n[0];
          "contextmenu" === i && s.listens(i, true) && preventDefault(e);
          var a = { originalEvent: e };
          if (
            "keypress" !== e.type &&
            "keydown" !== e.type &&
            "keyup" !== e.type
          ) {
            var h = s.getLatLng && (!s._radius || s._radius <= 10);
            a.containerPoint = h
              ? this.latLngToContainerPoint(s.getLatLng())
              : this.mouseEventToContainerPoint(e);
            a.layerPoint = this.containerPointToLayerPoint(a.containerPoint);
            a.latlng = h
              ? s.getLatLng()
              : this.layerPointToLatLng(a.layerPoint);
          }
          for (var l = 0; l < n.length; l++) {
            n[l].fire(i, a, true);
            if (
              a.originalEvent._stopped ||
              (false === n[l].options.bubblingMouseEvents &&
                -1 !== indexOf((this || t)._mouseEvents, i))
            )
              return;
          }
        }
      }
    },
    _draggableMoved: function (e) {
      e = e.dragging && e.dragging.enabled() ? e : this || t;
      return (
        (e.dragging && e.dragging.moved()) ||
        ((this || t).boxZoom && (this || t).boxZoom.moved())
      );
    },
    _clearHandlers: function () {
      for (var e = 0, i = (this || t)._handlers.length; e < i; e++)
        (this || t)._handlers[e].disable();
    },
    whenReady: function (e, i) {
      (this || t)._loaded
        ? e.call(i || this || t, { target: this || t })
        : this.on("load", e, i);
      return this || t;
    },
    _getMapPanePos: function () {
      return getPosition((this || t)._mapPane) || new Point(0, 0);
    },
    _moved: function () {
      var t = this._getMapPanePos();
      return t && !t.equals([0, 0]);
    },
    _getTopLeftPoint: function (t, e) {
      var i =
        t && void 0 !== e
          ? this._getNewPixelOrigin(t, e)
          : this.getPixelOrigin();
      return i.subtract(this._getMapPanePos());
    },
    _getNewPixelOrigin: function (t, e) {
      var i = this.getSize()._divideBy(2);
      return this.project(t, e)
        ._subtract(i)
        ._add(this._getMapPanePos())
        ._round();
    },
    _latLngToNewLayerPoint: function (t, e, i) {
      var n = this._getNewPixelOrigin(i, e);
      return this.project(t, e)._subtract(n);
    },
    _latLngBoundsToNewLayerBounds: function (t, e, i) {
      var n = this._getNewPixelOrigin(i, e);
      return toBounds([
        this.project(t.getSouthWest(), e)._subtract(n),
        this.project(t.getNorthWest(), e)._subtract(n),
        this.project(t.getSouthEast(), e)._subtract(n),
        this.project(t.getNorthEast(), e)._subtract(n),
      ]);
    },
    _getCenterLayerPoint: function () {
      return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
    },
    _getCenterOffset: function (t) {
      return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint());
    },
    _limitCenter: function (t, e, i) {
      if (!i) return t;
      var n = this.project(t, e),
        o = this.getSize().divideBy(2),
        s = new Bounds(n.subtract(o), n.add(o)),
        a = this._getBoundsOffset(s, i, e);
      return a.round().equals([0, 0]) ? t : this.unproject(n.add(a), e);
    },
    _limitOffset: function (t, e) {
      if (!e) return t;
      var i = this.getPixelBounds(),
        n = new Bounds(i.min.add(t), i.max.add(t));
      return t.add(this._getBoundsOffset(n, e));
    },
    _getBoundsOffset: function (t, e, i) {
      var n = toBounds(
          this.project(e.getNorthEast(), i),
          this.project(e.getSouthWest(), i)
        ),
        o = n.min.subtract(t.min),
        s = n.max.subtract(t.max),
        a = this._rebound(o.x, -s.x),
        h = this._rebound(o.y, -s.y);
      return new Point(a, h);
    },
    _rebound: function (t, e) {
      return t + e > 0
        ? Math.round(t - e) / 2
        : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e));
    },
    _limitZoom: function (e) {
      var i = this.getMinZoom(),
        n = this.getMaxZoom(),
        o = U ? (this || t).options.zoomSnap : 1;
      o && (e = Math.round(e / o) * o);
      return Math.max(i, Math.min(n, e));
    },
    _onPanTransitionStep: function () {
      this.fire("move");
    },
    _onPanTransitionEnd: function () {
      removeClass((this || t)._mapPane, "leaflet-pan-anim");
      this.fire("moveend");
    },
    _tryAnimatedPan: function (t, e) {
      var i = this._getCenterOffset(t)._trunc();
      if (true !== (e && e.animate) && !this.getSize().contains(i))
        return false;
      this.panBy(i, e);
      return true;
    },
    _createAnimProxy: function () {
      var e = ((this || t)._proxy = create$1(
        "div",
        "leaflet-proxy leaflet-zoom-animated"
      ));
      (this || t)._panes.mapPane.appendChild(e);
      this.on(
        "zoomanim",
        function (e) {
          var i = ft,
            n = (this || t)._proxy.style[i];
          setTransform(
            (this || t)._proxy,
            this.project(e.center, e.zoom),
            this.getZoomScale(e.zoom, 1)
          );
          n === (this || t)._proxy.style[i] &&
            (this || t)._animatingZoom &&
            this._onZoomTransitionEnd();
        },
        this || t
      );
      this.on("load moveend", (this || t)._animMoveEnd, this || t);
      this._on("unload", (this || t)._destroyAnimProxy, this || t);
    },
    _destroyAnimProxy: function () {
      remove((this || t)._proxy);
      this.off("load moveend", (this || t)._animMoveEnd, this || t);
      delete (this || t)._proxy;
    },
    _animMoveEnd: function () {
      var e = this.getCenter(),
        i = this.getZoom();
      setTransform(
        (this || t)._proxy,
        this.project(e, i),
        this.getZoomScale(i, 1)
      );
    },
    _catchTransitionEnd: function (e) {
      (this || t)._animatingZoom &&
        e.propertyName.indexOf("transform") >= 0 &&
        this._onZoomTransitionEnd();
    },
    _nothingToAnimate: function () {
      return !(this || t)._container.getElementsByClassName(
        "leaflet-zoom-animated"
      ).length;
    },
    _tryAnimatedZoom: function (e, i, n) {
      if ((this || t)._animatingZoom) return true;
      n = n || {};
      if (
        !(this || t)._zoomAnimated ||
        false === n.animate ||
        this._nothingToAnimate() ||
        Math.abs(i - (this || t)._zoom) >
          (this || t).options.zoomAnimationThreshold
      )
        return false;
      var o = this.getZoomScale(i),
        s = this._getCenterOffset(e)._divideBy(1 - 1 / o);
      if (true !== n.animate && !this.getSize().contains(s)) return false;
      requestAnimFrame(function () {
        this._moveStart(true, false)._animateZoom(e, i, true);
      }, this || t);
      return true;
    },
    _animateZoom: function (e, i, n, o) {
      if ((this || t)._mapPane) {
        if (n) {
          (this || t)._animatingZoom = true;
          (this || t)._animateToCenter = e;
          (this || t)._animateToZoom = i;
          addClass((this || t)._mapPane, "leaflet-zoom-anim");
        }
        this.fire("zoomanim", { center: e, zoom: i, noUpdate: o });
        setTimeout(bind((this || t)._onZoomTransitionEnd, this || t), 250);
      }
    },
    _onZoomTransitionEnd: function () {
      if ((this || t)._animatingZoom) {
        (this || t)._mapPane &&
          removeClass((this || t)._mapPane, "leaflet-zoom-anim");
        (this || t)._animatingZoom = false;
        this._move((this || t)._animateToCenter, (this || t)._animateToZoom);
        requestAnimFrame(function () {
          this._moveEnd(true);
        }, this || t);
      }
    },
  });
  function createMap(t, e) {
    return new kt(t, e);
  }
  var Et = Class.extend({
    options: { position: "topright" },
    initialize: function (e) {
      setOptions(this || t, e);
    },
    getPosition: function () {
      return (this || t).options.position;
    },
    setPosition: function (e) {
      var i = (this || t)._map;
      i && i.removeControl(this || t);
      (this || t).options.position = e;
      i && i.addControl(this || t);
      return this || t;
    },
    getContainer: function () {
      return (this || t)._container;
    },
    addTo: function (e) {
      this.remove();
      (this || t)._map = e;
      var i = ((this || t)._container = this.onAdd(e)),
        n = this.getPosition(),
        o = e._controlCorners[n];
      addClass(i, "leaflet-control");
      -1 !== n.indexOf("bottom")
        ? o.insertBefore(i, o.firstChild)
        : o.appendChild(i);
      (this || t)._map.on("unload", (this || t).remove, this || t);
      return this || t;
    },
    remove: function () {
      if (!(this || t)._map) return this || t;
      remove((this || t)._container);
      (this || t).onRemove && this.onRemove((this || t)._map);
      (this || t)._map.off("unload", (this || t).remove, this || t);
      (this || t)._map = null;
      return this || t;
    },
    _refocusOnMap: function (e) {
      (this || t)._map &&
        e &&
        e.screenX > 0 &&
        e.screenY > 0 &&
        (this || t)._map.getContainer().focus();
    },
  });
  var control = function (t) {
    return new Et(t);
  };
  kt.include({
    addControl: function (e) {
      e.addTo(this || t);
      return this || t;
    },
    removeControl: function (e) {
      e.remove();
      return this || t;
    },
    _initControlPos: function () {
      var e = ((this || t)._controlCorners = {}),
        i = "leaflet-",
        n = ((this || t)._controlContainer = create$1(
          "div",
          i + "control-container",
          (this || t)._container
        ));
      function createCorner(t, o) {
        var s = i + t + " " + i + o;
        e[t + o] = create$1("div", s, n);
      }
      createCorner("top", "left");
      createCorner("top", "right");
      createCorner("bottom", "left");
      createCorner("bottom", "right");
    },
    _clearControlPos: function () {
      for (var e in (this || t)._controlCorners)
        remove((this || t)._controlCorners[e]);
      remove((this || t)._controlContainer);
      delete (this || t)._controlCorners;
      delete (this || t)._controlContainer;
    },
  });
  var Ot = Et.extend({
    options: {
      collapsed: true,
      position: "topright",
      autoZIndex: true,
      hideSingleBase: false,
      sortLayers: false,
      sortFunction: function (t, e, i, n) {
        return i < n ? -1 : n < i ? 1 : 0;
      },
    },
    initialize: function (e, i, n) {
      setOptions(this || t, n);
      (this || t)._layerControlInputs = [];
      (this || t)._layers = [];
      (this || t)._lastZIndex = 0;
      (this || t)._handlingClick = false;
      for (var o in e) this._addLayer(e[o], o);
      for (o in i) this._addLayer(i[o], o, true);
    },
    onAdd: function (e) {
      this._initLayout();
      this._update();
      (this || t)._map = e;
      e.on("zoomend", (this || t)._checkDisabledLayers, this || t);
      for (var i = 0; i < (this || t)._layers.length; i++)
        (this || t)._layers[i].layer.on(
          "add remove",
          (this || t)._onLayerChange,
          this || t
        );
      return (this || t)._container;
    },
    addTo: function (e) {
      Et.prototype.addTo.call(this || t, e);
      return this._expandIfNotCollapsed();
    },
    onRemove: function () {
      (this || t)._map.off(
        "zoomend",
        (this || t)._checkDisabledLayers,
        this || t
      );
      for (var e = 0; e < (this || t)._layers.length; e++)
        (this || t)._layers[e].layer.off(
          "add remove",
          (this || t)._onLayerChange,
          this || t
        );
    },
    addBaseLayer: function (e, i) {
      this._addLayer(e, i);
      return (this || t)._map ? this._update() : this || t;
    },
    addOverlay: function (e, i) {
      this._addLayer(e, i, true);
      return (this || t)._map ? this._update() : this || t;
    },
    removeLayer: function (e) {
      e.off("add remove", (this || t)._onLayerChange, this || t);
      var i = this._getLayer(stamp(e));
      i && (this || t)._layers.splice((this || t)._layers.indexOf(i), 1);
      return (this || t)._map ? this._update() : this || t;
    },
    expand: function () {
      addClass((this || t)._container, "leaflet-control-layers-expanded");
      (this || t)._section.style.height = null;
      var e =
        (this || t)._map.getSize().y - ((this || t)._container.offsetTop + 50);
      if (e < (this || t)._section.clientHeight) {
        addClass((this || t)._section, "leaflet-control-layers-scrollbar");
        (this || t)._section.style.height = e + "px";
      } else
        removeClass((this || t)._section, "leaflet-control-layers-scrollbar");
      this._checkDisabledLayers();
      return this || t;
    },
    collapse: function () {
      removeClass((this || t)._container, "leaflet-control-layers-expanded");
      return this || t;
    },
    _initLayout: function () {
      var e = "leaflet-control-layers",
        i = ((this || t)._container = create$1("div", e)),
        n = (this || t).options.collapsed;
      i.setAttribute("aria-haspopup", true);
      disableClickPropagation(i);
      disableScrollPropagation(i);
      var o = ((this || t)._section = create$1("section", e + "-list"));
      if (n) {
        (this || t)._map.on("click", (this || t).collapse, this || t);
        B ||
          on(
            i,
            {
              mouseenter: (this || t).expand,
              mouseleave: (this || t).collapse,
            },
            this || t
          );
      }
      var s = ((this || t)._layersLink = create$1("a", e + "-toggle", i));
      s.href = "#";
      s.title = "Layers";
      if (J) {
        on(s, "click", stop);
        on(s, "click", (this || t).expand, this || t);
      } else on(s, "focus", (this || t).expand, this || t);
      n || this.expand();
      (this || t)._baseLayersList = create$1("div", e + "-base", o);
      (this || t)._separator = create$1("div", e + "-separator", o);
      (this || t)._overlaysList = create$1("div", e + "-overlays", o);
      i.appendChild(o);
    },
    _getLayer: function (e) {
      for (var i = 0; i < (this || t)._layers.length; i++)
        if ((this || t)._layers[i] && stamp((this || t)._layers[i].layer) === e)
          return (this || t)._layers[i];
    },
    _addLayer: function (e, i, n) {
      (this || t)._map &&
        e.on("add remove", (this || t)._onLayerChange, this || t);
      (this || t)._layers.push({ layer: e, name: i, overlay: n });
      (this || t).options.sortLayers &&
        (this || t)._layers.sort(
          bind(function (e, i) {
            return (this || t).options.sortFunction(
              e.layer,
              i.layer,
              e.name,
              i.name
            );
          }, this || t)
        );
      if ((this || t).options.autoZIndex && e.setZIndex) {
        (this || t)._lastZIndex++;
        e.setZIndex((this || t)._lastZIndex);
      }
      this._expandIfNotCollapsed();
    },
    _update: function () {
      if (!(this || t)._container) return this || t;
      empty((this || t)._baseLayersList);
      empty((this || t)._overlaysList);
      (this || t)._layerControlInputs = [];
      var e,
        i,
        n,
        o,
        s = 0;
      for (n = 0; n < (this || t)._layers.length; n++) {
        o = (this || t)._layers[n];
        this._addItem(o);
        i = i || o.overlay;
        e = e || !o.overlay;
        s += o.overlay ? 0 : 1;
      }
      if ((this || t).options.hideSingleBase) {
        e = e && s > 1;
        (this || t)._baseLayersList.style.display = e ? "" : "none";
      }
      (this || t)._separator.style.display = i && e ? "" : "none";
      return this || t;
    },
    _onLayerChange: function (e) {
      (this || t)._handlingClick || this._update();
      var i = this._getLayer(stamp(e.target));
      var n = i.overlay
        ? "add" === e.type
          ? "overlayadd"
          : "overlayremove"
        : "add" === e.type
        ? "baselayerchange"
        : null;
      n && (this || t)._map.fire(n, i);
    },
    _createRadioElement: function (t, e) {
      var i =
        '<input type="radio" class="leaflet-control-layers-selector" name="' +
        t +
        '"' +
        (e ? ' checked="checked"' : "") +
        "/>";
      var n = document.createElement("div");
      n.innerHTML = i;
      return n.firstChild;
    },
    _addItem: function (e) {
      var i = document.createElement("label"),
        n = (this || t)._map.hasLayer(e.layer),
        o;
      if (e.overlay) {
        o = document.createElement("input");
        o.type = "checkbox";
        o.className = "leaflet-control-layers-selector";
        o.defaultChecked = n;
      } else
        o = this._createRadioElement(
          "leaflet-base-layers_" + stamp(this || t),
          n
        );
      (this || t)._layerControlInputs.push(o);
      o.layerId = stamp(e.layer);
      on(o, "click", (this || t)._onInputClick, this || t);
      var s = document.createElement("span");
      s.innerHTML = " " + e.name;
      var a = document.createElement("div");
      i.appendChild(a);
      a.appendChild(o);
      a.appendChild(s);
      var h = e.overlay
        ? (this || t)._overlaysList
        : (this || t)._baseLayersList;
      h.appendChild(i);
      this._checkDisabledLayers();
      return i;
    },
    _onInputClick: function () {
      var e = (this || t)._layerControlInputs,
        i,
        n;
      var o = [],
        s = [];
      (this || t)._handlingClick = true;
      for (var a = e.length - 1; a >= 0; a--) {
        i = e[a];
        n = this._getLayer(i.layerId).layer;
        i.checked ? o.push(n) : i.checked || s.push(n);
      }
      for (a = 0; a < s.length; a++)
        (this || t)._map.hasLayer(s[a]) && (this || t)._map.removeLayer(s[a]);
      for (a = 0; a < o.length; a++)
        (this || t)._map.hasLayer(o[a]) || (this || t)._map.addLayer(o[a]);
      (this || t)._handlingClick = false;
      this._refocusOnMap();
    },
    _checkDisabledLayers: function () {
      var e = (this || t)._layerControlInputs,
        i,
        n,
        o = (this || t)._map.getZoom();
      for (var s = e.length - 1; s >= 0; s--) {
        i = e[s];
        n = this._getLayer(i.layerId).layer;
        i.disabled =
          (void 0 !== n.options.minZoom && o < n.options.minZoom) ||
          (void 0 !== n.options.maxZoom && o > n.options.maxZoom);
      }
    },
    _expandIfNotCollapsed: function () {
      (this || t)._map && !(this || t).options.collapsed && this.expand();
      return this || t;
    },
    _expand: function () {
      return this.expand();
    },
    _collapse: function () {
      return this.collapse();
    },
  });
  var layers = function (t, e, i) {
    return new Ot(t, e, i);
  };
  var Zt = Et.extend({
    options: {
      position: "topleft",
      zoomInText: "+",
      zoomInTitle: "Zoom in",
      zoomOutText: "&#x2212;",
      zoomOutTitle: "Zoom out",
    },
    onAdd: function (e) {
      var i = "leaflet-control-zoom",
        n = create$1("div", i + " leaflet-bar"),
        o = (this || t).options;
      (this || t)._zoomInButton = this._createButton(
        o.zoomInText,
        o.zoomInTitle,
        i + "-in",
        n,
        (this || t)._zoomIn
      );
      (this || t)._zoomOutButton = this._createButton(
        o.zoomOutText,
        o.zoomOutTitle,
        i + "-out",
        n,
        (this || t)._zoomOut
      );
      this._updateDisabled();
      e.on("zoomend zoomlevelschange", (this || t)._updateDisabled, this || t);
      return n;
    },
    onRemove: function (e) {
      e.off("zoomend zoomlevelschange", (this || t)._updateDisabled, this || t);
    },
    disable: function () {
      (this || t)._disabled = true;
      this._updateDisabled();
      return this || t;
    },
    enable: function () {
      (this || t)._disabled = false;
      this._updateDisabled();
      return this || t;
    },
    _zoomIn: function (e) {
      !(this || t)._disabled &&
        (this || t)._map._zoom < (this || t)._map.getMaxZoom() &&
        (this || t)._map.zoomIn(
          (this || t)._map.options.zoomDelta * (e.shiftKey ? 3 : 1)
        );
    },
    _zoomOut: function (e) {
      !(this || t)._disabled &&
        (this || t)._map._zoom > (this || t)._map.getMinZoom() &&
        (this || t)._map.zoomOut(
          (this || t)._map.options.zoomDelta * (e.shiftKey ? 3 : 1)
        );
    },
    _createButton: function (e, i, n, o, s) {
      var a = create$1("a", n, o);
      a.innerHTML = e;
      a.href = "#";
      a.title = i;
      a.setAttribute("role", "button");
      a.setAttribute("aria-label", i);
      disableClickPropagation(a);
      on(a, "click", stop);
      on(a, "click", s, this || t);
      on(a, "click", (this || t)._refocusOnMap, this || t);
      return a;
    },
    _updateDisabled: function () {
      var e = (this || t)._map,
        i = "leaflet-disabled";
      removeClass((this || t)._zoomInButton, i);
      removeClass((this || t)._zoomOutButton, i);
      ((this || t)._disabled || e._zoom === e.getMinZoom()) &&
        addClass((this || t)._zoomOutButton, i);
      ((this || t)._disabled || e._zoom === e.getMaxZoom()) &&
        addClass((this || t)._zoomInButton, i);
    },
  });
  kt.mergeOptions({ zoomControl: true });
  kt.addInitHook(function () {
    if ((this || t).options.zoomControl) {
      (this || t).zoomControl = new Zt();
      this.addControl((this || t).zoomControl);
    }
  });
  var zoom = function (t) {
    return new Zt(t);
  };
  var At = Et.extend({
    options: {
      position: "bottomleft",
      maxWidth: 100,
      metric: true,
      imperial: true,
    },
    onAdd: function (e) {
      var i = "leaflet-control-scale",
        n = create$1("div", i),
        o = (this || t).options;
      this._addScales(o, i + "-line", n);
      e.on(
        o.updateWhenIdle ? "moveend" : "move",
        (this || t)._update,
        this || t
      );
      e.whenReady((this || t)._update, this || t);
      return n;
    },
    onRemove: function (e) {
      e.off(
        (this || t).options.updateWhenIdle ? "moveend" : "move",
        (this || t)._update,
        this || t
      );
    },
    _addScales: function (e, i, n) {
      e.metric && ((this || t)._mScale = create$1("div", i, n));
      e.imperial && ((this || t)._iScale = create$1("div", i, n));
    },
    _update: function () {
      var e = (this || t)._map,
        i = e.getSize().y / 2;
      var n = e.distance(
        e.containerPointToLatLng([0, i]),
        e.containerPointToLatLng([(this || t).options.maxWidth, i])
      );
      this._updateScales(n);
    },
    _updateScales: function (e) {
      (this || t).options.metric && e && this._updateMetric(e);
      (this || t).options.imperial && e && this._updateImperial(e);
    },
    _updateMetric: function (e) {
      var i = this._getRoundNum(e),
        n = i < 1e3 ? i + " m" : i / 1e3 + " km";
      this._updateScale((this || t)._mScale, n, i / e);
    },
    _updateImperial: function (e) {
      var i = 3.2808399 * e,
        n,
        o,
        s;
      if (i > 5280) {
        n = i / 5280;
        o = this._getRoundNum(n);
        this._updateScale((this || t)._iScale, o + " mi", o / n);
      } else {
        s = this._getRoundNum(i);
        this._updateScale((this || t)._iScale, s + " ft", s / i);
      }
    },
    _updateScale: function (e, i, n) {
      e.style.width = Math.round((this || t).options.maxWidth * n) + "px";
      e.innerHTML = i;
    },
    _getRoundNum: function (t) {
      var e = Math.pow(10, (Math.floor(t) + "").length - 1),
        i = t / e;
      i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1;
      return e * i;
    },
  });
  var scale = function (t) {
    return new At(t);
  };
  var It = Et.extend({
    options: {
      position: "bottomright",
      prefix:
        '<a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>',
    },
    initialize: function (e) {
      setOptions(this || t, e);
      (this || t)._attributions = {};
    },
    onAdd: function (e) {
      e.attributionControl = this || t;
      (this || t)._container = create$1("div", "leaflet-control-attribution");
      disableClickPropagation((this || t)._container);
      for (var i in e._layers)
        e._layers[i].getAttribution &&
          this.addAttribution(e._layers[i].getAttribution());
      this._update();
      return (this || t)._container;
    },
    setPrefix: function (e) {
      (this || t).options.prefix = e;
      this._update();
      return this || t;
    },
    addAttribution: function (e) {
      if (!e) return this || t;
      (this || t)._attributions[e] || ((this || t)._attributions[e] = 0);
      (this || t)._attributions[e]++;
      this._update();
      return this || t;
    },
    removeAttribution: function (e) {
      if (!e) return this || t;
      if ((this || t)._attributions[e]) {
        (this || t)._attributions[e]--;
        this._update();
      }
      return this || t;
    },
    _update: function () {
      if ((this || t)._map) {
        var e = [];
        for (var i in (this || t)._attributions)
          (this || t)._attributions[i] && e.push(i);
        var n = [];
        (this || t).options.prefix && n.push((this || t).options.prefix);
        e.length && n.push(e.join(", "));
        (this || t)._container.innerHTML = n.join(" | ");
      }
    },
  });
  kt.mergeOptions({ attributionControl: true });
  kt.addInitHook(function () {
    (this || t).options.attributionControl && new It().addTo(this || t);
  });
  var attribution = function (t) {
    return new It(t);
  };
  Et.Layers = Ot;
  Et.Zoom = Zt;
  Et.Scale = At;
  Et.Attribution = It;
  control.layers = layers;
  control.zoom = zoom;
  control.scale = scale;
  control.attribution = attribution;
  var Dt = Class.extend({
    initialize: function (e) {
      (this || t)._map = e;
    },
    enable: function () {
      if ((this || t)._enabled) return this || t;
      (this || t)._enabled = true;
      this.addHooks();
      return this || t;
    },
    disable: function () {
      if (!(this || t)._enabled) return this || t;
      (this || t)._enabled = false;
      this.removeHooks();
      return this || t;
    },
    enabled: function () {
      return !!(this || t)._enabled;
    },
  });
  Dt.addTo = function (e, i) {
    e.addHandler(i, this || t);
    return this || t;
  };
  var Nt = { Events: p };
  var Rt = J ? "touchstart mousedown" : "mousedown";
  var Ft = {
    mousedown: "mouseup",
    touchstart: "touchend",
    pointerdown: "touchend",
    MSPointerDown: "touchend",
  };
  var jt = {
    mousedown: "mousemove",
    touchstart: "touchmove",
    pointerdown: "touchmove",
    MSPointerDown: "touchmove",
  };
  var Wt = f.extend({
    options: { clickTolerance: 3 },
    initialize: function (e, i, n, o) {
      setOptions(this || t, o);
      (this || t)._element = e;
      (this || t)._dragStartTarget = i || e;
      (this || t)._preventOutline = n;
    },
    enable: function () {
      if (!(this || t)._enabled) {
        on((this || t)._dragStartTarget, Rt, (this || t)._onDown, this || t);
        (this || t)._enabled = true;
      }
    },
    disable: function () {
      if ((this || t)._enabled) {
        Wt._dragging === (this || t) && this.finishDrag();
        off((this || t)._dragStartTarget, Rt, (this || t)._onDown, this || t);
        (this || t)._enabled = false;
        (this || t)._moved = false;
      }
    },
    _onDown: function (e) {
      if (!e._simulated && (this || t)._enabled) {
        (this || t)._moved = false;
        if (
          !hasClass((this || t)._element, "leaflet-zoom-anim") &&
          !(
            Wt._dragging ||
            e.shiftKey ||
            (1 !== e.which && 1 !== e.button && !e.touches)
          )
        ) {
          Wt._dragging = this || t;
          (this || t)._preventOutline && preventOutline((this || t)._element);
          disableImageDrag();
          vt();
          if (!(this || t)._moving) {
            this.fire("down");
            var i = e.touches ? e.touches[0] : e,
              n = getSizedParentNode((this || t)._element);
            (this || t)._startPoint = new Point(i.clientX, i.clientY);
            (this || t)._parentScale = getScale(n);
            on(document, jt[e.type], (this || t)._onMove, this || t);
            on(document, Ft[e.type], (this || t)._onUp, this || t);
          }
        }
      }
    },
    _onMove: function (e) {
      if (!e._simulated && (this || t)._enabled)
        if (e.touches && e.touches.length > 1) (this || t)._moved = true;
        else {
          var i = e.touches && 1 === e.touches.length ? e.touches[0] : e,
            n = new Point(i.clientX, i.clientY)._subtract(
              (this || t)._startPoint
            );
          if (
            (n.x || n.y) &&
            !(
              Math.abs(n.x) + Math.abs(n.y) <
              (this || t).options.clickTolerance
            )
          ) {
            n.x /= (this || t)._parentScale.x;
            n.y /= (this || t)._parentScale.y;
            preventDefault(e);
            if (!(this || t)._moved) {
              this.fire("dragstart");
              (this || t)._moved = true;
              (this || t)._startPos = getPosition(
                (this || t)._element
              ).subtract(n);
              addClass(document.body, "leaflet-dragging");
              (this || t)._lastTarget = e.target || e.srcElement;
              window.SVGElementInstance &&
                (this || t)._lastTarget instanceof window.SVGElementInstance &&
                ((this || t)._lastTarget = (
                  this || t
                )._lastTarget.correspondingUseElement);
              addClass((this || t)._lastTarget, "leaflet-drag-target");
            }
            (this || t)._newPos = (this || t)._startPos.add(n);
            (this || t)._moving = true;
            cancelAnimFrame((this || t)._animRequest);
            (this || t)._lastEvent = e;
            (this || t)._animRequest = requestAnimFrame(
              (this || t)._updatePosition,
              this || t,
              true
            );
          }
        }
    },
    _updatePosition: function () {
      var e = { originalEvent: (this || t)._lastEvent };
      this.fire("predrag", e);
      setPosition((this || t)._element, (this || t)._newPos);
      this.fire("drag", e);
    },
    _onUp: function (e) {
      !e._simulated && (this || t)._enabled && this.finishDrag();
    },
    finishDrag: function () {
      removeClass(document.body, "leaflet-dragging");
      if ((this || t)._lastTarget) {
        removeClass((this || t)._lastTarget, "leaflet-drag-target");
        (this || t)._lastTarget = null;
      }
      for (var e in jt) {
        off(document, jt[e], (this || t)._onMove, this || t);
        off(document, Ft[e], (this || t)._onUp, this || t);
      }
      enableImageDrag();
      yt();
      if ((this || t)._moved && (this || t)._moving) {
        cancelAnimFrame((this || t)._animRequest);
        this.fire("dragend", {
          distance: (this || t)._newPos.distanceTo((this || t)._startPos),
        });
      }
      (this || t)._moving = false;
      Wt._dragging = false;
    },
  });
  function simplify(t, e) {
    if (!e || !t.length) return t.slice();
    var i = e * e;
    t = _reducePoints(t, i);
    t = _simplifyDP(t, i);
    return t;
  }
  function pointToSegmentDistance(t, e, i) {
    return Math.sqrt(_sqClosestPointOnSegment(t, e, i, true));
  }
  function closestPointOnSegment(t, e, i) {
    return _sqClosestPointOnSegment(t, e, i);
  }
  function _simplifyDP(t, e) {
    var i = t.length,
      n = typeof Uint8Array !== void 0 + "" ? Uint8Array : Array,
      o = new n(i);
    o[0] = o[i - 1] = 1;
    _simplifyDPStep(t, o, e, 0, i - 1);
    var s,
      a = [];
    for (s = 0; s < i; s++) o[s] && a.push(t[s]);
    return a;
  }
  function _simplifyDPStep(t, e, i, n, o) {
    var s = 0,
      a,
      h,
      l;
    for (h = n + 1; h <= o - 1; h++) {
      l = _sqClosestPointOnSegment(t[h], t[n], t[o], true);
      if (l > s) {
        a = h;
        s = l;
      }
    }
    if (s > i) {
      e[a] = 1;
      _simplifyDPStep(t, e, i, n, a);
      _simplifyDPStep(t, e, i, a, o);
    }
  }
  function _reducePoints(t, e) {
    var i = [t[0]];
    for (var n = 1, o = 0, s = t.length; n < s; n++)
      if (_sqDist(t[n], t[o]) > e) {
        i.push(t[n]);
        o = n;
      }
    o < s - 1 && i.push(t[s - 1]);
    return i;
  }
  var Ht;
  function clipSegment(t, e, i, n, o) {
    var s = n ? Ht : _getBitCode(t, i),
      a = _getBitCode(e, i),
      h,
      l,
      c;
    Ht = a;
    while (true) {
      if (!(s | a)) return [t, e];
      if (s & a) return false;
      h = s || a;
      l = _getEdgeIntersection(t, e, h, i, o);
      c = _getBitCode(l, i);
      if (h === s) {
        t = l;
        s = c;
      } else {
        e = l;
        a = c;
      }
    }
  }
  function _getEdgeIntersection(t, e, i, n, o) {
    var s = e.x - t.x,
      a = e.y - t.y,
      h = n.min,
      l = n.max,
      c,
      d;
    if (8 & i) {
      c = t.x + (s * (l.y - t.y)) / a;
      d = l.y;
    } else if (4 & i) {
      c = t.x + (s * (h.y - t.y)) / a;
      d = h.y;
    } else if (2 & i) {
      c = l.x;
      d = t.y + (a * (l.x - t.x)) / s;
    } else if (1 & i) {
      c = h.x;
      d = t.y + (a * (h.x - t.x)) / s;
    }
    return new Point(c, d, o);
  }
  function _getBitCode(t, e) {
    var i = 0;
    t.x < e.min.x ? (i |= 1) : t.x > e.max.x && (i |= 2);
    t.y < e.min.y ? (i |= 4) : t.y > e.max.y && (i |= 8);
    return i;
  }
  function _sqDist(t, e) {
    var i = e.x - t.x,
      n = e.y - t.y;
    return i * i + n * n;
  }
  function _sqClosestPointOnSegment(t, e, i, n) {
    var o = e.x,
      s = e.y,
      a = i.x - o,
      h = i.y - s,
      l = a * a + h * h,
      c;
    if (l > 0) {
      c = ((t.x - o) * a + (t.y - s) * h) / l;
      if (c > 1) {
        o = i.x;
        s = i.y;
      } else if (c > 0) {
        o += a * c;
        s += h * c;
      }
    }
    a = t.x - o;
    h = t.y - s;
    return n ? a * a + h * h : new Point(o, s);
  }
  function isFlat(t) {
    return (
      !a(t[0]) ||
      ("object" !== typeof t[0][0] && "undefined" !== typeof t[0][0])
    );
  }
  function _flat(t) {
    console.warn(
      "Deprecated use of _flat, please use L.LineUtil.isFlat instead."
    );
    return isFlat(t);
  }
  var qt = {
    simplify: simplify,
    pointToSegmentDistance: pointToSegmentDistance,
    closestPointOnSegment: closestPointOnSegment,
    clipSegment: clipSegment,
    _getEdgeIntersection: _getEdgeIntersection,
    _getBitCode: _getBitCode,
    _sqClosestPointOnSegment: _sqClosestPointOnSegment,
    isFlat: isFlat,
    _flat: _flat,
  };
  function clipPolygon(t, e, i) {
    var n,
      o = [1, 4, 2, 8],
      s,
      a,
      h,
      l,
      c,
      d,
      _,
      p;
    for (s = 0, d = t.length; s < d; s++) t[s]._code = _getBitCode(t[s], e);
    for (h = 0; h < 4; h++) {
      _ = o[h];
      n = [];
      for (s = 0, d = t.length, a = d - 1; s < d; a = s++) {
        l = t[s];
        c = t[a];
        if (l._code & _) {
          if (!(c._code & _)) {
            p = _getEdgeIntersection(c, l, _, e, i);
            p._code = _getBitCode(p, e);
            n.push(p);
          }
        } else {
          if (c._code & _) {
            p = _getEdgeIntersection(c, l, _, e, i);
            p._code = _getBitCode(p, e);
            n.push(p);
          }
          n.push(l);
        }
      }
      t = n;
    }
    return t;
  }
  var Ut = { clipPolygon: clipPolygon };
  var Vt = {
    project: function (t) {
      return new Point(t.lng, t.lat);
    },
    unproject: function (t) {
      return new LatLng(t.y, t.x);
    },
    bounds: new Bounds([-180, -90], [180, 90]),
  };
  var Gt = {
    R: 6378137,
    R_MINOR: 6356752.314245179,
    bounds: new Bounds(
      [-20037508.34279, -15496570.73972],
      [20037508.34279, 18764656.23138]
    ),
    project: function (e) {
      var i = Math.PI / 180,
        n = (this || t).R,
        o = e.lat * i,
        s = (this || t).R_MINOR / n,
        a = Math.sqrt(1 - s * s),
        h = a * Math.sin(o);
      var l =
        Math.tan(Math.PI / 4 - o / 2) / Math.pow((1 - h) / (1 + h), a / 2);
      o = -n * Math.log(Math.max(l, 1e-10));
      return new Point(e.lng * i * n, o);
    },
    unproject: function (e) {
      var i = 180 / Math.PI,
        n = (this || t).R,
        o = (this || t).R_MINOR / n,
        s = Math.sqrt(1 - o * o),
        a = Math.exp(-e.y / n),
        h = Math.PI / 2 - 2 * Math.atan(a);
      for (var l = 0, c = 0.1, d; l < 15 && Math.abs(c) > 1e-7; l++) {
        d = s * Math.sin(h);
        d = Math.pow((1 - d) / (1 + d), s / 2);
        c = Math.PI / 2 - 2 * Math.atan(a * d) - h;
        h += c;
      }
      return new LatLng(h * i, (e.x * i) / n);
    },
  };
  var $t = { LonLat: Vt, Mercator: Gt, SphericalMercator: P };
  var Kt = extend({}, v, {
    code: "EPSG:3395",
    projection: Gt,
    transformation: (function () {
      var t = 0.5 / (Math.PI * Gt.R);
      return toTransformation(t, 0.5, -t, 0.5);
    })(),
  });
  var Yt = extend({}, v, {
    code: "EPSG:4326",
    projection: Vt,
    transformation: toTransformation(1 / 180, 1, -1 / 180, 0.5),
  });
  var Jt = extend({}, g, {
    projection: Vt,
    transformation: toTransformation(1, 0, -1, 0),
    scale: function (t) {
      return Math.pow(2, t);
    },
    zoom: function (t) {
      return Math.log(t) / Math.LN2;
    },
    distance: function (t, e) {
      var i = e.lng - t.lng,
        n = e.lat - t.lat;
      return Math.sqrt(i * i + n * n);
    },
    infinite: true,
  });
  g.Earth = v;
  g.EPSG3395 = Kt;
  g.EPSG3857 = x;
  g.EPSG900913 = b;
  g.EPSG4326 = Yt;
  g.Simple = Jt;
  var Xt = f.extend({
    options: {
      pane: "overlayPane",
      attribution: null,
      bubblingMouseEvents: true,
    },
    addTo: function (e) {
      e.addLayer(this || t);
      return this || t;
    },
    remove: function () {
      return this.removeFrom((this || t)._map || (this || t)._mapToAdd);
    },
    removeFrom: function (e) {
      e && e.removeLayer(this || t);
      return this || t;
    },
    getPane: function (e) {
      return (this || t)._map.getPane(
        e ? (this || t).options[e] || e : (this || t).options.pane
      );
    },
    addInteractiveTarget: function (e) {
      (this || t)._map._targets[stamp(e)] = this || t;
      return this || t;
    },
    removeInteractiveTarget: function (e) {
      delete (this || t)._map._targets[stamp(e)];
      return this || t;
    },
    getAttribution: function () {
      return (this || t).options.attribution;
    },
    _layerAdd: function (e) {
      var i = e.target;
      if (i.hasLayer(this || t)) {
        (this || t)._map = i;
        (this || t)._zoomAnimated = i._zoomAnimated;
        if ((this || t).getEvents) {
          var n = this.getEvents();
          i.on(n, this || t);
          this.once(
            "remove",
            function () {
              i.off(n, this || t);
            },
            this || t
          );
        }
        this.onAdd(i);
        (this || t).getAttribution &&
          i.attributionControl &&
          i.attributionControl.addAttribution(this.getAttribution());
        this.fire("add");
        i.fire("layeradd", { layer: this || t });
      }
    },
  });
  kt.include({
    addLayer: function (e) {
      if (!e._layerAdd) throw new Error("The provided object is not a Layer.");
      var i = stamp(e);
      if ((this || t)._layers[i]) return this || t;
      (this || t)._layers[i] = e;
      e._mapToAdd = this || t;
      e.beforeAdd && e.beforeAdd(this || t);
      this.whenReady(e._layerAdd, e);
      return this || t;
    },
    removeLayer: function (e) {
      var i = stamp(e);
      if (!(this || t)._layers[i]) return this || t;
      (this || t)._loaded && e.onRemove(this || t);
      e.getAttribution &&
        (this || t).attributionControl &&
        (this || t).attributionControl.removeAttribution(e.getAttribution());
      delete (this || t)._layers[i];
      if ((this || t)._loaded) {
        this.fire("layerremove", { layer: e });
        e.fire("remove");
      }
      e._map = e._mapToAdd = null;
      return this || t;
    },
    hasLayer: function (e) {
      return !!e && stamp(e) in (this || t)._layers;
    },
    eachLayer: function (e, i) {
      for (var n in (this || t)._layers) e.call(i, (this || t)._layers[n]);
      return this || t;
    },
    _addLayers: function (t) {
      t = t ? (a(t) ? t : [t]) : [];
      for (var e = 0, i = t.length; e < i; e++) this.addLayer(t[e]);
    },
    _addZoomLimit: function (e) {
      if (isNaN(e.options.maxZoom) || !isNaN(e.options.minZoom)) {
        (this || t)._zoomBoundLayers[stamp(e)] = e;
        this._updateZoomLevels();
      }
    },
    _removeZoomLimit: function (e) {
      var i = stamp(e);
      if ((this || t)._zoomBoundLayers[i]) {
        delete (this || t)._zoomBoundLayers[i];
        this._updateZoomLevels();
      }
    },
    _updateZoomLevels: function () {
      var e = Infinity,
        i = -Infinity,
        n = this._getZoomSpan();
      for (var o in (this || t)._zoomBoundLayers) {
        var s = (this || t)._zoomBoundLayers[o].options;
        e = void 0 === s.minZoom ? e : Math.min(e, s.minZoom);
        i = void 0 === s.maxZoom ? i : Math.max(i, s.maxZoom);
      }
      (this || t)._layersMaxZoom = -Infinity === i ? void 0 : i;
      (this || t)._layersMinZoom = Infinity === e ? void 0 : e;
      n !== this._getZoomSpan() && this.fire("zoomlevelschange");
      void 0 === (this || t).options.maxZoom &&
        (this || t)._layersMaxZoom &&
        this.getZoom() > (this || t)._layersMaxZoom &&
        this.setZoom((this || t)._layersMaxZoom);
      void 0 === (this || t).options.minZoom &&
        (this || t)._layersMinZoom &&
        this.getZoom() < (this || t)._layersMinZoom &&
        this.setZoom((this || t)._layersMinZoom);
    },
  });
  var Qt = Xt.extend({
    initialize: function (e, i) {
      setOptions(this || t, i);
      (this || t)._layers = {};
      var n, o;
      if (e) for (n = 0, o = e.length; n < o; n++) this.addLayer(e[n]);
    },
    addLayer: function (e) {
      var i = this.getLayerId(e);
      (this || t)._layers[i] = e;
      (this || t)._map && (this || t)._map.addLayer(e);
      return this || t;
    },
    removeLayer: function (e) {
      var i = e in (this || t)._layers ? e : this.getLayerId(e);
      (this || t)._map &&
        (this || t)._layers[i] &&
        (this || t)._map.removeLayer((this || t)._layers[i]);
      delete (this || t)._layers[i];
      return this || t;
    },
    hasLayer: function (e) {
      if (!e) return false;
      var i = "number" === typeof e ? e : this.getLayerId(e);
      return i in (this || t)._layers;
    },
    clearLayers: function () {
      return this.eachLayer((this || t).removeLayer, this || t);
    },
    invoke: function (e) {
      var i = Array.prototype.slice.call(arguments, 1),
        n,
        o;
      for (n in (this || t)._layers) {
        o = (this || t)._layers[n];
        o[e] && o[e].apply(o, i);
      }
      return this || t;
    },
    onAdd: function (t) {
      this.eachLayer(t.addLayer, t);
    },
    onRemove: function (t) {
      this.eachLayer(t.removeLayer, t);
    },
    eachLayer: function (e, i) {
      for (var n in (this || t)._layers) e.call(i, (this || t)._layers[n]);
      return this || t;
    },
    getLayer: function (e) {
      return (this || t)._layers[e];
    },
    getLayers: function () {
      var t = [];
      this.eachLayer(t.push, t);
      return t;
    },
    setZIndex: function (t) {
      return this.invoke("setZIndex", t);
    },
    getLayerId: function (t) {
      return stamp(t);
    },
  });
  var layerGroup = function (t, e) {
    return new Qt(t, e);
  };
  var te = Qt.extend({
    addLayer: function (e) {
      if (this.hasLayer(e)) return this || t;
      e.addEventParent(this || t);
      Qt.prototype.addLayer.call(this || t, e);
      return this.fire("layeradd", { layer: e });
    },
    removeLayer: function (e) {
      if (!this.hasLayer(e)) return this || t;
      e in (this || t)._layers && (e = (this || t)._layers[e]);
      e.removeEventParent(this || t);
      Qt.prototype.removeLayer.call(this || t, e);
      return this.fire("layerremove", { layer: e });
    },
    setStyle: function (t) {
      return this.invoke("setStyle", t);
    },
    bringToFront: function () {
      return this.invoke("bringToFront");
    },
    bringToBack: function () {
      return this.invoke("bringToBack");
    },
    getBounds: function () {
      var e = new LatLngBounds();
      for (var i in (this || t)._layers) {
        var n = (this || t)._layers[i];
        e.extend(n.getBounds ? n.getBounds() : n.getLatLng());
      }
      return e;
    },
  });
  var featureGroup = function (t, e) {
    return new te(t, e);
  };
  var ee = Class.extend({
    options: { popupAnchor: [0, 0], tooltipAnchor: [0, 0] },
    initialize: function (e) {
      setOptions(this || t, e);
    },
    createIcon: function (t) {
      return this._createIcon("icon", t);
    },
    createShadow: function (t) {
      return this._createIcon("shadow", t);
    },
    _createIcon: function (t, e) {
      var i = this._getIconUrl(t);
      if (!i) {
        if ("icon" === t)
          throw new Error("iconUrl not set in Icon options (see the docs).");
        return null;
      }
      var n = this._createImg(i, e && "IMG" === e.tagName ? e : null);
      this._setIconStyles(n, t);
      return n;
    },
    _setIconStyles: function (e, i) {
      var n = (this || t).options;
      var o = n[i + "Size"];
      "number" === typeof o && (o = [o, o]);
      var s = toPoint(o),
        a = toPoint(
          ("shadow" === i && n.shadowAnchor) ||
            n.iconAnchor ||
            (s && s.divideBy(2, true))
        );
      e.className = "leaflet-marker-" + i + " " + (n.className || "");
      if (a) {
        e.style.marginLeft = -a.x + "px";
        e.style.marginTop = -a.y + "px";
      }
      if (s) {
        e.style.width = s.x + "px";
        e.style.height = s.y + "px";
      }
    },
    _createImg: function (t, e) {
      e = e || document.createElement("img");
      e.src = t;
      return e;
    },
    _getIconUrl: function (e) {
      return (
        (tt && (this || t).options[e + "RetinaUrl"]) ||
        (this || t).options[e + "Url"]
      );
    },
  });
  function icon(t) {
    return new ee(t);
  }
  var ie = ee.extend({
    options: {
      iconUrl: "marker-icon.png",
      iconRetinaUrl: "marker-icon-2x.png",
      shadowUrl: "marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    },
    _getIconUrl: function (e) {
      ie.imagePath || (ie.imagePath = this._detectIconPath());
      return (
        ((this || t).options.imagePath || ie.imagePath) +
        ee.prototype._getIconUrl.call(this || t, e)
      );
    },
    _detectIconPath: function () {
      var t = create$1("div", "leaflet-default-icon-path", document.body);
      var e = getStyle(t, "background-image") || getStyle(t, "backgroundImage");
      document.body.removeChild(t);
      e =
        null === e || 0 !== e.indexOf("url")
          ? ""
          : e
              .replace(/^url\(["']?/, "")
              .replace(/marker-icon\.png["']?\)$/, "");
      return e;
    },
  });
  var ne = Dt.extend({
    initialize: function (e) {
      (this || t)._marker = e;
    },
    addHooks: function () {
      var e = (this || t)._marker._icon;
      (this || t)._draggable || ((this || t)._draggable = new Wt(e, e, true));
      (this || t)._draggable
        .on(
          {
            dragstart: (this || t)._onDragStart,
            predrag: (this || t)._onPreDrag,
            drag: (this || t)._onDrag,
            dragend: (this || t)._onDragEnd,
          },
          this || t
        )
        .enable();
      addClass(e, "leaflet-marker-draggable");
    },
    removeHooks: function () {
      (this || t)._draggable
        .off(
          {
            dragstart: (this || t)._onDragStart,
            predrag: (this || t)._onPreDrag,
            drag: (this || t)._onDrag,
            dragend: (this || t)._onDragEnd,
          },
          this || t
        )
        .disable();
      (this || t)._marker._icon &&
        removeClass((this || t)._marker._icon, "leaflet-marker-draggable");
    },
    moved: function () {
      return (this || t)._draggable && (this || t)._draggable._moved;
    },
    _adjustPan: function (e) {
      var i = (this || t)._marker,
        n = i._map,
        o = (this || t)._marker.options.autoPanSpeed,
        s = (this || t)._marker.options.autoPanPadding,
        a = getPosition(i._icon),
        h = n.getPixelBounds(),
        l = n.getPixelOrigin();
      var c = toBounds(
        h.min._subtract(l).add(s),
        h.max._subtract(l).subtract(s)
      );
      if (!c.contains(a)) {
        var d = toPoint(
          (Math.max(c.max.x, a.x) - c.max.x) / (h.max.x - c.max.x) -
            (Math.min(c.min.x, a.x) - c.min.x) / (h.min.x - c.min.x),
          (Math.max(c.max.y, a.y) - c.max.y) / (h.max.y - c.max.y) -
            (Math.min(c.min.y, a.y) - c.min.y) / (h.min.y - c.min.y)
        ).multiplyBy(o);
        n.panBy(d, { animate: false });
        (this || t)._draggable._newPos._add(d);
        (this || t)._draggable._startPos._add(d);
        setPosition(i._icon, (this || t)._draggable._newPos);
        this._onDrag(e);
        (this || t)._panRequest = requestAnimFrame(
          (this || t)._adjustPan.bind(this || t, e)
        );
      }
    },
    _onDragStart: function () {
      (this || t)._oldLatLng = (this || t)._marker.getLatLng();
      (this || t)._marker.closePopup && (this || t)._marker.closePopup();
      (this || t)._marker.fire("movestart").fire("dragstart");
    },
    _onPreDrag: function (e) {
      if ((this || t)._marker.options.autoPan) {
        cancelAnimFrame((this || t)._panRequest);
        (this || t)._panRequest = requestAnimFrame(
          (this || t)._adjustPan.bind(this || t, e)
        );
      }
    },
    _onDrag: function (e) {
      var i = (this || t)._marker,
        n = i._shadow,
        o = getPosition(i._icon),
        s = i._map.layerPointToLatLng(o);
      n && setPosition(n, o);
      i._latlng = s;
      e.latlng = s;
      e.oldLatLng = (this || t)._oldLatLng;
      i.fire("move", e).fire("drag", e);
    },
    _onDragEnd: function (e) {
      cancelAnimFrame((this || t)._panRequest);
      delete (this || t)._oldLatLng;
      (this || t)._marker.fire("moveend").fire("dragend", e);
    },
  });
  var oe = Xt.extend({
    options: {
      icon: new ie(),
      interactive: true,
      keyboard: true,
      title: "",
      alt: "",
      zIndexOffset: 0,
      opacity: 1,
      riseOnHover: false,
      riseOffset: 250,
      pane: "markerPane",
      shadowPane: "shadowPane",
      bubblingMouseEvents: false,
      draggable: false,
      autoPan: false,
      autoPanPadding: [50, 50],
      autoPanSpeed: 10,
    },
    initialize: function (e, i) {
      setOptions(this || t, i);
      (this || t)._latlng = toLatLng(e);
    },
    onAdd: function (e) {
      (this || t)._zoomAnimated =
        (this || t)._zoomAnimated && e.options.markerZoomAnimation;
      (this || t)._zoomAnimated &&
        e.on("zoomanim", (this || t)._animateZoom, this || t);
      this._initIcon();
      this.update();
    },
    onRemove: function (e) {
      if ((this || t).dragging && (this || t).dragging.enabled()) {
        (this || t).options.draggable = true;
        (this || t).dragging.removeHooks();
      }
      delete (this || t).dragging;
      (this || t)._zoomAnimated &&
        e.off("zoomanim", (this || t)._animateZoom, this || t);
      this._removeIcon();
      this._removeShadow();
    },
    getEvents: function () {
      return { zoom: (this || t).update, viewreset: (this || t).update };
    },
    getLatLng: function () {
      return (this || t)._latlng;
    },
    setLatLng: function (e) {
      var i = (this || t)._latlng;
      (this || t)._latlng = toLatLng(e);
      this.update();
      return this.fire("move", { oldLatLng: i, latlng: (this || t)._latlng });
    },
    setZIndexOffset: function (e) {
      (this || t).options.zIndexOffset = e;
      return this.update();
    },
    getIcon: function () {
      return (this || t).options.icon;
    },
    setIcon: function (e) {
      (this || t).options.icon = e;
      if ((this || t)._map) {
        this._initIcon();
        this.update();
      }
      (this || t)._popup &&
        this.bindPopup((this || t)._popup, (this || t)._popup.options);
      return this || t;
    },
    getElement: function () {
      return (this || t)._icon;
    },
    update: function () {
      if ((this || t)._icon && (this || t)._map) {
        var e = (this || t)._map
          .latLngToLayerPoint((this || t)._latlng)
          .round();
        this._setPos(e);
      }
      return this || t;
    },
    _initIcon: function () {
      var e = (this || t).options,
        i = "leaflet-zoom-" + ((this || t)._zoomAnimated ? "animated" : "hide");
      var n = e.icon.createIcon((this || t)._icon),
        o = false;
      if (n !== (this || t)._icon) {
        (this || t)._icon && this._removeIcon();
        o = true;
        e.title && (n.title = e.title);
        "IMG" === n.tagName && (n.alt = e.alt || "");
      }
      addClass(n, i);
      e.keyboard && (n.tabIndex = "0");
      (this || t)._icon = n;
      e.riseOnHover &&
        this.on({
          mouseover: (this || t)._bringToFront,
          mouseout: (this || t)._resetZIndex,
        });
      var s = e.icon.createShadow((this || t)._shadow),
        a = false;
      if (s !== (this || t)._shadow) {
        this._removeShadow();
        a = true;
      }
      if (s) {
        addClass(s, i);
        s.alt = "";
      }
      (this || t)._shadow = s;
      e.opacity < 1 && this._updateOpacity();
      o && this.getPane().appendChild((this || t)._icon);
      this._initInteraction();
      s && a && this.getPane(e.shadowPane).appendChild((this || t)._shadow);
    },
    _removeIcon: function () {
      (this || t).options.riseOnHover &&
        this.off({
          mouseover: (this || t)._bringToFront,
          mouseout: (this || t)._resetZIndex,
        });
      remove((this || t)._icon);
      this.removeInteractiveTarget((this || t)._icon);
      (this || t)._icon = null;
    },
    _removeShadow: function () {
      (this || t)._shadow && remove((this || t)._shadow);
      (this || t)._shadow = null;
    },
    _setPos: function (e) {
      (this || t)._icon && setPosition((this || t)._icon, e);
      (this || t)._shadow && setPosition((this || t)._shadow, e);
      (this || t)._zIndex = e.y + (this || t).options.zIndexOffset;
      this._resetZIndex();
    },
    _updateZIndex: function (e) {
      (this || t)._icon &&
        ((this || t)._icon.style.zIndex = (this || t)._zIndex + e);
    },
    _animateZoom: function (e) {
      var i = (this || t)._map
        ._latLngToNewLayerPoint((this || t)._latlng, e.zoom, e.center)
        .round();
      this._setPos(i);
    },
    _initInteraction: function () {
      if ((this || t).options.interactive) {
        addClass((this || t)._icon, "leaflet-interactive");
        this.addInteractiveTarget((this || t)._icon);
        if (ne) {
          var e = (this || t).options.draggable;
          if ((this || t).dragging) {
            e = (this || t).dragging.enabled();
            (this || t).dragging.disable();
          }
          (this || t).dragging = new ne(this || t);
          e && (this || t).dragging.enable();
        }
      }
    },
    setOpacity: function (e) {
      (this || t).options.opacity = e;
      (this || t)._map && this._updateOpacity();
      return this || t;
    },
    _updateOpacity: function () {
      var e = (this || t).options.opacity;
      (this || t)._icon && setOpacity((this || t)._icon, e);
      (this || t)._shadow && setOpacity((this || t)._shadow, e);
    },
    _bringToFront: function () {
      this._updateZIndex((this || t).options.riseOffset);
    },
    _resetZIndex: function () {
      this._updateZIndex(0);
    },
    _getPopupAnchor: function () {
      return (this || t).options.icon.options.popupAnchor;
    },
    _getTooltipAnchor: function () {
      return (this || t).options.icon.options.tooltipAnchor;
    },
  });
  function marker(t, e) {
    return new oe(t, e);
  }
  var se = Xt.extend({
    options: {
      stroke: true,
      color: "#3388ff",
      weight: 3,
      opacity: 1,
      lineCap: "round",
      lineJoin: "round",
      dashArray: null,
      dashOffset: null,
      fill: false,
      fillColor: null,
      fillOpacity: 0.2,
      fillRule: "evenodd",
      interactive: true,
      bubblingMouseEvents: true,
    },
    beforeAdd: function (e) {
      (this || t)._renderer = e.getRenderer(this || t);
    },
    onAdd: function () {
      (this || t)._renderer._initPath(this || t);
      this._reset();
      (this || t)._renderer._addPath(this || t);
    },
    onRemove: function () {
      (this || t)._renderer._removePath(this || t);
    },
    redraw: function () {
      (this || t)._map && (this || t)._renderer._updatePath(this || t);
      return this || t;
    },
    setStyle: function (e) {
      setOptions(this || t, e);
      if ((this || t)._renderer) {
        (this || t)._renderer._updateStyle(this || t);
        (this || t).options.stroke &&
          e &&
          Object.prototype.hasOwnProperty.call(e, "weight") &&
          this._updateBounds();
      }
      return this || t;
    },
    bringToFront: function () {
      (this || t)._renderer && (this || t)._renderer._bringToFront(this || t);
      return this || t;
    },
    bringToBack: function () {
      (this || t)._renderer && (this || t)._renderer._bringToBack(this || t);
      return this || t;
    },
    getElement: function () {
      return (this || t)._path;
    },
    _reset: function () {
      this._project();
      this._update();
    },
    _clickTolerance: function () {
      return (
        ((this || t).options.stroke ? (this || t).options.weight / 2 : 0) +
        (this || t)._renderer.options.tolerance
      );
    },
  });
  var ae = se.extend({
    options: { fill: true, radius: 10 },
    initialize: function (e, i) {
      setOptions(this || t, i);
      (this || t)._latlng = toLatLng(e);
      (this || t)._radius = (this || t).options.radius;
    },
    setLatLng: function (e) {
      var i = (this || t)._latlng;
      (this || t)._latlng = toLatLng(e);
      this.redraw();
      return this.fire("move", { oldLatLng: i, latlng: (this || t)._latlng });
    },
    getLatLng: function () {
      return (this || t)._latlng;
    },
    setRadius: function (e) {
      (this || t).options.radius = (this || t)._radius = e;
      return this.redraw();
    },
    getRadius: function () {
      return (this || t)._radius;
    },
    setStyle: function (e) {
      var i = (e && e.radius) || (this || t)._radius;
      se.prototype.setStyle.call(this || t, e);
      this.setRadius(i);
      return this || t;
    },
    _project: function () {
      (this || t)._point = (this || t)._map.latLngToLayerPoint(
        (this || t)._latlng
      );
      this._updateBounds();
    },
    _updateBounds: function () {
      var e = (this || t)._radius,
        i = (this || t)._radiusY || e,
        n = this._clickTolerance(),
        o = [e + n, i + n];
      (this || t)._pxBounds = new Bounds(
        (this || t)._point.subtract(o),
        (this || t)._point.add(o)
      );
    },
    _update: function () {
      (this || t)._map && this._updatePath();
    },
    _updatePath: function () {
      (this || t)._renderer._updateCircle(this || t);
    },
    _empty: function () {
      return (
        (this || t)._radius &&
        !(this || t)._renderer._bounds.intersects((this || t)._pxBounds)
      );
    },
    _containsPoint: function (e) {
      return (
        e.distanceTo((this || t)._point) <=
        (this || t)._radius + this._clickTolerance()
      );
    },
  });
  function circleMarker(t, e) {
    return new ae(t, e);
  }
  var re = ae.extend({
    initialize: function (e, i, n) {
      "number" === typeof i && (i = extend({}, n, { radius: i }));
      setOptions(this || t, i);
      (this || t)._latlng = toLatLng(e);
      if (isNaN((this || t).options.radius))
        throw new Error("Circle radius cannot be NaN");
      (this || t)._mRadius = (this || t).options.radius;
    },
    setRadius: function (e) {
      (this || t)._mRadius = e;
      return this.redraw();
    },
    getRadius: function () {
      return (this || t)._mRadius;
    },
    getBounds: function () {
      var e = [
        (this || t)._radius,
        (this || t)._radiusY || (this || t)._radius,
      ];
      return new LatLngBounds(
        (this || t)._map.layerPointToLatLng((this || t)._point.subtract(e)),
        (this || t)._map.layerPointToLatLng((this || t)._point.add(e))
      );
    },
    setStyle: se.prototype.setStyle,
    _project: function () {
      var e = (this || t)._latlng.lng,
        i = (this || t)._latlng.lat,
        n = (this || t)._map,
        o = n.options.crs;
      if (o.distance === v.distance) {
        var s = Math.PI / 180,
          a = (this || t)._mRadius / v.R / s,
          h = n.project([i + a, e]),
          l = n.project([i - a, e]),
          c = h.add(l).divideBy(2),
          d = n.unproject(c).lat,
          _ =
            Math.acos(
              (Math.cos(a * s) - Math.sin(i * s) * Math.sin(d * s)) /
                (Math.cos(i * s) * Math.cos(d * s))
            ) / s;
        (isNaN(_) || 0 === _) && (_ = a / Math.cos((Math.PI / 180) * i));
        (this || t)._point = c.subtract(n.getPixelOrigin());
        (this || t)._radius = isNaN(_) ? 0 : c.x - n.project([d, e - _]).x;
        (this || t)._radiusY = c.y - h.y;
      } else {
        var p = o.unproject(
          o.project((this || t)._latlng).subtract([(this || t)._mRadius, 0])
        );
        (this || t)._point = n.latLngToLayerPoint((this || t)._latlng);
        (this || t)._radius = (this || t)._point.x - n.latLngToLayerPoint(p).x;
      }
      this._updateBounds();
    },
  });
  function circle(t, e, i) {
    return new re(t, e, i);
  }
  var he = se.extend({
    options: { smoothFactor: 1, noClip: false },
    initialize: function (e, i) {
      setOptions(this || t, i);
      this._setLatLngs(e);
    },
    getLatLngs: function () {
      return (this || t)._latlngs;
    },
    setLatLngs: function (t) {
      this._setLatLngs(t);
      return this.redraw();
    },
    isEmpty: function () {
      return !(this || t)._latlngs.length;
    },
    closestLayerPoint: function (e) {
      var i = Infinity,
        n = null,
        o = _sqClosestPointOnSegment,
        s,
        a;
      for (var h = 0, l = (this || t)._parts.length; h < l; h++) {
        var c = (this || t)._parts[h];
        for (var d = 1, _ = c.length; d < _; d++) {
          s = c[d - 1];
          a = c[d];
          var p = o(e, s, a, true);
          if (p < i) {
            i = p;
            n = o(e, s, a);
          }
        }
      }
      n && (n.distance = Math.sqrt(i));
      return n;
    },
    getCenter: function () {
      if (!(this || t)._map)
        throw new Error("Must add layer to map before using getCenter()");
      var e,
        i,
        n,
        o,
        s,
        a,
        h,
        l = (this || t)._rings[0],
        c = l.length;
      if (!c) return null;
      for (e = 0, i = 0; e < c - 1; e++) i += l[e].distanceTo(l[e + 1]) / 2;
      if (0 === i) return (this || t)._map.layerPointToLatLng(l[0]);
      for (e = 0, o = 0; e < c - 1; e++) {
        s = l[e];
        a = l[e + 1];
        n = s.distanceTo(a);
        o += n;
        if (o > i) {
          h = (o - i) / n;
          return (this || t)._map.layerPointToLatLng([
            a.x - h * (a.x - s.x),
            a.y - h * (a.y - s.y),
          ]);
        }
      }
    },
    getBounds: function () {
      return (this || t)._bounds;
    },
    addLatLng: function (e, i) {
      i = i || this._defaultShape();
      e = toLatLng(e);
      i.push(e);
      (this || t)._bounds.extend(e);
      return this.redraw();
    },
    _setLatLngs: function (e) {
      (this || t)._bounds = new LatLngBounds();
      (this || t)._latlngs = this._convertLatLngs(e);
    },
    _defaultShape: function () {
      return isFlat((this || t)._latlngs)
        ? (this || t)._latlngs
        : (this || t)._latlngs[0];
    },
    _convertLatLngs: function (e) {
      var i = [],
        n = isFlat(e);
      for (var o = 0, s = e.length; o < s; o++)
        if (n) {
          i[o] = toLatLng(e[o]);
          (this || t)._bounds.extend(i[o]);
        } else i[o] = this._convertLatLngs(e[o]);
      return i;
    },
    _project: function () {
      var e = new Bounds();
      (this || t)._rings = [];
      this._projectLatlngs((this || t)._latlngs, (this || t)._rings, e);
      if ((this || t)._bounds.isValid() && e.isValid()) {
        (this || t)._rawPxBounds = e;
        this._updateBounds();
      }
    },
    _updateBounds: function () {
      var e = this._clickTolerance(),
        i = new Point(e, e);
      (this || t)._pxBounds = new Bounds([
        (this || t)._rawPxBounds.min.subtract(i),
        (this || t)._rawPxBounds.max.add(i),
      ]);
    },
    _projectLatlngs: function (e, i, n) {
      var o = e[0] instanceof LatLng,
        s = e.length,
        a,
        h;
      if (o) {
        h = [];
        for (a = 0; a < s; a++) {
          h[a] = (this || t)._map.latLngToLayerPoint(e[a]);
          n.extend(h[a]);
        }
        i.push(h);
      } else for (a = 0; a < s; a++) this._projectLatlngs(e[a], i, n);
    },
    _clipPoints: function () {
      var e = (this || t)._renderer._bounds;
      (this || t)._parts = [];
      if ((this || t)._pxBounds && (this || t)._pxBounds.intersects(e))
        if ((this || t).options.noClip) (this || t)._parts = (this || t)._rings;
        else {
          var i = (this || t)._parts,
            n,
            o,
            s,
            a,
            h,
            l,
            c;
          for (n = 0, s = 0, a = (this || t)._rings.length; n < a; n++) {
            c = (this || t)._rings[n];
            for (o = 0, h = c.length; o < h - 1; o++) {
              l = clipSegment(c[o], c[o + 1], e, o, true);
              if (l) {
                i[s] = i[s] || [];
                i[s].push(l[0]);
                if (l[1] !== c[o + 1] || o === h - 2) {
                  i[s].push(l[1]);
                  s++;
                }
              }
            }
          }
        }
    },
    _simplifyPoints: function () {
      var e = (this || t)._parts,
        i = (this || t).options.smoothFactor;
      for (var n = 0, o = e.length; n < o; n++) e[n] = simplify(e[n], i);
    },
    _update: function () {
      if ((this || t)._map) {
        this._clipPoints();
        this._simplifyPoints();
        this._updatePath();
      }
    },
    _updatePath: function () {
      (this || t)._renderer._updatePoly(this || t);
    },
    _containsPoint: function (e, i) {
      var n,
        o,
        s,
        a,
        h,
        l,
        c = this._clickTolerance();
      if (!(this || t)._pxBounds || !(this || t)._pxBounds.contains(e))
        return false;
      for (n = 0, a = (this || t)._parts.length; n < a; n++) {
        l = (this || t)._parts[n];
        for (o = 0, h = l.length, s = h - 1; o < h; s = o++)
          if ((i || 0 !== o) && pointToSegmentDistance(e, l[s], l[o]) <= c)
            return true;
      }
      return false;
    },
  });
  function polyline(t, e) {
    return new he(t, e);
  }
  he._flat = _flat;
  var le = he.extend({
    options: { fill: true },
    isEmpty: function () {
      return !(this || t)._latlngs.length || !(this || t)._latlngs[0].length;
    },
    getCenter: function () {
      if (!(this || t)._map)
        throw new Error("Must add layer to map before using getCenter()");
      var e,
        i,
        n,
        o,
        s,
        a,
        h,
        l,
        c,
        d = (this || t)._rings[0],
        _ = d.length;
      if (!_) return null;
      a = h = l = 0;
      for (e = 0, i = _ - 1; e < _; i = e++) {
        n = d[e];
        o = d[i];
        s = n.y * o.x - o.y * n.x;
        h += (n.x + o.x) * s;
        l += (n.y + o.y) * s;
        a += 3 * s;
      }
      c = 0 === a ? d[0] : [h / a, l / a];
      return (this || t)._map.layerPointToLatLng(c);
    },
    _convertLatLngs: function (e) {
      var i = he.prototype._convertLatLngs.call(this || t, e),
        n = i.length;
      n >= 2 && i[0] instanceof LatLng && i[0].equals(i[n - 1]) && i.pop();
      return i;
    },
    _setLatLngs: function (e) {
      he.prototype._setLatLngs.call(this || t, e);
      isFlat((this || t)._latlngs) &&
        ((this || t)._latlngs = [(this || t)._latlngs]);
    },
    _defaultShape: function () {
      return isFlat((this || t)._latlngs[0])
        ? (this || t)._latlngs[0]
        : (this || t)._latlngs[0][0];
    },
    _clipPoints: function () {
      var e = (this || t)._renderer._bounds,
        i = (this || t).options.weight,
        n = new Point(i, i);
      e = new Bounds(e.min.subtract(n), e.max.add(n));
      (this || t)._parts = [];
      if ((this || t)._pxBounds && (this || t)._pxBounds.intersects(e))
        if ((this || t).options.noClip) (this || t)._parts = (this || t)._rings;
        else
          for (var o = 0, s = (this || t)._rings.length, a; o < s; o++) {
            a = clipPolygon((this || t)._rings[o], e, true);
            a.length && (this || t)._parts.push(a);
          }
    },
    _updatePath: function () {
      (this || t)._renderer._updatePoly(this || t, true);
    },
    _containsPoint: function (e) {
      var i = false,
        n,
        o,
        s,
        a,
        h,
        l,
        c,
        d;
      if (!(this || t)._pxBounds || !(this || t)._pxBounds.contains(e))
        return false;
      for (a = 0, c = (this || t)._parts.length; a < c; a++) {
        n = (this || t)._parts[a];
        for (h = 0, d = n.length, l = d - 1; h < d; l = h++) {
          o = n[h];
          s = n[l];
          o.y > e.y !== s.y > e.y &&
            e.x < ((s.x - o.x) * (e.y - o.y)) / (s.y - o.y) + o.x &&
            (i = !i);
        }
      }
      return i || he.prototype._containsPoint.call(this || t, e, true);
    },
  });
  function polygon(t, e) {
    return new le(t, e);
  }
  var ue = te.extend({
    initialize: function (e, i) {
      setOptions(this || t, i);
      (this || t)._layers = {};
      e && this.addData(e);
    },
    addData: function (e) {
      var i = a(e) ? e : e.features,
        n,
        o,
        s;
      if (i) {
        for (n = 0, o = i.length; n < o; n++) {
          s = i[n];
          (s.geometries || s.geometry || s.features || s.coordinates) &&
            this.addData(s);
        }
        return this || t;
      }
      var h = (this || t).options;
      if (h.filter && !h.filter(e)) return this || t;
      var l = geometryToLayer(e, h);
      if (!l) return this || t;
      l.feature = asFeature(e);
      l.defaultOptions = l.options;
      this.resetStyle(l);
      h.onEachFeature && h.onEachFeature(e, l);
      return this.addLayer(l);
    },
    resetStyle: function (e) {
      if (void 0 === e)
        return this.eachLayer((this || t).resetStyle, this || t);
      e.options = extend({}, e.defaultOptions);
      this._setLayerStyle(e, (this || t).options.style);
      return this || t;
    },
    setStyle: function (e) {
      return this.eachLayer(function (t) {
        this._setLayerStyle(t, e);
      }, this || t);
    },
    _setLayerStyle: function (t, e) {
      if (t.setStyle) {
        "function" === typeof e && (e = e(t.feature));
        t.setStyle(e);
      }
    },
  });
  function geometryToLayer(t, e) {
    var i = "Feature" === t.type ? t.geometry : t,
      n = i ? i.coordinates : null,
      o = [],
      s = e && e.pointToLayer,
      a = (e && e.coordsToLatLng) || coordsToLatLng,
      h,
      l,
      c,
      d;
    if (!n && !i) return null;
    switch (i.type) {
      case "Point":
        h = a(n);
        return _pointToLayer(s, t, h, e);
      case "MultiPoint":
        for (c = 0, d = n.length; c < d; c++) {
          h = a(n[c]);
          o.push(_pointToLayer(s, t, h, e));
        }
        return new te(o);
      case "LineString":
      case "MultiLineString":
        l = coordsToLatLngs(n, "LineString" === i.type ? 0 : 1, a);
        return new he(l, e);
      case "Polygon":
      case "MultiPolygon":
        l = coordsToLatLngs(n, "Polygon" === i.type ? 1 : 2, a);
        return new le(l, e);
      case "GeometryCollection":
        for (c = 0, d = i.geometries.length; c < d; c++) {
          var _ = geometryToLayer(
            {
              geometry: i.geometries[c],
              type: "Feature",
              properties: t.properties,
            },
            e
          );
          _ && o.push(_);
        }
        return new te(o);
      default:
        throw new Error("Invalid GeoJSON object.");
    }
  }
  function _pointToLayer(t, e, i, n) {
    return t ? t(e, i) : new oe(i, n && n.markersInheritOptions && n);
  }
  function coordsToLatLng(t) {
    return new LatLng(t[1], t[0], t[2]);
  }
  function coordsToLatLngs(t, e, i) {
    var n = [];
    for (var o = 0, s = t.length, a; o < s; o++) {
      a = e ? coordsToLatLngs(t[o], e - 1, i) : (i || coordsToLatLng)(t[o]);
      n.push(a);
    }
    return n;
  }
  function latLngToCoords(t, e) {
    e = "number" === typeof e ? e : 6;
    return void 0 !== t.alt
      ? [formatNum(t.lng, e), formatNum(t.lat, e), formatNum(t.alt, e)]
      : [formatNum(t.lng, e), formatNum(t.lat, e)];
  }
  function latLngsToCoords(t, e, i, n) {
    var o = [];
    for (var s = 0, a = t.length; s < a; s++)
      o.push(e ? latLngsToCoords(t[s], e - 1, i, n) : latLngToCoords(t[s], n));
    !e && i && o.push(o[0]);
    return o;
  }
  function getFeature(t, e) {
    return t.feature ? extend({}, t.feature, { geometry: e }) : asFeature(e);
  }
  function asFeature(t) {
    return "Feature" === t.type || "FeatureCollection" === t.type
      ? t
      : { type: "Feature", properties: {}, geometry: t };
  }
  var ce = {
    toGeoJSON: function (e) {
      return getFeature(this || t, {
        type: "Point",
        coordinates: latLngToCoords(this.getLatLng(), e),
      });
    },
  };
  oe.include(ce);
  re.include(ce);
  ae.include(ce);
  he.include({
    toGeoJSON: function (e) {
      var i = !isFlat((this || t)._latlngs);
      var n = latLngsToCoords((this || t)._latlngs, i ? 1 : 0, false, e);
      return getFeature(this || t, {
        type: (i ? "Multi" : "") + "LineString",
        coordinates: n,
      });
    },
  });
  le.include({
    toGeoJSON: function (e) {
      var i = !isFlat((this || t)._latlngs),
        n = i && !isFlat((this || t)._latlngs[0]);
      var o = latLngsToCoords((this || t)._latlngs, n ? 2 : i ? 1 : 0, true, e);
      i || (o = [o]);
      return getFeature(this || t, {
        type: (n ? "Multi" : "") + "Polygon",
        coordinates: o,
      });
    },
  });
  Qt.include({
    toMultiPoint: function (e) {
      var i = [];
      this.eachLayer(function (t) {
        i.push(t.toGeoJSON(e).geometry.coordinates);
      });
      return getFeature(this || t, { type: "MultiPoint", coordinates: i });
    },
    toGeoJSON: function (e) {
      var i =
        (this || t).feature &&
        (this || t).feature.geometry &&
        (this || t).feature.geometry.type;
      if ("MultiPoint" === i) return this.toMultiPoint(e);
      var n = "GeometryCollection" === i,
        o = [];
      this.eachLayer(function (t) {
        if (t.toGeoJSON) {
          var i = t.toGeoJSON(e);
          if (n) o.push(i.geometry);
          else {
            var s = asFeature(i);
            "FeatureCollection" === s.type
              ? o.push.apply(o, s.features)
              : o.push(s);
          }
        }
      });
      return n
        ? getFeature(this || t, { geometries: o, type: "GeometryCollection" })
        : { type: "FeatureCollection", features: o };
    },
  });
  function geoJSON(t, e) {
    return new ue(t, e);
  }
  var de = geoJSON;
  var _e = Xt.extend({
    options: {
      opacity: 1,
      alt: "",
      interactive: false,
      crossOrigin: false,
      errorOverlayUrl: "",
      zIndex: 1,
      className: "",
    },
    initialize: function (e, i, n) {
      (this || t)._url = e;
      (this || t)._bounds = toLatLngBounds(i);
      setOptions(this || t, n);
    },
    onAdd: function () {
      if (!(this || t)._image) {
        this._initImage();
        (this || t).options.opacity < 1 && this._updateOpacity();
      }
      if ((this || t).options.interactive) {
        addClass((this || t)._image, "leaflet-interactive");
        this.addInteractiveTarget((this || t)._image);
      }
      this.getPane().appendChild((this || t)._image);
      this._reset();
    },
    onRemove: function () {
      remove((this || t)._image);
      (this || t).options.interactive &&
        this.removeInteractiveTarget((this || t)._image);
    },
    setOpacity: function (e) {
      (this || t).options.opacity = e;
      (this || t)._image && this._updateOpacity();
      return this || t;
    },
    setStyle: function (e) {
      e.opacity && this.setOpacity(e.opacity);
      return this || t;
    },
    bringToFront: function () {
      (this || t)._map && toFront((this || t)._image);
      return this || t;
    },
    bringToBack: function () {
      (this || t)._map && toBack((this || t)._image);
      return this || t;
    },
    setUrl: function (e) {
      (this || t)._url = e;
      (this || t)._image && ((this || t)._image.src = e);
      return this || t;
    },
    setBounds: function (e) {
      (this || t)._bounds = toLatLngBounds(e);
      (this || t)._map && this._reset();
      return this || t;
    },
    getEvents: function () {
      var e = { zoom: (this || t)._reset, viewreset: (this || t)._reset };
      (this || t)._zoomAnimated && (e.zoomanim = (this || t)._animateZoom);
      return e;
    },
    setZIndex: function (e) {
      (this || t).options.zIndex = e;
      this._updateZIndex();
      return this || t;
    },
    getBounds: function () {
      return (this || t)._bounds;
    },
    getElement: function () {
      return (this || t)._image;
    },
    _initImage: function () {
      var e = "IMG" === (this || t)._url.tagName;
      var i = ((this || t)._image = e ? (this || t)._url : create$1("img"));
      addClass(i, "leaflet-image-layer");
      (this || t)._zoomAnimated && addClass(i, "leaflet-zoom-animated");
      (this || t).options.className &&
        addClass(i, (this || t).options.className);
      i.onselectstart = falseFn;
      i.onmousemove = falseFn;
      i.onload = bind((this || t).fire, this || t, "load");
      i.onerror = bind((this || t)._overlayOnError, this || t, "error");
      ((this || t).options.crossOrigin ||
        "" === (this || t).options.crossOrigin) &&
        (i.crossOrigin =
          true === (this || t).options.crossOrigin
            ? ""
            : (this || t).options.crossOrigin);
      (this || t).options.zIndex && this._updateZIndex();
      if (e) (this || t)._url = i.src;
      else {
        i.src = (this || t)._url;
        i.alt = (this || t).options.alt;
      }
    },
    _animateZoom: function (e) {
      var i = (this || t)._map.getZoomScale(e.zoom),
        n = (this || t)._map._latLngBoundsToNewLayerBounds(
          (this || t)._bounds,
          e.zoom,
          e.center
        ).min;
      setTransform((this || t)._image, n, i);
    },
    _reset: function () {
      var e = (this || t)._image,
        i = new Bounds(
          (this || t)._map.latLngToLayerPoint(
            (this || t)._bounds.getNorthWest()
          ),
          (this || t)._map.latLngToLayerPoint(
            (this || t)._bounds.getSouthEast()
          )
        ),
        n = i.getSize();
      setPosition(e, i.min);
      e.style.width = n.x + "px";
      e.style.height = n.y + "px";
    },
    _updateOpacity: function () {
      setOpacity((this || t)._image, (this || t).options.opacity);
    },
    _updateZIndex: function () {
      (this || t)._image &&
        void 0 !== (this || t).options.zIndex &&
        null !== (this || t).options.zIndex &&
        ((this || t)._image.style.zIndex = (this || t).options.zIndex);
    },
    _overlayOnError: function () {
      this.fire("error");
      var e = (this || t).options.errorOverlayUrl;
      if (e && (this || t)._url !== e) {
        (this || t)._url = e;
        (this || t)._image.src = e;
      }
    },
  });
  var imageOverlay = function (t, e, i) {
    return new _e(t, e, i);
  };
  var pe = _e.extend({
    options: {
      autoplay: true,
      loop: true,
      keepAspectRatio: true,
      muted: false,
    },
    _initImage: function () {
      var e = "VIDEO" === (this || t)._url.tagName;
      var i = ((this || t)._image = e ? (this || t)._url : create$1("video"));
      addClass(i, "leaflet-image-layer");
      (this || t)._zoomAnimated && addClass(i, "leaflet-zoom-animated");
      (this || t).options.className &&
        addClass(i, (this || t).options.className);
      i.onselectstart = falseFn;
      i.onmousemove = falseFn;
      i.onloadeddata = bind((this || t).fire, this || t, "load");
      if (e) {
        var n = i.getElementsByTagName("source");
        var o = [];
        for (var s = 0; s < n.length; s++) o.push(n[s].src);
        (this || t)._url = n.length > 0 ? o : [i.src];
      } else {
        a((this || t)._url) || ((this || t)._url = [(this || t)._url]);
        !(this || t).options.keepAspectRatio &&
          Object.prototype.hasOwnProperty.call(i.style, "objectFit") &&
          (i.style["objectFit"] = "fill");
        i.autoplay = !!(this || t).options.autoplay;
        i.loop = !!(this || t).options.loop;
        i.muted = !!(this || t).options.muted;
        for (var h = 0; h < (this || t)._url.length; h++) {
          var l = create$1("source");
          l.src = (this || t)._url[h];
          i.appendChild(l);
        }
      }
    },
  });
  function videoOverlay(t, e, i) {
    return new pe(t, e, i);
  }
  var fe = _e.extend({
    _initImage: function () {
      var e = ((this || t)._image = (this || t)._url);
      addClass(e, "leaflet-image-layer");
      (this || t)._zoomAnimated && addClass(e, "leaflet-zoom-animated");
      (this || t).options.className &&
        addClass(e, (this || t).options.className);
      e.onselectstart = falseFn;
      e.onmousemove = falseFn;
    },
  });
  function svgOverlay(t, e, i) {
    return new fe(t, e, i);
  }
  var me = Xt.extend({
    options: { offset: [0, 7], className: "", pane: "popupPane" },
    initialize: function (e, i) {
      setOptions(this || t, e);
      (this || t)._source = i;
    },
    onAdd: function (e) {
      (this || t)._zoomAnimated = e._zoomAnimated;
      (this || t)._container || this._initLayout();
      e._fadeAnimated && setOpacity((this || t)._container, 0);
      clearTimeout((this || t)._removeTimeout);
      this.getPane().appendChild((this || t)._container);
      this.update();
      e._fadeAnimated && setOpacity((this || t)._container, 1);
      this.bringToFront();
    },
    onRemove: function (e) {
      if (e._fadeAnimated) {
        setOpacity((this || t)._container, 0);
        (this || t)._removeTimeout = setTimeout(
          bind(remove, void 0, (this || t)._container),
          200
        );
      } else remove((this || t)._container);
    },
    getLatLng: function () {
      return (this || t)._latlng;
    },
    setLatLng: function (e) {
      (this || t)._latlng = toLatLng(e);
      if ((this || t)._map) {
        this._updatePosition();
        this._adjustPan();
      }
      return this || t;
    },
    getContent: function () {
      return (this || t)._content;
    },
    setContent: function (e) {
      (this || t)._content = e;
      this.update();
      return this || t;
    },
    getElement: function () {
      return (this || t)._container;
    },
    update: function () {
      if ((this || t)._map) {
        (this || t)._container.style.visibility = "hidden";
        this._updateContent();
        this._updateLayout();
        this._updatePosition();
        (this || t)._container.style.visibility = "";
        this._adjustPan();
      }
    },
    getEvents: function () {
      var e = {
        zoom: (this || t)._updatePosition,
        viewreset: (this || t)._updatePosition,
      };
      (this || t)._zoomAnimated && (e.zoomanim = (this || t)._animateZoom);
      return e;
    },
    isOpen: function () {
      return !!(this || t)._map && (this || t)._map.hasLayer(this || t);
    },
    bringToFront: function () {
      (this || t)._map && toFront((this || t)._container);
      return this || t;
    },
    bringToBack: function () {
      (this || t)._map && toBack((this || t)._container);
      return this || t;
    },
    _prepareOpen: function (e, i, n) {
      if (!(i instanceof Xt)) {
        n = i;
        i = e;
      }
      if (i instanceof te)
        for (var o in e._layers) {
          i = e._layers[o];
          break;
        }
      if (!n)
        if (i.getCenter) n = i.getCenter();
        else {
          if (!i.getLatLng)
            throw new Error("Unable to get source layer LatLng.");
          n = i.getLatLng();
        }
      (this || t)._source = i;
      this.update();
      return n;
    },
    _updateContent: function () {
      if ((this || t)._content) {
        var e = (this || t)._contentNode;
        var i =
          "function" === typeof (this || t)._content
            ? this._content((this || t)._source || this || t)
            : (this || t)._content;
        if ("string" === typeof i) e.innerHTML = i;
        else {
          while (e.hasChildNodes()) e.removeChild(e.firstChild);
          e.appendChild(i);
        }
        this.fire("contentupdate");
      }
    },
    _updatePosition: function () {
      if ((this || t)._map) {
        var e = (this || t)._map.latLngToLayerPoint((this || t)._latlng),
          i = toPoint((this || t).options.offset),
          n = this._getAnchor();
        (this || t)._zoomAnimated
          ? setPosition((this || t)._container, e.add(n))
          : (i = i.add(e).add(n));
        var o = ((this || t)._containerBottom = -i.y),
          s = ((this || t)._containerLeft =
            -Math.round((this || t)._containerWidth / 2) + i.x);
        (this || t)._container.style.bottom = o + "px";
        (this || t)._container.style.left = s + "px";
      }
    },
    _getAnchor: function () {
      return [0, 0];
    },
  });
  var ge = me.extend({
    options: {
      maxWidth: 300,
      minWidth: 50,
      maxHeight: null,
      autoPan: true,
      autoPanPaddingTopLeft: null,
      autoPanPaddingBottomRight: null,
      autoPanPadding: [5, 5],
      keepInView: false,
      closeButton: true,
      autoClose: true,
      closeOnEscapeKey: true,
      className: "",
    },
    openOn: function (e) {
      e.openPopup(this || t);
      return this || t;
    },
    onAdd: function (e) {
      me.prototype.onAdd.call(this || t, e);
      e.fire("popupopen", { popup: this || t });
      if ((this || t)._source) {
        (this || t)._source.fire("popupopen", { popup: this || t }, true);
        (this || t)._source instanceof se ||
          (this || t)._source.on("preclick", stopPropagation);
      }
    },
    onRemove: function (e) {
      me.prototype.onRemove.call(this || t, e);
      e.fire("popupclose", { popup: this || t });
      if ((this || t)._source) {
        (this || t)._source.fire("popupclose", { popup: this || t }, true);
        (this || t)._source instanceof se ||
          (this || t)._source.off("preclick", stopPropagation);
      }
    },
    getEvents: function () {
      var e = me.prototype.getEvents.call(this || t);
      (void 0 !== (this || t).options.closeOnClick
        ? (this || t).options.closeOnClick
        : (this || t)._map.options.closePopupOnClick) &&
        (e.preclick = (this || t)._close);
      (this || t).options.keepInView && (e.moveend = (this || t)._adjustPan);
      return e;
    },
    _close: function () {
      (this || t)._map && (this || t)._map.closePopup(this || t);
    },
    _initLayout: function () {
      var e = "leaflet-popup",
        i = ((this || t)._container = create$1(
          "div",
          e +
            " " +
            ((this || t).options.className || "") +
            " leaflet-zoom-animated"
        ));
      var n = ((this || t)._wrapper = create$1(
        "div",
        e + "-content-wrapper",
        i
      ));
      (this || t)._contentNode = create$1("div", e + "-content", n);
      disableClickPropagation(i);
      disableScrollPropagation((this || t)._contentNode);
      on(i, "contextmenu", stopPropagation);
      (this || t)._tipContainer = create$1("div", e + "-tip-container", i);
      (this || t)._tip = create$1("div", e + "-tip", (this || t)._tipContainer);
      if ((this || t).options.closeButton) {
        var o = ((this || t)._closeButton = create$1(
          "a",
          e + "-close-button",
          i
        ));
        o.href = "#close";
        o.innerHTML = "&#215;";
        on(o, "click", (this || t)._onCloseButtonClick, this || t);
      }
    },
    _updateLayout: function () {
      var e = (this || t)._contentNode,
        i = e.style;
      i.width = "";
      i.whiteSpace = "nowrap";
      var n = e.offsetWidth;
      n = Math.min(n, (this || t).options.maxWidth);
      n = Math.max(n, (this || t).options.minWidth);
      i.width = n + 1 + "px";
      i.whiteSpace = "";
      i.height = "";
      var o = e.offsetHeight,
        s = (this || t).options.maxHeight,
        a = "leaflet-popup-scrolled";
      if (s && o > s) {
        i.height = s + "px";
        addClass(e, a);
      } else removeClass(e, a);
      (this || t)._containerWidth = (this || t)._container.offsetWidth;
    },
    _animateZoom: function (e) {
      var i = (this || t)._map._latLngToNewLayerPoint(
          (this || t)._latlng,
          e.zoom,
          e.center
        ),
        n = this._getAnchor();
      setPosition((this || t)._container, i.add(n));
    },
    _adjustPan: function () {
      if ((this || t).options.autoPan) {
        (this || t)._map._panAnim && (this || t)._map._panAnim.stop();
        var e = (this || t)._map,
          i =
            parseInt(getStyle((this || t)._container, "marginBottom"), 10) || 0,
          n = (this || t)._container.offsetHeight + i,
          o = (this || t)._containerWidth,
          s = new Point(
            (this || t)._containerLeft,
            -n - (this || t)._containerBottom
          );
        s._add(getPosition((this || t)._container));
        var a = e.layerPointToContainerPoint(s),
          h = toPoint((this || t).options.autoPanPadding),
          l = toPoint((this || t).options.autoPanPaddingTopLeft || h),
          c = toPoint((this || t).options.autoPanPaddingBottomRight || h),
          d = e.getSize(),
          _ = 0,
          p = 0;
        a.x + o + c.x > d.x && (_ = a.x + o - d.x + c.x);
        a.x - _ - l.x < 0 && (_ = a.x - l.x);
        a.y + n + c.y > d.y && (p = a.y + n - d.y + c.y);
        a.y - p - l.y < 0 && (p = a.y - l.y);
        (_ || p) && e.fire("autopanstart").panBy([_, p]);
      }
    },
    _onCloseButtonClick: function (t) {
      this._close();
      stop(t);
    },
    _getAnchor: function () {
      return toPoint(
        (this || t)._source && (this || t)._source._getPopupAnchor
          ? (this || t)._source._getPopupAnchor()
          : [0, 0]
      );
    },
  });
  var popup = function (t, e) {
    return new ge(t, e);
  };
  kt.mergeOptions({ closePopupOnClick: true });
  kt.include({
    openPopup: function (e, i, n) {
      e instanceof ge || (e = new ge(n).setContent(e));
      i && e.setLatLng(i);
      if (this.hasLayer(e)) return this || t;
      (this || t)._popup &&
        (this || t)._popup.options.autoClose &&
        this.closePopup();
      (this || t)._popup = e;
      return this.addLayer(e);
    },
    closePopup: function (e) {
      if (!e || e === (this || t)._popup) {
        e = (this || t)._popup;
        (this || t)._popup = null;
      }
      e && this.removeLayer(e);
      return this || t;
    },
  });
  Xt.include({
    bindPopup: function (e, i) {
      if (e instanceof ge) {
        setOptions(e, i);
        (this || t)._popup = e;
        e._source = this || t;
      } else {
        ((this || t)._popup && !i) ||
          ((this || t)._popup = new ge(i, this || t));
        (this || t)._popup.setContent(e);
      }
      if (!(this || t)._popupHandlersAdded) {
        this.on({
          click: (this || t)._openPopup,
          keypress: (this || t)._onKeyPress,
          remove: (this || t).closePopup,
          move: (this || t)._movePopup,
        });
        (this || t)._popupHandlersAdded = true;
      }
      return this || t;
    },
    unbindPopup: function () {
      if ((this || t)._popup) {
        this.off({
          click: (this || t)._openPopup,
          keypress: (this || t)._onKeyPress,
          remove: (this || t).closePopup,
          move: (this || t)._movePopup,
        });
        (this || t)._popupHandlersAdded = false;
        (this || t)._popup = null;
      }
      return this || t;
    },
    openPopup: function (e, i) {
      if ((this || t)._popup && (this || t)._map) {
        i = (this || t)._popup._prepareOpen(this || t, e, i);
        (this || t)._map.openPopup((this || t)._popup, i);
      }
      return this || t;
    },
    closePopup: function () {
      (this || t)._popup && (this || t)._popup._close();
      return this || t;
    },
    togglePopup: function (e) {
      (this || t)._popup &&
        ((this || t)._popup._map ? this.closePopup() : this.openPopup(e));
      return this || t;
    },
    isPopupOpen: function () {
      return !!(this || t)._popup && (this || t)._popup.isOpen();
    },
    setPopupContent: function (e) {
      (this || t)._popup && (this || t)._popup.setContent(e);
      return this || t;
    },
    getPopup: function () {
      return (this || t)._popup;
    },
    _openPopup: function (e) {
      var i = e.layer || e.target;
      if ((this || t)._popup && (this || t)._map) {
        stop(e);
        i instanceof se
          ? this.openPopup(e.layer || e.target, e.latlng)
          : (this || t)._map.hasLayer((this || t)._popup) &&
            (this || t)._popup._source === i
          ? this.closePopup()
          : this.openPopup(i, e.latlng);
      }
    },
    _movePopup: function (e) {
      (this || t)._popup.setLatLng(e.latlng);
    },
    _onKeyPress: function (t) {
      13 === t.originalEvent.keyCode && this._openPopup(t);
    },
  });
  var ve = me.extend({
    options: {
      pane: "tooltipPane",
      offset: [0, 0],
      direction: "auto",
      permanent: false,
      sticky: false,
      interactive: false,
      opacity: 0.9,
    },
    onAdd: function (e) {
      me.prototype.onAdd.call(this || t, e);
      this.setOpacity((this || t).options.opacity);
      e.fire("tooltipopen", { tooltip: this || t });
      (this || t)._source &&
        (this || t)._source.fire("tooltipopen", { tooltip: this || t }, true);
    },
    onRemove: function (e) {
      me.prototype.onRemove.call(this || t, e);
      e.fire("tooltipclose", { tooltip: this || t });
      (this || t)._source &&
        (this || t)._source.fire("tooltipclose", { tooltip: this || t }, true);
    },
    getEvents: function () {
      var e = me.prototype.getEvents.call(this || t);
      J && !(this || t).options.permanent && (e.preclick = (this || t)._close);
      return e;
    },
    _close: function () {
      (this || t)._map && (this || t)._map.closeTooltip(this || t);
    },
    _initLayout: function () {
      var e = "leaflet-tooltip",
        i =
          e +
          " " +
          ((this || t).options.className || "") +
          " leaflet-zoom-" +
          ((this || t)._zoomAnimated ? "animated" : "hide");
      (this || t)._contentNode = (this || t)._container = create$1("div", i);
    },
    _updateLayout: function () {},
    _adjustPan: function () {},
    _setPosition: function (e) {
      var i,
        n,
        o = (this || t)._map,
        s = (this || t)._container,
        a = o.latLngToContainerPoint(o.getCenter()),
        h = o.layerPointToContainerPoint(e),
        l = (this || t).options.direction,
        c = s.offsetWidth,
        d = s.offsetHeight,
        _ = toPoint((this || t).options.offset),
        p = this._getAnchor();
      if ("top" === l) {
        i = c / 2;
        n = d;
      } else if ("bottom" === l) {
        i = c / 2;
        n = 0;
      } else if ("center" === l) {
        i = c / 2;
        n = d / 2;
      } else if ("right" === l) {
        i = 0;
        n = d / 2;
      } else if ("left" === l) {
        i = c;
        n = d / 2;
      } else if (h.x < a.x) {
        l = "right";
        i = 0;
        n = d / 2;
      } else {
        l = "left";
        i = c + 2 * (_.x + p.x);
        n = d / 2;
      }
      e = e.subtract(toPoint(i, n, true)).add(_).add(p);
      removeClass(s, "leaflet-tooltip-right");
      removeClass(s, "leaflet-tooltip-left");
      removeClass(s, "leaflet-tooltip-top");
      removeClass(s, "leaflet-tooltip-bottom");
      addClass(s, "leaflet-tooltip-" + l);
      setPosition(s, e);
    },
    _updatePosition: function () {
      var e = (this || t)._map.latLngToLayerPoint((this || t)._latlng);
      this._setPosition(e);
    },
    setOpacity: function (e) {
      (this || t).options.opacity = e;
      (this || t)._container && setOpacity((this || t)._container, e);
    },
    _animateZoom: function (e) {
      var i = (this || t)._map._latLngToNewLayerPoint(
        (this || t)._latlng,
        e.zoom,
        e.center
      );
      this._setPosition(i);
    },
    _getAnchor: function () {
      return toPoint(
        (this || t)._source &&
          (this || t)._source._getTooltipAnchor &&
          !(this || t).options.sticky
          ? (this || t)._source._getTooltipAnchor()
          : [0, 0]
      );
    },
  });
  var tooltip = function (t, e) {
    return new ve(t, e);
  };
  kt.include({
    openTooltip: function (e, i, n) {
      e instanceof ve || (e = new ve(n).setContent(e));
      i && e.setLatLng(i);
      return this.hasLayer(e) ? this || t : this.addLayer(e);
    },
    closeTooltip: function (e) {
      e && this.removeLayer(e);
      return this || t;
    },
  });
  Xt.include({
    bindTooltip: function (e, i) {
      if (e instanceof ve) {
        setOptions(e, i);
        (this || t)._tooltip = e;
        e._source = this || t;
      } else {
        ((this || t)._tooltip && !i) ||
          ((this || t)._tooltip = new ve(i, this || t));
        (this || t)._tooltip.setContent(e);
      }
      this._initTooltipInteractions();
      (this || t)._tooltip.options.permanent &&
        (this || t)._map &&
        (this || t)._map.hasLayer(this || t) &&
        this.openTooltip();
      return this || t;
    },
    unbindTooltip: function () {
      if ((this || t)._tooltip) {
        this._initTooltipInteractions(true);
        this.closeTooltip();
        (this || t)._tooltip = null;
      }
      return this || t;
    },
    _initTooltipInteractions: function (e) {
      if (e || !(this || t)._tooltipHandlersAdded) {
        var i = e ? "off" : "on",
          n = {
            remove: (this || t).closeTooltip,
            move: (this || t)._moveTooltip,
          };
        if ((this || t)._tooltip.options.permanent)
          n.add = (this || t)._openTooltip;
        else {
          n.mouseover = (this || t)._openTooltip;
          n.mouseout = (this || t).closeTooltip;
          (this || t)._tooltip.options.sticky &&
            (n.mousemove = (this || t)._moveTooltip);
          J && (n.click = (this || t)._openTooltip);
        }
        this[i](n);
        (this || t)._tooltipHandlersAdded = !e;
      }
    },
    openTooltip: function (e, i) {
      if ((this || t)._tooltip && (this || t)._map) {
        i = (this || t)._tooltip._prepareOpen(this || t, e, i);
        (this || t)._map.openTooltip((this || t)._tooltip, i);
        if (
          (this || t)._tooltip.options.interactive &&
          (this || t)._tooltip._container
        ) {
          addClass((this || t)._tooltip._container, "leaflet-clickable");
          this.addInteractiveTarget((this || t)._tooltip._container);
        }
      }
      return this || t;
    },
    closeTooltip: function () {
      if ((this || t)._tooltip) {
        (this || t)._tooltip._close();
        if (
          (this || t)._tooltip.options.interactive &&
          (this || t)._tooltip._container
        ) {
          removeClass((this || t)._tooltip._container, "leaflet-clickable");
          this.removeInteractiveTarget((this || t)._tooltip._container);
        }
      }
      return this || t;
    },
    toggleTooltip: function (e) {
      (this || t)._tooltip &&
        ((this || t)._tooltip._map ? this.closeTooltip() : this.openTooltip(e));
      return this || t;
    },
    isTooltipOpen: function () {
      return (this || t)._tooltip.isOpen();
    },
    setTooltipContent: function (e) {
      (this || t)._tooltip && (this || t)._tooltip.setContent(e);
      return this || t;
    },
    getTooltip: function () {
      return (this || t)._tooltip;
    },
    _openTooltip: function (e) {
      var i = e.layer || e.target;
      (this || t)._tooltip &&
        (this || t)._map &&
        this.openTooltip(
          i,
          (this || t)._tooltip.options.sticky ? e.latlng : void 0
        );
    },
    _moveTooltip: function (e) {
      var i = e.latlng,
        n,
        o;
      if ((this || t)._tooltip.options.sticky && e.originalEvent) {
        n = (this || t)._map.mouseEventToContainerPoint(e.originalEvent);
        o = (this || t)._map.containerPointToLayerPoint(n);
        i = (this || t)._map.layerPointToLatLng(o);
      }
      (this || t)._tooltip.setLatLng(i);
    },
  });
  var ye = ee.extend({
    options: {
      iconSize: [12, 12],
      html: false,
      bgPos: null,
      className: "leaflet-div-icon",
    },
    createIcon: function (e) {
      var i = e && "DIV" === e.tagName ? e : document.createElement("div"),
        n = (this || t).options;
      if (n.html instanceof Element) {
        empty(i);
        i.appendChild(n.html);
      } else i.innerHTML = false !== n.html ? n.html : "";
      if (n.bgPos) {
        var o = toPoint(n.bgPos);
        i.style.backgroundPosition = -o.x + "px " + -o.y + "px";
      }
      this._setIconStyles(i, "icon");
      return i;
    },
    createShadow: function () {
      return null;
    },
  });
  function divIcon(t) {
    return new ye(t);
  }
  ee.Default = ie;
  var Le = Xt.extend({
    options: {
      tileSize: 256,
      opacity: 1,
      updateWhenIdle: V,
      updateWhenZooming: true,
      updateInterval: 200,
      zIndex: 1,
      bounds: null,
      minZoom: 0,
      maxZoom: void 0,
      maxNativeZoom: void 0,
      minNativeZoom: void 0,
      noWrap: false,
      pane: "tilePane",
      className: "",
      keepBuffer: 2,
    },
    initialize: function (e) {
      setOptions(this || t, e);
    },
    onAdd: function () {
      this._initContainer();
      (this || t)._levels = {};
      (this || t)._tiles = {};
      this._resetView();
      this._update();
    },
    beforeAdd: function (e) {
      e._addZoomLimit(this || t);
    },
    onRemove: function (e) {
      this._removeAllTiles();
      remove((this || t)._container);
      e._removeZoomLimit(this || t);
      (this || t)._container = null;
      (this || t)._tileZoom = void 0;
    },
    bringToFront: function () {
      if ((this || t)._map) {
        toFront((this || t)._container);
        this._setAutoZIndex(Math.max);
      }
      return this || t;
    },
    bringToBack: function () {
      if ((this || t)._map) {
        toBack((this || t)._container);
        this._setAutoZIndex(Math.min);
      }
      return this || t;
    },
    getContainer: function () {
      return (this || t)._container;
    },
    setOpacity: function (e) {
      (this || t).options.opacity = e;
      this._updateOpacity();
      return this || t;
    },
    setZIndex: function (e) {
      (this || t).options.zIndex = e;
      this._updateZIndex();
      return this || t;
    },
    isLoading: function () {
      return (this || t)._loading;
    },
    redraw: function () {
      if ((this || t)._map) {
        this._removeAllTiles();
        this._update();
      }
      return this || t;
    },
    getEvents: function () {
      var e = {
        viewprereset: (this || t)._invalidateAll,
        viewreset: (this || t)._resetView,
        zoom: (this || t)._resetView,
        moveend: (this || t)._onMoveEnd,
      };
      if (!(this || t).options.updateWhenIdle) {
        (this || t)._onMove ||
          ((this || t)._onMove = throttle(
            (this || t)._onMoveEnd,
            (this || t).options.updateInterval,
            this || t
          ));
        e.move = (this || t)._onMove;
      }
      (this || t)._zoomAnimated && (e.zoomanim = (this || t)._animateZoom);
      return e;
    },
    createTile: function () {
      return document.createElement("div");
    },
    getTileSize: function () {
      var e = (this || t).options.tileSize;
      return e instanceof Point ? e : new Point(e, e);
    },
    _updateZIndex: function () {
      (this || t)._container &&
        void 0 !== (this || t).options.zIndex &&
        null !== (this || t).options.zIndex &&
        ((this || t)._container.style.zIndex = (this || t).options.zIndex);
    },
    _setAutoZIndex: function (e) {
      var i = this.getPane().children,
        n = -e(-Infinity, Infinity);
      for (var o = 0, s = i.length, a; o < s; o++) {
        a = i[o].style.zIndex;
        i[o] !== (this || t)._container && a && (n = e(n, +a));
      }
      if (isFinite(n)) {
        (this || t).options.zIndex = n + e(-1, 1);
        this._updateZIndex();
      }
    },
    _updateOpacity: function () {
      if ((this || t)._map && !M) {
        setOpacity((this || t)._container, (this || t).options.opacity);
        var e = +new Date(),
          i = false,
          n = false;
        for (var o in (this || t)._tiles) {
          var s = (this || t)._tiles[o];
          if (s.current && s.loaded) {
            var a = Math.min(1, (e - s.loaded) / 200);
            setOpacity(s.el, a);
            if (a < 1) i = true;
            else {
              s.active ? (n = true) : this._onOpaqueTile(s);
              s.active = true;
            }
          }
        }
        n && !(this || t)._noPrune && this._pruneTiles();
        if (i) {
          cancelAnimFrame((this || t)._fadeFrame);
          (this || t)._fadeFrame = requestAnimFrame(
            (this || t)._updateOpacity,
            this || t
          );
        }
      }
    },
    _onOpaqueTile: falseFn,
    _initContainer: function () {
      if (!(this || t)._container) {
        (this || t)._container = create$1(
          "div",
          "leaflet-layer " + ((this || t).options.className || "")
        );
        this._updateZIndex();
        (this || t).options.opacity < 1 && this._updateOpacity();
        this.getPane().appendChild((this || t)._container);
      }
    },
    _updateLevels: function () {
      var e = (this || t)._tileZoom,
        i = (this || t).options.maxZoom;
      if (void 0 !== e) {
        for (var n in (this || t)._levels) {
          n = Number(n);
          if ((this || t)._levels[n].el.children.length || n === e) {
            (this || t)._levels[n].el.style.zIndex = i - Math.abs(e - n);
            this._onUpdateLevel(n);
          } else {
            remove((this || t)._levels[n].el);
            this._removeTilesAtZoom(n);
            this._onRemoveLevel(n);
            delete (this || t)._levels[n];
          }
        }
        var o = (this || t)._levels[e],
          s = (this || t)._map;
        if (!o) {
          o = (this || t)._levels[e] = {};
          o.el = create$1(
            "div",
            "leaflet-tile-container leaflet-zoom-animated",
            (this || t)._container
          );
          o.el.style.zIndex = i;
          o.origin = s.project(s.unproject(s.getPixelOrigin()), e).round();
          o.zoom = e;
          this._setZoomTransform(o, s.getCenter(), s.getZoom());
          falseFn(o.el.offsetWidth);
          this._onCreateLevel(o);
        }
        (this || t)._level = o;
        return o;
      }
    },
    _onUpdateLevel: falseFn,
    _onRemoveLevel: falseFn,
    _onCreateLevel: falseFn,
    _pruneTiles: function () {
      if ((this || t)._map) {
        var e, i;
        var n = (this || t)._map.getZoom();
        if (n > (this || t).options.maxZoom || n < (this || t).options.minZoom)
          this._removeAllTiles();
        else {
          for (e in (this || t)._tiles) {
            i = (this || t)._tiles[e];
            i.retain = i.current;
          }
          for (e in (this || t)._tiles) {
            i = (this || t)._tiles[e];
            if (i.current && !i.active) {
              var o = i.coords;
              this._retainParent(o.x, o.y, o.z, o.z - 5) ||
                this._retainChildren(o.x, o.y, o.z, o.z + 2);
            }
          }
          for (e in (this || t)._tiles)
            (this || t)._tiles[e].retain || this._removeTile(e);
        }
      }
    },
    _removeTilesAtZoom: function (e) {
      for (var i in (this || t)._tiles)
        (this || t)._tiles[i].coords.z === e && this._removeTile(i);
    },
    _removeAllTiles: function () {
      for (var e in (this || t)._tiles) this._removeTile(e);
    },
    _invalidateAll: function () {
      for (var e in (this || t)._levels) {
        remove((this || t)._levels[e].el);
        this._onRemoveLevel(Number(e));
        delete (this || t)._levels[e];
      }
      this._removeAllTiles();
      (this || t)._tileZoom = void 0;
    },
    _retainParent: function (e, i, n, o) {
      var s = Math.floor(e / 2),
        a = Math.floor(i / 2),
        h = n - 1,
        l = new Point(+s, +a);
      l.z = +h;
      var c = this._tileCoordsToKey(l),
        d = (this || t)._tiles[c];
      if (d && d.active) {
        d.retain = true;
        return true;
      }
      d && d.loaded && (d.retain = true);
      return h > o && this._retainParent(s, a, h, o);
    },
    _retainChildren: function (e, i, n, o) {
      for (var s = 2 * e; s < 2 * e + 2; s++)
        for (var a = 2 * i; a < 2 * i + 2; a++) {
          var h = new Point(s, a);
          h.z = n + 1;
          var l = this._tileCoordsToKey(h),
            c = (this || t)._tiles[l];
          if (c && c.active) c.retain = true;
          else {
            c && c.loaded && (c.retain = true);
            n + 1 < o && this._retainChildren(s, a, n + 1, o);
          }
        }
    },
    _resetView: function (e) {
      var i = e && (e.pinch || e.flyTo);
      this._setView(
        (this || t)._map.getCenter(),
        (this || t)._map.getZoom(),
        i,
        i
      );
    },
    _animateZoom: function (t) {
      this._setView(t.center, t.zoom, true, t.noUpdate);
    },
    _clampZoom: function (e) {
      var i = (this || t).options;
      return void 0 !== i.minNativeZoom && e < i.minNativeZoom
        ? i.minNativeZoom
        : void 0 !== i.maxNativeZoom && i.maxNativeZoom < e
        ? i.maxNativeZoom
        : e;
    },
    _setView: function (e, i, n, o) {
      var s = Math.round(i);
      s =
        (void 0 !== (this || t).options.maxZoom &&
          s > (this || t).options.maxZoom) ||
        (void 0 !== (this || t).options.minZoom &&
          s < (this || t).options.minZoom)
          ? void 0
          : this._clampZoom(s);
      var a =
        (this || t).options.updateWhenZooming && s !== (this || t)._tileZoom;
      if (!o || a) {
        (this || t)._tileZoom = s;
        (this || t)._abortLoading && this._abortLoading();
        this._updateLevels();
        this._resetGrid();
        void 0 !== s && this._update(e);
        n || this._pruneTiles();
        (this || t)._noPrune = !!n;
      }
      this._setZoomTransforms(e, i);
    },
    _setZoomTransforms: function (e, i) {
      for (var n in (this || t)._levels)
        this._setZoomTransform((this || t)._levels[n], e, i);
    },
    _setZoomTransform: function (e, i, n) {
      var o = (this || t)._map.getZoomScale(n, e.zoom),
        s = e.origin
          .multiplyBy(o)
          .subtract((this || t)._map._getNewPixelOrigin(i, n))
          .round();
      U ? setTransform(e.el, s, o) : setPosition(e.el, s);
    },
    _resetGrid: function () {
      var e = (this || t)._map,
        i = e.options.crs,
        n = ((this || t)._tileSize = this.getTileSize()),
        o = (this || t)._tileZoom;
      var s = (this || t)._map.getPixelWorldBounds((this || t)._tileZoom);
      s && ((this || t)._globalTileRange = this._pxBoundsToTileRange(s));
      (this || t)._wrapX = i.wrapLng &&
        !(this || t).options.noWrap && [
          Math.floor(e.project([0, i.wrapLng[0]], o).x / n.x),
          Math.ceil(e.project([0, i.wrapLng[1]], o).x / n.y),
        ];
      (this || t)._wrapY = i.wrapLat &&
        !(this || t).options.noWrap && [
          Math.floor(e.project([i.wrapLat[0], 0], o).y / n.x),
          Math.ceil(e.project([i.wrapLat[1], 0], o).y / n.y),
        ];
    },
    _onMoveEnd: function () {
      (this || t)._map && !(this || t)._map._animatingZoom && this._update();
    },
    _getTiledPixelBounds: function (e) {
      var i = (this || t)._map,
        n = i._animatingZoom
          ? Math.max(i._animateToZoom, i.getZoom())
          : i.getZoom(),
        o = i.getZoomScale(n, (this || t)._tileZoom),
        s = i.project(e, (this || t)._tileZoom).floor(),
        a = i.getSize().divideBy(2 * o);
      return new Bounds(s.subtract(a), s.add(a));
    },
    _update: function (e) {
      var i = (this || t)._map;
      if (i) {
        var n = this._clampZoom(i.getZoom());
        void 0 === e && (e = i.getCenter());
        if (void 0 !== (this || t)._tileZoom) {
          var o = this._getTiledPixelBounds(e),
            s = this._pxBoundsToTileRange(o),
            a = s.getCenter(),
            h = [],
            l = (this || t).options.keepBuffer,
            c = new Bounds(
              s.getBottomLeft().subtract([l, -l]),
              s.getTopRight().add([l, -l])
            );
          if (
            !(
              isFinite(s.min.x) &&
              isFinite(s.min.y) &&
              isFinite(s.max.x) &&
              isFinite(s.max.y)
            )
          )
            throw new Error("Attempted to load an infinite number of tiles");
          for (var d in (this || t)._tiles) {
            var _ = (this || t)._tiles[d].coords;
            (_.z === (this || t)._tileZoom &&
              c.contains(new Point(_.x, _.y))) ||
              ((this || t)._tiles[d].current = false);
          }
          if (Math.abs(n - (this || t)._tileZoom) > 1) this._setView(e, n);
          else {
            for (var p = s.min.y; p <= s.max.y; p++)
              for (var f = s.min.x; f <= s.max.x; f++) {
                var m = new Point(f, p);
                m.z = (this || t)._tileZoom;
                if (this._isValidTile(m)) {
                  var g = (this || t)._tiles[this._tileCoordsToKey(m)];
                  g ? (g.current = true) : h.push(m);
                }
              }
            h.sort(function (t, e) {
              return t.distanceTo(a) - e.distanceTo(a);
            });
            if (0 !== h.length) {
              if (!(this || t)._loading) {
                (this || t)._loading = true;
                this.fire("loading");
              }
              var v = document.createDocumentFragment();
              for (f = 0; f < h.length; f++) this._addTile(h[f], v);
              (this || t)._level.el.appendChild(v);
            }
          }
        }
      }
    },
    _isValidTile: function (e) {
      var i = (this || t)._map.options.crs;
      if (!i.infinite) {
        var n = (this || t)._globalTileRange;
        if (
          (!i.wrapLng && (e.x < n.min.x || e.x > n.max.x)) ||
          (!i.wrapLat && (e.y < n.min.y || e.y > n.max.y))
        )
          return false;
      }
      if (!(this || t).options.bounds) return true;
      var o = this._tileCoordsToBounds(e);
      return toLatLngBounds((this || t).options.bounds).overlaps(o);
    },
    _keyToBounds: function (t) {
      return this._tileCoordsToBounds(this._keyToTileCoords(t));
    },
    _tileCoordsToNwSe: function (e) {
      var i = (this || t)._map,
        n = this.getTileSize(),
        o = e.scaleBy(n),
        s = o.add(n),
        a = i.unproject(o, e.z),
        h = i.unproject(s, e.z);
      return [a, h];
    },
    _tileCoordsToBounds: function (e) {
      var i = this._tileCoordsToNwSe(e),
        n = new LatLngBounds(i[0], i[1]);
      (this || t).options.noWrap || (n = (this || t)._map.wrapLatLngBounds(n));
      return n;
    },
    _tileCoordsToKey: function (t) {
      return t.x + ":" + t.y + ":" + t.z;
    },
    _keyToTileCoords: function (t) {
      var e = t.split(":"),
        i = new Point(+e[0], +e[1]);
      i.z = +e[2];
      return i;
    },
    _removeTile: function (e) {
      var i = (this || t)._tiles[e];
      if (i) {
        remove(i.el);
        delete (this || t)._tiles[e];
        this.fire("tileunload", {
          tile: i.el,
          coords: this._keyToTileCoords(e),
        });
      }
    },
    _initTile: function (e) {
      addClass(e, "leaflet-tile");
      var i = this.getTileSize();
      e.style.width = i.x + "px";
      e.style.height = i.y + "px";
      e.onselectstart = falseFn;
      e.onmousemove = falseFn;
      M &&
        (this || t).options.opacity < 1 &&
        setOpacity(e, (this || t).options.opacity);
      B && !k && (e.style.WebkitBackfaceVisibility = "hidden");
    },
    _addTile: function (e, i) {
      var n = this._getTilePos(e),
        o = this._tileCoordsToKey(e);
      var s = this.createTile(
        this._wrapCoords(e),
        bind((this || t)._tileReady, this || t, e)
      );
      this._initTile(s);
      (this || t).createTile.length < 2 &&
        requestAnimFrame(bind((this || t)._tileReady, this || t, e, null, s));
      setPosition(s, n);
      (this || t)._tiles[o] = { el: s, coords: e, current: true };
      i.appendChild(s);
      this.fire("tileloadstart", { tile: s, coords: e });
    },
    _tileReady: function (e, i, n) {
      i && this.fire("tileerror", { error: i, tile: n, coords: e });
      var o = this._tileCoordsToKey(e);
      n = (this || t)._tiles[o];
      if (n) {
        n.loaded = +new Date();
        if ((this || t)._map._fadeAnimated) {
          setOpacity(n.el, 0);
          cancelAnimFrame((this || t)._fadeFrame);
          (this || t)._fadeFrame = requestAnimFrame(
            (this || t)._updateOpacity,
            this || t
          );
        } else {
          n.active = true;
          this._pruneTiles();
        }
        if (!i) {
          addClass(n.el, "leaflet-tile-loaded");
          this.fire("tileload", { tile: n.el, coords: e });
        }
        if (this._noTilesToLoad()) {
          (this || t)._loading = false;
          this.fire("load");
          M || !(this || t)._map._fadeAnimated
            ? requestAnimFrame((this || t)._pruneTiles, this || t)
            : setTimeout(bind((this || t)._pruneTiles, this || t), 250);
        }
      }
    },
    _getTilePos: function (e) {
      return e.scaleBy(this.getTileSize()).subtract((this || t)._level.origin);
    },
    _wrapCoords: function (e) {
      var i = new Point(
        (this || t)._wrapX ? wrapNum(e.x, (this || t)._wrapX) : e.x,
        (this || t)._wrapY ? wrapNum(e.y, (this || t)._wrapY) : e.y
      );
      i.z = e.z;
      return i;
    },
    _pxBoundsToTileRange: function (t) {
      var e = this.getTileSize();
      return new Bounds(
        t.min.unscaleBy(e).floor(),
        t.max.unscaleBy(e).ceil().subtract([1, 1])
      );
    },
    _noTilesToLoad: function () {
      for (var e in (this || t)._tiles)
        if (!(this || t)._tiles[e].loaded) return false;
      return true;
    },
  });
  function gridLayer(t) {
    return new Le(t);
  }
  var Pe = Le.extend({
    options: {
      minZoom: 0,
      maxZoom: 18,
      subdomains: "abc",
      errorTileUrl: "",
      zoomOffset: 0,
      tms: false,
      zoomReverse: false,
      detectRetina: false,
      crossOrigin: false,
    },
    initialize: function (e, i) {
      (this || t)._url = e;
      i = setOptions(this || t, i);
      if (i.detectRetina && tt && i.maxZoom > 0) {
        i.tileSize = Math.floor(i.tileSize / 2);
        if (i.zoomReverse) {
          i.zoomOffset--;
          i.minZoom++;
        } else {
          i.zoomOffset++;
          i.maxZoom--;
        }
        i.minZoom = Math.max(0, i.minZoom);
      }
      "string" === typeof i.subdomains &&
        (i.subdomains = i.subdomains.split(""));
      B || this.on("tileunload", (this || t)._onTileRemove);
    },
    setUrl: function (e, i) {
      (this || t)._url === e && void 0 === i && (i = true);
      (this || t)._url = e;
      i || this.redraw();
      return this || t;
    },
    createTile: function (e, i) {
      var n = document.createElement("img");
      on(n, "load", bind((this || t)._tileOnLoad, this || t, i, n));
      on(n, "error", bind((this || t)._tileOnError, this || t, i, n));
      ((this || t).options.crossOrigin ||
        "" === (this || t).options.crossOrigin) &&
        (n.crossOrigin =
          true === (this || t).options.crossOrigin
            ? ""
            : (this || t).options.crossOrigin);
      n.alt = "";
      n.setAttribute("role", "presentation");
      n.src = this.getTileUrl(e);
      return n;
    },
    getTileUrl: function (e) {
      var i = {
        r: tt ? "@2x" : "",
        s: this._getSubdomain(e),
        x: e.x,
        y: e.y,
        z: this._getZoomForUrl(),
      };
      if ((this || t)._map && !(this || t)._map.options.crs.infinite) {
        var n = (this || t)._globalTileRange.max.y - e.y;
        (this || t).options.tms && (i["y"] = n);
        i["-y"] = n;
      }
      return template((this || t)._url, extend(i, (this || t).options));
    },
    _tileOnLoad: function (e, i) {
      M ? setTimeout(bind(e, this || t, null, i), 0) : e(null, i);
    },
    _tileOnError: function (e, i, n) {
      var o = (this || t).options.errorTileUrl;
      o && i.getAttribute("src") !== o && (i.src = o);
      e(n, i);
    },
    _onTileRemove: function (t) {
      t.tile.onload = null;
    },
    _getZoomForUrl: function () {
      var e = (this || t)._tileZoom,
        i = (this || t).options.maxZoom,
        n = (this || t).options.zoomReverse,
        o = (this || t).options.zoomOffset;
      n && (e = i - e);
      return e + o;
    },
    _getSubdomain: function (e) {
      var i = Math.abs(e.x + e.y) % (this || t).options.subdomains.length;
      return (this || t).options.subdomains[i];
    },
    _abortLoading: function () {
      var e, i;
      for (e in (this || t)._tiles)
        if ((this || t)._tiles[e].coords.z !== (this || t)._tileZoom) {
          i = (this || t)._tiles[e].el;
          i.onload = falseFn;
          i.onerror = falseFn;
          if (!i.complete) {
            i.src = h;
            remove(i);
            delete (this || t)._tiles[e];
          }
        }
    },
    _removeTile: function (e) {
      var i = (this || t)._tiles[e];
      if (i) {
        O || i.el.setAttribute("src", h);
        return Le.prototype._removeTile.call(this || t, e);
      }
    },
    _tileReady: function (e, i, n) {
      if ((this || t)._map && (!n || n.getAttribute("src") !== h))
        return Le.prototype._tileReady.call(this || t, e, i, n);
    },
  });
  function tileLayer(t, e) {
    return new Pe(t, e);
  }
  var xe = Pe.extend({
    defaultWmsParams: {
      service: "WMS",
      request: "GetMap",
      layers: "",
      styles: "",
      format: "image/jpeg",
      transparent: false,
      version: "1.1.1",
    },
    options: { crs: null, uppercase: false },
    initialize: function (e, i) {
      (this || t)._url = e;
      var n = extend({}, (this || t).defaultWmsParams);
      for (var o in i) o in (this || t).options || (n[o] = i[o]);
      i = setOptions(this || t, i);
      var s = i.detectRetina && tt ? 2 : 1;
      var a = this.getTileSize();
      n.width = a.x * s;
      n.height = a.y * s;
      (this || t).wmsParams = n;
    },
    onAdd: function (e) {
      (this || t)._crs = (this || t).options.crs || e.options.crs;
      (this || t)._wmsVersion = parseFloat((this || t).wmsParams.version);
      var i = (this || t)._wmsVersion >= 1.3 ? "crs" : "srs";
      (this || t).wmsParams[i] = (this || t)._crs.code;
      Pe.prototype.onAdd.call(this || t, e);
    },
    getTileUrl: function (e) {
      var i = this._tileCoordsToNwSe(e),
        n = (this || t)._crs,
        o = toBounds(n.project(i[0]), n.project(i[1])),
        s = o.min,
        a = o.max,
        h = (
          (this || t)._wmsVersion >= 1.3 && (this || t)._crs === Yt
            ? [s.y, s.x, a.y, a.x]
            : [s.x, s.y, a.x, a.y]
        ).join(","),
        l = Pe.prototype.getTileUrl.call(this || t, e);
      return (
        l +
        getParamString(
          (this || t).wmsParams,
          l,
          (this || t).options.uppercase
        ) +
        ((this || t).options.uppercase ? "&BBOX=" : "&bbox=") +
        h
      );
    },
    setParams: function (e, i) {
      extend((this || t).wmsParams, e);
      i || this.redraw();
      return this || t;
    },
  });
  function tileLayerWMS(t, e) {
    return new xe(t, e);
  }
  Pe.WMS = xe;
  tileLayer.wms = tileLayerWMS;
  var we = Xt.extend({
    options: { padding: 0.1, tolerance: 0 },
    initialize: function (e) {
      setOptions(this || t, e);
      stamp(this || t);
      (this || t)._layers = (this || t)._layers || {};
    },
    onAdd: function () {
      if (!(this || t)._container) {
        this._initContainer();
        (this || t)._zoomAnimated &&
          addClass((this || t)._container, "leaflet-zoom-animated");
      }
      this.getPane().appendChild((this || t)._container);
      this._update();
      this.on("update", (this || t)._updatePaths, this || t);
    },
    onRemove: function () {
      this.off("update", (this || t)._updatePaths, this || t);
      this._destroyContainer();
    },
    getEvents: function () {
      var e = {
        viewreset: (this || t)._reset,
        zoom: (this || t)._onZoom,
        moveend: (this || t)._update,
        zoomend: (this || t)._onZoomEnd,
      };
      (this || t)._zoomAnimated && (e.zoomanim = (this || t)._onAnimZoom);
      return e;
    },
    _onAnimZoom: function (t) {
      this._updateTransform(t.center, t.zoom);
    },
    _onZoom: function () {
      this._updateTransform(
        (this || t)._map.getCenter(),
        (this || t)._map.getZoom()
      );
    },
    _updateTransform: function (e, i) {
      var n = (this || t)._map.getZoomScale(i, (this || t)._zoom),
        o = getPosition((this || t)._container),
        s = (this || t)._map
          .getSize()
          .multiplyBy(0.5 + (this || t).options.padding),
        a = (this || t)._map.project((this || t)._center, i),
        h = (this || t)._map.project(e, i),
        l = h.subtract(a),
        c = s.multiplyBy(-n).add(o).add(s).subtract(l);
      U
        ? setTransform((this || t)._container, c, n)
        : setPosition((this || t)._container, c);
    },
    _reset: function () {
      this._update();
      this._updateTransform((this || t)._center, (this || t)._zoom);
      for (var e in (this || t)._layers) (this || t)._layers[e]._reset();
    },
    _onZoomEnd: function () {
      for (var e in (this || t)._layers) (this || t)._layers[e]._project();
    },
    _updatePaths: function () {
      for (var e in (this || t)._layers) (this || t)._layers[e]._update();
    },
    _update: function () {
      var e = (this || t).options.padding,
        i = (this || t)._map.getSize(),
        n = (this || t)._map
          .containerPointToLayerPoint(i.multiplyBy(-e))
          .round();
      (this || t)._bounds = new Bounds(
        n,
        n.add(i.multiplyBy(1 + 2 * e)).round()
      );
      (this || t)._center = (this || t)._map.getCenter();
      (this || t)._zoom = (this || t)._map.getZoom();
    },
  });
  var be = we.extend({
    getEvents: function () {
      var e = we.prototype.getEvents.call(this || t);
      e.viewprereset = (this || t)._onViewPreReset;
      return e;
    },
    _onViewPreReset: function () {
      (this || t)._postponeUpdatePaths = true;
    },
    onAdd: function () {
      we.prototype.onAdd.call(this || t);
      this._draw();
    },
    _initContainer: function () {
      var e = ((this || t)._container = document.createElement("canvas"));
      on(e, "mousemove", (this || t)._onMouseMove, this || t);
      on(
        e,
        "click dblclick mousedown mouseup contextmenu",
        (this || t)._onClick,
        this || t
      );
      on(e, "mouseout", (this || t)._handleMouseOut, this || t);
      (this || t)._ctx = e.getContext("2d");
    },
    _destroyContainer: function () {
      cancelAnimFrame((this || t)._redrawRequest);
      delete (this || t)._ctx;
      remove((this || t)._container);
      off((this || t)._container);
      delete (this || t)._container;
    },
    _updatePaths: function () {
      if (!(this || t)._postponeUpdatePaths) {
        var e;
        (this || t)._redrawBounds = null;
        for (var i in (this || t)._layers) {
          e = (this || t)._layers[i];
          e._update();
        }
        this._redraw();
      }
    },
    _update: function () {
      if (!(this || t)._map._animatingZoom || !(this || t)._bounds) {
        we.prototype._update.call(this || t);
        var e = (this || t)._bounds,
          i = (this || t)._container,
          n = e.getSize(),
          o = tt ? 2 : 1;
        setPosition(i, e.min);
        i.width = o * n.x;
        i.height = o * n.y;
        i.style.width = n.x + "px";
        i.style.height = n.y + "px";
        tt && (this || t)._ctx.scale(2, 2);
        (this || t)._ctx.translate(-e.min.x, -e.min.y);
        this.fire("update");
      }
    },
    _reset: function () {
      we.prototype._reset.call(this || t);
      if ((this || t)._postponeUpdatePaths) {
        (this || t)._postponeUpdatePaths = false;
        this._updatePaths();
      }
    },
    _initPath: function (e) {
      this._updateDashArray(e);
      (this || t)._layers[stamp(e)] = e;
      var i = (e._order = {
        layer: e,
        prev: (this || t)._drawLast,
        next: null,
      });
      (this || t)._drawLast && ((this || t)._drawLast.next = i);
      (this || t)._drawLast = i;
      (this || t)._drawFirst = (this || t)._drawFirst || (this || t)._drawLast;
    },
    _addPath: function (t) {
      this._requestRedraw(t);
    },
    _removePath: function (e) {
      var i = e._order;
      var n = i.next;
      var o = i.prev;
      n ? (n.prev = o) : ((this || t)._drawLast = o);
      o ? (o.next = n) : ((this || t)._drawFirst = n);
      delete e._order;
      delete (this || t)._layers[stamp(e)];
      this._requestRedraw(e);
    },
    _updatePath: function (t) {
      this._extendRedrawBounds(t);
      t._project();
      t._update();
      this._requestRedraw(t);
    },
    _updateStyle: function (t) {
      this._updateDashArray(t);
      this._requestRedraw(t);
    },
    _updateDashArray: function (t) {
      if ("string" === typeof t.options.dashArray) {
        var e = t.options.dashArray.split(/[, ]+/),
          i = [],
          n,
          o;
        for (o = 0; o < e.length; o++) {
          n = Number(e[o]);
          if (isNaN(n)) return;
          i.push(n);
        }
        t.options._dashArray = i;
      } else t.options._dashArray = t.options.dashArray;
    },
    _requestRedraw: function (e) {
      if ((this || t)._map) {
        this._extendRedrawBounds(e);
        (this || t)._redrawRequest =
          (this || t)._redrawRequest ||
          requestAnimFrame((this || t)._redraw, this || t);
      }
    },
    _extendRedrawBounds: function (e) {
      if (e._pxBounds) {
        var i = (e.options.weight || 0) + 1;
        (this || t)._redrawBounds = (this || t)._redrawBounds || new Bounds();
        (this || t)._redrawBounds.extend(e._pxBounds.min.subtract([i, i]));
        (this || t)._redrawBounds.extend(e._pxBounds.max.add([i, i]));
      }
    },
    _redraw: function () {
      (this || t)._redrawRequest = null;
      if ((this || t)._redrawBounds) {
        (this || t)._redrawBounds.min._floor();
        (this || t)._redrawBounds.max._ceil();
      }
      this._clear();
      this._draw();
      (this || t)._redrawBounds = null;
    },
    _clear: function () {
      var e = (this || t)._redrawBounds;
      if (e) {
        var i = e.getSize();
        (this || t)._ctx.clearRect(e.min.x, e.min.y, i.x, i.y);
      } else {
        (this || t)._ctx.save();
        (this || t)._ctx.setTransform(1, 0, 0, 1, 0, 0);
        (this || t)._ctx.clearRect(
          0,
          0,
          (this || t)._container.width,
          (this || t)._container.height
        );
        (this || t)._ctx.restore();
      }
    },
    _draw: function () {
      var e,
        i = (this || t)._redrawBounds;
      (this || t)._ctx.save();
      if (i) {
        var n = i.getSize();
        (this || t)._ctx.beginPath();
        (this || t)._ctx.rect(i.min.x, i.min.y, n.x, n.y);
        (this || t)._ctx.clip();
      }
      (this || t)._drawing = true;
      for (var o = (this || t)._drawFirst; o; o = o.next) {
        e = o.layer;
        (!i || (e._pxBounds && e._pxBounds.intersects(i))) && e._updatePath();
      }
      (this || t)._drawing = false;
      (this || t)._ctx.restore();
    },
    _updatePoly: function (e, i) {
      if ((this || t)._drawing) {
        var n,
          o,
          s,
          a,
          h = e._parts,
          l = h.length,
          c = (this || t)._ctx;
        if (l) {
          c.beginPath();
          for (n = 0; n < l; n++) {
            for (o = 0, s = h[n].length; o < s; o++) {
              a = h[n][o];
              c[o ? "lineTo" : "moveTo"](a.x, a.y);
            }
            i && c.closePath();
          }
          this._fillStroke(c, e);
        }
      }
    },
    _updateCircle: function (e) {
      if ((this || t)._drawing && !e._empty()) {
        var i = e._point,
          n = (this || t)._ctx,
          o = Math.max(Math.round(e._radius), 1),
          s = (Math.max(Math.round(e._radiusY), 1) || o) / o;
        if (1 !== s) {
          n.save();
          n.scale(1, s);
        }
        n.beginPath();
        n.arc(i.x, i.y / s, o, 0, 2 * Math.PI, false);
        1 !== s && n.restore();
        this._fillStroke(n, e);
      }
    },
    _fillStroke: function (t, e) {
      var i = e.options;
      if (i.fill) {
        t.globalAlpha = i.fillOpacity;
        t.fillStyle = i.fillColor || i.color;
        t.fill(i.fillRule || "evenodd");
      }
      if (i.stroke && 0 !== i.weight) {
        t.setLineDash &&
          t.setLineDash((e.options && e.options._dashArray) || []);
        t.globalAlpha = i.opacity;
        t.lineWidth = i.weight;
        t.strokeStyle = i.color;
        t.lineCap = i.lineCap;
        t.lineJoin = i.lineJoin;
        t.stroke();
      }
    },
    _onClick: function (e) {
      var i = (this || t)._map.mouseEventToLayerPoint(e),
        n,
        o;
      for (var s = (this || t)._drawFirst; s; s = s.next) {
        n = s.layer;
        n.options.interactive &&
          n._containsPoint(i) &&
          ((("click" === e.type || "preclick" !== e.type) &&
            (this || t)._map._draggableMoved(n)) ||
            (o = n));
      }
      if (o) {
        fakeStop(e);
        this._fireEvent([o], e);
      }
    },
    _onMouseMove: function (e) {
      if (
        (this || t)._map &&
        !(this || t)._map.dragging.moving() &&
        !(this || t)._map._animatingZoom
      ) {
        var i = (this || t)._map.mouseEventToLayerPoint(e);
        this._handleMouseHover(e, i);
      }
    },
    _handleMouseOut: function (e) {
      var i = (this || t)._hoveredLayer;
      if (i) {
        removeClass((this || t)._container, "leaflet-interactive");
        this._fireEvent([i], e, "mouseout");
        (this || t)._hoveredLayer = null;
        (this || t)._mouseHoverThrottled = false;
      }
    },
    _handleMouseHover: function (e, i) {
      if (!(this || t)._mouseHoverThrottled) {
        var n, o;
        for (var s = (this || t)._drawFirst; s; s = s.next) {
          n = s.layer;
          n.options.interactive && n._containsPoint(i) && (o = n);
        }
        if (o !== (this || t)._hoveredLayer) {
          this._handleMouseOut(e);
          if (o) {
            addClass((this || t)._container, "leaflet-interactive");
            this._fireEvent([o], e, "mouseover");
            (this || t)._hoveredLayer = o;
          }
        }
        (this || t)._hoveredLayer &&
          this._fireEvent([(this || t)._hoveredLayer], e);
        (this || t)._mouseHoverThrottled = true;
        setTimeout(
          bind(function () {
            (this || t)._mouseHoverThrottled = false;
          }, this || t),
          32
        );
      }
    },
    _fireEvent: function (e, i, n) {
      (this || t)._map._fireDOMEvent(i, n || i.type, e);
    },
    _bringToFront: function (e) {
      var i = e._order;
      if (i) {
        var n = i.next;
        var o = i.prev;
        if (n) {
          n.prev = o;
          o ? (o.next = n) : n && ((this || t)._drawFirst = n);
          i.prev = (this || t)._drawLast;
          (this || t)._drawLast.next = i;
          i.next = null;
          (this || t)._drawLast = i;
          this._requestRedraw(e);
        }
      }
    },
    _bringToBack: function (e) {
      var i = e._order;
      if (i) {
        var n = i.next;
        var o = i.prev;
        if (o) {
          o.next = n;
          n ? (n.prev = o) : o && ((this || t)._drawLast = o);
          i.prev = null;
          i.next = (this || t)._drawFirst;
          (this || t)._drawFirst.prev = i;
          (this || t)._drawFirst = i;
          this._requestRedraw(e);
        }
      }
    },
  });
  function canvas$1(t) {
    return it ? new be(t) : null;
  }
  var Te = (function () {
    try {
      document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml");
      return function (t) {
        return document.createElement("<lvml:" + t + ' class="lvml">');
      };
    } catch (t) {
      return function (t) {
        return document.createElement(
          "<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">'
        );
      };
    }
  })();
  var Ce = {
    _initContainer: function () {
      (this || t)._container = create$1("div", "leaflet-vml-container");
    },
    _update: function () {
      if (!(this || t)._map._animatingZoom) {
        we.prototype._update.call(this || t);
        this.fire("update");
      }
    },
    _initPath: function (e) {
      var i = (e._container = Te("shape"));
      addClass(i, "leaflet-vml-shape " + ((this || t).options.className || ""));
      i.coordsize = "1 1";
      e._path = Te("path");
      i.appendChild(e._path);
      this._updateStyle(e);
      (this || t)._layers[stamp(e)] = e;
    },
    _addPath: function (e) {
      var i = e._container;
      (this || t)._container.appendChild(i);
      e.options.interactive && e.addInteractiveTarget(i);
    },
    _removePath: function (e) {
      var i = e._container;
      remove(i);
      e.removeInteractiveTarget(i);
      delete (this || t)._layers[stamp(e)];
    },
    _updateStyle: function (t) {
      var e = t._stroke,
        i = t._fill,
        n = t.options,
        o = t._container;
      o.stroked = !!n.stroke;
      o.filled = !!n.fill;
      if (n.stroke) {
        e || (e = t._stroke = Te("stroke"));
        o.appendChild(e);
        e.weight = n.weight + "px";
        e.color = n.color;
        e.opacity = n.opacity;
        n.dashArray
          ? (e.dashStyle = a(n.dashArray)
              ? n.dashArray.join(" ")
              : n.dashArray.replace(/( *, *)/g, " "))
          : (e.dashStyle = "");
        e.endcap = n.lineCap.replace("butt", "flat");
        e.joinstyle = n.lineJoin;
      } else if (e) {
        o.removeChild(e);
        t._stroke = null;
      }
      if (n.fill) {
        i || (i = t._fill = Te("fill"));
        o.appendChild(i);
        i.color = n.fillColor || n.color;
        i.opacity = n.fillOpacity;
      } else if (i) {
        o.removeChild(i);
        t._fill = null;
      }
    },
    _updateCircle: function (t) {
      var e = t._point.round(),
        i = Math.round(t._radius),
        n = Math.round(t._radiusY || i);
      this._setPath(
        t,
        t._empty()
          ? "M0 0"
          : "AL " + e.x + "," + e.y + " " + i + "," + n + " 0," + 65535 * 360
      );
    },
    _setPath: function (t, e) {
      t._path.v = e;
    },
    _bringToFront: function (t) {
      toFront(t._container);
    },
    _bringToBack: function (t) {
      toBack(t._container);
    },
  };
  var Me = ot ? Te : svgCreate;
  var ze = we.extend({
    getEvents: function () {
      var e = we.prototype.getEvents.call(this || t);
      e.zoomstart = (this || t)._onZoomStart;
      return e;
    },
    _initContainer: function () {
      (this || t)._container = Me("svg");
      (this || t)._container.setAttribute("pointer-events", "none");
      (this || t)._rootGroup = Me("g");
      (this || t)._container.appendChild((this || t)._rootGroup);
    },
    _destroyContainer: function () {
      remove((this || t)._container);
      off((this || t)._container);
      delete (this || t)._container;
      delete (this || t)._rootGroup;
      delete (this || t)._svgSize;
    },
    _onZoomStart: function () {
      this._update();
    },
    _update: function () {
      if (!(this || t)._map._animatingZoom || !(this || t)._bounds) {
        we.prototype._update.call(this || t);
        var e = (this || t)._bounds,
          i = e.getSize(),
          n = (this || t)._container;
        if (!(this || t)._svgSize || !(this || t)._svgSize.equals(i)) {
          (this || t)._svgSize = i;
          n.setAttribute("width", i.x);
          n.setAttribute("height", i.y);
        }
        setPosition(n, e.min);
        n.setAttribute("viewBox", [e.min.x, e.min.y, i.x, i.y].join(" "));
        this.fire("update");
      }
    },
    _initPath: function (e) {
      var i = (e._path = Me("path"));
      e.options.className && addClass(i, e.options.className);
      e.options.interactive && addClass(i, "leaflet-interactive");
      this._updateStyle(e);
      (this || t)._layers[stamp(e)] = e;
    },
    _addPath: function (e) {
      (this || t)._rootGroup || this._initContainer();
      (this || t)._rootGroup.appendChild(e._path);
      e.addInteractiveTarget(e._path);
    },
    _removePath: function (e) {
      remove(e._path);
      e.removeInteractiveTarget(e._path);
      delete (this || t)._layers[stamp(e)];
    },
    _updatePath: function (t) {
      t._project();
      t._update();
    },
    _updateStyle: function (t) {
      var e = t._path,
        i = t.options;
      if (e) {
        if (i.stroke) {
          e.setAttribute("stroke", i.color);
          e.setAttribute("stroke-opacity", i.opacity);
          e.setAttribute("stroke-width", i.weight);
          e.setAttribute("stroke-linecap", i.lineCap);
          e.setAttribute("stroke-linejoin", i.lineJoin);
          i.dashArray
            ? e.setAttribute("stroke-dasharray", i.dashArray)
            : e.removeAttribute("stroke-dasharray");
          i.dashOffset
            ? e.setAttribute("stroke-dashoffset", i.dashOffset)
            : e.removeAttribute("stroke-dashoffset");
        } else e.setAttribute("stroke", "none");
        if (i.fill) {
          e.setAttribute("fill", i.fillColor || i.color);
          e.setAttribute("fill-opacity", i.fillOpacity);
          e.setAttribute("fill-rule", i.fillRule || "evenodd");
        } else e.setAttribute("fill", "none");
      }
    },
    _updatePoly: function (t, e) {
      this._setPath(t, pointsToPath(t._parts, e));
    },
    _updateCircle: function (t) {
      var e = t._point,
        i = Math.max(Math.round(t._radius), 1),
        n = Math.max(Math.round(t._radiusY), 1) || i,
        o = "a" + i + "," + n + " 0 1,0 ";
      var s = t._empty()
        ? "M0 0"
        : "M" + (e.x - i) + "," + e.y + o + 2 * i + ",0 " + o + 2 * -i + ",0 ";
      this._setPath(t, s);
    },
    _setPath: function (t, e) {
      t._path.setAttribute("d", e);
    },
    _bringToFront: function (t) {
      toFront(t._path);
    },
    _bringToBack: function (t) {
      toBack(t._path);
    },
  });
  ot && ze.include(Ce);
  function svg$1(t) {
    return nt || ot ? new ze(t) : null;
  }
  kt.include({
    getRenderer: function (e) {
      var i =
        e.options.renderer ||
        this._getPaneRenderer(e.options.pane) ||
        (this || t).options.renderer ||
        (this || t)._renderer;
      i || (i = (this || t)._renderer = this._createRenderer());
      this.hasLayer(i) || this.addLayer(i);
      return i;
    },
    _getPaneRenderer: function (e) {
      if ("overlayPane" === e || void 0 === e) return false;
      var i = (this || t)._paneRenderers[e];
      if (void 0 === i) {
        i = this._createRenderer({ pane: e });
        (this || t)._paneRenderers[e] = i;
      }
      return i;
    },
    _createRenderer: function (e) {
      return ((this || t).options.preferCanvas && canvas$1(e)) || svg$1(e);
    },
  });
  var Se = le.extend({
    initialize: function (e, i) {
      le.prototype.initialize.call(this || t, this._boundsToLatLngs(e), i);
    },
    setBounds: function (t) {
      return this.setLatLngs(this._boundsToLatLngs(t));
    },
    _boundsToLatLngs: function (t) {
      t = toLatLngBounds(t);
      return [
        t.getSouthWest(),
        t.getNorthWest(),
        t.getNorthEast(),
        t.getSouthEast(),
      ];
    },
  });
  function rectangle(t, e) {
    return new Se(t, e);
  }
  ze.create = Me;
  ze.pointsToPath = pointsToPath;
  ue.geometryToLayer = geometryToLayer;
  ue.coordsToLatLng = coordsToLatLng;
  ue.coordsToLatLngs = coordsToLatLngs;
  ue.latLngToCoords = latLngToCoords;
  ue.latLngsToCoords = latLngsToCoords;
  ue.getFeature = getFeature;
  ue.asFeature = asFeature;
  kt.mergeOptions({ boxZoom: true });
  var Be = Dt.extend({
    initialize: function (e) {
      (this || t)._map = e;
      (this || t)._container = e._container;
      (this || t)._pane = e._panes.overlayPane;
      (this || t)._resetStateTimeout = 0;
      e.on("unload", (this || t)._destroy, this || t);
    },
    addHooks: function () {
      on(
        (this || t)._container,
        "mousedown",
        (this || t)._onMouseDown,
        this || t
      );
    },
    removeHooks: function () {
      off(
        (this || t)._container,
        "mousedown",
        (this || t)._onMouseDown,
        this || t
      );
    },
    moved: function () {
      return (this || t)._moved;
    },
    _destroy: function () {
      remove((this || t)._pane);
      delete (this || t)._pane;
    },
    _resetState: function () {
      (this || t)._resetStateTimeout = 0;
      (this || t)._moved = false;
    },
    _clearDeferredResetState: function () {
      if (0 !== (this || t)._resetStateTimeout) {
        clearTimeout((this || t)._resetStateTimeout);
        (this || t)._resetStateTimeout = 0;
      }
    },
    _onMouseDown: function (e) {
      if (!e.shiftKey || (1 !== e.which && 1 !== e.button)) return false;
      this._clearDeferredResetState();
      this._resetState();
      vt();
      disableImageDrag();
      (this || t)._startPoint = (this || t)._map.mouseEventToContainerPoint(e);
      on(
        document,
        {
          contextmenu: stop,
          mousemove: (this || t)._onMouseMove,
          mouseup: (this || t)._onMouseUp,
          keydown: (this || t)._onKeyDown,
        },
        this || t
      );
    },
    _onMouseMove: function (e) {
      if (!(this || t)._moved) {
        (this || t)._moved = true;
        (this || t)._box = create$1(
          "div",
          "leaflet-zoom-box",
          (this || t)._container
        );
        addClass((this || t)._container, "leaflet-crosshair");
        (this || t)._map.fire("boxzoomstart");
      }
      (this || t)._point = (this || t)._map.mouseEventToContainerPoint(e);
      var i = new Bounds((this || t)._point, (this || t)._startPoint),
        n = i.getSize();
      setPosition((this || t)._box, i.min);
      (this || t)._box.style.width = n.x + "px";
      (this || t)._box.style.height = n.y + "px";
    },
    _finish: function () {
      if ((this || t)._moved) {
        remove((this || t)._box);
        removeClass((this || t)._container, "leaflet-crosshair");
      }
      yt();
      enableImageDrag();
      off(
        document,
        {
          contextmenu: stop,
          mousemove: (this || t)._onMouseMove,
          mouseup: (this || t)._onMouseUp,
          keydown: (this || t)._onKeyDown,
        },
        this || t
      );
    },
    _onMouseUp: function (e) {
      if (1 === e.which || 1 === e.button) {
        this._finish();
        if ((this || t)._moved) {
          this._clearDeferredResetState();
          (this || t)._resetStateTimeout = setTimeout(
            bind((this || t)._resetState, this || t),
            0
          );
          var i = new LatLngBounds(
            (this || t)._map.containerPointToLatLng((this || t)._startPoint),
            (this || t)._map.containerPointToLatLng((this || t)._point)
          );
          (this || t)._map
            .fitBounds(i)
            .fire("boxzoomend", { boxZoomBounds: i });
        }
      }
    },
    _onKeyDown: function (t) {
      27 === t.keyCode && this._finish();
    },
  });
  kt.addInitHook("addHandler", "boxZoom", Be);
  kt.mergeOptions({ doubleClickZoom: true });
  var ke = Dt.extend({
    addHooks: function () {
      (this || t)._map.on("dblclick", (this || t)._onDoubleClick, this || t);
    },
    removeHooks: function () {
      (this || t)._map.off("dblclick", (this || t)._onDoubleClick, this || t);
    },
    _onDoubleClick: function (e) {
      var i = (this || t)._map,
        n = i.getZoom(),
        o = i.options.zoomDelta,
        s = e.originalEvent.shiftKey ? n - o : n + o;
      "center" === i.options.doubleClickZoom
        ? i.setZoom(s)
        : i.setZoomAround(e.containerPoint, s);
    },
  });
  kt.addInitHook("addHandler", "doubleClickZoom", ke);
  kt.mergeOptions({
    dragging: true,
    inertia: !k,
    inertiaDeceleration: 3400,
    inertiaMaxSpeed: Infinity,
    easeLinearity: 0.2,
    worldCopyJump: false,
    maxBoundsViscosity: 0,
  });
  var Ee = Dt.extend({
    addHooks: function () {
      if (!(this || t)._draggable) {
        var e = (this || t)._map;
        (this || t)._draggable = new Wt(e._mapPane, e._container);
        (this || t)._draggable.on(
          {
            dragstart: (this || t)._onDragStart,
            drag: (this || t)._onDrag,
            dragend: (this || t)._onDragEnd,
          },
          this || t
        );
        (this || t)._draggable.on(
          "predrag",
          (this || t)._onPreDragLimit,
          this || t
        );
        if (e.options.worldCopyJump) {
          (this || t)._draggable.on(
            "predrag",
            (this || t)._onPreDragWrap,
            this || t
          );
          e.on("zoomend", (this || t)._onZoomEnd, this || t);
          e.whenReady((this || t)._onZoomEnd, this || t);
        }
      }
      addClass((this || t)._map._container, "leaflet-grab leaflet-touch-drag");
      (this || t)._draggable.enable();
      (this || t)._positions = [];
      (this || t)._times = [];
    },
    removeHooks: function () {
      removeClass((this || t)._map._container, "leaflet-grab");
      removeClass((this || t)._map._container, "leaflet-touch-drag");
      (this || t)._draggable.disable();
    },
    moved: function () {
      return (this || t)._draggable && (this || t)._draggable._moved;
    },
    moving: function () {
      return (this || t)._draggable && (this || t)._draggable._moving;
    },
    _onDragStart: function () {
      var e = (this || t)._map;
      e._stop();
      if (
        (this || t)._map.options.maxBounds &&
        (this || t)._map.options.maxBoundsViscosity
      ) {
        var i = toLatLngBounds((this || t)._map.options.maxBounds);
        (this || t)._offsetLimit = toBounds(
          (this || t)._map
            .latLngToContainerPoint(i.getNorthWest())
            .multiplyBy(-1),
          (this || t)._map
            .latLngToContainerPoint(i.getSouthEast())
            .multiplyBy(-1)
            .add((this || t)._map.getSize())
        );
        (this || t)._viscosity = Math.min(
          1,
          Math.max(0, (this || t)._map.options.maxBoundsViscosity)
        );
      } else (this || t)._offsetLimit = null;
      e.fire("movestart").fire("dragstart");
      if (e.options.inertia) {
        (this || t)._positions = [];
        (this || t)._times = [];
      }
    },
    _onDrag: function (e) {
      if ((this || t)._map.options.inertia) {
        var i = ((this || t)._lastTime = +new Date()),
          n = ((this || t)._lastPos =
            (this || t)._draggable._absPos || (this || t)._draggable._newPos);
        (this || t)._positions.push(n);
        (this || t)._times.push(i);
        this._prunePositions(i);
      }
      (this || t)._map.fire("move", e).fire("drag", e);
    },
    _prunePositions: function (e) {
      while (
        (this || t)._positions.length > 1 &&
        e - (this || t)._times[0] > 50
      ) {
        (this || t)._positions.shift();
        (this || t)._times.shift();
      }
    },
    _onZoomEnd: function () {
      var e = (this || t)._map.getSize().divideBy(2),
        i = (this || t)._map.latLngToLayerPoint([0, 0]);
      (this || t)._initialWorldOffset = i.subtract(e).x;
      (this || t)._worldWidth = (this || t)._map
        .getPixelWorldBounds()
        .getSize().x;
    },
    _viscousLimit: function (e, i) {
      return e - (e - i) * (this || t)._viscosity;
    },
    _onPreDragLimit: function () {
      if ((this || t)._viscosity && (this || t)._offsetLimit) {
        var e = (this || t)._draggable._newPos.subtract(
          (this || t)._draggable._startPos
        );
        var i = (this || t)._offsetLimit;
        e.x < i.min.x && (e.x = this._viscousLimit(e.x, i.min.x));
        e.y < i.min.y && (e.y = this._viscousLimit(e.y, i.min.y));
        e.x > i.max.x && (e.x = this._viscousLimit(e.x, i.max.x));
        e.y > i.max.y && (e.y = this._viscousLimit(e.y, i.max.y));
        (this || t)._draggable._newPos = (this || t)._draggable._startPos.add(
          e
        );
      }
    },
    _onPreDragWrap: function () {
      var e = (this || t)._worldWidth,
        i = Math.round(e / 2),
        n = (this || t)._initialWorldOffset,
        o = (this || t)._draggable._newPos.x,
        s = ((o - i + n) % e) + i - n,
        a = ((o + i + n) % e) - i - n,
        h = Math.abs(s + n) < Math.abs(a + n) ? s : a;
      (this || t)._draggable._absPos = (this || t)._draggable._newPos.clone();
      (this || t)._draggable._newPos.x = h;
    },
    _onDragEnd: function (e) {
      var i = (this || t)._map,
        n = i.options,
        o = !n.inertia || (this || t)._times.length < 2;
      i.fire("dragend", e);
      if (o) i.fire("moveend");
      else {
        this._prunePositions(+new Date());
        var s = (this || t)._lastPos.subtract((this || t)._positions[0]),
          a = ((this || t)._lastTime - (this || t)._times[0]) / 1e3,
          h = n.easeLinearity,
          l = s.multiplyBy(h / a),
          c = l.distanceTo([0, 0]),
          d = Math.min(n.inertiaMaxSpeed, c),
          _ = l.multiplyBy(d / c),
          p = d / (n.inertiaDeceleration * h),
          f = _.multiplyBy(-p / 2).round();
        if (f.x || f.y) {
          f = i._limitOffset(f, i.options.maxBounds);
          requestAnimFrame(function () {
            i.panBy(f, {
              duration: p,
              easeLinearity: h,
              noMoveStart: true,
              animate: true,
            });
          });
        } else i.fire("moveend");
      }
    },
  });
  kt.addInitHook("addHandler", "dragging", Ee);
  kt.mergeOptions({ keyboard: true, keyboardPanDelta: 80 });
  var Oe = Dt.extend({
    keyCodes: {
      left: [37],
      right: [39],
      down: [40],
      up: [38],
      zoomIn: [187, 107, 61, 171],
      zoomOut: [189, 109, 54, 173],
    },
    initialize: function (e) {
      (this || t)._map = e;
      this._setPanDelta(e.options.keyboardPanDelta);
      this._setZoomDelta(e.options.zoomDelta);
    },
    addHooks: function () {
      var e = (this || t)._map._container;
      e.tabIndex <= 0 && (e.tabIndex = "0");
      on(
        e,
        {
          focus: (this || t)._onFocus,
          blur: (this || t)._onBlur,
          mousedown: (this || t)._onMouseDown,
        },
        this || t
      );
      (this || t)._map.on(
        { focus: (this || t)._addHooks, blur: (this || t)._removeHooks },
        this || t
      );
    },
    removeHooks: function () {
      this._removeHooks();
      off(
        (this || t)._map._container,
        {
          focus: (this || t)._onFocus,
          blur: (this || t)._onBlur,
          mousedown: (this || t)._onMouseDown,
        },
        this || t
      );
      (this || t)._map.off(
        { focus: (this || t)._addHooks, blur: (this || t)._removeHooks },
        this || t
      );
    },
    _onMouseDown: function () {
      if (!(this || t)._focused) {
        var e = document.body,
          i = document.documentElement,
          n = e.scrollTop || i.scrollTop,
          o = e.scrollLeft || i.scrollLeft;
        (this || t)._map._container.focus();
        window.scrollTo(o, n);
      }
    },
    _onFocus: function () {
      (this || t)._focused = true;
      (this || t)._map.fire("focus");
    },
    _onBlur: function () {
      (this || t)._focused = false;
      (this || t)._map.fire("blur");
    },
    _setPanDelta: function (e) {
      var i = ((this || t)._panKeys = {}),
        n = (this || t).keyCodes,
        o,
        s;
      for (o = 0, s = n.left.length; o < s; o++) i[n.left[o]] = [-1 * e, 0];
      for (o = 0, s = n.right.length; o < s; o++) i[n.right[o]] = [e, 0];
      for (o = 0, s = n.down.length; o < s; o++) i[n.down[o]] = [0, e];
      for (o = 0, s = n.up.length; o < s; o++) i[n.up[o]] = [0, -1 * e];
    },
    _setZoomDelta: function (e) {
      var i = ((this || t)._zoomKeys = {}),
        n = (this || t).keyCodes,
        o,
        s;
      for (o = 0, s = n.zoomIn.length; o < s; o++) i[n.zoomIn[o]] = e;
      for (o = 0, s = n.zoomOut.length; o < s; o++) i[n.zoomOut[o]] = -e;
    },
    _addHooks: function () {
      on(document, "keydown", (this || t)._onKeyDown, this || t);
    },
    _removeHooks: function () {
      off(document, "keydown", (this || t)._onKeyDown, this || t);
    },
    _onKeyDown: function (e) {
      if (!(e.altKey || e.ctrlKey || e.metaKey)) {
        var i = e.keyCode,
          n = (this || t)._map,
          o;
        if (i in (this || t)._panKeys) {
          if (!n._panAnim || !n._panAnim._inProgress) {
            o = (this || t)._panKeys[i];
            e.shiftKey && (o = toPoint(o).multiplyBy(3));
            n.panBy(o);
            n.options.maxBounds && n.panInsideBounds(n.options.maxBounds);
          }
        } else if (i in (this || t)._zoomKeys)
          n.setZoom(
            n.getZoom() + (e.shiftKey ? 3 : 1) * (this || t)._zoomKeys[i]
          );
        else {
          if (27 !== i || !n._popup || !n._popup.options.closeOnEscapeKey)
            return;
          n.closePopup();
        }
        stop(e);
      }
    },
  });
  kt.addInitHook("addHandler", "keyboard", Oe);
  kt.mergeOptions({
    scrollWheelZoom: true,
    wheelDebounceTime: 40,
    wheelPxPerZoomLevel: 60,
  });
  var Ze = Dt.extend({
    addHooks: function () {
      on(
        (this || t)._map._container,
        "wheel",
        (this || t)._onWheelScroll,
        this || t
      );
      (this || t)._delta = 0;
    },
    removeHooks: function () {
      off(
        (this || t)._map._container,
        "wheel",
        (this || t)._onWheelScroll,
        this || t
      );
    },
    _onWheelScroll: function (e) {
      var i = getWheelDelta(e);
      var n = (this || t)._map.options.wheelDebounceTime;
      (this || t)._delta += i;
      (this || t)._lastMousePos = (this || t)._map.mouseEventToContainerPoint(
        e
      );
      (this || t)._startTime || ((this || t)._startTime = +new Date());
      var o = Math.max(n - (+new Date() - (this || t)._startTime), 0);
      clearTimeout((this || t)._timer);
      (this || t)._timer = setTimeout(
        bind((this || t)._performZoom, this || t),
        o
      );
      stop(e);
    },
    _performZoom: function () {
      var e = (this || t)._map,
        i = e.getZoom(),
        n = (this || t)._map.options.zoomSnap || 0;
      e._stop();
      var o =
          (this || t)._delta /
          (4 * (this || t)._map.options.wheelPxPerZoomLevel),
        s = (4 * Math.log(2 / (1 + Math.exp(-Math.abs(o))))) / Math.LN2,
        a = n ? Math.ceil(s / n) * n : s,
        h = e._limitZoom(i + ((this || t)._delta > 0 ? a : -a)) - i;
      (this || t)._delta = 0;
      (this || t)._startTime = null;
      h &&
        ("center" === e.options.scrollWheelZoom
          ? e.setZoom(i + h)
          : e.setZoomAround((this || t)._lastMousePos, i + h));
    },
  });
  kt.addInitHook("addHandler", "scrollWheelZoom", Ze);
  kt.mergeOptions({ tap: true, tapTolerance: 15 });
  var Ae = Dt.extend({
    addHooks: function () {
      on(
        (this || t)._map._container,
        "touchstart",
        (this || t)._onDown,
        this || t
      );
    },
    removeHooks: function () {
      off(
        (this || t)._map._container,
        "touchstart",
        (this || t)._onDown,
        this || t
      );
    },
    _onDown: function (e) {
      if (e.touches) {
        preventDefault(e);
        (this || t)._fireClick = true;
        if (e.touches.length > 1) {
          (this || t)._fireClick = false;
          clearTimeout((this || t)._holdTimeout);
        } else {
          var i = e.touches[0],
            n = i.target;
          (this || t)._startPos = (this || t)._newPos = new Point(
            i.clientX,
            i.clientY
          );
          n.tagName &&
            "a" === n.tagName.toLowerCase() &&
            addClass(n, "leaflet-active");
          (this || t)._holdTimeout = setTimeout(
            bind(function () {
              if (this._isTapValid()) {
                (this || t)._fireClick = false;
                this._onUp();
                this._simulateEvent("contextmenu", i);
              }
            }, this || t),
            1e3
          );
          this._simulateEvent("mousedown", i);
          on(
            document,
            { touchmove: (this || t)._onMove, touchend: (this || t)._onUp },
            this || t
          );
        }
      }
    },
    _onUp: function (e) {
      clearTimeout((this || t)._holdTimeout);
      off(
        document,
        { touchmove: (this || t)._onMove, touchend: (this || t)._onUp },
        this || t
      );
      if ((this || t)._fireClick && e && e.changedTouches) {
        var i = e.changedTouches[0],
          n = i.target;
        n &&
          n.tagName &&
          "a" === n.tagName.toLowerCase() &&
          removeClass(n, "leaflet-active");
        this._simulateEvent("mouseup", i);
        this._isTapValid() && this._simulateEvent("click", i);
      }
    },
    _isTapValid: function () {
      return (
        (this || t)._newPos.distanceTo((this || t)._startPos) <=
        (this || t)._map.options.tapTolerance
      );
    },
    _onMove: function (e) {
      var i = e.touches[0];
      (this || t)._newPos = new Point(i.clientX, i.clientY);
      this._simulateEvent("mousemove", i);
    },
    _simulateEvent: function (t, e) {
      var i = document.createEvent("MouseEvents");
      i._simulated = true;
      e.target._simulatedClick = true;
      i.initMouseEvent(
        t,
        true,
        true,
        window,
        1,
        e.screenX,
        e.screenY,
        e.clientX,
        e.clientY,
        false,
        false,
        false,
        false,
        0,
        null
      );
      e.target.dispatchEvent(i);
    },
  });
  !J || (Y && !D) || kt.addInitHook("addHandler", "tap", Ae);
  kt.mergeOptions({ touchZoom: J && !k, bounceAtZoomLimits: true });
  var Ie = Dt.extend({
    addHooks: function () {
      addClass((this || t)._map._container, "leaflet-touch-zoom");
      on(
        (this || t)._map._container,
        "touchstart",
        (this || t)._onTouchStart,
        this || t
      );
    },
    removeHooks: function () {
      removeClass((this || t)._map._container, "leaflet-touch-zoom");
      off(
        (this || t)._map._container,
        "touchstart",
        (this || t)._onTouchStart,
        this || t
      );
    },
    _onTouchStart: function (e) {
      var i = (this || t)._map;
      if (
        e.touches &&
        2 === e.touches.length &&
        !i._animatingZoom &&
        !(this || t)._zooming
      ) {
        var n = i.mouseEventToContainerPoint(e.touches[0]),
          o = i.mouseEventToContainerPoint(e.touches[1]);
        (this || t)._centerPoint = i.getSize()._divideBy(2);
        (this || t)._startLatLng = i.containerPointToLatLng(
          (this || t)._centerPoint
        );
        "center" !== i.options.touchZoom &&
          ((this || t)._pinchStartLatLng = i.containerPointToLatLng(
            n.add(o)._divideBy(2)
          ));
        (this || t)._startDist = n.distanceTo(o);
        (this || t)._startZoom = i.getZoom();
        (this || t)._moved = false;
        (this || t)._zooming = true;
        i._stop();
        on(document, "touchmove", (this || t)._onTouchMove, this || t);
        on(document, "touchend", (this || t)._onTouchEnd, this || t);
        preventDefault(e);
      }
    },
    _onTouchMove: function (e) {
      if (e.touches && 2 === e.touches.length && (this || t)._zooming) {
        var i = (this || t)._map,
          n = i.mouseEventToContainerPoint(e.touches[0]),
          o = i.mouseEventToContainerPoint(e.touches[1]),
          s = n.distanceTo(o) / (this || t)._startDist;
        (this || t)._zoom = i.getScaleZoom(s, (this || t)._startZoom);
        !i.options.bounceAtZoomLimits &&
          (((this || t)._zoom < i.getMinZoom() && s < 1) ||
            ((this || t)._zoom > i.getMaxZoom() && s > 1)) &&
          ((this || t)._zoom = i._limitZoom((this || t)._zoom));
        if ("center" === i.options.touchZoom) {
          (this || t)._center = (this || t)._startLatLng;
          if (1 === s) return;
        } else {
          var a = n
            ._add(o)
            ._divideBy(2)
            ._subtract((this || t)._centerPoint);
          if (1 === s && 0 === a.x && 0 === a.y) return;
          (this || t)._center = i.unproject(
            i
              .project((this || t)._pinchStartLatLng, (this || t)._zoom)
              .subtract(a),
            (this || t)._zoom
          );
        }
        if (!(this || t)._moved) {
          i._moveStart(true, false);
          (this || t)._moved = true;
        }
        cancelAnimFrame((this || t)._animRequest);
        var h = bind(i._move, i, (this || t)._center, (this || t)._zoom, {
          pinch: true,
          round: false,
        });
        (this || t)._animRequest = requestAnimFrame(h, this || t, true);
        preventDefault(e);
      }
    },
    _onTouchEnd: function () {
      if ((this || t)._moved && (this || t)._zooming) {
        (this || t)._zooming = false;
        cancelAnimFrame((this || t)._animRequest);
        off(document, "touchmove", (this || t)._onTouchMove, this || t);
        off(document, "touchend", (this || t)._onTouchEnd, this || t);
        (this || t)._map.options.zoomAnimation
          ? (this || t)._map._animateZoom(
              (this || t)._center,
              (this || t)._map._limitZoom((this || t)._zoom),
              true,
              (this || t)._map.options.zoomSnap
            )
          : (this || t)._map._resetView(
              (this || t)._center,
              (this || t)._map._limitZoom((this || t)._zoom)
            );
      } else (this || t)._zooming = false;
    },
  });
  kt.addInitHook("addHandler", "touchZoom", Ie);
  kt.BoxZoom = Be;
  kt.DoubleClickZoom = ke;
  kt.Drag = Ee;
  kt.Keyboard = Oe;
  kt.ScrollWheelZoom = Ze;
  kt.Tap = Ae;
  kt.TouchZoom = Ie;
  e.version = i;
  e.Control = Et;
  e.control = control;
  e.Browser = st;
  e.Evented = f;
  e.Mixin = Nt;
  e.Util = _;
  e.Class = Class;
  e.Handler = Dt;
  e.extend = extend;
  e.bind = bind;
  e.stamp = stamp;
  e.setOptions = setOptions;
  e.DomEvent = St;
  e.DomUtil = bt;
  e.PosAnimation = Bt;
  e.Draggable = Wt;
  e.LineUtil = qt;
  e.PolyUtil = Ut;
  e.Point = Point;
  e.point = toPoint;
  e.Bounds = Bounds;
  e.bounds = toBounds;
  e.Transformation = Transformation;
  e.transformation = toTransformation;
  e.Projection = $t;
  e.LatLng = LatLng;
  e.latLng = toLatLng;
  e.LatLngBounds = LatLngBounds;
  e.latLngBounds = toLatLngBounds;
  e.CRS = g;
  e.GeoJSON = ue;
  e.geoJSON = geoJSON;
  e.geoJson = de;
  e.Layer = Xt;
  e.LayerGroup = Qt;
  e.layerGroup = layerGroup;
  e.FeatureGroup = te;
  e.featureGroup = featureGroup;
  e.ImageOverlay = _e;
  e.imageOverlay = imageOverlay;
  e.VideoOverlay = pe;
  e.videoOverlay = videoOverlay;
  e.SVGOverlay = fe;
  e.svgOverlay = svgOverlay;
  e.DivOverlay = me;
  e.Popup = ge;
  e.popup = popup;
  e.Tooltip = ve;
  e.tooltip = tooltip;
  e.Icon = ee;
  e.icon = icon;
  e.DivIcon = ye;
  e.divIcon = divIcon;
  e.Marker = oe;
  e.marker = marker;
  e.TileLayer = Pe;
  e.tileLayer = tileLayer;
  e.GridLayer = Le;
  e.gridLayer = gridLayer;
  e.SVG = ze;
  e.svg = svg$1;
  e.Renderer = we;
  e.Canvas = be;
  e.canvas = canvas$1;
  e.Path = se;
  e.CircleMarker = ae;
  e.circleMarker = circleMarker;
  e.Circle = re;
  e.circle = circle;
  e.Polyline = he;
  e.polyline = polyline;
  e.Polygon = le;
  e.polygon = polygon;
  e.Rectangle = Se;
  e.rectangle = rectangle;
  e.Map = kt;
  e.map = createMap;
  var De = window.L;
  e.noConflict = function () {
    window.L = De;
    return this || t;
  };
  window.L = e;
});
const i = e.version,
  n = e.Control,
  o = e.control,
  s = e.Browser,
  a = e.Evented,
  h = e.Mixin,
  l = e.Util,
  c = e.Class,
  d = e.Handler,
  _ = e.extend,
  p = e.bind,
  f = e.stamp,
  m = e.setOptions,
  g = e.DomEvent,
  v = e.DomUtil,
  y = e.PosAnimation,
  P = e.Draggable,
  x = e.LineUtil,
  b = e.PolyUtil,
  T = e.Point,
  C = e.point,
  M = e.Bounds,
  z = e.bounds,
  S = e.Transformation,
  B = e.transformation,
  k = e.Projection,
  E = e.LatLng,
  O = e.latLng,
  Z = e.LatLngBounds,
  A = e.latLngBounds,
  I = e.CRS,
  D = e.GeoJSON,
  N = e.geoJSON,
  R = e.geoJson,
  j = e.Layer,
  W = e.LayerGroup,
  H = e.layerGroup,
  q = e.FeatureGroup,
  U = e.featureGroup,
  V = e.ImageOverlay,
  G = e.imageOverlay,
  $ = e.VideoOverlay,
  K = e.videoOverlay,
  Y = e.SVGOverlay,
  J = e.svgOverlay,
  X = e.DivOverlay,
  Q = e.Popup,
  tt = e.popup,
  et = e.Tooltip,
  it = e.tooltip,
  nt = e.Icon,
  ot = e.icon,
  st = e.DivIcon,
  at = e.divIcon,
  rt = e.Marker,
  ht = e.marker,
  lt = e.TileLayer,
  ut = e.tileLayer,
  ct = e.GridLayer,
  dt = e.gridLayer,
  _t = e.SVG,
  pt = e.svg,
  ft = e.Renderer,
  mt = e.Canvas,
  gt = e.canvas,
  vt = e.Path,
  yt = e.CircleMarker,
  Lt = e.circleMarker,
  Pt = e.Circle,
  xt = e.circle,
  wt = e.Polyline,
  bt = e.polyline,
  Tt = e.Polygon,
  Ct = e.polygon,
  Mt = e.Rectangle,
  zt = e.rectangle,
  St = e.map,
  Bt = e.noConflict;
const kt = e.Map;
export default e;
export {
  M as Bounds,
  s as Browser,
  I as CRS,
  mt as Canvas,
  Pt as Circle,
  yt as CircleMarker,
  c as Class,
  n as Control,
  st as DivIcon,
  X as DivOverlay,
  g as DomEvent,
  v as DomUtil,
  P as Draggable,
  a as Evented,
  q as FeatureGroup,
  D as GeoJSON,
  ct as GridLayer,
  d as Handler,
  nt as Icon,
  V as ImageOverlay,
  E as LatLng,
  Z as LatLngBounds,
  j as Layer,
  W as LayerGroup,
  x as LineUtil,
  kt as Map,
  rt as Marker,
  h as Mixin,
  vt as Path,
  T as Point,
  b as PolyUtil,
  Tt as Polygon,
  wt as Polyline,
  Q as Popup,
  y as PosAnimation,
  k as Projection,
  Mt as Rectangle,
  ft as Renderer,
  _t as SVG,
  Y as SVGOverlay,
  lt as TileLayer,
  et as Tooltip,
  S as Transformation,
  l as Util,
  $ as VideoOverlay,
  p as bind,
  z as bounds,
  gt as canvas,
  xt as circle,
  Lt as circleMarker,
  o as control,
  at as divIcon,
  _ as extend,
  U as featureGroup,
  N as geoJSON,
  R as geoJson,
  dt as gridLayer,
  ot as icon,
  G as imageOverlay,
  O as latLng,
  A as latLngBounds,
  H as layerGroup,
  St as map,
  ht as marker,
  Bt as noConflict,
  C as point,
  Ct as polygon,
  bt as polyline,
  tt as popup,
  zt as rectangle,
  m as setOptions,
  f as stamp,
  pt as svg,
  J as svgOverlay,
  ut as tileLayer,
  it as tooltip,
  B as transformation,
  i as version,
  K as videoOverlay,
};
