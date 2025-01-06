<template>
  <view class="container">
    <navbar :username="username" @logout="logout"/>
    <view class="content">
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
          <span v-if="currentDetail?.Result === '1'"><image src="../../static/dui.png" class="Fuhao"></image></span> <!-- √ -->
          <span v-else-if="currentDetail?.Result === '3'"><image src="../../static/NT.png" class="Fuhao"></image></span> <!-- ⊗ -->
          <span v-else-if="currentDetail?.Result === '2'"><image src="../../static/cuo.png" class="Fuhao"></image></span> <!-- × -->
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
    <image-viewer 
      :is-preview-visible="isPreviewVisible" 
      :current-image="currentDetail?.FileLists[currentPreviewIndex] || ''" 
      @update:is-preview-visible="isPreviewVisible = $event"
    />
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
      username: uni.getStorageSync('username') || '',
      details: [],
      currentIndex: 0,
      selShuoMing: '',
      isPreviewVisible: false,
      currentPreviewIndex: 0
    };
  },
  computed: {
    currentDetail() {
      return this.details[this.currentIndex] || {};
    }
  },
  methods: {
    logout() {
      uni.removeStorageSync('username');
      uni.redirectTo({
        url: '/pages/login/login'
      });
    },
    getRemindDetail(code, token) {
      uni.showLoading({
        title: '加载中...'
      });

      const requestData = { token, code };
      uni.request({
        url: 'http://13.94.38.44:8080/CheckList/GetRemindDetail',
        method: 'POST',
        data: requestData,
        success: (response) => {
          const data = JSON.parse(response.data);
          console.log(data);
          if (!data.isError) {
            this.details = data.list;
            this.currentIndex = 0; // 初始化为第一个元素
          } else {
            uni.showToast({
              title: '加载提醒详情失败',
              icon: 'none'
            });
          }
        },
        complete: () => {
          uni.hideLoading();
        },
        fail: (error) => {
          console.error('加载提醒详情失败', error);
          uni.showToast({
            title: '加载提醒详情失败',
            icon: 'none'
          });
        }
      });
    },
    prevItem() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextItem() {
      if (this.currentIndex < this.details.length - 1) {
        this.currentIndex++;
      }
    },
    previewImage(index) {
      console.log('Clicked image index:', index);
      console.log('Images array:', this.currentDetail.FileLists);
      this.currentPreviewIndex = index;
      this.isPreviewVisible = true;
    }
  },
  onLoad(options) {
    if (options && options.id && options.token && options.selShuoMing) {
      this.getRemindDetail(options.id, options.token);
      this.selShuoMing = decodeURIComponent(options.selShuoMing);
      console.log(options);
    } else {
      console.error('未找到 id 或 token 参数');
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
  padding: 40rpx;
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

/* 图标样式 */
.Fuhao {
  width: 25rpx;
  height: 25rpx;
}
</style>



