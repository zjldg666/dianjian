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
    const fetchReport = async (date) => {
      try {
        loading.value = true;
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
            time: date
          }
        });
        const data = JSON.parse(response.data);
        if (!data.isError) {
          reportData.value = data;
          console.log("报表数据加载成功:", reportData.value);
        } else {
          common_vendor.index.showToast({
            title: "获取报表失败",
            icon: "none"
          });
        }
      } catch (error) {
        console.error("获取报表失败", error);
        common_vendor.index.showToast({
          title: "获取报表失败",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    const handleDateChange = (event) => {
      selectedDate.value = event.detail.value;
      fetchReport(selectedDate.value);
    };
    const prevDay = () => {
      const prevDate = new Date(selectedDate.value);
      prevDate.setDate(prevDate.getDate() - 1);
      selectedDate.value = prevDate.toISOString().split("T")[0];
      fetchReport(selectedDate.value);
    };
    const nextDay = () => {
      const nextDate = new Date(selectedDate.value);
      nextDate.setDate(nextDate.getDate() + 1);
      selectedDate.value = nextDate.toISOString().split("T")[0];
      fetchReport(selectedDate.value);
    };
    const isPrevDisabled = common_vendor.ref(false);
    const isNextDisabled = common_vendor.ref(false);
    common_vendor.watch(selectedDate, (newDate) => {
      isPrevDisabled.value = newDate <= "2000-01-01";
      isNextDisabled.value = newDate >= currentDate;
      displayedDates.value = getDisplayedDates(newDate);
    }, { immediate: true });
    common_vendor.onMounted(() => {
      fetchReport(selectedDate.value);
    });
    const logout = () => {
      common_vendor.index.removeStorageSync("username");
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    };
    const getDisplayedDates = (date) => {
      const currentDate2 = new Date(date);
      const dates = [];
      for (let i = 0; i <= 2; i++) {
        const newDate = new Date(currentDate2);
        newDate.setDate(currentDate2.getDate() - i);
        dates.push(newDate.toISOString().split("T")[0]);
      }
      return dates.sort((a, b) => new Date(b) - new Date(a));
    };
    const displayedDates = common_vendor.ref(getDisplayedDates(selectedDate.value));
    return {
      username,
      reportData,
      loading,
      selectedDate,
      currentDate,
      displayedDates,
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
    m: common_vendor.f($setup.displayedDates, (day, index, i0) => {
      return {
        a: common_vendor.t(day),
        b: index
      };
    }),
    n: common_vendor.f($setup.reportData.dt, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.点检位置),
        b: common_vendor.f($setup.displayedDates, (day, index, i1) => {
          return common_vendor.e({
            a: item[day] === "1"
          }, item[day] === "1" ? {
            b: common_assets._imports_0$1,
            c: `/pages/detail/detail?position=${item.点检位置}&time=${day}`
          } : item[day] === "2" ? {
            e: common_assets._imports_2,
            f: `/pages/detail/detail?position=${item.点检位置}&time=${day}`
          } : {
            g: common_vendor.t(item[day] || "-")
          }, {
            d: item[day] === "2",
            h: index
          });
        }),
        c: item.点检位置
      };
    })
  } : {}, {
    l: $setup.reportData && $setup.reportData.dt.length > 0
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
