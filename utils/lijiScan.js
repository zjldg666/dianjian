import { ref } from 'vue';

export function handleHomeScan(positions) {
  uni.scanCode({
    success: res => {
      console.log('扫描成功', res);
      const code = res.result.substring(0, 3).toLowerCase(); // 提取前三位并转换为小写
      loadHomeInspectionDetails(code, positions);
    },
    fail: err => {
      console.error('扫描失败', err);
    }
  });
}

function loadHomeInspectionDetails(code, positions) {
  const token = uni.getStorageSync('token'); // 获取存储的 token
  uni.request({
    url: 'http://13.94.38.44:8080/CheckList/GetCheckListDetailNew',
    method: 'POST',
    data: {
      code: code,
      token: token
    },
    success: (res) => {
      const data = JSON.parse(res.data); // 解析 JSON 数据
      if (!data.isError) {
        const inspectionDetails = data.dt; // 存储点检详情数据
        console.log('点检详情加载成功:', inspectionDetails);

        // 确保 inspectionDetails 是一个数组
        if (Array.isArray(inspectionDetails)) {
          // 查找第一个匹配的 Position
          const matchingDetail = inspectionDetails.find(detail => detail.Position.toLowerCase() === code);
          if (matchingDetail) {
            const position = positions.value.find(pos => 
              pos.SEL_TXT !== undefined && pos.SEL_TXT !== null && pos.SEL_TXT.toLowerCase() === matchingDetail.Position.toLowerCase()
            );
            if (position) {
              uni.navigateTo({
                url: `/pages/project/project?id=${encodeURIComponent(matchingDetail.ID)}&name=${encodeURIComponent(position.SEL_ShuoMing)}`
              });
            } else {
              console.error('未找到对应的点检位置');
              uni.showToast({
                title: '未找到对应的点检位置',
                icon: 'none'
              });
            }
          } else {
            console.error('未找到匹配的 Point 在 inspectionDetails 中');
            uni.showToast({
              title: '未找到匹配的 Point',
              icon: 'none'
            });
          }
        } else {
          console.error('inspectionDetails 不是一个数组');
          uni.showToast({
            title: '加载点检详情失败',
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
    }
  });
}