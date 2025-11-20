"use strict";
const common_vendor = require("../common/vendor.js");
function scanAndNavigate(position, loadInspectionDetails) {
  common_vendor.index.scanCode({
    success: (res) => {
      common_vendor.index.__f__("log", "at utils/scanAndNavigate.js:4", "扫描成功", res);
      verifyQRCode(res.result, position, loadInspectionDetails);
    },
    fail: (err) => {
      common_vendor.index.__f__("error", "at utils/scanAndNavigate.js:8", "扫描失败", err);
    }
  });
}
function verifyQRCode(result, position, loadInspectionDetails) {
  const token = common_vendor.index.getStorageSync("token");
  common_vendor.index.request({
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
          common_vendor.index.showToast({
            title: "巡查点正确",
            icon: "success"
          });
          loadInspectionDetails(qrCodePrefix, position);
        } else {
          common_vendor.index.showToast({
            title: "位置不匹配",
            icon: "none"
          });
        }
      } else {
        common_vendor.index.__f__("error", "at utils/scanAndNavigate.js:41", "加载点检详情失败:", data.msg);
        common_vendor.index.showToast({
          title: data.msg,
          icon: "none"
        });
      }
    },
    fail: (err) => {
      common_vendor.index.__f__("error", "at utils/scanAndNavigate.js:49", "加载点检详情失败", err);
      common_vendor.index.showToast({
        title: "加载点检详情失败",
        icon: "none"
      });
    }
  });
}
exports.scanAndNavigate = scanAndNavigate;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/scanAndNavigate.js.map
