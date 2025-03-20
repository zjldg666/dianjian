"use strict";
const common_vendor = require("../../common/vendor.js");
const Navbar = () => "../../components/Navbar.js";
const _sfc_main = {
  components: {
    Navbar
  },
  data() {
    return {
      username: "",
      detail: {}
    };
  },
  onLoad(options) {
    const userInfo = common_vendor.index.getStorageSync("userInfo");
    if (userInfo && userInfo.username) {
      this.username = userInfo.username;
    }
    this.fetchDetail(options.docnum);
  },
  methods: {
    logout() {
      common_vendor.index.removeStorageSync("userInfo");
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    },
    fetchDetail(docnum) {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (!userInfo.token || !userInfo.connid) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        return;
      }
      common_vendor.index.request({
        url: "http://13.94.38.44:8000/AssetsRepair/GetMainListDetail",
        method: "POST",
        header: {
          "content-type": "application/json"
        },
        data: JSON.stringify({
          connid: userInfo.connid,
          token: userInfo.token,
          docnum
        }),
        success: (response) => {
          let result;
          try {
            result = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
          } catch (error) {
            console.error("解析响应数据失败:", error);
            common_vendor.index.showToast({
              title: "解析数据失败",
              icon: "none"
            });
            return;
          }
          console.log(result);
          if (!result.isError) {
            this.detail = result;
          } else {
            common_vendor.index.showToast({
              title: "获取详细信息失败",
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
    c: common_vendor.t($data.detail.wxdocnum),
    d: common_vendor.t($data.detail.Reason),
    e: common_vendor.t($data.detail.SchemeTxt),
    f: common_vendor.t($data.detail.Amount),
    g: common_vendor.t($data.detail.Currency)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6808e56c"]]);
wx.createPage(MiniProgramPage);
