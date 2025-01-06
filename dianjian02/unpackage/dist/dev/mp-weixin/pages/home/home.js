"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_remindUtils = require("../../utils/remindUtils.js");
const Navbar = () => "../../components/Navbar2.js";
const ButtonGroup = () => "../../components/ButtonGroup.js";
const _sfc_main = {
  components: {
    Navbar,
    ButtonGroup
  },
  setup() {
    const username = common_vendor.ref(common_vendor.index.getStorageSync("username") || "");
    const Menubuttons = common_vendor.ref([]);
    const positions = common_vendor.ref([]);
    const goToInspection = () => {
      common_vendor.index.navigateTo({
        url: "/pages/inspection/inspection"
      });
    };
    const goToForm = async (formName) => {
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
          const remindData = await utils_remindUtils.fetchRemindData();
          console.log("Remind Data:", remindData);
          if (remindData) {
            const exceptions = remindData.filter((item) => item.num > 0);
            console.log("Exceptions:", exceptions);
            if (exceptions.length > 0) {
              common_vendor.index.setStorageSync("exceptions", JSON.stringify(exceptions));
              common_vendor.index.navigateTo({
                url: "/pages/remind/remind"
              });
            } else {
              common_vendor.index.showToast({
                title: "暂无异常",
                icon: "none"
              });
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
        case "frmCheckConfig":
          common_vendor.index.navigateTo({
            url: "/pages/config/config"
          });
          break;
        default:
          console.warn(`未知的表单名称: ${formName}`);
          common_vendor.index.showToast({
            title: "无效的表单名称",
            icon: "none"
          });
      }
    };
    const fetchPositions = async () => {
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
          url: "http://13.94.38.44:8080/CheckList/GetPositionByPerson",
          method: "POST",
          data: { token }
        });
        console.log("API Response:", response.data);
        const data = JSON.parse(response.data);
        if (!data.isError) {
          positions.value = data.list;
          console.log("点检位置加载成功:", positions.value);
        } else {
          common_vendor.index.showToast({
            title: "加载点检位置失败",
            icon: "none"
          });
        }
      } catch (error) {
        console.error("加载点检位置失败", error);
        common_vendor.index.showToast({
          title: "加载点检位置失败",
          icon: "none"
        });
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
          data: { token }
        });
        console.log("API Response:", response.data);
        console.log("token", token);
        const data = JSON.parse(response.data);
        if (!data.isError) {
          const fixedButtons = [
            { label: "所有点检", action: goToInspection, disable: false }
          ];
          Menubuttons.value = [
            ...fixedButtons,
            ...data.list.map((item) => ({
              label: item.menu_text,
              form_name: item.form_name,
              // 添加 form_name 属性以便后续使用
              action: () => goToForm(item.form_name),
              disable: false
            }))
          ];
        } else {
          common_vendor.index.showToast({
            title: "获取菜单失败",
            icon: "none"
          });
        }
      } catch (error) {
        console.error("获取菜单失败", error);
        common_vendor.index.showToast({
          title: "获取菜单失败",
          icon: "none"
        });
      }
    };
    const loadRemindCount = async () => {
      const remindData = await utils_remindUtils.fetchRemindData();
      if (remindData) {
        const remindButton = Menubuttons.value.find((button) => button.form_name === "frmRemind");
        if (remindButton) {
          const count = remindData.filter((item) => item.num > 0).length;
          remindButton.badge = count > 0 ? count.toString() : "";
        }
      }
    };
    const handleHomeAscan = () => {
      common_vendor.index.scanCode({
        success: (res) => {
          console.log("扫描成功", res);
          loadHomeInspectionDetails(res.result.substring(0, 3));
        },
        fail: (err) => {
          console.error("扫描失败", err);
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
          console.log(data);
          if (!data.isError) {
            const inspectionDetailsArray = data.dt;
            console.log("点检详情加载成功:", inspectionDetailsArray);
            if (inspectionDetailsArray.length > 0) {
              const inspectionDetails = inspectionDetailsArray[0];
              const position = positions.value.find((pos) => pos.SEL_TXT === inspectionDetails.Position);
              console.log(position);
              if (position) {
                const shuoMing = position.SEL_ShuoMing;
                common_vendor.index.navigateTo({
                  url: `/pages/project/project?id=${encodeURIComponent(code)}&name=${shuoMing}`
                });
              } else {
                console.error("未找到对应的点检位置");
                common_vendor.index.showToast({
                  title: "未找到对应的点检位置",
                  icon: "none"
                });
              }
            } else {
              console.error("点检详情为空");
              common_vendor.index.showToast({
                title: "点检详情为空",
                icon: "none"
              });
            }
          } else {
            console.error("加载点检详情失败:", data.msg);
            common_vendor.index.showToast({
              title: data.msg,
              icon: "none"
            });
          }
        },
        fail: (err) => {
          console.error("加载点检详情失败", err);
        }
      });
    };
    const logout = () => {
      common_vendor.index.removeStorageSync("username");
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    };
    common_vendor.onMounted(() => {
      loadMenu();
      fetchPositions();
      loadRemindCount();
    });
    return {
      username,
      Menubuttons,
      logout,
      positions
      // 将 positions 暴露出去
    };
  }
};
if (!Array) {
  const _component_navbar = common_vendor.resolveComponent("navbar");
  const _component_button_group = common_vendor.resolveComponent("button-group");
  (_component_navbar + _component_button_group)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.logout),
    b: common_vendor.p({
      username: $setup.username
    }),
    c: common_vendor.p({
      buttons: $setup.Menubuttons
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
