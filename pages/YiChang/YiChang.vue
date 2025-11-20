<template>
  <view class="container">
    <navbar :username="username" @logout="logout" />
	
    <view class="content">
      <!-- 使用 Loading 组件 -->
      <loading-spinner :show="isLoading" />
		
      <view v-if="!isLoading && details.length > 0">
        <view class="header">{{ selShuoMing }}</view>
        <view class="detail-item">
          <text class="label">点检项目:</text>
          <text class="value">{{ currentDetail?.Project }}</text>
        </view>
        <view class="detail-item">
          <text class="label">点检内容:</text>
          <text class="value">{{ currentDetail?.Description }}</text>
        </view>
        <view class="detail-item">
          <text class="label">点检结果:</text>
          <text class="value">
            <span v-if="currentDetail?.Result === '1'"><image src="../../static/dui.png" class="Fuhao"></image></span>
            <span v-else-if="currentDetail?.Result === '3'"><image src="../../static/NT.png" class="Fuhao"></image></span>
            <span v-else-if="currentDetail?.Result === '2'"><image src="../../static/cuo.png" class="Fuhao"></image></span>
          </text>
        </view>
        <view class="detail-item">
          <text class="label">点检说明:</text>
          <text class="value">{{ currentDetail?.Remark }}</text>
        </view>
        <view class="detail-item">
          <text class="label">点检人:</text>
          <text class="value">{{ currentDetail?.Person }}</text>
        </view>
        <view class="detail-item">
          <text class="label">点检时间:</text>
          <text class="value">{{ currentDetail?.Time1 }}</text>
        </view>
        <view class="detail-item">
          <text class="label">设备时间:</text>
          <text class="value">{{ currentDetail?.Time3 }}</text>
        </view>
        <view class="images-container">
          <image 
            v-for="(image, index) in currentDetail?.FileLists || []" 
            :key="index" 
            :src="'data:image/png;base64,' + image" 
            class="image"
            @click="previewImage(index)"
          ></image>
        </view>
        <view class="navigation-buttons">
          <button :disabled="currentIndex === 0" @click="prevItem">上一个</button>
          <button :disabled="currentIndex === details.length - 1" @click="nextItem">下一个</button>
        </view>
      </view>
      
      <!-- 无数据提示 -->
      <view v-else-if="!isLoading && details.length === 0" class="no-data">
        暂无数据
      </view>
    </view>
 <image-viewer 
   v-if="isPreviewVisible"
   :is-preview-visible="isPreviewVisible" 
   :current-image="currentDetail?.FileLists ? (currentDetail.FileLists[currentPreviewIndex] || '') : ''" 
   @update:is-preview-visible="isPreviewVisible = $event"
 />
  </view>
</template>

<script>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import Navbar from '@/components/Navbar.vue';
import ImageViewer from '@/components/ImageViewer.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  name: 'DetailPage',
  components: {
    Navbar,
    ImageViewer,
    LoadingSpinner
  },
  setup() {
    const username = ref(uni.getStorageSync('username') || '');
    const details = ref([]);
    const currentIndex = ref(0);
    const selShuoMing = ref('');
    const isPreviewVisible = ref(false);
    const currentPreviewIndex = ref(0);
    const isLoading = ref(true);

    const currentDetail = computed(() => {
      return details.value[currentIndex.value] || {};
    });

    const logout = () => {
      uni.removeStorageSync('username');
      uni.redirectTo({
        url: '/pages/login/login'
      });
    };

    const getRemindDetail = (code, token) => {
      // 显示加载状态
      isLoading.value = true;
      console.log('开始加载数据，isLoading:', isLoading.value);

      const requestData = { token, code };
      uni.request({
        url: 'http://13.94.38.44:8080/CheckList/GetRemindDetail',
        method: 'POST',
        data: requestData,
        success: (response) => {
          console.log('请求成功，响应数据:', response);
          const data = JSON.parse(response.data);
          console.log('解析后数据:', data);
          if (!data.isError) {
            details.value = data.list || [];
            currentIndex.value = 0;
            console.log('数据加载完成，details长度:', details.value.length);
          } else {
            uni.showToast({
              title: '加载提醒详情失败',
              icon: 'none'
            });
            details.value = [];
          }
        },
        fail: (error) => {
          console.error('加载提醒详情失败', error);
          uni.showToast({
            title: '加载提醒详情失败',
            icon: 'none'
          });
          details.value = [];
        },
        complete: () => {
          // 隐藏加载状态
          isLoading.value = false;
          console.log('加载完成，isLoading:', isLoading.value);
        }
      });
    };

    const prevItem = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--;
      }
    };

    const nextItem = () => {
      if (currentIndex.value < details.value.length - 1) {
        currentIndex.value++;
      }
    };

    const previewImage = (index) => {
      console.log('Clicked image index:', index);
      console.log('Images array:', currentDetail.value.FileLists);
      currentPreviewIndex.value = index;
      isPreviewVisible.value = true;
    };

    onLoad((options) => {
      console.log('页面加载参数:', options);
      if (options && options.id && options.token && options.selShuoMing) {
        getRemindDetail(options.id, options.token);
        selShuoMing.value = decodeURIComponent(options.selShuoMing);
      } else {
        console.error('未找到 id 或 token 参数');
        isLoading.value = false; // 确保加载状态关闭
      }
    });

    return {
      username,
      details,
      currentIndex,
      selShuoMing,
      isPreviewVisible,
      currentPreviewIndex,
      currentDetail,
      logout,
      prevItem,
      nextItem,
      previewImage,
      isLoading
    };
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
  position: relative;
}

.content {
  flex: 1;
  padding: 40rpx;
  position: relative;
}

.header {
  font-size: 48rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.detail-item {
  margin-bottom: 20rpx;
}

.label {
  font-weight: bold;
  margin-right: 20rpx;
}

.images-container {
  position: relative;
  display: inline-block;
  margin: 20rpx;
}

.image {
  width: 160rpx;
  height: 160rpx;
  margin-right: 20rpx;
  cursor: pointer;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 40rpx;
}

button {
  padding: 20rpx 40rpx;
  border: none;
  background-color: #007AFF;
  color: white;
  border-radius: 10rpx;
}

button:disabled {
  background-color: #cccccc;
}

.Fuhao {
  width: 25rpx;
  height: 25rpx;
}

.no-data {
  text-align: center;
  padding: 40rpx;
  color: #999;
}
</style>