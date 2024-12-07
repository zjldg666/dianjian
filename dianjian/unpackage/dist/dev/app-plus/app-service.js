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
  const _sfc_main$7 = {
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
                formatAppLog("log", "at pages/login/login.vue:73", "数据为:", data);
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
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "login-box" }, [
        vue.createElementVNode("view", { class: "title" }, "用户登录"),
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
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__file", "D:/Uniapp/dianJianApp/dianjian/pages/login/login.vue"]]);
  const _imports_0$1 = "/static/logo.png";
  const _sfc_main$6 = {
    props: {
      username: String
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
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
  const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__scopeId", "data-v-35616072"], ["__file", "D:/Uniapp/dianJianApp/dianjian/components/Navbar.vue"]]);
  const _sfc_main$5 = {
    props: {
      buttons: {
        typs: Array,
        required: true
      }
    },
    methods: {
      //处理按钮点击事件
      handleClick(action) {
        if (typeof action === "function") {
          action();
        }
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
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
            }, vue.toDisplayString(button.label), 9, ["disabled", "onClick"])
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const ButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-8e810d98"], ["__file", "D:/Uniapp/dianJianApp/dianjian/components/ButtonGroup.vue"]]);
  const _sfc_main$4 = {
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
                action: () => this.goToDetail(item.SEL_TXT, item.SEL_ShuoMing)
              }));
              formatAppLog("log", "at pages/inspection/inspection.vue:57", "点检项目加载成功:", this.buttons);
            } else {
              formatAppLog("error", "at pages/inspection/inspection.vue:59", "加载点检项目失败:", data.message);
            }
            if (callback)
              callback();
          },
          fail: (err) => {
            formatAppLog("error", "at pages/inspection/inspection.vue:63", "加载点检项目失败", err);
            if (callback)
              callback();
          }
        });
      },
      goToDetail(selTxt, selShuoMing) {
        uni.navigateTo({
          url: `/pages/detail/detail?selTxt=${selTxt}&&selShuoMing=${selShuoMing}`
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
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    const _component_button_group = vue.resolveComponent("button-group");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createCommentVNode(" 使用按钮组组件 "),
        vue.createVNode(_component_button_group, { buttons: $data.buttons }, null, 8, ["buttons"])
      ])
    ]);
  }
  const PagesInspectionInspection = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__file", "D:/Uniapp/dianJianApp/dianjian/pages/inspection/inspection.vue"]]);
  const _sfc_main$3 = {
    components: {
      Navbar
    },
    data() {
      return {
        username: uni.getStorageSync("username") || "",
        inspectionDetails: [],
        // 存储点检详情数据
        selTxt: "",
        // 存储传递的 SEL_TXT
        selShuoMing: ""
      };
    },
    onLoad(options) {
      this.selTxt = options.selTxt;
      this.selShuoMing = options.selShuoMing;
    },
    methods: {
      scanQRCode() {
        uni.scanCode({
          success: (res) => {
            formatAppLog("log", "at pages/detail/detail.vue:49", "扫描成功", res);
            this.verifyQRCode(res.result);
          },
          fail: (err) => {
            formatAppLog("error", "at pages/detail/detail.vue:53", "扫描失败", err);
          }
        });
      },
      verifyQRCode(result) {
        const qrCodePrefix = result.substring(0, 3).toLowerCase();
        const selTxtPrefix = this.selTxt.toLowerCase();
        if (qrCodePrefix === selTxtPrefix) {
          uni.showToast({
            title: "巡查点正确",
            icon: "success"
          });
          this.loadInspectionDetails(qrCodePrefix);
        } else {
          uni.showToast({
            title: "位置不匹配",
            icon: "none"
          });
        }
      },
      loadInspectionDetails(code) {
        const token = uni.getStorageSync("token");
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/GetCheckListDetail",
          method: "POST",
          data: {
            code,
            token
          },
          success: (res) => {
            const data = JSON.parse(res.data);
            if (!data.isError) {
              this.inspectionDetails = data.dt;
              formatAppLog("log", "at pages/detail/detail.vue:87", "点检详情加载成功:", this.inspectionDetails);
              uni.navigateTo({
                url: `/pages/project/project?id=${code}&name=${this.selShuoMing}`
              });
            } else {
              formatAppLog("error", "at pages/detail/detail.vue:93", "加载点检详情失败:", data.message);
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/detail/detail.vue:97", "加载点检详情失败", err);
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
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("view", { class: "inspection-point" }, [
          vue.createElementVNode(
            "view",
            { class: "inspection-name" },
            "检查位置>" + vue.toDisplayString($data.selShuoMing),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "scanner" }, [
            vue.createElementVNode("view", { class: "scanner-animation" })
          ]),
          vue.createElementVNode("button", {
            onClick: _cache[0] || (_cache[0] = (...args) => $options.scanQRCode && $options.scanQRCode(...args)),
            class: "button"
          }, "点击扫描二维码")
        ]),
        vue.createCommentVNode('   <view class="inspection-details" v-if="inspectionDetails.length > 0">\n        <view v-for="item in inspectionDetails" :key="item.ID" class="detail-item">\n          <view>项目: {{ item.Project }}</view>\n          <view>描述: {{ item.Description }}</view>\n          <view>位置: {{ item.Position }}</view>\n        </view>\n      </view> ')
      ])
    ]);
  }
  const PagesDetailDetail = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "D:/Uniapp/dianJianApp/dianjian/pages/detail/detail.vue"]]);
  const _sfc_main$2 = {
    components: {
      Navbar,
      ButtonGroup
    },
    data() {
      return {
        username: uni.getStorageSync("username") || "",
        // 定义按钮数组
        buttons: [
          { label: "我的巡查", action: this.goToInspection },
          { label: "待定按钮1", action: null, disabled: true },
          { label: "待定按钮2", action: null, disabled: true },
          { label: "待定按钮3", action: null, disabled: true }
        ]
      };
    },
    methods: {
      // 跳转到巡查任务页面
      goToInspection() {
        uni.navigateTo({
          url: "/pages/inspection/inspection"
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
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
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
        vue.createVNode(_component_button_group, { buttons: $data.buttons }, null, 8, ["buttons"])
      ])
    ]);
  }
  const PagesHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "D:/Uniapp/dianJianApp/dianjian/pages/home/home.vue"]]);
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
  const _sfc_main$1 = {
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
        formatAppLog("error", "at pages/project/project.vue:149", "id 参数为空");
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
          formatAppLog("error", "at pages/project/project.vue:167", "id 参数为空");
          return;
        }
        formatAppLog("log", "at pages/project/project.vue:170", "请求参数:", { code: id, token });
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/GetCheckListDetail",
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
              formatAppLog("log", "at pages/project/project.vue:188", "点检详情加载成功:", this.inspectionItems);
            } else {
              formatAppLog("error", "at pages/project/project.vue:190", "加载点检详情失败:", data.message);
            }
            if (callback)
              callback();
          },
          fail: (err) => {
            formatAppLog("error", "at pages/project/project.vue:195", "加载点检详情失败:", err);
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
          if (this.currentItemIndex < this.inspectionItems.length - 1) {
            this.nextItem();
          } else {
            formatAppLog("log", "at pages/project/project.vue:217", "当前 inspectionItems:", this.inspectionItems);
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
            formatAppLog("error", "at pages/project/project.vue:247", "选择图片失败:", err);
          }
        });
      },
      // 将图片路径转换为 Base64 编码
      convertImagesToBase64(imagePaths) {
        Promise.all(imagePaths.map((imagePath) => urlToBase64(imagePath))).then((base64Images) => {
          this.currentItem.images.push(...base64Images);
          formatAppLog("log", "at pages/project/project.vue:256", "Base64 图片路径:", this.currentItem.images);
        }).catch((err) => {
          formatAppLog("error", "at pages/project/project.vue:258", "转换图片为 Base64 编码失败:", err);
        });
      },
      // 删除图片
      deleteImage(index) {
        this.currentItem.images.splice(index, 1);
      },
      // 保存点检详情
      saveInspection() {
        if (!this.inspectionItems || !this.inspectionItems.length) {
          formatAppLog("error", "at pages/project/project.vue:268", "inspectionItems 未定义或为空");
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
        formatAppLog("log", "at pages/project/project.vue:292", "发送到 SaveDetail 接口的数据:", inspectionData);
        uni.request({
          url: "http://13.94.38.44:8080/CheckList/SaveDetail",
          method: "POST",
          header: {
            "content-type": "application/json"
          },
          data: inspectionData,
          success: (res) => {
            formatAppLog("log", "at pages/project/project.vue:302", "第一次请求返回数据为:", res.data);
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
                  formatAppLog("error", "at pages/project/project.vue:314", "保存点检详情失败:", data.msg);
                }
              } catch (parseError) {
                formatAppLog("error", "at pages/project/project.vue:317", "解析第一次请求返回数据时出错:", parseError);
              }
            } else {
              formatAppLog("error", "at pages/project/project.vue:320", "第一次请求响应数据不是字符串:", res.data);
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/project/project.vue:324", "保存点检详情失败:", err);
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
            formatAppLog("log", "at pages/project/project.vue:338", "第二次请求返回数据为:", res.data);
            if (typeof res.data === "string") {
              try {
                const result = JSON.parse(res.data);
                if (!result.IsError) {
                  uni.showToast({
                    title: "检查成功",
                    icon: "success"
                  });
                  uni.redirectTo({
                    url: "/pages/inspection/inspection"
                  });
                } else {
                  uni.showToast({
                    title: result.msg,
                    icon: "none"
                  });
                  formatAppLog("error", "at pages/project/project.vue:355", "保存检查结果失败:", result.msg);
                }
              } catch (parseError) {
                formatAppLog("error", "at pages/project/project.vue:358", "解析第二次请求返回数据时出错:", parseError);
              }
            } else {
              formatAppLog("error", "at pages/project/project.vue:361", "第二次请求响应数据不是字符串:", res.data);
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/project/project.vue:365", "保存检查结果失败:", err);
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
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesProjectProject = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-e8179a1b"], ["__file", "D:/Uniapp/dianJianApp/dianjian/pages/project/project.vue"]]);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/inspection/inspection", PagesInspectionInspection);
  __definePage("pages/detail/detail", PagesDetailDetail);
  __definePage("pages/home/home", PagesHomeHome);
  __definePage("components/Navbar", Navbar);
  __definePage("pages/project/project", PagesProjectProject);
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
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f13b4d11"], ["__file", "D:/Uniapp/dianJianApp/dianjian/App.vue"]]);
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
