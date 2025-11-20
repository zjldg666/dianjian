if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const ON_LOAD = "onLoad";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const createLifeCycleHook = (lifecycle, flag = 0) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createLifeCycleHook(
    ON_LOAD,
    2
    /* HookFlags.PAGE */
  );
  const _imports_0$3 = "/static/logo.png";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$f = {
    props: {
      username: {
        type: String,
        default: null
        // 设置默认值为null，便于判断
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "navbar" }, [
      vue.createElementVNode("view", { class: "logoBox" }, [
        vue.createElementVNode("image", {
          class: "logo",
          src: _imports_0$3,
          mode: "heightFix"
        })
      ]),
      $props.username ? (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 0 },
        [
          vue.createElementVNode(
            "view",
            { class: "username" },
            vue.toDisplayString($props.username),
            1
            /* TEXT */
          ),
          vue.createElementVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("logout")),
            class: "nabutton"
          }, "退出")
        ],
        64
        /* STABLE_FRAGMENT */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__scopeId", "data-v-35616072"], ["__file", "D:/Project/HBuilderProjects/dianjianHmS/dianjian02/components/Navbar.vue"]]);
  const pages = [
    {
      path: "pages/login/login",
      style: {
        navigationBarTitleText: "登陆"
      }
    },
    {
      path: "uni_modules/uni-upgrade-center-app/pages/upgrade-popup",
      style: {
        disableScroll: true,
        "app-plus": {
          backgroundColorTop: "transparent",
          background: "transparent",
          titleNView: false,
          scrollIndicator: false,
          popGesture: "none",
          animationType: "fade-in",
          animationDuration: 200
        }
      }
    },
    {
      path: "pages/inspection/inspection",
      style: {
        navigationBarTitleText: "所有点检",
        enablePullDownRefresh: true
      }
    },
    {
      path: "pages/home/home",
      style: {
        navigationBarTitleText: "主菜单"
      }
    },
    {
      path: "components/Navbar",
      style: {}
    },
    {
      path: "pages/project/project",
      style: {
        navigationBarTitleText: "点检项目",
        enablePullDownRefresh: true
      }
    },
    {
      path: "pages/Mydianjian/Mydianjian",
      style: {
        navigationBarTitleText: "我的点检"
      }
    },
    {
      path: "pages/remind/remind",
      style: {
        navigationBarTitleText: "缺失提醒"
      }
    },
    {
      path: "pages/YiChang/YiChang",
      style: {
        navigationBarTitleText: "异常处理"
      }
    },
    {
      path: "pages/report/report",
      style: {
        navigationBarTitleText: "简单报表"
      }
    },
    {
      path: "pages/detail/detail",
      style: {
        navigationBarTitleText: ""
      }
    },
    {
      path: "pages/result/result",
      style: {
        navigationBarTitleText: ""
      }
    }
  ];
  const globalStyle = {
    navigationBarTextStyle: "black",
    navigationBarTitleText: "uni-app",
    navigationBarBackgroundColor: "#F8F8F8",
    backgroundColor: "#F8F8F8"
  };
  const uniIdRouter = {};
  const condition = {
    current: 0,
    list: [
      {
        name: "",
        path: "",
        query: ""
      }
    ]
  };
  const e = {
    pages,
    globalStyle,
    uniIdRouter,
    condition
  };
  var define_process_env_UNI_SECURE_NETWORK_CONFIG_default = [];
  function t(e2) {
    return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
  }
  function n(e2, t2, n2) {
    return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
      return function() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(null == t3 && n2.path);
    } }, n2.exports), n2.exports;
  }
  var s = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = n2 || function(e3, t3) {
      var n3 = Object.create || /* @__PURE__ */ function() {
        function e4() {
        }
        return function(t4) {
          var n4;
          return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
        };
      }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e4) {
        var t4 = n3(this);
        return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
          t4.$super.init.apply(this, arguments);
        }), t4.init.prototype = t4, t4.$super = this, t4;
      }, create: function() {
        var e4 = this.extend();
        return e4.init.apply(e4, arguments), e4;
      }, init: function() {
      }, mixIn: function(e4) {
        for (var t4 in e4)
          e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
        e4.hasOwnProperty("toString") && (this.toString = e4.toString);
      }, clone: function() {
        return this.init.prototype.extend(this);
      } }, o2 = r2.WordArray = i2.extend({ init: function(e4, n4) {
        e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
      }, toString: function(e4) {
        return (e4 || c2).stringify(this);
      }, concat: function(e4) {
        var t4 = this.words, n4 = e4.words, s3 = this.sigBytes, r3 = e4.sigBytes;
        if (this.clamp(), s3 % 4)
          for (var i3 = 0; i3 < r3; i3++) {
            var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
            t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
          }
        else
          for (i3 = 0; i3 < r3; i3 += 4)
            t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
        return this.sigBytes += r3, this;
      }, clamp: function() {
        var t4 = this.words, n4 = this.sigBytes;
        t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4.words = this.words.slice(0), e4;
      }, random: function(t4) {
        for (var n4, s3 = [], r3 = function(t5) {
          var n5 = 987654321, s4 = 4294967295;
          return function() {
            var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
            return r4 /= 4294967296, (r4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
          };
        }, i3 = 0; i3 < t4; i3 += 4) {
          var a3 = r3(4294967296 * (n4 || e3.random()));
          n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
        }
        return new o2.init(s3, t4);
      } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e4) {
        for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
        }
        return s3.join("");
      }, parse: function(e4) {
        for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
          n4[s3 >>> 3] |= parseInt(e4.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
        return new o2.init(n4, t4 / 2);
      } }, u2 = a2.Latin1 = { stringify: function(e4) {
        for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push(String.fromCharCode(i3));
        }
        return s3.join("");
      }, parse: function(e4) {
        for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3++)
          n4[s3 >>> 2] |= (255 & e4.charCodeAt(s3)) << 24 - s3 % 4 * 8;
        return new o2.init(n4, t4);
      } }, h2 = a2.Utf8 = { stringify: function(e4) {
        try {
          return decodeURIComponent(escape(u2.stringify(e4)));
        } catch (e5) {
          throw new Error("Malformed UTF-8 data");
        }
      }, parse: function(e4) {
        return u2.parse(unescape(encodeURIComponent(e4)));
      } }, l2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
        this._data = new o2.init(), this._nDataBytes = 0;
      }, _append: function(e4) {
        "string" == typeof e4 && (e4 = h2.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
      }, _process: function(t4) {
        var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e3.ceil(a3) : e3.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e3.min(4 * c3, r3);
        if (c3) {
          for (var h3 = 0; h3 < c3; h3 += i3)
            this._doProcessBlock(s3, h3);
          var l3 = s3.splice(0, c3);
          n4.sigBytes -= u3;
        }
        return new o2.init(l3, u3);
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._data = this._data.clone(), e4;
      }, _minBufferSize: 0 });
      r2.Hasher = l2.extend({ cfg: i2.extend(), init: function(e4) {
        this.cfg = this.cfg.extend(e4), this.reset();
      }, reset: function() {
        l2.reset.call(this), this._doReset();
      }, update: function(e4) {
        return this._append(e4), this._process(), this;
      }, finalize: function(e4) {
        return e4 && this._append(e4), this._doFinalize();
      }, blockSize: 16, _createHelper: function(e4) {
        return function(t4, n4) {
          return new e4.init(n4).finalize(t4);
        };
      }, _createHmacHelper: function(e4) {
        return function(t4, n4) {
          return new d2.HMAC.init(e4, n4).finalize(t4);
        };
      } });
      var d2 = s2.algo = {};
      return s2;
    }(Math), n2);
  }), r = s, i = (n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function(e3) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
      !function() {
        for (var t4 = 0; t4 < 64; t4++)
          a2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
      }();
      var c2 = o2.MD5 = i2.extend({ _doReset: function() {
        this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
      }, _doProcessBlock: function(e4, t4) {
        for (var n3 = 0; n3 < 16; n3++) {
          var s3 = t4 + n3, r3 = e4[s3];
          e4[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
        }
        var i3 = this._hash.words, o3 = e4[t4 + 0], c3 = e4[t4 + 1], p2 = e4[t4 + 2], f2 = e4[t4 + 3], g2 = e4[t4 + 4], m2 = e4[t4 + 5], y2 = e4[t4 + 6], _2 = e4[t4 + 7], w2 = e4[t4 + 8], I2 = e4[t4 + 9], v2 = e4[t4 + 10], S2 = e4[t4 + 11], T2 = e4[t4 + 12], b2 = e4[t4 + 13], E2 = e4[t4 + 14], k2 = e4[t4 + 15], A2 = i3[0], P2 = i3[1], C2 = i3[2], O2 = i3[3];
        A2 = u2(A2, P2, C2, O2, o3, 7, a2[0]), O2 = u2(O2, A2, P2, C2, c3, 12, a2[1]), C2 = u2(C2, O2, A2, P2, p2, 17, a2[2]), P2 = u2(P2, C2, O2, A2, f2, 22, a2[3]), A2 = u2(A2, P2, C2, O2, g2, 7, a2[4]), O2 = u2(O2, A2, P2, C2, m2, 12, a2[5]), C2 = u2(C2, O2, A2, P2, y2, 17, a2[6]), P2 = u2(P2, C2, O2, A2, _2, 22, a2[7]), A2 = u2(A2, P2, C2, O2, w2, 7, a2[8]), O2 = u2(O2, A2, P2, C2, I2, 12, a2[9]), C2 = u2(C2, O2, A2, P2, v2, 17, a2[10]), P2 = u2(P2, C2, O2, A2, S2, 22, a2[11]), A2 = u2(A2, P2, C2, O2, T2, 7, a2[12]), O2 = u2(O2, A2, P2, C2, b2, 12, a2[13]), C2 = u2(C2, O2, A2, P2, E2, 17, a2[14]), A2 = h2(A2, P2 = u2(P2, C2, O2, A2, k2, 22, a2[15]), C2, O2, c3, 5, a2[16]), O2 = h2(O2, A2, P2, C2, y2, 9, a2[17]), C2 = h2(C2, O2, A2, P2, S2, 14, a2[18]), P2 = h2(P2, C2, O2, A2, o3, 20, a2[19]), A2 = h2(A2, P2, C2, O2, m2, 5, a2[20]), O2 = h2(O2, A2, P2, C2, v2, 9, a2[21]), C2 = h2(C2, O2, A2, P2, k2, 14, a2[22]), P2 = h2(P2, C2, O2, A2, g2, 20, a2[23]), A2 = h2(A2, P2, C2, O2, I2, 5, a2[24]), O2 = h2(O2, A2, P2, C2, E2, 9, a2[25]), C2 = h2(C2, O2, A2, P2, f2, 14, a2[26]), P2 = h2(P2, C2, O2, A2, w2, 20, a2[27]), A2 = h2(A2, P2, C2, O2, b2, 5, a2[28]), O2 = h2(O2, A2, P2, C2, p2, 9, a2[29]), C2 = h2(C2, O2, A2, P2, _2, 14, a2[30]), A2 = l2(A2, P2 = h2(P2, C2, O2, A2, T2, 20, a2[31]), C2, O2, m2, 4, a2[32]), O2 = l2(O2, A2, P2, C2, w2, 11, a2[33]), C2 = l2(C2, O2, A2, P2, S2, 16, a2[34]), P2 = l2(P2, C2, O2, A2, E2, 23, a2[35]), A2 = l2(A2, P2, C2, O2, c3, 4, a2[36]), O2 = l2(O2, A2, P2, C2, g2, 11, a2[37]), C2 = l2(C2, O2, A2, P2, _2, 16, a2[38]), P2 = l2(P2, C2, O2, A2, v2, 23, a2[39]), A2 = l2(A2, P2, C2, O2, b2, 4, a2[40]), O2 = l2(O2, A2, P2, C2, o3, 11, a2[41]), C2 = l2(C2, O2, A2, P2, f2, 16, a2[42]), P2 = l2(P2, C2, O2, A2, y2, 23, a2[43]), A2 = l2(A2, P2, C2, O2, I2, 4, a2[44]), O2 = l2(O2, A2, P2, C2, T2, 11, a2[45]), C2 = l2(C2, O2, A2, P2, k2, 16, a2[46]), A2 = d2(A2, P2 = l2(P2, C2, O2, A2, p2, 23, a2[47]), C2, O2, o3, 6, a2[48]), O2 = d2(O2, A2, P2, C2, _2, 10, a2[49]), C2 = d2(C2, O2, A2, P2, E2, 15, a2[50]), P2 = d2(P2, C2, O2, A2, m2, 21, a2[51]), A2 = d2(A2, P2, C2, O2, T2, 6, a2[52]), O2 = d2(O2, A2, P2, C2, f2, 10, a2[53]), C2 = d2(C2, O2, A2, P2, v2, 15, a2[54]), P2 = d2(P2, C2, O2, A2, c3, 21, a2[55]), A2 = d2(A2, P2, C2, O2, w2, 6, a2[56]), O2 = d2(O2, A2, P2, C2, k2, 10, a2[57]), C2 = d2(C2, O2, A2, P2, y2, 15, a2[58]), P2 = d2(P2, C2, O2, A2, b2, 21, a2[59]), A2 = d2(A2, P2, C2, O2, g2, 6, a2[60]), O2 = d2(O2, A2, P2, C2, S2, 10, a2[61]), C2 = d2(C2, O2, A2, P2, p2, 15, a2[62]), P2 = d2(P2, C2, O2, A2, I2, 21, a2[63]), i3[0] = i3[0] + A2 | 0, i3[1] = i3[1] + P2 | 0, i3[2] = i3[2] + C2 | 0, i3[3] = i3[3] + O2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
        var i3 = e3.floor(s3 / 4294967296), o3 = s3;
        n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
        for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
          var h3 = c3[u3];
          c3[u3] = 16711935 & (h3 << 8 | h3 >>> 24) | 4278255360 & (h3 << 24 | h3 >>> 8);
        }
        return a3;
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._hash = this._hash.clone(), e4;
      } });
      function u2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 & n3 | ~t4 & s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function h2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 & s3 | n3 & ~s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function l2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 ^ n3 ^ s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function d2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (n3 ^ (t4 | ~s3)) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
    }(Math), n2.MD5);
  }), n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, void function() {
      var e3 = n2, t3 = e3.lib.Base, s2 = e3.enc.Utf8;
      e3.algo.HMAC = t3.extend({ init: function(e4, t4) {
        e4 = this._hasher = new e4.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
        var n3 = e4.blockSize, r2 = 4 * n3;
        t4.sigBytes > r2 && (t4 = e4.finalize(t4)), t4.clamp();
        for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
          a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
        i2.sigBytes = o2.sigBytes = r2, this.reset();
      }, reset: function() {
        var e4 = this._hasher;
        e4.reset(), e4.update(this._iKey);
      }, update: function(e4) {
        return this._hasher.update(e4), this;
      }, finalize: function(e4) {
        var t4 = this._hasher, n3 = t4.finalize(e4);
        return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
      } });
    }());
  }), n(function(e2, t2) {
    e2.exports = r.HmacMD5;
  })), o = n(function(e2, t2) {
    e2.exports = r.enc.Utf8;
  }), a = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function() {
      var e3 = n2, t3 = e3.lib.WordArray;
      function s2(e4, n3, s3) {
        for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
          if (o2 % 4) {
            var a2 = s3[e4.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e4.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
            r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
          }
        return t3.create(r2, i2);
      }
      e3.enc.Base64 = { stringify: function(e4) {
        var t4 = e4.words, n3 = e4.sigBytes, s3 = this._map;
        e4.clamp();
        for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
          for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
            r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
        var c2 = s3.charAt(64);
        if (c2)
          for (; r2.length % 4; )
            r2.push(c2);
        return r2.join("");
      }, parse: function(e4) {
        var t4 = e4.length, n3 = this._map, r2 = this._reverseMap;
        if (!r2) {
          r2 = this._reverseMap = [];
          for (var i2 = 0; i2 < n3.length; i2++)
            r2[n3.charCodeAt(i2)] = i2;
        }
        var o2 = n3.charAt(64);
        if (o2) {
          var a2 = e4.indexOf(o2);
          -1 !== a2 && (t4 = a2);
        }
        return s2(e4, t4, r2);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
    }(), n2.enc.Base64);
  });
  const c = "uni_id_token", u = "uni_id_token_expired", h = "uniIdToken", l = { DEFAULT: "FUNCTION", FUNCTION: "FUNCTION", OBJECT: "OBJECT", CLIENT_DB: "CLIENT_DB" }, d = "pending", p = "fulfilled", f = "rejected";
  function g(e2) {
    return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
  }
  function m(e2) {
    return "object" === g(e2);
  }
  function y(e2) {
    return "function" == typeof e2;
  }
  function _(e2) {
    return function() {
      try {
        return e2.apply(e2, arguments);
      } catch (e3) {
        console.error(e3);
      }
    };
  }
  const w = "REJECTED", I = "NOT_PENDING";
  class v {
    constructor({ createPromise: e2, retryRule: t2 = w } = {}) {
      this.createPromise = e2, this.status = null, this.promise = null, this.retryRule = t2;
    }
    get needRetry() {
      if (!this.status)
        return true;
      switch (this.retryRule) {
        case w:
          return this.status === f;
        case I:
          return this.status !== d;
      }
    }
    exec() {
      return this.needRetry ? (this.status = d, this.promise = this.createPromise().then((e2) => (this.status = p, Promise.resolve(e2)), (e2) => (this.status = f, Promise.reject(e2))), this.promise) : this.promise;
    }
  }
  class S {
    constructor() {
      this._callback = {};
    }
    addListener(e2, t2) {
      this._callback[e2] || (this._callback[e2] = []), this._callback[e2].push(t2);
    }
    on(e2, t2) {
      return this.addListener(e2, t2);
    }
    removeListener(e2, t2) {
      if (!t2)
        throw new Error('The "listener" argument must be of type function. Received undefined');
      const n2 = this._callback[e2];
      if (!n2)
        return;
      const s2 = function(e3, t3) {
        for (let n3 = e3.length - 1; n3 >= 0; n3--)
          if (e3[n3] === t3)
            return n3;
        return -1;
      }(n2, t2);
      n2.splice(s2, 1);
    }
    off(e2, t2) {
      return this.removeListener(e2, t2);
    }
    removeAllListener(e2) {
      delete this._callback[e2];
    }
    emit(e2, ...t2) {
      const n2 = this._callback[e2];
      if (n2)
        for (let e3 = 0; e3 < n2.length; e3++)
          n2[e3](...t2);
    }
  }
  function T(e2) {
    return e2 && "string" == typeof e2 ? JSON.parse(e2) : e2;
  }
  const b = true, E = "app", A = T(define_process_env_UNI_SECURE_NETWORK_CONFIG_default), P = E, C = T('{"address":["127.0.0.1","192.168.32.190","172.23.16.1"],"servePort":7000,"debugPort":9000,"initialLaunchType":"local","skipFiles":["<node_internals>/**","D:/Download/HBuilder-alpha/HBuilderX/plugins/unicloud/**/*.js"]}'), O = T('[{"provider":"aliyun","spaceName":"trial-awuk5azmufjd5e32a20","spaceId":"mp-5d066fc4-ca18-49c5-be6d-a83c0c93a331","clientSecret":"qYmJ0WZRhMb2jVDo7J2V3g==","endpoint":"https://api.next.bspapp.com"}]') || [];
  let N = "";
  try {
    N = "__UNI__BA092AD";
  } catch (e2) {
  }
  let R, L = {};
  function U(e2, t2 = {}) {
    var n2, s2;
    return n2 = L, s2 = e2, Object.prototype.hasOwnProperty.call(n2, s2) || (L[e2] = t2), L[e2];
  }
  function D() {
    return R || (R = function() {
      if ("undefined" != typeof globalThis)
        return globalThis;
      if ("undefined" != typeof self)
        return self;
      if ("undefined" != typeof window)
        return window;
      function e2() {
        return this;
      }
      return void 0 !== e2() ? e2() : new Function("return this")();
    }(), R);
  }
  L = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {};
  const M = ["invoke", "success", "fail", "complete"], q = U("_globalUniCloudInterceptor");
  function F(e2, t2) {
    q[e2] || (q[e2] = {}), m(t2) && Object.keys(t2).forEach((n2) => {
      M.indexOf(n2) > -1 && function(e3, t3, n3) {
        let s2 = q[e3][t3];
        s2 || (s2 = q[e3][t3] = []), -1 === s2.indexOf(n3) && y(n3) && s2.push(n3);
      }(e2, n2, t2[n2]);
    });
  }
  function K(e2, t2) {
    q[e2] || (q[e2] = {}), m(t2) ? Object.keys(t2).forEach((n2) => {
      M.indexOf(n2) > -1 && function(e3, t3, n3) {
        const s2 = q[e3][t3];
        if (!s2)
          return;
        const r2 = s2.indexOf(n3);
        r2 > -1 && s2.splice(r2, 1);
      }(e2, n2, t2[n2]);
    }) : delete q[e2];
  }
  function j(e2, t2) {
    return e2 && 0 !== e2.length ? e2.reduce((e3, n2) => e3.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
  }
  function $(e2, t2) {
    return q[e2] && q[e2][t2] || [];
  }
  function B(e2) {
    F("callObject", e2);
  }
  const W = U("_globalUniCloudListener"), H = { RESPONSE: "response", NEED_LOGIN: "needLogin", REFRESH_TOKEN: "refreshToken" }, J = { CLIENT_DB: "clientdb", CLOUD_FUNCTION: "cloudfunction", CLOUD_OBJECT: "cloudobject" };
  function z(e2) {
    return W[e2] || (W[e2] = []), W[e2];
  }
  function V(e2, t2) {
    const n2 = z(e2);
    n2.includes(t2) || n2.push(t2);
  }
  function G(e2, t2) {
    const n2 = z(e2), s2 = n2.indexOf(t2);
    -1 !== s2 && n2.splice(s2, 1);
  }
  function Y(e2, t2) {
    const n2 = z(e2);
    for (let e3 = 0; e3 < n2.length; e3++) {
      (0, n2[e3])(t2);
    }
  }
  let Q, X = false;
  function Z() {
    return Q || (Q = new Promise((e2) => {
      X && e2(), function t2() {
        if ("function" == typeof getCurrentPages) {
          const t3 = getCurrentPages();
          t3 && t3[0] && (X = true, e2());
        }
        X || setTimeout(() => {
          t2();
        }, 30);
      }();
    }), Q);
  }
  function ee(e2) {
    const t2 = {};
    for (const n2 in e2) {
      const s2 = e2[n2];
      y(s2) && (t2[n2] = _(s2));
    }
    return t2;
  }
  class te extends Error {
    constructor(e2) {
      const t2 = e2.message || e2.errMsg || "unknown system error";
      super(t2), this.errMsg = t2, this.code = this.errCode = e2.code || e2.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e2.subject || e2.errSubject, this.cause = e2.cause, this.requestId = e2.requestId;
    }
    toJson(e2 = 0) {
      if (!(e2 >= 10))
        return e2++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e2) : this.cause };
    }
  }
  var ne = { request: (e2) => uni.request(e2), uploadFile: (e2) => uni.uploadFile(e2), setStorageSync: (e2, t2) => uni.setStorageSync(e2, t2), getStorageSync: (e2) => uni.getStorageSync(e2), removeStorageSync: (e2) => uni.removeStorageSync(e2), clearStorageSync: () => uni.clearStorageSync(), connectSocket: (e2) => uni.connectSocket(e2) };
  function se(e2) {
    return e2 && se(e2.__v_raw) || e2;
  }
  function re() {
    return { token: ne.getStorageSync(c) || ne.getStorageSync(h), tokenExpired: ne.getStorageSync(u) };
  }
  function ie({ token: e2, tokenExpired: t2 } = {}) {
    e2 && ne.setStorageSync(c, e2), t2 && ne.setStorageSync(u, t2);
  }
  let oe, ae;
  function ce() {
    return oe || (oe = uni.getSystemInfoSync()), oe;
  }
  function ue() {
    let e2, t2;
    try {
      if (uni.getLaunchOptionsSync) {
        if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
          return;
        const { scene: n2, channel: s2 } = uni.getLaunchOptionsSync();
        e2 = s2, t2 = n2;
      }
    } catch (e3) {
    }
    return { channel: e2, scene: t2 };
  }
  let he = {};
  function le() {
    const e2 = uni.getLocale && uni.getLocale() || "en";
    if (ae)
      return { ...he, ...ae, locale: e2, LOCALE: e2 };
    const t2 = ce(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["appId", "appLanguage", "appName", "appVersion", "appVersionCode", "appWgtVersion", "browserName", "browserVersion", "deviceBrand", "deviceId", "deviceModel", "deviceType", "osName", "osVersion", "romName", "romVersion", "ua", "hostName", "hostVersion", "uniPlatform", "uniRuntimeVersion", "uniRuntimeVersionCode", "uniCompilerVersion", "uniCompilerVersionCode"];
    for (const e3 in t2)
      Object.hasOwnProperty.call(t2, e3) && -1 === o2.indexOf(e3) && delete t2[e3];
    return ae = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...ue(), ...t2 }, { ...he, ...ae, locale: e2, LOCALE: e2 };
  }
  var de = { sign: function(e2, t2) {
    let n2 = "";
    return Object.keys(e2).sort().forEach(function(t3) {
      e2[t3] && (n2 = n2 + "&" + t3 + "=" + e2[t3]);
    }), n2 = n2.slice(1), i(n2, t2).toString();
  }, wrappedRequest: function(e2, t2) {
    return new Promise((n2, s2) => {
      t2(Object.assign(e2, { complete(e3) {
        e3 || (e3 = {});
        const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
        if (!e3.statusCode || e3.statusCode >= 400) {
          const n3 = e3.data && e3.data.error && e3.data.error.code || "SYS_ERR", r3 = e3.data && e3.data.error && e3.data.error.message || e3.errMsg || "request:fail";
          return s2(new te({ code: n3, message: r3, requestId: t3 }));
        }
        const r2 = e3.data;
        if (r2.error)
          return s2(new te({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
        r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
      } }));
    });
  }, toBase64: function(e2) {
    return a.stringify(o.parse(e2));
  } };
  var pe = class {
    constructor(e2) {
      ["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), this.config = Object.assign({}, { endpoint: 0 === e2.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = ne, this._getAccessTokenPromiseHub = new v({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e3) => {
        if (!e3.result || !e3.result.accessToken)
          throw new te({ code: "AUTH_FAILED", message: "获取accessToken失败" });
        this.setAccessToken(e3.result.accessToken);
      }), retryRule: I });
    }
    get hasAccessToken() {
      return !!this.accessToken;
    }
    setAccessToken(e2) {
      this.accessToken = e2;
    }
    requestWrapped(e2) {
      return de.wrappedRequest(e2, this.adapter.request);
    }
    requestAuth(e2) {
      return this.requestWrapped(e2);
    }
    request(e2, t2) {
      return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e2) : this.requestWrapped(e2).catch((t3) => new Promise((e3, n2) => {
        !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e3();
      }).then(() => this.getAccessToken()).then(() => {
        const t4 = this.rebuildRequest(e2);
        return this.request(t4, true);
      })) : this.getAccessToken().then(() => {
        const t3 = this.rebuildRequest(e2);
        return this.request(t3, true);
      }));
    }
    rebuildRequest(e2) {
      const t2 = Object.assign({}, e2);
      return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = de.sign(t2.data, this.config.clientSecret), t2;
    }
    setupRequest(e2, t2) {
      const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = de.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
    }
    getAccessToken() {
      return this._getAccessTokenPromiseHub.exec();
    }
    async authorize() {
      await this.getAccessToken();
    }
    callFunction(e2) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
      return this.request({ ...this.setupRequest(t2), timeout: e2.timeout });
    }
    getOSSUploadOptionsFromPath(e2) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
      return this.request(this.setupRequest(t2));
    }
    uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
          e3 && e3.statusCode < 400 ? o2(e3) : a2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          a2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
          i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    reportOSSUpload(e2) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
      return this.request(this.setupRequest(t2));
    }
    async uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", cloudPathAsRealPath: s2 = false, onUploadProgress: r2, config: i2 }) {
      if ("string" !== g(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const o2 = i2 && i2.envType || this.config.envType;
      if (s2 && ("/" !== t2[0] && (t2 = "/" + t2), t2.indexOf("\\") > -1))
        throw new te({ code: "INVALID_PARAM", message: "使用cloudPath作为路径时，cloudPath不可包含“\\”" });
      const a2 = (await this.getOSSUploadOptionsFromPath({ env: o2, filename: s2 ? t2.split("/").pop() : t2, fileId: s2 ? t2 : void 0 })).result, c2 = "https://" + a2.cdnDomain + "/" + a2.ossPath, { securityToken: u2, accessKeyId: h2, signature: l2, host: d2, ossPath: p2, id: f2, policy: m2, ossCallbackUrl: y2 } = a2, _2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: h2, Signature: l2, host: d2, id: f2, key: p2, policy: m2, success_action_status: 200 };
      if (u2 && (_2["x-oss-security-token"] = u2), y2) {
        const e3 = JSON.stringify({ callbackUrl: y2, callbackBody: JSON.stringify({ fileId: f2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
        _2.callback = de.toBase64(e3);
      }
      const w2 = { url: "https://" + a2.host, formData: _2, fileName: "file", name: "file", filePath: e2, fileType: n2 };
      if (await this.uploadFileToOSS(Object.assign({}, w2, { onUploadProgress: r2 })), y2)
        return { success: true, filePath: e2, fileID: c2 };
      if ((await this.reportOSSUpload({ id: f2 })).success)
        return { success: true, filePath: e2, fileID: c2 };
      throw new te({ code: "UPLOAD_FAILED", message: "文件上传失败" });
    }
    getTempFileURL({ fileList: e2 } = {}) {
      return new Promise((t2, n2) => {
        Array.isArray(e2) && 0 !== e2.length || n2(new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), this.getFileInfo({ fileList: e2 }).then((n3) => {
          t2({ fileList: e2.map((e3, t3) => {
            const s2 = n3.fileList[t3];
            return { fileID: e3, tempFileURL: s2 && s2.url || e3 };
          }) });
        });
      });
    }
    async getFileInfo({ fileList: e2 } = {}) {
      if (!Array.isArray(e2) || 0 === e2.length)
        throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e2.map((e3) => e3.split("?")[0]).join(",") }) };
      return { fileList: (await this.request(this.setupRequest(t2))).result };
    }
  };
  var fe = { init(e2) {
    const t2 = new pe(e2), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  const ge = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
  var me;
  !function(e2) {
    e2.local = "local", e2.none = "none", e2.session = "session";
  }(me || (me = {}));
  var ye = function() {
  }, _e = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function(e3) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [], c2 = [];
      !function() {
        function t4(t5) {
          for (var n4 = e3.sqrt(t5), s4 = 2; s4 <= n4; s4++)
            if (!(t5 % s4))
              return false;
          return true;
        }
        function n3(e4) {
          return 4294967296 * (e4 - (0 | e4)) | 0;
        }
        for (var s3 = 2, r3 = 0; r3 < 64; )
          t4(s3) && (r3 < 8 && (a2[r3] = n3(e3.pow(s3, 0.5))), c2[r3] = n3(e3.pow(s3, 1 / 3)), r3++), s3++;
      }();
      var u2 = [], h2 = o2.SHA256 = i2.extend({ _doReset: function() {
        this._hash = new r2.init(a2.slice(0));
      }, _doProcessBlock: function(e4, t4) {
        for (var n3 = this._hash.words, s3 = n3[0], r3 = n3[1], i3 = n3[2], o3 = n3[3], a3 = n3[4], h3 = n3[5], l2 = n3[6], d2 = n3[7], p2 = 0; p2 < 64; p2++) {
          if (p2 < 16)
            u2[p2] = 0 | e4[t4 + p2];
          else {
            var f2 = u2[p2 - 15], g2 = (f2 << 25 | f2 >>> 7) ^ (f2 << 14 | f2 >>> 18) ^ f2 >>> 3, m2 = u2[p2 - 2], y2 = (m2 << 15 | m2 >>> 17) ^ (m2 << 13 | m2 >>> 19) ^ m2 >>> 10;
            u2[p2] = g2 + u2[p2 - 7] + y2 + u2[p2 - 16];
          }
          var _2 = s3 & r3 ^ s3 & i3 ^ r3 & i3, w2 = (s3 << 30 | s3 >>> 2) ^ (s3 << 19 | s3 >>> 13) ^ (s3 << 10 | s3 >>> 22), I2 = d2 + ((a3 << 26 | a3 >>> 6) ^ (a3 << 21 | a3 >>> 11) ^ (a3 << 7 | a3 >>> 25)) + (a3 & h3 ^ ~a3 & l2) + c2[p2] + u2[p2];
          d2 = l2, l2 = h3, h3 = a3, a3 = o3 + I2 | 0, o3 = i3, i3 = r3, r3 = s3, s3 = I2 + (w2 + _2) | 0;
        }
        n3[0] = n3[0] + s3 | 0, n3[1] = n3[1] + r3 | 0, n3[2] = n3[2] + i3 | 0, n3[3] = n3[3] + o3 | 0, n3[4] = n3[4] + a3 | 0, n3[5] = n3[5] + h3 | 0, n3[6] = n3[6] + l2 | 0, n3[7] = n3[7] + d2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        return n3[r3 >>> 5] |= 128 << 24 - r3 % 32, n3[14 + (r3 + 64 >>> 9 << 4)] = e3.floor(s3 / 4294967296), n3[15 + (r3 + 64 >>> 9 << 4)] = s3, t4.sigBytes = 4 * n3.length, this._process(), this._hash;
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._hash = this._hash.clone(), e4;
      } });
      t3.SHA256 = i2._createHelper(h2), t3.HmacSHA256 = i2._createHmacHelper(h2);
    }(Math), n2.SHA256);
  }), we = _e, Ie = n(function(e2, t2) {
    e2.exports = r.HmacSHA256;
  });
  const ve = () => {
    let e2;
    if (!Promise) {
      e2 = () => {
      }, e2.promise = {};
      const t3 = () => {
        throw new te({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
      };
      return Object.defineProperty(e2.promise, "then", { get: t3 }), Object.defineProperty(e2.promise, "catch", { get: t3 }), e2;
    }
    const t2 = new Promise((t3, n2) => {
      e2 = (e3, s2) => e3 ? n2(e3) : t3(s2);
    });
    return e2.promise = t2, e2;
  };
  function Se(e2) {
    return void 0 === e2;
  }
  function Te(e2) {
    return "[object Null]" === Object.prototype.toString.call(e2);
  }
  function be(e2 = "") {
    return e2.replace(/([\s\S]+)\s+(请前往云开发AI小助手查看问题：.*)/, "$1");
  }
  function Ee(e2 = 32) {
    const t2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let n2 = "";
    for (let s2 = 0; s2 < e2; s2++)
      n2 += t2.charAt(Math.floor(62 * Math.random()));
    return n2;
  }
  var ke;
  function Ae(e2) {
    const t2 = (n2 = e2, "[object Array]" === Object.prototype.toString.call(n2) ? e2 : [e2]);
    var n2;
    for (const e3 of t2) {
      const { isMatch: t3, genAdapter: n3, runtime: s2 } = e3;
      if (t3())
        return { adapter: n3(), runtime: s2 };
    }
  }
  !function(e2) {
    e2.WEB = "web", e2.WX_MP = "wx_mp";
  }(ke || (ke = {}));
  const Pe = { adapter: null, runtime: void 0 }, Ce = ["anonymousUuidKey"];
  class Oe extends ye {
    constructor() {
      super(), Pe.adapter.root.tcbObject || (Pe.adapter.root.tcbObject = {});
    }
    setItem(e2, t2) {
      Pe.adapter.root.tcbObject[e2] = t2;
    }
    getItem(e2) {
      return Pe.adapter.root.tcbObject[e2];
    }
    removeItem(e2) {
      delete Pe.adapter.root.tcbObject[e2];
    }
    clear() {
      delete Pe.adapter.root.tcbObject;
    }
  }
  function xe(e2, t2) {
    switch (e2) {
      case "local":
        return t2.localStorage || new Oe();
      case "none":
        return new Oe();
      default:
        return t2.sessionStorage || new Oe();
    }
  }
  class Ne {
    constructor(e2) {
      if (!this._storage) {
        this._persistence = Pe.adapter.primaryStorage || e2.persistence, this._storage = xe(this._persistence, Pe.adapter);
        const t2 = `access_token_${e2.env}`, n2 = `access_token_expire_${e2.env}`, s2 = `refresh_token_${e2.env}`, r2 = `anonymous_uuid_${e2.env}`, i2 = `login_type_${e2.env}`, o2 = "device_id", a2 = `token_type_${e2.env}`, c2 = `user_info_${e2.env}`;
        this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: c2, deviceIdKey: o2, tokenTypeKey: a2 };
      }
    }
    updatePersistence(e2) {
      if (e2 === this._persistence)
        return;
      const t2 = "local" === this._persistence;
      this._persistence = e2;
      const n2 = xe(e2, Pe.adapter);
      for (const e3 in this.keys) {
        const s2 = this.keys[e3];
        if (t2 && Ce.includes(e3))
          continue;
        const r2 = this._storage.getItem(s2);
        Se(r2) || Te(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
      }
      this._storage = n2;
    }
    setStore(e2, t2, n2) {
      if (!this._storage)
        return;
      const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
      try {
        this._storage.setItem(e2, r2);
      } catch (e3) {
        throw e3;
      }
    }
    getStore(e2, t2) {
      try {
        if (!this._storage)
          return;
      } catch (e3) {
        return "";
      }
      t2 = t2 || "localCachev1";
      const n2 = this._storage.getItem(e2);
      if (!n2)
        return "";
      if (n2.indexOf(t2) >= 0) {
        return JSON.parse(n2).content;
      }
      return "";
    }
    removeStore(e2) {
      this._storage.removeItem(e2);
    }
  }
  const Re = {}, Le = {};
  function Ue(e2) {
    return Re[e2];
  }
  class De {
    constructor(e2, t2) {
      this.data = t2 || null, this.name = e2;
    }
  }
  class Me extends De {
    constructor(e2, t2) {
      super("error", { error: e2, data: t2 }), this.error = e2;
    }
  }
  const qe = new class {
    constructor() {
      this._listeners = {};
    }
    on(e2, t2) {
      return function(e3, t3, n2) {
        n2[e3] = n2[e3] || [], n2[e3].push(t3);
      }(e2, t2, this._listeners), this;
    }
    off(e2, t2) {
      return function(e3, t3, n2) {
        if (n2 && n2[e3]) {
          const s2 = n2[e3].indexOf(t3);
          -1 !== s2 && n2[e3].splice(s2, 1);
        }
      }(e2, t2, this._listeners), this;
    }
    fire(e2, t2) {
      if (e2 instanceof Me)
        return console.error(e2.error), this;
      const n2 = "string" == typeof e2 ? new De(e2, t2 || {}) : e2;
      const s2 = n2.name;
      if (this._listens(s2)) {
        n2.target = this;
        const e3 = this._listeners[s2] ? [...this._listeners[s2]] : [];
        for (const t3 of e3)
          t3.call(this, n2);
      }
      return this;
    }
    _listens(e2) {
      return this._listeners[e2] && this._listeners[e2].length > 0;
    }
  }();
  function Fe(e2, t2) {
    qe.on(e2, t2);
  }
  function Ke(e2, t2 = {}) {
    qe.fire(e2, t2);
  }
  function je(e2, t2) {
    qe.off(e2, t2);
  }
  const $e = "loginStateChanged", Be = "loginStateExpire", We = "loginTypeChanged", He = "anonymousConverted", Je = "refreshAccessToken";
  var ze;
  !function(e2) {
    e2.ANONYMOUS = "ANONYMOUS", e2.WECHAT = "WECHAT", e2.WECHAT_PUBLIC = "WECHAT-PUBLIC", e2.WECHAT_OPEN = "WECHAT-OPEN", e2.CUSTOM = "CUSTOM", e2.EMAIL = "EMAIL", e2.USERNAME = "USERNAME", e2.NULL = "NULL";
  }(ze || (ze = {}));
  class Ve {
    constructor() {
      this._fnPromiseMap = /* @__PURE__ */ new Map();
    }
    async run(e2, t2) {
      let n2 = this._fnPromiseMap.get(e2);
      return n2 || (n2 = new Promise(async (n3, s2) => {
        try {
          await this._runIdlePromise();
          const e3 = t2();
          n3(await e3);
        } catch (e3) {
          s2(e3);
        } finally {
          this._fnPromiseMap.delete(e2);
        }
      }), this._fnPromiseMap.set(e2, n2)), n2;
    }
    _runIdlePromise() {
      return Promise.resolve();
    }
  }
  class Ge {
    constructor(e2) {
      this._singlePromise = new Ve(), this._cache = Ue(e2.env), this._baseURL = `https://${e2.env}.ap-shanghai.tcb-api.tencentcloudapi.com`, this._reqClass = new Pe.adapter.reqClass({ timeout: e2.timeout, timeoutMsg: `请求在${e2.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] });
    }
    _getDeviceId() {
      if (this._deviceID)
        return this._deviceID;
      const { deviceIdKey: e2 } = this._cache.keys;
      let t2 = this._cache.getStore(e2);
      return "string" == typeof t2 && t2.length >= 16 && t2.length <= 48 || (t2 = Ee(), this._cache.setStore(e2, t2)), this._deviceID = t2, t2;
    }
    async _request(e2, t2, n2 = {}) {
      const s2 = { "x-request-id": Ee(), "x-device-id": this._getDeviceId() };
      if (n2.withAccessToken) {
        const { tokenTypeKey: e3 } = this._cache.keys, t3 = await this.getAccessToken(), n3 = this._cache.getStore(e3);
        s2.authorization = `${n3} ${t3}`;
      }
      return this._reqClass["get" === n2.method ? "get" : "post"]({ url: `${this._baseURL}${e2}`, data: t2, headers: s2 });
    }
    async _fetchAccessToken() {
      const { loginTypeKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2, tokenTypeKey: s2 } = this._cache.keys, r2 = this._cache.getStore(e2);
      if (r2 && r2 !== ze.ANONYMOUS)
        throw new te({ code: "INVALID_OPERATION", message: "非匿名登录不支持刷新 access token" });
      const i2 = await this._singlePromise.run("fetchAccessToken", async () => (await this._request("/auth/v1/signin/anonymously", {}, { method: "post" })).data), { access_token: o2, expires_in: a2, token_type: c2 } = i2;
      return this._cache.setStore(s2, c2), this._cache.setStore(t2, o2), this._cache.setStore(n2, Date.now() + 1e3 * a2), o2;
    }
    isAccessTokenExpired(e2, t2) {
      let n2 = true;
      return e2 && t2 && (n2 = t2 < Date.now()), n2;
    }
    async getAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2), s2 = this._cache.getStore(t2);
      return this.isAccessTokenExpired(n2, s2) ? this._fetchAccessToken() : n2;
    }
    async refreshAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, loginTypeKey: n2 } = this._cache.keys;
      return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.setStore(n2, ze.ANONYMOUS), this.getAccessToken();
    }
    async getUserInfo() {
      return this._singlePromise.run("getUserInfo", async () => (await this._request("/auth/v1/user/me", {}, { withAccessToken: true, method: "get" })).data);
    }
  }
  const Ye = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], Qe = { "X-SDK-Version": "1.3.5" };
  function Xe(e2, t2, n2) {
    const s2 = e2[t2];
    e2[t2] = function(t3) {
      const r2 = {}, i2 = {};
      n2.forEach((n3) => {
        const { data: s3, headers: o3 } = n3.call(e2, t3);
        Object.assign(r2, s3), Object.assign(i2, o3);
      });
      const o2 = t3.data;
      return o2 && (() => {
        var e3;
        if (e3 = o2, "[object FormData]" !== Object.prototype.toString.call(e3))
          t3.data = { ...o2, ...r2 };
        else
          for (const e4 in r2)
            o2.append(e4, r2[e4]);
      })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e2, t3);
    };
  }
  function Ze() {
    const e2 = Math.random().toString(16).slice(2);
    return { data: { seqId: e2 }, headers: { ...Qe, "x-seqid": e2 } };
  }
  class et {
    constructor(e2 = {}) {
      var t2;
      this.config = e2, this._reqClass = new Pe.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Ue(this.config.env), this._localCache = (t2 = this.config.env, Le[t2]), this.oauth = new Ge(this.config), Xe(this._reqClass, "post", [Ze]), Xe(this._reqClass, "upload", [Ze]), Xe(this._reqClass, "download", [Ze]);
    }
    async post(e2) {
      return await this._reqClass.post(e2);
    }
    async upload(e2) {
      return await this._reqClass.upload(e2);
    }
    async download(e2) {
      return await this._reqClass.download(e2);
    }
    async refreshAccessToken() {
      let e2, t2;
      this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
      try {
        e2 = await this._refreshAccessTokenPromise;
      } catch (e3) {
        t2 = e3;
      }
      if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
        throw t2;
      return e2;
    }
    async _refreshAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
      this._cache.removeStore(e2), this._cache.removeStore(t2);
      let i2 = this._cache.getStore(n2);
      if (!i2)
        throw new te({ message: "未登录CloudBase" });
      const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
      if (a2.data.code) {
        const { code: e3 } = a2.data;
        if ("SIGN_PARAM_INVALID" === e3 || "REFRESH_TOKEN_EXPIRED" === e3 || "INVALID_REFRESH_TOKEN" === e3) {
          if (this._cache.getStore(s2) === ze.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e3) {
            const e4 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
            return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
          }
          Ke(Be), this._cache.removeStore(n2);
        }
        throw new te({ code: a2.data.code, message: `刷新access token失败：${a2.data.code}` });
      }
      if (a2.data.access_token)
        return Ke(Je), this._cache.setStore(e2, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
      a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
    }
    async getAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
      if (!this._cache.getStore(n2))
        throw new te({ message: "refresh token不存在，登录状态异常" });
      let s2 = this._cache.getStore(e2), r2 = this._cache.getStore(t2), i2 = true;
      return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
    }
    async request(e2, t2, n2) {
      const s2 = `x-tcb-trace_${this.config.env}`;
      let r2 = "application/x-www-form-urlencoded";
      const i2 = { action: e2, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
      let o2;
      if (-1 === Ye.indexOf(e2) && (this._cache.keys, i2.access_token = await this.oauth.getAccessToken()), "storage.uploadFile" === e2) {
        o2 = new FormData();
        for (let e3 in o2)
          o2.hasOwnProperty(e3) && void 0 !== o2[e3] && o2.append(e3, i2[e3]);
        r2 = "multipart/form-data";
      } else {
        r2 = "application/json", o2 = {};
        for (let e3 in i2)
          void 0 !== i2[e3] && (o2[e3] = i2[e3]);
      }
      let a2 = { headers: { "content-type": r2 } };
      n2 && n2.timeout && (a2.timeout = n2.timeout), n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
      const c2 = this._localCache.getStore(s2);
      c2 && (a2.headers["X-TCB-Trace"] = c2);
      const { parse: u2, inQuery: h2, search: l2 } = t2;
      let d2 = { env: this.config.env };
      u2 && (d2.parse = true), h2 && (d2 = { ...h2, ...d2 });
      let p2 = function(e3, t3, n3 = {}) {
        const s3 = /\?/.test(t3);
        let r3 = "";
        for (let e4 in n3)
          "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e4}=${encodeURIComponent(n3[e4])}`;
        return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e3}${t3}`;
      }(ge, "//tcb-api.tencentcloudapi.com/web", d2);
      l2 && (p2 += l2);
      const f2 = await this.post({ url: p2, data: o2, ...a2 }), g2 = f2.header && f2.header["x-tcb-trace"];
      if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(f2.status) && 200 !== Number(f2.statusCode) || !f2.data)
        throw new te({ code: "NETWORK_ERROR", message: "network request error" });
      return f2;
    }
    async send(e2, t2 = {}, n2 = {}) {
      const s2 = await this.request(e2, t2, { ...n2, onUploadProgress: t2.onUploadProgress });
      if (("ACCESS_TOKEN_DISABLED" === s2.data.code || "ACCESS_TOKEN_EXPIRED" === s2.data.code) && -1 === Ye.indexOf(e2)) {
        await this.oauth.refreshAccessToken();
        const s3 = await this.request(e2, t2, { ...n2, onUploadProgress: t2.onUploadProgress });
        if (s3.data.code)
          throw new te({ code: s3.data.code, message: be(s3.data.message) });
        return s3.data;
      }
      if (s2.data.code)
        throw new te({ code: s2.data.code, message: be(s2.data.message) });
      return s2.data;
    }
    setRefreshToken(e2) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
    }
  }
  const tt = {};
  function nt(e2) {
    return tt[e2];
  }
  class st {
    constructor(e2) {
      this.config = e2, this._cache = Ue(e2.env), this._request = nt(e2.env);
    }
    setRefreshToken(e2) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
    }
    setAccessToken(e2, t2) {
      const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
      this._cache.setStore(n2, e2), this._cache.setStore(s2, t2);
    }
    async refreshUserInfo() {
      const { data: e2 } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e2), e2;
    }
    setLocalUserInfo(e2) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e2);
    }
  }
  class rt {
    constructor(e2) {
      if (!e2)
        throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._envId = e2, this._cache = Ue(this._envId), this._request = nt(this._envId), this.setUserInfo();
    }
    linkWithTicket(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "ticket must be string" });
      return this._request.send("auth.linkWithTicket", { ticket: e2 });
    }
    linkWithRedirect(e2) {
      e2.signInWithRedirect();
    }
    updatePassword(e2, t2) {
      return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e2 });
    }
    updateEmail(e2) {
      return this._request.send("auth.updateEmail", { newEmail: e2 });
    }
    updateUsername(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
      return this._request.send("auth.updateUsername", { username: e2 });
    }
    async getLinkedUidList() {
      const { data: e2 } = await this._request.send("auth.getLinkedUidList", {});
      let t2 = false;
      const { users: n2 } = e2;
      return n2.forEach((e3) => {
        e3.wxOpenId && e3.wxPublicId && (t2 = true);
      }), { users: n2, hasPrimaryUid: t2 };
    }
    setPrimaryUid(e2) {
      return this._request.send("auth.setPrimaryUid", { uid: e2 });
    }
    unlink(e2) {
      return this._request.send("auth.unlink", { platform: e2 });
    }
    async update(e2) {
      const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e2, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
      this.setLocalUserInfo(a2);
    }
    async refresh() {
      const e2 = await this._request.oauth.getUserInfo();
      return this.setLocalUserInfo(e2), e2;
    }
    setUserInfo() {
      const { userInfoKey: e2 } = this._cache.keys, t2 = this._cache.getStore(e2);
      ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
        this[e3] = t2[e3];
      }), this.location = { country: t2.country, province: t2.province, city: t2.city };
    }
    setLocalUserInfo(e2) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e2), this.setUserInfo();
    }
  }
  class it {
    constructor(e2) {
      if (!e2)
        throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._cache = Ue(e2);
      const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
      this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new rt(e2);
    }
    get isAnonymousAuth() {
      return this.loginType === ze.ANONYMOUS;
    }
    get isCustomAuth() {
      return this.loginType === ze.CUSTOM;
    }
    get isWeixinAuth() {
      return this.loginType === ze.WECHAT || this.loginType === ze.WECHAT_OPEN || this.loginType === ze.WECHAT_PUBLIC;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  }
  class ot extends st {
    async signIn() {
      this._cache.updatePersistence("local"), await this._request.oauth.getAccessToken(), Ke($e), Ke(We, { env: this.config.env, loginType: ze.ANONYMOUS, persistence: "local" });
      const e2 = new it(this.config.env);
      return await e2.user.refresh(), e2;
    }
    async linkAndRetrieveDataWithTicket(e2) {
      const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e2 });
      if (i2.refresh_token)
        return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), Ke(He, { env: this.config.env }), Ke(We, { loginType: ze.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
      throw new te({ message: "匿名转化失败" });
    }
    _setAnonymousUUID(e2) {
      const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.setStore(t2, e2), this._cache.setStore(n2, ze.ANONYMOUS);
    }
    _clearAnonymousUUID() {
      this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    }
  }
  class at extends st {
    async signIn(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "ticket must be a string" });
      const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e2, refresh_token: this._cache.getStore(t2) || "" });
      if (n2.refresh_token)
        return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), Ke($e), Ke(We, { env: this.config.env, loginType: ze.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new it(this.config.env);
      throw new te({ message: "自定义登录失败" });
    }
  }
  class ct extends st {
    async signIn(e2, t2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "email must be a string" });
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Ke($e), Ke(We, { env: this.config.env, loginType: ze.EMAIL, persistence: this.config.persistence }), new it(this.config.env);
      throw s2.code ? new te({ code: s2.code, message: `邮箱登录失败: ${s2.message}` }) : new te({ message: "邮箱登录失败" });
    }
    async activate(e2) {
      return this._request.send("auth.activateEndUserMail", { token: e2 });
    }
    async resetPasswordWithToken(e2, t2) {
      return this._request.send("auth.resetPasswordWithToken", { token: e2, newPassword: t2 });
    }
  }
  class ut extends st {
    async signIn(e2, t2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
      "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: ze.USERNAME, username: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Ke($e), Ke(We, { env: this.config.env, loginType: ze.USERNAME, persistence: this.config.persistence }), new it(this.config.env);
      throw s2.code ? new te({ code: s2.code, message: `用户名密码登录失败: ${s2.message}` }) : new te({ message: "用户名密码登录失败" });
    }
  }
  class ht {
    constructor(e2) {
      this.config = e2, this._cache = Ue(e2.env), this._request = nt(e2.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), Fe(We, this._onLoginTypeChanged);
    }
    get currentUser() {
      const e2 = this.hasLoginState();
      return e2 && e2.user || null;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
    anonymousAuthProvider() {
      return new ot(this.config);
    }
    customAuthProvider() {
      return new at(this.config);
    }
    emailAuthProvider() {
      return new ct(this.config);
    }
    usernameAuthProvider() {
      return new ut(this.config);
    }
    async signInAnonymously() {
      return new ot(this.config).signIn();
    }
    async signInWithEmailAndPassword(e2, t2) {
      return new ct(this.config).signIn(e2, t2);
    }
    signInWithUsernameAndPassword(e2, t2) {
      return new ut(this.config).signIn(e2, t2);
    }
    async linkAndRetrieveDataWithTicket(e2) {
      this._anonymousAuthProvider || (this._anonymousAuthProvider = new ot(this.config)), Fe(He, this._onAnonymousConverted);
      return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e2);
    }
    async signOut() {
      if (this.loginType === ze.ANONYMOUS)
        throw new te({ message: "匿名用户不支持登出操作" });
      const { refreshTokenKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e2);
      if (!s2)
        return;
      const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
      return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.removeStore(n2), Ke($e), Ke(We, { env: this.config.env, loginType: ze.NULL, persistence: this.config.persistence }), r2;
    }
    async signUpWithEmailAndPassword(e2, t2) {
      return this._request.send("auth.signUpWithEmailAndPassword", { email: e2, password: t2 });
    }
    async sendPasswordResetEmail(e2) {
      return this._request.send("auth.sendPasswordResetEmail", { email: e2 });
    }
    onLoginStateChanged(e2) {
      Fe($e, () => {
        const t3 = this.hasLoginState();
        e2.call(this, t3);
      });
      const t2 = this.hasLoginState();
      e2.call(this, t2);
    }
    onLoginStateExpired(e2) {
      Fe(Be, e2.bind(this));
    }
    onAccessTokenRefreshed(e2) {
      Fe(Je, e2.bind(this));
    }
    onAnonymousConverted(e2) {
      Fe(He, e2.bind(this));
    }
    onLoginTypeChanged(e2) {
      Fe(We, () => {
        const t2 = this.hasLoginState();
        e2.call(this, t2);
      });
    }
    async getAccessToken() {
      return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
    }
    hasLoginState() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2), s2 = this._cache.getStore(t2);
      return this._request.oauth.isAccessTokenExpired(n2, s2) ? null : new it(this.config.env);
    }
    async isUsernameRegistered(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
      const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e2 });
      return t2 && t2.isRegistered;
    }
    getLoginState() {
      return Promise.resolve(this.hasLoginState());
    }
    async signInWithTicket(e2) {
      return new at(this.config).signIn(e2);
    }
    shouldRefreshAccessToken(e2) {
      this._request._shouldRefreshAccessTokenHook = e2.bind(this);
    }
    getUserInfo() {
      return this._request.send("auth.getUserInfo", {}).then((e2) => e2.code ? e2 : { ...e2.data, requestId: e2.seqId });
    }
    getAuthHeader() {
      const { refreshTokenKey: e2, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2);
      return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
    }
    _onAnonymousConverted(e2) {
      const { env: t2 } = e2.data;
      t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
    }
    _onLoginTypeChanged(e2) {
      const { loginType: t2, persistence: n2, env: s2 } = e2.data;
      s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
    }
  }
  const lt = function(e2, t2) {
    t2 = t2 || ve();
    const n2 = nt(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e2;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
      const { data: { url: a2, authorization: c2, token: u2, fileId: h2, cosFileId: l2 }, requestId: d2 } = e3, p2 = { key: s2, signature: c2, "x-cos-meta-fileid": l2, success_action_status: "201", "x-cos-security-token": u2 };
      n2.upload({ url: a2, data: p2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e4) => {
        201 === e4.statusCode ? t2(null, { fileID: h2, requestId: d2 }) : t2(new te({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e4.data}` }));
      }).catch((e4) => {
        t2(e4);
      });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, dt = function(e2, t2) {
    t2 = t2 || ve();
    const n2 = nt(this.config.env), { cloudPath: s2 } = e2;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
      t2(null, e3);
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, pt = function({ fileList: e2 }, t2) {
    if (t2 = t2 || ve(), !e2 || !Array.isArray(e2))
      return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
    for (let t3 of e2)
      if (!t3 || "string" != typeof t3)
        return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
    const n2 = { fileid_list: e2 };
    return nt(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
      e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, ft = function({ fileList: e2 }, t2) {
    t2 = t2 || ve(), e2 && Array.isArray(e2) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
    let n2 = [];
    for (let s3 of e2)
      "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
    const s2 = { file_list: n2 };
    return nt(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e3) => {
      e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.download_list, requestId: e3.requestId });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, gt = async function({ fileID: e2 }, t2) {
    const n2 = (await ft.call(this, { fileList: [{ fileID: e2, maxAge: 600 }] })).fileList[0];
    if ("SUCCESS" !== n2.code)
      return t2 ? t2(n2) : new Promise((e3) => {
        e3(n2);
      });
    const s2 = nt(this.config.env);
    let r2 = n2.download_url;
    if (r2 = encodeURI(r2), !t2)
      return s2.download({ url: r2 });
    t2(await s2.download({ url: r2 }));
  }, mt = function({ name: e2, data: t2, query: n2, parse: s2, search: r2, timeout: i2 }, o2) {
    const a2 = o2 || ve();
    let c2;
    try {
      c2 = t2 ? JSON.stringify(t2) : "";
    } catch (e3) {
      return Promise.reject(e3);
    }
    if (!e2)
      return Promise.reject(new te({ code: "PARAM_ERROR", message: "函数名不能为空" }));
    const u2 = { inQuery: n2, parse: s2, search: r2, function_name: e2, request_data: c2 };
    return nt(this.config.env).send("functions.invokeFunction", u2, { timeout: i2 }).then((e3) => {
      if (e3.code)
        a2(null, e3);
      else {
        let t3 = e3.data.response_data;
        if (s2)
          a2(null, { result: t3, requestId: e3.requestId });
        else
          try {
            t3 = JSON.parse(e3.data.response_data), a2(null, { result: t3, requestId: e3.requestId });
          } catch (e4) {
            a2(new te({ message: "response data must be json" }));
          }
      }
      return a2.promise;
    }).catch((e3) => {
      a2(e3);
    }), a2.promise;
  }, yt = { timeout: 15e3, persistence: "session" }, _t = 6e5, wt = {};
  class It {
    constructor(e2) {
      this.config = e2 || this.config, this.authObj = void 0;
    }
    init(e2) {
      switch (Pe.adapter || (this.requestClient = new Pe.adapter.reqClass({ timeout: e2.timeout || 5e3, timeoutMsg: `请求在${(e2.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...yt, ...e2 }, true) {
        case this.config.timeout > _t:
          console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = _t;
          break;
        case this.config.timeout < 100:
          console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
      }
      return new It(this.config);
    }
    auth({ persistence: e2 } = {}) {
      if (this.authObj)
        return this.authObj;
      const t2 = e2 || Pe.adapter.primaryStorage || yt.persistence;
      var n2;
      return t2 !== this.config.persistence && (this.config.persistence = t2), function(e3) {
        const { env: t3 } = e3;
        Re[t3] = new Ne(e3), Le[t3] = new Ne({ ...e3, persistence: "local" });
      }(this.config), n2 = this.config, tt[n2.env] = new et(n2), this.authObj = new ht(this.config), this.authObj;
    }
    on(e2, t2) {
      return Fe.apply(this, [e2, t2]);
    }
    off(e2, t2) {
      return je.apply(this, [e2, t2]);
    }
    callFunction(e2, t2) {
      return mt.apply(this, [e2, t2]);
    }
    deleteFile(e2, t2) {
      return pt.apply(this, [e2, t2]);
    }
    getTempFileURL(e2, t2) {
      return ft.apply(this, [e2, t2]);
    }
    downloadFile(e2, t2) {
      return gt.apply(this, [e2, t2]);
    }
    uploadFile(e2, t2) {
      return lt.apply(this, [e2, t2]);
    }
    getUploadMetadata(e2, t2) {
      return dt.apply(this, [e2, t2]);
    }
    registerExtension(e2) {
      wt[e2.name] = e2;
    }
    async invokeExtension(e2, t2) {
      const n2 = wt[e2];
      if (!n2)
        throw new te({ message: `扩展${e2} 必须先注册` });
      return await n2.invoke(t2, this);
    }
    useAdapters(e2) {
      const { adapter: t2, runtime: n2 } = Ae(e2) || {};
      t2 && (Pe.adapter = t2), n2 && (Pe.runtime = n2);
    }
  }
  var vt = new It();
  function St(e2, t2, n2) {
    void 0 === n2 && (n2 = {});
    var s2 = /\?/.test(t2), r2 = "";
    for (var i2 in n2)
      "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
    return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e2 + t2;
  }
  class Tt {
    get(e2) {
      const { url: t2, data: n2, headers: s2, timeout: r2 } = e2;
      return new Promise((e3, i2) => {
        ne.request({ url: St("https:", t2), data: n2, method: "GET", header: s2, timeout: r2, success(t3) {
          e3(t3);
        }, fail(e4) {
          i2(e4);
        } });
      });
    }
    post(e2) {
      const { url: t2, data: n2, headers: s2, timeout: r2 } = e2;
      return new Promise((e3, i2) => {
        ne.request({ url: St("https:", t2), data: n2, method: "POST", header: s2, timeout: r2, success(t3) {
          e3(t3);
        }, fail(e4) {
          i2(e4);
        } });
      });
    }
    upload(e2) {
      return new Promise((t2, n2) => {
        const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e2, c2 = ne.uploadFile({ url: St("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e3) {
          const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
          200 === e3.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
        }, fail(e3) {
          n2(new Error(e3.errMsg || "uploadFile:fail"));
        } });
        "function" == typeof e2.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
          e2.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
        });
      });
    }
  }
  const bt = { setItem(e2, t2) {
    ne.setStorageSync(e2, t2);
  }, getItem: (e2) => ne.getStorageSync(e2), removeItem(e2) {
    ne.removeStorageSync(e2);
  }, clear() {
    ne.clearStorageSync();
  } };
  var Et = { genAdapter: function() {
    return { root: {}, reqClass: Tt, localStorage: bt, primaryStorage: "local" };
  }, isMatch: function() {
    return true;
  }, runtime: "uni_app" };
  vt.useAdapters(Et);
  const kt = vt, At = kt.init;
  kt.init = function(e2) {
    e2.env = e2.spaceId;
    const t2 = At.call(this, e2);
    t2.config.provider = "tencent", t2.config.spaceId = e2.spaceId;
    const n2 = t2.auth;
    return t2.auth = function(e3) {
      const t3 = n2.call(this, e3);
      return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
        var n3;
        t3[e4] = (n3 = t3[e4], function(e5) {
          e5 = e5 || {};
          const { success: t4, fail: s2, complete: r2 } = ee(e5);
          if (!(t4 || s2 || r2))
            return n3.call(this, e5);
          n3.call(this, e5).then((e6) => {
            t4 && t4(e6), r2 && r2(e6);
          }, (e6) => {
            s2 && s2(e6), r2 && r2(e6);
          });
        }).bind(t3);
      }), t3;
    }, t2.customAuth = t2.auth, t2;
  };
  var Pt = kt;
  async function Ct(e2, t2) {
    const n2 = `http://${e2}:${t2}/system/ping`;
    try {
      const e3 = await (s2 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
        ne.request({ ...s2, success(t4) {
          e4(t4);
        }, fail(e5) {
          t3(e5);
        } });
      }));
      return !(!e3.data || 0 !== e3.data.code);
    } catch (e3) {
      return false;
    }
    var s2;
  }
  async function Ot(e2, t2) {
    let n2;
    for (let s2 = 0; s2 < e2.length; s2++) {
      const r2 = e2[s2];
      if (await Ct(r2, t2)) {
        n2 = r2;
        break;
      }
    }
    return { address: n2, port: t2 };
  }
  const xt = { "serverless.file.resource.generateProximalSign": "storage/generate-proximal-sign", "serverless.file.resource.report": "storage/report", "serverless.file.resource.delete": "storage/delete", "serverless.file.resource.getTempFileURL": "storage/get-temp-file-url" };
  var Nt = class {
    constructor(e2) {
      if (["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), !e2.endpoint)
        throw new Error("集群空间未配置ApiEndpoint，配置后需要重新关联服务空间后生效");
      this.config = Object.assign({}, e2), this.config.provider = "dcloud", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.adapter = ne;
    }
    async request(e2, t2 = true) {
      const n2 = t2;
      return e2 = n2 ? await this.setupLocalRequest(e2) : this.setupRequest(e2), Promise.resolve().then(() => n2 ? this.requestLocal(e2) : de.wrappedRequest(e2, this.adapter.request));
    }
    requestLocal(e2) {
      return new Promise((t2, n2) => {
        this.adapter.request(Object.assign(e2, { complete(e3) {
          if (e3 || (e3 = {}), !e3.statusCode || e3.statusCode >= 400) {
            const t3 = e3.data && e3.data.code || "SYS_ERR", s2 = e3.data && e3.data.message || "request:fail";
            return n2(new te({ code: t3, message: s2 }));
          }
          t2({ success: true, result: e3.data });
        } }));
      });
    }
    setupRequest(e2) {
      const t2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), n2 = { "Content-Type": "application/json" };
      n2["x-serverless-sign"] = de.sign(t2, this.config.clientSecret);
      const s2 = le();
      n2["x-client-info"] = encodeURIComponent(JSON.stringify(s2));
      const { token: r2 } = re();
      return n2["x-client-token"] = r2, { url: this.config.requestUrl, method: "POST", data: t2, dataType: "json", header: JSON.parse(JSON.stringify(n2)) };
    }
    async setupLocalRequest(e2) {
      const t2 = le(), { token: n2 } = re(), s2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now(), clientInfo: t2, token: n2 }), { address: r2, servePort: i2 } = this.__dev__ && this.__dev__.debugInfo || {}, { address: o2 } = await Ot(r2, i2);
      return { url: `http://${o2}:${i2}/${xt[e2.method]}`, method: "POST", data: s2, dataType: "json", header: JSON.parse(JSON.stringify({ "Content-Type": "application/json" })) };
    }
    callFunction(e2) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
      return this.request(t2, false);
    }
    getUploadFileOptions(e2) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
      return this.request(t2);
    }
    reportUploadFile(e2) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
      return this.request(t2);
    }
    uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
      if (!t2)
        throw new te({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
      let r2;
      return this.getUploadFileOptions({ cloudPath: t2 }).then((t3) => {
        const { url: i2, formData: o2, name: a2 } = t3.result;
        return r2 = t3.result.fileUrl, new Promise((t4, r3) => {
          const c2 = this.adapter.uploadFile({ url: i2, formData: o2, name: a2, filePath: e2, fileType: n2, success(e3) {
            e3 && e3.statusCode < 400 ? t4(e3) : r3(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
          }, fail(e3) {
            r3(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
          } });
          "function" == typeof s2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
            s2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
          });
        });
      }).then(() => this.reportUploadFile({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
        t3.success ? n3({ success: true, filePath: e2, fileID: r2 }) : s3(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }));
    }
    deleteFile({ fileList: e2 }) {
      const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e2 }) };
      return this.request(t2).then((e3) => {
        if (e3.success)
          return e3.result;
        throw new te({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
      });
    }
    getTempFileURL({ fileList: e2, maxAge: t2 } = {}) {
      if (!Array.isArray(e2) || 0 === e2.length)
        throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const n2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e2, maxAge: t2 }) };
      return this.request(n2).then((e3) => {
        if (e3.success)
          return { fileList: e3.result.fileList.map((e4) => ({ fileID: e4.fileID, tempFileURL: e4.tempFileURL })) };
        throw new te({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
      });
    }
  };
  var Rt = { init(e2) {
    const t2 = new Nt(e2), n2 = { signInAnonymously: function() {
      return Promise.resolve();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } }, Lt = n(function(e2, t2) {
    e2.exports = r.enc.Hex;
  });
  function Ut() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e2) {
      var t2 = 16 * Math.random() | 0;
      return ("x" === e2 ? t2 : 3 & t2 | 8).toString(16);
    });
  }
  function Dt(e2 = "", t2 = {}) {
    const { data: n2, functionName: s2, method: r2, headers: i2, signHeaderKeys: o2 = [], config: a2 } = t2, c2 = String(Date.now()), u2 = Ut(), h2 = Object.assign({}, i2, { "x-from-app-id": a2.spaceAppId, "x-from-env-id": a2.spaceId, "x-to-env-id": a2.spaceId, "x-from-instance-id": c2, "x-from-function-name": s2, "x-client-timestamp": c2, "x-alipay-source": "client", "x-request-id": u2, "x-alipay-callid": u2, "x-trace-id": u2 }), l2 = ["x-from-app-id", "x-from-env-id", "x-to-env-id", "x-from-instance-id", "x-from-function-name", "x-client-timestamp"].concat(o2), [d2 = "", p2 = ""] = e2.split("?") || [], f2 = function(e3) {
      const t3 = "HMAC-SHA256", n3 = e3.signedHeaders.join(";"), s3 = e3.signedHeaders.map((t4) => `${t4.toLowerCase()}:${e3.headers[t4]}
`).join(""), r3 = we(e3.body).toString(Lt), i3 = `${e3.method.toUpperCase()}
${e3.path}
${e3.query}
${s3}
${n3}
${r3}
`, o3 = we(i3).toString(Lt), a3 = `${t3}
${e3.timestamp}
${o3}
`, c3 = Ie(a3, e3.secretKey).toString(Lt);
      return `${t3} Credential=${e3.secretId}, SignedHeaders=${n3}, Signature=${c3}`;
    }({ path: d2, query: p2, method: r2, headers: h2, timestamp: c2, body: JSON.stringify(n2), secretId: a2.accessKey, secretKey: a2.secretKey, signedHeaders: l2.sort() });
    return { url: `${a2.endpoint}${e2}`, headers: Object.assign({}, h2, { Authorization: f2 }) };
  }
  function Mt({ url: e2, data: t2, method: n2 = "POST", headers: s2 = {}, timeout: r2 }) {
    return new Promise((i2, o2) => {
      ne.request({ url: e2, method: n2, data: "object" == typeof t2 ? JSON.stringify(t2) : t2, header: s2, dataType: "json", timeout: r2, complete: (e3 = {}) => {
        const t3 = s2["x-trace-id"] || "";
        if (!e3.statusCode || e3.statusCode >= 400) {
          const { message: n3, errMsg: s3, trace_id: r3 } = e3.data || {};
          return o2(new te({ code: "SYS_ERR", message: n3 || s3 || "request:fail", requestId: r3 || t3 }));
        }
        i2({ status: e3.statusCode, data: e3.data, headers: e3.header, requestId: t3 });
      } });
    });
  }
  function qt(e2, t2) {
    const { path: n2, data: s2, method: r2 = "GET" } = e2, { url: i2, headers: o2 } = Dt(n2, { functionName: "", data: s2, method: r2, headers: { "x-alipay-cloud-mode": "oss", "x-data-api-type": "oss", "x-expire-timestamp": String(Date.now() + 6e4) }, signHeaderKeys: ["x-data-api-type", "x-expire-timestamp"], config: t2 });
    return Mt({ url: i2, data: s2, method: r2, headers: o2 }).then((e3) => {
      const t3 = e3.data || {};
      if (!t3.success)
        throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
      return t3.data || {};
    }).catch((e3) => {
      throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
    });
  }
  function Ft(e2 = "") {
    const t2 = e2.trim().replace(/^cloud:\/\//, ""), n2 = t2.indexOf("/");
    if (n2 <= 0)
      throw new te({ code: "INVALID_PARAM", message: "fileID不合法" });
    const s2 = t2.substring(0, n2), r2 = t2.substring(n2 + 1);
    return s2 !== this.config.spaceId && console.warn("file ".concat(e2, " does not belong to env ").concat(this.config.spaceId)), r2;
  }
  function Kt(e2 = "") {
    return "cloud://".concat(this.config.spaceId, "/").concat(e2.replace(/^\/+/, ""));
  }
  class jt {
    constructor(e2) {
      this.config = e2;
    }
    signedURL(e2, t2 = {}) {
      const n2 = `/ws/function/${e2}`, s2 = this.config.wsEndpoint.replace(/^ws(s)?:\/\//, ""), r2 = Object.assign({}, t2, { accessKeyId: this.config.accessKey, signatureNonce: Ut(), timestamp: "" + Date.now() }), i2 = [n2, ["accessKeyId", "authorization", "signatureNonce", "timestamp"].sort().map(function(e3) {
        return r2[e3] ? "".concat(e3, "=").concat(r2[e3]) : null;
      }).filter(Boolean).join("&"), `host:${s2}`].join("\n"), o2 = ["HMAC-SHA256", we(i2).toString(Lt)].join("\n"), a2 = Ie(o2, this.config.secretKey).toString(Lt), c2 = Object.keys(r2).map((e3) => `${e3}=${encodeURIComponent(r2[e3])}`).join("&");
      return `${this.config.wsEndpoint}${n2}?${c2}&signature=${a2}`;
    }
  }
  var $t = class {
    constructor(e2) {
      if (["spaceId", "spaceAppId", "accessKey", "secretKey"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), e2.endpoint) {
        if ("string" != typeof e2.endpoint)
          throw new Error("endpoint must be string");
        if (!/^https:\/\//.test(e2.endpoint))
          throw new Error("endpoint must start with https://");
        e2.endpoint = e2.endpoint.replace(/\/$/, "");
      }
      this.config = Object.assign({}, e2, { endpoint: e2.endpoint || `https://${e2.spaceId}.api-hz.cloudbasefunction.cn`, wsEndpoint: e2.wsEndpoint || `wss://${e2.spaceId}.api-hz.cloudbasefunction.cn` }), this._websocket = new jt(this.config);
    }
    callFunction(e2) {
      return function(e3, t2) {
        const { name: n2, data: s2, async: r2 = false, timeout: i2 } = e3, o2 = "POST", a2 = { "x-to-function-name": n2 };
        r2 && (a2["x-function-invoke-type"] = "async");
        const { url: c2, headers: u2 } = Dt("/functions/invokeFunction", { functionName: n2, data: s2, method: o2, headers: a2, signHeaderKeys: ["x-to-function-name"], config: t2 });
        return Mt({ url: c2, data: s2, method: o2, headers: u2, timeout: i2 }).then((e4) => {
          let t3 = 0;
          if (r2) {
            const n3 = e4.data || {};
            t3 = "200" === n3.errCode ? 0 : n3.errCode, e4.data = n3.data || {}, e4.errMsg = n3.errMsg;
          }
          if (0 !== t3)
            throw new te({ code: t3, message: e4.errMsg, requestId: e4.requestId });
          return { errCode: t3, success: 0 === t3, requestId: e4.requestId, result: e4.data };
        }).catch((e4) => {
          throw new te({ code: e4.errCode, message: e4.errMsg, requestId: e4.requestId });
        });
      }(e2, this.config);
    }
    uploadFileToOSS({ url: e2, filePath: t2, fileType: n2, formData: s2, onUploadProgress: r2 }) {
      return new Promise((i2, o2) => {
        const a2 = ne.uploadFile({ url: e2, filePath: t2, fileType: n2, formData: s2, name: "file", success(e3) {
          e3 && e3.statusCode < 400 ? i2(e3) : o2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          o2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof r2 && a2 && "function" == typeof a2.onProgressUpdate && a2.onProgressUpdate((e3) => {
          r2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    async uploadFile({ filePath: e2, cloudPath: t2 = "", fileType: n2 = "image", onUploadProgress: s2 }) {
      if ("string" !== g(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const r2 = await qt({ path: "/".concat(t2.replace(/^\//, ""), "?post_url") }, this.config), { file_id: i2, upload_url: o2, form_data: a2 } = r2, c2 = a2 && a2.reduce((e3, t3) => (e3[t3.key] = t3.value, e3), {});
      return this.uploadFileToOSS({ url: o2, filePath: e2, fileType: n2, formData: c2, onUploadProgress: s2 }).then(() => ({ fileID: i2 }));
    }
    async getTempFileURL({ fileList: e2 }) {
      return new Promise((t2, n2) => {
        (!e2 || e2.length < 0) && t2({ code: "INVALID_PARAM", message: "fileList不能为空数组" }), e2.length > 50 && t2({ code: "INVALID_PARAM", message: "fileList数组长度不能超过50" });
        const s2 = [];
        for (const n3 of e2) {
          let e3;
          "string" !== g(n3) && t2({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
          try {
            e3 = Ft.call(this, n3);
          } catch (t3) {
            console.warn(t3.errCode, t3.errMsg), e3 = n3;
          }
          s2.push({ file_id: e3, expire: 600 });
        }
        qt({ path: "/?download_url", data: { file_list: s2 }, method: "POST" }, this.config).then((e3) => {
          const { file_list: n3 = [] } = e3;
          t2({ fileList: n3.map((e4) => ({ fileID: Kt.call(this, e4.file_id), tempFileURL: e4.download_url })) });
        }).catch((e3) => n2(e3));
      });
    }
    async connectWebSocket(e2) {
      const { name: t2, query: n2 } = e2;
      return ne.connectSocket({ url: this._websocket.signedURL(t2, n2), complete: () => {
      } });
    }
  };
  var Bt = { init: (e2) => {
    e2.provider = "alipay";
    const t2 = new $t(e2);
    return t2.auth = function() {
      return { signInAnonymously: function() {
        return Promise.resolve();
      }, getLoginState: function() {
        return Promise.resolve(true);
      } };
    }, t2;
  } };
  function Wt({ data: e2 }) {
    let t2;
    t2 = le();
    const n2 = JSON.parse(JSON.stringify(e2 || {}));
    if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
      const { token: e3 } = re();
      e3 && (n2.uniIdToken = e3);
    }
    return n2;
  }
  async function Ht(e2 = {}) {
    await this.__dev__.initLocalNetwork();
    const { localAddress: t2, localPort: n2 } = this.__dev__, s2 = { aliyun: "aliyun", tencent: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], r2 = this.config.spaceId, i2 = `http://${t2}:${n2}/system/check-function`, o2 = `http://${t2}:${n2}/cloudfunctions/${e2.name}`;
    return new Promise((t3, n3) => {
      ne.request({ method: "POST", url: i2, data: { name: e2.name, platform: P, provider: s2, spaceId: r2 }, timeout: 3e3, success(e3) {
        t3(e3);
      }, fail() {
        t3({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });
      } });
    }).then(({ data: e3 } = {}) => {
      const { code: t3, message: n3 } = e3 || {};
      return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
    }).then(({ code: t3, message: n3 }) => {
      if (0 !== t3) {
        switch (t3) {
          case "MODULE_ENCRYPTED":
            console.error(`此云函数（${e2.name}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "FUNCTION_ENCRYPTED":
            console.error(`此云函数（${e2.name}）已加密不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "ACTION_ENCRYPTED":
            console.error(n3 || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
            break;
          case "NETWORK_ERROR":
            console.error(n3 || "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下");
            break;
          case "SWITCH_TO_CLOUD":
            break;
          default: {
            const e3 = `检测本地调试服务出现错误：${n3}，请检查网络环境或重启客户端再试`;
            throw console.error(e3), new Error(e3);
          }
        }
        return this._callCloudFunction(e2);
      }
      return new Promise((t4, n4) => {
        const r3 = Wt.call(this, { data: e2.data });
        ne.request({ method: "POST", url: o2, data: { provider: s2, platform: P, param: r3 }, timeout: e2.timeout, success: ({ statusCode: e3, data: s3 } = {}) => !e3 || e3 >= 400 ? n4(new te({ code: s3.code || "SYS_ERR", message: s3.message || "request:fail" })) : t4({ result: s3 }), fail(e3) {
          n4(new te({ code: e3.code || e3.errCode || "SYS_ERR", message: e3.message || e3.errMsg || "request:fail" }));
        } });
      });
    });
  }
  const Jt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
  var zt = /[\\^$.*+?()[\]{}|]/g, Vt = RegExp(zt.source);
  function Gt(e2, t2, n2) {
    return e2.replace(new RegExp((s2 = t2) && Vt.test(s2) ? s2.replace(zt, "\\$&") : s2, "g"), n2);
    var s2;
  }
  const Yt = { NONE: "none", REQUEST: "request", RESPONSE: "response", BOTH: "both" }, Qt = "_globalUniCloudStatus", Xt = "_globalUniCloudSecureNetworkCache__{spaceId}", Zt = "uni-secure-network", en = { SYSTEM_ERROR: { code: 2e4, message: "System error" }, APP_INFO_INVALID: { code: 20101, message: "Invalid client" }, GET_ENCRYPT_KEY_FAILED: { code: 20102, message: "Get encrypt key failed" } };
  function nn(e2) {
    const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e2 || {};
    return new te({ subject: t2 || n2 || Zt, code: s2 || i2 || en.SYSTEM_ERROR.code, message: r2 || o2, cause: a2 });
  }
  let Kn;
  function Hn({ secretType: e2 } = {}) {
    return e2 === Yt.REQUEST || e2 === Yt.RESPONSE || e2 === Yt.BOTH;
  }
  function Jn({ name: e2, data: t2 = {} } = {}) {
    return "DCloud-clientDB" === e2 && "encryption" === t2.redirectTo && "getAppClientKey" === t2.action;
  }
  function zn({ provider: e2, spaceId: t2, functionName: n2 } = {}) {
    const { appId: s2, uniPlatform: r2, osName: i2 } = ce();
    let o2 = r2;
    "app" === r2 && (o2 = i2);
    const a2 = function({ provider: e3, spaceId: t3 } = {}) {
      const n3 = A;
      if (!n3)
        return {};
      e3 = /* @__PURE__ */ function(e4) {
        return "tencent" === e4 ? "tcb" : e4;
      }(e3);
      const s3 = n3.find((n4) => n4.provider === e3 && n4.spaceId === t3);
      return s3 && s3.config;
    }({ provider: e2, spaceId: t2 });
    if (!a2 || !a2.accessControl || !a2.accessControl.enable)
      return false;
    const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
    if (0 === u2.length)
      return true;
    const h2 = function(e3, t3) {
      let n3, s3, r3;
      for (let i3 = 0; i3 < e3.length; i3++) {
        const o3 = e3[i3];
        o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e4) => e4.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
      }
      return n3 || s3 || r3;
    }(u2, n2);
    if (!h2)
      return false;
    if ((c2[h2] || []).find((e3 = {}) => e3.appId === s2 && (e3.platform || "").toLowerCase() === o2.toLowerCase()))
      return true;
    throw console.error(`此应用[appId: ${s2}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), nn(en.APP_INFO_INVALID);
  }
  function Vn({ functionName: e2, result: t2, logPvd: n2 }) {
    if (this.__dev__.debugLog && t2 && t2.requestId) {
      const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e2, requestId: t2.requestId });
      console.log(`[${n2}-request]${s2}[/${n2}-request]`);
    }
  }
  function Gn(e2) {
    const t2 = e2.callFunction, n2 = function(n3) {
      const s2 = n3.name;
      n3.data = Wt.call(e2, { data: n3.data });
      const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], i2 = Hn(n3), o2 = Jn(n3), a2 = i2 || o2;
      return t2.call(this, n3).then((e3) => (e3.errCode = 0, !a2 && Vn.call(this, { functionName: s2, result: e3, logPvd: r2 }), Promise.resolve(e3)), (e3) => (!a2 && Vn.call(this, { functionName: s2, result: e3, logPvd: r2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
        for (let s3 = 0; s3 < n4.length; s3++) {
          const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e4.match(r3);
          if (!a3)
            continue;
          let c2 = i3;
          for (let e5 = 1; e5 < a3.length; e5++)
            c2 = Gt(c2, `{$${e5}}`, a3[e5]);
          for (const e5 in t3)
            c2 = Gt(c2, `{${e5}}`, t3[e5]);
          return "replace" === o3 ? c2 : e4 + c2;
        }
        return e4;
      }({ message: `[${n3.name}]: ${e3.message}`, formatter: Jt, extraInfo: { functionName: s2 } })), Promise.reject(e3)));
    };
    e2.callFunction = function(t3) {
      const { provider: s2, spaceId: r2 } = e2.config, i2 = t3.name;
      let o2, a2;
      if (t3.data = t3.data || {}, e2.__dev__.debugInfo && !e2.__dev__.debugInfo.forceRemote && O ? (e2._callCloudFunction || (e2._callCloudFunction = n2, e2._callLocalFunction = Ht), o2 = Ht) : o2 = n2, o2 = o2.bind(e2), Jn(t3))
        a2 = n2.call(e2, t3);
      else if (Hn(t3)) {
        a2 = new Kn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapEncryptDataCallFunction(n2.bind(e2))(t3);
      } else if (zn({ provider: s2, spaceId: r2, functionName: i2 })) {
        a2 = new Kn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapVerifyClientCallFunction(n2.bind(e2))(t3);
      } else
        a2 = o2(t3);
      return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2.then((e3) => e3);
    };
  }
  Kn = class {
    constructor() {
      throw nn({ message: `Platform ${P} is not enabled, please check whether secure network module is enabled in your manifest.json` });
    }
  };
  const Yn = Symbol("CLIENT_DB_INTERNAL");
  function Qn(e2, t2) {
    return e2.then = "DoNotReturnProxyWithAFunctionNamedThen", e2._internalType = Yn, e2.inspect = null, e2.__v_raw = void 0, new Proxy(e2, { get(e3, n2, s2) {
      if ("_uniClient" === n2)
        return null;
      if ("symbol" == typeof n2)
        return e3[n2];
      if (n2 in e3 || "string" != typeof n2) {
        const t3 = e3[n2];
        return "function" == typeof t3 ? t3.bind(e3) : t3;
      }
      return t2.get(e3, n2, s2);
    } });
  }
  function Xn(e2) {
    return { on: (t2, n2) => {
      e2[t2] = e2[t2] || [], e2[t2].indexOf(n2) > -1 || e2[t2].push(n2);
    }, off: (t2, n2) => {
      e2[t2] = e2[t2] || [];
      const s2 = e2[t2].indexOf(n2);
      -1 !== s2 && e2[t2].splice(s2, 1);
    } };
  }
  const Zn = ["db.Geo", "db.command", "command.aggregate"];
  function es(e2, t2) {
    return Zn.indexOf(`${e2}.${t2}`) > -1;
  }
  function ts(e2) {
    switch (g(e2 = se(e2))) {
      case "array":
        return e2.map((e3) => ts(e3));
      case "object":
        return e2._internalType === Yn || Object.keys(e2).forEach((t2) => {
          e2[t2] = ts(e2[t2]);
        }), e2;
      case "regexp":
        return { $regexp: { source: e2.source, flags: e2.flags } };
      case "date":
        return { $date: e2.toISOString() };
      default:
        return e2;
    }
  }
  function ns(e2) {
    return e2 && e2.content && e2.content.$method;
  }
  class ss {
    constructor(e2, t2, n2) {
      this.content = e2, this.prevStage = t2 || null, this.udb = null, this._database = n2;
    }
    toJSON() {
      let e2 = this;
      const t2 = [e2.content];
      for (; e2.prevStage; )
        e2 = e2.prevStage, t2.push(e2.content);
      return { $db: t2.reverse().map((e3) => ({ $method: e3.$method, $param: ts(e3.$param) })) };
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
    getAction() {
      const e2 = this.toJSON().$db.find((e3) => "action" === e3.$method);
      return e2 && e2.$param && e2.$param[0];
    }
    getCommand() {
      return { $db: this.toJSON().$db.filter((e2) => "action" !== e2.$method) };
    }
    get isAggregate() {
      let e2 = this;
      for (; e2; ) {
        const t2 = ns(e2), n2 = ns(e2.prevStage);
        if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    get isCommand() {
      let e2 = this;
      for (; e2; ) {
        if ("command" === ns(e2))
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    get isAggregateCommand() {
      let e2 = this;
      for (; e2; ) {
        const t2 = ns(e2), n2 = ns(e2.prevStage);
        if ("aggregate" === t2 && "command" === n2)
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    getNextStageFn(e2) {
      const t2 = this;
      return function() {
        return rs({ $method: e2, $param: ts(Array.from(arguments)) }, t2, t2._database);
      };
    }
    get count() {
      return this.isAggregate ? this.getNextStageFn("count") : function() {
        return this._send("count", Array.from(arguments));
      };
    }
    get remove() {
      return this.isCommand ? this.getNextStageFn("remove") : function() {
        return this._send("remove", Array.from(arguments));
      };
    }
    get() {
      return this._send("get", Array.from(arguments));
    }
    get add() {
      return this.isCommand ? this.getNextStageFn("add") : function() {
        return this._send("add", Array.from(arguments));
      };
    }
    update() {
      return this._send("update", Array.from(arguments));
    }
    end() {
      return this._send("end", Array.from(arguments));
    }
    get set() {
      return this.isCommand ? this.getNextStageFn("set") : function() {
        throw new Error("JQL禁止使用set方法");
      };
    }
    _send(e2, t2) {
      const n2 = this.getAction(), s2 = this.getCommand();
      if (s2.$db.push({ $method: e2, $param: ts(t2) }), b) {
        const e3 = s2.$db.find((e4) => "collection" === e4.$method), t3 = e3 && e3.$param;
        t3 && 1 === t3.length && "string" == typeof e3.$param[0] && e3.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
      }
      return this._database._callCloudFunction({ action: n2, command: s2 });
    }
  }
  function rs(e2, t2, n2) {
    return Qn(new ss(e2, t2, n2), { get(e3, t3) {
      let s2 = "db";
      return e3 && e3.content && (s2 = e3.content.$method), es(s2, t3) ? rs({ $method: t3 }, e3, n2) : function() {
        return rs({ $method: t3, $param: ts(Array.from(arguments)) }, e3, n2);
      };
    } });
  }
  function is({ path: e2, method: t2 }) {
    return class {
      constructor() {
        this.param = Array.from(arguments);
      }
      toJSON() {
        return { $newDb: [...e2.map((e3) => ({ $method: e3 })), { $method: t2, $param: this.param }] };
      }
      toString() {
        return JSON.stringify(this.toJSON());
      }
    };
  }
  class os {
    constructor({ uniClient: e2 = {}, isJQL: t2 = false } = {}) {
      this._uniClient = e2, this._authCallBacks = {}, this._dbCallBacks = {}, e2._isDefault && (this._dbCallBacks = U("_globalUniCloudDatabaseCallback")), t2 || (this.auth = Xn(this._authCallBacks)), this._isJQL = t2, Object.assign(this, Xn(this._dbCallBacks)), this.env = Qn({}, { get: (e3, t3) => ({ $env: t3 }) }), this.Geo = Qn({}, { get: (e3, t3) => is({ path: ["Geo"], method: t3 }) }), this.serverDate = is({ path: [], method: "serverDate" }), this.RegExp = is({ path: [], method: "RegExp" });
    }
    getCloudEnv(e2) {
      if ("string" != typeof e2 || !e2.trim())
        throw new Error("getCloudEnv参数错误");
      return { $env: e2.replace("$cloudEnv_", "") };
    }
    _callback(e2, t2) {
      const n2 = this._dbCallBacks;
      n2[e2] && n2[e2].forEach((e3) => {
        e3(...t2);
      });
    }
    _callbackAuth(e2, t2) {
      const n2 = this._authCallBacks;
      n2[e2] && n2[e2].forEach((e3) => {
        e3(...t2);
      });
    }
    multiSend() {
      const e2 = Array.from(arguments), t2 = e2.map((e3) => {
        const t3 = e3.getAction(), n2 = e3.getCommand();
        if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
          throw new Error("multiSend只支持子命令内使用getTemp");
        return { action: t3, command: n2 };
      });
      return this._callCloudFunction({ multiCommand: t2, queryList: e2 });
    }
  }
  function as(e2, t2 = {}) {
    return Qn(new e2(t2), { get: (e3, t3) => es("db", t3) ? rs({ $method: t3 }, null, e3) : function() {
      return rs({ $method: t3, $param: ts(Array.from(arguments)) }, null, e3);
    } });
  }
  class cs extends os {
    _parseResult(e2) {
      return this._isJQL ? e2.result : e2;
    }
    _callCloudFunction({ action: e2, command: t2, multiCommand: n2, queryList: s2 }) {
      function r2(e3, t3) {
        if (n2 && s2)
          for (let n3 = 0; n3 < s2.length; n3++) {
            const r3 = s2[n3];
            r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e3.result.dataList[n3]));
          }
      }
      const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
      function a2(e3) {
        return i2._callback("error", [e3]), j($(o2, "fail"), e3).then(() => j($(o2, "complete"), e3)).then(() => (r2(null, e3), Y(H.RESPONSE, { type: J.CLIENT_DB, content: e3 }), Promise.reject(e3)));
      }
      const c2 = j($(o2, "invoke")), u2 = this._uniClient;
      return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: l.CLIENT_DB, data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
        const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e3.result;
        if (u3)
          for (let e4 = 0; e4 < u3.length; e4++) {
            const { level: t4, message: n4, detail: s4 } = u3[e4];
            let r3 = "[System Info]" + n4;
            s4 && (r3 = `${r3}
详细信息：${s4}`), (console["warn" === t4 ? "error" : t4] || console.log)(r3);
          }
        if (t3) {
          return a2(new te({ code: t3, message: n3, requestId: e3.requestId }));
        }
        e3.result.errCode = e3.result.errCode || e3.result.code, e3.result.errMsg = e3.result.errMsg || e3.result.message, s3 && c3 && (ie({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), Y(H.REFRESH_TOKEN, { token: s3, tokenExpired: c3 }));
        const h2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
        for (let t4 = 0; t4 < h2.length; t4++) {
          const { prop: n4, tips: s4 } = h2[t4];
          if (n4 in e3.result) {
            const t5 = e3.result[n4];
            Object.defineProperty(e3.result, n4, { get: () => (console.warn(s4), t5) });
          }
        }
        return function(e4) {
          return j($(o2, "success"), e4).then(() => j($(o2, "complete"), e4)).then(() => {
            r2(e4, null);
            const t4 = i2._parseResult(e4);
            return Y(H.RESPONSE, { type: J.CLIENT_DB, content: t4 }), Promise.resolve(t4);
          });
        }(e3);
      }, (e3) => {
        /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
        return a2(new te({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId }));
      });
    }
  }
  const us = "token无效，跳转登录页面", hs = "token过期，跳转登录页面", ls = { TOKEN_INVALID_TOKEN_EXPIRED: hs, TOKEN_INVALID_INVALID_CLIENTID: us, TOKEN_INVALID: us, TOKEN_INVALID_WRONG_TOKEN: us, TOKEN_INVALID_ANONYMOUS_USER: us }, ds = { "uni-id-token-expired": hs, "uni-id-check-token-failed": us, "uni-id-token-not-exist": us, "uni-id-check-device-feature-failed": us }, ps = { ...ls, ...ds, default: "用户未登录或登录状态过期，自动跳转登录页面" };
  function fs(e2, t2) {
    let n2 = "";
    return n2 = e2 ? `${e2}/${t2}` : t2, n2.replace(/^\//, "");
  }
  function gs(e2 = [], t2 = "") {
    const n2 = [], s2 = [];
    return e2.forEach((e3) => {
      true === e3.needLogin ? n2.push(fs(t2, e3.path)) : false === e3.needLogin && s2.push(fs(t2, e3.path));
    }), { needLoginPage: n2, notNeedLoginPage: s2 };
  }
  function ms(e2) {
    return e2.split("?")[0].replace(/^\//, "");
  }
  function ys() {
    return function(e2) {
      let t2 = e2 && e2.$page && e2.$page.fullPath;
      return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : "";
    }(function() {
      const e2 = getCurrentPages();
      return e2[e2.length - 1];
    }());
  }
  function _s() {
    return ms(ys());
  }
  function ws(e2 = "", t2 = {}) {
    if (!e2)
      return false;
    if (!(t2 && t2.list && t2.list.length))
      return false;
    const n2 = t2.list, s2 = ms(e2);
    return n2.some((e3) => e3.pagePath === s2);
  }
  const Is = !!e.uniIdRouter;
  const { loginPage: vs, routerNeedLogin: Ss, resToLogin: Ts, needLoginPage: bs, notNeedLoginPage: Es, loginPageInTabBar: ks } = function({ pages: t2 = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = e) {
    const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = gs(t2), { needLoginPage: h2, notNeedLoginPage: l2 } = function(e2 = []) {
      const t3 = [], n3 = [];
      return e2.forEach((e3) => {
        const { root: s3, pages: r3 = [] } = e3, { needLoginPage: i3, notNeedLoginPage: o3 } = gs(r3, s3);
        t3.push(...i3), n3.push(...o3);
      }), { needLoginPage: t3, notNeedLoginPage: n3 };
    }(n2);
    return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...h2], notNeedLoginPage: [...u2, ...l2], loginPageInTabBar: ws(i2, r2) };
  }();
  if (bs.indexOf(vs) > -1)
    throw new Error(`Login page [${vs}] should not be "needLogin", please check your pages.json`);
  function As(e2) {
    const t2 = _s();
    if ("/" === e2.charAt(0))
      return e2;
    const [n2, s2] = e2.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
    i2.pop();
    for (let e3 = 0; e3 < r2.length; e3++) {
      const t3 = r2[e3];
      ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
    }
    return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
  }
  function Ps(e2) {
    const t2 = ms(As(e2));
    return !(Es.indexOf(t2) > -1) && (bs.indexOf(t2) > -1 || Ss.some((t3) => function(e3, t4) {
      return new RegExp(t4).test(e3);
    }(e2, t3)));
  }
  function Cs({ redirect: e2 }) {
    const t2 = ms(e2), n2 = ms(vs);
    return _s() !== n2 && t2 !== n2;
  }
  function Os({ api: e2, redirect: t2 } = {}) {
    if (!t2 || !Cs({ redirect: t2 }))
      return;
    const n2 = function(e3, t3) {
      return "/" !== e3.charAt(0) && (e3 = "/" + e3), t3 ? e3.indexOf("?") > -1 ? e3 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3;
    }(vs, t2);
    ks ? "navigateTo" !== e2 && "redirectTo" !== e2 || (e2 = "switchTab") : "switchTab" === e2 && (e2 = "navigateTo");
    const s2 = { navigateTo: uni.navigateTo, redirectTo: uni.redirectTo, switchTab: uni.switchTab, reLaunch: uni.reLaunch };
    setTimeout(() => {
      s2[e2]({ url: n2 });
    }, 0);
  }
  function xs({ url: e2 } = {}) {
    const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
      const { token: e3, tokenExpired: t3 } = re();
      let n3;
      if (e3) {
        if (t3 < Date.now()) {
          const e4 = "uni-id-token-expired";
          n3 = { errCode: e4, errMsg: ps[e4] };
        }
      } else {
        const e4 = "uni-id-check-token-failed";
        n3 = { errCode: e4, errMsg: ps[e4] };
      }
      return n3;
    }();
    if (Ps(e2) && n2) {
      n2.uniIdRedirectUrl = e2;
      if (z(H.NEED_LOGIN).length > 0)
        return setTimeout(() => {
          Y(H.NEED_LOGIN, n2);
        }, 0), t2.abortLoginPageJump = true, t2;
      t2.autoToLoginPage = true;
    }
    return t2;
  }
  function Ns() {
    !function() {
      const e3 = ys(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = xs({ url: e3 });
      t2 || n2 && Os({ api: "redirectTo", redirect: e3 });
    }();
    const e2 = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
    for (let t2 = 0; t2 < e2.length; t2++) {
      const n2 = e2[t2];
      uni.addInterceptor(n2, { invoke(e3) {
        const { abortLoginPageJump: t3, autoToLoginPage: s2 } = xs({ url: e3.url });
        return t3 ? e3 : s2 ? (Os({ api: n2, redirect: As(e3.url) }), false) : e3;
      } });
    }
  }
  function Rs() {
    this.onResponse((e2) => {
      const { type: t2, content: n2 } = e2;
      let s2 = false;
      switch (t2) {
        case "cloudobject":
          s2 = function(e3) {
            if ("object" != typeof e3)
              return false;
            const { errCode: t3 } = e3 || {};
            return t3 in ps;
          }(n2);
          break;
        case "clientdb":
          s2 = function(e3) {
            if ("object" != typeof e3)
              return false;
            const { errCode: t3 } = e3 || {};
            return t3 in ls;
          }(n2);
      }
      s2 && function(e3 = {}) {
        const t3 = z(H.NEED_LOGIN);
        Z().then(() => {
          const n3 = ys();
          if (n3 && Cs({ redirect: n3 }))
            return t3.length > 0 ? Y(H.NEED_LOGIN, Object.assign({ uniIdRedirectUrl: n3 }, e3)) : void (vs && Os({ api: "navigateTo", redirect: n3 }));
        });
      }(n2);
    });
  }
  function Ls(e2) {
    !function(e3) {
      e3.onResponse = function(e4) {
        V(H.RESPONSE, e4);
      }, e3.offResponse = function(e4) {
        G(H.RESPONSE, e4);
      };
    }(e2), function(e3) {
      e3.onNeedLogin = function(e4) {
        V(H.NEED_LOGIN, e4);
      }, e3.offNeedLogin = function(e4) {
        G(H.NEED_LOGIN, e4);
      }, Is && (U(Qt).needLoginInit || (U(Qt).needLoginInit = true, Z().then(() => {
        Ns.call(e3);
      }), Ts && Rs.call(e3)));
    }(e2), function(e3) {
      e3.onRefreshToken = function(e4) {
        V(H.REFRESH_TOKEN, e4);
      }, e3.offRefreshToken = function(e4) {
        G(H.REFRESH_TOKEN, e4);
      };
    }(e2);
  }
  let Us;
  const Ds = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", Ms = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
  function qs() {
    const e2 = re().token || "", t2 = e2.split(".");
    if (!e2 || 3 !== t2.length)
      return { uid: null, role: [], permission: [], tokenExpired: 0 };
    let n2;
    try {
      n2 = JSON.parse((s2 = t2[1], decodeURIComponent(Us(s2).split("").map(function(e3) {
        return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
      }).join(""))));
    } catch (e3) {
      throw new Error("获取当前用户信息出错，详细错误信息为：" + e3.message);
    }
    var s2;
    return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
  }
  Us = "function" != typeof atob ? function(e2) {
    if (e2 = String(e2).replace(/[\t\n\f\r ]+/g, ""), !Ms.test(e2))
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    var t2;
    e2 += "==".slice(2 - (3 & e2.length));
    for (var n2, s2, r2 = "", i2 = 0; i2 < e2.length; )
      t2 = Ds.indexOf(e2.charAt(i2++)) << 18 | Ds.indexOf(e2.charAt(i2++)) << 12 | (n2 = Ds.indexOf(e2.charAt(i2++))) << 6 | (s2 = Ds.indexOf(e2.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
    return r2;
  } : atob;
  var Fs = n(function(e2, t2) {
    Object.defineProperty(t2, "__esModule", { value: true });
    const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
    function r2(e3, t3) {
      return e3.tempFiles.forEach((e4, n3) => {
        e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
      }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
    }
    function i2(e3, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
      return t3.then((e4) => {
        if (s3) {
          const t4 = s3(e4);
          if (void 0 !== t4)
            return Promise.resolve(t4).then((t5) => void 0 === t5 ? e4 : t5);
        }
        return e4;
      }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, r4) {
        (t5 = Object.assign({}, t5)).errMsg = n2;
        const i3 = t5.tempFiles, o2 = i3.length;
        let a2 = 0;
        return new Promise((n3) => {
          for (; a2 < s4; )
            c2();
          function c2() {
            const s5 = a2++;
            if (s5 >= o2)
              return void (!i3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
            const u2 = i3[s5];
            e4.uploadFile({ provider: u2.provider, filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, cloudPathAsRealPath: u2.cloudPathAsRealPath, onUploadProgress(e5) {
              e5.index = s5, e5.tempFile = u2, e5.tempFilePath = u2.path, r4 && r4(e5);
            } }).then((e5) => {
              u2.url = e5.fileID, s5 < o2 && c2();
            }).catch((e5) => {
              u2.errMsg = e5.errMsg || e5.message, s5 < o2 && c2();
            });
          }
        });
      }(e3, t4, 5, r3));
    }
    t2.initChooseAndUploadFile = function(e3) {
      return function(t3 = { type: "all" }) {
        return "image" === t3.type ? i2(e3, function(e4) {
          const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e4;
          return new Promise((e5, a2) => {
            uni.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
              e5(r2(t5, "image"));
            }, fail(e6) {
              a2({ errMsg: e6.errMsg.replace("chooseImage:fail", s2) });
            } });
          });
        }(t3), t3) : "video" === t3.type ? i2(e3, function(e4) {
          const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e4;
          return new Promise((e5, c2) => {
            uni.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
              const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
              e5(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
            }, fail(e6) {
              c2({ errMsg: e6.errMsg.replace("chooseVideo:fail", s2) });
            } });
          });
        }(t3), t3) : i2(e3, function(e4) {
          const { count: t4, extension: n3 } = e4;
          return new Promise((e5, i3) => {
            let o2 = uni.chooseFile;
            if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (o2 = wx.chooseMessageFile), "function" != typeof o2)
              return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
            o2({ type: "all", count: t4, extension: n3, success(t5) {
              e5(r2(t5));
            }, fail(e6) {
              i3({ errMsg: e6.errMsg.replace("chooseFile:fail", s2) });
            } });
          });
        }(t3), t3);
      };
    };
  }), Ks = t(Fs);
  const js = { auto: "auto", onready: "onready", manual: "manual" };
  function $s(e2) {
    return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {}, mixinDatacomError: null }), created() {
      this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
        var e3 = [];
        return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
          e3.push(this[t2]);
        }), e3;
      }, (e3, t2) => {
        if (this.loadtime === js.manual)
          return;
        let n2 = false;
        const s2 = [];
        for (let r2 = 2; r2 < e3.length; r2++)
          e3[r2] !== t2[r2] && (s2.push(e3[r2]), n2 = true);
        e3[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
      });
    }, methods: { onMixinDatacomPropsChange(e3, t2) {
    }, mixinDatacomEasyGet({ getone: e3 = false, success: t2, fail: n2 } = {}) {
      this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomError = null, this.mixinDatacomGet().then((n3) => {
        this.mixinDatacomLoading = false;
        const { data: s2, count: r2 } = n3.result;
        this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
        const i2 = e3 ? s2.length ? s2[0] : void 0 : s2;
        this.mixinDatacomResData = i2, t2 && t2(i2);
      }).catch((e4) => {
        this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, this.mixinDatacomError = e4, n2 && n2(e4);
      }));
    }, mixinDatacomGet(t2 = {}) {
      let n2;
      t2 = t2 || {}, n2 = "undefined" != typeof __uniX && __uniX ? e2.databaseForJQL(this.spaceInfo) : e2.database(this.spaceInfo);
      const s2 = t2.action || this.action;
      s2 && (n2 = n2.action(s2));
      const r2 = t2.collection || this.collection;
      n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
      const i2 = t2.where || this.where;
      i2 && Object.keys(i2).length && (n2 = n2.where(i2));
      const o2 = t2.field || this.field;
      o2 && (n2 = n2.field(o2));
      const a2 = t2.foreignKey || this.foreignKey;
      a2 && (n2 = n2.foreignKey(a2));
      const c2 = t2.groupby || this.groupby;
      c2 && (n2 = n2.groupBy(c2));
      const u2 = t2.groupField || this.groupField;
      u2 && (n2 = n2.groupField(u2));
      true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
      const h2 = t2.orderby || this.orderby;
      h2 && (n2 = n2.orderBy(h2));
      const l2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, p2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, f2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: p2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
      return f2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (l2 - 1)).limit(d2).get(m2), n2;
    } } };
  }
  function Bs(e2) {
    return function(t2, n2 = {}) {
      n2 = function(e3, t3 = {}) {
        return e3.customUI = t3.customUI || e3.customUI, e3.parseSystemError = t3.parseSystemError || e3.parseSystemError, Object.assign(e3.loadingOptions, t3.loadingOptions), Object.assign(e3.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e3.secretMethods = t3.secretMethods), e3;
      }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
      const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
      return new Proxy({}, { get(s3, c2) {
        switch (c2) {
          case "toString":
            return "[object UniCloudObject]";
          case "toJSON":
            return {};
        }
        return function({ fn: e3, interceptorName: t3, getCallbackArgs: n3 } = {}) {
          return async function(...s4) {
            const r3 = n3 ? n3({ params: s4 }) : {};
            let i3, o3;
            try {
              return await j($(t3, "invoke"), { ...r3 }), i3 = await e3(...s4), await j($(t3, "success"), { ...r3, result: i3 }), i3;
            } catch (e4) {
              throw o3 = e4, await j($(t3, "fail"), { ...r3, error: o3 }), o3;
            } finally {
              await j($(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
            }
          };
        }({ fn: async function s4(...u2) {
          let h2;
          a2 && uni.showLoading({ title: r2.title, mask: r2.mask });
          const d2 = { name: t2, type: l.OBJECT, data: { method: c2, params: u2 } };
          "object" == typeof n2.secretMethods && function(e3, t3) {
            const n3 = t3.data.method, s5 = e3.secretMethods || {}, r3 = s5[n3] || s5["*"];
            r3 && (t3.secretType = r3);
          }(n2, d2);
          let p2 = false;
          try {
            h2 = await e2.callFunction(d2);
          } catch (e3) {
            p2 = true, h2 = { result: new te(e3) };
          }
          const { errSubject: f2, errCode: g2, errMsg: m2, newToken: y2 } = h2.result || {};
          if (a2 && uni.hideLoading(), y2 && y2.token && y2.tokenExpired && (ie(y2), Y(H.REFRESH_TOKEN, { ...y2 })), g2) {
            let e3 = m2;
            if (p2 && o2) {
              e3 = (await o2({ objectName: t2, methodName: c2, params: u2, errSubject: f2, errCode: g2, errMsg: m2 })).errMsg || m2;
            }
            if (a2)
              if ("toast" === i2.type)
                uni.showToast({ title: e3, icon: "none" });
              else {
                if ("modal" !== i2.type)
                  throw new Error(`Invalid errorOptions.type: ${i2.type}`);
                {
                  const { confirm: t3 } = await async function({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                    return new Promise((i3, o3) => {
                      uni.showModal({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e5) {
                        i3(e5);
                      }, fail() {
                        i3({ confirm: false, cancel: true });
                      } });
                    });
                  }({ title: "提示", content: e3, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
                  if (i2.retry && t3)
                    return s4(...u2);
                }
              }
            const n3 = new te({ subject: f2, code: g2, message: m2, requestId: h2.requestId });
            throw n3.detail = h2.result, Y(H.RESPONSE, { type: J.CLOUD_OBJECT, content: n3 }), n3;
          }
          return Y(H.RESPONSE, { type: J.CLOUD_OBJECT, content: h2.result }), h2.result;
        }, interceptorName: "callObject", getCallbackArgs: function({ params: e3 } = {}) {
          return { objectName: t2, methodName: c2, params: e3 };
        } });
      } });
    };
  }
  function Ws(e2) {
    return U(Xt.replace("{spaceId}", e2.config.spaceId));
  }
  async function Hs({ openid: e2, callLoginByWeixin: t2 = false } = {}) {
    Ws(this);
    throw new Error(`[SecureNetwork] API \`initSecureNetworkByWeixin\` is not supported on platform \`${P}\``);
  }
  async function Js(e2) {
    const t2 = Ws(this);
    return t2.initPromise || (t2.initPromise = Hs.call(this, e2).then((e3) => e3).catch((e3) => {
      throw delete t2.initPromise, e3;
    })), t2.initPromise;
  }
  function zs(e2) {
    return function({ openid: t2, callLoginByWeixin: n2 = false } = {}) {
      return Js.call(e2, { openid: t2, callLoginByWeixin: n2 });
    };
  }
  function Vs(e2) {
    !function(e3) {
      he = e3;
    }(e2);
  }
  function Gs(e2) {
    const n2 = { getAppBaseInfo: uni.getSystemInfo, getPushClientId: uni.getPushClientId };
    return function(s2) {
      return new Promise((r2, i2) => {
        n2[e2]({ ...s2, success(e3) {
          r2(e3);
        }, fail(e3) {
          i2(e3);
        } });
      });
    };
  }
  class Ys extends S {
    constructor() {
      super(), this._uniPushMessageCallback = this._receivePushMessage.bind(this), this._currentMessageId = -1, this._payloadQueue = [];
    }
    init() {
      return Promise.all([Gs("getAppBaseInfo")(), Gs("getPushClientId")()]).then(([{ appId: e2 } = {}, { cid: t2 } = {}] = []) => {
        if (!e2)
          throw new Error("Invalid appId, please check the manifest.json file");
        if (!t2)
          throw new Error("Invalid push client id");
        this._appId = e2, this._pushClientId = t2, this._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), this.emit("open"), this._initMessageListener();
      }, (e2) => {
        throw this.emit("error", e2), this.close(), e2;
      });
    }
    async open() {
      return this.init();
    }
    _isUniCloudSSE(e2) {
      if ("receive" !== e2.type)
        return false;
      const t2 = e2 && e2.data && e2.data.payload;
      return !(!t2 || "UNI_CLOUD_SSE" !== t2.channel || t2.seqId !== this._seqId);
    }
    _receivePushMessage(e2) {
      if (!this._isUniCloudSSE(e2))
        return;
      const t2 = e2 && e2.data && e2.data.payload, { action: n2, messageId: s2, message: r2 } = t2;
      this._payloadQueue.push({ action: n2, messageId: s2, message: r2 }), this._consumMessage();
    }
    _consumMessage() {
      for (; ; ) {
        const e2 = this._payloadQueue.find((e3) => e3.messageId === this._currentMessageId + 1);
        if (!e2)
          break;
        this._currentMessageId++, this._parseMessagePayload(e2);
      }
    }
    _parseMessagePayload(e2) {
      const { action: t2, messageId: n2, message: s2 } = e2;
      "end" === t2 ? this._end({ messageId: n2, message: s2 }) : "message" === t2 && this._appendMessage({ messageId: n2, message: s2 });
    }
    _appendMessage({ messageId: e2, message: t2 } = {}) {
      this.emit("message", t2);
    }
    _end({ messageId: e2, message: t2 } = {}) {
      this.emit("end", t2), this.close();
    }
    _initMessageListener() {
      uni.onPushMessage(this._uniPushMessageCallback);
    }
    _destroy() {
      uni.offPushMessage(this._uniPushMessageCallback);
    }
    toJSON() {
      return { appId: this._appId, pushClientId: this._pushClientId, seqId: this._seqId };
    }
    close() {
      this._destroy(), this.emit("close");
    }
  }
  async function Qs(e2) {
    {
      const { osName: e3, osVersion: t3 } = ce();
      "ios" === e3 && function(e4) {
        if (!e4 || "string" != typeof e4)
          return 0;
        const t4 = e4.match(/^(\d+)./);
        return t4 && t4[1] ? parseInt(t4[1]) : 0;
      }(t3) >= 14 && console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发期间需要，发行后不需要）");
    }
    const t2 = e2.__dev__;
    if (!t2.debugInfo)
      return;
    const { address: n2, servePort: s2 } = t2.debugInfo, { address: r2 } = await Ot(n2, s2);
    if (r2)
      return t2.localAddress = r2, void (t2.localPort = s2);
    const i2 = console["error"];
    let o2 = "";
    if ("remote" === t2.debugInfo.initialLaunchType ? (t2.debugInfo.forceRemote = true, o2 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o2 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o2 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === P.indexOf("mp-") && (o2 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t2.debugInfo.forceRemote)
      throw new Error(o2);
    i2(o2);
  }
  function Xs(e2) {
    e2._initPromiseHub || (e2._initPromiseHub = new v({ createPromise: function() {
      let t2 = Promise.resolve();
      var n2;
      n2 = 1, t2 = new Promise((e3) => {
        setTimeout(() => {
          e3();
        }, n2);
      });
      const s2 = e2.auth();
      return t2.then(() => s2.getLoginState()).then((e3) => e3 ? Promise.resolve() : s2.signInAnonymously());
    } }));
  }
  const Zs = { tcb: Pt, tencent: Pt, aliyun: fe, private: Rt, dcloud: Rt, alipay: Bt };
  let er = new class {
    init(e2) {
      let t2 = {};
      const n2 = Zs[e2.provider];
      if (!n2)
        throw new Error("未提供正确的provider参数");
      t2 = n2.init(e2), function(e3) {
        const t3 = {};
        e3.__dev__ = t3, t3.debugLog = "app" === P;
        const n3 = C;
        n3 && !n3.code && (t3.debugInfo = n3);
        const s2 = new v({ createPromise: function() {
          return Qs(e3);
        } });
        t3.initLocalNetwork = function() {
          return s2.exec();
        };
      }(t2), Xs(t2), Gn(t2), function(e3) {
        const t3 = e3.uploadFile;
        e3.uploadFile = function(e4) {
          return t3.call(this, e4);
        };
      }(t2), function(e3) {
        e3.database = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e3.init(t3).database();
          if (this._database)
            return this._database;
          const n3 = as(cs, { uniClient: e3 });
          return this._database = n3, n3;
        }, e3.databaseForJQL = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e3.init(t3).databaseForJQL();
          if (this._databaseForJQL)
            return this._databaseForJQL;
          const n3 = as(cs, { uniClient: e3, isJQL: true });
          return this._databaseForJQL = n3, n3;
        };
      }(t2), function(e3) {
        e3.getCurrentUserInfo = qs, e3.chooseAndUploadFile = Ks.initChooseAndUploadFile(e3), Object.assign(e3, { get mixinDatacom() {
          return $s(e3);
        } }), e3.SSEChannel = Ys, e3.initSecureNetworkByWeixin = zs(e3), e3.setCustomClientInfo = Vs, e3.importObject = Bs(e3);
      }(t2);
      return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
        if (!t2[e3])
          return;
        const n3 = t2[e3];
        t2[e3] = function() {
          return n3.apply(t2, Array.from(arguments));
        }, t2[e3] = (/* @__PURE__ */ function(e4, t3) {
          return function(n4) {
            let s2 = false;
            if ("callFunction" === t3) {
              const e5 = n4 && n4.type || l.DEFAULT;
              s2 = e5 !== l.DEFAULT;
            }
            const r2 = "callFunction" === t3 && !s2, i2 = this._initPromiseHub.exec();
            n4 = n4 || {};
            const { success: o2, fail: a2, complete: c2 } = ee(n4), u2 = i2.then(() => s2 ? Promise.resolve() : j($(t3, "invoke"), n4)).then(() => e4.call(this, n4)).then((e5) => s2 ? Promise.resolve(e5) : j($(t3, "success"), e5).then(() => j($(t3, "complete"), e5)).then(() => (r2 && Y(H.RESPONSE, { type: J.CLOUD_FUNCTION, content: e5 }), Promise.resolve(e5))), (e5) => s2 ? Promise.reject(e5) : j($(t3, "fail"), e5).then(() => j($(t3, "complete"), e5)).then(() => (Y(H.RESPONSE, { type: J.CLOUD_FUNCTION, content: e5 }), Promise.reject(e5))));
            if (!(o2 || a2 || c2))
              return u2;
            u2.then((e5) => {
              o2 && o2(e5), c2 && c2(e5), r2 && Y(H.RESPONSE, { type: J.CLOUD_FUNCTION, content: e5 });
            }, (e5) => {
              a2 && a2(e5), c2 && c2(e5), r2 && Y(H.RESPONSE, { type: J.CLOUD_FUNCTION, content: e5 });
            });
          };
        }(t2[e3], e3)).bind(t2);
      }), t2.init = this.init, t2;
    }
  }();
  (() => {
    const e2 = O;
    let t2 = {};
    if (e2 && 1 === e2.length)
      t2 = e2[0], er = er.init(t2), er._isDefault = true;
    else {
      const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile"], n2 = ["database", "getCurrentUserInfo", "importObject"];
      let s2;
      s2 = e2 && e2.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", [...t3, ...n2].forEach((e3) => {
        er[e3] = function() {
          if (console.error(s2), -1 === n2.indexOf(e3))
            return Promise.reject(new te({ code: "SYS_ERR", message: s2 }));
          console.error(s2);
        };
      });
    }
    if (Object.assign(er, { get mixinDatacom() {
      return $s(er);
    } }), Ls(er), er.addInterceptor = F, er.removeInterceptor = K, er.interceptObject = B, uni.__uniCloud = er, "app" === P) {
      const e3 = D();
      e3.uniCloud = er, e3.UniCloudError = te;
    }
  })();
  var tr = er;
  function callCheckVersion() {
    return new Promise((resolve, reject) => {
      const systemInfo = uni.getSystemInfoSync();
      const appId = systemInfo.appId;
      const appVersion = systemInfo.appVersion;
      if (typeof appId === "string" && typeof appVersion === "string" && appId.length > 0 && appVersion.length > 0) {
        plus.runtime.getProperty(appId, function(widgetInfo) {
          if (widgetInfo.version) {
            let data = {
              action: "checkVersion",
              appid: appId,
              appVersion,
              wgtVersion: widgetInfo.version
            };
            tr.callFunction({
              name: "uni-upgrade-center",
              data,
              success: (e2) => {
                resolve(e2.result);
              },
              fail: (error) => {
                reject(error);
              }
            });
          } else {
            reject("widgetInfo.version is EMPTY");
          }
        });
      } else {
        reject("plus.runtime.appid is EMPTY");
      }
    });
  }
  const platform_iOS = "iOS";
  const platform_Android = "Android";
  const platform_Harmony = "Harmony";
  function compare(v_1 = "0", v_2 = "0") {
    const v1 = String(v_1).split(".");
    const v2 = String(v_2).split(".");
    const minVersionLens = Math.min(v1.length, v2.length);
    let result = 0;
    for (let i2 = 0; i2 < minVersionLens; i2++) {
      const curV1 = Number(v1[i2]);
      const curV2 = Number(v2[i2]);
      if (curV1 > curV2) {
        result = 1;
        break;
      } else if (curV1 < curV2) {
        result = -1;
        break;
      }
    }
    if (result === 0 && v1.length !== v2.length) {
      const v1BiggerThenv2 = v1.length > v2.length;
      const maxLensVersion = v1BiggerThenv2 ? v1 : v2;
      for (let i2 = minVersionLens; i2 < maxLensVersion.length; i2++) {
        const curVersion = Number(maxLensVersion[i2]);
        if (curVersion > 0) {
          v1BiggerThenv2 ? result = 1 : result = -1;
          break;
        }
      }
    }
    return result;
  }
  const PACKAGE_INFO_KEY = "__package_info__";
  function checkUpdate() {
    return new Promise((resolve, reject) => {
      callCheckVersion().then(async (uniUpgradeCenterResult) => {
        const code = uniUpgradeCenterResult.code;
        const message = uniUpgradeCenterResult.message;
        const url = uniUpgradeCenterResult.url;
        if (code > 0) {
          if (/^cloud:\/\//.test(url)) {
            const tcbRes = await tr.getTempFileURL({ fileList: [url] });
            if (typeof tcbRes.fileList[0].tempFileURL !== "undefined")
              uniUpgradeCenterResult.url = tcbRes.fileList[0].tempFileURL;
          }
          if (uniUpgradeCenterResult.is_silently) {
            uni.downloadFile({
              url: uniUpgradeCenterResult.url,
              success: (res) => {
                if (res.statusCode == 200) {
                  plus.runtime.install(res.tempFilePath, {
                    force: false
                  });
                }
              }
            });
            return;
          }
          uni.setStorageSync(PACKAGE_INFO_KEY, uniUpgradeCenterResult);
          uni.navigateTo({
            url: `/uni_modules/uni-upgrade-center-app/pages/upgrade-popup?local_storage_key=${PACKAGE_INFO_KEY}`,
            fail: (err) => {
              formatAppLog("error", "at uni_modules/uni-upgrade-center-app/utils/check-update.ts:63", "更新弹框跳转失败", err);
              uni.removeStorageSync(PACKAGE_INFO_KEY);
            }
          });
          return resolve(uniUpgradeCenterResult);
        } else if (code < 0) {
          formatAppLog("error", "at uni_modules/uni-upgrade-center-app/utils/check-update.ts:93", message);
          return reject(uniUpgradeCenterResult);
        }
        return resolve(uniUpgradeCenterResult);
      }).catch((err) => {
        reject(err);
      });
    });
  }
  const _sfc_main$e = {
    components: {
      Navbar
    },
    onReady() {
      checkUpdate();
    },
    data() {
      return {
        strAccount: "",
        // 用户输入的账号
        password: "",
        // 用户输入的密码
        clientCodes: [],
        // 客户编码列表
        selectedClientCode: ""
        // 选中的客户编码
      };
    },
    onLoad() {
      this.loadClientCodes();
    },
    methods: {
      loadClientCodes() {
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/GetClientCode",
          // 请求客户编码接口
          method: "GET",
          success: (res) => {
            const data = JSON.parse(res.data);
            if (data && data.list) {
              this.clientCodes = data.list.map((item) => item.ClientCode);
              formatAppLog("log", "at pages/login/login.vue:58", "加载成功:", this.clientCodes);
            } else {
              formatAppLog("error", "at pages/login/login.vue:60", "加载客户编码失败:", data ? data.message : "无效的返回数据");
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/login/login.vue:64", "加载客户编码失败", err);
          }
        });
      },
      handleClientCodeChange(event) {
        this.selectedClientCode = this.clientCodes[event.detail.value];
      },
      login() {
        if (this.strAccount && this.password && this.selectedClientCode) {
          uni.request({
            url: "http://13.94.38.44:8080/CheckList/SignIn",
            // 登录验证接口
            method: "POST",
            data: {
              strAccount: this.strAccount,
              strPswd: this.password,
              clientcode: this.selectedClientCode
            },
            success: (res) => {
              const data = JSON.parse(res.data);
              formatAppLog("log", "at pages/login/login.vue:85", "数据为:", data);
              if (data.IsError === false) {
                uni.setStorageSync("token", data.token);
                uni.setStorageSync("username", data.userName);
                uni.setStorageSync("clientcode", this.selectedClientCode);
                formatAppLog("log", "at pages/login/login.vue:91", data.token);
                uni.showToast({
                  title: "登录成功",
                  icon: "success"
                });
                uni.redirectTo({
                  url: "/pages/home/home"
                  // 跳转到主页
                });
              } else {
                uni.showToast({
                  title: "用户名或密码错误",
                  icon: "none"
                });
              }
            },
            fail: (err) => {
              formatAppLog("error", "at pages/login/login.vue:107", "登录失败", err);
              uni.showToast({
                title: "登录失败，请稍后重试",
                icon: "none"
              });
            }
          });
        } else {
          uni.showToast({
            title: "请输入完整的登录信息",
            icon: "none",
            complete: () => {
              uni.reLaunch({
                url: "/pages/login/login"
              });
            }
          });
        }
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Navbar = vue.resolveComponent("Navbar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_Navbar),
      vue.createElementVNode("view", { class: "login-box" }, [
        vue.createElementVNode("view", { class: "title" }, "登录"),
        vue.createElementVNode("picker", {
          mode: "selector",
          range: $data.clientCodes,
          onChange: _cache[0] || (_cache[0] = (...args) => $options.handleClientCodeChange && $options.handleClientCodeChange(...args))
        }, [
          vue.createElementVNode(
            "view",
            { class: "picker" },
            vue.toDisplayString($data.selectedClientCode || "选择客户编码"),
            1
            /* TEXT */
          )
        ], 40, ["range"]),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            type: "text",
            placeholder: " 账号",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.strAccount = $event),
            class: "input"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $data.strAccount]
        ]),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            type: "password",
            placeholder: "密码",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.password = $event),
            class: "input"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $data.password]
        ]),
        vue.createElementVNode("button", {
          onClick: _cache[3] || (_cache[3] = (...args) => $options.login && $options.login(...args)),
          class: "button"
        }, "登录")
      ]),
      vue.createElementVNode("view", { class: "email-box" }, [
        vue.createElementVNode("view", null, "如遇bug"),
        vue.createElementVNode("view", null, "请联系:zhangjialin@shenchuan.com")
      ])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__file", "D:/Project/HBuilderProjects/dianjianHmS/dianjian02/pages/login/login.vue"]]);
  const { registerUTSInterface, initUTSProxyClass, initUTSProxyFunction, initUTSPackageName, initUTSIndexClassName, initUTSClassName } = uni;
  const name = "utsProgressNotification";
  const moduleName = "uts-progressNotification";
  const moduleType = "";
  const errMsg = ``;
  const is_uni_modules = true;
  const pkg = /* @__PURE__ */ initUTSPackageName(name, is_uni_modules);
  const cls = /* @__PURE__ */ initUTSIndexClassName(name, is_uni_modules);
  const createNotificationProgress = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "createNotificationProgressByJs", keepAlive: false, params: [{ "name": "options", "type": "UTSSDKModulesUtsProgressNotificationCreateNotificationProgressOptionsJSONObject" }], return: "" });
  const cancelNotificationProgress = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "cancelNotificationProgressByJs", keepAlive: false, params: [], return: "" });
  const finishNotificationProgress = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "finishNotificationProgressByJs", keepAlive: false, params: [{ "name": "options", "type": "UTSSDKModulesUtsProgressNotificationFinishNotificationProgressOptionsJSONObject" }], return: "" });
  const _imports_0$2 = "/uni_modules/uni-upgrade-center-app/static/app/bg_top.png";
  const _imports_1$2 = "/uni_modules/uni-upgrade-center-app/static/app/app_update_close.png";
  const localFilePathKey = "UNI_ADMIN_UPGRADE_CENTER_LOCAL_FILE_PATH";
  let downloadTask = null;
  let openSchemePromise;
  const _sfc_main$d = {
    emits: ["close", "show"],
    data() {
      return {
        // 从之前下载安装
        installForBeforeFilePath: "",
        // 安装
        installed: false,
        installing: false,
        // 下载
        downloadSuccess: false,
        downloading: false,
        downLoadPercent: 0,
        downloadedSize: 0,
        packageFileSize: 0,
        tempFilePath: "",
        // 要安装的本地包地址
        // 默认安装包信息
        title: "更新日志",
        contents: "",
        version: "",
        is_mandatory: false,
        url: "",
        platform: [],
        store_list: null,
        // 可自定义属性
        subTitle: "发现新版本",
        downLoadBtnTextiOS: "立即跳转更新",
        downLoadBtnText: "立即下载更新",
        downLoadingText: "安装包下载中，请稍后",
        shown: true
      };
    },
    onLoad({ local_storage_key }) {
      if (!local_storage_key) {
        formatAppLog("error", "at uni_modules/uni-upgrade-center-app/pages/upgrade-popup.vue:130", "local_storage_key为空，请检查后重试");
        uni.navigateBack();
        return;
      }
      const localPackageInfo = uni.getStorageSync(local_storage_key);
      if (!localPackageInfo) {
        formatAppLog("error", "at uni_modules/uni-upgrade-center-app/pages/upgrade-popup.vue:137", "安装包信息为空，请检查后重试");
        uni.navigateBack();
        return;
      }
      this.setLocalPackageInfo(localPackageInfo);
    },
    onBackPress() {
      if (this.is_mandatory)
        return true;
      if (!this.needNotificationProgress)
        downloadTask && downloadTask.abort();
    },
    onHide() {
      openSchemePromise = null;
    },
    computed: {
      isWGT() {
        return this.type === "wgt";
      },
      isNativeApp() {
        return this.type === "native_app";
      },
      isiOS() {
        return this.platform.indexOf(platform_iOS) !== -1;
      },
      isAndroid() {
        return this.platform.indexOf(platform_Android) !== -1;
      },
      isHarmony() {
        return this.platform.indexOf(platform_Harmony) !== -1;
      },
      isApplicationStore() {
        return !this.isWGT && this.isNativeApp && (this.isiOS || this.isHarmony);
      },
      needNotificationProgress() {
        return this.platform.indexOf(platform_iOS) === -1 && !this.is_mandatory && !this.isHarmony;
      }
    },
    methods: {
      show(shown, localPackageInfo) {
      },
      setLocalPackageInfo(localPackageInfo) {
        const requiredKey = ["version", "url", "type"];
        for (let key in localPackageInfo) {
          if (requiredKey.indexOf(key) !== -1 && !localPackageInfo[key]) {
            formatAppLog("error", "at uni_modules/uni-upgrade-center-app/pages/upgrade-popup.vue:195", `参数 ${key} 必填，请检查后重试`);
            uni.navigateBack();
            return;
          }
        }
        Object.assign(this, localPackageInfo);
        this.checkLocalStoragePackage();
      },
      checkLocalStoragePackage() {
        const localFilePathRecord = uni.getStorageSync(localFilePathKey);
        if (localFilePathRecord) {
          const { version, savedFilePath, installed } = localFilePathRecord;
          if (!installed && compare(version, this.version) === 0) {
            this.downloadSuccess = true;
            this.installForBeforeFilePath = savedFilePath;
            this.tempFilePath = savedFilePath;
          } else {
            this.deleteSavedFile(savedFilePath);
          }
        }
      },
      askAbortDownload() {
        uni.showModal({
          title: "是否取消下载？",
          cancelText: "否",
          confirmText: "是",
          success: (res) => {
            if (res.confirm) {
              downloadTask && downloadTask.abort();
              if (this.needNotificationProgress) {
                cancelNotificationProgress();
              }
              uni.navigateBack();
            }
          }
        });
      },
      async closeUpdate() {
        if (this.downloading) {
          if (this.is_mandatory) {
            return uni.showToast({
              title: "下载中，请稍后……",
              icon: "none",
              duration: 500
            });
          }
          if (!this.needNotificationProgress) {
            this.askAbortDownload();
            return;
          }
        }
        if (!this.needNotificationProgress && this.downloadSuccess && this.tempFilePath) {
          await this.saveFile(this.tempFilePath, this.version);
        }
        uni.navigateBack();
      },
      updateApp() {
        this.checkStoreScheme().catch(() => {
          this.downloadPackage();
        }).finally(() => {
          openSchemePromise = null;
        });
      },
      // 跳转应用商店
      checkStoreScheme() {
        const storeList = (this.store_list || []).filter((item) => item.enable);
        if (storeList && storeList.length) {
          storeList.sort((cur, next) => next.priority - cur.priority).map((item) => item.scheme).reduce((promise, cur, curIndex) => {
            openSchemePromise = (promise || (promise = Promise.reject())).catch(() => {
              return new Promise((resolve, reject) => {
                plus.runtime.openURL(cur, (err) => {
                  reject(err);
                });
              });
            });
            return openSchemePromise;
          }, openSchemePromise);
          return openSchemePromise;
        }
        return Promise.reject();
      },
      downloadPackage() {
        this.downloading = true;
        downloadTask = uni.downloadFile({
          url: this.url,
          success: (res) => {
            if (res.statusCode == 200) {
              if (this.isWGT && res.tempFilePath.split(".").slice(-1)[0] !== "wgt") {
                const failCallback = (e2) => {
                  formatAppLog("log", "at uni_modules/uni-upgrade-center-app/pages/upgrade-popup.vue:311", "[FILE RENAME FAIL]：", JSON.stringify(e2));
                };
                plus.io.resolveLocalFileSystemURL(
                  res.tempFilePath,
                  (entry) => {
                    entry.getParent((parent) => {
                      const newName = `new_wgt_${Date.now()}.wgt`;
                      entry.copyTo(
                        parent,
                        newName,
                        (res2) => {
                          this.tempFilePath = res2.fullPath;
                          this.downLoadComplete();
                        },
                        failCallback
                      );
                    }, failCallback);
                  },
                  failCallback
                );
              } else {
                this.tempFilePath = res.tempFilePath;
                this.downLoadComplete();
              }
            } else {
              formatAppLog("log", "at uni_modules/uni-upgrade-center-app/pages/upgrade-popup.vue:341", "下载错误：" + JSON.stringify(res));
              this.downloadFail();
            }
          },
          fail: (err) => {
            formatAppLog("log", "at uni_modules/uni-upgrade-center-app/pages/upgrade-popup.vue:346", "下载错误：" + JSON.stringify(err));
            this.downloadFail();
          }
        });
        downloadTask.onProgressUpdate((res) => {
          this.downLoadPercent = res.progress;
          this.downloadedSize = (res.totalBytesWritten / Math.pow(1024, 2)).toFixed(2);
          this.packageFileSize = (res.totalBytesExpectedToWrite / Math.pow(1024, 2)).toFixed(2);
          if (this.needNotificationProgress && !this.downloadSuccess) {
            createNotificationProgress({
              title: "升级中心正在下载安装包……",
              content: `${this.downLoadPercent}%`,
              progress: this.downLoadPercent,
              onClick: () => {
                this.askAbortDownload();
              }
            });
          }
        });
        if (this.needNotificationProgress) {
          uni.navigateBack();
        }
      },
      downloadFail() {
        const errMsg2 = "下载失败，请点击重试";
        this.downloadSuccess = false;
        this.downloading = false;
        this.downLoadPercent = 0;
        this.downloadedSize = 0;
        this.packageFileSize = 0;
        this.downLoadBtnText = errMsg2;
        downloadTask = null;
        if (this.needNotificationProgress) {
          finishNotificationProgress({
            title: "升级包下载失败",
            content: "请重新检查更新"
          });
        }
      },
      downLoadComplete() {
        this.downloadSuccess = true;
        this.downloading = false;
        this.downLoadPercent = 0;
        this.downloadedSize = 0;
        this.packageFileSize = 0;
        downloadTask = null;
        if (this.needNotificationProgress) {
          finishNotificationProgress({
            title: "安装升级包",
            content: "下载完成"
          });
          this.installPackage();
          return;
        }
        if (this.is_mandatory) {
          this.installPackage();
        }
      },
      installPackage() {
        if (this.isWGT) {
          this.installing = true;
        }
        plus.runtime.install(
          this.tempFilePath,
          {
            force: false
          },
          async (res) => {
            this.installing = false;
            this.installed = true;
            if (this.isWGT) {
              if (this.is_mandatory) {
                uni.showLoading({
                  icon: "none",
                  title: "安装成功，正在重启……"
                });
                setTimeout(() => {
                  uni.hideLoading();
                  this.restart();
                }, 1e3);
              }
            } else {
              const localFilePathRecord = uni.getStorageSync(localFilePathKey);
              uni.setStorageSync(localFilePathKey, {
                ...localFilePathRecord,
                installed: true
              });
            }
          },
          async (err) => {
            if (this.installForBeforeFilePath) {
              await this.deleteSavedFile(this.installForBeforeFilePath);
              this.installForBeforeFilePath = "";
            }
            this.installing = false;
            this.installed = false;
            uni.showModal({
              title: "更新失败，请重新下载",
              content: err.message,
              showCancel: false
            });
          }
        );
        if (!this.isWGT && !this.is_mandatory) {
          uni.navigateBack();
        }
      },
      restart() {
        this.installed = false;
        plus.runtime.restart();
      },
      saveFile(tempFilePath, version) {
        return new Promise((resolve, reject) => {
          uni.saveFile({
            tempFilePath,
            success({ savedFilePath }) {
              uni.setStorageSync(localFilePathKey, {
                version,
                savedFilePath
              });
            },
            complete() {
              resolve();
            }
          });
        });
      },
      deleteSavedFile(filePath) {
        uni.removeStorageSync(localFilePathKey);
        return uni.removeSavedFile({
          filePath
        });
      },
      jumpToApplicationStore() {
        plus.runtime.openURL(this.url);
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.shown ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "mask flex-center"
    }, [
      vue.createElementVNode("view", { class: "content botton-radius" }, [
        vue.createElementVNode("view", { class: "content-top" }, [
          vue.createElementVNode(
            "text",
            { class: "content-top-text" },
            vue.toDisplayString($data.title),
            1
            /* TEXT */
          ),
          vue.createElementVNode("image", {
            class: "content-top",
            style: { "top": "0" },
            width: "100%",
            height: "100%",
            src: _imports_0$2
          })
        ]),
        vue.createElementVNode("view", { class: "content-header" }),
        vue.createElementVNode("view", { class: "content-body" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($data.subTitle),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "text",
              { class: "content-body-version" },
              vue.toDisplayString($data.version),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "body" }, [
            vue.createElementVNode("scroll-view", {
              class: "box-des-scroll",
              "scroll-y": "true"
            }, [
              vue.createElementVNode(
                "text",
                { class: "box-des" },
                vue.toDisplayString($data.contents),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createElementVNode("view", { class: "footer flex-center" }, [
            $options.isApplicationStore ? (vue.openBlock(), vue.createElementBlock(
              "button",
              {
                key: 0,
                class: "content-button",
                style: { "border": "none", "color": "#fff" },
                plain: "",
                onClick: _cache[0] || (_cache[0] = (...args) => $options.jumpToApplicationStore && $options.jumpToApplicationStore(...args))
              },
              vue.toDisplayString($data.downLoadBtnTextiOS),
              1
              /* TEXT */
            )) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 1 },
              [
                !$data.downloadSuccess ? (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 0 },
                  [
                    $data.downloading ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "progress-box flex-column"
                    }, [
                      vue.createElementVNode("progress", {
                        class: "progress",
                        percent: $data.downLoadPercent,
                        activeColor: "#3DA7FF",
                        "show-info": "",
                        "stroke-width": "10"
                      }, null, 8, ["percent"]),
                      vue.createElementVNode("view", { style: { "width": "100%", "font-size": "28rpx", "display": "flex", "justify-content": "space-around" } }, [
                        vue.createElementVNode(
                          "text",
                          null,
                          vue.toDisplayString($data.downLoadingText),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          null,
                          "(" + vue.toDisplayString($data.downloadedSize) + "/" + vue.toDisplayString($data.packageFileSize) + "M)",
                          1
                          /* TEXT */
                        )
                      ])
                    ])) : (vue.openBlock(), vue.createElementBlock(
                      "button",
                      {
                        key: 1,
                        class: "content-button",
                        style: { "border": "none", "color": "#fff" },
                        plain: "",
                        onClick: _cache[1] || (_cache[1] = (...args) => $options.updateApp && $options.updateApp(...args))
                      },
                      vue.toDisplayString($data.downLoadBtnText),
                      1
                      /* TEXT */
                    ))
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : $data.downloadSuccess && !$data.installed ? (vue.openBlock(), vue.createElementBlock("button", {
                  key: 1,
                  class: "content-button",
                  style: { "border": "none", "color": "#fff" },
                  plain: "",
                  loading: $data.installing,
                  disabled: $data.installing,
                  onClick: _cache[2] || (_cache[2] = (...args) => $options.installPackage && $options.installPackage(...args))
                }, vue.toDisplayString($data.installing ? "正在安装……" : "下载完成，立即安装"), 9, ["loading", "disabled"])) : $data.installed && !$options.isWGT ? (vue.openBlock(), vue.createElementBlock("button", {
                  key: 2,
                  class: "content-button",
                  style: { "border": "none", "color": "#fff" },
                  plain: "",
                  loading: $data.installing,
                  disabled: $data.installing,
                  onClick: _cache[3] || (_cache[3] = (...args) => $options.installPackage && $options.installPackage(...args))
                }, " 安装未完成，点击安装 ", 8, ["loading", "disabled"])) : $data.installed && $options.isWGT ? (vue.openBlock(), vue.createElementBlock("button", {
                  key: 3,
                  class: "content-button",
                  style: { "border": "none", "color": "#fff" },
                  plain: "",
                  onClick: _cache[4] || (_cache[4] = (...args) => $options.restart && $options.restart(...args))
                }, "安装完毕，点击重启")) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ])
        ]),
        !$data.is_mandatory ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "close-img",
          src: _imports_1$2,
          onClick: _cache[5] || (_cache[5] = vue.withModifiers((...args) => $options.closeUpdate && $options.closeUpdate(...args), ["stop"]))
        })) : vue.createCommentVNode("v-if", true)
      ])
    ])) : vue.createCommentVNode("v-if", true);
  }
  const UniModulesUniUpgradeCenterAppPagesUpgradePopup = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__file", "D:/Project/HBuilderProjects/dianjianHmS/dianjian02/uni_modules/uni-upgrade-center-app/pages/upgrade-popup.vue"]]);
  const _sfc_main$c = {
    props: {
      buttons: {
        type: Array,
        required: true
      }
    },
    methods: {
      // 处理按钮点击事件
      handleClick(action) {
        if (typeof action === "function") {
          action();
        }
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "button-group" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($props.buttons, (button, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            key: index,
            class: "ZujianButton-item"
          }, [
            vue.createElementVNode("button", {
              disabled: button.disabled,
              onClick: ($event) => $options.handleClick(button.action),
              class: "ZujianButton"
            }, [
              button.image ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 0,
                src: button.image,
                class: "button-image"
              }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
              vue.createTextVNode(
                " " + vue.toDisplayString(button.label) + " ",
                1
                /* TEXT */
              ),
              button.badge ? (vue.openBlock(), vue.createElementBlock(
                "span",
                {
                  key: 1,
                  class: "badge"
                },
                vue.toDisplayString(button.badge),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true)
            ], 8, ["disabled", "onClick"])
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const ButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__scopeId", "data-v-8e810d98"], ["__file", "D:/Project/HBuilderProjects/dianjianHmS/dianjian02/components/ButtonGroup.vue"]]);
  function scanAndNavigate(position, loadInspectionDetails) {
    uni.scanCode({
      success: (res) => {
        formatAppLog("log", "at utils/scanAndNavigate.js:4", "扫描成功", res);
        verifyQRCode(res.result, position, loadInspectionDetails);
      },
      fail: (err) => {
        formatAppLog("error", "at utils/scanAndNavigate.js:8", "扫描失败", err);
      }
    });
  }
  function verifyQRCode(result, position, loadInspectionDetails) {
    const token = uni.getStorageSync("token");
    uni.request({
      url: "http://13.94.38.44:8080/CheckList/GetCheckListDetailNew",
      method: "POST",
      data: {
        code: result.substring(0, 3),
        // 使用二维码的前三个字符作为代码
        token
      },
      success: (res) => {
        const data = JSON.parse(res.data);
        if (!data.isError) {
          const qrCodePrefix = result.substring(0, 3).toLowerCase();
          const selTxtPrefix = position.SEL_TXT.toLowerCase();
          if (qrCodePrefix === selTxtPrefix) {
            uni.showToast({
              title: "巡查点正确",
              icon: "success"
            });
            loadInspectionDetails(qrCodePrefix, position);
          } else {
            uni.showToast({
              title: "位置不匹配",
              icon: "none"
            });
          }
        } else {
          formatAppLog("error", "at utils/scanAndNavigate.js:41", "加载点检详情失败:", data.msg);
          uni.showToast({
            title: data.msg,
            icon: "none"
          });
        }
      },
      fail: (err) => {
        formatAppLog("error", "at utils/scanAndNavigate.js:49", "加载点检详情失败", err);
        uni.showToast({
          title: "加载点检详情失败",
          icon: "none"
        });
      }
    });
  }
  const _sfc_main$b = {
    components: {
      Navbar,
      ButtonGroup
    },
    data() {
      return {
        username: uni.getStorageSync("username") || "",
        buttons: []
        // 用于存储点检项目的按钮数据
      };
    },
    onLoad() {
      this.getInspectionItems();
    },
    onPullDownRefresh() {
      this.getInspectionItems(() => {
        uni.stopPullDownRefresh();
      });
    },
    methods: {
      getInspectionItems(callback) {
        const token = uni.getStorageSync("token");
        const clientCode = uni.getStorageSync("clientcode");
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/GetAllCheckListByClientCode",
          method: "POST",
          data: {
            code: clientCode,
            // 使用存储的客户编码
            token
          },
          success: (res) => {
            const data = JSON.parse(res.data);
            formatAppLog("log", "at pages/inspection/inspection.vue:50", "token:", token);
            if (!data.isError) {
              this.buttons = data.list.map((item) => ({
                label: item.SEL_ShuoMing,
                action: () => scanAndNavigate(item, this.loadInspectionDetails),
                image: "../../static/icon/DJxiangmu.png"
              }));
              formatAppLog("log", "at pages/inspection/inspection.vue:58", "点检项目加载成功:", this.buttons);
            } else {
              formatAppLog("error", "at pages/inspection/inspection.vue:60", "加载点检项目失败:", data.message);
            }
            if (callback)
              callback();
          },
          fail: (err) => {
            formatAppLog("error", "at pages/inspection/inspection.vue:65", "加载点检项目失败", err);
            if (callback)
              callback();
          }
        });
      },
      loadInspectionDetails(code, position) {
        const token = uni.getStorageSync("token");
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/GetCheckListDetailNew",
          method: "POST",
          data: {
            code,
            token
          },
          success: (res) => {
            const data = JSON.parse(res.data);
            if (!data.isError) {
              const inspectionDetails = data.dt;
              formatAppLog("log", "at pages/inspection/inspection.vue:83", "点检详情加载成功:", inspectionDetails);
              uni.navigateTo({
                url: `/pages/project/project?id=${encodeURIComponent(code)}&name=${position.SEL_ShuoMing}`
              });
              formatAppLog("log", "at pages/inspection/inspection.vue:88", encodeURIComponent(code));
            } else {
              formatAppLog("error", "at pages/inspection/inspection.vue:90", "加载点检详情失败:", data.msg);
              uni.showToast({
                title: data.msg,
                icon: "none"
              });
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/inspection/inspection.vue:98", "加载点检详情失败", err);
          }
        });
      },
      logout() {
        uni.removeStorageSync("username");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    const _component_button_group = vue.resolveComponent("button-group");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createVNode(_component_button_group, { buttons: $data.buttons }, null, 8, ["buttons"])
      ])
    ]);
  }
  const PagesInspectionInspection = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__file", "D:/Project/HBuilderProjects/dianjianHmS/dianjian02/pages/inspection/inspection.vue"]]);
  const _sfc_main$a = {
    name: "LoadingSpinner",
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    onLoad() {
      formatAppLog("log", "at components/LoadingSpinner.vue:19", "加载组件更新成功");
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.show ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "loading-overlay"
    }, [
      vue.createElementVNode("view", { class: "spinner" }),
      vue.createElementVNode("text", { class: "loading-text" }, "加载中...")
    ])) : vue.createCommentVNode("v-if", true);
  }
  const LoadingSpinner = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-19f97f1a"], ["__file", "D:/Project/HBuilderProjects/dianjianHmS/dianjian02/components/LoadingSpinner.vue"]]);
  const _sfc_main$9 = {
    components: {
      Navbar,
      ButtonGroup,
      LoadingSpinner
    },
    setup() {
      const username = vue.ref(uni.getStorageSync("username") || "");
      const Menubuttons = vue.ref([]);
      const positions = vue.ref([]);
      const isLoading = vue.ref(true);
      const isRemindLoading = vue.ref(false);
      let cachedRemindDetails = null;
      const goToInspection = () => {
        uni.navigateTo({
          url: "/pages/inspection/inspection"
        });
      };
      const goToForm = async (formName) => {
        try {
          switch (formName) {
            case "frmMyChcek":
              uni.navigateTo({
                url: "/pages/Mydianjian/Mydianjian"
              });
              break;
            case "frmScanCode":
              handleHomeAscan();
              break;
            case "frmRemind":
              formatAppLog("log", "at pages/home/home.vue:55", "开始处理缺失提醒跳转");
              if (isRemindLoading.value) {
                uni.showToast({
                  title: "数据加载中...",
                  icon: "none"
                });
                return;
              }
              if (cachedRemindDetails) {
                formatAppLog("log", "at pages/home/home.vue:68", "使用缓存的提醒数据:", cachedRemindDetails);
                if (cachedRemindDetails.length > 0) {
                  uni.setStorageSync("exceptions", JSON.stringify(cachedRemindDetails));
                  uni.navigateTo({
                    url: "/pages/remind/remind"
                  });
                } else {
                  uni.showToast({
                    title: "暂无异常",
                    icon: "none"
                  });
                }
              } else {
                formatAppLog("warn", "at pages/home/home.vue:84", "缓存的提醒数据为空，尝试重新加载...");
                isRemindLoading.value = true;
                try {
                  await loadRemindCount();
                  if (cachedRemindDetails && cachedRemindDetails.length > 0) {
                    uni.setStorageSync("exceptions", JSON.stringify(cachedRemindDetails));
                    uni.navigateTo({ url: "/pages/remind/remind" });
                  } else {
                    uni.showToast({
                      title: "暂无异常",
                      icon: "none"
                    });
                  }
                } catch (error) {
                  formatAppLog("error", "at pages/home/home.vue:101", "加载提醒数据失败", error);
                  uni.showToast({
                    title: "加载失败",
                    icon: "none"
                  });
                } finally {
                  isRemindLoading.value = false;
                }
              }
              break;
            case "frmCheckListReport":
              uni.navigateTo({
                url: "/pages/report/report"
              });
              break;
            case "frmCheckPlan":
              uni.navigateTo({
                url: "/pages/plan/plan"
              });
              break;
            case "frmScanConfig":
              uni.navigateTo({
                url: "/pages/config/config"
              });
              break;
            default:
              formatAppLog("warn", "at pages/home/home.vue:128", `未知的表单名称: ${formName}`);
              uni.showToast({
                title: "无效的表单名称",
                icon: "none"
              });
          }
        } catch (error) {
          formatAppLog("error", "at pages/home/home.vue:135", "跳转页面失败", error);
        }
      };
      const fetchPositions = async () => {
        try {
          const token = uni.getStorageSync("token");
          if (!token) {
            return;
          }
          const response = await uni.request({
            url: "http://13.94.38.44:8080/CheckList/GetPositionByPerson",
            method: "POST",
            data: { token },
            timeout: 1e4
          });
          formatAppLog("log", "at pages/home/home.vue:154", "API Response:", response.data);
          const data = JSON.parse(response.data);
          if (!data.isError) {
            positions.value = data.list;
            formatAppLog("log", "at pages/home/home.vue:158", "点检位置加载成功:", positions.value);
          } else {
            uni.showToast({
              title: "加载点检位置失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/home/home.vue:166", "加载点检位置失败", error);
        }
      };
      const internalFetchRemindData = async () => {
        try {
          const token = uni.getStorageSync("token");
          if (!token) {
            uni.showToast({
              title: "未登录，请先登录",
              icon: "none"
            });
            return null;
          }
          const response = await uni.request({
            url: "http://13.94.38.44:8080/CheckList/GetRemind",
            method: "POST",
            data: { token }
          });
          const data = JSON.parse(response.data);
          formatAppLog("log", "at pages/home/home.vue:189", "API Response (GetRemind):", data);
          if (!data.isError) {
            const remindData = data.list.filter((item) => item.num > 0);
            formatAppLog("log", "at pages/home/home.vue:192", "Filtered Remind Data:", remindData);
            return remindData;
          } else {
            uni.showToast({
              title: "获取提醒信息失败",
              icon: "none"
            });
            return null;
          }
        } catch (error) {
          formatAppLog("error", "at pages/home/home.vue:202", "获取提醒信息失败或代码有误", error);
          uni.showToast({
            title: "获取提醒信息失败或代码有误",
            icon: "none"
          });
          return null;
        }
      };
      const loadMenu = async () => {
        try {
          const token = uni.getStorageSync("token");
          if (!token) {
            uni.showToast({
              title: "未登录，请先登录",
              icon: "none"
            });
            return;
          }
          const response = await uni.request({
            url: "http://13.94.38.44:8080/CheckList/GetMenuList",
            method: "POST",
            data: { token },
            timeout: 1e4
          });
          formatAppLog("log", "at pages/home/home.vue:229", "API Response (GetMenuList):", response.data);
          const data = JSON.parse(response.data);
          if (!data.isError) {
            const fixedButtons = [
              {
                label: "所有点检",
                action: goToInspection,
                disable: false,
                image: "../../static/icon/SuoYouDianjian.png"
              }
            ];
            Menubuttons.value = [
              ...fixedButtons,
              ...data.list.map((item) => ({
                label: item.menu_text,
                form_name: item.form_name,
                action: () => goToForm(item.form_name),
                disable: false,
                image: getImagePath(item.form_name),
                badge: ""
              }))
            ];
            vue.nextTick(() => {
              loadRemindCount();
            });
          } else {
            uni.showToast({
              title: "获取菜单失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/home/home.vue:263", "获取菜单失败", error);
          uni.showToast({
            title: "获取菜单失败",
            icon: "none"
          });
        } finally {
          isLoading.value = false;
        }
      };
      const loadRemindCount = async () => {
        const remindButton = Menubuttons.value.find((button) => button.form_name === "frmRemind");
        if (remindButton) {
          remindButton.badge = "...";
        } else {
          formatAppLog("warn", "at pages/home/home.vue:279", "未找到缺失提醒按钮，无法设置加载状态");
          return;
        }
        try {
          const remindData = await internalFetchRemindData();
          cachedRemindDetails = remindData;
          if (remindData) {
            const count = remindData.length;
            formatAppLog("log", "at pages/home/home.vue:288", "缺失提醒数据长度:", count);
            vue.nextTick(() => {
              remindButton.badge = count > 0 ? count.toString() : "";
            });
          } else {
            vue.nextTick(() => {
              remindButton.badge = "";
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/home/home.vue:298", "获取提醒数量失败", error);
          vue.nextTick(() => {
            remindButton.badge = "";
          });
        }
      };
      const handleHomeAscan = () => {
        uni.scanCode({
          success: (res) => {
            formatAppLog("log", "at pages/home/home.vue:308", "扫描成功", res);
            loadHomeInspectionDetails(res.result.substring(0, 3));
          },
          fail: (err) => {
            formatAppLog("error", "at pages/home/home.vue:312", "扫描失败", err);
          }
        });
      };
      const loadHomeInspectionDetails = (code) => {
        const token = uni.getStorageSync("token");
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/GetCheckListDetailNew",
          method: "POST",
          data: {
            code,
            token
          },
          success: (res) => {
            const data = JSON.parse(res.data);
            formatAppLog("log", "at pages/home/home.vue:328", data);
            if (!data.isError) {
              const inspectionDetailsArray = data.dt;
              formatAppLog("log", "at pages/home/home.vue:331", "点检详情加载成功:", inspectionDetailsArray);
              if (inspectionDetailsArray.length > 0) {
                const inspectionDetails = inspectionDetailsArray[0];
                const position = positions.value.find((pos) => pos.SEL_TXT === inspectionDetails.Position);
                if (position) {
                  const shuoMing = position.SEL_ShuoMing;
                  uni.navigateTo({
                    url: `/pages/project/project?id=${encodeURIComponent(code)}&name=${shuoMing}`
                  });
                } else {
                  formatAppLog("error", "at pages/home/home.vue:342", "未找到对应的点检位置");
                  uni.showToast({
                    title: "未找到对应的点检位置",
                    icon: "none"
                  });
                }
              } else {
                formatAppLog("error", "at pages/home/home.vue:349", "点检详情为空");
                uni.showToast({
                  title: "点检详情为空",
                  icon: "none"
                });
              }
            } else {
              formatAppLog("error", "at pages/home/home.vue:356", "加载点检详情失败:", data.msg);
              uni.showToast({
                title: data.msg,
                icon: "none"
              });
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/home/home.vue:364", "加载点检详情失败", err);
          }
        });
      };
      const logout = () => {
        uni.removeStorageSync("cachedRemindData");
        uni.removeStorageSync("remindDataCacheTime");
        uni.removeStorageSync("username");
        cachedRemindDetails = null;
        uni.redirectTo({
          url: "/pages/login/login"
        });
      };
      const getImagePath = (formName) => {
        switch (formName) {
          case "frmMyChcek":
            return "../../static/icon/MyDianjian.png";
          case "frmScanCode":
            return "../../static/icon/LiJiSaoma.png";
          case "frmRemind":
            return "../../static/icon/QueShiTixing.png";
          case "frmCheckListReport":
            return "../../static/icon/JianDanBaobiao.png";
          case "frmCheckPlan":
            return "../../static/icon/DJjihua.png";
          case "frmScanConfig":
            return "../../static/icon/DJweihu.png";
          default:
            return "";
        }
      };
      vue.onMounted(() => {
        loadMenu();
        fetchPositions();
      });
      return {
        username,
        Menubuttons,
        logout,
        positions,
        isLoading,
        isRemindLoading
      };
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    const _component_loading_spinner = vue.resolveComponent("loading-spinner");
    const _component_button_group = vue.resolveComponent("button-group");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $setup.username,
        onLogout: $setup.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createVNode(_component_loading_spinner, { show: $setup.isLoading }, null, 8, ["show"]),
        !$setup.isLoading ? (vue.openBlock(), vue.createBlock(_component_button_group, {
          key: 0,
          buttons: $setup.Menubuttons
        }, null, 8, ["buttons"])) : vue.createCommentVNode("v-if", true)
      ])
    ]);
  }
  const PagesHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__file", "D:/Project/HBuilderProjects/dianjianHmS/dianjian02/pages/home/home.vue"]]);
  const _imports_0$1 = "/static/dui.png";
  const _imports_1$1 = "/static/NT.png";
  const _imports_2$2 = "/static/cuo.png";
  function urlToBase64(url, type = "png") {
    if (typeof url !== "string" || url.trim() === "") {
      return Promise.reject(new Error("Invalid URL"));
    }
    return new Promise((resolve, reject) => {
      if (url.startsWith("http")) {
        uni.request({
          url,
          method: "GET",
          responseType: "arraybuffer",
          success: (res) => {
            const base64 = `data:image/${type};base64,${uni.arrayBufferToBase64(res.data)}`;
            resolve(base64);
          },
          fail: (err) => {
            reject(new Error(`Request failed: ${err}`));
          }
        });
      } else if (url.startsWith("file://media/Photo/")) {
        plus.io.resolveLocalFileSystemURL(url, (entry) => {
          entry.file((file) => {
            const reader = new plus.io.FileReader();
            reader.onload = function(e2) {
              resolve(e2.target.result);
            };
            reader.onerror = function(error) {
              formatAppLog("error", "at pages/project/project.vue:105", "FileReader failed:", error);
              uni.compressImage({
                src: url,
                quality: 100,
                success: (res) => {
                  const tempPath = res.tempFilePath;
                  plus.io.resolveLocalFileSystemURL(tempPath, (entry2) => {
                    entry2.file((file2) => {
                      const reader2 = new plus.io.FileReader();
                      reader2.onload = function(e2) {
                        resolve(e2.target.result);
                      };
                      reader2.onerror = function(error2) {
                        reject(new Error(`File read failed: ${error2.message}`));
                      };
                      reader2.readAsDataURL(file2);
                    }, (error2) => {
                      reject(new Error(`File resolution failed: ${error2.message}`));
                    });
                  }, (error2) => {
                    reject(new Error(`File resolution failed: ${error2.message}`));
                  });
                },
                fail: (err) => {
                  reject(new Error(`Compress image failed: ${err}`));
                }
              });
            };
            reader.readAsDataURL(file);
          }, (error) => {
            reject(new Error(`File resolution failed: ${error.message}`));
          });
        }, (error) => {
          reject(new Error(`File resolution failed: ${error.message}`));
        });
      } else {
        uni.compressImage({
          src: url,
          quality: 100,
          success: (res) => {
            const tempUrl = res.tempFilePath;
            plus.io.resolveLocalFileSystemURL(tempUrl, (entry) => {
              entry.file((e2) => {
                let fileReader = new plus.io.FileReader();
                fileReader.onload = (r2) => {
                  resolve(r2.target.result);
                };
                fileReader.onerror = (error) => {
                  reject(new Error(`File resolution failed: ${error.message}`));
                };
                fileReader.readAsDataURL(e2);
              }, (error) => {
                reject(new Error(`File resolution failed: ${error.message}`));
              });
            }, (error) => {
              reject(new Error(`File resolution failed: ${error.message}`));
            });
          },
          fail: (err) => {
            reject(new Error(`Compress image failed: ${err}`));
          }
        });
      }
    });
  }
  const _sfc_main$8 = {
    components: {
      Navbar
    },
    data() {
      return {
        username: uni.getStorageSync("username") || "",
        inspectionPoint: { id: "", name: "" },
        inspectionItems: [],
        // 初始化为空数组
        currentItemIndex: 0,
        currentProject: ""
      };
    },
    onLoad(options) {
      this.inspectionPoint.id = options.id;
      this.inspectionPoint.name = options.name;
      const token = uni.getStorageSync("token");
      this.loadInspectionDetails(this.inspectionPoint.id, token);
    },
    onPullDownRefresh() {
      const id = this.inspectionPoint.id;
      const token = uni.getStorageSync("token");
      if (!id) {
        formatAppLog("error", "at pages/project/project.vue:251", "id 参数为空");
        uni.stopPullDownRefresh();
        return;
      }
      this.loadInspectionDetails(id, token, () => {
        uni.stopPullDownRefresh();
      });
    },
    computed: {
      // 计算当前项
      currentItem() {
        return this.inspectionItems[this.currentItemIndex] || null;
      }
    },
    methods: {
      // 加载点检详情
      loadInspectionDetails(id, token, callback) {
        if (!id) {
          formatAppLog("error", "at pages/project/project.vue:269", "id 参数为空");
          return;
        }
        formatAppLog("log", "at pages/project/project.vue:272", "请求参数:", { code: id, token });
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/GetCheckListDetailNew",
          method: "POST",
          data: {
            code: id,
            token
          },
          success: (res) => {
            var _a;
            const data = JSON.parse(res.data);
            if (!data.isError) {
              this.inspectionItems = data.dt.map((item) => ({
                ...item,
                remarks: "",
                images: [],
                // 初始化 images 数组
                flag: ""
                // 初始值为空
              }));
              this.currentProject = ((_a = this.inspectionItems[0]) == null ? void 0 : _a.Project) || "";
              formatAppLog("log", "at pages/project/project.vue:290", "点检详情加载成功:", this.inspectionItems);
            } else {
              formatAppLog("error", "at pages/project/project.vue:292", "加载点检详情失败:", data.message);
            }
            if (callback)
              callback();
          },
          fail: (err) => {
            formatAppLog("error", "at pages/project/project.vue:297", "加载点检详情失败:", err);
            if (callback)
              callback();
          }
        });
      },
      // OK, NT, NG 选择结果
      handleFlagChange(flag) {
        this.currentItem.flag = flag;
      },
      // 上一项
      prevItem() {
        if (this.currentItemIndex > 0) {
          this.currentItemIndex--;
          this.currentProject = this.inspectionItems[this.currentItemIndex].Project;
        }
      },
      // 下一项或完成检查
      nextOrFinishItem() {
        if (this.currentItem.flag) {
          if (this.currentItem.flag === "NG") {
            if (!this.currentItem.remarks.trim()) {
              uni.showToast({
                title: "请填写点检说明",
                icon: "none"
              });
              return;
            }
            if (!this.currentItem.images || this.currentItem.images.length === 0) {
              uni.showToast({
                title: "请上传至少一张图片",
                icon: "none"
              });
              return;
            }
          } else if (this.currentItem.flag === "有问题，但已经解决") {
            if (!this.currentItem.remarks.trim()) {
              uni.showToast({
                title: "请填写点检说明",
                icon: "none"
              });
              return;
            }
          }
          if (this.currentItemIndex < this.inspectionItems.length - 1) {
            this.nextItem();
          } else {
            formatAppLog("log", "at pages/project/project.vue:344", "当前 inspectionItems:", this.inspectionItems);
            this.saveInspection();
          }
        } else {
          uni.showToast({
            title: "请先选择结果",
            icon: "none"
          });
        }
      },
      // 下一项
      nextItem() {
        if (this.currentItemIndex < this.inspectionItems.length - 1) {
          this.currentItemIndex++;
          this.currentProject = this.inspectionItems[this.currentItemIndex].Project;
        }
      },
      // 选择图片
      uploadImage() {
        uni.chooseImage({
          count: 9,
          // 支持最多选择9张图片
          success: (res) => {
            if (res.tempFilePaths.length > 0) {
              if (!this.currentItem.images) {
                this.$set(this.currentItem, "images", []);
              }
              this.convertImagesToBase64(res.tempFilePaths);
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/project/project.vue:374", "选择图片失败:", err);
          }
        });
      },
      // 将图片路径转换为 Base64 编码
      convertImagesToBase64(imagePaths) {
        const promises = imagePaths.map((imagePath) => {
          return urlToBase64(imagePath).catch((err) => {
            formatAppLog("error", "at pages/project/project.vue:383", "转换图片失败，使用原始路径:", err, imagePath);
            return imagePath;
          });
        });
        Promise.all(promises).then((base64Images) => {
          this.currentItem.images.push(...base64Images);
          formatAppLog("log", "at pages/project/project.vue:392", "图片路径数组:", this.currentItem.images);
          this.$forceUpdate();
        }).catch((err) => {
          formatAppLog("error", "at pages/project/project.vue:395", "转换图片为 Base64 编码失败:", err);
        });
      },
      // 删除图片
      deleteImage(index) {
        this.currentItem.images.splice(index, 1);
      },
      // 保存点检详情
      saveInspection() {
        if (!this.inspectionItems || !this.inspectionItems.length) {
          formatAppLog("error", "at pages/project/project.vue:405", "inspectionItems 未定义或为空");
          return;
        }
        uni.showLoading({
          title: "正在上传数据..."
        });
        const token = uni.getStorageSync("token");
        const inspectionData = {
          token,
          list: this.inspectionItems.map((item) => {
            const now = /* @__PURE__ */ new Date();
            const formattedTime = `${now.getFullYear()}:${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}:${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
            return {
              ID: item.ID,
              Time: formattedTime,
              Flag: item.flag || "NG",
              FileList: (item.images || []).map((image) => image),
              // 确保 FileList 包含 Base64 编码
              Remark: item.remarks || ""
            };
          })
        };
        formatAppLog("log", "at pages/project/project.vue:429", "发送到 SaveDetail 接口的数据:", inspectionData);
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/SaveDetail",
          method: "POST",
          header: {
            "content-type": "application/json"
          },
          data: inspectionData,
          success: (res) => {
            formatAppLog("log", "at pages/project/project.vue:439", "第一次请求返回数据为:", res.data);
            if (typeof res.data === "string") {
              try {
                const data = JSON.parse(res.data);
                if (!data.isError) {
                  const docnum = data.docnum;
                  this.saveFinalResult(docnum, token);
                } else {
                  uni.showToast({
                    title: data.msg || "保存失败",
                    icon: "none"
                  });
                  formatAppLog("error", "at pages/project/project.vue:451", "保存点检详情失败:", data.msg);
                }
              } catch (parseError) {
                formatAppLog("error", "at pages/project/project.vue:454", "解析第一次请求返回数据时出错:", parseError);
              }
            } else {
              formatAppLog("error", "at pages/project/project.vue:457", "第一次请求响应数据不是字符串:", res.data);
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/project/project.vue:461", "保存点检详情失败:", err);
          }
        });
      },
      // 保存最终的检查结果
      saveFinalResult(docnum, token) {
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/SaveDetail2",
          method: "POST",
          data: {
            docnum,
            token
          },
          success: (res) => {
            formatAppLog("log", "at pages/project/project.vue:475", "第二次请求返回数据为:", res.data);
            if (typeof res.data === "string") {
              try {
                const result = JSON.parse(res.data);
                if (!result.IsError) {
                  uni.showToast({
                    title: "检查成功",
                    icon: "success"
                  });
                  uni.redirectTo({
                    url: "/pages/home/home"
                  });
                } else {
                  uni.showToast({
                    title: result.msg,
                    icon: "none"
                  });
                  formatAppLog("error", "at pages/project/project.vue:492", "保存检查结果失败:", result.msg);
                }
              } catch (parseError) {
                formatAppLog("error", "at pages/project/project.vue:495", "解析第二次请求返回数据时出错:", parseError);
              }
            } else {
              formatAppLog("error", "at pages/project/project.vue:498", "第二次请求响应数据不是字符串:", res.data);
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/project/project.vue:502", "保存检查结果失败:", err);
          }
        });
      },
      // 退出登录
      logout() {
        uni.removeStorageSync("username");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode(
        "view",
        { class: "title" },
        vue.toDisplayString($data.inspectionPoint.name) + " > " + vue.toDisplayString($data.currentProject),
        1
        /* TEXT */
      ),
      vue.createElementVNode("view", { class: "content" }, [
        $options.currentItem ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.createElementVNode("view", { class: "item" }, [
            vue.createElementVNode(
              "view",
              { class: "item-title" },
              vue.toDisplayString($options.currentItem.Description),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", { class: "form-group" }, [
              vue.createElementVNode("label", null, "选择结果："),
              vue.createElementVNode("view", { class: "button-group" }, [
                vue.createElementVNode(
                  "button",
                  {
                    class: vue.normalizeClass({ "selButton": true, "selected": $options.currentItem.flag === "OK" }),
                    onClick: _cache[0] || (_cache[0] = ($event) => $options.handleFlagChange("OK"))
                  },
                  [
                    vue.createElementVNode("image", {
                      src: _imports_0$1,
                      class: "icon-image"
                    })
                  ],
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "button",
                  {
                    class: vue.normalizeClass({ "selButton": true, "selected": $options.currentItem.flag === "有问题，但已经解决" }),
                    onClick: _cache[1] || (_cache[1] = ($event) => $options.handleFlagChange("有问题，但已经解决"))
                  },
                  [
                    vue.createElementVNode("image", {
                      src: _imports_1$1,
                      class: "icon-image"
                    })
                  ],
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "button",
                  {
                    class: vue.normalizeClass({ "selButton": true, "selected": $options.currentItem.flag === "NG" }),
                    onClick: _cache[2] || (_cache[2] = ($event) => $options.handleFlagChange("NG"))
                  },
                  [
                    vue.createElementVNode("image", {
                      src: _imports_2$2,
                      class: "icon-image"
                    })
                  ],
                  2
                  /* CLASS */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "form-group" }, [
              vue.createElementVNode("label", null, "点检说明："),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "text",
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $options.currentItem.remarks = $event),
                  class: "input"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $options.currentItem.remarks]
              ])
            ]),
            vue.createElementVNode("view", { class: "form-group" }, [
              vue.createElementVNode("label", null, "上传图片："),
              vue.createElementVNode("button", {
                onClick: _cache[4] || (_cache[4] = (...args) => $options.uploadImage && $options.uploadImage(...args)),
                class: "button"
              }, "+"),
              $options.currentItem.images && $options.currentItem.images.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.currentItem.images, (image, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: index,
                      class: "image-preview"
                    }, [
                      vue.createElementVNode("image", {
                        src: image,
                        class: "preview-image"
                      }, null, 8, ["src"]),
                      vue.createElementVNode("button", {
                        onClick: ($event) => $options.deleteImage(index),
                        class: "delete-button"
                      }, "X", 8, ["onClick"])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("view", { class: "button-group" }, [
              vue.createElementVNode("button", {
                onClick: _cache[5] || (_cache[5] = (...args) => $options.prevItem && $options.prevItem(...args)),
                disabled: $data.currentItemIndex === 0,
                class: "button"
              }, "上一项", 8, ["disabled"]),
              vue.createElementVNode(
                "button",
                {
                  onClick: _cache[6] || (_cache[6] = (...args) => $options.nextOrFinishItem && $options.nextOrFinishItem(...args)),
                  class: "button"
                },
                vue.toDisplayString($data.currentItemIndex === $data.inspectionItems.length - 1 ? "点检成功" : "下一项"),
                1
                /* TEXT */
              )
            ])
          ])
        ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
          vue.createElementVNode("view", { class: "message" }, "所有点检项目完成")
        ]))
      ])
    ]);
  }
  const PagesProjectProject = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-e8179a1b"], ["__file", "D:/Project/HBuilderProjects/dianjianHmS/dianjian02/pages/project/project.vue"]]);
  const _sfc_main$7 = {
    components: {
      Navbar,
      ButtonGroup
    },
    data() {
      return {
        username: uni.getStorageSync("username") || "",
        positions: [],
        // 存储点检位置数据
        inspectionButtons: []
        // 存储按钮组数据
      };
    },
    onLoad() {
      this.fetchPositions();
    },
    methods: {
      fetchPositions() {
        const token = uni.getStorageSync("token");
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/GetPositionByPerson",
          method: "POST",
          data: {
            token
          },
          success: (res) => {
            const data = JSON.parse(res.data);
            if (!data.isError) {
              this.positions = data.list;
              formatAppLog("log", "at pages/Mydianjian/Mydianjian.vue:45", "点检位置加载成功:", this.positions);
              this.createInspectionButtons();
            } else {
              formatAppLog("error", "at pages/Mydianjian/Mydianjian.vue:48", "加载点检位置失败:", data.message);
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/Mydianjian/Mydianjian.vue:52", "加载点检位置失败", err);
          }
        });
      },
      createInspectionButtons() {
        this.inspectionButtons = this.positions.map((position) => ({
          label: position.SEL_ShuoMing,
          action: () => scanAndNavigate(position, this.loadInspectionDetails),
          disabled: false,
          image: "../../static/icon/DJxiangmu.png"
        }));
      },
      loadInspectionDetails(code, position) {
        const token = uni.getStorageSync("token");
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/GetCheckListDetailNew",
          method: "POST",
          data: {
            code,
            token
          },
          success: (res) => {
            const data = JSON.parse(res.data);
            if (!data.isError) {
              const inspectionDetails = data.dt;
              formatAppLog("log", "at pages/Mydianjian/Mydianjian.vue:77", "点检详情加载成功:", inspectionDetails);
              uni.navigateTo({
                url: `/pages/project/project?id=${encodeURIComponent(code)}&name=${position.SEL_ShuoMing}`
              });
              formatAppLog("log", "at pages/Mydianjian/Mydianjian.vue:82", encodeURIComponent(code));
            } else {
              formatAppLog("error", "at pages/Mydianjian/Mydianjian.vue:84", "加载点检详情失败:", data.msg);
              uni.showToast({
                title: data.msg,
                icon: "none"
              });
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/Mydianjian/Mydianjian.vue:92", "加载点检详情失败", err);
          }
        });
      },
      logout() {
        uni.removeStorageSync("username");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    const _component_button_group = vue.resolveComponent("button-group");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createVNode(_component_button_group, { buttons: $data.inspectionButtons }, null, 8, ["buttons"])
      ])
    ]);
  }
  const PagesMydianjianMydianjian = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__file", "D:/Project/HBuilderProjects/dianjianHmS/dianjian02/pages/Mydianjian/Mydianjian.vue"]]);
  const _sfc_main$6 = {
    components: {
      Navbar,
      ButtonGroup
    },
    data() {
      return {
        username: uni.getStorageSync("username") || "",
        Menubuttons: []
      };
    },
    methods: {
      navigateToException(exception) {
        const token = uni.getStorageSync("token");
        formatAppLog("log", "at pages/remind/remind.vue:28", exception);
        formatAppLog("log", "at pages/remind/remind.vue:29", "Navigating to YIChang with ID:", exception.SEL_TXT, "and Token:", token);
        if (!token) {
          uni.showToast({
            title: "未登录，请先登录",
            icon: "none"
          });
          return;
        }
        const url = `/pages/YiChang/YiChang?id=${encodeURIComponent(exception.SEL_TXT)}&token=${encodeURIComponent(token)}&selShuoMing=${exception.SEL_ShuoMing}`;
        formatAppLog("log", "at pages/remind/remind.vue:38", "Navigating to:", url);
        uni.navigateTo({
          url
        });
      },
      logout() {
        uni.removeStorageSync("username");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      }
    },
    mounted() {
      const exceptionsStr = uni.getStorageSync("exceptions");
      if (exceptionsStr) {
        try {
          const exceptions = JSON.parse(exceptionsStr);
          formatAppLog("log", "at pages/remind/remind.vue:55", "Parsed Exceptions:", exceptions);
          this.Menubuttons = exceptions.map((exception) => ({
            label: exception.SEL_ShuoMing,
            action: () => this.navigateToException(exception),
            // 使用新的 navigateToException 方法
            disabled: false,
            badge: exception.num > 0 ? exception.num.toString() : "",
            image: "../../static/icon/DJxiangmu.png"
          }));
        } catch (error) {
          formatAppLog("error", "at pages/remind/remind.vue:64", "解析 exceptions 失败", error);
        }
        uni.removeStorageSync("exceptions");
      } else {
        formatAppLog("error", "at pages/remind/remind.vue:68", "未找到 exceptions 参数");
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    const _component_button_group = vue.resolveComponent("button-group");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createVNode(_component_button_group, { buttons: $data.Menubuttons }, null, 8, ["buttons"])
      ])
    ]);
  }
  const PagesRemindRemind = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__file", "D:/Project/HBuilderProjects/dianjianHmS/dianjian02/pages/remind/remind.vue"]]);
  const _sfc_main$5 = {
    props: {
      isPreviewVisible: {
        type: Boolean,
        required: true
      },
      currentImage: {
        type: String,
        required: true
      }
    },
    methods: {
      closePreview() {
        this.$emit("update:isPreviewVisible", false);
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.isPreviewVisible ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "image-viewer-overlay",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.closePreview && $options.closePreview(...args))
    }, [
      vue.createElementVNode("image", {
        src: "data:image/png;base64," + $props.currentImage,
        class: "image-viewer-image",
        onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
        }, ["stop"]))
      }, null, 8, ["src"])
    ])) : vue.createCommentVNode("v-if", true);
  }
  const ImageViewer = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-a9a40036"], ["__file", "D:/Project/HBuilderProjects/dianjianHmS/dianjian02/components/ImageViewer.vue"]]);
  const _sfc_main$4 = {
    name: "DetailPage",
    components: {
      Navbar,
      ImageViewer,
      LoadingSpinner
    },
    setup() {
      const username = vue.ref(uni.getStorageSync("username") || "");
      const details = vue.ref([]);
      const currentIndex = vue.ref(0);
      const selShuoMing = vue.ref("");
      const isPreviewVisible = vue.ref(false);
      const currentPreviewIndex = vue.ref(0);
      const isLoading = vue.ref(true);
      const currentDetail = vue.computed(() => {
        return details.value[currentIndex.value] || {};
      });
      const logout = () => {
        uni.removeStorageSync("username");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      };
      const getRemindDetail = (code, token) => {
        isLoading.value = true;
        formatAppLog("log", "at pages/YiChang/YiChang.vue:109", "开始加载数据，isLoading:", isLoading.value);
        const requestData = { token, code };
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/GetRemindDetail",
          method: "POST",
          data: requestData,
          success: (response) => {
            formatAppLog("log", "at pages/YiChang/YiChang.vue:117", "请求成功，响应数据:", response);
            const data = JSON.parse(response.data);
            formatAppLog("log", "at pages/YiChang/YiChang.vue:119", "解析后数据:", data);
            if (!data.isError) {
              details.value = data.list || [];
              currentIndex.value = 0;
              formatAppLog("log", "at pages/YiChang/YiChang.vue:123", "数据加载完成，details长度:", details.value.length);
            } else {
              uni.showToast({
                title: "加载提醒详情失败",
                icon: "none"
              });
              details.value = [];
            }
          },
          fail: (error) => {
            formatAppLog("error", "at pages/YiChang/YiChang.vue:133", "加载提醒详情失败", error);
            uni.showToast({
              title: "加载提醒详情失败",
              icon: "none"
            });
            details.value = [];
          },
          complete: () => {
            isLoading.value = false;
            formatAppLog("log", "at pages/YiChang/YiChang.vue:143", "加载完成，isLoading:", isLoading.value);
          }
        });
      };
      const prevItem = () => {
        if (currentIndex.value > 0) {
          currentIndex.value--;
        }
      };
      const nextItem = () => {
        if (currentIndex.value < details.value.length - 1) {
          currentIndex.value++;
        }
      };
      const previewImage = (index) => {
        formatAppLog("log", "at pages/YiChang/YiChang.vue:161", "Clicked image index:", index);
        formatAppLog("log", "at pages/YiChang/YiChang.vue:162", "Images array:", currentDetail.value.FileLists);
        currentPreviewIndex.value = index;
        isPreviewVisible.value = true;
      };
      onLoad((options) => {
        formatAppLog("log", "at pages/YiChang/YiChang.vue:168", "页面加载参数:", options);
        if (options && options.id && options.token && options.selShuoMing) {
          getRemindDetail(options.id, options.token);
          selShuoMing.value = decodeURIComponent(options.selShuoMing);
        } else {
          formatAppLog("error", "at pages/YiChang/YiChang.vue:173", "未找到 id 或 token 参数");
          isLoading.value = false;
        }
      });
      return {
        username,
        details,
        currentIndex,
        selShuoMing,
        isPreviewVisible,
        currentPreviewIndex,
        currentDetail,
        logout,
        prevItem,
        nextItem,
        previewImage,
        isLoading
      };
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    var _a, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k;
    const _component_navbar = vue.resolveComponent("navbar");
    const _component_loading_spinner = vue.resolveComponent("loading-spinner");
    const _component_image_viewer = vue.resolveComponent("image-viewer");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $setup.username,
        onLogout: $setup.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createVNode(_component_loading_spinner, { show: $setup.isLoading }, null, 8, ["show"]),
        !$setup.isLoading && $setup.details.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.createElementVNode(
            "view",
            { class: "header" },
            vue.toDisplayString($setup.selShuoMing),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "点检项目:"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString((_a = $setup.currentDetail) == null ? void 0 : _a.Project),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "点检内容:"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString((_b = $setup.currentDetail) == null ? void 0 : _b.Description),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "点检结果:"),
            vue.createElementVNode("text", { class: "value" }, [
              ((_c = $setup.currentDetail) == null ? void 0 : _c.Result) === "1" ? (vue.openBlock(), vue.createElementBlock("span", { key: 0 }, [
                vue.createElementVNode("image", {
                  src: _imports_0$1,
                  class: "Fuhao"
                })
              ])) : ((_d = $setup.currentDetail) == null ? void 0 : _d.Result) === "3" ? (vue.openBlock(), vue.createElementBlock("span", { key: 1 }, [
                vue.createElementVNode("image", {
                  src: _imports_1$1,
                  class: "Fuhao"
                })
              ])) : ((_e2 = $setup.currentDetail) == null ? void 0 : _e2.Result) === "2" ? (vue.openBlock(), vue.createElementBlock("span", { key: 2 }, [
                vue.createElementVNode("image", {
                  src: _imports_2$2,
                  class: "Fuhao"
                })
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ]),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "点检说明:"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString((_f = $setup.currentDetail) == null ? void 0 : _f.Remark),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "点检人:"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString((_g = $setup.currentDetail) == null ? void 0 : _g.Person),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "点检时间:"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString((_h = $setup.currentDetail) == null ? void 0 : _h.Time1),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "设备时间:"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString((_i = $setup.currentDetail) == null ? void 0 : _i.Time3),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "images-container" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(((_j = $setup.currentDetail) == null ? void 0 : _j.FileLists) || [], (image, index) => {
                return vue.openBlock(), vue.createElementBlock("image", {
                  key: index,
                  src: "data:image/png;base64," + image,
                  class: "image",
                  onClick: ($event) => $setup.previewImage(index)
                }, null, 8, ["src", "onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "navigation-buttons" }, [
            vue.createElementVNode("button", {
              disabled: $setup.currentIndex === 0,
              onClick: _cache[0] || (_cache[0] = (...args) => $setup.prevItem && $setup.prevItem(...args))
            }, "上一个", 8, ["disabled"]),
            vue.createElementVNode("button", {
              disabled: $setup.currentIndex === $setup.details.length - 1,
              onClick: _cache[1] || (_cache[1] = (...args) => $setup.nextItem && $setup.nextItem(...args))
            }, "下一个", 8, ["disabled"])
          ])
        ])) : !$setup.isLoading && $setup.details.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "no-data"
        }, " 暂无数据 ")) : vue.createCommentVNode("v-if", true)
      ]),
      $setup.isPreviewVisible ? (vue.openBlock(), vue.createBlock(_component_image_viewer, {
        key: 0,
        "is-preview-visible": $setup.isPreviewVisible,
        "current-image": ((_k = $setup.currentDetail) == null ? void 0 : _k.FileLists) ? $setup.currentDetail.FileLists[$setup.currentPreviewIndex] || "" : "",
        "onUpdate:isPreviewVisible": _cache[2] || (_cache[2] = ($event) => $setup.isPreviewVisible = $event)
      }, null, 8, ["is-preview-visible", "current-image"])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesYiChangYiChang = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__file", "D:/Project/HBuilderProjects/dianjianHmS/dianjian02/pages/YiChang/YiChang.vue"]]);
  const _imports_2$1 = "/static/quanx.png";
  const _sfc_main$3 = {
    components: {
      Navbar
    },
    setup() {
      const username = vue.ref(uni.getStorageSync("username") || "");
      const reportData = vue.ref(null);
      const loading = vue.ref(true);
      const selectedDate = vue.ref((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
      const currentDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const cachedMonthData = vue.ref({});
      const getFirstDayOfMonth = (date) => {
        const [year, month] = date.split("-");
        return `${year}-${month}-01`;
      };
      const getMonthKey = (date) => {
        const [year, month] = date.split("-");
        return `${year}-${month}`;
      };
      const fetchReport = async (date) => {
        try {
          loading.value = true;
          const monthKey = getMonthKey(date);
          const monthRequestDate = getFirstDayOfMonth(date);
          if (cachedMonthData.value[monthKey]) {
            reportData.value = cachedMonthData.value[monthKey];
            formatAppLog("log", "at pages/report/report.vue:115", `使用缓存的${monthKey}月份数据`);
            return;
          }
          const token = uni.getStorageSync("token");
          if (!token) {
            uni.showToast({
              title: "未登录，请先登录",
              icon: "none"
            });
            return;
          }
          const response = await uni.request({
            url: "http://13.94.38.44:8080/CheckList/GetScanReport1New",
            method: "POST",
            data: {
              token,
              time: monthRequestDate
            }
          });
          const data = JSON.parse(response.data);
          if (!data.isError) {
            cachedMonthData.value[monthKey] = data;
            reportData.value = data;
            formatAppLog("log", "at pages/report/report.vue:142", `报表数据加载成功并缓存: ${monthKey}`, reportData.value);
          } else {
            uni.showToast({
              title: "获取报表失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/report/report.vue:150", "获取报表失败", error);
          uni.showToast({
            title: "获取报表失败",
            icon: "none"
          });
        } finally {
          loading.value = false;
        }
      };
      const handleDateChange = (event) => {
        const newDate = event.detail.value;
        selectedDate.value = newDate;
        const monthKey = getMonthKey(newDate);
        const monthRequestDate = getFirstDayOfMonth(newDate);
        if (cachedMonthData.value[monthKey]) {
          reportData.value = cachedMonthData.value[monthKey];
        } else {
          fetchReport(monthRequestDate);
        }
      };
      const prevDay = () => {
        const prevDate = new Date(selectedDate.value);
        prevDate.setDate(prevDate.getDate() - 1);
        const formattedDate = prevDate.toISOString().split("T")[0];
        selectedDate.value = formattedDate;
        const monthKey = getMonthKey(formattedDate);
        const monthRequestDate = getFirstDayOfMonth(formattedDate);
        if (cachedMonthData.value[monthKey]) {
          reportData.value = cachedMonthData.value[monthKey];
        } else {
          fetchReport(monthRequestDate);
        }
      };
      const nextDay = () => {
        const nextDate = new Date(selectedDate.value);
        nextDate.setDate(nextDate.getDate() + 1);
        const formattedDate = nextDate.toISOString().split("T")[0];
        selectedDate.value = formattedDate;
        const monthKey = getMonthKey(formattedDate);
        const monthRequestDate = getFirstDayOfMonth(formattedDate);
        if (cachedMonthData.value[monthKey]) {
          reportData.value = cachedMonthData.value[monthKey];
        } else {
          fetchReport(monthRequestDate);
        }
      };
      const isPrevDisabled = vue.ref(false);
      const isNextDisabled = vue.ref(false);
      vue.watch(selectedDate, (newDate) => {
        isPrevDisabled.value = newDate <= "2020-01-01";
        isNextDisabled.value = newDate >= currentDate;
      }, { immediate: true });
      vue.onMounted(() => {
        getMonthKey(selectedDate.value);
        const monthRequestDate = getFirstDayOfMonth(selectedDate.value);
        fetchReport(monthRequestDate);
      });
      const logout = () => {
        uni.removeStorageSync("username");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      };
      return {
        username,
        reportData,
        loading,
        selectedDate,
        currentDate,
        handleDateChange,
        prevDay,
        nextDay,
        isPrevDisabled,
        isNextDisabled,
        logout
      };
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $setup.username,
        onLogout: $setup.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("view", { class: "date-picker-container" }, [
          vue.createElementVNode("button", {
            class: "arrow-button",
            onClick: _cache[0] || (_cache[0] = (...args) => $setup.prevDay && $setup.prevDay(...args)),
            disabled: $setup.isPrevDisabled
          }, "《", 8, ["disabled"]),
          vue.createElementVNode("picker", {
            mode: "date",
            value: $setup.selectedDate,
            end: $setup.currentDate,
            onChange: _cache[1] || (_cache[1] = (...args) => $setup.handleDateChange && $setup.handleDateChange(...args))
          }, [
            vue.createElementVNode(
              "view",
              { class: "picker" },
              " 当前选择: " + vue.toDisplayString($setup.selectedDate),
              1
              /* TEXT */
            )
          ], 40, ["value", "end"]),
          vue.createElementVNode("button", {
            class: "arrow-button",
            onClick: _cache[2] || (_cache[2] = (...args) => $setup.nextDay && $setup.nextDay(...args)),
            disabled: $setup.isNextDisabled
          }, "》", 8, ["disabled"])
        ]),
        $setup.loading ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "loading"
        }, " 正在加载报表数据... ")) : $setup.reportData && $setup.reportData.dt.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "report-data"
        }, [
          vue.createElementVNode("table", null, [
            vue.createElementVNode("thead", null, [
              vue.createElementVNode("tr", null, [
                vue.createElementVNode("th", null, "区域描述"),
                vue.createElementVNode("th", null, "点检位置"),
                vue.createElementVNode("th", null, "三级负责人"),
                vue.createElementVNode(
                  "th",
                  null,
                  vue.toDisplayString($setup.selectedDate),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("tbody", null, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.reportData.dt, (item) => {
                  return vue.openBlock(), vue.createElementBlock("tr", {
                    key: item.点检位置
                  }, [
                    vue.createElementVNode(
                      "td",
                      null,
                      vue.toDisplayString(item["区域描述"]),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "td",
                      null,
                      vue.toDisplayString(item["点检位置"]),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "td",
                      null,
                      vue.toDisplayString(item["区域负责人"]),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("td", null, [
                      item[$setup.selectedDate] === "1" ? (vue.openBlock(), vue.createElementBlock("navigator", {
                        key: 0,
                        url: `/pages/detail/detail?position=${encodeURIComponent(item["点检位置"])}&time=${$setup.selectedDate}`,
                        "hover-class": "navigator-hover"
                      }, [
                        vue.createElementVNode("button", { class: "check-button" }, [
                          vue.createElementVNode("image", {
                            src: _imports_0$1,
                            class: "DuiCuo"
                          })
                        ])
                      ], 8, ["url"])) : item[$setup.selectedDate] === "2" ? (vue.openBlock(), vue.createElementBlock("navigator", {
                        key: 1,
                        url: `/pages/detail/detail?position=${encodeURIComponent(item["点检位置"])}&time=${$setup.selectedDate}`,
                        "hover-class": "navigator-hover"
                      }, [
                        vue.createElementVNode("button", { class: "check-button" }, [
                          vue.createElementVNode("image", {
                            src: _imports_2$2,
                            class: "DuiCuo"
                          })
                        ])
                      ], 8, ["url"])) : item[$setup.selectedDate] === "3" ? (vue.openBlock(), vue.createElementBlock("navigator", {
                        key: 2,
                        url: `/pages/detail/detail?position=${encodeURIComponent(item["点检位置"])}&time=${$setup.selectedDate}`,
                        "hover-class": "navigator-hover"
                      }, [
                        vue.createElementVNode("button", { class: "check-button" }, [
                          vue.createElementVNode("image", {
                            src: _imports_2$1,
                            class: "DuiCuo"
                          })
                        ])
                      ], 8, ["url"])) : (vue.openBlock(), vue.createElementBlock("span", {
                        key: 3,
                        class: "centered-span"
                      }, [
                        vue.createElementVNode(
                          "strong",
                          null,
                          vue.toDisplayString(item[$setup.selectedDate] || "-"),
                          1
                          /* TEXT */
                        )
                      ]))
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ])
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "no-data"
        }, " 没有找到相关数据。 "))
      ])
    ]);
  }
  const PagesReportReport = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "D:/Project/HBuilderProjects/dianjianHmS/dianjian02/pages/report/report.vue"]]);
  const _imports_0 = "/static/whiteIcon/wDui.png";
  const _imports_1 = "/static/whiteIcon/wCuo.png";
  const _imports_2 = "/static/whiteIcon/wQuanx.png";
  const _sfc_main$2 = {
    components: {
      Navbar
    },
    data() {
      return {
        username: uni.getStorageSync("username") || "",
        detailData: null,
        loading: true,
        selectedHour: 8,
        // 默认时间为8点
        minHour: 0,
        maxHour: 23
      };
    },
    computed: {
      selectedDate() {
        if (this.detailData && this.detailData.dt.length > 0) {
          const firstTimestamp = Object.keys(this.detailData.dt[0]).find((key) => /^202[45]-\d{2}-\d{2}/.test(key));
          if (firstTimestamp) {
            return firstTimestamp.split(" ")[0];
          }
        }
        return "";
      },
      selectedHourKey() {
        if (this.selectedDate) {
          const key = `${this.selectedDate} ${this.selectedHour.toString().padStart(2, "0")}`;
          formatAppLog("log", "at pages/detail/detail.vue:91", "selectedHourKey:", key);
          return key;
        }
        return "";
      },
      filteredDetailData() {
        if (!this.detailData || !this.detailData.dt)
          return [];
        formatAppLog("log", "at pages/detail/detail.vue:98", "detailData.dt:", this.detailData.dt);
        formatAppLog("log", "at pages/detail/detail.vue:99", "selectedHourKey in filteredDetailData:", this.selectedHourKey);
        return this.detailData.dt.filter((item) => item[this.selectedHourKey] !== void 0);
      },
      isPrevDisabled() {
        return this.selectedHour <= this.minHour;
      },
      isNextDisabled() {
        return this.selectedHour >= this.maxHour;
      }
    },
    methods: {
      async fetchDetail(position, time) {
        try {
          this.loading = true;
          const token = uni.getStorageSync("token");
          if (!token) {
            uni.showToast({
              title: "未登录，请先登录",
              icon: "none"
            });
            return;
          }
          const response = await uni.request({
            url: "http://13.94.38.44:8080/CheckList/GetScanReport2New",
            method: "POST",
            data: {
              token,
              time,
              Position: position
            }
          });
          const data = JSON.parse(response.data);
          if (!data.isError) {
            this.detailData = data;
            formatAppLog("log", "at pages/detail/detail.vue:135", "详细数据加载成功:", this.detailData);
            this.setInitialSelectedHour();
          } else {
            uni.showToast({
              title: "获取详细数据失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/detail/detail.vue:144", "获取详细数据失败", error);
          uni.showToast({
            title: "获取详细数据失败",
            icon: "none"
          });
        } finally {
          this.loading = false;
        }
      },
      setInitialSelectedHour() {
        if (this.detailData && this.detailData.dt.length > 0) {
          const dataItem = this.detailData.dt[0];
          const timestamps = Object.keys(dataItem).filter((key) => /^202[45]-\d{2}-\d{2}/.test(key)).sort();
          for (const timestamp of timestamps) {
            const value = dataItem[timestamp];
            if (value === "1" || value === "2") {
              const hour = parseInt(timestamp.split(" ")[1], 10);
              this.selectedHour = hour;
              break;
            }
          }
        }
      },
      prevHour() {
        if (this.selectedHour > this.minHour) {
          this.selectedHour--;
        }
      },
      nextHour() {
        if (this.selectedHour < this.maxHour) {
          this.selectedHour++;
        }
      },
      logout() {
        uni.removeStorageSync("username");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      },
      navigateToResult(item) {
        formatAppLog("log", "at pages/detail/detail.vue:184", "navigateToResult called with selectedHourKey:", this.selectedHourKey);
        uni.navigateTo({
          url: `/pages/result/result?position=${this.detailData.dt[0]["点检位置"]}&project=${item["点检项目"]}&description=${item["点检内容"]}&time=${this.selectedHourKey}:00`
        });
      }
    },
    onLoad(options) {
      const position = options.position;
      const time = options.time;
      if (position && time) {
        this.fetchDetail(decodeURIComponent(position), decodeURIComponent(time));
      } else {
        uni.showToast({
          title: "缺少参数",
          icon: "none"
        });
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        $data.loading ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "loading"
        }, " 正在加载数据... ")) : $data.detailData && $data.detailData.dt.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "detail-data"
        }, [
          vue.createElementVNode("p", null, [
            vue.createElementVNode("strong", null, "点检位置:"),
            vue.createTextVNode(
              " " + vue.toDisplayString($data.detailData.dt[0]["点检位置"]),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("table", null, [
            vue.createElementVNode("thead", null, [
              vue.createElementVNode("tr", null, [
                vue.createElementVNode("th", null, "点检项目"),
                vue.createElementVNode("th", null, "点检内容"),
                vue.createElementVNode("th", { colspan: "3" }, [
                  vue.createElementVNode("button", {
                    class: "arrow-button",
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.prevHour && $options.prevHour(...args)),
                    disabled: $options.isPrevDisabled
                  }, "《", 8, ["disabled"]),
                  vue.createTextVNode(
                    " " + vue.toDisplayString($data.selectedHour) + ":00 ",
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("button", {
                    class: "arrow-button",
                    onClick: _cache[1] || (_cache[1] = (...args) => $options.nextHour && $options.nextHour(...args)),
                    disabled: $options.isNextDisabled
                  }, "》", 8, ["disabled"])
                ])
              ])
            ]),
            vue.createElementVNode("tbody", null, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($options.filteredDetailData, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("tr", { key: index }, [
                    vue.createElementVNode(
                      "td",
                      null,
                      vue.toDisplayString(item.点检项目),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "td",
                      null,
                      vue.toDisplayString(item.点检内容),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("td", null, [
                      item[$options.selectedHourKey] === "1" ? (vue.openBlock(), vue.createElementBlock("button", {
                        key: 0,
                        class: "status-button check",
                        onClick: ($event) => $options.navigateToResult(item)
                      }, [
                        vue.createElementVNode("image", {
                          src: _imports_0,
                          class: "DuiCuo"
                        })
                      ], 8, ["onClick"])) : item[$options.selectedHourKey] === "2" ? (vue.openBlock(), vue.createElementBlock("button", {
                        key: 1,
                        class: "status-button cross",
                        onClick: ($event) => $options.navigateToResult(item)
                      }, [
                        vue.createElementVNode("image", {
                          src: _imports_1,
                          class: "DuiCuo"
                        })
                      ], 8, ["onClick"])) : item[$options.selectedHourKey] === "3" ? (vue.openBlock(), vue.createElementBlock("button", {
                        key: 2,
                        class: "status-button quanx",
                        onClick: ($event) => $options.navigateToResult(item)
                      }, [
                        vue.createElementVNode("image", {
                          src: _imports_2,
                          class: "DuiCuo"
                        })
                      ], 8, ["onClick"])) : (vue.openBlock(), vue.createElementBlock("span", { key: 3 }, "-"))
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ])
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "no-data"
        }, " 没有找到相关数据。 "))
      ])
    ]);
  }
  const PagesDetailDetail = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "D:/Project/HBuilderProjects/dianjianHmS/dianjian02/pages/detail/detail.vue"]]);
  const _sfc_main$1 = {
    components: {
      Navbar,
      ImageViewer
    },
    data() {
      return {
        username: uni.getStorageSync("username") || "",
        resultData: null,
        loading: true,
        isPreviewVisible: false,
        currentPreviewIndex: 0
      };
    },
    computed: {
      currentDetail() {
        return this.resultData ? this.resultData.list[0] : {};
      }
    },
    methods: {
      async fetchResult(position, project, description, time) {
        try {
          uni.showLoading({
            title: "加载中..."
          });
          const token = uni.getStorageSync("token");
          if (!token) {
            uni.showToast({
              title: "未登录，请先登录",
              icon: "none"
            });
            return;
          }
          const response = await uni.request({
            url: "http://13.94.38.44:8080/CheckList/GetScanReport3New",
            method: "POST",
            data: {
              token,
              time,
              Position: position,
              Project: project,
              Description: description
            }
          });
          const data = JSON.parse(response.data);
          if (!data.isError) {
            this.resultData = data;
            formatAppLog("log", "at pages/result/result.vue:120", "更新状态成功:", this.resultData);
          } else {
            uni.showToast({
              title: "更新状态失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/result/result.vue:128", "更新状态失败", error);
          uni.showToast({
            title: "更新状态失败",
            icon: "none"
          });
        } finally {
          uni.hideLoading();
          this.loading = false;
        }
      },
      logout() {
        uni.removeStorageSync("username");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      },
      previewImage(index) {
        this.currentPreviewIndex = index;
        this.isPreviewVisible = true;
      }
    },
    onLoad(options) {
      const position = decodeURIComponent(options.position);
      const project = decodeURIComponent(options.project);
      const description = decodeURIComponent(options.description);
      const time = decodeURIComponent(options.time);
      if (position && project && description && time) {
        this.fetchResult(position, project, description, time);
      } else {
        uni.showToast({
          title: "缺少参数",
          icon: "none"
        });
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    var _a;
    const _component_navbar = vue.resolveComponent("navbar");
    const _component_image_viewer = vue.resolveComponent("image-viewer");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        $data.loading ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "loading"
        }, " 正在加载数据... ")) : $data.resultData && $data.resultData.list.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
          vue.createElementVNode(
            "view",
            { class: "header" },
            vue.toDisplayString($data.resultData.list[0].Position),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "点检项目:"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString($data.resultData.list[0].Project),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "点检内容:"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString($data.resultData.list[0].Description),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "点检结果:"),
            vue.createElementVNode("text", { class: "value" }, [
              $data.resultData.list[0].Result === "1" ? (vue.openBlock(), vue.createElementBlock("span", { key: 0 }, [
                vue.createElementVNode("image", {
                  src: _imports_0$1,
                  class: "Fuhao"
                })
              ])) : $data.resultData.list[0].Result === "3" ? (vue.openBlock(), vue.createElementBlock("span", { key: 1 }, [
                vue.createElementVNode("image", {
                  src: _imports_1$1,
                  class: "Fuhao"
                })
              ])) : $data.resultData.list[0].Result === "2" ? (vue.openBlock(), vue.createElementBlock("span", { key: 2 }, [
                vue.createElementVNode("image", {
                  src: _imports_2$2,
                  class: "Fuhao"
                })
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ]),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "点检说明:"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString($data.resultData.list[0].Remark),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "点检人:"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString($data.resultData.list[0].Person),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "点检时间:"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString($data.resultData.list[0].Time1),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "设备时间:"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString($data.resultData.list[0].Time3),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "images-container" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.resultData.list[0].FileLists || [], (image, index) => {
                return vue.openBlock(), vue.createElementBlock("image", {
                  key: index,
                  src: "data:image/png;base64," + image,
                  class: "image",
                  onClick: ($event) => $options.previewImage(index)
                }, null, 8, ["src", "onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])) : !$data.loading ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "no-data"
        }, " 没有找到相关数据。 ")) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createVNode(_component_image_viewer, {
        "is-preview-visible": $data.isPreviewVisible,
        "current-image": ((_a = $options.currentDetail) == null ? void 0 : _a.FileLists[$data.currentPreviewIndex]) || "",
        "onUpdate:isPreviewVisible": _cache[0] || (_cache[0] = ($event) => $data.isPreviewVisible = $event)
      }, null, 8, ["is-preview-visible", "current-image"])
    ]);
  }
  const PagesResultResult = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "D:/Project/HBuilderProjects/dianjianHmS/dianjian02/pages/result/result.vue"]]);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("uni_modules/uni-upgrade-center-app/pages/upgrade-popup", UniModulesUniUpgradeCenterAppPagesUpgradePopup);
  __definePage("pages/inspection/inspection", PagesInspectionInspection);
  __definePage("pages/home/home", PagesHomeHome);
  __definePage("components/Navbar", Navbar);
  __definePage("pages/project/project", PagesProjectProject);
  __definePage("pages/Mydianjian/Mydianjian", PagesMydianjianMydianjian);
  __definePage("pages/remind/remind", PagesRemindRemind);
  __definePage("pages/YiChang/YiChang", PagesYiChangYiChang);
  __definePage("pages/report/report", PagesReportReport);
  __definePage("pages/detail/detail", PagesDetailDetail);
  __definePage("pages/result/result", PagesResultResult);
  const _sfc_main = {
    components: {
      Navbar
    },
    data() {
      return {
        username: uni.getStorageSync("username") || "",
        showNavbar: false
        // 控制 Navbar 的显示
      };
    },
    onShow() {
      this.checkCurrentPage();
    },
    methods: {
      checkCurrentPage() {
        const pages2 = getCurrentPages();
        if (pages2.length > 0) {
          const currentPage = pages2[pages2.length - 1].route;
          this.showNavbar = currentPage !== "pages/login/login";
        }
      },
      logout() {
        uni.removeStorageSync("username");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "app" }, [
      $data.showNavbar ? (vue.openBlock(), vue.createBlock(_component_navbar, {
        key: 0,
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "content" }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])
    ]);
  }
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f13b4d11"], ["__file", "D:/Project/HBuilderProjects/dianjianHmS/dianjian02/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
