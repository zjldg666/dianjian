"use strict";
const common_vendor = require("../../common/vendor.js");
const Navbar = () => "../../components/Navbar.js";
const ImageViewer = () => "../../components/ImageViewer.js";
const _sfc_main = {
  components: {
    Navbar,
    ImageViewer
  },
  data() {
    return {
      username: "",
      detail: {},
      currentTab: "baoxiu",
      // 默认选中的标签
      isImageViewerVisible: false,
      selectedImageUrl: ""
    };
  },
  onLoad(options) {
    const userInfo = common_vendor.index.getStorageSync("userInfo");
    if (userInfo && userInfo.username) {
      this.username = userInfo.username;
    }
    this.fetchDetail(options.docnum);
    this.fetchWeixiuDetail(options.docnum);
  },
  methods: {
    closeImageViewer() {
      this.isImageViewerVisible = false;
    },
    openImageViewer(url) {
      this.selectedImageUrl = url;
      this.isImageViewerVisible = true;
    },
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
            console.log(result);
          } catch (error) {
            console.error("解析响应数据失败:", error);
            common_vendor.index.showToast({
              title: "解析数据失败",
              icon: "none"
            });
            return;
          }
          if (!result.isError) {
            this.detail = { ...this.detail, ...result };
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
    },
    fetchWeixiuDetail(docnum) {
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
        // 假设API相同，可以根据实际情况调整
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
          if (!result.isError) {
            this.detail = { ...this.detail, ...result };
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
    },
    switchTab(tab) {
      this.currentTab = tab;
    }
  }
};
if (!Array) {
  const _component_navbar = common_vendor.resolveComponent("navbar");
  const _component_image_viewer = common_vendor.resolveComponent("image-viewer");
  (_component_navbar + _component_image_viewer)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.logout),
    b: common_vendor.p({
      username: $data.username
    }),
    c: common_vendor.n({
      active: $data.currentTab === "baoxiu"
    }),
    d: common_vendor.o(($event) => $options.switchTab("baoxiu")),
    e: common_vendor.n({
      active: $data.currentTab === "weixiu"
    }),
    f: common_vendor.o(($event) => $options.switchTab("weixiu")),
    g: $data.currentTab === "baoxiu"
  }, $data.currentTab === "baoxiu" ? common_vendor.e({
    h: common_vendor.t($data.detail.docnum),
    i: common_vendor.t($data.detail.AssetsCode),
    j: common_vendor.t($data.detail.AssetsName),
    k: common_vendor.t($data.detail.UserDep),
    l: common_vendor.t($data.detail.AssetsType),
    m: common_vendor.t($data.detail.FinishDate),
    n: common_vendor.t($data.detail.Discription),
    o: $data.detail.FilesList && $data.detail.FilesList.length > 0
  }, $data.detail.FilesList && $data.detail.FilesList.length > 0 ? {
    p: common_vendor.f($data.detail.FilesList, (file, fileIndex, i0) => {
      return {
        a: file,
        b: common_vendor.o(($event) => $options.openImageViewer(file), fileIndex),
        c: fileIndex
      };
    })
  } : {}) : {}, {
    q: $data.currentTab === "weixiu"
  }, $data.currentTab === "weixiu" ? {
    r: common_vendor.t($data.detail.wxdocnum),
    s: common_vendor.t($data.detail.Reason),
    t: common_vendor.t($data.detail.SchemeTxt),
    v: common_vendor.t($data.detail.Amount),
    w: common_vendor.t($data.detail.Currency)
  } : {}, {
    x: common_vendor.p({
      visible: $data.isImageViewerVisible,
      ["current-image"]: $data.selectedImageUrl,
      ["on-close"]: $options.closeImageViewer
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ea34caf7"]]);
wx.createPage(MiniProgramPage);
