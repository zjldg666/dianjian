"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const Navbar = () => "../../components/Navbar2.js";
const _sfc_main = {
  components: {
    Navbar
  },
  data() {
    return {
      username: common_vendor.index.getStorageSync("username") || "",
      detailData: null,
      loading: true,
      selectedHour: 8,
      // 默认时间为8点
      minHour: 0,
      maxHour: 23
    };
  },
  computed: {
    selectedDate() {
      if (this.detailData && this.detailData.dt.length > 0) {
        const firstTimestamp = Object.keys(this.detailData.dt[0]).find((key) => /^202[45]-\d{2}-\d{2}/.test(key));
        if (firstTimestamp) {
          return firstTimestamp.split(" ")[0];
        }
      }
      return "";
    },
    selectedHourKey() {
      if (this.selectedDate) {
        const key = `${this.selectedDate} ${this.selectedHour.toString().padStart(2, "0")}`;
        common_vendor.index.__f__("log", "at pages/detail/detail.vue:91", "selectedHourKey:", key);
        return key;
      }
      return "";
    },
    filteredDetailData() {
      if (!this.detailData || !this.detailData.dt)
        return [];
      common_vendor.index.__f__("log", "at pages/detail/detail.vue:98", "detailData.dt:", this.detailData.dt);
      common_vendor.index.__f__("log", "at pages/detail/detail.vue:99", "selectedHourKey in filteredDetailData:", this.selectedHourKey);
      return this.detailData.dt.filter((item) => item[this.selectedHourKey] !== void 0);
    },
    isPrevDisabled() {
      return this.selectedHour <= this.minHour;
    },
    isNextDisabled() {
      return this.selectedHour >= this.maxHour;
    }
  },
  methods: {
    async fetchDetail(position, time) {
      try {
        this.loading = true;
        const token = common_vendor.index.getStorageSync("token");
        if (!token) {
          common_vendor.index.showToast({
            title: "未登录，请先登录",
            icon: "none"
          });
          return;
        }
        const response = await common_vendor.index.request({
          url: "http://13.94.38.44:8080/CheckList/GetScanReport2New",
          method: "POST",
          data: {
            token,
            time,
            Position: position
          }
        });
        const data = JSON.parse(response.data);
        if (!data.isError) {
          this.detailData = data;
          common_vendor.index.__f__("log", "at pages/detail/detail.vue:135", "详细数据加载成功:", this.detailData);
          this.setInitialSelectedHour();
        } else {
          common_vendor.index.showToast({
            title: "获取详细数据失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/detail/detail.vue:144", "获取详细数据失败", error);
        common_vendor.index.showToast({
          title: "获取详细数据失败",
          icon: "none"
        });
      } finally {
        this.loading = false;
      }
    },
    setInitialSelectedHour() {
      if (this.detailData && this.detailData.dt.length > 0) {
        const dataItem = this.detailData.dt[0];
        const timestamps = Object.keys(dataItem).filter((key) => /^202[45]-\d{2}-\d{2}/.test(key)).sort();
        for (const timestamp of timestamps) {
          const value = dataItem[timestamp];
          if (value === "1" || value === "2") {
            const hour = parseInt(timestamp.split(" ")[1], 10);
            this.selectedHour = hour;
            break;
          }
        }
      }
    },
    prevHour() {
      if (this.selectedHour > this.minHour) {
        this.selectedHour--;
      }
    },
    nextHour() {
      if (this.selectedHour < this.maxHour) {
        this.selectedHour++;
      }
    },
    logout() {
      common_vendor.index.removeStorageSync("username");
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    },
    navigateToResult(item) {
      common_vendor.index.__f__("log", "at pages/detail/detail.vue:184", "navigateToResult called with selectedHourKey:", this.selectedHourKey);
      common_vendor.index.navigateTo({
        url: `/pages/result/result?position=${this.detailData.dt[0]["点检位置"]}&project=${item["点检项目"]}&description=${item["点检内容"]}&time=${this.selectedHourKey}:00`
      });
    }
  },
  onLoad(options) {
    const position = options.position;
    const time = options.time;
    if (position && time) {
      this.fetchDetail(decodeURIComponent(position), decodeURIComponent(time));
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
  _component_navbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.logout),
    b: common_vendor.p({
      username: $data.username
    }),
    c: $data.loading
  }, $data.loading ? {} : $data.detailData && $data.detailData.dt.length > 0 ? {
    e: common_vendor.t($data.detailData.dt[0]["点检位置"]),
    f: common_vendor.o((...args) => $options.prevHour && $options.prevHour(...args)),
    g: $options.isPrevDisabled,
    h: common_vendor.t($data.selectedHour),
    i: common_vendor.o((...args) => $options.nextHour && $options.nextHour(...args)),
    j: $options.isNextDisabled,
    k: common_vendor.f($options.filteredDetailData, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.点检项目),
        b: common_vendor.t(item.点检内容),
        c: item[$options.selectedHourKey] === "1"
      }, item[$options.selectedHourKey] === "1" ? {
        d: common_assets._imports_0$3,
        e: common_vendor.o(($event) => $options.navigateToResult(item), index)
      } : item[$options.selectedHourKey] === "2" ? {
        g: common_assets._imports_1$2,
        h: common_vendor.o(($event) => $options.navigateToResult(item), index)
      } : item[$options.selectedHourKey] === "3" ? {
        j: common_assets._imports_2$2,
        k: common_vendor.o(($event) => $options.navigateToResult(item), index)
      } : {}, {
        f: item[$options.selectedHourKey] === "2",
        i: item[$options.selectedHourKey] === "3",
        l: index
      });
    })
  } : {}, {
    d: $data.detailData && $data.detailData.dt.length > 0
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/detail/detail.js.map
