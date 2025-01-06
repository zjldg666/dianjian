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
      details: [],
      currentIndex: 0,
      selShuoMing: "",
      isPreviewVisible: false,
      currentPreviewIndex: 0
    };
  },
  computed: {
    currentDetail() {
      return this.details[this.currentIndex] || {};
    }
  },
  methods: {
    logout() {
      common_vendor.index.removeStorageSync("username");
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    },
    getRemindDetail(code, token) {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      const requestData = { token, code };
      common_vendor.index.request({
        url: "http://13.94.38.44:8080/CheckList/GetRemindDetail",
        method: "POST",
        data: requestData,
        success: (response) => {
          const data = JSON.parse(response.data);
          console.log(data);
          if (!data.isError) {
            this.details = data.list;
            this.currentIndex = 0;
          } else {
            common_vendor.index.showToast({
              title: "加载提醒详情失败",
              icon: "none"
            });
          }
        },
        complete: () => {
          common_vendor.index.hideLoading();
        },
        fail: (error) => {
          console.error("加载提醒详情失败", error);
          common_vendor.index.showToast({
            title: "加载提醒详情失败",
            icon: "none"
          });
        }
      });
    },
    prevItem() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextItem() {
      if (this.currentIndex < this.details.length - 1) {
        this.currentIndex++;
      }
    },
    previewImage(index) {
      console.log("Clicked image index:", index);
      console.log("Images array:", this.currentDetail.FileLists);
      this.currentPreviewIndex = index;
      this.isPreviewVisible = true;
    }
  },
  onLoad(options) {
    if (options && options.id && options.token && options.selShuoMing) {
      this.getRemindDetail(options.id, options.token);
      this.selShuoMing = decodeURIComponent(options.selShuoMing);
      console.log(options);
    } else {
      console.error("未找到 id 或 token 参数");
    }
  }
};
if (!Array) {
  const _component_navbar = common_vendor.resolveComponent("navbar");
  const _component_image_viewer = common_vendor.resolveComponent("image-viewer");
  (_component_navbar + _component_image_viewer)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
  return common_vendor.e({
    a: common_vendor.o($options.logout),
    b: common_vendor.p({
      username: $data.username
    }),
    c: common_vendor.t($data.selShuoMing),
    d: common_vendor.t((_a = $options.currentDetail) == null ? void 0 : _a.Project),
    e: common_vendor.t((_b = $options.currentDetail) == null ? void 0 : _b.Description),
    f: ((_c = $options.currentDetail) == null ? void 0 : _c.Result) === "1"
  }, ((_d = $options.currentDetail) == null ? void 0 : _d.Result) === "1" ? {
    g: common_assets._imports_0$1
  } : ((_e = $options.currentDetail) == null ? void 0 : _e.Result) === "3" ? {
    i: common_assets._imports_1
  } : ((_f = $options.currentDetail) == null ? void 0 : _f.Result) === "2" ? {
    k: common_assets._imports_2
  } : {}, {
    h: ((_g = $options.currentDetail) == null ? void 0 : _g.Result) === "3",
    j: ((_h = $options.currentDetail) == null ? void 0 : _h.Result) === "2",
    l: common_vendor.t((_i = $options.currentDetail) == null ? void 0 : _i.Remark),
    m: common_vendor.t((_j = $options.currentDetail) == null ? void 0 : _j.Person),
    n: common_vendor.t((_k = $options.currentDetail) == null ? void 0 : _k.Time1),
    o: common_vendor.t((_l = $options.currentDetail) == null ? void 0 : _l.Time3),
    p: common_vendor.f(((_m = $options.currentDetail) == null ? void 0 : _m.FileLists) || [], (image, index, i0) => {
      return {
        a: index,
        b: "data:image/png;base64," + image,
        c: common_vendor.o(($event) => $options.previewImage(index), index)
      };
    }),
    q: $data.currentIndex === 0,
    r: common_vendor.o((...args) => $options.prevItem && $options.prevItem(...args)),
    s: $data.currentIndex === $data.details.length - 1,
    t: common_vendor.o((...args) => $options.nextItem && $options.nextItem(...args)),
    v: common_vendor.o(($event) => $data.isPreviewVisible = $event),
    w: common_vendor.p({
      ["is-preview-visible"]: $data.isPreviewVisible,
      ["current-image"]: ((_n = $options.currentDetail) == null ? void 0 : _n.FileLists[$data.currentPreviewIndex]) || ""
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
