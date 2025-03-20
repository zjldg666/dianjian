"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      companyList: [],
      selectedCompanyId: "",
      selectedCompanyName: "",
      username: "",
      password: ""
    };
  },
  computed: {
    companyNames() {
      return this.companyList.map((company) => company.Name);
    }
  },
  onLoad() {
    this.fetchCompanyList();
  },
  methods: {
    fetchCompanyList() {
      common_vendor.index.request({
        url: "http://13.94.38.44:8000/AssetsRepair/Index",
        method: "POST",
        success: (res) => {
          const data = JSON.parse(res.data).list;
          this.companyList = data;
        }
      });
    },
    onCompanyChange(event) {
      const index = event.detail.value;
      this.selectedCompanyId = this.companyList[index].ID;
      this.selectedCompanyName = this.companyList[index].Name;
    },
    login() {
      if (!this.selectedCompanyId || !this.username || !this.password) {
        common_vendor.index.showToast({
          title: "请填写完整信息",
          icon: "none"
        });
        return;
      }
      common_vendor.index.request({
        url: "http://13.94.38.44:8000/AssetsRepair/SignIn",
        method: "POST",
        header: {
          "content-type": "application/json"
          // 默认值
        },
        data: JSON.stringify({
          connid: this.selectedCompanyId,
          strAccount: this.username,
          strPswd: this.password
        }),
        success: (res) => {
          const result = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
          console.log(result.token);
          console.log(result);
          if (result.IsError === false) {
            common_vendor.index.setStorageSync("userInfo", {
              token: result.token,
              username: result.EMP_NAME,
              connid: result.connid
              // 可以存储其他需要的信息
            });
            common_vendor.index.redirectTo({
              url: "/pages/home/home"
            });
          } else {
            this.password = "";
            if (result.message && result.message.includes("账号或密码错误")) {
              common_vendor.index.showToast({
                title: "账号或密码错误",
                icon: "none"
              });
            } else {
              common_vendor.index.showToast({
                title: result.message || "登录失败，请重试",
                icon: "none"
              });
            }
          }
        },
        fail: () => {
          this.password = "";
          common_vendor.index.showToast({
            title: "请求失败，请检查网络连接",
            icon: "none"
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.selectedCompanyName ? $data.selectedCompanyName : "请选择公司"),
    b: $options.companyNames,
    c: common_vendor.o((...args) => $options.onCompanyChange && $options.onCompanyChange(...args)),
    d: $data.username,
    e: common_vendor.o(($event) => $data.username = $event.detail.value),
    f: $data.password,
    g: common_vendor.o(($event) => $data.password = $event.detail.value),
    h: common_vendor.o((...args) => $options.login && $options.login(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
