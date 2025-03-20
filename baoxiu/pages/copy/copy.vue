
<template>
  <view class="container">
    <navbar :username="username" @logout="logout" />
	<!-- 添加选择卡 -->
	    <view class="tabs">
	      <view 
	        :class="['tab', { active: currentTab === 'baoxiu' }]" 
	        @click="switchTab('baoxiu')"
	      >
	        报修明细
	      </view>
	      <view 
	        :class="['tab', { active: currentTab === 'weixiu' }]" 
	        @click="switchTab('weixiu')"
	      >
	        维修明细
	      </view>
	    </view>
    <view  v-if="currentTab === 'baoxiu'" class="content">
	
      <view class="detail-item">
		    <strong>报修单号:</strong>
		    <view class="xinxi">{{ detail.docnum }}</view>
      </view>
      <view class="detail-item">
        <strong>报修单号:</strong>
        <view class="xinxi">{{ detail.docnum }}</view>
      </view>
      <view class="detail-item">
        <strong>资产编号:</strong>
        <view class="xinxi">{{ detail.AssetsCode }}</view>
      </view>
      <view class="detail-item">
        <strong>资产名称:</strong>
        <view class="xinxi">{{ detail.AssetsName }}</view>
      </view>
      <view class="detail-item">
        <strong>使用部门:</strong>
        <view class="xinxi">{{ detail.UserDep }}</view>
      </view>
      <view class="detail-item">
        <strong>资产类型:</strong>
        <view class="xinxi">{{ detail.AssetsType }}</view>
      </view>
      <view class="detail-item">
        <strong>完工日期:</strong>
        <view class="xinxi">{{ detail.FinishDate }}</view>
      </view>
      <view class="detail-item">
        <strong>故障描述:</strong>
        <view class="xinxi">{{ detail.Discription }}</view>
      </view>
      <view class="detail-item">
        <strong>相关相片:</strong>
      </view>
      <view v-if="detail.FilesList && detail.FilesList.length > 0" class="image-preview">
        <view v-for="(file, fileIndex) in detail.FilesList" :key="fileIndex">
          <image :src="file" mode="aspectFit" class="image" @click="openImageViewer(file)" />
        </view>
      </view>
      <view v-else class="no-images">暂无相关图片</view>
    </view>
	
	<view v-if="currentTab === 'weixiu'" class="content">
		 <view class="detail-item">
		        <strong>维修单号:</strong>
		        <view class="xinxi">{{ detail.wxdocnum }}</view>
		      </view>
			  
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
  <image-viewer
    :visible="isImageViewerVisible"
    :current-image="selectedImageUrl"
    :on-close="closeImageViewer"
  ></image-viewer>
  </view>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ImageViewer from '@/components/ImageViewer.vue';

export default {
  components: {
    Navbar,
	ImageViewer
  },
  data() {
    return {
      username: '',
      detail: {},
      currentTab: 'baoxiu', // 默认选中的标签
	  isImageViewerVisible: false,
	  selectedImageUrl: '',
    };
  },
  onLoad(options) {
    const userInfo = uni.getStorageSync('userInfo');
    if (userInfo && userInfo.username) {
      this.username = userInfo.username;
    }
    this.fetchDetail(options.docnum); // 加载报修明细数据
    this.fetchWeixiuDetail(options.docnum); // 预加载维修明细数据
  },
  methods: {
	  closeImageViewer() {
	     this.isImageViewerVisible = false;
	   },
	   openImageViewer(url) {
	     this.selectedImageUrl = url;
	     this.isImageViewerVisible = true;
	   },
	
    logout() {
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

          if (!result.isError) {
            this.detail = { ...this.detail, ...result }; // 合并结果到detail对象
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
    fetchWeixiuDetail(docnum) {
      const userInfo = uni.getStorageSync('userInfo');

      if (!userInfo.token || !userInfo.connid) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }

      uni.request({
        url: 'http://13.94.38.44:8000/AssetsRepair/GetMainListDetail', // 假设API相同，可以根据实际情况调整
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

          if (!result.isError) {
            this.detail = { ...this.detail, ...result }; // 合并维修明细结果到detail对象
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
    switchTab(tab) {
      this.currentTab = tab; // 切换当前标签
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

.content {
  width: 90%;
  max-width: 800rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
}
.tabs {
  display: flex;
  justify-content: space-around;
  background-color: #f8f8f8;
  padding: 20rpx 0;
}
.tab {
  flex: 1;
  text-align: center;
  padding: 10rpx;
  cursor: pointer;
}
.tab.active {
  color: #007aff;
  border-bottom: 4rpx solid #007aff;
}


.detail-item {
  margin-bottom: 20px;
  width: 93%;
  display: flex;
  justify-content: space-between;
  height: auto; /* 改为 auto 以便适应内容高度 */
}

.image-preview {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  margin: 20rpx;
}

strong {
  line-height: 86rpx;
}

.xinxi {
  width: 60%;
  padding: 20rpx;
  border: 2rpx solid #ccc;
  border-radius: 10rpx;
  color: red;
  word-wrap: break-word; /* 确保文本可以换行 */
}

.image {
  width: 160rpx;
  height: 160rpx;
  margin-right: 20rpx;
  cursor: pointer;
}

.no-images {
  text-align: center;
  padding: 20rpx;
  color: #666;
}
</style>