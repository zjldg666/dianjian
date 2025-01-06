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
      const token = common_vendor.index.getStorageSync("token");
      common_vendor.index.request({
        url: "http://13.94.38.44:8080/CheckList/GetPositionByPerson",
        method: "POST",
        data: {
          token
        },
        success: (res) => {
          const data = JSON.parse(res.data);
          if (!data.isError) {
            this.positions = data.list;
            console.log("点检位置加载成功:", this.positions);
            this.createInspectionButtons();
          } else {
            console.error("加载点检位置失败:", data.message);
          }
        },
        fail: (err) => {
          console.error("加载点检位置失败", err);
        }
      });
    },
    createInspectionButtons() {
      this.inspectionButtons = this.positions.map((position) => ({
        label: position.SEL_ShuoMing,
        action: () => utils_scanAndNavigate.scanAndNavigate(position, this.loadInspectionDetails),
        disabled: false
      }));
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
            console.log("点检详情加载成功:", inspectionDetails);
            common_vendor.index.navigateTo({
              url: `/pages/project/project?id=${encodeURIComponent(code)}&name=${position.SEL_ShuoMing}`
            });
            console.log(encodeURIComponent(code));
          } else {
            console.error("加载点检详情失败:", data.msg);
            common_vendor.index.showToast({
              title: data.msg,
              icon: "none"
            });
          }
        },
        fail: (err) => {
          console.error("加载点检详情失败", err);
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
      buttons: $data.inspectionButtons
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
