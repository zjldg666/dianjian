"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const Navbar = () => "../../components/Navbar.js";
const _sfc_main = {
  components: {
    Navbar
  },
  data() {
    return {
      username: ""
    };
  },
  onLoad() {
    const userInfo = common_vendor.index.getStorageSync("userInfo");
    if (userInfo && userInfo.username) {
      this.username = userInfo.username;
    }
  },
  methods: {
    // 扫码报修功能
    scanAndNavigate() {
      common_vendor.index.scanCode({
        success: (res) => {
          const AssetsCode = res.result;
          console.log(AssetsCode);
          this.navigateToRepair(AssetsCode);
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "扫码失败，请重试",
            icon: "none"
          });
        }
      });
    },
    navigateToRepair(AssetsCode) {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      console.log(userInfo.connid);
      if (!userInfo.token || !userInfo.connid) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        return;
      }
      common_vendor.index.request({
        url: "http://13.94.38.44:8000/AssetsRepair/ShowNewInfo",
        method: "POST",
        header: {
          "content-type": "application/json"
        },
        data: JSON.stringify({
          connid: userInfo.connid,
          token: userInfo.token,
          AssetsCode,
          isEdit: true
        }),
        success: (response) => {
          const result = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
          console.log(result);
          console.log(result.AssetsCode);
          if (!result.IsError) {
            common_vendor.index.navigateTo({
              url: `/pages/repair/repair?data=${JSON.stringify(result)}`
            });
          } else {
            common_vendor.index.showToast({
              title: "获取资产信息失败",
              icon: "none"
            });
          }
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "请求失败，请检查网络连接",
            icon: "none"
          });
        }
      });
    },
    TomobileRepair() {
      common_vendor.index.navigateTo({
        url: "/pages/mobileRepair/mobileRepair"
      });
    },
    TorepairList() {
      common_vendor.index.navigateTo({
        url: "/pages/repairList/repairList"
      });
    },
    navigateTo(page) {
      common_vendor.index.navigateTo({
        url: `/pages/${page}/${page}`
      });
    },
    logout() {
      common_vendor.index.removeStorageSync("userInfo");
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
  return {
    a: common_vendor.o($options.logout),
    b: common_vendor.p({
      username: $data.username
    }),
    c: common_assets._imports_0,
    d: common_vendor.o((...args) => $options.scanAndNavigate && $options.scanAndNavigate(...args)),
    e: common_assets._imports_1,
    f: common_vendor.o((...args) => $options.TomobileRepair && $options.TomobileRepair(...args)),
    g: common_assets._imports_2,
    h: common_vendor.o((...args) => $options.TorepairList && $options.TorepairList(...args)),
    i: common_assets._imports_3,
    j: common_vendor.o(($event) => $options.navigateTo("assetList")),
    k: common_assets._imports_4,
    l: common_vendor.o(($event) => $options.navigateTo("simpleReport"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-07e72d3c"]]);
wx.createPage(MiniProgramPage);
