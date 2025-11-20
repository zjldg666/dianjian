"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const Navbar = () => "../../components/Navbar2.js";
const ImageViewer = () => "../../components/ImageViewer.js";
const _sfc_main = {
  components: {
    Navbar,
    ImageViewer
  },
  data() {
    return {
      username: common_vendor.index.getStorageSync("username") || "",
      resultData: null,
      loading: true,
      isPreviewVisible: false,
      currentPreviewIndex: 0
    };
  },
  computed: {
    currentDetail() {
      return this.resultData ? this.resultData.list[0] : {};
    }
  },
  methods: {
    async fetchResult(position, project, description, time) {
      try {
        common_vendor.index.showLoading({
          title: "加载中..."
        });
        const token = common_vendor.index.getStorageSync("token");
        if (!token) {
          common_vendor.index.showToast({
            title: "未登录，请先登录",
            icon: "none"
          });
          return;
        }
        const response = await common_vendor.index.request({
          url: "http://13.94.38.44:8080/CheckList/GetScanReport3New",
          method: "POST",
          data: {
            token,
            time,
            Position: position,
            Project: project,
            Description: description
          }
        });
        const data = JSON.parse(response.data);
        if (!data.isError) {
          this.resultData = data;
          common_vendor.index.__f__("log", "at pages/result/result.vue:120", "更新状态成功:", this.resultData);
        } else {
          common_vendor.index.showToast({
            title: "更新状态失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/result/result.vue:128", "更新状态失败", error);
        common_vendor.index.showToast({
          title: "更新状态失败",
          icon: "none"
        });
      } finally {
        common_vendor.index.hideLoading();
        this.loading = false;
      }
    },
    logout() {
      common_vendor.index.removeStorageSync("username");
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    },
    previewImage(index) {
      this.currentPreviewIndex = index;
      this.isPreviewVisible = true;
    }
  },
  onLoad(options) {
    const position = decodeURIComponent(options.position);
    const project = decodeURIComponent(options.project);
    const description = decodeURIComponent(options.description);
    const time = decodeURIComponent(options.time);
    if (position && project && description && time) {
      this.fetchResult(position, project, description, time);
    } else {
      common_vendor.index.showToast({
        title: "缺少参数",
        icon: "none"
      });
      common_vendor.index.navigateBack();
    }
  }
};
if (!Array) {
  const _component_navbar = common_vendor.resolveComponent("navbar");
  const _component_image_viewer = common_vendor.resolveComponent("image-viewer");
  (_component_navbar + _component_image_viewer)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  return common_vendor.e({
    a: common_vendor.o($options.logout),
    b: common_vendor.p({
      username: $data.username
    }),
    c: $data.loading
  }, $data.loading ? {} : $data.resultData && $data.resultData.list.length > 0 ? common_vendor.e({
    e: common_vendor.t($data.resultData.list[0].Position),
    f: common_vendor.t($data.resultData.list[0].Project),
    g: common_vendor.t($data.resultData.list[0].Description),
    h: $data.resultData.list[0].Result === "1"
  }, $data.resultData.list[0].Result === "1" ? {
    i: common_assets._imports_0$2
  } : $data.resultData.list[0].Result === "3" ? {
    k: common_assets._imports_1$1
  } : $data.resultData.list[0].Result === "2" ? {
    m: common_assets._imports_2
  } : {}, {
    j: $data.resultData.list[0].Result === "3",
    l: $data.resultData.list[0].Result === "2",
    n: common_vendor.t($data.resultData.list[0].Remark),
    o: common_vendor.t($data.resultData.list[0].Person),
    p: common_vendor.t($data.resultData.list[0].Time1),
    q: common_vendor.t($data.resultData.list[0].Time3),
    r: common_vendor.f($data.resultData.list[0].FileLists || [], (image, index, i0) => {
      return {
        a: index,
        b: "data:image/png;base64," + image,
        c: common_vendor.o(($event) => $options.previewImage(index), index)
      };
    })
  }) : !$data.loading ? {} : {}, {
    d: $data.resultData && $data.resultData.list.length > 0,
    s: !$data.loading,
    t: common_vendor.o(($event) => $data.isPreviewVisible = $event),
    v: common_vendor.p({
      ["is-preview-visible"]: $data.isPreviewVisible,
      ["current-image"]: ((_a = $options.currentDetail) == null ? void 0 : _a.FileLists[$data.currentPreviewIndex]) || ""
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/result/result.js.map
