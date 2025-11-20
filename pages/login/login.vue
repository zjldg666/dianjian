<template>
  <view class="container">
    <Navbar></Navbar>
    <view class="login-box">
      <view class="title">登录</view>
      <!-- 选择客户编码 -->
      <picker mode="selector" :range="clientCodes" @change="handleClientCodeChange">
        <view class="picker">
          {{ selectedClientCode || '选择客户编码' }}
        </view>
      </picker>
      <!-- 用户名输入框 -->
      <input type="text" placeholder=" 账号" v-model="strAccount" class="input"/>
      <!-- 密码输入框 -->
      <input type="password" placeholder="密码" v-model="password" class="input"/>
      <!-- 登录按钮 -->
      <button @click="login" class="button">登录</button>
    </view>
	<view class="email-box">
		<view>如遇bug</view>
		<view>请联系:zhangjialin@shenchuan.com</view>
	</view>
  </view>
</template>

<script>
	import Navbar from '@/components/Navbar.vue';
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
export default {
 components: {
    Navbar,
  },
  onReady() {
  		    // App 启动后立即检查更新
  		    checkUpdate()
  		  },
  data() {
    return {
      strAccount: '', // 用户输入的账号
      password: '', // 用户输入的密码
      clientCodes: [], // 客户编码列表
      selectedClientCode: '' // 选中的客户编码
    };
  },
  onLoad() {
    // 加载客户编码数据
    this.loadClientCodes();
  },
  methods: {
    loadClientCodes() {
      uni.request({
        url: 'http://13.94.38.44:8080/CheckList/GetClientCode', // 请求客户编码接口
        method: 'GET',
		success: (res) => {
          const data = JSON.parse(res.data);
          if (data && data.list) { // 检查 data 和 data.list 是否存在
            this.clientCodes = data.list.map(item => item.ClientCode); // 解析客户编码列表
            console.log('加载成功:', this.clientCodes);
          } else {
            console.error('加载客户编码失败:', data ? data.message : '无效的返回数据');
          }
        },
        fail: (err) => {
          console.error('加载客户编码失败', err);
        }
      });
    },
    handleClientCodeChange(event) {
      // 处理客户编码选择事件
      this.selectedClientCode = this.clientCodes[event.detail.value];
    },
    login() {
      if (this.strAccount && this.password && this.selectedClientCode) {
        uni.request({
          url: 'http://13.94.38.44:8080/CheckList/SignIn', // 登录验证接口
          method: 'POST',
          data: {
            strAccount: this.strAccount,
            strPswd: this.password,
            clientcode: this.selectedClientCode
          },
          success: (res) => {
			  
            const data = JSON.parse(res.data);
			console.log("数据为:",data);
            if (data.IsError === false) {
				
              uni.setStorageSync('token', data.token); // 存储token
              uni.setStorageSync('username', data.userName); // 存储用户名
              uni.setStorageSync('clientcode',this.selectedClientCode);
			  console.log(data.token);
			  uni.showToast({
                title: '登录成功',
                icon: 'success'
              });
              uni.redirectTo({
                url: '/pages/home/home' // 跳转到主页
              });
            } else {
              uni.showToast({
                title: '用户名或密码错误',
                icon: 'none'
              });
            }
          },
          fail: (err) => {
            console.error('登录失败', err);
            uni.showToast({
              title: '登录失败，请稍后重试',
              icon: 'none'
            });
          }
        });
      } else {
        uni.showToast({
          title: '请输入完整的登录信息',
          icon: 'none',
		  complete:()=>{
			  uni.reLaunch({
			  	url:'/pages/login/login'
			  });
		  }
        });
      }
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  align-items: center; /* 水平居中 */
  min-height: 100vh; /* 使用最小高度而非固定高度 */
  background-color: #f5f5f5;
  padding-top: 0; /* 移除顶部默认间距 */
}
.login-box {
  width: 600rpx;
  padding: 40rpx;
  background-color: #fff;
  box-shadow: 0 0 20rpx rgba(0,0,0,0.1);
  border-radius: 20rpx;
  margin-top: 250rpx; /* 增加与导航栏的距离 */
}
.title {
  font-size: 48rpx;
  text-align: center;
  margin-bottom: 40rpx;
}
.picker {
  width: 95%;
  padding: 20rpx;
  margin-bottom: 30rpx;
  border: 2rpx solid #ccc;
  border-radius: 10rpx;
  text-align: center;
}
.input {
  width: 95%;
  padding: 20rpx;
  margin-bottom: 30rpx;
  border: 2rpx solid #ccc;
  border-radius: 10rpx;
}
.button {
  width: 100%;
  padding: 20rpx;
  background-color: #007aff;
  color: #fff;
  text-align: center;
  border: none;
  border-radius: 10rpx;
  cursor: pointer;
}
.button:active {
  background-color: #005bb5;
}
.email-box{
	width: 600rpx;
	padding: 40rpx;
	background-color: #fff;
	box-shadow: 0 0 20rpx rgba(0,0,0,0.1);
	border-radius: 20rpx;
	margin-top: 300rpx;
	text-align: center;
}

</style>
