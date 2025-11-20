"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "LoadingSpinner",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  onLoad() {
    common_vendor.index.__f__("log", "at components/LoadingSpinner.vue:19", "加载组件更新成功");
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.show
  }, $props.show ? {} : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-19f97f1a"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/LoadingSpinner.js.map
