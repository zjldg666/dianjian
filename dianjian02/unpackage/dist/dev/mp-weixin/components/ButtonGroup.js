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
        a: common_vendor.t(button.label),
        b: button.badge
      }, button.badge ? {
        c: common_vendor.t(button.badge)
      } : {}, {
        d: button.disabled,
        e: common_vendor.o(($event) => $options.handleClick(button.action), index),
        f: index
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8e810d98"]]);
wx.createComponent(Component);
