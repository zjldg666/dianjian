"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    buttons: {
      type: Array,
      required: true
    }
  },
  methods: {
    // 处理按钮点击事件
    handleClick(action) {
      if (typeof action === "function") {
        action();
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.buttons, (button, index, i0) => {
      return common_vendor.e({
        a: button.image
      }, button.image ? {
        b: button.image
      } : {}, {
        c: common_vendor.t(button.label),
        d: button.badge
      }, button.badge ? {
        e: common_vendor.t(button.badge)
      } : {}, {
        f: button.disabled,
        g: common_vendor.o(($event) => $options.handleClick(button.action), index),
        h: index
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8e810d98"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/ButtonGroup.js.map
