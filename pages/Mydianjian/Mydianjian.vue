<template>
  <view class="container">
    <!-- 导航栏组件 -->
    <navbar :username="username" @logout="logout"/>
    <view class="content">
      <!-- 按钮组组件 -->
      <button-group :buttons="inspectionButtons"/>
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
      positions: [], // 存储点检位置数据
      inspectionButtons: [] // 存储按钮组数据
    };
  },
  onLoad() {
    this.fetchPositions();
  },
  methods: {
    fetchPositions() {
      const token = uni.getStorageSync('token'); // 获取存储的 token
      uni.request({
        url: 'http://13.94.38.44:8080/CheckList/GetPositionByPerson',
        method: 'POST',
        data: {
          token: token
        },
        success: (res) => {
          const data = JSON.parse(res.data); // 解析 JSON 数据
          if (!data.isError) {
            this.positions = data.list; // 存储点检位置数据
            console.log('点检位置加载成功:', this.positions);
            this.createInspectionButtons();
          } else {
            console.error('加载点检位置失败:', data.message);
          }
        },
        fail: (err) => {
          console.error('加载点检位置失败', err);
        }
      });
    },
    createInspectionButtons() {
      this.inspectionButtons = this.positions.map(position => ({
        label: position.SEL_ShuoMing,
        action: () => scanAndNavigate(position, this.loadInspectionDetails),
        disabled: false,
		image:'../../static/icon/DJxiangmu.png'
      }));
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
/* 样式部分保持不变 */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
}
</style>