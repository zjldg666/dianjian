<!-- 已与baoxiuMIngxi合并 -->

<template>
  <view class="container">
	  <navbar :username="username" @logout="logout"/>

	<view  class="content">
		<view class="detail-item"><strong>维修单号:</strong>
			<view class="xinxi">{{ detail.wxdocnum }}</view>
		</view>
		<view class="detail-item"><strong>原因分析:</strong> 
			<view class="xinxi">{{ detail.Reason }}</view>
		</view>
		<view class="detail-item"><strong>维修方案:</strong> 
			<view class="xinxi">{{ detail.SchemeTxt }}</view>
		</view>
		<view class="detail-item"><strong>预计金额:</strong> 
			<view class="xinxi">{{ detail.Amount }}</view>
		</view>
		<view class="detail-item"><strong>币别:</strong> 
			<view class="xinxi">{{ detail.Currency }}</view>
		</view>
	</view>

  </view>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
	
export default {
	components: {
	  Navbar,
	
	},
  data() {
    return {
		username:'',
      detail: {}
    };
  },
  onLoad(options) {
	  // 当页面加载时尝试从本地存储获取用户名
	  const userInfo = uni.getStorageSync('userInfo');
	  if (userInfo && userInfo.username) {
	    this.username = userInfo.username;
	  };
    this.fetchDetail(options.docnum);
  },
  methods: {
	  logout (){
	    uni.removeStorageSync('userInfo'); // 修改为移除整个userInfo缓存
	    uni.redirectTo({
	      url: '/pages/login/login'
	    });
	  },
    fetchDetail(docnum) {
      const userInfo = uni.getStorageSync('userInfo');

      if (!userInfo.token || !userInfo.connid) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }

      uni.request({
        url: 'http://13.94.38.44:8000/AssetsRepair/GetMainListDetail',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: JSON.stringify({
          connid: userInfo.connid,
          token: userInfo.token,
          docnum: docnum
        }),
        success: (response) => {
          let result;
          try {
            result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
          } catch (error) {
            console.error('解析响应数据失败:', error);
            uni.showToast({
              title: '解析数据失败',
              icon: 'none'
            });
            return;
          }

          console.log(result);

          if (!result.isError) {
            this.detail = result;
          } else {
            uni.showToast({
              title: '获取详细信息失败',
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

  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
}

.content{
	width: 90%;
	max-width: 800rpx; 
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40rpx;
}
.detail-item {
  margin-bottom: 20px;
  width: 93%;
  display: flex;
  justify-content: space-between;
  
}

strong{
	line-height: 86rpx;
}
.xinxi{
	width: 60%;
	padding: 20rpx;
	border: 2rpx solid #ccc;
	border-radius: 10rpx;
	color: red;
	white-space: normal; /* 允许文字换行 */
	word-break: break-all; /* 强制长单词或 URL 地址换行到下一行 */
}

image {
  width: 100%;
  max-width: 300px;
  height: auto;
  margin-bottom: 20rpx;
}
</style>



