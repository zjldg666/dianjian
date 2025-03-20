<template>
  <view class="container">
	<navbar :username="username" @logout="logout"/>
    <view class="button-group">
      <!-- button-row 控制横向两个按钮 -->
      <view class="button-row">
        <button class="square-button" @click="scanAndNavigate">
          <!-- icon-text-container  控制图标和文字上下排列 -->
          <view class="icon-text-container">     
            <image class="icon" src="../../static/icon/SaomaBx.png"></image>
            <text class="text">扫码报修</text>
          </view>
        </button>
        <button class="square-button" @click="TomobileRepair">
          <view class="icon-text-container">
            <image class="icon" src="../../static/icon/ShoujiBx.png"></image>
            <text class="text">手机报修</text>
          </view>
        </button>
      </view>
      <view class="button-row">
        <button class="square-button" @click="TorepairList">
          <view class="icon-text-container">
            <image class="icon" src="../../static/icon/bxQingdan.png"></image>
            <text class="text">报修清单</text>
          </view>
        </button>
        <button class="square-button" @click="navigateTo('assetList')">
          <view class="icon-text-container">
            <image class="icon" src="../../static/icon/ZichanQingdan.png"></image>
            <text class="text">资产清单</text>
          </view>
        </button>
      </view>
      <view class="button-row">
        <button class="square-button" @click="navigateTo('simpleReport')">
          <view class="icon-text-container">
            <image class="icon" src="../../static/icon/EasyBaobiao.png"></image>
            <text class="text">简单报表</text>
          </view>
        </button>
        <button class="square-button empty-button"></button> <!-- 空出的按钮 -->
      </view>
    </view>
  </view>
</template>

<script>
	import Navbar from '@/components/Navbar.vue'
	
export default {
	components:{
		Navbar
	},
	data(){
		return{
			username:''
		}
		
	},
	  onLoad() {
	    // 当页面加载时尝试从本地存储获取用户名
	    const userInfo = uni.getStorageSync('userInfo');
	    if (userInfo && userInfo.username) {
	      this.username = userInfo.username;
	    }
	  },
  methods: {
	  
	  
    // 扫码报修功能
    scanAndNavigate() {
      uni.scanCode({
        success: (res) => {
          const AssetsCode = res.result;
          console.log(AssetsCode);
          this.navigateToRepair(AssetsCode);
        },
        fail: () => {
          uni.showToast({
            title: '扫码失败，请重试',
            icon: 'none'
          });
        }
      });
    },

    navigateToRepair(AssetsCode) {
      const userInfo = uni.getStorageSync('userInfo');
      console.log(userInfo.connid);
      if (!userInfo.token || !userInfo.connid) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }

      uni.request({
        url: 'http://13.94.38.44:8000/AssetsRepair/ShowNewInfo',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: JSON.stringify({
          connid: userInfo.connid,
          token: userInfo.token,
          AssetsCode: AssetsCode,
          isEdit: true 
        }),          
        success: (response) => {
          const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
          console.log(result);
          console.log(result.AssetsCode);
          if (!result.IsError) {
            // 将资产信息作为参数传递给repair页面
            uni.navigateTo({
              url: `/pages/repair/repair?data=${JSON.stringify(result)}`
            });
          } else {
            uni.showToast({
              title: '获取资产信息失败',
              icon: 'none'
            });
          }
        },
        fail: () => {
          uni.showToast({
            title: '请求失败，请检查网络连接',
            icon: 'none'
          });
        }
      });
    },

    TomobileRepair() {
      uni.navigateTo({
        url: '/pages/mobileRepair/mobileRepair'
      });
    },
	
	TorepairList(){
		uni.navigateTo({
		  url: '/pages/repairList/repairList'
		});
	},

    navigateTo(page) {
      uni.navigateTo({
        url: `/pages/${page}/${page}`
      });
    },
	logout (){
	  uni.removeStorageSync('userInfo'); // 修改为移除整个userInfo缓存
	  uni.redirectTo({
	    url: '/pages/login/login'
	  });
	}
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
}

.button-group {
  width: 90%;
  max-width: 800rpx; 
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
}

.button-row {
	width: 90%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.square-button {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: black;
  border: none;
  border-radius: 10rpx;
  padding: 20rpx;
  box-sizing: border-box;
  margin-right: 15rpx;
}

.square-button:last-child {
  margin-right: 0;
}

.icon-text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.icon {
  width: 100rpx;
  height: 100rpx;
  margin-bottom: 10rpx;
}

.text {
  font-size: 32rpx;
}

.empty-button {
  background-color: transparent;
  border: none;
}
</style>



