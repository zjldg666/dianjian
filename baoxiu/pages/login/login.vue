<template>
  <view class="container">
    <view class="login-box">
      <picker mode="selector" :range="companyNames" @change="onCompanyChange">
        <view class="picker">
          当前选择：{{ selectedCompanyName ? selectedCompanyName : '请选择公司' }}
        </view>
      </picker>
      <!-- 用户名输入框 -->
      <input type="text" placeholder="请输入用户名" v-model="username" class="input"/>
      <!-- 密码输入框 -->	
      <input type="password" placeholder="请输入密码" v-model="password" class="input"/>
      
      <button type="primary" @click="login" class="button">登录</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      companyList: [],
      selectedCompanyId: '',
      selectedCompanyName: '',
      username: '',
      password: ''
    }
  },
  computed: {
    companyNames() {
      return this.companyList.map(company => company.Name);
    }
  },
  onLoad() {
    this.fetchCompanyList();
  },
  methods: {
    fetchCompanyList() {
      uni.request({
        url: 'http://13.94.38.44:8000/AssetsRepair/Index',
        method: 'POST',
        success: (res) => {
          const data = JSON.parse(res.data).list;
          this.companyList = data;
        }
      });
    },
    onCompanyChange(event) {
      const index = event.detail.value;
      this.selectedCompanyId = this.companyList[index].ID;
      this.selectedCompanyName = this.companyList[index].Name;
    },
    login() {
      if (!this.selectedCompanyId || !this.username || !this.password) {
        uni.showToast({
          title: '请填写完整信息',
          icon: 'none'
        });
        return;
      }
  
      uni.request({
        url: 'http://13.94.38.44:8000/AssetsRepair/SignIn',
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: JSON.stringify({
          connid: this.selectedCompanyId,
          strAccount: this.username,
          strPswd: this.password
        }),
        success: (res) => {
          const result = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
          console.log(result.token); // 应该能正确输出 token
          console.log(result); // 输出整个结果对象
        
          if (result.IsError === false) { // 假设IsError为false表示成功
            uni.setStorageSync('userInfo', {
              token: result.token,
              username: result.EMP_NAME,
              connid: result.connid
              // 可以存储其他需要的信息
			
            });
	
            uni.redirectTo({
              url: '/pages/home/home'
            });
          } else {
            // 清除密码字段
            this.password = '';
            
            // 检查是否是账号或密码错误
            if (result.message && result.message.includes('账号或密码错误')) {
              uni.showToast({
                title: '账号或密码错误',
                icon: 'none'
              });
            } else {
              uni.showToast({
                title: result.message || '登录失败，请重试',
                icon: 'none'
              });
            }
          }
        },
        fail: () => {
          // 清除密码字段
          this.password = '';
          
          // 显示错误提示
          uni.showToast({
            title: '请求失败，请检查网络连接',
            icon: 'none'
          });
        }
      });
    }
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
.login-box {
  width: 600rpx;
  padding: 40rpx;
  background-color: #fff;
  box-shadow: 0 0 20rpx rgba(0,0,0,0.1);
  border-radius: 20rpx;
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
</style>



