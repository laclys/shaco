import { jsx as Oe } from 'react/jsx-runtime'
import { hydrateRoot as Te } from 'react-dom/client'
import m, { createContext as ke } from 'react'
function ce(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e
}
var se = { exports: {} },
  Pe = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED',
  we = Pe,
  Ce = we
function le() {}
function ue() {}
ue.resetWarningCache = le
var Le = function () {
  function e(s, f, l, E, R, u) {
    if (u !== Ce) {
      var c = new Error(
        'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
      )
      throw ((c.name = 'Invariant Violation'), c)
    }
  }
  e.isRequired = e
  function t() {
    return e
  }
  var n = {
    array: e,
    bigint: e,
    bool: e,
    func: e,
    number: e,
    object: e,
    string: e,
    symbol: e,
    any: e,
    arrayOf: t,
    element: e,
    elementType: e,
    instanceOf: t,
    node: e,
    objectOf: t,
    oneOf: t,
    oneOfType: t,
    shape: t,
    exact: t,
    checkPropTypes: ue,
    resetWarningCache: le
  }
  return (n.PropTypes = n), n
}
se.exports = Le()
var xe = se.exports
const a = ce(xe)
var Q = {
  BASE: 'base',
  BODY: 'body',
  HEAD: 'head',
  HTML: 'html',
  LINK: 'link',
  META: 'meta',
  NOSCRIPT: 'noscript',
  SCRIPT: 'script',
  STYLE: 'style',
  TITLE: 'title',
  FRAGMENT: 'Symbol(react.fragment)'
}
Object.keys(Q).map(function (e) {
  return Q[e]
})
var X = {
  accesskey: 'accessKey',
  charset: 'charSet',
  class: 'className',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  'http-equiv': 'httpEquiv',
  itemprop: 'itemProp',
  tabindex: 'tabIndex'
}
Object.keys(X).reduce(function (e, t) {
  return (e[X[t]] = t), e
}, {})
m.createContext({})
var Ae = a.shape({
  setHelmet: a.func,
  helmetInstances: a.shape({ get: a.func, add: a.func, remove: a.func })
})
a.shape({ helmet: a.shape() }), a.node.isRequired
Ae.isRequired
a.object,
  a.object,
  a.oneOfType([a.arrayOf(a.node), a.node]),
  a.string,
  a.bool,
  a.bool,
  a.object,
  a.arrayOf(a.object),
  a.arrayOf(a.object),
  a.arrayOf(a.object),
  a.func,
  a.arrayOf(a.object),
  a.arrayOf(a.object),
  a.string,
  a.object,
  a.string,
  a.bool,
  a.object
const $e = {
    title: 'xxx',
    description: 'SSG Framework',
    themeConfig: {
      nav: [
        { text: 'Index', link: '/' },
        { text: 'Introduction', link: '/shaco/build/guide/' }
      ],
      sidebar: {
        '/shaco/build/guide/': [
          {
            text: 'Introduction',
            items: [
              { text: 'Touma Kamijou', link: '/shaco/build/guide/a' },
              { text: 'Uiharu Kazari', link: '/shaco/build/guide/b' },
              { text: 'Misaka Imouto', link: '/shaco/build/guide/c' }
            ]
          }
        ]
      }
    },
    vite: {}
  },
  Ie = 'modulepreload',
  je = function (e) {
    return '/' + e
  },
  Z = {},
  g = function (t, n, s) {
    if (!n || n.length === 0) return t()
    const f = document.getElementsByTagName('link')
    return Promise.all(
      n.map((l) => {
        if (((l = je(l)), l in Z)) return
        Z[l] = !0
        const E = l.endsWith('.css'),
          R = E ? '[rel="stylesheet"]' : ''
        if (!!s)
          for (let S = f.length - 1; S >= 0; S--) {
            const O = f[S]
            if (O.href === l && (!E || O.rel === 'stylesheet')) return
          }
        else if (document.querySelector(`link[href="${l}"]${R}`)) return
        const c = document.createElement('link')
        if (
          ((c.rel = E ? 'stylesheet' : Ie),
          E || ((c.as = 'script'), (c.crossOrigin = '')),
          (c.href = l),
          document.head.appendChild(c),
          E)
        )
          return new Promise((S, O) => {
            c.addEventListener('load', S),
              c.addEventListener('error', () =>
                O(new Error(`Unable to preload CSS for ${l}`))
              )
          })
      })
    ).then(() => t())
  }
function ee(e, t) {
  if (e == null) return {}
  var n = {},
    s = Object.keys(e),
    f,
    l
  for (l = 0; l < s.length; l++)
    (f = s[l]), !(t.indexOf(f) >= 0) && (n[f] = e[f])
  return n
}
function P() {
  return (
    (P = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t]
            for (var s in n)
              Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s])
          }
          return e
        }),
    P.apply(this, arguments)
  )
}
function te(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  return e
}
function V(e, t) {
  return (
    (V = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (s, f) {
          return (s.__proto__ = f), s
        }),
    V(e, t)
  )
}
function De(e, t) {
  ;(e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    V(e, t)
}
var fe = { exports: {} },
  i = {}
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var d = typeof Symbol == 'function' && Symbol.for,
  M = d ? Symbol.for('react.element') : 60103,
  q = d ? Symbol.for('react.portal') : 60106,
  w = d ? Symbol.for('react.fragment') : 60107,
  C = d ? Symbol.for('react.strict_mode') : 60108,
  L = d ? Symbol.for('react.profiler') : 60114,
  x = d ? Symbol.for('react.provider') : 60109,
  A = d ? Symbol.for('react.context') : 60110,
  W = d ? Symbol.for('react.async_mode') : 60111,
  $ = d ? Symbol.for('react.concurrent_mode') : 60111,
  I = d ? Symbol.for('react.forward_ref') : 60112,
  j = d ? Symbol.for('react.suspense') : 60113,
  Ne = d ? Symbol.for('react.suspense_list') : 60120,
  D = d ? Symbol.for('react.memo') : 60115,
  N = d ? Symbol.for('react.lazy') : 60116,
  Ke = d ? Symbol.for('react.block') : 60121,
  ze = d ? Symbol.for('react.fundamental') : 60117,
  Fe = d ? Symbol.for('react.responder') : 60118,
  Ve = d ? Symbol.for('react.scope') : 60119
function b(e) {
  if (typeof e == 'object' && e !== null) {
    var t = e.$$typeof
    switch (t) {
      case M:
        switch (((e = e.type), e)) {
          case W:
          case $:
          case w:
          case L:
          case C:
          case j:
            return e
          default:
            switch (((e = e && e.$$typeof), e)) {
              case A:
              case I:
              case N:
              case D:
              case x:
                return e
              default:
                return t
            }
        }
      case q:
        return t
    }
  }
}
function de(e) {
  return b(e) === $
}
i.AsyncMode = W
i.ConcurrentMode = $
i.ContextConsumer = A
i.ContextProvider = x
i.Element = M
i.ForwardRef = I
i.Fragment = w
i.Lazy = N
i.Memo = D
i.Portal = q
i.Profiler = L
i.StrictMode = C
i.Suspense = j
i.isAsyncMode = function (e) {
  return de(e) || b(e) === W
}
i.isConcurrentMode = de
i.isContextConsumer = function (e) {
  return b(e) === A
}
i.isContextProvider = function (e) {
  return b(e) === x
}
i.isElement = function (e) {
  return typeof e == 'object' && e !== null && e.$$typeof === M
}
i.isForwardRef = function (e) {
  return b(e) === I
}
i.isFragment = function (e) {
  return b(e) === w
}
i.isLazy = function (e) {
  return b(e) === N
}
i.isMemo = function (e) {
  return b(e) === D
}
i.isPortal = function (e) {
  return b(e) === q
}
i.isProfiler = function (e) {
  return b(e) === L
}
i.isStrictMode = function (e) {
  return b(e) === C
}
i.isSuspense = function (e) {
  return b(e) === j
}
i.isValidElementType = function (e) {
  return (
    typeof e == 'string' ||
    typeof e == 'function' ||
    e === w ||
    e === $ ||
    e === L ||
    e === C ||
    e === j ||
    e === Ne ||
    (typeof e == 'object' &&
      e !== null &&
      (e.$$typeof === N ||
        e.$$typeof === D ||
        e.$$typeof === x ||
        e.$$typeof === A ||
        e.$$typeof === I ||
        e.$$typeof === ze ||
        e.$$typeof === Fe ||
        e.$$typeof === Ve ||
        e.$$typeof === Ke))
  )
}
i.typeOf = b
fe.exports = i
var pe = fe.exports,
  U = pe,
  Me = {
    childContextTypes: !0,
    contextType: !0,
    contextTypes: !0,
    defaultProps: !0,
    displayName: !0,
    getDefaultProps: !0,
    getDerivedStateFromError: !0,
    getDerivedStateFromProps: !0,
    mixins: !0,
    propTypes: !0,
    type: !0
  },
  qe = {
    name: !0,
    length: !0,
    prototype: !0,
    caller: !0,
    callee: !0,
    arguments: !0,
    arity: !0
  },
  We = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0
  },
  _e = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0
  },
  B = {}
B[U.ForwardRef] = We
B[U.Memo] = _e
function re(e) {
  return U.isMemo(e) ? _e : B[e.$$typeof] || Me
}
var Ue = Object.defineProperty,
  Be = Object.getOwnPropertyNames,
  ne = Object.getOwnPropertySymbols,
  He = Object.getOwnPropertyDescriptor,
  Ye = Object.getPrototypeOf,
  oe = Object.prototype
function ye(e, t, n) {
  if (typeof t != 'string') {
    if (oe) {
      var s = Ye(t)
      s && s !== oe && ye(e, s, n)
    }
    var f = Be(t)
    ne && (f = f.concat(ne(t)))
    for (var l = re(e), E = re(t), R = 0; R < f.length; ++R) {
      var u = f[R]
      if (!qe[u] && !(n && n[u]) && !(E && E[u]) && !(l && l[u])) {
        var c = He(t, u)
        try {
          Ue(e, u, c)
        } catch {}
      }
    }
  }
  return e
}
var Ge = ye
const Je = ce(Ge)
function Qe(e, t) {
  if (!e) {
    var n = new Error('loadable: ' + t)
    throw ((n.framesToPop = 1), (n.name = 'Invariant Violation'), n)
  }
}
var Xe = m.createContext(),
  Ze = { initialChunks: {} },
  ae = 'PENDING',
  et = 'RESOLVED',
  F = 'REJECTED'
function tt(e) {
  return typeof e == 'function'
    ? { requireAsync: e, resolve: function () {}, chunkName: function () {} }
    : e
}
var rt = function (t) {
    var n = function (f) {
      return m.createElement(Xe.Consumer, null, function (l) {
        return m.createElement(t, Object.assign({ __chunkExtractor: l }, f))
      })
    }
    return (
      t.displayName && (n.displayName = t.displayName + 'WithChunkExtractor'), n
    )
  },
  nt = function (t) {
    return t
  }
function me(e) {
  var t = e.defaultResolveComponent,
    n = t === void 0 ? nt : t,
    s = e.render,
    f = e.onLoad
  function l(R, u) {
    u === void 0 && (u = {})
    var c = tt(R),
      S = {}
    function O(y) {
      return u.cacheKey ? u.cacheKey(y) : c.resolve ? c.resolve(y) : 'static'
    }
    function H(y, h, p) {
      var o = u.resolveComponent ? u.resolveComponent(y, h) : n(y)
      if (u.resolveComponent && !pe.isValidElementType(o))
        throw new Error(
          'resolveComponent returned something that is not a React component!'
        )
      return Je(p, o, { preload: !0 }), o
    }
    var Y = function (h) {
        var p = O(h),
          o = S[p]
        return (
          (!o || o.status === F) &&
            ((o = c.requireAsync(h)),
            (o.status = ae),
            (S[p] = o),
            o.then(
              function () {
                o.status = et
              },
              function (r) {
                console.error(
                  'loadable-components: failed to asynchronously load component',
                  {
                    fileName: c.resolve(h),
                    chunkName: c.chunkName(h),
                    error: r && r.message
                  }
                ),
                  (o.status = F)
              }
            )),
          o
        )
      },
      be = (function (y) {
        De(h, y),
          (h.getDerivedStateFromProps = function (r, _) {
            var v = O(r)
            return P({}, _, {
              cacheKey: v,
              loading: _.loading || _.cacheKey !== v
            })
          })
        function h(o) {
          var r
          return (
            (r = y.call(this, o) || this),
            (r.state = {
              result: null,
              error: null,
              loading: !0,
              cacheKey: O(o)
            }),
            Qe(
              !o.__chunkExtractor || c.requireSync,
              'SSR requires `@loadable/babel-plugin`, please install it'
            ),
            o.__chunkExtractor
              ? (u.ssr === !1 ||
                  (c.requireAsync(o).catch(function () {
                    return null
                  }),
                  r.loadSync(),
                  o.__chunkExtractor.addChunk(c.chunkName(o))),
                te(r))
              : (u.ssr !== !1 &&
                  ((c.isReady && c.isReady(o)) ||
                    (c.chunkName && Ze.initialChunks[c.chunkName(o)])) &&
                  r.loadSync(),
                r)
          )
        }
        var p = h.prototype
        return (
          (p.componentDidMount = function () {
            this.mounted = !0
            var r = this.getCache()
            r && r.status === F && this.setCache(),
              this.state.loading && this.loadAsync()
          }),
          (p.componentDidUpdate = function (r, _) {
            _.cacheKey !== this.state.cacheKey && this.loadAsync()
          }),
          (p.componentWillUnmount = function () {
            this.mounted = !1
          }),
          (p.safeSetState = function (r, _) {
            this.mounted && this.setState(r, _)
          }),
          (p.getCacheKey = function () {
            return O(this.props)
          }),
          (p.getCache = function () {
            return S[this.getCacheKey()]
          }),
          (p.setCache = function (r) {
            r === void 0 && (r = void 0), (S[this.getCacheKey()] = r)
          }),
          (p.triggerOnLoad = function () {
            var r = this
            f &&
              setTimeout(function () {
                f(r.state.result, r.props)
              })
          }),
          (p.loadSync = function () {
            if (this.state.loading)
              try {
                var r = c.requireSync(this.props),
                  _ = H(r, this.props, T)
                ;(this.state.result = _), (this.state.loading = !1)
              } catch (v) {
                console.error(
                  'loadable-components: failed to synchronously load component, which expected to be available',
                  {
                    fileName: c.resolve(this.props),
                    chunkName: c.chunkName(this.props),
                    error: v && v.message
                  }
                ),
                  (this.state.error = v)
              }
          }),
          (p.loadAsync = function () {
            var r = this,
              _ = this.resolveAsync()
            return (
              _.then(function (v) {
                var K = H(v, r.props, T)
                r.safeSetState({ result: K, loading: !1 }, function () {
                  return r.triggerOnLoad()
                })
              }).catch(function (v) {
                return r.safeSetState({ error: v, loading: !1 })
              }),
              _
            )
          }),
          (p.resolveAsync = function () {
            var r = this.props
            r.__chunkExtractor, r.forwardedRef
            var _ = ee(r, ['__chunkExtractor', 'forwardedRef'])
            return Y(_)
          }),
          (p.render = function () {
            var r = this.props,
              _ = r.forwardedRef,
              v = r.fallback
            r.__chunkExtractor
            var K = ee(r, ['forwardedRef', 'fallback', '__chunkExtractor']),
              z = this.state,
              G = z.error,
              Ee = z.loading,
              Se = z.result
            if (u.suspense) {
              var Re = this.getCache() || this.loadAsync()
              if (Re.status === ae) throw this.loadAsync()
            }
            if (G) throw G
            var J = v || u.fallback || null
            return Ee
              ? J
              : s({
                  fallback: J,
                  result: Se,
                  options: u,
                  props: P({}, K, { ref: _ })
                })
          }),
          h
        )
      })(m.Component),
      ge = rt(be),
      T = m.forwardRef(function (y, h) {
        return m.createElement(ge, Object.assign({ forwardedRef: h }, y))
      })
    return (
      (T.displayName = 'Loadable'),
      (T.preload = function (y) {
        T.load(y)
      }),
      (T.load = function (y) {
        return Y(y)
      }),
      T
    )
  }
  function E(R, u) {
    return l(R, P({}, u, { suspense: !0 }))
  }
  return { loadable: l, lazy: E }
}
function ot(e) {
  return e.__esModule ? e.default : e.default || e
}
var he = me({
    defaultResolveComponent: ot,
    render: function (t) {
      var n = t.result,
        s = t.props
      return m.createElement(n, s)
    }
  }),
  at = he.loadable,
  it = he.lazy,
  ve = me({
    onLoad: function (t, n) {
      t &&
        n.forwardedRef &&
        (typeof n.forwardedRef == 'function'
          ? n.forwardedRef(t)
          : (n.forwardedRef.current = t))
    },
    render: function (t) {
      var n = t.result,
        s = t.props
      return s.children ? s.children(n) : null
    }
  }),
  ct = ve.loadable,
  st = ve.lazy,
  k = at
k.lib = ct
var lt = it
lt.lib = st
const ut = k(() => g(() => import('./b-4c3b67e5.js'), [])),
  ft = k(() => g(() => import('./a-fe448b46.js'), [])),
  dt = k(() => g(() => import('./b-c9039e47.js'), [])),
  pt = k(() => g(() => import('./c-e8a79aa7.js'), [])),
  _t = k(() => g(() => import('./index-70bf152a.js'), [])),
  yt = k(() => g(() => import('./index-b6b7abc4.js'), []))
m.createElement(ut),
  m.createElement(ft),
  m.createElement(dt),
  m.createElement(pt),
  m.createElement(_t),
  m.createElement(yt)
ke({})
const mt = 'appearance',
  ht = (e = !1) => {
    const t = document.documentElement.classList
    e ? t.add('dark') : t.remove('dark')
  },
  ie = () => {
    const e = localStorage.getItem(mt)
    ht(e === 'dark')
  }
typeof window < 'u' &&
  typeof localStorage < 'u' &&
  (ie(), window.addEventListener('storage', ie))
async function vt() {
  if ((console.log('siteData', $e), !document.getElementById('root')))
    throw new Error('#root element not found')
  {
    const t = document.querySelectorAll('[__island]')
    if (t.length === 0) return
    for (const n of t) {
      const [s, f] = n.getAttribute('__island').split(':'),
        l = window.ISLANDS[s]
      Te(n, Oe(l, { ...window.ISLAND_PROPS[f] }))
    }
  }
}
vt()
