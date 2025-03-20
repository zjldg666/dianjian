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
      assetsList: [],
      pagesize: 10,
      currentPage: 1,
      hasMoreData: true,
      loading: false,
      error: false
    };
  },
  onLoad() {
    const userInfo = common_vendor.index.getStorageSync("userInfo");
    if (userInfo && userInfo.username) {
      this.username = userInfo.username;
    }
    this.fetchAssets();
  },
  methods: {
    fetchAssets(reset = false) {
      if (reset) {
        this.assetsList = [];
        this.currentPage = 1;
        this.hasMoreData = true;
        this.error = false;
      }
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      console.log(userInfo);
      if (!userInfo.token || !userInfo.connid) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        return;
      }
      this.loading = true;
      common_vendor.index.request({
        url: "http://13.94.38.44:8000/AssetsRepair/GetMainList",
        method: "POST",
        header: {
          "content-type": "application/json"
        },
        data: JSON.stringify({
          connid: userInfo.connid,
          token: userInfo.token
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
            this.loading = false;
            this.error = true;
            return;
          }
          console.log(result);
          if (!result.IsError && result.list) {
            if (Array.isArray(result.list) && result.list.length > 0) {
              this.assetsList = reset ? result.list : [...this.assetsList, ...result.list];
              this.currentPage++;
            } else {
              this.hasMoreData = false;
            }
          } else {
            common_vendor.index.showToast({
              title: "获取资产信息失败",
              icon: "none"
            });
            this.error = true;
          }
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "请求失败，请检查网络连接",
            icon: "none"
          });
          this.error = true;
        },
        complete: () => {
          this.loading = false;
        }
      });
    },
    // 跳转报修明细和维修明细页面
    navigateToDetail(item) {
      if (item.进度) {
        common_vendor.index.navigateTo({
          url: `/pages/baoxiuMIngxi/baoxiuMIngxi?docnum=${item.报修单号}`
        });
      }
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
  return common_vendor.e({
    a: common_vendor.o($options.logout),
    b: common_vendor.p({
      username: $data.username
    }),
    c: common_vendor.f($data.assetsList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.进度 || "-"),
        b: common_vendor.t(item.报修单号 || "-"),
        c: common_vendor.t(item.资产名称 || "-"),
        d: common_vendor.t(item.故障描述 || "-"),
        e: index,
        f: common_vendor.o(($event) => $options.navigateToDetail(item), index)
      };
    }),
    d: !$data.assetsList.length && !$data.loading
  }, !$data.assetsList.length && !$data.loading ? {} : {}, {
    e: $data.loading
  }, $data.loading ? {} : {}, {
    f: $data.error
  }, $data.error ? {
    g: common_vendor.o(($event) => $options.fetchAssets(true))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3dad1acb"]]);
wx.createPage(MiniProgramPage);
