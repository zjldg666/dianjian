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
  const _sfc_main$a = {
    data() {
      return {
        companyList: [],
        selectedCompanyId: "",
        selectedCompanyName: "",
        username: "",
        password: ""
      };
    },
    computed: {
      companyNames() {
        return this.companyList.map((company) => company.Name);
      }
    },
    onLoad() {
      this.fetchCompanyList();
    },
    methods: {
      fetchCompanyList() {
        uni.request({
          url: "http://13.94.38.44:8000/AssetsRepair/Index",
          method: "POST",
          success: (res) => {
            const data = JSON.parse(res.data).list;
            this.companyList = data;
          }
        });
      },
      onCompanyChange(event) {
        const index = event.detail.value;
        this.selectedCompanyId = this.companyList[index].ID;
        this.selectedCompanyName = this.companyList[index].Name;
      },
      login() {
        if (!this.selectedCompanyId || !this.username || !this.password) {
          uni.showToast({
            title: "请填写完整信息",
            icon: "none"
          });
          return;
        }
        uni.request({
          url: "http://13.94.38.44:8000/AssetsRepair/SignIn",
          method: "POST",
          header: {
            "content-type": "application/json"
            // 默认值
          },
          data: JSON.stringify({
            connid: this.selectedCompanyId,
            strAccount: this.username,
            strPswd: this.password
          }),
          success: (res) => {
            const result = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
            formatAppLog("log", "at pages/login/login.vue:76", result.token);
            formatAppLog("log", "at pages/login/login.vue:77", result);
            if (result.IsError === false) {
              uni.setStorageSync("userInfo", {
                token: result.token,
                username: result.EMP_NAME,
                connid: result.connid
                // 可以存储其他需要的信息
              });
              uni.redirectTo({
                url: "/pages/home/home"
              });
            } else {
              this.password = "";
              if (result.message && result.message.includes("账号或密码错误")) {
                uni.showToast({
                  title: "账号或密码错误",
                  icon: "none"
                });
              } else {
                uni.showToast({
                  title: result.message || "登录失败，请重试",
                  icon: "none"
                });
              }
            }
          },
          fail: () => {
            this.password = "";
            uni.showToast({
              title: "请求失败，请检查网络连接",
              icon: "none"
            });
          }
        });
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "login-box" }, [
        vue.createElementVNode("picker", {
          mode: "selector",
          range: $options.companyNames,
          onChange: _cache[0] || (_cache[0] = (...args) => $options.onCompanyChange && $options.onCompanyChange(...args))
        }, [
          vue.createElementVNode(
            "view",
            { class: "picker" },
            " 当前选择：" + vue.toDisplayString($data.selectedCompanyName ? $data.selectedCompanyName : "请选择公司"),
            1
            /* TEXT */
          )
        ], 40, ["range"]),
        vue.createCommentVNode(" 用户名输入框 "),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            type: "text",
            placeholder: "请输入用户名",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.username = $event),
            class: "input"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $data.username]
        ]),
        vue.createCommentVNode(" 密码输入框 "),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            type: "password",
            placeholder: "请输入密码",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.password = $event),
            class: "input"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $data.password]
        ]),
        vue.createElementVNode("button", {
          type: "primary",
          onClick: _cache[3] || (_cache[3] = (...args) => $options.login && $options.login(...args)),
          class: "button"
        }, "登录")
      ])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__file", "D:/Uniapp/dianJianApp/baoxiu/pages/login/login.vue"]]);
  const _imports_0$1 = "/static/logo.png";
  const _sfc_main$9 = {
    props: {
      username: String
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
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
  const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-35616072"], ["__file", "D:/Uniapp/dianJianApp/baoxiu/components/Navbar.vue"]]);
  const _imports_0 = "/static/icon/SaomaBx.png";
  const _imports_1 = "/static/icon/ShoujiBx.png";
  const _imports_2 = "/static/icon/bxQingdan.png";
  const _imports_3 = "/static/icon/ZichanQingdan.png";
  const _imports_4 = "/static/icon/EasyBaobiao.png";
  const _sfc_main$8 = {
    components: {
      Navbar
    },
    data() {
      return {
        username: ""
      };
    },
    onLoad() {
      const userInfo = uni.getStorageSync("userInfo");
      if (userInfo && userInfo.username) {
        this.username = userInfo.username;
      }
    },
    methods: {
      // 扫码报修功能
      scanAndNavigate() {
        uni.scanCode({
          success: (res) => {
            const AssetsCode = res.result;
            formatAppLog("log", "at pages/home/home.vue:76", AssetsCode);
            this.navigateToRepair(AssetsCode);
          },
          fail: () => {
            uni.showToast({
              title: "扫码失败，请重试",
              icon: "none"
            });
          }
        });
      },
      navigateToRepair(AssetsCode) {
        const userInfo = uni.getStorageSync("userInfo");
        formatAppLog("log", "at pages/home/home.vue:90", userInfo.connid);
        if (!userInfo.token || !userInfo.connid) {
          uni.showToast({
            title: "请先登录",
            icon: "none"
          });
          return;
        }
        uni.request({
          url: "http://13.94.38.44:8000/AssetsRepair/ShowNewInfo",
          method: "POST",
          header: {
            "content-type": "application/json"
          },
          data: JSON.stringify({
            connid: userInfo.connid,
            token: userInfo.token,
            AssetsCode,
            isEdit: true
          }),
          success: (response) => {
            const result = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            formatAppLog("log", "at pages/home/home.vue:113", result);
            formatAppLog("log", "at pages/home/home.vue:114", result.AssetsCode);
            if (!result.IsError) {
              uni.navigateTo({
                url: `/pages/repair/repair?data=${JSON.stringify(result)}`
              });
            } else {
              uni.showToast({
                title: "获取资产信息失败",
                icon: "none"
              });
            }
          },
          fail: () => {
            uni.showToast({
              title: "请求失败，请检查网络连接",
              icon: "none"
            });
          }
        });
      },
      TomobileRepair() {
        uni.navigateTo({
          url: "/pages/mobileRepair/mobileRepair"
        });
      },
      TorepairList() {
        uni.navigateTo({
          url: "/pages/repairList/repairList"
        });
      },
      navigateTo(page) {
        uni.navigateTo({
          url: `/pages/${page}/${page}`
        });
      },
      logout() {
        uni.removeStorageSync("userInfo");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "button-group" }, [
        vue.createCommentVNode(" button-row 控制横向两个按钮 "),
        vue.createElementVNode("view", { class: "button-row" }, [
          vue.createElementVNode("button", {
            class: "square-button",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.scanAndNavigate && $options.scanAndNavigate(...args))
          }, [
            vue.createCommentVNode(" icon-text-container  控制图标和文字上下排列 "),
            vue.createElementVNode("view", { class: "icon-text-container" }, [
              vue.createElementVNode("image", {
                class: "icon",
                src: _imports_0
              }),
              vue.createElementVNode("text", { class: "text" }, "扫码报修")
            ])
          ]),
          vue.createElementVNode("button", {
            class: "square-button",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.TomobileRepair && $options.TomobileRepair(...args))
          }, [
            vue.createElementVNode("view", { class: "icon-text-container" }, [
              vue.createElementVNode("image", {
                class: "icon",
                src: _imports_1
              }),
              vue.createElementVNode("text", { class: "text" }, "手机报修")
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "button-row" }, [
          vue.createElementVNode("button", {
            class: "square-button",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.TorepairList && $options.TorepairList(...args))
          }, [
            vue.createElementVNode("view", { class: "icon-text-container" }, [
              vue.createElementVNode("image", {
                class: "icon",
                src: _imports_2
              }),
              vue.createElementVNode("text", { class: "text" }, "报修清单")
            ])
          ]),
          vue.createElementVNode("button", {
            class: "square-button",
            onClick: _cache[3] || (_cache[3] = ($event) => $options.navigateTo("assetList"))
          }, [
            vue.createElementVNode("view", { class: "icon-text-container" }, [
              vue.createElementVNode("image", {
                class: "icon",
                src: _imports_3
              }),
              vue.createElementVNode("text", { class: "text" }, "资产清单")
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "button-row" }, [
          vue.createElementVNode("button", {
            class: "square-button",
            onClick: _cache[4] || (_cache[4] = ($event) => $options.navigateTo("simpleReport"))
          }, [
            vue.createElementVNode("view", { class: "icon-text-container" }, [
              vue.createElementVNode("image", {
                class: "icon",
                src: _imports_4
              }),
              vue.createElementVNode("text", { class: "text" }, "简单报表")
            ])
          ]),
          vue.createElementVNode("button", { class: "square-button empty-button" }),
          vue.createCommentVNode(" 空出的按钮 ")
        ])
      ])
    ]);
  }
  const PagesHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-07e72d3c"], ["__file", "D:/Uniapp/dianJianApp/baoxiu/pages/home/home.vue"]]);
  const _sfc_main$7 = {
    components: {
      Navbar
    },
    data() {
      return {
        username: "",
        connid: "",
        token: "",
        docnum: "",
        AssetsCode: "",
        AssetsName: "",
        UserDept: "",
        AssetsType: "",
        FinishDate: "",
        Discription: "",
        images: []
      };
    },
    //页面刷新时，将数据赋值，以便此页面使用
    onLoad(options) {
      if (options.data) {
        const assetInfo = JSON.parse(decodeURIComponent(options.data));
        formatAppLog("log", "at pages/repair/repair.vue:98", assetInfo);
        this.connid = assetInfo.connid;
        this.token = assetInfo.token;
        this.docnum = assetInfo.docnum;
        this.AssetsCode = assetInfo.AssetsCode;
        this.AssetsName = assetInfo.AssetsName;
        this.UserDept = assetInfo.UserDept || "";
        this.AssetsType = assetInfo.AssetsType;
        const draftData = uni.getStorageSync("repairDraft_" + this.AssetsCode);
        formatAppLog("log", "at pages/repair/repair.vue:109", draftData);
        if (draftData) {
          this.FinishDate = draftData.FinishDate;
          this.Discription = draftData.Discription;
          this.images = draftData.images;
        }
        const userInfo = uni.getStorageSync("userInfo");
        if (userInfo && userInfo.username) {
          this.username = userInfo.username;
        }
      }
    },
    methods: {
      logout() {
        uni.removeStorageSync("userInfo");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      },
      //选择完工日期
      onDateChange(e) {
        this.FinishDate = e.detail.value;
      },
      chooseImage() {
        uni.chooseImage({
          count: 1,
          success: (res) => {
            this.images.push(...res.tempFilePaths);
          }
        });
      },
      // 新增图片预览方法
      previewImage(index) {
        uni.previewImage({
          current: index,
          // 当前点击的图片索引
          urls: this.images
          // 所有图片的 URL 数组
        });
      },
      //删除照片
      removeImage(index) {
        this.images.splice(index, 1);
      },
      async showConfirmDialog(action) {
        if (!this.FinishDate || !this.Discription) {
          uni.showToast({
            title: "请确保所有必填项已填写",
            icon: "none"
          });
          return;
        }
        const confirm = await this.showModalAsync(`确定${action}报修吗？`);
        if (confirm) {
          if (action === "立即") {
            await this.submitRepair(true);
          } else {
            await this.saveAsDraft();
            uni.redirectTo({
              url: "/pages/home/home"
            });
          }
        } else {
          formatAppLog("log", "at pages/repair/repair.vue:175", "用户取消了操作");
        }
      },
      showModalAsync(content) {
        return new Promise((resolve) => {
          uni.showModal({
            title: "提示",
            content,
            success: (res) => resolve(res.confirm),
            fail: () => resolve(false)
          });
        });
      },
      async submitRepair(isImmediate) {
        try {
          const type = isImmediate ? "1" : "0";
          const base64Images = await Promise.all(this.images.map((src) => this.urlToBase64(src)));
          formatAppLog("log", "at pages/repair/repair.vue:194", "Base64 Images:", base64Images);
          const requestData = {
            connid: this.connid,
            AssetsCode: this.AssetsCode,
            token: this.token,
            docnum: this.docnum,
            Discription: this.Discription,
            FinishDate: this.FinishDate,
            type,
            FileList: base64Images
          };
          formatAppLog("log", "at pages/repair/repair.vue:207", "请求数据:", requestData);
          const res = await new Promise((resolve, reject) => {
            uni.request({
              url: "http://13.94.38.44:8000/AssetsRepair/SaveNewInfo",
              // 提交检修的接口
              method: "POST",
              data: requestData,
              success: resolve,
              fail: reject
            });
          });
          formatAppLog("log", "at pages/repair/repair.vue:219", "提交成功:", res.data);
          uni.removeStorageSync("repairDraft_" + this.AssetsCode);
          uni.showToast({
            title: "提交成功",
            icon: "success",
            duration: 2e3,
            // 显示时长为2秒
            complete: () => {
              uni.redirectTo({
                url: "/pages/home/home"
              });
            }
          });
        } catch (err) {
          formatAppLog("error", "at pages/repair/repair.vue:235", "提交失败:", err);
          uni.showToast({
            title: "提交失败",
            icon: "none"
          });
        }
      },
      async saveAsDraft() {
        try {
          const draftData = {
            connid: this.connid,
            token: this.token,
            docnum: this.docnum,
            AssetsCode: this.AssetsCode,
            AssetsName: this.AssetsName,
            UserDept: this.UserDept,
            AssetsType: this.AssetsType,
            FinishDate: this.FinishDate,
            Discription: this.Discription,
            images: this.images
          };
          formatAppLog("log", "at pages/repair/repair.vue:258", "准备保存草稿:", draftData);
          uni.setStorageSync("repairDraft_" + this.AssetsCode, draftData);
          formatAppLog("log", "at pages/repair/repair.vue:262", "草稿保存成功");
          uni.showToast({
            title: "已保存为草稿",
            icon: "success",
            duration: 2e3,
            // 显示时长为2秒
            complete: () => {
              formatAppLog("log", "at pages/repair/repair.vue:269", "提示框显示完毕，即将返回首页");
              uni.redirectTo({
                url: "/pages/home/home"
              });
            }
          });
        } catch (err) {
          formatAppLog("error", "at pages/repair/repair.vue:276", "保存草稿失败:", err);
          uni.showToast({
            title: "保存草稿失败",
            icon: "none"
          });
        }
      },
      urlToBase64(url, type = "png") {
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
      // handleInvalidImagePath(path) {
      //   __f__('warn','at pages/repair/repair.vue:350',`Invalid image path found: ${path}, removing it from images list.`);
      //   // 清除无效的图片路径
      //   this.images = this.images.filter(src => src !== path);
      //   uni.showToast({
      //     title: '发现无效图片路径，请重新上传相关图片。',
      //     icon: 'none',
      //   duration: 2000, // 显示时长为2秒
      //   });
      // },
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode(
          "form",
          {
            onSubmit: _cache[6] || (_cache[6] = (...args) => $options.submitRepair && $options.submitRepair(...args))
          },
          [
            vue.createElementVNode("view", { class: "form-item" }, [
              vue.createElementVNode("text", null, "报修单号:"),
              vue.createElementVNode("input", {
                type: "text",
                value: $data.docnum,
                disabled: "",
                class: "input"
              }, null, 8, ["value"])
            ]),
            vue.createElementVNode("view", { class: "form-item" }, [
              vue.createElementVNode("text", null, "资产编码:"),
              vue.createElementVNode("input", {
                type: "text",
                value: $data.AssetsCode,
                disabled: "",
                class: "input"
              }, null, 8, ["value"])
            ]),
            vue.createElementVNode("view", { class: "form-item" }, [
              vue.createElementVNode("text", null, "资产名称:"),
              vue.createElementVNode("input", {
                type: "text",
                value: $data.AssetsName,
                disabled: "",
                class: "input"
              }, null, 8, ["value"])
            ]),
            vue.createElementVNode("view", { class: "form-item" }, [
              vue.createElementVNode("text", null, "使用部门:"),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "text",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.UserDept = $event),
                  disabled: "",
                  class: "input"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.UserDept]
              ])
            ]),
            vue.createElementVNode("view", { class: "form-item" }, [
              vue.createElementVNode("text", null, "资产类型:"),
              vue.createElementVNode("input", {
                type: "text",
                value: $data.AssetsType,
                disabled: "",
                class: "input"
              }, null, 8, ["value"])
            ]),
            vue.createElementVNode("view", { class: "form-item" }, [
              vue.createElementVNode("text", null, "完工日期:"),
              vue.createElementVNode(
                "picker",
                {
                  mode: "date",
                  onChange: _cache[1] || (_cache[1] = (...args) => $options.onDateChange && $options.onDateChange(...args)),
                  class: "input"
                },
                [
                  vue.createElementVNode(
                    "view",
                    null,
                    vue.toDisplayString($data.FinishDate || "请选择日期"),
                    1
                    /* TEXT */
                  )
                ],
                32
                /* NEED_HYDRATION */
              )
            ]),
            vue.createElementVNode("view", { class: "form-group" }, [
              vue.createElementVNode("text", null, "故障描述:"),
              vue.withDirectives(vue.createElementVNode(
                "textarea",
                {
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.Discription = $event),
                  placeholder: "请输入故障描述",
                  class: "textarea"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.Discription]
              ])
            ]),
            vue.createElementVNode("view", { class: "form-item" }, [
              vue.createElementVNode("text", null, "上传照片"),
              vue.createElementVNode("button", {
                onClick: _cache[3] || (_cache[3] = (...args) => $options.chooseImage && $options.chooseImage(...args)),
                class: "imageButton"
              }, "+")
            ]),
            vue.createCommentVNode(" 图片存放处 "),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.images, (src, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "image-preview"
                }, [
                  vue.createElementVNode("image", {
                    src,
                    class: "preview-image",
                    onClick: ($event) => $options.previewImage(index),
                    "data-index": index
                  }, null, 8, ["src", "onClick", "data-index"]),
                  vue.createElementVNode("button", {
                    class: "delete-button",
                    onClick: vue.withModifiers(($event) => $options.removeImage(index), ["stop", "prevent"])
                  }, "x", 8, ["onClick"])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            vue.createElementVNode("view", { class: "button-row" }, [
              vue.createElementVNode("button", {
                type: "primary",
                onClick: _cache[4] || (_cache[4] = ($event) => $options.showConfirmDialog("立即"))
              }, "立即报修"),
              vue.createElementVNode("button", {
                onClick: _cache[5] || (_cache[5] = ($event) => $options.showConfirmDialog("稍后"))
              }, "稍后报修")
            ])
          ],
          32
          /* NEED_HYDRATION */
        )
      ])
    ]);
  }
  const PagesRepairRepair = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-ad4deb87"], ["__file", "D:/Uniapp/dianJianApp/baoxiu/pages/repair/repair.vue"]]);
  const _sfc_main$6 = {
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      currentImage: {
        type: String,
        required: true
      },
      onClose: {
        type: Function,
        required: true
        // 确保父组件传递了一个关闭方法
      }
    },
    methods: {
      closeViewer() {
        this.onClose();
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.visible ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "image-viewer",
      onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => $options.closeViewer && $options.closeViewer(...args), ["self"]))
    }, [
      vue.createCommentVNode(" 关闭按钮 "),
      vue.createElementVNode("view", {
        class: "close-btn",
        onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.closeViewer && $options.closeViewer(...args), ["stop"]))
      }, "X"),
      vue.createElementVNode("image", {
        src: $props.currentImage,
        class: "preview-image"
      }, null, 8, ["src"])
    ])) : vue.createCommentVNode("v-if", true);
  }
  const ImageViewer = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-a9a40036"], ["__file", "D:/Uniapp/dianJianApp/baoxiu/components/ImageViewer.vue"]]);
  const _sfc_main$5 = {
    components: {
      Navbar,
      ImageViewer
    },
    data() {
      return {
        username: "",
        detail: {},
        currentTab: "baoxiu",
        // 默认选中的标签
        isImageViewerVisible: false,
        selectedImageUrl: ""
      };
    },
    onLoad(options) {
      const userInfo = uni.getStorageSync("userInfo");
      if (userInfo && userInfo.username) {
        this.username = userInfo.username;
      }
      this.fetchDetail(options.docnum);
      this.fetchWeixiuDetail(options.docnum);
    },
    methods: {
      closeImageViewer() {
        this.isImageViewerVisible = false;
      },
      openImageViewer(url) {
        this.selectedImageUrl = url;
        this.isImageViewerVisible = true;
      },
      logout() {
        uni.removeStorageSync("userInfo");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      },
      fetchDetail(docnum) {
        const userInfo = uni.getStorageSync("userInfo");
        if (!userInfo.token || !userInfo.connid) {
          uni.showToast({
            title: "请先登录",
            icon: "none"
          });
          return;
        }
        uni.request({
          url: "http://13.94.38.44:8000/AssetsRepair/GetMainListDetail",
          method: "POST",
          header: {
            "content-type": "application/json"
          },
          data: JSON.stringify({
            connid: userInfo.connid,
            token: userInfo.token,
            docnum
          }),
          success: (response) => {
            let result;
            try {
              result = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            } catch (error) {
              formatAppLog("error", "at pages/copy/copy.vue:163", "解析响应数据失败:", error);
              uni.showToast({
                title: "解析数据失败",
                icon: "none"
              });
              return;
            }
            if (!result.isError) {
              this.detail = { ...this.detail, ...result };
            } else {
              uni.showToast({
                title: "获取详细信息失败",
                icon: "none"
              });
            }
          },
          fail: () => {
            uni.showToast({
              title: "请求失败，请检查网络连接",
              icon: "none"
            });
          }
        });
      },
      fetchWeixiuDetail(docnum) {
        const userInfo = uni.getStorageSync("userInfo");
        if (!userInfo.token || !userInfo.connid) {
          uni.showToast({
            title: "请先登录",
            icon: "none"
          });
          return;
        }
        uni.request({
          url: "http://13.94.38.44:8000/AssetsRepair/GetMainListDetail",
          // 假设API相同，可以根据实际情况调整
          method: "POST",
          header: {
            "content-type": "application/json"
          },
          data: JSON.stringify({
            connid: userInfo.connid,
            token: userInfo.token,
            docnum
          }),
          success: (response) => {
            let result;
            try {
              result = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            } catch (error) {
              formatAppLog("error", "at pages/copy/copy.vue:215", "解析响应数据失败:", error);
              uni.showToast({
                title: "解析数据失败",
                icon: "none"
              });
              return;
            }
            if (!result.isError) {
              this.detail = { ...this.detail, ...result };
            } else {
              uni.showToast({
                title: "获取详细信息失败",
                icon: "none"
              });
            }
          },
          fail: () => {
            uni.showToast({
              title: "请求失败，请检查网络连接",
              icon: "none"
            });
          }
        });
      },
      switchTab(tab) {
        this.currentTab = tab;
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    const _component_image_viewer = vue.resolveComponent("image-viewer");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createCommentVNode(" 添加选择卡 "),
      vue.createElementVNode("view", { class: "tabs" }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["tab", { active: $data.currentTab === "baoxiu" }]),
            onClick: _cache[0] || (_cache[0] = ($event) => $options.switchTab("baoxiu"))
          },
          " 报修明细 ",
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["tab", { active: $data.currentTab === "weixiu" }]),
            onClick: _cache[1] || (_cache[1] = ($event) => $options.switchTab("weixiu"))
          },
          " 维修明细 ",
          2
          /* CLASS */
        )
      ]),
      $data.currentTab === "baoxiu" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "content"
      }, [
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "报修单号:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.docnum),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "报修单号:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.docnum),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "资产编号:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.AssetsCode),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "资产名称:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.AssetsName),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "使用部门:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.UserDep),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "资产类型:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.AssetsType),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "完工日期:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.FinishDate),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "故障描述:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.Discription),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "相关相片:")
        ]),
        $data.detail.FilesList && $data.detail.FilesList.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "image-preview"
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.detail.FilesList, (file, fileIndex) => {
              return vue.openBlock(), vue.createElementBlock("view", { key: fileIndex }, [
                vue.createElementVNode("image", {
                  src: file,
                  mode: "aspectFit",
                  class: "image",
                  onClick: ($event) => $options.openImageViewer(file)
                }, null, 8, ["src", "onClick"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "no-images"
        }, "暂无相关图片"))
      ])) : vue.createCommentVNode("v-if", true),
      $data.currentTab === "weixiu" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "content"
      }, [
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "维修单号:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.wxdocnum),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "维修单号:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.wxdocnum),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "原因分析:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.Reason),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "维修方案:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.SchemeTxt),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "预计金额:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.Amount),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "币别:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.Currency),
            1
            /* TEXT */
          )
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createVNode(_component_image_viewer, {
        visible: $data.isImageViewerVisible,
        "current-image": $data.selectedImageUrl,
        "on-close": $options.closeImageViewer
      }, null, 8, ["visible", "current-image", "on-close"])
    ]);
  }
  const PagesCopyCopy = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-ba938ec5"], ["__file", "D:/Uniapp/dianJianApp/baoxiu/pages/copy/copy.vue"]]);
  const _sfc_main$4 = {
    components: {
      Navbar
    },
    data() {
      return {
        username: "",
        searchQuery: "",
        assetsList: [],
        selectedAsset: "",
        currentPage: 1,
        pageSize: 10,
        loading: false,
        hasMoreData: true
      };
    },
    // 通过搜索，过滤信息
    computed: {
      filteredAssets() {
        return this.assetsList.filter(
          (asset) => asset.资产编号 && asset.资产编号.includes(this.searchQuery) || asset.资产名称 && asset.资产名称.includes(this.searchQuery)
        ).slice(0, this.currentPage * this.pageSize);
      },
      selectedAssetInfo() {
        return this.assetsList.find((asset) => asset.资产编号 === this.selectedAsset);
      }
    },
    onLoad() {
      const userInfo = uni.getStorageSync("userInfo");
      if (userInfo && userInfo.username) {
        this.username = userInfo.username;
      }
      this.fetchAssets();
    },
    methods: {
      fetchAssets(reset = false) {
        if (reset) {
          this.assetsList = [];
          this.currentPage = 1;
          this.hasMoreData = true;
        }
        if (!this.hasMoreData || this.loading)
          return;
        this.loading = true;
        const userInfo = uni.getStorageSync("userInfo");
        if (!userInfo.token || !userInfo.connid) {
          uni.showToast({
            title: "请先登录",
            icon: "none"
          });
          this.loading = false;
          return;
        }
        uni.request({
          url: "http://13.94.38.44:8000/AssetsRepair/GetAllCode",
          method: "POST",
          header: {
            "content-type": "application/json"
          },
          data: JSON.stringify({
            connid: userInfo.connid,
            token: userInfo.token,
            search: this.searchQuery,
            isEdit: true,
            page: this.currentPage,
            size: this.pageSize
          }),
          success: (response) => {
            const result = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            formatAppLog("log", "at pages/mobileRepair/mobileRepair.vue:127", result);
            if (!result.IsError) {
              if (result.list.length > 0) {
                this.assetsList = reset ? result.list : [...this.assetsList, ...result.list];
                this.currentPage++;
              } else {
                this.hasMoreData = false;
              }
            } else {
              uni.showToast({
                title: "获取资产信息失败",
                icon: "none"
              });
            }
          },
          fail: () => {
            uni.showToast({
              title: "请求失败，请检查网络连接",
              icon: "none"
            });
          },
          complete: () => {
            this.loading = false;
          }
        });
      },
      handleSearchInput() {
        this.fetchAssets(true);
      },
      toggleSelection(item) {
        if (this.selectedAsset === item.资产编号) {
          this.selectedAsset = "";
        } else {
          this.selectedAsset = item.资产编号;
        }
      },
      submitRepair() {
        if (!this.selectedAsset) {
          uni.showToast({
            title: "请选择一个资产",
            icon: "none"
          });
          return;
        }
        const { 资产编号, 资产名称 } = this.selectedAssetInfo;
        formatAppLog("log", "at pages/mobileRepair/mobileRepair.vue:176", this.selectedAssetInfo);
        uni.request({
          url: "http://13.94.38.44:8000/AssetsRepair/GetAssetsInfoByCode",
          // 假设这是提交报修的API地址
          method: "POST",
          header: {
            "content-type": "application/json"
          },
          data: JSON.stringify({
            connid: uni.getStorageSync("userInfo").connid,
            AssetsCode: 资产编号,
            token: uni.getStorageSync("userInfo").token
          }),
          success: (response) => {
            const result = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            formatAppLog("log", "at pages/mobileRepair/mobileRepair.vue:191", result);
            if (!result.IsError) {
              uni.navigateTo({
                url: `/pages/repair/repair?data=${encodeURIComponent(JSON.stringify(result))}`
              });
            } else {
              uni.showToast({
                title: "获取资产信息失败",
                icon: "none"
              });
            }
          },
          fail: () => {
            uni.showToast({
              title: "请求失败，请检查网络连接",
              icon: "none"
            });
          }
        });
      },
      loadMore() {
        this.fetchAssets();
      },
      logout() {
        uni.removeStorageSync("userInfo");
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
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            type: "text",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.searchQuery = $event),
            placeholder: "请输入搜索内容",
            onInput: _cache[1] || (_cache[1] = (...args) => $options.handleSearchInput && $options.handleSearchInput(...args)),
            class: "search-input"
          },
          null,
          544
          /* NEED_HYDRATION, NEED_PATCH */
        ), [
          [vue.vModelText, $data.searchQuery]
        ]),
        vue.createCommentVNode(" 表格内容 "),
        vue.createElementVNode(
          "scroll-view",
          {
            "scroll-y": "",
            class: "table-container",
            onScrolltolower: _cache[2] || (_cache[2] = (...args) => $options.loadMore && $options.loadMore(...args))
          },
          [
            vue.createElementVNode("view", { class: "table-header" }, [
              vue.createElementVNode("view", { class: "header-cell" }, "选择"),
              vue.createElementVNode("view", { class: "header-cell" }, "资产编码"),
              vue.createElementVNode("view", { class: "header-cell" }, "资产名称")
            ]),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($options.filteredAssets, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: vue.normalizeClass(["table-row", { "selected": $data.selectedAsset === item.资产编号 }]),
                  key: index,
                  onClick: ($event) => $options.toggleSelection(item)
                }, [
                  vue.createElementVNode("view", { class: "cell" }, [
                    vue.createElementVNode(
                      "view",
                      {
                        class: vue.normalizeClass({ "radio-checked": $data.selectedAsset === item.资产编号, "radio-unchecked": $data.selectedAsset !== item.资产编号 })
                      },
                      null,
                      2
                      /* CLASS */
                    )
                  ]),
                  vue.createElementVNode(
                    "view",
                    { class: "cell" },
                    vue.toDisplayString(item.资产编号),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "cell" },
                    vue.toDisplayString(item.资产名称),
                    1
                    /* TEXT */
                  )
                ], 10, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            $data.loading ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "loading-indicator"
            }, "加载中...")) : vue.createCommentVNode("v-if", true)
          ],
          32
          /* NEED_HYDRATION */
        ),
        vue.createElementVNode("button", {
          class: "repair-button",
          disabled: !$data.selectedAsset,
          onClick: _cache[3] || (_cache[3] = (...args) => $options.submitRepair && $options.submitRepair(...args))
        }, " 确定报修 ", 8, ["disabled"])
      ]),
      vue.createCommentVNode(" 搜索框 ")
    ]);
  }
  const PagesMobileRepairMobileRepair = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-1214ae1c"], ["__file", "D:/Uniapp/dianJianApp/baoxiu/pages/mobileRepair/mobileRepair.vue"]]);
  const _sfc_main$3 = {
    components: {
      Navbar
    },
    data() {
      return {
        username: "",
        assetsList: [],
        pagesize: 10,
        currentPage: 1,
        hasMoreData: true,
        loading: false,
        error: false
      };
    },
    onLoad() {
      const userInfo = uni.getStorageSync("userInfo");
      if (userInfo && userInfo.username) {
        this.username = userInfo.username;
      }
      this.fetchAssets();
    },
    methods: {
      fetchAssets(reset = false) {
        if (reset) {
          this.assetsList = [];
          this.currentPage = 1;
          this.hasMoreData = true;
          this.error = false;
        }
        const userInfo = uni.getStorageSync("userInfo");
        formatAppLog("log", "at pages/repairList/repairList.vue:73", userInfo);
        if (!userInfo.token || !userInfo.connid) {
          uni.showToast({
            title: "请先登录",
            icon: "none"
          });
          return;
        }
        this.loading = true;
        uni.request({
          url: "http://13.94.38.44:8000/AssetsRepair/GetMainList",
          method: "POST",
          header: {
            "content-type": "application/json"
          },
          data: JSON.stringify({
            connid: userInfo.connid,
            token: userInfo.token
          }),
          success: (response) => {
            let result;
            try {
              result = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            } catch (error) {
              formatAppLog("error", "at pages/repairList/repairList.vue:100", "解析响应数据失败:", error);
              uni.showToast({
                title: "解析数据失败",
                icon: "none"
              });
              this.loading = false;
              this.error = true;
              return;
            }
            formatAppLog("log", "at pages/repairList/repairList.vue:110", result);
            if (!result.IsError && result.list) {
              if (Array.isArray(result.list) && result.list.length > 0) {
                this.assetsList = reset ? result.list : [...this.assetsList, ...result.list];
                this.currentPage++;
              } else {
                this.hasMoreData = false;
              }
            } else {
              uni.showToast({
                title: "获取资产信息失败",
                icon: "none"
              });
              this.error = true;
            }
          },
          fail: () => {
            uni.showToast({
              title: "请求失败，请检查网络连接",
              icon: "none"
            });
            this.error = true;
          },
          complete: () => {
            this.loading = false;
          }
        });
      },
      // 跳转报修明细和维修明细页面
      navigateToDetail(item) {
        if (item.进度) {
          uni.navigateTo({
            url: `/pages/baoxiuMIngxi/baoxiuMIngxi?docnum=${item.报修单号}`
          });
        }
      },
      logout() {
        uni.removeStorageSync("userInfo");
        uni.redirectTo({
          url: "/pages/login/login"
        });
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
        vue.createCommentVNode(" 表格内容 "),
        vue.createElementVNode("scroll-view", {
          "scroll-y": "",
          class: "table-container"
        }, [
          vue.createCommentVNode(" 表格头 "),
          vue.createElementVNode("view", { class: "table-header" }, [
            vue.createElementVNode("view", { class: "header-cell" }, "进度"),
            vue.createElementVNode("view", { class: "header-cell" }, "报修单号"),
            vue.createElementVNode("view", { class: "header-cell" }, "资产名称"),
            vue.createElementVNode("view", { class: "header-cell" }, "故障描述")
          ]),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.assetsList, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "table-row",
                key: index,
                onClick: ($event) => $options.navigateToDetail(item)
              }, [
                vue.createElementVNode(
                  "view",
                  { class: "cell" },
                  vue.toDisplayString(item.进度 || "-"),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "cell" },
                  vue.toDisplayString(item.报修单号 || "-"),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "cell" },
                  vue.toDisplayString(item.资产名称 || "-"),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "cell" },
                  vue.toDisplayString(item.故障描述 || "-"),
                  1
                  /* TEXT */
                )
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          !$data.assetsList.length && !$data.loading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "no-data"
          }, "暂无数据")) : vue.createCommentVNode("v-if", true),
          $data.loading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "loading-indicator"
          }, "加载中...")) : vue.createCommentVNode("v-if", true),
          $data.error ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "error-message"
          }, [
            vue.createTextVNode(" 数据加载失败，请尝试刷新。"),
            vue.createElementVNode("button", {
              class: "refresh-button",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.fetchAssets(true))
            }, "刷新")
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ])
    ]);
  }
  const PagesRepairListRepairList = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-3dad1acb"], ["__file", "D:/Uniapp/dianJianApp/baoxiu/pages/repairList/repairList.vue"]]);
  const _sfc_main$2 = {
    components: {
      Navbar,
      ImageViewer
    },
    data() {
      return {
        username: "",
        detail: {},
        currentTab: "baoxiu",
        // 默认选中的标签
        isImageViewerVisible: false,
        selectedImageUrl: ""
      };
    },
    onLoad(options) {
      const userInfo = uni.getStorageSync("userInfo");
      if (userInfo && userInfo.username) {
        this.username = userInfo.username;
      }
      this.fetchDetail(options.docnum);
      this.fetchWeixiuDetail(options.docnum);
    },
    methods: {
      closeImageViewer() {
        this.isImageViewerVisible = false;
      },
      openImageViewer(url) {
        this.selectedImageUrl = url;
        this.isImageViewerVisible = true;
      },
      logout() {
        uni.removeStorageSync("userInfo");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      },
      fetchDetail(docnum) {
        const userInfo = uni.getStorageSync("userInfo");
        if (!userInfo.token || !userInfo.connid) {
          uni.showToast({
            title: "请先登录",
            icon: "none"
          });
          return;
        }
        uni.request({
          url: "http://13.94.38.44:8000/AssetsRepair/GetMainListDetail",
          method: "POST",
          header: {
            "content-type": "application/json"
          },
          data: JSON.stringify({
            connid: userInfo.connid,
            token: userInfo.token,
            docnum
          }),
          success: (response) => {
            let result;
            try {
              result = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
              formatAppLog("log", "at pages/baoxiuMIngxi/baoxiuMIngxi.vue:156", result);
            } catch (error) {
              formatAppLog("error", "at pages/baoxiuMIngxi/baoxiuMIngxi.vue:158", "解析响应数据失败:", error);
              uni.showToast({
                title: "解析数据失败",
                icon: "none"
              });
              return;
            }
            if (!result.isError) {
              this.detail = { ...this.detail, ...result };
            } else {
              uni.showToast({
                title: "获取详细信息失败",
                icon: "none"
              });
            }
          },
          fail: () => {
            uni.showToast({
              title: "请求失败，请检查网络连接",
              icon: "none"
            });
          }
        });
      },
      fetchWeixiuDetail(docnum) {
        const userInfo = uni.getStorageSync("userInfo");
        if (!userInfo.token || !userInfo.connid) {
          uni.showToast({
            title: "请先登录",
            icon: "none"
          });
          return;
        }
        uni.request({
          url: "http://13.94.38.44:8000/AssetsRepair/GetMainListDetail",
          // 假设API相同，可以根据实际情况调整
          method: "POST",
          header: {
            "content-type": "application/json"
          },
          data: JSON.stringify({
            connid: userInfo.connid,
            token: userInfo.token,
            docnum
          }),
          success: (response) => {
            let result;
            try {
              result = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            } catch (error) {
              formatAppLog("error", "at pages/baoxiuMIngxi/baoxiuMIngxi.vue:210", "解析响应数据失败:", error);
              uni.showToast({
                title: "解析数据失败",
                icon: "none"
              });
              return;
            }
            if (!result.isError) {
              this.detail = { ...this.detail, ...result };
            } else {
              uni.showToast({
                title: "获取详细信息失败",
                icon: "none"
              });
            }
          },
          fail: () => {
            uni.showToast({
              title: "请求失败，请检查网络连接",
              icon: "none"
            });
          }
        });
      },
      switchTab(tab) {
        this.currentTab = tab;
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    const _component_image_viewer = vue.resolveComponent("image-viewer");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createCommentVNode(" 添加选择卡 "),
      vue.createElementVNode("view", { class: "tabs" }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["tab", { active: $data.currentTab === "baoxiu" }]),
            onClick: _cache[0] || (_cache[0] = ($event) => $options.switchTab("baoxiu"))
          },
          " 报修明细 ",
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["tab", { active: $data.currentTab === "weixiu" }]),
            onClick: _cache[1] || (_cache[1] = ($event) => $options.switchTab("weixiu"))
          },
          " 维修明细 ",
          2
          /* CLASS */
        )
      ]),
      $data.currentTab === "baoxiu" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "content"
      }, [
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "报修单号:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.docnum),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "资产编号:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.AssetsCode),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "资产名称:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.AssetsName),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "使用部门:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.UserDep),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "资产类型:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.AssetsType),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "完工日期:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.FinishDate),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "故障描述:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.Discription),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "相关相片:")
        ]),
        $data.detail.FilesList && $data.detail.FilesList.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "image-preview"
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.detail.FilesList, (file, fileIndex) => {
              return vue.openBlock(), vue.createElementBlock("view", { key: fileIndex }, [
                vue.createElementVNode("image", {
                  src: file,
                  mode: "aspectFit",
                  class: "image",
                  onClick: ($event) => $options.openImageViewer(file)
                }, null, 8, ["src", "onClick"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "no-images"
        }, "暂无相关图片"))
      ])) : vue.createCommentVNode("v-if", true),
      $data.currentTab === "weixiu" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "content"
      }, [
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "维修单号:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.wxdocnum),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "原因分析:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.Reason),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "维修方案:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.SchemeTxt),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "预计金额:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.Amount),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "币别:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.Currency),
            1
            /* TEXT */
          )
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createVNode(_component_image_viewer, {
        visible: $data.isImageViewerVisible,
        "current-image": $data.selectedImageUrl,
        "on-close": $options.closeImageViewer
      }, null, 8, ["visible", "current-image", "on-close"])
    ]);
  }
  const PagesBaoxiuMIngxiBaoxiuMIngxi = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-ea34caf7"], ["__file", "D:/Uniapp/dianJianApp/baoxiu/pages/baoxiuMIngxi/baoxiuMIngxi.vue"]]);
  const _sfc_main$1 = {
    components: {
      Navbar
    },
    data() {
      return {
        username: "",
        detail: {}
      };
    },
    onLoad(options) {
      const userInfo = uni.getStorageSync("userInfo");
      if (userInfo && userInfo.username) {
        this.username = userInfo.username;
      }
      this.fetchDetail(options.docnum);
    },
    methods: {
      logout() {
        uni.removeStorageSync("userInfo");
        uni.redirectTo({
          url: "/pages/login/login"
        });
      },
      fetchDetail(docnum) {
        const userInfo = uni.getStorageSync("userInfo");
        if (!userInfo.token || !userInfo.connid) {
          uni.showToast({
            title: "请先登录",
            icon: "none"
          });
          return;
        }
        uni.request({
          url: "http://13.94.38.44:8000/AssetsRepair/GetMainListDetail",
          method: "POST",
          header: {
            "content-type": "application/json"
          },
          data: JSON.stringify({
            connid: userInfo.connid,
            token: userInfo.token,
            docnum
          }),
          success: (response) => {
            let result;
            try {
              result = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            } catch (error) {
              formatAppLog("error", "at pages/weixiuMingxi/weixiuMingxi.vue:85", "解析响应数据失败:", error);
              uni.showToast({
                title: "解析数据失败",
                icon: "none"
              });
              return;
            }
            formatAppLog("log", "at pages/weixiuMingxi/weixiuMingxi.vue:93", result);
            if (!result.isError) {
              this.detail = result;
            } else {
              uni.showToast({
                title: "获取详细信息失败",
                icon: "none"
              });
            }
          },
          fail: () => {
            uni.showToast({
              title: "请求失败，请检查网络连接",
              icon: "none"
            });
          }
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = vue.resolveComponent("navbar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_navbar, {
        username: $data.username,
        onLogout: $options.logout
      }, null, 8, ["username", "onLogout"]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "维修单号:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.wxdocnum),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "原因分析:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.Reason),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "维修方案:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.SchemeTxt),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "预计金额:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.Amount),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "detail-item" }, [
          vue.createElementVNode("strong", null, "币别:"),
          vue.createElementVNode(
            "view",
            { class: "xinxi" },
            vue.toDisplayString($data.detail.Currency),
            1
            /* TEXT */
          )
        ])
      ])
    ]);
  }
  const PagesWeixiuMingxiWeixiuMingxi = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-6808e56c"], ["__file", "D:/Uniapp/dianJianApp/baoxiu/pages/weixiuMingxi/weixiuMingxi.vue"]]);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/home/home", PagesHomeHome);
  __definePage("pages/repair/repair", PagesRepairRepair);
  __definePage("pages/copy/copy", PagesCopyCopy);
  __definePage("pages/mobileRepair/mobileRepair", PagesMobileRepairMobileRepair);
  __definePage("pages/repairList/repairList", PagesRepairListRepairList);
  __definePage("pages/baoxiuMIngxi/baoxiuMIngxi", PagesBaoxiuMIngxiBaoxiuMIngxi);
  __definePage("pages/weixiuMingxi/weixiuMingxi", PagesWeixiuMingxiWeixiuMingxi);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/Uniapp/dianJianApp/baoxiu/App.vue"]]);
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
