if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$d = {
    data() {
      return {
        strAccount: "",
        // 用户输入的账号
        password: "",
        // 用户输入的密码
        clientCodes: [],
        // 客户编码列表
        selectedClientCode: ""
        // 选中的客户编码
      };
    },
    onLoad() {
      this.loadClientCodes();
    },
    methods: {
      loadClientCodes() {
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/GetClientCode",
          // 请求客户编码接口
          method: "GET",
          success: (res) => {
            const data = JSON.parse(res.data);
            if (data && data.list) {
              this.clientCodes = data.list.map((item) => item.ClientCode);
              formatAppLog("log", "at pages/login/login.vue:44", "加载成功:", this.clientCodes);
            } else {
              formatAppLog("error", "at pages/login/login.vue:46", "加载客户编码失败:", data ? data.message : "无效的返回数据");
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/login/login.vue:50", "加载客户编码失败", err);
          }
        });
      },
      handleClientCodeChange(event) {
        this.selectedClientCode = this.clientCodes[event.detail.value];
      },
      login() {
        if (this.strAccount && this.password && this.selectedClientCode) {
          uni.request({
            url: "http://13.94.38.44:8080/CheckList/SignIn",
            // 登录验证接口
            method: "POST",
            data: {
              strAccount: this.strAccount,
              strPswd: this.password,
              clientcode: this.selectedClientCode
            },
            success: (res) => {
              const data = JSON.parse(res.data);
              formatAppLog("log", "at pages/login/login.vue:71", "数据为:", data);
              if (data.IsError === false) {
                uni.setStorageSync("token", data.token);
                uni.setStorageSync("username", data.userName);
                uni.setStorageSync("clientcode", this.selectedClientCode);
                uni.showToast({
                  title: "登录成功",
                  icon: "success"
                });
                uni.redirectTo({
                  url: "/pages/home/home"
                  // 跳转到主页
                });
              } else {
                uni.showToast({
                  title: "用户名或密码错误",
                  icon: "none"
                });
              }
            },
            fail: (err) => {
              formatAppLog("error", "at pages/login/login.vue:93", "登录失败", err);
              uni.showToast({
                title: "登录失败，请稍后重试",
                icon: "none"
              });
            }
          });
        } else {
          uni.showToast({
            title: "请输入完整的登录信息",
            icon: "none",
            complete: () => {
              uni.reLaunch({
                url: "/pages/login/login"
              });
            }
          });
        }
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "login-box" }, [
        vue.createElementVNode("view", { class: "title" }, "登录"),
        vue.createCommentVNode(" 选择客户编码 "),
        vue.createElementVNode("picker", {
          mode: "selector",
          range: $data.clientCodes,
          onChange: _cache[0] || (_cache[0] = (...args) => $options.handleClientCodeChange && $options.handleClientCodeChange(...args))
        }, [
          vue.createElementVNode(
            "view",
            { class: "picker" },
            vue.toDisplayString($data.selectedClientCode || "选择客户编码"),
            1
            /* TEXT */
          )
        ], 40, ["range"]),
        vue.createCommentVNode(" 用户名输入框 "),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            type: "text",
            placeholder: " 账号",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.strAccount = $event),
            class: "input"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $data.strAccount]
        ]),
        vue.createCommentVNode(" 密码输入框 "),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            type: "password",
            placeholder: "密码",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.password = $event),
            class: "input"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $data.password]
        ]),
        vue.createCommentVNode(" 登录按钮 "),
        vue.createElementVNode("button", {
          onClick: _cache[3] || (_cache[3] = (...args) => $options.login && $options.login(...args)),
          class: "button"
        }, "登录")
      ])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__file", "D:/Uniapp/dianJianApp/dianjian02/pages/login/login.vue"]]);
  const _imports_0$1 = "/static/logo.png";
  const _sfc_main$c = {
    props: {
      username: String
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "navbar" }, [
      vue.createElementVNode("view", { class: "logoBox" }, [
        vue.createElementVNode("image", {
          class: "logo",
          src: _imports_0$1,
          mode: "heightFix"
        })
      ]),
      vue.createElementVNode(
        "view",
        { class: "username" },
        vue.toDisplayString($props.username),
        1
        /* TEXT */
      ),
      vue.createElementVNode("button", {
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("logout")),
        class: "nabutton"
      }, "退出")
    ]);
  }
  const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__scopeId", "data-v-35616072"], ["__file", "D:/Uniapp/dianJianApp/dianjian02/components/Navbar.vue"]]);
  const _sfc_main$b = {
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
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "button-group" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($props.buttons, (button, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            key: index,
            class: "ZujianButton-item"
          }, [
            vue.createElementVNode("button", {
              disabled: button.disabled,
              onClick: ($event) => $options.handleClick(button.action),
              class: "ZujianButton"
            }, [
              vue.createTextVNode(
                vue.toDisplayString(button.label) + " ",
                1
                /* TEXT */
              ),
              button.badge ? (vue.openBlock(), vue.createElementBlock(
                "span",
                {
                  key: 0,
                  class: "badge"
                },
                vue.toDisplayString(button.badge),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true)
            ], 8, ["disabled", "onClick"])
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const ButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__scopeId", "data-v-8e810d98"], ["__file", "D:/Uniapp/dianJianApp/dianjian02/components/ButtonGroup.vue"]]);
  function scanAndNavigate(position, loadInspectionDetails) {
    uni.scanCode({
      success: (res) => {
        formatAppLog("log", "at utils/scanAndNavigate.js:4", "扫描成功", res);
        verifyQRCode(res.result, position, loadInspectionDetails);
      },
      fail: (err) => {
        formatAppLog("error", "at utils/scanAndNavigate.js:8", "扫描失败", err);
      }
    });
  }
  function verifyQRCode(result, position, loadInspectionDetails) {
    const token = uni.getStorageSync("token");
    uni.request({
      url: "http://13.94.38.44:8080/CheckList/GetCheckListDetailNew",
      method: "POST",
      data: {
        code: result.substring(0, 3),
        // 使用二维码的前三个字符作为代码
        token
      },
      success: (res) => {
        const data = JSON.parse(res.data);
        if (!data.isError) {
          const qrCodePrefix = result.substring(0, 3).toLowerCase();
          const selTxtPrefix = position.SEL_TXT.toLowerCase();
          if (qrCodePrefix === selTxtPrefix) {
            uni.showToast({
              title: "巡查点正确",
              icon: "success"
            });
            loadInspectionDetails(qrCodePrefix, position);
          } else {
            uni.showToast({
              title: "位置不匹配",
              icon: "none"
            });
          }
        } else {
          formatAppLog("error", "at utils/scanAndNavigate.js:41", "加载点检详情失败:", data.msg);
          uni.showToast({
            title: data.msg,
            icon: "none"
          });
        }
      },
      fail: (err) => {
        formatAppLog("error", "at utils/scanAndNavigate.js:49", "加载点检详情失败", err);
        uni.showToast({
          title: "加载点检详情失败",
          icon: "none"
        });
      }
    });
  }
  const _sfc_main$a = {
    components: {
      Navbar,
      ButtonGroup
    },
    data() {
      return {
        username: uni.getStorageSync("username") || "",
        buttons: []
        // 用于存储点检项目的按钮数据
      };
    },
    onLoad() {
      this.getInspectionItems();
    },
    onPullDownRefresh() {
      this.getInspectionItems(() => {
        uni.stopPullDownRefresh();
      });
    },
    methods: {
      getInspectionItems(callback) {
        const token = uni.getStorageSync("token");
        const clientCode = uni.getStorageSync("clientcode");
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/GetAllCheckListByClientCode",
          method: "POST",
          data: {
            code: clientCode,
            // 使用存储的客户编码
            token
          },
          success: (res) => {
            const data = JSON.parse(res.data);
            formatAppLog("log", "at pages/inspection/inspection.vue:50", "token:", token);
            if (!data.isError) {
              this.buttons = data.list.map((item) => ({
                label: item.SEL_ShuoMing,
                action: () => scanAndNavigate(item, this.loadInspectionDetails)
              }));
              formatAppLog("log", "at pages/inspection/inspection.vue:57", "点检项目加载成功:", this.buttons);
            } else {
              formatAppLog("error", "at pages/inspection/inspection.vue:59", "加载点检项目失败:", data.message);
            }
            if (callback)
              callback();
          },
          fail: (err) => {
            formatAppLog("error", "at pages/inspection/inspection.vue:64", "加载点检项目失败", err);
            if (callback)
              callback();
          }
        });
      },
      loadInspectionDetails(code, position) {
        const token = uni.getStorageSync("token");
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/GetCheckListDetailNew",
          method: "POST",
          data: {
            code,
            token
          },
          success: (res) => {
            const data = JSON.parse(res.data);
            if (!data.isError) {
              const inspectionDetails = data.dt;
              formatAppLog("log", "at pages/inspection/inspection.vue:82", "点检详情加载成功:", inspectionDetails);
              uni.navigateTo({
                url: `/pages/project/project?id=${encodeURIComponent(code)}&name=${position.SEL_ShuoMing}`
              });
              formatAppLog("log", "at pages/inspection/inspection.vue:87", encodeURIComponent(code));
            } else {
              formatAppLog("error", "at pages/inspection/inspection.vue:89", "加载点检详情失败:", data.msg);
              uni.showToast({
                title: data.msg,
                icon: "none"
              });
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/inspection/inspection.vue:97", "加载点检详情失败", err);
          }
        });
      },
      logout() {
        uni.removeStorageSync("username");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    const _component_button_group = vue.resolveComponent("button-group");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createCommentVNode(" 使用 ButtonGroup 组件 "),
        vue.createVNode(_component_button_group, { buttons: $data.buttons }, null, 8, ["buttons"])
      ])
    ]);
  }
  const PagesInspectionInspection = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__file", "D:/Uniapp/dianJianApp/dianjian02/pages/inspection/inspection.vue"]]);
  async function fetchRemindData() {
    try {
      const token = uni.getStorageSync("token");
      if (!token) {
        uni.showToast({
          title: "未登录，请先登录",
          icon: "none"
        });
        return null;
      }
      const response = await uni.request({
        url: "http://13.94.38.44:8080/CheckList/GetRemind",
        method: "POST",
        data: { token }
      });
      formatAppLog("log", "at utils/remindUtils.js:18", "API Response:", response.data);
      const data = JSON.parse(response.data);
      if (!data.isError) {
        return data.list;
      } else {
        uni.showToast({
          title: "获取提醒信息失败",
          icon: "none"
        });
        return null;
      }
    } catch (error) {
      formatAppLog("error", "at utils/remindUtils.js:30", "获取提醒信息失败", error);
      uni.showToast({
        title: "获取提醒信息失败",
        icon: "none"
      });
      return null;
    }
  }
  const _sfc_main$9 = {
    components: {
      Navbar,
      ButtonGroup
    },
    setup() {
      const username = vue.ref(uni.getStorageSync("username") || "");
      const Menubuttons = vue.ref([]);
      const positions = vue.ref([]);
      const goToInspection = () => {
        uni.navigateTo({
          url: "/pages/inspection/inspection"
        });
      };
      const goToForm = async (formName) => {
        switch (formName) {
          case "frmMyChcek":
            uni.navigateTo({
              url: "/pages/Mydianjian/Mydianjian"
            });
            break;
          case "frmScanCode":
            handleHomeAscan();
            break;
          case "frmRemind":
            const remindData = await fetchRemindData();
            formatAppLog("log", "at pages/home/home.vue:44", "Remind Data:", remindData);
            if (remindData) {
              const exceptions = remindData.filter((item) => item.num > 0);
              formatAppLog("log", "at pages/home/home.vue:47", "Exceptions:", exceptions);
              if (exceptions.length > 0) {
                uni.setStorageSync("exceptions", JSON.stringify(exceptions));
                uni.navigateTo({
                  url: "/pages/remind/remind"
                });
              } else {
                uni.showToast({
                  title: "暂无异常",
                  icon: "none"
                });
              }
            }
            break;
          case "frmCheckListReport":
            uni.navigateTo({
              url: "/pages/report/report"
            });
            break;
          case "frmCheckPlan":
            uni.navigateTo({
              url: "/pages/plan/plan"
            });
            break;
          case "frmCheckConfig":
            uni.navigateTo({
              url: "/pages/config/config"
            });
            break;
          default:
            formatAppLog("warn", "at pages/home/home.vue:77", `未知的表单名称: ${formName}`);
            uni.showToast({
              title: "无效的表单名称",
              icon: "none"
            });
        }
      };
      const fetchPositions = async () => {
        try {
          const token = uni.getStorageSync("token");
          if (!token) {
            uni.showToast({
              title: "未登录，请先登录",
              icon: "none"
            });
            return;
          }
          const response = await uni.request({
            url: "http://13.94.38.44:8080/CheckList/GetPositionByPerson",
            method: "POST",
            data: { token }
          });
          formatAppLog("log", "at pages/home/home.vue:102", "API Response:", response.data);
          const data = JSON.parse(response.data);
          if (!data.isError) {
            positions.value = data.list;
            formatAppLog("log", "at pages/home/home.vue:106", "点检位置加载成功:", positions.value);
          } else {
            uni.showToast({
              title: "加载点检位置失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/home/home.vue:114", "加载点检位置失败", error);
          uni.showToast({
            title: "加载点检位置失败",
            icon: "none"
          });
        }
      };
      const loadMenu = async () => {
        try {
          const token = uni.getStorageSync("token");
          if (!token) {
            uni.showToast({
              title: "未登录，请先登录",
              icon: "none"
            });
            return;
          }
          const response = await uni.request({
            url: "http://13.94.38.44:8080/CheckList/GetMenuList",
            method: "POST",
            data: { token }
          });
          formatAppLog("log", "at pages/home/home.vue:139", "API Response:", response.data);
          formatAppLog("log", "at pages/home/home.vue:140", "token", token);
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
            uni.showToast({
              title: "获取菜单失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/home/home.vue:164", "获取菜单失败", error);
          uni.showToast({
            title: "获取菜单失败",
            icon: "none"
          });
        }
      };
      const loadRemindCount = async () => {
        const remindData = await fetchRemindData();
        if (remindData) {
          const remindButton = Menubuttons.value.find((button) => button.form_name === "frmRemind");
          if (remindButton) {
            const count = remindData.filter((item) => item.num > 0).length;
            remindButton.badge = count > 0 ? count.toString() : "";
          }
        }
      };
      const handleHomeAscan = () => {
        uni.scanCode({
          success: (res) => {
            formatAppLog("log", "at pages/home/home.vue:186", "扫描成功", res);
            loadHomeInspectionDetails(res.result.substring(0, 3));
          },
          fail: (err) => {
            formatAppLog("error", "at pages/home/home.vue:190", "扫描失败", err);
          }
        });
      };
      const loadHomeInspectionDetails = (code) => {
        const token = uni.getStorageSync("token");
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/GetCheckListDetailNew",
          method: "POST",
          data: {
            code,
            token
          },
          success: (res) => {
            const data = JSON.parse(res.data);
            formatAppLog("log", "at pages/home/home.vue:206", data);
            if (!data.isError) {
              const inspectionDetailsArray = data.dt;
              formatAppLog("log", "at pages/home/home.vue:209", "点检详情加载成功:", inspectionDetailsArray);
              if (inspectionDetailsArray.length > 0) {
                const inspectionDetails = inspectionDetailsArray[0];
                const position = positions.value.find((pos) => pos.SEL_TXT === inspectionDetails.Position);
                formatAppLog("log", "at pages/home/home.vue:215", position);
                if (position) {
                  const shuoMing = position.SEL_ShuoMing;
                  uni.navigateTo({
                    url: `/pages/project/project?id=${encodeURIComponent(code)}&name=${shuoMing}`
                  });
                } else {
                  formatAppLog("error", "at pages/home/home.vue:222", "未找到对应的点检位置");
                  uni.showToast({
                    title: "未找到对应的点检位置",
                    icon: "none"
                  });
                }
              } else {
                formatAppLog("error", "at pages/home/home.vue:229", "点检详情为空");
                uni.showToast({
                  title: "点检详情为空",
                  icon: "none"
                });
              }
            } else {
              formatAppLog("error", "at pages/home/home.vue:236", "加载点检详情失败:", data.msg);
              uni.showToast({
                title: data.msg,
                icon: "none"
              });
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/home/home.vue:244", "加载点检详情失败", err);
          }
        });
      };
      const logout = () => {
        uni.removeStorageSync("username");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      };
      vue.onMounted(() => {
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
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    const _component_button_group = vue.resolveComponent("button-group");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $setup.username,
        onLogout: $setup.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createVNode(_component_button_group, { buttons: $setup.Menubuttons }, null, 8, ["buttons"])
      ])
    ]);
  }
  const PagesHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__file", "D:/Uniapp/dianJianApp/dianjian02/pages/home/home.vue"]]);
  const _imports_0 = "/static/dui.png";
  const _imports_1 = "/static/NT.png";
  const _imports_2 = "/static/cuo.png";
  function urlToBase64(url, type = "png") {
    if (typeof url !== "string" || url.trim() === "") {
      return Promise.reject(new Error("Invalid URL"));
    }
    return new Promise((resolve, reject) => {
      if (url.startsWith("http")) {
        uni.request({
          url,
          method: "GET",
          responseType: "arraybuffer",
          success: (res) => {
            const base64 = `data:image/${type};base64,${uni.arrayBufferToBase64(res.data)}`;
            resolve(base64);
          },
          fail: (err) => {
            reject(new Error(`Request failed: ${err}`));
          }
        });
      } else {
        uni.compressImage({
          src: url,
          quality: 100,
          // 图片质量压缩0~100，100表示图片质量保持原样
          success: (res) => {
            const tempUrl = res.tempFilePath;
            plus.io.resolveLocalFileSystemURL(tempUrl, (entry) => {
              entry.file((e) => {
                let fileReader = new plus.io.FileReader();
                fileReader.onload = (r) => {
                  resolve(r.target.result);
                };
                fileReader.readAsDataURL(e);
              }, (error) => {
                reject(new Error(`File resolution failed: ${error}`));
              });
            }, (error) => {
              reject(new Error(`File resolution failed: ${error}`));
            });
          },
          fail: (err) => {
            reject(new Error(`Compress image failed: ${err}`));
          }
        });
      }
    });
  }
  const _sfc_main$8 = {
    components: {
      Navbar
    },
    data() {
      return {
        username: uni.getStorageSync("username") || "",
        inspectionPoint: { id: "", name: "" },
        inspectionItems: [],
        // 初始化为空数组
        currentItemIndex: 0,
        currentProject: ""
      };
    },
    onLoad(options) {
      this.inspectionPoint.id = options.id;
      this.inspectionPoint.name = options.name;
      const token = uni.getStorageSync("token");
      this.loadInspectionDetails(this.inspectionPoint.id, token);
    },
    onPullDownRefresh() {
      const id = this.inspectionPoint.id;
      const token = uni.getStorageSync("token");
      if (!id) {
        formatAppLog("error", "at pages/project/project.vue:150", "id 参数为空");
        uni.stopPullDownRefresh();
        return;
      }
      this.loadInspectionDetails(id, token, () => {
        uni.stopPullDownRefresh();
      });
    },
    computed: {
      // 计算当前项
      currentItem() {
        return this.inspectionItems[this.currentItemIndex] || null;
      }
    },
    methods: {
      // 加载点检详情
      loadInspectionDetails(id, token, callback) {
        if (!id) {
          formatAppLog("error", "at pages/project/project.vue:168", "id 参数为空");
          return;
        }
        formatAppLog("log", "at pages/project/project.vue:171", "请求参数:", { code: id, token });
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/GetCheckListDetailNew",
          method: "POST",
          data: {
            code: id,
            token
          },
          success: (res) => {
            var _a;
            const data = JSON.parse(res.data);
            if (!data.isError) {
              this.inspectionItems = data.dt.map((item) => ({
                ...item,
                remarks: "",
                images: [],
                // 初始化 images 数组
                flag: ""
                // 初始值为空
              }));
              this.currentProject = ((_a = this.inspectionItems[0]) == null ? void 0 : _a.Project) || "";
              formatAppLog("log", "at pages/project/project.vue:189", "点检详情加载成功:", this.inspectionItems);
            } else {
              formatAppLog("error", "at pages/project/project.vue:191", "加载点检详情失败:", data.message);
            }
            if (callback)
              callback();
          },
          fail: (err) => {
            formatAppLog("error", "at pages/project/project.vue:196", "加载点检详情失败:", err);
            if (callback)
              callback();
          }
        });
      },
      // OK, NT, NG 选择结果
      handleFlagChange(flag) {
        this.currentItem.flag = flag;
      },
      // 上一项
      prevItem() {
        if (this.currentItemIndex > 0) {
          this.currentItemIndex--;
          this.currentProject = this.inspectionItems[this.currentItemIndex].Project;
        }
      },
      // 下一项或完成检查
      nextOrFinishItem() {
        if (this.currentItem.flag) {
          if (this.currentItem.flag === "NG") {
            if (!this.currentItem.remarks.trim()) {
              uni.showToast({
                title: "请填写点检说明",
                icon: "none"
              });
              return;
            }
            if (!this.currentItem.images || this.currentItem.images.length === 0) {
              uni.showToast({
                title: "请上传至少一张图片",
                icon: "none"
              });
              return;
            }
          } else if (this.currentItem.flag === "有问题，但已经解决") {
            if (!this.currentItem.remarks.trim()) {
              uni.showToast({
                title: "请填写点检说明",
                icon: "none"
              });
              return;
            }
          }
          if (this.currentItemIndex < this.inspectionItems.length - 1) {
            this.nextItem();
          } else {
            formatAppLog("log", "at pages/project/project.vue:243", "当前 inspectionItems:", this.inspectionItems);
            this.saveInspection();
          }
        } else {
          uni.showToast({
            title: "请先选择结果",
            icon: "none"
          });
        }
      },
      // 下一项
      nextItem() {
        if (this.currentItemIndex < this.inspectionItems.length - 1) {
          this.currentItemIndex++;
          this.currentProject = this.inspectionItems[this.currentItemIndex].Project;
        }
      },
      // 选择图片
      uploadImage() {
        uni.chooseImage({
          count: 9,
          // 支持最多选择9张图片
          success: (res) => {
            if (res.tempFilePaths.length > 0) {
              if (!this.currentItem.images) {
                this.$set(this.currentItem, "images", []);
              }
              this.convertImagesToBase64(res.tempFilePaths);
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/project/project.vue:273", "选择图片失败:", err);
          }
        });
      },
      // 将图片路径转换为 Base64 编码
      convertImagesToBase64(imagePaths) {
        Promise.all(imagePaths.map((imagePath) => urlToBase64(imagePath))).then((base64Images) => {
          this.currentItem.images.push(...base64Images);
          formatAppLog("log", "at pages/project/project.vue:282", "Base64 图片路径:", this.currentItem.images);
        }).catch((err) => {
          formatAppLog("error", "at pages/project/project.vue:284", "转换图片为 Base64 编码失败:", err);
        });
      },
      // 删除图片
      deleteImage(index) {
        this.currentItem.images.splice(index, 1);
      },
      // 保存点检详情
      saveInspection() {
        if (!this.inspectionItems || !this.inspectionItems.length) {
          formatAppLog("error", "at pages/project/project.vue:294", "inspectionItems 未定义或为空");
          return;
        }
        uni.showLoading({
          title: "正在上传数据..."
        });
        const token = uni.getStorageSync("token");
        const inspectionData = {
          token,
          list: this.inspectionItems.map((item) => {
            const now = /* @__PURE__ */ new Date();
            const formattedTime = `${now.getFullYear()}:${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}:${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
            return {
              ID: item.ID,
              Time: formattedTime,
              Flag: item.flag || "NG",
              FileList: (item.images || []).map((image) => image),
              // 确保 FileList 包含 Base64 编码
              Remark: item.remarks || ""
            };
          })
        };
        formatAppLog("log", "at pages/project/project.vue:318", "发送到 SaveDetail 接口的数据:", inspectionData);
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/SaveDetail",
          method: "POST",
          header: {
            "content-type": "application/json"
          },
          data: inspectionData,
          success: (res) => {
            formatAppLog("log", "at pages/project/project.vue:328", "第一次请求返回数据为:", res.data);
            if (typeof res.data === "string") {
              try {
                const data = JSON.parse(res.data);
                if (!data.isError) {
                  const docnum = data.docnum;
                  this.saveFinalResult(docnum, token);
                } else {
                  uni.showToast({
                    title: data.msg || "保存失败",
                    icon: "none"
                  });
                  formatAppLog("error", "at pages/project/project.vue:340", "保存点检详情失败:", data.msg);
                }
              } catch (parseError) {
                formatAppLog("error", "at pages/project/project.vue:343", "解析第一次请求返回数据时出错:", parseError);
              }
            } else {
              formatAppLog("error", "at pages/project/project.vue:346", "第一次请求响应数据不是字符串:", res.data);
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/project/project.vue:350", "保存点检详情失败:", err);
          }
        });
      },
      // 保存最终的检查结果
      saveFinalResult(docnum, token) {
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/SaveDetail2",
          method: "POST",
          data: {
            docnum,
            token
          },
          success: (res) => {
            formatAppLog("log", "at pages/project/project.vue:364", "第二次请求返回数据为:", res.data);
            if (typeof res.data === "string") {
              try {
                const result = JSON.parse(res.data);
                if (!result.IsError) {
                  uni.showToast({
                    title: "检查成功",
                    icon: "success"
                  });
                  uni.redirectTo({
                    url: "/pages/home/home"
                  });
                } else {
                  uni.showToast({
                    title: result.msg,
                    icon: "none"
                  });
                  formatAppLog("error", "at pages/project/project.vue:381", "保存检查结果失败:", result.msg);
                }
              } catch (parseError) {
                formatAppLog("error", "at pages/project/project.vue:384", "解析第二次请求返回数据时出错:", parseError);
              }
            } else {
              formatAppLog("error", "at pages/project/project.vue:387", "第二次请求响应数据不是字符串:", res.data);
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/project/project.vue:391", "保存检查结果失败:", err);
          }
        });
      },
      // 退出登录
      logout() {
        uni.removeStorageSync("username");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode(
        "view",
        { class: "title" },
        vue.toDisplayString($data.inspectionPoint.name) + " > " + vue.toDisplayString($data.currentProject),
        1
        /* TEXT */
      ),
      vue.createElementVNode("view", { class: "content" }, [
        $options.currentItem ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.createElementVNode("view", { class: "item" }, [
            vue.createCommentVNode(" 点检内容描述 "),
            vue.createElementVNode(
              "view",
              { class: "item-title" },
              vue.toDisplayString($options.currentItem.Description),
              1
              /* TEXT */
            ),
            vue.createCommentVNode(" 选择结果 "),
            vue.createElementVNode("view", { class: "form-group" }, [
              vue.createElementVNode("label", null, "选择结果："),
              vue.createElementVNode("view", { class: "button-group" }, [
                vue.createElementVNode(
                  "button",
                  {
                    class: vue.normalizeClass({ "selButton": true, "selected": $options.currentItem.flag === "OK" }),
                    onClick: _cache[0] || (_cache[0] = ($event) => $options.handleFlagChange("OK"))
                  },
                  [
                    vue.createElementVNode("image", {
                      src: _imports_0,
                      class: "icon-image"
                    })
                  ],
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "button",
                  {
                    class: vue.normalizeClass({ "selButton": true, "selected": $options.currentItem.flag === "有问题，但已经解决" }),
                    onClick: _cache[1] || (_cache[1] = ($event) => $options.handleFlagChange("有问题，但已经解决"))
                  },
                  [
                    vue.createElementVNode("image", {
                      src: _imports_1,
                      class: "icon-image"
                    })
                  ],
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "button",
                  {
                    class: vue.normalizeClass({ "selButton": true, "selected": $options.currentItem.flag === "NG" }),
                    onClick: _cache[2] || (_cache[2] = ($event) => $options.handleFlagChange("NG"))
                  },
                  [
                    vue.createElementVNode("image", {
                      src: _imports_2,
                      class: "icon-image"
                    })
                  ],
                  2
                  /* CLASS */
                )
              ])
            ]),
            vue.createCommentVNode(" 点检说明 "),
            vue.createElementVNode("view", { class: "form-group" }, [
              vue.createElementVNode("label", null, "点检说明："),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "text",
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $options.currentItem.remarks = $event),
                  class: "input"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $options.currentItem.remarks]
              ])
            ]),
            vue.createCommentVNode(" 上传图片 "),
            vue.createElementVNode("view", { class: "form-group" }, [
              vue.createElementVNode("label", null, "上传图片："),
              vue.createElementVNode("button", {
                onClick: _cache[4] || (_cache[4] = (...args) => $options.uploadImage && $options.uploadImage(...args)),
                class: "button"
              }, "+"),
              $options.currentItem.images && $options.currentItem.images.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.currentItem.images, (image, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: index,
                      class: "image-preview"
                    }, [
                      vue.createElementVNode("image", {
                        src: image,
                        class: "preview-image"
                      }, null, 8, ["src"]),
                      vue.createElementVNode("button", {
                        onClick: ($event) => $options.deleteImage(index),
                        class: "delete-button"
                      }, "X", 8, ["onClick"])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createCommentVNode(" 上一项和下一项按钮 "),
            vue.createElementVNode("view", { class: "button-group" }, [
              vue.createElementVNode("button", {
                onClick: _cache[5] || (_cache[5] = (...args) => $options.prevItem && $options.prevItem(...args)),
                disabled: $data.currentItemIndex === 0,
                class: "button"
              }, "上一项", 8, ["disabled"]),
              vue.createElementVNode(
                "button",
                {
                  onClick: _cache[6] || (_cache[6] = (...args) => $options.nextOrFinishItem && $options.nextOrFinishItem(...args)),
                  class: "button"
                },
                vue.toDisplayString($data.currentItemIndex === $data.inspectionItems.length - 1 ? "点检成功" : "下一项"),
                1
                /* TEXT */
              )
            ])
          ])
        ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
          vue.createCommentVNode(" 完成信息显示 "),
          vue.createElementVNode("view", { class: "message" }, "所有点检项目完成")
        ]))
      ])
    ]);
  }
  const PagesProjectProject = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-e8179a1b"], ["__file", "D:/Uniapp/dianJianApp/dianjian02/pages/project/project.vue"]]);
  const _sfc_main$7 = {
    components: {
      Navbar,
      ButtonGroup
    },
    data() {
      return {
        username: uni.getStorageSync("username") || "",
        positions: [],
        // 存储点检位置数据
        inspectionButtons: []
        // 存储按钮组数据
      };
    },
    onLoad() {
      this.fetchPositions();
    },
    methods: {
      fetchPositions() {
        const token = uni.getStorageSync("token");
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/GetPositionByPerson",
          method: "POST",
          data: {
            token
          },
          success: (res) => {
            const data = JSON.parse(res.data);
            if (!data.isError) {
              this.positions = data.list;
              formatAppLog("log", "at pages/Mydianjian/Mydianjian.vue:45", "点检位置加载成功:", this.positions);
              this.createInspectionButtons();
            } else {
              formatAppLog("error", "at pages/Mydianjian/Mydianjian.vue:48", "加载点检位置失败:", data.message);
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/Mydianjian/Mydianjian.vue:52", "加载点检位置失败", err);
          }
        });
      },
      createInspectionButtons() {
        this.inspectionButtons = this.positions.map((position) => ({
          label: position.SEL_ShuoMing,
          action: () => scanAndNavigate(position, this.loadInspectionDetails),
          disabled: false
        }));
      },
      loadInspectionDetails(code, position) {
        const token = uni.getStorageSync("token");
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/GetCheckListDetailNew",
          method: "POST",
          data: {
            code,
            token
          },
          success: (res) => {
            const data = JSON.parse(res.data);
            if (!data.isError) {
              const inspectionDetails = data.dt;
              formatAppLog("log", "at pages/Mydianjian/Mydianjian.vue:76", "点检详情加载成功:", inspectionDetails);
              uni.navigateTo({
                url: `/pages/project/project?id=${encodeURIComponent(code)}&name=${position.SEL_ShuoMing}`
              });
              formatAppLog("log", "at pages/Mydianjian/Mydianjian.vue:81", encodeURIComponent(code));
            } else {
              formatAppLog("error", "at pages/Mydianjian/Mydianjian.vue:83", "加载点检详情失败:", data.msg);
              uni.showToast({
                title: data.msg,
                icon: "none"
              });
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/Mydianjian/Mydianjian.vue:91", "加载点检详情失败", err);
          }
        });
      },
      logout() {
        uni.removeStorageSync("username");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    const _component_button_group = vue.resolveComponent("button-group");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 导航栏组件 "),
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createCommentVNode(" 按钮组组件 "),
        vue.createVNode(_component_button_group, { buttons: $data.inspectionButtons }, null, 8, ["buttons"])
      ])
    ]);
  }
  const PagesMydianjianMydianjian = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__file", "D:/Uniapp/dianJianApp/dianjian02/pages/Mydianjian/Mydianjian.vue"]]);
  const _sfc_main$6 = {
    components: {
      Navbar,
      ButtonGroup
    },
    data() {
      return {
        username: uni.getStorageSync("username") || "",
        Menubuttons: []
      };
    },
    methods: {
      navigateToException(exception) {
        const token = uni.getStorageSync("token");
        formatAppLog("log", "at pages/remind/remind.vue:28", exception);
        formatAppLog("log", "at pages/remind/remind.vue:29", "Navigating to YIChang with ID:", exception.SEL_TXT, "and Token:", token);
        if (!token) {
          uni.showToast({
            title: "未登录，请先登录",
            icon: "none"
          });
          return;
        }
        const url = `/pages/YiChang/YiChang?id=${encodeURIComponent(exception.SEL_TXT)}&token=${encodeURIComponent(token)}&selShuoMing=${exception.SEL_ShuoMing}`;
        formatAppLog("log", "at pages/remind/remind.vue:38", "Navigating to:", url);
        uni.navigateTo({
          url
        });
      },
      logout() {
        uni.removeStorageSync("username");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      }
    },
    mounted() {
      const exceptionsStr = uni.getStorageSync("exceptions");
      if (exceptionsStr) {
        try {
          const exceptions = JSON.parse(exceptionsStr);
          formatAppLog("log", "at pages/remind/remind.vue:55", "Parsed Exceptions:", exceptions);
          this.Menubuttons = exceptions.map((exception) => ({
            label: exception.SEL_ShuoMing,
            action: () => this.navigateToException(exception),
            // 使用新的 navigateToException 方法
            disabled: false,
            badge: exception.num > 0 ? exception.num.toString() : ""
          }));
        } catch (error) {
          formatAppLog("error", "at pages/remind/remind.vue:63", "解析 exceptions 失败", error);
        }
        uni.removeStorageSync("exceptions");
      } else {
        formatAppLog("error", "at pages/remind/remind.vue:67", "未找到 exceptions 参数");
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    const _component_button_group = vue.resolveComponent("button-group");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createVNode(_component_button_group, { buttons: $data.Menubuttons }, null, 8, ["buttons"])
      ])
    ]);
  }
  const PagesRemindRemind = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__file", "D:/Uniapp/dianJianApp/dianjian02/pages/remind/remind.vue"]]);
  const _sfc_main$5 = {
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
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.isPreviewVisible ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "image-viewer-overlay",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.closePreview && $options.closePreview(...args))
    }, [
      vue.createElementVNode("image", {
        src: "data:image/png;base64," + $props.currentImage,
        class: "image-viewer-image",
        onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
        }, ["stop"]))
      }, null, 8, ["src"])
    ])) : vue.createCommentVNode("v-if", true);
  }
  const ImageViewer = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-a9a40036"], ["__file", "D:/Uniapp/dianJianApp/dianjian02/components/ImageViewer.vue"]]);
  const _sfc_main$4 = {
    components: {
      Navbar,
      ImageViewer
    },
    data() {
      return {
        username: uni.getStorageSync("username") || "",
        details: [],
        currentIndex: 0,
        selShuoMing: "",
        isPreviewVisible: false,
        currentPreviewIndex: 0
      };
    },
    computed: {
      currentDetail() {
        return this.details[this.currentIndex] || {};
      }
    },
    methods: {
      logout() {
        uni.removeStorageSync("username");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      },
      getRemindDetail(code, token) {
        uni.showLoading({
          title: "加载中..."
        });
        const requestData = { token, code };
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/GetRemindDetail",
          method: "POST",
          data: requestData,
          success: (response) => {
            const data = JSON.parse(response.data);
            formatAppLog("log", "at pages/YiChang/YiChang.vue:103", data);
            if (!data.isError) {
              this.details = data.list;
              this.currentIndex = 0;
            } else {
              uni.showToast({
                title: "加载提醒详情失败",
                icon: "none"
              });
            }
          },
          complete: () => {
            uni.hideLoading();
          },
          fail: (error) => {
            formatAppLog("error", "at pages/YiChang/YiChang.vue:118", "加载提醒详情失败", error);
            uni.showToast({
              title: "加载提醒详情失败",
              icon: "none"
            });
          }
        });
      },
      prevItem() {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        }
      },
      nextItem() {
        if (this.currentIndex < this.details.length - 1) {
          this.currentIndex++;
        }
      },
      previewImage(index) {
        formatAppLog("log", "at pages/YiChang/YiChang.vue:137", "Clicked image index:", index);
        formatAppLog("log", "at pages/YiChang/YiChang.vue:138", "Images array:", this.currentDetail.FileLists);
        this.currentPreviewIndex = index;
        this.isPreviewVisible = true;
      }
    },
    onLoad(options) {
      if (options && options.id && options.token && options.selShuoMing) {
        this.getRemindDetail(options.id, options.token);
        this.selShuoMing = decodeURIComponent(options.selShuoMing);
        formatAppLog("log", "at pages/YiChang/YiChang.vue:147", options);
      } else {
        formatAppLog("error", "at pages/YiChang/YiChang.vue:149", "未找到 id 或 token 参数");
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    const _component_navbar = vue.resolveComponent("navbar");
    const _component_image_viewer = vue.resolveComponent("image-viewer");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode(
          "view",
          { class: "header" },
          vue.toDisplayString($data.selShuoMing),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("text", { class: "label" }, "点检项目:"),
          vue.createElementVNode(
            "text",
            { class: "value" },
            vue.toDisplayString((_a = $options.currentDetail) == null ? void 0 : _a.Project),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("text", { class: "label" }, "点检内容:"),
          vue.createElementVNode(
            "text",
            { class: "value" },
            vue.toDisplayString((_b = $options.currentDetail) == null ? void 0 : _b.Description),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("text", { class: "label" }, "点检结果:"),
          vue.createElementVNode("text", { class: "value" }, [
            ((_c = $options.currentDetail) == null ? void 0 : _c.Result) === "1" ? (vue.openBlock(), vue.createElementBlock("span", { key: 0 }, [
              vue.createElementVNode("image", {
                src: _imports_0,
                class: "Fuhao"
              })
            ])) : ((_d = $options.currentDetail) == null ? void 0 : _d.Result) === "3" ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 1 },
              [
                vue.createCommentVNode(" √ "),
                vue.createElementVNode("span", null, [
                  vue.createElementVNode("image", {
                    src: _imports_1,
                    class: "Fuhao"
                  })
                ])
              ],
              2112
              /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
            )) : ((_e = $options.currentDetail) == null ? void 0 : _e.Result) === "2" ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 2 },
              [
                vue.createCommentVNode(" ⊗ "),
                vue.createElementVNode("span", null, [
                  vue.createElementVNode("image", {
                    src: _imports_2,
                    class: "Fuhao"
                  })
                ])
              ],
              2112
              /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" × ")
          ])
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("text", { class: "label" }, "点检说明:"),
          vue.createElementVNode(
            "text",
            { class: "value" },
            vue.toDisplayString((_f = $options.currentDetail) == null ? void 0 : _f.Remark),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("text", { class: "label" }, "点检人:"),
          vue.createElementVNode(
            "text",
            { class: "value" },
            vue.toDisplayString((_g = $options.currentDetail) == null ? void 0 : _g.Person),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("text", { class: "label" }, "点检时间:"),
          vue.createElementVNode(
            "text",
            { class: "value" },
            vue.toDisplayString((_h = $options.currentDetail) == null ? void 0 : _h.Time1),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("text", { class: "label" }, "设备时间:"),
          vue.createElementVNode(
            "text",
            { class: "value" },
            vue.toDisplayString((_i = $options.currentDetail) == null ? void 0 : _i.Time3),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "images-container" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(((_j = $options.currentDetail) == null ? void 0 : _j.FileLists) || [], (image, index) => {
              return vue.openBlock(), vue.createElementBlock("image", {
                key: index,
                src: "data:image/png;base64," + image,
                class: "image",
                onClick: ($event) => $options.previewImage(index)
              }, null, 8, ["src", "onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", { class: "navigation-buttons" }, [
          vue.createElementVNode("button", {
            disabled: $data.currentIndex === 0,
            onClick: _cache[0] || (_cache[0] = (...args) => $options.prevItem && $options.prevItem(...args))
          }, "上一个", 8, ["disabled"]),
          vue.createElementVNode("button", {
            disabled: $data.currentIndex === $data.details.length - 1,
            onClick: _cache[1] || (_cache[1] = (...args) => $options.nextItem && $options.nextItem(...args))
          }, "下一个", 8, ["disabled"])
        ])
      ]),
      vue.createVNode(_component_image_viewer, {
        "is-preview-visible": $data.isPreviewVisible,
        "current-image": ((_k = $options.currentDetail) == null ? void 0 : _k.FileLists[$data.currentPreviewIndex]) || "",
        "onUpdate:isPreviewVisible": _cache[2] || (_cache[2] = ($event) => $data.isPreviewVisible = $event)
      }, null, 8, ["is-preview-visible", "current-image"])
    ]);
  }
  const PagesYiChangYiChang = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__file", "D:/Uniapp/dianJianApp/dianjian02/pages/YiChang/YiChang.vue"]]);
  const _sfc_main$3 = {
    components: {
      Navbar
    },
    setup() {
      const username = vue.ref(uni.getStorageSync("username") || "");
      const reportData = vue.ref(null);
      const loading = vue.ref(true);
      const selectedDate = vue.ref((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
      const currentDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const fetchReport = async (date) => {
        try {
          loading.value = true;
          const token = uni.getStorageSync("token");
          if (!token) {
            uni.showToast({
              title: "未登录，请先登录",
              icon: "none"
            });
            return;
          }
          const response = await uni.request({
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
            formatAppLog("log", "at pages/report/report.vue:100", "报表数据加载成功:", reportData.value);
          } else {
            uni.showToast({
              title: "获取报表失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/report/report.vue:108", "获取报表失败", error);
          uni.showToast({
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
      const isPrevDisabled = vue.ref(false);
      const isNextDisabled = vue.ref(false);
      vue.watch(selectedDate, (newDate) => {
        isPrevDisabled.value = newDate <= "2000-01-01";
        isNextDisabled.value = newDate >= currentDate;
        displayedDates.value = getDisplayedDates(newDate);
      }, { immediate: true });
      vue.onMounted(() => {
        fetchReport(selectedDate.value);
      });
      const logout = () => {
        uni.removeStorageSync("username");
        uni.redirectTo({
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
      const displayedDates = vue.ref(getDisplayedDates(selectedDate.value));
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
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $setup.username,
        onLogout: $setup.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("view", { class: "date-picker-container" }, [
          vue.createElementVNode("button", {
            class: "arrow-button",
            onClick: _cache[0] || (_cache[0] = (...args) => $setup.prevDay && $setup.prevDay(...args)),
            disabled: $setup.isPrevDisabled
          }, "《", 8, ["disabled"]),
          vue.createElementVNode("picker", {
            mode: "date",
            value: $setup.selectedDate,
            end: $setup.currentDate,
            onChange: _cache[1] || (_cache[1] = (...args) => $setup.handleDateChange && $setup.handleDateChange(...args))
          }, [
            vue.createElementVNode(
              "view",
              { class: "picker" },
              " 当前选择: " + vue.toDisplayString($setup.selectedDate),
              1
              /* TEXT */
            )
          ], 40, ["value", "end"]),
          vue.createElementVNode("button", {
            class: "arrow-button",
            onClick: _cache[2] || (_cache[2] = (...args) => $setup.nextDay && $setup.nextDay(...args)),
            disabled: $setup.isNextDisabled
          }, "》", 8, ["disabled"])
        ]),
        $setup.loading ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "loading"
        }, " 正在加载报表数据... ")) : $setup.reportData && $setup.reportData.dt.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "report-data"
        }, [
          vue.createElementVNode("table", null, [
            vue.createElementVNode("thead", null, [
              vue.createElementVNode("tr", null, [
                vue.createElementVNode("th", null, "点检位置"),
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.displayedDates, (day, index) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "th",
                      { key: index },
                      vue.toDisplayString(day),
                      1
                      /* TEXT */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ]),
            vue.createElementVNode("tbody", null, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.reportData.dt, (item) => {
                  return vue.openBlock(), vue.createElementBlock("tr", {
                    key: item.点检位置
                  }, [
                    vue.createElementVNode(
                      "td",
                      null,
                      vue.toDisplayString(item.点检位置),
                      1
                      /* TEXT */
                    ),
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($setup.displayedDates, (day, index) => {
                        return vue.openBlock(), vue.createElementBlock("td", { key: index }, [
                          item[day] === "1" ? (vue.openBlock(), vue.createElementBlock("navigator", {
                            key: 0,
                            url: `/pages/detail/detail?position=${item.点检位置}&time=${day}`,
                            "hover-class": "navigator-hover"
                          }, [
                            vue.createElementVNode("button", { class: "check-button" }, [
                              vue.createElementVNode("image", {
                                src: _imports_0,
                                class: "DuiCuo"
                              })
                            ])
                          ], 8, ["url"])) : item[day] === "2" ? (vue.openBlock(), vue.createElementBlock("navigator", {
                            key: 1,
                            url: `/pages/detail/detail?position=${item.点检位置}&time=${day}`,
                            "hover-class": "navigator-hover"
                          }, [
                            vue.createElementVNode("button", { class: "check-button" }, [
                              vue.createElementVNode("image", {
                                src: _imports_2,
                                class: "DuiCuo"
                              })
                            ])
                          ], 8, ["url"])) : (vue.openBlock(), vue.createElementBlock(
                            "span",
                            {
                              key: 2,
                              class: "centered-span"
                            },
                            vue.toDisplayString(item[day] || "-"),
                            1
                            /* TEXT */
                          ))
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ])
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "no-data"
        }, " 没有找到相关数据。 "))
      ])
    ]);
  }
  const PagesReportReport = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "D:/Uniapp/dianJianApp/dianjian02/pages/report/report.vue"]]);
  const _sfc_main$2 = {
    components: {
      Navbar
    },
    data() {
      return {
        username: uni.getStorageSync("username") || "",
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
          const firstTimestamp = Object.keys(this.detailData.dt[0]).find((key) => key.startsWith("2024-"));
          if (firstTimestamp) {
            return firstTimestamp.split(" ")[0];
          }
        }
        return "";
      },
      selectedHourKey() {
        if (this.selectedDate) {
          const key = `${this.selectedDate} ${this.selectedHour.toString().padStart(2, "0")}`;
          formatAppLog("log", "at pages/detail/detail.vue:86", "selectedHourKey:", key);
          return key;
        }
        return "";
      },
      filteredDetailData() {
        if (!this.detailData || !this.detailData.dt)
          return [];
        formatAppLog("log", "at pages/detail/detail.vue:93", "selectedHourKey in filteredDetailData:", this.selectedHourKey);
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
          const token = uni.getStorageSync("token");
          if (!token) {
            uni.showToast({
              title: "未登录，请先登录",
              icon: "none"
            });
            return;
          }
          const response = await uni.request({
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
            formatAppLog("log", "at pages/detail/detail.vue:129", "详细数据加载成功:", this.detailData);
            this.setInitialSelectedHour();
          } else {
            uni.showToast({
              title: "获取详细数据失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/detail/detail.vue:138", "获取详细数据失败", error);
          uni.showToast({
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
          const timestamps = Object.keys(dataItem).filter((key) => key.startsWith("2024-")).sort();
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
        uni.removeStorageSync("username");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      },
      navigateToResult(item) {
        formatAppLog("log", "at pages/detail/detail.vue:178", "navigateToResult called with selectedHourKey:", this.selectedHourKey);
        uni.navigateTo({
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
        uni.showToast({
          title: "缺少参数",
          icon: "none"
        });
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        $data.loading ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "loading"
        }, " 正在加载数据... ")) : $data.detailData && $data.detailData.dt.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "detail-data"
        }, [
          vue.createElementVNode("p", null, [
            vue.createElementVNode("strong", null, "点检位置:"),
            vue.createTextVNode(
              " " + vue.toDisplayString($data.detailData.dt[0]["点检位置"]),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("table", null, [
            vue.createElementVNode("thead", null, [
              vue.createElementVNode("tr", null, [
                vue.createElementVNode("th", null, "点检项目"),
                vue.createElementVNode("th", null, "点检内容"),
                vue.createElementVNode("th", { colspan: "3" }, [
                  vue.createElementVNode("button", {
                    class: "arrow-button",
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.prevHour && $options.prevHour(...args)),
                    disabled: $options.isPrevDisabled
                  }, "《", 8, ["disabled"]),
                  vue.createTextVNode(
                    " " + vue.toDisplayString($data.selectedHour) + ":00 ",
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("button", {
                    class: "arrow-button",
                    onClick: _cache[1] || (_cache[1] = (...args) => $options.nextHour && $options.nextHour(...args)),
                    disabled: $options.isNextDisabled
                  }, "》", 8, ["disabled"])
                ])
              ])
            ]),
            vue.createElementVNode("tbody", null, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($options.filteredDetailData, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("tr", { key: index }, [
                    vue.createElementVNode(
                      "td",
                      null,
                      vue.toDisplayString(item.点检项目),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "td",
                      null,
                      vue.toDisplayString(item.点检内容),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("td", null, [
                      item[$options.selectedHourKey] === "1" ? (vue.openBlock(), vue.createElementBlock("navigator", {
                        key: 0,
                        url: `/pages/result/result?position=${$data.detailData.dt[0]["点检位置"]}&project=${item["点检项目"]}&description=${item["点检内容"]}&time=${$options.selectedHourKey}:00`,
                        "hover-class": "navigator-hover"
                      }, [
                        vue.createElementVNode("button", { class: "status-button check" }, " √ ")
                      ], 8, ["url"])) : item[$options.selectedHourKey] === "2" ? (vue.openBlock(), vue.createElementBlock("button", {
                        key: 1,
                        class: "status-button cross",
                        onClick: ($event) => $options.navigateToResult(item)
                      }, " × ", 8, ["onClick"])) : (vue.openBlock(), vue.createElementBlock("span", { key: 2 }, "-"))
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ])
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "no-data"
        }, " 没有找到相关数据。 "))
      ])
    ]);
  }
  const PagesDetailDetail = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "D:/Uniapp/dianJianApp/dianjian02/pages/detail/detail.vue"]]);
  const _sfc_main$1 = {
    components: {
      Navbar,
      ImageViewer
    },
    data() {
      return {
        username: uni.getStorageSync("username") || "",
        resultData: null,
        loading: true,
        isPreviewVisible: false,
        currentPreviewIndex: 0
      };
    },
    computed: {
      currentDetail() {
        return this.resultData ? this.resultData.list[0] : {};
      }
    },
    methods: {
      async fetchResult(position, project, description, time) {
        try {
          uni.showLoading({
            title: "加载中..."
          });
          const token = uni.getStorageSync("token");
          if (!token) {
            uni.showToast({
              title: "未登录，请先登录",
              icon: "none"
            });
            return;
          }
          const response = await uni.request({
            url: "http://13.94.38.44:8080/CheckList/GetScanReport3New",
            method: "POST",
            data: {
              token,
              time,
              Position: position,
              Project: project,
              Description: description
            }
          });
          formatAppLog("log", "at pages/result/result.vue:116", "Update Status API Response:", response.data);
          const data = JSON.parse(response.data);
          if (!data.isError) {
            this.resultData = data;
            formatAppLog("log", "at pages/result/result.vue:120", "更新状态成功:", this.resultData);
          } else {
            uni.showToast({
              title: "更新状态失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/result/result.vue:128", "更新状态失败", error);
          uni.showToast({
            title: "更新状态失败",
            icon: "none"
          });
        } finally {
          uni.hideLoading();
          this.loading = false;
        }
      },
      logout() {
        uni.removeStorageSync("username");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      },
      previewImage(index) {
        this.currentPreviewIndex = index;
        this.isPreviewVisible = true;
      }
    },
    onLoad(options) {
      const position = decodeURIComponent(options.position);
      const project = decodeURIComponent(options.project);
      const description = decodeURIComponent(options.description);
      const time = decodeURIComponent(options.time);
      if (position && project && description && time) {
        this.fetchResult(position, project, description, time);
      } else {
        uni.showToast({
          title: "缺少参数",
          icon: "none"
        });
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    var _a;
    const _component_navbar = vue.resolveComponent("navbar");
    const _component_image_viewer = vue.resolveComponent("image-viewer");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        $data.loading ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "loading"
        }, " 正在加载数据... ")) : $data.resultData && $data.resultData.list.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
          vue.createElementVNode(
            "view",
            { class: "header" },
            vue.toDisplayString($data.resultData.list[0].Position),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "点检项目:"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString($data.resultData.list[0].Project),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "点检内容:"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString($data.resultData.list[0].Description),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "点检结果:"),
            vue.createElementVNode("text", { class: "value" }, [
              $data.resultData.list[0].Result === "1" ? (vue.openBlock(), vue.createElementBlock("span", { key: 0 }, [
                vue.createElementVNode("image", {
                  src: _imports_0,
                  class: "Fuhao"
                })
              ])) : $data.resultData.list[0].Result === "3" ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 1 },
                [
                  vue.createCommentVNode(" √ "),
                  vue.createElementVNode("span", null, [
                    vue.createElementVNode("image", {
                      src: _imports_1,
                      class: "Fuhao"
                    })
                  ])
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              )) : $data.resultData.list[0].Result === "2" ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 2 },
                [
                  vue.createCommentVNode(" ⊗ "),
                  vue.createElementVNode("span", null, [
                    vue.createElementVNode("image", {
                      src: _imports_2,
                      class: "Fuhao"
                    })
                  ])
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              )) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" × ")
            ])
          ]),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "点检说明:"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString($data.resultData.list[0].Remark),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "点检人:"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString($data.resultData.list[0].Person),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "点检时间:"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString($data.resultData.list[0].Time1),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "detail-item" }, [
            vue.createElementVNode("text", { class: "label" }, "设备时间:"),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString($data.resultData.list[0].Time3),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "images-container" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.resultData.list[0].FileLists || [], (image, index) => {
                return vue.openBlock(), vue.createElementBlock("image", {
                  key: index,
                  src: "data:image/png;base64," + image,
                  class: "image",
                  onClick: ($event) => $options.previewImage(index)
                }, null, 8, ["src", "onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])) : !$data.loading ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "no-data"
        }, " 没有找到相关数据。 ")) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createVNode(_component_image_viewer, {
        "is-preview-visible": $data.isPreviewVisible,
        "current-image": ((_a = $options.currentDetail) == null ? void 0 : _a.FileLists[$data.currentPreviewIndex]) || "",
        "onUpdate:isPreviewVisible": _cache[0] || (_cache[0] = ($event) => $data.isPreviewVisible = $event)
      }, null, 8, ["is-preview-visible", "current-image"])
    ]);
  }
  const PagesResultResult = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "D:/Uniapp/dianJianApp/dianjian02/pages/result/result.vue"]]);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/inspection/inspection", PagesInspectionInspection);
  __definePage("pages/home/home", PagesHomeHome);
  __definePage("components/Navbar", Navbar);
  __definePage("pages/project/project", PagesProjectProject);
  __definePage("pages/Mydianjian/Mydianjian", PagesMydianjianMydianjian);
  __definePage("pages/remind/remind", PagesRemindRemind);
  __definePage("pages/YiChang/YiChang", PagesYiChangYiChang);
  __definePage("pages/report/report", PagesReportReport);
  __definePage("pages/detail/detail", PagesDetailDetail);
  __definePage("pages/result/result", PagesResultResult);
  const _sfc_main = {
    components: {
      Navbar
    },
    data() {
      return {
        username: uni.getStorageSync("username") || "",
        showNavbar: false
        // 控制 Navbar 的显示
      };
    },
    onShow() {
      this.checkCurrentPage();
    },
    methods: {
      checkCurrentPage() {
        const pages = getCurrentPages();
        if (pages.length > 0) {
          const currentPage = pages[pages.length - 1].route;
          this.showNavbar = currentPage !== "pages/login/login";
        }
      },
      logout() {
        uni.removeStorageSync("username");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "app" }, [
      $data.showNavbar ? (vue.openBlock(), vue.createBlock(_component_navbar, {
        key: 0,
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "content" }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])
    ]);
  }
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f13b4d11"], ["__file", "D:/Uniapp/dianJianApp/dianjian02/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
