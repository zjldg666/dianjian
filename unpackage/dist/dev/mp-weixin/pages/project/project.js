"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const Navbar = () => "../../components/Navbar2.js";
function urlToBase64(url, type = "png") {
  if (typeof url !== "string" || url.trim() === "") {
    return Promise.reject(new Error("Invalid URL"));
  }
  return new Promise((resolve, reject) => {
    if (url.startsWith("http")) {
      common_vendor.index.request({
        url,
        method: "GET",
        responseType: "arraybuffer",
        success: (res) => {
          const base64 = `data:image/${type};base64,${common_vendor.index.arrayBufferToBase64(res.data)}`;
          resolve(base64);
        },
        fail: (err) => {
          reject(new Error(`Request failed: ${err}`));
        }
      });
    } else if (url.startsWith("file://media/Photo/"))
      ;
    else {
      reject(new Error("This method is only supported in the APP environment for local files."));
    }
  });
}
const _sfc_main = {
  components: {
    Navbar
  },
  data() {
    return {
      username: common_vendor.index.getStorageSync("username") || "",
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
    const token = common_vendor.index.getStorageSync("token");
    this.loadInspectionDetails(this.inspectionPoint.id, token);
  },
  onPullDownRefresh() {
    const id = this.inspectionPoint.id;
    const token = common_vendor.index.getStorageSync("token");
    if (!id) {
      common_vendor.index.__f__("error", "at pages/project/project.vue:251", "id 参数为空");
      common_vendor.index.stopPullDownRefresh();
      return;
    }
    this.loadInspectionDetails(id, token, () => {
      common_vendor.index.stopPullDownRefresh();
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
        common_vendor.index.__f__("error", "at pages/project/project.vue:269", "id 参数为空");
        return;
      }
      common_vendor.index.__f__("log", "at pages/project/project.vue:272", "请求参数:", { code: id, token });
      common_vendor.index.request({
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
            common_vendor.index.__f__("log", "at pages/project/project.vue:290", "点检详情加载成功:", this.inspectionItems);
          } else {
            common_vendor.index.__f__("error", "at pages/project/project.vue:292", "加载点检详情失败:", data.message);
          }
          if (callback)
            callback();
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/project/project.vue:297", "加载点检详情失败:", err);
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
            common_vendor.index.showToast({
              title: "请填写点检说明",
              icon: "none"
            });
            return;
          }
          if (!this.currentItem.images || this.currentItem.images.length === 0) {
            common_vendor.index.showToast({
              title: "请上传至少一张图片",
              icon: "none"
            });
            return;
          }
        } else if (this.currentItem.flag === "有问题，但已经解决") {
          if (!this.currentItem.remarks.trim()) {
            common_vendor.index.showToast({
              title: "请填写点检说明",
              icon: "none"
            });
            return;
          }
        }
        if (this.currentItemIndex < this.inspectionItems.length - 1) {
          this.nextItem();
        } else {
          common_vendor.index.__f__("log", "at pages/project/project.vue:344", "当前 inspectionItems:", this.inspectionItems);
          this.saveInspection();
        }
      } else {
        common_vendor.index.showToast({
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
      common_vendor.index.chooseImage({
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
          common_vendor.index.__f__("error", "at pages/project/project.vue:374", "选择图片失败:", err);
        }
      });
    },
    // 将图片路径转换为 Base64 编码
    convertImagesToBase64(imagePaths) {
      const promises = imagePaths.map((imagePath) => {
        return urlToBase64(imagePath).catch((err) => {
          common_vendor.index.__f__("error", "at pages/project/project.vue:383", "转换图片失败，使用原始路径:", err, imagePath);
          return imagePath;
        });
      });
      Promise.all(promises).then((base64Images) => {
        this.currentItem.images.push(...base64Images);
        common_vendor.index.__f__("log", "at pages/project/project.vue:392", "图片路径数组:", this.currentItem.images);
        this.$forceUpdate();
      }).catch((err) => {
        common_vendor.index.__f__("error", "at pages/project/project.vue:395", "转换图片为 Base64 编码失败:", err);
      });
    },
    // 删除图片
    deleteImage(index) {
      this.currentItem.images.splice(index, 1);
    },
    // 保存点检详情
    saveInspection() {
      if (!this.inspectionItems || !this.inspectionItems.length) {
        common_vendor.index.__f__("error", "at pages/project/project.vue:405", "inspectionItems 未定义或为空");
        return;
      }
      common_vendor.index.showLoading({
        title: "正在上传数据..."
      });
      const token = common_vendor.index.getStorageSync("token");
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
      common_vendor.index.__f__("log", "at pages/project/project.vue:429", "发送到 SaveDetail 接口的数据:", inspectionData);
      common_vendor.index.request({
        url: "http://13.94.38.44:8080/CheckList/SaveDetail",
        method: "POST",
        header: {
          "content-type": "application/json"
        },
        data: inspectionData,
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/project/project.vue:439", "第一次请求返回数据为:", res.data);
          if (typeof res.data === "string") {
            try {
              const data = JSON.parse(res.data);
              if (!data.isError) {
                const docnum = data.docnum;
                this.saveFinalResult(docnum, token);
              } else {
                common_vendor.index.showToast({
                  title: data.msg || "保存失败",
                  icon: "none"
                });
                common_vendor.index.__f__("error", "at pages/project/project.vue:451", "保存点检详情失败:", data.msg);
              }
            } catch (parseError) {
              common_vendor.index.__f__("error", "at pages/project/project.vue:454", "解析第一次请求返回数据时出错:", parseError);
            }
          } else {
            common_vendor.index.__f__("error", "at pages/project/project.vue:457", "第一次请求响应数据不是字符串:", res.data);
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/project/project.vue:461", "保存点检详情失败:", err);
        }
      });
    },
    // 保存最终的检查结果
    saveFinalResult(docnum, token) {
      common_vendor.index.request({
        url: "http://13.94.38.44:8080/CheckList/SaveDetail2",
        method: "POST",
        data: {
          docnum,
          token
        },
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/project/project.vue:475", "第二次请求返回数据为:", res.data);
          if (typeof res.data === "string") {
            try {
              const result = JSON.parse(res.data);
              if (!result.IsError) {
                common_vendor.index.showToast({
                  title: "检查成功",
                  icon: "success"
                });
                common_vendor.index.redirectTo({
                  url: "/pages/home/home"
                });
              } else {
                common_vendor.index.showToast({
                  title: result.msg,
                  icon: "none"
                });
                common_vendor.index.__f__("error", "at pages/project/project.vue:492", "保存检查结果失败:", result.msg);
              }
            } catch (parseError) {
              common_vendor.index.__f__("error", "at pages/project/project.vue:495", "解析第二次请求返回数据时出错:", parseError);
            }
          } else {
            common_vendor.index.__f__("error", "at pages/project/project.vue:498", "第二次请求响应数据不是字符串:", res.data);
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/project/project.vue:502", "保存检查结果失败:", err);
        }
      });
    },
    // 退出登录
    logout() {
      common_vendor.index.removeStorageSync("username");
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
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
    c: common_vendor.t($data.inspectionPoint.name),
    d: common_vendor.t($data.currentProject),
    e: $options.currentItem
  }, $options.currentItem ? common_vendor.e({
    f: common_vendor.t($options.currentItem.Description),
    g: common_assets._imports_0$2,
    h: $options.currentItem.flag === "OK" ? 1 : "",
    i: common_vendor.o(($event) => $options.handleFlagChange("OK")),
    j: common_assets._imports_1$1,
    k: $options.currentItem.flag === "有问题，但已经解决" ? 1 : "",
    l: common_vendor.o(($event) => $options.handleFlagChange("有问题，但已经解决")),
    m: common_assets._imports_2,
    n: $options.currentItem.flag === "NG" ? 1 : "",
    o: common_vendor.o(($event) => $options.handleFlagChange("NG")),
    p: $options.currentItem.remarks,
    q: common_vendor.o(($event) => $options.currentItem.remarks = $event.detail.value),
    r: common_vendor.o((...args) => $options.uploadImage && $options.uploadImage(...args)),
    s: $options.currentItem.images && $options.currentItem.images.length > 0
  }, $options.currentItem.images && $options.currentItem.images.length > 0 ? {
    t: common_vendor.f($options.currentItem.images, (image, index, i0) => {
      return {
        a: image,
        b: common_vendor.o(($event) => $options.deleteImage(index), index),
        c: index
      };
    })
  } : {}, {
    v: common_vendor.o((...args) => $options.prevItem && $options.prevItem(...args)),
    w: $data.currentItemIndex === 0,
    x: common_vendor.t($data.currentItemIndex === $data.inspectionItems.length - 1 ? "点检成功" : "下一项"),
    y: common_vendor.o((...args) => $options.nextOrFinishItem && $options.nextOrFinishItem(...args))
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e8179a1b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/project/project.js.map
