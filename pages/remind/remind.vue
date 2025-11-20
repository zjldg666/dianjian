<template>
  <view class="container">
    <navbar :username="username" @logout="logout"/>
    <view class="content">
      <button-group :buttons="Menubuttons"/>
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
      Menubuttons: []
    };
  },
  methods: {
    navigateToException(exception) {
      const token = uni.getStorageSync('token');
	  console.log(exception);
      console.log('Navigating to YIChang with ID:', exception.SEL_TXT, 'and Token:', token); // 添加日志
      if (!token) {
        uni.showToast({
          title: '未登录，请先登录',
          icon: 'none'
        });
        return;
      }
      const url = `/pages/YiChang/YiChang?id=${encodeURIComponent(exception.SEL_TXT)}&token=${encodeURIComponent(token)}&selShuoMing=${exception.SEL_ShuoMing}`;
      console.log('Navigating to:', url); // 添加日志以查看完整的 URL
      uni.navigateTo({
        url
      });
    },
    logout() {
      uni.removeStorageSync('username');
      uni.redirectTo({
        url: '/pages/login/login'
      });
    }
  },
  mounted() {
    const exceptionsStr = uni.getStorageSync('exceptions'); // 从本地存储读取 exceptions
    if (exceptionsStr) {
      try {
        const exceptions = JSON.parse(exceptionsStr);
        console.log('Parsed Exceptions:', exceptions); // 添加日志
        this.Menubuttons = exceptions.map(exception => ({
          label: exception.SEL_ShuoMing,
          action: () => this.navigateToException(exception), // 使用新的 navigateToException 方法
          disabled: false,
          badge: exception.num > 0 ? exception.num.toString() : '',
		  image:'../../static/icon/DJxiangmu.png'
        }));
      } catch (error) {
        console.error('解析 exceptions 失败', error);
      }
      uni.removeStorageSync('exceptions'); // 清除已使用的 exceptions 数据
    } else {
      console.error('未找到 exceptions 参数');
    }
  }
}
</script>

<style>
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



