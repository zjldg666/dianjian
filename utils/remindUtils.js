export async function fetchRemindData() {
  try {
    const token = uni.getStorageSync('token'); // 确保在此处获取 token
    if (!token) {
      uni.showToast({
        title: '未登录，请先登录',
        icon: 'none'
      });
      return null;
    }

    const response = await uni.request({
      url: 'http://13.94.38.44:8080/CheckList/GetRemind',
      method: 'POST',
      data: { token }
    });

    console.log('API Response:', response.data);
    const data = JSON.parse(response.data);
    if (!data.isError) {
      return data.list; // 返回提醒数据列表
    } else {
      uni.showToast({
        title: '获取提醒信息失败',
        icon: 'none'
      });
      return null;
    }
  } catch (error) {
    console.error('获取提醒信息失败', error);
    uni.showToast({
      title: '获取提醒信息失败',
      icon: 'none'
    });
    return null;
  }
}