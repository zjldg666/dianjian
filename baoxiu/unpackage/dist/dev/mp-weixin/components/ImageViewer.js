"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    currentImage: {
      type: String,
      required: true
    },
    onClose: {
      type: Function,
      required: true
      // 确保父组件传递了一个关闭方法
    }
  },
  methods: {
    closeViewer() {
      this.onClose();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.visible
  }, $props.visible ? {
    b: common_vendor.o((...args) => $options.closeViewer && $options.closeViewer(...args)),
    c: $props.currentImage,
    d: common_vendor.o((...args) => $options.closeViewer && $options.closeViewer(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a9a40036"]]);
wx.createComponent(Component);
