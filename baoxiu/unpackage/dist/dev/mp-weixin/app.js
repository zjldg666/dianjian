"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/home/home.js";
  "./pages/repair/repair.js";
  "./pages/copy/copy.js";
  "./pages/mobileRepair/mobileRepair.js";
  "./pages/repairList/repairList.js";
  "./pages/baoxiuMIngxi/baoxiuMIngxi.js";
  "./pages/weixiuMingxi/weixiuMingxi.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
