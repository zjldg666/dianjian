"use strict";
const common_vendor = require("../../common/vendor.js");
const Navbar = () => "../../components/Navbar.js";
const _sfc_main = {
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
      console.log(assetInfo);
      this.connid = assetInfo.connid;
      this.token = assetInfo.token;
      this.docnum = assetInfo.docnum;
      this.AssetsCode = assetInfo.AssetsCode;
      this.AssetsName = assetInfo.AssetsName;
      this.UserDept = assetInfo.UserDept || "";
      this.AssetsType = assetInfo.AssetsType;
      const draftData = common_vendor.index.getStorageSync("repairDraft_" + this.AssetsCode);
      console.log(draftData);
      if (draftData) {
        this.FinishDate = draftData.FinishDate;
        this.Discription = draftData.Discription;
        this.images = draftData.images;
      }
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (userInfo && userInfo.username) {
        this.username = userInfo.username;
      }
    }
  },
  methods: {
    logout() {
      common_vendor.index.removeStorageSync("userInfo");
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    },
    //选择完工日期
    onDateChange(e) {
      this.FinishDate = e.detail.value;
    },
    chooseImage() {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          this.images.push(...res.tempFilePaths);
        }
      });
    },
    // 新增图片预览方法
    previewImage(index) {
      common_vendor.index.previewImage({
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
        common_vendor.index.showToast({
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
          common_vendor.index.redirectTo({
            url: "/pages/home/home"
          });
        }
      } else {
        console.log("用户取消了操作");
      }
    },
    showModalAsync(content) {
      return new Promise((resolve) => {
        common_vendor.index.showModal({
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
        console.log("Base64 Images:", base64Images);
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
        console.log("请求数据:", requestData);
        const res = await new Promise((resolve, reject) => {
          common_vendor.index.request({
            url: "http://13.94.38.44:8000/AssetsRepair/SaveNewInfo",
            // 提交检修的接口
            method: "POST",
            data: requestData,
            success: resolve,
            fail: reject
          });
        });
        console.log("提交成功:", res.data);
        common_vendor.index.removeStorageSync("repairDraft_" + this.AssetsCode);
        common_vendor.index.showToast({
          title: "提交成功",
          icon: "success",
          duration: 2e3,
          // 显示时长为2秒
          complete: () => {
            common_vendor.index.redirectTo({
              url: "/pages/home/home"
            });
          }
        });
      } catch (err) {
        console.error("提交失败:", err);
        common_vendor.index.showToast({
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
        console.log("准备保存草稿:", draftData);
        common_vendor.index.setStorageSync("repairDraft_" + this.AssetsCode, draftData);
        console.log("草稿保存成功");
        common_vendor.index.showToast({
          title: "已保存为草稿",
          icon: "success",
          duration: 2e3,
          // 显示时长为2秒
          complete: () => {
            console.log("提示框显示完毕，即将返回首页");
            common_vendor.index.redirectTo({
              url: "/pages/home/home"
            });
          }
        });
      } catch (err) {
        console.error("保存草稿失败:", err);
        common_vendor.index.showToast({
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
        } else {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL(`image/${type}`);
            resolve(dataURL);
          };
          img.onerror = reject;
        }
      });
    }
    // handleInvalidImagePath(path) {
    //   console.warn(`Invalid image path found: ${path}, removing it from images list.`);
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
if (!Array) {
  const _component_navbar = common_vendor.resolveComponent("navbar");
  _component_navbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.logout),
    b: common_vendor.p({
      username: $data.username
    }),
    c: $data.docnum,
    d: $data.AssetsCode,
    e: $data.AssetsName,
    f: $data.UserDept,
    g: common_vendor.o(($event) => $data.UserDept = $event.detail.value),
    h: $data.AssetsType,
    i: common_vendor.t($data.FinishDate || "请选择日期"),
    j: common_vendor.o((...args) => $options.onDateChange && $options.onDateChange(...args)),
    k: $data.Discription,
    l: common_vendor.o(($event) => $data.Discription = $event.detail.value),
    m: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args)),
    n: common_vendor.f($data.images, (src, index, i0) => {
      return {
        a: src,
        b: common_vendor.o(($event) => $options.previewImage(index), index),
        c: index,
        d: common_vendor.o(($event) => $options.removeImage(index), index),
        e: index
      };
    }),
    o: common_vendor.o(($event) => $options.showConfirmDialog("立即")),
    p: common_vendor.o(($event) => $options.showConfirmDialog("稍后")),
    q: common_vendor.o((...args) => $options.submitRepair && $options.submitRepair(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ad4deb87"]]);
wx.createPage(MiniProgramPage);
