<template>
  <view class="app">
    <navbar v-if="showNavbar" :username="username" @logout="logout"/>
    <view class="content">
      <slot></slot>
    </view>
  </view>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  },
  data() {
    return {
      username: uni.getStorageSync('username') || '',
      showNavbar: false // 控制 Navbar 的显示
    };
  },
  onShow() {
    this.checkCurrentPage();
  },
  methods: {
    checkCurrentPage() {
      const pages = getCurrentPages();
      if (pages.length > 0) {
        const currentPage = pages[pages.length - 1].route;
        this.showNavbar = currentPage !== 'pages/login/login'; // 非登录页面显示 Navbar
      }
    },
    logout() {
      // 清除用户信息并跳转到登录页面
      uni.removeStorageSync('username');
      uni.redirectTo({
        url: '/pages/login/login'
      });
    }
  }
}
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #E6E6E6; /* 设置背景色为灰色 */
}
.content {
  flex: 1;
}
</style>

