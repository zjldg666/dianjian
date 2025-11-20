"use strict";
const common_vendor = require("./common/vendor.js");
const common_assets = require("./common/assets.js");
if (!Math) {
  "./pages/login/login.js";
  "./uni_modules/uni-upgrade-center-app/pages/upgrade-popup.js";
  "./pages/inspection/inspection.js";
  "./pages/home/home.js";
  "./components/Navbar.js";
  "./pages/project/project.js";
  "./pages/Mydianjian/Mydianjian.js";
  "./pages/remind/remind.js";
  "./pages/YiChang/YiChang.js";
  "./pages/report/report.js";
  "./pages/detail/detail.js";
  "./pages/result/result.js";
}
const _sfc_main$1 = {
  props: {
    username: {
      type: String,
      default: null
      // 设置默认值为null，便于判断
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0,
    b: $props.username
  }, $props.username ? {
    c: common_vendor.t($props.username),
    d: common_vendor.o(($event) => _ctx.$emit("logout"))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-35616072"]]);
const _sfc_main = {
  components: {
    Navbar: MiniProgramPage
  },
  data() {
    return {
      username: common_vendor.index.getStorageSync("username") || "",
      showNavbar: false
      // 控制 Navbar 的显示
    };
  },
  onShow() {
    this.checkCurrentPage();
  },
  methods: {
    checkCurrentPage() {
      const pages = getCurrentPages();
      if (pages.length > 0) {
        const currentPage = pages[pages.length - 1].route;
        this.showNavbar = currentPage !== "pages/login/login";
      }
    },
    logout() {
      common_vendor.index.removeStorageSync("username");
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    }
  }
};
if (!Array) {
  const _component_navbar = common_vendor.resolveComponent("navbar");
  _component_navbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showNavbar
  }, $data.showNavbar ? {
    b: common_vendor.o($options.logout),
    c: common_vendor.p({
      username: $data.username
    })
  } : {});
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f13b4d11"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.MiniProgramPage = MiniProgramPage;
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/main.js.map
