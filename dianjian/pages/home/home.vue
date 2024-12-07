<template>
  <view class="container">
    <!-- 导航栏组件 -->
    <navbar :username="username" @logout="logout"/>
    <view class="content">
    
      <!-- 按钮组组件 -->
      <button-group :buttons="buttons"/>
    </view>
  </view>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ButtonGroup from '@/components/ButtonGroup.vue';

export default {
  components: {
    Navbar,
    ButtonGroup
  },
  data() {
    return {
      username: uni.getStorageSync('username') || '',
      // 定义按钮数组
      buttons: [
        { label: '我的巡查', action: this.goToInspection },
        { label: '待定按钮1', action: null, disabled: true },
        { label: '待定按钮2', action: null, disabled: true },
        { label: '待定按钮3', action: null, disabled: true }
      ]
    };
  },
  methods: {
    // 跳转到巡查任务页面
    goToInspection() {
      uni.navigateTo({
        url: '/pages/inspection/inspection'
      });
    },
    // 退出登录
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
  padding: 20px;
}
/* 标题样式 */
.title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
}
</style>
