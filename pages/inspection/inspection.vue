<template>
  <view class="container">
    <navbar :username="username" @logout="logout"/>
    <view class="content">
      <!-- 使用 ButtonGroup 组件 -->
      <button-group :buttons="buttons"/>
    </view>
  </view>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ButtonGroup from '@/components/ButtonGroup.vue';
import { scanAndNavigate } from '@/utils/scanAndNavigate.js';

export default {
  components: {
    Navbar,
    ButtonGroup
  },
  data() {
    return {
      username: uni.getStorageSync('username') || '',
      buttons: [] // 用于存储点检项目的按钮数据
    };
  },
  onLoad() {
    // 获取对应的点检项目
    this.getInspectionItems();
  },
  onPullDownRefresh() {
    // 处理下拉刷新
    this.getInspectionItems(() => {
      uni.stopPullDownRefresh(); // 停止下拉刷新动作
    });
  },
  methods: {
    getInspectionItems(callback) {
      const token = uni.getStorageSync('token'); // 从本地存储获取 token
      const clientCode = uni.getStorageSync('clientcode'); // 从本地存储获取客户编码
      uni.request({
        url: 'http://13.94.38.44:8080/CheckList/GetAllCheckListByClientCode',
        method: 'POST',
        data: {
          code: clientCode, // 使用存储的客户编码
          token: token
        },
        success: (res) => {
          const data = JSON.parse(res.data); // 解析 JSON 数据
          console.log("token:", token);
          if (!data.isError) {
            // 解析返回的数据，并生成按钮数据
            this.buttons = data.list.map(item => ({
              label: item.SEL_ShuoMing,
              action: () => scanAndNavigate(item,this.loadInspectionDetails),
			  image:'../../static/icon/DJxiangmu.png'
            }));
            console.log('点检项目加载成功:', this.buttons);
          } else {
            console.error('加载点检项目失败:', data.message);
          }
          if (callback) callback(); // 停止刷新动作
        },
        fail: (err) => {
          console.error('加载点检项目失败', err);
          if (callback) callback(); // 停止刷新动作
        }
      });
    },
	loadInspectionDetails(code, position) {
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
	        // 跳转到 project 页面，传递检点项目和名称
	        uni.navigateTo({
	          url: `/pages/project/project?id=${encodeURIComponent(code)}&name=${position.SEL_ShuoMing}`
	        });
	        console.log(encodeURIComponent(code));
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
	},
    logout() {
      uni.removeStorageSync('username');
      uni.redirectTo({
        url: '/pages/login/login'
      });
    }
  }
}
</script>

<style>
/* 容器样式 */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
}
/* 内容样式 */
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
}
/* 标题样式 */
.title {
  font-size: 48rpx;
  margin-bottom: 40rpx;
  color: #fff;
}
</style>