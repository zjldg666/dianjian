"use strict";
const common_vendor = require("../common/vendor.js");
async function fetchRemindData() {
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
    console.log("API Response:", response.data);
    const data = JSON.parse(response.data);
    if (!data.isError) {
      return data.list;
    } else {
      common_vendor.index.showToast({
        title: "获取提醒信息失败",
        icon: "none"
      });
      return null;
    }
  } catch (error) {
    console.error("获取提醒信息失败", error);
    common_vendor.index.showToast({
      title: "获取提醒信息失败",
      icon: "none"
    });
    return null;
  }
}
exports.fetchRemindData = fetchRemindData;
