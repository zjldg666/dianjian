"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const Navbar = () => "../../components/Navbar2.js";
const _sfc_main = {
  components: {
    Navbar
  },
  setup() {
    const username = common_vendor.ref(common_vendor.index.getStorageSync("username") || "");
    const reportData = common_vendor.ref(null);
    const loading = common_vendor.ref(true);
    const selectedDate = common_vendor.ref((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    const currentDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const cachedMonthData = common_vendor.ref({});
    const getFirstDayOfMonth = (date) => {
      const [year, month] = date.split("-");
      return `${year}-${month}-01`;
    };
    const getMonthKey = (date) => {
      const [year, month] = date.split("-");
      return `${year}-${month}`;
    };
    const fetchReport = async (date) => {
      try {
        loading.value = true;
        const monthKey = getMonthKey(date);
        const monthRequestDate = getFirstDayOfMonth(date);
        if (cachedMonthData.value[monthKey]) {
          reportData.value = cachedMonthData.value[monthKey];
          common_vendor.index.__f__("log", "at pages/report/report.vue:115", `使用缓存的${monthKey}月份数据`);
          return;
        }
        const token = common_vendor.index.getStorageSync("token");
        if (!token) {
          common_vendor.index.showToast({
            title: "未登录，请先登录",
            icon: "none"
          });
          return;
        }
        const response = await common_vendor.index.request({
          url: "http://13.94.38.44:8080/CheckList/GetScanReport1New",
          method: "POST",
          data: {
            token,
            time: monthRequestDate
          }
        });
        const data = JSON.parse(response.data);
        if (!data.isError) {
          cachedMonthData.value[monthKey] = data;
          reportData.value = data;
          common_vendor.index.__f__("log", "at pages/report/report.vue:142", `报表数据加载成功并缓存: ${monthKey}`, reportData.value);
        } else {
          common_vendor.index.showToast({
            title: "获取报表失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/report/report.vue:150", "获取报表失败", error);
        common_vendor.index.showToast({
          title: "获取报表失败",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    const handleDateChange = (event) => {
      const newDate = event.detail.value;
      selectedDate.value = newDate;
      const monthKey = getMonthKey(newDate);
      const monthRequestDate = getFirstDayOfMonth(newDate);
      if (cachedMonthData.value[monthKey]) {
        reportData.value = cachedMonthData.value[monthKey];
      } else {
        fetchReport(monthRequestDate);
      }
    };
    const prevDay = () => {
      const prevDate = new Date(selectedDate.value);
      prevDate.setDate(prevDate.getDate() - 1);
      const formattedDate = prevDate.toISOString().split("T")[0];
      selectedDate.value = formattedDate;
      const monthKey = getMonthKey(formattedDate);
      const monthRequestDate = getFirstDayOfMonth(formattedDate);
      if (cachedMonthData.value[monthKey]) {
        reportData.value = cachedMonthData.value[monthKey];
      } else {
        fetchReport(monthRequestDate);
      }
    };
    const nextDay = () => {
      const nextDate = new Date(selectedDate.value);
      nextDate.setDate(nextDate.getDate() + 1);
      const formattedDate = nextDate.toISOString().split("T")[0];
      selectedDate.value = formattedDate;
      const monthKey = getMonthKey(formattedDate);
      const monthRequestDate = getFirstDayOfMonth(formattedDate);
      if (cachedMonthData.value[monthKey]) {
        reportData.value = cachedMonthData.value[monthKey];
      } else {
        fetchReport(monthRequestDate);
      }
    };
    const isPrevDisabled = common_vendor.ref(false);
    const isNextDisabled = common_vendor.ref(false);
    common_vendor.watch(selectedDate, (newDate) => {
      isPrevDisabled.value = newDate <= "2020-01-01";
      isNextDisabled.value = newDate >= currentDate;
    }, { immediate: true });
    common_vendor.onMounted(() => {
      getMonthKey(selectedDate.value);
      const monthRequestDate = getFirstDayOfMonth(selectedDate.value);
      fetchReport(monthRequestDate);
    });
    const logout = () => {
      common_vendor.index.removeStorageSync("username");
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    };
    return {
      username,
      reportData,
      loading,
      selectedDate,
      currentDate,
      handleDateChange,
      prevDay,
      nextDay,
      isPrevDisabled,
      isNextDisabled,
      logout
    };
  }
};
if (!Array) {
  const _component_navbar = common_vendor.resolveComponent("navbar");
  _component_navbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($setup.logout),
    b: common_vendor.p({
      username: $setup.username
    }),
    c: common_vendor.o((...args) => $setup.prevDay && $setup.prevDay(...args)),
    d: $setup.isPrevDisabled,
    e: common_vendor.t($setup.selectedDate),
    f: $setup.selectedDate,
    g: $setup.currentDate,
    h: common_vendor.o((...args) => $setup.handleDateChange && $setup.handleDateChange(...args)),
    i: common_vendor.o((...args) => $setup.nextDay && $setup.nextDay(...args)),
    j: $setup.isNextDisabled,
    k: $setup.loading
  }, $setup.loading ? {} : $setup.reportData && $setup.reportData.dt.length > 0 ? {
    m: common_vendor.t($setup.selectedDate),
    n: common_vendor.f($setup.reportData.dt, (item, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item["区域描述"]),
        b: common_vendor.t(item["点检位置"]),
        c: common_vendor.t(item["区域负责人"]),
        d: item[$setup.selectedDate] === "1"
      }, item[$setup.selectedDate] === "1" ? {
        e: common_assets._imports_0$2,
        f: `/pages/detail/detail?position=${encodeURIComponent(item["点检位置"])}&time=${$setup.selectedDate}`
      } : item[$setup.selectedDate] === "2" ? {
        h: common_assets._imports_2,
        i: `/pages/detail/detail?position=${encodeURIComponent(item["点检位置"])}&time=${$setup.selectedDate}`
      } : item[$setup.selectedDate] === "3" ? {
        k: common_assets._imports_2$1,
        l: `/pages/detail/detail?position=${encodeURIComponent(item["点检位置"])}&time=${$setup.selectedDate}`
      } : {
        m: common_vendor.t(item[$setup.selectedDate] || "-")
      }, {
        g: item[$setup.selectedDate] === "2",
        j: item[$setup.selectedDate] === "3",
        n: item.点检位置
      });
    })
  } : {}, {
    l: $setup.reportData && $setup.reportData.dt.length > 0
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/report/report.js.map
