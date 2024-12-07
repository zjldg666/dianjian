<template>
  <view class="container">
    <navbar :username="username" @logout="logout"/>
    <view class="content">
      
      <view class="inspection-point">
        <view class="inspection-name">检查位置>{{selShuoMing}}</view>
		<view  class="scanner">
		        <view class="scanner-animation"></view>
		</view>
        <button @click="scanQRCode" class="button">点击扫描二维码</button>
      </view>
	  
	        
   <!--   <view class="inspection-details" v-if="inspectionDetails.length > 0">
        <view v-for="item in inspectionDetails" :key="item.ID" class="detail-item">
          <view>项目: {{ item.Project }}</view>
          <view>描述: {{ item.Description }}</view>
          <view>位置: {{ item.Position }}</view>
        </view>
      </view> -->
    </view>
  </view>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar
  },
  data() {
    return {
      username: uni.getStorageSync('username') || '',
      inspectionDetails: [], // 存储点检详情数据
      selTxt: '' ,// 存储传递的 SEL_TXT
	  selShuoMing:'',
    };
  },
  onLoad(options) {
    this.selTxt = options.selTxt;
	this.selShuoMing = options.selShuoMing;
  },
  methods: {
    scanQRCode() {
      uni.scanCode({
        success: res => {
          console.log('扫描成功', res);
          this.verifyQRCode(res.result);
        },
        fail: err => {
          console.error('扫描失败', err);
        }
      });
    },
    verifyQRCode(result) {
      const qrCodePrefix = result.substring(0, 3).toLowerCase(); // 获取二维码的前三个字符并转换为小写
      const selTxtPrefix = this.selTxt.toLowerCase(); // 将传递的 SEL_TXT 转换为小写
      if (qrCodePrefix === selTxtPrefix) {
        uni.showToast({
          title: '巡查点正确',
          icon: 'success'
        });
        // 跳转到点检项目页面，并传递相关信息
        this.loadInspectionDetails(qrCodePrefix);
      } else {
        uni.showToast({
          title: '位置不匹配',
          icon: 'none'
        });
      }
    },
    loadInspectionDetails(code) {
      const token = uni.getStorageSync('token'); // 获取存储的 token
      uni.request({
        url: 'http://13.94.38.44:8080/CheckList/GetCheckListDetail',
        method: 'POST',
        data: {
          code: code,
          token: token
        },
        success: (res) => {
          const data = JSON.parse(res.data); // 解析 JSON 数据
          if (!data.isError) {
            this.inspectionDetails = data.dt; // 存储点检详情数据
            console.log('点检详情加载成功:', this.inspectionDetails);
            // 跳转到 project 页面，传递检点项目
            uni.navigateTo({
              url: `/pages/project/project?id=${code}&name=${this.selShuoMing}`
            });
          } else {
            console.error('加载点检详情失败:', data.message);
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
  padding: 20px;
}
.title {
  font-size: 24px;
  margin-bottom: 20px;
  color: black;
}
.inspection-point {
  width: 100%;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 10px;
  text-align: center;
  color: #fff;
}
.inspection-name {
  font-size: 20px;
  margin-bottom: 20px;
  color: black;
}
.button {
  padding: 10px 20px;
  background-color: #007aff;
  color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
.button:active {
  background-color: #005bb5;
}
/* 扫码动画 */
.scanner {
  position: relative;
  width: 300px;
  height: 300px;
  border: 2px solid #007aff;
  margin: 0 auto;
  margin-bottom: 40rpx;
  overflow: hidden;
  background-color: black;
  
}
.scanner-animation {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent, rgba(0, 122, 255, 0.5), transparent);
  animation: scan 2s infinite;
  
}
@keyframes scan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
