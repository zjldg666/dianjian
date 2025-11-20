"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_scanAndNavigate = require("../../utils/scanAndNavigate.js");
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
          common_vendor.index.__f__("log", "at pages/inspection/inspection.vue:50", "token:", token);
          if (!data.isError) {
            this.buttons = data.list.map((item) => ({
              label: item.SEL_ShuoMing,
              action: () => utils_scanAndNavigate.scanAndNavigate(item, this.loadInspectionDetails),
              image: "../../static/icon/DJxiangmu.png"
            }));
            common_vendor.index.__f__("log", "at pages/inspection/inspection.vue:58", "点检项目加载成功:", this.buttons);
          } else {
            common_vendor.index.__f__("error", "at pages/inspection/inspection.vue:60", "加载点检项目失败:", data.message);
          }
          if (callback)
            callback();
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/inspection/inspection.vue:65", "加载点检项目失败", err);
          if (callback)
            callback();
        }
      });
    },
    loadInspectionDetails(code, position) {
      const token = common_vendor.index.getStorageSync("token");
      common_vendor.index.request({
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
            common_vendor.index.__f__("log", "at pages/inspection/inspection.vue:83", "点检详情加载成功:", inspectionDetails);
            common_vendor.index.navigateTo({
              url: `/pages/project/project?id=${encodeURIComponent(code)}&name=${position.SEL_ShuoMing}`
            });
            common_vendor.index.__f__("log", "at pages/inspection/inspection.vue:88", encodeURIComponent(code));
          } else {
            common_vendor.index.__f__("error", "at pages/inspection/inspection.vue:90", "加载点检详情失败:", data.msg);
            common_vendor.index.showToast({
              title: data.msg,
              icon: "none"
            });
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/inspection/inspection.vue:98", "加载点检详情失败", err);
        }
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/inspection/inspection.js.map
