"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniUpgradeCenterApp_utils_checkUpdate = require("../../uni_modules/uni-upgrade-center-app/utils/check-update.js");
const Navbar = () => "../../components/Navbar2.js";
const _sfc_main = {
  components: {
    Navbar
  },
  onReady() {
    uni_modules_uniUpgradeCenterApp_utils_checkUpdate.checkUpdate();
  },
  data() {
    return {
      strAccount: "",
      // 用户输入的账号
      password: "",
      // 用户输入的密码
      clientCodes: [],
      // 客户编码列表
      selectedClientCode: ""
      // 选中的客户编码
    };
  },
  onLoad() {
    this.loadClientCodes();
  },
  methods: {
    loadClientCodes() {
      common_vendor.index.request({
        url: "http://13.94.38.44:8080/CheckList/GetClientCode",
        // 请求客户编码接口
        method: "GET",
        success: (res) => {
          const data = JSON.parse(res.data);
          if (data && data.list) {
            this.clientCodes = data.list.map((item) => item.ClientCode);
            common_vendor.index.__f__("log", "at pages/login/login.vue:57", "加载成功:", this.clientCodes);
          } else {
            common_vendor.index.__f__("error", "at pages/login/login.vue:59", "加载客户编码失败:", data ? data.message : "无效的返回数据");
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/login/login.vue:63", "加载客户编码失败", err);
        }
      });
    },
    handleClientCodeChange(event) {
      this.selectedClientCode = this.clientCodes[event.detail.value];
    },
    login() {
      if (this.strAccount && this.password && this.selectedClientCode) {
        common_vendor.index.request({
          url: "http://13.94.38.44:8080/CheckList/SignIn",
          // 登录验证接口
          method: "POST",
          data: {
            strAccount: this.strAccount,
            strPswd: this.password,
            clientcode: this.selectedClientCode
          },
          success: (res) => {
            const data = JSON.parse(res.data);
            common_vendor.index.__f__("log", "at pages/login/login.vue:84", "数据为:", data);
            if (data.IsError === false) {
              common_vendor.index.setStorageSync("token", data.token);
              common_vendor.index.setStorageSync("username", data.userName);
              common_vendor.index.setStorageSync("clientcode", this.selectedClientCode);
              common_vendor.index.__f__("log", "at pages/login/login.vue:90", data.token);
              common_vendor.index.showToast({
                title: "登录成功",
                icon: "success"
              });
              common_vendor.index.redirectTo({
                url: "/pages/home/home"
                // 跳转到主页
              });
            } else {
              common_vendor.index.showToast({
                title: "用户名或密码错误",
                icon: "none"
              });
            }
          },
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/login/login.vue:106", "登录失败", err);
            common_vendor.index.showToast({
              title: "登录失败，请稍后重试",
              icon: "none"
            });
          }
        });
      } else {
        common_vendor.index.showToast({
          title: "请输入完整的登录信息",
          icon: "none",
          complete: () => {
            common_vendor.index.reLaunch({
              url: "/pages/login/login"
            });
          }
        });
      }
    }
  }
};
if (!Array) {
  const _component_Navbar = common_vendor.resolveComponent("Navbar");
  _component_Navbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.selectedClientCode || "选择客户编码"),
    b: $data.clientCodes,
    c: common_vendor.o((...args) => $options.handleClientCodeChange && $options.handleClientCodeChange(...args)),
    d: $data.strAccount,
    e: common_vendor.o(($event) => $data.strAccount = $event.detail.value),
    f: $data.password,
    g: common_vendor.o(($event) => $data.password = $event.detail.value),
    h: common_vendor.o((...args) => $options.login && $options.login(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
