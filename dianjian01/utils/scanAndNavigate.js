export function scanAndNavigate(position, loadInspectionDetails) {
  uni.scanCode({
    success: res => {
      console.log('扫描成功', res);
      verifyQRCode(res.result, position, loadInspectionDetails);
    },
    fail: err => {
      console.error('扫描失败', err);
    }
  });
}

function verifyQRCode(result, position, loadInspectionDetails) {
  const token = uni.getStorageSync('token'); // 获取存储的 token
  uni.request({
    url: 'http://13.94.38.44:8080/CheckList/GetCheckListDetailNew',
    method: 'POST',
    data: {
      code: result.substring(0, 3), // 使用二维码的前三个字符作为代码
      token: token
    },
    success: (res) => {
      const data = JSON.parse(res.data); // 解析 JSON 数据
      if (!data.isError) {
        const qrCodePrefix = result.substring(0, 3).toLowerCase(); // 获取二维码的前三个字符并转换为小写
        const selTxtPrefix = position.SEL_TXT.toLowerCase(); // 将传递的 SEL_TXT 转换为小写
        if (qrCodePrefix === selTxtPrefix) {
          uni.showToast({
            title: '巡查点正确',
            icon: 'success'
          });
          // 加载点检详情并跳转到 project 页面
          loadInspectionDetails(qrCodePrefix, position);
        } else {
          uni.showToast({
            title: '位置不匹配',
            icon: 'none'
          });
        }
      } else {
        console.error('加载点检详情失败:', data.msg);
        uni.showToast({
          title: data.msg,
          icon: 'none'
        });
      }
    },
    fail: (err) => {
      console.error('加载点检详情失败', err);
      uni.showToast({
        title: '加载点检详情失败',
        icon: 'none'
      });
    }
  });
}