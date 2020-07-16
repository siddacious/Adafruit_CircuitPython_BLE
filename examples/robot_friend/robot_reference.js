// expanded from the minified version:  https://droid.bap.dev/main-es2015.8985822994dac99e631e.js
// https://medium.com/@baptistelaget/controlling-disneys-droids-from-droid-depots-with-webbluetooth-febbabe50587
// working site: https://droid.bap.dev/
// fun starts around line  6136; search for 09b600a0
(window.webpackJsonp = window.webpackJsonp || []).push([[1], {
    0: function(e, t, n) {
        e.exports = n("zUnb")
    },
    zUnb: function(e, t, n) {
        "use strict";
        function r(e) {
            return "function" == typeof e
        }
        n.r(t);
        let s = !1;
        const i = {
            Promise: void 0,
            set useDeprecatedSynchronousErrorHandling(e) {
                if (e) {
                    const e = new Error;
                    console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" + e.stack)
                } else
                    s && console.log("RxJS: Back to a better error behavior. Thank you. <3");
                s = e
            },
            get useDeprecatedSynchronousErrorHandling() {
                return s
            }
        };
        function o(e) {
            setTimeout(()=>{
                throw e
            }
            )
        }
        const l = {
            closed: !0,
            next(e) {},
            error(e) {
                if (i.useDeprecatedSynchronousErrorHandling)
                    throw e;
                o(e)
            },
            complete() {}
        }
          , a = Array.isArray || (e=>e && "number" == typeof e.length);
        function u(e) {
            return null !== e && "object" == typeof e
        }
        function c(e) {
            return Error.call(this),
            this.message = e ? `${e.length} errors occurred during unsubscription:\n${e.map((e,t)=>`${t + 1}) ${e.toString()}`).join("\n  ")}` : "",
            this.name = "UnsubscriptionError",
            this.errors = e,
            this
        }
        c.prototype = Object.create(Error.prototype);
        const d = c;
        let h = (()=>{
            class e {
                constructor(e) {
                    this.closed = !1,
                    this._parent = null,
                    this._parents = null,
                    this._subscriptions = null,
                    e && (this._unsubscribe = e)
                }
                unsubscribe() {
                    let e, t = !1;
                    if (this.closed)
                        return;
                    let {_parent: n, _parents: s, _unsubscribe: i, _subscriptions: o} = this;
                    this.closed = !0,
                    this._parent = null,
                    this._parents = null,
                    this._subscriptions = null;
                    let l = -1
                      , c = s ? s.length : 0;
                    for (; n; )
                        n.remove(this),
                        n = ++l < c && s[l] || null;
                    if (r(i))
                        try {
                            i.call(this)
                        } catch (h) {
                            t = !0,
                            e = h instanceof d ? p(h.errors) : [h]
                        }
                    if (a(o))
                        for (l = -1,
                        c = o.length; ++l < c; ) {
                            const n = o[l];
                            if (u(n))
                                try {
                                    n.unsubscribe()
                                } catch (h) {
                                    t = !0,
                                    e = e || [],
                                    h instanceof d ? e = e.concat(p(h.errors)) : e.push(h)
                                }
                        }
                    if (t)
                        throw new d(e)
                }
                add(t) {
                    let n = t;
                    switch (typeof t) {
                    case "function":
                        n = new e(t);
                    case "object":
                        if (n === this || n.closed || "function" != typeof n.unsubscribe)
                            return n;
                        if (this.closed)
                            return n.unsubscribe(),
                            n;
                        if (!(n instanceof e)) {
                            const t = n;
                            n = new e,
                            n._subscriptions = [t]
                        }
                        break;
                    default:
                        if (!t)
                            return e.EMPTY;
                        throw new Error("unrecognized teardown " + t + " added to Subscription.")
                    }
                    if (n._addParent(this)) {
                        const e = this._subscriptions;
                        e ? e.push(n) : this._subscriptions = [n]
                    }
                    return n
                }
                remove(e) {
                    const t = this._subscriptions;
                    if (t) {
                        const n = t.indexOf(e);
                        -1 !== n && t.splice(n, 1)
                    }
                }
                _addParent(e) {
                    let {_parent: t, _parents: n} = this;
                    return t !== e && (t ? n ? -1 === n.indexOf(e) && (n.push(e),
                    !0) : (this._parents = [e],
                    !0) : (this._parent = e,
                    !0))
                }
            }
            return e.EMPTY = function(e) {
                return e.closed = !0,
                e
            }(new e),
            e
        }
        )();
        function p(e) {
            return e.reduce((e,t)=>e.concat(t instanceof d ? t.errors : t), [])
        }
        const f = "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random();
        class g extends h {
            constructor(e, t, n) {
                switch (super(),
                this.syncErrorValue = null,
                this.syncErrorThrown = !1,
                this.syncErrorThrowable = !1,
                this.isStopped = !1,
                arguments.length) {
                case 0:
                    this.destination = l;
                    break;
                case 1:
                    if (!e) {
                        this.destination = l;
                        break
                    }
                    if ("object" == typeof e) {
                        e instanceof g ? (this.syncErrorThrowable = e.syncErrorThrowable,
                        this.destination = e,
                        e.add(this)) : (this.syncErrorThrowable = !0,
                        this.destination = new m(this,e));
                        break
                    }
                default:
                    this.syncErrorThrowable = !0,
                    this.destination = new m(this,e,t,n)
                }
            }
            [f]() {
                return this
            }
            static create(e, t, n) {
                const r = new g(e,t,n);
                return r.syncErrorThrowable = !1,
                r
            }
            next(e) {
                this.isStopped || this._next(e)
            }
            error(e) {
                this.isStopped || (this.isStopped = !0,
                this._error(e))
            }
            complete() {
                this.isStopped || (this.isStopped = !0,
                this._complete())
            }
            unsubscribe() {
                this.closed || (this.isStopped = !0,
                super.unsubscribe())
            }
            _next(e) {
                this.destination.next(e)
            }
            _error(e) {
                this.destination.error(e),
                this.unsubscribe()
            }
            _complete() {
                this.destination.complete(),
                this.unsubscribe()
            }
            _unsubscribeAndRecycle() {
                const {_parent: e, _parents: t} = this;
                return this._parent = null,
                this._parents = null,
                this.unsubscribe(),
                this.closed = !1,
                this.isStopped = !1,
                this._parent = e,
                this._parents = t,
                this
            }
        }
        class m extends g {
            constructor(e, t, n, s) {
                let i;
                super(),
                this._parentSubscriber = e;
                let o = this;
                r(t) ? i = t : t && (i = t.next,
                n = t.error,
                s = t.complete,
                t !== l && (o = Object.create(t),
                r(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                o.unsubscribe = this.unsubscribe.bind(this))),
                this._context = o,
                this._next = i,
                this._error = n,
                this._complete = s
            }
            next(e) {
                if (!this.isStopped && this._next) {
                    const {_parentSubscriber: t} = this;
                    i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe() : this.__tryOrUnsub(this._next, e)
                }
            }
            error(e) {
                if (!this.isStopped) {
                    const {_parentSubscriber: t} = this
                      , {useDeprecatedSynchronousErrorHandling: n} = i;
                    if (this._error)
                        n && t.syncErrorThrowable ? (this.__tryOrSetError(t, this._error, e),
                        this.unsubscribe()) : (this.__tryOrUnsub(this._error, e),
                        this.unsubscribe());
                    else if (t.syncErrorThrowable)
                        n ? (t.syncErrorValue = e,
                        t.syncErrorThrown = !0) : o(e),
                        this.unsubscribe();
                    else {
                        if (this.unsubscribe(),
                        n)
                            throw e;
                        o(e)
                    }
                }
            }
            complete() {
                if (!this.isStopped) {
                    const {_parentSubscriber: e} = this;
                    if (this._complete) {
                        const t = ()=>this._complete.call(this._context);
                        i.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? (this.__tryOrSetError(e, t),
                        this.unsubscribe()) : (this.__tryOrUnsub(t),
                        this.unsubscribe())
                    } else
                        this.unsubscribe()
                }
            }
            __tryOrUnsub(e, t) {
                try {
                    e.call(this._context, t)
                } catch (n) {
                    if (this.unsubscribe(),
                    i.useDeprecatedSynchronousErrorHandling)
                        throw n;
                    o(n)
                }
            }
            __tryOrSetError(e, t, n) {
                if (!i.useDeprecatedSynchronousErrorHandling)
                    throw new Error("bad call");
                try {
                    t.call(this._context, n)
                } catch (r) {
                    return i.useDeprecatedSynchronousErrorHandling ? (e.syncErrorValue = r,
                    e.syncErrorThrown = !0,
                    !0) : (o(r),
                    !0)
                }
                return !1
            }
            _unsubscribe() {
                const {_parentSubscriber: e} = this;
                this._context = null,
                this._parentSubscriber = null,
                e.unsubscribe()
            }
        }
        const _ = "function" == typeof Symbol && Symbol.observable || "@@observable";
        function y() {}
        let v = (()=>{
            class e {
                constructor(e) {
                    this._isScalar = !1,
                    e && (this._subscribe = e)
                }
                lift(t) {
                    const n = new e;
                    return n.source = this,
                    n.operator = t,
                    n
                }
                subscribe(e, t, n) {
                    const {operator: r} = this
                      , s = function(e, t, n) {
                        if (e) {
                            if (e instanceof g)
                                return e;
                            if (e[f])
                                return e[f]()
                        }
                        return e || t || n ? new g(e,t,n) : new g(l)
                    }(e, t, n);
                    if (s.add(r ? r.call(s, this.source) : this.source || i.useDeprecatedSynchronousErrorHandling && !s.syncErrorThrowable ? this._subscribe(s) : this._trySubscribe(s)),
                    i.useDeprecatedSynchronousErrorHandling && s.syncErrorThrowable && (s.syncErrorThrowable = !1,
                    s.syncErrorThrown))
                        throw s.syncErrorValue;
                    return s
                }
                _trySubscribe(e) {
                    try {
                        return this._subscribe(e)
                    } catch (t) {
                        i.useDeprecatedSynchronousErrorHandling && (e.syncErrorThrown = !0,
                        e.syncErrorValue = t),
                        function(e) {
                            for (; e; ) {
                                const {closed: t, destination: n, isStopped: r} = e;
                                if (t || r)
                                    return !1;
                                e = n && n instanceof g ? n : null
                            }
                            return !0
                        }(e) ? e.error(t) : console.warn(t)
                    }
                }
                forEach(e, t) {
                    return new (t = w(t))((t,n)=>{
                        let r;
                        r = this.subscribe(t=>{
                            try {
                                e(t)
                            } catch (s) {
                                n(s),
                                r && r.unsubscribe()
                            }
                        }
                        , n, t)
                    }
                    )
                }
                _subscribe(e) {
                    const {source: t} = this;
                    return t && t.subscribe(e)
                }
                [_]() {
                    return this
                }
                pipe(...e) {
                    return 0 === e.length ? this : ((t = e) ? 1 === t.length ? t[0] : function(e) {
                        return t.reduce((e,t)=>t(e), e)
                    }
                    : y)(this);
                    var t
                }
                toPromise(e) {
                    return new (e = w(e))((e,t)=>{
                        let n;
                        this.subscribe(e=>n = e, e=>t(e), ()=>e(n))
                    }
                    )
                }
            }
            return e.create = t=>new e(t),
            e
        }
        )();
        function w(e) {
            if (e || (e = i.Promise || Promise),
            !e)
                throw new Error("no Promise impl found");
            return e
        }
        function b() {
            return Error.call(this),
            this.message = "object unsubscribed",
            this.name = "ObjectUnsubscribedError",
            this
        }
        b.prototype = Object.create(Error.prototype);
        const C = b;
        class E extends h {
            constructor(e, t) {
                super(),
                this.subject = e,
                this.subscriber = t,
                this.closed = !1
            }
            unsubscribe() {
                if (this.closed)
                    return;
                this.closed = !0;
                const e = this.subject
                  , t = e.observers;
                if (this.subject = null,
                !t || 0 === t.length || e.isStopped || e.closed)
                    return;
                const n = t.indexOf(this.subscriber);
                -1 !== n && t.splice(n, 1)
            }
        }
        class x extends g {
            constructor(e) {
                super(e),
                this.destination = e
            }
        }
        let k = (()=>{
            class e extends v {
                constructor() {
                    super(),
                    this.observers = [],
                    this.closed = !1,
                    this.isStopped = !1,
                    this.hasError = !1,
                    this.thrownError = null
                }
                [f]() {
                    return new x(this)
                }
                lift(e) {
                    const t = new T(this,this);
                    return t.operator = e,
                    t
                }
                next(e) {
                    if (this.closed)
                        throw new C;
                    if (!this.isStopped) {
                        const {observers: t} = this
                          , n = t.length
                          , r = t.slice();
                        for (let s = 0; s < n; s++)
                            r[s].next(e)
                    }
                }
                error(e) {
                    if (this.closed)
                        throw new C;
                    this.hasError = !0,
                    this.thrownError = e,
                    this.isStopped = !0;
                    const {observers: t} = this
                      , n = t.length
                      , r = t.slice();
                    for (let s = 0; s < n; s++)
                        r[s].error(e);
                    this.observers.length = 0
                }
                complete() {
                    if (this.closed)
                        throw new C;
                    this.isStopped = !0;
                    const {observers: e} = this
                      , t = e.length
                      , n = e.slice();
                    for (let r = 0; r < t; r++)
                        n[r].complete();
                    this.observers.length = 0
                }
                unsubscribe() {
                    this.isStopped = !0,
                    this.closed = !0,
                    this.observers = null
                }
                _trySubscribe(e) {
                    if (this.closed)
                        throw new C;
                    return super._trySubscribe(e)
                }
                _subscribe(e) {
                    if (this.closed)
                        throw new C;
                    return this.hasError ? (e.error(this.thrownError),
                    h.EMPTY) : this.isStopped ? (e.complete(),
                    h.EMPTY) : (this.observers.push(e),
                    new E(this,e))
                }
                asObservable() {
                    const e = new v;
                    return e.source = this,
                    e
                }
            }
            return e.create = (e,t)=>new T(e,t),
            e
        }
        )();
        class T extends k {
            constructor(e, t) {
                super(),
                this.destination = e,
                this.source = t
            }
            next(e) {
                const {destination: t} = this;
                t && t.next && t.next(e)
            }
            error(e) {
                const {destination: t} = this;
                t && t.error && this.destination.error(e)
            }
            complete() {
                const {destination: e} = this;
                e && e.complete && this.destination.complete()
            }
            _subscribe(e) {
                const {source: t} = this;
                return t ? this.source.subscribe(e) : h.EMPTY
            }
        }
        class S extends g {
            constructor(e, t, n) {
                super(),
                this.parent = e,
                this.outerValue = t,
                this.outerIndex = n,
                this.index = 0
            }
            _next(e) {
                this.parent.notifyNext(this.outerValue, e, this.outerIndex, this.index++, this)
            }
            _error(e) {
                this.parent.notifyError(e, this),
                this.unsubscribe()
            }
            _complete() {
                this.parent.notifyComplete(this),
                this.unsubscribe()
            }
        }
        const I = e=>t=>{
            for (let n = 0, r = e.length; n < r && !t.closed; n++)
                t.next(e[n]);
            t.closed || t.complete()
        }
          , A = e=>t=>(e.then(e=>{
            t.closed || (t.next(e),
            t.complete())
        }
        , e=>t.error(e)).then(null, o),
        t);
        function N() {
            return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
        }
        const V = N()
          , D = e=>t=>{
            const n = e[V]();
            for (; ; ) {
                const e = n.next();
                if (e.done) {
                    t.complete();
                    break
                }
                if (t.next(e.value),
                t.closed)
                    break
            }
            return "function" == typeof n.return && t.add(()=>{
                n.return && n.return()
            }
            ),
            t
        }
          , O = e=>t=>{
            const n = e[_]();
            if ("function" != typeof n.subscribe)
                throw new TypeError("Provided object does not correctly implement Symbol.observable");
            return n.subscribe(t)
        }
          , M = e=>e && "number" == typeof e.length && "function" != typeof e;
        function R(e) {
            return !!e && "function" != typeof e.subscribe && "function" == typeof e.then
        }
        const P = e=>{
            if (e instanceof v)
                return t=>e._isScalar ? (t.next(e.value),
                void t.complete()) : e.subscribe(t);
            if (e && "function" == typeof e[_])
                return O(e);
            if (M(e))
                return I(e);
            if (R(e))
                return A(e);
            if (e && "function" == typeof e[V])
                return D(e);
            {
                const t = u(e) ? "an invalid object" : `'${e}'`;
                throw new TypeError(`You provided ${t} where a stream was expected.` + " You can provide an Observable, Promise, Array, or Iterable.")
            }
        }
        ;
        function F(e, t, n, r, s=new S(e,n,r)) {
            if (!s.closed)
                return P(t)(s)
        }
        class L extends g {
            notifyNext(e, t, n, r, s) {
                this.destination.next(t)
            }
            notifyError(e, t) {
                this.destination.error(e)
            }
            notifyComplete(e) {
                this.destination.complete()
            }
        }
        function j(e, t) {
            return function(n) {
                if ("function" != typeof e)
                    throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
                return n.lift(new H(e,t))
            }
        }
        class H {
            constructor(e, t) {
                this.project = e,
                this.thisArg = t
            }
            call(e, t) {
                return t.subscribe(new B(e,this.project,this.thisArg))
            }
        }
        class B extends g {
            constructor(e, t, n) {
                super(e),
                this.project = t,
                this.count = 0,
                this.thisArg = n || this
            }
            _next(e) {
                let t;
                try {
                    t = this.project.call(this.thisArg, e, this.count++)
                } catch (n) {
                    return void this.destination.error(n)
                }
                this.destination.next(t)
            }
        }
        function $(e, t) {
            return new v(t ? n=>{
                const r = new h;
                let s = 0;
                return r.add(t.schedule((function() {
                    s !== e.length ? (n.next(e[s++]),
                    n.closed || r.add(this.schedule())) : n.complete()
                }
                ))),
                r
            }
            : I(e))
        }
        function U(e, t) {
            if (!t)
                return e instanceof v ? e : new v(P(e));
            if (null != e) {
                if (function(e) {
                    return e && "function" == typeof e[_]
                }(e))
                    return function(e, t) {
                        return new v(t ? n=>{
                            const r = new h;
                            return r.add(t.schedule(()=>{
                                const s = e[_]();
                                r.add(s.subscribe({
                                    next(e) {
                                        r.add(t.schedule(()=>n.next(e)))
                                    },
                                    error(e) {
                                        r.add(t.schedule(()=>n.error(e)))
                                    },
                                    complete() {
                                        r.add(t.schedule(()=>n.complete()))
                                    }
                                }))
                            }
                            )),
                            r
                        }
                        : O(e))
                    }(e, t);
                if (R(e))
                    return function(e, t) {
                        return new v(t ? n=>{
                            const r = new h;
                            return r.add(t.schedule(()=>e.then(e=>{
                                r.add(t.schedule(()=>{
                                    n.next(e),
                                    r.add(t.schedule(()=>n.complete()))
                                }
                                ))
                            }
                            , e=>{
                                r.add(t.schedule(()=>n.error(e)))
                            }
                            ))),
                            r
                        }
                        : A(e))
                    }(e, t);
                if (M(e))
                    return $(e, t);
                if (function(e) {
                    return e && "function" == typeof e[V]
                }(e) || "string" == typeof e)
                    return function(e, t) {
                        if (!e)
                            throw new Error("Iterable cannot be null");
                        return new v(t ? n=>{
                            const r = new h;
                            let s;
                            return r.add(()=>{
                                s && "function" == typeof s.return && s.return()
                            }
                            ),
                            r.add(t.schedule(()=>{
                                s = e[V](),
                                r.add(t.schedule((function() {
                                    if (n.closed)
                                        return;
                                    let e, t;
                                    try {
                                        const n = s.next();
                                        e = n.value,
                                        t = n.done
                                    } catch (r) {
                                        return void n.error(r)
                                    }
                                    t ? n.complete() : (n.next(e),
                                    this.schedule())
                                }
                                )))
                            }
                            )),
                            r
                        }
                        : D(e))
                    }(e, t)
            }
            throw new TypeError((null !== e && typeof e || e) + " is not observable")
        }
        class z {
            constructor(e, t=Number.POSITIVE_INFINITY) {
                this.project = e,
                this.concurrent = t
            }
            call(e, t) {
                return t.subscribe(new Z(e,this.project,this.concurrent))
            }
        }
        class Z extends L {
            constructor(e, t, n=Number.POSITIVE_INFINITY) {
                super(e),
                this.project = t,
                this.concurrent = n,
                this.hasCompleted = !1,
                this.buffer = [],
                this.active = 0,
                this.index = 0
            }
            _next(e) {
                this.active < this.concurrent ? this._tryNext(e) : this.buffer.push(e)
            }
            _tryNext(e) {
                let t;
                const n = this.index++;
                try {
                    t = this.project(e, n)
                } catch (r) {
                    return void this.destination.error(r)
                }
                this.active++,
                this._innerSub(t, e, n)
            }
            _innerSub(e, t, n) {
                const r = new S(this,void 0,void 0);
                this.destination.add(r),
                F(this, e, t, n, r)
            }
            _complete() {
                this.hasCompleted = !0,
                0 === this.active && 0 === this.buffer.length && this.destination.complete(),
                this.unsubscribe()
            }
            notifyNext(e, t, n, r, s) {
                this.destination.next(t)
            }
            notifyComplete(e) {
                const t = this.buffer;
                this.remove(e),
                this.active--,
                t.length > 0 ? this._next(t.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete()
            }
        }
        function G(e) {
            return e
        }
        function W() {
            return function(e) {
                return e.lift(new q(e))
            }
        }
        class q {
            constructor(e) {
                this.connectable = e
            }
            call(e, t) {
                const {connectable: n} = this;
                n._refCount++;
                const r = new Q(e,n)
                  , s = t.subscribe(r);
                return r.closed || (r.connection = n.connect()),
                s
            }
        }
        class Q extends g {
            constructor(e, t) {
                super(e),
                this.connectable = t
            }
            _unsubscribe() {
                const {connectable: e} = this;
                if (!e)
                    return void (this.connection = null);
                this.connectable = null;
                const t = e._refCount;
                if (t <= 0)
                    return void (this.connection = null);
                if (e._refCount = t - 1,
                t > 1)
                    return void (this.connection = null);
                const {connection: n} = this
                  , r = e._connection;
                this.connection = null,
                !r || n && r !== n || r.unsubscribe()
            }
        }
        const K = class extends v {
            constructor(e, t) {
                super(),
                this.source = e,
                this.subjectFactory = t,
                this._refCount = 0,
                this._isComplete = !1
            }
            _subscribe(e) {
                return this.getSubject().subscribe(e)
            }
            getSubject() {
                const e = this._subject;
                return e && !e.isStopped || (this._subject = this.subjectFactory()),
                this._subject
            }
            connect() {
                let e = this._connection;
                return e || (this._isComplete = !1,
                e = this._connection = new h,
                e.add(this.source.subscribe(new Y(this.getSubject(),this))),
                e.closed ? (this._connection = null,
                e = h.EMPTY) : this._connection = e),
                e
            }
            refCount() {
                return W()(this)
            }
        }
        .prototype
          , J = {
            operator: {
                value: null
            },
            _refCount: {
                value: 0,
                writable: !0
            },
            _subject: {
                value: null,
                writable: !0
            },
            _connection: {
                value: null,
                writable: !0
            },
            _subscribe: {
                value: K._subscribe
            },
            _isComplete: {
                value: K._isComplete,
                writable: !0
            },
            getSubject: {
                value: K.getSubject
            },
            connect: {
                value: K.connect
            },
            refCount: {
                value: K.refCount
            }
        };
        class Y extends x {
            constructor(e, t) {
                super(e),
                this.connectable = t
            }
            _error(e) {
                this._unsubscribe(),
                super._error(e)
            }
            _complete() {
                this.connectable._isComplete = !0,
                this._unsubscribe(),
                super._complete()
            }
            _unsubscribe() {
                const e = this.connectable;
                if (e) {
                    this.connectable = null;
                    const t = e._connection;
                    e._refCount = 0,
                    e._subject = null,
                    e._connection = null,
                    t && t.unsubscribe()
                }
            }
        }
        function X() {
            return new k
        }
        function ee(e, t, n) {
            const r = function(e) {
                return function(...t) {
                    if (e) {
                        const n = e(...t);
                        for (const e in n)
                            this[e] = n[e]
                    }
                }
            }(t);
            function s(...e) {
                if (this instanceof s)
                    return r.apply(this, e),
                    this;
                const t = new s(...e);
                return n.annotation = t,
                n;
                function n(e, n, r) {
                    const s = e.hasOwnProperty("__parameters__") ? e.__parameters__ : Object.defineProperty(e, "__parameters__", {
                        value: []
                    }).__parameters__;
                    for (; s.length <= r; )
                        s.push(null);
                    return (s[r] = s[r] || []).push(t),
                    e
                }
            }
            return n && (s.prototype = Object.create(n.prototype)),
            s.prototype.ngMetadataName = e,
            s.annotationCls = s,
            s
        }
        const te = ee("Inject", e=>({
            token: e
        }))
          , ne = ee("Optional")
          , re = ee("Self")
          , se = ee("SkipSelf");
        var ie = function(e) {
            return e[e.Default = 0] = "Default",
            e[e.Host = 1] = "Host",
            e[e.Self = 2] = "Self",
            e[e.SkipSelf = 4] = "SkipSelf",
            e[e.Optional = 8] = "Optional",
            e
        }({});
        function oe(e) {
            for (let t in e)
                if (e[t] === oe)
                    return t;
            throw Error("Could not find renamed property on target object.")
        }
        function le(e) {
            return {
                token: e.token,
                providedIn: e.providedIn || null,
                factory: e.factory,
                value: void 0
            }
        }
        function ae(e) {
            const t = e[ue];
            return t && t.token === e ? t : null
        }
        const ue = oe({
            ngInjectableDef: oe
        });
        function ce(e) {
            if ("string" == typeof e)
                return e;
            if (e instanceof Array)
                return "[" + e.map(ce).join(", ") + "]";
            if (null == e)
                return "" + e;
            if (e.overriddenName)
                return `${e.overriddenName}`;
            if (e.name)
                return `${e.name}`;
            const t = e.toString();
            if (null == t)
                return "" + t;
            const n = t.indexOf("\n");
            return -1 === n ? t : t.substring(0, n)
        }
        const de = oe({
            __forward_ref__: oe
        });
        function he(e) {
            return e.__forward_ref__ = he,
            e.toString = function() {
                return ce(this())
            }
            ,
            e
        }
        function pe(e) {
            const t = e;
            return "function" == typeof t && t.hasOwnProperty(de) && t.__forward_ref__ === he ? t() : e
        }
        const fe = "undefined" != typeof globalThis && globalThis
          , ge = "undefined" != typeof window && window
          , me = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self
          , _e = "undefined" != typeof global && global
          , ye = fe || _e || ge || me;
        class ve {
            constructor(e, t) {
                this._desc = e,
                this.ngMetadataName = "InjectionToken",
                this.ngInjectableDef = void 0,
                "number" == typeof t ? this.__NG_ELEMENT_ID__ = t : void 0 !== t && (this.ngInjectableDef = le({
                    token: this,
                    providedIn: t.providedIn || "root",
                    factory: t.factory
                }))
            }
            toString() {
                return `InjectionToken ${this._desc}`
            }
        }
        const we = new ve("INJECTOR",-1)
          , be = new Object
          , Ce = /\n/gm
          , Ee = oe({
            provide: String,
            useValue: oe
        });
        let xe = void 0;
        function ke(e) {
            const t = xe;
            return xe = e,
            t
        }
        class Te {
            get(e, t=be) {
                if (t === be) {
                    const t = new Error(`NullInjectorError: No provider for ${ce(e)}!`);
                    throw t.name = "NullInjectorError",
                    t
                }
                return t
            }
        }
        function Se(e, t, n, r=null) {
            e = e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1) ? e.substr(2) : e;
            let s = ce(t);
            if (t instanceof Array)
                s = t.map(ce).join(" -> ");
            else if ("object" == typeof t) {
                let e = [];
                for (let n in t)
                    if (t.hasOwnProperty(n)) {
                        let r = t[n];
                        e.push(n + ":" + ("string" == typeof r ? JSON.stringify(r) : ce(r)))
                    }
                s = `{${e.join(", ")}}`
            }
            return `${n}${r ? "(" + r + ")" : ""}[${s}]: ${e.replace(Ce, "\n  ")}`
        }
        class Ie {
        }
        function Ae(e, t, n) {
            t >= e.length ? e.push(n) : e.splice(t, 0, n)
        }
        function Ne(e, t) {
            return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
        }
        const Ve = function() {
            var e = {
                Emulated: 0,
                Native: 1,
                None: 2,
                ShadowDom: 3
            };
            return e[e.Emulated] = "Emulated",
            e[e.Native] = "Native",
            e[e.None] = "None",
            e[e.ShadowDom] = "ShadowDom",
            e
        }()
          , De = (()=>("undefined" != typeof requestAnimationFrame && requestAnimationFrame || setTimeout).bind(ye))();
        function Oe(e) {
            return e.ngDebugContext
        }
        function Me(e) {
            return e.ngOriginalError
        }
        function Re(e, ...t) {
            e.error(...t)
        }
        class Pe {
            constructor() {
                this._console = console
            }
            handleError(e) {
                const t = this._findOriginalError(e)
                  , n = this._findContext(e)
                  , r = function(e) {
                    return e.ngErrorLogger || Re
                }(e);
                r(this._console, "ERROR", e),
                t && r(this._console, "ORIGINAL ERROR", t),
                n && r(this._console, "ERROR CONTEXT", n)
            }
            _findContext(e) {
                return e ? Oe(e) ? Oe(e) : this._findContext(Me(e)) : null
            }
            _findOriginalError(e) {
                let t = Me(e);
                for (; t && Me(t); )
                    t = Me(t);
                return t
            }
        }
        let Fe = !0
          , Le = !1;
        function je() {
            return Le = !0,
            Fe
        }
        class He {
            constructor(e) {
                if (this.defaultDoc = e,
                this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert"),
                this.inertBodyElement = this.inertDocument.body,
                null == this.inertBodyElement) {
                    const e = this.inertDocument.createElement("html");
                    this.inertDocument.appendChild(e),
                    this.inertBodyElement = this.inertDocument.createElement("body"),
                    e.appendChild(this.inertBodyElement)
                }
                this.inertBodyElement.innerHTML = '<svg><g onload="this.parentNode.remove()"></g></svg>',
                !this.inertBodyElement.querySelector || this.inertBodyElement.querySelector("svg") ? (this.inertBodyElement.innerHTML = '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">',
                this.getInertBodyElement = this.inertBodyElement.querySelector && this.inertBodyElement.querySelector("svg img") && function() {
                    try {
                        return !!window.DOMParser
                    } catch (e) {
                        return !1
                    }
                }() ? this.getInertBodyElement_DOMParser : this.getInertBodyElement_InertDocument) : this.getInertBodyElement = this.getInertBodyElement_XHR
            }
            getInertBodyElement_XHR(e) {
                e = "<body><remove></remove>" + e + "</body>";
                try {
                    e = encodeURI(e)
                } catch (r) {
                    return null
                }
                const t = new XMLHttpRequest;
                t.responseType = "document",
                t.open("GET", "data:text/html;charset=utf-8," + e, !1),
                t.send(void 0);
                const n = t.response.body;
                return n.removeChild(n.firstChild),
                n
            }
            getInertBodyElement_DOMParser(e) {
                e = "<body><remove></remove>" + e + "</body>";
                try {
                    const t = (new window.DOMParser).parseFromString(e, "text/html").body;
                    return t.removeChild(t.firstChild),
                    t
                } catch (t) {
                    return null
                }
            }
            getInertBodyElement_InertDocument(e) {
                const t = this.inertDocument.createElement("template");
                return "content"in t ? (t.innerHTML = e,
                t) : (this.inertBodyElement.innerHTML = e,
                this.defaultDoc.documentMode && this.stripCustomNsAttrs(this.inertBodyElement),
                this.inertBodyElement)
            }
            stripCustomNsAttrs(e) {
                const t = e.attributes;
                for (let r = t.length - 1; 0 < r; r--) {
                    const n = t.item(r).name;
                    "xmlns:ns1" !== n && 0 !== n.indexOf("ns1:") || e.removeAttribute(n)
                }
                let n = e.firstChild;
                for (; n; )
                    n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n),
                    n = n.nextSibling
            }
        }
        const Be = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi
          , $e = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
        function Ue(e) {
            return (e = String(e)).match(Be) || e.match($e) ? e : (je() && console.warn(`WARNING: sanitizing unsafe URL value ${e} (see http://g.co/ng/security#xss)`),
            "unsafe:" + e)
        }
        function ze(e) {
            const t = {};
            for (const n of e.split(","))
                t[n] = !0;
            return t
        }
        function Ze(...e) {
            const t = {};
            for (const n of e)
                for (const e in n)
                    n.hasOwnProperty(e) && (t[e] = !0);
            return t
        }
        const Ge = ze("area,br,col,hr,img,wbr")
          , We = ze("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr")
          , qe = ze("rp,rt")
          , Qe = Ze(qe, We)
          , Ke = Ze(Ge, Ze(We, ze("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")), Ze(qe, ze("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")), Qe)
          , Je = ze("background,cite,href,itemtype,longdesc,poster,src,xlink:href")
          , Ye = ze("srcset")
          , Xe = Ze(Je, Ye, ze("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"), ze("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"))
          , et = ze("script,style,template");
        class tt {
            constructor() {
                this.sanitizedSomething = !1,
                this.buf = []
            }
            sanitizeChildren(e) {
                let t = e.firstChild
                  , n = !0;
                for (; t; )
                    if (t.nodeType === Node.ELEMENT_NODE ? n = this.startElement(t) : t.nodeType === Node.TEXT_NODE ? this.chars(t.nodeValue) : this.sanitizedSomething = !0,
                    n && t.firstChild)
                        t = t.firstChild;
                    else
                        for (; t; ) {
                            t.nodeType === Node.ELEMENT_NODE && this.endElement(t);
                            let e = this.checkClobberedElement(t, t.nextSibling);
                            if (e) {
                                t = e;
                                break
                            }
                            t = this.checkClobberedElement(t, t.parentNode)
                        }
                return this.buf.join("")
            }
            startElement(e) {
                const t = e.nodeName.toLowerCase();
                if (!Ke.hasOwnProperty(t))
                    return this.sanitizedSomething = !0,
                    !et.hasOwnProperty(t);
                this.buf.push("<"),
                this.buf.push(t);
                const n = e.attributes;
                for (let s = 0; s < n.length; s++) {
                    const e = n.item(s)
                      , t = e.name
                      , i = t.toLowerCase();
                    if (!Xe.hasOwnProperty(i)) {
                        this.sanitizedSomething = !0;
                        continue
                    }
                    let o = e.value;
                    Je[i] && (o = Ue(o)),
                    Ye[i] && (r = o,
                    o = (r = String(r)).split(",").map(e=>Ue(e.trim())).join(", ")),
                    this.buf.push(" ", t, '="', st(o), '"')
                }
                var r;
                return this.buf.push(">"),
                !0
            }
            endElement(e) {
                const t = e.nodeName.toLowerCase();
                Ke.hasOwnProperty(t) && !Ge.hasOwnProperty(t) && (this.buf.push("</"),
                this.buf.push(t),
                this.buf.push(">"))
            }
            chars(e) {
                this.buf.push(st(e))
            }
            checkClobberedElement(e, t) {
                if (t && (e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY)
                    throw new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`);
                return t
            }
        }
        const nt = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
          , rt = /([^\#-~ |!])/g;
        function st(e) {
            return e.replace(/&/g, "&amp;").replace(nt, (function(e) {
                return "&#" + (1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320) + 65536) + ";"
            }
            )).replace(rt, (function(e) {
                return "&#" + e.charCodeAt(0) + ";"
            }
            )).replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }
        let it;
        function ot(e) {
            return "content"in e && function(e) {
                return e.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === e.nodeName
            }(e) ? e.content : null
        }
        const lt = function() {
            var e = {
                NONE: 0,
                HTML: 1,
                STYLE: 2,
                SCRIPT: 3,
                URL: 4,
                RESOURCE_URL: 5
            };
            return e[e.NONE] = "NONE",
            e[e.HTML] = "HTML",
            e[e.STYLE] = "STYLE",
            e[e.SCRIPT] = "SCRIPT",
            e[e.URL] = "URL",
            e[e.RESOURCE_URL] = "RESOURCE_URL",
            e
        }();
        class at {
        }
        const ut = new RegExp("^([-,.\"'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|Z|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:calc|attr))\\([-0-9.%, #a-zA-Z]+\\))$","g")
          , ct = /^url\(([^)]+)\)$/
          , dt = /([A-Z])/g;
        function ht(e) {
            try {
                return null != e ? e.toString().slice(0, 30) : e
            } catch (t) {
                return "[ERROR] Exception while trying to serialize the value"
            }
        }
        let pt = (()=>{
            class e {
            }
            return e.__NG_ELEMENT_ID__ = ()=>ft(),
            e
        }
        )();
        const ft = (...e)=>{}
          , gt = new ve("The presence of this token marks an injector as being the root injector.")
          , mt = function(e, t, n) {
            return new Ct(e,t,n)
        };
        let _t = (()=>{
            class e {
                static create(e, t) {
                    return Array.isArray(e) ? mt(e, t, "") : mt(e.providers, e.parent, e.name || "")
                }
            }
            return e.THROW_IF_NOT_FOUND = be,
            e.NULL = new Te,
            e.ngInjectableDef = le({
                token: e,
                providedIn: "any",
                factory: ()=>function(e, t=ie.Default) {
                    return function(e, t=ie.Default) {
                        if (void 0 === xe)
                            throw new Error("inject() must be called from an injection context");
                        return null === xe ? function(e, t, n) {
                            const r = ae(e);
                            if (r && "root" == r.providedIn)
                                return void 0 === r.value ? r.value = r.factory() : r.value;
                            if (n & ie.Optional)
                                return null;
                            throw new Error(`Injector: NOT_FOUND [${ce(e)}]`)
                        }(e, 0, t) : xe.get(e, t & ie.Optional ? null : void 0, t)
                    }(e, t)
                }(we)
            }),
            e.__NG_ELEMENT_ID__ = -1,
            e
        }
        )();
        const yt = function(e) {
            return e
        }
          , vt = []
          , wt = yt
          , bt = function() {
            return Array.prototype.slice.call(arguments)
        };
        class Ct {
            constructor(e, t=_t.NULL, n=null) {
                this.parent = t,
                this.source = n;
                const r = this._records = new Map;
                r.set(_t, {
                    token: _t,
                    fn: yt,
                    deps: vt,
                    value: this,
                    useNew: !1
                }),
                r.set(we, {
                    token: we,
                    fn: yt,
                    deps: vt,
                    value: this,
                    useNew: !1
                }),
                function e(t, n) {
                    if (n)
                        if ((n = pe(n))instanceof Array)
                            for (let r = 0; r < n.length; r++)
                                e(t, n[r]);
                        else {
                            if ("function" == typeof n)
                                throw xt("Function/Class not supported", n);
                            if (!n || "object" != typeof n || !n.provide)
                                throw xt("Unexpected provider", n);
                            {
                                let e = pe(n.provide);
                                const r = function(e) {
                                    const t = function(e) {
                                        let t = vt;
                                        const n = e.deps;
                                        if (n && n.length) {
                                            t = [];
                                            for (let e = 0; e < n.length; e++) {
                                                let r = 6
                                                  , s = pe(n[e]);
                                                if (s instanceof Array)
                                                    for (let e = 0, t = s; e < t.length; e++) {
                                                        const n = t[e];
                                                        n instanceof ne || n == ne ? r |= 1 : n instanceof se || n == se ? r &= -3 : n instanceof re || n == re ? r &= -5 : s = n instanceof te ? n.token : pe(n)
                                                    }
                                                t.push({
                                                    token: s,
                                                    options: r
                                                })
                                            }
                                        } else if (e.useExisting)
                                            t = [{
                                                token: pe(e.useExisting),
                                                options: 6
                                            }];
                                        else if (!(n || Ee in e))
                                            throw xt("'deps' required", e);
                                        return t
                                    }(e);
                                    let n = yt
                                      , r = vt
                                      , s = !1
                                      , i = pe(e.provide);
                                    if (Ee in e)
                                        r = e.useValue;
                                    else if (e.useFactory)
                                        n = e.useFactory;
                                    else if (e.useExisting)
                                        ;
                                    else if (e.useClass)
                                        s = !0,
                                        n = pe(e.useClass);
                                    else {
                                        if ("function" != typeof i)
                                            throw xt("StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable", e);
                                        s = !0,
                                        n = i
                                    }
                                    return {
                                        deps: t,
                                        fn: n,
                                        useNew: s,
                                        value: r
                                    }
                                }(n);
                                if (!0 === n.multi) {
                                    let r = t.get(e);
                                    if (r) {
                                        if (r.fn !== bt)
                                            throw Et(e)
                                    } else
                                        t.set(e, r = {
                                            token: n.provide,
                                            deps: [],
                                            useNew: !1,
                                            fn: bt,
                                            value: vt
                                        });
                                    e = n,
                                    r.deps.push({
                                        token: e,
                                        options: 6
                                    })
                                }
                                const s = t.get(e);
                                if (s && s.fn == bt)
                                    throw Et(e);
                                t.set(e, r)
                            }
                        }
                }(r, e)
            }
            get(e, t, n=ie.Default) {
                const r = this._records.get(e);
                try {
                    return function e(t, n, r, s, i, o) {
                        try {
                            return function(t, n, r, s, i, o) {
                                let l;
                                if (!n || o & ie.SkipSelf)
                                    o & ie.Self || (l = s.get(t, i, ie.Default));
                                else {
                                    if (l = n.value,
                                    l == wt)
                                        throw Error("\u0275Circular dependency");
                                    if (l === vt) {
                                        n.value = wt;
                                        let t = void 0
                                          , i = n.useNew
                                          , o = n.fn
                                          , a = n.deps
                                          , u = vt;
                                        if (a.length) {
                                            u = [];
                                            for (let t = 0; t < a.length; t++) {
                                                const n = a[t]
                                                  , i = n.options
                                                  , o = 2 & i ? r.get(n.token) : void 0;
                                                u.push(e(n.token, o, r, o || 4 & i ? s : _t.NULL, 1 & i ? null : _t.THROW_IF_NOT_FOUND, ie.Default))
                                            }
                                        }
                                        n.value = l = i ? new o(...u) : o.apply(t, u)
                                    }
                                }
                                return l
                            }(t, n, r, s, i, o)
                        } catch (l) {
                            throw l instanceof Error || (l = new Error(l)),
                            (l.ngTempTokenPath = l.ngTempTokenPath || []).unshift(t),
                            n && n.value == wt && (n.value = vt),
                            l
                        }
                    }(e, r, this._records, this.parent, t, n)
                } catch (s) {
                    return function(e, t, n, r) {
                        const s = e.ngTempTokenPath;
                        throw t.__source && s.unshift(t.__source),
                        e.message = Se("\n" + e.message, s, "StaticInjectorError", r),
                        e.ngTokenPath = s,
                        e.ngTempTokenPath = null,
                        e
                    }(s, e, 0, this.source)
                }
            }
            toString() {
                const e = [];
                return this._records.forEach((t,n)=>e.push(ce(n))),
                `StaticInjector[${e.join(", ")}]`
            }
        }
        function Et(e) {
            return xt("Cannot mix multi providers and regular providers", e)
        }
        function xt(e, t) {
            return new Error(Se(e, t, "StaticInjectorError"))
        }
        let kt = null;
        function Tt() {
            if (!kt) {
                const e = ye.Symbol;
                if (e && e.iterator)
                    kt = e.iterator;
                else {
                    const e = Object.getOwnPropertyNames(Map.prototype);
                    for (let t = 0; t < e.length; ++t) {
                        const n = e[t];
                        "entries" !== n && "size" !== n && Map.prototype[n] === Map.prototype.entries && (kt = n)
                    }
                }
            }
            return kt
        }
        function St(e, t) {
            return e === t || "number" == typeof e && "number" == typeof t && isNaN(e) && isNaN(t)
        }
        function It(e, t) {
            const n = Nt(e)
              , r = Nt(t);
            if (n && r)
                return function(e, t, n) {
                    const r = e[Tt()]()
                      , s = t[Tt()]();
                    for (; ; ) {
                        const e = r.next()
                          , t = s.next();
                        if (e.done && t.done)
                            return !0;
                        if (e.done || t.done)
                            return !1;
                        if (!n(e.value, t.value))
                            return !1
                    }
                }(e, t, It);
            {
                const s = e && ("object" == typeof e || "function" == typeof e)
                  , i = t && ("object" == typeof t || "function" == typeof t);
                return !(n || !s || r || !i) || St(e, t)
            }
        }
        class At {
            constructor(e) {
                this.wrapped = e
            }
            static wrap(e) {
                return new At(e)
            }
            static unwrap(e) {
                return At.isWrapped(e) ? e.wrapped : e
            }
            static isWrapped(e) {
                return e instanceof At
            }
        }
        function Nt(e) {
            return !!Vt(e) && (Array.isArray(e) || !(e instanceof Map) && Tt()in e)
        }
        function Vt(e) {
            return null !== e && ("function" == typeof e || "object" == typeof e)
        }
        function Dt(e) {
            return !!e && "function" == typeof e.then
        }
        function Ot(e) {
            return !!e && "function" == typeof e.subscribe
        }
        class Mt {
            constructor(e, t, n) {
                this.previousValue = e,
                this.currentValue = t,
                this.firstChange = n
            }
            isFirstChange() {
                return this.firstChange
            }
        }
        class Rt {
        }
        function Pt(e) {
            const t = Error(`No component factory found for ${ce(e)}. Did you add it to @NgModule.entryComponents?`);
            return t[Ft] = e,
            t
        }
        const Ft = "ngComponent";
        class Lt {
            resolveComponentFactory(e) {
                throw Pt(e)
            }
        }
        let jt = (()=>{
            class e {
            }
            return e.NULL = new Lt,
            e
        }
        )();
        class Ht {
            constructor(e, t, n) {
                this._parent = t,
                this._ngModule = n,
                this._factories = new Map;
                for (let r = 0; r < e.length; r++) {
                    const t = e[r];
                    this._factories.set(t.componentType, t)
                }
            }
            resolveComponentFactory(e) {
                let t = this._factories.get(e);
                if (!t && this._parent && (t = this._parent.resolveComponentFactory(e)),
                !t)
                    throw Pt(e);
                return new Bt(t,this._ngModule)
            }
        }
        class Bt extends Rt {
            constructor(e, t) {
                super(),
                this.factory = e,
                this.ngModule = t,
                this.selector = e.selector,
                this.componentType = e.componentType,
                this.ngContentSelectors = e.ngContentSelectors,
                this.inputs = e.inputs,
                this.outputs = e.outputs
            }
            create(e, t, n, r) {
                return this.factory.create(e, t, n, r || this.ngModule)
            }
        }
        function $t(...e) {}
        let Ut = (()=>{
            class e {
                constructor(e) {
                    this.nativeElement = e
                }
            }
            return e.__NG_ELEMENT_ID__ = ()=>zt(e),
            e
        }
        )();
        const zt = $t;
        class Zt {
        }
        class Gt {
        }
        const Wt = function() {
            var e = {
                Important: 1,
                DashCase: 2
            };
            return e[e.Important] = "Important",
            e[e.DashCase] = "DashCase",
            e
        }();
        let qt = (()=>{
            class e {
            }
            return e.__NG_ELEMENT_ID__ = ()=>Qt(),
            e
        }
        )();
        const Qt = $t;
        class Kt {
            constructor(e) {
                this.full = e,
                this.major = e.split(".")[0],
                this.minor = e.split(".")[1],
                this.patch = e.split(".").slice(2).join(".")
            }
        }
        const Jt = new Kt("8.2.14");
        class Yt {
            constructor() {}
            supports(e) {
                return Nt(e)
            }
            create(e) {
                return new en(e)
            }
        }
        const Xt = (e,t)=>t;
        class en {
            constructor(e) {
                this.length = 0,
                this._linkedRecords = null,
                this._unlinkedRecords = null,
                this._previousItHead = null,
                this._itHead = null,
                this._itTail = null,
                this._additionsHead = null,
                this._additionsTail = null,
                this._movesHead = null,
                this._movesTail = null,
                this._removalsHead = null,
                this._removalsTail = null,
                this._identityChangesHead = null,
                this._identityChangesTail = null,
                this._trackByFn = e || Xt
            }
            forEachItem(e) {
                let t;
                for (t = this._itHead; null !== t; t = t._next)
                    e(t)
            }
            forEachOperation(e) {
                let t = this._itHead
                  , n = this._removalsHead
                  , r = 0
                  , s = null;
                for (; t || n; ) {
                    const i = !n || t && t.currentIndex < sn(n, r, s) ? t : n
                      , o = sn(i, r, s)
                      , l = i.currentIndex;
                    if (i === n)
                        r--,
                        n = n._nextRemoved;
                    else if (t = t._next,
                    null == i.previousIndex)
                        r++;
                    else {
                        s || (s = []);
                        const e = o - r
                          , t = l - r;
                        if (e != t) {
                            for (let n = 0; n < e; n++) {
                                const r = n < s.length ? s[n] : s[n] = 0
                                  , i = r + n;
                                t <= i && i < e && (s[n] = r + 1)
                            }
                            s[i.previousIndex] = t - e
                        }
                    }
                    o !== l && e(i, o, l)
                }
            }
            forEachPreviousItem(e) {
                let t;
                for (t = this._previousItHead; null !== t; t = t._nextPrevious)
                    e(t)
            }
            forEachAddedItem(e) {
                let t;
                for (t = this._additionsHead; null !== t; t = t._nextAdded)
                    e(t)
            }
            forEachMovedItem(e) {
                let t;
                for (t = this._movesHead; null !== t; t = t._nextMoved)
                    e(t)
            }
            forEachRemovedItem(e) {
                let t;
                for (t = this._removalsHead; null !== t; t = t._nextRemoved)
                    e(t)
            }
            forEachIdentityChange(e) {
                let t;
                for (t = this._identityChangesHead; null !== t; t = t._nextIdentityChange)
                    e(t)
            }
            diff(e) {
                if (null == e && (e = []),
                !Nt(e))
                    throw new Error(`Error trying to diff '${ce(e)}'. Only arrays and iterables are allowed`);
                return this.check(e) ? this : null
            }
            onDestroy() {}
            check(e) {
                this._reset();
                let t, n, r, s = this._itHead, i = !1;
                if (Array.isArray(e)) {
                    this.length = e.length;
                    for (let t = 0; t < this.length; t++)
                        n = e[t],
                        r = this._trackByFn(t, n),
                        null !== s && St(s.trackById, r) ? (i && (s = this._verifyReinsertion(s, n, r, t)),
                        St(s.item, n) || this._addIdentityChange(s, n)) : (s = this._mismatch(s, n, r, t),
                        i = !0),
                        s = s._next
                } else
                    t = 0,
                    function(e, t) {
                        if (Array.isArray(e))
                            for (let n = 0; n < e.length; n++)
                                t(e[n]);
                        else {
                            const n = e[Tt()]();
                            let r;
                            for (; !(r = n.next()).done; )
                                t(r.value)
                        }
                    }(e, e=>{
                        r = this._trackByFn(t, e),
                        null !== s && St(s.trackById, r) ? (i && (s = this._verifyReinsertion(s, e, r, t)),
                        St(s.item, e) || this._addIdentityChange(s, e)) : (s = this._mismatch(s, e, r, t),
                        i = !0),
                        s = s._next,
                        t++
                    }
                    ),
                    this.length = t;
                return this._truncate(s),
                this.collection = e,
                this.isDirty
            }
            get isDirty() {
                return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
            }
            _reset() {
                if (this.isDirty) {
                    let e, t;
                    for (e = this._previousItHead = this._itHead; null !== e; e = e._next)
                        e._nextPrevious = e._next;
                    for (e = this._additionsHead; null !== e; e = e._nextAdded)
                        e.previousIndex = e.currentIndex;
                    for (this._additionsHead = this._additionsTail = null,
                    e = this._movesHead; null !== e; e = t)
                        e.previousIndex = e.currentIndex,
                        t = e._nextMoved;
                    this._movesHead = this._movesTail = null,
                    this._removalsHead = this._removalsTail = null,
                    this._identityChangesHead = this._identityChangesTail = null
                }
            }
            _mismatch(e, t, n, r) {
                let s;
                return null === e ? s = this._itTail : (s = e._prev,
                this._remove(e)),
                null !== (e = null === this._linkedRecords ? null : this._linkedRecords.get(n, r)) ? (St(e.item, t) || this._addIdentityChange(e, t),
                this._moveAfter(e, s, r)) : null !== (e = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null)) ? (St(e.item, t) || this._addIdentityChange(e, t),
                this._reinsertAfter(e, s, r)) : e = this._addAfter(new tn(t,n), s, r),
                e
            }
            _verifyReinsertion(e, t, n, r) {
                let s = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null);
                return null !== s ? e = this._reinsertAfter(s, e._prev, r) : e.currentIndex != r && (e.currentIndex = r,
                this._addToMoves(e, r)),
                e
            }
            _truncate(e) {
                for (; null !== e; ) {
                    const t = e._next;
                    this._addToRemovals(this._unlink(e)),
                    e = t
                }
                null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
                null !== this._additionsTail && (this._additionsTail._nextAdded = null),
                null !== this._movesTail && (this._movesTail._nextMoved = null),
                null !== this._itTail && (this._itTail._next = null),
                null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
                null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
            }
            _reinsertAfter(e, t, n) {
                null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
                const r = e._prevRemoved
                  , s = e._nextRemoved;
                return null === r ? this._removalsHead = s : r._nextRemoved = s,
                null === s ? this._removalsTail = r : s._prevRemoved = r,
                this._insertAfter(e, t, n),
                this._addToMoves(e, n),
                e
            }
            _moveAfter(e, t, n) {
                return this._unlink(e),
                this._insertAfter(e, t, n),
                this._addToMoves(e, n),
                e
            }
            _addAfter(e, t, n) {
                return this._insertAfter(e, t, n),
                this._additionsTail = null === this._additionsTail ? this._additionsHead = e : this._additionsTail._nextAdded = e,
                e
            }
            _insertAfter(e, t, n) {
                const r = null === t ? this._itHead : t._next;
                return e._next = r,
                e._prev = t,
                null === r ? this._itTail = e : r._prev = e,
                null === t ? this._itHead = e : t._next = e,
                null === this._linkedRecords && (this._linkedRecords = new rn),
                this._linkedRecords.put(e),
                e.currentIndex = n,
                e
            }
            _remove(e) {
                return this._addToRemovals(this._unlink(e))
            }
            _unlink(e) {
                null !== this._linkedRecords && this._linkedRecords.remove(e);
                const t = e._prev
                  , n = e._next;
                return null === t ? this._itHead = n : t._next = n,
                null === n ? this._itTail = t : n._prev = t,
                e
            }
            _addToMoves(e, t) {
                return e.previousIndex === t ? e : (this._movesTail = null === this._movesTail ? this._movesHead = e : this._movesTail._nextMoved = e,
                e)
            }
            _addToRemovals(e) {
                return null === this._unlinkedRecords && (this._unlinkedRecords = new rn),
                this._unlinkedRecords.put(e),
                e.currentIndex = null,
                e._nextRemoved = null,
                null === this._removalsTail ? (this._removalsTail = this._removalsHead = e,
                e._prevRemoved = null) : (e._prevRemoved = this._removalsTail,
                this._removalsTail = this._removalsTail._nextRemoved = e),
                e
            }
            _addIdentityChange(e, t) {
                return e.item = t,
                this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = e : this._identityChangesTail._nextIdentityChange = e,
                e
            }
        }
        class tn {
            constructor(e, t) {
                this.item = e,
                this.trackById = t,
                this.currentIndex = null,
                this.previousIndex = null,
                this._nextPrevious = null,
                this._prev = null,
                this._next = null,
                this._prevDup = null,
                this._nextDup = null,
                this._prevRemoved = null,
                this._nextRemoved = null,
                this._nextAdded = null,
                this._nextMoved = null,
                this._nextIdentityChange = null
            }
        }
        class nn {
            constructor() {
                this._head = null,
                this._tail = null
            }
            add(e) {
                null === this._head ? (this._head = this._tail = e,
                e._nextDup = null,
                e._prevDup = null) : (this._tail._nextDup = e,
                e._prevDup = this._tail,
                e._nextDup = null,
                this._tail = e)
            }
            get(e, t) {
                let n;
                for (n = this._head; null !== n; n = n._nextDup)
                    if ((null === t || t <= n.currentIndex) && St(n.trackById, e))
                        return n;
                return null
            }
            remove(e) {
                const t = e._prevDup
                  , n = e._nextDup;
                return null === t ? this._head = n : t._nextDup = n,
                null === n ? this._tail = t : n._prevDup = t,
                null === this._head
            }
        }
        class rn {
            constructor() {
                this.map = new Map
            }
            put(e) {
                const t = e.trackById;
                let n = this.map.get(t);
                n || (n = new nn,
                this.map.set(t, n)),
                n.add(e)
            }
            get(e, t) {
                const n = this.map.get(e);
                return n ? n.get(e, t) : null
            }
            remove(e) {
                const t = e.trackById;
                return this.map.get(t).remove(e) && this.map.delete(t),
                e
            }
            get isEmpty() {
                return 0 === this.map.size
            }
            clear() {
                this.map.clear()
            }
        }
        function sn(e, t, n) {
            const r = e.previousIndex;
            if (null === r)
                return r;
            let s = 0;
            return n && r < n.length && (s = n[r]),
            r + t + s
        }
        class on {
            constructor() {}
            supports(e) {
                return e instanceof Map || Vt(e)
            }
            create() {
                return new ln
            }
        }
        class ln {
            constructor() {
                this._records = new Map,
                this._mapHead = null,
                this._appendAfter = null,
                this._previousMapHead = null,
                this._changesHead = null,
                this._changesTail = null,
                this._additionsHead = null,
                this._additionsTail = null,
                this._removalsHead = null,
                this._removalsTail = null
            }
            get isDirty() {
                return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
            }
            forEachItem(e) {
                let t;
                for (t = this._mapHead; null !== t; t = t._next)
                    e(t)
            }
            forEachPreviousItem(e) {
                let t;
                for (t = this._previousMapHead; null !== t; t = t._nextPrevious)
                    e(t)
            }
            forEachChangedItem(e) {
                let t;
                for (t = this._changesHead; null !== t; t = t._nextChanged)
                    e(t)
            }
            forEachAddedItem(e) {
                let t;
                for (t = this._additionsHead; null !== t; t = t._nextAdded)
                    e(t)
            }
            forEachRemovedItem(e) {
                let t;
                for (t = this._removalsHead; null !== t; t = t._nextRemoved)
                    e(t)
            }
            diff(e) {
                if (e) {
                    if (!(e instanceof Map || Vt(e)))
                        throw new Error(`Error trying to diff '${ce(e)}'. Only maps and objects are allowed`)
                } else
                    e = new Map;
                return this.check(e) ? this : null
            }
            onDestroy() {}
            check(e) {
                this._reset();
                let t = this._mapHead;
                if (this._appendAfter = null,
                this._forEach(e, (e,n)=>{
                    if (t && t.key === n)
                        this._maybeAddToChanges(t, e),
                        this._appendAfter = t,
                        t = t._next;
                    else {
                        const r = this._getOrCreateRecordForKey(n, e);
                        t = this._insertBeforeOrAppend(t, r)
                    }
                }
                ),
                t) {
                    t._prev && (t._prev._next = null),
                    this._removalsHead = t;
                    for (let e = t; null !== e; e = e._nextRemoved)
                        e === this._mapHead && (this._mapHead = null),
                        this._records.delete(e.key),
                        e._nextRemoved = e._next,
                        e.previousValue = e.currentValue,
                        e.currentValue = null,
                        e._prev = null,
                        e._next = null
                }
                return this._changesTail && (this._changesTail._nextChanged = null),
                this._additionsTail && (this._additionsTail._nextAdded = null),
                this.isDirty
            }
            _insertBeforeOrAppend(e, t) {
                if (e) {
                    const n = e._prev;
                    return t._next = e,
                    t._prev = n,
                    e._prev = t,
                    n && (n._next = t),
                    e === this._mapHead && (this._mapHead = t),
                    this._appendAfter = e,
                    e
                }
                return this._appendAfter ? (this._appendAfter._next = t,
                t._prev = this._appendAfter) : this._mapHead = t,
                this._appendAfter = t,
                null
            }
            _getOrCreateRecordForKey(e, t) {
                if (this._records.has(e)) {
                    const n = this._records.get(e);
                    this._maybeAddToChanges(n, t);
                    const r = n._prev
                      , s = n._next;
                    return r && (r._next = s),
                    s && (s._prev = r),
                    n._next = null,
                    n._prev = null,
                    n
                }
                const n = new an(e);
                return this._records.set(e, n),
                n.currentValue = t,
                this._addToAdditions(n),
                n
            }
            _reset() {
                if (this.isDirty) {
                    let e;
                    for (this._previousMapHead = this._mapHead,
                    e = this._previousMapHead; null !== e; e = e._next)
                        e._nextPrevious = e._next;
                    for (e = this._changesHead; null !== e; e = e._nextChanged)
                        e.previousValue = e.currentValue;
                    for (e = this._additionsHead; null != e; e = e._nextAdded)
                        e.previousValue = e.currentValue;
                    this._changesHead = this._changesTail = null,
                    this._additionsHead = this._additionsTail = null,
                    this._removalsHead = null
                }
            }
            _maybeAddToChanges(e, t) {
                St(t, e.currentValue) || (e.previousValue = e.currentValue,
                e.currentValue = t,
                this._addToChanges(e))
            }
            _addToAdditions(e) {
                null === this._additionsHead ? this._additionsHead = this._additionsTail = e : (this._additionsTail._nextAdded = e,
                this._additionsTail = e)
            }
            _addToChanges(e) {
                null === this._changesHead ? this._changesHead = this._changesTail = e : (this._changesTail._nextChanged = e,
                this._changesTail = e)
            }
            _forEach(e, t) {
                e instanceof Map ? e.forEach(t) : Object.keys(e).forEach(n=>t(e[n], n))
            }
        }
        class an {
            constructor(e) {
                this.key = e,
                this.previousValue = null,
                this.currentValue = null,
                this._nextPrevious = null,
                this._next = null,
                this._prev = null,
                this._nextAdded = null,
                this._nextRemoved = null,
                this._nextChanged = null
            }
        }
        let un = (()=>{
            class e {
                constructor(e) {
                    this.factories = e
                }
                static create(t, n) {
                    if (null != n) {
                        const e = n.factories.slice();
                        t = t.concat(e)
                    }
                    return new e(t)
                }
                static extend(t) {
                    return {
                        provide: e,
                        useFactory: n=>{
                            if (!n)
                                throw new Error("Cannot extend IterableDiffers without a parent injector");
                            return e.create(t, n)
                        }
                        ,
                        deps: [[e, new se, new ne]]
                    }
                }
                find(e) {
                    const t = this.factories.find(t=>t.supports(e));
                    if (null != t)
                        return t;
                    throw new Error(`Cannot find a differ supporting object '${e}' of type '${n = e,
                    n.name || typeof n}'`);
                    var n
                }
            }
            return e.ngInjectableDef = le({
                token: e,
                providedIn: "root",
                factory: ()=>new e([new Yt])
            }),
            e
        }
        )()
          , cn = (()=>{
            class e {
                constructor(e) {
                    this.factories = e
                }
                static create(t, n) {
                    if (n) {
                        const e = n.factories.slice();
                        t = t.concat(e)
                    }
                    return new e(t)
                }
                static extend(t) {
                    return {
                        provide: e,
                        useFactory: n=>{
                            if (!n)
                                throw new Error("Cannot extend KeyValueDiffers without a parent injector");
                            return e.create(t, n)
                        }
                        ,
                        deps: [[e, new se, new ne]]
                    }
                }
                find(e) {
                    const t = this.factories.find(t=>t.supports(e));
                    if (t)
                        return t;
                    throw new Error(`Cannot find a differ supporting object '${e}'`)
                }
            }
            return e.ngInjectableDef = le({
                token: e,
                providedIn: "root",
                factory: ()=>new e([new on])
            }),
            e
        }
        )();
        const dn = [new on]
          , hn = new un([new Yt])
          , pn = new cn(dn);
        let fn = (()=>{
            class e {
            }
            return e.__NG_ELEMENT_ID__ = ()=>gn(e, Ut),
            e
        }
        )();
        const gn = $t;
        let mn = (()=>{
            class e {
            }
            return e.__NG_ELEMENT_ID__ = ()=>_n(e, Ut),
            e
        }
        )();
        const _n = $t;
        function yn(e, t, n, r) {
            let s = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '${t}'. Current value: '${n}'.`;
            return r && (s += " It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook ?"),
            function(e, t) {
                const n = new Error(e);
                return vn(n, t),
                n
            }(s, e)
        }
        function vn(e, t) {
            e.ngDebugContext = t,
            e.ngErrorLogger = t.logError.bind(t)
        }
        function wn(e) {
            return new Error(`ViewDestroyedError: Attempt to use a destroyed view: ${e}`)
        }
        function bn(e, t, n) {
            const r = e.state
              , s = 1792 & r;
            return s === t ? (e.state = -1793 & r | n,
            e.initIndex = -1,
            !0) : s === n
        }
        function Cn(e, t, n) {
            return (1792 & e.state) === t && e.initIndex <= n && (e.initIndex = n + 1,
            !0)
        }
        function En(e, t) {
            return e.nodes[t]
        }
        function xn(e, t) {
            return e.nodes[t]
        }
        function kn(e, t) {
            return e.nodes[t]
        }
        function Tn(e, t) {
            return e.nodes[t]
        }
        function Sn(e, t) {
            return e.nodes[t]
        }
        const In = {
            setCurrentNode: void 0,
            createRootView: void 0,
            createEmbeddedView: void 0,
            createComponentView: void 0,
            createNgModuleRef: void 0,
            overrideProvider: void 0,
            overrideComponentView: void 0,
            clearOverrides: void 0,
            checkAndUpdateView: void 0,
            checkNoChangesView: void 0,
            destroyView: void 0,
            resolveDep: void 0,
            createDebugContext: void 0,
            handleEvent: void 0,
            updateDirectives: void 0,
            updateRenderer: void 0,
            dirtyParentQueries: void 0
        }
          , An = ()=>{}
          , Nn = new Map;
        function Vn(e) {
            let t = Nn.get(e);
            return t || (t = ce(e) + "_" + Nn.size,
            Nn.set(e, t)),
            t
        }
        function Dn(e) {
            return {
                id: "$$undefined",
                styles: e.styles,
                encapsulation: e.encapsulation,
                data: e.data
            }
        }
        let On = 0;
        function Mn(e, t, n, r) {
            return !(!(2 & e.state) && St(e.oldValues[t.bindingIndex + n], r))
        }
        function Rn(e, t, n, r) {
            return !!Mn(e, t, n, r) && (e.oldValues[t.bindingIndex + n] = r,
            !0)
        }
        function Pn(e, t, n, r) {
            const s = e.oldValues[t.bindingIndex + n];
            if (1 & e.state || !It(s, r)) {
                const i = t.bindings[n].name;
                throw yn(In.createDebugContext(e, t.nodeIndex), `${i}: ${s}`, `${i}: ${r}`, 0 != (1 & e.state))
            }
        }
        function Fn(e) {
            let t = e;
            for (; t; )
                2 & t.def.flags && (t.state |= 8),
                t = t.viewContainerParent || t.parent
        }
        function Ln(e, t) {
            let n = e;
            for (; n && n !== t; )
                n.state |= 64,
                n = n.viewContainerParent || n.parent
        }
        function jn(e, t, n, r) {
            try {
                return Fn(33554432 & e.def.nodes[t].flags ? xn(e, t).componentView : e),
                In.handleEvent(e, t, n, r)
            } catch (s) {
                e.root.errorHandler.handleError(s)
            }
        }
        function Hn(e) {
            return e.parent ? xn(e.parent, e.parentNodeDef.nodeIndex) : null
        }
        function Bn(e) {
            return e.parent ? e.parentNodeDef.parent : null
        }
        function $n(e, t) {
            switch (201347067 & t.flags) {
            case 1:
                return xn(e, t.nodeIndex).renderElement;
            case 2:
                return En(e, t.nodeIndex).renderText
            }
        }
        function Un(e) {
            return !!e.parent && !!(32768 & e.parentNodeDef.flags)
        }
        function zn(e) {
            return !(!e.parent || 32768 & e.parentNodeDef.flags)
        }
        function Zn(e) {
            const t = {};
            let n = 0;
            const r = {};
            return e && e.forEach(([e,s])=>{
                "number" == typeof e ? (t[e] = s,
                n |= function(e) {
                    return 1 << e % 32
                }(e)) : r[e] = s
            }
            ),
            {
                matchedQueries: t,
                references: r,
                matchedQueryIds: n
            }
        }
        function Gn(e, t) {
            return e.map(e=>{
                let n, r;
                return Array.isArray(e) ? [r,n] = e : (r = 0,
                n = e),
                n && ("function" == typeof n || "object" == typeof n) && t && Object.defineProperty(n, "__source", {
                    value: t,
                    configurable: !0
                }),
                {
                    flags: r,
                    token: n,
                    tokenKey: Vn(n)
                }
            }
            )
        }
        function Wn(e, t, n) {
            let r = n.renderParent;
            return r ? 0 == (1 & r.flags) || 0 == (33554432 & r.flags) || r.element.componentRendererType && r.element.componentRendererType.encapsulation === Ve.Native ? xn(e, n.renderParent.nodeIndex).renderElement : void 0 : t
        }
        const qn = new WeakMap;
        function Qn(e) {
            let t = qn.get(e);
            return t || (t = e(()=>An),
            t.factory = e,
            qn.set(e, t)),
            t
        }
        function Kn(e, t, n, r, s) {
            3 === t && (n = e.renderer.parentNode($n(e, e.def.lastRenderRootNode))),
            Jn(e, t, 0, e.def.nodes.length - 1, n, r, s)
        }
        function Jn(e, t, n, r, s, i, o) {
            for (let l = n; l <= r; l++) {
                const n = e.def.nodes[l];
                11 & n.flags && Xn(e, n, t, s, i, o),
                l += n.childCount
            }
        }
        function Yn(e, t, n, r, s, i) {
            let o = e;
            for (; o && !Un(o); )
                o = o.parent;
            const l = o.parent
              , a = Bn(o)
              , u = a.nodeIndex + a.childCount;
            for (let c = a.nodeIndex + 1; c <= u; c++) {
                const e = l.def.nodes[c];
                e.ngContentIndex === t && Xn(l, e, n, r, s, i),
                c += e.childCount
            }
            if (!l.parent) {
                const o = e.root.projectableNodes[t];
                if (o)
                    for (let t = 0; t < o.length; t++)
                        er(e, o[t], n, r, s, i)
            }
        }
        function Xn(e, t, n, r, s, i) {
            if (8 & t.flags)
                Yn(e, t.ngContent.index, n, r, s, i);
            else {
                const o = $n(e, t);
                if (3 === n && 33554432 & t.flags && 48 & t.bindingFlags ? (16 & t.bindingFlags && er(e, o, n, r, s, i),
                32 & t.bindingFlags && er(xn(e, t.nodeIndex).componentView, o, n, r, s, i)) : er(e, o, n, r, s, i),
                16777216 & t.flags) {
                    const o = xn(e, t.nodeIndex).viewContainer._embeddedViews;
                    for (let e = 0; e < o.length; e++)
                        Kn(o[e], n, r, s, i)
                }
                1 & t.flags && !t.element.name && Jn(e, n, t.nodeIndex + 1, t.nodeIndex + t.childCount, r, s, i)
            }
        }
        function er(e, t, n, r, s, i) {
            const o = e.renderer;
            switch (n) {
            case 1:
                o.appendChild(r, t);
                break;
            case 2:
                o.insertBefore(r, t, s);
                break;
            case 3:
                o.removeChild(r, t);
                break;
            case 0:
                i.push(t)
            }
        }
        const tr = /^:([^:]+):(.+)$/;
        function nr(e) {
            if (":" === e[0]) {
                const t = e.match(tr);
                return [t[1], t[2]]
            }
            return ["", e]
        }
        function rr(e) {
            let t = 0;
            for (let n = 0; n < e.length; n++)
                t |= e[n].flags;
            return t
        }
        function sr(e, t, n, r, s, i, o, l, a, u, c, d, h, p, f, g, m, _, y, v) {
            switch (e) {
            case 1:
                return t + ir(n) + r;
            case 2:
                return t + ir(n) + r + ir(s) + i;
            case 3:
                return t + ir(n) + r + ir(s) + i + ir(o) + l;
            case 4:
                return t + ir(n) + r + ir(s) + i + ir(o) + l + ir(a) + u;
            case 5:
                return t + ir(n) + r + ir(s) + i + ir(o) + l + ir(a) + u + ir(c) + d;
            case 6:
                return t + ir(n) + r + ir(s) + i + ir(o) + l + ir(a) + u + ir(c) + d + ir(h) + p;
            case 7:
                return t + ir(n) + r + ir(s) + i + ir(o) + l + ir(a) + u + ir(c) + d + ir(h) + p + ir(f) + g;
            case 8:
                return t + ir(n) + r + ir(s) + i + ir(o) + l + ir(a) + u + ir(c) + d + ir(h) + p + ir(f) + g + ir(m) + _;
            case 9:
                return t + ir(n) + r + ir(s) + i + ir(o) + l + ir(a) + u + ir(c) + d + ir(h) + p + ir(f) + g + ir(m) + _ + ir(y) + v;
            default:
                throw new Error("Does not support more than 9 expressions")
            }
        }
        function ir(e) {
            return null != e ? e.toString() : ""
        }
        const or = new Object
          , lr = Vn(_t)
          , ar = Vn(we)
          , ur = Vn(Ie);
        function cr(e, t, n, r) {
            return n = pe(n),
            {
                index: -1,
                deps: Gn(r, ce(t)),
                flags: e,
                token: t,
                value: n
            }
        }
        function dr(e, t, n=_t.THROW_IF_NOT_FOUND) {
            const r = ke(e);
            try {
                if (8 & t.flags)
                    return t.token;
                if (2 & t.flags && (n = null),
                1 & t.flags)
                    return e._parent.get(t.token, n);
                const o = t.tokenKey;
                switch (o) {
                case lr:
                case ar:
                case ur:
                    return e
                }
                const l = e._def.providersByKey[o];
                let a;
                if (l) {
                    let t = e._providers[l.index];
                    return void 0 === t && (t = e._providers[l.index] = hr(e, l)),
                    t === or ? void 0 : t
                }
                if ((a = ae(t.token)) && (s = e,
                null != (i = a).providedIn && (function(e, t) {
                    return e._def.modules.indexOf(t) > -1
                }(s, i.providedIn) || "root" === i.providedIn && s._def.isRoot))) {
                    const n = e._providers.length;
                    return e._def.providers[n] = e._def.providersByKey[t.tokenKey] = {
                        flags: 5120,
                        value: a.factory,
                        deps: [],
                        index: n,
                        token: t.token
                    },
                    e._providers[n] = or,
                    e._providers[n] = hr(e, e._def.providersByKey[t.tokenKey])
                }
                return 4 & t.flags ? n : e._parent.get(t.token, n)
            } finally {
                ke(r)
            }
            var s, i
        }
        function hr(e, t) {
            let n;
            switch (201347067 & t.flags) {
            case 512:
                n = function(e, t, n) {
                    const r = n.length;
                    switch (r) {
                    case 0:
                        return new t;
                    case 1:
                        return new t(dr(e, n[0]));
                    case 2:
                        return new t(dr(e, n[0]),dr(e, n[1]));
                    case 3:
                        return new t(dr(e, n[0]),dr(e, n[1]),dr(e, n[2]));
                    default:
                        const s = new Array(r);
                        for (let t = 0; t < r; t++)
                            s[t] = dr(e, n[t]);
                        return new t(...s)
                    }
                }(e, t.value, t.deps);
                break;
            case 1024:
                n = function(e, t, n) {
                    const r = n.length;
                    switch (r) {
                    case 0:
                        return t();
                    case 1:
                        return t(dr(e, n[0]));
                    case 2:
                        return t(dr(e, n[0]), dr(e, n[1]));
                    case 3:
                        return t(dr(e, n[0]), dr(e, n[1]), dr(e, n[2]));
                    default:
                        const s = Array(r);
                        for (let t = 0; t < r; t++)
                            s[t] = dr(e, n[t]);
                        return t(...s)
                    }
                }(e, t.value, t.deps);
                break;
            case 2048:
                n = dr(e, t.deps[0]);
                break;
            case 256:
                n = t.value
            }
            return n === or || null === n || "object" != typeof n || 131072 & t.flags || "function" != typeof n.ngOnDestroy || (t.flags |= 131072),
            void 0 === n ? or : n
        }
        function pr(e, t) {
            const n = e.viewContainer._embeddedViews;
            if ((null == t || t >= n.length) && (t = n.length - 1),
            t < 0)
                return null;
            const r = n[t];
            return r.viewContainerParent = null,
            Ne(n, t),
            In.dirtyParentQueries(r),
            gr(r),
            r
        }
        function fr(e, t, n) {
            const r = t ? $n(t, t.def.lastRenderRootNode) : e.renderElement
              , s = n.renderer.parentNode(r)
              , i = n.renderer.nextSibling(r);
            Kn(n, 2, s, i, void 0)
        }
        function gr(e) {
            Kn(e, 3, null, null, void 0)
        }
        const mr = new Object;
        function _r(e, t, n, r, s, i) {
            return new yr(e,t,n,r,s,i)
        }
        class yr extends Rt {
            constructor(e, t, n, r, s, i) {
                super(),
                this.selector = e,
                this.componentType = t,
                this._inputs = r,
                this._outputs = s,
                this.ngContentSelectors = i,
                this.viewDefFactory = n
            }
            get inputs() {
                const e = []
                  , t = this._inputs;
                for (let n in t)
                    e.push({
                        propName: n,
                        templateName: t[n]
                    });
                return e
            }
            get outputs() {
                const e = [];
                for (let t in this._outputs)
                    e.push({
                        propName: t,
                        templateName: this._outputs[t]
                    });
                return e
            }
            create(e, t, n, r) {
                if (!r)
                    throw new Error("ngModule should be provided");
                const s = Qn(this.viewDefFactory)
                  , i = s.nodes[0].element.componentProvider.nodeIndex
                  , o = In.createRootView(e, t || [], n, s, r, mr)
                  , l = kn(o, i).instance;
                return n && o.renderer.setAttribute(xn(o, 0).renderElement, "ng-version", Jt.full),
                new vr(o,new Er(o),l)
            }
        }
        class vr extends class {
        }
        {
            constructor(e, t, n) {
                super(),
                this._view = e,
                this._viewRef = t,
                this._component = n,
                this._elDef = this._view.def.nodes[0],
                this.hostView = t,
                this.changeDetectorRef = t,
                this.instance = n
            }
            get location() {
                return new Ut(xn(this._view, this._elDef.nodeIndex).renderElement)
            }
            get injector() {
                return new Sr(this._view,this._elDef)
            }
            get componentType() {
                return this._component.constructor
            }
            destroy() {
                this._viewRef.destroy()
            }
            onDestroy(e) {
                this._viewRef.onDestroy(e)
            }
        }
        function wr(e, t, n) {
            return new br(e,t,n)
        }
        class br {
            constructor(e, t, n) {
                this._view = e,
                this._elDef = t,
                this._data = n,
                this._embeddedViews = []
            }
            get element() {
                return new Ut(this._data.renderElement)
            }
            get injector() {
                return new Sr(this._view,this._elDef)
            }
            get parentInjector() {
                let e = this._view
                  , t = this._elDef.parent;
                for (; !t && e; )
                    t = Bn(e),
                    e = e.parent;
                return e ? new Sr(e,t) : new Sr(this._view,null)
            }
            clear() {
                for (let e = this._embeddedViews.length - 1; e >= 0; e--) {
                    const t = pr(this._data, e);
                    In.destroyView(t)
                }
            }
            get(e) {
                const t = this._embeddedViews[e];
                if (t) {
                    const e = new Er(t);
                    return e.attachToViewContainerRef(this),
                    e
                }
                return null
            }
            get length() {
                return this._embeddedViews.length
            }
            createEmbeddedView(e, t, n) {
                const r = e.createEmbeddedView(t || {});
                return this.insert(r, n),
                r
            }
            createComponent(e, t, n, r, s) {
                const i = n || this.parentInjector;
                s || e instanceof Bt || (s = i.get(Ie));
                const o = e.create(i, r, void 0, s);
                return this.insert(o.hostView, t),
                o
            }
            insert(e, t) {
                if (e.destroyed)
                    throw new Error("Cannot insert a destroyed View in a ViewContainer!");
                const n = e;
                return function(e, t, n, r) {
                    let s = t.viewContainer._embeddedViews;
                    null == n && (n = s.length),
                    r.viewContainerParent = e,
                    Ae(s, n, r),
                    function(e, t) {
                        const n = Hn(t);
                        if (!n || n === e || 16 & t.state)
                            return;
                        t.state |= 16;
                        let r = n.template._projectedViews;
                        r || (r = n.template._projectedViews = []),
                        r.push(t),
                        function(e, t) {
                            if (4 & t.flags)
                                return;
                            e.nodeFlags |= 4,
                            t.flags |= 4;
                            let n = t.parent;
                            for (; n; )
                                n.childFlags |= 4,
                                n = n.parent
                        }(t.parent.def, t.parentNodeDef)
                    }(t, r),
                    In.dirtyParentQueries(r),
                    fr(t, n > 0 ? s[n - 1] : null, r)
                }(this._view, this._data, t, n._view),
                n.attachToViewContainerRef(this),
                e
            }
            move(e, t) {
                if (e.destroyed)
                    throw new Error("Cannot move a destroyed View in a ViewContainer!");
                const n = this._embeddedViews.indexOf(e._view);
                return function(e, t, n) {
                    const r = e.viewContainer._embeddedViews
                      , s = r[t];
                    Ne(r, t),
                    null == n && (n = r.length),
                    Ae(r, n, s),
                    In.dirtyParentQueries(s),
                    gr(s),
                    fr(e, n > 0 ? r[n - 1] : null, s)
                }(this._data, n, t),
                e
            }
            indexOf(e) {
                return this._embeddedViews.indexOf(e._view)
            }
            remove(e) {
                const t = pr(this._data, e);
                t && In.destroyView(t)
            }
            detach(e) {
                const t = pr(this._data, e);
                return t ? new Er(t) : null
            }
        }
        function Cr(e) {
            return new Er(e)
        }
        class Er {
            constructor(e) {
                this._view = e,
                this._viewContainerRef = null,
                this._appRef = null
            }
            get rootNodes() {
                return function(e) {
                    const t = [];
                    return Kn(e, 0, void 0, void 0, t),
                    t
                }(this._view)
            }
            get context() {
                return this._view.context
            }
            get destroyed() {
                return 0 != (128 & this._view.state)
            }
            markForCheck() {
                Fn(this._view)
            }
            detach() {
                this._view.state &= -5
            }
            detectChanges() {
                const e = this._view.root.rendererFactory;
                e.begin && e.begin();
                try {
                    In.checkAndUpdateView(this._view)
                } finally {
                    e.end && e.end()
                }
            }
            checkNoChanges() {
                In.checkNoChangesView(this._view)
            }
            reattach() {
                this._view.state |= 4
            }
            onDestroy(e) {
                this._view.disposables || (this._view.disposables = []),
                this._view.disposables.push(e)
            }
            destroy() {
                this._appRef ? this._appRef.detachView(this) : this._viewContainerRef && this._viewContainerRef.detach(this._viewContainerRef.indexOf(this)),
                In.destroyView(this._view)
            }
            detachFromAppRef() {
                this._appRef = null,
                gr(this._view),
                In.dirtyParentQueries(this._view)
            }
            attachToAppRef(e) {
                if (this._viewContainerRef)
                    throw new Error("This view is already attached to a ViewContainer!");
                this._appRef = e
            }
            attachToViewContainerRef(e) {
                if (this._appRef)
                    throw new Error("This view is already attached directly to the ApplicationRef!");
                this._viewContainerRef = e
            }
        }
        function xr(e, t) {
            return new kr(e,t)
        }
        class kr extends fn {
            constructor(e, t) {
                super(),
                this._parentView = e,
                this._def = t
            }
            createEmbeddedView(e) {
                return new Er(In.createEmbeddedView(this._parentView, this._def, this._def.element.template, e))
            }
            get elementRef() {
                return new Ut(xn(this._parentView, this._def.nodeIndex).renderElement)
            }
        }
        function Tr(e, t) {
            return new Sr(e,t)
        }
        class Sr {
            constructor(e, t) {
                this.view = e,
                this.elDef = t
            }
            get(e, t=_t.THROW_IF_NOT_FOUND) {
                return In.resolveDep(this.view, this.elDef, !!this.elDef && 0 != (33554432 & this.elDef.flags), {
                    flags: 0,
                    token: e,
                    tokenKey: Vn(e)
                }, t)
            }
        }
        function Ir(e, t) {
            const n = e.def.nodes[t];
            if (1 & n.flags) {
                const t = xn(e, n.nodeIndex);
                return n.element.template ? t.template : t.renderElement
            }
            if (2 & n.flags)
                return En(e, n.nodeIndex).renderText;
            if (20240 & n.flags)
                return kn(e, n.nodeIndex).instance;
            throw new Error(`Illegal state: read nodeValue for node index ${t}`)
        }
        function Ar(e) {
            return new Nr(e.renderer)
        }
        class Nr {
            constructor(e) {
                this.delegate = e
            }
            selectRootElement(e) {
                return this.delegate.selectRootElement(e)
            }
            createElement(e, t) {
                const [n,r] = nr(t)
                  , s = this.delegate.createElement(r, n);
                return e && this.delegate.appendChild(e, s),
                s
            }
            createViewRoot(e) {
                return e
            }
            createTemplateAnchor(e) {
                const t = this.delegate.createComment("");
                return e && this.delegate.appendChild(e, t),
                t
            }
            createText(e, t) {
                const n = this.delegate.createText(t);
                return e && this.delegate.appendChild(e, n),
                n
            }
            projectNodes(e, t) {
                for (let n = 0; n < t.length; n++)
                    this.delegate.appendChild(e, t[n])
            }
            attachViewAfter(e, t) {
                const n = this.delegate.parentNode(e)
                  , r = this.delegate.nextSibling(e);
                for (let s = 0; s < t.length; s++)
                    this.delegate.insertBefore(n, t[s], r)
            }
            detachView(e) {
                for (let t = 0; t < e.length; t++) {
                    const n = e[t]
                      , r = this.delegate.parentNode(n);
                    this.delegate.removeChild(r, n)
                }
            }
            destroyView(e, t) {
                for (let n = 0; n < t.length; n++)
                    this.delegate.destroyNode(t[n])
            }
            listen(e, t, n) {
                return this.delegate.listen(e, t, n)
            }
            listenGlobal(e, t, n) {
                return this.delegate.listen(e, t, n)
            }
            setElementProperty(e, t, n) {
                this.delegate.setProperty(e, t, n)
            }
            setElementAttribute(e, t, n) {
                const [r,s] = nr(t);
                null != n ? this.delegate.setAttribute(e, s, n, r) : this.delegate.removeAttribute(e, s, r)
            }
            setBindingDebugInfo(e, t, n) {}
            setElementClass(e, t, n) {
                n ? this.delegate.addClass(e, t) : this.delegate.removeClass(e, t)
            }
            setElementStyle(e, t, n) {
                null != n ? this.delegate.setStyle(e, t, n) : this.delegate.removeStyle(e, t)
            }
            invokeElementMethod(e, t, n) {
                e[t].apply(e, n)
            }
            setText(e, t) {
                this.delegate.setValue(e, t)
            }
            animate() {
                throw new Error("Renderer.animate is no longer supported!")
            }
        }
        function Vr(e, t, n, r) {
            return new Dr(e,t,n,r)
        }
        class Dr {
            constructor(e, t, n, r) {
                this._moduleType = e,
                this._parent = t,
                this._bootstrapComponents = n,
                this._def = r,
                this._destroyListeners = [],
                this._destroyed = !1,
                this.injector = this,
                function(e) {
                    const t = e._def
                      , n = e._providers = new Array(t.providers.length);
                    for (let r = 0; r < t.providers.length; r++) {
                        const s = t.providers[r];
                        4096 & s.flags || void 0 === n[r] && (n[r] = hr(e, s))
                    }
                }(this)
            }
            get(e, t=_t.THROW_IF_NOT_FOUND, n=ie.Default) {
                let r = 0;
                return n & ie.SkipSelf ? r |= 1 : n & ie.Self && (r |= 4),
                dr(this, {
                    token: e,
                    tokenKey: Vn(e),
                    flags: r
                }, t)
            }
            get instance() {
                return this.get(this._moduleType)
            }
            get componentFactoryResolver() {
                return this.get(jt)
            }
            destroy() {
                if (this._destroyed)
                    throw new Error(`The ng module ${ce(this.instance.constructor)} has already been destroyed.`);
                this._destroyed = !0,
                function(e, t) {
                    const n = e._def
                      , r = new Set;
                    for (let s = 0; s < n.providers.length; s++)
                        if (131072 & n.providers[s].flags) {
                            const t = e._providers[s];
                            if (t && t !== or) {
                                const e = t.ngOnDestroy;
                                "function" != typeof e || r.has(t) || (e.apply(t),
                                r.add(t))
                            }
                        }
                }(this),
                this._destroyListeners.forEach(e=>e())
            }
            onDestroy(e) {
                this._destroyListeners.push(e)
            }
        }
        const Or = Vn(Zt)
          , Mr = Vn(qt)
          , Rr = Vn(Ut)
          , Pr = Vn(mn)
          , Fr = Vn(fn)
          , Lr = Vn(pt)
          , jr = Vn(_t)
          , Hr = Vn(we);
        function Br(e, t, n, r, s, i, o, l) {
            const a = [];
            if (o)
                for (let c in o) {
                    const [e,t] = o[c];
                    a[e] = {
                        flags: 8,
                        name: c,
                        nonMinifiedName: t,
                        ns: null,
                        securityContext: null,
                        suffix: null
                    }
                }
            const u = [];
            if (l)
                for (let c in l)
                    u.push({
                        type: 1,
                        propName: c,
                        target: null,
                        eventName: l[c]
                    });
            return Ur(e, t |= 16384, n, r, s, s, i, a, u)
        }
        function $r(e, t, n, r, s) {
            return Ur(-1, e, t, 0, n, r, s)
        }
        function Ur(e, t, n, r, s, i, o, l, a) {
            const {matchedQueries: u, references: c, matchedQueryIds: d} = Zn(n);
            a || (a = []),
            l || (l = []),
            i = pe(i);
            const h = Gn(o, ce(s));
            return {
                nodeIndex: -1,
                parent: null,
                renderParent: null,
                bindingIndex: -1,
                outputIndex: -1,
                checkIndex: e,
                flags: t,
                childFlags: 0,
                directChildFlags: 0,
                childMatchedQueries: 0,
                matchedQueries: u,
                matchedQueryIds: d,
                references: c,
                ngContentIndex: -1,
                childCount: r,
                bindings: l,
                bindingFlags: rr(l),
                outputs: a,
                element: null,
                provider: {
                    token: s,
                    value: i,
                    deps: h
                },
                text: null,
                query: null,
                ngContent: null
            }
        }
        function zr(e, t) {
            return qr(e, t)
        }
        function Zr(e, t) {
            let n = e;
            for (; n.parent && !Un(n); )
                n = n.parent;
            return Qr(n.parent, Bn(n), !0, t.provider.value, t.provider.deps)
        }
        function Gr(e, t) {
            const n = Qr(e, t.parent, (32768 & t.flags) > 0, t.provider.value, t.provider.deps);
            if (t.outputs.length)
                for (let r = 0; r < t.outputs.length; r++) {
                    const s = t.outputs[r]
                      , i = n[s.propName];
                    if (!Ot(i))
                        throw new Error(`@Output ${s.propName} not initialized in '${n.constructor.name}'.`);
                    {
                        const n = i.subscribe(Wr(e, t.parent.nodeIndex, s.eventName));
                        e.disposables[t.outputIndex + r] = n.unsubscribe.bind(n)
                    }
                }
            return n
        }
        function Wr(e, t, n) {
            return r=>jn(e, t, n, r)
        }
        function qr(e, t) {
            const n = (8192 & t.flags) > 0
              , r = t.provider;
            switch (201347067 & t.flags) {
            case 512:
                return Qr(e, t.parent, n, r.value, r.deps);
            case 1024:
                return function(e, t, n, r, s) {
                    const i = s.length;
                    switch (i) {
                    case 0:
                        return r();
                    case 1:
                        return r(Jr(e, t, n, s[0]));
                    case 2:
                        return r(Jr(e, t, n, s[0]), Jr(e, t, n, s[1]));
                    case 3:
                        return r(Jr(e, t, n, s[0]), Jr(e, t, n, s[1]), Jr(e, t, n, s[2]));
                    default:
                        const o = Array(i);
                        for (let r = 0; r < i; r++)
                            o[r] = Jr(e, t, n, s[r]);
                        return r(...o)
                    }
                }(e, t.parent, n, r.value, r.deps);
            case 2048:
                return Jr(e, t.parent, n, r.deps[0]);
            case 256:
                return r.value
            }
        }
        function Qr(e, t, n, r, s) {
            const i = s.length;
            switch (i) {
            case 0:
                return new r;
            case 1:
                return new r(Jr(e, t, n, s[0]));
            case 2:
                return new r(Jr(e, t, n, s[0]),Jr(e, t, n, s[1]));
            case 3:
                return new r(Jr(e, t, n, s[0]),Jr(e, t, n, s[1]),Jr(e, t, n, s[2]));
            default:
                const o = new Array(i);
                for (let r = 0; r < i; r++)
                    o[r] = Jr(e, t, n, s[r]);
                return new r(...o)
            }
        }
        const Kr = {};
        function Jr(e, t, n, r, s=_t.THROW_IF_NOT_FOUND) {
            if (8 & r.flags)
                return r.token;
            const i = e;
            2 & r.flags && (s = null);
            const o = r.tokenKey;
            o === Lr && (n = !(!t || !t.element.componentView)),
            t && 1 & r.flags && (n = !1,
            t = t.parent);
            let l = e;
            for (; l; ) {
                if (t)
                    switch (o) {
                    case Or:
                        return Ar(Yr(l, t, n));
                    case Mr:
                        return Yr(l, t, n).renderer;
                    case Rr:
                        return new Ut(xn(l, t.nodeIndex).renderElement);
                    case Pr:
                        return xn(l, t.nodeIndex).viewContainer;
                    case Fr:
                        if (t.element.template)
                            return xn(l, t.nodeIndex).template;
                        break;
                    case Lr:
                        return Cr(Yr(l, t, n));
                    case jr:
                    case Hr:
                        return Tr(l, t);
                    default:
                        const e = (n ? t.element.allProviders : t.element.publicProviders)[o];
                        if (e) {
                            let t = kn(l, e.nodeIndex);
                            return t || (t = {
                                instance: qr(l, e)
                            },
                            l.nodes[e.nodeIndex] = t),
                            t.instance
                        }
                    }
                n = Un(l),
                t = Bn(l),
                l = l.parent,
                4 & r.flags && (l = null)
            }
            const a = i.root.injector.get(r.token, Kr);
            return a !== Kr || s === Kr ? a : i.root.ngModule.injector.get(r.token, s)
        }
        function Yr(e, t, n) {
            let r;
            if (n)
                r = xn(e, t.nodeIndex).componentView;
            else
                for (r = e; r.parent && !Un(r); )
                    r = r.parent;
            return r
        }
        function Xr(e, t, n, r, s, i) {
            if (32768 & n.flags) {
                const t = xn(e, n.parent.nodeIndex).componentView;
                2 & t.def.flags && (t.state |= 8)
            }
            if (t.instance[n.bindings[r].name] = s,
            524288 & n.flags) {
                i = i || {};
                const t = At.unwrap(e.oldValues[n.bindingIndex + r]);
                i[n.bindings[r].nonMinifiedName] = new Mt(t,s,0 != (2 & e.state))
            }
            return e.oldValues[n.bindingIndex + r] = s,
            i
        }
        function es(e, t) {
            if (!(e.def.nodeFlags & t))
                return;
            const n = e.def.nodes;
            let r = 0;
            for (let s = 0; s < n.length; s++) {
                const i = n[s];
                let o = i.parent;
                for (!o && i.flags & t && ns(e, s, i.flags & t, r++),
                0 == (i.childFlags & t) && (s += i.childCount); o && 1 & o.flags && s === o.nodeIndex + o.childCount; )
                    o.directChildFlags & t && (r = ts(e, o, t, r)),
                    o = o.parent
            }
        }
        function ts(e, t, n, r) {
            for (let s = t.nodeIndex + 1; s <= t.nodeIndex + t.childCount; s++) {
                const t = e.def.nodes[s];
                t.flags & n && ns(e, s, t.flags & n, r++),
                s += t.childCount
            }
            return r
        }
        function ns(e, t, n, r) {
            const s = kn(e, t);
            if (!s)
                return;
            const i = s.instance;
            i && (In.setCurrentNode(e, t),
            1048576 & n && Cn(e, 512, r) && i.ngAfterContentInit(),
            2097152 & n && i.ngAfterContentChecked(),
            4194304 & n && Cn(e, 768, r) && i.ngAfterViewInit(),
            8388608 & n && i.ngAfterViewChecked(),
            131072 & n && i.ngOnDestroy())
        }
        const rs = new ve("SCHEDULER_TOKEN",{
            providedIn: "root",
            factory: ()=>De
        })
          , ss = {}
          , is = function() {
            var e = {
                LocaleId: 0,
                DayPeriodsFormat: 1,
                DayPeriodsStandalone: 2,
                DaysFormat: 3,
                DaysStandalone: 4,
                MonthsFormat: 5,
                MonthsStandalone: 6,
                Eras: 7,
                FirstDayOfWeek: 8,
                WeekendRange: 9,
                DateFormat: 10,
                TimeFormat: 11,
                DateTimeFormat: 12,
                NumberSymbols: 13,
                NumberFormats: 14,
                CurrencySymbol: 15,
                CurrencyName: 16,
                Currencies: 17,
                PluralCase: 18,
                ExtraData: 19
            };
            return e[e.LocaleId] = "LocaleId",
            e[e.DayPeriodsFormat] = "DayPeriodsFormat",
            e[e.DayPeriodsStandalone] = "DayPeriodsStandalone",
            e[e.DaysFormat] = "DaysFormat",
            e[e.DaysStandalone] = "DaysStandalone",
            e[e.MonthsFormat] = "MonthsFormat",
            e[e.MonthsStandalone] = "MonthsStandalone",
            e[e.Eras] = "Eras",
            e[e.FirstDayOfWeek] = "FirstDayOfWeek",
            e[e.WeekendRange] = "WeekendRange",
            e[e.DateFormat] = "DateFormat",
            e[e.TimeFormat] = "TimeFormat",
            e[e.DateTimeFormat] = "DateTimeFormat",
            e[e.NumberSymbols] = "NumberSymbols",
            e[e.NumberFormats] = "NumberFormats",
            e[e.CurrencySymbol] = "CurrencySymbol",
            e[e.CurrencyName] = "CurrencyName",
            e[e.Currencies] = "Currencies",
            e[e.PluralCase] = "PluralCase",
            e[e.ExtraData] = "ExtraData",
            e
        }()
          , os = void 0;
        var ls = ["en", [["a", "p"], ["AM", "PM"], os], [["AM", "PM"], os, os], [["S", "M", "T", "W", "T", "F", "S"], ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]], os, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]], os, [["B", "A"], ["BC", "AD"], ["Before Christ", "Anno Domini"]], 0, [6, 0], ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"], ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"], ["{1}, {0}", os, "{1} 'at' {0}", os], [".", ",", ";", "%", "+", "-", "E", "\xd7", "\u2030", "\u221e", "NaN", ":"], ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"], "$", "US Dollar", {}, function(e) {
            let t = Math.floor(Math.abs(e))
              , n = e.toString().replace(/^[^.]*\.?/, "").length;
            return 1 === t && 0 === n ? 1 : 5
        }
        ];
        class as extends k {
            constructor(e=!1) {
                super(),
                this.__isAsync = e
            }
            emit(e) {
                super.next(e)
            }
            subscribe(e, t, n) {
                let r, s = e=>null, i = ()=>null;
                e && "object" == typeof e ? (r = this.__isAsync ? t=>{
                    setTimeout(()=>e.next(t))
                }
                : t=>{
                    e.next(t)
                }
                ,
                e.error && (s = this.__isAsync ? t=>{
                    setTimeout(()=>e.error(t))
                }
                : t=>{
                    e.error(t)
                }
                ),
                e.complete && (i = this.__isAsync ? ()=>{
                    setTimeout(()=>e.complete())
                }
                : ()=>{
                    e.complete()
                }
                )) : (r = this.__isAsync ? t=>{
                    setTimeout(()=>e(t))
                }
                : t=>{
                    e(t)
                }
                ,
                t && (s = this.__isAsync ? e=>{
                    setTimeout(()=>t(e))
                }
                : e=>{
                    t(e)
                }
                ),
                n && (i = this.__isAsync ? ()=>{
                    setTimeout(()=>n())
                }
                : ()=>{
                    n()
                }
                ));
                const o = super.subscribe(r, s, i);
                return e instanceof h && e.add(o),
                o
            }
        }
        function us() {
            return this._results[Tt()]()
        }
        class cs {
            constructor() {
                this.dirty = !0,
                this._results = [],
                this.changes = new as,
                this.length = 0;
                const e = Tt()
                  , t = cs.prototype;
                t[e] || (t[e] = us)
            }
            map(e) {
                return this._results.map(e)
            }
            filter(e) {
                return this._results.filter(e)
            }
            find(e) {
                return this._results.find(e)
            }
            reduce(e, t) {
                return this._results.reduce(e, t)
            }
            forEach(e) {
                this._results.forEach(e)
            }
            some(e) {
                return this._results.some(e)
            }
            toArray() {
                return this._results.slice()
            }
            toString() {
                return this._results.toString()
            }
            reset(e) {
                this._results = function e(t, n) {
                    void 0 === n && (n = t);
                    for (let r = 0; r < t.length; r++) {
                        let s = t[r];
                        Array.isArray(s) ? (n === t && (n = t.slice(0, r)),
                        e(s, n)) : n !== t && n.push(s)
                    }
                    return n
                }(e),
                this.dirty = !1,
                this.length = this._results.length,
                this.last = this._results[this.length - 1],
                this.first = this._results[0]
            }
            notifyOnChanges() {
                this.changes.emit(this)
            }
            setDirty() {
                this.dirty = !0
            }
            destroy() {
                this.changes.complete(),
                this.changes.unsubscribe()
            }
        }
        const ds = new ve("Application Initializer");
        class hs {
            constructor(e) {
                this.appInits = e,
                this.initialized = !1,
                this.done = !1,
                this.donePromise = new Promise((e,t)=>{
                    this.resolve = e,
                    this.reject = t
                }
                )
            }
            runInitializers() {
                if (this.initialized)
                    return;
                const e = []
                  , t = ()=>{
                    this.done = !0,
                    this.resolve()
                }
                ;
                if (this.appInits)
                    for (let n = 0; n < this.appInits.length; n++) {
                        const t = this.appInits[n]();
                        Dt(t) && e.push(t)
                    }
                Promise.all(e).then(()=>{
                    t()
                }
                ).catch(e=>{
                    this.reject(e)
                }
                ),
                0 === e.length && t(),
                this.initialized = !0
            }
        }
        const ps = new ve("AppId");
        function fs() {
            return `${gs()}${gs()}${gs()}`
        }
        function gs() {
            return String.fromCharCode(97 + Math.floor(25 * Math.random()))
        }
        const ms = new ve("Platform Initializer")
          , _s = new ve("Platform ID")
          , ys = new ve("appBootstrapListener");
        class vs {
            log(e) {
                console.log(e)
            }
            warn(e) {
                console.warn(e)
            }
        }
        const ws = new ve("LocaleId");
        function bs() {
            throw new Error("Runtime compiler is not loaded")
        }
        const Cs = bs
          , Es = bs
          , xs = bs
          , ks = bs;
        class Ts {
            constructor() {
                this.compileModuleSync = Cs,
                this.compileModuleAsync = Es,
                this.compileModuleAndAllComponentsSync = xs,
                this.compileModuleAndAllComponentsAsync = ks
            }
            clearCache() {}
            clearCacheFor(e) {}
            getModuleId(e) {}
        }
        class Ss {
        }
        let Is, As;
        function Ns() {
            const e = ye.wtf;
            return !(!e || (Is = e.trace,
            !Is) || (As = Is.events,
            0))
        }
        const Vs = Ns();
        function Ds(e, t) {
            return null
        }
        const Os = Vs ? function(e, t=null) {
            return As.createScope(e, t)
        }
        : (e,t)=>Ds
          , Ms = Vs ? function(e, t) {
            return Is.leaveScope(e, t),
            t
        }
        : (e,t)=>t
          , Rs = (()=>Promise.resolve(0))();
        function Ps(e) {
            "undefined" == typeof Zone ? Rs.then(()=>{
                e && e.apply(null, null)
            }
            ) : Zone.current.scheduleMicroTask("scheduleMicrotask", e)
        }
        class Fs {
            constructor({enableLongStackTrace: e=!1}) {
                if (this.hasPendingMicrotasks = !1,
                this.hasPendingMacrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new as(!1),
                this.onMicrotaskEmpty = new as(!1),
                this.onStable = new as(!1),
                this.onError = new as(!1),
                "undefined" == typeof Zone)
                    throw new Error("In this configuration Angular requires Zone.js");
                var t;
                Zone.assertZonePatched(),
                this._nesting = 0,
                this._outer = this._inner = Zone.current,
                Zone.wtfZoneSpec && (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
                Zone.TaskTrackingZoneSpec && (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec)),
                e && Zone.longStackTraceZoneSpec && (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
                (t = this)._inner = t._inner.fork({
                    name: "angular",
                    properties: {
                        isAngularZone: !0
                    },
                    onInvokeTask: (e,n,r,s,i,o)=>{
                        try {
                            return Bs(t),
                            e.invokeTask(r, s, i, o)
                        } finally {
                            $s(t)
                        }
                    }
                    ,
                    onInvoke: (e,n,r,s,i,o,l)=>{
                        try {
                            return Bs(t),
                            e.invoke(r, s, i, o, l)
                        } finally {
                            $s(t)
                        }
                    }
                    ,
                    onHasTask: (e,n,r,s)=>{
                        e.hasTask(r, s),
                        n === r && ("microTask" == s.change ? (t.hasPendingMicrotasks = s.microTask,
                        Hs(t)) : "macroTask" == s.change && (t.hasPendingMacrotasks = s.macroTask))
                    }
                    ,
                    onHandleError: (e,n,r,s)=>(e.handleError(r, s),
                    t.runOutsideAngular(()=>t.onError.emit(s)),
                    !1)
                })
            }
            static isInAngularZone() {
                return !0 === Zone.current.get("isAngularZone")
            }
            static assertInAngularZone() {
                if (!Fs.isInAngularZone())
                    throw new Error("Expected to be in Angular Zone, but it is not!")
            }
            static assertNotInAngularZone() {
                if (Fs.isInAngularZone())
                    throw new Error("Expected to not be in Angular Zone, but it is!")
            }
            run(e, t, n) {
                return this._inner.run(e, t, n)
            }
            runTask(e, t, n, r) {
                const s = this._inner
                  , i = s.scheduleEventTask("NgZoneEvent: " + r, e, js, Ls, Ls);
                try {
                    return s.runTask(i, t, n)
                } finally {
                    s.cancelTask(i)
                }
            }
            runGuarded(e, t, n) {
                return this._inner.runGuarded(e, t, n)
            }
            runOutsideAngular(e) {
                return this._outer.run(e)
            }
        }
        function Ls() {}
        const js = {};
        function Hs(e) {
            if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
                try {
                    e._nesting++,
                    e.onMicrotaskEmpty.emit(null)
                } finally {
                    if (e._nesting--,
                    !e.hasPendingMicrotasks)
                        try {
                            e.runOutsideAngular(()=>e.onStable.emit(null))
                        } finally {
                            e.isStable = !0
                        }
                }
        }
        function Bs(e) {
            e._nesting++,
            e.isStable && (e.isStable = !1,
            e.onUnstable.emit(null))
        }
        function $s(e) {
            e._nesting--,
            Hs(e)
        }
        class Us {
            constructor() {
                this.hasPendingMicrotasks = !1,
                this.hasPendingMacrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new as,
                this.onMicrotaskEmpty = new as,
                this.onStable = new as,
                this.onError = new as
            }
            run(e) {
                return e()
            }
            runGuarded(e) {
                return e()
            }
            runOutsideAngular(e) {
                return e()
            }
            runTask(e) {
                return e()
            }
        }
        class zs {
            constructor(e) {
                this._ngZone = e,
                this._pendingCount = 0,
                this._isZoneStable = !0,
                this._didWork = !1,
                this._callbacks = [],
                this.taskTrackingZone = null,
                this._watchAngularEvents(),
                e.run(()=>{
                    this.taskTrackingZone = "undefined" == typeof Zone ? null : Zone.current.get("TaskTrackingZone")
                }
                )
            }
            _watchAngularEvents() {
                this._ngZone.onUnstable.subscribe({
                    next: ()=>{
                        this._didWork = !0,
                        this._isZoneStable = !1
                    }
                }),
                this._ngZone.runOutsideAngular(()=>{
                    this._ngZone.onStable.subscribe({
                        next: ()=>{
                            Fs.assertNotInAngularZone(),
                            Ps(()=>{
                                this._isZoneStable = !0,
                                this._runCallbacksIfReady()
                            }
                            )
                        }
                    })
                }
                )
            }
            increasePendingRequestCount() {
                return this._pendingCount += 1,
                this._didWork = !0,
                this._pendingCount
            }
            decreasePendingRequestCount() {
                if (this._pendingCount -= 1,
                this._pendingCount < 0)
                    throw new Error("pending async requests below zero");
                return this._runCallbacksIfReady(),
                this._pendingCount
            }
            isStable() {
                return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
            }
            _runCallbacksIfReady() {
                if (this.isStable())
                    Ps(()=>{
                        for (; 0 !== this._callbacks.length; ) {
                            let e = this._callbacks.pop();
                            clearTimeout(e.timeoutId),
                            e.doneCb(this._didWork)
                        }
                        this._didWork = !1
                    }
                    );
                else {
                    let e = this.getPendingTasks();
                    this._callbacks = this._callbacks.filter(t=>!t.updateCb || !t.updateCb(e) || (clearTimeout(t.timeoutId),
                    !1)),
                    this._didWork = !0
                }
            }
            getPendingTasks() {
                return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(e=>({
                    source: e.source,
                    creationLocation: e.creationLocation,
                    data: e.data
                })) : []
            }
            addCallback(e, t, n) {
                let r = -1;
                t && t > 0 && (r = setTimeout(()=>{
                    this._callbacks = this._callbacks.filter(e=>e.timeoutId !== r),
                    e(this._didWork, this.getPendingTasks())
                }
                , t)),
                this._callbacks.push({
                    doneCb: e,
                    timeoutId: r,
                    updateCb: n
                })
            }
            whenStable(e, t, n) {
                if (n && !this.taskTrackingZone)
                    throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?');
                this.addCallback(e, t, n),
                this._runCallbacksIfReady()
            }
            getPendingRequestCount() {
                return this._pendingCount
            }
            findProviders(e, t, n) {
                return []
            }
        }
        class Zs {
            constructor() {
                this._applications = new Map,
                qs.addToWindow(this)
            }
            registerApplication(e, t) {
                this._applications.set(e, t)
            }
            unregisterApplication(e) {
                this._applications.delete(e)
            }
            unregisterAllApplications() {
                this._applications.clear()
            }
            getTestability(e) {
                return this._applications.get(e) || null
            }
            getAllTestabilities() {
                return Array.from(this._applications.values())
            }
            getAllRootElements() {
                return Array.from(this._applications.keys())
            }
            findTestabilityInTree(e, t=!0) {
                return qs.findTestabilityInTree(this, e, t)
            }
        }
        class Gs {
            addToWindow(e) {}
            findTestabilityInTree(e, t, n) {
                return null
            }
        }
        let Ws, qs = new Gs;
        const Qs = new ve("AllowMultipleToken");
        class Ks {
            constructor(e, t) {
                this.name = e,
                this.token = t
            }
        }
        function Js(e, t, n=[]) {
            const r = `Platform: ${t}`
              , s = new ve(r);
            return (t=[])=>{
                let i = Ys();
                if (!i || i.injector.get(Qs, !1))
                    if (e)
                        e(n.concat(t).concat({
                            provide: s,
                            useValue: !0
                        }));
                    else {
                        const e = n.concat(t).concat({
                            provide: s,
                            useValue: !0
                        });
                        !function(e) {
                            if (Ws && !Ws.destroyed && !Ws.injector.get(Qs, !1))
                                throw new Error("There can be only one platform. Destroy the previous one to create a new one.");
                            Ws = e.get(Xs);
                            const t = e.get(ms, null);
                            t && t.forEach(e=>e())
                        }(_t.create({
                            providers: e,
                            name: r
                        }))
                    }
                return function(e) {
                    const t = Ys();
                    if (!t)
                        throw new Error("No platform exists!");
                    if (!t.injector.get(e, null))
                        throw new Error("A platform with a different configuration has been created. Please destroy it first.");
                    return t
                }(s)
            }
        }
        function Ys() {
            return Ws && !Ws.destroyed ? Ws : null
        }
        class Xs {
            constructor(e) {
                this._injector = e,
                this._modules = [],
                this._destroyListeners = [],
                this._destroyed = !1
            }
            bootstrapModuleFactory(e, t) {
                const n = function(e) {
                    let t;
                    return t = "noop" === e ? new Us : ("zone.js" === e ? void 0 : e) || new Fs({
                        enableLongStackTrace: je()
                    }),
                    t
                }(t ? t.ngZone : void 0)
                  , r = [{
                    provide: Fs,
                    useValue: n
                }];
                return n.run(()=>{
                    const t = _t.create({
                        providers: r,
                        parent: this.injector,
                        name: e.moduleType.name
                    })
                      , s = e.create(t)
                      , i = s.injector.get(Pe, null);
                    if (!i)
                        throw new Error("No ErrorHandler. Is platform module (BrowserModule) included?");
                    return s.onDestroy(()=>ni(this._modules, s)),
                    n.runOutsideAngular(()=>n.onError.subscribe({
                        next: e=>{
                            i.handleError(e)
                        }
                    })),
                    function(e, t, n) {
                        try {
                            const r = n();
                            return Dt(r) ? r.catch(n=>{
                                throw t.runOutsideAngular(()=>e.handleError(n)),
                                n
                            }
                            ) : r
                        } catch (r) {
                            throw t.runOutsideAngular(()=>e.handleError(r)),
                            r
                        }
                    }(i, n, ()=>{
                        const e = s.injector.get(hs);
                        return e.runInitializers(),
                        e.donePromise.then(()=>(this._moduleDoBootstrap(s),
                        s))
                    }
                    )
                }
                )
            }
            bootstrapModule(e, t=[]) {
                const n = ei({}, t);
                return function(e, t, n) {
                    return e.get(Ss).createCompiler([t]).compileModuleAsync(n)
                }(this.injector, n, e).then(e=>this.bootstrapModuleFactory(e, n))
            }
            _moduleDoBootstrap(e) {
                const t = e.injector.get(ti);
                if (e._bootstrapComponents.length > 0)
                    e._bootstrapComponents.forEach(e=>t.bootstrap(e));
                else {
                    if (!e.instance.ngDoBootstrap)
                        throw new Error(`The module ${ce(e.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` + "Please define one of these.");
                    e.instance.ngDoBootstrap(t)
                }
                this._modules.push(e)
            }
            onDestroy(e) {
                this._destroyListeners.push(e)
            }
            get injector() {
                return this._injector
            }
            destroy() {
                if (this._destroyed)
                    throw new Error("The platform has already been destroyed!");
                this._modules.slice().forEach(e=>e.destroy()),
                this._destroyListeners.forEach(e=>e()),
                this._destroyed = !0
            }
            get destroyed() {
                return this._destroyed
            }
        }
        function ei(e, t) {
            return Array.isArray(t) ? t.reduce(ei, e) : Object.assign({}, e, t)
        }
        let ti = (()=>{
            class e {
                constructor(e, t, n, r, s, i) {
                    this._zone = e,
                    this._console = t,
                    this._injector = n,
                    this._exceptionHandler = r,
                    this._componentFactoryResolver = s,
                    this._initStatus = i,
                    this._bootstrapListeners = [],
                    this._views = [],
                    this._runningTick = !1,
                    this._enforceNoNewChanges = !1,
                    this._stable = !0,
                    this.componentTypes = [],
                    this.components = [],
                    this._enforceNoNewChanges = je(),
                    this._zone.onMicrotaskEmpty.subscribe({
                        next: ()=>{
                            this._zone.run(()=>{
                                this.tick()
                            }
                            )
                        }
                    });
                    const o = new v(e=>{
                        this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks,
                        this._zone.runOutsideAngular(()=>{
                            e.next(this._stable),
                            e.complete()
                        }
                        )
                    }
                    )
                      , l = new v(e=>{
                        let t;
                        this._zone.runOutsideAngular(()=>{
                            t = this._zone.onStable.subscribe(()=>{
                                Fs.assertNotInAngularZone(),
                                Ps(()=>{
                                    this._stable || this._zone.hasPendingMacrotasks || this._zone.hasPendingMicrotasks || (this._stable = !0,
                                    e.next(!0))
                                }
                                )
                            }
                            )
                        }
                        );
                        const n = this._zone.onUnstable.subscribe(()=>{
                            Fs.assertInAngularZone(),
                            this._stable && (this._stable = !1,
                            this._zone.runOutsideAngular(()=>{
                                e.next(!1)
                            }
                            ))
                        }
                        );
                        return ()=>{
                            t.unsubscribe(),
                            n.unsubscribe()
                        }
                    }
                    );
                    this.isStable = function(...e) {
                        let t = Number.POSITIVE_INFINITY
                          , n = null
                          , r = e[e.length - 1];
                        var s;
                        return (s = r) && "function" == typeof s.schedule ? (n = e.pop(),
                        e.length > 1 && "number" == typeof e[e.length - 1] && (t = e.pop())) : "number" == typeof r && (t = e.pop()),
                        null === n && 1 === e.length && e[0]instanceof v ? e[0] : function(e=Number.POSITIVE_INFINITY) {
                            return function e(t, n, r=Number.POSITIVE_INFINITY) {
                                return "function" == typeof n ? s=>s.pipe(e((e,r)=>U(t(e, r)).pipe(j((t,s)=>n(e, t, r, s))), r)) : ("number" == typeof n && (r = n),
                                e=>e.lift(new z(t,r)))
                            }(G, e)
                        }(t)($(e, n))
                    }(o, l.pipe(e=>{
                        return W()((t = X,
                        function(e) {
                            let n;
                            n = "function" == typeof t ? t : function() {
                                return t
                            }
                            ;
                            const r = Object.create(e, J);
                            return r.source = e,
                            r.subjectFactory = n,
                            r
                        }
                        )(e));
                        var t
                    }
                    ))
                }
                bootstrap(e, t) {
                    if (!this._initStatus.done)
                        throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
                    let n;
                    n = e instanceof Rt ? e : this._componentFactoryResolver.resolveComponentFactory(e),
                    this.componentTypes.push(n.componentType);
                    const r = n instanceof Bt ? null : this._injector.get(Ie)
                      , s = n.create(_t.NULL, [], t || n.selector, r);
                    s.onDestroy(()=>{
                        this._unloadComponent(s)
                    }
                    );
                    const i = s.injector.get(zs, null);
                    return i && s.injector.get(Zs).registerApplication(s.location.nativeElement, i),
                    this._loadComponent(s),
                    je() && this._console.log("Angular is running in the development mode. Call enableProdMode() to enable the production mode."),
                    s
                }
                tick() {
                    if (this._runningTick)
                        throw new Error("ApplicationRef.tick is called recursively");
                    const t = e._tickScope();
                    try {
                        this._runningTick = !0;
                        for (let e of this._views)
                            e.detectChanges();
                        if (this._enforceNoNewChanges)
                            for (let e of this._views)
                                e.checkNoChanges()
                    } catch (n) {
                        this._zone.runOutsideAngular(()=>this._exceptionHandler.handleError(n))
                    } finally {
                        this._runningTick = !1,
                        Ms(t)
                    }
                }
                attachView(e) {
                    const t = e;
                    this._views.push(t),
                    t.attachToAppRef(this)
                }
                detachView(e) {
                    const t = e;
                    ni(this._views, t),
                    t.detachFromAppRef()
                }
                _loadComponent(e) {
                    this.attachView(e.hostView),
                    this.tick(),
                    this.components.push(e),
                    this._injector.get(ys, []).concat(this._bootstrapListeners).forEach(t=>t(e))
                }
                _unloadComponent(e) {
                    this.detachView(e.hostView),
                    ni(this.components, e)
                }
                ngOnDestroy() {
                    this._views.slice().forEach(e=>e.destroy())
                }
                get viewCount() {
                    return this._views.length
                }
            }
            return e._tickScope = Os("ApplicationRef#tick()"),
            e
        }
        )();
        function ni(e, t) {
            const n = e.indexOf(t);
            n > -1 && e.splice(n, 1)
        }
        class ri {
            constructor(e, t) {
                this.name = e,
                this.callback = t
            }
        }
        class si {
            constructor(e, t, n) {
                this.listeners = [],
                this.parent = null,
                this._debugContext = n,
                this.nativeNode = e,
                t && t instanceof ii && t.addChild(this)
            }
            get injector() {
                return this._debugContext.injector
            }
            get componentInstance() {
                return this._debugContext.component
            }
            get context() {
                return this._debugContext.context
            }
            get references() {
                return this._debugContext.references
            }
            get providerTokens() {
                return this._debugContext.providerTokens
            }
        }
        class ii extends si {
            constructor(e, t, n) {
                super(e, t, n),
                this.properties = {},
                this.attributes = {},
                this.classes = {},
                this.styles = {},
                this.childNodes = [],
                this.nativeElement = e
            }
            addChild(e) {
                e && (this.childNodes.push(e),
                e.parent = this)
            }
            removeChild(e) {
                const t = this.childNodes.indexOf(e);
                -1 !== t && (e.parent = null,
                this.childNodes.splice(t, 1))
            }
            insertChildrenAfter(e, t) {
                const n = this.childNodes.indexOf(e);
                -1 !== n && (this.childNodes.splice(n + 1, 0, ...t),
                t.forEach(t=>{
                    t.parent && t.parent.removeChild(t),
                    e.parent = this
                }
                ))
            }
            insertBefore(e, t) {
                const n = this.childNodes.indexOf(e);
                -1 === n ? this.addChild(t) : (t.parent && t.parent.removeChild(t),
                t.parent = this,
                this.childNodes.splice(n, 0, t))
            }
            query(e) {
                return this.queryAll(e)[0] || null
            }
            queryAll(e) {
                const t = [];
                return function e(t, n, r) {
                    t.childNodes.forEach(t=>{
                        t instanceof ii && (n(t) && r.push(t),
                        e(t, n, r))
                    }
                    )
                }(this, e, t),
                t
            }
            queryAllNodes(e) {
                const t = [];
                return function e(t, n, r) {
                    t instanceof ii && t.childNodes.forEach(t=>{
                        n(t) && r.push(t),
                        t instanceof ii && e(t, n, r)
                    }
                    )
                }(this, e, t),
                t
            }
            get children() {
                return this.childNodes.filter(e=>e instanceof ii)
            }
            triggerEventHandler(e, t) {
                this.listeners.forEach(n=>{
                    n.name == e && n.callback(t)
                }
                )
            }
        }
        const oi = new Map
          , li = function(e) {
            return oi.get(e) || null
        };
        function ai(e) {
            oi.set(e.nativeNode, e)
        }
        const ui = Js(null, "core", [{
            provide: _s,
            useValue: "unknown"
        }, {
            provide: Xs,
            deps: [_t]
        }, {
            provide: Zs,
            deps: []
        }, {
            provide: vs,
            deps: []
        }]);
        function ci() {
            return hn
        }
        function di() {
            return pn
        }
        function hi(e) {
            return e || "en-US"
        }
        function pi(e) {
            let t = [];
            return e.onStable.subscribe(()=>{
                for (; t.length; )
                    t.pop()()
            }
            ),
            function(e) {
                t.push(e)
            }
        }
        class fi {
            constructor(e) {}
        }
        function gi(e, t, n, r, s, i) {
            e |= 1;
            const {matchedQueries: o, references: l, matchedQueryIds: a} = Zn(t);
            return {
                nodeIndex: -1,
                parent: null,
                renderParent: null,
                bindingIndex: -1,
                outputIndex: -1,
                flags: e,
                checkIndex: -1,
                childFlags: 0,
                directChildFlags: 0,
                childMatchedQueries: 0,
                matchedQueries: o,
                matchedQueryIds: a,
                references: l,
                ngContentIndex: n,
                childCount: r,
                bindings: [],
                bindingFlags: 0,
                outputs: [],
                element: {
                    ns: null,
                    name: null,
                    attrs: null,
                    template: i ? Qn(i) : null,
                    componentProvider: null,
                    componentView: null,
                    componentRendererType: null,
                    publicProviders: null,
                    allProviders: null,
                    handleEvent: s || An
                },
                provider: null,
                text: null,
                query: null,
                ngContent: null
            }
        }
        function mi(e, t, n, r, s, i, o=[], l, a, u, c, d) {
            u || (u = An);
            const {matchedQueries: h, references: p, matchedQueryIds: f} = Zn(n);
            let g = null
              , m = null;
            i && ([g,m] = nr(i)),
            l = l || [];
            const _ = new Array(l.length);
            for (let w = 0; w < l.length; w++) {
                const [e,t,n] = l[w]
                  , [r,s] = nr(t);
                let i = void 0
                  , o = void 0;
                switch (15 & e) {
                case 4:
                    o = n;
                    break;
                case 1:
                case 8:
                    i = n
                }
                _[w] = {
                    flags: e,
                    ns: r,
                    name: s,
                    nonMinifiedName: s,
                    securityContext: i,
                    suffix: o
                }
            }
            a = a || [];
            const y = new Array(a.length);
            for (let w = 0; w < a.length; w++) {
                const [e,t] = a[w];
                y[w] = {
                    type: 0,
                    target: e,
                    eventName: t,
                    propName: null
                }
            }
            const v = (o = o || []).map(([e,t])=>{
                const [n,r] = nr(e);
                return [n, r, t]
            }
            );
            return d = function(e) {
                if (e && "$$undefined" === e.id) {
                    const t = null != e.encapsulation && e.encapsulation !== Ve.None || e.styles.length || Object.keys(e.data).length;
                    e.id = t ? `c${On++}` : "$$empty"
                }
                return e && "$$empty" === e.id && (e = null),
                e || null
            }(d),
            c && (t |= 33554432),
            {
                nodeIndex: -1,
                parent: null,
                renderParent: null,
                bindingIndex: -1,
                outputIndex: -1,
                checkIndex: e,
                flags: t |= 1,
                childFlags: 0,
                directChildFlags: 0,
                childMatchedQueries: 0,
                matchedQueries: h,
                matchedQueryIds: f,
                references: p,
                ngContentIndex: r,
                childCount: s,
                bindings: _,
                bindingFlags: rr(_),
                outputs: y,
                element: {
                    ns: g,
                    name: m,
                    attrs: v,
                    template: null,
                    componentProvider: null,
                    componentView: c || null,
                    componentRendererType: d,
                    publicProviders: null,
                    allProviders: null,
                    handleEvent: u || An
                },
                provider: null,
                text: null,
                query: null,
                ngContent: null
            }
        }
        function _i(e, t, n) {
            const r = n.element
              , s = e.root.selectorOrNode
              , i = e.renderer;
            let o;
            if (e.parent || !s) {
                o = r.name ? i.createElement(r.name, r.ns) : i.createComment("");
                const s = Wn(e, t, n);
                s && i.appendChild(s, o)
            } else
                o = i.selectRootElement(s, !!r.componentRendererType && r.componentRendererType.encapsulation === Ve.ShadowDom);
            if (r.attrs)
                for (let l = 0; l < r.attrs.length; l++) {
                    const [e,t,n] = r.attrs[l];
                    i.setAttribute(o, t, n, e)
                }
            return o
        }
        function yi(e, t, n, r) {
            for (let o = 0; o < n.outputs.length; o++) {
                const l = n.outputs[o]
                  , a = vi(e, n.nodeIndex, (i = l.eventName,
                (s = l.target) ? `${s}:${i}` : i));
                let u = l.target
                  , c = e;
                "component" === l.target && (u = null,
                c = t);
                const d = c.renderer.listen(u || r, l.eventName, a);
                e.disposables[n.outputIndex + o] = d
            }
            var s, i
        }
        function vi(e, t, n) {
            return r=>jn(e, t, n, r)
        }
        function wi(e, t, n, r) {
            if (!Rn(e, t, n, r))
                return !1;
            const s = t.bindings[n]
              , i = xn(e, t.nodeIndex)
              , o = i.renderElement
              , l = s.name;
            switch (15 & s.flags) {
            case 1:
                !function(e, t, n, r, s, i) {
                    const o = t.securityContext;
                    let l = o ? e.root.sanitizer.sanitize(o, i) : i;
                    l = null != l ? l.toString() : null;
                    const a = e.renderer;
                    null != i ? a.setAttribute(n, s, l, r) : a.removeAttribute(n, s, r)
                }(e, s, o, s.ns, l, r);
                break;
            case 2:
                !function(e, t, n, r) {
                    const s = e.renderer;
                    r ? s.addClass(t, n) : s.removeClass(t, n)
                }(e, o, l, r);
                break;
            case 4:
                !function(e, t, n, r, s) {
                    let i = e.root.sanitizer.sanitize(lt.STYLE, s);
                    if (null != i) {
                        i = i.toString();
                        const e = t.suffix;
                        null != e && (i += e)
                    } else
                        i = null;
                    const o = e.renderer;
                    null != i ? o.setStyle(n, r, i) : o.removeStyle(n, r)
                }(e, s, o, l, r);
                break;
            case 8:
                !function(e, t, n, r, s) {
                    const i = t.securityContext;
                    let o = i ? e.root.sanitizer.sanitize(i, s) : s;
                    e.renderer.setProperty(n, r, o)
                }(33554432 & t.flags && 32 & s.flags ? i.componentView : e, s, o, l, r)
            }
            return !0
        }
        function bi(e) {
            const t = e.def.nodeMatchedQueries;
            for (; e.parent && zn(e); ) {
                let n = e.parentNodeDef;
                e = e.parent;
                const r = n.nodeIndex + n.childCount;
                for (let s = 0; s <= r; s++) {
                    const r = e.def.nodes[s];
                    67108864 & r.flags && 536870912 & r.flags && (r.query.filterId & t) === r.query.filterId && Sn(e, s).setDirty(),
                    !(1 & r.flags && s + r.childCount < n.nodeIndex) && 67108864 & r.childFlags && 536870912 & r.childFlags || (s += r.childCount)
                }
            }
            if (134217728 & e.def.nodeFlags)
                for (let n = 0; n < e.def.nodes.length; n++) {
                    const t = e.def.nodes[n];
                    134217728 & t.flags && 536870912 & t.flags && Sn(e, n).setDirty(),
                    n += t.childCount
                }
        }
        function Ci(e, t) {
            const n = Sn(e, t.nodeIndex);
            if (!n.dirty)
                return;
            let r, s = void 0;
            if (67108864 & t.flags) {
                const n = t.parent.parent;
                s = Ei(e, n.nodeIndex, n.nodeIndex + n.childCount, t.query, []),
                r = kn(e, t.parent.nodeIndex).instance
            } else
                134217728 & t.flags && (s = Ei(e, 0, e.def.nodes.length - 1, t.query, []),
                r = e.component);
            n.reset(s);
            const i = t.query.bindings;
            let o = !1;
            for (let l = 0; l < i.length; l++) {
                const e = i[l];
                let t;
                switch (e.bindingType) {
                case 0:
                    t = n.first;
                    break;
                case 1:
                    t = n,
                    o = !0
                }
                r[e.propName] = t
            }
            o && n.notifyOnChanges()
        }
        function Ei(e, t, n, r, s) {
            for (let i = t; i <= n; i++) {
                const t = e.def.nodes[i]
                  , n = t.matchedQueries[r.id];
                if (null != n && s.push(xi(e, t, n)),
                1 & t.flags && t.element.template && (t.element.template.nodeMatchedQueries & r.filterId) === r.filterId) {
                    const n = xn(e, i);
                    if ((t.childMatchedQueries & r.filterId) === r.filterId && (Ei(e, i + 1, i + t.childCount, r, s),
                    i += t.childCount),
                    16777216 & t.flags) {
                        const e = n.viewContainer._embeddedViews;
                        for (let t = 0; t < e.length; t++) {
                            const i = e[t]
                              , o = Hn(i);
                            o && o === n && Ei(i, 0, i.def.nodes.length - 1, r, s)
                        }
                    }
                    const o = n.template._projectedViews;
                    if (o)
                        for (let e = 0; e < o.length; e++) {
                            const t = o[e];
                            Ei(t, 0, t.def.nodes.length - 1, r, s)
                        }
                }
                (t.childMatchedQueries & r.filterId) !== r.filterId && (i += t.childCount)
            }
            return s
        }
        function xi(e, t, n) {
            if (null != n)
                switch (n) {
                case 1:
                    return xn(e, t.nodeIndex).renderElement;
                case 0:
                    return new Ut(xn(e, t.nodeIndex).renderElement);
                case 2:
                    return xn(e, t.nodeIndex).template;
                case 3:
                    return xn(e, t.nodeIndex).viewContainer;
                case 4:
                    return kn(e, t.nodeIndex).instance
                }
        }
        function ki(e, t, n) {
            const r = Wn(e, t, n);
            r && Yn(e, n.ngContent.index, 1, r, null, void 0)
        }
        function Ti(e, t) {
            const n = Object.keys(t)
              , r = n.length
              , s = new Array(r);
            for (let i = 0; i < r; i++) {
                const e = n[i];
                s[t[e]] = e
            }
            return function(e, t, n) {
                const r = new Array(n.length);
                for (let s = 0; s < n.length; s++) {
                    const e = n[s];
                    r[s] = {
                        flags: 8,
                        name: e,
                        ns: null,
                        nonMinifiedName: e,
                        securityContext: null,
                        suffix: null
                    }
                }
                return {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    checkIndex: t,
                    flags: 64,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    matchedQueries: {},
                    matchedQueryIds: 0,
                    references: {},
                    ngContentIndex: -1,
                    childCount: 0,
                    bindings: r,
                    bindingFlags: rr(r),
                    outputs: [],
                    element: null,
                    provider: null,
                    text: null,
                    query: null,
                    ngContent: null
                }
            }(0, e, s)
        }
        function Si(e, t, n) {
            const r = new Array(n.length - 1);
            for (let s = 1; s < n.length; s++)
                r[s - 1] = {
                    flags: 8,
                    name: null,
                    ns: null,
                    nonMinifiedName: null,
                    securityContext: null,
                    suffix: n[s]
                };
            return {
                nodeIndex: -1,
                parent: null,
                renderParent: null,
                bindingIndex: -1,
                outputIndex: -1,
                checkIndex: e,
                flags: 2,
                childFlags: 0,
                directChildFlags: 0,
                childMatchedQueries: 0,
                matchedQueries: {},
                matchedQueryIds: 0,
                references: {},
                ngContentIndex: t,
                childCount: 0,
                bindings: r,
                bindingFlags: 8,
                outputs: [],
                element: null,
                provider: null,
                text: {
                    prefix: n[0]
                },
                query: null,
                ngContent: null
            }
        }
        function Ii(e, t, n) {
            let r;
            const s = e.renderer;
            r = s.createText(n.text.prefix);
            const i = Wn(e, t, n);
            return i && s.appendChild(i, r),
            {
                renderText: r
            }
        }
        function Ai(e, t) {
            return (null != e ? e.toString() : "") + t.suffix
        }
        function Ni(e, t, n, r) {
            let s = 0
              , i = 0
              , o = 0
              , l = 0
              , a = 0
              , u = null
              , c = null
              , d = !1
              , h = !1
              , p = null;
            for (let f = 0; f < t.length; f++) {
                const e = t[f];
                if (e.nodeIndex = f,
                e.parent = u,
                e.bindingIndex = s,
                e.outputIndex = i,
                e.renderParent = c,
                o |= e.flags,
                a |= e.matchedQueryIds,
                e.element) {
                    const t = e.element;
                    t.publicProviders = u ? u.element.publicProviders : Object.create(null),
                    t.allProviders = t.publicProviders,
                    d = !1,
                    h = !1,
                    e.element.template && (a |= e.element.template.nodeMatchedQueries)
                }
                if (Di(u, e, t.length),
                s += e.bindings.length,
                i += e.outputs.length,
                !c && 3 & e.flags && (p = e),
                20224 & e.flags) {
                    d || (d = !0,
                    u.element.publicProviders = Object.create(u.element.publicProviders),
                    u.element.allProviders = u.element.publicProviders);
                    const t = 0 != (32768 & e.flags);
                    0 == (8192 & e.flags) || t ? u.element.publicProviders[Vn(e.provider.token)] = e : (h || (h = !0,
                    u.element.allProviders = Object.create(u.element.publicProviders)),
                    u.element.allProviders[Vn(e.provider.token)] = e),
                    t && (u.element.componentProvider = e)
                }
                if (u ? (u.childFlags |= e.flags,
                u.directChildFlags |= e.flags,
                u.childMatchedQueries |= e.matchedQueryIds,
                e.element && e.element.template && (u.childMatchedQueries |= e.element.template.nodeMatchedQueries)) : l |= e.flags,
                e.childCount > 0)
                    u = e,
                    Vi(e) || (c = e);
                else
                    for (; u && f === u.nodeIndex + u.childCount; ) {
                        const e = u.parent;
                        e && (e.childFlags |= u.childFlags,
                        e.childMatchedQueries |= u.childMatchedQueries),
                        u = e,
                        c = u && Vi(u) ? u.renderParent : u
                    }
            }
            return {
                factory: null,
                nodeFlags: o,
                rootNodeFlags: l,
                nodeMatchedQueries: a,
                flags: e,
                nodes: t,
                updateDirectives: n || An,
                updateRenderer: r || An,
                handleEvent: (e,n,r,s)=>t[n].element.handleEvent(e, r, s),
                bindingCount: s,
                outputCount: i,
                lastRenderRootNode: p
            }
        }
        function Vi(e) {
            return 0 != (1 & e.flags) && null === e.element.name
        }
        function Di(e, t, n) {
            const r = t.element && t.element.template;
            if (r) {
                if (!r.lastRenderRootNode)
                    throw new Error("Illegal State: Embedded templates without nodes are not allowed!");
                if (r.lastRenderRootNode && 16777216 & r.lastRenderRootNode.flags)
                    throw new Error(`Illegal State: Last root node of a template can't have embedded views, at index ${t.nodeIndex}!`)
            }
            if (20224 & t.flags && 0 == (1 & (e ? e.flags : 0)))
                throw new Error(`Illegal State: StaticProvider/Directive nodes need to be children of elements or anchors, at index ${t.nodeIndex}!`);
            if (t.query) {
                if (67108864 & t.flags && (!e || 0 == (16384 & e.flags)))
                    throw new Error(`Illegal State: Content Query nodes need to be children of directives, at index ${t.nodeIndex}!`);
                if (134217728 & t.flags && e)
                    throw new Error(`Illegal State: View Query nodes have to be top level nodes, at index ${t.nodeIndex}!`)
            }
            if (t.childCount) {
                const r = e ? e.nodeIndex + e.childCount : n - 1;
                if (t.nodeIndex <= r && t.nodeIndex + t.childCount > r)
                    throw new Error(`Illegal State: childCount of node leads outside of parent, at index ${t.nodeIndex}!`)
            }
        }
        function Oi(e, t, n, r) {
            const s = Pi(e.root, e.renderer, e, t, n);
            return Fi(s, e.component, r),
            Li(s),
            s
        }
        function Mi(e, t, n) {
            const r = Pi(e, e.renderer, null, null, t);
            return Fi(r, n, n),
            Li(r),
            r
        }
        function Ri(e, t, n, r) {
            const s = t.element.componentRendererType;
            let i;
            return i = s ? e.root.rendererFactory.createRenderer(r, s) : e.root.renderer,
            Pi(e.root, i, e, t.element.componentProvider, n)
        }
        function Pi(e, t, n, r, s) {
            const i = new Array(s.nodes.length)
              , o = s.outputCount ? new Array(s.outputCount) : null;
            return {
                def: s,
                parent: n,
                viewContainerParent: null,
                parentNodeDef: r,
                context: null,
                component: null,
                nodes: i,
                state: 13,
                root: e,
                renderer: t,
                oldValues: new Array(s.bindingCount),
                disposables: o,
                initIndex: -1
            }
        }
        function Fi(e, t, n) {
            e.component = t,
            e.context = n
        }
        function Li(e) {
            let t;
            Un(e) && (t = xn(e.parent, e.parentNodeDef.parent.nodeIndex).renderElement);
            const n = e.def
              , r = e.nodes;
            for (let s = 0; s < n.nodes.length; s++) {
                const i = n.nodes[s];
                let o;
                switch (In.setCurrentNode(e, s),
                201347067 & i.flags) {
                case 1:
                    const n = _i(e, t, i);
                    let l = void 0;
                    if (33554432 & i.flags) {
                        const t = Qn(i.element.componentView);
                        l = In.createComponentView(e, i, t, n)
                    }
                    yi(e, l, i, n),
                    o = {
                        renderElement: n,
                        componentView: l,
                        viewContainer: null,
                        template: i.element.template ? xr(e, i) : void 0
                    },
                    16777216 & i.flags && (o.viewContainer = wr(e, i, o));
                    break;
                case 2:
                    o = Ii(e, t, i);
                    break;
                case 512:
                case 1024:
                case 2048:
                case 256:
                    o = r[s],
                    o || 4096 & i.flags || (o = {
                        instance: zr(e, i)
                    });
                    break;
                case 16:
                    o = {
                        instance: Zr(e, i)
                    };
                    break;
                case 16384:
                    o = r[s],
                    o || (o = {
                        instance: Gr(e, i)
                    }),
                    32768 & i.flags && Fi(xn(e, i.parent.nodeIndex).componentView, o.instance, o.instance);
                    break;
                case 32:
                case 64:
                case 128:
                    o = {
                        value: void 0
                    };
                    break;
                case 67108864:
                case 134217728:
                    o = new cs;
                    break;
                case 8:
                    ki(e, t, i),
                    o = void 0
                }
                r[s] = o
            }
            Wi(e, Gi.CreateViewNodes),
            Ji(e, 201326592, 268435456, 0)
        }
        function ji(e) {
            $i(e),
            In.updateDirectives(e, 1),
            qi(e, Gi.CheckNoChanges),
            In.updateRenderer(e, 1),
            Wi(e, Gi.CheckNoChanges),
            e.state &= -97
        }
        function Hi(e) {
            1 & e.state ? (e.state &= -2,
            e.state |= 2) : e.state &= -3,
            bn(e, 0, 256),
            $i(e),
            In.updateDirectives(e, 0),
            qi(e, Gi.CheckAndUpdate),
            Ji(e, 67108864, 536870912, 0);
            let t = bn(e, 256, 512);
            es(e, 2097152 | (t ? 1048576 : 0)),
            In.updateRenderer(e, 0),
            Wi(e, Gi.CheckAndUpdate),
            Ji(e, 134217728, 536870912, 0),
            t = bn(e, 512, 768),
            es(e, 8388608 | (t ? 4194304 : 0)),
            2 & e.def.flags && (e.state &= -9),
            e.state &= -97,
            bn(e, 768, 1024)
        }
        function Bi(e, t, n, r, s, i, o, l, a, u, c, d, h) {
            return 0 === n ? function(e, t, n, r, s, i, o, l, a, u, c, d) {
                switch (201347067 & t.flags) {
                case 1:
                    return function(e, t, n, r, s, i, o, l, a, u, c, d) {
                        const h = t.bindings.length;
                        let p = !1;
                        return h > 0 && wi(e, t, 0, n) && (p = !0),
                        h > 1 && wi(e, t, 1, r) && (p = !0),
                        h > 2 && wi(e, t, 2, s) && (p = !0),
                        h > 3 && wi(e, t, 3, i) && (p = !0),
                        h > 4 && wi(e, t, 4, o) && (p = !0),
                        h > 5 && wi(e, t, 5, l) && (p = !0),
                        h > 6 && wi(e, t, 6, a) && (p = !0),
                        h > 7 && wi(e, t, 7, u) && (p = !0),
                        h > 8 && wi(e, t, 8, c) && (p = !0),
                        h > 9 && wi(e, t, 9, d) && (p = !0),
                        p
                    }(e, t, n, r, s, i, o, l, a, u, c, d);
                case 2:
                    return function(e, t, n, r, s, i, o, l, a, u, c, d) {
                        let h = !1;
                        const p = t.bindings
                          , f = p.length;
                        if (f > 0 && Rn(e, t, 0, n) && (h = !0),
                        f > 1 && Rn(e, t, 1, r) && (h = !0),
                        f > 2 && Rn(e, t, 2, s) && (h = !0),
                        f > 3 && Rn(e, t, 3, i) && (h = !0),
                        f > 4 && Rn(e, t, 4, o) && (h = !0),
                        f > 5 && Rn(e, t, 5, l) && (h = !0),
                        f > 6 && Rn(e, t, 6, a) && (h = !0),
                        f > 7 && Rn(e, t, 7, u) && (h = !0),
                        f > 8 && Rn(e, t, 8, c) && (h = !0),
                        f > 9 && Rn(e, t, 9, d) && (h = !0),
                        h) {
                            let h = t.text.prefix;
                            f > 0 && (h += Ai(n, p[0])),
                            f > 1 && (h += Ai(r, p[1])),
                            f > 2 && (h += Ai(s, p[2])),
                            f > 3 && (h += Ai(i, p[3])),
                            f > 4 && (h += Ai(o, p[4])),
                            f > 5 && (h += Ai(l, p[5])),
                            f > 6 && (h += Ai(a, p[6])),
                            f > 7 && (h += Ai(u, p[7])),
                            f > 8 && (h += Ai(c, p[8])),
                            f > 9 && (h += Ai(d, p[9]));
                            const g = En(e, t.nodeIndex).renderText;
                            e.renderer.setValue(g, h)
                        }
                        return h
                    }(e, t, n, r, s, i, o, l, a, u, c, d);
                case 16384:
                    return function(e, t, n, r, s, i, o, l, a, u, c, d) {
                        const h = kn(e, t.nodeIndex)
                          , p = h.instance;
                        let f = !1
                          , g = void 0;
                        const m = t.bindings.length;
                        return m > 0 && Mn(e, t, 0, n) && (f = !0,
                        g = Xr(e, h, t, 0, n, g)),
                        m > 1 && Mn(e, t, 1, r) && (f = !0,
                        g = Xr(e, h, t, 1, r, g)),
                        m > 2 && Mn(e, t, 2, s) && (f = !0,
                        g = Xr(e, h, t, 2, s, g)),
                        m > 3 && Mn(e, t, 3, i) && (f = !0,
                        g = Xr(e, h, t, 3, i, g)),
                        m > 4 && Mn(e, t, 4, o) && (f = !0,
                        g = Xr(e, h, t, 4, o, g)),
                        m > 5 && Mn(e, t, 5, l) && (f = !0,
                        g = Xr(e, h, t, 5, l, g)),
                        m > 6 && Mn(e, t, 6, a) && (f = !0,
                        g = Xr(e, h, t, 6, a, g)),
                        m > 7 && Mn(e, t, 7, u) && (f = !0,
                        g = Xr(e, h, t, 7, u, g)),
                        m > 8 && Mn(e, t, 8, c) && (f = !0,
                        g = Xr(e, h, t, 8, c, g)),
                        m > 9 && Mn(e, t, 9, d) && (f = !0,
                        g = Xr(e, h, t, 9, d, g)),
                        g && p.ngOnChanges(g),
                        65536 & t.flags && Cn(e, 256, t.nodeIndex) && p.ngOnInit(),
                        262144 & t.flags && p.ngDoCheck(),
                        f
                    }(e, t, n, r, s, i, o, l, a, u, c, d);
                case 32:
                case 64:
                case 128:
                    return function(e, t, n, r, s, i, o, l, a, u, c, d) {
                        const h = t.bindings;
                        let p = !1;
                        const f = h.length;
                        if (f > 0 && Rn(e, t, 0, n) && (p = !0),
                        f > 1 && Rn(e, t, 1, r) && (p = !0),
                        f > 2 && Rn(e, t, 2, s) && (p = !0),
                        f > 3 && Rn(e, t, 3, i) && (p = !0),
                        f > 4 && Rn(e, t, 4, o) && (p = !0),
                        f > 5 && Rn(e, t, 5, l) && (p = !0),
                        f > 6 && Rn(e, t, 6, a) && (p = !0),
                        f > 7 && Rn(e, t, 7, u) && (p = !0),
                        f > 8 && Rn(e, t, 8, c) && (p = !0),
                        f > 9 && Rn(e, t, 9, d) && (p = !0),
                        p) {
                            const p = Tn(e, t.nodeIndex);
                            let g;
                            switch (201347067 & t.flags) {
                            case 32:
                                g = new Array(h.length),
                                f > 0 && (g[0] = n),
                                f > 1 && (g[1] = r),
                                f > 2 && (g[2] = s),
                                f > 3 && (g[3] = i),
                                f > 4 && (g[4] = o),
                                f > 5 && (g[5] = l),
                                f > 6 && (g[6] = a),
                                f > 7 && (g[7] = u),
                                f > 8 && (g[8] = c),
                                f > 9 && (g[9] = d);
                                break;
                            case 64:
                                g = {},
                                f > 0 && (g[h[0].name] = n),
                                f > 1 && (g[h[1].name] = r),
                                f > 2 && (g[h[2].name] = s),
                                f > 3 && (g[h[3].name] = i),
                                f > 4 && (g[h[4].name] = o),
                                f > 5 && (g[h[5].name] = l),
                                f > 6 && (g[h[6].name] = a),
                                f > 7 && (g[h[7].name] = u),
                                f > 8 && (g[h[8].name] = c),
                                f > 9 && (g[h[9].name] = d);
                                break;
                            case 128:
                                const e = n;
                                switch (f) {
                                case 1:
                                    g = e.transform(n);
                                    break;
                                case 2:
                                    g = e.transform(r);
                                    break;
                                case 3:
                                    g = e.transform(r, s);
                                    break;
                                case 4:
                                    g = e.transform(r, s, i);
                                    break;
                                case 5:
                                    g = e.transform(r, s, i, o);
                                    break;
                                case 6:
                                    g = e.transform(r, s, i, o, l);
                                    break;
                                case 7:
                                    g = e.transform(r, s, i, o, l, a);
                                    break;
                                case 8:
                                    g = e.transform(r, s, i, o, l, a, u);
                                    break;
                                case 9:
                                    g = e.transform(r, s, i, o, l, a, u, c);
                                    break;
                                case 10:
                                    g = e.transform(r, s, i, o, l, a, u, c, d)
                                }
                            }
                            p.value = g
                        }
                        return p
                    }(e, t, n, r, s, i, o, l, a, u, c, d);
                default:
                    throw "unreachable"
                }
            }(e, t, r, s, i, o, l, a, u, c, d, h) : function(e, t, n) {
                switch (201347067 & t.flags) {
                case 1:
                    return function(e, t, n) {
                        let r = !1;
                        for (let s = 0; s < n.length; s++)
                            wi(e, t, s, n[s]) && (r = !0);
                        return r
                    }(e, t, n);
                case 2:
                    return function(e, t, n) {
                        const r = t.bindings;
                        let s = !1;
                        for (let i = 0; i < n.length; i++)
                            Rn(e, t, i, n[i]) && (s = !0);
                        if (s) {
                            let s = "";
                            for (let e = 0; e < n.length; e++)
                                s += Ai(n[e], r[e]);
                            s = t.text.prefix + s;
                            const i = En(e, t.nodeIndex).renderText;
                            e.renderer.setValue(i, s)
                        }
                        return s
                    }(e, t, n);
                case 16384:
                    return function(e, t, n) {
                        const r = kn(e, t.nodeIndex)
                          , s = r.instance;
                        let i = !1
                          , o = void 0;
                        for (let l = 0; l < n.length; l++)
                            Mn(e, t, l, n[l]) && (i = !0,
                            o = Xr(e, r, t, l, n[l], o));
                        return o && s.ngOnChanges(o),
                        65536 & t.flags && Cn(e, 256, t.nodeIndex) && s.ngOnInit(),
                        262144 & t.flags && s.ngDoCheck(),
                        i
                    }(e, t, n);
                case 32:
                case 64:
                case 128:
                    return function(e, t, n) {
                        const r = t.bindings;
                        let s = !1;
                        for (let i = 0; i < n.length; i++)
                            Rn(e, t, i, n[i]) && (s = !0);
                        if (s) {
                            const s = Tn(e, t.nodeIndex);
                            let i;
                            switch (201347067 & t.flags) {
                            case 32:
                                i = n;
                                break;
                            case 64:
                                i = {};
                                for (let s = 0; s < n.length; s++)
                                    i[r[s].name] = n[s];
                                break;
                            case 128:
                                const e = n[0]
                                  , t = n.slice(1);
                                i = e.transform(...t)
                            }
                            s.value = i
                        }
                        return s
                    }(e, t, n);
                default:
                    throw "unreachable"
                }
            }(e, t, r)
        }
        function $i(e) {
            const t = e.def;
            if (4 & t.nodeFlags)
                for (let n = 0; n < t.nodes.length; n++) {
                    const r = t.nodes[n];
                    if (4 & r.flags) {
                        const t = xn(e, n).template._projectedViews;
                        if (t)
                            for (let n = 0; n < t.length; n++) {
                                const r = t[n];
                                r.state |= 32,
                                Ln(r, e)
                            }
                    } else
                        0 == (4 & r.childFlags) && (n += r.childCount)
                }
        }
        function Ui(e, t, n, r, s, i, o, l, a, u, c, d, h) {
            return 0 === n ? function(e, t, n, r, s, i, o, l, a, u, c, d) {
                const h = t.bindings.length;
                h > 0 && Pn(e, t, 0, n),
                h > 1 && Pn(e, t, 1, r),
                h > 2 && Pn(e, t, 2, s),
                h > 3 && Pn(e, t, 3, i),
                h > 4 && Pn(e, t, 4, o),
                h > 5 && Pn(e, t, 5, l),
                h > 6 && Pn(e, t, 6, a),
                h > 7 && Pn(e, t, 7, u),
                h > 8 && Pn(e, t, 8, c),
                h > 9 && Pn(e, t, 9, d)
            }(e, t, r, s, i, o, l, a, u, c, d, h) : function(e, t, n) {
                for (let r = 0; r < n.length; r++)
                    Pn(e, t, r, n[r])
            }(e, t, r),
            !1
        }
        function zi(e, t) {
            if (Sn(e, t.nodeIndex).dirty)
                throw yn(In.createDebugContext(e, t.nodeIndex), `Query ${t.query.id} not dirty`, `Query ${t.query.id} dirty`, 0 != (1 & e.state))
        }
        function Zi(e) {
            if (!(128 & e.state)) {
                if (qi(e, Gi.Destroy),
                Wi(e, Gi.Destroy),
                es(e, 131072),
                e.disposables)
                    for (let t = 0; t < e.disposables.length; t++)
                        e.disposables[t]();
                !function(e) {
                    if (!(16 & e.state))
                        return;
                    const t = Hn(e);
                    if (t) {
                        const n = t.template._projectedViews;
                        n && (Ne(n, n.indexOf(e)),
                        In.dirtyParentQueries(e))
                    }
                }(e),
                e.renderer.destroyNode && function(e) {
                    const t = e.def.nodes.length;
                    for (let n = 0; n < t; n++) {
                        const t = e.def.nodes[n];
                        1 & t.flags ? e.renderer.destroyNode(xn(e, n).renderElement) : 2 & t.flags ? e.renderer.destroyNode(En(e, n).renderText) : (67108864 & t.flags || 134217728 & t.flags) && Sn(e, n).destroy()
                    }
                }(e),
                Un(e) && e.renderer.destroy(),
                e.state |= 128
            }
        }
        const Gi = function() {
            var e = {
                CreateViewNodes: 0,
                CheckNoChanges: 1,
                CheckNoChangesProjectedViews: 2,
                CheckAndUpdate: 3,
                CheckAndUpdateProjectedViews: 4,
                Destroy: 5
            };
            return e[e.CreateViewNodes] = "CreateViewNodes",
            e[e.CheckNoChanges] = "CheckNoChanges",
            e[e.CheckNoChangesProjectedViews] = "CheckNoChangesProjectedViews",
            e[e.CheckAndUpdate] = "CheckAndUpdate",
            e[e.CheckAndUpdateProjectedViews] = "CheckAndUpdateProjectedViews",
            e[e.Destroy] = "Destroy",
            e
        }();
        function Wi(e, t) {
            const n = e.def;
            if (33554432 & n.nodeFlags)
                for (let r = 0; r < n.nodes.length; r++) {
                    const s = n.nodes[r];
                    33554432 & s.flags ? Qi(xn(e, r).componentView, t) : 0 == (33554432 & s.childFlags) && (r += s.childCount)
                }
        }
        function qi(e, t) {
            const n = e.def;
            if (16777216 & n.nodeFlags)
                for (let r = 0; r < n.nodes.length; r++) {
                    const s = n.nodes[r];
                    if (16777216 & s.flags) {
                        const n = xn(e, r).viewContainer._embeddedViews;
                        for (let e = 0; e < n.length; e++)
                            Qi(n[e], t)
                    } else
                        0 == (16777216 & s.childFlags) && (r += s.childCount)
                }
        }
        function Qi(e, t) {
            const n = e.state;
            switch (t) {
            case Gi.CheckNoChanges:
                0 == (128 & n) && (12 == (12 & n) ? ji(e) : 64 & n && Ki(e, Gi.CheckNoChangesProjectedViews));
                break;
            case Gi.CheckNoChangesProjectedViews:
                0 == (128 & n) && (32 & n ? ji(e) : 64 & n && Ki(e, t));
                break;
            case Gi.CheckAndUpdate:
                0 == (128 & n) && (12 == (12 & n) ? Hi(e) : 64 & n && Ki(e, Gi.CheckAndUpdateProjectedViews));
                break;
            case Gi.CheckAndUpdateProjectedViews:
                0 == (128 & n) && (32 & n ? Hi(e) : 64 & n && Ki(e, t));
                break;
            case Gi.Destroy:
                Zi(e);
                break;
            case Gi.CreateViewNodes:
                Li(e)
            }
        }
        function Ki(e, t) {
            qi(e, t),
            Wi(e, t)
        }
        function Ji(e, t, n, r) {
            if (!(e.def.nodeFlags & t && e.def.nodeFlags & n))
                return;
            const s = e.def.nodes.length;
            for (let i = 0; i < s; i++) {
                const s = e.def.nodes[i];
                if (s.flags & t && s.flags & n)
                    switch (In.setCurrentNode(e, s.nodeIndex),
                    r) {
                    case 0:
                        Ci(e, s);
                        break;
                    case 1:
                        zi(e, s)
                    }
                s.childFlags & t && s.childFlags & n || (i += s.childCount)
            }
        }
        let Yi = !1;
        function Xi(e, t, n, r, s, i) {
            const o = s.injector.get(Gt);
            return Mi(to(e, s, o, t, n), r, i)
        }
        function eo(e, t, n, r, s, i) {
            const o = s.injector.get(Gt)
              , l = to(e, s, new Mo(o), t, n)
              , a = ho(r);
            return Do(yo.create, Mi, null, [l, a, i])
        }
        function to(e, t, n, r, s) {
            const i = t.injector.get(at)
              , o = t.injector.get(Pe)
              , l = n.createRenderer(null, null);
            return {
                ngModule: t,
                injector: e,
                projectableNodes: r,
                selectorOrNode: s,
                sanitizer: i,
                rendererFactory: n,
                renderer: l,
                errorHandler: o
            }
        }
        function no(e, t, n, r) {
            const s = ho(n);
            return Do(yo.create, Oi, null, [e, t, s, r])
        }
        function ro(e, t, n, r) {
            return n = lo.get(t.element.componentProvider.provider.token) || ho(n),
            Do(yo.create, Ri, null, [e, t, n, r])
        }
        function so(e, t, n, r) {
            return Vr(e, t, n, function(e) {
                const {hasOverrides: t, hasDeprecatedOverrides: n} = function(e) {
                    let t = !1
                      , n = !1;
                    return 0 === io.size ? {
                        hasOverrides: t,
                        hasDeprecatedOverrides: n
                    } : (e.providers.forEach(e=>{
                        const r = io.get(e.token);
                        3840 & e.flags && r && (t = !0,
                        n = n || r.deprecatedBehavior)
                    }
                    ),
                    e.modules.forEach(e=>{
                        oo.forEach((r,s)=>{
                            ae(s).providedIn === e && (t = !0,
                            n = n || r.deprecatedBehavior)
                        }
                        )
                    }
                    ),
                    {
                        hasOverrides: t,
                        hasDeprecatedOverrides: n
                    })
                }(e);
                return t ? (function(e) {
                    for (let t = 0; t < e.providers.length; t++) {
                        const r = e.providers[t];
                        n && (r.flags |= 4096);
                        const s = io.get(r.token);
                        s && (r.flags = -3841 & r.flags | s.flags,
                        r.deps = Gn(s.deps),
                        r.value = s.value)
                    }
                    if (oo.size > 0) {
                        let t = new Set(e.modules);
                        oo.forEach((r,s)=>{
                            if (t.has(ae(s).providedIn)) {
                                let t = {
                                    token: s,
                                    flags: r.flags | (n ? 4096 : 0),
                                    deps: Gn(r.deps),
                                    value: r.value,
                                    index: e.providers.length
                                };
                                e.providers.push(t),
                                e.providersByKey[Vn(s)] = t
                            }
                        }
                        )
                    }
                }(e = e.factory(()=>An)),
                e) : e
            }(r))
        }
        const io = new Map
          , oo = new Map
          , lo = new Map;
        function ao(e) {
            let t;
            io.set(e.token, e),
            "function" == typeof e.token && (t = ae(e.token)) && "function" == typeof t.providedIn && oo.set(e.token, e)
        }
        function uo(e, t) {
            const n = Qn(t.viewDefFactory)
              , r = Qn(n.nodes[0].element.componentView);
            lo.set(e, r)
        }
        function co() {
            io.clear(),
            oo.clear(),
            lo.clear()
        }
        function ho(e) {
            if (0 === io.size)
                return e;
            const t = function(e) {
                const t = [];
                let n = null;
                for (let r = 0; r < e.nodes.length; r++) {
                    const s = e.nodes[r];
                    1 & s.flags && (n = s),
                    n && 3840 & s.flags && io.has(s.provider.token) && (t.push(n.nodeIndex),
                    n = null)
                }
                return t
            }(e);
            if (0 === t.length)
                return e;
            e = e.factory(()=>An);
            for (let r = 0; r < t.length; r++)
                n(e, t[r]);
            return e;
            function n(e, t) {
                for (let n = t + 1; n < e.nodes.length; n++) {
                    const t = e.nodes[n];
                    if (1 & t.flags)
                        return;
                    if (3840 & t.flags) {
                        const e = t.provider
                          , n = io.get(e.token);
                        n && (t.flags = -3841 & t.flags | n.flags,
                        e.deps = Gn(n.deps),
                        e.value = n.value)
                    }
                }
            }
        }
        function po(e, t, n, r, s, i, o, l, a, u, c, d, h) {
            const p = e.def.nodes[t];
            return Bi(e, p, n, r, s, i, o, l, a, u, c, d, h),
            224 & p.flags ? Tn(e, t).value : void 0
        }
        function fo(e, t, n, r, s, i, o, l, a, u, c, d, h) {
            const p = e.def.nodes[t];
            return Ui(e, p, n, r, s, i, o, l, a, u, c, d, h),
            224 & p.flags ? Tn(e, t).value : void 0
        }
        function go(e) {
            return Do(yo.detectChanges, Hi, null, [e])
        }
        function mo(e) {
            return Do(yo.checkNoChanges, ji, null, [e])
        }
        function _o(e) {
            return Do(yo.destroy, Zi, null, [e])
        }
        const yo = function() {
            var e = {
                create: 0,
                detectChanges: 1,
                checkNoChanges: 2,
                destroy: 3,
                handleEvent: 4
            };
            return e[e.create] = "create",
            e[e.detectChanges] = "detectChanges",
            e[e.checkNoChanges] = "checkNoChanges",
            e[e.destroy] = "destroy",
            e[e.handleEvent] = "handleEvent",
            e
        }();
        let vo, wo, bo;
        function Co(e, t) {
            wo = e,
            bo = t
        }
        function Eo(e, t, n, r) {
            return Co(e, t),
            Do(yo.handleEvent, e.def.handleEvent, null, [e, t, n, r])
        }
        function xo(e, t) {
            if (128 & e.state)
                throw wn(yo[vo]);
            return Co(e, Io(e, 0)),
            e.def.updateDirectives((function(e, n, r, ...s) {
                const i = e.def.nodes[n];
                return 0 === t ? To(e, i, r, s) : So(e, i, r, s),
                16384 & i.flags && Co(e, Io(e, n)),
                224 & i.flags ? Tn(e, i.nodeIndex).value : void 0
            }
            ), e)
        }
        function ko(e, t) {
            if (128 & e.state)
                throw wn(yo[vo]);
            return Co(e, Ao(e, 0)),
            e.def.updateRenderer((function(e, n, r, ...s) {
                const i = e.def.nodes[n];
                return 0 === t ? To(e, i, r, s) : So(e, i, r, s),
                3 & i.flags && Co(e, Ao(e, n)),
                224 & i.flags ? Tn(e, i.nodeIndex).value : void 0
            }
            ), e)
        }
        function To(e, t, n, r) {
            if (Bi(e, t, n, ...r)) {
                const o = 1 === n ? r[0] : r;
                if (16384 & t.flags) {
                    const n = {};
                    for (let e = 0; e < t.bindings.length; e++) {
                        const r = t.bindings[e]
                          , l = o[e];
                        8 & r.flags && (n[(s = r.nonMinifiedName,
                        i = void 0,
                        i = s.replace(/[$@]/g, "_"),
                        `ng-reflect-${s = i.replace(dt, (...e)=>"-" + e[1].toLowerCase())}`)] = ht(l))
                    }
                    const r = t.parent
                      , l = xn(e, r.nodeIndex).renderElement;
                    if (r.element.name)
                        for (let t in n) {
                            const r = n[t];
                            null != r ? e.renderer.setAttribute(l, t, r) : e.renderer.removeAttribute(l, t)
                        }
                    else
                        e.renderer.setValue(l, `bindings=${JSON.stringify(n, null, 2)}`)
                }
            }
            var s, i
        }
        function So(e, t, n, r) {
            Ui(e, t, n, ...r)
        }
        function Io(e, t) {
            for (let n = t; n < e.def.nodes.length; n++) {
                const t = e.def.nodes[n];
                if (16384 & t.flags && t.bindings && t.bindings.length)
                    return n
            }
            return null
        }
        function Ao(e, t) {
            for (let n = t; n < e.def.nodes.length; n++) {
                const t = e.def.nodes[n];
                if (3 & t.flags && t.bindings && t.bindings.length)
                    return n
            }
            return null
        }
        class No {
            constructor(e, t) {
                this.view = e,
                this.nodeIndex = t,
                null == t && (this.nodeIndex = t = 0),
                this.nodeDef = e.def.nodes[t];
                let n = this.nodeDef
                  , r = e;
                for (; n && 0 == (1 & n.flags); )
                    n = n.parent;
                if (!n)
                    for (; !n && r; )
                        n = Bn(r),
                        r = r.parent;
                this.elDef = n,
                this.elView = r
            }
            get elOrCompView() {
                return xn(this.elView, this.elDef.nodeIndex).componentView || this.view
            }
            get injector() {
                return Tr(this.elView, this.elDef)
            }
            get component() {
                return this.elOrCompView.component
            }
            get context() {
                return this.elOrCompView.context
            }
            get providerTokens() {
                const e = [];
                if (this.elDef)
                    for (let t = this.elDef.nodeIndex + 1; t <= this.elDef.nodeIndex + this.elDef.childCount; t++) {
                        const n = this.elView.def.nodes[t];
                        20224 & n.flags && e.push(n.provider.token),
                        t += n.childCount
                    }
                return e
            }
            get references() {
                const e = {};
                if (this.elDef) {
                    Vo(this.elView, this.elDef, e);
                    for (let t = this.elDef.nodeIndex + 1; t <= this.elDef.nodeIndex + this.elDef.childCount; t++) {
                        const n = this.elView.def.nodes[t];
                        20224 & n.flags && Vo(this.elView, n, e),
                        t += n.childCount
                    }
                }
                return e
            }
            get componentRenderElement() {
                const e = function(e) {
                    for (; e && !Un(e); )
                        e = e.parent;
                    return e.parent ? xn(e.parent, Bn(e).nodeIndex) : null
                }(this.elOrCompView);
                return e ? e.renderElement : void 0
            }
            get renderNode() {
                return 2 & this.nodeDef.flags ? $n(this.view, this.nodeDef) : $n(this.elView, this.elDef)
            }
            logError(e, ...t) {
                let n, r;
                2 & this.nodeDef.flags ? (n = this.view.def,
                r = this.nodeDef.nodeIndex) : (n = this.elView.def,
                r = this.elDef.nodeIndex);
                const s = function(e, t) {
                    let n = -1;
                    for (let r = 0; r <= t; r++)
                        3 & e.nodes[r].flags && n++;
                    return n
                }(n, r);
                let i = -1;
                n.factory(()=>(i++,
                i === s ? e.error.bind(e, ...t) : An)),
                i < s && (e.error("Illegal state: the ViewDefinitionFactory did not call the logger!"),
                e.error(...t))
            }
        }
        function Vo(e, t, n) {
            for (let r in t.references)
                n[r] = xi(e, t, t.references[r])
        }
        function Do(e, t, n, r) {
            const s = vo
              , i = wo
              , o = bo;
            try {
                vo = e;
                const l = t.apply(n, r);
                return wo = i,
                bo = o,
                vo = s,
                l
            } catch (l) {
                if (Oe(l) || !wo)
                    throw l;
                throw function(e, t) {
                    return e instanceof Error || (e = new Error(e.toString())),
                    vn(e, t),
                    e
                }(l, Oo())
            }
        }
        function Oo() {
            return wo ? new No(wo,bo) : null
        }
        class Mo {
            constructor(e) {
                this.delegate = e
            }
            createRenderer(e, t) {
                return new Ro(this.delegate.createRenderer(e, t))
            }
            begin() {
                this.delegate.begin && this.delegate.begin()
            }
            end() {
                this.delegate.end && this.delegate.end()
            }
            whenRenderingDone() {
                return this.delegate.whenRenderingDone ? this.delegate.whenRenderingDone() : Promise.resolve(null)
            }
        }
        class Ro {
            constructor(e) {
                this.delegate = e,
                this.debugContextFactory = Oo,
                this.data = this.delegate.data
            }
            createDebugContext(e) {
                return this.debugContextFactory(e)
            }
            destroyNode(e) {
                const t = li(e);
                !function(e) {
                    oi.delete(e.nativeNode)
                }(t),
                t instanceof si && (t.listeners.length = 0),
                this.delegate.destroyNode && this.delegate.destroyNode(e)
            }
            destroy() {
                this.delegate.destroy()
            }
            createElement(e, t) {
                const n = this.delegate.createElement(e, t)
                  , r = this.createDebugContext(n);
                if (r) {
                    const t = new ii(n,null,r);
                    t.name = e,
                    ai(t)
                }
                return n
            }
            createComment(e) {
                const t = this.delegate.createComment(e)
                  , n = this.createDebugContext(t);
                return n && ai(new si(t,null,n)),
                t
            }
            createText(e) {
                const t = this.delegate.createText(e)
                  , n = this.createDebugContext(t);
                return n && ai(new si(t,null,n)),
                t
            }
            appendChild(e, t) {
                const n = li(e)
                  , r = li(t);
                n && r && n instanceof ii && n.addChild(r),
                this.delegate.appendChild(e, t)
            }
            insertBefore(e, t, n) {
                const r = li(e)
                  , s = li(t)
                  , i = li(n);
                r && s && r instanceof ii && r.insertBefore(i, s),
                this.delegate.insertBefore(e, t, n)
            }
            removeChild(e, t) {
                const n = li(e)
                  , r = li(t);
                n && r && n instanceof ii && n.removeChild(r),
                this.delegate.removeChild(e, t)
            }
            selectRootElement(e, t) {
                const n = this.delegate.selectRootElement(e, t)
                  , r = Oo();
                return r && ai(new ii(n,null,r)),
                n
            }
            setAttribute(e, t, n, r) {
                const s = li(e);
                s && s instanceof ii && (s.attributes[r ? r + ":" + t : t] = n),
                this.delegate.setAttribute(e, t, n, r)
            }
            removeAttribute(e, t, n) {
                const r = li(e);
                r && r instanceof ii && (r.attributes[n ? n + ":" + t : t] = null),
                this.delegate.removeAttribute(e, t, n)
            }
            addClass(e, t) {
                const n = li(e);
                n && n instanceof ii && (n.classes[t] = !0),
                this.delegate.addClass(e, t)
            }
            removeClass(e, t) {
                const n = li(e);
                n && n instanceof ii && (n.classes[t] = !1),
                this.delegate.removeClass(e, t)
            }
            setStyle(e, t, n, r) {
                const s = li(e);
                s && s instanceof ii && (s.styles[t] = n),
                this.delegate.setStyle(e, t, n, r)
            }
            removeStyle(e, t, n) {
                const r = li(e);
                r && r instanceof ii && (r.styles[t] = null),
                this.delegate.removeStyle(e, t, n)
            }
            setProperty(e, t, n) {
                const r = li(e);
                r && r instanceof ii && (r.properties[t] = n),
                this.delegate.setProperty(e, t, n)
            }
            listen(e, t, n) {
                if ("string" != typeof e) {
                    const r = li(e);
                    r && r.listeners.push(new ri(t,n))
                }
                return this.delegate.listen(e, t, n)
            }
            parentNode(e) {
                return this.delegate.parentNode(e)
            }
            nextSibling(e) {
                return this.delegate.nextSibling(e)
            }
            setValue(e, t) {
                return this.delegate.setValue(e, t)
            }
        }
        function Po(e, t, n) {
            return new Fo(e,t,n)
        }
        class Fo extends class {
        }
        {
            constructor(e, t, n) {
                super(),
                this.moduleType = e,
                this._bootstrapComponents = t,
                this._ngModuleDefFactory = n
            }
            create(e) {
                !function() {
                    if (Yi)
                        return;
                    Yi = !0;
                    const e = je() ? {
                        setCurrentNode: Co,
                        createRootView: eo,
                        createEmbeddedView: no,
                        createComponentView: ro,
                        createNgModuleRef: so,
                        overrideProvider: ao,
                        overrideComponentView: uo,
                        clearOverrides: co,
                        checkAndUpdateView: go,
                        checkNoChangesView: mo,
                        destroyView: _o,
                        createDebugContext: (e,t)=>new No(e,t),
                        handleEvent: Eo,
                        updateDirectives: xo,
                        updateRenderer: ko
                    } : {
                        setCurrentNode: ()=>{}
                        ,
                        createRootView: Xi,
                        createEmbeddedView: Oi,
                        createComponentView: Ri,
                        createNgModuleRef: Vr,
                        overrideProvider: An,
                        overrideComponentView: An,
                        clearOverrides: An,
                        checkAndUpdateView: Hi,
                        checkNoChangesView: ji,
                        destroyView: Zi,
                        createDebugContext: (e,t)=>new No(e,t),
                        handleEvent: (e,t,n,r)=>e.def.handleEvent(e, t, n, r),
                        updateDirectives: (e,t)=>e.def.updateDirectives(0 === t ? po : fo, e),
                        updateRenderer: (e,t)=>e.def.updateRenderer(0 === t ? po : fo, e)
                    };
                    In.setCurrentNode = e.setCurrentNode,
                    In.createRootView = e.createRootView,
                    In.createEmbeddedView = e.createEmbeddedView,
                    In.createComponentView = e.createComponentView,
                    In.createNgModuleRef = e.createNgModuleRef,
                    In.overrideProvider = e.overrideProvider,
                    In.overrideComponentView = e.overrideComponentView,
                    In.clearOverrides = e.clearOverrides,
                    In.checkAndUpdateView = e.checkAndUpdateView,
                    In.checkNoChangesView = e.checkNoChangesView,
                    In.destroyView = e.destroyView,
                    In.resolveDep = Jr,
                    In.createDebugContext = e.createDebugContext,
                    In.handleEvent = e.handleEvent,
                    In.updateDirectives = e.updateDirectives,
                    In.updateRenderer = e.updateRenderer,
                    In.dirtyParentQueries = bi
                }();
                const t = function(e) {
                    const t = Array.from(e.providers)
                      , n = Array.from(e.modules)
                      , r = {};
                    for (const s in e.providersByKey)
                        r[s] = e.providersByKey[s];
                    return {
                        factory: e.factory,
                        isRoot: e.isRoot,
                        providers: t,
                        modules: n,
                        providersByKey: r
                    }
                }(Qn(this._ngModuleDefFactory));
                return In.createNgModuleRef(this.moduleType, e || _t.NULL, this._bootstrapComponents, t)
            }
        }
        class Lo {
        }
        function jo(e, t, n, r) {
            return new (n || (n = Promise))((function(s, i) {
                function o(e) {
                    try {
                        a(r.next(e))
                    } catch (t) {
                        i(t)
                    }
                }
                function l(e) {
                    try {
                        a(r.throw(e))
                    } catch (t) {
                        i(t)
                    }
                }
                function a(e) {
                    var t;
                    e.done ? s(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(o, l)
                }
                a((r = r.apply(e, t || [])).next())
            }
            ))
        }
        const Ho = "09b600a0-3e42-41fc-b474-e9c0c8f0c801"
          , Bo = "00 01 02 03 04 05 06 07 0a".split(" ")
          , $o = "00 01 02 03 04".split(" ")
          , Uo = e=>new Uint8Array(e.toLowerCase().replace(/\s+/g, "").match(/.{1,2}/g).map(e=>parseInt(e, 16)))
          , zo = e=>new Promise(t=>setTimeout(t, e));
        class Zo {
            constructor() {
                this.bank = Bo,
                this.sounds = $o,
                this.isconnected = !1,
                this.isconnecting = !1,
                this.connectingstep = "",
                this.isBluetoothAvailable = !1,
                this.selectedBank = "",
                this.advanced = !1,
                this.currentCommand = "",
                this.advancedInput = ""
            }
            ngOnInit() {
                return jo(this, void 0, void 0, (function*() {
                    this.isBluetoothAvailable = yield navigator.bluetooth.getAvailability()
                }
                ))
            }
            connectToDroid() {
                this.isconnecting = !0,
                this.connectingstep = "Please select a Droid to pair with...",
                navigator.bluetooth.requestDevice({
                    optionalServices: [Ho],
                    filters: [{
                        name: "DROID"
                    }]
                }).then(e=>(this.connectingstep = "Connecting to Droid...",
                e.gatt.connect())).then(e=>(this.connectingstep = "Discovering services...",
                e.getPrimaryService(Ho))).then(e=>(this.connectingstep = "Discovering characteristics...",
                e.getCharacteristics())).then(e=>{
                    e.forEach(e=>{
                        if ("09b600b1-3e42-41fc-b474-e9c0c8f0c801" === e.uuid)
                            return this.writeC = e,
                            this.initialWrites()
                    }
                    )
                }
                ).catch(e=>{
                    console.log(e),
                    this.error = JSON.stringify(e)
                }
                )
            }
            initialWrites() {
                return jo(this, void 0, void 0, (function*() {
                    return this.connectingstep = "Droid handshake...",
                    yield this.writeC.writeValue(Uo("222001")),
                    yield zo(500),
                    yield this.writeC.writeValue(Uo("222001")),
                    yield zo(500),
                    yield this.writeC.writeValue(Uo("222001")),
                    yield zo(500),
                    yield this.writeC.writeValue(Uo("222001")),
                    yield zo(500),
                    yield this.writeC.writeValue(Uo("27420f4444001f00")),
                    yield zo(10),
                    yield this.writeC.writeValue(Uo("27420f4444001802")),
                    yield zo(500),
                    yield this.writeC.writeValue(Uo("27420f4444001f00")),
                    yield zo(10),
                    yield this.writeC.writeValue(Uo("27420f4444001802")),
                    yield zo(1e3),
                    this.isconnecting = !1,
                    this.isconnected = !0,
                    this.writeC
                }
                ))
            }
            sendBank(e) {
                return this.selectedBank = e,
                this.writeC.writeValue(Uo(`2742 0F44 4400 1F${e}`)).catch(e=>this.error = JSON.stringify(e))
            }
            playSound(e) {
                return this.writeC.writeValue(Uo(`2742 0F44 4400 18${e}`)).catch(e=>this.error = JSON.stringify(e))
            }
            sendMovement(e, t, n) {
                return this.writeC.writeValue(Uo(`2942 0546 ${t}${e}${n} 012C 0000`)).catch(e=>this.error = JSON.stringify(e))
            }
            rotateLeft() {
                return jo(this, void 0, void 0, (function*() {
                    yield this.sendMovement(1, 0, "80"),
                    yield zo(10),
                    yield this.sendMovement(0, 8, "80")
                }
                ))
            }
            rotateRight() {
                return jo(this, void 0, void 0, (function*() {
                    yield this.sendMovement(1, 8, "80"),
                    yield zo(10),
                    yield this.sendMovement(0, 0, "80")
                }
                ))
            }
            ahead() {
                return jo(this, void 0, void 0, (function*() {
                    yield this.sendMovement(1, 0, "80"),
                    yield zo(10),
                    yield this.sendMovement(0, 0, "80")
                }
                ))
            }
            back() {
                return jo(this, void 0, void 0, (function*() {
                    yield this.sendMovement(1, 8, "80"),
                    yield zo(10),
                    yield this.sendMovement(0, 8, "80")
                }
                ))
            }
            stop() {
                return jo(this, void 0, void 0, (function*() {
                    yield this.sendMovement(0, 0, "00"),
                    yield zo(10),
                    yield this.sendMovement(1, 0, "00"),
                    yield zo(10),
                    yield this.sendMovement(2, 0, "00"),
                    yield zo(10)
                }
                ))
            }
            runCommandFromAdvancedInput(e) {
                this.currentCommand = "Current command: " + e,
                this.writeC.writeValue(Uo(e)).catch(e=>this.error = JSON.stringify(e)).then(()=>{}
                )
            }
            runAdvancedInput() {
                return jo(this, void 0, void 0, (function*() {
                    let e = this.advancedInput.split(/\r?\n/);
                    e = e.map(e=>{
                        const t = e.split(",");
                        return {
                            command: t[0],
                            delay: parseFloat(t[1] || 1e3)
                        }
                    }
                    ),
                    yield function(e, t) {
                        return jo(this, void 0, void 0, (function*() {
                            for (let n = 0; n < e.length; n++)
                                yield t(e[n])
                        }
                        ))
                    }(e, e=>jo(this, void 0, void 0, (function*() {
                        this.runCommandFromAdvancedInput(e.command),
                        yield zo(e.delay)
                    }
                    ))),
                    this.currentCommand = "Finished running."
                }
                ))
            }
        }
        class Go {
        }
        const Wo = function() {
            var e = {
                Zero: 0,
                One: 1,
                Two: 2,
                Few: 3,
                Many: 4,
                Other: 5
            };
            return e[e.Zero] = "Zero",
            e[e.One] = "One",
            e[e.Two] = "Two",
            e[e.Few] = "Few",
            e[e.Many] = "Many",
            e[e.Other] = "Other",
            e
        }()
          , qo = new ve("UseV4Plurals");
        class Qo {
        }
        class Ko extends Qo {
            constructor(e, t) {
                super(),
                this.locale = e,
                this.deprecatedPluralFn = t
            }
            getPluralCategory(e, t) {
                switch (this.deprecatedPluralFn ? this.deprecatedPluralFn(t || this.locale, e) : function(e) {
                    return function(e) {
                        const t = e.toLowerCase().replace(/_/g, "-");
                        let n = ss[t];
                        if (n)
                            return n;
                        const r = t.split("-")[0];
                        if (n = ss[r],
                        n)
                            return n;
                        if ("en" === r)
                            return ls;
                        throw new Error(`Missing locale data for the locale "${e}".`)
                    }(e)[is.PluralCase]
                }(t || this.locale)(e)) {
                case Wo.Zero:
                    return "zero";
                case Wo.One:
                    return "one";
                case Wo.Two:
                    return "two";
                case Wo.Few:
                    return "few";
                case Wo.Many:
                    return "many";
                default:
                    return "other"
                }
            }
        }
        class Jo {
        }
        class Yo {
            constructor(e, t, n, r) {
                this._iterableDiffers = e,
                this._keyValueDiffers = t,
                this._ngEl = n,
                this._renderer = r,
                this._initialClasses = []
            }
            getValue() {
                return null
            }
            setClass(e) {
                this._removeClasses(this._initialClasses),
                this._initialClasses = "string" == typeof e ? e.split(/\s+/) : [],
                this._applyClasses(this._initialClasses),
                this._applyClasses(this._rawClass)
            }
            setNgClass(e) {
                this._removeClasses(this._rawClass),
                this._applyClasses(this._initialClasses),
                this._iterableDiffer = null,
                this._keyValueDiffer = null,
                this._rawClass = "string" == typeof e ? e.split(/\s+/) : e,
                this._rawClass && (Nt(this._rawClass) ? this._iterableDiffer = this._iterableDiffers.find(this._rawClass).create() : this._keyValueDiffer = this._keyValueDiffers.find(this._rawClass).create())
            }
            applyChanges() {
                if (this._iterableDiffer) {
                    const e = this._iterableDiffer.diff(this._rawClass);
                    e && this._applyIterableChanges(e)
                } else if (this._keyValueDiffer) {
                    const e = this._keyValueDiffer.diff(this._rawClass);
                    e && this._applyKeyValueChanges(e)
                }
            }
            _applyKeyValueChanges(e) {
                e.forEachAddedItem(e=>this._toggleClass(e.key, e.currentValue)),
                e.forEachChangedItem(e=>this._toggleClass(e.key, e.currentValue)),
                e.forEachRemovedItem(e=>{
                    e.previousValue && this._toggleClass(e.key, !1)
                }
                )
            }
            _applyIterableChanges(e) {
                e.forEachAddedItem(e=>{
                    if ("string" != typeof e.item)
                        throw new Error(`NgClass can only toggle CSS classes expressed as strings, got ${ce(e.item)}`);
                    this._toggleClass(e.item, !0)
                }
                ),
                e.forEachRemovedItem(e=>this._toggleClass(e.item, !1))
            }
            _applyClasses(e) {
                e && (Array.isArray(e) || e instanceof Set ? e.forEach(e=>this._toggleClass(e, !0)) : Object.keys(e).forEach(t=>this._toggleClass(t, !!e[t])))
            }
            _removeClasses(e) {
                e && (Array.isArray(e) || e instanceof Set ? e.forEach(e=>this._toggleClass(e, !1)) : Object.keys(e).forEach(e=>this._toggleClass(e, !1)))
            }
            _toggleClass(e, t) {
                (e = e.trim()) && e.split(/\s+/g).forEach(e=>{
                    t ? this._renderer.addClass(this._ngEl.nativeElement, e) : this._renderer.removeClass(this._ngEl.nativeElement, e)
                }
                )
            }
        }
        let Xo = (()=>{
            class e {
                constructor(e) {
                    this._delegate = e
                }
                getValue() {
                    return this._delegate.getValue()
                }
            }
            return e.ngDirectiveDef = void 0,
            e
        }
        )();
        class el extends Xo {
            constructor(e) {
                super(e)
            }
            set klass(e) {
                this._delegate.setClass(e)
            }
            set ngClass(e) {
                this._delegate.setNgClass(e)
            }
            ngDoCheck() {
                this._delegate.applyChanges()
            }
        }
        class tl {
            constructor(e, t, n, r) {
                this.$implicit = e,
                this.ngForOf = t,
                this.index = n,
                this.count = r
            }
            get first() {
                return 0 === this.index
            }
            get last() {
                return this.index === this.count - 1
            }
            get even() {
                return this.index % 2 == 0
            }
            get odd() {
                return !this.even
            }
        }
        class nl {
            constructor(e, t, n) {
                this._viewContainer = e,
                this._template = t,
                this._differs = n,
                this._ngForOfDirty = !0,
                this._differ = null
            }
            set ngForOf(e) {
                this._ngForOf = e,
                this._ngForOfDirty = !0
            }
            set ngForTrackBy(e) {
                je() && null != e && "function" != typeof e && console && console.warn && console.warn(`trackBy must be a function, but received ${JSON.stringify(e)}. ` + "See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information."),
                this._trackByFn = e
            }
            get ngForTrackBy() {
                return this._trackByFn
            }
            set ngForTemplate(e) {
                e && (this._template = e)
            }
            ngDoCheck() {
                if (this._ngForOfDirty) {
                    this._ngForOfDirty = !1;
                    const n = this._ngForOf;
                    if (!this._differ && n)
                        try {
                            this._differ = this._differs.find(n).create(this.ngForTrackBy)
                        } catch (t) {
                            throw new Error(`Cannot find a differ supporting object '${n}' of type '${e = n,
                            e.name || typeof e}'. NgFor only supports binding to Iterables such as Arrays.`)
                        }
                }
                var e;
                if (this._differ) {
                    const e = this._differ.diff(this._ngForOf);
                    e && this._applyChanges(e)
                }
            }
            _applyChanges(e) {
                const t = [];
                e.forEachOperation((e,n,r)=>{
                    if (null == e.previousIndex) {
                        const n = this._viewContainer.createEmbeddedView(this._template, new tl(null,this._ngForOf,-1,-1), null === r ? void 0 : r)
                          , s = new rl(e,n);
                        t.push(s)
                    } else if (null == r)
                        this._viewContainer.remove(null === n ? void 0 : n);
                    else if (null !== n) {
                        const s = this._viewContainer.get(n);
                        this._viewContainer.move(s, r);
                        const i = new rl(e,s);
                        t.push(i)
                    }
                }
                );
                for (let n = 0; n < t.length; n++)
                    this._perViewChange(t[n].view, t[n].record);
                for (let n = 0, r = this._viewContainer.length; n < r; n++) {
                    const e = this._viewContainer.get(n);
                    e.context.index = n,
                    e.context.count = r,
                    e.context.ngForOf = this._ngForOf
                }
                e.forEachIdentityChange(e=>{
                    this._viewContainer.get(e.currentIndex).context.$implicit = e.item
                }
                )
            }
            _perViewChange(e, t) {
                e.context.$implicit = t.item
            }
            static ngTemplateContextGuard(e, t) {
                return !0
            }
        }
        class rl {
            constructor(e, t) {
                this.record = e,
                this.view = t
            }
        }
        class sl {
            constructor(e, t) {
                this._viewContainer = e,
                this._context = new il,
                this._thenTemplateRef = null,
                this._elseTemplateRef = null,
                this._thenViewRef = null,
                this._elseViewRef = null,
                this._thenTemplateRef = t
            }
            set ngIf(e) {
                this._context.$implicit = this._context.ngIf = e,
                this._updateView()
            }
            set ngIfThen(e) {
                ol("ngIfThen", e),
                this._thenTemplateRef = e,
                this._thenViewRef = null,
                this._updateView()
            }
            set ngIfElse(e) {
                ol("ngIfElse", e),
                this._elseTemplateRef = e,
                this._elseViewRef = null,
                this._updateView()
            }
            _updateView() {
                this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(),
                this._elseViewRef = null,
                this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(),
                this._thenViewRef = null,
                this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
            }
        }
        class il {
            constructor() {
                this.$implicit = null,
                this.ngIf = null
            }
        }
        function ol(e, t) {
            if (t && !t.createEmbeddedView)
                throw new Error(`${e} must be a TemplateRef, but received '${ce(t)}'.`)
        }
        class ll {
        }
        const al = new ve("DocumentToken");
        let ul = null;
        function cl() {
            return ul
        }
        const dl = {
            class: "className",
            innerHtml: "innerHTML",
            readonly: "readOnly",
            tabindex: "tabIndex"
        }
          , hl = {
            "\b": "Backspace",
            "\t": "Tab",
            "\x7f": "Delete",
            "\x1b": "Escape",
            Del: "Delete",
            Esc: "Escape",
            Left: "ArrowLeft",
            Right: "ArrowRight",
            Up: "ArrowUp",
            Down: "ArrowDown",
            Menu: "ContextMenu",
            Scroll: "ScrollLock",
            Win: "OS"
        }
          , pl = {
            A: "1",
            B: "2",
            C: "3",
            D: "4",
            E: "5",
            F: "6",
            G: "7",
            H: "8",
            I: "9",
            J: "*",
            K: "+",
            M: "-",
            N: ".",
            O: "/",
            "`": "0",
            "\x90": "NumLock"
        }
          , fl = (()=>{
            if (ye.Node)
                return ye.Node.prototype.contains || function(e) {
                    return !!(16 & this.compareDocumentPosition(e))
                }
        }
        )();
        class gl extends class extends class {
            constructor() {
                this.resourceLoaderType = null
            }
            get attrToPropMap() {
                return this._attrToPropMap
            }
            set attrToPropMap(e) {
                this._attrToPropMap = e
            }
        }
        {
            constructor() {
                super(),
                this._animationPrefix = null,
                this._transitionEnd = null;
                try {
                    const e = this.createElement("div", document);
                    if (null != this.getStyle(e, "animationName"))
                        this._animationPrefix = "";
                    else {
                        const t = ["Webkit", "Moz", "O", "ms"];
                        for (let n = 0; n < t.length; n++)
                            if (null != this.getStyle(e, t[n] + "AnimationName")) {
                                this._animationPrefix = "-" + t[n].toLowerCase() + "-";
                                break
                            }
                    }
                    const t = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    };
                    Object.keys(t).forEach(n=>{
                        null != this.getStyle(e, n) && (this._transitionEnd = t[n])
                    }
                    )
                } catch (e) {
                    this._animationPrefix = null,
                    this._transitionEnd = null
                }
            }
            getDistributedNodes(e) {
                return e.getDistributedNodes()
            }
            resolveAndSetHref(e, t, n) {
                e.href = null == n ? t : t + "/../" + n
            }
            supportsDOMEvents() {
                return !0
            }
            supportsNativeShadowDOM() {
                return "function" == typeof document.body.createShadowRoot
            }
            getAnimationPrefix() {
                return this._animationPrefix ? this._animationPrefix : ""
            }
            getTransitionEnd() {
                return this._transitionEnd ? this._transitionEnd : ""
            }
            supportsAnimation() {
                return null != this._animationPrefix && null != this._transitionEnd
            }
        }
        {
            parse(e) {
                throw new Error("parse not implemented")
            }
            static makeCurrent() {
                var e;
                e = new gl,
                ul || (ul = e)
            }
            hasProperty(e, t) {
                return t in e
            }
            setProperty(e, t, n) {
                e[t] = n
            }
            getProperty(e, t) {
                return e[t]
            }
            invoke(e, t, n) {
                e[t](...n)
            }
            logError(e) {
                window.console && (console.error ? console.error(e) : console.log(e))
            }
            log(e) {
                window.console && window.console.log && window.console.log(e)
            }
            logGroup(e) {
                window.console && window.console.group && window.console.group(e)
            }
            logGroupEnd() {
                window.console && window.console.groupEnd && window.console.groupEnd()
            }
            get attrToPropMap() {
                return dl
            }
            contains(e, t) {
                return fl.call(e, t)
            }
            querySelector(e, t) {
                return e.querySelector(t)
            }
            querySelectorAll(e, t) {
                return e.querySelectorAll(t)
            }
            on(e, t, n) {
                e.addEventListener(t, n, !1)
            }
            onAndCancel(e, t, n) {
                return e.addEventListener(t, n, !1),
                ()=>{
                    e.removeEventListener(t, n, !1)
                }
            }
            dispatchEvent(e, t) {
                e.dispatchEvent(t)
            }
            createMouseEvent(e) {
                const t = this.getDefaultDocument().createEvent("MouseEvent");
                return t.initEvent(e, !0, !0),
                t
            }
            createEvent(e) {
                const t = this.getDefaultDocument().createEvent("Event");
                return t.initEvent(e, !0, !0),
                t
            }
            preventDefault(e) {
                e.preventDefault(),
                e.returnValue = !1
            }
            isPrevented(e) {
                return e.defaultPrevented || null != e.returnValue && !e.returnValue
            }
            getInnerHTML(e) {
                return e.innerHTML
            }
            getTemplateContent(e) {
                return "content"in e && this.isTemplateElement(e) ? e.content : null
            }
            getOuterHTML(e) {
                return e.outerHTML
            }
            nodeName(e) {
                return e.nodeName
            }
            nodeValue(e) {
                return e.nodeValue
            }
            type(e) {
                return e.type
            }
            content(e) {
                return this.hasProperty(e, "content") ? e.content : e
            }
            firstChild(e) {
                return e.firstChild
            }
            nextSibling(e) {
                return e.nextSibling
            }
            parentElement(e) {
                return e.parentNode
            }
            childNodes(e) {
                return e.childNodes
            }
            childNodesAsList(e) {
                const t = e.childNodes
                  , n = new Array(t.length);
                for (let r = 0; r < t.length; r++)
                    n[r] = t[r];
                return n
            }
            clearNodes(e) {
                for (; e.firstChild; )
                    e.removeChild(e.firstChild)
            }
            appendChild(e, t) {
                e.appendChild(t)
            }
            removeChild(e, t) {
                e.removeChild(t)
            }
            replaceChild(e, t, n) {
                e.replaceChild(t, n)
            }
            remove(e) {
                return e.parentNode && e.parentNode.removeChild(e),
                e
            }
            insertBefore(e, t, n) {
                e.insertBefore(n, t)
            }
            insertAllBefore(e, t, n) {
                n.forEach(n=>e.insertBefore(n, t))
            }
            insertAfter(e, t, n) {
                e.insertBefore(n, t.nextSibling)
            }
            setInnerHTML(e, t) {
                e.innerHTML = t
            }
            getText(e) {
                return e.textContent
            }
            setText(e, t) {
                e.textContent = t
            }
            getValue(e) {
                return e.value
            }
            setValue(e, t) {
                e.value = t
            }
            getChecked(e) {
                return e.checked
            }
            setChecked(e, t) {
                e.checked = t
            }
            createComment(e) {
                return this.getDefaultDocument().createComment(e)
            }
            createTemplate(e) {
                const t = this.getDefaultDocument().createElement("template");
                return t.innerHTML = e,
                t
            }
            createElement(e, t) {
                return (t = t || this.getDefaultDocument()).createElement(e)
            }
            createElementNS(e, t, n) {
                return (n = n || this.getDefaultDocument()).createElementNS(e, t)
            }
            createTextNode(e, t) {
                return (t = t || this.getDefaultDocument()).createTextNode(e)
            }
            createScriptTag(e, t, n) {
                const r = (n = n || this.getDefaultDocument()).createElement("SCRIPT");
                return r.setAttribute(e, t),
                r
            }
            createStyleElement(e, t) {
                const n = (t = t || this.getDefaultDocument()).createElement("style");
                return this.appendChild(n, this.createTextNode(e, t)),
                n
            }
            createShadowRoot(e) {
                return e.createShadowRoot()
            }
            getShadowRoot(e) {
                return e.shadowRoot
            }
            getHost(e) {
                return e.host
            }
            clone(e) {
                return e.cloneNode(!0)
            }
            getElementsByClassName(e, t) {
                return e.getElementsByClassName(t)
            }
            getElementsByTagName(e, t) {
                return e.getElementsByTagName(t)
            }
            classList(e) {
                return Array.prototype.slice.call(e.classList, 0)
            }
            addClass(e, t) {
                e.classList.add(t)
            }
            removeClass(e, t) {
                e.classList.remove(t)
            }
            hasClass(e, t) {
                return e.classList.contains(t)
            }
            setStyle(e, t, n) {
                e.style[t] = n
            }
            removeStyle(e, t) {
                e.style[t] = ""
            }
            getStyle(e, t) {
                return e.style[t]
            }
            hasStyle(e, t, n) {
                const r = this.getStyle(e, t) || "";
                return n ? r == n : r.length > 0
            }
            tagName(e) {
                return e.tagName
            }
            attributeMap(e) {
                const t = new Map
                  , n = e.attributes;
                for (let r = 0; r < n.length; r++) {
                    const e = n.item(r);
                    t.set(e.name, e.value)
                }
                return t
            }
            hasAttribute(e, t) {
                return e.hasAttribute(t)
            }
            hasAttributeNS(e, t, n) {
                return e.hasAttributeNS(t, n)
            }
            getAttribute(e, t) {
                return e.getAttribute(t)
            }
            getAttributeNS(e, t, n) {
                return e.getAttributeNS(t, n)
            }
            setAttribute(e, t, n) {
                e.setAttribute(t, n)
            }
            setAttributeNS(e, t, n, r) {
                e.setAttributeNS(t, n, r)
            }
            removeAttribute(e, t) {
                e.removeAttribute(t)
            }
            removeAttributeNS(e, t, n) {
                e.removeAttributeNS(t, n)
            }
            templateAwareRoot(e) {
                return this.isTemplateElement(e) ? this.content(e) : e
            }
            createHtmlDocument() {
                return document.implementation.createHTMLDocument("fakeTitle")
            }
            getDefaultDocument() {
                return document
            }
            getBoundingClientRect(e) {
                try {
                    return e.getBoundingClientRect()
                } catch (t) {
                    return {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: 0,
                        height: 0
                    }
                }
            }
            getTitle(e) {
                return e.title
            }
            setTitle(e, t) {
                e.title = t || ""
            }
            elementMatches(e, t) {
                return !!this.isElementNode(e) && (e.matches && e.matches(t) || e.msMatchesSelector && e.msMatchesSelector(t) || e.webkitMatchesSelector && e.webkitMatchesSelector(t))
            }
            isTemplateElement(e) {
                return this.isElementNode(e) && "TEMPLATE" === e.nodeName
            }
            isTextNode(e) {
                return e.nodeType === Node.TEXT_NODE
            }
            isCommentNode(e) {
                return e.nodeType === Node.COMMENT_NODE
            }
            isElementNode(e) {
                return e.nodeType === Node.ELEMENT_NODE
            }
            hasShadowRoot(e) {
                return null != e.shadowRoot && e instanceof HTMLElement
            }
            isShadowRoot(e) {
                return e instanceof DocumentFragment
            }
            importIntoDoc(e) {
                return document.importNode(this.templateAwareRoot(e), !0)
            }
            adoptNode(e) {
                return document.adoptNode(e)
            }
            getHref(e) {
                return e.getAttribute("href")
            }
            getEventKey(e) {
                let t = e.key;
                if (null == t) {
                    if (t = e.keyIdentifier,
                    null == t)
                        return "Unidentified";
                    t.startsWith("U+") && (t = String.fromCharCode(parseInt(t.substring(2), 16)),
                    3 === e.location && pl.hasOwnProperty(t) && (t = pl[t]))
                }
                return hl[t] || t
            }
            getGlobalEventTarget(e, t) {
                return "window" === t ? window : "document" === t ? e : "body" === t ? e.body : null
            }
            getHistory() {
                return window.history
            }
            getLocation() {
                return window.location
            }
            getBaseHref(e) {
                const t = _l || (_l = document.querySelector("base"),
                _l) ? _l.getAttribute("href") : null;
                return null == t ? null : (n = t,
                ml || (ml = document.createElement("a")),
                ml.setAttribute("href", n),
                "/" === ml.pathname.charAt(0) ? ml.pathname : "/" + ml.pathname);
                var n
            }
            resetBaseElement() {
                _l = null
            }
            getUserAgent() {
                return window.navigator.userAgent
            }
            setData(e, t, n) {
                this.setAttribute(e, "data-" + t, n)
            }
            getData(e, t) {
                return this.getAttribute(e, "data-" + t)
            }
            getComputedStyle(e) {
                return getComputedStyle(e)
            }
            supportsWebAnimation() {
                return "function" == typeof Element.prototype.animate
            }
            performanceNow() {
                return window.performance && window.performance.now ? window.performance.now() : (new Date).getTime()
            }
            supportsCookies() {
                return !0
            }
            getCookie(e) {
                return function(e, t) {
                    t = encodeURIComponent(t);
                    for (const n of e.split(";")) {
                        const e = n.indexOf("=")
                          , [r,s] = -1 == e ? [n, ""] : [n.slice(0, e), n.slice(e + 1)];
                        if (r.trim() === t)
                            return decodeURIComponent(s)
                    }
                    return null
                }(document.cookie, e)
            }
            setCookie(e, t) {
                document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            }
        }
        let ml, _l = null;
        function yl() {
            return !!window.history.pushState
        }
        const vl = new ve("TRANSITION_ID")
          , wl = [{
            provide: ds,
            useFactory: function(e, t, n) {
                return ()=>{
                    n.get(hs).donePromise.then(()=>{
                        const n = cl();
                        Array.prototype.slice.apply(n.querySelectorAll(t, "style[ng-transition]")).filter(t=>n.getAttribute(t, "ng-transition") === e).forEach(e=>n.remove(e))
                    }
                    )
                }
            },
            deps: [vl, al, _t],
            multi: !0
        }];
        class bl {
            static init() {
                var e;
                e = new bl,
                qs = e
            }
            addToWindow(e) {
                ye.getAngularTestability = (t,n=!0)=>{
                    const r = e.findTestabilityInTree(t, n);
                    if (null == r)
                        throw new Error("Could not find testability for element.");
                    return r
                }
                ,
                ye.getAllAngularTestabilities = ()=>e.getAllTestabilities(),
                ye.getAllAngularRootElements = ()=>e.getAllRootElements(),
                ye.frameworkStabilizers || (ye.frameworkStabilizers = []),
                ye.frameworkStabilizers.push(e=>{
                    const t = ye.getAllAngularTestabilities();
                    let n = t.length
                      , r = !1;
                    const s = function(t) {
                        r = r || t,
                        n--,
                        0 == n && e(r)
                    };
                    t.forEach((function(e) {
                        e.whenStable(s)
                    }
                    ))
                }
                )
            }
            findTestabilityInTree(e, t, n) {
                if (null == t)
                    return null;
                const r = e.getTestability(t);
                return null != r ? r : n ? cl().isShadowRoot(t) ? this.findTestabilityInTree(e, cl().getHost(t), !0) : this.findTestabilityInTree(e, cl().parentElement(t), !0) : null
            }
        }
        function Cl(e, t) {
            "undefined" != typeof COMPILED && COMPILED || ((ye.ng = ye.ng || {})[e] = t)
        }
        const El = (()=>({
            ApplicationRef: ti,
            NgZone: Fs
        }))();
        function xl(e) {
            return li(e)
        }
        const kl = new ve("EventManagerPlugins");
        class Tl {
            constructor(e, t) {
                this._zone = t,
                this._eventNameToPlugin = new Map,
                e.forEach(e=>e.manager = this),
                this._plugins = e.slice().reverse()
            }
            addEventListener(e, t, n) {
                return this._findPluginFor(t).addEventListener(e, t, n)
            }
            addGlobalEventListener(e, t, n) {
                return this._findPluginFor(t).addGlobalEventListener(e, t, n)
            }
            getZone() {
                return this._zone
            }
            _findPluginFor(e) {
                const t = this._eventNameToPlugin.get(e);
                if (t)
                    return t;
                const n = this._plugins;
                for (let r = 0; r < n.length; r++) {
                    const t = n[r];
                    if (t.supports(e))
                        return this._eventNameToPlugin.set(e, t),
                        t
                }
                throw new Error(`No event manager plugin found for event ${e}`)
            }
        }
        class Sl {
            constructor(e) {
                this._doc = e
            }
            addGlobalEventListener(e, t, n) {
                const r = cl().getGlobalEventTarget(this._doc, e);
                if (!r)
                    throw new Error(`Unsupported event target ${r} for event ${t}`);
                return this.addEventListener(r, t, n)
            }
        }
        class Il {
            constructor() {
                this._stylesSet = new Set
            }
            addStyles(e) {
                const t = new Set;
                e.forEach(e=>{
                    this._stylesSet.has(e) || (this._stylesSet.add(e),
                    t.add(e))
                }
                ),
                this.onStylesAdded(t)
            }
            onStylesAdded(e) {}
            getAllStyles() {
                return Array.from(this._stylesSet)
            }
        }
        class Al extends Il {
            constructor(e) {
                super(),
                this._doc = e,
                this._hostNodes = new Set,
                this._styleNodes = new Set,
                this._hostNodes.add(e.head)
            }
            _addStylesToHost(e, t) {
                e.forEach(e=>{
                    const n = this._doc.createElement("style");
                    n.textContent = e,
                    this._styleNodes.add(t.appendChild(n))
                }
                )
            }
            addHost(e) {
                this._addStylesToHost(this._stylesSet, e),
                this._hostNodes.add(e)
            }
            removeHost(e) {
                this._hostNodes.delete(e)
            }
            onStylesAdded(e) {
                this._hostNodes.forEach(t=>this._addStylesToHost(e, t))
            }
            ngOnDestroy() {
                this._styleNodes.forEach(e=>cl().remove(e))
            }
        }
        const Nl = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/"
        }
          , Vl = /%COMP%/g;
        function Dl(e, t, n) {
            for (let r = 0; r < t.length; r++) {
                let s = t[r];
                Array.isArray(s) ? Dl(e, s, n) : (s = s.replace(Vl, e),
                n.push(s))
            }
            return n
        }
        function Ol(e) {
            return t=>{
                !1 === e(t) && (t.preventDefault(),
                t.returnValue = !1)
            }
        }
        class Ml {
            constructor(e, t, n) {
                this.eventManager = e,
                this.sharedStylesHost = t,
                this.appId = n,
                this.rendererByCompId = new Map,
                this.defaultRenderer = new Rl(e)
            }
            createRenderer(e, t) {
                if (!e || !t)
                    return this.defaultRenderer;
                switch (t.encapsulation) {
                case Ve.Emulated:
                    {
                        let n = this.rendererByCompId.get(t.id);
                        return n || (n = new Ll(this.eventManager,this.sharedStylesHost,t,this.appId),
                        this.rendererByCompId.set(t.id, n)),
                        n.applyToHost(e),
                        n
                    }
                case Ve.Native:
                case Ve.ShadowDom:
                    return new jl(this.eventManager,this.sharedStylesHost,e,t);
                default:
                    if (!this.rendererByCompId.has(t.id)) {
                        const e = Dl(t.id, t.styles, []);
                        this.sharedStylesHost.addStyles(e),
                        this.rendererByCompId.set(t.id, this.defaultRenderer)
                    }
                    return this.defaultRenderer
                }
            }
            begin() {}
            end() {}
        }
        class Rl {
            constructor(e) {
                this.eventManager = e,
                this.data = Object.create(null)
            }
            destroy() {}
            createElement(e, t) {
                return t ? document.createElementNS(Nl[t] || t, e) : document.createElement(e)
            }
            createComment(e) {
                return document.createComment(e)
            }
            createText(e) {
                return document.createTextNode(e)
            }
            appendChild(e, t) {
                e.appendChild(t)
            }
            insertBefore(e, t, n) {
                e && e.insertBefore(t, n)
            }
            removeChild(e, t) {
                e && e.removeChild(t)
            }
            selectRootElement(e, t) {
                let n = "string" == typeof e ? document.querySelector(e) : e;
                if (!n)
                    throw new Error(`The selector "${e}" did not match any elements`);
                return t || (n.textContent = ""),
                n
            }
            parentNode(e) {
                return e.parentNode
            }
            nextSibling(e) {
                return e.nextSibling
            }
            setAttribute(e, t, n, r) {
                if (r) {
                    t = r + ":" + t;
                    const s = Nl[r];
                    s ? e.setAttributeNS(s, t, n) : e.setAttribute(t, n)
                } else
                    e.setAttribute(t, n)
            }
            removeAttribute(e, t, n) {
                if (n) {
                    const r = Nl[n];
                    r ? e.removeAttributeNS(r, t) : e.removeAttribute(`${n}:${t}`)
                } else
                    e.removeAttribute(t)
            }
            addClass(e, t) {
                e.classList.add(t)
            }
            removeClass(e, t) {
                e.classList.remove(t)
            }
            setStyle(e, t, n, r) {
                r & Wt.DashCase ? e.style.setProperty(t, n, r & Wt.Important ? "important" : "") : e.style[t] = n
            }
            removeStyle(e, t, n) {
                n & Wt.DashCase ? e.style.removeProperty(t) : e.style[t] = ""
            }
            setProperty(e, t, n) {
                Fl(t, "property"),
                e[t] = n
            }
            setValue(e, t) {
                e.nodeValue = t
            }
            listen(e, t, n) {
                return Fl(t, "listener"),
                "string" == typeof e ? this.eventManager.addGlobalEventListener(e, t, Ol(n)) : this.eventManager.addEventListener(e, t, Ol(n))
            }
        }
        const Pl = (()=>"@".charCodeAt(0))();
        function Fl(e, t) {
            if (e.charCodeAt(0) === Pl)
                throw new Error(`Found the synthetic ${t} ${e}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`)
        }
        class Ll extends Rl {
            constructor(e, t, n, r) {
                super(e),
                this.component = n;
                const s = Dl(r + "-" + n.id, n.styles, []);
                t.addStyles(s),
                this.contentAttr = "_ngcontent-%COMP%".replace(Vl, r + "-" + n.id),
                this.hostAttr = function(e) {
                    return "_nghost-%COMP%".replace(Vl, e)
                }(r + "-" + n.id)
            }
            applyToHost(e) {
                super.setAttribute(e, this.hostAttr, "")
            }
            createElement(e, t) {
                const n = super.createElement(e, t);
                return super.setAttribute(n, this.contentAttr, ""),
                n
            }
        }
        class jl extends Rl {
            constructor(e, t, n, r) {
                super(e),
                this.sharedStylesHost = t,
                this.hostEl = n,
                this.component = r,
                this.shadowRoot = r.encapsulation === Ve.ShadowDom ? n.attachShadow({
                    mode: "open"
                }) : n.createShadowRoot(),
                this.sharedStylesHost.addHost(this.shadowRoot);
                const s = Dl(r.id, r.styles, []);
                for (let i = 0; i < s.length; i++) {
                    const e = document.createElement("style");
                    e.textContent = s[i],
                    this.shadowRoot.appendChild(e)
                }
            }
            nodeOrShadowRoot(e) {
                return e === this.hostEl ? this.shadowRoot : e
            }
            destroy() {
                this.sharedStylesHost.removeHost(this.shadowRoot)
            }
            appendChild(e, t) {
                return super.appendChild(this.nodeOrShadowRoot(e), t)
            }
            insertBefore(e, t, n) {
                return super.insertBefore(this.nodeOrShadowRoot(e), t, n)
            }
            removeChild(e, t) {
                return super.removeChild(this.nodeOrShadowRoot(e), t)
            }
            parentNode(e) {
                return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))
            }
        }
        const Hl = (()=>"undefined" != typeof Zone && Zone.__symbol__ || function(e) {
            return "__zone_symbol__" + e
        }
        )()
          , Bl = Hl("addEventListener")
          , $l = Hl("removeEventListener")
          , Ul = {}
          , zl = "__zone_symbol__propagationStopped"
          , Zl = (()=>{
            const e = "undefined" != typeof Zone && Zone[Hl("BLACK_LISTED_EVENTS")];
            if (e) {
                const t = {};
                return e.forEach(e=>{
                    t[e] = e
                }
                ),
                t
            }
        }
        )()
          , Gl = function(e) {
            return !!Zl && Zl.hasOwnProperty(e)
        }
          , Wl = function(e) {
            const t = Ul[e.type];
            if (!t)
                return;
            const n = this[t];
            if (!n)
                return;
            const r = [e];
            if (1 === n.length) {
                const e = n[0];
                return e.zone !== Zone.current ? e.zone.run(e.handler, this, r) : e.handler.apply(this, r)
            }
            {
                const t = n.slice();
                for (let n = 0; n < t.length && !0 !== e[zl]; n++) {
                    const e = t[n];
                    e.zone !== Zone.current ? e.zone.run(e.handler, this, r) : e.handler.apply(this, r)
                }
            }
        };
        class ql extends Sl {
            constructor(e, t, n) {
                super(e),
                this.ngZone = t,
                n && function(e) {
                    return "server" === e
                }(n) || this.patchEvent()
            }
            patchEvent() {
                if ("undefined" == typeof Event || !Event || !Event.prototype)
                    return;
                if (Event.prototype.__zone_symbol__stopImmediatePropagation)
                    return;
                const e = Event.prototype.__zone_symbol__stopImmediatePropagation = Event.prototype.stopImmediatePropagation;
                Event.prototype.stopImmediatePropagation = function() {
                    this && (this[zl] = !0),
                    e && e.apply(this, arguments)
                }
            }
            supports(e) {
                return !0
            }
            addEventListener(e, t, n) {
                let r = n;
                if (!e[Bl] || Fs.isInAngularZone() && !Gl(t))
                    e.addEventListener(t, r, !1);
                else {
                    let n = Ul[t];
                    n || (n = Ul[t] = Hl("ANGULAR" + t + "FALSE"));
                    let s = e[n];
                    const i = s && s.length > 0;
                    s || (s = e[n] = []);
                    const o = Gl(t) ? Zone.root : Zone.current;
                    if (0 === s.length)
                        s.push({
                            zone: o,
                            handler: r
                        });
                    else {
                        let e = !1;
                        for (let t = 0; t < s.length; t++)
                            if (s[t].handler === r) {
                                e = !0;
                                break
                            }
                        e || s.push({
                            zone: o,
                            handler: r
                        })
                    }
                    i || e[Bl](t, Wl, !1)
                }
                return ()=>this.removeEventListener(e, t, r)
            }
            removeEventListener(e, t, n) {
                let r = e[$l];
                if (!r)
                    return e.removeEventListener.apply(e, [t, n, !1]);
                let s = Ul[t]
                  , i = s && e[s];
                if (!i)
                    return e.removeEventListener.apply(e, [t, n, !1]);
                let o = !1;
                for (let l = 0; l < i.length; l++)
                    if (i[l].handler === n) {
                        o = !0,
                        i.splice(l, 1);
                        break
                    }
                o ? 0 === i.length && r.apply(e, [t, Wl, !1]) : e.removeEventListener.apply(e, [t, n, !1])
            }
        }
        const Ql = {
            pan: !0,
            panstart: !0,
            panmove: !0,
            panend: !0,
            pancancel: !0,
            panleft: !0,
            panright: !0,
            panup: !0,
            pandown: !0,
            pinch: !0,
            pinchstart: !0,
            pinchmove: !0,
            pinchend: !0,
            pinchcancel: !0,
            pinchin: !0,
            pinchout: !0,
            press: !0,
            pressup: !0,
            rotate: !0,
            rotatestart: !0,
            rotatemove: !0,
            rotateend: !0,
            rotatecancel: !0,
            swipe: !0,
            swipeleft: !0,
            swiperight: !0,
            swipeup: !0,
            swipedown: !0,
            tap: !0
        }
          , Kl = new ve("HammerGestureConfig")
          , Jl = new ve("HammerLoader");
        class Yl {
            constructor() {
                this.events = [],
                this.overrides = {}
            }
            buildHammer(e) {
                const t = new Hammer(e,this.options);
                t.get("pinch").set({
                    enable: !0
                }),
                t.get("rotate").set({
                    enable: !0
                });
                for (const n in this.overrides)
                    t.get(n).set(this.overrides[n]);
                return t
            }
        }
        class Xl extends Sl {
            constructor(e, t, n, r) {
                super(e),
                this._config = t,
                this.console = n,
                this.loader = r
            }
            supports(e) {
                return !(!Ql.hasOwnProperty(e.toLowerCase()) && !this.isCustomEvent(e) || !window.Hammer && !this.loader && (this.console.warn(`The "${e}" event cannot be bound because Hammer.JS is not ` + "loaded and no custom loader has been specified."),
                1))
            }
            addEventListener(e, t, n) {
                const r = this.manager.getZone();
                if (t = t.toLowerCase(),
                !window.Hammer && this.loader) {
                    let r = !1
                      , s = ()=>{
                        r = !0
                    }
                    ;
                    return this.loader().then(()=>{
                        if (!window.Hammer)
                            return this.console.warn("The custom HAMMER_LOADER completed, but Hammer.JS is not present."),
                            void (s = ()=>{}
                            );
                        r || (s = this.addEventListener(e, t, n))
                    }
                    ).catch(()=>{
                        this.console.warn(`The "${t}" event cannot be bound because the custom ` + "Hammer.JS loader failed."),
                        s = ()=>{}
                    }
                    ),
                    ()=>{
                        s()
                    }
                }
                return r.runOutsideAngular(()=>{
                    const s = this._config.buildHammer(e)
                      , i = function(e) {
                        r.runGuarded((function() {
                            n(e)
                        }
                        ))
                    };
                    return s.on(t, i),
                    ()=>{
                        s.off(t, i),
                        "function" == typeof s.destroy && s.destroy()
                    }
                }
                )
            }
            isCustomEvent(e) {
                return this._config.events.indexOf(e) > -1
            }
        }
        const ea = ["alt", "control", "meta", "shift"]
          , ta = {
            alt: e=>e.altKey,
            control: e=>e.ctrlKey,
            meta: e=>e.metaKey,
            shift: e=>e.shiftKey
        };
        class na extends Sl {
            constructor(e) {
                super(e)
            }
            supports(e) {
                return null != na.parseEventName(e)
            }
            addEventListener(e, t, n) {
                const r = na.parseEventName(t)
                  , s = na.eventCallback(r.fullKey, n, this.manager.getZone());
                return this.manager.getZone().runOutsideAngular(()=>cl().onAndCancel(e, r.domEventName, s))
            }
            static parseEventName(e) {
                const t = e.toLowerCase().split(".")
                  , n = t.shift();
                if (0 === t.length || "keydown" !== n && "keyup" !== n)
                    return null;
                const r = na._normalizeKey(t.pop());
                let s = "";
                if (ea.forEach(e=>{
                    const n = t.indexOf(e);
                    n > -1 && (t.splice(n, 1),
                    s += e + ".")
                }
                ),
                s += r,
                0 != t.length || 0 === r.length)
                    return null;
                const i = {};
                return i.domEventName = n,
                i.fullKey = s,
                i
            }
            static getEventFullKey(e) {
                let t = ""
                  , n = cl().getEventKey(e);
                return n = n.toLowerCase(),
                " " === n ? n = "space" : "." === n && (n = "dot"),
                ea.forEach(r=>{
                    r != n && (0,
                    ta[r])(e) && (t += r + ".")
                }
                ),
                t += n,
                t
            }
            static eventCallback(e, t, n) {
                return r=>{
                    na.getEventFullKey(r) === e && n.runGuarded(()=>t(r))
                }
            }
            static _normalizeKey(e) {
                switch (e) {
                case "esc":
                    return "escape";
                default:
                    return e
                }
            }
        }
        class ra {
        }
        class sa extends ra {
            constructor(e) {
                super(),
                this._doc = e
            }
            sanitize(e, t) {
                if (null == t)
                    return null;
                switch (e) {
                case lt.NONE:
                    return t;
                case lt.HTML:
                    return t instanceof oa ? t.changingThisBreaksApplicationSecurity : (this.checkNotSafeValue(t, "HTML"),
                    function(e, t) {
                        let n = null;
                        try {
                            it = it || new He(e);
                            let r = t ? String(t) : "";
                            n = it.getInertBodyElement(r);
                            let s = 5
                              , i = r;
                            do {
                                if (0 === s)
                                    throw new Error("Failed to sanitize html because the input is unstable");
                                s--,
                                r = i,
                                i = n.innerHTML,
                                n = it.getInertBodyElement(r)
                            } while (r !== i);const o = new tt
                              , l = o.sanitizeChildren(ot(n) || n);
                            return je() && o.sanitizedSomething && console.warn("WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss"),
                            l
                        } finally {
                            if (n) {
                                const e = ot(n) || n;
                                for (; e.firstChild; )
                                    e.removeChild(e.firstChild)
                            }
                        }
                    }(this._doc, String(t)));
                case lt.STYLE:
                    return t instanceof la ? t.changingThisBreaksApplicationSecurity : (this.checkNotSafeValue(t, "Style"),
                    function(e) {
                        if (!(e = String(e).trim()))
                            return "";
                        const t = e.match(ct);
                        return t && Ue(t[1]) === t[1] || e.match(ut) && function(e) {
                            let t = !0
                              , n = !0;
                            for (let r = 0; r < e.length; r++) {
                                const s = e.charAt(r);
                                "'" === s && n ? t = !t : '"' === s && t && (n = !n)
                            }
                            return t && n
                        }(e) ? e : (je() && console.warn(`WARNING: sanitizing unsafe style value ${e} (see http://g.co/ng/security#xss).`),
                        "unsafe")
                    }(t));
                case lt.SCRIPT:
                    if (t instanceof aa)
                        return t.changingThisBreaksApplicationSecurity;
                    throw this.checkNotSafeValue(t, "Script"),
                    new Error("unsafe value used in a script context");
                case lt.URL:
                    return t instanceof ca || t instanceof ua ? t.changingThisBreaksApplicationSecurity : (this.checkNotSafeValue(t, "URL"),
                    Ue(String(t)));
                case lt.RESOURCE_URL:
                    if (t instanceof ca)
                        return t.changingThisBreaksApplicationSecurity;
                    throw this.checkNotSafeValue(t, "ResourceURL"),
                    new Error("unsafe value used in a resource URL context (see http://g.co/ng/security#xss)");
                default:
                    throw new Error(`Unexpected SecurityContext ${e} (see http://g.co/ng/security#xss)`)
                }
            }
            checkNotSafeValue(e, t) {
                if (e instanceof ia)
                    throw new Error(`Required a safe ${t}, got a ${e.getTypeName()} ` + "(see http://g.co/ng/security#xss)")
            }
            bypassSecurityTrustHtml(e) {
                return new oa(e)
            }
            bypassSecurityTrustStyle(e) {
                return new la(e)
            }
            bypassSecurityTrustScript(e) {
                return new aa(e)
            }
            bypassSecurityTrustUrl(e) {
                return new ua(e)
            }
            bypassSecurityTrustResourceUrl(e) {
                return new ca(e)
            }
        }
        class ia {
            constructor(e) {
                this.changingThisBreaksApplicationSecurity = e
            }
            toString() {
                return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}` + " (see http://g.co/ng/security#xss)"
            }
        }
        class oa extends ia {
            getTypeName() {
                return "HTML"
            }
        }
        class la extends ia {
            getTypeName() {
                return "Style"
            }
        }
        class aa extends ia {
            getTypeName() {
                return "Script"
            }
        }
        class ua extends ia {
            getTypeName() {
                return "URL"
            }
        }
        class ca extends ia {
            getTypeName() {
                return "ResourceURL"
            }
        }
        const da = Js(ui, "browser", [{
            provide: _s,
            useValue: "browser"
        }, {
            provide: ms,
            useValue: function() {
                gl.makeCurrent(),
                bl.init()
            },
            multi: !0
        }, {
            provide: Go,
            useClass: class extends Go {
                constructor(e) {
                    super(),
                    this._doc = e,
                    this._init()
                }
                _init() {
                    this.location = cl().getLocation(),
                    this._history = cl().getHistory()
                }
                getBaseHrefFromDOM() {
                    return cl().getBaseHref(this._doc)
                }
                onPopState(e) {
                    cl().getGlobalEventTarget(this._doc, "window").addEventListener("popstate", e, !1)
                }
                onHashChange(e) {
                    cl().getGlobalEventTarget(this._doc, "window").addEventListener("hashchange", e, !1)
                }
                get href() {
                    return this.location.href
                }
                get protocol() {
                    return this.location.protocol
                }
                get hostname() {
                    return this.location.hostname
                }
                get port() {
                    return this.location.port
                }
                get pathname() {
                    return this.location.pathname
                }
                get search() {
                    return this.location.search
                }
                get hash() {
                    return this.location.hash
                }
                set pathname(e) {
                    this.location.pathname = e
                }
                pushState(e, t, n) {
                    yl() ? this._history.pushState(e, t, n) : this.location.hash = n
                }
                replaceState(e, t, n) {
                    yl() ? this._history.replaceState(e, t, n) : this.location.hash = n
                }
                forward() {
                    this._history.forward()
                }
                back() {
                    this._history.back()
                }
                getState() {
                    return this._history.state
                }
            }
            ,
            deps: [al]
        }, {
            provide: al,
            useFactory: function() {
                return document
            },
            deps: []
        }]);
        function ha() {
            return new Pe
        }
        class pa {
            constructor(e) {
                if (e)
                    throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.")
            }
            static withServerTransition(e) {
                return {
                    ngModule: pa,
                    providers: [{
                        provide: ps,
                        useValue: e.appId
                    }, {
                        provide: vl,
                        useExisting: ps
                    }, wl]
                }
            }
        }
        "undefined" != typeof window && window;
        const fa = new v(e=>e.complete());
        class ga extends L {
            constructor(e, t) {
                super(e),
                this.sources = t,
                this.completed = 0,
                this.haveValues = 0;
                const n = t.length;
                this.values = new Array(n);
                for (let r = 0; r < n; r++) {
                    const e = F(this, t[r], null, r);
                    e && this.add(e)
                }
            }
            notifyNext(e, t, n, r, s) {
                this.values[n] = t,
                s._hasValue || (s._hasValue = !0,
                this.haveValues++)
            }
            notifyComplete(e) {
                const {destination: t, haveValues: n, values: r} = this
                  , s = r.length;
                e._hasValue ? (this.completed++,
                this.completed === s && (n === s && t.next(r),
                t.complete())) : t.complete()
            }
        }
        const ma = new ve("NgValueAccessor")
          , _a = new ve("CompositionEventMode");
        class ya {
            constructor(e, t, n) {
                this._renderer = e,
                this._elementRef = t,
                this._compositionMode = n,
                this.onChange = e=>{}
                ,
                this.onTouched = ()=>{}
                ,
                this._composing = !1,
                null == this._compositionMode && (this._compositionMode = !function() {
                    const e = cl() ? cl().getUserAgent() : "";
                    return /android (\d+)/.test(e.toLowerCase())
                }())
            }
            writeValue(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "value", null == e ? "" : e)
            }
            registerOnChange(e) {
                this.onChange = e
            }
            registerOnTouched(e) {
                this.onTouched = e
            }
            setDisabledState(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
            }
            _handleInput(e) {
                (!this._compositionMode || this._compositionMode && !this._composing) && this.onChange(e)
            }
            _compositionStart() {
                this._composing = !0
            }
            _compositionEnd(e) {
                this._composing = !1,
                this._compositionMode && this.onChange(e)
            }
        }
        class va {
            get value() {
                return this.control ? this.control.value : null
            }
            get valid() {
                return this.control ? this.control.valid : null
            }
            get invalid() {
                return this.control ? this.control.invalid : null
            }
            get pending() {
                return this.control ? this.control.pending : null
            }
            get disabled() {
                return this.control ? this.control.disabled : null
            }
            get enabled() {
                return this.control ? this.control.enabled : null
            }
            get errors() {
                return this.control ? this.control.errors : null
            }
            get pristine() {
                return this.control ? this.control.pristine : null
            }
            get dirty() {
                return this.control ? this.control.dirty : null
            }
            get touched() {
                return this.control ? this.control.touched : null
            }
            get status() {
                return this.control ? this.control.status : null
            }
            get untouched() {
                return this.control ? this.control.untouched : null
            }
            get statusChanges() {
                return this.control ? this.control.statusChanges : null
            }
            get valueChanges() {
                return this.control ? this.control.valueChanges : null
            }
            get path() {
                return null
            }
            reset(e) {
                this.control && this.control.reset(e)
            }
            hasError(e, t) {
                return !!this.control && this.control.hasError(e, t)
            }
            getError(e, t) {
                return this.control ? this.control.getError(e, t) : null
            }
        }
        class wa extends va {
            get formDirective() {
                return null
            }
            get path() {
                return null
            }
        }
        function ba() {
            throw new Error("unimplemented")
        }
        class Ca extends va {
            constructor() {
                super(...arguments),
                this._parent = null,
                this.name = null,
                this.valueAccessor = null,
                this._rawValidators = [],
                this._rawAsyncValidators = []
            }
            get validator() {
                return ba()
            }
            get asyncValidator() {
                return ba()
            }
        }
        class Ea extends class {
            constructor(e) {
                this._cd = e
            }
            get ngClassUntouched() {
                return !!this._cd.control && this._cd.control.untouched
            }
            get ngClassTouched() {
                return !!this._cd.control && this._cd.control.touched
            }
            get ngClassPristine() {
                return !!this._cd.control && this._cd.control.pristine
            }
            get ngClassDirty() {
                return !!this._cd.control && this._cd.control.dirty
            }
            get ngClassValid() {
                return !!this._cd.control && this._cd.control.valid
            }
            get ngClassInvalid() {
                return !!this._cd.control && this._cd.control.invalid
            }
            get ngClassPending() {
                return !!this._cd.control && this._cd.control.pending
            }
        }
        {
            constructor(e) {
                super(e)
            }
        }
        function xa(e) {
            return null == e || 0 === e.length
        }
        const ka = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        class Ta {
            static min(e) {
                return t=>{
                    if (xa(t.value) || xa(e))
                        return null;
                    const n = parseFloat(t.value);
                    return !isNaN(n) && n < e ? {
                        min: {
                            min: e,
                            actual: t.value
                        }
                    } : null
                }
            }
            static max(e) {
                return t=>{
                    if (xa(t.value) || xa(e))
                        return null;
                    const n = parseFloat(t.value);
                    return !isNaN(n) && n > e ? {
                        max: {
                            max: e,
                            actual: t.value
                        }
                    } : null
                }
            }
            static required(e) {
                return xa(e.value) ? {
                    required: !0
                } : null
            }
            static requiredTrue(e) {
                return !0 === e.value ? null : {
                    required: !0
                }
            }
            static email(e) {
                return xa(e.value) ? null : ka.test(e.value) ? null : {
                    email: !0
                }
            }
            static minLength(e) {
                return t=>{
                    if (xa(t.value))
                        return null;
                    const n = t.value ? t.value.length : 0;
                    return n < e ? {
                        minlength: {
                            requiredLength: e,
                            actualLength: n
                        }
                    } : null
                }
            }
            static maxLength(e) {
                return t=>{
                    const n = t.value ? t.value.length : 0;
                    return n > e ? {
                        maxlength: {
                            requiredLength: e,
                            actualLength: n
                        }
                    } : null
                }
            }
            static pattern(e) {
                if (!e)
                    return Ta.nullValidator;
                let t, n;
                return "string" == typeof e ? (n = "",
                "^" !== e.charAt(0) && (n += "^"),
                n += e,
                "$" !== e.charAt(e.length - 1) && (n += "$"),
                t = new RegExp(n)) : (n = e.toString(),
                t = e),
                e=>{
                    if (xa(e.value))
                        return null;
                    const r = e.value;
                    return t.test(r) ? null : {
                        pattern: {
                            requiredPattern: n,
                            actualValue: r
                        }
                    }
                }
            }
            static nullValidator(e) {
                return null
            }
            static compose(e) {
                if (!e)
                    return null;
                const t = e.filter(Sa);
                return 0 == t.length ? null : function(e) {
                    return Aa(function(e, t) {
                        return t.map(t=>t(e))
                    }(e, t))
                }
            }
            static composeAsync(e) {
                if (!e)
                    return null;
                const t = e.filter(Sa);
                return 0 == t.length ? null : function(e) {
                    return function e(...t) {
                        let n;
                        return "function" == typeof t[t.length - 1] && (n = t.pop()),
                        1 === t.length && a(t[0]) && (t = t[0]),
                        0 === t.length ? fa : n ? e(t).pipe(j(e=>n(...e))) : new v(e=>new ga(e,t))
                    }(function(e, t) {
                        return t.map(t=>t(e))
                    }(e, t).map(Ia)).pipe(j(Aa))
                }
            }
        }
        function Sa(e) {
            return null != e
        }
        function Ia(e) {
            const t = Dt(e) ? U(e) : e;
            if (!Ot(t))
                throw new Error("Expected validator to return Promise or Observable.");
            return t
        }
        function Aa(e) {
            const t = e.reduce((e,t)=>null != t ? Object.assign({}, e, t) : e, {});
            return 0 === Object.keys(t).length ? null : t
        }
        function Na(e) {
            return e.validate ? t=>e.validate(t) : e
        }
        function Va(e) {
            return e.validate ? t=>e.validate(t) : e
        }
        class Da {
            constructor() {
                this._accessors = []
            }
            add(e, t) {
                this._accessors.push([e, t])
            }
            remove(e) {
                for (let t = this._accessors.length - 1; t >= 0; --t)
                    if (this._accessors[t][1] === e)
                        return void this._accessors.splice(t, 1)
            }
            select(e) {
                this._accessors.forEach(t=>{
                    this._isSameGroup(t, e) && t[1] !== e && t[1].fireUncheck(e.value)
                }
                )
            }
            _isSameGroup(e, t) {
                return !!e[0].control && e[0]._parent === t._control._parent && e[1].name === t.name
            }
        }
        const Oa = '\n    <div [formGroup]="myGroup">\n       <div formGroupName="person">\n          <input formControlName="firstName">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });'
          , Ma = '\n    <form>\n       <div ngModelGroup="person">\n          <input [(ngModel)]="person.name" name="firstName">\n       </div>\n    </form>';
        function Ra(e, t) {
            return [...t.path, e]
        }
        function Pa(e, t) {
            e || La(t, "Cannot find control with"),
            t.valueAccessor || La(t, "No value accessor for form control with"),
            e.validator = Ta.compose([e.validator, t.validator]),
            e.asyncValidator = Ta.composeAsync([e.asyncValidator, t.asyncValidator]),
            t.valueAccessor.writeValue(e.value),
            function(e, t) {
                t.valueAccessor.registerOnChange(n=>{
                    e._pendingValue = n,
                    e._pendingChange = !0,
                    e._pendingDirty = !0,
                    "change" === e.updateOn && Fa(e, t)
                }
                )
            }(e, t),
            function(e, t) {
                e.registerOnChange((e,n)=>{
                    t.valueAccessor.writeValue(e),
                    n && t.viewToModelUpdate(e)
                }
                )
            }(e, t),
            function(e, t) {
                t.valueAccessor.registerOnTouched(()=>{
                    e._pendingTouched = !0,
                    "blur" === e.updateOn && e._pendingChange && Fa(e, t),
                    "submit" !== e.updateOn && e.markAsTouched()
                }
                )
            }(e, t),
            t.valueAccessor.setDisabledState && e.registerOnDisabledChange(e=>{
                t.valueAccessor.setDisabledState(e)
            }
            ),
            t._rawValidators.forEach(t=>{
                t.registerOnValidatorChange && t.registerOnValidatorChange(()=>e.updateValueAndValidity())
            }
            ),
            t._rawAsyncValidators.forEach(t=>{
                t.registerOnValidatorChange && t.registerOnValidatorChange(()=>e.updateValueAndValidity())
            }
            )
        }
        function Fa(e, t) {
            e._pendingDirty && e.markAsDirty(),
            e.setValue(e._pendingValue, {
                emitModelToViewChange: !1
            }),
            t.viewToModelUpdate(e._pendingValue),
            e._pendingChange = !1
        }
        function La(e, t) {
            let n;
            throw n = e.path.length > 1 ? `path: '${e.path.join(" -> ")}'` : e.path[0] ? `name: '${e.path}'` : "unspecified name attribute",
            new Error(`${t} ${n}`)
        }
        function ja(e) {
            return null != e ? Ta.compose(e.map(Na)) : null
        }
        function Ha(e) {
            return null != e ? Ta.composeAsync(e.map(Va)) : null
        }
        const Ba = [class {
            constructor(e, t) {
                this._renderer = e,
                this._elementRef = t,
                this.onChange = e=>{}
                ,
                this.onTouched = ()=>{}
            }
            writeValue(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "checked", e)
            }
            registerOnChange(e) {
                this.onChange = e
            }
            registerOnTouched(e) {
                this.onTouched = e
            }
            setDisabledState(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
            }
        }
        , class {
            constructor(e, t) {
                this._renderer = e,
                this._elementRef = t,
                this.onChange = e=>{}
                ,
                this.onTouched = ()=>{}
            }
            writeValue(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "value", parseFloat(e))
            }
            registerOnChange(e) {
                this.onChange = t=>{
                    e("" == t ? null : parseFloat(t))
                }
            }
            registerOnTouched(e) {
                this.onTouched = e
            }
            setDisabledState(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
            }
        }
        , class {
            constructor(e, t) {
                this._renderer = e,
                this._elementRef = t,
                this.onChange = e=>{}
                ,
                this.onTouched = ()=>{}
            }
            writeValue(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "value", null == e ? "" : e)
            }
            registerOnChange(e) {
                this.onChange = t=>{
                    e("" == t ? null : parseFloat(t))
                }
            }
            registerOnTouched(e) {
                this.onTouched = e
            }
            setDisabledState(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
            }
        }
        , class {
            constructor(e, t) {
                this._renderer = e,
                this._elementRef = t,
                this._optionMap = new Map,
                this._idCounter = 0,
                this.onChange = e=>{}
                ,
                this.onTouched = ()=>{}
                ,
                this._compareWith = St
            }
            set compareWith(e) {
                if ("function" != typeof e)
                    throw new Error(`compareWith must be a function, but received ${JSON.stringify(e)}`);
                this._compareWith = e
            }
            writeValue(e) {
                this.value = e;
                const t = this._getOptionId(e);
                null == t && this._renderer.setProperty(this._elementRef.nativeElement, "selectedIndex", -1);
                const n = function(e, t) {
                    return null == e ? `${t}` : (t && "object" == typeof t && (t = "Object"),
                    `${e}: ${t}`.slice(0, 50))
                }(t, e);
                this._renderer.setProperty(this._elementRef.nativeElement, "value", n)
            }
            registerOnChange(e) {
                this.onChange = t=>{
                    this.value = this._getOptionValue(t),
                    e(this.value)
                }
            }
            registerOnTouched(e) {
                this.onTouched = e
            }
            setDisabledState(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
            }
            _registerOption() {
                return (this._idCounter++).toString()
            }
            _getOptionId(e) {
                for (const t of Array.from(this._optionMap.keys()))
                    if (this._compareWith(this._optionMap.get(t), e))
                        return t;
                return null
            }
            _getOptionValue(e) {
                const t = function(e) {
                    return e.split(":")[0]
                }(e);
                return this._optionMap.has(t) ? this._optionMap.get(t) : e
            }
        }
        , class {
            constructor(e, t) {
                this._renderer = e,
                this._elementRef = t,
                this._optionMap = new Map,
                this._idCounter = 0,
                this.onChange = e=>{}
                ,
                this.onTouched = ()=>{}
                ,
                this._compareWith = St
            }
            set compareWith(e) {
                if ("function" != typeof e)
                    throw new Error(`compareWith must be a function, but received ${JSON.stringify(e)}`);
                this._compareWith = e
            }
            writeValue(e) {
                let t;
                if (this.value = e,
                Array.isArray(e)) {
                    const n = e.map(e=>this._getOptionId(e));
                    t = (e,t)=>{
                        e._setSelected(n.indexOf(t.toString()) > -1)
                    }
                } else
                    t = (e,t)=>{
                        e._setSelected(!1)
                    }
                    ;
                this._optionMap.forEach(t)
            }
            registerOnChange(e) {
                this.onChange = t=>{
                    const n = [];
                    if (t.hasOwnProperty("selectedOptions")) {
                        const e = t.selectedOptions;
                        for (let t = 0; t < e.length; t++) {
                            const r = e.item(t)
                              , s = this._getOptionValue(r.value);
                            n.push(s)
                        }
                    } else {
                        const e = t.options;
                        for (let t = 0; t < e.length; t++) {
                            const r = e.item(t);
                            if (r.selected) {
                                const e = this._getOptionValue(r.value);
                                n.push(e)
                            }
                        }
                    }
                    this.value = n,
                    e(n)
                }
            }
            registerOnTouched(e) {
                this.onTouched = e
            }
            setDisabledState(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
            }
            _registerOption(e) {
                const t = (this._idCounter++).toString();
                return this._optionMap.set(t, e),
                t
            }
            _getOptionId(e) {
                for (const t of Array.from(this._optionMap.keys()))
                    if (this._compareWith(this._optionMap.get(t)._value, e))
                        return t;
                return null
            }
            _getOptionValue(e) {
                const t = function(e) {
                    return e.split(":")[0]
                }(e);
                return this._optionMap.has(t) ? this._optionMap.get(t)._value : e
            }
        }
        , class {
            constructor(e, t, n, r) {
                this._renderer = e,
                this._elementRef = t,
                this._registry = n,
                this._injector = r,
                this.onChange = ()=>{}
                ,
                this.onTouched = ()=>{}
            }
            ngOnInit() {
                this._control = this._injector.get(Ca),
                this._checkName(),
                this._registry.add(this._control, this)
            }
            ngOnDestroy() {
                this._registry.remove(this)
            }
            writeValue(e) {
                this._state = e === this.value,
                this._renderer.setProperty(this._elementRef.nativeElement, "checked", this._state)
            }
            registerOnChange(e) {
                this._fn = e,
                this.onChange = ()=>{
                    e(this.value),
                    this._registry.select(this)
                }
            }
            fireUncheck(e) {
                this.writeValue(e)
            }
            registerOnTouched(e) {
                this.onTouched = e
            }
            setDisabledState(e) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
            }
            _checkName() {
                this.name && this.formControlName && this.name !== this.formControlName && this._throwNameError(),
                !this.name && this.formControlName && (this.name = this.formControlName)
            }
            _throwNameError() {
                throw new Error('\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type="radio" formControlName="food" name="food">\n    ')
            }
        }
        ];
        function $a(e) {
            const t = za(e) ? e.validators : e;
            return Array.isArray(t) ? ja(t) : t || null
        }
        function Ua(e, t) {
            const n = za(t) ? t.asyncValidators : e;
            return Array.isArray(n) ? Ha(n) : n || null
        }
        function za(e) {
            return null != e && !Array.isArray(e) && "object" == typeof e
        }
        class Za {
            constructor(e, t) {
                this.validator = e,
                this.asyncValidator = t,
                this._onCollectionChange = ()=>{}
                ,
                this.pristine = !0,
                this.touched = !1,
                this._onDisabledChange = []
            }
            get parent() {
                return this._parent
            }
            get valid() {
                return "VALID" === this.status
            }
            get invalid() {
                return "INVALID" === this.status
            }
            get pending() {
                return "PENDING" == this.status
            }
            get disabled() {
                return "DISABLED" === this.status
            }
            get enabled() {
                return "DISABLED" !== this.status
            }
            get dirty() {
                return !this.pristine
            }
            get untouched() {
                return !this.touched
            }
            get updateOn() {
                return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change"
            }
            setValidators(e) {
                this.validator = $a(e)
            }
            setAsyncValidators(e) {
                this.asyncValidator = Ua(e)
            }
            clearValidators() {
                this.validator = null
            }
            clearAsyncValidators() {
                this.asyncValidator = null
            }
            markAsTouched(e={}) {
                this.touched = !0,
                this._parent && !e.onlySelf && this._parent.markAsTouched(e)
            }
            markAllAsTouched() {
                this.markAsTouched({
                    onlySelf: !0
                }),
                this._forEachChild(e=>e.markAllAsTouched())
            }
            markAsUntouched(e={}) {
                this.touched = !1,
                this._pendingTouched = !1,
                this._forEachChild(e=>{
                    e.markAsUntouched({
                        onlySelf: !0
                    })
                }
                ),
                this._parent && !e.onlySelf && this._parent._updateTouched(e)
            }
            markAsDirty(e={}) {
                this.pristine = !1,
                this._parent && !e.onlySelf && this._parent.markAsDirty(e)
            }
            markAsPristine(e={}) {
                this.pristine = !0,
                this._pendingDirty = !1,
                this._forEachChild(e=>{
                    e.markAsPristine({
                        onlySelf: !0
                    })
                }
                ),
                this._parent && !e.onlySelf && this._parent._updatePristine(e)
            }
            markAsPending(e={}) {
                this.status = "PENDING",
                !1 !== e.emitEvent && this.statusChanges.emit(this.status),
                this._parent && !e.onlySelf && this._parent.markAsPending(e)
            }
            disable(e={}) {
                const t = this._parentMarkedDirty(e.onlySelf);
                this.status = "DISABLED",
                this.errors = null,
                this._forEachChild(t=>{
                    t.disable(Object.assign({}, e, {
                        onlySelf: !0
                    }))
                }
                ),
                this._updateValue(),
                !1 !== e.emitEvent && (this.valueChanges.emit(this.value),
                this.statusChanges.emit(this.status)),
                this._updateAncestors(Object.assign({}, e, {
                    skipPristineCheck: t
                })),
                this._onDisabledChange.forEach(e=>e(!0))
            }
            enable(e={}) {
                const t = this._parentMarkedDirty(e.onlySelf);
                this.status = "VALID",
                this._forEachChild(t=>{
                    t.enable(Object.assign({}, e, {
                        onlySelf: !0
                    }))
                }
                ),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: e.emitEvent
                }),
                this._updateAncestors(Object.assign({}, e, {
                    skipPristineCheck: t
                })),
                this._onDisabledChange.forEach(e=>e(!1))
            }
            _updateAncestors(e) {
                this._parent && !e.onlySelf && (this._parent.updateValueAndValidity(e),
                e.skipPristineCheck || this._parent._updatePristine(),
                this._parent._updateTouched())
            }
            setParent(e) {
                this._parent = e
            }
            updateValueAndValidity(e={}) {
                this._setInitialStatus(),
                this._updateValue(),
                this.enabled && (this._cancelExistingSubscription(),
                this.errors = this._runValidator(),
                this.status = this._calculateStatus(),
                "VALID" !== this.status && "PENDING" !== this.status || this._runAsyncValidator(e.emitEvent)),
                !1 !== e.emitEvent && (this.valueChanges.emit(this.value),
                this.statusChanges.emit(this.status)),
                this._parent && !e.onlySelf && this._parent.updateValueAndValidity(e)
            }
            _updateTreeValidity(e={
                emitEvent: !0
            }) {
                this._forEachChild(t=>t._updateTreeValidity(e)),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: e.emitEvent
                })
            }
            _setInitialStatus() {
                this.status = this._allControlsDisabled() ? "DISABLED" : "VALID"
            }
            _runValidator() {
                return this.validator ? this.validator(this) : null
            }
            _runAsyncValidator(e) {
                if (this.asyncValidator) {
                    this.status = "PENDING";
                    const t = Ia(this.asyncValidator(this));
                    this._asyncValidationSubscription = t.subscribe(t=>this.setErrors(t, {
                        emitEvent: e
                    }))
                }
            }
            _cancelExistingSubscription() {
                this._asyncValidationSubscription && this._asyncValidationSubscription.unsubscribe()
            }
            setErrors(e, t={}) {
                this.errors = e,
                this._updateControlsErrors(!1 !== t.emitEvent)
            }
            get(e) {
                return function(e, t, n) {
                    return null == t ? null : (t instanceof Array || (t = t.split(".")),
                    t instanceof Array && 0 === t.length ? null : t.reduce((e,t)=>e instanceof Wa ? e.controls.hasOwnProperty(t) ? e.controls[t] : null : e instanceof qa && e.at(t) || null, e))
                }(this, e)
            }
            getError(e, t) {
                const n = t ? this.get(t) : this;
                return n && n.errors ? n.errors[e] : null
            }
            hasError(e, t) {
                return !!this.getError(e, t)
            }
            get root() {
                let e = this;
                for (; e._parent; )
                    e = e._parent;
                return e
            }
            _updateControlsErrors(e) {
                this.status = this._calculateStatus(),
                e && this.statusChanges.emit(this.status),
                this._parent && this._parent._updateControlsErrors(e)
            }
            _initObservables() {
                this.valueChanges = new as,
                this.statusChanges = new as
            }
            _calculateStatus() {
                return this._allControlsDisabled() ? "DISABLED" : this.errors ? "INVALID" : this._anyControlsHaveStatus("PENDING") ? "PENDING" : this._anyControlsHaveStatus("INVALID") ? "INVALID" : "VALID"
            }
            _anyControlsHaveStatus(e) {
                return this._anyControls(t=>t.status === e)
            }
            _anyControlsDirty() {
                return this._anyControls(e=>e.dirty)
            }
            _anyControlsTouched() {
                return this._anyControls(e=>e.touched)
            }
            _updatePristine(e={}) {
                this.pristine = !this._anyControlsDirty(),
                this._parent && !e.onlySelf && this._parent._updatePristine(e)
            }
            _updateTouched(e={}) {
                this.touched = this._anyControlsTouched(),
                this._parent && !e.onlySelf && this._parent._updateTouched(e)
            }
            _isBoxedValue(e) {
                return "object" == typeof e && null !== e && 2 === Object.keys(e).length && "value"in e && "disabled"in e
            }
            _registerOnCollectionChange(e) {
                this._onCollectionChange = e
            }
            _setUpdateStrategy(e) {
                za(e) && null != e.updateOn && (this._updateOn = e.updateOn)
            }
            _parentMarkedDirty(e) {
                return !e && this._parent && this._parent.dirty && !this._parent._anyControlsDirty()
            }
        }
        class Ga extends Za {
            constructor(e=null, t, n) {
                super($a(t), Ua(n, t)),
                this._onChange = [],
                this._applyFormState(e),
                this._setUpdateStrategy(t),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !1
                }),
                this._initObservables()
            }
            setValue(e, t={}) {
                this.value = this._pendingValue = e,
                this._onChange.length && !1 !== t.emitModelToViewChange && this._onChange.forEach(e=>e(this.value, !1 !== t.emitViewToModelChange)),
                this.updateValueAndValidity(t)
            }
            patchValue(e, t={}) {
                this.setValue(e, t)
            }
            reset(e=null, t={}) {
                this._applyFormState(e),
                this.markAsPristine(t),
                this.markAsUntouched(t),
                this.setValue(this.value, t),
                this._pendingChange = !1
            }
            _updateValue() {}
            _anyControls(e) {
                return !1
            }
            _allControlsDisabled() {
                return this.disabled
            }
            registerOnChange(e) {
                this._onChange.push(e)
            }
            _clearChangeFns() {
                this._onChange = [],
                this._onDisabledChange = [],
                this._onCollectionChange = ()=>{}
            }
            registerOnDisabledChange(e) {
                this._onDisabledChange.push(e)
            }
            _forEachChild(e) {}
            _syncPendingControls() {
                return !("submit" !== this.updateOn || (this._pendingDirty && this.markAsDirty(),
                this._pendingTouched && this.markAsTouched(),
                !this._pendingChange) || (this.setValue(this._pendingValue, {
                    onlySelf: !0,
                    emitModelToViewChange: !1
                }),
                0))
            }
            _applyFormState(e) {
                this._isBoxedValue(e) ? (this.value = this._pendingValue = e.value,
                e.disabled ? this.disable({
                    onlySelf: !0,
                    emitEvent: !1
                }) : this.enable({
                    onlySelf: !0,
                    emitEvent: !1
                })) : this.value = this._pendingValue = e
            }
        }
        class Wa extends Za {
            constructor(e, t, n) {
                super($a(t), Ua(n, t)),
                this.controls = e,
                this._initObservables(),
                this._setUpdateStrategy(t),
                this._setUpControls(),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !1
                })
            }
            registerControl(e, t) {
                return this.controls[e] ? this.controls[e] : (this.controls[e] = t,
                t.setParent(this),
                t._registerOnCollectionChange(this._onCollectionChange),
                t)
            }
            addControl(e, t) {
                this.registerControl(e, t),
                this.updateValueAndValidity(),
                this._onCollectionChange()
            }
            removeControl(e) {
                this.controls[e] && this.controls[e]._registerOnCollectionChange(()=>{}
                ),
                delete this.controls[e],
                this.updateValueAndValidity(),
                this._onCollectionChange()
            }
            setControl(e, t) {
                this.controls[e] && this.controls[e]._registerOnCollectionChange(()=>{}
                ),
                delete this.controls[e],
                t && this.registerControl(e, t),
                this.updateValueAndValidity(),
                this._onCollectionChange()
            }
            contains(e) {
                return this.controls.hasOwnProperty(e) && this.controls[e].enabled
            }
            setValue(e, t={}) {
                this._checkAllValuesPresent(e),
                Object.keys(e).forEach(n=>{
                    this._throwIfControlMissing(n),
                    this.controls[n].setValue(e[n], {
                        onlySelf: !0,
                        emitEvent: t.emitEvent
                    })
                }
                ),
                this.updateValueAndValidity(t)
            }
            patchValue(e, t={}) {
                Object.keys(e).forEach(n=>{
                    this.controls[n] && this.controls[n].patchValue(e[n], {
                        onlySelf: !0,
                        emitEvent: t.emitEvent
                    })
                }
                ),
                this.updateValueAndValidity(t)
            }
            reset(e={}, t={}) {
                this._forEachChild((n,r)=>{
                    n.reset(e[r], {
                        onlySelf: !0,
                        emitEvent: t.emitEvent
                    })
                }
                ),
                this._updatePristine(t),
                this._updateTouched(t),
                this.updateValueAndValidity(t)
            }
            getRawValue() {
                return this._reduceChildren({}, (e,t,n)=>(e[n] = t instanceof Ga ? t.value : t.getRawValue(),
                e))
            }
            _syncPendingControls() {
                let e = this._reduceChildren(!1, (e,t)=>!!t._syncPendingControls() || e);
                return e && this.updateValueAndValidity({
                    onlySelf: !0
                }),
                e
            }
            _throwIfControlMissing(e) {
                if (!Object.keys(this.controls).length)
                    throw new Error("\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
                if (!this.controls[e])
                    throw new Error(`Cannot find form control with name: ${e}.`)
            }
            _forEachChild(e) {
                Object.keys(this.controls).forEach(t=>e(this.controls[t], t))
            }
            _setUpControls() {
                this._forEachChild(e=>{
                    e.setParent(this),
                    e._registerOnCollectionChange(this._onCollectionChange)
                }
                )
            }
            _updateValue() {
                this.value = this._reduceValue()
            }
            _anyControls(e) {
                let t = !1;
                return this._forEachChild((n,r)=>{
                    t = t || this.contains(r) && e(n)
                }
                ),
                t
            }
            _reduceValue() {
                return this._reduceChildren({}, (e,t,n)=>((t.enabled || this.disabled) && (e[n] = t.value),
                e))
            }
            _reduceChildren(e, t) {
                let n = e;
                return this._forEachChild((e,r)=>{
                    n = t(n, e, r)
                }
                ),
                n
            }
            _allControlsDisabled() {
                for (const e of Object.keys(this.controls))
                    if (this.controls[e].enabled)
                        return !1;
                return Object.keys(this.controls).length > 0 || this.disabled
            }
            _checkAllValuesPresent(e) {
                this._forEachChild((t,n)=>{
                    if (void 0 === e[n])
                        throw new Error(`Must supply a value for form control with name: '${n}'.`)
                }
                )
            }
        }
        class qa extends Za {
            constructor(e, t, n) {
                super($a(t), Ua(n, t)),
                this.controls = e,
                this._initObservables(),
                this._setUpdateStrategy(t),
                this._setUpControls(),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !1
                })
            }
            at(e) {
                return this.controls[e]
            }
            push(e) {
                this.controls.push(e),
                this._registerControl(e),
                this.updateValueAndValidity(),
                this._onCollectionChange()
            }
            insert(e, t) {
                this.controls.splice(e, 0, t),
                this._registerControl(t),
                this.updateValueAndValidity()
            }
            removeAt(e) {
                this.controls[e] && this.controls[e]._registerOnCollectionChange(()=>{}
                ),
                this.controls.splice(e, 1),
                this.updateValueAndValidity()
            }
            setControl(e, t) {
                this.controls[e] && this.controls[e]._registerOnCollectionChange(()=>{}
                ),
                this.controls.splice(e, 1),
                t && (this.controls.splice(e, 0, t),
                this._registerControl(t)),
                this.updateValueAndValidity(),
                this._onCollectionChange()
            }
            get length() {
                return this.controls.length
            }
            setValue(e, t={}) {
                this._checkAllValuesPresent(e),
                e.forEach((e,n)=>{
                    this._throwIfControlMissing(n),
                    this.at(n).setValue(e, {
                        onlySelf: !0,
                        emitEvent: t.emitEvent
                    })
                }
                ),
                this.updateValueAndValidity(t)
            }
            patchValue(e, t={}) {
                e.forEach((e,n)=>{
                    this.at(n) && this.at(n).patchValue(e, {
                        onlySelf: !0,
                        emitEvent: t.emitEvent
                    })
                }
                ),
                this.updateValueAndValidity(t)
            }
            reset(e=[], t={}) {
                this._forEachChild((n,r)=>{
                    n.reset(e[r], {
                        onlySelf: !0,
                        emitEvent: t.emitEvent
                    })
                }
                ),
                this._updatePristine(t),
                this._updateTouched(t),
                this.updateValueAndValidity(t)
            }
            getRawValue() {
                return this.controls.map(e=>e instanceof Ga ? e.value : e.getRawValue())
            }
            clear() {
                this.controls.length < 1 || (this._forEachChild(e=>e._registerOnCollectionChange(()=>{}
                )),
                this.controls.splice(0),
                this.updateValueAndValidity())
            }
            _syncPendingControls() {
                let e = this.controls.reduce((e,t)=>!!t._syncPendingControls() || e, !1);
                return e && this.updateValueAndValidity({
                    onlySelf: !0
                }),
                e
            }
            _throwIfControlMissing(e) {
                if (!this.controls.length)
                    throw new Error("\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
                if (!this.at(e))
                    throw new Error(`Cannot find form control at index ${e}`)
            }
            _forEachChild(e) {
                this.controls.forEach((t,n)=>{
                    e(t, n)
                }
                )
            }
            _updateValue() {
                this.value = this.controls.filter(e=>e.enabled || this.disabled).map(e=>e.value)
            }
            _anyControls(e) {
                return this.controls.some(t=>t.enabled && e(t))
            }
            _setUpControls() {
                this._forEachChild(e=>this._registerControl(e))
            }
            _checkAllValuesPresent(e) {
                this._forEachChild((t,n)=>{
                    if (void 0 === e[n])
                        throw new Error(`Must supply a value for form control at index: ${n}.`)
                }
                )
            }
            _allControlsDisabled() {
                for (const e of this.controls)
                    if (e.enabled)
                        return !1;
                return this.controls.length > 0 || this.disabled
            }
            _registerControl(e) {
                e.setParent(this),
                e._registerOnCollectionChange(this._onCollectionChange)
            }
        }
        const Qa = (()=>Promise.resolve(null))();
        class Ka extends wa {
            constructor(e, t) {
                super(),
                this.submitted = !1,
                this._directives = [],
                this.ngSubmit = new as,
                this.form = new Wa({},ja(e),Ha(t))
            }
            ngAfterViewInit() {
                this._setUpdateStrategy()
            }
            get formDirective() {
                return this
            }
            get control() {
                return this.form
            }
            get path() {
                return []
            }
            get controls() {
                return this.form.controls
            }
            addControl(e) {
                Qa.then(()=>{
                    const t = this._findContainer(e.path);
                    e.control = t.registerControl(e.name, e.control),
                    Pa(e.control, e),
                    e.control.updateValueAndValidity({
                        emitEvent: !1
                    }),
                    this._directives.push(e)
                }
                )
            }
            getControl(e) {
                return this.form.get(e.path)
            }
            removeControl(e) {
                Qa.then(()=>{
                    const t = this._findContainer(e.path);
                    t && t.removeControl(e.name),
                    function(e, t) {
                        const n = e.indexOf(t);
                        n > -1 && e.splice(n, 1)
                    }(this._directives, e)
                }
                )
            }
            addFormGroup(e) {
                Qa.then(()=>{
                    const t = this._findContainer(e.path)
                      , n = new Wa({});
                    (function(e, t) {
                        null == e && La(t, "Cannot find control with"),
                        e.validator = Ta.compose([e.validator, t.validator]),
                        e.asyncValidator = Ta.composeAsync([e.asyncValidator, t.asyncValidator])
                    }
                    )(n, e),
                    t.registerControl(e.name, n),
                    n.updateValueAndValidity({
                        emitEvent: !1
                    })
                }
                )
            }
            removeFormGroup(e) {
                Qa.then(()=>{
                    const t = this._findContainer(e.path);
                    t && t.removeControl(e.name)
                }
                )
            }
            getFormGroup(e) {
                return this.form.get(e.path)
            }
            updateModel(e, t) {
                Qa.then(()=>{
                    this.form.get(e.path).setValue(t)
                }
                )
            }
            setValue(e) {
                this.control.setValue(e)
            }
            onSubmit(e) {
                return this.submitted = !0,
                t = this._directives,
                this.form._syncPendingControls(),
                t.forEach(e=>{
                    const t = e.control;
                    "submit" === t.updateOn && t._pendingChange && (e.viewToModelUpdate(t._pendingValue),
                    t._pendingChange = !1)
                }
                ),
                this.ngSubmit.emit(e),
                !1;
                var t
            }
            onReset() {
                this.resetForm()
            }
            resetForm(e) {
                this.form.reset(e),
                this.submitted = !1
            }
            _setUpdateStrategy() {
                this.options && null != this.options.updateOn && (this.form._updateOn = this.options.updateOn)
            }
            _findContainer(e) {
                return e.pop(),
                e.length ? this.form.get(e) : this.form
            }
        }
        class Ja {
            static modelParentException() {
                throw new Error('\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup\'s partner directive "formControlName" instead.  Example:\n\n      \n    <div [formGroup]="myGroup">\n      <input formControlName="firstName">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });\n\n      Or, if you\'d like to avoid registering this form control, indicate that it\'s standalone in ngModelOptions:\n\n      Example:\n\n      \n    <div [formGroup]="myGroup">\n       <input formControlName="firstName">\n       <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">\n    </div>\n  ')
            }
            static formGroupNameException() {
                throw new Error(`\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      ${Oa}\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      ${Ma}`)
            }
            static missingNameException() {
                throw new Error('If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as \'standalone\' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]="person.firstName" name="first">\n      Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">')
            }
            static modelGroupParentException() {
                throw new Error(`\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      ${Oa}\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      ${Ma}`)
            }
            static ngFormWarning() {
                console.warn("\n    It looks like you're using 'ngForm'.\n\n    Support for using the 'ngForm' element selector has been deprecated in Angular v6 and will be removed\n    in Angular v9.\n\n    Use 'ng-form' instead.\n\n    Before:\n    <ngForm #myForm=\"ngForm\">\n\n    After:\n    <ng-form #myForm=\"ngForm\">\n    ")
            }
        }
        const Ya = new ve("NgFormSelectorWarning");
        class Xa extends wa {
            ngOnInit() {
                this._checkParentType(),
                this.formDirective.addFormGroup(this)
            }
            ngOnDestroy() {
                this.formDirective && this.formDirective.removeFormGroup(this)
            }
            get control() {
                return this.formDirective.getFormGroup(this)
            }
            get path() {
                return Ra(this.name, this._parent)
            }
            get formDirective() {
                return this._parent ? this._parent.formDirective : null
            }
            get validator() {
                return ja(this._validators)
            }
            get asyncValidator() {
                return Ha(this._asyncValidators)
            }
            _checkParentType() {}
        }
        class eu extends Xa {
            constructor(e, t, n) {
                super(),
                this._parent = e,
                this._validators = t,
                this._asyncValidators = n
            }
            _checkParentType() {
                this._parent instanceof eu || this._parent instanceof Ka || Ja.modelGroupParentException()
            }
        }
        const tu = (()=>Promise.resolve(null))();
        class nu extends Ca {
            constructor(e, t, n, r) {
                super(),
                this.control = new Ga,
                this._registered = !1,
                this.update = new as,
                this._parent = e,
                this._rawValidators = t || [],
                this._rawAsyncValidators = n || [],
                this.valueAccessor = function(e, t) {
                    if (!t)
                        return null;
                    Array.isArray(t) || La(e, "Value accessor was not provided as an array for form control with");
                    let n = void 0
                      , r = void 0
                      , s = void 0;
                    return t.forEach(t=>{
                        var i;
                        t.constructor === ya ? n = t : (i = t,
                        Ba.some(e=>i.constructor === e) ? (r && La(e, "More than one built-in value accessor matches form control with"),
                        r = t) : (s && La(e, "More than one custom value accessor matches form control with"),
                        s = t))
                    }
                    ),
                    s || r || n || (La(e, "No valid value accessor for form control with"),
                    null)
                }(this, r)
            }
            ngOnChanges(e) {
                this._checkForErrors(),
                this._registered || this._setUpControl(),
                "isDisabled"in e && this._updateDisabled(e),
                function(e, t) {
                    if (!e.hasOwnProperty("model"))
                        return !1;
                    const n = e.model;
                    return !!n.isFirstChange() || !St(t, n.currentValue)
                }(e, this.viewModel) && (this._updateValue(this.model),
                this.viewModel = this.model)
            }
            ngOnDestroy() {
                this.formDirective && this.formDirective.removeControl(this)
            }
            get path() {
                return this._parent ? Ra(this.name, this._parent) : [this.name]
            }
            get formDirective() {
                return this._parent ? this._parent.formDirective : null
            }
            get validator() {
                return ja(this._rawValidators)
            }
            get asyncValidator() {
                return Ha(this._rawAsyncValidators)
            }
            viewToModelUpdate(e) {
                this.viewModel = e,
                this.update.emit(e)
            }
            _setUpControl() {
                this._setUpdateStrategy(),
                this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this),
                this._registered = !0
            }
            _setUpdateStrategy() {
                this.options && null != this.options.updateOn && (this.control._updateOn = this.options.updateOn)
            }
            _isStandalone() {
                return !this._parent || !(!this.options || !this.options.standalone)
            }
            _setUpStandalone() {
                Pa(this.control, this),
                this.control.updateValueAndValidity({
                    emitEvent: !1
                })
            }
            _checkForErrors() {
                this._isStandalone() || this._checkParentType(),
                this._checkName()
            }
            _checkParentType() {
                !(this._parent instanceof eu) && this._parent instanceof Xa ? Ja.formGroupNameException() : this._parent instanceof eu || this._parent instanceof Ka || Ja.modelParentException()
            }
            _checkName() {
                this.options && this.options.name && (this.name = this.options.name),
                this._isStandalone() || this.name || Ja.missingNameException()
            }
            _updateValue(e) {
                tu.then(()=>{
                    this.control.setValue(e, {
                        emitViewToModelChange: !1
                    })
                }
                )
            }
            _updateDisabled(e) {
                const t = e.isDisabled.currentValue
                  , n = "" === t || t && "false" !== t;
                tu.then(()=>{
                    n && !this.control.disabled ? this.control.disable() : !n && this.control.disabled && this.control.enable()
                }
                )
            }
        }
        class ru {
        }
        class su {
            static withConfig(e) {
                return {
                    ngModule: su,
                    providers: [{
                        provide: Ya,
                        useValue: e.warnOnDeprecatedNgFormSelector
                    }]
                }
            }
        }
        var iu = Dn({
            encapsulation: 0,
            styles: [[".brand-logo[_ngcontent-%COMP%]{height:6em}.sound-library[_ngcontent-%COMP%]{max-width:4em!important}.sound-library[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:2em!important}"]],
            data: {}
        });
        function ou(e) {
            return Ni(0, [(e()(),
            mi(0, 0, null, null, 1, "p", [["class", "text-warning mt-1"]], null, null, null, null, null)), (e()(),
            Si(-1, null, ["You're in advanced mode"]))], null, null)
        }
        function lu(e) {
            return Ni(0, [(e()(),
            mi(0, 0, null, null, 5, "div", [["class", "row"]], null, null, null, null, null)), (e()(),
            mi(1, 0, null, null, 4, "div", [["class", "text-danger w-100"]], null, null, null, null, null)), (e()(),
            mi(2, 0, null, null, 1, "h3", [["class", "text-danger"]], null, null, null, null, null)), (e()(),
            Si(-1, null, ["Unknown error"])), (e()(),
            mi(4, 0, null, null, 1, "p", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["You might want to reload the page, reboot your Droid, and start over."]))], null, null)
        }
        function au(e) {
            return Ni(0, [(e()(),
            mi(0, 0, null, null, 6, "div", [["class", "row"]], null, null, null, null, null)), (e()(),
            mi(1, 0, null, null, 5, "div", [["class", "text-danger w-100"]], null, null, null, null, null)), (e()(),
            mi(2, 0, null, null, 1, "h3", [["class", "text-danger"]], null, null, null, null, null)), (e()(),
            Si(-1, null, ["Unsupported browser"])), (e()(),
            Si(-1, null, ["Your web browser does not support WebBluetooth, which is required for this app to work properly. "])), (e()(),
            mi(5, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["Please use a different web browser. We recommend the latest version of Google Chrome. "]))], null, null)
        }
        function uu(e) {
            return Ni(0, [(e()(),
            mi(0, 0, null, null, 3, "p", [["class", "mt-2 text-primary"]], null, null, null, null, null)), (e()(),
            mi(1, 0, null, null, 1, "b", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["Status:"])), (e()(),
            Si(3, null, [" ", ""]))], null, (function(e, t) {
                e(t, 3, 0, t.component.connectingstep)
            }
            ))
        }
        function cu(e) {
            return Ni(0, [(e()(),
            mi(0, 0, null, null, 11, "div", [["class", "row"]], null, null, null, null, null)), (e()(),
            mi(1, 0, null, null, 10, "div", [["class", "col"]], null, null, null, null, null)), (e()(),
            mi(2, 0, null, null, 1, "h2", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["Connect to your Droid"])), (e()(),
            mi(4, 0, null, null, 3, "p", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["This web app uses WebBluetooth to communicate with your Droid. Make sure you have a Droid from Droid Depot, turned on and in range of your computer. "])), (e()(),
            mi(6, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["When using this web app, your Droid should not be connected to its remote control or the Droid Depot app. It's safe to reboot your Droid before trying to pair it."])), (e()(),
            mi(8, 0, null, null, 1, "button", [["class", "btn btn-outline-primary"]], [[8, "disabled", 0]], [[null, "click"]], (function(e, t, n) {
                var r = !0;
                return "click" === t && (r = !1 !== e.component.connectToDroid() && r),
                r
            }
            ), null, null)), (e()(),
            Si(-1, null, ["Connect to Droid "])), (e()(),
            gi(16777216, null, null, 1, null, uu)), Br(11, 16384, null, 0, sl, [mn, fn], {
                ngIf: [0, "ngIf"]
            }, null)], (function(e, t) {
                e(t, 11, 0, t.component.isconnecting)
            }
            ), (function(e, t) {
                e(t, 8, 0, t.component.isconnecting)
            }
            ))
        }
        function du(e) {
            return Ni(0, [(e()(),
            mi(0, 0, null, null, 4, "button", [["class", "btn btn-outline-primary"]], null, [[null, "click"]], (function(e, t, n) {
                var r = !0;
                return "click" === t && (r = !1 !== e.component.sendBank(e.context.$implicit) && r),
                r
            }
            ), null, null)), $r(512, null, Jo, Yo, [un, cn, Ut, qt]), Br(2, 278528, null, 0, el, [Jo], {
                klass: [0, "klass"],
                ngClass: [1, "ngClass"]
            }, null), Ti(3, {
                "btn-primary": 0,
                "btn-outline-primary": 1
            }), (e()(),
            mi(4, 0, null, null, 0, "img", [["class", "sound-library"]], [[8, "src", 4], [8, "alt", 0]], null, null, null, null))], (function(e, t) {
                var n = t.component
                  , r = e(t, 3, 0, n.selectedBank === t.context.$implicit, n.selectedBank != t.context.$implicit);
                e(t, 2, 0, "btn btn-outline-primary", r)
            }
            ), (function(e, t) {
                e(t, 4, 0, sr(1, "assets/banks/", t.context.$implicit, ".svg"), sr(1, "", t.context.$implicit, ""))
            }
            ))
        }
        function hu(e) {
            return Ni(0, [(e()(),
            mi(0, 0, null, null, 1, "button", [["class", "btn btn-outline-primary"]], null, [[null, "click"]], (function(e, t, n) {
                var r = !0;
                return "click" === t && (r = !1 !== e.component.playSound(e.context.$implicit) && r),
                r
            }
            ), null, null)), (e()(),
            mi(1, 0, null, null, 0, "img", [["class", "sound-library"]], [[8, "src", 4], [8, "alt", 0]], null, null, null, null))], null, (function(e, t) {
                e(t, 1, 0, sr(1, "assets/sounds/", t.context.$implicit, ".svg"), sr(1, "", t.context.$implicit, ""))
            }
            ))
        }
        function pu(e) {
            return Ni(0, [(e()(),
            mi(0, 0, null, null, 4, "div", [["class", "col-6"]], null, null, null, null, null)), (e()(),
            mi(1, 0, null, null, 1, "h5", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["Choose Sound"])), (e()(),
            gi(16777216, null, null, 1, null, hu)), Br(4, 278528, null, 0, nl, [mn, fn, un], {
                ngForOf: [0, "ngForOf"]
            }, null)], (function(e, t) {
                e(t, 4, 0, t.component.sounds)
            }
            ), null)
        }
        function fu(e) {
            return Ni(0, [(e()(),
            mi(0, 0, null, null, 24, "div", [["class", "col-12 mt-5 mb-5"]], null, null, null, null, null)), (e()(),
            mi(1, 0, null, null, 1, "h4", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["Advanced Mode"])), (e()(),
            mi(3, 0, null, null, 10, "p", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["Instruction format: "])), (e()(),
            mi(5, 0, null, null, 1, "code", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["command, delay"])), (e()(),
            Si(-1, null, [", one instruction per line. "])), (e()(),
            mi(8, 0, null, null, 1, "code", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["delay"])), (e()(),
            Si(-1, null, [" is in milliseconds, is optional and will be assumed to be 1000ms if not provided. This input is not validated. "])), (e()(),
            mi(11, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(),
            mi(12, 0, null, null, 1, "span", [["class", "text-danger"]], null, null, null, null, null)), (e()(),
            Si(-1, null, ["This is dangerous if you don't know what you're doing."])), (e()(),
            mi(14, 0, null, null, 5, "textarea", [["class", "form-control text-monospace"], ["cols", "30"], ["name", "commands"], ["rows", "10"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], (function(e, t, n) {
                var r = !0
                  , s = e.component;
                return "input" === t && (r = !1 !== Ir(e, 15)._handleInput(n.target.value) && r),
                "blur" === t && (r = !1 !== Ir(e, 15).onTouched() && r),
                "compositionstart" === t && (r = !1 !== Ir(e, 15)._compositionStart() && r),
                "compositionend" === t && (r = !1 !== Ir(e, 15)._compositionEnd(n.target.value) && r),
                "ngModelChange" === t && (r = !1 !== (s.advancedInput = n) && r),
                r
            }
            ), null, null)), Br(15, 16384, null, 0, ya, [qt, Ut, [2, _a]], null, null), $r(1024, null, ma, (function(e) {
                return [e]
            }
            ), [ya]), Br(17, 671744, null, 0, nu, [[8, null], [8, null], [8, null], [6, ma]], {
                name: [0, "name"],
                model: [1, "model"]
            }, {
                update: "ngModelChange"
            }), $r(2048, null, Ca, null, [nu]), Br(19, 16384, null, 0, Ea, [[4, Ca]], null, null), (e()(),
            mi(20, 0, null, null, 1, "button", [["class", "btn btn-outline-danger mt-2"]], null, [[null, "click"]], (function(e, t, n) {
                var r = !0;
                return "click" === t && (r = !1 !== e.component.runAdvancedInput() && r),
                r
            }
            ), null, null)), (e()(),
            Si(-1, null, ["Run on Droid"])), (e()(),
            mi(22, 0, null, null, 2, "p", [["class", "mt-2"]], null, null, null, null, null)), (e()(),
            mi(23, 0, null, null, 1, "small", [["class", "text-primary"]], null, null, null, null, null)), (e()(),
            Si(24, null, ["", ""]))], (function(e, t) {
                e(t, 17, 0, "commands", t.component.advancedInput)
            }
            ), (function(e, t) {
                var n = t.component;
                e(t, 14, 0, Ir(t, 19).ngClassUntouched, Ir(t, 19).ngClassTouched, Ir(t, 19).ngClassPristine, Ir(t, 19).ngClassDirty, Ir(t, 19).ngClassValid, Ir(t, 19).ngClassInvalid, Ir(t, 19).ngClassPending),
                e(t, 24, 0, n.currentCommand)
            }
            ))
        }
        function gu(e) {
            return Ni(0, [(e()(),
            mi(0, 0, null, null, 2, "div", [["class", "col-12"]], null, null, null, null, null)), (e()(),
            mi(1, 0, null, null, 1, "small", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["If you know what you're doing, double click on the Droid to enable advanced mode."]))], null, null)
        }
        function mu(e) {
            return Ni(0, [(e()(),
            mi(0, 0, null, null, 37, "div", [["class", "row"]], null, null, null, null, null)), (e()(),
            mi(1, 0, null, null, 32, "div", [["class", "col"]], null, null, null, null, null)), (e()(),
            mi(2, 0, null, null, 1, "h2", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["Controlling the Droid"])), (e()(),
            mi(4, 0, null, null, 1, "p", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["This web app currently supports moving the Droid and playing light and sound effects. "])), (e()(),
            mi(6, 0, null, null, 0, "hr", [], null, null, null, null, null)), (e()(),
            mi(7, 0, null, null, 1, "h4", [["class", "mt-3"]], null, null, null, null, null)), (e()(),
            Si(-1, null, ["Sound and Light Effects"])), (e()(),
            mi(9, 0, null, null, 1, "p", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["Select a library then a sound from within this library. All sounds might not be available."])), (e()(),
            mi(11, 0, null, null, 7, "div", [["class", "row"]], null, null, null, null, null)), (e()(),
            mi(12, 0, null, null, 4, "div", [["class", "col-6"]], null, null, null, null, null)), (e()(),
            mi(13, 0, null, null, 1, "h5", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["Choose Library"])), (e()(),
            gi(16777216, null, null, 1, null, du)), Br(16, 278528, null, 0, nl, [mn, fn, un], {
                ngForOf: [0, "ngForOf"]
            }, null), (e()(),
            gi(16777216, null, null, 1, null, pu)), Br(18, 16384, null, 0, sl, [mn, fn], {
                ngIf: [0, "ngIf"]
            }, null), (e()(),
            mi(19, 0, null, null, 1, "h4", [["class", "mt-5"]], null, null, null, null, null)), (e()(),
            Si(-1, null, ["Move the Droid"])), (e()(),
            mi(21, 0, null, null, 1, "h5", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["Predefined moves"])), (e()(),
            mi(23, 0, null, null, 10, "div", [["class", "col-6"]], null, null, null, null, null)), (e()(),
            mi(24, 0, null, null, 1, "button", [["class", "btn-lg btn-outline-primary"]], null, [[null, "click"]], (function(e, t, n) {
                var r = !0;
                return "click" === t && (r = !1 !== e.component.stop() && r),
                r
            }
            ), null, null)), (e()(),
            Si(-1, null, ["Stop"])), (e()(),
            mi(26, 0, null, null, 1, "button", [["class", "btn-lg btn-outline-primary"]], null, [[null, "click"]], (function(e, t, n) {
                var r = !0;
                return "click" === t && (r = !1 !== e.component.rotateLeft() && r),
                r
            }
            ), null, null)), (e()(),
            Si(-1, null, ["Rotate Left"])), (e()(),
            mi(28, 0, null, null, 1, "button", [["class", "btn-lg btn-outline-primary"]], null, [[null, "click"]], (function(e, t, n) {
                var r = !0;
                return "click" === t && (r = !1 !== e.component.ahead() && r),
                r
            }
            ), null, null)), (e()(),
            Si(-1, null, ["Ahead"])), (e()(),
            mi(30, 0, null, null, 1, "button", [["class", "btn-lg btn-outline-primary"]], null, [[null, "click"]], (function(e, t, n) {
                var r = !0;
                return "click" === t && (r = !1 !== e.component.back() && r),
                r
            }
            ), null, null)), (e()(),
            Si(-1, null, ["Back"])), (e()(),
            mi(32, 0, null, null, 1, "button", [["class", "btn-lg btn-outline-primary"]], null, [[null, "click"]], (function(e, t, n) {
                var r = !0;
                return "click" === t && (r = !1 !== e.component.rotateRight() && r),
                r
            }
            ), null, null)), (e()(),
            Si(-1, null, ["Rotate Right"])), (e()(),
            gi(16777216, null, null, 1, null, fu)), Br(35, 16384, null, 0, sl, [mn, fn], {
                ngIf: [0, "ngIf"]
            }, null), (e()(),
            gi(16777216, null, null, 1, null, gu)), Br(37, 16384, null, 0, sl, [mn, fn], {
                ngIf: [0, "ngIf"]
            }, null)], (function(e, t) {
                var n = t.component;
                e(t, 16, 0, n.bank),
                e(t, 18, 0, n.selectedBank),
                e(t, 35, 0, n.advanced),
                e(t, 37, 0, !n.advanced)
            }
            ), null)
        }
        function _u(e) {
            return Ni(0, [(e()(),
            mi(0, 0, null, null, 29, "div", [["class", "container mt-5"]], null, null, null, null, null)), (e()(),
            mi(1, 0, null, null, 20, "div", [["class", "row mb-5"]], null, null, null, null, null)), (e()(),
            mi(2, 0, null, null, 3, "div", [["class", "col-12 col-md-6"]], null, null, null, null, null)), (e()(),
            mi(3, 0, null, null, 0, "img", [["alt", "Droid Logo"], ["class", "brand-logo"], ["src", "/assets/droid.svg"]], null, [[null, "dblclick"]], (function(e, t, n) {
                var r = !0;
                return "dblclick" === t && (r = 0 != (e.component.advanced = !0) && r),
                r
            }
            ), null, null)), (e()(),
            gi(16777216, null, null, 1, null, ou)), Br(5, 16384, null, 0, sl, [mn, fn], {
                ngIf: [0, "ngIf"]
            }, null), (e()(),
            mi(6, 0, null, null, 15, "div", [["class", "col-12 col-md-6 text-right"]], null, null, null, null, null)), (e()(),
            mi(7, 0, null, null, 1, "h2", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["Droid Depot Controller"])), (e()(),
            mi(9, 0, null, null, 12, "p", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["A web experiment by "])), (e()(),
            mi(11, 0, null, null, 1, "a", [["href", "https://www.twitter.com/baptistelaget"], ["target", "_blank"]], null, null, null, null, null)), (e()(),
            Si(-1, null, ["@baptistelaget"])), (e()(),
            Si(-1, null, [". Write me at "])), (e()(),
            mi(14, 0, null, null, 1, "a", [["href", "https://www.twitter.com/baptistelaget"], ["target", "_blank"]], null, null, null, null, null)), (e()(),
            Si(-1, null, ["baptiste@laget.ca"])), (e()(),
            Si(-1, null, [". "])), (e()(),
            mi(17, 0, null, null, 0, "br", [], null, null, null, null, null)), (e()(),
            Si(-1, null, ["More information on this "])), (e()(),
            mi(19, 0, null, null, 1, "a", [["href", "https://medium.com/@baptistelaget/controlling-disneys-droids-from-droid-depots-with-webbluetooth-febbabe50587"], ["target", "_blank"]], null, null, null, null, null)), (e()(),
            Si(-1, null, [" Medium article"])), (e()(),
            Si(-1, null, ["."])), (e()(),
            gi(16777216, null, null, 1, null, lu)), Br(23, 16384, null, 0, sl, [mn, fn], {
                ngIf: [0, "ngIf"]
            }, null), (e()(),
            gi(16777216, null, null, 1, null, au)), Br(25, 16384, null, 0, sl, [mn, fn], {
                ngIf: [0, "ngIf"]
            }, null), (e()(),
            gi(16777216, null, null, 1, null, cu)), Br(27, 16384, null, 0, sl, [mn, fn], {
                ngIf: [0, "ngIf"]
            }, null), (e()(),
            gi(16777216, null, null, 1, null, mu)), Br(29, 16384, null, 0, sl, [mn, fn], {
                ngIf: [0, "ngIf"]
            }, null)], (function(e, t) {
                var n = t.component;
                e(t, 5, 0, n.advanced),
                e(t, 23, 0, n.error),
                e(t, 25, 0, !n.isBluetoothAvailable),
                e(t, 27, 0, !n.isconnected && n.isBluetoothAvailable),
                e(t, 29, 0, n.isconnected)
            }
            ), null)
        }
        function yu(e) {
            return Ni(0, [(e()(),
            mi(0, 0, null, null, 1, "app-root", [], null, null, null, _u, iu)), Br(1, 114688, null, 0, Zo, [], null, null)], (function(e, t) {
                e(t, 1, 0)
            }
            ), null)
        }
        var vu = _r("app-root", Zo, yu, {}, {}, [])
          , wu = Po(Lo, [Zo], (function(e) {
            return function(e) {
                const t = {}
                  , n = [];
                let r = !1;
                for (let s = 0; s < e.length; s++) {
                    const i = e[s];
                    i.token === gt && !0 === i.value && (r = !0),
                    1073741824 & i.flags && n.push(i.token),
                    i.index = s,
                    t[Vn(i.token)] = i
                }
                return {
                    factory: null,
                    providersByKey: t,
                    providers: e,
                    modules: n,
                    isRoot: r
                }
            }([cr(512, jt, Ht, [[8, [vu]], [3, jt], Ie]), cr(5120, ws, hi, [[3, ws]]), cr(4608, Qo, Ko, [ws, [2, qo]]), cr(5120, rs, pi, [Fs]), cr(4608, Ts, Ts, []), cr(5120, ps, fs, []), cr(5120, un, ci, []), cr(5120, cn, di, []), cr(4608, ra, sa, [al]), cr(6144, at, null, [ra]), cr(4608, Kl, Yl, []), cr(5120, kl, (function(e, t, n, r, s, i, o, l) {
                return [new ql(e,t,n), new na(r), new Xl(s,i,o,l)]
            }
            ), [al, Fs, _s, al, al, Kl, vs, [2, Jl]]), cr(4608, Tl, Tl, [kl, Fs]), cr(135680, Al, Al, [al]), cr(4608, Ml, Ml, [Tl, Al, ps]), cr(6144, Gt, null, [Ml]), cr(6144, Il, null, [Al]), cr(4608, zs, zs, [Fs]), cr(4608, Da, Da, []), cr(1073742336, ll, ll, []), cr(1024, Pe, ha, []), cr(1024, ds, (function(e) {
                return [(t = e,
                Cl("probe", xl),
                Cl("coreTokens", Object.assign({}, El, (t || []).reduce((e,t)=>(e[t.name] = t.token,
                e), {}))),
                ()=>xl)];
                var t
            }
            ), [[2, Ks]]), cr(512, hs, hs, [[2, ds]]), cr(131584, ti, ti, [Fs, vs, _t, Pe, jt, hs]), cr(1073742336, fi, fi, [ti]), cr(1073742336, pa, pa, [[3, pa]]), cr(1073742336, ru, ru, []), cr(1073742336, su, su, []), cr(1073742336, Lo, Lo, []), cr(256, gt, !0, [])])
        }
        ));
        (function() {
            if (Le)
                throw new Error("Cannot enable prod mode after platform setup.");
            Fe = !1
        }
        )(),
        da().bootstrapModuleFactory(wu).catch(e=>console.error(e))
    },
    zn8P: function(e, t) {
        function n(e) {
            return Promise.resolve().then((function() {
                var t = new Error("Cannot find module '" + e + "'");
                throw t.code = "MODULE_NOT_FOUND",
                t
            }
            ))
        }
        n.keys = function() {
            return []
        }
        ,
        n.resolve = n,
        e.exports = n,
        n.id = "zn8P"
    }
}, [[0, 0]]]);
