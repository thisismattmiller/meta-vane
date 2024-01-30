/**
* @vue/shared v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function xs(e, t) {
  const s = new Set(e.split(","));
  return t ? (n) => s.has(n.toLowerCase()) : (n) => s.has(n);
}
const K = {}, et = [], he = () => {
}, Tr = () => !1, $t = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ps = (e) => e.startsWith("onUpdate:"), Z = Object.assign, Ss = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, Ir = Object.prototype.hasOwnProperty, L = (e, t) => Ir.call(e, t), O = Array.isArray, tt = (e) => Ht(e) === "[object Map]", Rn = (e) => Ht(e) === "[object Set]", R = (e) => typeof e == "function", Q = (e) => typeof e == "string", it = (e) => typeof e == "symbol", G = (e) => e !== null && typeof e == "object", Tn = (e) => (G(e) || R(e)) && R(e.then) && R(e.catch), In = Object.prototype.toString, Ht = (e) => In.call(e), Mr = (e) => Ht(e).slice(8, -1), Mn = (e) => Ht(e) === "[object Object]", Cs = (e) => Q(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Tt = /* @__PURE__ */ xs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Dt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (s) => t[s] || (t[s] = e(s));
}, Lr = /-(\w)/g, Ae = Dt((e) => e.replace(Lr, (t, s) => s ? s.toUpperCase() : "")), Nr = /\B([A-Z])/g, _e = Dt(
  (e) => e.replace(Nr, "-$1").toLowerCase()
), Ln = Dt((e) => e.charAt(0).toUpperCase() + e.slice(1)), Zt = Dt((e) => e ? `on${Ln(e)}` : ""), Qe = (e, t) => !Object.is(e, t), es = (e, t) => {
  for (let s = 0; s < e.length; s++)
    e[s](t);
}, Nt = (e, t, s) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: s
  });
}, Fr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Js = (e) => {
  const t = Q(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Ys;
const Nn = () => Ys || (Ys = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function We(e) {
  if (O(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], r = Q(n) ? $r(n) : We(n);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (Q(e) || G(e))
    return e;
}
const Ur = /;(?![^(]*\))/g, kr = /:([^]+)/, jr = /\/\*[^]*?\*\//g;
function $r(e) {
  const t = {};
  return e.replace(jr, "").split(Ur).forEach((s) => {
    if (s) {
      const n = s.split(kr);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Os(e) {
  let t = "";
  if (Q(e))
    t = e;
  else if (O(e))
    for (let s = 0; s < e.length; s++) {
      const n = Os(e[s]);
      n && (t += n + " ");
    }
  else if (G(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const Hr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Dr = /* @__PURE__ */ xs(Hr);
function Fn(e) {
  return !!e || e === "";
}
const Me = (e) => Q(e) ? e : e == null ? "" : O(e) || G(e) && (e.toString === In || !R(e.toString)) ? JSON.stringify(e, Un, 2) : String(e), Un = (e, t) => t && t.__v_isRef ? Un(e, t.value) : tt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, r], i) => (s[ts(n, i) + " =>"] = r, s),
    {}
  )
} : Rn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => ts(s))
} : it(t) ? ts(t) : G(t) && !O(t) && !Mn(t) ? String(t) : t, ts = (e, t = "") => {
  var s;
  return it(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e;
};
let ge;
class Vr {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = ge, !t && ge && (this.index = (ge.scopes || (ge.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const s = ge;
      try {
        return ge = this, t();
      } finally {
        ge = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ge = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    ge = this.parent;
  }
  stop(t) {
    if (this._active) {
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++)
        this.effects[s].stop();
      for (s = 0, n = this.cleanups.length; s < n; s++)
        this.cleanups[s]();
      if (this.scopes)
        for (s = 0, n = this.scopes.length; s < n; s++)
          this.scopes[s].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function qr(e, t = ge) {
  t && t.active && t.effects.push(e);
}
function Kr() {
  return ge;
}
let Ge;
class As {
  constructor(t, s, n, r) {
    this.fn = t, this.trigger = s, this.scheduler = n, this.active = !0, this.deps = [], this._dirtyLevel = 2, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, qr(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 1) {
      je();
      for (let t = 0; t < this._depsLength; t++) {
        const s = this.deps[t];
        if (s.computed && (Br(s.computed), this._dirtyLevel >= 2))
          break;
      }
      this._dirtyLevel < 2 && (this._dirtyLevel = 0), $e();
    }
    return this._dirtyLevel >= 2;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 2 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = ke, s = Ge;
    try {
      return ke = !0, Ge = this, this._runnings++, Xs(this), this.fn();
    } finally {
      Zs(this), this._runnings--, Ge = s, ke = t;
    }
  }
  stop() {
    var t;
    this.active && (Xs(this), Zs(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function Br(e) {
  return e.value;
}
function Xs(e) {
  e._trackId++, e._depsLength = 0;
}
function Zs(e) {
  if (e.deps && e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      kn(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function kn(e, t) {
  const s = e.get(t);
  s !== void 0 && t._trackId !== s && (e.delete(t), e.size === 0 && e.cleanup());
}
let ke = !0, us = 0;
const jn = [];
function je() {
  jn.push(ke), ke = !1;
}
function $e() {
  const e = jn.pop();
  ke = e === void 0 ? !0 : e;
}
function Rs() {
  us++;
}
function Ts() {
  for (us--; !us && as.length; )
    as.shift()();
}
function $n(e, t, s) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const n = e.deps[e._depsLength];
    n !== t ? (n && kn(n, e), e.deps[e._depsLength++] = t) : e._depsLength++;
  }
}
const as = [];
function Hn(e, t, s) {
  Rs();
  for (const n of e.keys())
    if (n._dirtyLevel < t && e.get(n) === n._trackId) {
      const r = n._dirtyLevel;
      n._dirtyLevel = t, r === 0 && (n._shouldSchedule = !0, n.trigger());
    }
  Dn(e), Ts();
}
function Dn(e) {
  for (const t of e.keys())
    t.scheduler && t._shouldSchedule && (!t._runnings || t.allowRecurse) && e.get(t) === t._trackId && (t._shouldSchedule = !1, as.push(t.scheduler));
}
const Vn = (e, t) => {
  const s = /* @__PURE__ */ new Map();
  return s.cleanup = e, s.computed = t, s;
}, ds = /* @__PURE__ */ new WeakMap(), ze = Symbol(""), hs = Symbol("");
function ue(e, t, s) {
  if (ke && Ge) {
    let n = ds.get(e);
    n || ds.set(e, n = /* @__PURE__ */ new Map());
    let r = n.get(s);
    r || n.set(s, r = Vn(() => n.delete(s))), $n(
      Ge,
      r
    );
  }
}
function Re(e, t, s, n, r, i) {
  const o = ds.get(e);
  if (!o)
    return;
  let c = [];
  if (t === "clear")
    c = [...o.values()];
  else if (s === "length" && O(e)) {
    const u = Number(n);
    o.forEach((a, h) => {
      (h === "length" || !it(h) && h >= u) && c.push(a);
    });
  } else
    switch (s !== void 0 && c.push(o.get(s)), t) {
      case "add":
        O(e) ? Cs(s) && c.push(o.get("length")) : (c.push(o.get(ze)), tt(e) && c.push(o.get(hs)));
        break;
      case "delete":
        O(e) || (c.push(o.get(ze)), tt(e) && c.push(o.get(hs)));
        break;
      case "set":
        tt(e) && c.push(o.get(ze));
        break;
    }
  Rs();
  for (const u of c)
    u && Hn(
      u,
      2
    );
  Ts();
}
const Wr = /* @__PURE__ */ xs("__proto__,__v_isRef,__isVue"), qn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(it)
), en = /* @__PURE__ */ Gr();
function Gr() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...s) {
      const n = F(this);
      for (let i = 0, o = this.length; i < o; i++)
        ue(n, "get", i + "");
      const r = n[t](...s);
      return r === -1 || r === !1 ? n[t](...s.map(F)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...s) {
      je(), Rs();
      const n = F(this)[t].apply(this, s);
      return Ts(), $e(), n;
    };
  }), e;
}
function zr(e) {
  const t = F(this);
  return ue(t, "has", e), t.hasOwnProperty(e);
}
class Kn {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._shallow = s;
  }
  get(t, s, n) {
    const r = this._isReadonly, i = this._shallow;
    if (s === "__v_isReactive")
      return !r;
    if (s === "__v_isReadonly")
      return r;
    if (s === "__v_isShallow")
      return i;
    if (s === "__v_raw")
      return n === (r ? i ? li : zn : i ? Gn : Wn).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const o = O(t);
    if (!r) {
      if (o && L(en, s))
        return Reflect.get(en, s, n);
      if (s === "hasOwnProperty")
        return zr;
    }
    const c = Reflect.get(t, s, n);
    return (it(s) ? qn.has(s) : Wr(s)) || (r || ue(t, "get", s), i) ? c : ae(c) ? o && Cs(s) ? c : c.value : G(c) ? r ? Qn(c) : Ls(c) : c;
  }
}
class Bn extends Kn {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, r) {
    let i = t[s];
    if (!this._shallow) {
      const u = gt(i);
      if (!ps(n) && !gt(n) && (i = F(i), n = F(n)), !O(t) && ae(i) && !ae(n))
        return u ? !1 : (i.value = n, !0);
    }
    const o = O(t) && Cs(s) ? Number(s) < t.length : L(t, s), c = Reflect.set(t, s, n, r);
    return t === F(r) && (o ? Qe(n, i) && Re(t, "set", s, n) : Re(t, "add", s, n)), c;
  }
  deleteProperty(t, s) {
    const n = L(t, s);
    t[s];
    const r = Reflect.deleteProperty(t, s);
    return r && n && Re(t, "delete", s, void 0), r;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!it(s) || !qn.has(s)) && ue(t, "has", s), n;
  }
  ownKeys(t) {
    return ue(
      t,
      "iterate",
      O(t) ? "length" : ze
    ), Reflect.ownKeys(t);
  }
}
class Qr extends Kn {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const Jr = /* @__PURE__ */ new Bn(), Yr = /* @__PURE__ */ new Qr(), Xr = /* @__PURE__ */ new Bn(
  !0
), Is = (e) => e, Vt = (e) => Reflect.getPrototypeOf(e);
function Pt(e, t, s = !1, n = !1) {
  e = e.__v_raw;
  const r = F(e), i = F(t);
  s || (Qe(t, i) && ue(r, "get", t), ue(r, "get", i));
  const { has: o } = Vt(r), c = n ? Is : s ? Us : Fs;
  if (o.call(r, t))
    return c(e.get(t));
  if (o.call(r, i))
    return c(e.get(i));
  e !== r && e.get(t);
}
function St(e, t = !1) {
  const s = this.__v_raw, n = F(s), r = F(e);
  return t || (Qe(e, r) && ue(n, "has", e), ue(n, "has", r)), e === r ? s.has(e) : s.has(e) || s.has(r);
}
function Ct(e, t = !1) {
  return e = e.__v_raw, !t && ue(F(e), "iterate", ze), Reflect.get(e, "size", e);
}
function tn(e) {
  e = F(e);
  const t = F(this);
  return Vt(t).has.call(t, e) || (t.add(e), Re(t, "add", e, e)), this;
}
function sn(e, t) {
  t = F(t);
  const s = F(this), { has: n, get: r } = Vt(s);
  let i = n.call(s, e);
  i || (e = F(e), i = n.call(s, e));
  const o = r.call(s, e);
  return s.set(e, t), i ? Qe(t, o) && Re(s, "set", e, t) : Re(s, "add", e, t), this;
}
function nn(e) {
  const t = F(this), { has: s, get: n } = Vt(t);
  let r = s.call(t, e);
  r || (e = F(e), r = s.call(t, e)), n && n.call(t, e);
  const i = t.delete(e);
  return r && Re(t, "delete", e, void 0), i;
}
function rn() {
  const e = F(this), t = e.size !== 0, s = e.clear();
  return t && Re(e, "clear", void 0, void 0), s;
}
function Ot(e, t) {
  return function(n, r) {
    const i = this, o = i.__v_raw, c = F(o), u = t ? Is : e ? Us : Fs;
    return !e && ue(c, "iterate", ze), o.forEach((a, h) => n.call(r, u(a), u(h), i));
  };
}
function At(e, t, s) {
  return function(...n) {
    const r = this.__v_raw, i = F(r), o = tt(i), c = e === "entries" || e === Symbol.iterator && o, u = e === "keys" && o, a = r[e](...n), h = s ? Is : t ? Us : Fs;
    return !t && ue(
      i,
      "iterate",
      u ? hs : ze
    ), {
      // iterator protocol
      next() {
        const { value: b, done: v } = a.next();
        return v ? { value: b, done: v } : {
          value: c ? [h(b[0]), h(b[1])] : h(b),
          done: v
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Le(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Zr() {
  const e = {
    get(i) {
      return Pt(this, i);
    },
    get size() {
      return Ct(this);
    },
    has: St,
    add: tn,
    set: sn,
    delete: nn,
    clear: rn,
    forEach: Ot(!1, !1)
  }, t = {
    get(i) {
      return Pt(this, i, !1, !0);
    },
    get size() {
      return Ct(this);
    },
    has: St,
    add: tn,
    set: sn,
    delete: nn,
    clear: rn,
    forEach: Ot(!1, !0)
  }, s = {
    get(i) {
      return Pt(this, i, !0);
    },
    get size() {
      return Ct(this, !0);
    },
    has(i) {
      return St.call(this, i, !0);
    },
    add: Le("add"),
    set: Le("set"),
    delete: Le("delete"),
    clear: Le("clear"),
    forEach: Ot(!0, !1)
  }, n = {
    get(i) {
      return Pt(this, i, !0, !0);
    },
    get size() {
      return Ct(this, !0);
    },
    has(i) {
      return St.call(this, i, !0);
    },
    add: Le("add"),
    set: Le("set"),
    delete: Le("delete"),
    clear: Le("clear"),
    forEach: Ot(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    e[i] = At(
      i,
      !1,
      !1
    ), s[i] = At(
      i,
      !0,
      !1
    ), t[i] = At(
      i,
      !1,
      !0
    ), n[i] = At(
      i,
      !0,
      !0
    );
  }), [
    e,
    s,
    t,
    n
  ];
}
const [
  ei,
  ti,
  si,
  ni
] = /* @__PURE__ */ Zr();
function Ms(e, t) {
  const s = t ? e ? ni : si : e ? ti : ei;
  return (n, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? n : Reflect.get(
    L(s, r) && r in n ? s : n,
    r,
    i
  );
}
const ri = {
  get: /* @__PURE__ */ Ms(!1, !1)
}, ii = {
  get: /* @__PURE__ */ Ms(!1, !0)
}, oi = {
  get: /* @__PURE__ */ Ms(!0, !1)
}, Wn = /* @__PURE__ */ new WeakMap(), Gn = /* @__PURE__ */ new WeakMap(), zn = /* @__PURE__ */ new WeakMap(), li = /* @__PURE__ */ new WeakMap();
function ci(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function fi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ci(Mr(e));
}
function Ls(e) {
  return gt(e) ? e : Ns(
    e,
    !1,
    Jr,
    ri,
    Wn
  );
}
function ui(e) {
  return Ns(
    e,
    !1,
    Xr,
    ii,
    Gn
  );
}
function Qn(e) {
  return Ns(
    e,
    !0,
    Yr,
    oi,
    zn
  );
}
function Ns(e, t, s, n, r) {
  if (!G(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const o = fi(e);
  if (o === 0)
    return e;
  const c = new Proxy(
    e,
    o === 2 ? n : s
  );
  return r.set(e, c), c;
}
function st(e) {
  return gt(e) ? st(e.__v_raw) : !!(e && e.__v_isReactive);
}
function gt(e) {
  return !!(e && e.__v_isReadonly);
}
function ps(e) {
  return !!(e && e.__v_isShallow);
}
function Jn(e) {
  return st(e) || gt(e);
}
function F(e) {
  const t = e && e.__v_raw;
  return t ? F(t) : e;
}
function Yn(e) {
  return Nt(e, "__v_skip", !0), e;
}
const Fs = (e) => G(e) ? Ls(e) : e, Us = (e) => G(e) ? Qn(e) : e;
class Xn {
  constructor(t, s, n, r) {
    this._setter = s, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new As(
      () => t(this._value),
      () => ss(this, 1),
      () => this.dep && Dn(this.dep)
    ), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = n;
  }
  get value() {
    const t = F(this);
    return (!t._cacheable || t.effect.dirty) && Qe(t._value, t._value = t.effect.run()) && ss(t, 2), di(t), t.effect._dirtyLevel >= 1 && ss(t, 1), t._value;
  }
  set value(t) {
    this._setter(t);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(t) {
    this.effect.dirty = t;
  }
  // #endregion
}
function ai(e, t, s = !1) {
  let n, r;
  const i = R(e);
  return i ? (n = e, r = he) : (n = e.get, r = e.set), new Xn(n, r, i || !r, s);
}
function di(e) {
  ke && Ge && (e = F(e), $n(
    Ge,
    e.dep || (e.dep = Vn(
      () => e.dep = void 0,
      e instanceof Xn ? e : void 0
    ))
  ));
}
function ss(e, t = 2, s) {
  e = F(e);
  const n = e.dep;
  n && Hn(
    n,
    t
  );
}
function ae(e) {
  return !!(e && e.__v_isRef === !0);
}
function hi(e) {
  return ae(e) ? e.value : e;
}
const pi = {
  get: (e, t, s) => hi(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const r = e[t];
    return ae(r) && !ae(s) ? (r.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function Zn(e) {
  return st(e) ? e : new Proxy(e, pi);
}
var at = { NVM_INC: "/Users/m/.nvm/versions/node/v21.6.1/include/node", MANPATH: "/Users/m/.nvm/versions/node/v21.6.1/share/man:/opt/homebrew/share/man::", TERM_PROGRAM: "Apple_Terminal", NODE: "/Users/m/.nvm/versions/node/v21.6.1/bin/node", INIT_CWD: "/Users/m/git/vanes", NVM_CD_FLAGS: "-q", TERM: "xterm-256color", SHELL: "/bin/zsh", TMPDIR: "/var/folders/1c/qr7bgjdn3hz9fppd23ymv2tm0000gn/T/", HOMEBREW_REPOSITORY: "/opt/homebrew", npm_config_global_prefix: "/Users/m/.nvm/versions/node/v21.6.1", TERM_PROGRAM_VERSION: "452", COLOR: "1", TERM_SESSION_ID: "5E71E15C-54C8-4D19-8AAD-192283EEFF8F", npm_config_noproxy: "", npm_config_local_prefix: "/Users/m/git/vanes", NVM_DIR: "/Users/m/.nvm", USER: "m", npm_config_globalconfig: "/Users/m/.nvm/versions/node/v21.6.1/etc/npmrc", SSH_AUTH_SOCK: "/private/tmp/com.apple.launchd.ysjcfoGbom/Listeners", __CF_USER_TEXT_ENCODING: "0x1F5:0x0:0x0", npm_execpath: "/Users/m/.nvm/versions/node/v21.6.1/lib/node_modules/npm/bin/npm-cli.js", PATH: "/Users/m/git/vanes/node_modules/.bin:/Users/m/git/node_modules/.bin:/Users/m/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/Users/m/.nvm/versions/node/v21.6.1/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/Users/m/.nvm/versions/node/v21.6.1/bin:/Library/Frameworks/Python.framework/Versions/3.9/bin:/Library/Frameworks/Python.framework/Versions/3.11/bin:/Library/Frameworks/Python.framework/Versions/3.12/bin:/Applications/Sublime Text.app/Contents/SharedSupport/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin", npm_package_json: "/Users/m/git/vanes/package.json", _: "/Users/m/git/vanes/node_modules/.bin/vite", LaunchInstanceID: "D1B7D956-4E4E-47D9-92C5-65E084B028E5", npm_config_userconfig: "/Users/m/.npmrc", npm_config_init_module: "/Users/m/.npm-init.js", __CFBundleIdentifier: "com.apple.Terminal", npm_command: "run-script", PWD: "/Users/m/git/vanes", npm_lifecycle_event: "build", EDITOR: "vi", npm_package_name: "vanes", LANG: "en_US.UTF-8", npm_config_npm_version: "10.2.4", XPC_FLAGS: "0x0", npm_config_node_gyp: "/Users/m/.nvm/versions/node/v21.6.1/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js", npm_package_version: "0.1.0", XPC_SERVICE_NAME: "0", HOME: "/Users/m", SHLVL: "2", HOMEBREW_PREFIX: "/opt/homebrew", npm_config_cache: "/Users/m/.npm", LOGNAME: "m", npm_lifecycle_script: "vite build", NVM_BIN: "/Users/m/.nvm/versions/node/v21.6.1/bin", npm_config_user_agent: "npm/10.2.4 node/v21.6.1 darwin arm64 workspaces/false", INFOPATH: "/opt/homebrew/share/info:", HOMEBREW_CELLAR: "/opt/homebrew/Cellar", SECURITYSESSIONID: "186ac", npm_node_execpath: "/Users/m/.nvm/versions/node/v21.6.1/bin/node", npm_config_prefix: "/Users/m/.nvm/versions/node/v21.6.1", NODE_ENV: "production" };
const dt = [];
function mi(e, ...t) {
  je();
  const s = dt.length ? dt[dt.length - 1].component : null, n = s && s.appContext.config.warnHandler, r = gi();
  if (n)
    Te(
      n,
      s,
      11,
      [
        e + t.join(""),
        s && s.proxy,
        r.map(
          ({ vnode: i }) => `at <${Or(s, i.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const i = [`[Vue warn]: ${e}`, ...t];
    r.length && i.push(`
`, ..._i(r)), console.warn(...i);
  }
  $e();
}
function gi() {
  let e = dt[dt.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const s = t[0];
    s && s.vnode === e ? s.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const n = e.component && e.component.parent;
    e = n && n.vnode;
  }
  return t;
}
function _i(e) {
  const t = [];
  return e.forEach((s, n) => {
    t.push(...n === 0 ? [] : [`
`], ...bi(s));
  }), t;
}
function bi({ vnode: e, recurseCount: t }) {
  const s = t > 0 ? `... (${t} recursive calls)` : "", n = e.component ? e.component.parent == null : !1, r = ` at <${Or(
    e.component,
    e.type,
    n
  )}`, i = ">" + s;
  return e.props ? [r, ...yi(e.props), i] : [r + i];
}
function yi(e) {
  const t = [], s = Object.keys(e);
  return s.slice(0, 3).forEach((n) => {
    t.push(...er(n, e[n]));
  }), s.length > 3 && t.push(" ..."), t;
}
function er(e, t, s) {
  return Q(t) ? (t = JSON.stringify(t), s ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? s ? t : [`${e}=${t}`] : ae(t) ? (t = er(e, F(t.value), !0), s ? t : [`${e}=Ref<`, t, ">"]) : R(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = F(t), s ? t : [`${e}=`, t]);
}
function Te(e, t, s, n) {
  let r;
  try {
    r = n ? e(...n) : e();
  } catch (i) {
    qt(i, t, s);
  }
  return r;
}
function ye(e, t, s, n) {
  if (R(e)) {
    const i = Te(e, t, s, n);
    return i && Tn(i) && i.catch((o) => {
      qt(o, t, s);
    }), i;
  }
  const r = [];
  for (let i = 0; i < e.length; i++)
    r.push(ye(e[i], t, s, n));
  return r;
}
function qt(e, t, s, n = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const o = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; i; ) {
      const a = i.ec;
      if (a) {
        for (let h = 0; h < a.length; h++)
          if (a[h](e, o, c) === !1)
            return;
      }
      i = i.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Te(
        u,
        null,
        10,
        [e, o, c]
      );
      return;
    }
  }
  wi(e, s, r, n);
}
function wi(e, t, s, n = !0) {
  console.error(e);
}
let _t = !1, ms = !1;
const se = [];
let Pe = 0;
const nt = [];
let Ne = null, Be = 0;
const tr = /* @__PURE__ */ Promise.resolve();
let ks = null;
function sr(e) {
  const t = ks || tr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function vi(e) {
  let t = Pe + 1, s = se.length;
  for (; t < s; ) {
    const n = t + s >>> 1, r = se[n], i = bt(r);
    i < e || i === e && r.pre ? t = n + 1 : s = n;
  }
  return t;
}
function js(e) {
  (!se.length || !se.includes(
    e,
    _t && e.allowRecurse ? Pe + 1 : Pe
  )) && (e.id == null ? se.push(e) : se.splice(vi(e.id), 0, e), nr());
}
function nr() {
  !_t && !ms && (ms = !0, ks = tr.then(ir));
}
function Ei(e) {
  const t = se.indexOf(e);
  t > Pe && se.splice(t, 1);
}
function xi(e) {
  O(e) ? nt.push(...e) : (!Ne || !Ne.includes(
    e,
    e.allowRecurse ? Be + 1 : Be
  )) && nt.push(e), nr();
}
function on(e, t, s = _t ? Pe + 1 : 0) {
  for (; s < se.length; s++) {
    const n = se[s];
    if (n && n.pre) {
      if (e && n.id !== e.uid)
        continue;
      se.splice(s, 1), s--, n();
    }
  }
}
function rr(e) {
  if (nt.length) {
    const t = [...new Set(nt)].sort(
      (s, n) => bt(s) - bt(n)
    );
    if (nt.length = 0, Ne) {
      Ne.push(...t);
      return;
    }
    for (Ne = t, Be = 0; Be < Ne.length; Be++)
      Ne[Be]();
    Ne = null, Be = 0;
  }
}
const bt = (e) => e.id == null ? 1 / 0 : e.id, Pi = (e, t) => {
  const s = bt(e) - bt(t);
  if (s === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return s;
};
function ir(e) {
  ms = !1, _t = !0, se.sort(Pi);
  const t = he;
  try {
    for (Pe = 0; Pe < se.length; Pe++) {
      const s = se[Pe];
      s && s.active !== !1 && (at.NODE_ENV !== "production" && t(s), Te(s, null, 14));
    }
  } finally {
    Pe = 0, se.length = 0, rr(), _t = !1, ks = null, (se.length || nt.length) && ir();
  }
}
function Si(e, t, ...s) {
  if (e.isUnmounted)
    return;
  const n = e.vnode.props || K;
  let r = s;
  const i = t.startsWith("update:"), o = i && t.slice(7);
  if (o && o in n) {
    const h = `${o === "modelValue" ? "model" : o}Modifiers`, { number: b, trim: v } = n[h] || K;
    v && (r = s.map((C) => Q(C) ? C.trim() : C)), b && (r = s.map(Fr));
  }
  let c, u = n[c = Zt(t)] || // also try camelCase event handler (#2249)
  n[c = Zt(Ae(t))];
  !u && i && (u = n[c = Zt(_e(t))]), u && ye(
    u,
    e,
    6,
    r
  );
  const a = n[c + "Once"];
  if (a) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[c])
      return;
    e.emitted[c] = !0, ye(
      a,
      e,
      6,
      r
    );
  }
}
function or(e, t, s = !1) {
  const n = t.emitsCache, r = n.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, c = !1;
  if (!R(e)) {
    const u = (a) => {
      const h = or(a, t, !0);
      h && (c = !0, Z(o, h));
    };
    !s && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !i && !c ? (G(e) && n.set(e, null), null) : (O(i) ? i.forEach((u) => o[u] = null) : Z(o, i), G(e) && n.set(e, o), o);
}
function Kt(e, t) {
  return !e || !$t(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), L(e, t[0].toLowerCase() + t.slice(1)) || L(e, _e(t)) || L(e, t));
}
let Se = null, lr = null;
function Ft(e) {
  const t = Se;
  return Se = e, lr = e && e.type.__scopeId || null, t;
}
function Ci(e, t = Se, s) {
  if (!t || e._n)
    return e;
  const n = (...r) => {
    n._d && gn(-1);
    const i = Ft(t);
    let o;
    try {
      o = e(...r);
    } finally {
      Ft(i), n._d && gn(1);
    }
    return o;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function ns(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: r,
    props: i,
    propsOptions: [o],
    slots: c,
    attrs: u,
    emit: a,
    render: h,
    renderCache: b,
    data: v,
    setupState: C,
    ctx: j,
    inheritAttrs: M
  } = e;
  let $, B;
  const Y = Ft(e);
  try {
    if (s.shapeFlag & 4) {
      const D = r || n, ne = at.NODE_ENV !== "production" && C.__isScriptSetup ? new Proxy(D, {
        get(I, te, le) {
          return mi(
            `Property '${String(
              te
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(I, te, le);
        }
      }) : D;
      $ = xe(
        h.call(
          ne,
          D,
          b,
          i,
          C,
          v,
          j
        )
      ), B = u;
    } else {
      const D = t;
      at.NODE_ENV, $ = xe(
        D.length > 1 ? D(
          i,
          at.NODE_ENV !== "production" ? {
            get attrs() {
              return u;
            },
            slots: c,
            emit: a
          } : { attrs: u, slots: c, emit: a }
        ) : D(
          i,
          null
          /* we know it doesn't need it */
        )
      ), B = t.props ? u : Oi(u);
    }
  } catch (D) {
    pt.length = 0, qt(D, e, 1), $ = Ce(Je);
  }
  let N = $;
  if (B && M !== !1) {
    const D = Object.keys(B), { shapeFlag: ne } = N;
    D.length && ne & 7 && (o && D.some(Ps) && (B = Ai(
      B,
      o
    )), N = rt(N, B));
  }
  return s.dirs && (N = rt(N), N.dirs = N.dirs ? N.dirs.concat(s.dirs) : s.dirs), s.transition && (N.transition = s.transition), $ = N, Ft(Y), $;
}
const Oi = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || $t(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, Ai = (e, t) => {
  const s = {};
  for (const n in e)
    (!Ps(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function Ri(e, t, s) {
  const { props: n, children: r, component: i } = e, { props: o, children: c, patchFlag: u } = t, a = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return n ? ln(n, o, a) : !!o;
    if (u & 8) {
      const h = t.dynamicProps;
      for (let b = 0; b < h.length; b++) {
        const v = h[b];
        if (o[v] !== n[v] && !Kt(a, v))
          return !0;
      }
    }
  } else
    return (r || c) && (!c || !c.$stable) ? !0 : n === o ? !1 : n ? o ? ln(n, o, a) : !0 : !!o;
  return !1;
}
function ln(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < n.length; r++) {
    const i = n[r];
    if (t[i] !== e[i] && !Kt(s, i))
      return !0;
  }
  return !1;
}
function Ti({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const Ii = Symbol.for("v-ndc"), Mi = (e) => e.__isSuspense;
function Li(e, t) {
  t && t.pendingBranch ? O(e) ? t.effects.push(...e) : t.effects.push(e) : xi(e);
}
const Ni = Symbol.for("v-scx"), Fi = () => Mt(Ni), Rt = {};
function rs(e, t, s) {
  return cr(e, t, s);
}
function cr(e, t, {
  immediate: s,
  deep: n,
  flush: r,
  once: i,
  onTrack: o,
  onTrigger: c
} = K) {
  if (t && i) {
    const I = t;
    t = (...te) => {
      I(...te), ne();
    };
  }
  const u = ee, a = (I) => n === !0 ? I : (
    // for deep: false, only traverse root-level properties
    Ze(I, n === !1 ? 1 : void 0)
  );
  let h, b = !1, v = !1;
  if (ae(e) ? (h = () => e.value, b = ps(e)) : st(e) ? (h = () => a(e), b = !0) : O(e) ? (v = !0, b = e.some((I) => st(I) || ps(I)), h = () => e.map((I) => {
    if (ae(I))
      return I.value;
    if (st(I))
      return a(I);
    if (R(I))
      return Te(I, u, 2);
  })) : R(e) ? t ? h = () => Te(e, u, 2) : h = () => (C && C(), ye(
    e,
    u,
    3,
    [j]
  )) : h = he, t && n) {
    const I = h;
    h = () => Ze(I());
  }
  let C, j = (I) => {
    C = N.onStop = () => {
      Te(I, u, 4), C = N.onStop = void 0;
    };
  }, M;
  if (zt)
    if (j = he, t ? s && ye(t, u, 3, [
      h(),
      v ? [] : void 0,
      j
    ]) : h(), r === "sync") {
      const I = Fi();
      M = I.__watcherHandles || (I.__watcherHandles = []);
    } else
      return he;
  let $ = v ? new Array(e.length).fill(Rt) : Rt;
  const B = () => {
    if (!(!N.active || !N.dirty))
      if (t) {
        const I = N.run();
        (n || b || (v ? I.some((te, le) => Qe(te, $[le])) : Qe(I, $))) && (C && C(), ye(t, u, 3, [
          I,
          // pass undefined as the old value when it's changed for the first time
          $ === Rt ? void 0 : v && $[0] === Rt ? [] : $,
          j
        ]), $ = I);
      } else
        N.run();
  };
  B.allowRecurse = !!t;
  let Y;
  r === "sync" ? Y = B : r === "post" ? Y = () => fe(B, u && u.suspense) : (B.pre = !0, u && (B.id = u.uid), Y = () => js(B));
  const N = new As(h, he, Y), D = Kr(), ne = () => {
    N.stop(), D && Ss(D.effects, N);
  };
  return t ? s ? B() : $ = N.run() : r === "post" ? fe(
    N.run.bind(N),
    u && u.suspense
  ) : N.run(), M && M.push(ne), ne;
}
function Ui(e, t, s) {
  const n = this.proxy, r = Q(e) ? e.includes(".") ? fr(n, e) : () => n[e] : e.bind(n, n);
  let i;
  R(t) ? i = t : (i = t.handler, s = t);
  const o = wt(this), c = cr(r, i.bind(n), s);
  return o(), c;
}
function fr(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let r = 0; r < s.length && n; r++)
      n = n[s[r]];
    return n;
  };
}
function Ze(e, t, s = 0, n) {
  if (!G(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (s >= t)
      return e;
    s++;
  }
  if (n = n || /* @__PURE__ */ new Set(), n.has(e))
    return e;
  if (n.add(e), ae(e))
    Ze(e.value, t, s, n);
  else if (O(e))
    for (let r = 0; r < e.length; r++)
      Ze(e[r], t, s, n);
  else if (Rn(e) || tt(e))
    e.forEach((r) => {
      Ze(r, t, s, n);
    });
  else if (Mn(e))
    for (const r in e)
      Ze(e[r], t, s, n);
  return e;
}
function qe(e, t, s, n) {
  const r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const c = r[o];
    i && (c.oldValue = i[o].value);
    let u = c.dir[n];
    u && (je(), ye(u, s, 8, [
      e.el,
      c,
      e,
      t
    ]), $e());
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ki(e, t) {
  return R(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Z({ name: e.name }, t, { setup: e })
  ) : e;
}
const It = (e) => !!e.type.__asyncLoader, ur = (e) => e.type.__isKeepAlive;
function ji(e, t) {
  ar(e, "a", t);
}
function $i(e, t) {
  ar(e, "da", t);
}
function ar(e, t, s = ee) {
  const n = e.__wdc || (e.__wdc = () => {
    let r = s;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Bt(t, n, s), s) {
    let r = s.parent;
    for (; r && r.parent; )
      ur(r.parent.vnode) && Hi(n, t, s, r), r = r.parent;
  }
}
function Hi(e, t, s, n) {
  const r = Bt(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  dr(() => {
    Ss(n[t], r);
  }, s);
}
function Bt(e, t, s = ee, n = !1) {
  if (s) {
    const r = s[e] || (s[e] = []), i = t.__weh || (t.__weh = (...o) => {
      if (s.isUnmounted)
        return;
      je();
      const c = wt(s), u = ye(t, s, e, o);
      return c(), $e(), u;
    });
    return n ? r.unshift(i) : r.push(i), i;
  }
}
const Ie = (e) => (t, s = ee) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!zt || e === "sp") && Bt(e, (...n) => t(...n), s)
), Di = Ie("bm"), Vi = Ie("m"), qi = Ie("bu"), Ki = Ie("u"), Bi = Ie("bum"), dr = Ie("um"), Wi = Ie("sp"), Gi = Ie(
  "rtg"
), zi = Ie(
  "rtc"
);
function Qi(e, t = ee) {
  Bt("ec", e, t);
}
function lt(e, t, s, n) {
  let r;
  const i = s && s[n];
  if (O(e) || Q(e)) {
    r = new Array(e.length);
    for (let o = 0, c = e.length; o < c; o++)
      r[o] = t(e[o], o, void 0, i && i[o]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let o = 0; o < e; o++)
      r[o] = t(o + 1, o, void 0, i && i[o]);
  } else if (G(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (o, c) => t(o, c, void 0, i && i[c])
      );
    else {
      const o = Object.keys(e);
      r = new Array(o.length);
      for (let c = 0, u = o.length; c < u; c++) {
        const a = o[c];
        r[c] = t(e[a], a, c, i && i[c]);
      }
    }
  else
    r = [];
  return s && (s[n] = r), r;
}
const gs = (e) => e ? Sr(e) ? Vs(e) || e.proxy : gs(e.parent) : null, ht = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Z(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => gs(e.parent),
    $root: (e) => gs(e.root),
    $emit: (e) => e.emit,
    $options: (e) => $s(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, js(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = sr.bind(e.proxy)),
    $watch: (e) => Ui.bind(e)
  })
), is = (e, t) => e !== K && !e.__isScriptSetup && L(e, t), Ji = {
  get({ _: e }, t) {
    const { ctx: s, setupState: n, data: r, props: i, accessCache: o, type: c, appContext: u } = e;
    let a;
    if (t[0] !== "$") {
      const C = o[t];
      if (C !== void 0)
        switch (C) {
          case 1:
            return n[t];
          case 2:
            return r[t];
          case 4:
            return s[t];
          case 3:
            return i[t];
        }
      else {
        if (is(n, t))
          return o[t] = 1, n[t];
        if (r !== K && L(r, t))
          return o[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (a = e.propsOptions[0]) && L(a, t)
        )
          return o[t] = 3, i[t];
        if (s !== K && L(s, t))
          return o[t] = 4, s[t];
        _s && (o[t] = 0);
      }
    }
    const h = ht[t];
    let b, v;
    if (h)
      return t === "$attrs" && ue(e, "get", t), h(e);
    if (
      // css module (injected by vue-loader)
      (b = c.__cssModules) && (b = b[t])
    )
      return b;
    if (s !== K && L(s, t))
      return o[t] = 4, s[t];
    if (
      // global properties
      v = u.config.globalProperties, L(v, t)
    )
      return v[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: r, ctx: i } = e;
    return is(r, t) ? (r[t] = s, !0) : n !== K && L(n, t) ? (n[t] = s, !0) : L(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: r, propsOptions: i }
  }, o) {
    let c;
    return !!s[o] || e !== K && L(e, o) || is(t, o) || (c = i[0]) && L(c, o) || L(n, o) || L(ht, o) || L(r.config.globalProperties, o);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : L(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function cn(e) {
  return O(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let _s = !0;
function Yi(e) {
  const t = $s(e), s = e.proxy, n = e.ctx;
  _s = !1, t.beforeCreate && fn(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: i,
    methods: o,
    watch: c,
    provide: u,
    inject: a,
    // lifecycle
    created: h,
    beforeMount: b,
    mounted: v,
    beforeUpdate: C,
    updated: j,
    activated: M,
    deactivated: $,
    beforeDestroy: B,
    beforeUnmount: Y,
    destroyed: N,
    unmounted: D,
    render: ne,
    renderTracked: I,
    renderTriggered: te,
    errorCaptured: le,
    serverPrefetch: re,
    // public API
    expose: J,
    inheritAttrs: ce,
    // assets
    components: He,
    directives: vt,
    filters: Qt
  } = t;
  if (a && Xi(a, n, null), o)
    for (const W in o) {
      const V = o[W];
      R(V) && (n[W] = V.bind(s));
    }
  if (r) {
    const W = r.call(s, s);
    G(W) && (e.data = Ls(W));
  }
  if (_s = !0, i)
    for (const W in i) {
      const V = i[W], De = R(V) ? V.bind(s, s) : R(V.get) ? V.get.bind(s, s) : he, Et = !R(V) && R(V.set) ? V.set.bind(s) : he, Ve = Lo({
        get: De,
        set: Et
      });
      Object.defineProperty(n, W, {
        enumerable: !0,
        configurable: !0,
        get: () => Ve.value,
        set: (we) => Ve.value = we
      });
    }
  if (c)
    for (const W in c)
      hr(c[W], n, s, W);
  if (u) {
    const W = R(u) ? u.call(s) : u;
    Reflect.ownKeys(W).forEach((V) => {
      ro(V, W[V]);
    });
  }
  h && fn(h, e, "c");
  function ie(W, V) {
    O(V) ? V.forEach((De) => W(De.bind(s))) : V && W(V.bind(s));
  }
  if (ie(Di, b), ie(Vi, v), ie(qi, C), ie(Ki, j), ie(ji, M), ie($i, $), ie(Qi, le), ie(zi, I), ie(Gi, te), ie(Bi, Y), ie(dr, D), ie(Wi, re), O(J))
    if (J.length) {
      const W = e.exposed || (e.exposed = {});
      J.forEach((V) => {
        Object.defineProperty(W, V, {
          get: () => s[V],
          set: (De) => s[V] = De
        });
      });
    } else
      e.exposed || (e.exposed = {});
  ne && e.render === he && (e.render = ne), ce != null && (e.inheritAttrs = ce), He && (e.components = He), vt && (e.directives = vt);
}
function Xi(e, t, s = he) {
  O(e) && (e = bs(e));
  for (const n in e) {
    const r = e[n];
    let i;
    G(r) ? "default" in r ? i = Mt(
      r.from || n,
      r.default,
      !0
    ) : i = Mt(r.from || n) : i = Mt(r), ae(i) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[n] = i;
  }
}
function fn(e, t, s) {
  ye(
    O(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function hr(e, t, s, n) {
  const r = n.includes(".") ? fr(s, n) : () => s[n];
  if (Q(e)) {
    const i = t[e];
    R(i) && rs(r, i);
  } else if (R(e))
    rs(r, e.bind(s));
  else if (G(e))
    if (O(e))
      e.forEach((i) => hr(i, t, s, n));
    else {
      const i = R(e.handler) ? e.handler.bind(s) : t[e.handler];
      R(i) && rs(r, i, e);
    }
}
function $s(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, c = i.get(t);
  let u;
  return c ? u = c : !r.length && !s && !n ? u = t : (u = {}, r.length && r.forEach(
    (a) => Ut(u, a, o, !0)
  ), Ut(u, t, o)), G(t) && i.set(t, u), u;
}
function Ut(e, t, s, n = !1) {
  const { mixins: r, extends: i } = t;
  i && Ut(e, i, s, !0), r && r.forEach(
    (o) => Ut(e, o, s, !0)
  );
  for (const o in t)
    if (!(n && o === "expose")) {
      const c = Zi[o] || s && s[o];
      e[o] = c ? c(e[o], t[o]) : t[o];
    }
  return e;
}
const Zi = {
  data: un,
  props: an,
  emits: an,
  // objects
  methods: ut,
  computed: ut,
  // lifecycle
  beforeCreate: oe,
  created: oe,
  beforeMount: oe,
  mounted: oe,
  beforeUpdate: oe,
  updated: oe,
  beforeDestroy: oe,
  beforeUnmount: oe,
  destroyed: oe,
  unmounted: oe,
  activated: oe,
  deactivated: oe,
  errorCaptured: oe,
  serverPrefetch: oe,
  // assets
  components: ut,
  directives: ut,
  // watch
  watch: to,
  // provide / inject
  provide: un,
  inject: eo
};
function un(e, t) {
  return t ? e ? function() {
    return Z(
      R(e) ? e.call(this, this) : e,
      R(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function eo(e, t) {
  return ut(bs(e), bs(t));
}
function bs(e) {
  if (O(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function oe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ut(e, t) {
  return e ? Z(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function an(e, t) {
  return e ? O(e) && O(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Z(
    /* @__PURE__ */ Object.create(null),
    cn(e),
    cn(t ?? {})
  ) : t;
}
function to(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const s = Z(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = oe(e[n], t[n]);
  return s;
}
function pr() {
  return {
    app: null,
    config: {
      isNativeTag: Tr,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let so = 0;
function no(e, t) {
  return function(n, r = null) {
    R(n) || (n = Z({}, n)), r != null && !G(r) && (r = null);
    const i = pr(), o = /* @__PURE__ */ new WeakSet();
    let c = !1;
    const u = i.app = {
      _uid: so++,
      _component: n,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: No,
      get config() {
        return i.config;
      },
      set config(a) {
      },
      use(a, ...h) {
        return o.has(a) || (a && R(a.install) ? (o.add(a), a.install(u, ...h)) : R(a) && (o.add(a), a(u, ...h))), u;
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), u;
      },
      component(a, h) {
        return h ? (i.components[a] = h, u) : i.components[a];
      },
      directive(a, h) {
        return h ? (i.directives[a] = h, u) : i.directives[a];
      },
      mount(a, h, b) {
        if (!c) {
          const v = Ce(n, r);
          return v.appContext = i, b === !0 ? b = "svg" : b === !1 && (b = void 0), h && t ? t(v, a) : e(v, a, b), c = !0, u._container = a, a.__vue_app__ = u, Vs(v.component) || v.component.proxy;
        }
      },
      unmount() {
        c && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(a, h) {
        return i.provides[a] = h, u;
      },
      runWithContext(a) {
        kt = u;
        try {
          return a();
        } finally {
          kt = null;
        }
      }
    };
    return u;
  };
}
let kt = null;
function ro(e, t) {
  if (ee) {
    let s = ee.provides;
    const n = ee.parent && ee.parent.provides;
    n === s && (s = ee.provides = Object.create(n)), s[e] = t;
  }
}
function Mt(e, t, s = !1) {
  const n = ee || Se;
  if (n || kt) {
    const r = n ? n.parent == null ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : kt._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return s && R(t) ? t.call(n && n.proxy) : t;
  }
}
function io(e, t, s, n = !1) {
  const r = {}, i = {};
  Nt(i, Gt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), mr(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  s ? e.props = n ? r : ui(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function oo(e, t, s, n) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, c = F(r), [u] = e.propsOptions;
  let a = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const h = e.vnode.dynamicProps;
      for (let b = 0; b < h.length; b++) {
        let v = h[b];
        if (Kt(e.emitsOptions, v))
          continue;
        const C = t[v];
        if (u)
          if (L(i, v))
            C !== i[v] && (i[v] = C, a = !0);
          else {
            const j = Ae(v);
            r[j] = ys(
              u,
              c,
              j,
              C,
              e,
              !1
            );
          }
        else
          C !== i[v] && (i[v] = C, a = !0);
      }
    }
  } else {
    mr(e, t, r, i) && (a = !0);
    let h;
    for (const b in c)
      (!t || // for camelCase
      !L(t, b) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((h = _e(b)) === b || !L(t, h))) && (u ? s && // for camelCase
      (s[b] !== void 0 || // for kebab-case
      s[h] !== void 0) && (r[b] = ys(
        u,
        c,
        b,
        void 0,
        e,
        !0
      )) : delete r[b]);
    if (i !== c)
      for (const b in i)
        (!t || !L(t, b)) && (delete i[b], a = !0);
  }
  a && Re(e, "set", "$attrs");
}
function mr(e, t, s, n) {
  const [r, i] = e.propsOptions;
  let o = !1, c;
  if (t)
    for (let u in t) {
      if (Tt(u))
        continue;
      const a = t[u];
      let h;
      r && L(r, h = Ae(u)) ? !i || !i.includes(h) ? s[h] = a : (c || (c = {}))[h] = a : Kt(e.emitsOptions, u) || (!(u in n) || a !== n[u]) && (n[u] = a, o = !0);
    }
  if (i) {
    const u = F(s), a = c || K;
    for (let h = 0; h < i.length; h++) {
      const b = i[h];
      s[b] = ys(
        r,
        u,
        b,
        a[b],
        e,
        !L(a, b)
      );
    }
  }
  return o;
}
function ys(e, t, s, n, r, i) {
  const o = e[s];
  if (o != null) {
    const c = L(o, "default");
    if (c && n === void 0) {
      const u = o.default;
      if (o.type !== Function && !o.skipFactory && R(u)) {
        const { propsDefaults: a } = r;
        if (s in a)
          n = a[s];
        else {
          const h = wt(r);
          n = a[s] = u.call(
            null,
            t
          ), h();
        }
      } else
        n = u;
    }
    o[
      0
      /* shouldCast */
    ] && (i && !c ? n = !1 : o[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === _e(s)) && (n = !0));
  }
  return n;
}
function gr(e, t, s = !1) {
  const n = t.propsCache, r = n.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, c = [];
  let u = !1;
  if (!R(e)) {
    const h = (b) => {
      u = !0;
      const [v, C] = gr(b, t, !0);
      Z(o, v), C && c.push(...C);
    };
    !s && t.mixins.length && t.mixins.forEach(h), e.extends && h(e.extends), e.mixins && e.mixins.forEach(h);
  }
  if (!i && !u)
    return G(e) && n.set(e, et), et;
  if (O(i))
    for (let h = 0; h < i.length; h++) {
      const b = Ae(i[h]);
      dn(b) && (o[b] = K);
    }
  else if (i)
    for (const h in i) {
      const b = Ae(h);
      if (dn(b)) {
        const v = i[h], C = o[b] = O(v) || R(v) ? { type: v } : Z({}, v);
        if (C) {
          const j = mn(Boolean, C.type), M = mn(String, C.type);
          C[
            0
            /* shouldCast */
          ] = j > -1, C[
            1
            /* shouldCastTrue */
          ] = M < 0 || j < M, (j > -1 || L(C, "default")) && c.push(b);
        }
      }
    }
  const a = [o, c];
  return G(e) && n.set(e, a), a;
}
function dn(e) {
  return e[0] !== "$";
}
function hn(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function pn(e, t) {
  return hn(e) === hn(t);
}
function mn(e, t) {
  return O(t) ? t.findIndex((s) => pn(s, e)) : R(t) && pn(t, e) ? 0 : -1;
}
const _r = (e) => e[0] === "_" || e === "$stable", Hs = (e) => O(e) ? e.map(xe) : [xe(e)], lo = (e, t, s) => {
  if (t._n)
    return t;
  const n = Ci((...r) => (at.NODE_ENV !== "production" && ee && (!s || (s.root, ee.root)), Hs(t(...r))), s);
  return n._c = !1, n;
}, br = (e, t, s) => {
  const n = e._ctx;
  for (const r in e) {
    if (_r(r))
      continue;
    const i = e[r];
    if (R(i))
      t[r] = lo(r, i, n);
    else if (i != null) {
      const o = Hs(i);
      t[r] = () => o;
    }
  }
}, yr = (e, t) => {
  const s = Hs(t);
  e.slots.default = () => s;
}, co = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (e.slots = F(t), Nt(t, "_", s)) : br(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && yr(e, t);
  Nt(e.slots, Gt, 1);
}, fo = (e, t, s) => {
  const { vnode: n, slots: r } = e;
  let i = !0, o = K;
  if (n.shapeFlag & 32) {
    const c = t._;
    c ? s && c === 1 ? i = !1 : (Z(r, t), !s && c === 1 && delete r._) : (i = !t.$stable, br(t, r)), o = t;
  } else
    t && (yr(e, t), o = { default: 1 });
  if (i)
    for (const c in r)
      !_r(c) && o[c] == null && delete r[c];
};
function ws(e, t, s, n, r = !1) {
  if (O(e)) {
    e.forEach(
      (v, C) => ws(
        v,
        t && (O(t) ? t[C] : t),
        s,
        n,
        r
      )
    );
    return;
  }
  if (It(n) && !r)
    return;
  const i = n.shapeFlag & 4 ? Vs(n.component) || n.component.proxy : n.el, o = r ? null : i, { i: c, r: u } = e, a = t && t.r, h = c.refs === K ? c.refs = {} : c.refs, b = c.setupState;
  if (a != null && a !== u && (Q(a) ? (h[a] = null, L(b, a) && (b[a] = null)) : ae(a) && (a.value = null)), R(u))
    Te(u, c, 12, [o, h]);
  else {
    const v = Q(u), C = ae(u), j = e.f;
    if (v || C) {
      const M = () => {
        if (j) {
          const $ = v ? L(b, u) ? b[u] : h[u] : u.value;
          r ? O($) && Ss($, i) : O($) ? $.includes(i) || $.push(i) : v ? (h[u] = [i], L(b, u) && (b[u] = h[u])) : (u.value = [i], e.k && (h[e.k] = u.value));
        } else
          v ? (h[u] = o, L(b, u) && (b[u] = o)) : C && (u.value = o, e.k && (h[e.k] = o));
      };
      r || j ? M() : (M.id = -1, fe(M, s));
    }
  }
}
const fe = Li;
function uo(e) {
  return ao(e);
}
function ao(e, t) {
  const s = Nn();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: r,
    patchProp: i,
    createElement: o,
    createText: c,
    createComment: u,
    setText: a,
    setElementText: h,
    parentNode: b,
    nextSibling: v,
    setScopeId: C = he,
    insertStaticContent: j
  } = e, M = (l, f, d, p = null, m = null, y = null, E = void 0, _ = null, w = !!f.dynamicChildren) => {
    if (l === f)
      return;
    l && !ct(l, f) && (p = xt(l), we(l, m, y, !0), l = null), f.patchFlag === -2 && (w = !1, f.dynamicChildren = null);
    const { type: g, ref: x, shapeFlag: S } = f;
    switch (g) {
      case Wt:
        $(l, f, d, p);
        break;
      case Je:
        B(l, f, d, p);
        break;
      case ls:
        l == null && Y(f, d, p, E);
        break;
      case z:
        He(
          l,
          f,
          d,
          p,
          m,
          y,
          E,
          _,
          w
        );
        break;
      default:
        S & 1 ? ne(
          l,
          f,
          d,
          p,
          m,
          y,
          E,
          _,
          w
        ) : S & 6 ? vt(
          l,
          f,
          d,
          p,
          m,
          y,
          E,
          _,
          w
        ) : (S & 64 || S & 128) && g.process(
          l,
          f,
          d,
          p,
          m,
          y,
          E,
          _,
          w,
          Ye
        );
    }
    x != null && m && ws(x, l && l.ref, y, f || l, !f);
  }, $ = (l, f, d, p) => {
    if (l == null)
      n(
        f.el = c(f.children),
        d,
        p
      );
    else {
      const m = f.el = l.el;
      f.children !== l.children && a(m, f.children);
    }
  }, B = (l, f, d, p) => {
    l == null ? n(
      f.el = u(f.children || ""),
      d,
      p
    ) : f.el = l.el;
  }, Y = (l, f, d, p) => {
    [l.el, l.anchor] = j(
      l.children,
      f,
      d,
      p,
      l.el,
      l.anchor
    );
  }, N = ({ el: l, anchor: f }, d, p) => {
    let m;
    for (; l && l !== f; )
      m = v(l), n(l, d, p), l = m;
    n(f, d, p);
  }, D = ({ el: l, anchor: f }) => {
    let d;
    for (; l && l !== f; )
      d = v(l), r(l), l = d;
    r(f);
  }, ne = (l, f, d, p, m, y, E, _, w) => {
    f.type === "svg" ? E = "svg" : f.type === "math" && (E = "mathml"), l == null ? I(
      f,
      d,
      p,
      m,
      y,
      E,
      _,
      w
    ) : re(
      l,
      f,
      m,
      y,
      E,
      _,
      w
    );
  }, I = (l, f, d, p, m, y, E, _) => {
    let w, g;
    const { props: x, shapeFlag: S, transition: P, dirs: A } = l;
    if (w = l.el = o(
      l.type,
      y,
      x && x.is,
      x
    ), S & 8 ? h(w, l.children) : S & 16 && le(
      l.children,
      w,
      null,
      p,
      m,
      os(l, y),
      E,
      _
    ), A && qe(l, null, p, "created"), te(w, l, l.scopeId, E, p), x) {
      for (const H in x)
        H !== "value" && !Tt(H) && i(
          w,
          H,
          null,
          x[H],
          y,
          l.children,
          p,
          m,
          Oe
        );
      "value" in x && i(w, "value", null, x.value, y), (g = x.onVnodeBeforeMount) && Ee(g, p, l);
    }
    A && qe(l, null, p, "beforeMount");
    const T = ho(m, P);
    T && P.beforeEnter(w), n(w, f, d), ((g = x && x.onVnodeMounted) || T || A) && fe(() => {
      g && Ee(g, p, l), T && P.enter(w), A && qe(l, null, p, "mounted");
    }, m);
  }, te = (l, f, d, p, m) => {
    if (d && C(l, d), p)
      for (let y = 0; y < p.length; y++)
        C(l, p[y]);
    if (m) {
      let y = m.subTree;
      if (f === y) {
        const E = m.vnode;
        te(
          l,
          E,
          E.scopeId,
          E.slotScopeIds,
          m.parent
        );
      }
    }
  }, le = (l, f, d, p, m, y, E, _, w = 0) => {
    for (let g = w; g < l.length; g++) {
      const x = l[g] = _ ? Fe(l[g]) : xe(l[g]);
      M(
        null,
        x,
        f,
        d,
        p,
        m,
        y,
        E,
        _
      );
    }
  }, re = (l, f, d, p, m, y, E) => {
    const _ = f.el = l.el;
    let { patchFlag: w, dynamicChildren: g, dirs: x } = f;
    w |= l.patchFlag & 16;
    const S = l.props || K, P = f.props || K;
    let A;
    if (d && Ke(d, !1), (A = P.onVnodeBeforeUpdate) && Ee(A, d, f, l), x && qe(f, l, d, "beforeUpdate"), d && Ke(d, !0), g ? J(
      l.dynamicChildren,
      g,
      _,
      d,
      p,
      os(f, m),
      y
    ) : E || V(
      l,
      f,
      _,
      null,
      d,
      p,
      os(f, m),
      y,
      !1
    ), w > 0) {
      if (w & 16)
        ce(
          _,
          f,
          S,
          P,
          d,
          p,
          m
        );
      else if (w & 2 && S.class !== P.class && i(_, "class", null, P.class, m), w & 4 && i(_, "style", S.style, P.style, m), w & 8) {
        const T = f.dynamicProps;
        for (let H = 0; H < T.length; H++) {
          const q = T[H], X = S[q], pe = P[q];
          (pe !== X || q === "value") && i(
            _,
            q,
            X,
            pe,
            m,
            l.children,
            d,
            p,
            Oe
          );
        }
      }
      w & 1 && l.children !== f.children && h(_, f.children);
    } else
      !E && g == null && ce(
        _,
        f,
        S,
        P,
        d,
        p,
        m
      );
    ((A = P.onVnodeUpdated) || x) && fe(() => {
      A && Ee(A, d, f, l), x && qe(f, l, d, "updated");
    }, p);
  }, J = (l, f, d, p, m, y, E) => {
    for (let _ = 0; _ < f.length; _++) {
      const w = l[_], g = f[_], x = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        w.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (w.type === z || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !ct(w, g) || // - In the case of a component, it could contain anything.
        w.shapeFlag & 70) ? b(w.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          d
        )
      );
      M(
        w,
        g,
        x,
        null,
        p,
        m,
        y,
        E,
        !0
      );
    }
  }, ce = (l, f, d, p, m, y, E) => {
    if (d !== p) {
      if (d !== K)
        for (const _ in d)
          !Tt(_) && !(_ in p) && i(
            l,
            _,
            d[_],
            null,
            E,
            f.children,
            m,
            y,
            Oe
          );
      for (const _ in p) {
        if (Tt(_))
          continue;
        const w = p[_], g = d[_];
        w !== g && _ !== "value" && i(
          l,
          _,
          g,
          w,
          E,
          f.children,
          m,
          y,
          Oe
        );
      }
      "value" in p && i(l, "value", d.value, p.value, E);
    }
  }, He = (l, f, d, p, m, y, E, _, w) => {
    const g = f.el = l ? l.el : c(""), x = f.anchor = l ? l.anchor : c("");
    let { patchFlag: S, dynamicChildren: P, slotScopeIds: A } = f;
    A && (_ = _ ? _.concat(A) : A), l == null ? (n(g, d, p), n(x, d, p), le(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      d,
      x,
      m,
      y,
      E,
      _,
      w
    )) : S > 0 && S & 64 && P && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren ? (J(
      l.dynamicChildren,
      P,
      d,
      m,
      y,
      E,
      _
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || m && f === m.subTree) && wr(
      l,
      f,
      !0
      /* shallow */
    )) : V(
      l,
      f,
      d,
      x,
      m,
      y,
      E,
      _,
      w
    );
  }, vt = (l, f, d, p, m, y, E, _, w) => {
    f.slotScopeIds = _, l == null ? f.shapeFlag & 512 ? m.ctx.activate(
      f,
      d,
      p,
      E,
      w
    ) : Qt(
      f,
      d,
      p,
      m,
      y,
      E,
      w
    ) : Ks(l, f, w);
  }, Qt = (l, f, d, p, m, y, E) => {
    const _ = l.component = Po(
      l,
      p,
      m
    );
    if (ur(l) && (_.ctx.renderer = Ye), So(_), _.asyncDep) {
      if (m && m.registerDep(_, ie), !l.el) {
        const w = _.subTree = Ce(Je);
        B(null, w, f, d);
      }
    } else
      ie(
        _,
        l,
        f,
        d,
        m,
        y,
        E
      );
  }, Ks = (l, f, d) => {
    const p = f.component = l.component;
    if (Ri(l, f, d))
      if (p.asyncDep && !p.asyncResolved) {
        W(p, f, d);
        return;
      } else
        p.next = f, Ei(p.update), p.effect.dirty = !0, p.update();
    else
      f.el = l.el, p.vnode = f;
  }, ie = (l, f, d, p, m, y, E) => {
    const _ = () => {
      if (l.isMounted) {
        let { next: x, bu: S, u: P, parent: A, vnode: T } = l;
        {
          const Xe = vr(l);
          if (Xe) {
            x && (x.el = T.el, W(l, x, E)), Xe.asyncDep.then(() => {
              l.isUnmounted || _();
            });
            return;
          }
        }
        let H = x, q;
        Ke(l, !1), x ? (x.el = T.el, W(l, x, E)) : x = T, S && es(S), (q = x.props && x.props.onVnodeBeforeUpdate) && Ee(q, A, x, T), Ke(l, !0);
        const X = ns(l), pe = l.subTree;
        l.subTree = X, M(
          pe,
          X,
          // parent may have changed if it's in a teleport
          b(pe.el),
          // anchor may have changed if it's in a fragment
          xt(pe),
          l,
          m,
          y
        ), x.el = X.el, H === null && Ti(l, X.el), P && fe(P, m), (q = x.props && x.props.onVnodeUpdated) && fe(
          () => Ee(q, A, x, T),
          m
        );
      } else {
        let x;
        const { el: S, props: P } = f, { bm: A, m: T, parent: H } = l, q = It(f);
        if (Ke(l, !1), A && es(A), !q && (x = P && P.onVnodeBeforeMount) && Ee(x, H, f), Ke(l, !0), S && Xt) {
          const X = () => {
            l.subTree = ns(l), Xt(
              S,
              l.subTree,
              l,
              m,
              null
            );
          };
          q ? f.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !l.isUnmounted && X()
          ) : X();
        } else {
          const X = l.subTree = ns(l);
          M(
            null,
            X,
            d,
            p,
            l,
            m,
            y
          ), f.el = X.el;
        }
        if (T && fe(T, m), !q && (x = P && P.onVnodeMounted)) {
          const X = f;
          fe(
            () => Ee(x, H, X),
            m
          );
        }
        (f.shapeFlag & 256 || H && It(H.vnode) && H.vnode.shapeFlag & 256) && l.a && fe(l.a, m), l.isMounted = !0, f = d = p = null;
      }
    }, w = l.effect = new As(
      _,
      he,
      () => js(g),
      l.scope
      // track it in component's effect scope
    ), g = l.update = () => {
      w.dirty && w.run();
    };
    g.id = l.uid, Ke(l, !0), g();
  }, W = (l, f, d) => {
    f.component = l;
    const p = l.vnode.props;
    l.vnode = f, l.next = null, oo(l, f.props, p, d), fo(l, f.children, d), je(), on(l), $e();
  }, V = (l, f, d, p, m, y, E, _, w = !1) => {
    const g = l && l.children, x = l ? l.shapeFlag : 0, S = f.children, { patchFlag: P, shapeFlag: A } = f;
    if (P > 0) {
      if (P & 128) {
        Et(
          g,
          S,
          d,
          p,
          m,
          y,
          E,
          _,
          w
        );
        return;
      } else if (P & 256) {
        De(
          g,
          S,
          d,
          p,
          m,
          y,
          E,
          _,
          w
        );
        return;
      }
    }
    A & 8 ? (x & 16 && Oe(g, m, y), S !== g && h(d, S)) : x & 16 ? A & 16 ? Et(
      g,
      S,
      d,
      p,
      m,
      y,
      E,
      _,
      w
    ) : Oe(g, m, y, !0) : (x & 8 && h(d, ""), A & 16 && le(
      S,
      d,
      p,
      m,
      y,
      E,
      _,
      w
    ));
  }, De = (l, f, d, p, m, y, E, _, w) => {
    l = l || et, f = f || et;
    const g = l.length, x = f.length, S = Math.min(g, x);
    let P;
    for (P = 0; P < S; P++) {
      const A = f[P] = w ? Fe(f[P]) : xe(f[P]);
      M(
        l[P],
        A,
        d,
        null,
        m,
        y,
        E,
        _,
        w
      );
    }
    g > x ? Oe(
      l,
      m,
      y,
      !0,
      !1,
      S
    ) : le(
      f,
      d,
      p,
      m,
      y,
      E,
      _,
      w,
      S
    );
  }, Et = (l, f, d, p, m, y, E, _, w) => {
    let g = 0;
    const x = f.length;
    let S = l.length - 1, P = x - 1;
    for (; g <= S && g <= P; ) {
      const A = l[g], T = f[g] = w ? Fe(f[g]) : xe(f[g]);
      if (ct(A, T))
        M(
          A,
          T,
          d,
          null,
          m,
          y,
          E,
          _,
          w
        );
      else
        break;
      g++;
    }
    for (; g <= S && g <= P; ) {
      const A = l[S], T = f[P] = w ? Fe(f[P]) : xe(f[P]);
      if (ct(A, T))
        M(
          A,
          T,
          d,
          null,
          m,
          y,
          E,
          _,
          w
        );
      else
        break;
      S--, P--;
    }
    if (g > S) {
      if (g <= P) {
        const A = P + 1, T = A < x ? f[A].el : p;
        for (; g <= P; )
          M(
            null,
            f[g] = w ? Fe(f[g]) : xe(f[g]),
            d,
            T,
            m,
            y,
            E,
            _,
            w
          ), g++;
      }
    } else if (g > P)
      for (; g <= S; )
        we(l[g], m, y, !0), g++;
    else {
      const A = g, T = g, H = /* @__PURE__ */ new Map();
      for (g = T; g <= P; g++) {
        const de = f[g] = w ? Fe(f[g]) : xe(f[g]);
        de.key != null && H.set(de.key, g);
      }
      let q, X = 0;
      const pe = P - T + 1;
      let Xe = !1, Gs = 0;
      const ot = new Array(pe);
      for (g = 0; g < pe; g++)
        ot[g] = 0;
      for (g = A; g <= S; g++) {
        const de = l[g];
        if (X >= pe) {
          we(de, m, y, !0);
          continue;
        }
        let ve;
        if (de.key != null)
          ve = H.get(de.key);
        else
          for (q = T; q <= P; q++)
            if (ot[q - T] === 0 && ct(de, f[q])) {
              ve = q;
              break;
            }
        ve === void 0 ? we(de, m, y, !0) : (ot[ve - T] = g + 1, ve >= Gs ? Gs = ve : Xe = !0, M(
          de,
          f[ve],
          d,
          null,
          m,
          y,
          E,
          _,
          w
        ), X++);
      }
      const zs = Xe ? po(ot) : et;
      for (q = zs.length - 1, g = pe - 1; g >= 0; g--) {
        const de = T + g, ve = f[de], Qs = de + 1 < x ? f[de + 1].el : p;
        ot[g] === 0 ? M(
          null,
          ve,
          d,
          Qs,
          m,
          y,
          E,
          _,
          w
        ) : Xe && (q < 0 || g !== zs[q] ? Ve(ve, d, Qs, 2) : q--);
      }
    }
  }, Ve = (l, f, d, p, m = null) => {
    const { el: y, type: E, transition: _, children: w, shapeFlag: g } = l;
    if (g & 6) {
      Ve(l.component.subTree, f, d, p);
      return;
    }
    if (g & 128) {
      l.suspense.move(f, d, p);
      return;
    }
    if (g & 64) {
      E.move(l, f, d, Ye);
      return;
    }
    if (E === z) {
      n(y, f, d);
      for (let S = 0; S < w.length; S++)
        Ve(w[S], f, d, p);
      n(l.anchor, f, d);
      return;
    }
    if (E === ls) {
      N(l, f, d);
      return;
    }
    if (p !== 2 && g & 1 && _)
      if (p === 0)
        _.beforeEnter(y), n(y, f, d), fe(() => _.enter(y), m);
      else {
        const { leave: S, delayLeave: P, afterLeave: A } = _, T = () => n(y, f, d), H = () => {
          S(y, () => {
            T(), A && A();
          });
        };
        P ? P(y, T, H) : H();
      }
    else
      n(y, f, d);
  }, we = (l, f, d, p = !1, m = !1) => {
    const {
      type: y,
      props: E,
      ref: _,
      children: w,
      dynamicChildren: g,
      shapeFlag: x,
      patchFlag: S,
      dirs: P
    } = l;
    if (_ != null && ws(_, null, d, l, !0), x & 256) {
      f.ctx.deactivate(l);
      return;
    }
    const A = x & 1 && P, T = !It(l);
    let H;
    if (T && (H = E && E.onVnodeBeforeUnmount) && Ee(H, f, l), x & 6)
      Rr(l.component, d, p);
    else {
      if (x & 128) {
        l.suspense.unmount(d, p);
        return;
      }
      A && qe(l, null, f, "beforeUnmount"), x & 64 ? l.type.remove(
        l,
        f,
        d,
        m,
        Ye,
        p
      ) : g && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (y !== z || S > 0 && S & 64) ? Oe(
        g,
        f,
        d,
        !1,
        !0
      ) : (y === z && S & 384 || !m && x & 16) && Oe(w, f, d), p && Bs(l);
    }
    (T && (H = E && E.onVnodeUnmounted) || A) && fe(() => {
      H && Ee(H, f, l), A && qe(l, null, f, "unmounted");
    }, d);
  }, Bs = (l) => {
    const { type: f, el: d, anchor: p, transition: m } = l;
    if (f === z) {
      Ar(d, p);
      return;
    }
    if (f === ls) {
      D(l);
      return;
    }
    const y = () => {
      r(d), m && !m.persisted && m.afterLeave && m.afterLeave();
    };
    if (l.shapeFlag & 1 && m && !m.persisted) {
      const { leave: E, delayLeave: _ } = m, w = () => E(d, y);
      _ ? _(l.el, y, w) : w();
    } else
      y();
  }, Ar = (l, f) => {
    let d;
    for (; l !== f; )
      d = v(l), r(l), l = d;
    r(f);
  }, Rr = (l, f, d) => {
    const { bum: p, scope: m, update: y, subTree: E, um: _ } = l;
    p && es(p), m.stop(), y && (y.active = !1, we(E, l, f, d)), _ && fe(_, f), fe(() => {
      l.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve());
  }, Oe = (l, f, d, p = !1, m = !1, y = 0) => {
    for (let E = y; E < l.length; E++)
      we(l[E], f, d, p, m);
  }, xt = (l) => l.shapeFlag & 6 ? xt(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : v(l.anchor || l.el);
  let Jt = !1;
  const Ws = (l, f, d) => {
    l == null ? f._vnode && we(f._vnode, null, null, !0) : M(
      f._vnode || null,
      l,
      f,
      null,
      null,
      null,
      d
    ), Jt || (Jt = !0, on(), rr(), Jt = !1), f._vnode = l;
  }, Ye = {
    p: M,
    um: we,
    m: Ve,
    r: Bs,
    mt: Qt,
    mc: le,
    pc: V,
    pbc: J,
    n: xt,
    o: e
  };
  let Yt, Xt;
  return t && ([Yt, Xt] = t(
    Ye
  )), {
    render: Ws,
    hydrate: Yt,
    createApp: no(Ws, Yt)
  };
}
function os({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function Ke({ effect: e, update: t }, s) {
  e.allowRecurse = t.allowRecurse = s;
}
function ho(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function wr(e, t, s = !1) {
  const n = e.children, r = t.children;
  if (O(n) && O(r))
    for (let i = 0; i < n.length; i++) {
      const o = n[i];
      let c = r[i];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = r[i] = Fe(r[i]), c.el = o.el), s || wr(o, c)), c.type === Wt && (c.el = o.el);
    }
}
function po(e) {
  const t = e.slice(), s = [0];
  let n, r, i, o, c;
  const u = e.length;
  for (n = 0; n < u; n++) {
    const a = e[n];
    if (a !== 0) {
      if (r = s[s.length - 1], e[r] < a) {
        t[n] = r, s.push(n);
        continue;
      }
      for (i = 0, o = s.length - 1; i < o; )
        c = i + o >> 1, e[s[c]] < a ? i = c + 1 : o = c;
      a < e[s[i]] && (i > 0 && (t[n] = s[i - 1]), s[i] = n);
    }
  }
  for (i = s.length, o = s[i - 1]; i-- > 0; )
    s[i] = o, o = t[o];
  return s;
}
function vr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : vr(t);
}
const mo = (e) => e.__isTeleport, z = Symbol.for("v-fgt"), Wt = Symbol.for("v-txt"), Je = Symbol.for("v-cmt"), ls = Symbol.for("v-stc"), pt = [];
let be = null;
function U(e = !1) {
  pt.push(be = e ? null : []);
}
function go() {
  pt.pop(), be = pt[pt.length - 1] || null;
}
let yt = 1;
function gn(e) {
  yt += e;
}
function Er(e) {
  return e.dynamicChildren = yt > 0 ? be || et : null, go(), yt > 0 && be && be.push(e), e;
}
function k(e, t, s, n, r, i) {
  return Er(
    mt(
      e,
      t,
      s,
      n,
      r,
      i,
      !0
    )
  );
}
function _o(e, t, s, n, r) {
  return Er(
    Ce(
      e,
      t,
      s,
      n,
      r,
      !0
    )
  );
}
function bo(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ct(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Gt = "__vInternal", xr = ({ key: e }) => e ?? null, Lt = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? Q(e) || ae(e) || R(e) ? { i: Se, r: e, k: t, f: !!s } : e : null);
function mt(e, t = null, s = null, n = 0, r = null, i = e === z ? 0 : 1, o = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && xr(t),
    ref: t && Lt(t),
    scopeId: lr,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: n,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Se
  };
  return c ? (Ds(u, s), i & 128 && e.normalize(u)) : s && (u.shapeFlag |= Q(s) ? 8 : 16), yt > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  be && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && be.push(u), u;
}
const Ce = yo;
function yo(e, t = null, s = null, n = 0, r = null, i = !1) {
  if ((!e || e === Ii) && (e = Je), bo(e)) {
    const c = rt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && Ds(c, s), yt > 0 && !i && be && (c.shapeFlag & 6 ? be[be.indexOf(e)] = c : be.push(c)), c.patchFlag |= -2, c;
  }
  if (Mo(e) && (e = e.__vccOpts), t) {
    t = wo(t);
    let { class: c, style: u } = t;
    c && !Q(c) && (t.class = Os(c)), G(u) && (Jn(u) && !O(u) && (u = Z({}, u)), t.style = We(u));
  }
  const o = Q(e) ? 1 : Mi(e) ? 128 : mo(e) ? 64 : G(e) ? 4 : R(e) ? 2 : 0;
  return mt(
    e,
    t,
    s,
    n,
    r,
    o,
    i,
    !0
  );
}
function wo(e) {
  return e ? Jn(e) || Gt in e ? Z({}, e) : e : null;
}
function rt(e, t, s = !1) {
  const { props: n, ref: r, patchFlag: i, children: o } = e, c = t ? vo(n || {}, t) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && xr(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && r ? O(r) ? r.concat(Lt(t)) : [r, Lt(t)] : Lt(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== z ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && rt(e.ssContent),
    ssFallback: e.ssFallback && rt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Pr(e = " ", t = 0) {
  return Ce(Wt, null, e, t);
}
function me(e = "", t = !1) {
  return t ? (U(), _o(Je, null, e)) : Ce(Je, null, e);
}
function xe(e) {
  return e == null || typeof e == "boolean" ? Ce(Je) : O(e) ? Ce(
    z,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Fe(e) : Ce(Wt, null, String(e));
}
function Fe(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : rt(e);
}
function Ds(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (O(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Ds(e, r()), r._c && (r._d = !0));
      return;
    } else {
      s = 32;
      const r = t._;
      !r && !(Gt in t) ? t._ctx = Se : r === 3 && Se && (Se.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    R(t) ? (t = { default: t, _ctx: Se }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [Pr(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function vo(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const r in n)
      if (r === "class")
        t.class !== n.class && (t.class = Os([t.class, n.class]));
      else if (r === "style")
        t.style = We([t.style, n.style]);
      else if ($t(r)) {
        const i = t[r], o = n[r];
        o && i !== o && !(O(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
      } else
        r !== "" && (t[r] = n[r]);
  }
  return t;
}
function Ee(e, t, s, n = null) {
  ye(e, t, 7, [
    s,
    n
  ]);
}
const Eo = pr();
let xo = 0;
function Po(e, t, s) {
  const n = e.type, r = (t ? t.appContext : e.appContext) || Eo, i = {
    uid: xo++,
    vnode: e,
    type: n,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new Vr(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: gr(n, r),
    emitsOptions: or(n, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: K,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: K,
    data: K,
    props: K,
    attrs: K,
    slots: K,
    refs: K,
    setupState: K,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Si.bind(null, i), e.ce && e.ce(i), i;
}
let ee = null, jt, vs;
{
  const e = Nn(), t = (s, n) => {
    let r;
    return (r = e[s]) || (r = e[s] = []), r.push(n), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  jt = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => ee = s
  ), vs = t(
    "__VUE_SSR_SETTERS__",
    (s) => zt = s
  );
}
const wt = (e) => {
  const t = ee;
  return jt(e), e.scope.on(), () => {
    e.scope.off(), jt(t);
  };
}, _n = () => {
  ee && ee.scope.off(), jt(null);
};
function Sr(e) {
  return e.vnode.shapeFlag & 4;
}
let zt = !1;
function So(e, t = !1) {
  t && vs(t);
  const { props: s, children: n } = e.vnode, r = Sr(e);
  io(e, s, r, t), co(e, n);
  const i = r ? Co(e, t) : void 0;
  return t && vs(!1), i;
}
function Co(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Yn(new Proxy(e.ctx, Ji));
  const { setup: n } = s;
  if (n) {
    const r = e.setupContext = n.length > 1 ? Ao(e) : null, i = wt(e);
    je();
    const o = Te(
      n,
      e,
      0,
      [
        e.props,
        r
      ]
    );
    if ($e(), i(), Tn(o)) {
      if (o.then(_n, _n), t)
        return o.then((c) => {
          bn(e, c, t);
        }).catch((c) => {
          qt(c, e, 0);
        });
      e.asyncDep = o;
    } else
      bn(e, o, t);
  } else
    Cr(e, t);
}
function bn(e, t, s) {
  R(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : G(t) && (e.setupState = Zn(t)), Cr(e, s);
}
let yn;
function Cr(e, t, s) {
  const n = e.type;
  if (!e.render) {
    if (!t && yn && !n.render) {
      const r = n.template || $s(e).template;
      if (r) {
        const { isCustomElement: i, compilerOptions: o } = e.appContext.config, { delimiters: c, compilerOptions: u } = n, a = Z(
          Z(
            {
              isCustomElement: i,
              delimiters: c
            },
            o
          ),
          u
        );
        n.render = yn(r, a);
      }
    }
    e.render = n.render || he;
  }
  {
    const r = wt(e);
    je();
    try {
      Yi(e);
    } finally {
      $e(), r();
    }
  }
}
function Oo(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, s) {
        return ue(e, "get", "$attrs"), t[s];
      }
    }
  ));
}
function Ao(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    get attrs() {
      return Oo(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Vs(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Zn(Yn(e.exposed)), {
      get(t, s) {
        if (s in t)
          return t[s];
        if (s in ht)
          return ht[s](e);
      },
      has(t, s) {
        return s in t || s in ht;
      }
    }));
}
const Ro = /(?:^|[-_])(\w)/g, To = (e) => e.replace(Ro, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Io(e, t = !0) {
  return R(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Or(e, t, s = !1) {
  let n = Io(t);
  if (!n && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (n = r[1]);
  }
  if (!n && e && e.parent) {
    const r = (i) => {
      for (const o in i)
        if (i[o] === t)
          return o;
    };
    n = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return n ? To(n) : s ? "App" : "Anonymous";
}
function Mo(e) {
  return R(e) && "__vccOpts" in e;
}
const Lo = (e, t) => ai(e, t, zt), No = "3.4.15", Fo = "http://www.w3.org/2000/svg", Uo = "http://www.w3.org/1998/Math/MathML", Ue = typeof document < "u" ? document : null, wn = Ue && /* @__PURE__ */ Ue.createElement("template"), ko = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const r = t === "svg" ? Ue.createElementNS(Fo, e) : t === "mathml" ? Ue.createElementNS(Uo, e) : Ue.createElement(e, s ? { is: s } : void 0);
    return e === "select" && n && n.multiple != null && r.setAttribute("multiple", n.multiple), r;
  },
  createText: (e) => Ue.createTextNode(e),
  createComment: (e) => Ue.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ue.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, r, i) {
    const o = s ? s.previousSibling : t.lastChild;
    if (r && (r === i || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), s), !(r === i || !(r = r.nextSibling)); )
        ;
    else {
      wn.innerHTML = n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e;
      const c = wn.content;
      if (n === "svg" || n === "mathml") {
        const u = c.firstChild;
        for (; u.firstChild; )
          c.appendChild(u.firstChild);
        c.removeChild(u);
      }
      t.insertBefore(c, s);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, jo = Symbol("_vtc");
function $o(e, t, s) {
  const n = e[jo];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Ho = Symbol("_vod"), Do = Symbol("");
function Vo(e, t, s) {
  const n = e.style, r = n.display, i = Q(s);
  if (s && !i) {
    if (t && !Q(t))
      for (const o in t)
        s[o] == null && Es(n, o, "");
    for (const o in s)
      Es(n, o, s[o]);
  } else if (i) {
    if (t !== s) {
      const o = n[Do];
      o && (s += ";" + o), n.cssText = s;
    }
  } else
    t && e.removeAttribute("style");
  Ho in e && (n.display = r);
}
const vn = /\s*!important$/;
function Es(e, t, s) {
  if (O(s))
    s.forEach((n) => Es(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = qo(e, t);
    vn.test(s) ? e.setProperty(
      _e(n),
      s.replace(vn, ""),
      "important"
    ) : e[n] = s;
  }
}
const En = ["Webkit", "Moz", "ms"], cs = {};
function qo(e, t) {
  const s = cs[t];
  if (s)
    return s;
  let n = Ae(t);
  if (n !== "filter" && n in e)
    return cs[t] = n;
  n = Ln(n);
  for (let r = 0; r < En.length; r++) {
    const i = En[r] + n;
    if (i in e)
      return cs[t] = i;
  }
  return t;
}
const xn = "http://www.w3.org/1999/xlink";
function Ko(e, t, s, n, r) {
  if (n && t.startsWith("xlink:"))
    s == null ? e.removeAttributeNS(xn, t.slice(6, t.length)) : e.setAttributeNS(xn, t, s);
  else {
    const i = Dr(t);
    s == null || i && !Fn(s) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : s);
  }
}
function Bo(e, t, s, n, r, i, o) {
  if (t === "innerHTML" || t === "textContent") {
    n && o(n, r, i), e[t] = s ?? "";
    return;
  }
  const c = e.tagName;
  if (t === "value" && c !== "PROGRESS" && // custom elements may use _value internally
  !c.includes("-")) {
    e._value = s;
    const a = c === "OPTION" ? e.getAttribute("value") : e.value, h = s ?? "";
    a !== h && (e.value = h), s == null && e.removeAttribute(t);
    return;
  }
  let u = !1;
  if (s === "" || s == null) {
    const a = typeof e[t];
    a === "boolean" ? s = Fn(s) : s == null && a === "string" ? (s = "", u = !0) : a === "number" && (s = 0, u = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  u && e.removeAttribute(t);
}
function Wo(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function Go(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const Pn = Symbol("_vei");
function zo(e, t, s, n, r = null) {
  const i = e[Pn] || (e[Pn] = {}), o = i[t];
  if (n && o)
    o.value = n;
  else {
    const [c, u] = Qo(t);
    if (n) {
      const a = i[t] = Xo(n, r);
      Wo(e, c, a, u);
    } else
      o && (Go(e, c, o, u), i[t] = void 0);
  }
}
const Sn = /(?:Once|Passive|Capture)$/;
function Qo(e) {
  let t;
  if (Sn.test(e)) {
    t = {};
    let n;
    for (; n = e.match(Sn); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : _e(e.slice(2)), t];
}
let fs = 0;
const Jo = /* @__PURE__ */ Promise.resolve(), Yo = () => fs || (Jo.then(() => fs = 0), fs = Date.now());
function Xo(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    ye(
      Zo(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = Yo(), s;
}
function Zo(e, t) {
  if (O(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map((n) => (r) => !r._stopped && n && n(r));
  } else
    return t;
}
const Cn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, el = (e, t, s, n, r, i, o, c, u) => {
  const a = r === "svg";
  t === "class" ? $o(e, n, a) : t === "style" ? Vo(e, s, n) : $t(t) ? Ps(t) || zo(e, t, s, n, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : tl(e, t, n, a)) ? Bo(
    e,
    t,
    n,
    i,
    o,
    c,
    u
  ) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Ko(e, t, n, a));
};
function tl(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Cn(t) && R(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Cn(t) && Q(s) ? !1 : t in e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function sl(e, t) {
  const s = /* @__PURE__ */ ki(e);
  class n extends qs {
    constructor(i) {
      super(s, i, t);
    }
  }
  return n.def = s, n;
}
const nl = typeof HTMLElement < "u" ? HTMLElement : class {
};
class qs extends nl {
  constructor(t, s = {}, n) {
    super(), this._def = t, this._props = s, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this._ob = null, this.shadowRoot && n ? n(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), sr(() => {
      this._connected || (An(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let n = 0; n < this.attributes.length; n++)
      this._setAttr(this.attributes[n].name);
    this._ob = new MutationObserver((n) => {
      for (const r of n)
        this._setAttr(r.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const t = (n, r = !1) => {
      const { props: i, styles: o } = n;
      let c;
      if (i && !O(i))
        for (const u in i) {
          const a = i[u];
          (a === Number || a && a.type === Number) && (u in this._props && (this._props[u] = Js(this._props[u])), (c || (c = /* @__PURE__ */ Object.create(null)))[Ae(u)] = !0);
        }
      this._numberProps = c, r && this._resolveProps(n), this._applyStyles(o), this._update();
    }, s = this._def.__asyncLoader;
    s ? s().then((n) => t(n, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: s } = t, n = O(s) ? s : Object.keys(s || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && n.includes(r) && this._setProp(r, this[r], !0, !1);
    for (const r of n.map(Ae))
      Object.defineProperty(this, r, {
        get() {
          return this._getProp(r);
        },
        set(i) {
          this._setProp(r, i);
        }
      });
  }
  _setAttr(t) {
    let s = this.getAttribute(t);
    const n = Ae(t);
    this._numberProps && this._numberProps[n] && (s = Js(s)), this._setProp(n, s, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, s, n = !0, r = !0) {
    s !== this._props[t] && (this._props[t] = s, r && this._instance && this._update(), n && (s === !0 ? this.setAttribute(_e(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(_e(t), s + "") : s || this.removeAttribute(_e(t))));
  }
  _update() {
    An(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = Ce(this._def, Z({}, this._props));
    return this._instance || (t.ce = (s) => {
      this._instance = s, s.isCE = !0;
      const n = (i, o) => {
        this.dispatchEvent(
          new CustomEvent(i, {
            detail: o
          })
        );
      };
      s.emit = (i, ...o) => {
        n(i, o), _e(i) !== i && n(_e(i), o);
      };
      let r = this;
      for (; r = r && (r.parentNode || r.host); )
        if (r instanceof qs) {
          s.parent = r._instance, s.provides = r._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((s) => {
      const n = document.createElement("style");
      n.textContent = s, this.shadowRoot.appendChild(n);
    });
  }
}
const rl = ["ctrl", "shift", "alt", "meta"], il = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => rl.some((s) => e[`${s}Key`] && !t.includes(s))
}, ol = (e, t) => {
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = (r, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const c = il[t[o]];
      if (c && c(r, t))
        return;
    }
    return e(r, ...i);
  });
}, ll = /* @__PURE__ */ Z({ patchProp: el }, ko);
let On;
function cl() {
  return On || (On = uo(ll));
}
const An = (...e) => {
  cl().render(...e);
}, ft = {
  wikidataSPARQLEndpoint: "https://query.wikidata.org/sparql",
  /*
  *  Keeps the wikidata property label mapping updated and stored in local storage
  *
  */
  storeWikidataProperty: async function(e, t) {
    typeof e == "string" && (e = e.split(","));
    const s = new RegExp("^P[0-9]+$", "i"), n = e.filter((i) => s.test(i)), r = `
      SELECT ?property ?propertyLabel 
      WHERE 
      {
        VALUES ?property {wd:${n.join(" wd:")}}
        SERVICE wikibase:label { bd:serviceParam wikibase:language "${t}". }
      }
    `;
    if (localStorage.getItem(`vanes-wikidata-property-label-map-${t}`) === null) {
      let i = await this.wikiSPARQLQuery(r), o = {};
      for (let c of i.results.bindings)
        o[c.property.value.split("/")[4]] = c.propertyLabel.value;
      return localStorage.setItem(`vanes-wikidata-property-label-map-${t}`, JSON.stringify({ ts: parseInt(Date.now() / 1e3), map: o })), o;
    } else {
      let i = !1, o = JSON.parse(localStorage.getItem(`vanes-wikidata-property-label-map-${t}`)), c = o.ts, u = o.map;
      parseInt(Date.now() / 1e3) - c >= 86400 && (i = !0);
      for (let a of n)
        Object.keys(u).indexOf(a) == -1 && (i = !0);
      if (i) {
        let a = await this.wikiSPARQLQuery(r), h = {};
        for (let b of a.results.bindings)
          h[b.property.value.split("/")[4]] = b.propertyLabel.value;
        localStorage.setItem(`vanes-wikidata-property-label-map-${t}`, JSON.stringify({ ts: parseInt(Date.now() / 1e3), map: h }));
      }
      return u;
    }
  },
  /*
  *  SPARQL queries wikidata for the property list
  *
  */
  getWikidataProperty: function() {
  },
  /*
  *  Executes a SPARQL query against Wikidata and returns JSON response
  *
  */
  wikiSPARQLQuery: async function(e) {
    const t = {
      method: "GET",
      headers: new Headers({ Accept: "application/sparql-results+json", "User-Agent": "Vanes - Javascript Knowledge Panel Library" })
    };
    return await (await fetch(this.wikidataSPARQLEndpoint + "?origin=*&format=json&" + new URLSearchParams({
      query: e
    }), t)).json();
  },
  /*
  *  Ask the id.loc.gov label service for the Lccn of the Auth heading and then ask for the Qid from wikidata
  *
  */
  getQidFromAuthHeading: async function(e, t) {
    let s;
    t == "name" && (s = "https://id.loc.gov/authorities/names/label/" + window.encodeURI(e));
    let i = `
      SELECT ?item ?itemLabel 
      WHERE 
      {
        ?item wdt:P244 "${(await fetch(s, { method: "HEAD" })).headers.get("x-uri").split("/").pop()}".
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
    `, o = null, c = await this.wikiSPARQLQuery(i);
    if (c && c.results && c.results.bindings)
      for (let u of c.results.bindings) {
        o = u.item.value.split("/").pop();
        break;
      }
    return o;
  },
  /*
  *  Ask for the Qid from wikidata via p244
  *
  */
  getQidFromLccn: async function(e) {
    e = e.replace(/\s+/g, "");
    let t = null, s = `
      SELECT ?item ?itemLabel 
      WHERE 
      {
        ?item wdt:P244 "${e}".
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
    `, n = await this.wikiSPARQLQuery(s);
    if (n && n.results && n.results.bindings)
      for (let r of n.results.bindings) {
        t = r.item.value.split("/").pop();
        break;
      }
    return t;
  },
  /*
  *  Ask for the Qid from wikidata via p244
  *
  */
  requestWikidata: async function(e, t, s) {
    typeof t == "string" && (t = t.split(","));
    const n = new RegExp("^P[0-9]+$", "i"), r = t.filter((v) => n.test(v));
    console.log(r);
    let i = "", o = [];
    for (let v of r)
      i = i + `?${v} ?${v}Label `, o.push(`OPTIONAL{ wd:${e} wdt:${v} ?${v}. }`);
    console.log(i);
    let c = `
      SELECT ?item ?itemLabel ${i}
      WHERE 
      {
          ${o.join(`
`)}
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
    `;
    const a = await (await fetch(`http://www.wikidata.org/wiki/Special:EntityData/${e}.json`)).json();
    if (console.log(a), a && a.entities && a.entities[e]) {
      a.entities[e].labels;
      var h = a.entities[e].sitelinks, b = {};
      if (Object.keys(h).forEach((v) => {
        var C = v.split("wiki")[0];
        if (C.indexOf("_old") > -1)
          return !1;
        var j = h[v].url.split("/wiki/")[1], M = h[v].url.split("/wiki/")[0], $ = M + "/w/api.php?action=query&titles=" + j + "&prop=pageimages&format=json&pithumbsize=640&origin=*", B = M + "/w/api.php?format=json&action=query&prop=extracts&exintro=1&explaintext=1&titles=" + j + "&origin=*", Y = h[v].title, N = h[v].url;
        N.indexOf("wikipedia") > -1 && (b[C] = {
          qid: e,
          lang: C,
          titleEncoded: j,
          server: M,
          thumbInfoUrl: $,
          articleInfoUrl: B,
          title: Y,
          link: N,
          allData: b
        });
      }), console.log(b[s].title), b[s]) {
        let v = this.wikiSPARQLQuery(c), C;
        b[s].articleInfoUrl ? C = fetch(b[s].articleInfoUrl) : C = Promise.resolve();
        let j;
        b[s].thumbInfoUrl ? j = fetch(b[s].thumbInfoUrl) : j = Promise.resolve();
        const [M, $, B] = await Promise.all([v, C, j]);
        let Y = await $.json(), N = null;
        if (Y && Y.query && Y.query.pages) {
          let re = Object.keys(Y.query.pages);
          N = Y.query.pages[re[0]].extract.split(`
`);
        }
        let D = await B.json(), ne = null;
        if (D && D.query && D.query.pages) {
          let re = Object.keys(D.query.pages);
          D.query.pages[re[0]].thumbnail && D.query.pages[re[0]].thumbnail.source && (ne = D.query.pages[re[0]].thumbnail.source);
        }
        const I = new RegExp("[0-9]+-[0-9]+-[0-9]+T", "i");
        let te = {}, le = [];
        for (let re of M.results.bindings) {
          for (let J in re)
            J.indexOf("Label") == -1 && (te[J] || (te[J] = { pid: J, values: [] }));
          for (let J in re)
            if (J.indexOf("Label") == -1) {
              let ce = { qid: null, label: null };
              re[J].type == "uri" && (ce.qid = re[J].value.split("/").pop()), ce.label = re[J + "Label"].value, I.test(ce.label) && (ce.label = ce.label.split("T")[0]);
              let He = `${J}-${ce.qid}-${ce.label}`;
              le.indexOf(He) === -1 && (te[J].values.push(ce), le.push(He));
            }
        }
        return {
          abstract: N,
          thumbnail: ne,
          claims: te,
          title: b[s].title
        };
      } else
        return !1;
    } else
      return !1;
  }
}, fl = ".container{font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;color:#333}.title{text-align:center;font-size:1.25em;margin-top:.5em;margin-bottom:.5em}img{object-fit:cover;display:block;margin-left:auto;margin-right:auto}.vanes{border:solid 1px #e1e1e1;border-radius:.5em;padding:.25em}.abstract{text-align:justify;font-size:.85em;margin-top:.25em}.abstract-more{font-size:.85em}.thumbnail-round{border-radius:20em;height:250px;width:250px;background-size:cover;background-position-x:center;background-repeat:no-repeat;margin-left:auto;margin-right:auto;margin-bottom:1em;border:solid 1px #e1e1e1}hr{border:none;border-top:solid 1px #e1e1e1}.plist{margin-top:.15em;margin-bottom:.15em}div.plist:nth-of-type(2n){background-color:#fafafa}.p-label{font-style:oblique}.p-value{text-align:right}.p-value a{color:#333!important;display:inline-block;margin-bottom:.1em;text-decoration:none}.p-value a:hover{text-decoration:underline}.p-value a:focus{text-decoration:underline}.p-value a:active{text-decoration:underline}", ul = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, r] of t)
    s[n] = r;
  return s;
}, al = {
  en: ["title", "image", "abstract", "line", "P27", "P569", "P19", "P570", "P20", "P26", "P103", "P106", "P101", "P135", "P136", "P69", "P800", "P172", "P108", "P463", "P166"]
}, dl = {
  components: {},
  data: function() {
    return {
      errorMsg: null,
      wikidataPropertyMap: {},
      wikidata: {},
      showMoreAbstract: !1
    };
  },
  //default: "Woolf, Virginia, 1882-1941" 
  props: {
    "auth-heading": { type: String, required: !1 },
    lccn: { type: String, required: !1, default: "n 79041870" },
    qid: { type: String, required: !1 },
    "max-width": { type: Number, required: !1, default: 300 },
    type: { type: String, required: !1, default: "name" },
    lang: { type: String, required: !1, default: "en" },
    properties: { type: String, required: !1, default: al.en.join(",") },
    "circle-avatar-layout": { type: Boolean, required: !1, default: !1 }
  },
  methods: {
    // storeWikidataProperty
  },
  async mounted() {
    if (this.wikidataPropertyMap = await ft.storeWikidataProperty(this.properties, this.lang), !this.qid)
      if (this.lccn) {
        let e = await ft.getQidFromLccn(this.lccn);
        e ? this.wikidata = await ft.requestWikidata(e, this.properties, this.lang) : this.errorMsg = "Could not resolve Qid from Lccn";
      } else if (this.authHeading) {
        let e = await ft.getQidFromAuthHeading(this.authHeading, this.type);
        e ? this.wikidata = await ft.requestWikidata(e, this.properties, this.lang) : this.errorMsg = "Could not resolve Qid from Auth Heading";
      } else
        this.errorMsg = "No Qid, LCCN or Authorized Heading provided";
  }
}, hl = { class: "container" }, pl = {
  key: 0,
  class: "title"
}, ml = {
  key: 0,
  class: "error-msg"
}, gl = {
  key: 0,
  class: "title"
}, _l = ["src"], bl = { class: "abstract" }, yl = {
  key: 0,
  class: "abstract"
}, wl = { key: 3 }, vl = {
  key: 4,
  class: "plist"
}, El = {
  key: 0,
  class: "p-label"
}, xl = { class: "p-value" }, Pl = { key: 0 }, Sl = ["href"], Cl = { key: 1 };
function Ol(e, t, s, n, r, i) {
  return U(), k("aside", hl, [
    e.circleAvatarLayout ? (U(), k("section", {
      key: 0,
      style: We("max-width:" + e.maxWidth + "px")
    }, [
      (U(!0), k(z, null, lt(s.properties.split(","), (o) => (U(), k(z, null, [
        o == "title" && e.circleAvatarLayout ? (U(), k(z, { key: 0 }, [
          e.wikidata.title ? (U(), k("div", pl, Me(e.wikidata.title), 1)) : me("", !0)
        ], 64)) : o == "image" && e.circleAvatarLayout ? (U(), k("div", {
          key: 1,
          class: "thumbnail-round",
          style: We("background-image: url(" + e.wikidata.thumbnail + ");")
        }, null, 4)) : me("", !0)
      ], 64))), 256))
    ], 4)) : me("", !0),
    mt("section", {
      class: "vanes",
      style: We("max-width:" + e.maxWidth + "px")
    }, [
      e.errorMsg ? (U(), k("div", ml, Me(e.errorMsg), 1)) : me("", !0),
      (U(!0), k(z, null, lt(s.properties.split(","), (o) => (U(), k(z, null, [
        o == "title" && !e.circleAvatarLayout ? (U(), k(z, { key: 0 }, [
          e.wikidata.title ? (U(), k("div", gl, Me(e.wikidata.title), 1)) : me("", !0)
        ], 64)) : o == "image" && !e.circleAvatarLayout ? (U(), k(z, { key: 1 }, [
          e.wikidata.thumbnail ? (U(), k("img", {
            key: 0,
            class: "thumbnail",
            style: We("max-width:" + e.maxWidth + "px; max-height:200px;"),
            src: e.wikidata.thumbnail
          }, null, 12, _l)) : me("", !0)
        ], 64)) : o == "abstract" ? (U(), k(z, { key: 2 }, [
          e.wikidata.abstract && e.wikidata.abstract.length > 0 ? (U(), k(z, { key: 0 }, [
            mt("div", bl, [
              Pr(Me(e.wikidata.abstract[0]) + " ", 1),
              e.showMoreAbstract == !1 ? (U(), k("a", {
                key: 0,
                class: "abstract-more",
                onClick: t[0] || (t[0] = ol((c) => e.showMoreAbstract = !0, ["prevent"])),
                href: "#"
              }, "more...")) : me("", !0)
            ]),
            e.showMoreAbstract == !0 ? (U(), k("div", yl, [
              (U(!0), k(z, null, lt(e.wikidata.abstract.slice(1), (c) => (U(), k("div", null, Me(c), 1))), 256))
            ])) : me("", !0)
          ], 64)) : me("", !0)
        ], 64)) : o == "line" ? (U(), k("hr", wl)) : (U(), k("div", vl, [
          e.wikidata.claims && e.wikidata.claims[o] ? (U(), k("div", El, Me(e.wikidataPropertyMap[o]), 1)) : me("", !0),
          e.wikidata.claims ? (U(!0), k(z, { key: 1 }, lt(e.wikidata.claims[o], (c) => (U(), k("div", xl, [
            (U(!0), k(z, null, lt(c, (u) => (U(), k(z, null, [
              u.qid ? (U(), k("div", Pl, [
                mt("a", {
                  target: "_blank",
                  href: "https://www.wikidata.org/entity/" + u.qid
                }, Me(u.label), 9, Sl)
              ])) : (U(), k("span", Cl, Me(u.label), 1))
            ], 64))), 256))
          ]))), 256)) : me("", !0)
        ]))
      ], 64))), 256))
    ], 4)
  ]);
}
const Al = /* @__PURE__ */ ul(dl, [["render", Ol], ["styles", [fl]]]), Rl = /* @__PURE__ */ sl(Al);
customElements.define("meta-vane", Rl);
