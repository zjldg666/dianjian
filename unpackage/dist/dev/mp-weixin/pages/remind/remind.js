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
      Menubuttons: []
    };
  },
  methods: {
    navigateToException(exception) {
      const token = common_vendor.index.getStorageSync("token");
      common_vendor.index.__f__("log", "at pages/remind/remind.vue:28", exception);
      common_vendor.index.__f__("log", "at pages/remind/remind.vue:29", "Navigating to YIChang with ID:", exception.SEL_TXT, "and Token:", token);
      if (!token) {
        common_vendor.index.showToast({
          title: "未登录，请先登录",
          icon: "none"
        });
        return;
      }
      const url = `/pages/YiChang/YiChang?id=${encodeURIComponent(exception.SEL_TXT)}&token=${encodeURIComponent(token)}&selShuoMing=${exception.SEL_ShuoMing}`;
      common_vendor.index.__f__("log", "at pages/remind/remind.vue:38", "Navigating to:", url);
      common_vendor.index.navigateTo({
        url
      });
    },
    logout() {
      common_vendor.index.removeStorageSync("username");
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    }
  },
  mounted() {
    const exceptionsStr = common_vendor.index.getStorageSync("exceptions");
    if (exceptionsStr) {
      try {
        const exceptions = JSON.parse(exceptionsStr);
        common_vendor.index.__f__("log", "at pages/remind/remind.vue:55", "Parsed Exceptions:", exceptions);
        this.Menubuttons = exceptions.map((exception) => ({
          label: exception.SEL_ShuoMing,
          action: () => this.navigateToException(exception),
          // 使用新的 navigateToException 方法
          disabled: false,
          badge: exception.num > 0 ? exception.num.toString() : "",
          image: "../../static/icon/DJxiangmu.png"
        }));
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/remind/remind.vue:64", "解析 exceptions 失败", error);
      }
      common_vendor.index.removeStorageSync("exceptions");
    } else {
      common_vendor.index.__f__("error", "at pages/remind/remind.vue:68", "未找到 exceptions 参数");
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
      buttons: $data.Menubuttons
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/remind/remind.js.map
