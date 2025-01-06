"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    isPreviewVisible: {
      type: Boolean,
      required: true
    },
    currentImage: {
      type: String,
      required: true
    }
  },
  methods: {
    closePreview() {
      this.$emit("update:isPreviewVisible", false);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.isPreviewVisible
  }, $props.isPreviewVisible ? {
    b: "data:image/png;base64," + $props.currentImage,
    c: common_vendor.o(() => {
    }),
    d: common_vendor.o((...args) => $options.closePreview && $options.closePreview(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
