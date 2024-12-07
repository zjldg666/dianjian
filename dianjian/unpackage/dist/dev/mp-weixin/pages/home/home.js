"use strict";
const common_vendor = require("../../common/vendor.js");
const Navbar = () => "../../components/Navbar2.js";
const ButtonGroup = () => "../../components/ButtonGroup.js";
const _sfc_main = {
  components: {
    Navbar,
    ButtonGroup
  },
  data() {
    return {
      username: common_vendor.index.getStorageSync("username") || "",
      // 定义按钮数组
      buttons: [
        { label: "我的巡查", action: this.goToInspection },
        { label: "待定按钮1", action: null, disabled: true },
        { label: "待定按钮2", action: null, disabled: true },
        { label: "待定按钮3", action: null, disabled: true }
      ]
    };
  },
  methods: {
    // 跳转到巡查任务页面
    goToInspection() {
      common_vendor.index.navigateTo({
        url: "/pages/inspection/inspection"
      });
    },
    // 退出登录
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
  const _component_button_group = common_vendor.resolveComponent("button-group");
  (_component_navbar + _component_button_group)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.logout),
    b: common_vendor.p({
      username: $data.username
    }),
    c: common_vendor.p({
      buttons: $data.buttons
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
