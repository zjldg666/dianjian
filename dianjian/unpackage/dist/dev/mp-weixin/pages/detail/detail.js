"use strict";
const common_vendor = require("../../common/vendor.js");
const Navbar = () => "../../components/Navbar2.js";
const _sfc_main = {
  components: {
    Navbar
  },
  data() {
    return {
      username: common_vendor.index.getStorageSync("username") || "",
      inspectionDetails: [],
      // 存储点检详情数据
      selTxt: "",
      // 存储传递的 SEL_TXT
      selShuoMing: ""
    };
  },
  onLoad(options) {
    this.selTxt = options.selTxt;
    this.selShuoMing = options.selShuoMing;
  },
  methods: {
    scanQRCode() {
      common_vendor.index.scanCode({
        success: (res) => {
          console.log("扫描成功", res);
          this.verifyQRCode(res.result);
        },
        fail: (err) => {
          console.error("扫描失败", err);
        }
      });
    },
    verifyQRCode(result) {
      const qrCodePrefix = result.substring(0, 3).toLowerCase();
      const selTxtPrefix = this.selTxt.toLowerCase();
      if (qrCodePrefix === selTxtPrefix) {
        common_vendor.index.showToast({
          title: "巡查点正确",
          icon: "success"
        });
        this.loadInspectionDetails(qrCodePrefix);
      } else {
        common_vendor.index.showToast({
          title: "位置不匹配",
          icon: "none"
        });
      }
    },
    loadInspectionDetails(code) {
      const token = common_vendor.index.getStorageSync("token");
      common_vendor.index.request({
        url: "http://13.94.38.44:8080/CheckList/GetCheckListDetail",
        method: "POST",
        data: {
          code,
          token
        },
        success: (res) => {
          const data = JSON.parse(res.data);
          if (!data.isError) {
            this.inspectionDetails = data.dt;
            console.log("点检详情加载成功:", this.inspectionDetails);
            common_vendor.index.navigateTo({
              url: `/pages/project/project?id=${code}&name=${this.selShuoMing}`
            });
          } else {
            console.error("加载点检详情失败:", data.message);
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
  _component_navbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.logout),
    b: common_vendor.p({
      username: $data.username
    }),
    c: common_vendor.t($data.selShuoMing),
    d: common_vendor.o((...args) => $options.scanQRCode && $options.scanQRCode(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
