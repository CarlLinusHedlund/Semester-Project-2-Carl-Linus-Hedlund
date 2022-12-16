(function () {
  const f = document.createElement('link').relList;
  if (f && f.supports && f.supports('modulepreload')) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) o(r);
  new MutationObserver((r) => {
    for (const i of r) if (i.type === 'childList') for (const l of i.addedNodes) l.tagName === 'LINK' && l.rel === 'modulepreload' && o(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function h(r) {
    const i = {};
    return (
      r.integrity && (i.integrity = r.integrity),
      r.referrerpolicy && (i.referrerPolicy = r.referrerpolicy),
      r.crossorigin === 'use-credentials' ? (i.credentials = 'include') : r.crossorigin === 'anonymous' ? (i.credentials = 'omit') : (i.credentials = 'same-origin'),
      i
    );
  }
  function o(r) {
    if (r.ep) return;
    r.ep = !0;
    const i = h(r);
    fetch(r.href, i);
  }
})();
window.location.href.includes('/dashboard/') && (localStorage.getItem('user') || (window.location.href = '/'));
(window.location.href.includes('/signup/') || window.location.href.includes('/signup/')) && localStorage.getItem('user') && (window.location.href = '/');
const B = document.createElement('div');
B.className = 'bg-white h-[350px] min-w-[200px] rounded-xl productCardShadow overflow-hidden md:hover:scale-110 duration-150 w-full';
const O = document.createElement('div');
O.className = 'imgContainer w-full h-[49%] bg-black relative';
const I = document.createElement('img');
I.className = 'object-cover w-full h-full';
const A = document.createElement('a');
A.className = 'absolute top-0 left-0 h-full w-full';
O.append(A, I);
const _ = document.createElement('div');
_.className = 'flex flex-col w-full';
const x = document.createElement('a');
x.className = 'flex bg-white h-8 mx-3 px-2 mt-4 justify-between items-center rounded-md productCardBtnShadow';
const M = document.createElement('p');
M.className = 'text-[10px] ml-2 text-primaryBlack-0 whitespace-nowrap';
M.innerText = 'PLACE A NEW BID';
const P = document.createElement('object');
P.className = 'mr-2';
P.data = '/img/svg/arrow.svg';
x.append(M, P);
const D = document.createElement('div');
D.className = 'flex flex-col py-2 mx-3 border-b-[1px] border-gray-300 solid';
const H = document.createElement('h2');
H.className = 'text-primaryBlack-0 text-[13px] font-semibold max-h-5 w-full truncate pr-4';
const E = document.createElement('p');
E.className = 'text-[8px] text-gray-300';
E.innerText = 'by: ';
const j = document.createElement('span');
j.className = 'uppercase text-primaryBlack-0';
E.append(j);
D.append(E, H);
const F = document.createElement('div');
F.className = 'flex px-3 py-4 gap-6';
const R = document.createElement('div');
R.className = 'flex flex-col';
const q = document.createElement('p');
q.className = 'text-[9px] text-gray-300 whitespace-nowrap';
q.innerText = 'CURRENT BID';
const z = document.createElement('p');
z.className = 'text-primaryBlack-0 text-xs font-medium';
const U = document.createElement('div');
U.className = 'flex flex-col';
const W = document.createElement('p');
W.className = 'text-[9px] text-gray-300';
W.innerText = 'TIME LEFT';
const $ = document.createElement('p');
$.className = 'text-primaryBlack-0 text-xs font-medium timeLeft';
R.append(q, z);
U.append(W, $);
F.append(R, U);
_.append(D, F);
B.append(O, _, x);
function X(d, f, h, o, r, i) {
  return (I.src = d), (j.innerText = r), ($.innerText = h), (H.innerText = f), (z.innerText = `${o}`), (x.href = `${i}`), (A.href = `${i}`), B;
}
const Z = 'https://api.noroff.dev',
  ee = document.getElementById('productCardWrapper');
async function te() {
  const d = `${Z}/api/v1/auction/listings?sort=created&sortOrder=desc&limit=12&_active=true&_seller=true`;
  try {
    const f = await fetch(d);
    if (f.ok) {
      const h = await f.json();
      console.log(h),
        h.forEach((o) => {
          console.log(o);
          const r = X(o.media[0] ? o.media[0] : 'img/png/noMediaFound.png', o.title, o.endsAt, o.bids, o.seller.name, `/specificProduct.html?id=${o.id}`);
          ee.innerHTML += r.outerHTML;
        });
    } else {
      const h = await f.json();
      console.log(h);
    }
  } catch (f) {
    console.log(f);
  }
}
te();
const ne = 'user';
function se() {
  const d = ae(ne);
  return d || !1;
}
function ae(d) {
  const f = localStorage.getItem(d);
  return f || !1;
}
const ie = document.getElementById('navContainer'),
  re = document.getElementById('userLinks'),
  oe = document.getElementById('browse'),
  G = document.getElementById('navBarLinks'),
  Y = se(),
  C = document.createElement('a');
C.className = 'text-white list-none font-bold text-sm duration-200 hover:scale-110 uppercase';
C.innerText = 'MAKE A LIST';
C.href = 'dashboard/makeAList.html';
const w = document.createElement('a');
w.className = 'text-white list-none font-bold text-sm duration-200 hover:scale-110 uppercase';
w.innerText = 'Dashboard';
w.href = 'dashboard/dashboard.html';
const J = document.createElement('div');
J.className = 'flex flex-col';
J.innerHTML = `<p class="text-primaryWhite-0 text-[15px] tracking-wider">${Y}</p>
 <a href="/dashboard/dashboard.html" class="font-light text-primaryWhite-0 text-[10px]">View Profile</a>
</div>`;
const K = document.createElement('div');
K.className = 'h-8 w-8 bg-gray-100 rounded-full flex justify-center items-center';
K.innerHTML = '<img class="rounded-full h-5 w-4" src="/img/png/Profile.png"/>';
const T = document.createElement('div');
T.className = 'flex gap-2';
T.prepend(J);
T.append(K);
window.location.href.includes('/dashboard/') && ((C.href = 'makeAList.html'), (oe.href = '../listings.html'), (w.href = 'dashboard.html'));
const ue = document.querySelectorAll('.dashboardLink');
ue.forEach((d) => {
  window.location.href.includes(d.href) && d.classList.add('active');
});
function le() {
  Y && (G.prepend(w), G.prepend(C), (re.innerHTML = ''), ie.append(T));
}
le();
const S = document.getElementById('menu-btn'),
  V = document.getElementById('dropdownNav');
S.addEventListener('click', () => {
  V.classList.toggle('h-0'), V.classList.toggle('activeDropdown'), S.classList.toggle('activeMenu');
});
var ce = typeof globalThis < 'u' ? globalThis : typeof window < 'u' ? window : typeof global < 'u' ? global : typeof self < 'u' ? self : {};
function pe(d) {
  return d && d.__esModule && Object.prototype.hasOwnProperty.call(d, 'default') ? d.default : d;
}
var Q = { exports: {} };
/*!
 *
 *   typed.js - A JavaScript Typing Animation Library
 *   Author: Matt Boldt <me@mattboldt.com>
 *   Version: v2.0.12
 *   Url: https://github.com/mattboldt/typed.js
 *   License(s): MIT
 *
 */ (function (d, f) {
  (function (o, r) {
    d.exports = r();
  })(ce, function () {
    return (function (h) {
      var o = {};
      function r(i) {
        if (o[i]) return o[i].exports;
        var l = (o[i] = { exports: {}, id: i, loaded: !1 });
        return h[i].call(l.exports, l, l.exports, r), (l.loaded = !0), l.exports;
      }
      return (r.m = h), (r.c = o), (r.p = ''), r(0);
    })([
      function (h, o, r) {
        Object.defineProperty(o, '__esModule', { value: !0 });
        var i = (function () {
          function c(a, t) {
            for (var s = 0; s < t.length; s++) {
              var n = t[s];
              (n.enumerable = n.enumerable || !1), (n.configurable = !0), 'value' in n && (n.writable = !0), Object.defineProperty(a, n.key, n);
            }
          }
          return function (a, t, s) {
            return t && c(a.prototype, t), s && c(a, s), a;
          };
        })();
        function l(c, a) {
          if (!(c instanceof a)) throw new TypeError('Cannot call a class as a function');
        }
        var v = r(1),
          y = r(3),
          g = (function () {
            function c(a, t) {
              l(this, c), v.initializer.load(this, t, a), this.begin();
            }
            return (
              i(c, [
                {
                  key: 'toggle',
                  value: function () {
                    this.pause.status ? this.start() : this.stop();
                  },
                },
                {
                  key: 'stop',
                  value: function () {
                    this.typingComplete || this.pause.status || (this.toggleBlinking(!0), (this.pause.status = !0), this.options.onStop(this.arrayPos, this));
                  },
                },
                {
                  key: 'start',
                  value: function () {
                    this.typingComplete ||
                      !this.pause.status ||
                      ((this.pause.status = !1),
                      this.pause.typewrite ? this.typewrite(this.pause.curString, this.pause.curStrPos) : this.backspace(this.pause.curString, this.pause.curStrPos),
                      this.options.onStart(this.arrayPos, this));
                  },
                },
                {
                  key: 'destroy',
                  value: function () {
                    this.reset(!1), this.options.onDestroy(this);
                  },
                },
                {
                  key: 'reset',
                  value: function () {
                    var t = arguments.length <= 0 || arguments[0] === void 0 ? !0 : arguments[0];
                    clearInterval(this.timeout),
                      this.replaceText(''),
                      this.cursor && this.cursor.parentNode && (this.cursor.parentNode.removeChild(this.cursor), (this.cursor = null)),
                      (this.strPos = 0),
                      (this.arrayPos = 0),
                      (this.curLoop = 0),
                      t && (this.insertCursor(), this.options.onReset(this), this.begin());
                  },
                },
                {
                  key: 'begin',
                  value: function () {
                    var t = this;
                    this.options.onBegin(this),
                      (this.typingComplete = !1),
                      this.shuffleStringsIfNeeded(this),
                      this.insertCursor(),
                      this.bindInputFocusEvents && this.bindFocusEvents(),
                      (this.timeout = setTimeout(function () {
                        !t.currentElContent || t.currentElContent.length === 0 ? t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos) : t.backspace(t.currentElContent, t.currentElContent.length);
                      }, this.startDelay));
                  },
                },
                {
                  key: 'typewrite',
                  value: function (t, s) {
                    var n = this;
                    this.fadeOut && this.el.classList.contains(this.fadeOutClass) && (this.el.classList.remove(this.fadeOutClass), this.cursor && this.cursor.classList.remove(this.fadeOutClass));
                    var e = this.humanizer(this.typeSpeed),
                      u = 1;
                    if (this.pause.status === !0) {
                      this.setPauseStatus(t, s, !0);
                      return;
                    }
                    this.timeout = setTimeout(function () {
                      s = y.htmlParser.typeHtmlChars(t, s, n);
                      var p = 0,
                        m = t.substr(s);
                      if (m.charAt(0) === '^' && /^\^\d+/.test(m)) {
                        var k = 1;
                        (m = /\d+/.exec(m)[0]),
                          (k += m.length),
                          (p = parseInt(m)),
                          (n.temporaryPause = !0),
                          n.options.onTypingPaused(n.arrayPos, n),
                          (t = t.substring(0, s) + t.substring(s + k)),
                          n.toggleBlinking(!0);
                      }
                      if (m.charAt(0) === '`') {
                        for (; t.substr(s + u).charAt(0) !== '`' && (u++, !(s + u > t.length)); );
                        var b = t.substring(0, s),
                          L = t.substring(b.length + 1, s + u),
                          N = t.substring(s + u + 1);
                        (t = b + L + N), u--;
                      }
                      n.timeout = setTimeout(function () {
                        n.toggleBlinking(!1), s >= t.length ? n.doneTyping(t, s) : n.keepTyping(t, s, u), n.temporaryPause && ((n.temporaryPause = !1), n.options.onTypingResumed(n.arrayPos, n));
                      }, p);
                    }, e);
                  },
                },
                {
                  key: 'keepTyping',
                  value: function (t, s, n) {
                    s === 0 && (this.toggleBlinking(!1), this.options.preStringTyped(this.arrayPos, this)), (s += n);
                    var e = t.substr(0, s);
                    this.replaceText(e), this.typewrite(t, s);
                  },
                },
                {
                  key: 'doneTyping',
                  value: function (t, s) {
                    var n = this;
                    this.options.onStringTyped(this.arrayPos, this),
                      this.toggleBlinking(!0),
                      !(this.arrayPos === this.strings.length - 1 && (this.complete(), this.loop === !1 || this.curLoop === this.loopCount)) &&
                        (this.timeout = setTimeout(function () {
                          n.backspace(t, s);
                        }, this.backDelay));
                  },
                },
                {
                  key: 'backspace',
                  value: function (t, s) {
                    var n = this;
                    if (this.pause.status === !0) {
                      this.setPauseStatus(t, s, !1);
                      return;
                    }
                    if (this.fadeOut) return this.initFadeOut();
                    this.toggleBlinking(!1);
                    var e = this.humanizer(this.backSpeed);
                    this.timeout = setTimeout(function () {
                      s = y.htmlParser.backSpaceHtmlChars(t, s, n);
                      var u = t.substr(0, s);
                      if ((n.replaceText(u), n.smartBackspace)) {
                        var p = n.strings[n.arrayPos + 1];
                        p && u === p.substr(0, s) ? (n.stopNum = s) : (n.stopNum = 0);
                      }
                      s > n.stopNum
                        ? (s--, n.backspace(t, s))
                        : s <= n.stopNum &&
                          (n.arrayPos++,
                          n.arrayPos === n.strings.length
                            ? ((n.arrayPos = 0), n.options.onLastStringBackspaced(), n.shuffleStringsIfNeeded(), n.begin())
                            : n.typewrite(n.strings[n.sequence[n.arrayPos]], s));
                    }, e);
                  },
                },
                {
                  key: 'complete',
                  value: function () {
                    this.options.onComplete(this), this.loop ? this.curLoop++ : (this.typingComplete = !0);
                  },
                },
                {
                  key: 'setPauseStatus',
                  value: function (t, s, n) {
                    (this.pause.typewrite = n), (this.pause.curString = t), (this.pause.curStrPos = s);
                  },
                },
                {
                  key: 'toggleBlinking',
                  value: function (t) {
                    !this.cursor ||
                      this.pause.status ||
                      (this.cursorBlinking !== t && ((this.cursorBlinking = t), t ? this.cursor.classList.add('typed-cursor--blink') : this.cursor.classList.remove('typed-cursor--blink')));
                  },
                },
                {
                  key: 'humanizer',
                  value: function (t) {
                    return Math.round((Math.random() * t) / 2) + t;
                  },
                },
                {
                  key: 'shuffleStringsIfNeeded',
                  value: function () {
                    !this.shuffle ||
                      (this.sequence = this.sequence.sort(function () {
                        return Math.random() - 0.5;
                      }));
                  },
                },
                {
                  key: 'initFadeOut',
                  value: function () {
                    var t = this;
                    return (
                      (this.el.className += ' ' + this.fadeOutClass),
                      this.cursor && (this.cursor.className += ' ' + this.fadeOutClass),
                      setTimeout(function () {
                        t.arrayPos++, t.replaceText(''), t.strings.length > t.arrayPos ? t.typewrite(t.strings[t.sequence[t.arrayPos]], 0) : (t.typewrite(t.strings[0], 0), (t.arrayPos = 0));
                      }, this.fadeOutDelay)
                    );
                  },
                },
                {
                  key: 'replaceText',
                  value: function (t) {
                    this.attr ? this.el.setAttribute(this.attr, t) : this.isInput ? (this.el.value = t) : this.contentType === 'html' ? (this.el.innerHTML = t) : (this.el.textContent = t);
                  },
                },
                {
                  key: 'bindFocusEvents',
                  value: function () {
                    var t = this;
                    !this.isInput ||
                      (this.el.addEventListener('focus', function (s) {
                        t.stop();
                      }),
                      this.el.addEventListener('blur', function (s) {
                        (t.el.value && t.el.value.length !== 0) || t.start();
                      }));
                  },
                },
                {
                  key: 'insertCursor',
                  value: function () {
                    !this.showCursor ||
                      this.cursor ||
                      ((this.cursor = document.createElement('span')),
                      (this.cursor.className = 'typed-cursor'),
                      this.cursor.setAttribute('aria-hidden', !0),
                      (this.cursor.innerHTML = this.cursorChar),
                      this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling));
                  },
                },
              ]),
              c
            );
          })();
        (o.default = g), (h.exports = o.default);
      },
      function (h, o, r) {
        Object.defineProperty(o, '__esModule', { value: !0 });
        var i =
            Object.assign ||
            function (s) {
              for (var n = 1; n < arguments.length; n++) {
                var e = arguments[n];
                for (var u in e) Object.prototype.hasOwnProperty.call(e, u) && (s[u] = e[u]);
              }
              return s;
            },
          l = (function () {
            function s(n, e) {
              for (var u = 0; u < e.length; u++) {
                var p = e[u];
                (p.enumerable = p.enumerable || !1), (p.configurable = !0), 'value' in p && (p.writable = !0), Object.defineProperty(n, p.key, p);
              }
            }
            return function (n, e, u) {
              return e && s(n.prototype, e), u && s(n, u), n;
            };
          })();
        function v(s) {
          return s && s.__esModule ? s : { default: s };
        }
        function y(s, n) {
          if (!(s instanceof n)) throw new TypeError('Cannot call a class as a function');
        }
        var g = r(2),
          c = v(g),
          a = (function () {
            function s() {
              y(this, s);
            }
            return (
              l(s, [
                {
                  key: 'load',
                  value: function (e, u, p) {
                    if (
                      (typeof p == 'string' ? (e.el = document.querySelector(p)) : (e.el = p),
                      (e.options = i({}, c.default, u)),
                      (e.isInput = e.el.tagName.toLowerCase() === 'input'),
                      (e.attr = e.options.attr),
                      (e.bindInputFocusEvents = e.options.bindInputFocusEvents),
                      (e.showCursor = e.isInput ? !1 : e.options.showCursor),
                      (e.cursorChar = e.options.cursorChar),
                      (e.cursorBlinking = !0),
                      (e.elContent = e.attr ? e.el.getAttribute(e.attr) : e.el.textContent),
                      (e.contentType = e.options.contentType),
                      (e.typeSpeed = e.options.typeSpeed),
                      (e.startDelay = e.options.startDelay),
                      (e.backSpeed = e.options.backSpeed),
                      (e.smartBackspace = e.options.smartBackspace),
                      (e.backDelay = e.options.backDelay),
                      (e.fadeOut = e.options.fadeOut),
                      (e.fadeOutClass = e.options.fadeOutClass),
                      (e.fadeOutDelay = e.options.fadeOutDelay),
                      (e.isPaused = !1),
                      (e.strings = e.options.strings.map(function (N) {
                        return N.trim();
                      })),
                      typeof e.options.stringsElement == 'string' ? (e.stringsElement = document.querySelector(e.options.stringsElement)) : (e.stringsElement = e.options.stringsElement),
                      e.stringsElement)
                    ) {
                      (e.strings = []), (e.stringsElement.style.display = 'none');
                      var m = Array.prototype.slice.apply(e.stringsElement.children),
                        k = m.length;
                      if (k)
                        for (var b = 0; b < k; b += 1) {
                          var L = m[b];
                          e.strings.push(L.innerHTML.trim());
                        }
                    }
                    (e.strPos = 0),
                      (e.arrayPos = 0),
                      (e.stopNum = 0),
                      (e.loop = e.options.loop),
                      (e.loopCount = e.options.loopCount),
                      (e.curLoop = 0),
                      (e.shuffle = e.options.shuffle),
                      (e.sequence = []),
                      (e.pause = { status: !1, typewrite: !0, curString: '', curStrPos: 0 }),
                      (e.typingComplete = !1);
                    for (var b in e.strings) e.sequence[b] = b;
                    (e.currentElContent = this.getCurrentElContent(e)), (e.autoInsertCss = e.options.autoInsertCss), this.appendAnimationCss(e);
                  },
                },
                {
                  key: 'getCurrentElContent',
                  value: function (e) {
                    var u = '';
                    return e.attr ? (u = e.el.getAttribute(e.attr)) : e.isInput ? (u = e.el.value) : e.contentType === 'html' ? (u = e.el.innerHTML) : (u = e.el.textContent), u;
                  },
                },
                {
                  key: 'appendAnimationCss',
                  value: function (e) {
                    var u = 'data-typed-js-css';
                    if (!!e.autoInsertCss && !(!e.showCursor && !e.fadeOut) && !document.querySelector('[' + u + ']')) {
                      var p = document.createElement('style');
                      (p.type = 'text/css'), p.setAttribute(u, !0);
                      var m = '';
                      e.showCursor &&
                        (m += `
        .typed-cursor{
          opacity: 1;
        }
        .typed-cursor.typed-cursor--blink{
          animation: typedjsBlink 0.7s infinite;
          -webkit-animation: typedjsBlink 0.7s infinite;
                  animation: typedjsBlink 0.7s infinite;
        }
        @keyframes typedjsBlink{
          50% { opacity: 0.0; }
        }
        @-webkit-keyframes typedjsBlink{
          0% { opacity: 1; }
          50% { opacity: 0.0; }
          100% { opacity: 1; }
        }
      `),
                        e.fadeOut &&
                          (m += `
        .typed-fade-out{
          opacity: 0;
          transition: opacity .25s;
        }
        .typed-cursor.typed-cursor--blink.typed-fade-out{
          -webkit-animation: 0;
          animation: 0;
        }
      `),
                        p.length !== 0 && ((p.innerHTML = m), document.body.appendChild(p));
                    }
                  },
                },
              ]),
              s
            );
          })();
        o.default = a;
        var t = new a();
        o.initializer = t;
      },
      function (h, o) {
        Object.defineProperty(o, '__esModule', { value: !0 });
        var r = {
          strings: ['These are the default values...', 'You know what you should do?', 'Use your own!', 'Have a great day!'],
          stringsElement: null,
          typeSpeed: 0,
          startDelay: 0,
          backSpeed: 0,
          smartBackspace: !0,
          shuffle: !1,
          backDelay: 700,
          fadeOut: !1,
          fadeOutClass: 'typed-fade-out',
          fadeOutDelay: 500,
          loop: !1,
          loopCount: 1 / 0,
          showCursor: !0,
          cursorChar: '|',
          autoInsertCss: !0,
          attr: null,
          bindInputFocusEvents: !1,
          contentType: 'html',
          onBegin: function (l) {},
          onComplete: function (l) {},
          preStringTyped: function (l, v) {},
          onStringTyped: function (l, v) {},
          onLastStringBackspaced: function (l) {},
          onTypingPaused: function (l, v) {},
          onTypingResumed: function (l, v) {},
          onReset: function (l) {},
          onStop: function (l, v) {},
          onStart: function (l, v) {},
          onDestroy: function (l) {},
        };
        (o.default = r), (h.exports = o.default);
      },
      function (h, o) {
        Object.defineProperty(o, '__esModule', { value: !0 });
        var r = (function () {
          function y(g, c) {
            for (var a = 0; a < c.length; a++) {
              var t = c[a];
              (t.enumerable = t.enumerable || !1), (t.configurable = !0), 'value' in t && (t.writable = !0), Object.defineProperty(g, t.key, t);
            }
          }
          return function (g, c, a) {
            return c && y(g.prototype, c), a && y(g, a), g;
          };
        })();
        function i(y, g) {
          if (!(y instanceof g)) throw new TypeError('Cannot call a class as a function');
        }
        var l = (function () {
          function y() {
            i(this, y);
          }
          return (
            r(y, [
              {
                key: 'typeHtmlChars',
                value: function (c, a, t) {
                  if (t.contentType !== 'html') return a;
                  var s = c.substr(a).charAt(0);
                  if (s === '<' || s === '&') {
                    var n = '';
                    for (s === '<' ? (n = '>') : (n = ';'); c.substr(a + 1).charAt(0) !== n && (a++, !(a + 1 > c.length)); );
                    a++;
                  }
                  return a;
                },
              },
              {
                key: 'backSpaceHtmlChars',
                value: function (c, a, t) {
                  if (t.contentType !== 'html') return a;
                  var s = c.substr(a).charAt(0);
                  if (s === '>' || s === ';') {
                    var n = '';
                    for (s === '>' ? (n = '<') : (n = '&'); c.substr(a - 1).charAt(0) !== n && (a--, !(a < 0)); );
                    a--;
                  }
                  return a;
                },
              },
            ]),
            y
          );
        })();
        o.default = l;
        var v = new l();
        o.htmlParser = v;
      },
    ]);
  });
})(Q);
const de = pe(Q.exports);
document.querySelector('.auto-typed');
new de('.auto-type', { strings: ['ART ^1200', 'CAR ^1200', 'CHAIR ^1200', 'BIKE ^1200', 'BAG ^1200', 'BOAT ^1200', 'WINE ^1200'], typeSpeed: 50, backSpeed: 50, loop: !0, cursorChar: '' });
