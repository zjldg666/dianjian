<template>
  <view class="container">
	  <navbar :username="username" @logout="logout"/>
	  <view class="content">
		  <!-- 表格内容 -->
		  <scroll-view scroll-y class="table-container">
		    <!-- 表格头 -->
		    <view class="table-header">
		      <view class="header-cell">进度</view>
		      <view class="header-cell">报修单号</view>
		      <view class="header-cell">资产名称</view>
		      <view class="header-cell">故障描述</view>
		    </view>
		    <view 
		      class="table-row" 
		      v-for="(item, index) in assetsList" 
		      :key="index"
		      @click="navigateToDetail(item)"
		    >
		      <view class="cell">{{ item.进度 || '-' }}</view>
		      <view class="cell">{{ item.报修单号 || '-' }}</view>
		      <view class="cell">{{ item.资产名称 || '-' }}</view>
		      <view class="cell">{{ item.故障描述 || '-' }}</view>
		    </view>
		    <view v-if="!assetsList.length && !loading" class="no-data">暂无数据</view>
		    <view v-if="loading" class="loading-indicator">加载中...</view>
		    <view v-if="error" class="error-message">
		      数据加载失败，请尝试刷新。<button class="refresh-button" @click="fetchAssets(true)">刷新</button>
		    </view>
		  </scroll-view>
	  </view>
 
  </view>
</template>

<script>
	
import Navbar from '@/components/Navbar.vue'

export default {
	components:{
		Navbar
	},
  data() {
    return {
		username:'',
      assetsList: [],
      pagesize: 10,
      currentPage: 1,
      hasMoreData: true,
      loading: false,
      error: false
    };
  },
  onLoad() {
	  // 当页面加载时尝试从本地存储获取用户名
	  const userInfo = uni.getStorageSync('userInfo');
	  if (userInfo && userInfo.username) {
	    this.username = userInfo.username;
	  };
    this.fetchAssets();
  },
  methods: {
    fetchAssets(reset = false) {
      if (reset) {
        this.assetsList = [];
        this.currentPage = 1;
        this.hasMoreData = true;
        this.error = false; // 清除错误状态
      }

      const userInfo = uni.getStorageSync('userInfo');
      console.log(userInfo);

      if (!userInfo.token || !userInfo.connid) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }

      this.loading = true;

      uni.request({
        url: 'http://13.94.38.44:8000/AssetsRepair/GetMainList',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: JSON.stringify({
          connid: userInfo.connid,
          token: userInfo.token
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
            this.loading = false;
            this.error = true; // 设置错误状态
            return;
          }

          console.log(result);

          if (!result.IsError && result.list) {
            if (Array.isArray(result.list) && result.list.length > 0) {
              this.assetsList = reset ? result.list : [...this.assetsList, ...result.list];
              this.currentPage++;
            } else {
              this.hasMoreData = false;
            }
          } else {
            uni.showToast({
              title: '获取资产信息失败',
              icon: 'none'
            });
            this.error = true; // 设置错误状态
          }
        },
        fail: () => {
          uni.showToast({
            title: '请求失败，请检查网络连接',
            icon: 'none'
          });
          this.error = true; // 设置错误状态
        },
        complete: () => {
          this.loading = false;
        }
      });
    },
    // 跳转报修明细和维修明细页面
    navigateToDetail(item) {
      if (item.进度) {
        uni.navigateTo({
          url: `/pages/baoxiuMIngxi/baoxiuMIngxi?docnum=${item.报修单号}`
        });
      } 
	  // else {
   //      uni.navigateTo({
   //        url: `/pages/weixiuMingxi/weixiuMingxi?docnum=${item.报修单号}`
   //      });
   //    }
    },
	logout (){
	  uni.removeStorageSync('userInfo'); // 修改为移除整个userInfo缓存
	  uni.redirectTo({
	    url: '/pages/login/login'
	  });
	}
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
.table-container {
  height: 1200rpx;
  width: 100%;
}

.table-header {
  display: flex;
  background-color: #f5f5f5;
  padding: 10rpx;
  font-weight: bold;
  width: 100%;
}

.header-cell {
  flex: 1;
  text-align: center;
  border-right: 1rpx solid #ddd;
}

.header-cell:last-child {
  border-right: none;
}

.table-row {
  display: flex;
  padding: 10rpx;
  border-bottom: 1rpx solid #ddd;
  width: 100%;
}

.cell {
  flex: 1;
  text-align: center;
  white-space: normal; /* 允许文字换行 */
  word-break: break-all; /* 强制长单词或 URL 地址换行到下一行 */
  border-right: 1rpx solid #ddd;
  padding: 10rpx; /* 添加内边距以提高可读性 */
}

.cell:last-child {
  border-right: none;
}

.no-data {
  text-align: center;
  padding: 20rpx;
  color: #666;
}

.loading-indicator {
  text-align: center;
  padding: 20rpx;
}

.error-message {
  text-align: center;
  padding: 20rpx;
  color: red;
}

.refresh-button {
  margin-left: 10rpx;
  padding: 10rpx 20rpx;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 10rpx;
  font-size: 28rpx;
}
</style>



