"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const Navbar = () => "../../components/Navbar2.js";
const ImageViewer = () => "../../components/ImageViewer.js";
const LoadingSpinner = () => "../../components/LoadingSpinner.js";
const _sfc_main = {
  name: "DetailPage",
  components: {
    Navbar,
    ImageViewer,
    LoadingSpinner
  },
  setup() {
    const username = common_vendor.ref(common_vendor.index.getStorageSync("username") || "");
    const details = common_vendor.ref([]);
    const currentIndex = common_vendor.ref(0);
    const selShuoMing = common_vendor.ref("");
    const isPreviewVisible = common_vendor.ref(false);
    const currentPreviewIndex = common_vendor.ref(0);
    const isLoading = common_vendor.ref(true);
    const currentDetail = common_vendor.computed(() => {
      return details.value[currentIndex.value] || {};
    });
    const logout = () => {
      common_vendor.index.removeStorageSync("username");
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    };
    const getRemindDetail = (code, token) => {
      isLoading.value = true;
      common_vendor.index.__f__("log", "at pages/YiChang/YiChang.vue:109", "开始加载数据，isLoading:", isLoading.value);
      const requestData = { token, code };
      common_vendor.index.request({
        url: "http://13.94.38.44:8080/CheckList/GetRemindDetail",
        method: "POST",
        data: requestData,
        success: (response) => {
          common_vendor.index.__f__("log", "at pages/YiChang/YiChang.vue:117", "请求成功，响应数据:", response);
          const data = JSON.parse(response.data);
          common_vendor.index.__f__("log", "at pages/YiChang/YiChang.vue:119", "解析后数据:", data);
          if (!data.isError) {
            details.value = data.list || [];
            currentIndex.value = 0;
            common_vendor.index.__f__("log", "at pages/YiChang/YiChang.vue:123", "数据加载完成，details长度:", details.value.length);
          } else {
            common_vendor.index.showToast({
              title: "加载提醒详情失败",
              icon: "none"
            });
            details.value = [];
          }
        },
        fail: (error) => {
          common_vendor.index.__f__("error", "at pages/YiChang/YiChang.vue:133", "加载提醒详情失败", error);
          common_vendor.index.showToast({
            title: "加载提醒详情失败",
            icon: "none"
          });
          details.value = [];
        },
        complete: () => {
          isLoading.value = false;
          common_vendor.index.__f__("log", "at pages/YiChang/YiChang.vue:143", "加载完成，isLoading:", isLoading.value);
        }
      });
    };
    const prevItem = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--;
      }
    };
    const nextItem = () => {
      if (currentIndex.value < details.value.length - 1) {
        currentIndex.value++;
      }
    };
    const previewImage = (index) => {
      common_vendor.index.__f__("log", "at pages/YiChang/YiChang.vue:161", "Clicked image index:", index);
      common_vendor.index.__f__("log", "at pages/YiChang/YiChang.vue:162", "Images array:", currentDetail.value.FileLists);
      currentPreviewIndex.value = index;
      isPreviewVisible.value = true;
    };
    common_vendor.onLoad((options) => {
      common_vendor.index.__f__("log", "at pages/YiChang/YiChang.vue:168", "页面加载参数:", options);
      if (options && options.id && options.token && options.selShuoMing) {
        getRemindDetail(options.id, options.token);
        selShuoMing.value = decodeURIComponent(options.selShuoMing);
      } else {
        common_vendor.index.__f__("error", "at pages/YiChang/YiChang.vue:173", "未找到 id 或 token 参数");
        isLoading.value = false;
      }
    });
    return {
      username,
      details,
      currentIndex,
      selShuoMing,
      isPreviewVisible,
      currentPreviewIndex,
      currentDetail,
      logout,
      prevItem,
      nextItem,
      previewImage,
      isLoading
    };
  }
};
if (!Array) {
  const _component_navbar = common_vendor.resolveComponent("navbar");
  const _component_loading_spinner = common_vendor.resolveComponent("loading-spinner");
  const _component_image_viewer = common_vendor.resolveComponent("image-viewer");
  (_component_navbar + _component_loading_spinner + _component_image_viewer)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
  return common_vendor.e({
    a: common_vendor.o($setup.logout),
    b: common_vendor.p({
      username: $setup.username
    }),
    c: common_vendor.p({
      show: $setup.isLoading
    }),
    d: !$setup.isLoading && $setup.details.length > 0
  }, !$setup.isLoading && $setup.details.length > 0 ? common_vendor.e({
    e: common_vendor.t($setup.selShuoMing),
    f: common_vendor.t((_a = $setup.currentDetail) == null ? void 0 : _a.Project),
    g: common_vendor.t((_b = $setup.currentDetail) == null ? void 0 : _b.Description),
    h: ((_c = $setup.currentDetail) == null ? void 0 : _c.Result) === "1"
  }, ((_d = $setup.currentDetail) == null ? void 0 : _d.Result) === "1" ? {
    i: common_assets._imports_0$2
  } : ((_e = $setup.currentDetail) == null ? void 0 : _e.Result) === "3" ? {
    k: common_assets._imports_1$1
  } : ((_f = $setup.currentDetail) == null ? void 0 : _f.Result) === "2" ? {
    m: common_assets._imports_2
  } : {}, {
    j: ((_g = $setup.currentDetail) == null ? void 0 : _g.Result) === "3",
    l: ((_h = $setup.currentDetail) == null ? void 0 : _h.Result) === "2",
    n: common_vendor.t((_i = $setup.currentDetail) == null ? void 0 : _i.Remark),
    o: common_vendor.t((_j = $setup.currentDetail) == null ? void 0 : _j.Person),
    p: common_vendor.t((_k = $setup.currentDetail) == null ? void 0 : _k.Time1),
    q: common_vendor.t((_l = $setup.currentDetail) == null ? void 0 : _l.Time3),
    r: common_vendor.f(((_m = $setup.currentDetail) == null ? void 0 : _m.FileLists) || [], (image, index, i0) => {
      return {
        a: index,
        b: "data:image/png;base64," + image,
        c: common_vendor.o(($event) => $setup.previewImage(index), index)
      };
    }),
    s: $setup.currentIndex === 0,
    t: common_vendor.o((...args) => $setup.prevItem && $setup.prevItem(...args)),
    v: $setup.currentIndex === $setup.details.length - 1,
    w: common_vendor.o((...args) => $setup.nextItem && $setup.nextItem(...args))
  }) : !$setup.isLoading && $setup.details.length === 0 ? {} : {}, {
    x: !$setup.isLoading && $setup.details.length === 0,
    y: $setup.isPreviewVisible
  }, $setup.isPreviewVisible ? {
    z: common_vendor.o(($event) => $setup.isPreviewVisible = $event),
    A: common_vendor.p({
      ["is-preview-visible"]: $setup.isPreviewVisible,
      ["current-image"]: ((_n = $setup.currentDetail) == null ? void 0 : _n.FileLists) ? $setup.currentDetail.FileLists[$setup.currentPreviewIndex] || "" : ""
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/YiChang/YiChang.js.map
