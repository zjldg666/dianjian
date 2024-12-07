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
      buttons: []
      // 用于存储点检项目的按钮数据
    };
  },
  onLoad() {
    this.getInspectionItems();
  },
  onPullDownRefresh() {
    this.getInspectionItems(() => {
      common_vendor.index.stopPullDownRefresh();
    });
  },
  methods: {
    getInspectionItems(callback) {
      const token = common_vendor.index.getStorageSync("token");
      const clientCode = common_vendor.index.getStorageSync("clientcode");
      common_vendor.index.request({
        url: "http://13.94.38.44:8080/CheckList/GetAllCheckListByClientCode",
        method: "POST",
        data: {
          code: clientCode,
          // 使用存储的客户编码
          token
        },
        success: (res) => {
          const data = JSON.parse(res.data);
          console.log("token:", token);
          if (!data.isError) {
            this.buttons = data.list.map((item) => ({
              label: item.SEL_ShuoMing,
              action: () => this.goToDetail(item.SEL_TXT, item.SEL_ShuoMing)
            }));
            console.log("点检项目加载成功:", this.buttons);
          } else {
            console.error("加载点检项目失败:", data.message);
          }
          if (callback)
            callback();
        },
        fail: (err) => {
          console.error("加载点检项目失败", err);
          if (callback)
            callback();
        }
      });
    },
    goToDetail(selTxt, selShuoMing) {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?selTxt=${selTxt}&&selShuoMing=${selShuoMing}`
      });
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
