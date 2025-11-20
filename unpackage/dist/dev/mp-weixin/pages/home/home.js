"use strict";
const common_vendor = require("../../common/vendor.js");
const Navbar = () => "../../components/Navbar2.js";
const ButtonGroup = () => "../../components/ButtonGroup.js";
const LoadingSpinner = () => "../../components/LoadingSpinner.js";
const _sfc_main = {
  components: {
    Navbar,
    ButtonGroup,
    LoadingSpinner
  },
  setup() {
    const username = common_vendor.ref(common_vendor.index.getStorageSync("username") || "");
    const Menubuttons = common_vendor.ref([]);
    const positions = common_vendor.ref([]);
    const isLoading = common_vendor.ref(true);
    const isRemindLoading = common_vendor.ref(false);
    let cachedRemindDetails = null;
    const goToInspection = () => {
      common_vendor.index.navigateTo({
        url: "/pages/inspection/inspection"
      });
    };
    const goToForm = async (formName) => {
      try {
        switch (formName) {
          case "frmMyChcek":
            common_vendor.index.navigateTo({
              url: "/pages/Mydianjian/Mydianjian"
            });
            break;
          case "frmScanCode":
            handleHomeAscan();
            break;
          case "frmRemind":
            common_vendor.index.__f__("log", "at pages/home/home.vue:55", "开始处理缺失提醒跳转");
            if (isRemindLoading.value) {
              common_vendor.index.showToast({
                title: "数据加载中...",
                icon: "none"
              });
              return;
            }
            if (cachedRemindDetails) {
              common_vendor.index.__f__("log", "at pages/home/home.vue:68", "使用缓存的提醒数据:", cachedRemindDetails);
              if (cachedRemindDetails.length > 0) {
                common_vendor.index.setStorageSync("exceptions", JSON.stringify(cachedRemindDetails));
                common_vendor.index.navigateTo({
                  url: "/pages/remind/remind"
                });
              } else {
                common_vendor.index.showToast({
                  title: "暂无异常",
                  icon: "none"
                });
              }
            } else {
              common_vendor.index.__f__("warn", "at pages/home/home.vue:84", "缓存的提醒数据为空，尝试重新加载...");
              isRemindLoading.value = true;
              try {
                await loadRemindCount();
                if (cachedRemindDetails && cachedRemindDetails.length > 0) {
                  common_vendor.index.setStorageSync("exceptions", JSON.stringify(cachedRemindDetails));
                  common_vendor.index.navigateTo({ url: "/pages/remind/remind" });
                } else {
                  common_vendor.index.showToast({
                    title: "暂无异常",
                    icon: "none"
                  });
                }
              } catch (error) {
                common_vendor.index.__f__("error", "at pages/home/home.vue:101", "加载提醒数据失败", error);
                common_vendor.index.showToast({
                  title: "加载失败",
                  icon: "none"
                });
              } finally {
                isRemindLoading.value = false;
              }
            }
            break;
          case "frmCheckListReport":
            common_vendor.index.navigateTo({
              url: "/pages/report/report"
            });
            break;
          case "frmCheckPlan":
            common_vendor.index.navigateTo({
              url: "/pages/plan/plan"
            });
            break;
          case "frmScanConfig":
            common_vendor.index.navigateTo({
              url: "/pages/config/config"
            });
            break;
          default:
            common_vendor.index.__f__("warn", "at pages/home/home.vue:128", `未知的表单名称: ${formName}`);
            common_vendor.index.showToast({
              title: "无效的表单名称",
              icon: "none"
            });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/home/home.vue:135", "跳转页面失败", error);
      }
    };
    const fetchPositions = async () => {
      try {
        const token = common_vendor.index.getStorageSync("token");
        if (!token) {
          return;
        }
        const response = await common_vendor.index.request({
          url: "http://13.94.38.44:8080/CheckList/GetPositionByPerson",
          method: "POST",
          data: { token },
          timeout: 1e4
        });
        common_vendor.index.__f__("log", "at pages/home/home.vue:154", "API Response:", response.data);
        const data = JSON.parse(response.data);
        if (!data.isError) {
          positions.value = data.list;
          common_vendor.index.__f__("log", "at pages/home/home.vue:158", "点检位置加载成功:", positions.value);
        } else {
          common_vendor.index.showToast({
            title: "加载点检位置失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/home/home.vue:166", "加载点检位置失败", error);
      }
    };
    const internalFetchRemindData = async () => {
      try {
        const token = common_vendor.index.getStorageSync("token");
        if (!token) {
          common_vendor.index.showToast({
            title: "未登录，请先登录",
            icon: "none"
          });
          return null;
        }
        const response = await common_vendor.index.request({
          url: "http://13.94.38.44:8080/CheckList/GetRemind",
          method: "POST",
          data: { token }
        });
        const data = JSON.parse(response.data);
        common_vendor.index.__f__("log", "at pages/home/home.vue:189", "API Response (GetRemind):", data);
        if (!data.isError) {
          const remindData = data.list.filter((item) => item.num > 0);
          common_vendor.index.__f__("log", "at pages/home/home.vue:192", "Filtered Remind Data:", remindData);
          return remindData;
        } else {
          common_vendor.index.showToast({
            title: "获取提醒信息失败",
            icon: "none"
          });
          return null;
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/home/home.vue:202", "获取提醒信息失败或代码有误", error);
        common_vendor.index.showToast({
          title: "获取提醒信息失败或代码有误",
          icon: "none"
        });
        return null;
      }
    };
    const loadMenu = async () => {
      try {
        const token = common_vendor.index.getStorageSync("token");
        if (!token) {
          common_vendor.index.showToast({
            title: "未登录，请先登录",
            icon: "none"
          });
          return;
        }
        const response = await common_vendor.index.request({
          url: "http://13.94.38.44:8080/CheckList/GetMenuList",
          method: "POST",
          data: { token },
          timeout: 1e4
        });
        common_vendor.index.__f__("log", "at pages/home/home.vue:229", "API Response (GetMenuList):", response.data);
        const data = JSON.parse(response.data);
        if (!data.isError) {
          const fixedButtons = [
            {
              label: "所有点检",
              action: goToInspection,
              disable: false,
              image: "../../static/icon/SuoYouDianjian.png"
            }
          ];
          Menubuttons.value = [
            ...fixedButtons,
            ...data.list.map((item) => ({
              label: item.menu_text,
              form_name: item.form_name,
              action: () => goToForm(item.form_name),
              disable: false,
              image: getImagePath(item.form_name),
              badge: ""
            }))
          ];
          common_vendor.nextTick$1(() => {
            loadRemindCount();
          });
        } else {
          common_vendor.index.showToast({
            title: "获取菜单失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/home/home.vue:263", "获取菜单失败", error);
        common_vendor.index.showToast({
          title: "获取菜单失败",
          icon: "none"
        });
      } finally {
        isLoading.value = false;
      }
    };
    const loadRemindCount = async () => {
      const remindButton = Menubuttons.value.find((button) => button.form_name === "frmRemind");
      if (remindButton) {
        remindButton.badge = "...";
      } else {
        common_vendor.index.__f__("warn", "at pages/home/home.vue:279", "未找到缺失提醒按钮，无法设置加载状态");
        return;
      }
      try {
        const remindData = await internalFetchRemindData();
        cachedRemindDetails = remindData;
        if (remindData) {
          const count = remindData.length;
          common_vendor.index.__f__("log", "at pages/home/home.vue:288", "缺失提醒数据长度:", count);
          common_vendor.nextTick$1(() => {
            remindButton.badge = count > 0 ? count.toString() : "";
          });
        } else {
          common_vendor.nextTick$1(() => {
            remindButton.badge = "";
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/home/home.vue:298", "获取提醒数量失败", error);
        common_vendor.nextTick$1(() => {
          remindButton.badge = "";
        });
      }
    };
    const handleHomeAscan = () => {
      common_vendor.index.scanCode({
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/home/home.vue:308", "扫描成功", res);
          loadHomeInspectionDetails(res.result.substring(0, 3));
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/home/home.vue:312", "扫描失败", err);
        }
      });
    };
    const loadHomeInspectionDetails = (code) => {
      const token = common_vendor.index.getStorageSync("token");
      common_vendor.index.request({
        url: "http://13.94.38.44:8080/CheckList/GetCheckListDetailNew",
        method: "POST",
        data: {
          code,
          token
        },
        success: (res) => {
          const data = JSON.parse(res.data);
          common_vendor.index.__f__("log", "at pages/home/home.vue:328", data);
          if (!data.isError) {
            const inspectionDetailsArray = data.dt;
            common_vendor.index.__f__("log", "at pages/home/home.vue:331", "点检详情加载成功:", inspectionDetailsArray);
            if (inspectionDetailsArray.length > 0) {
              const inspectionDetails = inspectionDetailsArray[0];
              const position = positions.value.find((pos) => pos.SEL_TXT === inspectionDetails.Position);
              if (position) {
                const shuoMing = position.SEL_ShuoMing;
                common_vendor.index.navigateTo({
                  url: `/pages/project/project?id=${encodeURIComponent(code)}&name=${shuoMing}`
                });
              } else {
                common_vendor.index.__f__("error", "at pages/home/home.vue:342", "未找到对应的点检位置");
                common_vendor.index.showToast({
                  title: "未找到对应的点检位置",
                  icon: "none"
                });
              }
            } else {
              common_vendor.index.__f__("error", "at pages/home/home.vue:349", "点检详情为空");
              common_vendor.index.showToast({
                title: "点检详情为空",
                icon: "none"
              });
            }
          } else {
            common_vendor.index.__f__("error", "at pages/home/home.vue:356", "加载点检详情失败:", data.msg);
            common_vendor.index.showToast({
              title: data.msg,
              icon: "none"
            });
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/home/home.vue:364", "加载点检详情失败", err);
        }
      });
    };
    const logout = () => {
      common_vendor.index.removeStorageSync("cachedRemindData");
      common_vendor.index.removeStorageSync("remindDataCacheTime");
      common_vendor.index.removeStorageSync("username");
      cachedRemindDetails = null;
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    };
    const getImagePath = (formName) => {
      switch (formName) {
        case "frmMyChcek":
          return "../../static/icon/MyDianjian.png";
        case "frmScanCode":
          return "../../static/icon/LiJiSaoma.png";
        case "frmRemind":
          return "../../static/icon/QueShiTixing.png";
        case "frmCheckListReport":
          return "../../static/icon/JianDanBaobiao.png";
        case "frmCheckPlan":
          return "../../static/icon/DJjihua.png";
        case "frmScanConfig":
          return "../../static/icon/DJweihu.png";
        default:
          return "";
      }
    };
    common_vendor.onMounted(() => {
      loadMenu();
      fetchPositions();
    });
    return {
      username,
      Menubuttons,
      logout,
      positions,
      isLoading,
      isRemindLoading
    };
  }
};
if (!Array) {
  const _component_navbar = common_vendor.resolveComponent("navbar");
  const _component_loading_spinner = common_vendor.resolveComponent("loading-spinner");
  const _component_button_group = common_vendor.resolveComponent("button-group");
  (_component_navbar + _component_loading_spinner + _component_button_group)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($setup.logout),
    b: common_vendor.p({
      username: $setup.username
    }),
    c: common_vendor.p({
      show: $setup.isLoading
    }),
    d: !$setup.isLoading
  }, !$setup.isLoading ? {
    e: common_vendor.p({
      buttons: $setup.Menubuttons
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
